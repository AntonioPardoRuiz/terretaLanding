import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

interface Service {
  title: string;
  description: string;
  includes: readonly string[];
  idealFor: string;
  cta: string;
  icon: 'web' | 'mobile' | 'automation' | 'ai' | 'support';
}

@Component({
  selector: 'app-services',
  imports: [ButtonComponent, ContainerComponent, CtaComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  readonly services: readonly Service[] = [
    {
      title: 'Software a medida y aplicaciones web',
      description: 'Creamos software y plataformas web a medida para mejorar procesos internos, gestionar operaciones, conectar equipos o dar mejor servicio a clientes y usuarios. Diseñamos soluciones funcionales, seguras y escalables, adaptadas a la realidad de tu empresa.',
      includes: ['Paneles de gestión.', 'Portales internos.', 'Áreas de cliente.', 'Herramientas operativas.', 'Integraciones con sistemas existentes.'],
      idealFor: 'Empresas que necesitan centralizar información, digitalizar tareas o disponer de una herramienta propia en lugar de depender de soluciones limitadas.',
      cta: 'Ver si esta solución encaja con mi empresa',
      icon: 'web',
    },
    {
      title: 'Desarrollo de aplicaciones móviles',
      description: 'Desarrollamos aplicaciones móviles orientadas a negocio, experiencia de usuario y crecimiento. Ya sea una app para clientes, equipos internos o prestación de servicios, construimos soluciones útiles y preparadas para evolucionar contigo.',
      includes: ['Apps para iOS y Android.', 'Apps para clientes o empleados.', 'Integración con APIs y backend.', 'Flujos de usuario optimizados.', 'Mantenimiento y evolución.'],
      idealFor: 'Empresas que necesitan mejorar la experiencia digital de sus clientes o dar movilidad a procesos que hoy siguen siendo manuales o poco eficientes.',
      cta: 'Quiero valorar una app para mi negocio',
      icon: 'mobile',
    },
    {
      title: 'Automatización de procesos',
      description: 'Automatizamos tareas repetitivas, conectamos herramientas y reducimos carga operativa para que tu equipo gane tiempo, reduzca errores y trabaje con más foco. La automatización no consiste solo en ahorrar tiempo: también permite escalar mejor.',
      includes: ['Automatización de tareas repetitivas.', 'Flujos internos automatizados.', 'Reducción de errores manuales.', 'Mejora de productividad operativa.', 'Conexión entre herramientas y sistemas.'],
      idealFor: 'Empresas con tareas administrativas, operativas o de seguimiento que consumen demasiado tiempo o dependen excesivamente de procesos manuales.',
      cta: 'Quiero automatizar un proceso de mi empresa',
      icon: 'automation',
    },
    {
      title: 'Soluciones con IA',
      description: 'Aplicamos IA de forma práctica para resolver problemas concretos del negocio: automatizar procesos, mejorar atención, analizar información o integrar asistentes y capacidades inteligentes en sistemas ya existentes.',
      includes: ['Chatbots personalizados.', 'Asistentes internos.', 'APIs con IA.', 'Automatizaciones asistidas.', 'Integración de IA en productos o procesos existentes.'],
      idealFor: 'Empresas que quieren aprovechar la IA con un enfoque realista, útil y alineado con objetivos de negocio, no solo como tendencia.',
      cta: 'Quiero aplicar IA a un caso real',
      icon: 'ai',
    },
    {
      title: 'Soporte, mantenimiento y evolución',
      description: 'Después del desarrollo, seguimos acompañando a nuestros clientes para mantener, optimizar y evolucionar sus soluciones. Un software útil no termina al lanzarse: necesita seguimiento, mejoras y soporte en función del uso real.',
      includes: ['Corrección de errores.', 'Mejoras evolutivas.', 'Optimización de rendimiento.', 'Soporte técnico.', 'Bolsa de horas o mantenimiento periódico.'],
      idealFor: 'Empresas que ya tienen una solución en marcha y necesitan continuidad, estabilidad y capacidad de mejora.',
      cta: 'Necesito soporte o mejoras continuas',
      icon: 'support',
    },
  ];

  readonly engagementModels = [
    { title: 'Proyecto cerrado', description: 'Para alcances definidos y objetivos concretos.' },
    { title: 'Entrega por hitos', description: 'Para proyectos estructurados por fases, con validación continua y control del avance en cada etapa.' },
    { title: 'Bolsa de horas', description: 'Para mejoras, soporte o necesidades variables.' },
    { title: 'Suscripción mensual o anual', description: 'Para empresas que necesitan continuidad, evolución y acompañamiento.' },
  ] as const;

  readonly commonCases = [
    'Empresas que quieren sustituir hojas de cálculo y procesos manuales por una herramienta propia.',
    'Negocios que necesitan una app móvil para clientes, equipos o servicios.',
    'Organizaciones que quieren automatizar tareas repetitivas y reducir errores operativos.',
    'Empresas que quieren incorporar IA en atención, clasificación, análisis o soporte interno.',
    'Proyectos que necesitan mantenimiento, evolución o reestructuración técnica.',
  ] as const;
}
