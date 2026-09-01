import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../../shared/ui/container/container';
import { RuntimeConfigService } from '../../config/runtime-config.service';

@Component({
  selector: 'app-footer',
  imports: [ContainerComponent, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly crmUrl = inject(RuntimeConfigService).crmUrl;
}
