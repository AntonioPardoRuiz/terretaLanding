# Medición posterior y decisiones futuras

Esta misión no incluye despliegue. Estos pasos se ejecutarán tras aprobar y publicar
la versión de `main`. No se han enviado formularios, solicitado indexación ni modificado DNS.

## Search Console

1. Acceder con la cuenta de Antonio y comprobar si existe una propiedad del dominio `realterretaia.com`. Si no existe, crearla y verificar el TXT DNS indicado por Google. La propiedad de dominio permite revisar www y raíz conjuntamente. No sustituir registros existentes.
2. En Sitemaps, enviar `https://www.realterretaia.com/sitemap.xml`. Debe contener las 12 URLs públicas actuales.
3. Inspeccionar la Home, Servicios, Productos y Nosotros usando sus URLs www. Tras el despliegue, comprobar la prueba en directo y solicitar indexación si corresponde.
4. Revisar Indexación → Páginas: distinguir URLs excluidas deliberadamente, duplicados con canonical correcto y errores de rastreo. La 404 debe seguir siendo 404, no una Home de respuesta 200.
5. En Rendimiento → Resultados de búsqueda, usar filtro España y comparar periodos equivalentes. Separar consultas de marca de búsquedas de desarrollo y software.
6. Para cada URL, revisar consultas, impresiones, clics, CTR y posición media. No interpretar la posición media como una posición fija para todos los usuarios.
7. Si una página tiene impresiones y CTR bajo, revisar que title y description representen lo que el usuario encuentra. No añadir precios ni promesas inexistentes para atraer clics.
8. Revisar consultas en posiciones medias 5–20 con intención relevante. Mejorar primero el bloque que responde a la consulta y sus enlaces internos.
9. Observar si Home y Servicios aparecen repetidamente para la misma consulta. Ajustar el foco de sus textos según la intención; no crear URLs duplicadas por sinónimos.
10. Solo proponer nuevas páginas si hay una necesidad de contenido diferenciada respaldada por consultas reales. No publicarlas automáticamente.

Search Console permite revisar visibilidad e indexación; no ofrece garantía de una posición.
Fuentes: [introducción oficial](https://support.google.com/webmasters/answer/9128668?hl=es),
[inspección de URLs](https://support.google.com/webmasters/answer/9012289?hl=es).

## Datos estructurados

Se añaden Organization, WebSite, WebPage, Service y BreadcrumbList con datos visibles
confirmados. Se validan sintaxis, relaciones, URLs, ids, orden de breadcrumbs y servicios
contra el HTML generado. Esta validación automatizada no sustituye la herramienta de Google.
Después de publicar, comprobar Home y Servicios en Rich Results Test y el HTML con Schema Markup Validator.

Se ha evaluado SoftwareApplication para Elite Coach, pero se pospone: no hay oferta/precio
ni reseñas verificadas suficientes para completar los requisitos del resultado enriquecido
de aplicaciones de Google. No se inventan esos datos para obtener una validación positiva.
Service describe semánticamente los servicios; no implica un resultado enriquecido específico.
Fuentes: [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization),
[BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb),
[SoftwareApplication](https://developers.google.com/search/docs/appearance/structured-data/software-app).

## Performance y mantenimiento

- Revisar LCP y CLS en PageSpeed Insights y, cuando haya muestra suficiente, en Search Console/CrUX. Conservar por separado los datos de laboratorio y de usuarios reales.
- Referencias de experiencia buena: LCP ≤ 2,5 s, CLS ≤ 0,1 e INP ≤ 200 ms en el percentil 75. La comprobación local no demuestra cumplimiento en producción.
- No cargar vídeo de YouTube antes del clic, no poner lazy loading en la imagen principal de Home/Elite Coach ni añadir preloads indiscriminados.
- Tras cambios, ejecutar build, tests Angular y `node --test scripts/seo-html.test.mjs`; regenerar `after.json` si se actualiza este informe.
- Mantener los originales gráficos como fuentes, pero servir archivos dimensionados para su tamaño real de presentación.
- Considerar redirección permanente del dominio raíz a www desde la configuración de dominio en Firebase. Actualmente ambos sirven el sitio y declaran www como canonical. No se ha cambiado la configuración del dominio.
- Documentar la afirmación preexistente de partner Google antes de ampliar su uso. No se incorpora a schema ni a nuevos argumentos comerciales en esta misión.

Fuente técnica: [Core Web Vitals](https://web.dev/articles/vitals),
[umbrales de PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about).
