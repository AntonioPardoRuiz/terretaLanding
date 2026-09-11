import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CareersComponent } from './careers';

const endpoint = 'https://terreta-contact.terretasoftware.workers.dev/api/careers';
const valid = {
  name: 'Antonio',
  email: 'candidate@example.com',
  phone: '',
  needs: '',
  privacy: true,
  website: '',
};
const pdf = () => new File(['%PDF-1.4\n%%EOF'], 'cv.pdf', { type: 'application/pdf' });
function select(component: CareersComponent, file: File) {
  component.selectFile({ target: { files: [file], value: 'cv' } } as unknown as Event);
}
describe('CareersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareersComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });
  afterEach(() => TestBed.inject(HttpTestingController).verify());
  it('renders the CV field and consent link', () => {
    const fixture = TestBed.createComponent(CareersComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Trabajar con nosotros');
    expect(fixture.nativeElement.querySelector('input[type=file]').accept).toBe(
      '.pdf,application/pdf',
    );
    expect(
      fixture.nativeElement.querySelector('a[href="/privacy-policy#candidaturas"]'),
    ).toBeTruthy();
  });
  it('requires the CV and consent without submitting', async () => {
    const c = TestBed.createComponent(CareersComponent).componentInstance;
    c.form.setValue({ ...valid, privacy: false });
    await c.submit();
    expect(c.fileError()).toContain('Adjunta');
    expect(c.hasError('privacy')).toBe(true);
    TestBed.inject(HttpTestingController).expectNone(endpoint);
  });
  it('rejects empty, oversized and non-PDF files', () => {
    const c = TestBed.createComponent(CareersComponent).componentInstance;
    for (const file of [
      new File([], 'cv.pdf'),
      new File(['x'], 'cv.exe'),
      new File([new Uint8Array(2 * 1024 * 1024 + 1)], 'cv.pdf'),
    ]) {
      select(c, file);
      expect(c.file()).toBeNull();
      expect(c.fileError()).not.toBe('');
    }
  });
  it('sends the PDF to the same Worker and clears only after confirmation', async () => {
    const fixture = TestBed.createComponent(CareersComponent);
    const c = fixture.componentInstance;
    c.form.setValue({ ...valid, email: ' candidate@example.com ' });
    select(c, pdf());
    const pending = c.submit();
    // FileReader completes asynchronously before the HTTP request is created.
    await vi.waitFor(() => expect(c.status()).toBe('loading'));
    let request: ReturnType<HttpTestingController['expectOne']> | undefined;
    await vi.waitFor(() => {
      request = TestBed.inject(HttpTestingController).expectOne(endpoint);
    });
    expect(request!.request.body.email).toBe(valid.email);
    expect(atob(request!.request.body.cv.content)).toBe('%PDF-1.4\n%%EOF');
    expect(c.file()).not.toBeNull();
    request!.flush({ ok: true });
    await pending;
    expect(c.status()).toBe('success');
    expect(c.file()).toBeNull();
    expect(c.form.controls.name.value).toBe('');
  });
  it('preserves the CV and input after a failure and prevents duplicate submissions', async () => {
    const c = TestBed.createComponent(CareersComponent).componentInstance;
    c.form.setValue(valid);
    const file = pdf();
    select(c, file);
    const pending = c.submit();
    await c.submit();
    let request: ReturnType<HttpTestingController['expectOne']> | undefined;
    await vi.waitFor(() => {
      request = TestBed.inject(HttpTestingController).expectOne(endpoint);
    });
    request!.flush({ ok: false });
    await pending;
    expect(c.status()).toBe('error');
    expect(c.file()).toBe(file);
    expect(c.form.getRawValue()).toEqual(valid);
  });
});
