import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

@Component({
  selector: 'app-about',
  imports: [ButtonComponent, ContainerComponent, CtaComponent, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly capabilities = [
    { title: 'Software a medida', description: 'Herramientas propias adaptadas a procesos, equipos y objetivos concretos.' },
    { title: 'Aplicaciones web y móviles', description: 'Productos digitales para clientes, profesionales y operativa interna.' },
    { title: 'Automatización de procesos', description: 'Flujos conectados que reducen tareas manuales y errores evitables.' },
    { title: 'Inteligencia artificial', description: 'IA aplicada a necesidades empresariales reales y sistemas existentes.' },
  ] as const;

  readonly values = [
    { title: 'Claridad', description: 'Explicamos, definimos y ejecutamos con orden para que cada decisión se entienda.' },
    { title: 'Acompañamiento', description: 'Mantenemos comunicación directa y seguimiento durante todo el proyecto.' },
    { title: 'Innovación', description: 'Incorporamos tecnología cuando aporta una mejora concreta, no por tendencia.' },
    { title: 'Calidad', description: 'Cuidamos la utilidad, estabilidad y capacidad de evolución de cada solución.' },
    { title: 'Colaboración', description: 'Construimos con validaciones periódicas y participación real del cliente.' },
    { title: 'Responsabilidad', description: 'Trabajamos con alcance, prioridades y entregables definidos.' },
  ] as const;
}
