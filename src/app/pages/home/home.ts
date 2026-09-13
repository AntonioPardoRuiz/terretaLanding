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
interface Solution {
  title: string;
  sector: string;
  description: string;
  visual: 'elite' | 'psychology' | 'agro';
  link?: string;
  fragment?: string;
}

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, ContainerComponent, CtaComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
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

  readonly solutions: readonly Solution[] = [
    {
      title: 'Elite Coach',
      sector: 'Fitness',
      description:
        'Plataforma para organizar la relación entre entrenadores, clientes y centros deportivos.',
      visual: 'elite',
      link: '/aplicaciones/fitness-app',
    },
    {
      title: 'J. Castejón Psicología',
      sector: 'Psicología',
      description:
        'Solución digital que estructura la presencia profesional y facilita el acceso a información y contacto.',
      visual: 'psychology',
    },
    {
      title: 'TerretaAgro',
      sector: 'Sector agrario · Logística',
      description:
        'Software para centralizar la gestión de operaciones agrícolas, almacenes, camiones y transporte.',
      visual: 'agro',
      link: '/productos',
      fragment: 'terreta-agro',
    },
  ];

  readonly attributes = [
    { title: 'Software a medida', description: 'Soluciones adaptadas a cada negocio' },
    { title: 'Automatización', description: 'Menos tareas manuales y mejores procesos' },
    { title: 'IA aplicada', description: 'Inteligencia artificial con utilidad real' },
    { title: 'Acompañamiento real', description: 'Trabajo por hitos y comunicación directa' },
  ] as const;
}
