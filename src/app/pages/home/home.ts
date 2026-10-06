import { PAGE_FAQS } from '../../core/seo/page-faqs';
import { FaqComponent } from '../../shared/ui/faq/faq';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

type IconName = 'browser' | 'mobile' | 'automation' | 'ai' | 'design' | 'support';
interface Card {
  title: string;
  description: string;
  icon: IconName;
}

@Component({
  selector: 'app-home',
  imports: [FaqComponent, ButtonComponent, ContainerComponent, CtaComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly faqs = PAGE_FAQS['/'];
  readonly benefits: readonly Card[] = [
    {
      title: 'Software a medida',
      description:
        'Creamos soluciones adaptadas a tu negocio, sin plantillas genéricas ni sistemas innecesariamente complejos.',
      icon: 'browser',
    },
    {
      title: 'Automatización inteligente',
      description:
        'Reducimos tareas manuales, conectamos herramientas y mejoramos procesos para ahorrar tiempo y costes.',
      icon: 'automation',
    },
    {
      title: 'IA aplicada al negocio',
      description:
        'Integramos inteligencia artificial de forma práctica para atención al cliente, análisis, contenido, ventas y operaciones.',
      icon: 'ai',
    },
    {
      title: 'Acompañamiento real',
      description:
        'Trabajamos contigo por hitos, con comunicación directa, seguimiento continuo y entregables claros.',
      icon: 'support',
    },
  ];

  readonly services: readonly (Card & { fragment: string; anchor: string })[] = [
    {
      title: 'Aplicaciones Web',
      fragment: 'software-a-medida',
      anchor: 'Desarrollo de aplicaciones web',
      description:
        'Plataformas internas, portales de clientes, sistemas de reservas, dashboards y herramientas de gestión.',
      icon: 'browser',
    },
    {
      title: 'Apps Móviles',
      fragment: 'aplicaciones-moviles',
      anchor: 'Desarrollo de apps móviles',
      description:
        'Aplicaciones para iOS y Android orientadas a clientes, equipos internos, comunidades o nuevos modelos de negocio.',
      icon: 'mobile',
    },
    {
      title: 'Automatizaciones',
      fragment: 'automatizacion',
      anchor: 'Automatización de procesos',
      description:
        'Flujos conectados entre formularios, CRM, email, WhatsApp, hojas de cálculo, bases de datos y herramientas empresariales.',
      icon: 'automation',
    },
    {
      title: 'Inteligencia Artificial',
      fragment: 'inteligencia-artificial',
      anchor: 'IA para empresas',
      description:
        'Chatbots, asistentes internos, análisis de datos, generación de contenido y procesos inteligentes personalizados.',
      icon: 'ai',
    },
    {
      title: 'Soporte y evolución',
      fragment: 'soporte',
      anchor: 'Mantenimiento de software',
      description:
        'Mantenimiento, mejoras y acompañamiento para que cada solución siga respondiendo a las necesidades del negocio.',
      icon: 'support',
    },
  ];

  readonly solutions = [
    { title: 'Curae Clínica Total', sector: 'Salud · Producto estrella', description: 'Agenda, historia clínica, portal del paciente y gestión administrativa en una misma plataforma.', image: 'curae-brand.jpg', link: '/productos/curae', fragment: undefined },
    { title: 'Elite Coach', sector: 'Fitness', description: 'Plataforma para organizar la relación entre entrenadores, clientes y centros deportivos.', image: 'elite-coach.webp', link: '/aplicaciones/fitness-app', fragment: undefined },
    { title: 'TerretaAgro', sector: 'Agricultura · Logística', description: 'Gestión de operaciones agrícolas, almacenes, camiones y transporte.', image: 'terreta-agro-brand.jpg', link: '/productos', fragment: 'terreta-agro' },
    { title: 'ContaTerra', sector: 'Contabilidad', description: 'Solución para centralizar procesos de contabilidad y gestión empresarial.', image: 'contaterra-brand.jpg', link: '/productos', fragment: 'conta-terra' },
    { title: 'TerretaRail', sector: 'Ferroviario', description: 'Digitalización de procesos de operaciones y mantenimiento ferroviario.', image: 'terreta-rail-logo.png', link: '/productos', fragment: 'terreta-rail' },
    { title: 'Terreta CRM', sector: 'Gestión empresarial', description: 'Gestión de la relación con los clientes en un entorno digital propio.', image: 'terreta-crm-web.png', link: '/productos', fragment: 'crm' },
    { title: 'CRMHealth', sector: 'Salud · Demo disponible', description: 'Conoce CRMHealth y solicita acceso a su demo para valorar cómo encaja en tu negocio.', image: 'terreta-health-brand.jpg', link: '/productos', fragment: 'crmhealth' },
    { title: 'Mars', sector: 'Proyecto para clientes', description: 'Presencia web de Construcciones MARS para comunicar sus servicios y facilitar el contacto.', image: 'mars-logo.webp', link: '/productos', fragment: 'mars' },
    { title: 'Apex', sector: 'Proyecto para clientes', description: 'Proyecto web de Apex Construcciones para presentar su actividad y servicios.', image: 'apex-logo.png', link: '/productos', fragment: 'apex' },
  ] as const;

  scrollProducts(track: HTMLElement, direction: number): void {
    const card = track.querySelector<HTMLElement>('.solution-card');
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || '0') : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  readonly attributes = [
    { title: 'Software a medida', description: 'Soluciones adaptadas a cada negocio' },
    { title: 'Automatización', description: 'Menos tareas manuales y mejores procesos' },
    { title: 'IA aplicada', description: 'Inteligencia artificial con utilidad real' },
    { title: 'Acompañamiento real', description: 'Trabajo por hitos y comunicación directa' },
  ] as const;
}
