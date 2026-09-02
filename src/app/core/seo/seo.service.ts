import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

interface SeoData { title: string; description: string; canonicalPath?: string; image?: string; noIndex?: boolean; }

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly siteUrl = 'https://www.realterretaia.com';
  private listening = false;

  listenToRouteChanges(): void {
    if (this.listening) return;
    this.listening = true;
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith(null), map(() => this.deepestRoute(this.route).snapshot.data['seo'] as SeoData | undefined)).subscribe((seo) => { if (seo) this.update(seo); });
  }

  private update(seo: SeoData): void {
    const canonicalUrl = `${this.siteUrl}${seo.canonicalPath ?? this.router.url.split('?')[0]}`;
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'robots', content: seo.noIndex ? 'noindex, nofollow' : 'index, follow' });
    if (seo.image) this.meta.updateTag({ property: 'og:image', content: seo.image }); else this.meta.removeTag("property='og:image'");
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = this.document.createElement('link'); canonical.rel = 'canonical'; this.document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
  }

  private deepestRoute(route: ActivatedRoute): ActivatedRoute { while (route.firstChild) route = route.firstChild; return route; }
}
