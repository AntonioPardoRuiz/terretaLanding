import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the main message and primary calls to action', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Software, automatización e IA');
    expect(element.querySelector<HTMLAnchorElement>('a[href="/contacto"]')?.textContent).toContain(
      'Solicitar propuesta',
    );
    expect(
      element.querySelector<HTMLAnchorElement>('a[href="/como-trabajamos"]')?.textContent,
    ).toContain('Ver cómo trabajamos');
  });

  it('provides semantic links to services and Elite Coach', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('a[href="/servicios"]')).toHaveLength(5);
    expect(
      element.querySelectorAll('a[href="/aplicaciones/fitness-app"]').length,
    ).toBeGreaterThanOrEqual(2);
    expect(element.querySelector('a[href="/productos"]')?.textContent).toContain(
      'Ver todos los productos',
    );
    expect(element.textContent).toContain('ContaTerra');
    expect(element.textContent).toContain('TerretaRail');
  });
});
