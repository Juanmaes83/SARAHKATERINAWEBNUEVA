import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPublishable, type Claim, type ReviewDomain } from '../lib/content/claims';
import { isLaboratoryRoute } from '../lib/seo/config';
import * as taxAdvisory from '../content/en/tax-advisory';

const root = resolve(__dirname, '..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

const pageSource = read('app/preview/tax-advisory/page.tsx');
const investmentPage = read('app/preview/investment/page.tsx');
const bandsSource = read('components/web/TaxBands.tsx');
const heroSource = read('components/web/TaxHero.tsx');
const taxCss = read('components/web/TaxBands.module.css');
const webTokens = read('app/web-tokens.css');

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const sourceFiles = ['app', 'components', 'lib', 'content'].flatMap((dir) =>
  walk(resolve(root, dir)),
);
const rel = (file: string) => relative(root, file).replace(/\\/g, '/');

/** Recursively collects every Claim in a content module. */
function collectClaims(value: unknown, path: string[] = []): Array<{ path: string; claim: Claim }> {
  const found: Array<{ path: string; claim: Claim }> = [];

  if (Array.isArray(value)) {
    value.forEach((entry, index) => found.push(...collectClaims(entry, [...path, String(index)])));
    return found;
  }

  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    if (typeof record.text === 'string' && typeof record.status === 'string') {
      found.push({ path: path.join('.'), claim: record as unknown as Claim });
      return found;
    }
    for (const [key, entry] of Object.entries(record)) {
      found.push(...collectClaims(entry, [...path, key]));
    }
  }

  return found;
}

const claims = collectClaims(taxAdvisory);
const texts = claims.map(({ path, claim }) => ({ path, text: claim.text }));

/* ===========================================================================
 * ONE WEB SYSTEM — the point of Phase 2D
 * ======================================================================== */

