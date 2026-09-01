const ALLOWED_ORIGINS = new Set([
  'https://realterretaia.com',
  'https://www.realterretaia.com',
  'http://localhost:4200',
]);
const limits = { name: 100, company: 120, email: 254, phone: 20, needs: 3000, website: 0 };

function normalize(value) {
  return typeof value === 'string' ? value.trim().replace(/\r\n/g, '\n') : '';
}
function validatePayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false };
  const data = Object.fromEntries(Object.keys(limits).map((key) => [key, normalize(body[key])]));
  if (data.website || body.privacy !== true) return { ok: false, spam: Boolean(data.website) };
  if (
    data.name.length < 2 ||
    data.needs.length < 20 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
    return { ok: false };
  if (data.phone && !/^[+()\d\s-]{7,20}$/.test(data.phone)) return { ok: false };
  if (Object.entries(limits).some(([key, max]) => data[key].length > max)) return { ok: false };
  return { ok: true, data };
}

function createRateLimiter(max = 5, windowMs = 15 * 60 * 1000) {
  const buckets = new Map();
  return (key, now = Date.now()) => {
    const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
    recent.push(now);
    buckets.set(key, recent);
    return recent.length <= max;
  };
}

function createContactHandler({
  sendEmail,
  now = () => new Date(),
  rateLimit = createRateLimiter(),
}) {
  return async (req, res) => {
    const origin = req.get?.('origin') || req.headers?.origin;
    if (origin && !ALLOWED_ORIGINS.has(origin)) return res.status(403).json({ error: 'Forbidden' });
    if (origin) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Vary', 'Origin');
    }
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(204).send('');
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    if (
      !String(req.get?.('content-type') || req.headers?.['content-type'] || '').includes(
        'application/json',
      )
    )
      return res.status(415).json({ error: 'Unsupported media type' });
    if (Number(req.get?.('content-length') || req.headers?.['content-length'] || 0) > 16384)
      return res.status(413).json({ error: 'Request too large' });
    const ip = req.ip || req.headers?.['x-forwarded-for'] || 'unknown';
    if (!rateLimit(String(ip).split(',')[0]))
      return res.status(429).json({ error: 'Too many requests' });
    const result = validatePayload(req.body);
    if (!result.ok) return res.status(result.spam ? 400 : 422).json({ error: 'Invalid request' });
    try {
      await sendEmail({ ...result.data, receivedAt: now().toISOString() });
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(502).json({ error: 'Unable to process request' });
    }
  };
}

module.exports = { ALLOWED_ORIGINS, createContactHandler, createRateLimiter, validatePayload };
