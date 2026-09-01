const test = require('node:test');
const assert = require('node:assert/strict');
const { createContactHandler } = require('../src/contact');

const valid = {
  name: 'Antonio',
  company: 'Terreta',
  email: 'antonio@example.com',
  phone: '+34 600 000 000',
  needs: 'Necesitamos digitalizar un proceso interno de la empresa.',
  privacy: true,
  website: '',
};
function response() {
  return {
    code: 200,
    body: null,
    headers: {},
    status(code) {
      this.code = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
    set(name, value) {
      this.headers[name] = value;
      return this;
    },
  };
}
async function run({
  method = 'POST',
  body = valid,
  sendEmail = async () => {},
  origin = 'https://realterretaia.com',
  contentType = 'application/json',
  contentLength = '1000',
} = {}) {
  const res = response();
  await createContactHandler({
    sendEmail,
    rateLimit: () => true,
    now: () => new Date('2026-09-01T12:00:00Z'),
  })(
    {
      method,
      body,
      ip: '127.0.0.1',
      headers: { origin, 'content-type': contentType, 'content-length': contentLength },
      get(name) {
        return this.headers[name.toLowerCase()];
      },
    },
    res,
  );
  return res;
}

test('rejects an incorrect method', async () =>
  assert.equal((await run({ method: 'GET' })).code, 405));
test('rejects an empty payload', async () => assert.equal((await run({ body: {} })).code, 422));
test('rejects an invalid email', async () =>
  assert.equal((await run({ body: { ...valid, email: 'bad' } })).code, 422));
test('rejects oversized fields', async () =>
  assert.equal((await run({ body: { ...valid, name: 'x'.repeat(101) } })).code, 422));
test('rejects an oversized request body', async () =>
  assert.equal((await run({ contentLength: '20000' })).code, 413));
test('rejects the honeypot', async () =>
  assert.equal((await run({ body: { ...valid, website: 'spam' } })).code, 400));
test('accepts a valid request and normalizes it', async () => {
  let sent;
  const res = await run({
    body: { ...valid, name: '  Antonio  ' },
    sendEmail: async (message) => {
      sent = message;
    },
  });
  assert.equal(res.code, 200);
  assert.equal(sent.name, 'Antonio');
  assert.equal(sent.receivedAt, '2026-09-01T12:00:00.000Z');
});
test('hides provider failures', async () => {
  const res = await run({
    sendEmail: async () => {
      throw new Error('secret failure');
    },
  });
  assert.equal(res.code, 502);
  assert.deepEqual(res.body, { error: 'Unable to process request' });
});
test('rejects an untrusted origin', async () =>
  assert.equal((await run({ origin: 'https://evil.example' })).code, 403));
