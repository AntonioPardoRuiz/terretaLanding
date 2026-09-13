# Misión 011 · SEO antes/después sobre las páginas existentes

Fecha: 13 de septiembre de 2026.
Alcance vigente: optimizar lo existente, conservar diseño, no crear landings ni desplegar.
Rama solicitada: `mission/011-seo-existing-content`.

## Resultado y validación

- Mismas 12 rutas indexables y prerenderizadas. Sin nuevas URLs SEO.
- Titles y descriptions únicos; un H1 y un landmark principal por página.
- Canonicals y Open Graph siempre con `https://www.realterretaia.com`; los parámetros y fragmentos no modifican el canonical.
- Sitemap y robots ya eran correctos: se conservan y quedan cubiertos por pruebas. No se añade `lastmod` que no pueda mantenerse con precisión.
- La 404 estática conserva `noindex` y no hay rewrite global hacia Home. Al navegar a una URL desconocida también se eliminan canonical y JSON-LD de la página anterior.
- Build: `npm run build -- --no-progress` correcto, 12 rutas prerenderizadas.
- Tests: `npm test -- --watch=false`: 46 pruebas en 15 archivos. `node --test scripts/seo-html.test.mjs`: 6 comprobaciones integrales del build.
- Bundle inicial: 335,19 kB, estimación transferida 92,74 kB. Antes: 331,80 kB / 91,89 kB. Incremento de 3,39 kB sin comprimir por la infraestructura SEO y semántica; dentro del presupuesto vigente de 500 kB.
- No hay cambios de dependencias, precios, formularios de negocio ni datos de clientes.
- No se despliega. El flujo Git se completa con commit, push de rama, merge local y push de main; ver la entrega para el hash y estado final.

Inventarios completos reproducibles: [antes](before.json), [después](after.json).
[Mapa keyword → URL](KEYWORD_MAP.md) · [Auditoría inicial](AUDIT_INITIAL.md) · [Seguimiento](FOLLOW_UP.md).

## Comparativa por URL

### `/`

Intención principal: **desarrollo de software para empresas; prioridad local Alicante**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Terreta \| Software, Automatización e IA para Empresas | Desarrollo de software para empresas en Alicante \| Terreta |
| Meta description | Desarrollamos software a medida, aplicaciones web, apps móviles, automatizaciones e inteligencia artificial para empresas que quieren crecer con tecnología clara, moderna y útil. | Desarrollamos software para empresas desde Alicante: aplicaciones web y móviles, automatización e IA. Conoce nuestros productos y cuéntanos tu proyecto. |
| H1 | Software, automatización e IA para hacer crecer empresas. | Desarrollamos software para impulsar tu empresa. |
| Primer texto | En Terreta diseñamos y desarrollamos aplicaciones web, apps móviles, plataformas digitales y soluciones con IA para empresas que necesitan tecnología clara, útil y bien ejecutada. | Desde Alicante, creamos software a medida y aplicaciones web y móviles para empresas. Desarrollamos tu página web, conectamos procesos con automatizaciones e integramos inteligencia artificial cuando aporta una solución útil a tu negocio. |
| Canonical | https://www.realterretaia.com/ | https://www.realterretaia.com/ |

Se mantiene la composición visual. H1 centrado en desarrollo; primer párrafo sitúa Alicante e introduce aplicaciones, web, automatización e IA sin una lista de palabras clave. Tarjetas enlazan a secciones reales de Servicios.

Encabezados ajustados: H2: Software a medida, automatización e IA con sentido de negocio.

Enlaces añadidos o corregidos:

- Aplicaciones WebPlataformas internas, portales de clientes, sistemas de reservas, dashboards y herramientas de gestión.Desarrollo de aplicaciones web → → `/servicios#software-a-medida`.
- Apps MóvilesAplicaciones para iOS y Android orientadas a clientes, equipos internos, comunidades o nuevos modelos de negocio.Desarrollo de apps móviles → → `/servicios#aplicaciones-moviles`.
- AutomatizacionesFlujos conectados entre formularios, CRM, email, WhatsApp, hojas de cálculo, bases de datos y herramientas empresariales.Automatización de procesos → → `/servicios#automatizacion`.
- Inteligencia ArtificialChatbots, asistentes internos, análisis de datos, generación de contenido y procesos inteligentes personalizados.IA para empresas → → `/servicios#inteligencia-artificial`.
- Soporte y evoluciónMantenimiento, mejoras y acompañamiento para que cada solución siga respondiendo a las necesidades del negocio.Mantenimiento de software → → `/servicios#soporte`.

