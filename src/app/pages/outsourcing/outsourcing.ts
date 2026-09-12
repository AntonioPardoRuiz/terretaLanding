import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

@Component({
  selector: 'app-outsourcing',
  imports: [ButtonComponent, ContainerComponent, CtaComponent],
  templateUrl: './outsourcing.html',
  styleUrl: './outsourcing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutsourcingComponent {
  readonly plans = [
    {
      name: 'Primer impulso',
      hours: 40,
      rate: 30,
      description: 'Para mejoras concretas, ajustes o una primera integración.',
      project: 'Mejora o integración acotada',
    },
    {
      name: 'Avance continuo',
      hours: 80,
      rate: 27.5,
      description: 'Para desarrollar funcionalidades y automatizar procesos.',
      project: 'Funcionalidad o automatización',
    },
    {
      name: 'Mayor capacidad',
      hours: 160,
      rate: 25,
      description: 'Para reforzar tu equipo o abordar una fase de desarrollo.',
      project: 'Fase de desarrollo de un proyecto',
    },
  ] as const;

  private readonly currency = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  euros(value: number): string {
    return this.currency.format(value);
  }
}
