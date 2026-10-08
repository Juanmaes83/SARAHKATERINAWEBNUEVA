import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isLaboratoryRoute } from '@/lib/seo/config';
import { BUYER_SYSTEM_EXPERIENCES, resolveEntryPoint } from '@/lib/buyer-system/links';
import { APPROVED_VIDEO } from '@/lib/media/approved-video';
import {
  JOURNEY,
  SERVICE_ROUTES,
  STAGE_ORDER,
  TAX_LEAD_TOOL,
  TEAM_LAYER,
  type ServiceKey,
} from '@/content/en/service-journey';
import { goodIdea } from '@/content/en/property-purchase';
import { profiles } from '@/content/en/team';

/**
 * PHASE 2G — connected service journey (docs/phase-2g-connected-service-journey.md).
 */

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const rel = (file: string) => relative(root, file).replaceAll('\\', '/');

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const code = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1');

const sourceFiles = ['app', 'components', 'content', 'lib']
  .flatMap((d) => walk(resolve(root, d)))
  .filter((f) => /\.(tsx?|css)$/.test(f));

const PAGES: Record<ServiceKey, string> = {
  investment: 'app/preview/investment/page.tsx',
  purchase: 'app/preview/property-purchase/page.tsx',
  tax: 'app/preview/tax-advisory/page.tsx',
  team: 'app/preview/team/page.tsx',
};

/** The files this phase adds; held to the strictest content rules. */
const PHASE_FILES = [
  'content/en/service-journey.ts',
  'components/web/ServiceJourney.tsx',
  'components/web/BuyerToolRibbon.tsx',
  'components/web/BuyerToolLink.tsx',
  'components/motion/PlayOnceVideo.tsx',
];

