import { readdirSync, readFileSync, statSync } from 'node:fs';
import { relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CTA_TARGETS,
  FAQ_RELATED,
  FOOTER_LINK_TARGETS,
  INVESTMENT_DOOR_TARGETS,
} from '@/content/en/internal-links';
import { JOURNEY, SERVICE_ROUTES, TEAM_LAYER } from '@/content/en/service-journey';
import { UNIFIED_WEB_NAV } from '@/content/en/site-navigation';
import { footer as homeFooter } from '@/content/en/home';
import { footer as investmentFooter, faq as investmentFaq } from '@/content/en/investment';
import { footer as purchaseFooter, faq as purchaseFaq } from '@/content/en/property-purchase';
import { footer as taxFooter, faq as taxFaq } from '@/content/en/tax-advisory';
import { footer as teamFooter, faq as teamFaq } from '@/content/en/team';
import { doors } from '@/content/en/investment';
import { checkLink, resolveHref, type DestinationIndex, type LinkRef } from './helpers/link-check';
import {
  APP_ROUTES,
  CHECKED_PAGES,
  RENDERED_HTML_REQUIRED,
  haveBuild,
  idsIn,
  renderedMarkup,
  root,
} from './helpers/rendered-html';

/**
 * NO BROKEN INTERNAL LINKS (Phase 2B, 2026-10-08).
 *
 * 1. The App Router route set is derived from app/**\/page.tsx.
 * 2. Source: every internal path literal in app/, components/, content/ and
 *    lib/, and every registry href, must be an existing route.
 * 3. Rendered build, PER DESTINATION: every registry href — including
 *    FAQ_RELATED, whose links are only inserted when an answer is opened and
 *    are therefore NOT in the prerendered HTML — and every <a href> in the
 *    initial HTML of the seven pages must resolve to a route and, if it has a
 *    fragment, to an id rendered on THAT destination page
 *    (tests/helpers/link-check.ts). An id on another page does not count; a
 *    fragment whose destination has no rendered HTML is an error.
 *    CI runs this file after `next build` with REQUIRE_RENDERED_HTML=1.
 */

const ROUTES = APP_ROUTES;

const sources = ['app', 'components', 'content', 'lib']
  .flatMap((d) => walkFiles(`${root}/${d}`))
  .filter((f) => /\.(ts|tsx)$/.test(f));

function walkFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = `${dir}/${name}`;
    return statSync(path).isDirectory() ? walkFiles(path) : [path];
  });
}

const FAQ_PAGE: Record<keyof typeof FAQ_RELATED, string> = {
  investment: SERVICE_ROUTES.investment,
  purchase: SERVICE_ROUTES.purchase,
  tax: SERVICE_ROUTES.tax,
  team: SERVICE_ROUTES.team,
};

/** Footer content → the pages that render it. Contact renders the Team footer. */
const FOOTERS = [
  { footer: homeFooter, pages: ['/preview/home'] },
  { footer: investmentFooter, pages: [SERVICE_ROUTES.investment] },
  { footer: purchaseFooter, pages: [SERVICE_ROUTES.purchase] },
  { footer: taxFooter, pages: [SERVICE_ROUTES.tax] },
  { footer: teamFooter, pages: [SERVICE_ROUTES.team, '/preview/contact'] },
] as const;

const footerLabel = (link: { label?: { text: string }; text?: string }) =>
  link.label?.text ?? link.text ?? '';

const ctaSource = (slot: string) =>
  slot.startsWith('investment')
    ? SERVICE_ROUTES.investment
    : slot.startsWith('tax')
      ? SERVICE_ROUTES.tax
      : SERVICE_ROUTES.purchase;

