import { describe, expect, it } from 'vitest';
import {
  CHECKED_PAGES,
  RENDERED_HTML_REQUIRED,
  haveBuild,
  idsIn,
  landmarks,
  renderedMarkup,
} from './helpers/rendered-html';

/**
 * RENDERED HTML SEMANTICS (Phase 2B, 2026-10-08).
 *
 * Reads the prerendered HTML of `/` and the six preview pages from
 * `.next/server/app` and checks what a source scan cannot: exactly one h1, a
 * heading outline without skipped levels, unique ids, every ARIA id
 * reference resolving, every <button> typed, every <a> with an href, every
 * <img> with an alt, exactly one `main` landmark, and labels on repeated
 * `nav` and on every `aside`. Skipped without a build; CI runs it after
 * `next build` with REQUIRE_RENDERED_HTML=1.
 *
 * NOT CHECKED HERE — banner/contentinfo. app/layout.tsx wraps every page,
 * header and footer included, in `<main id="main">`. Under HTML-AAM a
 * `header`/`footer` inside `main` is not the page banner/contentinfo, so no
 * page exposes those landmarks today. That predates Phase 2B (it is on
 * `main` at 922c5f3) and fixing it changes the shared layout of every page;
 * it is recorded as follow-up A11Y-LM-01 (docs/phase-2b-coverage-matrix.md).
 * The landmark classifier is tested below on fixtures so the check can be
 * switched on once the layout is fixed.
 */

const tags = (html: string, name: string) =>
  [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, 'g'))].map((m) => m[1] ?? '');

describe('rendered HTML semantics', () => {
  it('has a build to check when CI requires one', () => {
    if (RENDERED_HTML_REQUIRED) expect(haveBuild).toBe(true);
  });

  for (const route of CHECKED_PAGES) {
    describe.skipIf(!haveBuild)(route, () => {
      const html = () => renderedMarkup(route) ?? '';

      it('has exactly one h1 and no skipped heading level', () => {
        const levels = [...html().matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
        expect(levels.filter((l) => l === 1)).toHaveLength(1);
        expect(levels[0]).toBe(1);
        const skips = levels.filter((l, i) => i > 0 && l > (levels[i - 1] ?? 0) + 1);
        expect(skips).toEqual([]);
      });

      it('has unique ids and every ARIA id reference resolves', () => {
        const ids = idsIn(html());
        const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
        expect(dup).toEqual([]);
        const known = new Set(ids);
        const refs = [...html().matchAll(/\saria-(?:controls|labelledby|describedby)="([^"]+)"/g)]
          .flatMap((m) => (m[1] ?? '').split(/\s+/))
          .filter((ref) => !known.has(ref));
        expect(refs).toEqual([]);
      });

      it('types every button, gives every link an href and every image an alt', () => {
        expect(tags(html(), 'button').filter((a) => !/\stype="/.test(a))).toEqual([]);
        expect(tags(html(), 'a').filter((a) => !/\shref="/.test(a))).toEqual([]);
        expect(tags(html(), 'img').filter((a) => !/\salt="/.test(a))).toEqual([]);
      });

      it('has exactly one main landmark and labels repeated nav and every aside', () => {
        expect(landmarks(html()).main).toHaveLength(1);
        const navs = tags(html(), 'nav');
        if (navs.length > 1) {
          expect(navs.filter((a) => !/\saria-label(ledby)?="/.test(a))).toEqual([]);
        }
        const asides = tags(html(), 'aside');
        expect(asides.filter((a) => !/\saria-label(ledby)?="/.test(a))).toEqual([]);
      });
    });
  }
});

describe('landmark classifier (fixtures)', () => {
  it('counts a page-level header/footer as banner/contentinfo, never a section header', () => {
    const page =
      '<body><header>site</header><main><section><header>band</header></section>' +
      '<article><header>card</header><footer>meta</footer></article></main><footer>site</footer></body>';
    const result = landmarks(page);
    expect(result.banner).toHaveLength(1);
    expect(result.contentinfo).toHaveLength(1);
    expect(result.main).toHaveLength(1);
  });

  it('does not count a header or footer scoped inside main (the current layout)', () => {
    const result = landmarks(
      '<body><main id="main"><header>site</header><footer>site</footer></main></body>',
    );
    expect(result.banner).toHaveLength(0);
    expect(result.contentinfo).toHaveLength(0);
  });

  it('honours explicit roles and ignores void and self-closing elements', () => {
    const result = landmarks(
      '<body><div role="banner"><img src="x" alt=""><br/></div><section><div role="contentinfo"></div></section></body>',
    );
    expect(result.banner).toHaveLength(1);
    expect(result.contentinfo).toHaveLength(1);
  });
});
