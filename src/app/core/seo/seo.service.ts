import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { canonicalPath, DEFAULT_IMAGE, SeoData, SITE_URL, structuredData } from './seo-data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private listening = false;

  listenToRouteChanges(): void {
    if (this.listening) return;
    this.listening = true;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.deepestRoute(this.route).snapshot.data['seo'] as SeoData | undefined),
      )
      .subscribe((seo) => {
        if (seo) this.update(seo);
      });
  }

  private update(seo: SeoData): void {
    const path = canonicalPath(seo.canonicalPath ?? this.router.url);
    const canonicalUrl = `${SITE_URL}${path}`;
    const image = seo.image ?? DEFAULT_IMAGE;
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Terreta' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: image === DEFAULT_IMAGE ? 'Terreta' : 'Pantalla de acceso de Elite Coach',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({
      name: 'robots',
      content: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    });
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const existingGraph = this.document.getElementById('terreta-structured-data');
    if (seo.noIndex) {
      canonical?.remove();
      existingGraph?.remove();
      return;
    }
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    const script = existingGraph ?? this.document.createElement('script');
    script.id = 'terreta-structured-data';
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(structuredData(seo, path)).replace(/</g, '\\u003c');
    if (!existingGraph) this.document.head.appendChild(script);
  }

  private deepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) route = route.firstChild;
    return route;
  }
}
