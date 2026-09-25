import type { SeoData } from '../../core/seo/seo-data';

export const SERVICE_METADATA: { slug: string; name: string; seo: SeoData }[] = [
  {
    slug: 'desarrollo-software-a-medida',
    name: 'Desarrollo de software a medida para empresas',
    seo: {
      title: 'Software a medida para pymes y empresas | Terreta',
      description:
        'Desarrollamos software a medida para gestionar tu empresa: portales, herramientas internas e integración con tu CRM. Define tu proyecto con Terreta, en Alicante.',
      faqs: [
        {
          question: '¿Qué es el desarrollo de software a medida?',
          answer:
            'Es la creación de una aplicación alrededor de los procesos y requisitos de una empresa. Permite definir funciones, permisos e integraciones propias. Antes de desarrollarla, conviene comparar su coste y mantenimiento con adaptar una herramienta existente.',
        },
        {
          question: '¿Cuánto cuesta desarrollar software a medida?',
          answer:
            'Depende de las funciones, integraciones, migración de datos y requisitos de seguridad. Para presupuestar necesitamos conocer quién lo usará, qué tareas resolverá y qué sistemas deben conectarse. Proponemos un alcance concreto y un presupuesto personalizado.',
        },
        {
          question: '¿Cuánto tarda un proyecto de software?',
          answer:
            'El plazo se estima después de definir el alcance y las dependencias. Una primera versión centrada en el proceso principal permite validar antes de ampliar. Los hitos y criterios de aceptación se acuerdan durante la planificación.',
        },
        {
          question: '¿Se puede integrar con el CRM que ya utilizamos?',
          answer:
            'Estudiamos las APIs, permisos y posibilidades de exportación del CRM existente. Si permite la conexión, definimos qué datos se sincronizan, en qué dirección y cómo se gestionan errores o registros duplicados.',
        },
      ],
    },
  },
  {
    slug: 'automatizacion-pymes',
    name: 'Automatización de procesos para pymes',
    seo: {
      title: 'Automatización para pymes e integración de procesos | Terreta',
      description:
        'Conecta formularios, CRM y herramientas de gestión. Automatizamos tareas repetitivas de tu pyme con un alcance claro y seguimiento desde Alicante.',
      faqs: [
        {
          question: '¿Qué procesos puede automatizar una pyme?',
          answer:
            'La entrada de solicitudes, creación de registros en el CRM, avisos internos, sincronización de datos e informes recurrentes son candidatos habituales. Es necesario revisar las reglas, las excepciones y los permisos de las herramientas implicadas.',
        },
        {
          question: '¿Qué ventajas tiene automatizar procesos empresariales?',
          answer:
            'Puede reducir la introducción manual de datos y facilitar la trazabilidad de cada tarea. El beneficio debe evaluarse sobre el proceso concreto, comparando tiempo empleado, errores y coste de mantenimiento antes y después.',
        },
        {
          question: '¿Hace falta cambiar las herramientas actuales?',
          answer:
            'No necesariamente. Primero comprobamos sus integraciones disponibles. Una API o una exportación estructurada puede permitir conectarlas sin sustituirlas; las limitaciones de cada proveedor se revisan antes de comprometer el alcance.',
        },
        {
          question: '¿Todas las automatizaciones necesitan inteligencia artificial?',
          answer:
            'No. Si las reglas son claras, un flujo determinista suele ser más sencillo de verificar. La IA puede ser útil para clasificar texto o extraer información variable, con validación y supervisión cuando corresponda.',
        },
      ],
    },
  },
  {
    slug: 'desarrollo-web',
    name: 'Desarrollo web y aplicaciones web para empresas',
    seo: {
      title: 'Desarrollo web en Alicante y aplicaciones web | Terreta',
      description:
        'Páginas web profesionales y aplicaciones web con Angular: contenido claro, diseño responsive y conexión con tu negocio. Cuéntanos qué necesitas desarrollar.',
      faqs: [
        {
          question: '¿Necesito una página web o una aplicación web?',
          answer:
            'Una página corporativa presenta servicios y facilita el contacto. Una aplicación permite además realizar operaciones con datos, como reservas o gestión de usuarios. Pueden convivir, pero conviene definir por separado la parte pública y las funciones privadas.',
        },
        {
          question: '¿Desarrolláis aplicaciones web con Angular?',
          answer:
            'Angular es una de las tecnologías que utilizamos para interfaces web. En páginas públicas evaluamos el prerenderizado para entregar contenido HTML desde la primera respuesta; en áreas privadas priorizamos flujos, permisos y acceso a los datos.',
        },
        {
          question: '¿Se puede mejorar una web existente?',
          answer:
            'Sí. Revisamos su estructura, contenido y base técnica para decidir qué reutilizar. Una mejora puede centrarse en navegación, formularios, rendimiento o integración con herramientas de negocio sin rehacer todo el sitio.',
        },
        {
          question: '¿La creación de la web incluye una garantía de posicionamiento?',
          answer:
            'No se puede garantizar una posición concreta. La semántica, el contenido accesible y la indexabilidad aportan una base técnica; la visibilidad también depende de la competencia, la autoridad y el mantenimiento del contenido.',
        },
      ],
    },
  },
  {
    slug: 'desarrollo-aplicaciones-moviles',
    name: 'Desarrollo de aplicaciones móviles para iOS y Android',
    seo: {
      title: 'Desarrollo de apps móviles para iOS y Android | Terreta',
      description:
        'Aplicaciones móviles para clientes y equipos: definimos flujos, conexión con tu software y una primera versión útil. Desarrollo de apps desde Alicante.',
      faqs: [
        {
          question: '¿Podéis desarrollar una app para iOS y Android?',
          answer:
            'Sí. Definimos primero las funciones y dispositivos necesarios. El enfoque técnico depende del uso de cámara, notificaciones, trabajo sin conexión y otros requisitos de cada plataforma.',
        },
        {
          question: '¿Cuándo tiene sentido utilizar Ionic?',
          answer:
            'Ionic permite plantear interfaces móviles con tecnologías web y compartir parte del desarrollo. Conviene evaluar sus capacidades y las integraciones nativas necesarias antes de elegirlo para una aplicación concreta.',
        },
        {
          question: '¿La aplicación puede funcionar sin conexión?',
          answer:
            'Es posible diseñar algunas tareas para uso sin conexión, pero hay que definir qué datos se guardan en el dispositivo y cómo se resuelven conflictos al sincronizar. Es un requisito que debe formar parte del alcance inicial.',
        },
        {
          question: '¿Qué hace falta para publicar en las tiendas de aplicaciones?',
          answer:
            'La publicación requiere cuentas de desarrollador, materiales de la ficha y cumplir los requisitos de revisión de cada tienda. Acordamos responsabilidades y entregables; la aprobación depende de Apple y Google.',
        },
      ],
    },
  },
  {
    slug: 'inteligencia-artificial-empresas',
    name: 'Inteligencia artificial para empresas y pymes',
    seo: {
      title: 'Inteligencia artificial para empresas y pymes | Terreta',
      description:
        'Evalúa asistentes internos, clasificación de documentos y automatización con IA. Integramos inteligencia artificial con tus procesos y supervisión del equipo.',
      faqs: [
        {
          question: '¿Dónde puede aportar valor la IA en una pyme?',
          answer:
            'Puede ayudar a clasificar solicitudes, extraer información de documentos o preparar respuestas a partir de una base de conocimiento. La utilidad depende de la calidad de los datos y de poder verificar el resultado en una tarea concreta.',
        },
        {
          question: '¿Puede un asistente consultar documentos de la empresa?',
          answer:
            'Se puede diseñar un asistente conectado a fuentes autorizadas. Hay que definir qué información puede consultar cada usuario, cómo se actualiza y qué ocurre cuando no hay evidencia suficiente para responder.',
        },
        {
          question: '¿Cómo se revisan las respuestas incorrectas de la IA?',
          answer:
            'Definimos ejemplos de prueba, criterios de evaluación y situaciones que requieren revisión humana. Un sistema generativo puede equivocarse; las decisiones sensibles necesitan controles y un responsable que valide el resultado.',
        },
        {
          question: '¿Es necesario entrenar un modelo propio?',
          answer:
            'No siempre. Una integración con un modelo existente y fuentes de información bien preparadas puede ser suficiente. Comparamos coste, privacidad, calidad y mantenimiento antes de plantear entrenamiento específico.',
        },
      ],
    },
  },
];
