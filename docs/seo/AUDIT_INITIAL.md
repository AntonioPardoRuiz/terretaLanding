# Auditoría inicial · SEO sobre la web existente

13 de septiembre de 2026. Sustituye el planteamiento anterior de nuevas landings.
El inventario completo por URL, con title, description, headings, primer texto,
anchors, imágenes/alt/dimensiones, canonical, Open Graph y JSON-LD, está en `before.json`.
Se han auditado las 12 rutas públicas, incluidas las ocho requeridas.

| Página | Contenido suficiente / repetición / oportunidad concreta |
|---|---|
| Home | Propuesta clara pero genérica; H1 sin desarrollo ni aplicaciones. Primer párrafo sin Alicante o páginas web. Cinco tarjetas apuntan al mismo catálogo sin sección. |
| Servicios | Bloques útiles; software a medida y aplicaciones web comparten bloque. Falta distinguir páginas web corporativas de aplicaciones. No enlaza casos del catálogo. |
| Productos | Capacidades concretas confirmadas; mantenerlas. H1 muy genérico. Falta enlace contextual a Servicios. Enlaces de índice relativos al fragmento pueden volver a Inicio. |
| Elite Coach | Contenido amplio y específico: no reescribir. H1 sin nombre del producto, enlace a funcionalidades con fragmento relativo y ausencia de datos estructurados. |
| Cómo trabajamos | Seis fases suficientes; primer párrafo no menciona desarrollo de software. No ampliar con texto repetido de Servicios. |
| Nosotros | Alicante ya aparece; reforzar identidad de empresa de desarrollo. Capacidad y valores se conservan. |
| Contacto | Formulario y ubicación suficientes para intención transaccional. Mejorar description local y ayuda inicial del proyecto. |
| Privacidad | Contenido legal; sin objetivo comercial. Corregir solo navegación a secciones. |
| Tarifas / Outsourcing | Intenciones diferenciadas, precios y alcance existentes: conservar. Revisar metadatos globales. |
| Cursos / Candidaturas | Intenciones independientes: conservar contenido. Logo Power BI de 797.110 bytes mostrado a 112 px: sobredimensionado. |

## SEO técnico inicial

- 12 rutas prerenderizadas, componentes lazy y HTML accesible sin JavaScript.
- Titles únicos, canonical del dominio www, robots y sitemap correctos. Sin `lastmod` inexactos.
- Open Graph existe; páginas sin imagen configurada pierden imagen social al navegar.
- No existe JSON-LD. Canonical de respaldo no elimina fragmentos. Sin pruebas integrales del HTML final.
- El contenedor principal contiene otros `<main>` en varias páginas; corregir semántica sin afectar estilos.
- La navegación de salto al contenido y algunos índices usan `href="#..."` bajo `<base href="/">`.
- Fuentes del sistema; Elite Coach WebP de 39.390 bytes con dimensiones. Vídeos solo se insertan al pulsar. Mantener.
- Bundle inicial anterior: 331,80 kB, estimación comprimida 91,89 kB. No hay datos de campo de LCP/CLS/INP ni de posiciones en Google.
- Afirmación preexistente de partner Google: no ampliarla ni incluirla en schema sin evidencia documental.

## Dominio y despliegue

La comprobación previa de migración queda en `firebase-migration-check.json`:
www apunta por CNAME a Firebase, HTTPS correcto, projectId terreta-web-prod y HTML
idéntico al hosting Firebase. El dominio raíz también entrega el mismo sitio con
canonical www, sin redirección. Posible consolidación futura del raíz mediante 301
con configuración de dominio; no cambiar DNS en esta misión.
La instrucción actual prevalece: NO desplegar, aunque la migración esté comprobada.
