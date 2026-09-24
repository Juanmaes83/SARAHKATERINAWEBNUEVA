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
  TAX_CALENDAR_TOOL,
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
      'Elsa Quiros Perez',
      'Oscar',
      'Igor',
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

  it('places purchase tax after the tax calendar, through the shared ribbon', () => {
    const bands = read('components/web/TaxBands.tsx');
    const calendar = bands.slice(bands.indexOf('export function TaxCalendarBand'));
    const end = calendar.indexOf('export function', 10);
    const band = calendar.slice(0, end);
    expect(band).toContain('toolKey={TAX_CALENDAR_TOOL.key}');
    expect(band.indexOf('<BuyerToolRibbon')).toBeGreaterThan(band.indexOf('calendarLayout'));
    expect(TAX_CALENDAR_TOOL.key).toBe('purchaseTax');
  });

  it('keeps every entry point pending while the base URL is unset', () => {
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
    expect(ribbons).toEqual(['purchaseTax', 'realCashNeeded']);
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

describe('brand film — Property Purchase only', () => {
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
    expect(primitive).toMatch(/alt=\{clip\.description\}/);
    expect(read('components/web/PropertyPurchase.tsx')).not.toMatch(/ScrubVideo video=\{APPROVED/);
  });

  it('states the argument in HTML without repeating footage text', () => {
    expect(goodIdea.points.map((p) => p.id)).toEqual(['review', 'negotiation', 'tax', 'execution']);
    for (const point of goodIdea.points) expect(point.body.status).toBe('proposal');
    expect(goodIdea.note.text).toMatch(/not clients/);
  });

  it('does not add the reserved Home film to the repository', () => {
    const files = [...walk(resolve(root, 'VIDEOS')), ...walk(resolve(root, 'public'))].map(rel);
    expect(files.filter((f) => /TU INVERSI|investment-objective|your-investment/i.test(f))).toEqual(
      [],
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

  it('leaves the protected content files unchanged', () => {
    const sha = (text: string) => createHash('sha256').update(text).digest('hex');
    const unchanged: Record<string, string> = {
      'content/en/investment.ts':
        '2bbc549317d4f5c3d77cd4201597e46df19bb9b566b01f6b7e172f5859c550a0',
      'content/en/tax-advisory.ts':
        '90ae70dfac4aa9b81cc0c830488bb856b43ba2a452c473c4be4a0a0964d3ac42',
      'content/en/team.ts': '30af3c250db0db7b31fea13b2dbd16000900a6207e0fd1d6990a968db3dae858',
      'content/en/buyer-voices.ts':
        '2357ce7b8d459af6ab9e486b2479c1d40c3538e770011592c17ac7471d73f3d2',
      'lib/buyer-system/links.ts':
        'aae5688620c995583bcb0a7db571afb3d4b4ab6242113b2e33e7be9dfaaf2d46',
    };
    for (const [file, hash] of Object.entries(unchanged)) expect(sha(read(file)), file).toBe(hash);

    // Property Purchase gains only the Phase 2G block; everything else is as merged.
    const purchase = read('content/en/property-purchase.ts');
    const start = purchase.indexOf('/**\n * Phase 2G');
    const end = purchase.indexOf('export const oneFile');
    expect(start).toBeGreaterThan(0);
    expect(sha(purchase.slice(0, start) + purchase.slice(end))).toBe(
      '491b58fd0b815844fc642200a313512676a8d28effaf8a10017a79f6596f044c',
    );
  });
});
