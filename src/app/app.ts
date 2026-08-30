import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.listenToRouteChanges();
  }
}
