import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { APPROVED_MEDIA, PENDING_MEDIA_SLOTS } from '../lib/media/approved-media';
import { HERO_VIDEO } from '../lib/media/hero-video';
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
  it('registers only governed preview images', () => {
    // 12 from the Phase 2E approval, plus the shared authority image,
    // the Property Purchase final CTA image, seven Phase 2F case/One File
    // images, six approved October additions consolidated from PR #23, and
    // the Sarah-approved Home authority image supplied on main, and the two
    // owner-proposed Home service-discovery images (2026-09-29).
    // 2026-09-30: + Sarah's three photographs (EQUIPO_SARAHKATERINA4–6), confirmed
    // by Juanma, for the authority blocks.
    // 2026-10-07: + `sarahHomeDesk` (Sarah home_2.jpeg) for the Home banner, state 03.
    // 2026-10-07: + three owner-selected human images for Investment and Home.
    expect(entries.length).toBe(37);
  });

  it('replaces the authority image Sarah rejected with her own photographs', () => {
    // 2026-09-30: Sarah asked to change the face in the shared authority image
    // (REVISION WEB-Tax advisory.docx, REVISION WEB-investment.docx). The former
    // file stays registered and untouched; it is no longer rendered. Each
    // landing now shows one of Sarah's photographs, confirmed by Juanma as Sarah
    // and approved for use; the originals are byte-identical to the owner's.
    const authority = APPROVED_MEDIA.authorityEditorial;
    expect(authority.source).toBe('IMAGES/sarahkaterina_Services_Especial.png');
    expect(authority.src).toBe('/media/graded/authority-editorial.webp');
    const uses = {
      'WebBands.tsx': 'sarahBalcony',
      'TaxBands.tsx': 'sarahStairs',
    } as const;
    for (const [file, key] of Object.entries(uses)) {
      const source = read(resolve(root, 'components/web', file));
      expect(source, file).not.toContain('APPROVED_MEDIA.authorityEditorial');
      expect(source, file).toContain(`APPROVED_MEDIA.${key}`);
      const m = APPROVED_MEDIA[key];
      expect(m.source).toMatch(/^IMAGES\/EQUIPO\/SARAH\/EQUIPO_SARAHKATERINA[56]\.png$/);
      expect(m.note).toMatch(/confirmed by Juanma on 2026-09-30/);
    }
    const shas: Record<string, string> = {
      'IMAGES/EQUIPO/SARAH/EQUIPO_SARAHKATERINA4.png':
        'FDA981AF85B771056173DB0E33FD4AE6696E3C145DE24933B398C81092E524A2',
      'IMAGES/EQUIPO/SARAH/EQUIPO_SARAHKATERINA5.png':
        '0752149BE4D06C75FAA0C94BE10E5765624625FA4123837B58B1096DD01B5E26',
      'IMAGES/EQUIPO/SARAH/EQUIPO_SARAHKATERINA6.png':
        '68E9CBCD788FEBB20CB2B7B8908307454451F14F9BFB5CEA83400ADA070FDE0D',
    };
    for (const [file, sha] of Object.entries(shas)) {
      const actual = createHash('sha256')
        .update(readFileSync(resolve(root, file)))
        .digest('hex');
      expect(actual.toUpperCase(), file).toBe(sha);
    }
  });

  it('replaces the terrace photograph Sarah rejected with the file she supplied', () => {
    // 2026-10-01: Sarah asked to remove EQUIPO_SARAHKATERINA4 (standing on a
    // terrace, black-and-white dress). It is neither registered nor served any
    // more (its original stays in IMAGES/, untouched); its slot, the Property
    // Purchase authority block uses the supplied file (the Home hero did until 2026-10-02).
    expect('sarahTerrace' in APPROVED_MEDIA).toBe(false);
    expect(existsSync(resolve(root, 'public/media/sarah-terrace.webp'))).toBe(false);
    expect(existsSync(resolve(root, 'IMAGES/EQUIPO/SARAH/EQUIPO_SARAHKATERINA4.png'))).toBe(true);
    const confianza = APPROVED_MEDIA.sarahConfianza;
    expect(confianza.source).toBe('IMAGES/SARAH_KATERINA_1_SARAH_CONFIANZA.png');
    expect(confianza.grade).toBeUndefined();
    const sha = createHash('sha256')
      .update(readFileSync(resolve(root, confianza.source)))
      .digest('hex')
      .toUpperCase();
    expect(sha).toBe('AC09225865A670A82FB1CCDA4647133BE4CE0A037B6D6CCBE6CA084A654AD3F5');
    expect(confianza.note).toContain(sha);
    expect(read(resolve(root, 'components/web/PropertyPurchase.tsx'))).toContain(
      'APPROVED_MEDIA.sarahConfianza',
    );
    // 2026-10-02: the Home hero now carries the provisional hero film
    // (APPROVED_VIDEO.homeHeroReview); the photograph stays registered.
  });

  it('keeps Services_14 registered and gives the Tax hero its approved scroll video', () => {
    // The former hero image stays registered, untouched (brief §12: do not
    // delete approved assets); Phase 2F places the approved video in the hero.
    expect(APPROVED_MEDIA.taxHero.source).toBe('IMAGES/sarahkaterina_Services_14.png');
    expect(APPROVED_MEDIA.taxHero.ungradedSrc).toBe('/media/tax-services-14.png');
    expect(APPROVED_MEDIA.taxHero.src).toBe('/media/graded/tax-hero.webp');
    const taxHero = read(resolve(root, 'components/web/TaxHero.tsx'));
    expect(taxHero).toContain('<ScrubVideo video={HERO_VIDEO.tax}');
    expect(taxHero).not.toContain('TerritoryVisual');
    // One information layer: no image or chip laid over the footage.
    expect(taxHero).not.toMatch(/<Image\b/);
  });

  it('uses the approved Property Purchase final CTA image', () => {
    expect(APPROVED_MEDIA.purchaseFinalContact.source).toBe('sarahkaterina_Contacto.png');
    expect(APPROVED_MEDIA.purchaseFinalContact.ungradedSrc).toBe(
      '/media/purchase-final-contact.png',
      '/media/originals/investment-opportunities.png',
      '/media/originals/asset-land.png',
      '/media/originals/asset-commercial.png',
    );
    expect(APPROVED_MEDIA.purchaseFinalContact.src).toBe(
      '/media/graded/purchase-final-contact.webp',
    );
  });

  it('serves every entry through the common Phase 2E grade, keeping the ungraded derivative', () => {
    // Sarah's own photographs are compression-only: her face is never graded.
    const UNGRADED = [
      'home-sarah-authority',
      'sarah-confianza',
      'sarah-balcony',
      'sarah-stairs',
      'sarah-home-desk',
      'investment-opportunities',
      'asset-land',
      'asset-commercial',
    ];
    const gradedEntries = entries.filter((m) => !UNGRADED.includes(m.id));
    for (const m of gradedEntries) {
      expect(m.grade, m.id).toBe('sk-editorial-v1');
      expect(m.src, m.id).toBe(`/media/graded/${m.id}.webp`);
      expect(m.ungradedSrc, m.id).toBeTruthy();
      expect(
        existsSync(resolve(root, 'public', (m.ungradedSrc ?? '').replace(/^\//, ''))),
        m.id,
      ).toBe(true);
    }

    // Juanma's Home brief expressly forbids retouching or altering Sarah's
    // face. This one derivative is compression-only and therefore does not
    // pass through the visual grade used for the earlier staged imagery.
    expect(APPROVED_MEDIA.homeAuthority.grade).toBeUndefined();
    expect(APPROVED_MEDIA.homeAuthority.ungradedSrc).toBeUndefined();
    expect(APPROVED_MEDIA.homeAuthority.src).toBe('/media/home-sarah-authority.webp');
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
    const branchLocalEntries = entries.filter((m) => m.id !== 'home-sarah-authority');
    const missing = branchLocalEntries
      .filter((m) => !existsSync(resolve(root, m.source)))
      .map((m) => m.source);
    expect(missing).toEqual([]);

    // The approved Home original was added to main in d7b24eda. A branch cut
    // before that commit does not carry it (and must not duplicate it); a
    // branch on current main does. Either way the provenance is recorded, and
    // when the original is present it must be the exact recorded file.
    expect(APPROVED_MEDIA.homeAuthority.source).toBe('IMAGES/Sarah home_1.png');
    expect(APPROVED_MEDIA.homeAuthority.note).toMatch(/d7b24eda/);
    expect(APPROVED_MEDIA.homeAuthority.note).toMatch(/60CC3A7A/);
    const original = resolve(root, APPROVED_MEDIA.homeAuthority.source);
    if (existsSync(original)) {
      const sha = createHash('sha256').update(readFileSync(original)).digest('hex').toUpperCase();
      expect(sha).toBe('60CC3A7AF92C22D6A0B7380B589B2E85E9D47B674A0E2693BD94DA832E6BCFF7');
    }
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
    // The consolidation resolves every approved slot; only the three Tax
    // Advisory case images remain pending because no approved originals exist.
    expect(PENDING_MEDIA_SLOTS).toHaveLength(3);
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
    // The registry also names each ungraded derivative (Phase 2E grade), and
    // Phase 2F adds the hero video registry: cuts and posters.
    const heroPaths = Object.values(HERO_VIDEO).flatMap((v) =>
      [v.desktop, v.mobile].flatMap((c) => [c.src, c.posterStart, c.posterEnd]),
    );
    const territoryPaths = Object.values(APPROVED_VIDEO).flatMap((v) => [
      v.poster,
      ...v.sources.map((source) => source.src),
    ]);
    const approvedPaths = new Set([
      ...entries.flatMap((m) => [m.src, m.ungradedSrc ?? m.src]),
      ...heroPaths,
      ...territoryPaths,
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

  it('embeds video only through the approved hero video registry', () => {
    // Item 8 held every video slot empty. Phase 2F (brief §6–7) places three
    // approved hero videos: only the registry may name a video file, and only
    // the scroll-scrub primitive may render one. Case-sensitive `<video`, so
    // the `VideoPlaceholder` reserved slot does not trip the check.
    const allowed = new Set([
      'lib/media/hero-video.ts',
      'components/motion/ScrubVideo.tsx',
      'lib/media/approved-video.ts',
      'components/web/TerritoryMapFilm.tsx',
      'components/web/banner/FabricBanner.tsx',
      // Phase 2G: the play-once film primitive (Property Purchase brand film).
      'components/motion/PlayOnceVideo.tsx',
      // Phase 2H: the play-once hero primitive (Investment, Property Purchase).
      'components/motion/HeroFilm.tsx',
    ]);
    const offenders = sourceFiles
      .filter((f) => /<video[\s/>]|\.mp4|\.webm/.test(readCode(f)))
      .map(rel)
      .filter((f) => !allowed.has(f));
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