### `/servicios`

Intención principal: **software a medida y desarrollo de aplicaciones**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Servicios Digitales \| Apps, Automatización e IA \| Terreta | Software a medida, aplicaciones y desarrollo web \| Terreta |
| Meta description | Soluciones web, móviles, automatizaciones e inteligencia artificial adaptadas a las necesidades reales de cada empresa. | Software a medida, aplicaciones web y móviles, páginas web, automatización e IA para empresas. Desde Alicante, te ayudamos a definir la solución que necesitas. |
| H1 | Servicios tecnológicos a medida para empresas que quieren avanzar de verdad | Software a medida, aplicaciones y soluciones para tu empresa |
| Primer texto | Desarrollamos soluciones web, móviles, automatizaciones e integraciones con inteligencia artificial para empresas que necesitan digitalizar procesos, lanzar productos o mejorar herramientas internas con claridad, control y flexibilidad. | Desde Alicante, desarrollamos software a medida, aplicaciones y páginas web para empresas. Automatizamos procesos e integramos inteligencia artificial según la necesidad del negocio, con alcance definido y seguimiento del proyecto. |
| Canonical | https://www.realterretaia.com/servicios | https://www.realterretaia.com/servicios |

Se conserva la lista de bloques y su diseño. Se aclara cuándo usar software a medida o una aplicación web; se añade dentro de esa lista un bloque de web corporativa con el mismo componente visual. Automatización explica reglas y excepciones; IA describe evaluación y revisión humana. H2 para cada servicio y H3 para sus detalles. Se enlazan casos del catálogo sin atribuirles IA ni funciones nuevas.

Encabezados ajustados: H2: Desarrollo de software a medida y aplicaciones web; H3: Qué incluye; H2: Desarrollo de aplicaciones móviles; H3: Qué incluye; H2: Desarrollo web y páginas web para empresas; H3: Qué incluye; H2: Automatización de procesos; H3: Qué incluye; H2: Inteligencia artificial para empresas; H3: Qué incluye; H2: Soporte, mantenimiento y evolución; H3: Qué incluye.

Enlaces añadidos o corregidos:

- Ver TerretaAgro: gestión agrícola, almacenes y transporte → → `/productos#terreta-agro`.
- Conocer Elite Coach, una aplicación para el sector fitness → → `/productos#elite-coach`.
- Ver el proyecto Jessica Castejón Psicología → → `/productos#psicologia`.
- Quiero valorar la web de mi empresa → `/contacto`.
- Ver ContaTerra y su enfoque de gestión empresarial → → `/productos#conta-terra`.
- Explorar los productos de software de Terreta → → `/productos#software-sectorial`.
- Conocer el catálogo de productos desarrollados → → `/productos#software-sectorial`.

### `/tarifas`

Intención principal: **presupuesto de software personalizado**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Tarifas \| Presupuesto sin compromiso \| Terreta | Tarifas \| Presupuesto sin compromiso \| Terreta |
| Meta description | Cuéntanos qué necesitas realizar a través de nuestro formulario de contacto y te enviaremos un presupuesto personalizado sin ningún compromiso. | Cuéntanos qué necesitas realizar a través de nuestro formulario de contacto y te enviaremos un presupuesto personalizado sin ningún compromiso. |
| H1 | Un presupuesto a medida de lo que necesitas | Un presupuesto a medida de lo que necesitas |
| Primer texto | Cada proyecto tiene sus propias necesidades. Por eso, nuestras tarifas se adaptan al alcance y a las características del trabajo que quieres realizar. | Cada proyecto tiene sus propias necesidades. Por eso, nuestras tarifas se adaptan al alcance y a las características del trabajo que quieres realizar. |
| Canonical | https://www.realterretaia.com/tarifas | https://www.realterretaia.com/tarifas |

