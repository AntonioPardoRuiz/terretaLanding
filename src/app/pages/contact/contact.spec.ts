import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RuntimeConfigService } from '../../core/config/runtime-config.service';
import { ContactComponent } from './contact';

const validValue = {
  name: 'Antonio',
  company: 'Terreta',
  email: 'test@example.com',
  phone: '',
  needs: 'Necesitamos una aplicación web para gestionar procesos.',
  privacy: true,
  website: '',
};

describe('ContactComponent', () => {
  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: RuntimeConfigService,
          useValue: { contactEndpoint: () => '/api/contact', crmUrl: () => null },
        },
      ],
    }).compileComponents(),
  );

  it('renders all fields and links privacy', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    for (const field of ['name', 'company', 'email', 'phone', 'needs', 'privacy'])
      expect(element.querySelector(`[formControlName="${field}"]`)).toBeTruthy();
    expect(element.querySelector('a[href="/privacy-policy"]')).toBeTruthy();
  });

  it('requires fields, valid email and privacy consent', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.contactForm.invalid).toBe(true);
    component.contactForm.patchValue({
      name: 'Antonio',
      email: 'incorrecto',
      needs: validValue.needs,
      privacy: false,
    });
    expect(component.contactForm.controls.email.invalid).toBe(true);
    expect(component.contactForm.controls.privacy.invalid).toBe(true);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
        'button[type="submit"]',
      )?.disabled,
    ).toBe(true);
  });

  it('does not submit an invalid form', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    fixture.componentInstance.submit();
    TestBed.inject(HttpTestingController).expectNone('/api/contact');
  });

  it('shows loading and success only after a successful response', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.componentInstance.contactForm.setValue(validValue);
    fixture.componentInstance.submit();
    fixture.detectChanges();
    expect(fixture.componentInstance.status()).toBe('loading');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Enviando');
    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(request.request.method).toBe('POST');
    request.flush({ ok: true });
    fixture.detectChanges();
    expect(fixture.componentInstance.status()).toBe('success');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Hemos recibido tu mensaje',
    );
  });

  it('shows an error after a backend failure and allows retry', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.componentInstance.contactForm.setValue(validValue);
    fixture.componentInstance.submit();
    TestBed.inject(HttpTestingController)
      .expectOne('/api/contact')
      .flush({ error: 'failure' }, { status: 502, statusText: 'Bad gateway' });
    fixture.detectChanges();
    expect(fixture.componentInstance.status()).toBe('error');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Inténtalo de nuevo');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
        'button[type="submit"]',
      )?.disabled,
    ).toBe(false);
  });
});
