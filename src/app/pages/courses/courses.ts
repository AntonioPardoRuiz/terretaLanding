import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ContainerComponent } from '../../shared/ui/container/container';
import { ContactService } from '../contact/contact.service';

@Component({
  selector: 'app-courses',
  imports: [ContainerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './courses.html',
  styleUrls: ['../contact/contact.scss', '../contact/contact-states.scss', './courses.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  readonly companyCourses = [
    {
      id: 'machine-learning',
      title: 'Iniciación a Machine Learning',
      description:
        'Aprende a aplicar el aprendizaje automático a los datos de tu empresa, con un recorrido adaptado a la experiencia de tu equipo.',
      modules: [
        {
          title: 'Principiante',
          description:
            'Fundamentos, preparación de datos y primeros modelos de clasificación y regresión.',
        },
        {
          title: 'Intermedio',
          description:
            'Selección de variables, evaluación de modelos y ajuste de hiperparámetros con casos prácticos.',
        },
        {
          title: 'Experto',
          description:
            'Modelos avanzados, despliegue y seguimiento de su rendimiento en producción.',
        },
      ],
    },
    {
      id: 'java-spring-boot',
      title: 'Java 8 y Spring Boot',
      description:
        'Refuerza las bases de Java 8 y aprende a desarrollar aplicaciones de negocio con Spring Boot como framework.',
      modules: [
        {
          title: 'Java 8',
          description:
            'Programación orientada a objetos, expresiones lambda, Streams y manejo de excepciones.',
        },
        {
          title: 'Spring Boot',
          description: 'Inyección de dependencias, configuración y desarrollo de APIs REST.',
        },
        {
          title: 'Aplicación práctica',
          description:
            'Persistencia de datos, pruebas y mantenimiento de una aplicación de empresa.',
        },
      ],
    },
    {
      id: 'software-legacy',
      title: 'Software Legacy',
      description:
        'Aprende el código de tus abuelos. Comprende los sistemas heredados de tu empresa y aprende a mantenerlos y evolucionarlos con seguridad.',
      modules: [
        {
          title: 'Entender el código',
          description:
            'Lectura de código existente, identificación de dependencias y documentación del comportamiento.',
        },
        {
          title: 'Proteger lo que funciona',
          description:
            'Pruebas de caracterización para comprobar el comportamiento antes de introducir cambios.',
        },
        {
          title: 'Modernizar paso a paso',
          description: 'Refactorización y migración gradual para reducir la deuda técnica.',
        },
      ],
    },
  ] as const;
  private readonly service = inject(ContactService);
  private readonly element = inject(ElementRef) as ElementRef<HTMLElement>;
  readonly priceTiers = [
    { dates: 'Del 4 al 10 de octubre', price: 50 },
    { dates: 'Del 11 al 17 de octubre', price: 65 },
    { dates: 'Del 18 al 24 de octubre', price: 75 },
    { dates: 'Del 25 al 31 de octubre', price: 90 },
  ] as const;
  readonly status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly submitted = signal(false);
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
    computer: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120)],
    }),
    internet: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(Sí|No)$/)],
    }),
    os: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(120)],
    }),
    shift: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(Mañana|Tarde)$/)],
    }),
    privacy: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    website: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(0)] }),
  });
  hasError(key: keyof CoursesComponent['form']['controls']) {
    const control = this.form.controls[key];
    return control.invalid && (control.touched || this.submitted());
  }
  async submit() {
    if (this.status() === 'loading') return;
    for (const key of [
      'name',
      'email',
      'computer',
      'internet',
      'os',
      'shift',
      'website',
    ] as const) {
      const control = this.form.controls[key];
      control.setValue(control.value.trim());
    }
    this.submitted.set(true);
    this.status.set('idle');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      queueMicrotask(() =>
        this.element.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    const value = this.form.getRawValue();
    this.status.set('loading');
    try {
      await firstValueFrom(
        this.service.send({
          name: value.name,
          email: value.email,
          company: '',
          phone: '',
          privacy: true,
          website: value.website,
          needs: [
            'SOLICITUD DE INSCRIPCIÓN · Curso principiante en Power BI',
            'Duración: 10 horas. Máximo: 30 plazas.',
            'Precios por fecha de inscripción (octubre de 2026, hora de España peninsular):',
            ...this.priceTiers.map((tier) => `${tier.dates}: ${tier.price} €`),
            'Fecha de inicio: 1 de noviembre de 2026. Solicitud sujeta a confirmación de disponibilidad y precio.',
            `Turno elegido: ${value.shift}`,
            'Lunes, miércoles y viernes. Mañana: 10:00–11:30. Tarde: 18:00–19:30. Horario de España peninsular.',
            'Clases: 2, 4, 6, 9, 11, 13 y 16 de noviembre de 2026. Seis sesiones de 90 minutos y una de 60 minutos. Última sesión: 10:00–11:00 o 18:00–19:00.',
            `Tipo de ordenador: ${value.computer}`,
            `Conexión a internet: ${value.internet}`,
            `Sistema operativo: ${value.os}`,
            'Acepta el tratamiento de sus datos para gestionar su solicitud de inscripción.',
          ].join('\n'),
        }),
      );
      this.form.reset();
      this.submitted.set(false);
      this.status.set('success');
    } catch (error) {
      this.error.set(
        error instanceof HttpErrorResponse && error.status === 429
          ? 'Has realizado demasiados intentos. Espera 15 minutos antes de volver a enviar.'
          : 'No hemos podido enviar tu solicitud. Conservamos tus datos para que puedas intentarlo de nuevo.',
      );
      this.status.set('error');
    }
  }
}
