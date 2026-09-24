import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { APPROVED_MEDIA, PENDING_MEDIA_SLOTS } from '../lib/media/approved-media';
import { HERO_VIDEO } from '../lib/media/hero-video';
import { cases as investmentCases } from '../content/en/investment';
import { cases as purchaseCases } from '../content/en/property-purchase';

/**
 * Phase 2F — approved case imagery and scroll-controlled hero video.
 * The contract in docs/phase-2f-approved-images-and-scroll-hero-video.md §14.
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

const rendered = ['app', 'components']
  .flatMap((d) => walk(resolve(root, d)))
  .filter((f) => /\.(tsx?|css)$/.test(f));

const OCT = 'IMAGES/MEJORAS 23 OCTUBRE';

/** Brief §19, image rows: registry key → exact source file. */
const IMAGE_MAPPING = [
  ['caseRefurbishedVilla', `${OCT}/Investment Refurbished villa.png`],
  ['caseApartmentLetting', `${OCT}/Investment Apartment for letting.png`],
  ['caseLandDevelopment', `${OCT}/Investment Land with development.png`],
  ['purchaseFiscalExposure', `${OCT}/Property Purchase Fiscal exposure identified.png`],
  ['purchaseClauseRenegotiated', `${OCT}/Property Purchase Problematic clause renegotiated.png`],
  ['purchaseRemoteCompleted', `${OCT}/Property Purchase Remote purchase completed.png`],
  ['purchaseOneFile', `${OCT}/One file. From viewing to keys.png`],
] as const;

/** Source SHA-256 prefixes recorded before derivation (brief §3). */
const SOURCE_SHA: Record<string, string> = {
  [`${OCT}/Investment Refurbished villa.png`]: 'cb109107f2b869be',
  [`${OCT}/Investment Apartment for letting.png`]: 'a420f8a056b04806',
  [`${OCT}/Investment Land with development.png`]: '9e79c9aced7bd0db',
  [`${OCT}/Property Purchase Fiscal exposure identified.png`]: '5dbac0b376178489',
  [`${OCT}/Property Purchase Problematic clause renegotiated.png`]: '7c7f01baccf3b470',
  [`${OCT}/Property Purchase Remote purchase completed.png`]: '544b3d23a1f1e4fb',
  [`${OCT}/One file. From viewing to keys.png`]: 'd5e0dbc2d1d24c90',
};

const sha256 = (path: string) =>
  createHash('sha256')
    .update(readFileSync(resolve(root, path)))
    .digest('hex');

