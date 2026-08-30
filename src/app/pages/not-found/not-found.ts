import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';

@Component({ selector: 'app-not-found', imports: [ButtonComponent, ContainerComponent], templateUrl: './not-found.html', styleUrl: './not-found.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class NotFoundComponent {}
