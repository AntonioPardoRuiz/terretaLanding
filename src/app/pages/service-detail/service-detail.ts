import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ContainerComponent } from '../../shared/ui/container/container';
import { ButtonComponent } from '../../shared/ui/button/button';
import { CtaComponent } from '../../shared/ui/cta/cta';
import { FaqComponent } from '../../shared/ui/faq/faq';
import type { ServiceContent } from './service-content';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, ContainerComponent, ButtonComponent, CtaComponent, FaqComponent],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly page = toSignal(this.route.data.pipe(map((data) => data['service'] as ServiceContent)), {
    requireSync: true,
  });
}
