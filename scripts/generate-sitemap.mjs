import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const output = resolve('dist/terreta-web');
const origin = 'https://www.realterretaia.com';
const { routes } = JSON.parse(readFileSync(resolve(output, 'prerendered-routes.json'), 'utf8'));
const urls = new Set();

for (const path of Object.keys(routes).sort()) {
  const dom = new JSDOM(readFileSync(resolve(output, 'browser', '.' + path, 'index.html'), 'utf8'));
  const document = dom.window.document;
  const robots = document.querySelector('meta[name="robots"]')?.content ?? '';
  if (!/\bnoindex\b/i.test(robots)) {
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    if (canonical !== origin + path) {
      throw new Error(`Canonical ausente o incorrecto en ${path}: ${canonical}`);
    }
    urls.add(canonical);
  }
  dom.window.close();
}

if (!urls.size) throw new Error('No se han encontrado páginas indexables.');
const escapeXml = (value) => value.replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[char]);
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  [...urls].map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n') +
  '\n</urlset>\n';

writeFileSync(resolve(output, 'browser/sitemap.xml'), sitemap);
writeFileSync(resolve('public/sitemap.xml'), sitemap);
console.log(`Sitemap generado con ${urls.size} URLs canónicas indexables.`);
