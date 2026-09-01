import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../../shared/ui/button/button';
import { ContainerComponent } from '../../../shared/ui/container/container';
import { RuntimeConfigService } from '../../config/runtime-config.service';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, ContainerComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly crmUrl = inject(RuntimeConfigService).crmUrl;
  readonly menuOpen = signal(false);
  closeMenu(): void {
    this.menuOpen.set(false);
  }
  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
