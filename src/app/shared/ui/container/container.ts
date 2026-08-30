import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-container', template: '<ng-content />', styleUrl: './container.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ContainerComponent {}
