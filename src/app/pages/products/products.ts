import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container';

@Component({
  selector: 'app-products',
  imports: [ContainerComponent, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {}
