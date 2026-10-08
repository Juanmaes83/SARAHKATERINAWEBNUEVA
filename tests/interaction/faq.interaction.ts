import { writeFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { FAQ_RELATED } from '@/content/en/internal-links';
import { SERVICE_ROUTES } from '@/content/en/service-journey';
import { faq as investmentFaq } from '@/content/en/investment';
import { faq as purchaseFaq } from '@/content/en/property-purchase';
import { faq as taxFaq } from '@/content/en/tax-advisory';
import { faq as teamFaq } from '@/content/en/team';

/**
 * FAQ DISCLOSURE INTERACTION QA (Phase 2B).
 *
 * Drives the real FAQ in a browser on Investment, Property Purchase and Tax
 * Advisory (`appearance="light"`) and Team (`boxed`), at a narrow and a wide
 * viewport. For every FAQ item that has a related link, and for one item
 * without, it checks: closed at load; opened from the keyboard (Enter, and
 * Space on alternate items); `aria-expanded` follows the state;
 * `aria-controls` names the real panel while open and is absent while closed;
 * the panel is a region named by its trigger; the related link has the
 * registry href and label; focus stays on the trigger; closing removes the
 * panel and leaves no dangling ARIA reference; the related link navigates.
 *
 * Run (not part of CI — see tests/interaction/README.md):
 *   QA_BASE_URL=http://localhost:3000 PLAYWRIGHT_MODULE=/path/to/playwright \
 *     npx vitest run --config vitest.interaction.config.ts
 * Optional QA_EVIDENCE=<file.json> writes the per-check results.
 */

/* Minimal typing of the Playwright surface used here (no dependency). */
interface Locator {
  count(): Promise<number>;
  getAttribute(name: string): Promise<string | null>;
  focus(): Promise<void>;
  click(): Promise<void>;
  first(): Locator;
  locator(selector: string): Locator;
  getByRole(role: string, options?: { name?: string; exact?: boolean }): Locator;
}
interface Page {
  goto(url: string, options?: { waitUntil?: string }): Promise<unknown>;
  locator(selector: string): Locator;
  getByRole(role: string, options?: { name?: string; exact?: boolean }): Locator;
  keyboard: { press(key: string): Promise<void> };
  evaluate<T>(fn: () => T): Promise<T>;
  waitForURL(url: string | RegExp): Promise<void>;
  url(): string;
  close(): Promise<void>;
}
interface Browser {
  newPage(options: { viewport: { width: number; height: number } }): Promise<Page>;
  version(): string;
  close(): Promise<void>;
}

const BASE = process.env.QA_BASE_URL;
const MODULE = process.env.PLAYWRIGHT_MODULE ?? 'playwright';

const PAGES = [
  { key: 'investment', route: SERVICE_ROUTES.investment, faq: investmentFaq, variant: 'light' },
  { key: 'purchase', route: SERVICE_ROUTES.purchase, faq: purchaseFaq, variant: 'light' },
  { key: 'tax', route: SERVICE_ROUTES.tax, faq: taxFaq, variant: 'light' },
  { key: 'team', route: SERVICE_ROUTES.team, faq: teamFaq, variant: 'boxed' },
] as const;

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];

const evidence: Array<Record<string, unknown>> = [];
let browser: Browser;
let browserVersion = '';

beforeAll(async () => {
  if (!BASE) throw new Error('QA_BASE_URL is required (a running `next start`).');
  const playwright = (await import(/* @vite-ignore */ MODULE)) as {
    chromium: { launch(): Promise<Browser> };
  };
  browser = await playwright.chromium.launch();
  browserVersion = browser.version();
});

afterAll(async () => {
  await browser?.close();
  if (process.env.QA_EVIDENCE) {
    writeFileSync(
      process.env.QA_EVIDENCE,
      `${JSON.stringify({ baseUrl: BASE, browser: `chromium ${browserVersion}`, checks: evidence }, null, 2)}\n`,
    );
  }
});

