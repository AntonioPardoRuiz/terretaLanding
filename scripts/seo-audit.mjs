import { JSDOM } from 'jsdom';
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve('dist/terreta-web/browser');
const sitemap = new JSDOM(readFileSync('public/sitemap.xml', 'utf8'), { contentType: 'text/xml' });
const clean = (text) => (text || '').replace(/\s+/g, ' ').trim();
const pages = [...sitemap.window.document.querySelectorAll('loc')].map((loc) => {
  const url = loc.textContent;
  const path = new URL(url).pathname;
  const file = resolve(root, '.' + path, 'index.html');
  const document = new JSDOM(readFileSync(file, 'utf8'), { url }).window.document;
  const content = document.querySelector('#main-content') || document.body;
  const get = (selector) => document.querySelector(selector)?.getAttribute('content') || '';
  return {
    path,
    title: document.title,
    description: get('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    robots: get('meta[name="robots"]'),
    headings: [...content.querySelectorAll('h1,h2,h3,h4')].map((el) => ({
      level: el.tagName,
      text: clean(el.textContent),
    })),
    firstText: clean(content.querySelector('h1')?.nextElementSibling?.textContent),
    internalLinks: [...content.querySelectorAll('a[href]')]
      .filter((a) => a.origin === new URL(url).origin)
      .map((a) => ({
        url: a.pathname + a.hash,
        anchor: clean(a.textContent) || a.getAttribute('aria-label'),
      })),
    images: [...document.images].map((img) => {
      const file = resolve(root, '.' + new URL(img.src).pathname);
      return {
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        width: img.getAttribute('width'),
        height: img.getAttribute('height'),
        loading: img.loading || img.getAttribute('loading') || 'eager',
        bytes: existsSync(file) ? statSync(file).size : null,
      };
    }),
    openGraph: Object.fromEntries(
      [...document.querySelectorAll('meta[property^="og:"]')].map((el) => [
        el.getAttribute('property'),
        el.content,
      ]),
    ),
    structuredData: [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) =>
      JSON.parse(el.textContent),
    ),
  };
});
const target = process.argv[2] || 'docs/seo/after.json';
writeFileSync(
  target,
  JSON.stringify({ auditedAt: new Date().toISOString(), pages }, null, 2) + '\n',
);
console.log(`Audit: ${pages.length} existing pages → ${target}`);
