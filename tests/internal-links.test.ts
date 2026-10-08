import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CTA_TARGETS,
  FAQ_RELATED,
  FOOTER_LINK_TARGETS,
  INVESTMENT_DOOR_TARGETS,
} from '@/content/en/internal-links';
import { JOURNEY, SERVICE_ROUTES, TEAM_LAYER } from '@/content/en/service-journey';
import { UNIFIED_WEB_NAV } from '@/content/en/site-navigation';
import { footer as investmentFooter, faq as investmentFaq } from '@/content/en/investment';
import { footer as purchaseFooter, faq as purchaseFaq } from '@/content/en/property-purchase';
import { footer as taxFooter, faq as taxFaq } from '@/content/en/tax-advisory';
import { footer as teamFooter, faq as teamFaq } from '@/content/en/team';
import { doors } from '@/content/en/investment';

/**
 * NO BROKEN INTERNAL LINKS (Phase 2B, 2026-10-08).
 *
 * 1. The App Router route set is derived from app/**\/page.tsx.
 * 2. Every internal path literal in app/, components/, content/ and lib/, and
 *    every route held in the link registries, must be one of those routes.
 * 3. Every fragment must name an id that exists in the source.
 * 4. When a production build is present (`.next/server/app`), the rendered
 *    HTML of the seven pages is checked as well: every internal href resolves
 *    to a route and its fragment to an id rendered on that page. CI runs this
 *    file again after `next build` with REQUIRE_RENDERED_HTML=1.
 */

const root = resolve(__dirname, '..');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return [path];
  });
}

const ROUTES = new Set(
  walk(resolve(root, 'app'))
    .filter((f) => f.endsWith(`${sep}page.tsx`))
    .map((f) => {
      const dir = relative(resolve(root, 'app'), f).split(sep).slice(0, -1).join('/');
      return dir ? `/${dir}` : '/';
    }),
);

const sources = ['app', 'components', 'content', 'lib']
  .flatMap((d) => walk(resolve(root, d)))
  .filter((f) => /\.(ts|tsx)$/.test(f));

const allSource = sources.map((f) => readFileSync(f, 'utf8')).join('\n');

function split(href: string): { path: string; hash: string | null } {
  const [path = '', hash] = href.split('#');
  return { path, hash: hash ?? null };
}

/** Ids declared in source: id="x", id: 'x' (only literal ones). */
const SOURCE_IDS = new Set(
  [...allSource.matchAll(/\bid=["']([\w-]+)["']|\bid:\s*'([\w-]+)'/g)].map((m) => m[1] ?? m[2]),
);

const registryHrefs: string[] = [
  ...Object.values(CTA_TARGETS),
  ...Object.values(INVESTMENT_DOOR_TARGETS),
  ...Object.values(FOOTER_LINK_TARGETS),
  ...Object.values(FAQ_RELATED).flatMap((group) =>
    Object.values(group as Record<string, { href: string }>).map((link) => link.href),
  ),
  ...UNIFIED_WEB_NAV.map((item) => item.href),
  ...Object.values(SERVICE_ROUTES),
  TEAM_LAYER.href,
  ...[investmentFooter, purchaseFooter, taxFooter, teamFooter].flatMap((footer) =>
    footer.groups.flatMap((group) =>
      group.links.flatMap((link) => ('href' in link ? [link.href] : [])),
    ),
  ),
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

  it('every registry href is an existing route with an existing fragment', () => {
    const broken = registryHrefs.filter((href) => {
      const { path, hash } = split(href);
      return !ROUTES.has(path) || (hash !== null && !SOURCE_IDS.has(hash));
    });
    expect(broken).toEqual([]);
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

/* --- rendered HTML ---------------------------------------------------------- */

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
const required = process.env.REQUIRE_RENDERED_HTML === '1';
const haveBuild = Object.values(PAGES).every((f) => existsSync(join(BUILT, f)));

/** Rendered markup without scripts (the RSC payload repeats attributes as JSON). */
function renderedMarkup(route: string): string {
  const file = PAGES[route];
  if (!file) throw new Error(route);
  return readFileSync(join(BUILT, file), 'utf8')
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/<template\b[\s\S]*?<\/template>/g, '');
}

const renderedIds = (html: string) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);

describe('internal link graph — rendered HTML', () => {
  it('has a build to check when CI requires one', () => {
    if (required) expect(haveBuild).toBe(true);
  });

  it.skipIf(!haveBuild)('every internal href resolves to a route and a rendered id', () => {
    const ids = Object.fromEntries(
      Object.keys(PAGES).map((route) => [route, new Set(renderedIds(renderedMarkup(route)))]),
    );
    const broken: string[] = [];
    for (const route of Object.keys(PAGES)) {
      const html = renderedMarkup(route);
      for (const [, raw] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
        const href = (raw ?? '').replace(/&amp;/g, '&');
        if (/^(https?:|tel:|mailto:)/.test(href)) continue;
        const { path, hash } = split(href);
        const target = path === '' ? route : path;
        if (!ROUTES.has(target)) {
          broken.push(`${route}: ${href} (no route)`);
          continue;
        }
        const targetIds = ids[target];
        if (hash && targetIds && !targetIds.has(hash))
          broken.push(`${route}: ${href} (no #${hash})`);
      }
    }
    expect(broken).toEqual([]);
  });
});
