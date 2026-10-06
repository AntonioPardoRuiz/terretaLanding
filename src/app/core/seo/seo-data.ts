export const SITE_URL = 'https://www.realterretaia.com';
export const DEFAULT_IMAGE = `${SITE_URL}/assets/brand/terreta-logo.png`;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoData {
  faqs?: readonly FaqItem[];
  serviceName?: string;
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  noIndex?: boolean;
}

const PAGE_NAMES: Record<string, string> = {
  '/servicios': 'Servicios',
  '/productos': 'Productos',
  '/productos/curae': 'Curae Clínica Total',
  '/aplicaciones/fitness-app': 'Elite Coach',
  '/como-trabajamos': 'Cómo trabajamos',
  '/nosotros': 'Nosotros',
  '/contacto': 'Contacto',
  '/privacy-policy': 'Política de privacidad',
  '/tarifas': 'Tarifas',
  '/outsourcing': 'Outsourcing',
  '/cursos': 'Cursos',
  '/trabajar-con-nosotros': 'Trabajar con nosotros',
};
export const SERVICE_ENTITIES = [
  { id: 'software-a-medida', name: 'Desarrollo de software a medida y aplicaciones web' },
  { id: 'aplicaciones-moviles', name: 'Desarrollo de aplicaciones móviles' },
  { id: 'desarrollo-web', name: 'Desarrollo web y páginas web para empresas' },
  { id: 'automatizacion', name: 'Automatización de procesos' },
  { id: 'inteligencia-artificial', name: 'Inteligencia artificial para empresas' },
  { id: 'soporte', name: 'Soporte, mantenimiento y evolución' },
] as const;

export function canonicalPath(path: string): string {
  // Never adopt an origin, query string or fragment from a navigation URL.
  const clean = path.split(/[?#]/)[0];
  return clean.startsWith('/') && !clean.startsWith('//') ? clean.replace(/\/+$/, '') || '/' : '/';
}

export function structuredData(seo: SeoData, path: string): Record<string, unknown> {
  const url = `${SITE_URL}${path}`;
  const organization = `${SITE_URL}/#organization`;
  const website = `${SITE_URL}/#website`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organization,
      name: 'Terreta',
      url: `${SITE_URL}/`,
      logo: DEFAULT_IMAGE,
      email: 'terretasoftware@gmail.com',
      location: { '@type': 'Place', name: 'Alicante, España' },
    },
    {
      '@type': 'WebSite',
      '@id': website,
      url: `${SITE_URL}/`,
      name: 'Terreta',
      publisher: { '@id': organization },
      inLanguage: 'es-ES',
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': website },
      inLanguage: 'es-ES',
      about: { '@id': organization },
      ...(path !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      ...(path === '/servicios'
        ? { mainEntity: SERVICE_ENTITIES.map((service) => ({ '@id': `${url}#${service.id}` })) }
        : {}),
    },
  ];
  if (path !== '/') {
    const parents = seo.serviceName
      ? [
          { name: 'Inicio', item: `${SITE_URL}/` },
          { name: 'Servicios', item: `${SITE_URL}/servicios` },
        ]
      : path === '/aplicaciones/fitness-app' || path === '/productos/curae'
        ? [
            { name: 'Inicio', item: `${SITE_URL}/` },
            { name: 'Productos', item: `${SITE_URL}/productos` },
          ]
        : [{ name: 'Inicio', item: `${SITE_URL}/` }];
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        ...parents,
        { name: PAGE_NAMES[path] || seo.serviceName || seo.title, item: url },
      ].map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })),
    });
  }
  if (path === '/servicios') {
    graph.push(
      ...SERVICE_ENTITIES.map((service) => ({
        '@type': 'Service',
        '@id': `${url}#${service.id}`,
        name: service.name,
        serviceType: service.name,
        url: `${url}#${service.id}`,
        provider: { '@id': organization },
      })),
    );
  }
  if (seo.serviceName) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: seo.serviceName,
      serviceType: seo.serviceName,
      url,
      description: seo.description,
      provider: { '@id': organization },
      areaServed: { '@type': 'Country', name: 'España' },
    });
    graph[2]['mainEntity'] = { '@id': `${url}#service` };
  }
  if (seo.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': `${url}#webpage` },
      mainEntity: seo.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }
  // SoftwareApplication deferred: no verified offers or reviews for rich-result requirements.
  return { '@context': 'https://schema.org', '@graph': graph };
}
