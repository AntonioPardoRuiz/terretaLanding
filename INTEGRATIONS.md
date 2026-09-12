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
nombre, email, tipo de ordenador, sistema operativo, conexión a internet, turno elegido y consentimiento.
El Worker lo remite al destinatario fijo `terretasoftware@gmail.com`; no requiere
modificaciones del Worker. Las solicitudes requieren confirmación manual de plaza
(máximo 30 participantes), horario y precio. No hay cobro ni reserva automática.
Inicio: 1 de noviembre de 2026. Turno obligatorio a elegir: mañana (10:00–11:30)
o tarde (18:00–19:30), lunes, miércoles y viernes, hora de España peninsular.
Clases: 2, 4, 6, 9, 11, 13 y 16 de noviembre de 2026. Seis sesiones de 90 minutos
y una última de 60: 10 horas en total. El día 16 los turnos terminan a las 11:00
y a las 19:00 respectivamente. El día 1 es domingo; la primera clase es el lunes 2.
Cuatro tramos semanales en octubre de 2026: 4–10 (50 €), 11–17 (65 €),
18–24 (75 €), 25–31 (90 €). Los cambios se aplican a las 00:00, hora de España
peninsular. Antes del 4 de octubre las solicitudes son de información.
La tabla pública y el correo usan la misma lista `priceTiers`; se muestran todos
los tramos con sus fechas, sin un precio vigente fijado durante el prerenderizado.

### Imagen y contenido de Power BI

El icono mostrado `public/assets/images/power-bi.png` procede, sin modificaciones, de
https://github.com/microsoft/PowerBI-Icons/blob/main/PNG/Power-BI.png (Microsoft).
La versión SVG anterior se conserva como recurso. Los enlaces al índice, contenido
e inscripción usan `/cursos` con fragmentos para evitar que `<base href="/">`
los resuelva hacia la portada.
Contenido bajo CC BY 4.0: https://creativecommons.org/licenses/by/4.0/.
Power BI es una marca de Microsoft. El curso lo organiza Terreta.
Referencias del temario:
- https://learn.microsoft.com/es-es/power-bi/fundamentals/desktop-getting-started
- https://learn.microsoft.com/es-es/power-bi/transform-model/desktop-measures
- https://learn.microsoft.com/es-es/power-bi/create-reports/desktop-upload-desktop-files
