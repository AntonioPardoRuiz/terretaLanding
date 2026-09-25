# Informe SEO de Terreta

Fecha: 25 de septiembre de 2026. Dominio canónico: https://www.realterretaia.com.
Alcance: auditoría y mejora del proyecto Angular existente, sin rehacer el diseño ni modificar Firebase Functions. Los cambios locales anteriores se han conservado. Este informe sustituye el mapa de intenciones de la auditoría de septiembre 13; los informes anteriores son históricos.

## 1. Estado inicial

- Angular 22, componentes standalone y OnPush, rutas con carga diferida, hidratación y `outputMode: static`; prerender global de rutas públicas. Esta arquitectura ya entrega HTML y se conserva.
- 12 URLs públicas, metadatos SEO centralizados con titles/descriptions por ruta, canonical HTTPS/www, Open Graph, Twitter Card y robots. No se ha creado otro servicio SEO paralelo.
- JSON-LD existente: Organization, WebSite, WebPage, BreadcrumbList y seis Service en `/servicios`.
- Sitemap coherente con las 12 URLs iniciales, robots con rastreo permitido, 404 estática y ruta Angular desconocida con noindex. Firebase no aplica rewrite universal a Home.
- Imágenes con dimensiones y ALT, Elite Coach en WebP, Power BI servido en WebP de unos 12 kB; el PNG original grande no se utiliza en las páginas. Fuentes del sistema sin descarga externa. Vídeos de YouTube cargados tras interacción.
- Contenido de servicios, productos, metodología, empresa y contacto ya aprovechable. Tarifas es una página breve orientada a solicitar presupuesto; no necesita competir como otra landing de software.
- Se encontraron cambios previos en Home, Productos, Servicios e index.html. No se revirtieron; entre ellos, la generalización de una referencia a cliente y el favicon.

## 2. Problemas detectados

- Servicios agrupaba software a medida, web, móvil, automatización e IA en una sola URL. Los fragmentos no aportan documentos independientes para responder a las distintas intenciones.
- Faltaban FAQs específicas y contenido sobre elección de solución, dependencias, integraciones y alcance de cada servicio.
- El title de Servicios competía con la intención de software a medida; ahora se centra en el catálogo de servicios.
- Faltaba una política explícita de caché para recursos versionados. El contenido de las nuevas landings se ha separado del bundle inicial para evitar cargarlo al visitar cualquier página.
- El cambio previo de `#psicologia` a `#proyectos-clientes` podía romper enlaces guardados. Se conserva el ID antiguo como ancla vacía, sin restaurar contenido de cliente retirado.
- Producción: HTTPS/www responde 200; HTTP/www redirige 301 a HTTPS; una URL inexistente devuelve 404. HTTPS sin www responde 200 con el mismo documento: falta redirección permanente al host canónico. No se puede configurar una condición por host con una redirección global del sitio sin arriesgar un bucle; queda para la gestión de dominios de Hosting.
- Se mantiene una afirmación preexistente de partner de Google, sin añadirla al schema ni repetirla en contenido nuevo. El propietario debe respaldarla documentalmente.

## 3. Cambios realizados y archivos

- `src/app/app.routes.ts`: cinco rutas nuevas, metadatos, FAQs y resolver que carga el contenido de servicios bajo demanda.
- `src/app/pages/service-detail/`: componente de detalle reutilizable, plantilla responsive, estilos con variables del diseño actual, contenido editorial y metadatos de cinco servicios.
- `src/app/shared/ui/faq/faq.ts` y `src/app/core/seo/page-faqs.ts`: preguntas visibles mediante details/summary nativos y contenido específico para páginas existentes.
- `src/app/core/seo/seo-data.ts`: Service individual, FAQPage y breadcrumbs con padre Servicios para las nuevas páginas; sin direcciones, reseñas, premios o resultados inventados.
- `src/app/core/seo/seo.service.ts`: ALT de imagen para Twitter, conservando el servicio de metadatos único.
- HTML/TS de Home, Servicios, Productos, Nosotros, Contacto, Cómo trabajamos, Tarifas, Outsourcing y Elite Coach: FAQs. Home, Servicios y Productos añaden enlaces contextuales a los nuevos servicios.
- `firebase.json`: caché anual para JS/CSS con hash del build, un día para assets sin hash, revalidación de runtime-config.
- `public/sitemap.xml`: 17 URLs. `public/robots.txt`, el prerender, Functions, formularios e integraciones se conservan.
- Pruebas: `src/app/core/seo/seo.service.spec.ts`, `scripts/seo-html.test.mjs`, `scripts/seo-browser-check.mjs`. Evidencias: `docs/seo/after.json` y `docs/seo/browser-check.json`.