describe('1–4. approved images', () => {
  it.each(IMAGE_MAPPING)(
    '%s is derived from %s, graded, budgeted and illustrative',
    (key, source) => {
      const m = APPROVED_MEDIA[key];
      expect(m.source).toBe(source);
      expect(m.illustrative).toBe(true);
      expect(m.grade).toBe('sk-editorial-v1');
      expect(m.alt).toMatch(/^Illustrative/);
      // Never a client, a real case or a named person.
      expect(m.alt).not.toMatch(/client|customer|Sarah|buyer/i);
      const graded = resolve(root, 'public', m.src.slice(1));
      expect(existsSync(graded)).toBe(true);
      expect(statSync(graded).size / 1024).toBeLessThanOrEqual(250);
      expect(existsSync(resolve(root, 'public', m.ungradedSrc!.slice(1)))).toBe(true);
    },
  );

  it('leaves every original image unchanged', () => {
    for (const [source, prefix] of Object.entries(SOURCE_SHA)) {
      expect(sha256(source).startsWith(prefix), source).toBe(true);
    }
  });

  it('maps the Investment cases in the approved order', () => {
    const bands = read('components/web/WebBands.tsx');
    expect(investmentCases.items.map((c) => c.id)).toEqual(['case-1', 'case-2', 'case-3']);
    expect(investmentCases.items.map((c) => c.assetType.text)).toEqual([
      'Refurbished villa',
      'Apartment for letting',
      'Land with development',
    ]);
    expect(bands).toContain("'case-1': APPROVED_MEDIA.caseRefurbishedVilla");
    expect(bands).toContain("'case-2': APPROVED_MEDIA.caseApartmentLetting");
    expect(bands).toContain("'case-3': APPROVED_MEDIA.caseLandDevelopment");
  });

  it('maps each avoided mistake to its own image, by title', () => {
    const purchase = read('components/web/PropertyPurchase.tsx');
    expect(purchaseCases.items.map((c) => c.title)).toEqual([
      'Fiscal exposure identified',
      'Problematic clause renegotiated',
      'Remote purchase completed',
    ]);
    expect(purchase).toContain(
      "'Fiscal exposure identified': APPROVED_MEDIA.purchaseFiscalExposure",
    );
    expect(purchase).toContain(
      "'Problematic clause renegotiated': APPROVED_MEDIA.purchaseClauseRenegotiated",
    );
    expect(purchase).toContain(
      "'Remote purchase completed': APPROVED_MEDIA.purchaseRemoteCompleted",
    );
  });

  it('uses no case image outside its own slot', () => {
    const all = rendered.map((f) => code(readFileSync(f, 'utf8'))).join('\n');
    for (const [key] of IMAGE_MAPPING) {
      expect(all.match(new RegExp(`APPROVED_MEDIA\\.${key}\\b`, 'g'))?.length, key).toBe(1);
    }
  });

  it('replaces the former One File still life with the approved image', () => {
    const purchase = code(read('components/web/PropertyPurchase.tsx'));
    const band = purchase.slice(purchase.indexOf('export function OneFileBand'));
    expect(band.slice(0, band.indexOf('</WebSection>'))).toContain(
      'APPROVED_MEDIA.purchaseOneFile',
    );
    expect(purchase).not.toContain('FileStillLife');
    expect(read('components/web/PropertyPurchase.module.css')).not.toMatch(
      /\.fileStill|\.fileNote/,
    );
  });

  it('keeps every case evidence state and adds an illustrative statement', () => {
    for (const item of purchaseCases.items) expect(item.body).toContain('withheld');
    const purchase = read('components/web/PropertyPurchase.tsx');
    expect(purchase).toContain('Result withheld');
    expect(purchase).toContain('Case slot - permission required');
    expect(purchase).toContain('Illustrative · not a client case');
    const bands = read('components/web/WebBands.tsx');
    expect(bands).toContain('Result withheld pending client permission and verification');
    expect(bands).toContain('Illustrative analysis · not a client case');
  });

  it('clears the case slots from the pending list and records the Team exception', () => {
    const slots = PENDING_MEDIA_SLOTS.map((s) => s.slot);
    expect(slots).not.toContain('Investment · cases');
    expect(slots).not.toContain('Property Purchase · cases');
    expect(slots).toContain('Team · hero video');
  });
});

