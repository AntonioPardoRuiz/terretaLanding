import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button';
import { ContainerComponent } from '../../ui/container/container';

@Component({ selector: 'app-placeholder-page', imports: [ButtonComponent, ContainerComponent], templateUrl: './placeholder-page.html', styleUrl: './placeholder-page.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PlaceholderPageComponent {
  private readonly data = inject(ActivatedRoute).snapshot.data;
  readonly eyebrow = this.data['eyebrow'] as string;
  readonly heading = this.data['heading'] as string;
  readonly summary = this.data['summary'] as string;
}