Contenido, title, description y presupuesto conservados. Mejoras comunes de metadatos, datos estructurados y landmark principal.

### `/outsourcing`

Intención principal: **equipo de desarrollo y bolsas de horas**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Outsourcing \| Equipo en España y desarrollo propio \| Terreta | Outsourcing \| Equipo en España y desarrollo propio \| Terreta |
| Meta description | Equipo en España: desarrollamos sin externalizar ni subcontratar a terceros. Bolsas desde 25 €/h en la de 160 h, sin IVA. Presupuesto sin compromiso. | Equipo en España: desarrollamos sin externalizar ni subcontratar a terceros. Bolsas desde 25 €/h en la de 160 h, sin IVA. Presupuesto sin compromiso. |
| H1 | Amplía tu equipo con tarifas pensadas para empezar | Amplía tu equipo con tarifas pensadas para empezar |
| Primer texto | Externaliza el desarrollo de software, las automatizaciones o las mejoras de tus aplicaciones con Terreta. Nos adaptamos a tu proyecto y a las horas de trabajo que necesitas. | Externaliza el desarrollo de software, las automatizaciones o las mejoras de tus aplicaciones con Terreta. Nos adaptamos a tu proyecto y a las horas de trabajo que necesitas. |
| Canonical | https://www.realterretaia.com/outsourcing | https://www.realterretaia.com/outsourcing |

Se conservan precios, condiciones y propuesta del equipo en España. Mejoras técnicas comunes y landmark principal.

### `/productos`

Intención principal: **productos y soluciones de software empresarial**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Productos digitales desarrollados por Terreta | Productos y soluciones de software empresarial \| Terreta |
| Meta description | Descubre el catálogo de software de Terreta: soluciones para fitness, agricultura, contabilidad, sector ferroviario y servicios profesionales. | Conoce Elite Coach, TerretaAgro, ContaTerra y TerretaRail: productos de software de Terreta, junto a proyectos reales para servicios profesionales. |
| H1 | Software creado para problemas reales. | Productos de software para problemas reales. |
| Primer texto | Terreta no desarrolla software genérico. Analizamos procesos y construimos soluciones digitales adaptadas a problemas reales de negocio, desde el fitness hasta la agricultura, la contabilidad, el ferrocarril, la gestión de clientes y los servicios profesionales. | Terreta no desarrolla software genérico. Analizamos procesos y construimos soluciones digitales adaptadas a problemas reales de negocio, desde el fitness hasta la agricultura, la contabilidad, el ferrocarril, la gestión de clientes y los servicios profesionales. |
| Canonical | https://www.realterretaia.com/productos | https://www.realterretaia.com/productos |

Se conserva el catálogo y las capacidades confirmadas de Elite Coach, TerretaAgro, ContaTerra, TerretaRail y Jessica Castejón Psicología. H1 más específico, enlaces de índice corregidos y enlace contextual a Servicios en el cierre.

Enlaces añadidos o corregidos:

- Fitness → `/productos#elite-coach`.
- Software sectorial → `/productos#software-sectorial`.
- Digitalización → `/productos#psicologia`.
- CRM → `/productos#crm`.
- servicios de desarrollo de software a medida → `/servicios`.

### `/aplicaciones/fitness-app`

Intención principal: **Elite Coach para entrenadores y gimnasios**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Elite Coach App \| Aplicación Fitness Desarrollada por Terreta | Elite Coach \| App para entrenadores y gimnasios \| Terreta |
| Meta description | Elite Coach organiza rutinas, seguimiento, nutrición y clientes en una plataforma para entrenadores y gimnasios desarrollada por Terreta. | Descubre Elite Coach: rutinas, clientes, seguimiento y nutrición para entrenadores y gimnasios. Conoce esta aplicación desarrollada por Terreta. |
| H1 | La app que profesionaliza tu negocio fitness | Elite Coach, la app para tu negocio fitness |
| Primer texto | Organiza rutinas, seguimiento, nutrición y clientes en una sola plataforma diseñada para entrenadores y gimnasios. | Organiza rutinas, seguimiento, nutrición y clientes en una sola plataforma diseñada para entrenadores y gimnasios. |
| Canonical | https://www.realterretaia.com/aplicaciones/fitness-app | https://www.realterretaia.com/aplicaciones/fitness-app |

