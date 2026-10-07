import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Description-list structure (Lighthouse/axe `definition-list` and `dlitem`).
 *
 * HTML allows a <dl> to contain dt/dd groups, each optionally wrapped in ONE
 * <div>. Anything else between the <dl> and its dt/dd — a second <div>, an
 * icon, a component — makes the list invalid for assistive technology. This
 * is a source-level check over every JSX <dl> in the app: it tokenises the
 * tags inside each <dl>…</dl> and asserts the allowed nesting.
 */

const root = resolve(__dirname, '..');

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return tsxFiles(path);
    return path.endsWith('.tsx') ? [path] : [];
  });
}

const files = ['app', 'components'].flatMap((d) => tsxFiles(resolve(root, d)));

/** Every <dl …>…</dl> segment of a source file (dl elements are never nested here). */
function dlSegments(source: string): string[] {
  const segments: string[] = [];
  const re = /<dl\b[\s\S]*?<\/dl>/g;
  for (const match of source.matchAll(re)) segments.push(match[0]);
  return segments;
}

/** Problems in one segment: each dt/dd must sit directly in the dl or in one div. */
function problems(segment: string): string[] {
  const found: string[] = [];
  const stack: string[] = [];
  const tag = /<(\/?)([A-Za-z][\w.]*)((?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}|[^>{])*?)(\/?)>/g;
  for (const [, closing, rawName, , selfClosing] of segment.matchAll(tag)) {
    const name = rawName ?? '';
    if (closing) {
      stack.pop();
      continue;
    }
    // Path from the dl (stack[0]) to this element, excluding the dl itself.
    const insideItem = stack.some((t) => t === 'dt' || t === 'dd');
    const path = stack.slice(1);
    if (name !== 'dl' && !insideItem) {
      if (name === 'dt' || name === 'dd') {
        const ok = path.length === 0 || (path.length === 1 && path[0] === 'div');
        if (!ok) found.push(`<${name}> under ${['dl', ...path].join(' > ')}`);
      } else if (name === 'div') {
        if (path.length !== 0) found.push(`<div> under ${['dl', ...path].join(' > ')}`);
      } else {
        found.push(`<${name}> outside dt/dd under ${['dl', ...path].join(' > ')}`);
      }
    }
    if (!selfClosing) stack.push(name);
  }
  return found;
}

describe('description lists', () => {
  it('finds the hero signal lists the check is meant to cover', () => {
    const withDl = files.filter((f) => dlSegments(readFileSync(f, 'utf8')).length > 0);
    const rel = withDl.map((f) => relative(root, f));
    expect(rel).toContain('components/web/WebHero.tsx');
    expect(rel).toContain('components/web/TaxHero.tsx');
  });

  it('flags the former invalid pattern (div > svg + div > dt/dd)', () => {
    const invalid = `<dl className={s.signals}>
      {items.map((x) => (
        <div key={x.id} className={s.signal}>
          <Icon name="pin" />
          <div>
            <dt>{x.a}</dt>
            <dd>{x.b}</dd>
          </div>
        </div>
      ))}
    </dl>`;
    expect(problems(invalid).length).toBeGreaterThan(0);
  });

  it('only wraps dt/dd groups in a single div, with nothing else between', () => {
    const report = files.flatMap((f) =>
      dlSegments(readFileSync(f, 'utf8')).flatMap((segment) =>
        problems(segment).map((p) => `${relative(root, f)}: ${p}`),
      ),
    );
    expect(report).toEqual([]);
  });
});