describe('journey routes are real and never empty', () => {
  it('maps every service to an existing preview page', () => {
    for (const [key, route] of Object.entries(SERVICE_ROUTES)) {
      expect(route, key).toMatch(/^\/preview\/[a-z-]+$/);
      expect(existsSync(resolve(root, `app${route}/page.tsx`)), route).toBe(true);
      expect(PAGES[key as ServiceKey]).toBe(`app${route}/page.tsx`);
    }
  });

  it('links each page to the other services and never to itself', () => {
    for (const [page, bridge] of Object.entries(JOURNEY)) {
      const targets = bridge.steps.map((s) => s.to);
      expect(targets, page).not.toContain(page);
      expect(new Set(targets).size, page).toBe(targets.length);
      for (const step of bridge.steps) {
        expect(step.reason.text.length, `${page} → ${step.to}`).toBeGreaterThan(40);
        expect(step.cta.trim().length).toBeGreaterThan(0);
      }
    }
    expect(JOURNEY.investment.steps.map((s) => s.to).sort()).toEqual(['purchase', 'tax']);
    expect(JOURNEY.purchase.steps.map((s) => s.to).sort()).toEqual(['investment', 'tax']);
    expect(JOURNEY.tax.steps.map((s) => s.to).sort()).toEqual(['investment', 'purchase']);
    expect(JOURNEY.team.steps.map((s) => s.to)).toEqual([...STAGE_ORDER]);
  });

  it('leads the three service pages to Team, and Team back to the services', () => {
    for (const key of ['investment', 'purchase', 'tax'] as const) {
      expect(JOURNEY[key].showTeam, key).toBe(true);
      expect(JOURNEY[key].current).toBe(key);
    }
    expect(JOURNEY.team.showTeam).toBe(false);
    expect(JOURNEY.team.current).toBeNull();
    expect(TEAM_LAYER.href).toBe('/preview/team#team');
    expect(read('components/web/TeamEditorial.tsx')).toContain('id="team"');
  });

  it('renders the shared band once on each landing, with its own key', () => {
    const renders = sourceFiles.flatMap((f) =>
      [...readFileSync(f, 'utf8').matchAll(/<ServiceJourney page="(\w+)"/g)].map((m) => [
        rel(f),
        m[1],
      ]),
    );
    expect(renders.sort()).toEqual(
      [
        ['app/preview/investment/page.tsx', 'investment'],
        ['app/preview/property-purchase/page.tsx', 'purchase'],
        ['app/preview/tax-advisory/page.tsx', 'tax'],
        ['components/web/TeamEditorial.tsx', 'team'],
      ].sort(),
    );
  });

  it('places the band after each landing journey and before its FAQ', () => {
    const order = (source: string, before: string, after: string) => {
      const at = source.indexOf('<ServiceJourney');
      expect(at).toBeGreaterThan(source.indexOf(before));
      expect(at).toBeLessThan(source.indexOf(after));
    };
    order(read(PAGES.investment), '<JourneyBand', '<WebFaq');
    order(read(PAGES.purchase), '<JourneyBand', '<WebFaq');
    order(read(PAGES.tax), '<TaxJourneyBand', '<WebFaq');
    order(read('components/web/TeamEditorial.tsx'), '<AftercareBand', '<WebFaq');
  });

  it('has no empty or placeholder href anywhere', () => {
    const offenders = sourceFiles
      .filter((f) => f.endsWith('.tsx'))
      .filter((f) =>
        /href=(["'])#?\1|href=\{(["'])#?\2\}|href="javascript:/.test(readFileSync(f, 'utf8')),
      )
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('builds journey links only from the route map', () => {
    const band = code(read('components/web/ServiceJourney.tsx'));
    expect(band).toContain('href={SERVICE_ROUTES[key]}');
    expect(band).toContain('href={TEAM_LAYER.href}');
    expect(band).not.toMatch(/href="/);
    // The Foundation page is not a commercial Home.
    for (const file of PHASE_FILES) expect(code(read(file)), file).not.toMatch(/href=["']\/["']/);
  });
});

describe('team layer — named responsibilities, never restated', () => {
  it('reads the four people from the team content', () => {
    const band = read('components/web/ServiceJourney.tsx');
    expect(band).toContain("import { profiles } from '@/content/en/team'");
    expect(profiles.map((p) => p.name)).toEqual([
      'Sarah Katerina',
      'Elsa Quirós Pérez',
      'Óscar Gonzalez',
      'Igor Veselov',
    ]);
    const areas = profiles.map((p) => p.area).join(' | ');
    expect(areas).toMatch(/Tax, purchase costs and buyer advisory/);
    expect(areas).toMatch(/Administration and administrative tasks/);
    expect(areas).toMatch(/Commercial accompaniment and property selection/);
    expect(areas).toMatch(/Business development and new opportunities/);
    // No name, role or credential is hard-coded in the new files.
    for (const file of PHASE_FILES) {
      expect(read(file), file).not.toMatch(/Elsa|Oscar|Óscar|Igor|licen[cs]ed|certified|years of/i);
    }
  });
});

describe('Buyer System — adapter only', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('resolves every entry point through resolveEntryPoint', () => {
    const ribbon = code(read('components/web/BuyerToolRibbon.tsx'));
    expect(ribbon).toContain('resolveEntryPoint(toolKey)');
    expect(ribbon).toContain('entry.href ?');
    const link = code(read('components/web/BuyerToolLink.tsx'));
    expect(link).toContain("track('calculator_start'");
    // No query string, amount or personal data leaves with the click.
    expect(link).not.toMatch(/URLSearchParams|\?[a-z]+=|searchParams/);
    // Only the adapter reads the base URL; nothing builds a Buyer System URL.
    const readers = sourceFiles
      .filter((f) => /NEXT_PUBLIC_BUYER_SYSTEM_URL/.test(code(readFileSync(f, 'utf8'))))
      .map(rel);
    expect(readers).toEqual(['lib/buyer-system/links.ts']);
  });

  // Phase 2H (Sarah's review): purchase tax moves from after the tax calendar
  // to directly under the hero, on Tax Advisory and on Property Purchase.
  it.each([
    ['app/preview/tax-advisory/page.tsx', '<TaxHero />', '<TaxContextBand />'],
    ['app/preview/property-purchase/page.tsx', '<PurchaseHero />', '<PurchaseTrustBand />'],
  ])('places purchase tax directly under the hero of %s, once', (page, hero, next) => {
    const source = code(read(page));
    const band = source.indexOf('<BuyerToolBand');
    expect(band).toBeGreaterThan(source.indexOf(hero));
    expect(band).toBeLessThan(source.indexOf(next));
    expect(source.match(/<BuyerToolBand/g)).toHaveLength(1);
  });

  it('leaves no second purchase-tax entry lower on those pages', () => {
    expect(read('components/web/TaxBands.tsx')).not.toContain('<BuyerToolRibbon');
    const purchase = read('components/web/PropertyPurchase.tsx');
    expect(purchase).not.toContain('toolKey="purchaseTax"');
    expect(purchase).toContain('toolKey="realCashNeeded"');
    expect(TAX_LEAD_TOOL.key).toBe('purchaseTax');
    expect(TAX_LEAD_TOOL.moment.status).toBe('proposal');
    expect(TAX_LEAD_TOOL.moment.review).toBe('tax');
  });

  it('keeps live tools pending when no Preview origin is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_BUYER_SYSTEM_URL', '');
    for (const key of ['purchaseTax', 'realCashNeeded', 'askingPrice', 'taxExposure'] as const) {
      const entry = resolveEntryPoint(key);
      expect(entry.href, key).toBeNull();
      expect(entry.pending, key).toBe(true);
    }
  });

  it('links only the two live tools once a base URL exists', () => {
    vi.stubEnv('NEXT_PUBLIC_BUYER_SYSTEM_URL', 'https://buyer-system.example.test');
    expect(resolveEntryPoint('purchaseTax').href).toBe('https://buyer-system.example.test/');
    expect(resolveEntryPoint('realCashNeeded').href).toBe(
      'https://buyer-system.example.test/real-cash-needed',
    );
    // Asking Price stays blocked until Sarah and legal approve it.
    expect(resolveEntryPoint('askingPrice').href).toBeNull();
    // Tax Exposure does not exist.
    expect(resolveEntryPoint('taxExposure').href).toBeNull();
  });

  it('never presents Asking Price or Tax Exposure as a working tool', () => {
    expect(BUYER_SYSTEM_EXPERIENCES.askingPrice.availability).toBe('limited-go');
    expect(BUYER_SYSTEM_EXPERIENCES.taxExposure.availability).toBe('not-built');
    expect(BUYER_SYSTEM_EXPERIENCES.taxExposure.path).toBeNull();
    const ribbons = sourceFiles
      .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/toolKey="(\w+)"/g)].map((m) => m[1]))
      .sort();
    expect(ribbons.filter((key) => key === 'purchaseTax')).toHaveLength(2);
    expect(ribbons.filter((key) => key === 'realCashNeeded')).toHaveLength(2);
    expect(ribbons).not.toContain('askingPrice');
    expect(ribbons).not.toContain('taxExposure');
    const offenders = sourceFiles
      .filter((f) => /^(app|components)\//.test(rel(f)))
      .filter((f) => /taxExposure|tax-exposure/.test(code(readFileSync(f, 'utf8'))))
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('duplicates no tax rate, figure or formula', () => {
    // Copy and components only: the film primitive's `100%` root margin is layout, not tax.
    const newCopy = [
      ...PHASE_FILES.filter((f) => !f.includes('PlayOnceVideo')).map((f) => code(read(f))),
      JSON.stringify(goodIdea),
    ].join('\n');
    expect(newCopy).not.toMatch(/\d+(?:[.,]\d+)?\s?%/);
    expect(newCopy).not.toMatch(/€|\bEUR\b|\brate\s*[:=]/i);
    expect(newCopy).not.toMatch(/\b(ITP|AJD|IVA)\b.*\d/);
  });
});

describe('brand films — Property Purchase and controlled Home preview', () => {
  const film = APPROVED_VIDEO.purchaseGoodIdea;

  it('keeps an untouched, traceable original in VIDEOS/', () => {
    const original = readFileSync(resolve(root, film.source));
    const blob = createHash('sha1')
      .update(`blob ${original.length}\0`)
      .update(original)
      .digest('hex');
    expect(blob).toBe('31312fba73e924ac8a27891f676c0527b9e4d9de');
    expect(film.note).toContain('31312fba73e924ac8a27891f676c0527b9e4d9de');
  });

  it('is rendered by the play-once primitive in its one slot', () => {
    const users = sourceFiles
      .filter((f) => /APPROVED_VIDEO\.purchaseGoodIdea\b/.test(code(readFileSync(f, 'utf8'))))
      .map(rel);
    expect(users).toEqual(['components/web/PropertyPurchase.tsx']);
    const primitiveUsers = sourceFiles
      .filter((f) => /<PlayOnceVideo\b/.test(readFileSync(f, 'utf8')))
      .map(rel);
    // 2026-10-01: the Home hero is no longer the generated villa film; since
    // 2026-10-02 it plays its own film through HeroFilm, not this primitive.
    expect(primitiveUsers).toEqual(['components/web/PropertyPurchase.tsx']);

    const page = read(PAGES.purchase);
    const at = page.indexOf('<GoodIdeaBand');
    expect(at).toBeGreaterThan(page.indexOf('<AudienceBand'));
    expect(at).toBeLessThan(page.indexOf('<OneFileBand'));
  });

  it('never competes with the hero: silent, no autoplay attribute, no loop', () => {
    const primitive = code(read('components/motion/PlayOnceVideo.tsx'));
    expect(primitive).not.toMatch(/\bloop\b|\bautoPlay\b|\bcontrols\b/);
    expect(primitive).toContain('muted');
    expect(primitive).toContain('preload="none"');
    expect(primitive).toContain('prefers-reduced-motion: reduce');
    expect(primitive).toContain('visibilitychange');
    expect(primitive).toContain('resumeInView');
    expect(primitive).toContain('video.pause()');
    expect(primitive).toMatch(/alt=\{clip\.description\}/);
    expect(read('components/web/PropertyPurchase.tsx')).not.toMatch(/ScrubVideo video=\{APPROVED/);
  });

  it('states the argument in HTML without repeating footage text', () => {
    expect(goodIdea.points.map((p) => p.id)).toEqual(['review', 'negotiation', 'tax', 'execution']);
    for (const point of goodIdea.points) expect(point.body.status).toBe('proposal');
    expect(goodIdea.note.text).toMatch(/not clients/);
  });

  it('registers the reserved Home film with its traceable original and derivatives', () => {
    const files = [...walk(resolve(root, 'VIDEOS')), ...walk(resolve(root, 'public'))].map(rel);
    expect(
      files.filter((f) => /TU INVERSI|investment-objective|your-investment/i.test(f)).sort(),
    ).toEqual(
      [
        'VIDEOS/TU INVERSIÓN MI OBJETIVO.mp4',
        'public/media/video/home-investment-objective-poster.webp',
        'public/media/video/home-investment-objective.mp4',
        'public/media/video/home-investment-objective.webm',
      ].sort(),
    );
    expect(APPROVED_VIDEO.homeInvestmentObjective.note).toMatch(/Preview\/noindex only/);
    expect(APPROVED_VIDEO.homeInvestmentObjective.note).toMatch(
      /likeness.*pending|identity approval/i,
    );
  });

  it('serves nothing from VIDEOS/ in rendered code', () => {
    const offenders = [...PHASE_FILES, 'components/web/PropertyPurchase.tsx'].filter((f) =>
      /['"(]\/?VIDEOS[/ ]/.test(code(read(f))),
    );
    expect(offenders).toEqual([]);
  });
});

describe('publication and held subjects', () => {
  it('keeps the four landings in the noindex preview namespace', () => {
    for (const [key, page] of Object.entries(PAGES)) {
      const source = read(page);
      expect(source, key).toMatch(/laboratory:\s*true/);
      expect(isLaboratoryRoute(SERVICE_ROUTES[key as ServiceKey])).toBe(true);
    }
    expect(read('app/sitemap.ts')).not.toMatch(/\/preview\//);
  });

  it('introduces no held service', () => {
    for (const file of [...PHASE_FILES, 'components/web/PropertyPurchase.tsx']) {
      expect(read(file), file).not.toMatch(/Property Management|VITA\s*Host|Sarah Katerina Group/i);
    }
  });

  // Phase 2H (docs/phase-2h-juanma-review.md): tax-advisory.ts, team.ts and
  // (closing: Sarah's copy marked confirmed on 2026-09-28)
  // property-purchase.ts were changed deliberately to carry Sarah's review
  // copy, all `proposal`. The Buyer System adapter was deliberately updated
  // in the Home integration branch after its production origin was verified.
  // The 2026-09-29 approved unified navigation removes their obsolete local
  // nav/header CTA exports; the page copy and landing compositions are intact.
  // 2026-09-29 (Juanma): the shared footer gains a real Contact link in the
  // investment, tax-advisory and team footers (footer block only, verified by
  // diff); nothing else in those files changed.
  // 2026-09-30 (approval-marks audit, docs/approval-marks-audit.md §3): the
  // preview banners, the footer route notes and the dead-button notes are
  // restated truthfully, the internal substitution note (Tax), the footer
  // "Review status" column (Team) and the Purchase "preview" scope label are
  // cleaned; no other string changed (verified by diff).
  // 2026-09-30 (reconciliation with Sarah's documents): investment.ts replaces
  // the two headlines Sarah rejected and the hero lead (REVISION
  // WEB-investment.docx); no other string changed (verified by diff).
  // 2026-09-30 (Juanma): property-purchase.ts takes Sarah's Tax line
  // "Everything you leave in our hands." for its worries title; nothing else.
  // 2026-09-30 (last correction): investment.ts takes Sarah's proposed sentence
  // under "Buying on emotion"; property-purchase.ts rewrites the six worries
  // points in the positive (SR-082). Nothing else (verified by diff).
  // 2026-10-01 (client-ready pass, docs/approval-marks-audit.md §11): internal
  // status lines leave the four files (preview footers, "not connected",
  // "not confirmed for publication", provisional photo fields), the Investment
  // repetition becomes SR-083, FAQ placeholders become SR-084/SR-085, the
  // Purchase pricing note becomes Sarah's Tax fees line (SR-027).
  // 2026-10-01 (Juanma: cases real, permission held): tax-advisory.ts restores
  // the case results and Sarah's publication line; nothing else.
  // 2026-10-01 (editorial marks hidden): the unused PROTOTYPE_NOTICE exports
  // are removed and the SEO descriptions drop "Internal visual preview, not
  // approved for production."; no other string changed (verified by diff).
  // 2026-10-01 (Sarah's Home feedback): the Investment hero lead drops "Sarah is
  // paid only by you" for "Sarah works on your side"; nothing else.
  // Hashes are re-recorded so any further, unreviewed edit still fails here.
  it('leaves the protected content files unchanged', () => {
    const sha = (text: string) => createHash('sha256').update(text).digest('hex');
    // 2026-10-07 (owner direction): the 20-year credential names SUMA Gestión
    // Tributaria instead of a generalised "Spain's tax administration", and the
    // Home and Property Purchase meta descriptions carry Torrevieja / Costa Blanca.
    // 2026-10-08: owner authorised metadata shortening and removal of the
    // duplicated Team brand suffix. Visible body copy remains unchanged.
    const unchanged: Record<string, string> = {
      'content/en/investment.ts':
        '7ef00870764ae4a5937a6019054a3040e2e926d924c7bc64c710e60c2a8ffd1f',
      'content/en/tax-advisory.ts':
        '59512b170c5ee4e28e6eae6f3cc64f860c947e23c9aed4c75f09835cdb07f5c5',
      'content/en/team.ts': '60a7aaa7a5c4a48f7769de9cb1fa97e609b28fc0ea9fa18d9380f50123c5dd1f',
      'content/en/buyer-voices.ts':
        '2357ce7b8d459af6ab9e486b2479c1d40c3538e770011592c17ac7471d73f3d2',
      'lib/buyer-system/links.ts':
        '434e04051d0e5776416096ab585a5ca9ec9ef895565749e71489b1d5938e6da4',
    };
    for (const [file, hash] of Object.entries(unchanged)) expect(sha(read(file)), file).toBe(hash);

    // Outside its Phase 2G block, Property Purchase carries only the Phase 2H headlines
    // and (2026-09-29, Juanma) the footer's real Contact link.
    const purchase = read('content/en/property-purchase.ts');
    const start = purchase.indexOf('/**\n * Phase 2G');
    const end = purchase.indexOf('export const oneFile');
    expect(start).toBeGreaterThan(0);
    expect(sha(purchase.slice(0, start) + purchase.slice(end))).toBe(
      '86d555aa26cac44305270689ce9bfb367ecc8fb75ddf2f5369a314fe39fe2406',
    );
  });
});
