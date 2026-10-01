import { PAGE_FAQS } from '../../core/seo/page-faqs';
import { FaqComponent } from '../../shared/ui/faq/faq';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CRM_URL } from '../../core/config/runtime-config.service';

@Component({
  selector: 'app-products',
  imports: [FaqComponent, ContainerComponent, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly crmUrl = CRM_URL;
  readonly faqs = PAGE_FAQS['/productos'];}
