import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container';

@Component({
  selector: 'app-contact',
  imports: [ContainerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly submitted = signal(false);
  readonly readyNotice = signal(false);
  readonly contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    company: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^[+()\d\s-]{7,20}$/)] }),
    needs: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(20)] }),
    privacy: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  submit(): void {
    this.submitted.set(true);
    this.readyNotice.set(false);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.readyNotice.set(true);
  }

  hasError(control: keyof ContactComponent['contactForm']['controls']): boolean {
    const field = this.contactForm.controls[control];
    return field.invalid && (field.touched || this.submitted());
  }
}
