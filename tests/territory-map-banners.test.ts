import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { APPROVED_VIDEO } from '../lib/media/approved-video';
import { territoryMap } from '../content/en/investment';
import { cases as purchaseCases } from '../content/en/property-purchase';
import {
  PENDING_COPY,
  PUBLICATION_REQUIREMENTS,
  PURCHASE_VOICES,
} from '../content/en/buyer-voices';

/**
 * Phase 2F — territory map film (Investment) and fabric banner for buyer
 * voices (Property Purchase). Brief 2026-09-23.
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

const sourceFiles = ['app', 'components', 'content', 'lib']
  .flatMap((d) => walk(resolve(root, d)))
  .filter((f) => /\.(tsx?|css)$/.test(f));

describe('approved video — registry and derivatives', () => {
  const videos = Object.values(APPROVED_VIDEO);

  it.each(videos.map((v) => [v.id, v] as const))(
    '%s has its sources, poster and untouched original',
    (_id, v) => {
      expect(existsSync(resolve(root, v.source))).toBe(true);
      expect(existsSync(resolve(root, 'public', v.poster.slice(1)))).toBe(true);
      expect(v.sources.map((s) => s.type)).toEqual(['video/webm', 'video/mp4']);
      for (const s of v.sources) {
        const file = resolve(root, 'public', s.src.slice(1));
        expect(existsSync(file), s.src).toBe(true);
        // A web budget: the heaviest cut stays under a megabyte.
        expect(statSync(file).size / 1024).toBeLessThanOrEqual(1024);
      }
      // The map cuts carry the cartography caveat; the Phase 2G brand film is
      // not a map and carries its own generated-footage provenance instead.
      if (v.source === 'VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4') {
        expect(v.note).toMatch(/not official cartography/);
      } else {
        expect(v.note).toMatch(/Generated footage/);
      }
      expect(v.description.length).toBeGreaterThan(40);
    },
  );

  it('ships silent derivatives only', () => {
    for (const v of videos) {
      for (const s of v.sources) {
        const bytes = readFileSync(resolve(root, 'public', s.src.slice(1)));
        // MP4 audio track handler, and the WebM audio codec ids.
        expect(bytes.includes(Buffer.from('soun')), s.src).toBe(false);
        expect(bytes.includes(Buffer.from('A_OPUS')), s.src).toBe(false);
        expect(bytes.includes(Buffer.from('A_VORBIS')), s.src).toBe(false);
      }
    }
  });

  it('leaves the original video and the six banner prototypes untouched', () => {
    expect(existsSync(resolve(root, 'VIDEOS/MAPA CIUDADES OPORTUNIDADES.mp4'))).toBe(true);
    const dir = resolve(root, 'BANDEROLAS DINÁMICAS');
    const html = readdirSync(dir).filter((f) => f.endsWith('.html'));
    expect(html).toHaveLength(6);
    for (const f of html) {
      const hash = createHash('md5')
        .update(readFileSync(join(dir, f)))
        .digest('hex');
      expect(hash, f).toBe('76c1d27eb1e38b51e26162f502345c76');
    }
  });

  it('serves nothing from VIDEOS/, BANDEROLAS/ or IMAGES/', () => {
    // The registries in lib/ name those originals as provenance; what renders
    // (app/, components/) must only ever point at public derivatives.
    const offenders = sourceFiles
      .filter((f) => /^(app|components)\//.test(rel(f)))
      .filter((f) => /['"(]\/?(VIDEOS|BANDEROLAS|IMAGES)[/ ]/.test(code(readFileSync(f, 'utf8'))))
      .map(rel);
    expect(offenders).toEqual([]);
  });
});

describe('territory map film — Investment only', () => {
  const bands = read('components/web/WebBands.tsx');
  const film = read('components/web/TerritoryMapFilm.tsx');

  it('leads the asset types band, before the four cards', () => {
    const band = bands.slice(bands.indexOf('export function AssetTypesBand'));
    expect(band.indexOf('<TerritoryMapFilm />')).toBeGreaterThan(0);
    expect(band.indexOf('<TerritoryMapFilm />')).toBeLessThan(band.indexOf('assetTypes.items.map'));
  });

  it('appears on no other page', () => {
    const users = sourceFiles
      .filter((f) => /TerritoryMapFilm/.test(readFileSync(f, 'utf8')))
      .map(rel)
      .filter((f) => !f.startsWith('components/web/TerritoryMapFilm'));
    expect(users).toEqual(['components/web/WebBands.tsx']);
  });

  it('plays once, rests on the final frame and never loops or autoplays under reduced motion', () => {
    const source = code(film);
    expect(source).not.toMatch(/\bloop\b/);
    expect(source).not.toMatch(/\bautoPlay\b/);
    expect(source).toContain('prefers-reduced-motion: reduce');
    expect(source).toContain('visibilitychange');
    expect(source).toContain('preload="none"');
    // The poster (final frame) is what shows without JS; it carries the alt text.
    expect(source).toMatch(/alt=\{WIDE\.description\}/);
  });

  it('never presents the map as cartography, inventory or forecast', () => {
    expect(territoryMap.disclaimer.text).toMatch(/not official cartography/);
    expect(territoryMap.disclaimer.text).toMatch(/not properties for sale/);
    expect(territoryMap.disclaimer.text).toMatch(/not a forecast/);
    for (const step of territoryMap.steps) {
      expect(step.title.status).toBe('proposal');
      expect(step.body.status).toBe('proposal');
    }
  });
});

describe('buyer voices — pending content only', () => {
  it('holds every slot pending, with no quote, name or country', () => {
    expect(PURCHASE_VOICES).toHaveLength(3);
    for (const slot of PURCHASE_VOICES) {
      expect(slot.status).toBe('pending');
      expect(slot.quote).toBeNull();
      expect(slot.attribution).toBeNull();
      expect(slot.context).toBeNull();
    }
    expect(PENDING_COPY.stamp.text).toMatch(/Preview · content pending/);
    expect(PENDING_COPY.imageNote.text).toMatch(/not the buyer/);
  });

  it('pairs each voice with the case it would evidence', () => {
    expect(PURCHASE_VOICES.map((s) => s.topic)).toEqual(purchaseCases.items.map((c) => c.title));
  });

  it('lists what publication requires, all blocked', () => {
    expect(PUBLICATION_REQUIREMENTS.length).toBeGreaterThanOrEqual(6);
    for (const item of PUBLICATION_REQUIREMENTS) expect(item.status).toBe('blocked');
    const all = PUBLICATION_REQUIREMENTS.map((r) => r.text).join(' ');
    expect(all).toMatch(/written consent/);
    expect(all).toMatch(/release/);
  });

  it('never carries the prototype seller-side copy', () => {
    const offenders = sourceFiles
      .filter((f) =>
        /Revaloramos|Tasaci[oó]n gratuita|Plan de venta|revalue your property|free valuation/i.test(
          readFileSync(f, 'utf8'),
        ),
      )
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('lives on Property Purchase only', () => {
    const users = sourceFiles
      .filter((f) => /<BuyerVoices\b/.test(readFileSync(f, 'utf8')))
      .map(rel);
    expect(users).toEqual(['components/web/PropertyPurchase.tsx']);
  });
});

describe('fabric banner — safety', () => {
  const banner = read('components/web/banner/FabricBanner.tsx');
  const engine = read('components/web/banner/fabric.ts');
  const css = read('components/web/banner/FabricBanner.module.css');

  it('loads the engine on demand, never in the page bundle', () => {
    expect(banner).toContain("await import('./fabric')");
    expect(banner).toMatch(/import type \{ Fabric \} from '\.\/fabric'/);
    expect(banner).not.toMatch(/^import \{[^}]*\} from '\.\/fabric'/m);
  });

  it('keeps the page scrollable and the content around the banner clickable', () => {
    expect(css).toContain('touch-action: pan-y');
    expect(css).not.toMatch(/touch-action:\s*none/);
    expect(css).toMatch(/\.canvas \{[\s\S]*?pointer-events: none;/);
    // The engine owns no global listener; the component owns input.
    expect(code(engine)).not.toMatch(/addEventListener/);
  });

  it('falls back to the static composition when motion, WebGL or the GPU is unavailable', () => {
    expect(banner).toContain('prefers-reduced-motion: reduce');
    expect(banner).toContain('webglcontextlost');
    expect(banner).toContain('visibilitychange');
    expect(banner).toMatch(/catch \{\s*return; \/\/ No usable WebGL/);
  });

  it('keeps the band from widening the page', () => {
    expect(read('components/web/PropertyPurchase.module.css')).toMatch(
      /\.voicesSection \{\s*overflow-x: clip;/,
    );
  });
});
