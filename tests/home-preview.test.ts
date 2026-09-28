import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Claim } from '@/lib/content/claims';
import { isLaboratoryRoute } from '@/lib/seo/config';
import { BUYER_SYSTEM_EXPERIENCES, resolveEntryPoint } from '@/lib/buyer-system/links';
import * as home from '@/content/en/home';

/** Preview Home and its Buyer System entry points (docs/home-preview.md). */

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const page = read('app/preview/home/page.tsx');
const bands = read('components/web/HomeBands.tsx');

function collect(value: unknown): Claim[] {
  if (Array.isArray(value)) return value.flatMap(collect);
  if (typeof value === 'object' && value !== null) {
    const r = value as Record<string, unknown>;
    if (typeof r.text === 'string' && typeof r.status === 'string') return [r as unknown as Claim];
    return Object.values(r).flatMap(collect);
  }
  return [];
}
const claims = collect(home);
const texts = claims.map((c) => c.text).join('\n');

describe('route and publication boundary', () => {
  it('lives under /preview, noindex, and leaves / as the project index', () => {
    expect(isLaboratoryRoute('/preview/home')).toBe(true);
    expect(page).toMatch(/path:\s*'\/preview\/home'/);
    expect(page).toMatch(/laboratory:\s*true/);
    expect(read('app/sitemap.ts')).not.toMatch(/\/preview\//);
    expect(read('app/page.tsx')).not.toMatch(/HomeContent|content\/en\/home/);
  });

  it('has one h1 and reuses the shared chrome', () => {
    expect(bands.match(/<h1\b/g)).toHaveLength(1);
    expect(page).toContain('<WebHeader');
    expect(page).toContain('<WebFooter content={footer} />');
  });
});

describe('claims governance', () => {
  it('classifies every claim, and confirms nothing in a review domain', () => {
    expect(claims.length).toBeGreaterThan(30);
    for (const c of claims) {
      expect(['confirmed', 'proposal', 'pending', 'blocked', 'unverified']).toContain(c.status);
      if (c.status === 'confirmed') {
        expect(c.source, c.text).toBeTruthy();
        expect(c.review ?? 'none', c.text).toBe('none');
      }
    }
  });

  it('states no figure, guarantee, uniqueness or held name', () => {
    expect(texts).not.toMatch(/[€$£]\s?\d|\d\s?%|\bguarantee|\bwe promise\b|\brisk[- ]free\b/i);
    expect(texts).not.toMatch(/\bthe only\b|\bunique|\bbest price\b/i);
    expect(texts).not.toMatch(/VITA\s*Host|Property Management|Personal Shopper/i);
  });

  it('names no lender and claims no intermediation, agreement or saving', () => {
    expect(texts).not.toMatch(/\bUCI\b|Sabadell/i);
    expect(texts).not.toMatch(
      /\bintermediar|\bagreement with\b|\bpartner bank|\bsave you\b|\bbetter rate/i,
    );
    expect(home.financing.pending.status).toBe('pending');
    expect(home.financing.body.review).toBe('financial');
  });

  it('describes renovation as coordination, not direct execution', () => {
    expect(home.renovation.body.text).toMatch(/coordinate/);
    expect(home.renovation.body.text).not.toMatch(/\bwe (build|renovate|carry out|do the work)\b/i);
    expect(home.renovation.body.review).toBe('legal');
  });

  it('shows no presentation video or placeholder', () => {
    expect(home.presentationVideo.status).toBe('pending');
    expect(bands).not.toMatch(/<video|VideoPlaceholder|HeroFilm|PlayOnceVideo/);
  });
});

describe('Buyer System entry points', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('uses only the shared ribbon for the two live tools, after the trust strip', () => {
    expect(bands).toContain('toolKey="purchaseTax"');
    expect(bands).toContain('toolKey="realCashNeeded"');
    expect(bands).not.toMatch(/askingPrice|taxExposure/);
    const content = bands.slice(bands.indexOf('export function HomeContent'));
    expect(content.indexOf('<HomeToolsBand />')).toBeGreaterThan(
      content.indexOf('<HomeTrustBand />'),
    );
    expect(content.indexOf('<HomeToolsBand />')).toBeLessThan(
      content.indexOf('<HomeWorriesBand />'),
    );
  });

  it('keeps the paths verified against the Buyer System code (main c197ed2)', () => {
    expect(BUYER_SYSTEM_EXPERIENCES.purchaseTax.path).toBe('/');
    expect(BUYER_SYSTEM_EXPERIENCES.realCashNeeded.path).toBe('/real-cash-needed');
    expect(BUYER_SYSTEM_EXPERIENCES.askingPrice.path).toBe('/asking-price');
    expect(BUYER_SYSTEM_EXPERIENCES.askingPrice.availability).toBe('limited-go');
  });

  it('links the authorised origin only through the environment variable', () => {
    vi.stubEnv('NEXT_PUBLIC_BUYER_SYSTEM_URL', '');
    expect(resolveEntryPoint('purchaseTax').href).toBeNull();
    vi.stubEnv('NEXT_PUBLIC_BUYER_SYSTEM_URL', 'https://sarah-katerina-buyer-system.vercel.app');
    expect(resolveEntryPoint('purchaseTax').href).toBe(
      'https://sarah-katerina-buyer-system.vercel.app/',
    );
    expect(resolveEntryPoint('realCashNeeded').href).toBe(
      'https://sarah-katerina-buyer-system.vercel.app/real-cash-needed',
    );
    expect(resolveEntryPoint('askingPrice').href).toBeNull();
    expect(resolveEntryPoint('taxExposure').href).toBeNull();
    // No origin is hard-coded in the adapter.
    expect(read('lib/buyer-system/links.ts')).not.toMatch(
      /https:\/\/[a-z0-9.-]+\.(vercel\.app|com)/,
    );
  });

  it('carries no amount, personal data or query string in the exit link', () => {
    const link = read('components/web/BuyerToolLink.tsx');
    expect(link).not.toMatch(/URLSearchParams|\?[a-z]+=|searchParams/);
  });
});
