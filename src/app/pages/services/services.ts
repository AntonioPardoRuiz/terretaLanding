import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

interface Service {
  id: string;
  example: { label: string; fragment: string };
  title: string;
  description: string;
  includes: readonly string[];
  idealFor: string;
  cta: string;
  icon: 'web' | 'mobile' | 'automation' | 'ai' | 'support';
}

@Component({
  selector: 'app-services',
  imports: [ButtonComponent, ContainerComponent, CtaComponent, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  readonly services: readonly Service[] = [
    {
      id: 'software-a-medida',
      example: {
        label: 'Ver TerretaAgro: gestión agrícola, almacenes y transporte',
        fragment: 'terreta-agro',
      },
      title: 'Desarrollo de software a medida y aplicaciones web',
      description:
        'Desarrollamos software a medida cuando tus procesos necesitan una herramienta propia. Una aplicación web permite trabajar desde el navegador con datos, usuarios y permisos: por ejemplo, un portal de clientes o un panel de operaciones. Antes de construir, valoramos si conviene adaptar una solución existente o desarrollar las funciones que faltan.',
      includes: [
        'Paneles de gestión.',
        'Portales internos.',
        'Áreas de cliente.',
        'Herramientas operativas.',
        'Integraciones con sistemas existentes.',
      ],
      idealFor:
        'Empresas que necesitan centralizar información, digitalizar tareas o disponer de una herramienta propia en lugar de depender de soluciones limitadas.',
      cta: 'Ver si esta solución encaja con mi empresa',
      icon: 'web',
    },
    {
      id: 'aplicaciones-moviles',
      example: {
        label: 'Conocer Elite Coach, una aplicación para el sector fitness',
        fragment: 'elite-coach',
      },
      title: 'Desarrollo de aplicaciones móviles',
      description:
        'Desarrollamos aplicaciones móviles orientadas a negocio, experiencia de usuario y crecimiento. Ya sea una app para clientes, equipos internos o prestación de servicios, construimos soluciones útiles y preparadas para evolucionar contigo.',
      includes: [
        'Apps para iOS y Android.',
        'Apps para clientes o empleados.',
        'Integración con APIs y backend.',
        'Flujos de usuario optimizados.',
        'Mantenimiento y evolución.',
      ],
      idealFor:
        'Empresas que necesitan mejorar la experiencia digital de sus clientes o dar movilidad a procesos que hoy siguen siendo manuales o poco eficientes.',
      cta: 'Quiero valorar una app para mi negocio',
      icon: 'mobile',
    },
    {
      id: 'desarrollo-web',
      title: 'Desarrollo web y páginas web para empresas',
      description:
        'Una página web corporativa presenta tu negocio, explica tus servicios y facilita el contacto. Una aplicación web permite además trabajar con datos y realizar operaciones, como gestionar reservas o acceder a un área privada. Diseñamos la presencia pública y, cuando el proyecto lo requiere, la conectamos con una plataforma de negocio.',
      includes: [
        'Estructura de contenidos y navegación.',
        'Diseño adaptable a móvil y escritorio.',
        'Formularios y canales de contacto.',
        'Semántica, accesibilidad y base técnica SEO.',
        'Conexión con aplicaciones y herramientas existentes.',
      ],
      idealFor:
        'Empresas y profesionales que necesitan explicar su oferta con claridad y disponer de un punto de contacto digital propio.',
      cta: 'Quiero valorar la web de mi empresa',
      icon: 'web',
      example: { label: 'Ver el proyecto Jessica Castejón Psicología', fragment: 'psicologia' },
    },
    {
      id: 'automatizacion',
      example: {
        label: 'Ver ContaTerra y su enfoque de gestión empresarial',
        fragment: 'conta-terra',
      },
      title: 'Automatización de procesos',
      description:
        'Conectamos tareas repetitivas entre herramientas: registrar una solicitud del formulario en el CRM, enviar un aviso o preparar datos para un informe. Definimos qué activa cada flujo, qué reglas sigue y cómo se revisan las excepciones. Primero analizamos el proceso actual; no todas las automatizaciones requieren inteligencia artificial.',
      includes: [
        'Automatización de tareas repetitivas.',
        'Flujos internos automatizados.',
        'Reducción de errores manuales.',
        'Mejora de productividad operativa.',
        'Conexión entre herramientas y sistemas.',
      ],
      idealFor:
        'Empresas con tareas administrativas, operativas o de seguimiento que consumen demasiado tiempo o dependen excesivamente de procesos manuales.',
      cta: 'Quiero automatizar un proceso de mi empresa',
      icon: 'automation',
    },
    {
      id: 'inteligencia-artificial',
      example: {
        label: 'Explorar los productos de software de Terreta',
        fragment: 'software-sectorial',
      },
      title: 'Inteligencia artificial para empresas',
      description:
        'Aplicamos inteligencia artificial a tareas concretas: clasificar consultas, resumir documentación o ayudar a un equipo a encontrar información. Revisamos qué datos puede utilizar, probamos respuestas con ejemplos del negocio y definimos cuándo debe intervenir una persona. La integración se evalúa antes de extenderla al proceso completo.',
      includes: [
        'Chatbots personalizados.',
        'Asistentes internos.',
        'APIs con IA.',
        'Automatizaciones asistidas.',
        'Integración de IA en productos o procesos existentes.',
      ],
      idealFor:
        'Empresas que quieren aprovechar la IA con un enfoque realista, útil y alineado con objetivos de negocio, no solo como tendencia.',
      cta: 'Quiero aplicar IA a un caso real',
      icon: 'ai',
    },
    {
      id: 'soporte',
      example: {
        label: 'Conocer el catálogo de productos desarrollados',
        fragment: 'software-sectorial',
      },
      title: 'Soporte, mantenimiento y evolución',
      description:
        'Después del desarrollo, seguimos acompañando a nuestros clientes para mantener, optimizar y evolucionar sus soluciones. Un software útil no termina al lanzarse: necesita seguimiento, mejoras y soporte en función del uso real.',
      includes: [
        'Corrección de errores.',
        'Mejoras evolutivas.',
        'Optimización de rendimiento.',
        'Soporte técnico.',
        'Bolsa de horas o mantenimiento periódico.',
      ],
      idealFor:
        'Empresas que ya tienen una solución en marcha y necesitan continuidad, estabilidad y capacidad de mejora.',
      cta: 'Necesito soporte o mejoras continuas',
      icon: 'support',
    },
  ];

  readonly engagementModels = [
    { title: 'Proyecto cerrado', description: 'Para alcances definidos y objetivos concretos.' },
    {
      title: 'Entrega por hitos',
      description:
        'Para proyectos estructurados por fases, con validación continua y control del avance en cada etapa.',
    },
    { title: 'Bolsa de horas', description: 'Para mejoras, soporte o necesidades variables.' },
    {
      title: 'Suscripción mensual o anual',
      description: 'Para empresas que necesitan continuidad, evolución y acompañamiento.',
    },
  ] as const;

  readonly commonCases = [
    'Empresas que quieren sustituir hojas de cálculo y procesos manuales por una herramienta propia.',
    'Negocios que necesitan una app móvil para clientes, equipos o servicios.',
    'Organizaciones que quieren automatizar tareas repetitivas y reducir errores operativos.',
    'Empresas que quieren incorporar IA en atención, clasificación, análisis o soporte interno.',
    'Proyectos que necesitan mantenimiento, evolución o reestructuración técnica.',
  ] as const;
}
