import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((c) => c.HomeComponent),
    data: {
      seo: {
        title: 'Terreta | Software, Automatización e IA para Empresas',
        description:
          'Desarrollamos software a medida, aplicaciones web, apps móviles, automatizaciones e inteligencia artificial para empresas que quieren crecer con tecnología clara, moderna y útil.',
        canonicalPath: '/',
        image: 'https://www.realterretaia.com/assets/brand/terreta-logo.png',
      },
    },
  },
  {
    path: 'servicios',
    loadComponent: () => import('./pages/services/services').then((c) => c.ServicesComponent),
    data: {
      seo: {
        title: 'Servicios Digitales | Apps, Automatización e IA | Terreta',
        description:
          'Soluciones web, móviles, automatizaciones e inteligencia artificial adaptadas a las necesidades reales de cada empresa.',
        canonicalPath: '/servicios',
      },
    },
  },
  {
    path: 'tarifas',
    loadComponent: () => import('./pages/pricing/pricing').then((c) => c.PricingComponent),
    data: {
      seo: {
        title: 'Tarifas | Presupuesto sin compromiso | Terreta',
        description:
          'Cuéntanos qué necesitas realizar a través de nuestro formulario de contacto y te enviaremos un presupuesto personalizado sin ningún compromiso.',
        canonicalPath: '/tarifas',
      },
    },
  },
  {
    path: 'cursos',
    loadComponent: () => import('./pages/courses/courses').then((c) => c.CoursesComponent),
    data: {
      seo: {
        title: 'Cursos | Power BI para principiantes | Terreta',
        description:
          'Curso principiante en Power BI desde el 1 de noviembre de 2026: 10 horas, 30 plazas y formación desde la instalación hasta las métricas y la publicación.',
        canonicalPath: '/cursos',
      },
    },
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/products/products').then((c) => c.ProductsComponent),
    data: {
      seo: {
        title: 'Productos digitales desarrollados por Terreta',
        description:
          'Descubre el catálogo de software de Terreta: soluciones para fitness, agricultura, contabilidad, sector ferroviario y servicios profesionales.',
        canonicalPath: '/productos',
        image: 'https://www.realterretaia.com/assets/brand/terreta-logo.png',
      },
    },
  },
  {
    path: 'aplicaciones/fitness-app',
    loadComponent: () =>
      import('./pages/elite-coach/elite-coach').then((c) => c.EliteCoachComponent),
    data: {
      seo: {
        title: 'Elite Coach App | Aplicación Fitness Desarrollada por Terreta',
        description:
          'Elite Coach organiza rutinas, seguimiento, nutrición y clientes en una plataforma para entrenadores y gimnasios desarrollada por Terreta.',
        canonicalPath: '/aplicaciones/fitness-app',
        image: 'https://www.realterretaia.com/assets/images/elite-coach.webp',
      },
    },
  },
  {
    path: 'outsourcing',
    loadComponent: () =>
      import('./pages/outsourcing/outsourcing').then((c) => c.OutsourcingComponent),
    data: {
      seo: {
        title: 'Outsourcing | Equipo en España y desarrollo propio | Terreta',
        description:
          'Equipo en España: desarrollamos sin externalizar ni subcontratar a terceros. Bolsas desde 25 €/h en la de 160 h, sin IVA. Presupuesto sin compromiso.',
        canonicalPath: '/outsourcing',
      },
    },
  },
  {
    path: 'como-trabajamos',
    loadComponent: () =>
      import('./pages/how-we-work/how-we-work').then((c) => c.HowWeWorkComponent),
    data: {
      seo: {
        title: 'Cómo Trabajamos | Desarrollo de Software | Terreta',
        description:
          'Conoce cómo organizamos proyectos de software en Terreta: planificación, hitos, desarrollo iterativo, validación y seguimiento continuo.',
        canonicalPath: '/como-trabajamos',
        image: 'https://www.realterretaia.com/assets/brand/terreta-logo.png',
      },
    },
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about/about').then((c) => c.AboutComponent),
    data: {
      seo: {
        title: 'Sobre Terreta | Software, Automatización e IA',
        description:
          'Conoce Terreta, empresa de Alicante especializada en software a medida, aplicaciones, automatización e inteligencia artificial para empresas.',
        canonicalPath: '/nosotros',
        image: 'https://www.realterretaia.com/assets/brand/terreta-logo.png',
      },
    },
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then((c) => c.ContactComponent),
    data: {
      seo: {
        title: 'Contacto | Hablemos de tu Proyecto | Terreta',
        description:
          'Contacta con Terreta para hablar sobre software a medida, aplicaciones, automatización o inteligencia artificial para tu empresa.',
        canonicalPath: '/contacto',
        image: 'https://www.realterretaia.com/assets/brand/terreta-logo.png',
      },
    },
  },
  {
    path: 'trabajar-con-nosotros',
    loadComponent: () => import('./pages/careers/careers').then((c) => c.CareersComponent),
    data: {
      seo: {
        title: 'Trabajar con nosotros | Envía tu CV | Terreta',
        description:
          'Conoce Terreta y envíanos tu candidatura. Buscamos conocer talento en desarrollo de software, automatización, inteligencia artificial y diseño.',
        canonicalPath: '/trabajar-con-nosotros',
      },
    },
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy/privacy').then((c) => c.PrivacyComponent),
    data: {
      seo: {
        title: 'Política de Privacidad | Terreta',
        description:
          'Consulta la política de privacidad y protección de datos personales del sitio web de Terreta.',
        canonicalPath: '/privacy-policy',
      },
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((c) => c.NotFoundComponent),
    data: {
      seo: {
        title: 'Página no encontrada | Terreta',
        description: 'La página solicitada no está disponible.',
        noIndex: true,
      },
    },
  },
];
