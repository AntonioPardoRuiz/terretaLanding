import type { FaqItem } from './seo-data';

export const PAGE_FAQS: Record<string, readonly FaqItem[]> = {
  '/': [
    {
      question: '¿Cómo sé qué solución digital necesita mi empresa?',
      answer:
        'Empieza por el problema: tareas repetitivas, información dispersa o un servicio que tus clientes necesitan utilizar. Revisamos contigo si conviene integrar herramientas, desarrollar software propio o mejorar una aplicación existente.',
    },
    {
      question: '¿Trabajáis con empresas de Alicante y de otras ubicaciones?',
      answer:
        'Terreta es una empresa de Alicante y ofrece desarrollo de software y automatización a pymes de la provincia y de otras ubicaciones. Organizamos el proyecto mediante comunicación directa, entregables y revisiones por hitos.',
    },
  ],
  '/servicios': [
    {
      question: '¿Se pueden combinar varios servicios en un proyecto?',
      answer:
        'Sí. Una aplicación puede necesitar una web pública, una app móvil e integraciones. Definimos primero el objetivo común y priorizamos las partes que deben estar disponibles en la primera entrega.',
    },
    {
      question: '¿Podéis trabajar sobre software que ya tenemos?',
      answer:
        'Primero revisamos el código, la documentación y las posibilidades de integración disponibles. Esa revisión permite valorar si es viable mantener la base actual, ampliarla o sustituir una parte concreta.',
    },
  ],
  '/productos': [
    {
      question: '¿Cómo puedo conocer las funciones de un producto de Terreta?',
      answer:
        'En este catálogo puedes consultar las capacidades descritas y acceder a la página de Elite Coach o a las demos enlazadas cuando estén disponibles. Contacta con Terreta para valorar si el producto encaja con tu operativa.',
    },
    {
      question: '¿Y si mi empresa necesita funciones que no aparecen en el catálogo?',
      answer:
        'Cuéntanos qué proceso necesitas resolver. Podemos estudiar un desarrollo a medida o una integración; la disponibilidad de una función se confirma al definir el alcance, no se presupone por aparecer un producto en el catálogo.',
    },
  ],
  '/como-trabajamos': [
    {
      question: '¿Qué participación necesita el proyecto por parte del cliente?',
      answer:
        'Necesitamos una persona que aclare prioridades, facilite la información necesaria y valide los entregables. Las revisiones periódicas ayudan a detectar ajustes y mantener el desarrollo alineado con el uso real.',
    },
    {
      question: '¿Qué ocurre si cambian las necesidades durante el desarrollo?',
      answer:
        'Revisamos el impacto sobre alcance, plazo y presupuesto antes de incorporar el cambio. Se acuerdan las prioridades y los entregables afectados para mantener visibilidad sobre lo que se va a construir.',
    },
  ],
  '/nosotros': [
    {
      question: '¿En qué tipo de necesidades se centra Terreta?',
      answer:
        'Nos centramos en software para empresas y pymes: aplicaciones web y móviles, automatización, integraciones e inteligencia artificial aplicada a procesos concretos del negocio.',
    },
  ],
  '/tarifas': [
    {
      question: '¿Qué información ayuda a preparar un presupuesto?',
      answer:
        'Describe el proceso que quieres mejorar, las funciones imprescindibles, quién utilizará la solución y las herramientas con las que debe conectarse. Si tienes una fecha objetivo, indícala para que podamos valorar su viabilidad.',
    },
    {
      question: '¿El presupuesto incluye mantenimiento?',
      answer:
        'El desarrollo y el soporte deben quedar definidos en la propuesta. Conviene concretar correcciones, actualizaciones, infraestructura y evolución para conocer qué conceptos incluye cada acuerdo.',
    },
  ],
  '/aplicaciones/fitness-app': [
    {
      question: '¿Para quién está pensado Elite Coach?',
      answer:
        'La aplicación está orientada a entrenadores y gimnasios que necesitan organizar clientes, rutinas, seguimiento y nutrición. Los tutoriales de esta página muestran recorridos del producto.',
    },
    {
      question: '¿Cómo puedo valorar Elite Coach para mi centro?',
      answer:
        'Revisa las funciones y tutoriales publicados y contacta con Terreta con tus necesidades. Así podemos aclarar el encaje del producto y las condiciones de acceso vigentes.',
    },
  ],
  '/outsourcing': [
    {
      question: '¿Cómo se define el trabajo de una bolsa de horas?',
      answer:
        'Conviene acordar las tareas prioritarias, los entregables y la forma de revisar el consumo. Las tarifas y condiciones publicadas en esta página sirven de referencia para preparar una propuesta según tus necesidades.',
    },
  ],
  '/contacto': [
    {
      question: '¿Necesito tener una especificación técnica para contactar?',
      answer:
        'No. Puedes explicar con tus palabras qué problema quieres resolver y cómo lo gestionas ahora. Esa información permite empezar a concretar el proyecto y las preguntas que debemos resolver antes de presupuestar.',
    },
  ],
};
