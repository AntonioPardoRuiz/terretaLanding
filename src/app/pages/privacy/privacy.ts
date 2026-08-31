import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container';

@Component({
  selector: 'app-privacy',
  imports: [ContainerComponent, RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {}
