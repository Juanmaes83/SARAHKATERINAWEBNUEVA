import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as purchase from '../content/en/property-purchase';

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const page = read('app/preview/property-purchase/page.tsx');
const components = read('components/web/PropertyPurchase.tsx');

describe('Property Purchase preview governance', () => {
  it('is a laboratory route with controlled metadata', () => {
    expect(page).toMatch(/path:\s*'\/preview\/property-purchase'/);
    expect(page).toMatch(/laboratory:\s*true/);
  });

  it('keeps the prototype notice before navigation', () => {
    expect(page.indexOf('<PrototypeBanner')).toBeLessThan(page.indexOf('<WebHeader'));
  });

  it('renders one h1 and section headings below it', () => {
    expect(components.match(/<h1/g) ?? []).toHaveLength(1);
    expect(page).not.toMatch(/<h1/);
    expect(components).toMatch(/<h2/g);
    expect(components).not.toMatch(/<h[4-6]/);
  });
});

describe('Property Purchase composition', () => {
  it('includes each template band in order', () => {
    const bands = [
      'PurchaseHero',
      'PurchaseTrustBand',
      'AudienceBand',
      'OneFileBand',
      'FileTrackerBand',
      'ProcessBand',
      'BeforeSignBand',
      'WorriesBand',
      'ServicesBand',
      'AuthorityBand',
      'CasesBand',
      'JourneyBand',
      'WebFaq',
      'FinalCtaBand',
    ];
    const offsets = bands.map((band) => page.indexOf(`<${band}`));
    expect(offsets.every((offset) => offset >= 0)).toBe(true);
    expect(offsets).toEqual([...offsets].sort((a, b) => a - b));
  });

  it('provides the seven file stages and six process steps from the template', () => {
    expect(purchase.fileStages).toHaveLength(7);
    expect(purchase.process.steps).toHaveLength(6);
  });

  it('keeps every case result withheld', () => {
    expect(purchase.cases.items).toHaveLength(3);
    for (const item of purchase.cases.items) {
      expect(item.body).toContain('withheld');
    }
  });

  it('uses only the two live purchase calculator entry points', () => {
    expect(components).toContain('toolKey="purchaseTax"');
    expect(components).toContain('toolKey="realCashNeeded"');
    expect(components).not.toContain('toolKey="askingPrice"');
  });
});
