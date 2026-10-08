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
    // Phase 2B (2026-10-08): the FAQ carries its internal-link map.
    expect(editorial).toContain('<WebFaq content={faq} related={FAQ_RELATED.team} />');
    expect(editorial).toContain('<WebLinkButton');
    expect(editorial).toContain('<RevealOnScroll');
  });

  it('uses next/image with responsive sizes and one authored h1', () => {
    expect(editorial).toContain("import Image from 'next/image'");
    expect(editorial.match(/<h1\b/g)).toHaveLength(1);
    expect(editorial).toContain('sizes=');
    expect(editorial).not.toMatch(/<img\b/);
  });

  it('preserves the full-width hero composition and keeps the provisional photograph off the page', () => {
    const css = read('components/web/TeamEditorial.module.css');
    expect(editorial).toContain("teamHero from '@/public/team/optimized/team-hero.webp'");
    // 2026-10-01: the event photograph (EQUIPO_SARAHKATERINA3, unidentified
    // people and organisations) is no longer rendered; the band keeps its copy.
    expect(editorial).not.toContain('team-network.webp');
    expect(css).toMatch(/\.heroFrame\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
    expect(css).toMatch(/\.heroImage\s*\{[^}]*object-fit:\s*contain/s);
    expect(css).not.toMatch(/\.heroImage\s*\{[^}]*object-fit:\s*cover/s);

    const teamPosition = editorial.indexOf('<TeamBand />');
    const networkPosition = editorial.indexOf('<NetworkBand />');
    const processPosition = editorial.indexOf('<ProcessBand />');
    expect(teamPosition).toBeGreaterThan(-1);
    expect(networkPosition).toBeGreaterThan(teamPosition);
    expect(processPosition).toBeGreaterThan(networkPosition);
    // No internal label on the page shown to the client, and no Sarah mark:
    // she reviewed the band's copy (REVISION WEB. Team.docx).
    expect(content + editorial).not.toMatch(/PROVISIONAL|NOT FOR PRODUCTION/);
    expect(editorial).not.toContain('<SarahReviewMark');
  });

  it('keeps identity and held-service boundaries explicit', () => {
    // Phase 2H: full names supplied by Sarah; no other surname is added.
    expect(content).toContain("name: 'Igor Veselov'");
    expect(content).toContain("name: 'Óscar Gonzalez'");
    expect(content).toContain("name: 'Elsa Quirós Pérez'");
    // REVISION WEB. Team.docx: "Y el texto de abajo hay que eliminarlo" — the
    // identity note is gone from the page and from the image alt texts.
    expect(editorial).not.toMatch(/no fourth person|identity\s+is inferred/);
    expect(content + editorial).not.toMatch(/identities are not assigned in this preview/);
    // No photograph is attached to a name, and no "Portrait pending" placeholder
    // is shown: no named, approved individual photograph exists (Juanma,
    // 2026-09-30). The cards carry their text only.
    expect(editorial).not.toContain('Portrait pending');
    expect(editorial).not.toMatch(/team-member|portrait-(elsa|oscar|igor)/i);
  });

  it('removes the two blocks Sarah asked to remove, keeping the independence claim', () => {
    expect(editorial).not.toContain('function IndependenceBand');
    expect(editorial).not.toContain('office-sign.webp');
    expect(editorial).not.toContain('office-workspace.webp');
    expect(content).not.toContain("href: '#independence'");
    // The confirmed statement still answers the FAQ.
    expect(content).toMatch(/text: 'The buyer is the client\. The service is paid exclusively/);
    expect([content, editorial].join('\n')).not.toMatch(
      /VITA Host|Property Management|Sarah Katerina Group/,
    );
  });

  it('structures Spanish copy without creating a route or hreflang', () => {
    expect(read('content/es/team.ts')).toContain('export const teamEs');
    expect(page).not.toMatch(/alternates|hreflang|languages/);
  });
});
