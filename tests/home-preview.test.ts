import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isLaboratoryRoute } from '@/lib/seo/config';
import {
  BUYER_SYSTEM_EXPERIENCES,
  resolveEntryPoint,
} from '@/lib/buyer-system/links';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { APPROVED_VIDEO } from '@/lib/media/approved-video';
import { HERO_VIDEO } from '@/lib/media/hero-video';
import {
  bookCall,
  contactBand,
  discovery,
  finalCta,
  footer,
  hero,
  presentation,
  process,
  seo,
  services,
  side,
  tools,
  voices,
} from '@/content/en/home';
import { SARAH_APPROVALS, SARAH_REVIEW_ITEMS } from '@/content/en/sarah-review';

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const page = read('app/preview/home/page.tsx');
const component = read('components/web/HomePreview.tsx');
const rootPage = read('app/page.tsx');
const reviewRecord = read('docs/home-buyer-system-preview.md');

afterEach(() => vi.unstubAllEnvs());

describe('Home preview route', () => {
  it('exists only in the preview namespace and leaves / unchanged', () => {
    expect(isLaboratoryRoute('/preview/home')).toBe(true);
    expect(page).toContain("path: '/preview/home'");
    expect(page).toContain('laboratory: true');
    expect(page).not.toContain("from '@/app/page'");
    expect(rootPage).not.toContain('HomePreview');
    expect(read('app/sitemap.ts')).not.toContain('/preview/home');
  });

  it('opens in Sarah\'s voice, with the provisional silent hero film', () => {
    // 2026-10-01: Sarah found "Clarity before commitment." unclear as the first
    // line and asked for her own voice; the opening line is a proposal (SR-086).
    // 2026-10-02: the owner-supplied hero film replaces her still photograph in
    // the hero (REVISION WEB-HOME.pdf point 2), silent until its voice-over exists.
    expect(hero.title.text).toBe('Let me help you feel at home in Spain.');
    expect(hero.title.status).toBe('proposal');
    expect(hero.title.text).not.toMatch(/€|\bpay|\bpaid|price|money/i);
    expect(component).toContain('<h1');
    expect(component.match(/<h1/g)).toHaveLength(1);
    const heroSource = component.slice(
      component.indexOf('export function HomeHero'),
      component.indexOf('export function HomePresentation'),
    );
    expect(heroSource).toContain('<HeroFilm video={HERO_VIDEO.home}');
    expect(heroSource).not.toContain('APPROVED_MEDIA.sarahConfianza');
    expect(component).not.toContain('APPROVED_VIDEO.homeInvestmentObjective');
    // The registered villa film stays traceable, unused on this page.
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

  it('serves the hero film silent, poster-first, with its original out of the build', () => {
    const film = HERO_VIDEO.home;
    expect(film.route).toBe('/preview/home');
    expect(film.playback).toBe('play-once');
    // The desktop cut is the file Juanma supplied; the phone gets a lighter cut.
    expect(film.desktop.src).toBe('/media/video/sarah-home-hero-review-silent.mp4');
    expect(film.mobile.bytes).toBeLessThan(film.desktop.bytes / 3);
    for (const cut of [film.desktop, film.mobile]) {
      expect(cut.src).toMatch(/-silent(-mobile)?\.mp4$/);
      for (const poster of [cut.posterStart, cut.posterEnd]) {
        expect(existsSync(resolve(root, `public${poster}`)), poster).toBe(true);
      }
    }
    // The 92.7 MB original is recorded by path and hash, never served.
    expect(film.source).toBe('VIDEOS/SARAHKATERINA_HERO_VIDEO_WEB_BRANDING.mp4');
    expect(film.sourceSha256).toBe(
      '4289c168d5b3c60f7862753b33366d0bce8cf3440f88e8689f6a9311565a0518',
    );
    expect(readdirSync(resolve(root, 'public'), { recursive: true }).join('\n')).not.toMatch(
      /BRANDING/,
    );
    expect(film.note).toMatch(/voice-over \(not produced/);
    expect(film.note).toMatch(/identity of the woman shown.*not in the repository/);
    expect(reviewRecord).toMatch(/## 14\. Home hero film for review/);
  });

  it('states Sarah\'s side in her words, with no word about money or who pays her (PDF point 4)', () => {
    expect(side.statement.text).toBe('My job is to be on your side of the table, every step of the way.');
    expect(side.statement.source).toMatch(/REVISION WEB-HOME\.pdf.*point 4/);
    const rendered = JSON.stringify({ hero, presentation, side, discovery, services, process, voices, tools, finalCta, contactBand, footer, seo });
    expect(rendered).not.toMatch(/Sarah is paid|paid only by|remuneration|No commission/i);
    // The remuneration lines are not rendered on the Home at all.
    expect(component).not.toMatch(/trustList|trust\.map/);
  });

  it('introduces Sarah in her own words, every sentence kept (PDF point 3)', () => {
    expect(presentation.opening.text).toMatch(/^For twenty years I was an office director at SUMA Gestión Tributaria/);
    expect(presentation.opening.text).toMatch(/thousands of taxpayers.*taught me two things\.$/);
    expect(presentation.lessons.map((l) => l.label)).toEqual(['The first:', 'The second:']);
    expect(presentation.body).toHaveLength(2);
    expect(presentation.body[0]?.text).toMatch(/deadlines missed, taxes miscalculated, decisions taken without planning/);
    expect(presentation.body[1]?.text).toMatch(/from the first viewing until long after the signing/);
    expect(presentation.closing.text).toBe('Because behind every file there is a person, a family and a life plan. And that is what really matters.');
    for (const line of [presentation.opening, ...presentation.lessons.map((l) => l.text), ...presentation.body, presentation.closing]) {
      expect(line.status).toBe('confirmed');
      expect(line.source).toMatch(/point 3 \(English translation\)/);
    }
    // The heading is ours, and open for her (SR-087).
    expect(presentation.title.status).toBe('proposal');
    expect(SARAH_REVIEW_ITEMS.some((item) => item.id === 'SR-087')).toBe(true);
    expect(page.indexOf('<HomePresentation')).toBeGreaterThan(page.indexOf('<HomeHero'));
    expect(page.indexOf('<HomePresentation')).toBeLessThan(page.indexOf('<HomeSideStatement'));
  });

  it('applies Sarah\'s PDF lines to the selector, the chapters, Team and the close (points 5–8, 10)', () => {
    expect(discovery.states[2]?.userNeed).toBe('I need to understand what I’ll pay, in fees and in taxes.');
    expect(services.items[0]?.title.text).toBe('We’re with you from your first question until you get the keys, with all your paperwork in one place.');
    expect(services.items[1]?.title.text).toBe('Your dream deserves more than a pretty picture: we check everything before you take the step.');
    const team = services.items[3];
    expect(team?.title.text).toBe('One person by your side, from start to finish.');
    expect(team?.body.text).toMatch(/^I lead your process personally\./);
    expect(team?.cta.text).toBe('Meet my team');
    expect(finalCta.title.text).toBe('Where would you like to start?');
    expect(finalCta.primaryCta.text).toBe('Choose your starting point');
    expect(finalCta.secondaryCta.text).toBe('Calculate your purchase costs');
    const close = component.slice(component.indexOf('export function HomeFinalCtaBand'));
    expect(close).toContain('href="#services"');
    expect(close).toContain('href="#tools"');
    expect(SARAH_APPROVALS[0]?.source).toMatch(/REVISION WEB-HOME\.pdf/);
  });

  it('removes the Home FAQ band and its anchor, leaving the landing FAQs alone (PDF point 9)', () => {
    expect(page).not.toMatch(/WebFaq|faq/);
    expect(JSON.stringify(footer)).not.toContain('#faq');
    expect(component).not.toContain('id="faq"');
    for (const anchor of footer.groups[1]?.links.map((link) => link.href) ?? []) {
      expect(component, anchor).toContain(`id="${anchor.slice(1)}"`);
    }
  });

  it('puts "Book a call" on the configured booking page only, never a dead button', () => {
    expect(bookCall.label).toBe('Book a call');
    expect(contactBand.bookCta).toBe('Book a call');
    // Hero, introduction and contact band; each rendered only with a booking URL.
    expect(component.match(/\{bookCall\.label\}|\{contactBand\.bookCta\}/g)).toHaveLength(3);
    expect(component).toContain("booking.status === 'configured' ? booking.href : null");
    expect(component).not.toMatch(/calendly\.com/i);
  });

  it('writes the call link as one text node so page translation reads it (PDF point 11)', () => {
    expect(component).toContain('{`${contactBand.phoneLabel} ${channels.phone.display}`}');
    expect(component).not.toContain('{contactBand.phoneLabel} {channels.phone.display}');
  });

  it('follows the Home decision narrative in the approved order', () => {
    const order = [
      '<HomeHero',
      '<HomePresentation',
      '<HomeSideStatement',
      '<HomeServices',
      '<HomeProcessBand',
      '<HomeVoices',
      '<HomeTeam',
      '<HomeToolsBand',
      '<HomeContactBand',
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
      // 2026-10-07: Property Purchase takes the advisory scene (was assetPlan)
      // and Team the photograph supplied as Sarah's replacement (was homeAuthority).
      'advisorClientOne',
      'assetResidential',
      'reportInterior',
      'sarahConfianza',
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
      'I need to understand what I’ll pay, in fees and in taxes.',
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

  it('renders the two approved Buyer System experiences only with the Preview origin', () => {
    expect(component.match(/toolKey="purchaseTax"/g)).toHaveLength(1);
    expect(component.match(/toolKey="realCashNeeded"/g)).toHaveLength(1);
    expect(component).not.toContain('toolKey="askingPrice"');
    expect(component).not.toContain('toolKey="taxExposure"');

    // 2026-10-01: the configuration clause left the visible intro; the adapter
    // below still withholds both links without a Preview origin.
    expect(tools.intro.text).not.toMatch(/Preview is configured/);
    expect(tools.intro.text).toMatch(/open in the separate Buyer System/);
    vi.stubEnv('NEXT_PUBLIC_BUYER_SYSTEM_URL', '');
    expect(resolveEntryPoint('purchaseTax').href).toBeNull();
    expect(resolveEntryPoint('realCashNeeded').href).toBeNull();

    vi.stubEnv('NEXT_PUBLIC_BUYER_SYSTEM_URL', 'https://sarah-katerina-buyer-system.vercel.app');
    expect(resolveEntryPoint('purchaseTax').href).toBe(
      'https://sarah-katerina-buyer-system.vercel.app/',
    );
    expect(resolveEntryPoint('realCashNeeded').href).toBe(
      'https://sarah-katerina-buyer-system.vercel.app/real-cash-needed',
    );
    expect(BUYER_SYSTEM_EXPERIENCES.askingPrice.availability).toBe('limited-go');
    expect(resolveEntryPoint('askingPrice').href).toBeNull();
    expect(resolveEntryPoint('taxExposure').href).toBeNull();
    expect(read('components/web/BuyerToolLink.tsx')).not.toMatch(
      /URLSearchParams|searchParams|\?[a-z]+=/,
    );
  });

  it('uses the portrait Sarah supplied and keeps unsupported scope out of the client page', () => {
    // 2026-10-07: the Team block shows `sarahConfianza`, the same pose as the
    // former `homeAuthority` (Sarah home_1.png) without its embedded text. That
    // entry stays registered for Contact; the Home no longer renders it.
    expect(component).toContain('APPROVED_MEDIA.sarahConfianza');
    expect(component).not.toContain('APPROVED_MEDIA.homeAuthority');
    expect(component).not.toContain('APPROVED_MEDIA.assetPlan');
    expect(APPROVED_MEDIA.sarahConfianza.source).toBe('IMAGES/SARAH_KATERINA_1_SARAH_CONFIANZA.png');
    expect(APPROVED_MEDIA.sarahConfianza.grade).toBeUndefined();
    // The banner's fees-and-taxes state carries its own image, never a chapter's.
    expect(discovery.states.find((s) => s.id === 'tax')?.media).toBe('sarahHomeDesk');
    expect(APPROVED_MEDIA.sarahHomeDesk.source).toBe('IMAGES/Sarah home_2.jpeg');
    expect(component).not.toContain('sk-real-1.jpg');
    expect(component).not.toContain('sk-real-2.jpg');
    expect(services.items.find((service) => service.id === 'sarah')?.body.status).toBe('confirmed');
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
      presentation,
      finalCta,
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

  it('adds a short Contact band that links to the full Contact page (Juanma, 2026-09-29)', () => {
    const band = component.slice(
      component.indexOf('export function HomeContactBand'),
      component.indexOf('export function HomeFinalCtaBand'),
    );
    expect(band).toContain('href={CONTACT_PREVIEW_ROUTE}');
    expect(band).toContain('resolveContactChannels');
    // Brief by design: no form, no map, no modality cards on the Home.
    expect(band).not.toMatch(/<form|MapOnDemand|<iframe|modalities/);
    expect(contactBand.office.text).toContain('Calle Bazán 10, 03181 Torrevieja');
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
