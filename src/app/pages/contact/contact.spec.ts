import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
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
        provideRouter([{ path: 'contacto', component: ContactComponent }]),
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
  it('preserves the form when the server does not confirm delivery', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.componentInstance.contactForm.setValue(validValue);
    fixture.componentInstance.submit();
    TestBed.inject(HttpTestingController).expectOne('/api/contact').flush({ ok: false });
    expect(fixture.componentInstance.status()).toBe('error');
    expect(fixture.componentInstance.contactForm.getRawValue()).toEqual(validValue);
  });

  it('trims fields before validating and submitting', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.componentInstance.contactForm.setValue({ ...validValue, email: ' test@example.com ' });
    fixture.componentInstance.submit();
    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(request.request.body.email).toBe('test@example.com');
    request.flush({ ok: true });
  });

  it('prefills the chosen demo and includes it in email even if the message is edited', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/contacto?demo=CRMHealth', ContactComponent);
    expect(component.selectedDemo()).toBe('CRMHealth');
    expect(component.contactForm.controls.needs.value).toContain('CRMHealth');
    component.contactForm.patchValue(validValue);
    component.submit();
    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(request.request.body.needs).toBe('Demo solicitada: CRMHealth\n\n' + validValue.needs);
    request.flush({ ok: true });
  });
  it('handles query changes without overwriting a visitor message and ignores unknown demos', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/contacto?demo=CRMHealth', ContactComponent);
    component.contactForm.controls.needs.setValue(validValue.needs);
    await harness.navigateByUrl('/contacto?demo=unknown', ContactComponent);
    expect(component.selectedDemo()).toBeNull();
    expect(component.contactForm.controls.needs.value).toBe(validValue.needs);
    expect(component.messageLimit()).toBe(3000);
  });
});
