import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

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
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('header a, footer a')).map((link) => link.getAttribute('href'));

    expect(links).toContain('/servicios');
    expect(links).toContain('/aplicaciones/fitness-app');
    expect(links).toContain('/como-trabajamos');
    expect(links).toContain('/nosotros');
    expect(links).toContain('/contacto');
    expect(links).toContain('/privacy-policy');
    expect(links).not.toContain('/outsourcing');
  });
});