Se conserva producto, funcionalidades y seis vídeos. H1 incluye Elite Coach; el enlace a funcionalidades usa la ruta correcta.

Enlaces añadidos o corregidos:

- Descubrir el producto ↓ → `/aplicaciones/fitness-app#funcionalidades`.

### `/como-trabajamos`

Intención principal: **proceso de desarrollo de software**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Cómo Trabajamos \| Desarrollo de Software \| Terreta | Proceso de desarrollo de software \| Cómo trabaja Terreta |
| Meta description | Conoce cómo organizamos proyectos de software en Terreta: planificación, hitos, desarrollo iterativo, validación y seguimiento continuo. | Así desarrollamos software en Terreta: definición de alcance, planificación, diseño, desarrollo y validación por hitos, con soporte y evolución del proyecto. |
| H1 | Cómo trabajamos en Terreta | Cómo desarrollamos tu software en Terreta |
| Primer texto | Trabajamos con una metodología que combina planificación, flexibilidad y seguimiento continuo para que cada proyecto avance con orden, visibilidad y foco en resultados. | Organizamos el desarrollo de software por fases: entendemos tu necesidad, definimos el alcance y validamos cada avance contigo. Combinamos planificación, flexibilidad y seguimiento para que conozcas qué se construye y por qué. |
| Canonical | https://www.realterretaia.com/como-trabajamos | https://www.realterretaia.com/como-trabajamos |

Se conservan seis fases y condiciones. H1 y primer párrafo explican desarrollo y validación de software; anchor de Servicios más descriptivo.

Enlaces añadidos o corregidos:

- Explora nuestros servicios de software y aplicaciones → → `/servicios`.

### `/nosotros`

Intención principal: **Terreta, empresa de software en Alicante**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Sobre Terreta \| Software, Automatización e IA | Terreta \| Empresa de desarrollo de software en Alicante |
| Meta description | Conoce Terreta, empresa de Alicante especializada en software a medida, aplicaciones, automatización e inteligencia artificial para empresas. | Somos Terreta, empresa de Alicante especializada en software para empresas y pymes. Conoce nuestro enfoque, servicios y forma de trabajar contigo. |
| H1 | Tecnología útil, cercana y orientada a negocio | Terreta, software para empresas desde Alicante |
| Primer texto | Somos una empresa de Alicante especializada en diseño y desarrollo de soluciones de software para empresas y pymes. | Somos Terreta, una empresa de desarrollo de software en Alicante. Diseñamos aplicaciones y soluciones para empresas y pymes, desde la definición de lo que necesitan hasta su mantenimiento y evolución. |
| Canonical | https://www.realterretaia.com/nosotros | https://www.realterretaia.com/nosotros |

Se conserva identidad, valores y distribución. H1 y presentación identifican Terreta como empresa de desarrollo en Alicante. Anchor a Servicios más preciso.

Enlaces añadidos o corregidos:

- Explorar nuestros servicios de desarrollo de software → → `/servicios`.

### `/contacto`

Intención principal: **contacto y presupuesto de software en Alicante**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Contacto \| Hablemos de tu Proyecto \| Terreta | Contacto y presupuesto de software en Alicante \| Terreta |
| Meta description | Contacta con Terreta para hablar sobre software a medida, aplicaciones, automatización o inteligencia artificial para tu empresa. | Habla con Terreta, en Alicante, sobre tu software, aplicación o automatización. Cuéntanos qué necesitas y solicita un presupuesto personalizado sin compromiso. |
| H1 | Hablemos de tu proyecto | Hablemos de tu proyecto de software |
| Primer texto | Cuéntanos si necesitas desarrollar una aplicación, automatizar un proceso o aplicar inteligencia artificial en tu empresa. | Habla con nuestro equipo en Alicante sobre el software, la aplicación o el proceso que necesitas mejorar. Cuéntanos quién lo utilizará y qué herramientas tienes ya en marcha. |
| Canonical | https://www.realterretaia.com/contacto | https://www.realterretaia.com/contacto |

