import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BUYER_SYSTEM_EXPERIENCES, resolveEntryPoint } from '@/lib/buyer-system/links';
import {
  BUYER_TOOLS_LABEL,
  HOME_PREVIEW_ROUTE,
  UNIFIED_WEB_NAV,
} from '@/content/en/site-navigation';

const root = resolve(__dirname, '..');
const read = (file: string) => readFileSync(resolve(root, file), 'utf8');
const pages = [
  ['home', HOME_PREVIEW_ROUTE],
  ['property-purchase', '/preview/property-purchase'],
  ['investment', '/preview/investment'],
  ['tax-advisory', '/preview/tax-advisory'],
  ['team', '/preview/team'],
  ['contact', '/preview/contact'],
] as const;

describe('approved unified preview navigation', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });
  it('exposes Home, the four real landing routes and Contact in one order', () => {
    expect(UNIFIED_WEB_NAV).toEqual([
      { href: '/preview/home', label: 'Home' },
      { href: '/preview/property-purchase', label: 'Property Purchase' },
      { href: '/preview/investment', label: 'Investment' },
      { href: '/preview/tax-advisory', label: 'Tax Advisory' },
      { href: '/preview/team', label: 'Team' },
      // Added 2026-09-29 (Juanma) once Contact had working destinations.
      { href: '/preview/contact', label: 'Contact' },
    ]);

    for (const content of ['home', 'property-purchase', 'investment', 'tax-advisory', 'team']) {
      expect(read(`content/en/${content}.ts`)).not.toContain('export const nav =');
      expect(read(`content/en/${content}.ts`)).not.toContain('export const headerCta =');
    }
  });

  it.each(pages)('%s uses the shared navigation and governed Buyer Tools CTA', (route, path) => {
    const page = read(`app/preview/${route}/page.tsx`);
    expect(page).toContain('nav={UNIFIED_WEB_NAV}');
    expect(page).toContain('ctaLabel={BUYER_TOOLS_LABEL}');
    expect(page).toContain('brandHref={HOME_PREVIEW_ROUTE}');
    expect(page).toContain('showLanguageSwitcher={false}');
    expect(page).toContain('buyerToolsSourcePage=');
    // Home since 2026-09-29, every route since 2026-10-01: no preview strip on
    // the pages shown to the client. Each stays noindex under /preview.
    expect(page).not.toContain('<PrototypeBanner');
    expect(page).toContain('laboratory: true');
    expect(path).toMatch(/^\/preview\//);
  });

  it('offers only the two live tools through the shared adapter', () => {
    vi.stubEnv('NEXT_PUBLIC_BUYER_SYSTEM_URL', 'https://sarah-katerina-buyer-system.vercel.app');
    expect(BUYER_TOOLS_LABEL).toBe('Buyer Tools');
    expect(resolveEntryPoint('purchaseTax').href).toBeTruthy();
    expect(resolveEntryPoint('realCashNeeded').href).toBeTruthy();
    expect(BUYER_SYSTEM_EXPERIENCES.askingPrice.availability).toBe('limited-go');
    expect(resolveEntryPoint('askingPrice').href).toBeNull();
    expect(resolveEntryPoint('taxExposure').href).toBeNull();

    const header = read('components/web/WebHeader.tsx');
    expect(header).toContain("['purchaseTax', 'realCashNeeded']");
    expect(header).not.toContain("resolveEntryPoint('askingPrice')");
    expect(header).not.toContain("resolveEntryPoint('taxExposure')");
    expect(read('components/web/BuyerToolLink.tsx')).not.toMatch(
      /URLSearchParams|searchParams|\?[a-z]+=/,
    );
  });

  it('marks route state and keeps desktop and mobile tool choices accessible', () => {
    const header = read('components/web/WebHeader.tsx');
    expect(header).toContain('usePathname');
    expect(header).toContain('aria-current={');
    expect(header).toContain('aria-expanded={toolsOpen}');
    // Phase 2B: the panel is referenced only while it is rendered.
    expect(header).toContain('aria-controls={toolsOpen ? toolsPanelId : undefined}');
    expect(header).toContain("event.key === 'Escape'");
    expect(header.match(/<BuyerToolLink/g)).toHaveLength(2);
  });
});
