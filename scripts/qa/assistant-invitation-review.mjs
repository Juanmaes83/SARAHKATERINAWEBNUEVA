// Package B browser QA: contextual help invitation. Local only; needs
// `npm run build`, PLAYWRIGHT_MODULE (ESM entry) and QA_CHROMIUM_PATH.
// Playwright's fake clock replaces real waiting. The page hides the
// invitation from automated browsers, so the QA context reports
// navigator.webdriver = false explicitly. External origins and non-GET
// requests are blocked; nothing is sent.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const base = new URL(process.env.QA_BASE_URL || 'http://127.0.0.1:3112');
assert(['127.0.0.1', 'localhost'].includes(base.hostname));
const output = process.env.QA_OUTPUT || 'docs/screenshots/assistant-invitation-2026-10-10';
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
const OFFER = 'Offer of help';

async function session(width, height, options = {}) {
  const context = await browser.newContext({ viewport: { width, height }, ...options });
  const record = { mutations: [], errors: [] };
  await context.route('**/*', (route) => {
    const req = route.request();
    if (!['GET', 'HEAD'].includes(req.method())) {
      record.mutations.push(req.method());
      return route.abort();
    }
    if (new URL(req.url()).origin !== base.origin) return route.abort();
    return route.continue();
  });
  await context.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });
    // Lets the QA hide/show the tab; the page reads the real API otherwise.
    let state = 'visible';
    Object.defineProperty(document, 'visibilityState', { get: () => state });
    window.__setVisibility = (next) => {
      state = next;
      document.dispatchEvent(new Event('visibilitychange'));
    };
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => record.errors.push(error.message));
  await page.clock.install();
  return { context, page, record };
}
const offer = (page) => page.getByRole('region', { name: OFFER });
const launcher = (page) => page.getByRole('button', { name: 'How can I help?', exact: true });
async function scrollTo(page, ratio) {
  // Let React hydrate first: chunks load in real time, the scheduler on the fake clock.
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1_000);
  await page.clock.runFor(1_000);
  await page.evaluate((r) => {
    // Instant: the site's smooth scrolling would stall under the fake clock.
    scrollTo({
      top: (document.documentElement.scrollHeight - innerHeight) * r,
      behavior: 'instant',
    });
    dispatchEvent(new Event('scroll'));
  }, ratio);
  await page.clock.runFor(100);
}
async function storage(page) {
  return page.evaluate(() => [
    Object.keys(localStorage),
    Object.keys(sessionStorage),
    document.cookie,
  ]);
}
async function finish({ context, page, record }, before, entry) {
  assert.deepEqual(await storage(page), before);
  assert.deepEqual(record.errors, []);
  assert.deepEqual(record.mutations, []);
  results.push({ ...entry, result: 'PASS' });
  await context.close();
}

