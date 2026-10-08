import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * A8 (2026-10-08) — two gold eyebrows on the soft ivory surface of
 * /preview/property-purchase measured 4.41:1 (axe color-contrast). They now
 * use the existing --sk-web-gold-strong token; no colour value was added.
 */
const root = resolve(__dirname, '..');
const tokens = readFileSync(resolve(root, 'app/web-tokens.css'), 'utf8');
const css = readFileSync(resolve(root, 'components/web/PropertyPurchase.module.css'), 'utf8');

function token(name: string): string {
  const match = tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6});`, 'i'));
  if (!match?.[1]) throw new Error(`token ${name} not found`);
  return match[1];
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
}

describe('A8 — gold eyebrows on the soft ivory surface', () => {
  it('documents why: gold fails AA for small text on ivory-soft, gold-strong passes', () => {
    const soft = token('sk-web-ivory-soft');
    expect(contrast(token('sk-web-gold'), soft)).toBeLessThan(4.5);
    expect(contrast(token('sk-web-gold-strong'), soft)).toBeGreaterThanOrEqual(4.5);
  });

  it('switches only the two soft-surface eyebrows and the kicker to gold-strong', () => {
    expect(css).toMatch(
      /\.trackerHeading > \.eyebrow,\s*\.goodIdeaCopy > \.eyebrow \{\s*color: var\(--sk-web-gold-strong\);/,
    );
    expect(css).toMatch(/\.goodIdeaKicker \{[^}]*color: var\(--sk-web-gold-strong\);/);
    // The shared eyebrow keeps the base gold everywhere else on the page.
    expect(css).toMatch(/\n\.eyebrow \{[^}]*color: var\(--sk-web-gold\);/);
  });
});
