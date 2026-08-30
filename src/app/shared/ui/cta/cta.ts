import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { ContainerComponent } from '../container/container';

@Component({ selector: 'app-cta', imports: [ButtonComponent, ContainerComponent], templateUrl: './cta.html', styleUrl: './cta.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CtaComponent {
  readonly eyebrow = input('Hablemos de tu proyecto');
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
  readonly buttonLabel = input('Solicitar propuesta');
  readonly buttonLink = input('/contacto');
}
