import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { FaqItem } from '../../../core/seo/seo-data';
import { ContainerComponent } from '../container/container';

@Component({
  selector: 'app-faq',
  imports: [ContainerComponent],
  template: `<section class="faq">
    <app-container
      ><h2>Preguntas frecuentes</h2>
      @for (item of items(); track item.question) {
        <details>
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      }
    </app-container>
  </section>`,
  styles: `
    :host {
      display: block;
    }
    .faq {
      padding: var(--space-2xl) 0;
      background: var(--color-surface-soft);
    }
    h2 {
      font-size: clamp(1.8rem, 3.5vw, 2.7rem);
    }
    details {
      padding: 1.2rem 0;
      border-bottom: 1px solid var(--color-border);
      max-width: 58rem;
    }
    summary {
      cursor: pointer;
      font-weight: 700;
      color: var(--color-heading);
    }
    p {
      line-height: 1.8;
      max-width: 52rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  readonly items = input.required<readonly FaqItem[]>();
}
