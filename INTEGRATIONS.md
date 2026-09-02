# Integraciones pendientes

## Configuración pública

`public/runtime-config.json` se carga en tiempo de ejecución y no debe contener secretos.

- `contactEndpoint`: configurado como `/api/contact` para usar la reescritura de Firebase Hosting.
- `crmUrl`: usa como valor seguro por defecto `https://terretacrm.web.app`, el CRM independiente de Terreta. Puede sobrescribirse con otra URL HTTPS pública si fuera necesario.

## Secretos del backend

La función `contact` requiere estos secretos en Firebase Secret Manager:

- `EMAIL_PROVIDER_API_KEY`: clave de API de Resend.
- `CONTACT_RECIPIENT_EMAIL`: dirección que recibirá las consultas. El correo corporativo publicado actualmente es `terretasoftware@gmail.com`; Antonio debe confirmar que será el destinatario.
- `CONTACT_FROM_EMAIL`: remitente verificado en Resend.

Ninguno de estos valores debe guardarse en el repositorio ni en la configuración pública de Angular.

## Activación

Antes de desplegar, configurar los tres secretos y verificar el dominio remitente en Resend. Esta misión no realiza ningún despliegue.