Se conserva el formulario. H1 y texto inicial explicitan software, equipo en Alicante y la información útil para solicitar presupuesto.

Enlaces añadidos o corregidos:

- Consultar servicios de desarrollo → → `/servicios`.

### `/privacy-policy`

Intención principal: **información legal, sin objetivo comercial**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Política de Privacidad \| Terreta | Política de Privacidad \| Terreta |
| Meta description | Consulta la política de privacidad y protección de datos personales del sitio web de Terreta. | Consulta la política de privacidad y protección de datos personales del sitio web de Terreta. |
| H1 | Política de privacidad | Política de privacidad |
| Primer texto | Información sobre el tratamiento y la protección de datos personales en Terreta. | Información sobre el tratamiento y la protección de datos personales en Terreta. |
| Canonical | https://www.realterretaia.com/privacy-policy | https://www.realterretaia.com/privacy-policy |

Solo navegación de fragmentos y mejoras SEO técnicas comunes. Texto jurídico, title, description e intención conservados; no se añaden keywords comerciales.

Enlaces añadidos o corregidos:

- Introducción → `/privacy-policy#introduccion`.
- Información recopilada → `/privacy-policy#datos`.
- Uso de la información → `/privacy-policy#uso`.
- Divulgación → `/privacy-policy#divulgacion`.
- Seguridad → `/privacy-policy#seguridad`.
- Derechos → `/privacy-policy#derechos`.
- Cambios → `/privacy-policy#cambios`.
- Contacto → `/privacy-policy#contacto-legal`.
- Candidaturas → `/privacy-policy#candidaturas`.
- Cursos → `/privacy-policy#cursos`.

### `/trabajar-con-nosotros`

Intención principal: **trabajar en Terreta**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Trabajar con nosotros \| Envía tu CV \| Terreta | Trabajar con nosotros \| Envía tu CV \| Terreta |
| Meta description | Conoce Terreta y envíanos tu candidatura. Buscamos conocer talento en desarrollo de software, automatización, inteligencia artificial y diseño. | Conoce Terreta y envíanos tu candidatura. Buscamos conocer talento en desarrollo de software, automatización, inteligencia artificial y diseño. |
| H1 | Trabajar con nosotros | Trabajar con nosotros |
| Primer texto | Nos interesa conocer a personas con ganas de crear software útil. Cuéntanos qué sabes hacer, qué te gustaría aprender y cómo te gustaría aportar. | Nos interesa conocer a personas con ganas de crear software útil. Cuéntanos qué sabes hacer, qué te gustaría aprender y cómo te gustaría aportar. |
| Canonical | https://www.realterretaia.com/trabajar-con-nosotros | https://www.realterretaia.com/trabajar-con-nosotros |

Se mantienen contenido, metadatos específicos y formulario con CV. Se incorpora la infraestructura SEO común.

### `/cursos`

Intención principal: **curso Power BI para principiantes**.

| Elemento | Antes | Después |
|---|---|---|
| Title | Cursos \| Power BI para principiantes \| Terreta | Cursos \| Power BI para principiantes \| Terreta |
| Meta description | Curso principiante en Power BI desde el 1 de noviembre de 2026: 10 horas, 30 plazas y formación desde la instalación hasta las métricas y la publicación. | Curso principiante en Power BI desde el 1 de noviembre de 2026: 10 horas, 30 plazas y formación desde la instalación hasta las métricas y la publicación. |
| H1 | Cursos | Cursos |
| Primer texto | Da el primer paso para aprender nuevas herramientas. Descubre nuestro primer curso. | Da el primer paso para aprender nuevas herramientas. Descubre nuestro primer curso. |
| Canonical | https://www.realterretaia.com/cursos | https://www.realterretaia.com/cursos |

Se conservan título, temario, cuatro tramos, turnos y formulario. Se optimiza únicamente el recurso de Power BI mostrado, manteniendo el aspecto.

## Datos estructurados y metadatos sociales

Antes no había JSON-LD. Ahora se genera un único grafo por ruta, tanto en el HTML
prerenderizado como tras navegar: Organization, WebSite, WebPage y BreadcrumbList
(excepto Home, sin breadcrumb), más seis Service en Servicios. Los nombres y destinos
de esos servicios coinciden con los bloques visibles. La ubicación se limita a
«Alicante, España», sin dirección postal inventada.

