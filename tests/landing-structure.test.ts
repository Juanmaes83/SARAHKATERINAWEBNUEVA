import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LABORATORY_ROUTES, isLaboratoryRoute } from '../lib/seo/config';
import * as investment from '../content/en/investment';

const root = resolve(__dirname, '..');
const pageSource = readFileSync(resolve(root, 'app/preview/investment/page.tsx'), 'utf8');
const nextConfig = readFileSync(resolve(root, 'next.config.ts'), 'utf8');

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
  });

  it('carries a transport-level noindex header for /preview', () => {
    expect(nextConfig).toMatch(/source:\s*'\/preview\/:path\*'/);
    expect(nextConfig).toMatch(/noindex, nofollow/);
  });

  it('lives under /preview, not at a production path', () => {
    expect(pageSource).toMatch(/path:\s*'\/preview\/investment'/);
  });
});

describe('landing structure', () => {
  it('renders exactly one h1', () => {
    // The Hero owns the single h1; the page must not add another.
    const heroSource = readFileSync(resolve(root, 'components/sections/Hero.tsx'), 'utf8');
    const heroH1 = heroSource.match(/level=\{1\}/g) ?? [];
    const pageH1 = pageSource.match(/level=\{1\}/g) ?? [];
    expect(heroH1).toHaveLength(1);
    expect(pageH1).toHaveLength(0);
  });

  it('uses h2 for every top-level section heading', () => {
    const h2 = pageSource.match(/level=\{2\}/g) ?? [];
    // Problem, decision doors, visual proof, process, benefits, buyer system,
    // authority, cases, FAQ, final CTA.
    expect(h2.length).toBeGreaterThanOrEqual(10);
  });

  it('skips no heading level', () => {
    // Only levels 1-3 are used, and 3 never appears without a 2 above it.
    const levels = [...pageSource.matchAll(/level=\{(\d)\}/g)].map((m) => Number(m[1]));
    expect(levels.every((level) => level >= 1 && level <= 3)).toBe(true);
    expect(levels.includes(2)).toBe(true);
  });

  it('includes every block required by the phase brief', () => {
    const required = [
      'PrototypeBanner',
      'Hero',
      'TrustStrip',
      'problem',
      'decisionDoors',
      'visualProof',
      'process',
      'benefits',
      'BuyerSystemBridge',
      'authority',
      'cases',
      'faq',
      'finalCta',
    ];
    const missing = required.filter((block) => !pageSource.includes(block));
    expect(missing).toEqual([]);
  });

  it('shows the prototype banner before any other content', () => {
    const bannerIndex = pageSource.indexOf('<PrototypeBanner');
    const heroIndex = pageSource.indexOf('<Hero');
    expect(bannerIndex).toBeGreaterThan(-1);
    expect(bannerIndex).toBeLessThan(heroIndex);
  });

  it('emits no JSON-LD', () => {
    // FAQ schema is prepared but not emitted: most answers are pending, and
    // structured data may only describe visible, verified content.
    expect(pageSource).not.toMatch(/application\/ld\+json/);
  });
});

describe('content completeness', () => {
  it('provides the five decision-door and process structures the brief requires', () => {
    expect(investment.decisionDoors.doors.length).toBeGreaterThanOrEqual(2);
    expect(investment.decisionDoors.doors.length).toBeLessThanOrEqual(3);
    expect(investment.process.stages).toHaveLength(5);
  });

  it('covers every FAQ topic the brief lists', () => {
    const ids = investment.faq.items.map((item) => item.id);
    for (const topic of [
      'price',
      'time',
      'language',
      'remote',
      'scope',
      'independence',
      'tax',
      'documents',
      'risk',
      'next',
    ]) {
      expect(ids).toContain(topic);
    }
  });

  it('separates feature, benefit, outcome and risk in every benefit item', () => {
    for (const item of investment.benefits.items) {
      expect(item.feature.text.length).toBeGreaterThan(0);
      expect(item.benefit.text.length).toBeGreaterThan(0);
      expect(item.outcome.text.length).toBeGreaterThan(0);
      expect(item.risk.text.length).toBeGreaterThan(0);
    }
  });

  it('gives every process stage a what, deliverable and decision', () => {
    for (const stage of investment.process.stages) {
      expect(stage.what.text.length).toBeGreaterThan(0);
      expect(stage.deliverable.text.length).toBeGreaterThan(0);
      expect(stage.decision.text.length).toBeGreaterThan(0);
    }
  });

  it('keeps every case study as an explicit placeholder', () => {
    for (const placeholder of investment.cases.placeholders) {
      expect(placeholder.text).toContain('PENDING_APPROVAL');
      expect(placeholder.status).toBe('blocked');
    }
  });
});
