import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { APPROVED_VIDEO } from '@/lib/media/approved-video';
import * as tax from '@/content/en/tax-advisory';

/**
 * Phase 2H closing (docs/phase-2h-juanma-review.md): sound on the 2G film only
 * when it is publishable, and tax cases never shown as verified facts.
 */

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe('sound on the Property Purchase brand film', () => {
  const film = APPROVED_VIDEO.purchaseGoodIdea;

  it('stays unpublished while rights, reviewed captions or approval are missing', () => {
    expect(film.soundtrack?.status).toBe('unpublished');
    if (film.soundtrack?.status !== 'unpublished') return;
    const blockers = film.soundtrack.blockers.join(' ');
    expect(blockers).toMatch(/rights/i);
    expect(blockers).toMatch(/human-reviewed captions/i);
    expect(blockers).toMatch(/Sarah/);
  });

  it('gives no other film a soundtrack', () => {
    for (const [key, entry] of Object.entries(APPROVED_VIDEO)) {
      if (key === 'purchaseGoodIdea') continue;
      expect('soundtrack' in entry, key).toBe(false);
    }
  });

  it('renders sound controls and captions only for a published soundtrack', () => {
    const source = read('components/motion/PlayOnceVideo.tsx');
    expect(source).toContain("clip.soundtrack?.status === 'published' ? clip.soundtrack : null");
    expect(source).toMatch(/\{sound \? \(\s*<track/);
    expect(source).toMatch(/\{sound \? \(\s*<button[\s\S]*?aria-pressed=\{soundOn\}/);
    // The silent heroes never get sound.
    expect(read('components/motion/HeroFilm.tsx')).not.toMatch(/soundtrack|muted = false|<track/);
  });

  it('serves no voiced file or caption track while unpublished', () => {
    const files = readdirSync(resolve(root, 'public/media/video'));
    expect(files.filter((f) => /\.vtt$/.test(f))).toEqual([]);
    for (const s of film.sources) {
      expect(
        readFileSync(resolve(root, 'public', s.src.slice(1))).includes(Buffer.from('soun')),
      ).toBe(false);
    }
  });
});

describe('tax cases — real and authorised, tax review still open', () => {
  it("shows Sarah's results and her publication line, keeping the tax review open", () => {
    // 2026-10-01: Juanma (owner) confirms the cases are real and the clients'
    // written permission is held. The results are shown as results, but their
    // wording still awaits professional tax review, so none is `confirmed`.
    for (const item of tax.cases.items) {
      expect(item.metric.status).toBe('pending');
      expect(item.metric.review).toBe('tax');
    }
    expect(tax.cases.publication.text).toBe(
      'Published with the client’s written permission and verified figures.',
    );
    expect(tax.cases.publication.source).toMatch(/Juanma \(owner\), 2026-10-01/);
    expect('permissionPending' in tax.cases).toBe(false);
    expect('evidencePending' in tax.cases).toBe(false);
  });

  it('keeps the off-plan case tax-neutral until new build or resale is confirmed', () => {
    const offPlan = tax.cases.items.find((i) => i.id === 'buyer');
    expect(offPlan?.metric.text).toBe('Taxes and costs planned');
    expect(JSON.stringify(offPlan)).not.toMatch(/\bITP\b|\bIVA\b|\bVAT\b|\bAJD\b/);
  });
});
