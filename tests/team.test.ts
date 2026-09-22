import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { isLaboratoryRoute } from '@/lib/seo/config';

const read = (path: string) => readFileSync(path, 'utf8');
const page = read('app/preview/team/page.tsx');
const editorial = read('components/web/TeamEditorial.tsx');
const content = read('content/en/team.ts');
const sitemap = read('app/sitemap.ts');

describe('team editorial preview', () => {
  it('stays in the governed preview namespace and out of the sitemap', () => {
    expect(isLaboratoryRoute('/preview/team')).toBe(true);
    expect(page).toMatch(/path:\s*'\/preview\/team'/);
    expect(page).toMatch(/laboratory:\s*true/);
    expect(sitemap).not.toContain('/preview/team');
  });

  it('reuses the shared chrome, FAQ, buttons and motion', () => {
    expect(page).toContain('<WebHeader');
    expect(page).toContain('<WebFooter');
    expect(editorial).toContain('<WebFaq content={faq} />');
    expect(editorial).toContain('<WebLinkButton');
    expect(editorial).toContain('<RevealOnScroll');
  });

  it('uses next/image with responsive sizes and one authored h1', () => {
    expect(editorial).toContain("import Image from 'next/image'");
    expect(editorial.match(/<h1\b/g)).toHaveLength(1);
    expect(editorial).toContain('sizes=');
    expect(editorial).not.toMatch(/<img\b/);
  });

  it('keeps identity and held-service boundaries explicit', () => {
    expect(content).toContain("name: 'Igor'");
    expect(content).toContain("name: 'Oscar'");
    expect(content).not.toMatch(/Oscar\s+[A-Z]/);
    expect(editorial).toMatch(/no fourth person or individual identity\s+is inferred/);
    expect([content, editorial].join('\n')).not.toMatch(
      /VITA Host|Property Management|Sarah Katerina Group/,
    );
  });

  it('structures Spanish copy without creating a route or hreflang', () => {
    expect(read('content/es/team.ts')).toContain('export const teamEs');
    expect(page).not.toMatch(/alternates|hreflang|languages/);
  });
});
