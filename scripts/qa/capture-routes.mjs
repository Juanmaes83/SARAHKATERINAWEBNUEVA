import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
const origin = 'http://127.0.0.1:3107';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3107', '-H', '127.0.0.1'], { stdio: 'ignore' });
const publicPaths = ['/', '/foundation', '/preview/home', '/preview/investment', '/preview/property-purchase', '/preview/tax-advisory', '/preview/team', '/preview/contact', '/preview/insights', '/preview/case-studies', '/studio/login', '/studio/recover', '/studio/recover/complete', '/studio/accept-invite'];
const draftPaths = ['modelo-210-explained','five-documents-before-arras','gross-vs-net-yield-costa-blanca','short-term-rental-licence-valencian-community','plusvalia-2021-constitutional-ruling','nie-application-three-routes'].map(slug => `/preview/insights/${slug}`).concat(['dutch-investor-orihuela','german-retiree-guardamar','norwegian-couple-la-zenia','british-buyer-torrevieja'].map(slug => `/preview/case-studies/${slug}`));
const privatePaths = ['/studio', '/studio/pages', '/studio/articles', '/studio/cases', '/studio/documents/00000000-0000-0000-0000-000000000000', '/studio/media', '/studio/links', '/studio/new', '/studio/team'];
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { await fetch(origin); ready = true; break; } catch { await new Promise(resolve => setTimeout(resolve, 500)); }
  }
  if (!ready) throw new Error('Review server did not start');
  await mkdir('.next/route-audit', { recursive: true });
  const results = [];
  for (const path of [...publicPaths, ...privatePaths, ...draftPaths]) {
    const response = await fetch(origin + path, { redirect: 'manual' });
    const html = await response.text();
    const expected = draftPaths.includes(path) ? 404 : privatePaths.includes(path) ? 307 : 200;
    if (response.status !== expected) throw new Error(`${path}: expected ${expected}, received ${response.status}`);
    if (!response.headers.get('x-robots-tag')?.includes('noindex')) throw new Error(`${path}: missing transport noindex`);
    if (privatePaths.includes(path) && !response.headers.get('location')?.includes('/studio/login')) throw new Error(`${path}: missing login redirect`);
    if (expected === 200) await writeFile(`.next/route-audit/${path === '/' ? 'index' : path.slice(1).replaceAll('/', '__')}.html`, html);
    results.push({ path, status: response.status, noindex: true });
  }
  // Real HTTP verification of legacy compatibility, not just registry tests.
  for (const [source, destination] of [
    ['/services', '/'],
    ['/services/investment-advisory', '/investment'],
    ['/book-a-call', '/contact'],
    ['/guides', '/insights'],
    ['/modelo-210-help', '/services/tax-advisory'],
    ['/english-tax-advisor-costa-blanca', '/services/tax-advisory'],
    ['/foreign-buyer-tax-guide', '/services/tax-advisory'],
  ]) {
    const response = await fetch(origin + source, { redirect: 'manual' });
    if (response.status !== 308) throw new Error(source + ': legacy redirect must be 308');
    const location = response.headers.get('location');
    if (!location || new URL(location, origin).href !== origin + destination)
      throw new Error(source + ': wrong legacy destination');
    const target = await fetch(origin + destination, { redirect: 'manual' });
    if (target.status !== 200) throw new Error(destination + ': legacy target must be 200');
    results.push({ path: source, status: 308, destination, targetStatus: 200 });
  }
  const serviceRoutes = [
    ['/robots.txt', 'GET', 200], ['/sitemap.xml', 'GET', 200],
    ['/api/studio/session', 'GET', 403], ['/api/studio/export', 'GET', 401],
    ['/api/studio/team', 'POST', 401], ['/api/studio/documents', 'POST', 401],
    ['/api/studio/documents/00000000-0000-0000-0000-000000000000', 'POST', 401],
    ['/api/studio/notes/00000000-0000-0000-0000-000000000000', 'POST', 401],
    ['/api/studio/media', 'POST', 401], ['/api/studio/media', 'PATCH', 401],
    ['/api/studio/preview', 'GET', 307], ['/api/studio/preview/exit', 'GET', 307],
  ];
  for (const [path, method, expected] of serviceRoutes) {
    const response = await fetch(origin + path, { method, redirect: 'manual' });
    const body = await response.text();
    if (response.status !== expected) throw new Error(`${method} ${path}: expected ${expected}, received ${response.status}`);
    if (!response.headers.get('x-robots-tag')?.includes('noindex')) throw new Error(`${path}: missing transport noindex`);
    if (path === '/robots.txt' && !body.includes('Disallow: /')) throw new Error('Preview crawling is open');
    if (path === '/sitemap.xml' && body.includes('<loc>')) throw new Error('Preview URLs leaked into sitemap');
    results.push({ path, method, status: response.status, noindex: true });
  }
  await writeFile('.next/route-audit/results.json', JSON.stringify(results, null, 2));
  console.log(`Verified ${results.length} concrete routes: status, private redirects and noindex.`);
} finally { server.kill(); }
