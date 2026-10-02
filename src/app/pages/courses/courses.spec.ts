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
  shift: 'Mañana',
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
  it('publishes the 2027 catalog with common prices and the funding exception', () => {
    const fixture = TestBed.createComponent(CoursesComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.company-course')).toHaveLength(7);
    for (const title of ['Python', 'Flask', 'Django', 'C#', 'Microsoft']) {
      expect(element.querySelector('#formacion-empresas')?.textContent).toContain(title);
    }
    expect(element.querySelector('.course-card time')?.getAttribute('datetime')).toBe('2027');
    expect(element.textContent).not.toContain('2026');
    expect(element.querySelector('#precios')?.textContent).toContain(
      'Todos los cursos son de pago',
    );
    expect(element.querySelector('#precios')?.textContent).toContain(
      'financiados por empresas tecnológicas',
    );
    expect(
      Array.from(element.querySelectorAll('#precios tbody td'), (cell) => cell.textContent?.trim()),
    ).toEqual(['50 €', '65 €', '75 €', '90 €']);
    for (const link of element.querySelectorAll<HTMLAnchorElement>(
      '.company-course a[href$="#precios"]',
    )) {
      expect(element.querySelector(new URL(link.href).hash)).toBeTruthy();
    }
  });
  it('keeps course information, index and registration links on the courses route', () => {
    const fixture = TestBed.createComponent(CoursesComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll<HTMLAnchorElement>('.course-index a, .course-actions a');
    expect(links).toHaveLength(9);
    for (const link of links) {
      const url = new URL(link.getAttribute('href')!, 'https://www.realterretaia.com/');
      expect(url.pathname).toBe('/cursos');
      expect(element.querySelector(url.hash)).toBeTruthy();
    }
    expect(element.querySelector('img[alt="Power BI"]')?.getAttribute('src')).toBe(
      '/assets/images/power-bi-224.webp',
    );
  });
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
      'Inicio: 2027',
      '30 plazas',
      'Los cursos son de pago, salvo los financiados por empresas tecnológicas',
      '4.ª semana antes del inicio: 50 €',
      '3.ª semana antes del inicio: 65 €',
      '2.ª semana antes del inicio: 75 €',
      'Última semana antes del inicio: 90 €',
      valid.computer,
      valid.os,
      'Conexión a internet: No',
      'Turno elegido: Mañana',
      '10:00–11:30',
      '18:00–19:30',
      'Seis sesiones de 90 minutos y una de 60 minutos',
      'Última sesión: 10:00–11:00 o 18:00–19:00',
    ])
      expect(request.request.body.needs).toContain(value);
    request.flush({ ok: true });
    await pending;
    expect(component.status()).toBe('success');
    expect(component.form.controls.name.value).toBe('');
  });
  it('requires a valid shift and sends the afternoon selection', async () => {
    const component = TestBed.createComponent(CoursesComponent).componentInstance;
    component.form.setValue({ ...valid, shift: '' });
    await component.submit();
    TestBed.inject(HttpTestingController).expectNone('/api/contact');
    component.form.controls.shift.setValue('Noche');
    await component.submit();
    TestBed.inject(HttpTestingController).expectNone('/api/contact');
    component.form.controls.shift.setValue('Tarde');
    const pending = component.submit();
    const request = TestBed.inject(HttpTestingController).expectOne('/api/contact');
    expect(request.request.body.needs).toContain('Turno elegido: Tarde');
    request.flush({ ok: true });
    await pending;
    expect(component.status()).toBe('success');
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
