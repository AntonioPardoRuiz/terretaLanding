// Pegar este archivo completo en terreta-contact → Edit code → Deploy.
// Mantener EMAIL_PROVIDER_API_KEY (Secret) y CONTACT_FROM_EMAIL (Variable).
const ORIGINS = new Set([
  'https://realterretaia.com',
  'https://www.realterretaia.com',
  'https://terretaelite.com',
  'https://www.terretaelite.com',
  'https://terreta-web-prod.web.app',
  'https://terreta-web-prod.firebaseapp.com',
  'http://localhost:4200',
]);
const MAX_FILE = 2 * 1024 * 1024;
const MAX_JSON = 4 * Math.ceil(MAX_FILE / 3) + 16384;
const attempts = new Map();
function allow(ip) {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  if (!attempts.has(ip) && attempts.size >= 10000) return false;
  const bucket = attempts.get(ip) || { count: 0, expires: now + 900000 };
  attempts.set(ip, bucket);
  return ++bucket.count <= 5;
}
async function readJson(request, limit) {
  if (!request.body) throw new Error('Empty body');
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0,
    text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new RangeError('Body too large');
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}
function validate(body, careers) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || body.privacy !== true)
    return null;
  const data = {};
  for (const [key, max] of Object.entries({
    name: 100,
    company: 120,
    email: 254,
    phone: 20,
    needs: 3000,
    website: 0,
  })) {
    if (body[key] != null && typeof body[key] !== 'string') return null;
    data[key] = (body[key] || '').trim();
    if (data[key].length > max) return null;
  }
  if (
    data.name.length < 2 ||
    /[\r\n]/.test(data.name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    (!careers && data.needs.length < 20) ||
    (data.phone && !/^[+()\d\s-]{7,20}$/.test(data.phone))
  )
    return null;
  if (careers) {
    const cv = body.cv;
    if (
      !cv ||
      typeof cv.filename !== 'string' ||
      cv.filename.length > 120 ||
      !/^[^/\\\x00-\x1f\x7f]+\.pdf$/i.test(cv.filename) ||
      typeof cv.content !== 'string' ||
      !cv.content ||
      cv.content.length > 4 * Math.ceil(MAX_FILE / 3) ||
      cv.content.length % 4 !== 0 ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(cv.content)
    )
      return null;
    try {
      const bytes = atob(cv.content);
      if (
        bytes.length > MAX_FILE ||
        !bytes.startsWith('%PDF-') ||
        !bytes.slice(-1024).includes('%%EOF')
      )
        return null;
    } catch {
      return null;
    }
    data.cv = { filename: cv.filename, content: cv.content };
  }
  return data;
}

export function createWorker({ fetchEmail = (...args) => fetch(...args), rateLimit = allow } = {}) {
  return {
    async fetch(request, env) {
      const origin = request.headers.get('Origin');
      const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        Vary: 'Origin',
      };
      const reply = (status, body) => new Response(JSON.stringify(body), { status, headers });
      if (origin && !ORIGINS.has(origin)) return reply(403, { error: 'Origen no permitido' });
      if (origin) headers['Access-Control-Allow-Origin'] = origin;
      const path = new URL(request.url).pathname;
      const careers = path === '/api/careers';
      if (!careers && path !== '/' && path !== '/api/contact')
        return reply(404, { error: 'Ruta no encontrada' });
      if (request.method === 'OPTIONS')
        return new Response(null, {
          status: 204,
          headers: {
            ...headers,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400',
          },
        });
      if (request.method !== 'POST') {
        headers.Allow = 'POST, OPTIONS';
        return reply(405, { error: 'Utiliza el formulario de la web' });
      }
      if (
        request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !==
        'application/json'
      )
        return reply(415, { error: 'Se requiere JSON' });
      const limit = careers ? MAX_JSON : 16384;
      if (Number(request.headers.get('Content-Length') || 0) > limit)
        return reply(413, { error: 'Archivo o mensaje demasiado grande' });
      // Límite básico por instancia; no es un contador global.
      if (!rateLimit(request.headers.get('CF-Connecting-IP') || 'unknown')) {
        headers['Retry-After'] = '900';
        return reply(429, { error: 'Demasiados intentos. Espera 15 minutos.' });
      }
      let body;
      try {
        body = await readJson(request, limit);
      } catch (error) {
        return reply(error instanceof RangeError ? 413 : 400, { error: 'Contenido no válido' });
      }
      const data = validate(body, careers);
      if (!data)
        return reply(422, {
          error: careers
            ? 'Revisa los datos y adjunta un PDF válido de hasta 2 MB'
            : 'Revisa los campos del formulario',
        });
      if (!env.EMAIL_PROVIDER_API_KEY || !env.CONTACT_FROM_EMAIL)
        return reply(503, { error: 'Servicio no disponible' });
      try {
        const response = await fetchEmail('https://api.resend.com/emails', {
          method: 'POST',
          signal: AbortSignal.timeout(10000),
          headers: {
            Authorization: `Bearer ${env.EMAIL_PROVIDER_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.CONTACT_FROM_EMAIL,
            to: ['terretasoftware@gmail.com'],
            reply_to: data.email,
            subject: `${careers ? 'Candidatura · Trabajar con nosotros' : 'Nueva consulta web'}: ${data.name}`,
            text: [
              `Nombre: ${data.name}`,
              ...(careers ? [] : [`Empresa: ${data.company || 'No indicada'}`]),
              `Email: ${data.email}`,
              `Teléfono: ${data.phone || 'No indicado'}`,
              `Fecha: ${new Date().toISOString()}`,
              '',
              careers ? 'Presentación:' : 'Mensaje:',
              data.needs || 'Sin presentación adicional.',
              ...(careers
                ? [
                    '',
                    'El candidato ha aceptado el tratamiento de sus datos para valorar su candidatura. El CV se adjunta en PDF.',
                  ]
                : []),
            ].join('\n'),
            ...(careers ? { attachments: [data.cv] } : {}),
          }),
        });
        if (!response.ok) {
          console.error('Resend rejected request', response.status);
          return reply(502, { error: 'No se ha podido enviar. Inténtalo de nuevo.' });
        }
        const result = await response.json();
        if (typeof result.id !== 'string' || !result.id)
          return reply(502, { error: 'Envío no confirmado' });
        return reply(200, { ok: true });
      } catch {
        console.error('Resend connection failed');
        return reply(502, { error: 'No se ha podido enviar. Inténtalo de nuevo.' });
      }
    },
  };
}
export default createWorker();
