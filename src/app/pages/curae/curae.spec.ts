import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CuraeComponent } from './curae';
import { routes } from '../../app.routes';

describe('CuraeComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({
    imports: [CuraeComponent], providers: [provideRouter([])],
  }).compileComponents());

  it('presents the clinical scope while keeping future capabilities and capacity qualified', () => {
    const fixture = TestBed.createComponent(CuraeComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('h1')).toHaveLength(1);
    expect(page.querySelectorAll('.modules-list li')).toHaveLength(29);
    expect(page.textContent).toContain('cuando se active');
    expect(page.textContent).toContain('evolución prevista para iOS y Android');
    expect(page.textContent).toContain('uso razonable');
    expect(page.textContent).not.toMatch(/Betancourt|Partner|2\.600|69,90|129,90/);
    expect(page.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(page.querySelector('a[href="/productos"]')).toBeTruthy();
  });

  it('provides a lazy product route and matching canonical path', async () => {
    const route = routes.find((item) => item.path === 'productos/curae');
    expect(route?.data?.['seo'].canonicalPath).toBe('/productos/curae');
    expect(await route?.loadComponent?.()).toBe(CuraeComponent);
  });
});
