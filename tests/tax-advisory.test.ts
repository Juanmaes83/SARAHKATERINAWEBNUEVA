import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isPublishable, type Claim, type ReviewDomain } from '../lib/content/claims';
import { isLaboratoryRoute, isSelfChromed } from '../lib/seo/config';
import * as taxAdvisory from '../content/en/tax-advisory';

const root = resolve(__dirname, '..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

const pageSource = read('app/preview/tax-advisory/page.tsx');
const webTokens = read('app/tokens.web.css');

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

/* ===========================================================================
 * ROUTE GOVERNANCE
 * ======================================================================== */

describe('tax advisory route governance', () => {
  it('lives under /preview and is treated as a laboratory route', () => {
    expect(pageSource).toMatch(/path:\s*'\/preview\/tax-advisory'/);
    expect(isLaboratoryRoute('/preview/tax-advisory')).toBe(true);
  });

  it('declares itself a laboratory page, forcing noindex regardless of the site flag', () => {
    expect(pageSource).toMatch(/laboratory:\s*true/);
  });

  it('is covered by the transport-level noindex header for /preview', () => {
    const nextConfig = read('next.config.ts');
    expect(nextConfig).toMatch(/source:\s*'\/preview\/:path\*'/);
    expect(nextConfig).toMatch(/noindex, nofollow/);
  });

  it('is not listed in the sitemap route table', () => {
    expect(read('app/sitemap.ts')).not.toContain('tax-advisory');
  });

  it('emits no JSON-LD', () => {
    // FAQPage schema is prepared in content but withheld: schema may only
    // describe visible, verified content and most answers are pending.
    expect(pageSource).not.toMatch(/application\/ld\+json/);
  });

  it('owns its chrome, so the document keeps one banner and one contentinfo', () => {
    expect(isSelfChromed('/preview/tax-advisory')).toBe(true);
    expect(isSelfChromed('/preview/investment')).toBe(false);
    expect(isSelfChromed('/')).toBe(false);
    expect(pageSource).toContain('<TaxHeader');
    expect(pageSource).toContain('<TaxFooter');
    expect(pageSource).toContain('<main id="main">');
  });
});

/* ===========================================================================
 * COMPOSITION
 * ======================================================================== */

describe('tax advisory composition', () => {
  it('implements every section of the reference, in its order', () => {
    const order = [
      'PreviewNotice',
      'TaxHeader',
      'Hero',
      'TrustStrip',
      'Problem',
      'Audience',
      'TaxCalendar',
      'Process',
      'ReportPreview',
      'Concerns',
      'Services',
      'Authority',
      'Cases',
      'Continuity',
      'Faq',
      'FinalCta',
      'TaxFooter',
    ];

    const positions = order.map((name) => ({
      name,
      at: pageSource.indexOf(`<${name}`),
    }));

    expect(positions.filter((p) => p.at === -1).map((p) => p.name)).toEqual([]);

    const rendered = positions.map((p) => p.at);
    const sorted = [...rendered].sort((a, b) => a - b);
    expect(rendered).toEqual(sorted);
  });

  it("gives the hero the page's only h1", () => {
    const hero = read('components/tax-advisory/sections/Hero.tsx');
    expect(hero.match(/<h1/g) ?? []).toHaveLength(1);
    expect(pageSource).not.toMatch(/<h1/);
  });

  it('provides the six process stages and six service cards the brief requires', () => {
    expect(taxAdvisory.process.stages).toHaveLength(6);
    expect(taxAdvisory.services.cards).toHaveLength(6);
  });

  it('covers every FAQ topic the brief lists', () => {
    const ids = taxAdvisory.faq.items.map((item) => item.id);
    for (const topic of [
      'modelo-210',
      'non-resident',
      'rental',
      'purchase',
      'sale',
      'wealth',
      'deadlines',
      'documents',
      'cost',
      'scope',
    ]) {
      expect(ids).toContain(topic);
    }
  });

  it('renders a twelve-month calendar with a span for every recurring obligation', () => {
    expect(taxAdvisory.calendar.months).toHaveLength(12);
    expect(taxAdvisory.calendar.rows.length).toBeGreaterThanOrEqual(6);
    for (const row of taxAdvisory.calendar.rows) {
      expect(row.from).toBeGreaterThanOrEqual(1);
      expect(row.to).toBeLessThanOrEqual(12);
      expect(row.to).toBeGreaterThan(row.from);
    }
  });

  it('navigates only to anchors that exist on the page', () => {
    // The template's public IA is PENDING_APPROVAL and none of its routes
    // exists. Every nav target must therefore be an in-page anchor that is
    // actually rendered.
    for (const item of taxAdvisory.pageNav) {
      expect(item.href.startsWith('#')).toBe(true);
    }
    const sectionSources = walk(resolve(root, 'components/tax-advisory'))
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => readFileSync(f, 'utf8'))
      .join('\n');
    for (const item of taxAdvisory.pageNav) {
      expect(sectionSources).toContain(`id="${item.href.slice(1)}"`);
    }
  });
});

/* ===========================================================================
 * CLAIM CLASSIFICATION
 * ======================================================================== */

