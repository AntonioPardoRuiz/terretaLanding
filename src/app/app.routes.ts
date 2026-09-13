import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((c) => c.HomeComponent),
    data: {
      seo: {
        title: 'Desarrollo de software para empresas en Alicante | Terreta',
        description:
          'Desarrollamos software para empresas desde Alicante: aplicaciones web y móviles, automatización e IA. Conoce nuestros productos y cuéntanos tu proyecto.',
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
        title: 'Software a medida, aplicaciones y desarrollo web | Terreta',
        description:
          'Software a medida, aplicaciones web y móviles, páginas web, automatización e IA para empresas. Desde Alicante, te ayudamos a definir la solución que necesitas.',
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
        title: 'Productos y soluciones de software empresarial | Terreta',
        description:
          'Conoce Elite Coach, TerretaAgro, ContaTerra y TerretaRail: productos de software de Terreta, junto a proyectos reales para servicios profesionales.',
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
        title: 'Elite Coach | App para entrenadores y gimnasios | Terreta',
        description:
          'Descubre Elite Coach: rutinas, clientes, seguimiento y nutrición para entrenadores y gimnasios. Conoce esta aplicación desarrollada por Terreta.',
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
        title: 'Proceso de desarrollo de software | Cómo trabaja Terreta',
        description:
          'Así desarrollamos software en Terreta: definición de alcance, planificación, diseño, desarrollo y validación por hitos, con soporte y evolución del proyecto.',
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
        title: 'Terreta | Empresa de desarrollo de software en Alicante',
        description:
          'Somos Terreta, empresa de Alicante especializada en software para empresas y pymes. Conoce nuestro enfoque, servicios y forma de trabajar contigo.',
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
        title: 'Contacto y presupuesto de software en Alicante | Terreta',
        description:
          'Habla con Terreta, en Alicante, sobre tu software, aplicación o automatización. Cuéntanos qué necesitas y solicita un presupuesto personalizado sin compromiso.',
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
