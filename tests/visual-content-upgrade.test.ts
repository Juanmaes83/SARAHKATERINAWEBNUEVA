import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { hero as purchaseHero, process as purchaseProcess } from '../content/en/property-purchase';
import { report as investmentReport } from '../content/en/investment';
import { report as taxReport } from '../content/en/tax-advisory';

/**
 * Phase 2E visual content upgrade — brief
 * `IMAGES/MEJORAS 23 OCTUBRE/PHASE-2E-VISUAL-CONTENT-UPGRADE-BRIEF.md`.
 * Holds the rules a test can hold; the visual result still needs Juanma.
 */

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const rel = (file: string) => relative(root, file).replace(/\\/g, '/');
/** Code only: comments that document a withheld figure are not rendered. */
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

describe('reference figures are never copied', () => {
  it('contains none of the unapproved figures, places or quotes shown in the references', () => {
    // From the five reference captures: results, prices, percentages, towns
    // and timings that are not in any governed document.
    const forbidden = [
      /24[.,]500/,
      /\+42\s?%/,
      /6,1\s?%/,
      /2,8x/,
      /-18\s?%/,
      /8[.,]200/,
      /\b(Altea|Calpe|J[aá]vea)\b/,
      /1[–-]2 d[ií]as|2[–-]6 semanas|5 d[ií]as laborables/,
      /Cliente de (Reino Unido|Alemania|Pa[ií]ses Bajos)/,
    ];
    const offenders = ['components', 'content', 'app']
      .flatMap((dir) => walk(resolve(root, dir)))
      .filter((file) => /\.(tsx?|css)$/.test(file))
      .flatMap((file) => {
        // Claim `note` fields document what was withheld; they never render.
        const source = code(readFileSync(file, 'utf8')).replace(/note:\s*'(?:[^'\\]|\\.)*'/g, '');
        return forbidden.filter((re) => re.test(source)).map((re) => `${rel(file)}: ${re.source}`);
      });
    expect(offenders).toEqual([]);
  });
});

describe('Property Purchase corrections', () => {
  const bands = read('components/web/PropertyPurchase.tsx');

  it('shows "The file, front to back" once — on the tracker only', () => {
    expect((bands.match(/process\.eyebrow\.text/g) ?? []).length).toBe(1);
    expect(bands).toContain('process.stepsEyebrow.text');
    expect(purchaseProcess.stepsEyebrow.text).not.toBe(purchaseProcess.eyebrow.text);
  });

  it('captions the hero visual as what it shows, without identifying anyone else', () => {
    // Phase 2F: the hero is the buyer-side meeting video; the caption follows it.
    expect(purchaseHero.visualBody.text).toMatch(/Sarah/);
    expect(purchaseHero.visualBody.text).toMatch(/buyer’s side/);
    expect(purchaseHero.visualBody.text).not.toMatch(/client|an international buyer|keys/i);
  });
});

describe('report explorer', () => {
  const explorer = read('components/web/ReportExplorer.tsx');

  it('is shared by Investment and Tax Advisory', () => {
    expect(read('components/web/WebBands.tsx')).toContain('<ReportExplorer');
    expect(read('components/web/TaxBands.tsx')).toContain('<ReportExplorer');
  });

  it('follows the WAI-ARIA tabs pattern with one tab stop and arrow, Home and End keys', () => {
    expect(explorer).toContain('role="tablist"');
    expect(explorer).toContain('role="tab"');
    expect(explorer).toContain("role: 'tabpanel'");
    expect(explorer).toContain('aria-selected={index === active}');
    expect(explorer).toContain('tabIndex={index === active ? 0 : -1}');
    for (const key of ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']) {
      expect(explorer).toContain(key);
    }
  });

  it('renders every panel before hydration, so nothing is hidden without JavaScript', () => {
    expect(explorer).toContain('const shown = !enhanced || index === active;');
    expect(explorer).toContain('useEffect(() => setEnhanced(true), [])');
  });

  it('gives every panel a stated decision, marked as proposed copy', () => {
    for (const decision of [
      ...Object.values(investmentReport.decisions),
      ...Object.values(taxReport.decisions),
    ]) {
      expect(decision.status).toBe('proposal');
      expect(decision.note).toMatch(/Phase 2E proposed copy/);
    }
  });

  it('labels every panel illustrative and never animates a value', () => {
    expect(explorer).toMatch(/>Illustrative</);
    expect(explorer).not.toMatch(/setInterval|requestAnimationFrame|countUp/);
  });
});

describe('scope', () => {
  it('leaves Team untouched by the new appearance and components', () => {
    const team = read('components/web/TeamEditorial.tsx');
    expect(team).not.toContain('ReportExplorer');
    expect(team).not.toContain('appearance=');
  });

  it('keeps the Tax narrative order: context, process, calendar, report, concerns', () => {
    const page = read('app/preview/tax-advisory/page.tsx');
    const order = [
      '<TaxContextBand',
      '<TaxProcessBand',
      '<TaxCalendarBand',
      '<TaxReportBand',
      '<TaxConcernsBand',
    ];
    const at = order.map((tag) => page.indexOf(tag));
    expect(at.every((i) => i > -1)).toBe(true);
    expect(at).toEqual([...at].sort((a, b) => a - b));
    expect(page).not.toContain('<TaxTrustBand');
  });
});

describe('common grade', () => {
  it('is produced by the committed script and recorded in a manifest', () => {
    const manifest = JSON.parse(read('public/media/graded/manifest.json')) as {
      grade: { name: string };
      images: { id: string; kb: number }[];
    };
    expect(manifest.grade.name).toBe('sk-editorial-v1');
    // 14 Phase 2E images plus the seven Phase 2F case and One File images,
    // the six October additions, and the two Home discovery images (2026-09-29).
    expect(manifest.images.length).toBe(29);
    expect(manifest.images.filter((image) => image.kb > 250)).toEqual([]);
    // Reads web derivatives only; the originals are never an input.
    expect(code(read('scripts/grade-media.mjs'))).not.toMatch(/IMAGES\//);
  });

  it('uses no CSS filter on photographs', () => {
    const offenders = walk(resolve(root, 'components'))
      .filter((file) => file.endsWith('.module.css'))
      .filter((file) =>
        /(^|[^-])filter\s*:/m.test(readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')),
      )
      .map(rel);
    expect(offenders).toEqual([]);
  });
});
