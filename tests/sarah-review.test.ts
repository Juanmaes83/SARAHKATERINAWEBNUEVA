import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  SARAH_APPROVALS,
  SARAH_REVIEW_ITEMS,
  SARAH_REVIEW_ROUTES,
  type SarahApproval,
  type SarahReviewRoute,
} from '@/content/en/sarah-review';
import {
  assertSarahReviewMarksAllowed,
  sarahReviewMarksAllowed,
} from '@/lib/review/sarah-review-gate';

/**
 * Audit of 2026-09-30 (docs/approval-marks-audit.md): every visible
 * `SARAH REVIEW REQUIRED · SR-###` mark has one register entry and every entry
 * is shown where it says; no page shows an ID twice; every `proposal` claim is
 * either open for Sarah or approved by her, quoting her document, never both
 * (reconciliation of 2026-09-30); and a production or indexable build refuses
 * to render a mark.
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

  it('accounts for every proposal claim exactly once: open for Sarah, or approved by her', async () => {
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
    const under = (key: string, ref: string) => key === ref || key.startsWith(`${ref}.`);
    const openRefs = SARAH_REVIEW_ITEMS.flatMap((item) => item.refs as readonly string[]);
    const approved = (key: string) =>
      SARAH_APPROVALS.some(
        (entry) =>
          (entry.refs as readonly string[]).some((ref) => under(key, ref)) &&
          !((entry as SarahApproval).except ?? []).some((ref) => under(key, ref)),
      );
    const uncovered: string[] = [];
    const both: string[] = [];
    for (const file of files) {
      const mod = (await import(`../content/en/${file}.ts`)) as Record<string, unknown>;
      const walk = (value: unknown, path: string, seen: Set<unknown>) => {
        if (!value || typeof value !== 'object' || seen.has(value)) return;
        seen.add(value);
        const node = value as Record<string, unknown>;
        if (typeof node.text === 'string' && typeof node.status === 'string') {
          if (node.status !== 'proposal') return;
          const key = `${file}:${path}`;
          const open = openRefs.some((ref) => under(key, ref));
          const ok = approved(key);
          if (!open && !ok) uncovered.push(key);
          if (open && ok) both.push(key);
          return;
        }
        for (const [k, child] of Object.entries(node)) walk(child, path ? `${path}.${k}` : k, seen);
      };
      for (const [name, value] of Object.entries(mod)) walk(value, name, new Set());
    }
    expect(uncovered, 'neither open nor approved').toEqual([]);
    expect(both, 'open and approved at once').toEqual([]);
  });

  it('grounds every approval in one of the four documents or in Juanma’s relay', () => {
    const DOCS = [
      'REVISION WEB-property-purchase.docx',
      'REVISION WEB-investment.docx',
      'REVISION WEB-Tax advisory.docx',
      'REVISION WEB. Team.docx',
    ];
    for (const entry of SARAH_APPROVALS as readonly SarahApproval[]) {
      if (entry.basis === 'relayed') expect(entry.source).toMatch(/^Juanma, \d{4}-\d{2}-\d{2}/);
      else
        expect(
          DOCS.some((doc) => entry.source.includes(doc)),
          entry.source,
        ).toBe(true);
      // No review document covers the Home: it can never carry an approval here.
      expect(entry.routes as readonly string[]).not.toContain('/preview/home');
    }
    // Contact was approved as a whole page (Juanma, 2026-09-30): no open mark.
    expect(
      SARAH_REVIEW_ITEMS.some((item) =>
        (item.routes as readonly string[]).includes('/preview/contact'),
      ),
    ).toBe(false);
    // The Home keeps its own open items until a document reviews it.
    expect(
      SARAH_REVIEW_ITEMS.filter((item) =>
        (item.routes as readonly string[]).includes('/preview/home'),
      ).length,
    ).toBe(11);
  });

  it('keeps the copy Sarah rejected off the page', () => {
    // The Home repeated the rejected Investment headline until 2026-09-30.
    const investment = read('content/en/investment.ts') + read('content/en/home.ts');
    for (const rejected of [
      'Properties. Data. Better decisions.',
      'Two paths. One goal: an investment built on evidence.',
    ]) {
      expect(investment).not.toContain(`text: '${rejected}'`);
    }
    // REVISION WEB-investment.docx: Sarah found this line made no sense and
    // proposed her own sentence; it must not come back anywhere it can render.
    const retired =
      'The view sells the property. The numbers decide whether it was a good decision.';
    for (const file of [
      'content/en/investment.ts',
      'content/en/home.ts',
      'content/en/service-journey.ts',
      'components/web/WebBands.tsx',
    ]) {
      expect(read(file).replace(/\/\*\*[\s\S]*?\*\//g, ''), file).not.toContain(retired);
    }
    // 2026-10-01: Sarah's idea appears once on the page, as the next-step title;
    // the repetition under "Buying on emotion" is gone.
    expect(read('content/en/investment.ts')).not.toContain('An opportunity is only right');
    expect(read('content/en/service-journey.ts')).toContain(
      "text: 'An opportunity is only good if it fits your goals, not the goals of the person selling it.'",
    );
    // REVISION WEB. Team.docx: "Y el texto de abajo hay que eliminarlo."
    expect(read('components/web/TeamEditorial.tsx')).not.toMatch(
      /The photographs show three people/,
    );
    expect(read('content/en/team.ts')).not.toMatch(/The photographs show three people/);
  });

  it('points every ref at content that exists', async () => {
    const allRefs = [
      ...SARAH_REVIEW_ITEMS.flatMap((item) => item.refs as readonly string[]),
      ...(SARAH_APPROVALS as readonly SarahApproval[]).flatMap((e) => [
        ...e.refs,
        ...(e.except ?? []),
      ]),
    ];
    for (const ref of allRefs) {
      const [file, path] = ref.split(':') as [string, string];
      const mod = (await import(`../content/en/${file}.ts`)) as Record<string, unknown>;
      const target = path
        .split('.')
        .reduce<unknown>((node, key) => (node as Record<string, unknown> | undefined)?.[key], mod);
      expect(target, ref).toBeDefined();
    }
  });
});

describe('the editorial tracking is never shown to the visitor', () => {
  // 2026-10-01 (Juanma): Sarah reviews the site as a finished experience. The
  // anchors stay in the page sources (traceability) but render nothing, and no
  // component or content string carries the editorial wording.
  it('renders no review strip, tag or SR code', () => {
    const mark = read('components/review/SarahReviewMark.tsx').replace(/\/\*[\s\S]*?\*\//g, '');
    expect(mark).not.toMatch(/<(div|span|p)/);
    expect(mark).not.toMatch(/Sarah review required/i);
    expect(existsSync(join(root, 'components/review/SarahReviewMark.module.css'))).toBe(false);
  });

  it('keeps editorial wording out of every rendered component and content string', async () => {
    const EDITORIAL =
      /Sarah review required|SR-\d{3}|pending approval|awaiting approval|proposed copy|internal review|internal (visual )?preview|preview only|not approved|review environment|not for production/i;
    // Components: every JSX string, comments excluded.
    const components = [
      ...Object.values(ROUTE_FILES).flat(),
      ...SHARED_COMPONENTS,
      'components/web/WebBands.tsx',
      'components/web/TaxBands.tsx',
      'components/web/PropertyPurchase.tsx',
      'components/web/TeamEditorial.tsx',
      'components/web/ContactPage.tsx',
    ];
    for (const file of [...new Set(components)]) {
      const code = read(file)
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
        .replace(/^\s*\/\/.*$/gm, '')
        .replace(/<SarahReviewMark[^>]*\/>/g, '');
      expect(code, file).not.toMatch(EDITORIAL);
    }
    // Content: every string a page can render (claim texts, plain strings, SEO);
    // `source` and `note` are internal provenance and never rendered.
    const offenders: string[] = [];
    for (const file of [
      'home',
      'contact',
      'investment',
      'tax-advisory',
      'property-purchase',
      'team',
      'service-journey',
    ]) {
      const mod = (await import(`../content/en/${file}`)) as Record<string, unknown>;
      const walk = (value: unknown, path: string, seen: Set<unknown>) => {
        if (typeof value === 'string') {
          if (EDITORIAL.test(value)) offenders.push(`${file}:${path}: ${value.slice(0, 80)}`);
          return;
        }
        if (!value || typeof value !== 'object' || seen.has(value)) return;
        seen.add(value);
        for (const [k, child] of Object.entries(value as Record<string, unknown>)) {
          if (k === 'source' || k === 'note') continue;
          walk(child, path ? `${path}.${k}` : k, seen);
        }
      };
      for (const [name, value] of Object.entries(mod)) walk(value, name, new Set());
    }
    expect(offenders).toEqual([]);
  });

  it('keeps the authorised Tax results on the page', async () => {
    const tax = (await import('../content/en/tax-advisory')) as {
      cases: { items: readonly { metric: { text: string } }[]; publication: { text: string } };
    };
    expect(tax.cases.items.map((i) => i.metric.text)).toEqual([
      'Penalty avoided',
      'Position regularised',
      'Taxes and costs planned',
    ]);
    expect(read('components/web/TaxBands.tsx')).toContain('{item.metric.text}');
    expect(read('components/web/TaxBands.tsx')).toContain('{cases.publication.text}');
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
    expect(source).toMatch(/assertSarahReviewMarksAllowed\(id\);\s*return null;/);
  });

  it('keeps every route that carries marks noindex under /preview', () => {
    for (const route of SARAH_REVIEW_ROUTES) {
      const page = read(`app${route}/page.tsx`);
      expect(page).toMatch(/laboratory:\s*true/);
      expect(page).toContain(`path: '${route}'`);
    }
  });
});
