import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { isLaboratoryRoute } from '@/lib/seo/config';
import {
  BUYER_SYSTEM_EXPERIENCES,
  VERIFIED_BUYER_SYSTEM_ORIGIN,
  resolveEntryPoint,
} from '@/lib/buyer-system/links';
import { APPROVED_PROMISE } from '@/lib/content/claims';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { APPROVED_VIDEO } from '@/lib/media/approved-video';
import {
  discovery,
  faq,
  footer,
  hero,
  process,
  seo,
  services,
  side,
  trust,
  voices,
} from '@/content/en/home';

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const page = read('app/preview/home/page.tsx');
const component = read('components/web/HomePreview.tsx');
const rootPage = read('app/page.tsx');
const reviewRecord = read('docs/home-buyer-system-preview.md');

describe('Home preview route', () => {
  it('exists only in the preview namespace and leaves / unchanged', () => {
    expect(isLaboratoryRoute('/preview/home')).toBe(true);
    expect(page).toContain("path: '/preview/home'");
    expect(page).toContain('laboratory: true');
    expect(page).not.toContain("from '@/app/page'");
    expect(rootPage).not.toContain('HomePreview');
    expect(read('app/sitemap.ts')).not.toContain('/preview/home');
  });

  it('keeps one approved H1 promise and uses the reserved Home film', () => {
    expect(hero.title).toBe(APPROVED_PROMISE);
    expect(component).toContain('<h1');
    expect(component.match(/<h1/g)).toHaveLength(1);
    expect(component).toContain('APPROVED_VIDEO.homeInvestmentObjective');
    expect(APPROVED_VIDEO.homeInvestmentObjective.source).toBe(
      'VIDEOS/TU INVERSIÓN MI OBJETIVO.mp4',
    );
    expect(APPROVED_VIDEO.homeInvestmentObjective.note).toMatch(/audio removed/i);
    expect(APPROVED_VIDEO.homeInvestmentObjective.note).toMatch(
      /likeness.*pending|identity approval/i,
    );
    for (const source of APPROVED_VIDEO.homeInvestmentObjective.sources) {
      expect(existsSync(resolve(root, `public${source.src}`))).toBe(true);
    }
    expect(
      existsSync(resolve(root, `public${APPROVED_VIDEO.homeInvestmentObjective.poster}`)),
    ).toBe(true);
  });

  it('follows the Home decision narrative in the approved order', () => {
    const order = [
      '<HomeHero',
      '<HomeSideStatement',
      '<HomeServices',
      '<HomeProcessBand',
      '<HomeVoices',
      '<HomeTeam',
      '<HomeToolsBand',
      '<WebFaq',
      '<HomeFinalCtaBand',
      '<WebFooter',
    ].map((token) => page.indexOf(token));
    expect(order.every((position) => position >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it('keeps the four approved editorial blocks in order, Team as authority', () => {
    expect(services.items.map((service) => service.label)).toEqual([
      'Property Purchase',
      'Investment',
      'Tax Advisory',
      'Team',
    ]);
    expect(services.items.map((service) => service.href)).toEqual([
      '/preview/property-purchase',
      '/preview/investment',
      '/preview/tax-advisory',
      '/preview/team',
    ]);
    expect(services.items.map((service) => service.media)).toEqual([
      'assetPlan',
      'assetResidential',
      'reportInterior',
      'homeAuthority',
    ]);
    // Team is rendered by HomeTeam after the voices, never as a service chapter.
    expect(component).toContain("services.items.filter((item) => item.id !== 'sarah')");
    expect(component).toContain('export function HomeTeam()');
  });

  it('discovers services through three needs — no fourth option, no Property Management', () => {
    expect(discovery.title.text).toBe('What brings you to Spain?');
    expect(discovery.states.map((s) => s.userNeed)).toEqual([
      'I want to buy a home.',
      'I want to invest.',
      'I need tax clarity.',
    ]);
    expect(discovery.states.map((s) => s.ctaHref)).toEqual([
      '/preview/property-purchase',
      '/preview/investment',
      '/preview/tax-advisory',
    ]);
    expect(discovery.defaultState).toBe('buy');
    const all = JSON.stringify(discovery);
    expect(all).not.toMatch(/Property Management|already own|\/preview\/team/i);
    // The buying proposition is Sarah's approved landing line, verbatim.
    expect(discovery.states[0]?.proposition.text).toBe(
      'Buy with peace of mind: we coordinate every step.',
    );
    // Every banner image is a registered asset, and none repeats a chapter image.
    const chapterMedia = new Set(services.items.map((s) => s.media));
    for (const state of discovery.states) {
      expect(APPROVED_MEDIA[state.media], state.id).toBeTruthy();
      expect(chapterMedia.has(state.media as never), state.id).toBe(false);
    }
  });

  it('hangs the service banner on the shared fabric stage, user-controlled and settling', () => {
    const banner = read('components/web/HomeServiceBanner.tsx');
    expect(banner).toContain("from './banner/FabricStage'");
    expect(banner.match(/<FabricStage/g)).toHaveLength(1);
    expect(banner).toContain('settleAfterMs={SETTLE_MS}');
    expect(banner).toContain('role="tablist"');
    expect(banner).toContain('logo');
    // No testimonial semantics, no autoplay, no timed rotation.
    expect(banner).not.toMatch(/buyer-voices|VoiceSlot|PENDING_COPY/);
    expect(banner).not.toMatch(/setInterval|autoplay|autoPlay/);
  });

  it('renders only the two verified Buyer System experiences', () => {
    expect(component.match(/toolKey="purchaseTax"/g)).toHaveLength(1);
    expect(component.match(/toolKey="realCashNeeded"/g)).toHaveLength(1);
    expect(component).not.toContain('toolKey="askingPrice"');
    expect(component).not.toContain('toolKey="taxExposure"');
    expect(resolveEntryPoint('purchaseTax').href).toBe(`${VERIFIED_BUYER_SYSTEM_ORIGIN}/`);
    expect(resolveEntryPoint('realCashNeeded').href).toBe(
      `${VERIFIED_BUYER_SYSTEM_ORIGIN}/real-cash-needed`,
    );
    expect(BUYER_SYSTEM_EXPERIENCES.askingPrice.availability).toBe('limited-go');
    expect(resolveEntryPoint('askingPrice').href).toBeNull();
    expect(resolveEntryPoint('taxExposure').href).toBeNull();
    expect(read('components/web/BuyerToolLink.tsx')).not.toMatch(
      /URLSearchParams|searchParams|\?[a-z]+=/,
    );
  });

  it('uses the Sarah-approved Home portrait and keeps unsupported scope out of the client page', () => {
    expect(component).toContain('APPROVED_MEDIA.homeAuthority');
    expect(APPROVED_MEDIA.homeAuthority.source).toBe('IMAGES/Sarah home_1.png');
    expect(APPROVED_MEDIA.homeAuthority.note).toMatch(/approved by Sarah for the Home/i);
    expect(component).not.toContain('sk-real-1.jpg');
    expect(component).not.toContain('sk-real-2.jpg');
    expect(services.items.find((service) => service.id === 'sarah')?.body.status).toBe('confirmed');
    expect(trust.every((item) => item.value.status === 'confirmed')).toBe(true);
    expect(process.boundary.status).toBe('proposal');
    expect(page).toContain('showLanguageSwitcher={false}');
    expect(page).toContain('showLanguageStatus={false}');
    expect(page).not.toContain('HomePendingBand');
  });

  it('publishes the authorised testimonials verbatim, named, and never paired with an image', () => {
    // Owner instruction 2026-09-29: clients approved and authorised use.
    expect(voices.items.map((v) => v.name.text)).toEqual([
      'Pieter van den Berg',
      'James & Sarah Whitfield',
      'Hans Schmidt',
    ]);
    for (const item of voices.items) {
      expect(item.quote.status).toBe('confirmed');
      expect(item.quote.source).toMatch(/Owner instruction 2026-09-29/);
    }
    expect(voices.items[0]?.quote.text).toBe(
      'The diagnostic flagged a Modelo 210 miscalculation that would have cost me €12,400 over three years. We renegotiated the purchase structure before signing the arras. Best €347 I have spent on this whole purchase.',
    );
    expect(voices.items[2]?.quote.text).toContain('Saved a €280,000 mistake.');
    // Figures stay inside the quotes, never lifted into headlines.
    expect(`${voices.title.text} ${discovery.title.text} ${side.statement.text}`).not.toMatch(
      /[€%]|\d/,
    );
    const voicesBlock = component.slice(
      component.indexOf('export function HomeVoices'),
      component.indexOf('export function HomeTeam'),
    );
    expect(voicesBlock).toContain('<blockquote>');
    expect(voicesBlock).not.toMatch(/<Image/);
  });

  it('shows no internal review wording on the client-review Home', () => {
    const visible = JSON.stringify({
      hero,
      side,
      discovery,
      services,
      voices,
      process,
      faq,
      footer,
      seo,
    });
    expect(visible).not.toMatch(
      /anonymi[sz]ed by request|unverified|Preview only|pending evidence|evidence and consent pending|not for publication|remains pending/i,
    );
    expect(page).not.toContain('PrototypeBanner');
    expect(page).toContain('showStatus={false}');
    // …while the technical protections stay exactly where they were.
    expect(page).toContain('laboratory: true');
    expect(isLaboratoryRoute('/preview/home')).toBe(true);
  });

  it('never crosses anything out: the thread orients, it does not cancel', () => {
    expect(component).not.toMatch(/strike|parties/);
    expect(read('components/web/HomePreview.module.css')).not.toMatch(/\.strike|\.party/);
    expect(trust[1].value.text).toBe('No remuneration from sellers, developers or agencies.');
  });

  it('reveals only the three selected editorial statements, never the H1', () => {
    expect(component.match(/<RevealText>/g)).toHaveLength(3);
    const h1 = component.slice(component.indexOf('<h1'), component.indexOf('</h1>'));
    expect(h1).not.toContain('RevealText');
    const css = read('components/web/HomePreview.module.css');
    expect(css).toMatch(/\.reveal \{[\s\S]*?animation-timeline: view\(\);/);
    expect(css).toMatch(/box-decoration-break: slice/);
    // The hero renders at first paint: no entrance animation on H1 or poster.
    const heroBlock = component.slice(
      component.indexOf('export function HomeHero'),
      component.indexOf('export function HomeSideStatement'),
    );
    expect(heroBlock).not.toMatch(/entrance\./);
  });

  it('records new copy and unresolved assets as reviewable, not approved', () => {
    expect(hero.lead.status).toBe('proposal');
    expect(discovery.title.status).toBe('proposal');
    expect(reviewRecord).toMatch(/all \*\*PROPUESTA\*\*/);
    expect(reviewRecord).toMatch(/Sarah home_1\.png/);
    expect(reviewRecord).toMatch(/rights record remain \*\*PENDING\*\*/i);
    expect(reviewRecord).toMatch(/Asking Price/);
  });
});