## 4–6. URLs, intención principal y keywords secundarias

El mapa es una decisión editorial basada en los servicios disponibles y las necesidades indicadas, no una estimación de volumen de búsqueda. No se dispone de datos privados de Search Console. Home presenta el proveedor; Servicios ayuda a elegir; cada landing desarrolla una necesidad concreta. Nosotros responde a búsquedas de empresa/marca. No se crea una landing local casi idéntica: Alicante se integra en las páginas útiles.

| URL | Keyword principal | Keywords secundarias |
|---|---|---|
| `/` | desarrollo de software | empresa de desarrollo software; software para pymes; desarrollo software Alicante |
| `/servicios` | servicios de desarrollo de software | desarrollo de aplicaciones; soluciones digitales para empresas |
| `/tarifas` | presupuesto de software | precio proyecto de software; tarifas Terreta |
| `/outsourcing` | outsourcing de desarrollo de software | bolsas de horas de desarrollo; equipo en España |
| `/productos` | productos de software empresarial | software para pymes; CRM para empresas; CRM para pymes |
| `/aplicaciones/fitness-app` | Elite Coach | app para entrenadores; software para gimnasios |
| `/como-trabajamos` | proceso de desarrollo de software | metodología de desarrollo; planificación por hitos |
| `/nosotros` | Terreta empresa de software en Alicante | empresa tecnológica Alicante; equipo Terreta |
| `/contacto` | contactar con Terreta | presupuesto software Alicante; consultar proyecto |
| `/privacy-policy` | política de privacidad Terreta | protección de datos Terreta |
| `/trabajar-con-nosotros` | trabajar en Terreta | candidatura Terreta; empleo desarrollo software |
| `/cursos` | curso Power BI principiantes | formación Power BI; cursos Terreta |
| `/desarrollo-software-a-medida` | desarrollo de software a medida | software empresarial; software a medida Alicante; integración CRM |
| `/automatizacion-pymes` | automatización para pymes | automatización de procesos empresariales; digitalización pymes; automatización pymes Alicante |
| `/desarrollo-web` | desarrollo web | aplicaciones web; creación de páginas web; desarrollo Angular; desarrollo web Alicante |
| `/desarrollo-aplicaciones-moviles` | desarrollo de aplicaciones móviles | aplicaciones iOS y Android; Ionic; desarrollo aplicaciones Alicante |
| `/inteligencia-artificial-empresas` | inteligencia artificial para empresas | IA para pymes; automatización con IA; asistentes internos |

## 7–8. Titles y meta descriptions finales

Extraídos físicamente del HTML de producción generado, no solo del código de las rutas. Las URLs conservadas mantienen los metadatos que ya eran adecuados salvo el enfoque del title de Servicios.

