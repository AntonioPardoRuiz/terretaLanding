import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about';

describe('AboutComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [AboutComponent], providers: [provideRouter([])] }).compileComponents());

  it('renders verified corporate content without obsolete educational language', () => {
    const fixture = TestBed.createComponent(AboutComponent); fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelectorAll('.capabilities-grid article')).toHaveLength(4);
    expect(element.querySelectorAll('.values-grid article')).toHaveLength(6);
    expect(element.textContent).not.toMatch(/estudiantes|instructores|cursos/i);
  });

  it('links to services, methodology and contact', () => {
    const fixture = TestBed.createComponent(AboutComponent); fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('a[href="/servicios"]').length).toBeGreaterThanOrEqual(2);
    expect(element.querySelector('a[href="/como-trabajamos"]')).toBeTruthy();
    expect(element.querySelectorAll('a[href="/contacto"]').length).toBeGreaterThanOrEqual(2);
  });
});
