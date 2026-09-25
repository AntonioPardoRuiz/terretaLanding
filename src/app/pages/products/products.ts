import { PAGE_FAQS } from '../../core/seo/page-faqs';
import { FaqComponent } from '../../shared/ui/faq/faq';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container';

@Component({
  selector: 'app-products',
  imports: [FaqComponent, ContainerComponent, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly faqs = PAGE_FAQS['/productos'];}
