import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact';

describe('ContactComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [ContactComponent], providers: [provideRouter([])] }).compileComponents());

  it('renders the complete accessible contact form', () => {
    const fixture = TestBed.createComponent(ContactComponent); fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelectorAll('form input')).toHaveLength(5);
    expect(element.querySelector('textarea[formControlName="needs"]')).toBeTruthy();
    expect(element.querySelector('a[href="/privacy-policy"]')).toBeTruthy();
  });

  it('validates required fields without simulating a successful send', () => {
    const fixture = TestBed.createComponent(ContactComponent); fixture.detectChanges();
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(fixture.componentInstance.contactForm.invalid).toBe(true);
    expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('enviado correctamente');
  });

  it('states that valid data has not been sent because there is no backend', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.componentInstance.contactForm.setValue({ name: 'Antonio', company: 'Terreta', email: 'test@example.com', phone: '', needs: 'Necesitamos una aplicación web para gestionar procesos.', privacy: true });
    fixture.componentInstance.submit(); fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('no se han enviado');
  });
});
