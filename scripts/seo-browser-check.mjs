// Local-only browser smoke test. Does not publish or submit forms.
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, statSync, existsSync, mkdtempSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('dist/terreta-web/browser');
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};
const server = createServer((req, res) => {
  let file = resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
  if (!file.startsWith(root + '/') && file !== root) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
  if (!existsSync(file)) {
    res.statusCode = 404;
    file = resolve(root, '404.html');
  }
  res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(4173, '127.0.0.1', r));
const chrome = spawn(
  process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless=new',
    '--remote-debugging-port=9339',
    '--no-first-run',
    '--user-data-dir=' + mkdtempSync('/tmp/terreta-seo-browser-'),
    'about:blank',
  ],
  { stdio: 'ignore' },
);
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
const errors = [];
try {
  let tabs;
  for (let i = 0; i < 40; i++) {
    try {
      tabs = await (
        await fetch('http://127.0.0.1:9339/json', { signal: AbortSignal.timeout(1000) })
      ).json();
      break;
    } catch {
      await delay(500);
    }
  }
  assert.ok(tabs, 'Chrome debugging endpoint unavailable');
  ws = new WebSocket(tabs.find((tab) => tab.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text);
    if (pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const key = ++id;
      const timer = setTimeout(() => {
        pending.delete(key);
        reject(Error('CDP timeout: ' + method));
      }, 20000);
      pending.set(key, (data) => {
        clearTimeout(timer);
        data.error ? reject(Error(data.error.message)) : resolve(data);
      });
      ws.send(JSON.stringify({ id: key, method, params }));
    });
  const evaluate = async (expression) => {
    const data = await send('Runtime.evaluate', { expression, returnByValue: true });
    if (data.result.exceptionDetails) throw Error(data.result.exceptionDetails.text);
    return data.result.result.value;
  };
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `window.__seoPerf={lcpMs:0,cls:0};new PerformanceObserver(list=>{for(const entry of list.getEntries())window.__seoPerf.lcpMs=entry.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.__seoPerf.cls+=entry.value;}).observe({type:'layout-shift',buffered:true});`,
  });
  const results = [];
  for (const [path, width] of [
    ['/', 390],
    ['/servicios', 390],
    ['/servicios', 1440],
    ['/productos', 390],
    ['/cursos', 390],
  ]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width === 390,
    });
    await send('Page.navigate', { url: 'http://127.0.0.1:4173' + path });
    for (let i = 0; i < 40; i++) {
      if (
        await evaluate(
          `document.readyState==='complete' && !!document.querySelector('h1') && !!document.getElementById('terreta-structured-data')`,
        )
      )
        break;
      await delay(300);
    }
    await delay(1500);
    const result = JSON.parse(
      await evaluate(
        `JSON.stringify({path:location.pathname,width:innerWidth,contentWidth:document.documentElement.scrollWidth,title:document.title,h1:document.querySelector('h1')?.textContent.trim(),canonical:document.querySelector('link[rel="canonical"]')?.href,graphCount:document.querySelectorAll('#terreta-structured-data').length,...window.__seoPerf})`,
      ),
    );
    assert.ok(typeof result.lcpMs === 'number' && result.lcpMs > 0, 'LCP sample missing');
    assert.equal(typeof result.cls, 'number');
    assert.equal(result.path, path);
    assert.equal(result.canonical, 'https://www.realterretaia.com' + path);
    assert.equal(result.graphCount, 1);
    assert.ok(result.contentWidth <= result.width, JSON.stringify(result));
    results.push(result);
    console.log('Checked', JSON.stringify(result));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(
      '/tmp/seo-' + (path.replaceAll('/', '') || 'home') + '-' + width + '.png',
      Buffer.from(shot.result.data, 'base64'),
    );
  }
  await send('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  await delay(1800);
  await evaluate(
    `document.querySelector('.info-card[href="/servicios#software-a-medida"]').click()`,
  );
  await delay(1800);
  const navigation = JSON.parse(
    await evaluate(
      `JSON.stringify({path:location.pathname,hash:location.hash,title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href,services:JSON.parse(document.getElementById('terreta-structured-data').textContent)['@graph'].filter(n=>n['@type']==='Service').length})`,
    ),
  );
  assert.equal(navigation.path, '/servicios');
  assert.equal(navigation.hash, '#software-a-medida');
  assert.equal(navigation.services, 6);
  await evaluate(`document.querySelector('.skip-link').click()`);
  assert.equal(await evaluate('document.activeElement.id'), 'main-content');
  assert.equal(errors.length, 0, errors.join('\n'));
  const result = {
    checkedAt: new Date().toISOString(),
    environment:
      'Chrome headless local HTTP, no CPU/network throttling; isolated samples, not CrUX or field Core Web Vitals',
    results,
    navigation,
    errors,
  };
  writeFileSync('docs/seo/browser-check.json', JSON.stringify(result, null, 2) + '\n');
  console.log('Navigation, skip link and console checks passed.');
} finally {
  ws?.close();
  chrome.kill();
  server.close();
}
