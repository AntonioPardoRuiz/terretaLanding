# Contacto: Cloudflare Workers y Resend

La web se aloja en Firebase Hosting. El formulario envía directamente a
`https://terreta-contact.terretasoftware.workers.dev/`, configurado tanto en
`public/runtime-config.json` como en el valor por defecto de RuntimeConfigService.
No necesita Firebase Functions, Secret Manager ni el plan Blaze.
El directorio `functions/` conserva la implementación anterior, fuera del despliegue.

## Configuración del Worker

Worker: `terreta-contact`. El código se ha publicado desde el panel de Cloudflare.

- Secret `EMAIL_PROVIDER_API_KEY`: clave de Resend con permiso de envío.
- Variable `CONTACT_FROM_EMAIL`: `contacto@terretaelite.com`.
- Destinatario fijo en el Worker: `terretasoftware@gmail.com`.
- Dominio remitente verificado en Resend: `terretaelite.com`.
- Reply-To: correo del visitante.

No guardar la API key en Angular, el repositorio ni este documento.
El Worker debe permitir los orígenes de la web mediante CORS, validar el contenido
y devolver `{ "ok": true }` únicamente después de que Resend acepte el mensaje.
El límite por IP del código publicado es básico, por instancia, no global.

## Verificación y publicación de la web

```bash
npm test -- --watch=false
npm run build
firebase deploy --only hosting --project terreta-web-prod
```

Después, abrir `/contacto`, enviar una consulta y comprobar su recepción en Gmail.
La aceptación por Resend no garantiza por sí sola la entrega en la bandeja de entrada.

## CRM

El valor por defecto de `crmUrl` sigue siendo `https://terretacrm.web.app`.

## Trabajar con nosotros

Ruta web: `/trabajar-con-nosotros`. Utiliza `/api/careers` en el mismo Worker.
PDF obligatorio de hasta 2 MB; validación de nombre, contenido y tamaño en el backend.
Resend recibe el PDF en Base64 y lo entrega como adjunto al mismo destinatario.
No se guarda el archivo en un bucket ni se publica una URL del CV.

Antes de publicar la web, sustituir el código del Worker `terreta-contact` por el
contenido completo de `cloudflare/worker.mjs` y pulsar Deploy. Este archivo conserva
las rutas `/` y `/api/contact` y añade `/api/careers`. Mantener las dos variables existentes.
No crear otro Worker ni cambiar los DNS o las claves.

Validación del Worker: `node --test cloudflare/test/*.test.mjs`.
Las pruebas simulan Resend y no envían correos. Probar la recepción del CV después de desplegar.

## Cursos

`/cursos` utiliza el servicio de contacto existente. El mensaje incluye el curso,
nombre, email, tipo de ordenador, sistema operativo, conexión a internet y consentimiento.
El Worker lo remite al destinatario fijo `terretasoftware@gmail.com`; no requiere
modificaciones del Worker. Las solicitudes requieren confirmación manual de plaza
(máximo 30 participantes), fecha y precio. No hay cobro ni reserva automática.
Pendiente de definir: fecha de inicio, horario e incrementos desde los 50 € de lanzamiento
cuatro semanas antes. No se calcula un precio vigente sin estos datos.
