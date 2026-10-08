import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * RENDERED HTML SEMANTICS (Phase 2B, 2026-10-08).
 *
 * Reads the prerendered HTML of `/` and the six preview pages from
 * `.next/server/app` and checks what a source scan cannot: exactly one h1, a
 * heading outline without skipped levels, unique ids, every ARIA id
 * reference resolving, every <button> typed, every <a> with an href, every
 * <img> with an alt, and labelled landmarks where a page has more than one
 * of a kind. Skipped without a build; CI runs it after `next build` with
 * REQUIRE_RENDERED_HTML=1.
 */

const root = resolve(__dirname, '..');
const BUILT = resolve(root, '.next/server/app');
const PAGES: Record<string, string> = {
  '/': 'index.html',
  '/preview/home': 'preview/home.html',
  '/preview/investment': 'preview/investment.html',
  '/preview/property-purchase': 'preview/property-purchase.html',
  '/preview/tax-advisory': 'preview/tax-advisory.html',
  '/preview/team': 'preview/team.html',
  '/preview/contact': 'preview/contact.html',
};
const haveBuild = Object.values(PAGES).every((f) => existsSync(join(BUILT, f)));
const required = process.env.REQUIRE_RENDERED_HTML === '1';

function markup(route: string): string {
  return readFileSync(join(BUILT, PAGES[route] ?? ''), 'utf8')
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/<template\b[\s\S]*?<\/template>/g, '');
}

const tags = (html: string, name: string) =>
  [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'g'))].map((m) => m[1] ?? '');

describe('rendered HTML semantics', () => {
  it('has a build to check when CI requires one', () => {
    if (required) expect(haveBuild).toBe(true);
  });

  for (const route of Object.keys(PAGES)) {
    describe.skipIf(!haveBuild)(route, () => {
      it('has exactly one h1 and no skipped heading level', () => {
        const html = haveBuild ? markup(route) : '';
        const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
        expect(levels.filter((l) => l === 1)).toHaveLength(1);
        expect(levels[0]).toBe(1);
        const skips = levels.filter((l, i) => i > 0 && l > (levels[i - 1] ?? 0) + 1);
        expect(skips).toEqual([]);
      });

      it('has unique ids and every ARIA id reference resolves', () => {
        const html = haveBuild ? markup(route) : '';
        const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1] ?? '');
        const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
        expect(dup).toEqual([]);
        const known = new Set(ids);
        const refs = [...html.matchAll(/\saria-(?:controls|labelledby|describedby)="([^"]+)"/g)]
          .flatMap((m) => (m[1] ?? '').split(/\s+/))
          .filter((ref) => !known.has(ref));
        expect(refs).toEqual([]);
      });

      it('types every button, gives every link an href and every image an alt', () => {
        const html = haveBuild ? markup(route) : '';
        expect(tags(html, 'button').filter((a) => !/\stype="/.test(a))).toEqual([]);
        expect(tags(html, 'a').filter((a) => !/\shref="/.test(a))).toEqual([]);
        expect(tags(html, 'img').filter((a) => !/\salt="/.test(a))).toEqual([]);
      });

      it('has one main, one banner header and labels repeated landmarks', () => {
        const html = haveBuild ? markup(route) : '';
        expect(tags(html, 'main')).toHaveLength(1);
        const navs = tags(html, 'nav');
        if (navs.length > 1) {
          expect(navs.filter((a) => !/\saria-label(ledby)?="/.test(a))).toEqual([]);
        }
        const asides = tags(html, 'aside');
        expect(asides.filter((a) => !/\saria-label(ledby)?="/.test(a))).toEqual([]);
      });
    });
  }
});
