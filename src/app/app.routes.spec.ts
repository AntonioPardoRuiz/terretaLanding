import { routes } from './app.routes';

describe('public routes', () => {
  it('provides real lazy pages for every primary corporate route', () => {
    const primaryPaths = ['', 'servicios', 'aplicaciones/fitness-app', 'como-trabajamos', 'nosotros', 'contacto', 'privacy-policy'];
    for (const path of primaryPaths) {
      const route = routes.find((candidate) => candidate.path === path);
      expect(route?.loadComponent).toBeTypeOf('function');
      expect(route?.redirectTo).toBeUndefined();
    }
  });

  it('preserves the outsourcing URL as a redirect to services', () => {
    const outsourcing = routes.find((route) => route.path === 'outsourcing');
    expect(outsourcing?.redirectTo).toBe('servicios');
    expect(outsourcing?.pathMatch).toBe('full');
  });
});
