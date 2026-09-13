import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/layout/footer/footer';
import { HeaderComponent } from './core/layout/header/header';
import { SeoService } from './core/seo/seo.service';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  get contentAnchor(): string {
    return this.router.url.split(/[?#]/)[0] + '#main-content';
  }
  private readonly document = inject(DOCUMENT);
  skipToContent(event: Event): void {
    event.preventDefault();
    const content = this.document.getElementById('main-content');
    content?.focus();
    content?.scrollIntoView();
  }

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.listenToRouteChanges();
  }
}
