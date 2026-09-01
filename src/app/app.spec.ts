import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { RuntimeConfigService } from './core/config/runtime-config.service';

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

  it('links every main corporate page and removes outsourcing from navigation', async () => {
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
    expect(links).not.toContain('/outsourcing');
  });

  it('shows team access without publishing a fake link while CRM_URL is pending', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.team-access, .footer__team > span')).toHaveLength(2);
    expect(compiled.querySelector('a[href="#"], a[href="/login"], a[href="/crm"]')).toBeNull();
  });

  it('uses the configured external CRM URL safely', async () => {
    TestBed.overrideProvider(RuntimeConfigService, {
      useValue: {
        crmUrl: () => 'https://crm.example.test/',
        contactEndpoint: () => '/api/contact',
        load: () => Promise.resolve(),
      },
    });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = fixture.nativeElement.querySelectorAll(
      'a[href="https://crm.example.test/"]',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    }
  });
});
