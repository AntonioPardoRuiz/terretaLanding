import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../../shared/ui/container/container';

@Component({ selector: 'app-footer', imports: [ContainerComponent, RouterLink], templateUrl: './footer.html', styleUrl: './footer.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class FooterComponent { readonly year = new Date().getFullYear(); }
