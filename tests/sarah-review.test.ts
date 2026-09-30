import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  SARAH_REVIEW_ITEMS,
  SARAH_REVIEW_ROUTES,
  type SarahReviewRoute,
} from '@/content/en/sarah-review';
import {
  assertSarahReviewMarksAllowed,
  sarahReviewMarksAllowed,
} from '@/lib/review/sarah-review-gate';

/**
 * Audit of 2026-09-30 (docs/approval-marks-audit.md): every visible
 * `SARAH REVIEW REQUIRED · SR-###` mark has one register entry and every entry
 * is shown where it says; no page shows an ID twice; every rendered `proposal`
 * claim is covered by an entry; and a production or indexable build refuses to
 * render a mark.
 */

const root = join(__dirname, '..');
const read = (path: string) => readFileSync(join(root, path), 'utf8');

/** The files that compose each route and can place a mark. */
const ROUTE_FILES: Record<SarahReviewRoute, readonly string[]> = {
  '/preview/home': ['app/preview/home/page.tsx'],
  '/preview/contact': ['app/preview/contact/page.tsx', 'components/web/ContactPage.tsx'],
  '/preview/property-purchase': [
    'app/preview/property-purchase/page.tsx',
    'components/web/PropertyPurchase.tsx',
  ],
  '/preview/investment': ['app/preview/investment/page.tsx', 'components/web/WebBands.tsx'],
  '/preview/tax-advisory': ['app/preview/tax-advisory/page.tsx', 'components/web/TaxBands.tsx'],
  '/preview/team': ['app/preview/team/page.tsx', 'components/web/TeamEditorial.tsx'],
};

/** Components that are not route-specific must not place marks themselves. */
const SHARED_COMPONENTS = [
  'components/web/WebHeader.tsx',
  'components/web/WebFooter.tsx',
  'components/web/WebFaq.tsx',
  'components/web/ServiceJourney.tsx',
  'components/web/BuyerToolRibbon.tsx',
  'components/web/HomePreview.tsx',
  'components/sections/PrototypeBanner.tsx',
];

const MARK = /<SarahReviewMark\s+id="(SR-\d{3})"/g;
const marksIn = (path: string) => [...read(path).matchAll(MARK)].map((m) => m[1]);

describe('Sarah review register', () => {
  it('gives every entry a unique, well-formed ID and a complete record', () => {
    const ids = SARAH_REVIEW_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of SARAH_REVIEW_ITEMS) {
      expect(item.id).toMatch(/^SR-\d{3}$/);
      expect(item.routes.length).toBeGreaterThan(0);
      for (const route of item.routes) expect(SARAH_REVIEW_ROUTES).toContain(route);
      expect(item.label.trim()).not.toBe('');
      expect(item.scope.trim()).not.toBe('');
      expect(item.decision.trim()).not.toBe('');
    }
  });

  it('shows exactly the registered marks on each route, once each', () => {
    for (const route of SARAH_REVIEW_ROUTES) {
      const placed = ROUTE_FILES[route].flatMap(marksIn);
      // No duplicate on the same page.
      expect(placed.length, `${route} repeats a mark`).toBe(new Set(placed).size);
      const expected = SARAH_REVIEW_ITEMS.filter((item) =>
        (item.routes as readonly string[]).includes(route),
      ).map((item) => item.id);
      expect([...placed].sort(), route).toEqual([...expected].sort());
    }
  });

  it('never places a mark without an ID, or from a shared component', () => {
    const files = [...Object.values(ROUTE_FILES).flat(), ...SHARED_COMPONENTS];
    for (const file of files) {
      const source = read(file);
      const all = (source.match(/<SarahReviewMark\b/g) ?? []).length;
      expect(all, `${file}: a mark without a literal SR-### id`).toBe(marksIn(file).length);
    }
    for (const file of SHARED_COMPONENTS) expect(read(file)).not.toContain('<SarahReviewMark');
  });

  it('covers every rendered proposal claim with a register entry', async () => {
    const files = [
      'home',
      'contact',
      'investment',
      'tax-advisory',
      'property-purchase',
      'team',
      'service-journey',
      'buyer-voices',
    ];
    const refs = SARAH_REVIEW_ITEMS.flatMap((item) => item.refs as readonly string[]);
    const uncovered: string[] = [];
    for (const file of files) {
      const mod = (await import(`../content/en/${file}.ts`)) as Record<string, unknown>;
      const walk = (value: unknown, path: string, seen: Set<unknown>) => {
        if (!value || typeof value !== 'object' || seen.has(value)) return;
        seen.add(value);
        const node = value as Record<string, unknown>;
        if (typeof node.text === 'string' && typeof node.status === 'string') {
          if (node.status !== 'proposal') return;
          const key = `${file}:${path}`;
          if (!refs.some((ref) => key === ref || key.startsWith(`${ref}.`))) uncovered.push(key);
          return;
        }
        for (const [k, child] of Object.entries(node)) walk(child, path ? `${path}.${k}` : k, seen);
      };
      for (const [name, value] of Object.entries(mod)) walk(value, name, new Set());
    }
    expect(uncovered).toEqual([]);
  });

  it('points every ref at content that exists', async () => {
    for (const ref of SARAH_REVIEW_ITEMS.flatMap((item) => item.refs as readonly string[])) {
      const [file, path] = ref.split(':') as [string, string];
      const mod = (await import(`../content/en/${file}.ts`)) as Record<string, unknown>;
      const target = path
        .split('.')
        .reduce<unknown>((node, key) => (node as Record<string, unknown> | undefined)?.[key], mod);
      expect(target, ref).toBeDefined();
    }
  });
});

describe('Sarah review marks never reach a publishable build', () => {
  it('allows marks only in preview mode without indexing', () => {
    expect(sarahReviewMarksAllowed({ mode: 'preview', indexable: false })).toBe(true);
    expect(sarahReviewMarksAllowed({ mode: 'production', indexable: false })).toBe(false);
    expect(sarahReviewMarksAllowed({ mode: 'production', indexable: true })).toBe(false);
    expect(sarahReviewMarksAllowed({ mode: 'preview', indexable: true })).toBe(false);
  });

  it('throws when a mark would render in production or an indexable build', () => {
    expect(() =>
      assertSarahReviewMarksAllowed('SR-001', { mode: 'production', indexable: false }),
    ).toThrow(/SR-001.*production or indexable/);
    expect(() =>
      assertSarahReviewMarksAllowed('SR-001', { mode: 'preview', indexable: false }),
    ).not.toThrow();
  });

  it('checks the gate in the mark itself, before rendering anything', () => {
    const source = read('components/review/SarahReviewMark.tsx');
    expect(source).toMatch(/assertSarahReviewMarksAllowed\(id\);\s*const item/);
  });

  it('keeps every route that carries marks noindex under /preview', () => {
    for (const route of SARAH_REVIEW_ROUTES) {
      const page = read(`app${route}/page.tsx`);
      expect(page).toMatch(/laboratory:\s*true/);
      expect(page).toContain(`path: '${route}'`);
    }
  });
});
