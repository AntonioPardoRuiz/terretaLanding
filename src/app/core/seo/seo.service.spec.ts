import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { SeoService } from './seo.service';
import { canonicalPath, DEFAULT_IMAGE, SITE_URL } from './seo-data';

describe('SEO metadata during navigation', () => {
  it('updates metadata, canonical and a single JSON-LD graph on every existing route, and clears them for 404', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), provideHttpClient()] });
    const harness = await RouterTestingHarness.create();
    const document = TestBed.inject(DOCUMENT);
    const seoService = TestBed.inject(SeoService);
    seoService.listenToRouteChanges();
    seoService.listenToRouteChanges();
    const pages = routes.filter((route) => route.path !== '**');
    expect(pages).toHaveLength(12);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const route of pages) {
      await harness.navigateByUrl(`/${route.path}?source=test#details`);
      const seo = route.data!['seo'];
      titles.add(seo.title);
      descriptions.add(seo.description);
      expect(document.title).toBe(seo.title);
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
        seo.description,
      );
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        SITE_URL + seo.canonicalPath,
      );
      expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
        SITE_URL + seo.canonicalPath,
      );
      expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
        seo.image ?? DEFAULT_IMAGE,
      );
      expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
        'index, follow',
      );
      expect(document.querySelectorAll('#terreta-structured-data')).toHaveLength(1);
      const graph = JSON.parse(document.getElementById('terreta-structured-data')!.textContent!)[
        '@graph'
      ];
      expect(graph.find((node: Record<string, unknown>) => node['@type'] === 'WebPage').url).toBe(
        SITE_URL + seo.canonicalPath,
      );
      expect(harness.routeNativeElement?.querySelectorAll('h1')).toHaveLength(1);
    }
    expect(titles.size).toBe(12);
    expect(descriptions.size).toBe(12);
    await harness.navigateByUrl('/does-not-exist');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain(
      'noindex',
    );
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.getElementById('terreta-structured-data')).toBeNull();
    await harness.navigateByUrl('/servicios');
    expect(document.querySelectorAll('#terreta-structured-data')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      SITE_URL + '/servicios',
    );
  });

  it('strips navigation parameters and never adopts another canonical origin', () => {
    expect(canonicalPath('/servicios/?ref=a#software')).toBe('/servicios');
    expect(canonicalPath('/?ref=a')).toBe('/');
    expect(canonicalPath('//localhost:4200/servicios')).toBe('/');
    expect(canonicalPath('https://example.com/')).toBe('/');
  });
});
