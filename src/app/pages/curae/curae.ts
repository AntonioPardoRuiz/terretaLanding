import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../shared/ui/container/container';
import { ButtonComponent } from '../../shared/ui/button/button';
import { CtaComponent } from '../../shared/ui/cta/cta';

@Component({
  selector: 'app-curae',
  imports: [RouterLink, ContainerComponent, ButtonComponent, CtaComponent],
  templateUrl: './curae.html',
  styleUrl: './curae.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuraeComponent {
  readonly areas = [
    { title: 'Agenda y citas', description: 'Agendas por profesional y servicio, recurrencias, disponibilidad, lista de espera, recordatorios y reserva online.' },
    { title: 'Historia clínica electrónica', description: 'Historia longitudinal, anamnesis, evolución, diagnósticos, documentos, imágenes, consentimientos y trazabilidad.' },
    { title: 'Portal del paciente y telemedicina', description: 'Acceso digital a documentación, citas, comunicaciones y servicios online. Videoconsulta y atención remota integrables en el flujo asistencial.' },
    { title: 'Facturación y control económico', description: 'Facturas, presupuestos, cobros, devoluciones, liquidaciones, aseguradoras, estadísticas y seguimiento económico.' },
    { title: 'CRM y comunicación', description: 'Contactos, oportunidades, seguimiento, recordatorios, campañas y automatizaciones.' },
    { title: 'Pruebas y laboratorio', description: 'Solicitudes, resultados, histórico y documentación, con posibilidad de futuras integraciones.' },
    { title: 'Cirugía y quirófano', description: 'Planificación, documentación, consentimientos, listas de comprobación y seguimiento preoperatorio y postoperatorio.' },
    { title: 'Hospitalización', description: 'Estructura preparada para ingresos, estancias, camas, altas y seguimiento cuando se active.' },
    { title: 'Stock y operaciones', description: 'Inventario, productos, consumos, tareas internas y gestión operativa del centro.' },
    { title: 'Firma y documentación', description: 'Consentimientos, documentos y firma digital según la configuración y los servicios habilitados.' },
    { title: 'Analítica', description: 'Cuadros de mando de actividad, producción e indicadores clínicos, operativos y económicos.' },
    { title: 'Varias sedes y especialidades', description: 'Arquitectura preparada para organizar distintas sedes, profesionales y especialidades.' },
  ] as const;
  readonly modules = [
    'Medicina General', 'Enfermería', 'Urología', 'Análisis / Laboratorio',
    'Odontología', 'Fisioterapia', 'Psicología', 'Nutrición', 'Dermatología',
    'Ginecología', 'Pediatría', 'Cardiología', 'Traumatología', 'Oftalmología',
    'Medicina Estética', 'Cirugía', 'Radiología / Imagen', 'Farmacología / Prescripción',
    'Urgencias', 'Salud Laboral', 'Podología', 'Logopedia', 'Medicina Deportiva',
    'Otorrinolaringología', 'Aparato Digestivo', 'Endocrinología', 'Neurología',
    'Psiquiatría', 'Fertilidad / Reproducción',
  ] as const;
}
