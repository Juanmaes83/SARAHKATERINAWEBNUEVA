import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

// Read-only local UI QA: no hosted destinations, non-GET requests or messages.
const base = new URL(process.env.QA_BASE_URL ?? 'http://127.0.0.1:3109');
assert(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Local QA origin required');
assert(!base.username && !base.password && !base.search, 'Plain local origin required');
const modulePath = process.env.PLAYWRIGHT_MODULE;
assert(modulePath, 'PLAYWRIGHT_MODULE must name an installed Playwright module');
const { chromium } = await import(pathToFileURL(resolve(modulePath)).href);
const browser = await chromium.launch({
  headless: true,
  ...(process.env.QA_CHROMIUM_PATH ? { executablePath: process.env.QA_CHROMIUM_PATH } : {}),
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});
const directory = 'docs/screenshots/assistant-review-2026-10-09';
await mkdir(directory, { recursive: true });
const evidence = { baseUrl: base.origin, browser: browser.version(), checks: [] };
const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '-p', base.port || '3109', '-H', base.hostname],
  { stdio: 'ignore' },
);

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      await fetch(base.origin);
      ready = true;
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  assert(ready, 'Local review server must start');
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 1440 ? 900 : 844 },
      serviceWorkers: 'block',
    });
    const blocked = [];
    const mutationAttempts = [];
    await context.route('**/*', (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (!['GET', 'HEAD'].includes(request.method())) {
        mutationAttempts.push(request.method() + ' ' + url.pathname);
        return route.abort();
      }
      if (url.origin !== base.origin) {
        blocked.push(url.origin);
        return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(base.origin + '/preview/home', {
      waitUntil: 'domcontentloaded',
    });
    assert(response.headers()['x-robots-tag'].includes('noindex'));
    const launcher = page.getByRole('button', { name: 'How can I help?', exact: true });
    await launcher.waitFor({ state: 'visible' });
    assert.equal(await page.locator('dialog[open]').count(), 0);
    const beforeStorage = await page.evaluate(() => ({
      local: Object.keys(localStorage),
      session: Object.keys(sessionStorage),
      cookies: document.cookie,
    }));
    await launcher.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Sarah Katerina', exact: true });
    await dialog.waitFor({ state: 'visible' });
    assert.equal(await dialog.locator('input, textarea, form, iframe').count(), 0);
    assert.equal(
      await page.evaluate(() => document.activeElement?.getAttribute('aria-label')),
      'Close assistant',
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    const bounds = await dialog.boundingBox();
    assert(bounds.x >= 0 && bounds.x + bounds.width <= width);
    assert(bounds.y >= 0 && bounds.y + bounds.height <= 844 + (width === 1440 ? 56 : 0));
    const controls = await dialog
      .locator('button, a, summary')
      .evaluateAll((elements) =>
        elements
          .filter((el) => el.getClientRects().length)
          .map((el) => ({
            label: el.textContent.trim(),
            height: el.getBoundingClientRect().height,
          })),
      );
    assert(
      controls.every((control) => control.height >= 44),
      JSON.stringify(controls),
    );
    await page.screenshot({ path: `${directory}/home-panel-${width}.png` });
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press(i % 2 ? 'Shift+Tab' : 'Tab');
      assert.equal(await dialog.evaluate((el) => el.contains(document.activeElement)), true);
    }
    const whatsapp = dialog.getByRole('link', { name: /^Open WhatsApp/ });
    const target = new URL(await whatsapp.getAttribute('href'));
    assert.equal(target.origin, 'https://wa.me');
    assert.equal(target.pathname, '/34647754589');
    assert.equal(target.searchParams.get('text'), 'Hi Sarah, I would like to get in touch.');
    assert.equal(await whatsapp.getAttribute('rel'), 'noopener noreferrer');
    // Do not click an external service or send a real message.
    await dialog.getByRole('button', { name: 'Tax questions', exact: true }).click();
    assert((await dialog.textContent()).includes('does not assess your personal tax situation'));
    assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Tax questions');
    await page.keyboard.press('Escape');
    await launcher.waitFor({ state: 'visible' });
    assert.equal(
      await page.evaluate(() => document.activeElement?.textContent?.trim()),
      'How can I help?',
    );
    await launcher.click();
    assert.equal(
      await dialog.getByRole('heading', { name: 'Tax questions', exact: true }).count(),
      0,
    );
    const topics = [
      'Buying a property',
      'Investment',
      'Tax questions',
      'Contact the team',
      'Meet the team',
      'Read Insights',
      'Case Studies',
      'Visit the office',
      'Prices and availability',
      'Something else',
    ];
    for (const topic of topics) {
      if (topics.indexOf(topic) >= 4) await dialog.locator('summary').click();
      await dialog.getByRole('button', { name: topic, exact: true }).click();
      await dialog.getByRole('heading', { name: topic, exact: true }).waitFor();
      await dialog.getByRole('button', { name: /Back to topics/ }).click();
    }
    await dialog.getByRole('button', { name: 'Buying a property', exact: true }).click();
    await dialog.getByRole('link', { name: 'Explore Property Purchase', exact: true }).click();
    await page.waitForURL('**/preview/property-purchase');
    await launcher.waitFor({ state: 'visible' });
    assert.equal(await page.locator('dialog[open]').count(), 0);
    if (width < 1440) {
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await launcher.waitFor({ state: 'hidden' });
      await page
        .getByRole('dialog', { name: 'Site menu' })
        .getByRole('button', { name: 'Close', exact: true })
        .click();
      await launcher.waitFor({ state: 'visible' });
    }
    await launcher.click();
    await page.reload({ waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.deepEqual(
      await page.evaluate(() => ({
        local: Object.keys(localStorage),
        session: Object.keys(sessionStorage),
        cookies: document.cookie,
      })),
      beforeStorage,
    );
    await page.goto(base.origin + '/studio/login', { waitUntil: 'domcontentloaded' });
    assert.equal(await launcher.count(), 0);
    assert.deepEqual(mutationAttempts, []);
    assert.deepEqual(errors, []);
    evidence.checks.push({
      width,
      result: 'PASS',
      topics: 10,
      noInput: true,
      keyboard: true,
      noOverflow: true,
      touchTargets: true,
      resetOnCloseRouteReload: true,
      menuInterlock: width < 1440,
      unchangedStorage: true,
      mutationAttempts,
      blockedExternalOrigins: [...new Set(blocked)],
    });
    await context.close();
  }
  await writeFile(`${directory}/qa-results.json`, JSON.stringify(evidence, null, 2) + '\n');
  console.log(JSON.stringify(evidence, null, 2));
} finally {
  await browser.close();
  server.kill();
}
