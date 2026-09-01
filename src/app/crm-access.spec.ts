import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CRM_URL } from './core/config/runtime-config.service';

describe('CRM publication safeguards', () => {
  it('keeps the CRM out of the public sitemap', () => {
    const sitemap = readFileSync(resolve('public/sitemap.xml'), 'utf8');
    expect(sitemap).not.toContain(CRM_URL);
    expect(sitemap).not.toMatch(/<loc>[^<]*\/(?:crm|login)\/?<\/loc>/i);
  });

  it('centralizes the official URL in application configuration', () => {
    const sourceFiles = [
      'src/app/core/config/runtime-config.service.ts',
      'src/app/core/layout/header/header.ts',
      'src/app/core/layout/header/header.html',
      'src/app/core/layout/footer/footer.ts',
      'src/app/core/layout/footer/footer.html',
      'public/runtime-config.json',
    ];
    const occurrences = sourceFiles.reduce((total, file) => {
      const contents = readFileSync(resolve(file), 'utf8');
      return total + contents.split(CRM_URL).length - 1;
    }, 0);

    expect(CRM_URL).toBe('https://terretacrm.web.app');
    expect(occurrences).toBe(1);
  });
});
