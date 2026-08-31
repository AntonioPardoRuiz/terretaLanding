import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

type IconName = 'browser' | 'mobile' | 'automation' | 'ai' | 'design' | 'support';
interface Card { title: string; description: string; icon: IconName; }
interface Solution { title: string; description: string; visual: 'elite' | 'automation' | 'dashboard'; }

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, ContainerComponent, CtaComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly benefits: readonly Card[] = [
    { title: 'Software a medida', description: 'Creamos soluciones adaptadas a tu negocio, sin plantillas genéricas ni sistemas innecesariamente complejos.', icon: 'browser' },
    { title: 'Automatización inteligente', description: 'Reducimos tareas manuales, conectamos herramientas y mejoramos procesos para ahorrar tiempo y costes.', icon: 'automation' },
    { title: 'IA aplicada al negocio', description: 'Integramos inteligencia artificial de forma práctica para atención al cliente, análisis, contenido, ventas y operaciones.', icon: 'ai' },
    { title: 'Acompañamiento real', description: 'Trabajamos contigo por hitos, con comunicación directa, seguimiento continuo y entregables claros.', icon: 'support' },
  ];

  readonly services: readonly Card[] = [
    { title: 'Aplicaciones Web', description: 'Plataformas internas, portales de clientes, sistemas de reservas, dashboards y herramientas de gestión.', icon: 'browser' },
    { title: 'Apps Móviles', description: 'Aplicaciones para iOS y Android orientadas a clientes, equipos internos, comunidades o nuevos modelos de negocio.', icon: 'mobile' },
    { title: 'Automatizaciones', description: 'Flujos conectados entre formularios, CRM, email, WhatsApp, hojas de cálculo, bases de datos y herramientas empresariales.', icon: 'automation' },
    { title: 'Inteligencia Artificial', description: 'Chatbots, asistentes internos, análisis de datos, generación de contenido y procesos inteligentes personalizados.', icon: 'ai' },
    { title: 'Soporte y evolución', description: 'Mantenimiento, mejoras y acompañamiento para que cada solución siga respondiendo a las necesidades del negocio.', icon: 'support' },
  ];

  readonly solutions: readonly Solution[] = [
    { title: 'Elite Coach App', description: 'App fitness para entrenadores, clientes y centros deportivos.', visual: 'elite' },
    { title: 'Automatizaciones empresariales', description: 'Procesos conectados para reducir tareas manuales y mejorar la eficiencia.', visual: 'automation' },
    { title: 'Dashboards de gestión', description: 'Paneles visuales para controlar datos, operaciones y rendimiento.', visual: 'dashboard' },
  ];

  readonly attributes = [
    { title: 'Software a medida', description: 'Soluciones adaptadas a cada negocio' },
    { title: 'Automatización', description: 'Menos tareas manuales y mejores procesos' },
    { title: 'IA aplicada', description: 'Inteligencia artificial con utilidad real' },
    { title: 'Acompañamiento real', description: 'Trabajo por hitos y comunicación directa' },
  ] as const;
}
