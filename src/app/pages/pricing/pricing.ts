import { PAGE_FAQS } from '../../core/seo/page-faqs';
import { FaqComponent } from '../../shared/ui/faq/faq';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';

@Component({
  selector: 'app-pricing',
  imports: [FaqComponent, ButtonComponent, ContainerComponent],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
  readonly faqs = PAGE_FAQS['/tarifas'];}