describe('tax advisory content — claim classification', () => {
  it('classifies a meaningful number of claims', () => {
    expect(claims.length).toBeGreaterThan(100);
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
    // AGENTS.md §11: tax, legal, financial and returns statements require
    // competent human review and can never be asserted as fact by an agent.
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

  it('isPublishable rejects anything that is not confirmed and review-free', () => {
    const wrong = claims
      .filter(({ claim }) => isPublishable(claim))
      .filter(({ claim }) => claim.status !== 'confirmed' || (claim.review ?? 'none') !== 'none');
    expect(wrong).toEqual([]);
  });
});

/* ===========================================================================
 * WHAT THE TEMPLATE CARRIES THAT THIS PAGE MAY NOT PUBLISH
 * ======================================================================== */

describe('tax advisory content — suppressed from the reference', () => {
  it('publishes no currency figure', () => {
    // The reference prices three services and states a report total.
    const offenders = texts
      .filter(({ text }) => /[€$£]\s?\d|\d\s?(?:€|EUR\b|euros?\b)/i.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no percentage, yield or return figure', () => {
    // The reference shows a "-18%" delta against a current scenario.
    const offenders = texts
      .filter(({ text }) => /\d+(?:[.,]\d+)?\s?%/.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no volume or client-count figure', () => {
    // The reference claims "160+ compradores extranjeros". Volume was
    // deprioritised upstream as differential proof and no figure is evidenced.
    const offenders = texts
      .filter(
        ({ text }) =>
          /\b\d{2,}\s*\+/.test(text) || /\b\d+\s+(?:clients?|buyers?|owners?)\b/i.test(text),
      )
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no turnaround or response-time commitment', () => {
    // The reference promises delivery in 5 and 7 days and a reply in one
    // working day. No turnaround figure is confirmed.
    const offenders = texts
      .filter(({ text }) =>
        /\b(?:in|within)\s+\d+\s+(?:working\s+)?(?:day|days|hour|hours|week|weeks)\b/i.test(text),
      )
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('names no client, town or case outcome', () => {
    // The reference invents three cases in Altea, Jávea and Moraira. Those
    // names may appear only inside a governance note explaining the omission.
    const offenders = texts
      .filter(({ path }) => !path.includes('cases'))
      .filter(({ text }) => /\b(?:Altea|J[áa]vea|Moraira|Benissa|Calpe|Denia)\b/i.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('keeps every case study as an explicit blocked placeholder', () => {
    for (const placeholder of taxAdvisory.cases.placeholders) {
      expect(placeholder.slot.text).toContain('PENDING_APPROVAL');
      expect(placeholder.slot.status).toBe('blocked');
    }
  });

  it('publishes no guarantee or promise of outcome', () => {
    const patterns = [/\bguarantee/i, /\bwe promise\b/i, /\brisk[- ]free\b/i, /\bwill save you\b/i];
    const offenders = texts
      .filter(({ text }) => patterns.some((p) => p.test(text)))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('publishes no uniqueness or absence-of-competition claim', () => {
    const patterns = [
      /\bthe only\b/i,
      /\bunique(?:ly)?\b/i,
      /\bno one else\b/i,
      /\bnobody else\b/i,
      /\bfirst and only\b/i,
    ];
    const offenders = texts
      .filter(({ text }) => patterns.some((p) => p.test(text)))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('marks the withheld credential rather than asserting it', () => {
    // "20 years inside Spain's tax administration" is confirmed upstream but
    // withheld here pending a claims dossier. It must never render as bare
    // fact: the claim carries a note, and the authority slot stays pending.
    const credential = taxAdvisory.trustStrip.items.find((i) => i.id === 'administration');
    expect(credential?.value.status).not.toBe('confirmed');
    expect(credential?.value.note).toMatch(/dossier/i);
    expect(taxAdvisory.authority.credentialSlot.status).toBe('pending');
  });

  it("leaves the reference's volume figure as a pending slot", () => {
    const buyers = taxAdvisory.trustStrip.items.find((i) => i.id === 'buyers');
    expect(buyers?.value.status).toBe('pending');
    expect(buyers?.value.text).toMatch(/PENDING/);
  });

  it('suppresses every dashboard value', () => {
    for (const panel of taxAdvisory.reportPreview.panels) {
      if (panel.valueMarker) {
        expect(['PENDING_APPROVAL', 'SAMPLE', 'ILLUSTRATIVE']).toContain(panel.valueMarker);
      }
      if (panel.deltaMarker) {
        expect(['PENDING_APPROVAL', 'SAMPLE', 'ILLUSTRATIVE']).toContain(panel.deltaMarker);
      }
    }
  });

  it('labels the tax calendar as illustrative', () => {
    expect(taxAdvisory.calendar.illustrativeMarker.text).toBe('ILLUSTRATIVE');
    expect(taxAdvisory.calendar.illustrativeMarker.status).toBe('pending');
  });

  it("replaces the reference's held property-management step and says so", () => {
    // AGENTS.md §9 forbids mentioning the held service at all.
    const ids = taxAdvisory.continuity.steps.map((s) => s.id);
    expect(ids).not.toContain('manage');
    expect(taxAdvisory.continuity.substitutionNote.status).toBe('confirmed');
  });
});

/* ===========================================================================
 * SCOPED PALETTE
 * ======================================================================== */

describe('scoped --sk-web-* palette', () => {
  it('is consumed only by the Tax Advisory landing', () => {
    // AGENTS.md §5.8 scopes this palette to one website project. The scope is
    // enforced here rather than left as a comment.
    const allowed =
      /^(app\/tokens\.web\.css|components\/tax-advisory\/|app\/preview\/tax-advisory\/)/;
    const offenders = sourceFiles
      .filter((file) => /\.(css|tsx|ts)$/.test(file))
      .filter((file) => readFileSync(file, 'utf8').includes('--sk-web-'))
      .map(rel)
      .filter((path) => !allowed.test(path) && path !== 'app/globals.css');

    expect(offenders).toEqual([]);
  });

  it('does not mutate the canonical token files', () => {
    // tests/tokens-parity.test.ts already hashes them; this asserts the scoped
    // layer added no --sk-web-* entry to either.
    expect(read('app/tokens.css')).not.toContain('--sk-web-');
    expect(read('app/tokens.app.css')).not.toContain('--sk-web-');
  });

  it('declares the navy and gold values recorded in the contrast document', () => {
    const doc = read('docs/web-palette-contrast.md');
    for (const value of ['#0d2233', '#12293c', '#a78854', '#806940', '#bca37a', '#b79c70']) {
      expect(webTokens.toLowerCase()).toContain(value);
      expect(doc.toLowerCase()).toContain(value);
    }
  });

  it('introduces no colour outside the token layer', () => {
    const offenders = sourceFiles
      .filter((file) => rel(file).startsWith('components/tax-advisory/'))
      .filter((file) => file.endsWith('.module.css'))
      .flatMap((file) => {
        const matches = readFileSync(file, 'utf8').match(/#[0-9a-fA-F]{3,8}\b/g);
        return matches ? [`${rel(file)}: ${matches.join(', ')}`] : [];
      });
    expect(offenders).toEqual([]);
  });
});

/* ===========================================================================
 * IMPORTED ASSETS
 * ======================================================================== */

describe('imported assets', () => {
  const record = read('docs/tax-advisory-asset-record.md');

  function md5(path: string): string {
    return createHash('md5')
      .update(readFileSync(resolve(root, path)))
      .digest('hex');
  }

  it('ships the assets the page references', () => {
    for (const asset of [
      'public/brand/SK_LOGO_CLEAN.png',
      'public/brand/sk-wordmark.png',
      'public/sarah/AUTH-SK-001-editorial-portrait.jpg',
      'public/sarah/AUTH-SK-002-portrait-square.jpg',
    ]) {
      expect(existsSync(resolve(root, asset)), `${asset} is missing`).toBe(true);
    }
  });

  it('keeps the provenance copies byte-identical to their upstream source', () => {
    // The import record states the upstream md5 for each. A transformation
    // applied by accident — a re-encode, a resize, a recolour — changes it.
    const byteIdentical: Record<string, string> = {
      'public/brand/SK_LOGO_CLEAN.png': 'bb6c3d7569f7ca30469b50b5c9764a2a',
      'public/sarah/AUTH-SK-001-editorial-portrait.jpg': '030afe42af7a62e28cb290e1e2d7b329',
      'public/sarah/AUTH-SK-002-portrait-square.jpg': '474f32ce619be759a1718e1124b3f054',
    };
    for (const [path, hash] of Object.entries(byteIdentical)) {
      expect(md5(path), `${path} no longer matches its recorded source hash`).toBe(hash);
      expect(record).toContain(hash);
    }
  });

  it('does not use the composite key visual as a logo', () => {
    // AUTH-SK-004 (SK_SARAH_LOGO.jpg) is a composite key visual with baked
    // photography and typography, not an insertable mark.
    const offenders = sourceFiles
      .filter((file) => /SK_SARAH_LOGO/i.test(readFileSync(file, 'utf8')))
      .map(rel);
    expect(offenders).toEqual([]);
    expect(existsSync(resolve(root, 'public/brand/SK_SARAH_LOGO.jpg'))).toBe(false);
  });

  it('does not import the reclassified non-Sarah reference', () => {
    // AUTH-SK-003 (SK_REAL_3.png) was reclassified upstream on 2026-08-17 as
    // NOT Sarah and PROHIBITED as any identity reference.
    expect(existsSync(resolve(root, 'public/sarah/AUTH-SK-003-portrait.png'))).toBe(false);
    const offenders = sourceFiles
      .filter((file) => /SK_REAL_3|AUTH-SK-003/.test(readFileSync(file, 'utf8')))
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('gives every rendered image contextual alt text', () => {
    const componentSources = walk(resolve(root, 'components/tax-advisory'))
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => ({ file: rel(f), src: readFileSync(f, 'utf8') }));

    const offenders = componentSources
      .filter(({ src }) => src.includes('<Image'))
      .filter(({ src }) => !/alt=\{/.test(src))
      .map(({ file }) => file);

    expect(offenders).toEqual([]);
  });
});
