import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

interface Principle {
  icon: 'clarity' | 'visibility' | 'flexibility' | 'commitment';
  title: string;
  description: string;
}

interface ProjectPhase {
  title: string;
  summary: string;
  actions: readonly string[];
  result: string;
}

@Component({
  selector: 'app-how-we-work',
  imports: [ButtonComponent, ContainerComponent, CtaComponent, RouterLink],
  templateUrl: './how-we-work.html',
  styleUrl: './how-we-work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowWeWorkComponent {
  readonly principles: readonly Principle[] = [
    { icon: 'clarity', title: 'Claridad desde el inicio', description: 'Definimos alcance, prioridades, entregables y expectativas desde las primeras fases.' },
    { icon: 'visibility', title: 'Seguimiento continuo', description: 'El cliente tiene visibilidad real del avance y participa en validaciones periódicas.' },
    { icon: 'flexibility', title: 'Flexibilidad controlada', description: 'Adaptamos el desarrollo a la realidad del proyecto sin perder orden ni dirección.' },
    { icon: 'commitment', title: 'Compromiso con plazos y resultados', description: 'Trabajamos con hitos y responsabilidad compartida para reducir riesgos e incertidumbre.' },
  ];

  readonly phases: readonly ProjectPhase[] = [
    {
      title: 'Descubrimiento y alineación',
      summary: 'Empezamos entendiendo el contexto del negocio, los objetivos del proyecto y las necesidades reales que hay que resolver.',
      actions: ['Reunión inicial de descubrimiento', 'Análisis del problema y del objetivo de negocio', 'Identificación de requisitos clave', 'Primera estimación de alcance, tiempos y enfoque'],
      result: 'Una base clara para decidir qué se va a construir y cómo se va a plantear.',
    },
    {
      title: 'Análisis funcional',
      summary: 'Convertimos la idea en funcionalidades concretas, priorizadas y viables, y validamos qué debe ir primero y qué puede evolucionar después.',
      actions: ['Definición de funcionalidades', 'Priorización entre MVP y evolutivos', 'Estructuración de flujos principales', 'Validación funcional con el cliente'],
      result: 'Un marco funcional claro y compartido para empezar a construir con criterio.',
    },
    {
      title: 'Diseño técnico',
      summary: 'Diseñamos la arquitectura y tomamos las decisiones técnicas necesarias para adecuar la solución al contexto real del negocio.',
      actions: ['Definición de arquitectura', 'Elección de tecnologías', 'Diseño de base de datos', 'Planificación técnica por fases o sprints'],
      result: 'Una hoja de ruta técnica clara para ejecutar con orden y reducir improvisaciones.',
    },
    {
      title: 'Desarrollo iterativo',
      summary: 'Construimos la solución por fases, con entregas progresivas y feedback continuo para validar avances y ajustar prioridades.',
      actions: ['Desarrollo por módulos o hitos', 'Revisiones periódicas', 'Entregas funcionales parciales', 'Ajustes según validación'],
      result: 'Un producto que avanza de forma visible, controlada y alineada con lo que el negocio necesita.',
    },
    {
      title: 'Testing y validación',
      summary: 'Comprobamos que la solución funcione como debe, responda a los escenarios previstos y esté alineada con lo acordado.',
      actions: ['Testing funcional', 'Revisión técnica', 'Validación con el cliente', 'Preparación para producción'],
      result: 'Una versión estable, validada y lista para desplegar.',
    },
    {
      title: 'Despliegue, soporte y evolución',
      summary: 'Una vez validada la solución, la ponemos en producción y acompañamos al cliente en la mejora y evolución del producto.',
      actions: ['Despliegue en entorno productivo', 'Soporte técnico', 'Corrección de incidencias', 'Evolutivos y mantenimiento'],
      result: 'Una solución operativa y preparada para seguir creciendo con el negocio.',
    },
  ];

  readonly clientParticipation = [
    'Visibilidad del avance',
    'Revisiones periódicas',
    'Validación en puntos clave',
    'Decisiones compartidas con foco en negocio',
  ] as const;
}
