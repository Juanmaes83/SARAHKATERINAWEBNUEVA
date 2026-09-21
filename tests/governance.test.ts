import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(__dirname, '..');
const SOURCE_DIRS = ['app', 'components', 'lib', 'content'];

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

const sourceFiles = SOURCE_DIRS.flatMap((dir) => walk(resolve(root, dir)));

function read(file: string): string {
  return readFileSync(file, 'utf8');
}

function rel(file: string): string {
  return relative(root, file).replace(/\\/g, '/');
}

/**
 * Strips comments so a governance check measures what the code DOES, not what
 * a comment says about it.
 *
 * Without this, every rule documented in a comment ("no VITA Host reference",
 * "the canonical host is unresolved") would report itself as a violation.
 */
function stripComments(source: string): string {
  return (
    source
      // Block comments, including JSX {/* ... */}.
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      // Line comments, but never the // inside a URL scheme.
      .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
  );
}

function readCode(file: string): string {
  return stripComments(read(file));
}

describe('token discipline', () => {
  it('no component stylesheet hardcodes a colour', () => {
    // The canonical D4 consumption contract: components must not introduce raw
    // hex/rgb/hsl/oklch values. app/tokens.css and app/tokens.app.css are the
    // only files allowed to define values.
    const offenders = sourceFiles
      .filter((file) => file.endsWith('.module.css'))
      .flatMap((file) => {
        const matches = read(file).match(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/g);
        return matches ? [`${rel(file)}: ${matches.join(', ')}`] : [];
      });

    expect(offenders).toEqual([]);
  });

  it('no component stylesheet introduces an off-scale spacing value', () => {
    // Every length must come from a token. Allowed literals are the ones the
    // canonical system itself uses for hairlines, ratios and percentages.
    const ALLOWED = new Set(['0', '1px', '2px', '100%', '50%', '1', '0.25em', '0.2em']);

    const offenders = sourceFiles
      .filter((file) => file.endsWith('.module.css'))
      .flatMap((file) => {
        const bad: string[] = [];
        for (const match of read(file).matchAll(/:\s*([^;{]*?)\s*;/g)) {
          const declaration = match[1] ?? '';
          // Skip anything that is already a token reference or a keyframe unit.
          for (const length of declaration.matchAll(/(?<![\w-])(\d+(?:\.\d+)?(?:px|rem|em))/g)) {
            const value = length[1] ?? '';
            if (!ALLOWED.has(value) && !declaration.includes('var(--sk-')) {
              bad.push(`${rel(file)}: ${value} in "${declaration}"`);
            }
          }
        }
        return bad;
      });

    expect(offenders).toEqual([]);
  });
});

describe('PENDING_APPROVAL guards', () => {
  it('no public-facing component consumes --sk-app-text-muted', () => {
    // Work-order condition 8: text-muted has no approved value and must not be
    // used until one exists. It is declared only in the app token layer.
    const offenders = sourceFiles
      .filter((file) => !rel(file).startsWith('app/tokens.app.css'))
      .filter((file) => readCode(file).includes('--sk-app-text-muted'))
      .map(rel);

    expect(offenders).toEqual([]);
  });

  it('no production host is hardcoded anywhere in the source', () => {
    // The canonical host is an OPEN decision (non-www vs www). Every URL must
    // derive from NEXT_PUBLIC_SITE_URL.
    const offenders = sourceFiles
      .filter((file) => /sarahkaterina\.(com|es)/i.test(readCode(file)))
      .map(rel);

    expect(offenders).toEqual([]);
  });
});

describe('unapproved naming and claims', () => {
  it('does not use TEST-status or legacy naming in rendered content', () => {
    // "Property Decision Advisor" is TEST + INTERNAL_TEST_ONLY.
    // "Personal Shopper" is LEGACY wording.
    // Neither may appear in public-facing output.
    const forbidden = [/Property Decision Advisor/i, /Personal Shopper/i];

    const offenders = sourceFiles
      .filter((file) => file.endsWith('.tsx'))
      .flatMap((file) => {
        const content = readCode(file);
        return forbidden.filter((pattern) => pattern.test(content)).map(
          (pattern) => `${rel(file)}: ${pattern.source}`,
        );
      });

    expect(offenders).toEqual([]);
  });

  it('makes no reference to VITA Host or a group architecture', () => {
    // D-06 is still unexecuted and Property Management is held publicly.
    const offenders = sourceFiles
      .filter((file) => /VITA\s*Host|VitHost|Sarah Katerina Group/i.test(readCode(file)))
      .map(rel);

    expect(offenders).toEqual([]);
  });

  it('emits no Organization or Person JSON-LD', () => {
    // The legal entity, address, telephone, email and institutional descriptor
    // are all unconfirmed, so neither schema type may be asserted.
    const offenders = sourceFiles
      .filter((file) => file.endsWith('.tsx'))
      .filter((file) => /'@type':\s*'(Organization|Person|LocalBusiness)'/.test(readCode(file)))
      .map(rel);

    expect(offenders).toEqual([]);
  });
});

describe('secret hygiene', () => {
  it('contains no analytics, tag manager or pixel identifier', () => {
    const patterns = [
      /\bG-[A-Z0-9]{8,}\b/, // GA4
      /\bGTM-[A-Z0-9]{6,}\b/, // Google Tag Manager
      /\bUA-\d{4,}-\d+\b/, // Universal Analytics
      /\bAIza[0-9A-Za-z_-]{30,}\b/, // Google API key
      /\bsk_live_[0-9A-Za-z]{10,}\b/, // Stripe live key
      /\bghp_[0-9A-Za-z]{30,}\b/, // GitHub token
    ];

    const offenders = sourceFiles.flatMap((file) => {
      const content = readCode(file);
      return patterns
        .filter((pattern) => pattern.test(content))
        .map((pattern) => `${rel(file)}: ${pattern.source}`);
    });

    expect(offenders).toEqual([]);
  });
});
