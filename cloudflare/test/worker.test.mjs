import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorker } from '../worker.mjs';

const cv = {
  filename: 'curriculum.pdf',
  content: btoa('%PDF-1.4\n1 0 obj << /Type /Catalog >> endobj\n%%EOF'),
};
const candidate = {
  name: 'Antonio',
  email: 'candidate@example.com',
  phone: '',
  needs: '',
  privacy: true,
  website: '',
  cv,
};
const env = { EMAIL_PROVIDER_API_KEY: 'test-key', CONTACT_FROM_EMAIL: 'contacto@terretaelite.com' };
function request(
  body = candidate,
  path = '/api/careers',
  origin = 'https://www.realterretaia.com',
) {
  return new Request('https://terreta-contact.terretasoftware.workers.dev' + path, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
function setup(options = {}) {
  const sent = [];
  const worker = createWorker({
    rateLimit: () => true,
    fetchEmail: async (url, init) => {
      sent.push({ url, ...init, body: JSON.parse(init.body) });
      return Response.json({ id: 'test-id' });
    },
    ...options,
  });
  return { sent, worker };
}
test('sends PDF bytes, recipient and reply-to through the existing provider', async () => {
  const { worker, sent } = setup();
  const res = await worker.fetch(
    request({ ...candidate, name: ' Antonio ', to: 'attacker@example.com' }),
    env,
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(sent[0].url, 'https://api.resend.com/emails');
  assert.deepEqual(sent[0].body.to, ['terretasoftware@gmail.com']);
  assert.equal(sent[0].body.from, env.CONTACT_FROM_EMAIL);
  assert.equal(sent[0].body.reply_to, candidate.email);
  assert.deepEqual(sent[0].body.attachments, [cv]);
  assert.match(sent[0].body.subject, /Candidatura/);
});
test('preserves existing contact requests on both routes', async () => {
  for (const path of ['/', '/api/contact']) {
    const { worker, sent } = setup();
    const res = await worker.fetch(
      request(
        { ...candidate, cv: undefined, needs: 'Necesitamos una aplicación para nuestra empresa.' },
        path,
      ),
      env,
    );
    assert.equal(res.status, 200);
    assert.equal(sent[0].body.attachments, undefined);
    assert.match(sent[0].body.subject, /Nueva consulta web/);
  }
});
for (const [label, change] of Object.entries({
  'missing CV': { cv: undefined },
  'missing consent': { privacy: false },
  honeypot: { website: 'spam' },
  'invalid email': { email: 'bad' },
  'header injection': { name: 'Antonio\r\nBcc: victim@example.com' },
  'wrong extension': { cv: { ...cv, filename: 'cv.exe' } },
  'path in filename': { cv: { ...cv, filename: '../cv.pdf' } },
  'disguised document': { cv: { ...cv, content: btoa('not a PDF') } },
  'invalid base64': { cv: { ...cv, content: '%%%%' } },
  'empty document': { cv: { ...cv, content: '' } },
  'oversized document': {
    cv: { ...cv, content: btoa('%PDF-' + 'a'.repeat(2 * 1024 * 1024) + '%%EOF') },
  },
}))
  test('rejects ' + label + ' without calling Resend', async () => {
    const { worker, sent } = setup();
    const response = await worker.fetch(request({ ...candidate, ...change }), env);
    assert.ok([413, 422].includes(response.status));
    assert.equal(sent.length, 0);
  });
test('enforces actual body size without a Content-Length header', async () => {
  const { worker, sent } = setup();
  const res = await worker.fetch(request({ ...candidate, needs: 'x'.repeat(3000000) }), env);
  assert.equal(res.status, 413);
  assert.equal(sent.length, 0);
});
test('handles preflight and blocks untrusted origins', async () => {
  const { worker, sent } = setup();
  const res = await worker.fetch(
    new Request('https://worker.example/api/careers', {
      method: 'OPTIONS',
      headers: { Origin: 'https://www.realterretaia.com' },
    }),
    env,
  );
  assert.equal(res.status, 204);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), 'https://www.realterretaia.com');
  assert.equal(
    (await worker.fetch(request(candidate, '/api/careers', 'https://evil.example'), env)).status,
    403,
  );
  assert.equal(sent.length, 0);
});
test('rejects invalid JSON', async () => {
  const { worker } = setup();
  const res = await worker.fetch(
    new Request('https://worker.example/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    }),
    env,
  );
  assert.equal(res.status, 400);
});
test('limits requests before sending', async () => {
  const { worker, sent } = setup({ rateLimit: () => false });
  const res = await worker.fetch(request(), env);
  assert.equal(res.status, 429);
  assert.equal(res.headers.get('Retry-After'), '900');
  assert.equal(sent.length, 0);
});
test('missing configuration fails without sending', async () => {
  const { worker, sent } = setup();
  assert.equal((await worker.fetch(request(), {})).status, 503);
  assert.equal(sent.length, 0);
});
for (const [label, fetchEmail] of [
  ['rejection', async () => Response.json({ message: 'private detail' }, { status: 403 })],
  ['missing ID', async () => Response.json({})],
  [
    'timeout',
    async () => {
      throw new Error('private detail');
    },
  ],
])
  test('does not confirm success after provider ' + label, async () => {
    const { worker } = setup({ fetchEmail });
    const res = await worker.fetch(request(), env);
    assert.equal(res.status, 502);
    assert.doesNotMatch(await res.text(), /private detail/);
  });
