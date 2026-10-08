import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Entity consistency (sarahkaterina strategy/technical/ENTITY-SEO-GEO-ALIGNMENT.md,
// owner direction 2026-10-07): one buyer-side entity across every public page.
const root = resolve(__dirname, '..');
const contentDir = resolve(root, 'content/en');
// String literals only: comments may document what is deliberately left out.
const literals = (source: string) =>
  [...source.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, '').matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)].map(
    (m) => m[1] ?? m[2] ?? '',
  );
const files = readdirSync(contentDir).filter((f) => f.endsWith('.ts'));
const strings = files.flatMap((f) =>
  literals(readFileSync(resolve(contentDir, f), 'utf8')).map((text) => ({ file: f, text })),
);
const offenders = (pattern: RegExp) => strings.filter(({ text }) => pattern.test(text)).map(({ file, text }) => `${file}: ${text}`);

describe('entity consistency across public copy', () => {
  it('names the authority precisely: SUMA Gestión Tributaria, not a generalised Spanish tax authority', () => {
    expect(offenders(/Spain.s tax administration|Spain.s Tax Administration|regional tax authority/)).toEqual([]);
    expect(offenders(/\bSUMA\b(?! Gestión Tributaria)/)).toEqual([]);
  });

  it('never positions Sarah as an agency, realtor, broker, property manager or group', () => {
    expect(
      offenders(/estate agen(t|cy)|real estate agency|\brealtor|mortgage broker|property consultant|consultor inmobiliario|VITA Host|Sarah Katerina Group/i),
    ).toEqual([]);
  });
});
