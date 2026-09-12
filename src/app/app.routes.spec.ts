import { routes } from './app.routes';

describe('public routes', () => {
  it('provides real lazy pages for every primary corporate route', () => {
    const primaryPaths = [
      '',
      'servicios',
      'tarifas',
      'outsourcing',
      'productos',
      'aplicaciones/fitness-app',
      'como-trabajamos',
      'nosotros',
      'contacto',
      'privacy-policy',
    ];
    for (const path of primaryPaths) {
      const route = routes.find((candidate) => candidate.path === path);
      expect(route?.loadComponent).toBeTypeOf('function');
      expect(route?.redirectTo).toBeUndefined();
    }
  });

  it('serves outsourcing as its own page with a matching canonical URL', async () => {
    const outsourcing = routes.find((route) => route.path === 'outsourcing');
    expect(outsourcing?.redirectTo).toBeUndefined();
    expect(outsourcing?.data?.['seo'].canonicalPath).toBe('/outsourcing');
    expect(await outsourcing?.loadComponent?.()).toBeDefined();
  });

  it('does not add corporate login or CRM redirect routes', () => {
    expect(routes.some((route) => route.path === 'login')).toBe(false);
    expect(routes.some((route) => route.path === 'crm')).toBe(false);
  });
});
