import { SERVICE_METADATA } from './service-metadata';
import type { SeoData } from '../../core/seo/seo-data';

export interface ServiceContent {
  slug: string;
  name: string;
  seo: SeoData;
  intro: string;
  problem: string;
  benefits: string[];
  steps: string[];
  technology: string;
  example: { label: string; path: string; fragment?: string; text: string };
  related: { label: string; path: string }[];
}

export const SERVICE_PAGES: ServiceContent[] = [
  {
    ...SERVICE_METADATA[0],
    intro:
      'Cuando las hojas de cálculo y las herramientas genéricas ya no reflejan cómo trabaja tu equipo, una aplicación propia puede ordenar la operativa. En Terreta desarrollamos software empresarial desde Alicante para pymes que necesitan gestionar datos, usuarios y procesos con una lógica específica.',
    problem:
      'Información repartida entre departamentos, tareas duplicadas y permisos poco claros dificultan el seguimiento del negocio. El punto de partida es identificar dónde se pierde información y decidir si basta con integrar lo que ya utilizas o necesitas construir una herramienta propia.',
    benefits: [
      'Centralizar la información y definir una fuente de datos para cada proceso.',
      'Adaptar pantallas y permisos a las responsabilidades de cada usuario.',
      'Conectar operaciones, clientes y seguimiento sin volver a introducir los mismos datos.',
      'Evolucionar por prioridades, con una primera versión útil y un alcance controlado.',
    ],
    steps: [
      'Analizamos usuarios, procesos, datos y sistemas existentes; delimitamos el problema que debe resolver el software.',
      'Diseñamos los flujos y validamos contigo las pantallas y los criterios de aceptación antes de ampliar el desarrollo.',
      'Construimos y probamos por hitos, incluyendo permisos, integraciones y migración cuando forman parte del alcance.',
      'Preparamos la puesta en marcha y acordamos soporte, mantenimiento y siguientes mejoras.',
    ],
    technology:
      'Una aplicación web con Angular permite trabajar desde el navegador. El backend, las APIs y la base de datos se eligen según los requisitos del proyecto. Si el trabajo debe realizarse desde el móvil, valoramos una aplicación específica conectada al mismo sistema.',
    example: {
      label: 'Ver TerretaAgro',
      path: '/productos',
      fragment: 'terreta-agro',
      text: 'El catálogo incluye TerretaAgro, orientado a operaciones agrícolas, almacenes y transporte. Su ficha permite ver un ejemplo de software organizado alrededor de una operativa sectorial.',
    },
    related: [
      { label: 'Aplicaciones móviles para tu equipo', path: '/desarrollo-aplicaciones-moviles' },
      { label: 'Automatización de procesos para pymes', path: '/automatizacion-pymes' },
    ],
  },
  {
    ...SERVICE_METADATA[1],
    intro:
      'Automatizar una pyme empieza por elegir una tarea repetitiva y entender cómo se resuelven sus excepciones. Conectamos herramientas para que la información avance entre sistemas y tu equipo pueda centrarse en el trabajo que necesita criterio humano.',
    problem:
      'Copiar solicitudes del correo al CRM, revisar hojas de cálculo para enviar avisos o preparar el mismo informe cada semana introduce pasos manuales. Antes de automatizarlos, aclaramos qué dispara la tarea, quién la valida y qué debe ocurrir si faltan datos.',
    benefits: [
      'Evitar transcribir datos que ya existen en otra herramienta.',
      'Dar visibilidad al estado de cada solicitud y a las tareas pendientes.',
      'Establecer avisos y controles para detectar fallos de sincronización.',
      'Medir el resultado del flujo y decidir qué proceso abordar después.',
    ],
    steps: [
      'Seleccionamos un proceso por frecuencia, esfuerzo manual y viabilidad de integración.',
      'Documentamos entradas, reglas, excepciones y responsables; definimos cómo medir el resultado.',
      'Conectamos los sistemas y probamos datos incompletos, duplicados y fallos de los proveedores.',
      'Validamos el flujo con el equipo y definimos supervisión y mantenimiento.',
    ],
    technology:
      'Trabajamos con APIs, eventos y conexiones entre formularios, CRM, correo y bases de datos según las posibilidades de cada herramienta. Para sincronizaciones sensibles definimos reintentos, registros de ejecución y validación humana. La IA se valora solo cuando las reglas por sí solas no resuelven la tarea.',
    example: {
      label: 'Conocer Terreta CRM',
      path: '/productos',
      fragment: 'crm',
      text: 'Terreta CRM forma parte del catálogo de productos. Si ya utilizas otro CRM, el análisis de automatización empieza por sus capacidades de integración, sin asumir que debas sustituirlo.',
    },
    related: [
      {
        label: 'Inteligencia artificial aplicada al negocio',
        path: '/inteligencia-artificial-empresas',
      },
      { label: 'Software a medida para procesos propios', path: '/desarrollo-software-a-medida' },
    ],
  },
  {
    ...SERVICE_METADATA[2],
    intro:
      'Una web profesional debe explicar qué ofrece tu empresa y facilitar el siguiente paso. Desarrollamos páginas y aplicaciones web desde Alicante, diferenciando el contenido público que debe encontrarse en buscadores de las funciones que necesitan clientes o equipos internos.',
    problem:
      'Una navegación confusa, una oferta difícil de entender o un formulario desconectado de la gestión comercial pueden frenar el contacto. En aplicaciones de negocio, el problema puede ser otro: usuarios que necesitan consultar o actualizar información sin depender de archivos compartidos.',
    benefits: [
      'Presentar servicios con una estructura comprensible y llamadas a la acción claras.',
      'Adaptar la navegación y los formularios a móvil y escritorio.',
      'Ofrecer contenido público accesible desde el HTML inicial cuando debe indexarse.',
      'Conectar solicitudes y áreas de cliente con las herramientas de gestión.',
    ],
    steps: [
      'Definimos públicos, contenidos, objetivos de contacto y funciones de la aplicación.',
      'Organizamos navegación y pantallas, manteniendo la identidad visual de la empresa.',
      'Desarrollamos la interfaz y sus integraciones, revisando accesibilidad y comportamiento responsive.',
      'Comprobamos formularios, URLs, metadatos y rendimiento antes de publicar y acordar la evolución.',
    ],
    technology:
      'Utilizamos Angular cuando encaja con la aplicación. Para contenido público, el prerenderizado genera páginas que pueden leerse sin ejecutar JavaScript. Las áreas autenticadas requieren además control de acceso en el backend; ocultar una pantalla no protege los datos.',
    example: {
      label: 'Ver proyectos de digitalización',
      path: '/productos',
      fragment: 'proyectos-clientes',
      text: 'El catálogo recoge soluciones para trasladar servicios profesionales a entornos web claros y accesibles. Consulta sus capacidades para orientar la conversación sobre tu proyecto.',
    },
    related: [
      { label: 'Software empresarial a medida', path: '/desarrollo-software-a-medida' },
      { label: 'Automatizar solicitudes y CRM', path: '/automatizacion-pymes' },
    ],
  },
  {
    ...SERVICE_METADATA[3],
    intro:
      'Una aplicación móvil tiene sentido cuando el servicio necesita acompañar al usuario en su día a día. Desarrollamos apps para clientes y equipos internos, conectadas con los datos y procesos del negocio, con una experiencia pensada para pantallas pequeñas.',
    problem:
      'Un equipo que trabaja fuera de la oficina puede necesitar registrar actividad, consultar datos o recibir avisos. Para clientes, una app puede facilitar el acceso recurrente a un servicio. Antes de construir, revisamos si una web responsive cubre la necesidad o si hay funciones que justifican una aplicación.',
    benefits: [
      'Simplificar las tareas frecuentes con flujos adaptados al móvil.',
      'Conectar la actividad del usuario con el sistema de gestión de la empresa.',
      'Definir permisos y datos accesibles según el perfil.',
      'Validar una primera versión antes de ampliar funciones o dispositivos compatibles.',
    ],
    steps: [
      'Identificamos usuarios, dispositivos y situaciones de uso, incluyendo cobertura y necesidades de accesibilidad.',
      'Prototipamos los recorridos principales y priorizamos las funciones de la primera versión.',
      'Desarrollamos e integramos la app, con pruebas en los dispositivos definidos en el alcance.',
      'Preparamos la entrega, la publicación acordada y el mantenimiento ante cambios de plataforma.',
    ],
    technology:
      'Valoramos enfoques multiplataforma, como Ionic con Angular, según los requisitos. Las APIs conectan la app con el backend y los permisos deben validarse en el servidor. Cámara, notificaciones y uso sin conexión requieren pruebas específicas en cada sistema.',
    example: {
      label: 'Conocer Elite Coach',
      path: '/aplicaciones/fitness-app',
      text: 'Elite Coach es una aplicación de Terreta para entrenadores y gimnasios. Su página muestra funciones de rutinas, clientes, seguimiento y nutrición, además de tutoriales del producto.',
    },
    related: [
      {
        label: 'Desarrollar el software conectado a tu app',
        path: '/desarrollo-software-a-medida',
      },
      { label: 'Aplicaciones accesibles desde el navegador', path: '/desarrollo-web' },
    ],
  },
  {
    ...SERVICE_METADATA[4],
    intro:
      'Aplicar IA a una empresa exige algo más que conectar un chatbot. Elegimos una tarea concreta, revisamos las fuentes de información y definimos cómo comprobar las respuestas. El objetivo es apoyar al equipo con una herramienta útil y límites claros.',
    problem:
      'Clasificar mensajes variables, localizar información entre documentos o preparar borradores puede consumir tiempo. Son situaciones distintas de un proceso con reglas fijas: requieren evaluar si la IA entiende suficientemente el contexto y qué errores resultarían aceptables.',
    benefits: [
      'Facilitar la consulta de información a partir de fuentes autorizadas.',
      'Ayudar a clasificar solicitudes para que el equipo revise las prioridades.',
      'Preparar borradores y extracciones de datos sujetos a validación.',
      'Evaluar calidad y coste de uso antes de ampliar la solución.',
    ],
    steps: [
      'Seleccionamos un caso de uso y revisamos disponibilidad, calidad y permisos de los datos.',
      'Definimos un conjunto de pruebas y criterios para valorar respuestas, errores y coste.',
      'Construimos una integración acotada con controles de acceso y revisión humana donde sea necesaria.',
      'Validamos el resultado y acordamos seguimiento, actualización de fuentes y límites de uso.',
    ],
    technology:
      'La solución puede combinar APIs de modelos, búsqueda sobre documentos e integración con el software existente. La elección depende del tratamiento de datos, latencia y coste. No enviamos información a un proveedor por defecto: sus condiciones y el flujo de datos forman parte de la evaluación del proyecto.',
    example: {
      label: 'Consultar nuestros servicios de integración',
      path: '/servicios',
      fragment: 'inteligencia-artificial',
      text: 'El servicio de IA de Terreta contempla asistentes, análisis de datos y procesos personalizados. Para valorar tu caso necesitamos conocer la tarea, las fuentes disponibles y quién revisará el resultado; no presentamos resultados de clientes sin datos verificables.',
    },
    related: [
      { label: 'Automatización con reglas e integraciones', path: '/automatizacion-pymes' },
      { label: 'Integrar IA en software a medida', path: '/desarrollo-software-a-medida' },
    ],
  },
];