/** Every registry href, traced to the page(s) it is shown on. */
const REGISTRY_LINKS: LinkRef[] = [
  ...Object.entries(CTA_TARGETS).map(([key, href]) => ({
    registry: 'CTA_TARGETS',
    key,
    source: ctaSource(key),
    href,
  })),
  ...Object.entries(INVESTMENT_DOOR_TARGETS).map(([key, href]) => ({
    registry: 'INVESTMENT_DOOR_TARGETS',
    key,
    source: SERVICE_ROUTES.investment,
    href,
  })),
  ...Object.entries(FAQ_RELATED).flatMap(([page, links]) =>
    Object.entries(links as Record<string, { href: string }>).map(([id, link]) => ({
      registry: 'FAQ_RELATED',
      key: `${page}.${id}`,
      source: FAQ_PAGE[page as keyof typeof FAQ_RELATED],
      href: link.href,
    })),
  ),
  ...Object.entries(FOOTER_LINK_TARGETS).flatMap(([label, href]) => {
    const pages = FOOTERS.filter(({ footer }) =>
      footer.groups.some((group) =>
        group.links.some((link) => footerLabel(link as never) === label),
      ),
    ).flatMap(({ pages }) => [...pages]);
    return (pages.length ? pages : ['(no footer)']).map((source) => ({
      registry: 'FOOTER_LINK_TARGETS',
      key: label,
      source,
      href,
    }));
  }),
  ...FOOTERS.flatMap(({ footer, pages }) =>
    footer.groups.flatMap((group) =>
      group.links.flatMap((link) =>
        'href' in link
          ? pages.map((source) => ({
              registry: 'footer content',
              key: footerLabel(link as never),
              source,
              href: link.href,
            }))
          : [],
      ),
    ),
  ),
  ...UNIFIED_WEB_NAV.map((item) => ({
    registry: 'UNIFIED_WEB_NAV',
    key: item.label,
    source: '/preview/home',
    href: item.href,
  })),
  ...Object.entries(SERVICE_ROUTES).map(([key, href]) => ({
    registry: 'SERVICE_ROUTES',
    key,
    source: '/preview/home',
    href,
  })),
  { registry: 'TEAM_LAYER', key: 'href', source: '/preview/home', href: TEAM_LAYER.href },
];

