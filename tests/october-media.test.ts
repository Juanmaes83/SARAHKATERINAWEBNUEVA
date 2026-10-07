import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { APPROVED_MEDIA, PENDING_MEDIA_SLOTS } from '../lib/media/approved-media';

/**
 * October 2026 media — six owner-supplied images from
 * `IMAGES/MEJORAS 23 OCTUBRE/`, integrated into the Investment and Property
 * Purchase preview landings.
 */

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const rel = (file: string) => relative(root, file).replace(/\\/g, '/');
const code = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1');

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const OCTOBER = [
  ['propertyInMind', 'property-in-mind', 'Property in mind.png'],
  ['investmentOpportunities', 'investment-opportunities', 'Opportunities.png'],
  ['assetLand', 'asset-land', 'Land.png'],
  ['assetCommercial', 'asset-commercial', 'Commercial.png'],
  ['advisorClientOne', 'advisor-client-one', 'SARAH ASESORA CLIENTE 1.png'],
  ['advisorClientTwo', 'advisor-client-two', 'SARAH ASESORA CLIENTE 2.png'],
] as const;

describe('October media — registry', () => {
  it.each(OCTOBER)(
    '%s uses its approved source and preserves original quality',
    (key, id, file) => {
      const m = APPROVED_MEDIA[key];
      expect(m.id).toBe(id);
      expect(m.source).toBe(`IMAGES/MEJORAS 23 OCTUBRE/${file}`);
      expect(m.note).toMatch(/Owner-supplied on 2026-10-23/);
      expect(m.focal).toMatch(/^\d+% \d+%$/);
      expect(existsSync(resolve(root, m.source))).toBe(true);
      if (OCTOBER.map(([, imageId]) => imageId).includes(id as (typeof OCTOBER)[number][1])) {
        const original = resolve(root, m.source);
        const served = resolve(root, 'public', m.src.slice(1));
        expect(m.src).toBe(`/media/originals/${id}.png`);
        expect(m.ungradedSrc).toBeUndefined();
        expect(m.grade).toBeUndefined();
        expect(existsSync(served)).toBe(true);
        expect(readFileSync(served).equals(readFileSync(original))).toBe(true);
        expect(statSync(original).size).toBeGreaterThan(1800000);
      } else {
        expect(m.src).toBe(`/media/graded/${id}.webp`);
        expect(m.ungradedSrc).toBe(`/media/${id}.webp`);
        expect(m.grade).toBe('sk-editorial-v1');
        expect(existsSync(resolve(root, 'public', m.ungradedSrc!.slice(1)))).toBe(true);
        const graded = resolve(root, 'public', m.src.slice(1));
        expect(existsSync(graded)).toBe(true);
        expect(statSync(graded).size / 1024).toBeLessThanOrEqual(250);
      }
    },
  );

  it('requests high-quality responsive optimisation for the three restored originals', () => {
    expect(read('components/web/TerritoryVisual.tsx')).toContain(
      "quality={media && ['property-in-mind', 'investment-opportunities', 'advisor-client-two'].includes(media.id) ? 90 : 75}",
    );
    const figure = read('components/web/ArtworkFigure.tsx');
    expect(figure.match(/quality=\{media\.id === 'asset-land'/g)?.length).toBe(2);
    expect(read('components/web/HomePreview.tsx').match(/quality=\{media\.id === 'advisor-client-one'/g)?.length).toBe(2);
  });

  it('records every new derivative in both manifests', () => {
    const web = JSON.parse(read('public/media/manifest.json')) as { id: string }[];
    const graded = JSON.parse(read('public/media/graded/manifest.json')) as {
      images: { id: string }[];
    };
    for (const [, id] of OCTOBER) {
      expect(
        web.some((e) => e.id === id),
        id,
      ).toBe(true);
      expect(
        graded.images.some((e) => e.id === id),
        id,
      ).toBe(true);
    }
  });

  it('never presents the advisory scenes as real clients or outcomes', () => {
    for (const key of ['advisorClientOne', 'advisorClientTwo'] as const) {
      const m = APPROVED_MEDIA[key];
      expect(m.alt).toMatch(/^An editorial advisory scene/);
      expect(m.alt).not.toMatch(/client|customer|case|testimonial|result/i);
      expect(m.note).toMatch(/not presented as (a )?real client/);
    }
  });
});

describe('October media — slots', () => {
  const bands = read('components/web/WebBands.tsx');
  const purchase = read('components/web/PropertyPurchase.tsx');

  it('gives each Investment door its own new image', () => {
    expect(bands).toContain("'have-property': APPROVED_MEDIA.propertyInMind");
    expect(bands).toContain('opportunities: APPROVED_MEDIA.investmentOpportunities');
    expect(code(bands)).not.toMatch(/'have-property': APPROVED_MEDIA\.assetPlan/);
    expect(code(bands)).not.toMatch(/opportunities: APPROVED_MEDIA\.reportInterior/);
  });

  it('gives Land and Commercial a photograph instead of the schematic fallback', () => {
    expect(bands).toContain('land: APPROVED_MEDIA.assetLand');
    expect(bands).toContain('commercial: APPROVED_MEDIA.assetCommercial');
    // The fallback still exists for any card without an entry.
    expect(read('components/web/TerritoryVisual.tsx')).toContain('Schematic');
  });

  it('places each advisory scene in exactly one slot', () => {
    const all = walk(resolve(root, 'components'))
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => code(readFileSync(f, 'utf8')))
      .join('\n');
    expect(all.match(/APPROVED_MEDIA\.advisorClientTwo/g)?.length).toBe(1);
    // 2026-10-07 (Juanma): advisorClientOne also carries the Home's Property
    // Purchase chapter, the same service; the registry entry is unchanged.
    expect(all.match(/APPROVED_MEDIA\.advisorClientOne/g)?.length).toBe(2);
    expect(read('components/web/HomePreview.tsx')).toContain(
      'advisorClientOne: APPROVED_MEDIA.advisorClientOne',
    );
    expect(bands).toContain('media={APPROVED_MEDIA.advisorClientTwo}');
    expect(purchase).toContain('media={APPROVED_MEDIA.advisorClientOne}');
  });

  it('no longer lists the Investment doors as a pending media slot', () => {
    expect(PENDING_MEDIA_SLOTS.map((s) => s.slot)).not.toContain('Investment · decision doors');
  });
});

describe('October media — boundaries', () => {
  it('serves nothing directly from IMAGES/ and never embeds a reference capture', () => {
    const offenders = ['app', 'components']
      .flatMap((d) => walk(resolve(root, d)))
      .filter((f) => /\.(tsx?|css)$/.test(f))
      .filter((f) => /['"(]\/?IMAGES\/|MEJORAR Y COMPARAR/.test(code(readFileSync(f, 'utf8'))))
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('keeps every preview route noindex', () => {
    const config = read('next.config.ts');
    expect(config).toMatch(/source:\s*'\/preview\/:path\*'/);
    expect(config).toMatch(/noindex, nofollow/);
  });

  it('leaves Team untouched by the new media', () => {
    const team = read('components/web/TeamEditorial.tsx') + read('app/preview/team/page.tsx');
    for (const [key] of OCTOBER) expect(team).not.toContain(key);
  });
});