| URL | Title | Meta description |
|---|---|---|
| `/` | Desarrollo de software para empresas en Alicante \| Terreta | Desarrollamos software para empresas desde Alicante: aplicaciones web y móviles, automatización e IA. Conoce nuestros productos y cuéntanos tu proyecto. |
| `/servicios` | Servicios de desarrollo de software y aplicaciones \| Terreta | Software a medida, aplicaciones web y móviles, páginas web, automatización e IA para empresas. Desde Alicante, te ayudamos a definir la solución que necesitas. |
| `/tarifas` | Tarifas \| Presupuesto sin compromiso \| Terreta | Cuéntanos qué necesitas realizar a través de nuestro formulario de contacto y te enviaremos un presupuesto personalizado sin ningún compromiso. |
| `/outsourcing` | Outsourcing \| Equipo en España y desarrollo propio \| Terreta | Equipo en España: desarrollamos sin externalizar ni subcontratar a terceros. Bolsas desde 25 €/h en la de 160 h, sin IVA. Presupuesto sin compromiso. |
| `/productos` | Productos y soluciones de software empresarial \| Terreta | Conoce Elite Coach, TerretaAgro, ContaTerra y TerretaRail: productos de software de Terreta, junto a proyectos reales para servicios profesionales. |
| `/aplicaciones/fitness-app` | Elite Coach \| App para entrenadores y gimnasios \| Terreta | Descubre Elite Coach: rutinas, clientes, seguimiento y nutrición para entrenadores y gimnasios. Conoce esta aplicación desarrollada por Terreta. |
| `/como-trabajamos` | Proceso de desarrollo de software \| Cómo trabaja Terreta | Así desarrollamos software en Terreta: definición de alcance, planificación, diseño, desarrollo y validación por hitos, con soporte y evolución del proyecto. |
| `/nosotros` | Terreta \| Empresa de desarrollo de software en Alicante | Somos Terreta, empresa de Alicante especializada en software para empresas y pymes. Conoce nuestro enfoque, servicios y forma de trabajar contigo. |
| `/contacto` | Contacto y presupuesto de software en Alicante \| Terreta | Habla con Terreta, en Alicante, sobre tu software, aplicación o automatización. Cuéntanos qué necesitas y solicita un presupuesto personalizado sin compromiso. |
| `/privacy-policy` | Política de Privacidad \| Terreta | Consulta la política de privacidad y protección de datos personales del sitio web de Terreta. |
| `/trabajar-con-nosotros` | Trabajar con nosotros \| Envía tu CV \| Terreta | Conoce Terreta y envíanos tu candidatura. Buscamos conocer talento en desarrollo de software, automatización, inteligencia artificial y diseño. |
| `/cursos` | Cursos \| Power BI para principiantes \| Terreta | Curso principiante en Power BI desde el 1 de noviembre de 2026: 10 horas, 30 plazas y formación desde la instalación hasta las métricas y la publicación. |
| `/desarrollo-software-a-medida` | Software a medida para pymes y empresas \| Terreta | Desarrollamos software a medida para gestionar tu empresa: portales, herramientas internas e integración con tu CRM. Define tu proyecto con Terreta, en Alicante. |
| `/automatizacion-pymes` | Automatización para pymes e integración de procesos \| Terreta | Conecta formularios, CRM y herramientas de gestión. Automatizamos tareas repetitivas de tu pyme con un alcance claro y seguimiento desde Alicante. |
| `/desarrollo-web` | Desarrollo web en Alicante y aplicaciones web \| Terreta | Páginas web profesionales y aplicaciones web con Angular: contenido claro, diseño responsive y conexión con tu negocio. Cuéntanos qué necesitas desarrollar. |
| `/desarrollo-aplicaciones-moviles` | Desarrollo de apps móviles para iOS y Android \| Terreta | Aplicaciones móviles para clientes y equipos: definimos flujos, conexión con tu software y una primera versión útil. Desarrollo de apps desde Alicante. |
| `/inteligencia-artificial-empresas` | Inteligencia artificial para empresas y pymes \| Terreta | Evalúa asistentes internos, clasificación de documentos y automatización con IA. Integramos inteligencia artificial con tus procesos y supervisión del equipo. |

## 9. Datos estructurados

