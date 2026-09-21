import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  flattenTokens,
  normalizeValue,
  parseCssVariables,
  pathToCssName,
} from '../lib/tokens/parity';

const root = resolve(__dirname, '..');
const tokensJsonPath = resolve(root, 'lib/tokens/tokens.json');
const tokensCssPath = resolve(root, 'app/tokens.css');
const tokensAppCssPath = resolve(root, 'app/tokens.app.css');

const tokensJsonRaw = readFileSync(tokensJsonPath);
const tokensCssRaw = readFileSync(tokensCssPath, 'utf8');
const tokensAppCssRaw = readFileSync(tokensAppCssPath, 'utf8');

/**
 * Git blob hash of the canonical brand-system/tokens/tokens.json at the commit
 * it was copied from. Recomputed here so any edit to the vendored copy — even
 * a whitespace change — fails the build instead of silently drifting from the
 * source of truth.
 *
 * Source: Juanmaes83/sarahkaterina
 * Path:   brand-system/tokens/tokens.json
 * Commit: 5a88f91062c2597b39b81c0bfba22dfc7afa8c67
 */
const CANONICAL_TOKENS_BLOB_SHA = '6370626ca0a53c05d92bd80f749c67172bed171c';

function gitBlobSha(content: Buffer): string {
  const header = Buffer.from(`blob ${content.length}\0`, 'utf8');
  return createHash('sha1').update(Buffer.concat([header, content])).digest('hex');
}

describe('canonical token provenance', () => {
  it('vendored tokens.json is byte-identical to the canonical source', () => {
    expect(gitBlobSha(tokensJsonRaw)).toBe(CANONICAL_TOKENS_BLOB_SHA);
  });

  it('declares the expected canonical version', () => {
    const tokens = JSON.parse(tokensJsonRaw.toString('utf8'));
    expect(tokens.$version).toBe('0.1.0');
  });
});

describe('tokens.json -> tokens.css parity', () => {
  const tokens = JSON.parse(tokensJsonRaw.toString('utf8')) as Record<string, unknown>;
  const entries = flattenTokens(tokens);
  const cssVars = parseCssVariables(tokensCssRaw);

  it('flattens a non-trivial number of tokens', () => {
    expect(entries.length).toBeGreaterThan(150);
  });

  it('defines every token from tokens.json in tokens.css', () => {
    const missing = entries.filter((entry) => !cssVars.has(entry.cssName));
    expect(missing.map((entry) => `${entry.path} -> ${entry.cssName}`)).toEqual([]);
  });

  it('resolves every token to the same value in both files', () => {
    const mismatched = entries
      .filter((entry) => {
        const actual = cssVars.get(entry.cssName);
        return actual !== undefined && normalizeValue(actual) !== normalizeValue(entry.cssValue);
      })
      .map((entry) => `${entry.cssName}: expected "${entry.cssValue}", found "${cssVars.get(entry.cssName)}"`);

    expect(mismatched).toEqual([]);
  });

  it('adds no extra variable to tokens.css beyond tokens.json', () => {
    const expected = new Set(entries.map((entry) => entry.cssName));
    const extra = [...cssVars.keys()].filter((name) => !expected.has(name));
    expect(extra).toEqual([]);
  });

  it('produces no duplicate CSS variable names', () => {
    const names = entries.map((entry) => entry.cssName);
    expect(names.length).toBe(new Set(names).size);
  });
});

describe('naming contract', () => {
  it.each([
    ['color.primitive.forest', '--sk-color-forest'],
    ['color.semantic.background.page', '--sk-color-bg-page'],
    ['color.semantic.action.primary.background', '--sk-color-action-primary-bg'],
    ['spacing.primitive.24', '--sk-space-24'],
    ['typography.semantic.body.size', '--sk-type-body-size'],
  ])('maps %s to %s', (path, expected) => {
    expect(pathToCssName(path)).toBe(expected);
  });
});

describe('app-level token layer', () => {
  const appVars = parseCssVariables(tokensAppCssRaw);
  const canonicalVars = parseCssVariables(tokensCssRaw);

  it('namespaces every genuinely new token under --sk-app-', () => {
    const offenders = [...appVars.keys()].filter(
      (name) => !name.startsWith('--sk-app-') && !canonicalVars.has(name),
    );
    expect(offenders).toEqual([]);
  });

  it('introduces no raw colour value', () => {
    // The D4 consumption contract forbids raw hex/rgb/hsl/oklch in consuming
    // code. Every colour in the app layer must alias a canonical token.
    const rawColours = [...appVars.entries()]
      .filter(([, value]) => /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?|oklch)\(/i.test(value))
      .map(([name, value]) => `${name}: ${value}`);

    expect(rawColours).toEqual([]);
  });

  it('overrides only the two font-family tokens, and only to bind the loader', () => {
    const overrides = [...appVars.keys()].filter((name) => canonicalVars.has(name));
    expect(overrides.sort()).toEqual(['--sk-font-family-body', '--sk-font-family-display']);
  });

  it('declares the semantic roles the foundation requires', () => {
    const required = [
      '--sk-app-background-primary',
      '--sk-app-background-secondary',
      '--sk-app-surface',
      '--sk-app-text-primary',
      '--sk-app-text-secondary',
      '--sk-app-text-muted',
      '--sk-app-accent',
      '--sk-app-border-subtle',
      '--sk-app-action-primary',
      '--sk-app-action-secondary',
      '--sk-app-focus-ring',
      '--sk-app-danger',
      '--sk-app-success',
    ];

    const missing = required.filter((name) => !appVars.has(name));
    expect(missing).toEqual([]);
  });
});
