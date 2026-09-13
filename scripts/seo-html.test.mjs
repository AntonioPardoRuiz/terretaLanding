import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const root = resolve('dist/terreta-web/browser');
const origin = 'https://www.realterretaia.com';
const expected = [
  '/',
  '/servicios',
  '/productos',
  '/aplicaciones/fitness-app',
  '/como-trabajamos',
  '/nosotros',
  '/contacto',
  '/privacy-policy',
  '/tarifas',
  '/outsourcing',
  '/cursos',
  '/trabajar-con-nosotros',
];
const docs = new Map(
  expected.map((path) => [
    path,
    new JSDOM(readFileSync(resolve(root, '.' + path, 'index.html'), 'utf8'), { url: origin + path })
      .window.document,
  ]),
);
const graph = (doc) =>
  JSON.parse(doc.querySelector('#terreta-structured-data').textContent)['@graph'];

test('sitemap and robots contain only the existing indexable canonical URLs', () => {
  const xml = new JSDOM(readFileSync(resolve(root, 'sitemap.xml'), 'utf8'), {
    contentType: 'text/xml',
  }).window.document;
  const urls = [...xml.querySelectorAll('loc')].map((el) => el.textContent);
  assert.deepEqual(urls.sort(), expected.map((path) => origin + path).sort());
  assert.equal(new Set(urls).size, 12);
  const robots = readFileSync(resolve(root, 'robots.txt'), 'utf8');
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/www\.realterretaia\.com\/sitemap.xml/);
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m);
});

test('all prerendered pages have unique metadata, one H1/main, logical headings, OG and canonical', () => {
  const titles = new Set(),
    descriptions = new Set();
  for (const [path, doc] of docs) {
    assert.ok(doc.title, path);
    titles.add(doc.title);
    const description = doc.querySelector('meta[name="description"]')?.content;
    assert.ok(description, path);
    descriptions.add(description);
    assert.equal(doc.querySelectorAll('h1').length, 1, path);
    assert.equal(doc.querySelectorAll('main').length, 1, path);
    assert.equal(doc.querySelector('link[rel="canonical"]')?.href, origin + path);
    assert.equal(doc.querySelector('meta[property="og:url"]')?.content, origin + path);
    assert.equal(doc.querySelector('meta[property="og:description"]')?.content, description);
    assert.ok(doc.querySelector('meta[property="og:image"]')?.content.startsWith(origin));
    assert.equal(doc.querySelector('meta[name="robots"]')?.content, 'index, follow');
    const headings = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')];
    for (let i = 1; i < headings.length; i++)
      assert.ok(
        Number(headings[i].tagName[1]) <= Number(headings[i - 1].tagName[1]) + 1,
        `${path}: ${headings[i].textContent}`,
      );
  }
  assert.equal(titles.size, 12);
  assert.equal(descriptions.size, 12);
});

test('internal links and fragments resolve to existing pages or assets', () => {
  for (const [path, doc] of docs) {
    for (const anchor of doc.querySelectorAll('a[href]')) {
      const url = new URL(anchor.href);
      if (url.origin !== origin) continue;
      const target = docs.get(url.pathname);
      if (!target) {
        assert.ok(existsSync(resolve(root, '.' + url.pathname)), `${path} → ${url.href}`);
        continue;
      }
      if (url.hash)
        assert.ok(
          target.getElementById(decodeURIComponent(url.hash.slice(1))),
          `${path} → ${url.href}`,
        );
    }
  }
  for (const [path, target] of [
    ['/', '/servicios#software-a-medida'],
    ['/', '/productos'],
    ['/servicios', '/productos#terreta-agro'],
    ['/productos', '/servicios'],
    ['/como-trabajamos', '/servicios'],
    ['/nosotros', '/servicios'],
  ]) {
    assert.ok(
      docs.get(path).querySelector(`#main-content a[href="${target}"]`),
      `${path} → ${target}`,
    );
  }
  for (const path of expected.filter((path) => path !== '/privacy-policy'))
    assert.ok(docs.get(path).querySelector('a[href="/contacto"]'), path);
});

test('JSON-LD is coherent with visible services, product and canonical data, without invented commercial attributes', () => {
  for (const [path, doc] of docs) {
    assert.equal(doc.querySelectorAll('script[type="application/ld+json"]').length, 1, path);
    const data = JSON.parse(doc.querySelector('#terreta-structured-data').textContent);
    assert.equal(data['@context'], 'https://schema.org');
    const nodes = data['@graph'];
    assert.equal(new Set(nodes.map((node) => node['@id'])).size, nodes.length);
    assert.ok(nodes.some((node) => node['@type'] === 'Organization' && node.name === 'Terreta'));
    assert.ok(nodes.some((node) => node['@type'] === 'WebSite'));
    assert.ok(nodes.some((node) => node['@type'] === 'WebPage' && node.url === origin + path));
    const text = JSON.stringify(data);
    assert.doesNotMatch(
      text,
      /aggregateRating|reviewRating|"offers"|"price"|streetAddress|numberOfEmployees|"award"/,
    );
    if (path !== '/') {
      const crumbs = nodes.find((node) => node['@type'] === 'BreadcrumbList').itemListElement;
      crumbs.forEach((crumb, index) => {
        assert.equal(crumb.position, index + 1);
        assert.equal(crumb['@type'], 'ListItem');
        assert.ok(docs.has(new URL(crumb.item).pathname));
      });
      assert.equal(crumbs.at(-1).item, origin + path);
    }
  }
  const services = graph(docs.get('/servicios')).filter((node) => node['@type'] === 'Service');
  assert.equal(services.length, 6);
  for (const service of services)
    assert.equal(
      docs
        .get('/servicios')
        .querySelector(new URL(service.url).hash + ' h2')
        .textContent.trim(),
      service.name,
    );
  for (const [path, doc] of docs)
    assert.equal(graph(doc).filter((node) => node['@type'] === 'SoftwareApplication').length, 0);
});

test('images have descriptive alt, reserved dimensions and valid local sources; Power BI is optimized', () => {
  for (const [path, doc] of docs)
    for (const image of doc.images) {
      assert.ok(image.hasAttribute('alt'), path);
      assert.ok(
        Number(image.getAttribute('width')) > 0 && Number(image.getAttribute('height')) > 0,
        `${path}: ${image.src}`,
      );
      const url = new URL(image.src);
      if (url.origin === origin)
        assert.ok(existsSync(resolve(root, '.' + url.pathname)), image.src);
    }
  assert.ok(statSync(resolve(root, 'assets/images/power-bi-224.webp')).size < 15000);
});

test('static 404 remains noindex and no SPA rewrite turns unknown URLs into indexable Home', () => {
  const doc = new JSDOM(readFileSync(resolve(root, '404.html'), 'utf8')).window.document;
  assert.match(doc.querySelector('meta[name="robots"]').content, /noindex/);
  assert.equal(doc.querySelectorAll('h1').length, 1);
  const config = JSON.parse(readFileSync('firebase.json', 'utf8'));
  assert.equal(config.hosting.rewrites, undefined);
});
