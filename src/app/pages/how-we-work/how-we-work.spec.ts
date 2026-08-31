import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HowWeWorkComponent } from './how-we-work';

describe('HowWeWorkComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowWeWorkComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the correct single H1 and the main sections', () => {
    const fixture = TestBed.createComponent(HowWeWorkComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Cómo trabajamos en Terreta');
    expect(element.querySelector('#principles-title')).toBeTruthy();
    expect(element.querySelector('#phases-title')).toBeTruthy();
    expect(element.querySelector('#collaboration-title')).toBeTruthy();
    expect(element.querySelector('#commitment-title')).toBeTruthy();
  });

  it('renders four principles and the six real project phases', () => {
    const fixture = TestBed.createComponent(HowWeWorkComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('.principle-card')).toHaveLength(4);
    expect(element.querySelectorAll('.timeline > .phase')).toHaveLength(6);
    expect(element.querySelector('.timeline')?.textContent).toContain('Descubrimiento y alineación');
    expect(element.querySelector('.timeline')?.textContent).toContain('Despliegue, soporte y evolución');
  });

  it('links the CTA to contact and includes internal links', () => {
    const fixture = TestBed.createComponent(HowWeWorkComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('a[href="/contacto"]').length).toBeGreaterThanOrEqual(2);
    expect(element.querySelectorAll('a[href="/servicios"]').length).toBeGreaterThanOrEqual(2);
    expect(element.querySelector('a[href="/"]')).toBeTruthy();
  });

  it('does not render internal editorial notes', () => {
    const fixture = TestBed.createComponent(HowWeWorkComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).not.toContain('vuestro plan');
    expect(text).not.toContain('plan de negocio');
  });
});