try {
  for (const [width, height] of [
    [1440, 900],
    [390, 740],
    [320, 640],
  ]) {
    // 1. Service engagement: 45 s visible + 50 % scroll; hidden time does not count.
    {
      const s = await session(width, height);
      const { page } = s;
      await page.goto(base.origin + '/preview/tax-advisory');
      const before = await storage(page);
      await scrollTo(page, 0.6);
      await page.clock.runFor(20_000);
      await page.evaluate(() => window.__setVisibility('hidden'));
      await page.clock.runFor(120_000);
      assert.equal(await offer(page).count(), 0, 'hidden time must not count');
      await page.evaluate(() => window.__setVisibility('visible'));
      await page.clock.runFor(20_000);
      assert.equal(await offer(page).count(), 0, '40 s visible is not enough');
      await page.clock.runFor(7_000);
      await offer(page).waitFor();
      assert(await launcher(page).evaluate((el) => el.className.includes('invited')));
      assert.equal(await page.getByRole('dialog').count(), 0, 'never auto-opens the panel');
      const box = await offer(page).boundingBox();
      assert(box.x >= 0 && box.x + box.width <= width, JSON.stringify(box));
      const launchBox = await launcher(page).boundingBox();
      assert(box.y + box.height <= launchBox.y, 'invitation sits above the launcher');
      for (const name of ['Ask a question', 'Not now']) {
        const b = await offer(page).getByRole('button', { name }).boundingBox();
        assert(b.height >= 44 && b.width >= 44, name);
      }
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
      );
      await page.waitForTimeout(1_200); // CSS entry and pulse run in real time
      const opacity = await offer(page).evaluate((el) => getComputedStyle(el).opacity);
      assert.equal(opacity, '1');
      await page.screenshot({ path: `${output}/service-offer-${width}x${height}.png` });
      await launcher(page).screenshot({ path: `${output}/launcher-glow-${width}x${height}.png` });
      // Accept: panel opens with the page's topic first.
      await offer(page).getByRole('button', { name: 'Ask a question' }).click();
      const dialog = page.getByRole('dialog', { name: 'Sarah Katerina' });
      await dialog.waitFor();
      const first = dialog.locator('button', { hasText: 'Tax questions' }).first();
      const topics = await dialog.evaluate((el) =>
        [...el.querySelectorAll(':scope [class*="topics"] > button')].map((b) => b.textContent),
      );
      assert.equal(topics[0], 'Tax questions', JSON.stringify(topics));
      assert(await first.isVisible());
      await page.screenshot({ path: `${output}/service-accepted-${width}x${height}.png` });
      await page.keyboard.press('Escape');
      assert.equal(await offer(page).count(), 0, 'no second offer after opening');
      await page.clock.runFor(120_000);
      assert.equal(await offer(page).count(), 0);
      await finish(s, before, { width, height, scenario: 'service-engagement+hidden-tab+accept' });
    }

    // 2. Menu / overlay defers the offer without using it up (mobile menu).
    if (width < 640) {
      const s = await session(width, height);
      const { page } = s;
      await page.goto(base.origin + '/preview/investment');
      const before = await storage(page);
      await scrollTo(page, 0.7);
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.getByRole('button', { name: 'Menu' }).click();
      await page.clock.runFor(60_000);
      assert.equal(await offer(page).count(), 0, 'deferred while the menu is open');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('[aria-modal="true"]').count(), 0, 'menu closed');
      await page.clock.runFor(2_000);
      await offer(page).waitFor();
      await finish(s, before, { width, height, scenario: 'menu-defers-not-consumes' });
    }
  }

  // 3. Three distinct pages incl. a service, client navigation; dismiss suppresses across routes.
  {
    const s = await session(1440, 900);
    const { page } = s;
    await page.goto(base.origin + '/preview/home');
    const before = await storage(page);
    await page.clock.runFor(10_000);
    const nav = page.getByRole('navigation').first();
    await nav.getByRole('link', { name: 'Investment', exact: true }).click();
    await page.waitForURL('**/preview/investment');
    await page.clock.runFor(10_000);
    assert.equal(await offer(page).count(), 0, 'two pages are not enough');
    // Same page again via hash does not count.
    await page.evaluate(() => history.pushState(null, '', '/preview/investment#faq'));
    await page.clock.runFor(2_000);
    await nav.getByRole('link', { name: 'Team', exact: true }).click();
    await page.waitForURL('**/preview/team');
    await page.clock.runFor(3_000);
    assert.equal(await offer(page).count(), 0, 'grace period on arrival');
    await page.clock.runFor(3_000);
    await offer(page).waitFor();
    await page.waitForTimeout(1_200);
    await page.screenshot({ path: `${output}/multi-page-offer-1440x900.png` });
    // Keyboard: reach the offer, Escape dismisses and returns focus to the launcher.
    await offer(page).getByRole('button', { name: 'Not now' }).focus();
    await page.keyboard.press('Escape');
    assert.equal(await offer(page).count(), 0);
    assert(await launcher(page).evaluate((el) => el === document.activeElement));
    await nav.getByRole('link', { name: 'Tax Advisory', exact: true }).click();
    await page.waitForURL('**/preview/tax-advisory');
    await scrollTo(page, 0.8);
    await page.clock.runFor(120_000);
    assert.equal(await offer(page).count(), 0, 'dismissed: no offer on later routes');
    await finish(s, before, {
      width: 1440,
      height: 900,
      scenario: 'multi-page+keyboard+suppression',
    });
  }

  // 4. Reduced motion: static glow, no animation.
  {
    const s = await session(1440, 900, { reducedMotion: 'reduce' });
    const { page } = s;
    await page.goto(base.origin + '/preview/property-purchase');
    const before = await storage(page);
    await scrollTo(page, 0.55);
    await page.clock.runFor(50_000);
    await offer(page).waitFor();
    const animations = await page.evaluate(() => [
      getComputedStyle(document.querySelector('[class*="invitation"]')).animationName,
      getComputedStyle(document.querySelector('[class*="invited"]')).animationName,
    ]);
    assert.deepEqual(animations, ['none', 'none']);
    await finish(s, before, { width: 1440, height: 900, scenario: 'reduced-motion' });
  }

  // 5. Excluded pages: legal/contact never show it; Studio has no assistant.
  {
    const s = await session(1440, 900);
    const { page } = s;
    await page.goto(base.origin + '/preview/privacy');
    const before = await storage(page);
    await scrollTo(page, 1);
    await page.clock.runFor(120_000);
    assert.equal(await offer(page).count(), 0);
    await page.goto(base.origin + '/studio/login');
    await page.clock.runFor(60_000);
    assert.equal(await launcher(page).count(), 0);
    assert.equal(await offer(page).count(), 0);
    await finish(s, before, { width: 1440, height: 900, scenario: 'legal-and-studio-excluded' });
  }

  // 6. Real automation flag: no invitation at all.
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.route('**/*', (route) =>
      new URL(route.request().url()).origin === base.origin ? route.continue() : route.abort(),
    );
    const page = await context.newPage();
    await page.clock.install();
    await page.goto(base.origin + '/preview/tax-advisory');
    await scrollTo(page, 0.9);
    await page.clock.runFor(120_000);
    assert.equal(await offer(page).count(), 0);
    results.push({ scenario: 'webdriver-excluded', result: 'PASS' });
    await context.close();
  }

  await writeFile(`${output}/qa-results.json`, JSON.stringify(results, null, 2) + '\n');
  console.log(JSON.stringify(results));
} finally {
  await browser.close();
  server.kill();
}