describe('5–10, 13. hero videos', () => {
  const HEROES = [
    [
      'investment',
      'components/web/WebHero.tsx',
      'VIDEOS/TAX ADVISORY HERO REPLACEMENT.mp4',
    ],
    [
      'purchase',
      'components/web/PropertyPurchase.tsx',
      'VIDEOS/SARAH KATERINA SIEMPRE DEL LADO DEL COMPRADOR.mp4',
    ],
    ['tax', 'components/web/TaxHero.tsx', 'VIDEOS/BIENES RACIES QUE CRECEN.mp4'],
  ] as const;

  it.each(HEROES)('the %s hero scrubs its approved source', (key, component, source) => {
    const v = HERO_VIDEO[key];
    // The source name is kept exactly as it exists, including "RACIES".
    expect(v.source).toBe(source);
    expect(sha256(v.source)).toBe(v.sourceSha256);
    expect(read(component)).toContain(`<ScrubVideo`);
    expect(read(component)).toContain(`HERO_VIDEO.${key}`);
    expect(read(component)).toContain('<ScrubStage>');
  });

  it('uses each hero video exactly once, and no two heroes share one', () => {
    const all = rendered.map((f) => code(readFileSync(f, 'utf8'))).join('\n');
    for (const key of Object.keys(HERO_VIDEO)) {
      expect(all.match(new RegExp(`HERO_VIDEO\\.${key}\\b`, 'g'))?.length, key).toBe(1);
    }
    const sources = Object.values(HERO_VIDEO).map((v) => v.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it('gives Team no video: its authentic photograph stays', () => {
    const team = read('components/web/TeamEditorial.tsx') + read('app/preview/team/page.tsx');
    expect(team).not.toMatch(/ScrubVideo|HERO_VIDEO|<video/);
    expect(Object.values(HERO_VIDEO).map((v) => v.route)).not.toContain('/preview/team');
  });

  it('ships silent, fast-start H.264 derivatives with posters for both cuts', () => {
    for (const v of Object.values(HERO_VIDEO)) {
      for (const cut of [v.desktop, v.mobile]) {
        const file = resolve(root, 'public', cut.src.slice(1));
        const bytes = readFileSync(file);
        expect(bytes.length).toBe(cut.bytes);
        // MP4 container with an AVC (H.264) video track and no sound track.
        expect(bytes.includes(Buffer.from('avc1'))).toBe(true);
        expect(bytes.includes(Buffer.from('soun')), cut.src).toBe(false);
        // Fast start: the movie header precedes the media data.
        expect(bytes.indexOf(Buffer.from('moov'))).toBeLessThan(bytes.indexOf(Buffer.from('mdat')));
        for (const poster of [cut.posterStart, cut.posterEnd]) {
          expect(existsSync(resolve(root, 'public', poster.slice(1))), poster).toBe(true);
        }
      }
    }
  });

  it('keeps the video decorative, silent, paused and out of the tab order', () => {
    const scrub = code(read('components/motion/ScrubVideo.tsx'));
    expect(scrub).toMatch(/<video[\s\S]*?muted[\s\S]*?playsInline[\s\S]*?aria-hidden="true"/);
    expect(scrub).toContain('tabIndex={-1}');
    expect(scrub).not.toMatch(/\bautoPlay\b|\bloop\b|\bcontrols\b|\.play\(/);
    // No src in the server markup: attached after load, released on unmount.
    expect(scrub).toMatch(/preload="none"/);
    expect(scrub).toContain("addEventListener('load', attach");
    expect(scrub).toContain("el.removeAttribute('src')");
  });

  it('is static under reduced motion and without scripting', () => {
    const scrub = read('components/motion/ScrubVideo.tsx');
    // Nothing loads or moves unless motion is allowed and scripting is on.
    expect(scrub).toContain(
      "const SCRUB = '(prefers-reduced-motion: no-preference) and (scripting: enabled)'",
    );
    expect(scrub).toContain('if (!window.matchMedia(SCRUB).matches) return;');
    // The <img> fallback — used when no scrub-only <source> matches — is the final frame.
    expect(scrub).toMatch(/<img\s+className=\{styles\.poster\}\s+src=\{desktop\.posterEnd\}/);
    const css = read('components/motion/ScrubVideo.module.css');
    expect(css).toMatch(
      /@media \(min-width: 1024px\) and \(prefers-reduced-motion: no-preference\) and \(scripting: enabled\)/,
    );
  });

  it('works only while the hero is on screen', () => {
    const scrub = read('components/motion/ScrubVideo.tsx');
    expect(scrub).toContain('new IntersectionObserver');
    expect(scrub).toContain("window[method]('scroll', schedule, { passive: true }");
    expect(scrub).toContain('requestAnimationFrame(update)');
  });
});

describe('7, 11, 12, 14. boundaries', () => {
  it('serves nothing from IMAGES/ or VIDEOS/', () => {
    const offenders = rendered
      .filter((f) => /['"(]\/?(IMAGES|VIDEOS)\//.test(code(readFileSync(f, 'utf8'))))
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it('keeps every Preview route noindex, nofollow', () => {
    const config = read('next.config.ts');
    expect(config).toMatch(/source:\s*'\/preview\/:path\*'/);
    expect(config).toMatch(/noindex, nofollow/);
  });

  it('changes no hero copy, claim or CTA in the three landings', () => {
    // The only content change is the Property Purchase hero caption, which
    // described the former image; it now describes the video without
    // identifying anyone.
    const purchase = read('content/en/property-purchase.ts');
    expect(purchase).toContain("text: 'The buying process,'");
    expect(purchase).toContain("text: 'Start my purchase file'");
    expect(read('content/en/investment.ts')).toContain(
      "text: 'Properties. Data. Better decisions.'",
    );
    expect(read('content/en/tax-advisory.ts')).toContain("text: 'Intro video in production'");
  });

  it('keeps Tax and Team regressions controlled', () => {
    const tax = read('components/web/TaxHero.tsx');
    // The explainer-video pending chip and the detached snapshot stay.
    expect(tax).toContain('hero.videoPending.text');
    expect(tax).toContain('<TaxSnapshotCard />');
    const team = read('components/web/TeamEditorial.tsx');
    expect(team).not.toMatch(/ScrubVideo|ArtworkFigure/);
  });

  it('keeps the no-overflow guards on the new layouts', () => {
    // Frames take the media's own ratio and never a fixed width.
    const scrub = read('components/motion/ScrubVideo.module.css');
    expect(scrub).toContain('aspect-ratio: var(--sk-scrub-ratio)');
    // A fixed `width:` declaration (not a `min-width` media feature).
    expect(scrub).not.toMatch(/(?<![-\w])width:\s*\d+px/);
    const art = read('components/web/ArtworkFigure.module.css');
    expect(art).toContain('min-width: 0');
    expect(art).toMatch(/\.dialogFrame \{[\s\S]*?overflow: auto;/);
  });
});
