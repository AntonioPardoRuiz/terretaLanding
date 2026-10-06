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
    expect(element.querySelector('h1')?.textContent).toContain('Desarrollo web en Alicante');
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

    expect(element.querySelectorAll('a[href^="/servicios#"]')).toHaveLength(5);
    expect(
      element.querySelectorAll('a[href="/aplicaciones/fitness-app"]').length,
    ).toBeGreaterThanOrEqual(2);
    expect(element.querySelector('a[href="/productos"]')?.textContent).toContain(
      'Ver todos los productos',
    );
    expect(element.textContent).toContain('ContaTerra');
    expect(element.textContent).toContain('TerretaRail');
  });

  it('shows Curae beside Elite Coach and includes the full catalog in an accessible scroll region', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.showcase__bottom a[href="/productos/curae"]')).toBeTruthy();
    const track = element.querySelector<HTMLElement>('#home-products')!;
    expect(track.tabIndex).toBe(0);
    expect(track.querySelectorAll('.solution-card')).toHaveLength(9);
    expect(track.querySelector('a[href="/productos/curae"]')).toBeTruthy();
    const scrollBy = vi.fn();
    track.scrollBy = scrollBy;
    vi.spyOn(track.querySelector<HTMLElement>('.solution-card')!, 'getBoundingClientRect').mockReturnValue({ width: 300 } as DOMRect);
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false } as MediaQueryList));
    const buttons = element.querySelectorAll<HTMLButtonElement>('.products-controls button');
    buttons[1].click();
    expect(scrollBy.mock.calls[0][0].left).toBeGreaterThan(0);
    buttons[0].click();
    expect(scrollBy.mock.calls[1][0].left).toBeLessThan(0);
    vi.unstubAllGlobals();
  });
});