describe('internal link graph — source', () => {
  it('derives the expected routes from app/', () => {
    for (const route of [
      '/',
      '/preview/home',
      '/preview/investment',
      '/preview/property-purchase',
      '/preview/tax-advisory',
      '/preview/team',
      '/preview/contact',
    ]) {
      expect(ROUTES.has(route), route).toBe(true);
    }
  });

  it('every internal path literal in the source is an existing route', () => {
    const literal = /["'`](\/(?:preview\/[a-z-]+|foundation)?)(#[\w-]+)?["'`]/g;
    const broken: string[] = [];
    for (const file of sources) {
      const text = readFileSync(file, 'utf8');
      for (const match of text.matchAll(literal)) {
        const path = match[1] ?? '';
        if (!ROUTES.has(path)) broken.push(`${relative(root, file)}: ${match[0]}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('every registry href points at an existing route (fragments: see the rendered check)', () => {
    const broken = REGISTRY_LINKS.filter(
      (link) => !ROUTES.has(resolveHref(link.href, link.source).path),
    ).map((link) => `${link.registry}[${link.key}] on ${link.source}: ${link.href}`);
    expect(broken).toEqual([]);
    expect(REGISTRY_LINKS.filter((link) => link.source === '(no footer)')).toEqual([]);
  });

  it('keys the registries to labels and ids that actually exist', () => {
    const footerLabels = new Set(
      [investmentFooter, purchaseFooter, taxFooter, teamFooter].flatMap((footer) =>
        footer.groups.flatMap((group) =>
          group.links.map((link) => ('label' in link ? link.label.text : link.text)),
        ),
      ),
    );
    for (const label of Object.keys(FOOTER_LINK_TARGETS)) {
      expect(footerLabels.has(label), label).toBe(true);
    }
    const faqIds = {
      investment: investmentFaq.items.map((i) => i.id),
      purchase: purchaseFaq.items.map((i) => i.id),
      tax: taxFaq.items.map((i) => i.id),
      team: teamFaq.items.map((i) => i.id),
    };
    for (const [page, links] of Object.entries(FAQ_RELATED)) {
      for (const id of Object.keys(links)) {
        expect(faqIds[page as keyof typeof faqIds], `${page}:${id}`).toContain(id);
      }
    }
    const doorIds = doors.items.map((d) => d.id as string);
    for (const id of Object.keys(INVESTMENT_DOOR_TARGETS)) expect(doorIds).toContain(id);
  });

  it('labels related links with existing navigation wording only', () => {
    const allowed = new Set<string>([...UNIFIED_WEB_NAV.map((i) => i.label), TEAM_LAYER.cta]);
    for (const links of Object.values(FAQ_RELATED)) {
      for (const link of Object.values(links as Record<string, { label: string }>)) {
        expect(allowed.has(link.label), link.label).toBe(true);
      }
    }
  });

  it('keeps the connected journey on real routes', () => {
    for (const bridge of Object.values(JOURNEY)) {
      for (const step of bridge.steps) expect(ROUTES.has(SERVICE_ROUTES[step.to])).toBe(true);
    }
  });
});

/* --- rendered HTML, per destination ------------------------------------------ */

const renderedIndex: DestinationIndex = {
  routes: ROUTES,
  idsFor(route) {
    const html = renderedMarkup(route);
    return html === null ? null : new Set(idsIn(html));
  },
};

describe('internal link graph — rendered HTML', () => {
  it('has a build to check when CI requires one', () => {
    if (RENDERED_HTML_REQUIRED) expect(haveBuild).toBe(true);
  });

  it.skipIf(!haveBuild)(
    'every registry href (FAQ_RELATED included) resolves on its own destination page',
    () => {
      const broken = REGISTRY_LINKS.map((link) => checkLink(link, renderedIndex)).filter(Boolean);
      expect(broken).toEqual([]);
    },
  );

  it.skipIf(!haveBuild)(
    'every <a href> in the initial HTML resolves on its own destination page',
    () => {
      const broken: string[] = [];
      for (const source of CHECKED_PAGES) {
        const html = renderedMarkup(source) ?? '';
        let index = 0;
        for (const [, raw] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
          const href = (raw ?? '').replace(/&amp;/g, '&');
          index += 1;
          if (/^(https?:|tel:|mailto:)/.test(href)) continue;
          const error = checkLink(
            { registry: 'rendered <a>', key: String(index), source, href },
            renderedIndex,
          );
          if (error) broken.push(error);
        }
      }
      expect(broken).toEqual([]);
    },
  );

  it.skipIf(!haveBuild)(
    'FAQ related links are not in the prerendered HTML (they appear on interaction)',
    () => {
      // Documents the current behaviour the docs describe; if this starts to
      // fail, the FAQ began server-rendering its links and the docs must change.
      for (const [page, links] of Object.entries(FAQ_RELATED)) {
        const html = renderedMarkup(FAQ_PAGE[page as keyof typeof FAQ_RELATED]) ?? '';
        const start = html.indexOf('id="faq"');
        expect(start, page).toBeGreaterThan(-1);
        const faq = html.slice(start, html.indexOf('</section>', start));
        // The questions are rendered; the answers and their related links are not.
        expect(faq).toMatch(/aria-expanded="false"/);
        for (const link of Object.values(
          links as Record<string, { href: string; label: string }>,
        )) {
          expect(faq.includes(`href="${link.href}"`), `${page}: ${link.href}`).toBe(false);
        }
      }
    },
  );
});

describe('per-destination link check (synthetic fixtures)', () => {
  const ids: Record<string, ReadonlySet<string> | null> = {
    '/a': new Set(['shared', 'only-a']),
    '/b': new Set(['only-b']),
    '/c': null, // route exists, but the build has no HTML for it
  };
  const index: DestinationIndex = {
    routes: new Set(['/a', '/b', '/c']),
    idsFor: (route) => ids[route] ?? null,
  };
  const ref = (href: string, source = '/a', registry = 'TEST', key = 'k'): LinkRef => ({
    registry,
    key,
    source,
    href,
  });

  it('accepts a fragment rendered on its own destination, absolute or relative', () => {
    expect(checkLink(ref('/a#only-a'), index)).toBeNull();
    expect(checkLink(ref('#only-a'), index)).toBeNull();
    expect(checkLink(ref('/b'), index)).toBeNull();
    expect(checkLink(ref('/b/'), index)).toBeNull();
  });

  it('rejects a fragment that exists on another page but not on the destination', () => {
    expect(checkLink(ref('/b#only-a'), index)).toBe(
      'TEST[k] on /a: /b#only-a → #only-a is not rendered on /b',
    );
    expect(checkLink(ref('#only-b', '/a'), index)).toMatch(/#only-b is not rendered on \/a/);
  });

  it('rejects a route that does not exist', () => {
    expect(checkLink(ref('/missing#only-a'), index)).toMatch(/route \/missing does not exist/);
  });

  it('rejects a fragment whose destination has no rendered HTML instead of skipping it', () => {
    expect(checkLink(ref('/c#anything'), index)).toMatch(
      /no rendered HTML for \/c to verify #anything/,
    );
  });

  it('names the registry, source page, href and failed target for a broken FAQ link', () => {
    const faq = ref('/b#missing', '/a', 'FAQ_RELATED', 'tax.purchase');
    expect(checkLink(faq, index)).toBe(
      'FAQ_RELATED[tax.purchase] on /a: /b#missing → #missing is not rendered on /b',
    );
    expect(checkLink({ ...faq, href: '/nowhere' }, index)).toBe(
      'FAQ_RELATED[tax.purchase] on /a: /nowhere → route /nowhere does not exist',
    );
  });

  it('rejects an href that leaves the site', () => {
    expect(checkLink(ref('https://example.test/a'), index)).toMatch(/not an internal link/);
    expect(checkLink(ref('//example.test/a'), index)).toMatch(/not an internal link/);
  });
});
