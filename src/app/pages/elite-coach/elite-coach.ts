import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button';
import { ContainerComponent } from '../../shared/ui/container/container';
import { CtaComponent } from '../../shared/ui/cta/cta';

interface VideoTutorial {
  id: string;
  title: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-elite-coach',
  imports: [ButtonComponent, ContainerComponent, CtaComponent, RouterLink],
  templateUrl: './elite-coach.html',
  styleUrl: './elite-coach.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EliteCoachComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly activeVideo = signal<string | null>(null);
  readonly problems = [
    { icon: 'split', title: 'Gestión fragmentada', description: 'Rutinas, pagos y comunicación en diferentes lugares.' },
    { icon: 'focus', title: 'Falta de claridad', description: 'El cliente no ve su progreso ni lo que debe hacer hoy.' },
    { icon: 'scale', title: 'Difícil de escalar', description: 'Más clientes significa más caos.' },
  ] as const;

  readonly trainerFeatures = [
    'Planificación de rutinas',
    'Calendario de clientes',
    'Seguimiento de métricas',
    'Comunicación centralizada',
    'Marca personalizada',
  ] as const;

  readonly clientFeatures = [
    'Todo su plan en el móvil',
    'Progreso claro',
    'Recordatorios inteligentes',
    'Objetivos visibles',
  ] as const;

  readonly videos: readonly VideoTutorial[] = [
    { id: '0jJvLwX_HuM', title: 'Elite Coach Login', label: 'Acceso mediante usuario y contraseña', description: 'Accede a Elite Coach utilizando tu correo electrónico y contraseña.' },
    { id: 'KtMRqJarr4U', title: 'Elite Coach Intro', label: 'Conoce la aplicación', description: 'Descubre Elite Coach y accede fácilmente a la pantalla de inicio de sesión.' },
    { id: '2vAL_JeNc4Q', title: 'Restablecer contraseña', label: '¿Olvidaste tu contraseña?', description: 'Utiliza la opción “¿Olvidaste tu contraseña?” para recuperar el acceso a tu cuenta.' },
    { id: 'j4t8Eh6SwRo', title: 'Configura tu perfil', label: 'Accede a la configuración', description: 'Gestiona tus notificaciones y entrenadores, selecciona tu smartwatch y conecta e importa tus datos.' },
    { id: '9faRXaxaFtU', title: 'Calendario de nutrición', label: 'Accede a tu calendario de dieta', description: 'Busca un entrenador que prepare y gestione tu dieta para organizar mejor tu alimentación.' },
    { id: 'aUsokc1uh38', title: 'Tus medidas', label: 'Gestiona y controla tu evolución', description: 'Controla tus medidas con ayuda de tu entrenador o utiliza la herramienta de IA de Elite Coach para gestionar tus métricas.' },
  ];

  playVideo(id: string): void {
    this.activeVideo.set(id);
  }

  videoUrl(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`);
  }
}
