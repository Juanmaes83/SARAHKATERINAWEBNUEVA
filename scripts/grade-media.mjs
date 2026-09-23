#!/usr/bin/env node
/**
 * Phase 2E — common editorial grade for the three service landings.
 *
 *   node scripts/grade-media.mjs
 *
 * Brief 2026-10-23 §9: one colour direction for Investment, Tax Advisory and
 * Property Purchase — warm and controlled, natural skin, deep blacks that keep
 * their detail, whites that sit on the interface ivory, moderate contrast — as
 * a system of image DERIVATIVES, never as a CSS filter.
 *
 * WHAT IT DOES, PER IMAGE
 *
 * Input is the existing web derivative in public/media (already cropped where
 * the registry says so). Originals in IMAGES/ and the repository root are never
 * read or written. Output is public/media/graded/<id>.webp plus a manifest.
 *
 *   1. Temperature — the image's measured red/blue balance is moved HALF-way
 *      toward one shared target, with the correction capped at ±6%. Images
 *      that are already warm are cooled a little and cool ones warmed a
 *      little, so the three landings meet at one temperature without any
 *      image being pushed hard.
 *   2. Contrast — a gentle 4% contrast around mid-grey.
 *   3. Range — blacks mapped to a floor of 4/255 (deep, with detail in dark
 *      clothes and interiors), whites mapped to the interface ivory
 *      (#FBF9F5 → 251/249/245), so a white wall in a photo sits on the page
 *      instead of glowing against it.
 *   4. Saturation — 3% down, to keep skin natural rather than orange.
 *
 * Everything is a single per-channel linear transform plus one saturation
 * step. It is deliberately mild: several images carry baked-in text, and the
 * brief forbids anything that would degrade it.
 */
import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/media/graded');
mkdirSync(outDir, { recursive: true });

export const GRADE = {
  name: 'sk-editorial-v1',
  /** Shared target for mean(R) / mean(B). Warm, controlled. */
  warmthTarget: 1.1,
  /** Fraction of the way toward the target each image is moved. */
  warmthPull: 0.5,
  /** Cap on the per-channel temperature gain. */
  warmthCap: 0.06,
  contrast: 1.04,
  blackFloor: 4,
  /** Interface ivory, --sk-web-ivory. */
  whitePoint: [251, 249, 245],
  saturation: 0.97,
  webpQuality: 82,
  maxWidth: 2000,
};

/** id + ungraded source, read from the registry so the two never drift. */
function registryEntries() {
  const ts = readFileSync(join(root, 'lib/media/approved-media.ts'), 'utf8');
  const entries = [];
  const re = /id: '([^']+)',\s*src: '([^']+)'/g;
  for (const m of ts.matchAll(re)) entries.push({ id: m[1], src: m[2] });
  return entries;
}

function ungradedPath(entry) {
  // Once graded, the registry keeps the previous derivative in `ungradedSrc`.
  const ts = readFileSync(join(root, 'lib/media/approved-media.ts'), 'utf8');
  const block = ts.slice(ts.indexOf(`id: '${entry.id}'`));
  const m = block.match(/ungradedSrc: '([^']+)'/);
  const src = m && block.indexOf(m[0]) < block.indexOf('}),') ? m[1] : entry.src;
  return join(root, 'public', src.replace(/^\//, ''));
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const round = (v, d = 4) => Math.round(v * 10 ** d) / 10 ** d;

async function grade(entry) {
  const input = ungradedPath(entry);
  if (!existsSync(input)) throw new Error(`missing input for ${entry.id}: ${input}`);

  const before = await sharp(input).stats();
  const [r, g, b] = before.channels.map((c) => c.mean);
  const ratio = r / b;

  // Half-way to the shared target, capped.
  const wanted = Math.pow(GRADE.warmthTarget / ratio, GRADE.warmthPull);
  const k = clamp(Math.sqrt(wanted), 1 - GRADE.warmthCap, 1 + GRADE.warmthCap);
  const warm = [k, 1, 1 / k];

  const c = GRADE.contrast;
  const a = [];
  const offset = [];
  for (let ch = 0; ch < 3; ch += 1) {
    const span = (GRADE.whitePoint[ch] - GRADE.blackFloor) / 255;
    a.push(round(c * warm[ch] * span));
    offset.push(round(GRADE.blackFloor + 128 * (1 - c) * warm[ch] * span, 3));
  }

  const target = join(outDir, `${entry.id}.webp`);
  const pipeline = sharp(input)
    .removeAlpha()
    .resize({ width: GRADE.maxWidth, withoutEnlargement: true })
    .linear(a, offset)
    .modulate({ saturation: GRADE.saturation })
    .webp({ quality: GRADE.webpQuality, effort: 5 });
  const info = await pipeline.toFile(target);

  const after = await sharp(target).stats();
  const [r2, , b2] = after.channels.map((ch) => ch.mean);
  return {
    id: entry.id,
    input: input.slice(root.length + 1).replace(/\\/g, '/'),
    output: `public/media/graded/${entry.id}.webp`,
    size: `${info.width}x${info.height}`,
    kb: Math.round(statSync(target).size / 1024),
    warmthBefore: round(ratio, 3),
    warmthAfter: round(r2 / b2, 3),
    temperatureGain: round(k, 4),
    meanBefore: [r, g, b].map((v) => Math.round(v)),
    meanAfter: after.channels.slice(0, 3).map((ch) => Math.round(ch.mean)),
  };
}

const results = [];
for (const entry of registryEntries()) results.push(await grade(entry));

writeFileSync(
  join(outDir, 'manifest.json'),
  `${JSON.stringify({ grade: GRADE, generated: new Date().toISOString().slice(0, 10), images: results }, null, 2)}\n`,
);
console.table(results.map(({ id, size, kb, warmthBefore, warmthAfter, temperatureGain }) => ({ id, size, kb, warmthBefore, warmthAfter, temperatureGain })));
