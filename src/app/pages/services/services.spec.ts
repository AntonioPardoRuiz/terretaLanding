import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesComponent } from './services';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the five verified services with a single main heading', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain('Servicios tecnológicos a medida');
    expect(element.querySelectorAll('.services-list .service')).toHaveLength(5);
    expect(element.querySelector('.services-list')?.textContent).toContain('Soporte, mantenimiento y evolución');
  });

  it('links service enquiries to contact and methodology to how we work', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('a[href="/contacto"]').length).toBeGreaterThanOrEqual(7);
    expect(element.querySelectorAll('a[href="/como-trabajamos"]').length).toBeGreaterThanOrEqual(2);
  });
});
