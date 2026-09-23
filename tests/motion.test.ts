import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Phase 2E motion system — the rules in docs/phase-2e-motion-system.md that a
 * test can hold. Visual quality still needs a human; these stop the system
 * from quietly drifting away from its safety properties.
 */

const root = resolve(__dirname, '..');

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const rel = (file: string) => relative(root, file).replace(/\\/g, '/');
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, ' ');

const webCss = walk(resolve(root, 'components/web'))
  .concat(walk(resolve(root, 'components/motion')))
  .filter((file) => file.endsWith('.module.css'));

describe('motion tokens', () => {
  const tokens = read('app/web-tokens.css');

  it('derives every web motion duration from the canonical motion layer', () => {
    const durations = [
      ...tokens.matchAll(/--sk-web-motion-(quick|reveal|unveil|settle|stagger):\s*([^;]+);/g),
    ];
    expect(durations.map((m) => m[1]).sort()).toEqual([
      'quick',
      'reveal',
      'settle',
      'stagger',
      'unveil',
    ]);
    for (const [, name, value] of durations) {
      expect(value, name).toMatch(/var\(--sk-motion-duration-(fast|reveal)\)/);
    }
  });

  it('uses the single canonical easing curve', () => {
    expect(tokens).toMatch(/--sk-web-motion-ease:\s*var\(--sk-motion-ease-standard\);/);
  });

  it('keeps raw durations out of the website stylesheets', () => {
    // A zero fallback such as `var(--sk-reveal-delay, 0ms)` is not a duration.
    const offenders = webCss.flatMap((file) => {
      const matches = stripComments(readFileSync(file, 'utf8')).match(
        /\b(?:[1-9]\d*|0\.\d*[1-9]\d*)m?s\b/g,
      );
      return matches ? [`${rel(file)}: ${matches.join(', ')}`] : [];
    });
    expect(offenders).toEqual([]);
  });

  it('adds no animation library', () => {
    const pkg = JSON.parse(read('package.json')) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    const all = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    expect(all.filter((name) => /gsap|framer|motion|lenis|anime|lottie/i.test(name))).toEqual([]);
  });
});

describe('reveal safety', () => {
  const reveal = read('components/motion/RevealOnScroll.tsx');
  const revealCss = read('components/motion/RevealOnScroll.module.css');

  it('never hides anything under reduced motion or without the observer', () => {
    expect(reveal).toMatch(/prefers-reduced-motion: reduce/);
    expect(reveal).toMatch(/typeof IntersectionObserver === 'undefined'/);
    expect(revealCss).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.hidden[\s\S]*opacity: 1/,
    );
  });

  it('never hides content that is already on screen when the script arrives', () => {
    expect(reveal).toMatch(/getBoundingClientRect\(\)\.top < window\.innerHeight\) \{\s*return;/);
  });

  it('keeps the fast-scroll and print safety nets', () => {
    expect(reveal).toContain("addEventListener('scroll', check, { passive: true })");
    expect(reveal).toContain("addEventListener('resize', check, { passive: true })");
    expect(reveal).toContain("addEventListener('beforeprint', reveal)");
  });

  it('only exposes data-reveal once armed, so descendant choreography is inert without script', () => {
    expect(reveal).toContain("data-reveal={armed ? (revealed ? 'shown' : 'pending') : undefined}");
  });
});

describe('entrance and scroll-linked effects', () => {
  const entrance = read('components/motion/Entrance.module.css');

  it('runs the first-viewport entrance only when motion is allowed', () => {
    const body = stripComments(entrance);
    const guarded = body.indexOf('@media (prefers-reduced-motion: no-preference)');
    expect(guarded).toBeGreaterThan(-1);
    // The only animation declarations live after the guard opens.
    expect(body.slice(0, guarded)).not.toMatch(/animation:/);
  });

  it('feature-detects scroll-driven animation and never binds it to scroll position alone', () => {
    for (const file of webCss) {
      const css = stripComments(readFileSync(file, 'utf8'));
      if (!css.includes('animation-timeline')) continue;
      expect(css, rel(file)).toMatch(/@supports \(animation-timeline: (view|scroll)\(\)\)/);
      expect(css, rel(file)).toMatch(/prefers-reduced-motion: no-preference/);
    }
  });

  it('gives every hero the shared entrance rather than a local one', () => {
    for (const hero of [
      'components/web/WebHero.tsx',
      'components/web/TaxHero.tsx',
      'components/web/PropertyPurchase.tsx',
      'components/web/TeamEditorial.tsx',
    ]) {
      expect(read(hero), hero).toContain("from '@/components/motion/Entrance.module.css'");
      expect(read(hero), hero).toContain('entrance.copy');
      expect(read(hero), hero).toContain('entrance.media');
    }
  });
});

describe('no animated figures', () => {
  it('never counts or tweens a number in a component', () => {
    // Illustrative figures are sample data; animating them upward would make
    // them read as live results. Shapes may draw; values may not move.
    const offenders = walk(resolve(root, 'components'))
      .filter((file) => file.endsWith('.tsx'))
      .filter((file) =>
        /countUp|animateValue|setInterval\(|toLocaleString\([^)]*\)\s*\+/.test(
          readFileSync(file, 'utf8'),
        ),
      )
      .map(rel);
    expect(offenders).toEqual([]);
  });
});

describe('reveal line — one rule for every trigger path', () => {
  const reveal = read('components/motion/RevealOnScroll.tsx');
  const rule = read('components/motion/revealLine.ts');

  it('observer and scroll fallback both ask the same rule', () => {
    const calls = reveal.match(/hasReachedRevealLine\(node!?, line\(\)\)/g) ?? [];
    expect(calls.length).toBe(2);
    expect(reveal).toContain('rootMargin: revealRootMargin(line())');
    // The old disagreeing triggers are gone.
    expect(reveal).not.toContain("'0px 0px -10% 0px'");
    expect(reveal).not.toMatch(/box\.top < window\.innerHeight/);
  });

  it('uses no timer to postpone arrivals', () => {
    expect(reveal).not.toMatch(/setTimeout/);
    expect(rule).not.toMatch(/setTimeout/);
  });

  it('places the line in the reading zone (70–78%) and keeps the page end reachable', async () => {
    const { readingZoneLine, revealRootMargin, EDGE_LINE } =
      await import('../components/motion/revealLine');
    for (const width of [320, 375, 390, 768, 1024, 1440]) {
      const line = readingZoneLine(width);
      expect(line).toBeGreaterThanOrEqual(0.7);
      expect(line).toBeLessThanOrEqual(0.78);
    }
    expect(revealRootMargin(0.72)).toBe('0px 0px -28% 0px');
    expect(revealRootMargin(EDGE_LINE)).toBe('0px 0px -0% 0px');
    expect(rule).toMatch(/atPageEnd/);
  });

  it('opts in the three service landings only; Team keeps the edge line', () => {
    for (const page of ['investment', 'tax-advisory', 'property-purchase']) {
      expect(read(`app/preview/${page}/page.tsx`)).toContain(
        '<RevealLineProvider line="reading-zone">',
      );
    }
    expect(read('app/preview/team/page.tsx')).not.toContain('RevealLineProvider');
    expect(read('components/web/TeamEditorial.tsx')).not.toContain('RevealLineProvider');
  });
});
