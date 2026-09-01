import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductsComponent } from './products';

describe('ProductsComponent', () => {
  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [provideRouter([])],
    }).compileComponents(),
  );

  it('presents the five products with a single H1', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelector('h1')?.textContent).toContain(
      'Software creado para problemas reales',
    );
    expect(element.textContent).toContain('Elite Coach');
    expect(element.textContent).toContain('Jessica Castejón Psicología');
    expect(element.textContent).toContain('TerretaAgro');
    expect(element.textContent).toContain('ContaTerra');
    expect(element.textContent).toContain('TerretaRail');
  });

  it('links to Elite Coach and Contact', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('a[href="/aplicaciones/fitness-app"]')).toBeTruthy();
    expect(element.querySelector('a[href="/contacto"]')).toBeTruthy();
  });

  it('limits TerretaAgro to its three confirmed areas', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const agro = fixture.nativeElement.querySelector('#terreta-agro') as HTMLElement;
    expect(agro.textContent).toContain('Campo');
    expect(agro.textContent).toContain('Almacén');
    expect(agro.textContent).toContain('Transporte');
    expect(agro.textContent).toContain('Vista demostrativa · Sin datos de clientes');
  });
});
