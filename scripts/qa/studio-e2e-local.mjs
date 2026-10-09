/**
 * LOCAL end-to-end QA of the Studio editorial flow (not part of CI).
 *
 * Requires: a LOCAL Supabase with the Studio migrations and two local QA
 * members (qa-admin@example.test admin, qa-contributor@example.test
 * contributor, password in QA_PASSWORD), the app built and started against it
 * (QA_BASE_URL), the two new articles imported as drafts
 * (scripts/studio/import/import-payloads.mjs), and a Playwright install
 * (PLAYWRIGHT_MODULE). Status is read from the local database container
 * (QA_DB_CONTAINER). NEVER point this at the hosted project: it publishes.
 *
 * Usage: node scripts/qa/studio-e2e-local.mjs <output dir>
 */
import { assertLocalStudioBuild, restrictBrowserToLocal } from './studio-isolation.mjs';
import { execFileSync } from 'node:child_process';
const origins = assertLocalStudioBuild();
const BASE = origins.app;
const pw = (await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright')).default;
const { chromium } = pw;
const OUT = process.argv[2];
const PASS = process.env.QA_PASSWORD;
if (!PASS) throw new Error('QA_PASSWORD is required.');
const DB = process.env.QA_DB_CONTAINER;
const log = [];
const step = (msg, data = {}) => {
  log.push({ step: msg, ...data });
  console.log('✔', msg, Object.keys(data).length ? JSON.stringify(data) : '');
};
const sql = (q) =>
  execFileSync('docker', ['exec', '-i', DB, 'psql', '-U', 'postgres', '-d', 'postgres', '-At', '-c', q]).toString().trim();
const docId = (slug) =>
  sql(`select id from public.documents where kind='article' and slug='${slug}'`);
const status = (id) => sql(`select status from public.documents where id='${id}'`);

const browser = await chromium.launch({ args: ['--no-proxy-server'] });
async function login(email) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const assertNoExternal = await restrictBrowserToLocal(ctx, origins);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/studio/login`);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASS);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL((u) => !u.pathname.startsWith('/studio/login'), { timeout: 20000 });
  return { ctx, page, assertNoExternal };
}
async function clickAndWait(page, name, id, expected) {
  await page.getByRole('button', { name }).click();
  for (let i = 0; i < 40 && status(id) !== expected; i++) await page.waitForTimeout(250);
  const s = status(id);
  if (s !== expected) throw new Error(`${name}: expected ${expected}, got ${s}`);
  await page.reload();
  return s;
}

const ibi = docId('ibi-alicante-province-non-resident-owners');
const cal = docId('non-resident-owner-tax-calendar-alicante-2026');

// 1. Contributor: overview, open the draft, send it to review; no Approve button.
{
  const { ctx, page, assertNoExternal } = await login('qa-contributor@example.test');
  await page.goto(`${BASE}/studio`);
  await page.screenshot({ path: `${OUT}/01-contributor-overview.png`, fullPage: true });
  await page.goto(`${BASE}/studio/documents/${ibi}`);
  await page.screenshot({ path: `${OUT}/02-contributor-editor-draft.png`, fullPage: false });
  step('contributor opened draft', { status: status(ibi) });
  await clickAndWait(page, 'Send to review', ibi, 'in_review');
  const approveButtons = await page.getByRole('button', { name: 'Approve' }).count();
  if (approveButtons !== 0) throw new Error('Contributor must not see Approve');
  step('contributor sent to review; Approve hidden for contributor', {
    status: status(ibi),
    approveButtons,
  });
  const forbidden = await page.evaluate(
    async ([id]) => {
      const r = await fetch(`/api/studio/documents/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', version: 1 }),
      });
      return r.status;
    },
    [ibi],
  );
  if (forbidden !== 403) throw new Error('Contributor approval must return 403');
  step('contributor approve via API is refused', { httpStatus: forbidden });
  await page.screenshot({ path: `${OUT}/03-contributor-in-review.png`, fullPage: false });
  assertNoExternal();
  await ctx.close();
}

// 2. Admin: approve and publish the IBI article; full flow for the calendar article; create one from the panel.
{
  const { ctx, page, assertNoExternal } = await login('qa-admin@example.test');
  await page.goto(`${BASE}/studio/documents/${ibi}`);
  await clickAndWait(page, 'Approve', ibi, 'approved');
  step('admin approved', { status: status(ibi) });
  await clickAndWait(page, 'Publish to preview', ibi, 'published');
  step('admin published to preview', { status: status(ibi) });
  await page.screenshot({ path: `${OUT}/04-admin-published.png`, fullPage: false });

  await page.goto(`${BASE}/studio/documents/${cal}`);
  await clickAndWait(page, 'Send to review', cal, 'in_review');
  await clickAndWait(page, 'Approve', cal, 'approved');
  await clickAndWait(page, 'Publish to preview', cal, 'published');
  step('calendar article: review → approve → publish', { status: status(cal) });

  await page.goto(`${BASE}/studio/new?kind=article`);
  await page.getByLabel('Title').fill('Studio creation test: delete after QA');
  await page.getByRole('button', { name: 'Create draft' }).click();
  await page.waitForURL(/\/studio\/documents\//, { timeout: 20000 });
  await page.getByLabel('Standfirst').fill('Created from the Studio panel during local QA.');
  await page.getByRole('button', { name: 'Save now' }).click();
  await page.waitForTimeout(1500);
  await page.reload();
  const saved = await page.getByLabel('Standfirst').inputValue();
  if (saved !== 'Created from the Studio panel during local QA.') throw new Error('Edit did not persist');
  step('admin created a new article from the panel and the edit persisted after reload', { saved });
  await page.screenshot({ path: `${OUT}/05-admin-new-article-editor.png`, fullPage: false });
  await page.goto(`${BASE}/studio`);
  await page.screenshot({ path: `${OUT}/06-admin-overview.png`, fullPage: true });
  assertNoExternal();
  await ctx.close();
}

// 3. Anonymous visitor: the published articles on the new site.
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const assertNoExternal = await restrictBrowserToLocal(ctx, origins);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/preview/insights`);
  const listed = await page.getByText('IBI in the province of Alicante').count();
  await page.screenshot({ path: `${OUT}/07-public-insights-list-1440.png`, fullPage: true });
  for (const [slug, name] of [
    ['ibi-alicante-province-non-resident-owners', 'ibi'],
    ['non-resident-owner-tax-calendar-alicante-2026', 'calendar'],
  ]) {
    const res = await page.goto(`${BASE}/preview/insights/${slug}`);
    if (res.status() !== 200) throw new Error('Published fixture must return 200');
    const head = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      robots: document.querySelector('meta[name="robots"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      h1: document.querySelector('h1')?.textContent,
      h2: [...document.querySelectorAll('main h2')].map((h) => h.textContent).slice(0, 8),
      jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(
        (s) => {
          try {
            const j = JSON.parse(s.textContent);
            return (j['@graph'] ?? [j]).map((n) => n['@type']);
          } catch {
            return ['invalid'];
          }
        },
      ),
    }));
    step(`public article ${name}`, {
      http: res.status(),
      xRobots: res.headers()['x-robots-tag'],
      ...head,
    });
    await page.screenshot({ path: `${OUT}/08-public-${name}-1440.png`, fullPage: true });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: `${OUT}/09-public-${name}-375.png`, fullPage: true });
    await page.setViewportSize({ width: 1440, height: 900 });
  }
  if (listed < 1) throw new Error('Published article absent from list');
  step('insights list shows the new article to anonymous visitors', { listed });
  assertNoExternal();
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(log, null, 2));
