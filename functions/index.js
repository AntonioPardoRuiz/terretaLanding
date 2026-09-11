const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { createContactHandler } = require('./src/contact');

const apiKey = defineSecret('EMAIL_PROVIDER_API_KEY');
const fromEmail = defineSecret('CONTACT_FROM_EMAIL');

async function sendEmail(message) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    signal: AbortSignal.timeout(10000),
    headers: { Authorization: `Bearer ${apiKey.value()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail.value(),
      to: ['terretasoftware@gmail.com'],
      reply_to: message.email,
      subject: `Nueva consulta web de ${message.name}`,
      text: [
        `Nombre: ${message.name}`,
        `Empresa: ${message.company || 'No indicada'}`,
        `Email: ${message.email}`,
        `Teléfono: ${message.phone || 'No indicado'}`,
        `Fecha: ${message.receivedAt}`,
        '',
        'Necesidad:',
        message.needs,
      ].join('\n'),
    }),
  });
  if (!response.ok) {
    console.error('Contact email provider rejected request', { status: response.status });
    throw new Error('Email provider rejected request');
  }
  const result = await response.json();
  if (!result.id) throw new Error('Email provider did not confirm acceptance');
}

exports.contact = onRequest(
  {
    region: 'europe-west1',
    secrets: [apiKey, fromEmail],
    timeoutSeconds: 15,
    memory: '256MiB',
    maxInstances: 5,
  },
  createContactHandler({ sendEmail }),
);
