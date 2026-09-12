import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RuntimeConfigService } from '../../core/config/runtime-config.service';
import { CoursesComponent } from './courses';

const valid = {
  name: 'Ana Pérez',
  email: 'ana@example.com',
  computer: 'Portátil Lenovo',
  os: 'Windows 11',
  internet: 'No',
  privacy: true,
  website: '',
};
describe('CoursesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useValue: { contactEndpoint: () => '/api/contact' } },
      ],
    }).compileComponents();
  });
  afterEach(() => TestBed.inject(HttpTestingController).verify());
  it('requires equipment, connectivity and consent before sending', async () => {
    const component = TestBed.createComponent(CoursesComponent).componentInstance;
    component.form.patchValue({ ...valid, internet: '', privacy: false });
    await component.submit();
    expect(component.form.invalid).toBe(true);
    TestBed.inject(HttpTestingController).expectNone('/api/contact');
  });
  it('sends the course and all equipment details, including no internet, through the email service', async () => {
    const component = TestBed.createComponent(CoursesComponent).componentInstance;
    component.form.setValue(valid);
    const pending = component.submit();
    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(request.request.body.email).toBe(valid.email);
    for (const value of [
      'Power BI',
      '10 horas',
      '1 de noviembre de 2026',
      '30 plazas',
      'Del 4 al 10 de octubre: 50 €',
      'Del 11 al 17 de octubre: 65 €',
      'Del 18 al 24 de octubre: 75 €',
      'Del 25 al 31 de octubre: 90 €',
      valid.computer,
      valid.os,
      'Conexión a internet: No',
    ])
      expect(request.request.body.needs).toContain(value);
    request.flush({ ok: true });
    await pending;
    expect(component.status()).toBe('success');
    expect(component.form.controls.name.value).toBe('');
  });
  it('preserves data when delivery is not confirmed and prevents concurrent submissions', async () => {
    const component = TestBed.createComponent(CoursesComponent).componentInstance;
    component.form.setValue(valid);
    const pending = component.submit();
    await component.submit();
    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    request.flush({ ok: false });
    await pending;
    expect(component.status()).toBe('error');
    expect(component.form.getRawValue()).toEqual(valid);
  });
});
