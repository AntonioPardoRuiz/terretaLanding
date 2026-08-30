import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-button', imports: [RouterLink], templateUrl: './button.html', styleUrl: './button.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly link = input.required<string>();
  readonly variant = input<'primary' | 'secondary'>('primary');
}