/** ARIA id references in the document that point at no element. */
const danglingAriaRefs = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby]')].flatMap(
      (el) =>
        ['aria-controls', 'aria-labelledby', 'aria-describedby'].flatMap((attr) =>
          (el.getAttribute(attr) ?? '')
            .split(/\s+/)
            .filter(Boolean)
            .filter((id) => !document.getElementById(id))
            .map((id) => `${attr}=${id}`),
        ),
    ),
  );

for (const viewport of VIEWPORTS) {
  for (const target of PAGES) {
    const related = FAQ_RELATED[target.key] as Readonly<
      Record<string, { href: string; label: string }>
    >;
    const withLink = target.faq.items.filter((item) => related[item.id]);
    const withoutLink = target.faq.items.find((item) => !related[item.id]);
    const items = withoutLink ? [...withLink, withoutLink] : withLink;

    describe(`${target.route} (${target.variant}) @${viewport.width}px`, () => {
      it('renders every answer closed, with no aria-controls and no panel', async () => {
        const page = await browser.newPage({ viewport });
        await page.goto(`${BASE}${target.route}`, { waitUntil: 'networkidle' });
        const faq = page.locator('#faq');
        const triggers = faq.locator('button[aria-expanded]');
        expect(await triggers.count()).toBe(target.faq.items.length);
        expect(await faq.locator('button[aria-expanded="true"]').count()).toBe(0);
        expect(await faq.locator('button[aria-controls]').count()).toBe(0);
        expect(await faq.locator('[role="region"]').count()).toBe(0);
        evidence.push({
          viewport: viewport.width,
          route: target.route,
          check: 'initially closed',
          pass: true,
        });
        await page.close();
      });

      items.forEach((item, index) => {
        const link = related[item.id];
        const key = index % 2 === 0 ? 'Enter' : 'Space';
        it(`${item.id}: opens with ${key}, exposes ${link ? 'its related link' : 'no related link'}, closes cleanly`, async () => {
          const page = await browser.newPage({ viewport });
          await page.goto(`${BASE}${target.route}`, { waitUntil: 'networkidle' });
          const faq = page.locator('#faq');
          const trigger = faq.getByRole('button', { name: item.question.text, exact: true });
          expect(await trigger.count()).toBe(1);
          const triggerId = await trigger.getAttribute('id');

          await trigger.focus();
          await page.keyboard.press(key);

          expect(await trigger.getAttribute('aria-expanded')).toBe('true');
          const controls = await trigger.getAttribute('aria-controls');
          expect(controls).toBeTruthy();
          const panel = page.locator(`[id="${controls}"]`);
          expect(await panel.count()).toBe(1);
          expect(await panel.getAttribute('role')).toBe('region');
          expect(await panel.getAttribute('aria-labelledby')).toBe(triggerId);
          expect(
            await page.getByRole('region', { name: item.question.text, exact: true }).count(),
          ).toBe(1);
          expect(await page.evaluate(() => document.activeElement?.id ?? null)).toBe(triggerId);

          const links = panel.locator('a');
          if (link) {
            expect(await links.count()).toBe(1);
            expect(await links.first().getAttribute('href')).toBe(link.href);
            expect(await panel.getByRole('link', { name: link.label, exact: true }).count()).toBe(
              1,
            );
          } else {
            expect(await links.count()).toBe(0);
          }
          expect(await danglingAriaRefs(page)).toEqual([]);

          await page.keyboard.press(key);
          expect(await trigger.getAttribute('aria-expanded')).toBe('false');
          expect(await trigger.getAttribute('aria-controls')).toBeNull();
          expect(await panel.count()).toBe(0);
          expect(await danglingAriaRefs(page)).toEqual([]);

          if (link) {
            await trigger.focus();
            await page.keyboard.press(key);
            await panel.locator('a').first().click();
            const [path, hash] = link.href.split('#');
            await page.waitForURL(new RegExp(`${path}${hash ? `#${hash}` : ''}$`));
          }

          evidence.push({
            viewport: viewport.width,
            route: target.route,
            check: `${item.id} via ${key}`,
            related: link ? { href: link.href, label: link.label, navigated: true } : null,
            pass: true,
          });
          await page.close();
        });
      });
    });
  }
}
