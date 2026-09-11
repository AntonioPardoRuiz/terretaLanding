import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CareersService } from './careers.service';

@Component({
  selector: 'app-careers',
  imports: [ContainerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './careers.html',
  styleUrls: ['../contact/contact.scss', '../contact/contact-states.scss', './careers.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersComponent {
  private readonly service = inject(CareersService);
  private readonly element = inject(ElementRef) as ElementRef<HTMLElement>;
  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly submitted = signal(false);
  readonly file = signal<File | null>(null);
  readonly fileError = signal('');
  readonly error = signal('');
  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[^\r\n]*$/),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(/^[+()\d\s-]{7,20}$/)],
    }),
    needs: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(3000)] }),
    privacy: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    website: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(0)] }),
  });
  hasError(key: keyof CareersComponent['form']['controls']) {
    const control = this.form.controls[key];
    return control.invalid && (control.touched || this.submitted());
  }
  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.file.set(null);
    this.fileError.set('');
    this.status.set('idle');
    if (!file) return;
    if (
      !/\.pdf$/i.test(file.name) ||
      file.name.length > 120 ||
      (file.type && file.type !== 'application/pdf')
    ) {
      this.fileError.set('Selecciona un PDF con un nombre de hasta 120 caracteres.');
    } else if (!file.size || file.size > 2 * 1024 * 1024) {
      this.fileError.set('El CV debe tener contenido y ocupar como máximo 2 MB.');
    } else this.file.set(file);
    if (this.fileError()) input.value = '';
  }
  async submit() {
    if (this.status() === 'loading') return;
    for (const key of ['name', 'email', 'phone', 'needs', 'website'] as const) {
      const control = this.form.controls[key];
      control.setValue(control.value.trim());
    }
    this.submitted.set(true);
    this.status.set('idle');
    this.error.set('');
    const file = this.file();
    if (!file && !this.fileError()) this.fileError.set('Adjunta tu CV en PDF.');
    if (this.form.invalid || !file) {
      this.form.markAllAsTouched();
      queueMicrotask(() =>
        this.element.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    const value = this.form.getRawValue();
    this.status.set('loading');
    try {
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1]);
        reader.onerror = () => reject(new Error('No se pudo leer el archivo'));
        reader.onabort = () => reject(new Error('Lectura cancelada'));
        reader.readAsDataURL(file);
      });
      await firstValueFrom(this.service.send({ ...value, cv: { filename: file.name, content } }));
      this.form.reset();
      this.file.set(null);
      this.fileError.set('');
      const input = this.element.nativeElement.querySelector<HTMLInputElement>('#cv');
      if (input) input.value = '';
      this.submitted.set(false);
      this.status.set('success');
    } catch (error) {
      this.error.set(
        error instanceof HttpErrorResponse && error.status === 429
          ? 'Has realizado demasiados intentos. Espera 15 minutos antes de volver a enviar.'
          : error instanceof HttpErrorResponse && error.status === 422
            ? 'Revisa tus datos y comprueba que el archivo es un PDF válido de hasta 2 MB.'
            : 'No hemos podido enviar tu candidatura. Conservamos los datos para que puedas intentarlo de nuevo.',
      );
      this.status.set('error');
    }
  }
}
