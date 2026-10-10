// Package A browser QA: per-answer source citation versus related pages.
// Local only: needs `npm run build`, PLAYWRIGHT_MODULE (ESM entry) and
// QA_CHROMIUM_PATH. External origins and non-GET requests are blocked.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base = new URL(process.env.QA_BASE_URL || 'http://127.0.0.1:3111');
assert(['127.0.0.1', 'localhost'].includes(base.hostname));
const output = process.env.QA_OUTPUT || 'docs/screenshots/assistant-knowledge-2026-10-10';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.QA_CHROMIUM_PATH,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '-p', base.port, '-H', base.hostname],
  { stdio: 'ignore' },
);
for (let i = 0; i < 60; i++) {
  try {
    await fetch(base.origin);
    break;
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}
await mkdir(output, { recursive: true });
const results = [];
try {
  for (const [width, height] of [
    [1440, 900],
    [390, 640],
    [320, 640],
  ]) {
    const context = await browser.newContext({ viewport: { width, height } });
    const mutations = [];
    const errors = [];
    await context.route('**/*', (route) => {
      const req = route.request();
      if (!['GET', 'HEAD'].includes(req.method())) {
        mutations.push(req.method());
        return route.abort();
      }
      if (new URL(req.url()).origin !== base.origin) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base.origin + '/preview/tax-advisory');
    const before = await page.evaluate(() => [
      Object.keys(localStorage),
      Object.keys(sessionStorage),
      document.cookie,
    ]);
    await page.getByRole('button', { name: 'How can I help?', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Sarah Katerina' });

    // Navigation answer: related page only, no source block.
    await dialog.getByRole('button', { name: 'Tax questions', exact: true }).click();
    const tax = dialog.getByRole('log').locator('section').last();
    assert.equal(await tax.getAttribute('data-knowledge'), 'eligible');
    assert.equal(await tax.getByText('Source on this website').count(), 0);
    assert.equal(await tax.getByText('Related website pages').count(), 1);
    await page.screenshot({ path: `${output}/tax-related-${width}x${height}.png` });

    // Fact answer: cited public page, review date, separate from related pages.
    await dialog.locator('summary').filter({ hasText: 'Choose another topic' }).click();
    await dialog.getByRole('button', { name: 'Visit the office', exact: true }).click();
    const office = dialog.getByRole('log').locator('section').last();
    assert.equal(await office.getAttribute('data-knowledge'), 'eligible');
    assert(
      (await office.locator('p').first().textContent()).includes(
        'Calle Bazán 10, 03181 Torrevieja',
      ),
    );
    assert.equal(await office.getByText('Source on this website').count(), 1);
    assert.equal(await office.getByText('Checked 10 Oct 2026').count(), 1);
    const citation = office.getByRole('link', { name: 'Contact page · Office →' });
    assert.equal(await citation.getAttribute('href'), '/preview/contact#office');
    assert.equal(await office.getByText('Related website pages').count(), 0);
    const box = await citation.boundingBox();
    assert(box.height >= 44, JSON.stringify(box));
    await office.scrollIntoViewIfNeeded();
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    await page.screenshot({ path: `${output}/office-source-${width}x${height}.png` });

    // The citation leads to the content it cites.
    await citation.click();
    await page.waitForURL('**/preview/contact#office');
    await page.waitForTimeout(400);
    const visible = await page.evaluate(() => {
      const rect = document.getElementById('office').getBoundingClientRect();
      return rect.top < innerHeight && rect.bottom > 0;
    });
    assert(visible);
    assert((await page.locator('#office').textContent()).includes('Calle Bazán 10'));
    await page.screenshot({ path: `${output}/office-destination-${width}x${height}.png` });

    assert.deepEqual(
      await page.evaluate(() => [
        Object.keys(localStorage),
        Object.keys(sessionStorage),
        document.cookie,
      ]),
      before,
    );
    assert.deepEqual(errors, []);
    assert.deepEqual(mutations, []);
    results.push({ width, height, result: 'PASS', citation: '/preview/contact#office' });
    await context.close();
  }
  await writeFile(`${output}/qa-results.json`, JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify(results));
} finally {
  await browser.close();
  server.kill();
}
