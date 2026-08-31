import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EliteCoachComponent } from './elite-coach';

describe('EliteCoachComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliteCoachComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders one correct H1 and all main product sections', () => {
    const fixture = TestBed.createComponent(EliteCoachComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('profesionaliza tu negocio fitness');
    expect(element.querySelector('#problem-title')).toBeTruthy();
    expect(element.querySelector('#features-title')).toBeTruthy();
    expect(element.querySelector('#tutorials-title')).toBeTruthy();
    expect(element.querySelector('#built-title')).toBeTruthy();
  });

  it('separates trainer and client features and preserves the six tutorials', () => {
    const fixture = TestBed.createComponent(EliteCoachComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('.feature-panel')).toHaveLength(2);
    expect(element.querySelector('.features')?.textContent).toContain('Planificación de rutinas');
    expect(element.querySelector('.features')?.textContent).toContain('Todo su plan en el móvil');
    expect(element.querySelectorAll('.tutorial-card')).toHaveLength(6);
    expect(element.querySelectorAll('.tutorial-card iframe')).toHaveLength(0);
  });

  it('links to Contacto, Home and Servicios and loads videos on interaction', () => {
    const fixture = TestBed.createComponent(EliteCoachComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('a[href="/contacto"]').length).toBeGreaterThanOrEqual(2);
    expect(element.querySelector('a[href="/"]')).toBeTruthy();
    expect(element.querySelectorAll('a[href="/servicios"]').length).toBeGreaterThanOrEqual(2);

    element.querySelector<HTMLButtonElement>('.video-frame button')?.click();
    fixture.detectChanges();
    expect(element.querySelectorAll('.tutorial-card iframe')).toHaveLength(1);
  });
});
