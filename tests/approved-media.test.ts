import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { APPROVED_MEDIA, PENDING_MEDIA_SLOTS } from '../lib/media/approved-media';
import { APPROVED_VIDEO } from '../lib/media/approved-video';

const root = resolve(__dirname, '..');
const rel = (f: string) => relative(root, f).replace(/\\/g, '/');

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const sourceFiles = ['app', 'components', 'lib', 'content'].flatMap((d) => walk(resolve(root, d)));
const read = (f: string) => readFileSync(f, 'utf8');

/**
 * Strips comments so a governance check measures what the code DOES, not what
 * a comment says about it. Without this, the registry's own documentation of
 * the excluded testimonials image would report itself as a violation.
 */
function readCode(f: string): string {
  return read(f)
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

const entries = Object.values(APPROVED_MEDIA);

describe('approved media registry', () => {
  it('registers only images approved in the Phase 2E inventory', () => {
    // 12 from the Phase 2E approval, plus the shared authority image
    // and the Property Purchase final CTA image.
    expect(entries.length).toBe(14);
  });

  it('uses the exact approved shared authority image on all three landings', () => {
    const authority = APPROVED_MEDIA.authorityEditorial;
    expect(authority.source).toBe('IMAGES/sarahkaterina_Services_Especial.png');
    // Phase 2E grade: served as the graded derivative of the same approved file.
    expect(authority.ungradedSrc).toBe('/media/authority-editorial.png');
    expect(authority.src).toBe('/media/graded/authority-editorial.webp');
    expect(authority.source).not.toMatch(/home|sk-real/);
    expect(read(resolve(root, 'components/web/WebBands.tsx'))).toContain(
      'APPROVED_MEDIA.authorityEditorial',
    );
    expect(read(resolve(root, 'components/web/TaxBands.tsx'))).toContain(
      'APPROVED_MEDIA.authorityEditorial',
    );
    expect(read(resolve(root, 'components/web/PropertyPurchase.tsx'))).toContain(
      'APPROVED_MEDIA.authorityEditorial',
    );
  });

  it('uses Services_14 for both Tax Advisory hero media slots', () => {
    expect(APPROVED_MEDIA.taxHero.source).toBe('IMAGES/sarahkaterina_Services_14.png');
    expect(APPROVED_MEDIA.taxHero.ungradedSrc).toBe('/media/tax-services-14.png');
    expect(APPROVED_MEDIA.taxHero.src).toBe('/media/graded/tax-hero.webp');
    const taxHero = read(resolve(root, 'components/web/TaxHero.tsx'));
    // PR #20 reads the entry once (`const heroMedia = APPROVED_MEDIA.taxHero`)
    // and renders it with next/image directly.
    expect(taxHero).toContain('APPROVED_MEDIA.taxHero');
    expect(taxHero).not.toContain('media={APPROVED_MEDIA.territoryCoast}');
    expect(taxHero).not.toContain('TerritoryVisual');
    expect((taxHero.match(/<Image\b/g) ?? []).length).toBe(1);
    expect(taxHero).toContain('singleHeroFrame');
  });

  it('uses the approved Property Purchase final CTA image', () => {
    expect(APPROVED_MEDIA.purchaseFinalContact.source).toBe('sarahkaterina_Contacto.png');
    expect(APPROVED_MEDIA.purchaseFinalContact.ungradedSrc).toBe(
      '/media/purchase-final-contact.png',
    );
    expect(APPROVED_MEDIA.purchaseFinalContact.src).toBe(
      '/media/graded/purchase-final-contact.webp',
    );
  });

  it('serves every entry through the common Phase 2E grade, keeping the ungraded derivative', () => {
    for (const m of entries) {
      expect(m.grade, m.id).toBe('sk-editorial-v1');
      expect(m.src, m.id).toBe(`/media/graded/${m.id}.webp`);
      expect(m.ungradedSrc, m.id).toBeTruthy();
      expect(
        existsSync(resolve(root, 'public', (m.ungradedSrc ?? '').replace(/^\//, ''))),
        m.id,
      ).toBe(true);
    }
  });

  it('ships a web derivative for every registered entry', () => {
    const missing = entries
      .filter((m) => !existsSync(resolve(root, 'public', m.src.replace(/^\//, ''))))
      .map((m) => m.src);
    expect(missing).toEqual([]);
  });

  it('keeps production derivatives under 250KB and isolates Preview source assets', () => {
    const previewSourceAssets = new Set([
      '/media/authority-editorial.png',
      '/media/tax-services-14.png',
      '/media/purchase-final-contact.png',
    ]);
    const heavy = entries
      .map((m) => {
        const path = resolve(root, 'public', m.src.replace(/^\//, ''));
        return { src: m.src, kb: Math.round(statSync(path).size / 1024) };
      })
      .filter((m) => m.kb > 250 && !previewSourceAssets.has(m.src));
    expect(heavy).toEqual([]);
    for (const src of previewSourceAssets) {
      expect(entries.find((m) => (m.ungradedSrc ?? m.src) === src)?.note).toMatch(/Preview-only/);
    }
  });

  it('never modifies or deletes an original', () => {
    const missing = entries
      .filter((m) => !existsSync(resolve(root, m.source)))
      .map((m) => m.source);
    expect(missing).toEqual([]);
  });

  it('gives every entry descriptive, non-promotional alt text', () => {
    const promotional = /\b(best|leading|luxury|exclusive|premium|stunning|dream|perfect)\b/i;
    for (const m of entries) {
      expect(m.alt.length).toBeGreaterThan(30);
      expect(m.alt).not.toMatch(promotional);
      // Alt text describes what is visible; it never asserts an outcome.
      expect(m.alt).not.toMatch(/\b(client|customer|sold|returned|profit|yield)\b/i);
    }
  });

  it('declares a focal point for every entry so crops stay safe', () => {
    for (const m of entries) {
      expect(m.focal).toMatch(/^\d+% \d+%$/);
    }
  });

  it('records the embedded-text problem rather than hiding it', () => {
    const withEmbedded = entries.filter((m) => m.embeddedText);
    expect(withEmbedded.length).toBeGreaterThan(4);
    // The baked-in lockup contains a spelling error. It is tracked here so it
    // is retouched deliberately, not discovered in production.
    const sic = withEmbedded.filter((m) => m.embeddedText?.includes('sic'));
    expect(sic.length).toBeGreaterThan(0);
  });

  it('crops the third-party masthead out of the residential image', () => {
    const residential = APPROVED_MEDIA.assetResidential;
    expect(residential.note).toMatch(/ARCHITECTURAL DIGEST/);
    expect(residential.note).toMatch(/CROPPED/);
    // The crop really happened: the derivative is shorter than 3:2.
    expect(residential.height / residential.width).toBeLessThan(0.5);
  });

  it('tracks the slots that are still schematic', () => {
    expect(PENDING_MEDIA_SLOTS.length).toBeGreaterThan(3);
    for (const slot of PENDING_MEDIA_SLOTS) {
      expect(slot.reason.length).toBeGreaterThan(20);
    }
  });
});

describe('excluded media', () => {
  it('never references the testimonials image', () => {
    // Excluded by the approval itself (item 7): no permissions, no evidence.
    const offenders = sourceFiles.filter((f) => /testimonios_clientes/.test(readCode(f))).map(rel);
    expect(offenders).toEqual([]);
  });

  it('references no media file outside the approved registry', () => {
    // The registry also names each ungraded derivative (Phase 2E grade).
    // Phase 2F adds the approved video registry: its sources and posters.
    const videoPaths = Object.values(APPROVED_VIDEO).flatMap((v) => [
      v.poster,
      ...v.sources.map((s) => s.src),
    ]);
    const approvedPaths = new Set([
      ...entries.flatMap((m) => [m.src, m.ungradedSrc ?? m.src]),
      ...videoPaths,
    ]);
    const offenders: string[] = [];
    for (const file of sourceFiles) {
      for (const match of readCode(file).matchAll(/['"](\/media\/[^'"]+)['"]/g)) {
        const path = match[1];
        if (path && !approvedPaths.has(path)) offenders.push(`${rel(file)}: ${path}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('embeds video only from the approved video registry', () => {
    // Item 8 held every video slot empty. Phase 2F (owner brief 2026-09-23)
    // places the territory map film and its loop: the only video allowed is
    // what `lib/media/approved-video.ts` registers, rendered by the two
    // components that own it. Case-sensitive `<video`, so the
    // `VideoPlaceholder` component — a reserved slot — does not trip it.
    const players = new Set([
      'components/web/TerritoryMapFilm.tsx',
      'components/web/banner/FabricBanner.tsx',
      'lib/media/approved-video.ts',
    ]);
    const offenders = sourceFiles
      .filter((f) => /<video[\s/>]|\.mp4|\.webm/.test(readCode(f)))
      .map(rel)
      .filter((f) => !players.has(f));
    expect(offenders).toEqual([]);
  });

  it('does not retain the superseded authority portraits as active consumers', () => {
    expect(
      sourceFiles.filter((f) =>
        /APPROVED_MEDIA\.(investmentAuthority|taxAuthority)/.test(readCode(f)),
      ),
    ).toEqual([]);
  });
});
