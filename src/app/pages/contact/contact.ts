import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ContainerComponent } from '../../shared/ui/container/container';
import { ContactPayload, ContactService } from './contact.service';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ContainerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss', './contact-states.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly contactService = inject(ContactService);
  private readonly element = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly route = inject(ActivatedRoute);
  readonly selectedDemo = signal<string | null>(null);
  readonly messageLimit = signal(3000);
  private demoPrefix(): string {
    return this.selectedDemo() ? `Demo solicitada: ${this.selectedDemo()}\n\n` : '';
  }
  readonly submitted = signal(false);
  readonly status = signal<FormStatus>('idle');
  readonly contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    }),
    company: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(120)] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(/^[+()\d\s-]{7,20}$/), Validators.maxLength(20)],
    }),
    needs: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20), Validators.maxLength(3000)],
    }),
    privacy: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    website: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(0)] }),
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const previousMessage = this.selectedDemo()
        ? `Quiero probar la demo de ${this.selectedDemo()}.`
        : '';
      // Only demos currently offered in the public catalogue can be selected.
      this.selectedDemo.set(params.get('demo') === 'CRMHealth' ? 'CRMHealth' : null);
      const limit = 3000 - this.demoPrefix().length;
      this.messageLimit.set(limit);
      const needs = this.contactForm.controls.needs;
      needs.setValidators([
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(limit),
      ]);
      if (!needs.value || needs.value === previousMessage) {
        needs.setValue(
          this.selectedDemo() ? `Quiero probar la demo de ${this.selectedDemo()}.` : '',
        );
      }
      needs.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.status() === 'loading') return;
    for (const key of ['name', 'company', 'email', 'phone', 'needs', 'website'] as const) {
      const control = this.contactForm.controls[key];
      control.setValue(control.value.trim());
    }
    this.submitted.set(true);
    this.status.set('idle');
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      queueMicrotask(() => this.focusFirstInvalid());
      return;
    }
    this.status.set('loading');
    const value = this.contactForm.getRawValue();
    this.contactService
      .send({ ...value, needs: this.demoPrefix() + value.needs, privacy: true } as ContactPayload)
      .pipe(
        finalize(() => {
          if (this.status() === 'loading') this.status.set('idle');
        }),
      )
      .subscribe({
        next: () => {
          this.status.set('success');
          this.submitted.set(false);
          this.contactForm.reset();
        },
        error: () => this.status.set('error'),
      });
  }

  hasError(control: keyof ContactComponent['contactForm']['controls']): boolean {
    const field = this.contactForm.controls[control];
    return field.invalid && (field.touched || this.submitted());
  }
  private focusFirstInvalid(): void {
    this.element.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }
}
