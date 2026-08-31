import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PrivacyComponent } from './privacy';

describe('PrivacyComponent', () => {
  it('renders the legal document with one H1 and eight accessible sections', async () => {
    await TestBed.configureTestingModule({ imports: [PrivacyComponent], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(PrivacyComponent); fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('h1')).toHaveLength(1);
    expect(element.querySelectorAll('.legal-layout article > section')).toHaveLength(8);
    expect(element.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(element.querySelector('a[href="mailto:terretasoftware@gmail.com"]')).toBeTruthy();
  });
});
