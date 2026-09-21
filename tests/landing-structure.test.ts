import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LABORATORY_ROUTES, isLaboratoryRoute } from '../lib/seo/config';
import * as investment from '../content/en/investment';

const root = resolve(__dirname, '..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

const pageSource = read('app/preview/investment/page.tsx');
const nextConfig = read('next.config.ts');
const heroSource = read('components/web/WebHero.tsx');
const sectionSource = read('components/web/WebSection.tsx');
const bandsSource = read('components/web/WebBands.tsx');
const faqSource = read('components/web/WebFaq.tsx');

describe('prototype route governance', () => {
  it('treats the whole /preview namespace as a laboratory route', () => {
    expect(LABORATORY_ROUTES).toContain('/preview');
    expect(isLaboratoryRoute('/preview')).toBe(true);
    expect(isLaboratoryRoute('/preview/investment')).toBe(true);
    expect(isLaboratoryRoute('/foundation')).toBe(true);
  });

  it('does not accidentally match a sibling route', () => {
    expect(isLaboratoryRoute('/previews')).toBe(false);
    expect(isLaboratoryRoute('/')).toBe(false);
    expect(isLaboratoryRoute('/investment')).toBe(false);
  });

  it('declares the page as a laboratory page in its metadata', () => {
    expect(pageSource).toMatch(/laboratory:\s*true/);
    expect(pageSource).toMatch(/path:\s*'\/preview\/investment'/);
  });

  it('carries a transport-level noindex header for /preview', () => {
    expect(nextConfig).toMatch(/source:\s*'\/preview\/:path\*'/);
    expect(nextConfig).toMatch(/noindex, nofollow/);
  });

  it('shows the prototype banner before any other content', () => {
    const banner = pageSource.indexOf('<PrototypeBanner');
    const header = pageSource.indexOf('<WebHeader');
    expect(banner).toBeGreaterThan(-1);
    expect(banner).toBeLessThan(header);
  });
});

describe('heading structure', () => {
  it('renders exactly one h1, owned by the hero', () => {
    expect(heroSource.match(/<h1/g) ?? []).toHaveLength(1);
    expect(pageSource).not.toMatch(/<h1/);
    expect(bandsSource).not.toMatch(/<h1/);
    expect(faqSource).not.toMatch(/<h1/);
  });

  it('uses h2 for every section header', () => {
    expect(sectionSource).toMatch(/<h2/);
    expect(sectionSource).not.toMatch(/<h1/);
  });

  it('uses h3 for items inside sections, never h4 or deeper', () => {
    expect(bandsSource).toMatch(/<h3/);
    for (const source of [bandsSource, faqSource, heroSource]) {
      expect(source).not.toMatch(/<h[4-6]/);
    }
  });
});

describe('landing composition', () => {
  it('includes every band the Phase 2B brief requires', () => {
    const required = [
      'PrototypeBanner',
      'WebHeader',
      'WebHero',
      'TrustBand',
      'ApproachBand',
      'DoorsBand',
      'AssetTypesBand',
      'ProcessBand',
      'ReportBand',
      'ScenariosBand',
      'BuyerSystemBridge',
      'AuthorityBand',
      'CasesBand',
      'JourneyBand',
      'WebFaq',
      'FinalCtaBand',
      'WebFooter',
    ];
    expect(required.filter((band) => !pageSource.includes(band))).toEqual([]);
  });

  it('emits no JSON-LD', () => {
    // FAQ and Organization schema stay unemitted: most answers are pending and
    // the legal entity is unconfirmed.
    for (const source of [pageSource, bandsSource, faqSource]) {
      expect(source).not.toMatch(/application\/ld\+json/);
    }
  });
});

describe('content completeness', () => {
  it('provides the five process steps named by the brief', () => {
    expect(investment.process.steps).toHaveLength(5);
    const ids = investment.process.steps.map((step) => step.id);
    expect(ids).toEqual([
      'market-screen',
      'due-diligence',
      'financial-modelling',
      'tax-overlay',
      'decision-report',
    ]);
  });

  it('gives every process step a deliverable', () => {
    for (const step of investment.process.steps) {
      expect(step.deliverable.text.length).toBeGreaterThan(0);
    }
  });

  it('provides the four asset types named by the brief', () => {
    const ids = investment.assetTypes.items.map((item) => item.id);
    expect(ids).toEqual(['residential', 'land', 'commercial', 'redevelopment']);
  });

  it('describes what is analysed, the risk and the deliverable for each asset type', () => {
    for (const item of investment.assetTypes.items) {
      expect(item.analysed.text.length).toBeGreaterThan(0);
      expect(item.risk.text.length).toBeGreaterThan(0);
      expect(item.deliverable.text.length).toBeGreaterThan(0);
    }
  });

  it('provides two or three decision doors, each with its own CTA', () => {
    expect(investment.doors.items.length).toBeGreaterThanOrEqual(2);
    expect(investment.doors.items.length).toBeLessThanOrEqual(3);
    const ctas = investment.doors.items.map((door) => door.cta.text);
    expect(new Set(ctas).size).toBe(ctas.length);
  });

  it('covers every FAQ topic the brief lists', () => {
    const ids = investment.faq.items.map((item) => item.id);
    for (const topic of [
      'analysed',
      'already-have',
      'still-looking',
      'information',
      'time',
      'includes',
      'tax',
      'independence',
      'not-do',
    ]) {
      expect(ids).toContain(topic);
    }
  });

  it('keeps every case study as an explicit blocked placeholder', () => {
    for (const item of investment.cases.items) {
      expect(item.title.text).toContain('PLACEHOLDER');
      expect(item.title.status).toBe('blocked');
    }
  });

  it('uses the GEO vocabulary the brief requires', () => {
    const corpus = JSON.stringify(investment).toLowerCase();
    for (const term of [
      'property investment analysis',
      'costa blanca',
      'financial modelling',
      'due diligence',
      'tax overlay',
      'decision report',
    ]) {
      expect(corpus).toContain(term);
    }
  });
});

describe('sample data labelling', () => {
  const chartSource = read('components/web/SampleChart.tsx');
  const dashboardSource = read('components/web/DashboardCard.tsx');

  it('labels every chart as illustrative in its accessible name', () => {
    expect(chartSource).toContain('Illustrative sample data, not a real result');
  });

  it('marks the hero dashboard as illustrative', () => {
    expect(dashboardSource).toMatch(/Illustrative/);
    expect(dashboardSource).toMatch(/Not a client result/);
  });

  it('marks every report card as illustrative', () => {
    expect(bandsSource).toMatch(/pendingTag/);
    expect(bandsSource).toContain('Illustrative');
  });
});