describe('converged web layer', () => {
  it('has exactly one website token file, and it is the canonical one', () => {
    expect(existsSync(resolve(root, 'app/web-tokens.css'))).toBe(true);
    // The Phase 2B parallel layer is gone.
    expect(existsSync(resolve(root, 'app/tokens.web.css'))).toBe(false);

    const tokenFiles = sourceFiles
      .filter((file) => file.endsWith('.css'))
      .filter((file) => /^\s*--sk-web-[a-z0-9-]+\s*:/m.test(readFileSync(file, 'utf8')))
      .map(rel);

    expect(tokenFiles).toEqual(['app/web-tokens.css']);
  });

  it('imports exactly one website token file, globally, once', () => {
    const globals = read('app/globals.css');
    expect(globals).toContain("@import './web-tokens.css';");
    expect(globals).not.toContain('tokens.web.css');
    expect(globals.match(/web-tokens\.css/g) ?? []).toHaveLength(1);
  });

  it('declares no --sk-web-* value outside the canonical token file', () => {
    // A component may READ a token. Declaring one would fork the palette.
    const offenders = sourceFiles
      .filter((file) => file.endsWith('.module.css'))
      .filter((file) => /^\s*--sk-web-[a-z0-9-]+\s*:/m.test(readFileSync(file, 'utf8')))
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('never declares navy, gold, ink or ivory twice', () => {
    for (const token of ['--sk-web-navy', '--sk-web-gold', '--sk-web-ink', '--sk-web-ivory']) {
      const declarations = sourceFiles
        .filter((file) => file.endsWith('.css'))
        .flatMap((file) => {
          const matches = readFileSync(file, 'utf8').match(new RegExp(`^\\s*${token}\\s*:`, 'gm'));
          return matches ? matches.map(() => rel(file)) : [];
        });
      expect(declarations, `${token} is declared more than once`).toHaveLength(1);
    }
  });

  it('runs both landings through the same chrome components', () => {
    for (const source of [pageSource, investmentPage]) {
      expect(source).toContain('<WebHeader');
      expect(source).toContain('<WebFooter');
      expect(source).toContain('<WebFaq');
      expect(source).toContain('<PrototypeBanner');
    }
    // No landing-specific header, footer, button or chrome switcher survives.
    expect(existsSync(resolve(root, 'components/tax-advisory'))).toBe(false);
    expect(existsSync(resolve(root, 'components/navigation/SiteChrome.tsx'))).toBe(false);
    for (const forbidden of ['TaxHeader', 'TaxFooter', 'TaxCta']) {
      expect(existsSync(resolve(root, `components/web/${forbidden}.tsx`))).toBe(false);
    }
  });

  it('builds the Tax Advisory bands from the shared stylesheets', () => {
    // The tax bands import the Investment bands' stylesheet. That is what
    // keeps one type scale, spacing rhythm and card treatment across landings.
    expect(bandsSource).toContain("from './WebBands.module.css'");
    expect(heroSource).toContain("from './WebHero.module.css'");
    expect(bandsSource).toContain("from './WebSection'");
    expect(bandsSource).toContain("from './WebButton'");
    expect(bandsSource).toContain("from './icons/Icon'");
  });

  it('keeps the tax-specific stylesheet to the structures that justify it', () => {
    const classes = [...taxCss.matchAll(/^\.([a-zA-Z0-9_]+)/gm)].map((m) => m[1]);
    // Small by construction: anything the shared layer expresses is used from
    // the shared layer, not restated here.
    expect(classes.length).toBeLessThan(30);
    // And it must not redefine chrome the shared system owns.
    for (const forbidden of ['button', 'header', 'footer', 'card', 'section']) {
      expect(classes).not.toContain(forbidden);
    }
  });

  it('uses only tokens the canonical layer declares', () => {
    const referenced = new Set(
      [...taxCss.matchAll(/var\((--sk-web-[a-z0-9-]+)\)/g)].map((m) => m[1] as string),
    );
    const declared = new Set(
      [...webTokens.matchAll(/^\s*(--sk-web-[a-z0-9-]+)\s*:/gm)].map((m) => m[1] as string),
    );
    const missing = [...referenced].filter((token) => !declared.has(token));
    expect(missing).toEqual([]);
  });

  it('introduces no raw colour in the tax stylesheet', () => {
    expect(taxCss.match(/#[0-9a-fA-F]{3,8}\b/g)).toBeNull();
  });
});

/* ===========================================================================
 * INVESTMENT MUST NOT REGRESS
 * ======================================================================== */

describe('investment is unaffected', () => {
  it('still renders every band the Phase 2C brief requires', () => {
    const required = [
      'WebHeader',
      'WebHero',
      'TrustBand',
      'ApproachBand',
      'DoorsBand',
      'AssetTypesBand',
      'ProcessBand',
      'ReportBand',
      'ScenariosBand',
      'ToolsBand',
      'AuthorityBand',
      'CasesBand',
      'JourneyBand',
      'WebFaq',
      'FinalCtaBand',
      'WebFooter',
    ];
    expect(required.filter((band) => !investmentPage.includes(band))).toEqual([]);
  });

  it('gets the Investment content by default from the now-shared components', () => {
    // WebFooter and WebFaq became configurable in Phase 2D. Investment passes
    // no prop, so it must still default to its own content.
    expect(investmentPage).toMatch(/<WebFooter\s*\/>/);
    expect(investmentPage).toMatch(/<WebFaq\s*\/>/);
    expect(read('components/web/WebFooter.tsx')).toContain('content = investmentFooter');
    expect(read('components/web/WebFaq.tsx')).toContain('content = investmentFaq');
  });
});

/* ===========================================================================
 * TEMPLATE FIDELITY
 * ======================================================================== */

describe('tax advisory composition', () => {
  it('renders the template bands in the template order', () => {
    const order = [
      'PrototypeBanner',
      'WebHeader',
      'TaxHero',
      'TaxTrustBand',
      'TaxContextBand',
      'TaxCalendarBand',
      'TaxProcessBand',
      'TaxReportBand',
      'TaxConcernsBand',
      'TaxServicesBand',
      'TaxAuthorityBand',
      'TaxCasesBand',
      'TaxJourneyBand',
      'WebFaq',
      'TaxFinalCtaBand',
      'WebFooter',
    ];
    const positions = order.map((name) => ({ name, at: pageSource.indexOf(`<${name}`) }));
    expect(positions.filter((p) => p.at === -1).map((p) => p.name)).toEqual([]);
    const rendered = positions.map((p) => p.at);
    expect(rendered).toEqual([...rendered].sort((a, b) => a - b));
  });

  it('composes context and audience as the template does — one band', () => {
    // The template does not separate them; Phase 2B did, which changed the
    // rhythm. There is one band, and it carries both the framing and the list.
    expect(bandsSource).toContain('TaxContextBand');
    expect(pageSource).not.toContain('TaxProblemBand');
    expect(pageSource).not.toContain('TaxAudienceBand');
    expect(taxAdvisory.context.tension.text.length).toBeGreaterThan(0);
    expect(taxAdvisory.context.profiles.length).toBeGreaterThanOrEqual(4);
  });

  it('composes services as three blocks, not a catalogue', () => {
    expect(taxAdvisory.services.items).toHaveLength(3);
    // Nothing was dropped: each block carries a sub-item line.
    for (const item of taxAdvisory.services.items) {
      expect(item.also.text.length).toBeGreaterThan(0);
      expect(item.points.length).toBeGreaterThanOrEqual(3);
      expect(item.deliverable.text.length).toBeGreaterThan(0);
    }
  });

  it("gives the hero the page's only h1", () => {
    expect(heroSource.match(/<h1/g) ?? []).toHaveLength(1);
    expect(pageSource).not.toMatch(/<h1/);
    expect(bandsSource).not.toMatch(/<h1/);
  });

  it('uses h3 inside sections and never h4 or deeper', () => {
    expect(bandsSource).toMatch(/<h3/);
    for (const source of [bandsSource, heroSource]) {
      expect(source).not.toMatch(/<h[4-6]/);
    }
  });

  it('renders a twelve-month calendar with a span per obligation', () => {
    expect(taxAdvisory.calendar.months).toHaveLength(12);
    expect(taxAdvisory.calendar.rows.length).toBeGreaterThanOrEqual(6);
    for (const row of taxAdvisory.calendar.rows) {
      expect(row.from).toBeGreaterThanOrEqual(1);
      expect(row.to).toBeLessThanOrEqual(12);
      expect(row.to).toBeGreaterThan(row.from);
    }
  });

  it('navigates only to anchors that exist on the page', () => {
    const rendered = [pageSource, bandsSource, heroSource, read('components/web/WebFaq.tsx')].join(
      '\n',
    );
    for (const item of taxAdvisory.nav) {
      expect(item.href.startsWith('#')).toBe(true);
      expect(rendered, `no section renders ${item.href}`).toContain(`id="${item.href.slice(1)}"`);
    }
  });
});

/* ===========================================================================
 * ROUTE GOVERNANCE
 * ======================================================================== */

describe('tax advisory route governance', () => {
  it('lives under /preview and is a laboratory route', () => {
    expect(pageSource).toMatch(/path:\s*'\/preview\/tax-advisory'/);
    expect(pageSource).toMatch(/laboratory:\s*true/);
    expect(isLaboratoryRoute('/preview/tax-advisory')).toBe(true);
  });

  it('is covered by the transport-level noindex header', () => {
    const nextConfig = read('next.config.ts');
    expect(nextConfig).toMatch(/source:\s*'\/preview\/:path\*'/);
    expect(nextConfig).toMatch(/noindex, nofollow/);
  });

  it('is not in the sitemap route table', () => {
    expect(read('app/sitemap.ts')).not.toContain('tax-advisory');
  });

  it('emits no JSON-LD', () => {
    for (const source of [pageSource, bandsSource, heroSource]) {
      expect(source).not.toMatch(/application\/ld\+json/);
    }
  });

  it('shows the preview banner before any other content', () => {
    const banner = pageSource.indexOf('<PrototypeBanner');
    const header = pageSource.indexOf('<WebHeader');
    expect(banner).toBeGreaterThan(-1);
    expect(banner).toBeLessThan(header);
  });
});

/* ===========================================================================
 * CLAIM CLASSIFICATION
 * ======================================================================== */

describe('tax advisory content — claim classification', () => {
  it('classifies a meaningful number of claims', () => {
    expect(claims.length).toBeGreaterThan(80);
  });

  it('every claim carries a valid status', () => {
    const valid = new Set(['confirmed', 'proposal', 'pending', 'blocked', 'unverified']);
    const invalid = claims
      .filter(({ claim }) => !valid.has(claim.status))
      .map(({ path, claim }) => `${path}: ${claim.status}`);
    expect(invalid).toEqual([]);
  });

  it('every confirmed claim cites a source', () => {
    const unsourced = claims
      .filter(({ claim }) => claim.status === 'confirmed' && !claim.source)
      .map(({ path, claim }) => `${path}: "${claim.text}"`);
    expect(unsourced).toEqual([]);
  });

  it('no claim in a review domain is marked confirmed', () => {
    const domains: ReviewDomain[] = ['tax', 'legal', 'financial', 'returns'];
    const offenders = claims
      .filter(
        ({ claim }) =>
          claim.status === 'confirmed' &&
          domains.includes((claim.review ?? 'none') as ReviewDomain),
      )
      .map(({ path, claim }) => `${path}: "${claim.text}" (${claim.review})`);
    expect(offenders).toEqual([]);
  });

  it('isPublishable rejects anything not confirmed and review-free', () => {
    const wrong = claims
      .filter(({ claim }) => isPublishable(claim))
      .filter(({ claim }) => claim.status !== 'confirmed' || (claim.review ?? 'none') !== 'none');
    expect(wrong).toEqual([]);
  });

  it('states the 20-year credential the same way Investment does', () => {
    // Two landings cannot describe the same credential differently. Both cite
    // verbal/credential-register.csv CR-002.
    const credential = taxAdvisory.trustStrip.find((item) => item.value.text === '20 years');
    expect(credential?.value.status).toBe('confirmed');
    expect(credential?.value.source).toMatch(/CR-002/);
  });
});

/* ===========================================================================
 * WHAT THE TEMPLATE CARRIES THAT IS NOT PUBLISHED
 * ======================================================================== */

describe('tax advisory content — suppressed from the template', () => {
  it('publishes no price', () => {
    // Illustrative dashboard values are plain strings, deliberately outside the
    // claim graph, and every surface that renders one is tagged "Illustrative".
    const offenders = texts
      .filter(({ text }) => /[€$£]\s?\d|\d\s?(?:€|EUR\b|euros?\b)/i.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no percentage, yield or return figure', () => {
    const offenders = texts
      .filter(({ text }) => /\d+(?:[.,]\d+)?\s?%/.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no volume or client-count figure', () => {
    const offenders = texts
      .filter(({ text }) => /\b\d{2,}\s*\+/.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no turnaround or response-time commitment', () => {
    const offenders = texts
      .filter(({ text }) =>
        /\b(?:in|within)\s+\d+\s+(?:working\s+)?(?:day|days|hour|hours|week|weeks)\b/i.test(text),
      )
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('names no client town', () => {
    // The template invents cases in Altea, Jávea and Moraira. The names may
    // appear only inside a governance note explaining the omission.
    const offenders = texts
      .filter(({ text }) => /\b(?:Altea|J[áa]vea|Moraira|Benissa|Calpe|Denia)\b/i.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('withholds every case location, period and result', () => {
    expect(taxAdvisory.cases.permissionPending.status).toBe('blocked');
    expect(taxAdvisory.cases.locationPending.status).toBe('pending');
    for (const item of taxAdvisory.cases.items) {
      expect(item.period.status).toBe('pending');
    }
  });

  it('does not repeat the administration or region the template names', () => {
    const offenders = texts
      .filter(({ text }) => /\bSUMA\b|Comunidad Valenciana/i.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no guarantee, promise or uniqueness claim', () => {
    const patterns = [
      /\bguarantee/i,
      /\bwe promise\b/i,
      /\brisk[- ]free\b/i,
      /\bwill save you\b/i,
      /\bthe only\b/i,
      /\bunique(?:ly)?\b/i,
      /\bno one else\b/i,
    ];
    const offenders = texts
      .filter(({ text }) => patterns.some((p) => p.test(text)))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('replaces the held property-management step and says so on the page', () => {
    const titles = taxAdvisory.journey.steps.map((s) => s.title.text);
    expect(titles).toContain('Review');
    expect(taxAdvisory.journey.substitutionNote.status).toBe('confirmed');
    expect(bandsSource).toContain('substitutionNote');
  });

  it('labels every illustrative surface', () => {
    // Sample figures are permitted on dashboard surfaces only when labelled.
    const tagCount = (bandsSource.match(/illustrativeTag/g) ?? []).length;
    expect(tagCount).toBeGreaterThanOrEqual(3);
    expect(read('components/web/TaxSnapshotCard.tsx')).toContain('Illustrative');
    expect(taxAdvisory.heroSnapshot.foot.text).toMatch(/Sample figures/);
    expect(taxAdvisory.heroSnapshot.foot.text).toMatch(/Not a client result/);
  });

  it('keeps illustrative values out of the claim graph', () => {
    // They are sample output, not statements the project is making.
    for (const row of taxAdvisory.heroSnapshot.rows) {
      expect(typeof row.value).toBe('string');
    }
    for (const row of taxAdvisory.report.summary.rows) {
      expect(typeof row.value).toBe('string');
    }
    for (const row of taxAdvisory.report.breakdown) {
      expect(typeof row.value).toBe('string');
    }
  });
});

/* ===========================================================================
 * ASSETS
 * ======================================================================== */

describe('imported assets', () => {
  function md5(path: string): string {
    return createHash('md5')
      .update(readFileSync(resolve(root, path)))
      .digest('hex');
  }

  it('ships one file per asset, at the canonical path', () => {
    const canonical: Record<string, string> = {
      'public/brand/BRAND-001-original.png': 'bb6c3d7569f7ca30469b50b5c9764a2a',
      'public/brand/sarah-katerina-logo.png': '9dc389ebf487900ed26c60002fd0125e',
      'public/sarah/sk-real-1.jpg': '030afe42af7a62e28cb290e1e2d7b329',
      'public/sarah/sk-real-2.jpg': '474f32ce619be759a1718e1124b3f054',
    };
    for (const [path, hash] of Object.entries(canonical)) {
      expect(existsSync(resolve(root, path)), `${path} is missing`).toBe(true);
      expect(md5(path), `${path} no longer matches its recorded source hash`).toBe(hash);
    }

    // The Phase 2B duplicates under different names are gone.
    for (const duplicate of [
      'public/brand/SK_LOGO_CLEAN.png',
      'public/brand/sk-wordmark.png',
      'public/sarah/AUTH-SK-001-editorial-portrait.jpg',
      'public/sarah/AUTH-SK-002-portrait-square.jpg',
    ]) {
      expect(existsSync(resolve(root, duplicate)), `${duplicate} is a duplicate`).toBe(false);
    }
  });

  it('never uses the composite key visual or the reclassified reference', () => {
    // AUTH-SK-004 is a composite with baked typography; AUTH-SK-003 was
    // reclassified upstream on 2026-08-17 as NOT Sarah, identity PROHIBITED.
    const offenders = sourceFiles
      .filter((file) => /SK_SARAH_LOGO|SK_REAL_3|AUTH-SK-003/.test(readFileSync(file, 'utf8')))
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('gives every static image import an alt from the content module', () => {
    for (const source of [heroSource, bandsSource]) {
      if (source.includes('<Image')) {
        expect(source).toMatch(/alt=\{[^}]*imageAlt/);
      }
    }
  });

  it('typechecks image imports without depending on a generated file', () => {
    // next-env.d.ts is gitignored and only written by next dev/build. CI runs
    // typecheck BEFORE build, so a committed declaration is what keeps static
    // image imports resolvable on a clean checkout. This is what broke main.
    expect(existsSync(resolve(root, 'types/next-image.d.ts'))).toBe(true);
    expect(read('types/next-image.d.ts')).toContain('next/image-types/global');
  });
});
