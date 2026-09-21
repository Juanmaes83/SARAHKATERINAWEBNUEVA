/**
 * Deterministic tokens.json -> CSS custom property mapping.
 *
 * This reimplements the naming contract documented in
 * brand-system/tokens/README.md ("CSS naming") so the vendored tokens.css can
 * be checked against the vendored tokens.json rather than trusted.
 *
 *   color.primitive.forest                    -> --sk-color-forest
 *   color.semantic.background.page            -> --sk-color-bg-page
 *   color.semantic.action.primary.background  -> --sk-color-action-primary-bg
 *   spacing.primitive.24                      -> --sk-space-24
 *   typography.semantic.body.size             -> --sk-type-body-size
 */

/** Top-level group -> CSS variable segment. */
const GROUP_PREFIX: Record<string, string> = {
  color: 'color',
  opacity: 'opacity',
  font: 'font',
  typography: 'type',
  spacing: 'space',
  radius: 'radius',
  border: 'border',
  shadow: 'shadow',
  layout: 'layout',
  motion: 'motion',
  focus: 'focus',
};

/** Path segments that carry architecture, not naming. */
const LAYER_SEGMENTS = new Set(['primitive', 'semantic']);

/** Segment renames applied by the canonical generator. */
const SEGMENT_ALIAS: Record<string, string> = {
  background: 'bg',
};

export interface TokenEntry {
  /** Dotted path in tokens.json, e.g. "color.semantic.background.page". */
  readonly path: string;
  /** CSS custom property name, e.g. "--sk-color-bg-page". */
  readonly cssName: string;
  /** Resolved CSS value: a literal, or var(--sk-...) for an alias. */
  readonly cssValue: string;
  /** Raw $value from tokens.json. */
  readonly rawValue: string | number;
}

interface TokenNode {
  $type?: string;
  $value?: unknown;
  $description?: string;
  [key: string]: unknown;
}

function isTokenLeaf(node: unknown): node is TokenNode {
  return typeof node === 'object' && node !== null && '$value' in node;
}

export function pathToCssName(path: string): string {
  const [group, ...rest] = path.split('.');
  const prefix = GROUP_PREFIX[group ?? ''];

  if (!prefix) {
    throw new Error(`Unknown token group "${group}" in path "${path}"`);
  }

  const segments = rest
    .filter((segment) => !LAYER_SEGMENTS.has(segment))
    .map((segment) => SEGMENT_ALIAS[segment] ?? segment);

  return `--sk-${[prefix, ...segments].join('-')}`;
}

const ALIAS_PATTERN = /^\{([A-Za-z0-9.\-_]+)\}$/;

export function resolveValue(rawValue: string | number): string {
  if (typeof rawValue === 'number') {
    return String(rawValue);
  }

  const match = ALIAS_PATTERN.exec(rawValue);
  if (match?.[1]) {
    return `var(${pathToCssName(match[1])})`;
  }

  return rawValue;
}

/** Flattens tokens.json into the full list of expected CSS variables. */
export function flattenTokens(tokens: Record<string, unknown>): TokenEntry[] {
  const entries: TokenEntry[] = [];

  function walk(node: unknown, path: readonly string[]): void {
    if (isTokenLeaf(node)) {
      const rawValue = node.$value;
      if (typeof rawValue !== 'string' && typeof rawValue !== 'number') {
        throw new Error(`Unsupported $value type at "${path.join('.')}"`);
      }

      const dotted = path.join('.');
      entries.push({
        path: dotted,
        cssName: pathToCssName(dotted),
        cssValue: resolveValue(rawValue),
        rawValue,
      });
      return;
    }

    if (typeof node !== 'object' || node === null) return;

    for (const [key, value] of Object.entries(node)) {
      // $version / $status and other metadata keys are not tokens.
      if (key.startsWith('$')) continue;
      walk(value, [...path, key]);
    }
  }

  walk(tokens, []);
  return entries;
}

/** Parses `--name: value;` declarations out of a CSS file. */
export function parseCssVariables(css: string): Map<string, string> {
  const result = new Map<string, string>();
  const pattern = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(css)) !== null) {
    const name = match[1];
    const value = match[2];
    if (name && value) {
      result.set(name, value.trim());
    }
  }

  return result;
}

/** Normalises whitespace so formatting differences are not false failures. */
export function normalizeValue(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}