- Organization y WebSite reutilizan IDs estables del dominio. Solo se utiliza ubicación Alicante, España, y los datos de contacto existentes.
- WebPage representa la URL canónica de cada página indexable.
- BreadcrumbList conserva jerarquía de Productos → Elite Coach y añade Inicio → Servicios → servicio. Las nuevas landings incluyen las migas visibles.
- Service describe cada landing y conserva las seis entidades del catálogo de Servicios. No se añaden ofertas, precios ni valoraciones al schema.
- FAQPage se genera a partir de los mismos datos que el contenido visible: cinco nuevas landings y nueve páginas existentes. Las preguntas no se repiten entre URLs.
- No se añade LocalBusiness: no hay información física empresarial suficientemente verificada para ampliar el marcado. No se inventan dirección, teléfono o coordenadas.
- No se promete un resultado enriquecido por usar JSON-LD. FAQPage describe preguntas/respuestas según [Schema.org](https://schema.org/FAQPage); la sintaxis válida no garantiza una presentación concreta en Google.

## 10. Enlazado interno

- Home → las cinco landings mediante texto descriptivo. Se mantienen las tarjetas que llevan a los bloques existentes de Servicios.
- Servicios → detalle de cada servicio, junto a ejemplos y CTAs existentes.
- Productos → software a medida, automatización y apps móviles; se conservan catálogo y demos.
- Software → móvil y automatización; automatización → IA y software; web → software y automatización; móvil → software y web; IA → automatización y software.
- Landings → metodología, referencia existente relevante y contacto. Los enlaces a productos describen capacidades publicadas, sin atribuirles nuevas tecnologías o resultados.
- No se cambia ninguna URL existente. No hacen falta redirecciones de ruta; se mantiene el ancla histórica de Productos.

## 11. Rendimiento y Core Web Vitals

- Se conserva SSG: los 17 documentos contienen texto, metadatos, H1, enlaces y JSON-LD antes de ejecutar JavaScript. Arquitectura acorde con [prerender estático de Angular](https://angular.dev/guide/ssr).
- Contenido largo de servicios en chunk diferido mediante resolver. Las FAQs usan HTML nativo, sin librería de acordeones ni dependencias nuevas. Los componentes de página siguen siendo lazy.
- Caché de recursos versionados conforme a [configuración de Hosting](https://firebase.google.com/docs/hosting/full-config). Los assets sin hash no reciben immutable para permitir actualizaciones. La configuración dinámica se revalida.
- Se conservan dimensiones, ALT, WebP, carga diferida bajo el primer pantallazo y prioridad de la imagen principal. No se añaden imágenes decorativas, fuentes remotas ni preloads indiscriminados.
- Las mediciones locales de Chrome se guardan con su entorno en `docs/seo/browser-check.json`. Son muestras sin limitación de CPU/red y no equivalen a CrUX ni prueban cumplimiento en producción. La primera ejecución registró LCP de Home de 8.348 ms: no se presenta como mejora ni se descarta como una medición de campo.
- INP real queda pendiente de usuarios reales. Objetivos de referencia al percentil 75: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1; deben medirse tras publicar, según [Web Vitals](https://web.dev/articles/vitals).

## 12. Páginas nuevas

Solo cinco páginas, con contenido distinto, explicación de problemas, beneficios, metodología, tecnologías, referencias, cuatro FAQs por servicio y CTA:

- `/desarrollo-software-a-medida`: herramientas propias, permisos, integración CRM, coste y planificación.
- `/automatizacion-pymes`: reglas, excepciones, selección de tareas, supervisión y medición del proceso.
- `/desarrollo-web`: diferencias entre web corporativa y aplicación, Angular, indexabilidad y contacto.
- `/desarrollo-aplicaciones-moviles`: iOS/Android, uso móvil, Ionic como opción técnica, conexión y publicación.
- `/inteligencia-artificial-empresas`: selección de caso de uso, fuentes, evaluación, revisión humana y costes.

No se han creado casos de éxito, clientes, estadísticas ni landings locales repetidas. Las referencias son productos ya presentes en la web; no se afirma que utilicen una tecnología no documentada.

## 13. Sitemap final y robots

Sitemap: https://www.realterretaia.com/sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.realterretaia.com/</loc></url>
  <url><loc>https://www.realterretaia.com/servicios</loc></url>
  <url><loc>https://www.realterretaia.com/tarifas</loc></url>
  <url><loc>https://www.realterretaia.com/outsourcing</loc></url>
  <url><loc>https://www.realterretaia.com/productos</loc></url>
  <url><loc>https://www.realterretaia.com/aplicaciones/fitness-app</loc></url>
  <url><loc>https://www.realterretaia.com/como-trabajamos</loc></url>
  <url><loc>https://www.realterretaia.com/nosotros</loc></url>
  <url><loc>https://www.realterretaia.com/contacto</loc></url>
  <url><loc>https://www.realterretaia.com/privacy-policy</loc></url>
  <url><loc>https://www.realterretaia.com/trabajar-con-nosotros</loc></url>
  <url><loc>https://www.realterretaia.com/cursos</loc></url>
  <url><loc>https://www.realterretaia.com/desarrollo-software-a-medida</loc></url>
  <url><loc>https://www.realterretaia.com/automatizacion-pymes</loc></url>
  <url><loc>https://www.realterretaia.com/desarrollo-web</loc></url>
  <url><loc>https://www.realterretaia.com/desarrollo-aplicaciones-moviles</loc></url>
  <url><loc>https://www.realterretaia.com/inteligencia-artificial-empresas</loc></url>
</urlset>
```

Robots conservado:

```text
User-agent: *
Allow: /

Sitemap: https://www.realterretaia.com/sitemap.xml
```

Todas las entradas son canónicas HTTPS/www e indexables. Se excluyen 404 y URLs desconocidas. No se inventa lastmod. Privacidad sigue indexable como en la configuración anterior; no compite deliberadamente con servicios.

## 14. Acciones externas del propietario

1. Publicar el build validado en Firebase Hosting y comprobar las cinco URLs por acceso directo. Repetir status HTTP, canonical, sitemap, robots y 404 en el dominio público. Esta entrega no modifica DNS ni cuentas externas.
2. En los dominios de Firebase, configurar `realterretaia.com` para redirigir permanentemente a `www.realterretaia.com`, conservando rutas y parámetros. Revisar también `/servicios/`, `/servicios/index.html` y las URLs de alojamiento alternativas. Las [señales de canonicalización](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) deben ser coherentes.
3. Google Search Console: verificar la propiedad del dominio, enviar sitemap y revisar las 17 URLs. Inspeccionar Home, Servicios y las cinco nuevas páginas; solicitar indexación después de publicar y revisar exclusiones/canónicas seleccionadas por Google.
4. Google Business Profile: comprobar elegibilidad antes de crear o actualizar la ficha; una empresa exclusivamente online puede no ser elegible. Usar únicamente datos reales, modalidad de atención y zona de servicio justificables. No inventar oficina ni crear fichas duplicadas. Consultar [requisitos de Google](https://support.google.com/business/answer/13763036?hl=es).
5. Autoridad: buscar menciones editoriales y colaboraciones reales con asociaciones, proveedores y medios locales de Alicante. Seleccionar directorios empresariales relevantes y de calidad, con datos coherentes. No comprar ni generar enlaces masivos.
6. Medición: separar búsquedas de marca, servicios y Alicante en Search Console. Comparar clics, impresiones, CTR y conversiones en periodos equivalentes. Revisar si Home/Servicios/landings compiten por las mismas consultas y ajustar intención según evidencia.
7. Google Analytics, si se decide utilizar: confirmar propiedad, identificador y configuración de consentimiento antes de integrarlo. Medir envío confirmado del formulario y contactos, sin enviar datos personales. No se ha añadido un ID inventado ni seguimiento externo.
8. Tras publicar, medir PageSpeed Insights/CrUX y revisar Core Web Vitals en Search Console. Investigar especialmente LCP de Home en condiciones repetibles; no inferir INP de una simple carga de página.
9. Verificar marcado con Schema Markup Validator y las funciones compatibles de Rich Results Test. La validación local comprueba estructura y correspondencia con HTML, no resultados de Google.
10. Confirmar la afirmación preexistente de partner de Google; mantener calendario y condiciones del curso actualizados. Publicar nuevos casos de éxito solo con datos y autorización reales.

## Validación y límites de la entrega

- `npm install`: correcto, sin cambios de dependencias ni lockfile. npm avisa de scripts de instalación pendientes de aprobación; no fue necesario autorizarlos para build/tests.
- El build se abortó dentro del sandbox con código 134; ejecutado con autorización fuera del sandbox pudo generar las 17 rutas. No se cambió la arquitectura para ocultar ese fallo del entorno.
- Resultados finales de build, tests y navegador: ver el bloque de validación final que sigue.
- No se han enviado formularios, solicitado indexación ni creado perfiles empresariales. No hay datos de posiciones, tráfico o conversiones con los que cuantificar una mejora orgánica.
- No se garantiza ninguna posición en Google. El resultado es una base editorial y técnica verificable, pendiente de publicación y seguimiento de campo.

### Validación final

| Comprobación | Resultado |
|---|---|
| `npm install` | Correcto; sin actualización de dependencias |
| `npm run build -- --configuration production` | Correcto; 17 rutas prerenderizadas |
| `npm test -- --watch=false` | 49 pruebas correctas en 15 archivos |
| `node --test scripts/seo-html.test.mjs` | 8 comprobaciones correctas sobre los HTML generados |
| `node scripts/seo-browser-check.mjs` | 15 combinaciones de página/viewport; navegación Angular, FAQs y salto al contenido correctos |
| `git diff --check` | Correcto |

Bundle inicial final: **348,80 kB**, transferencia estimada **97,00 kB**, por debajo del presupuesto de advertencia de 500 kB. Separar el contenido largo en un chunk diferido redujo el inicial de esta implementación de 358,79 a 348,80 kB; no se presenta como reducción respecto al repositorio original. El informe histórico de septiembre 13 registraba 335,19 kB, una referencia anterior que no sustituye una comparación del mismo estado inicial.

La prueba de navegación completa superó el límite original de 5 segundos al ejecutarse junto al build. Se ajustó solo esa prueba a 15 segundos y se repitió correctamente. No se eliminaron aserciones.

En la comprobación final de Chrome no se detectaron excepciones de JavaScript ni desbordamiento horizontal a 390/1440 px. Se revisaron visualmente capturas de las nuevas landings en ambos tamaños. Las pruebas también verificaron navegación por enlaces entre tres servicios y apertura de las FAQs tras hidratación.

| URL | Ancho | LCP local (ms) | CLS local |
|---|---:|---:|---:|
| `/` | 390 | 980 | 0 |
| `/servicios` | 390 | 276 | 0 |
| `/servicios` | 1440 | 296 | 0 |
| `/productos` | 390 | 236 | 0 |
| `/cursos` | 390 | 148 | 0 |
| `/desarrollo-software-a-medida` | 390 | 176 | 0 |
| `/desarrollo-software-a-medida` | 1440 | 128 | 0 |
| `/automatizacion-pymes` | 390 | 168 | 0 |
| `/automatizacion-pymes` | 1440 | 116 | 0 |
| `/desarrollo-web` | 390 | 112 | 0 |
| `/desarrollo-web` | 1440 | 96 | 0 |
| `/desarrollo-aplicaciones-moviles` | 390 | 108 | 0 |
| `/desarrollo-aplicaciones-moviles` | 1440 | 112 | 0 |
| `/inteligencia-artificial-empresas` | 390 | 180 | 0 |
| `/inteligencia-artificial-empresas` | 1440 | 104 | 0 |

La segunda muestra de Home (980 ms) es muy distinta de la primera (8.348 ms); esa variabilidad impide atribuir una mejora de LCP al cambio. Es necesario medir producción con condiciones repetibles y datos de usuarios. INP no se ha medido en campo.

**Estado de publicación:** cambios implementados y validados en el workspace; no se ha realizado commit, push ni despliegue en esta tarea. La configuración de caché y las nuevas URLs estarán disponibles públicamente después de desplegar Hosting.
