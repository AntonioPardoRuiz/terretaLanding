import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { CRM_URL, RuntimeConfigService } from './core/config/runtime-config.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the corporate shell', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector<HTMLImageElement>('header .brand img')?.alt).toBe('Terreta');
    expect(compiled.querySelector('footer')?.textContent).toContain('Alicante, España');
  });

  it('links every main corporate page including outsourcing and pricing', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      compiled.querySelectorAll<HTMLAnchorElement>('header a, footer a'),
    ).map((link) => link.getAttribute('href'));

    expect(links).toContain('/servicios');
    expect(compiled.querySelector('header a[href="/productos"]')?.textContent).toContain(
      'Productos',
    );
    expect(links).toContain('/aplicaciones/fitness-app');
    expect(links).toContain('/como-trabajamos');
    expect(links).toContain('/nosotros');
    expect(links).toContain('/contacto');
    expect(links).toContain('/privacy-policy');
    expect(links).toContain('/outsourcing');
    expect(links).toContain('/tarifas');
  });

  it('shows team access in the header and footer using the official CRM URL', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>(`a[href="${CRM_URL}"]`);
    expect(links).toHaveLength(2);
    expect(compiled.querySelector('.navigation .team-access')?.textContent).toContain(
      'Acceso equipo',
    );
    expect(compiled.querySelector('.footer__team a')?.textContent).toContain('Acceso equipo');
    expect(compiled.querySelector('a[href="#"], a[href="/login"], a[href="/crm"]')).toBeNull();
    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.rel).toBe('noopener noreferrer');
      expect(link.getAttribute('aria-label')).toContain('pestaña nueva');
    }
  });
});