Se evalúa SoftwareApplication para Elite Coach y se pospone por falta de datos
verificados suficientes para el resultado enriquecido de aplicaciones. No se añaden
precios, reseñas, ratings ni datos ficticios. Los productos siguen sirviendo como
prueba de experiencia mediante texto y enlaces reales.

Se comprueba JSON válido, identificadores únicos, URLs canónicas, breadcrumbs ordenados,
concordancia con contenido visible y ausencia de atributos comerciales no verificados.
No se presenta esto como una validación de Rich Results Test ni como garantía de
resultados enriquecidos. Fuentes y comprobación futura en [FOLLOW_UP.md](FOLLOW_UP.md).

Open Graph conserva el título y descripción de cada página y añade site_name, locale,
imagen de respaldo y alt. Twitter recibe título, descripción e imagen consistentes.
No quedan imágenes de la página anterior al navegar entre Elite Coach y otras rutas.

## Enlazado y semántica

Home → Servicios por cinco fragmentos descriptivos; Home → Productos conservado.
Servicios → productos relevantes; Productos → Servicios y Contacto.
Cómo trabajamos y Nosotros → Servicios con anchors descriptivos.
Se conservan CTAs comerciales hacia Contacto en todas las páginas de negocio.
Los índices de Productos, Elite Coach y Privacidad usan ruta explícita más fragmento;
el salto accesible al contenido mantiene la URL y mueve el foco al contenido principal.

Alicante aparece naturalmente en los primeros textos de Home, Servicios, Nosotros y
Contacto. No se repite en cada bloque ni se generan páginas de ciudades.

## Imágenes y performance

- Power BI: PNG de 797.110 bytes → WebP de 9.376 bytes (−98,8 %). Dibujo y transparencia conservados; 168 × 224 píxeles bastan para su presentación a doble densidad. Originales conservados como fuentes.
- Elite Coach mantiene su WebP de 39.390 bytes; alt de la tarjeta de Home corregido para describir la pantalla real. El recurso de Productos se carga de forma diferida por estar fuera del primer bloque.
- Todas las imágenes locales tienen alt y dimensiones explícitas. Se mantienen eager/fetchpriority en imágenes principales de Home y Elite Coach. No se añaden fuentes remotas ni preloads sin evidencia.
- Los vídeos conservan las miniaturas lazy y cargan iframe solo al pulsar. Los componentes siguen siendo lazy.
- No se afirma cumplimiento de Core Web Vitals con una prueba de laboratorio. Las métricas locales y comprobaciones de navegador se documentan en [browser-check.json](browser-check.json); LCP/CLS de campo y rendimiento SEO requieren medición posterior a la publicación.

## Comprobación en Chrome local

Build servido únicamente en localhost, Chrome headless sin limitación de CPU/red.
Cinco muestras aisladas; no son percentiles de usuarios reales ni resultados de PageSpeed Insights.

| Página | Ancho | LCP observado | CLS observado |
|---|---:|---:|---:|
| `/` | 390 px | 768 ms | 0 |
| `/servicios` | 390 px | 152 ms | 0 |
| `/servicios` | 1440 px | 168 ms | 0 |
| `/productos` | 390 px | 120 ms | 0 |
| `/cursos` | 390 px | 96 ms | 0 |

Sin desbordamientos horizontales en las cinco vistas ni excepciones de JavaScript.
Navegación Home → Servicios actualiza title, canonical y seis entidades Service.
El salto al contenido mueve el foco correctamente. Capturas de Home móvil y Servicios
escritorio revisadas visualmente; se conserva la composición y el estilo existentes.

## Recomendaciones futuras

Tras publicación autorizada, verificar Search Console, enviar el sitemap e inspeccionar
las URLs actuales. Comparar consultas de marca/no marca y CTR por página. Mejorar
primero los bloques existentes según consultas reales, antes de proponer nuevas URLs.
Revisar la consolidación raíz → www mediante redirección permanente y documentar la
afirmación de partner Google antes de ampliar su uso. No se modifica DNS ni se solicita
indexación en esta misión. No se garantizan posiciones.
