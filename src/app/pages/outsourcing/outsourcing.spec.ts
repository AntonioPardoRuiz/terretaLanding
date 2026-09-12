import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { OutsourcingComponent } from './outsourcing';

describe('Outsourcing navigation', () => {
  it('keeps the hours link on outsourcing and targets the pricing section', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'outsourcing', component: OutsourcingComponent }])],
    });
    const harness = await RouterTestingHarness.create('/outsourcing');
    const page = harness.routeNativeElement!;
    const link = page.querySelector<HTMLAnchorElement>('.hero-actions .text-link')!;

    expect(link.getAttribute('href')).toBe('/outsourcing#bolsas-horas');
    link.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/outsourcing#bolsas-horas');
    expect(harness.routeNativeElement?.querySelectorAll('#bolsas-horas .plan')).toHaveLength(3);
    expect(page.querySelector('#team-title')?.textContent).toContain('Equipo en España');
    expect(page.querySelector('.team-card')?.textContent).toContain('no los externalizamos');
  });
});
