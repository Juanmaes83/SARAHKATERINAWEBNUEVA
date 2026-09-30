import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { isLaboratoryRoute } from '@/lib/seo/config';
import { resolveContactChannels } from '@/lib/contact/channels';
import * as contact from '@/content/en/contact';
import { CONTACT_PREVIEW_ROUTE, UNIFIED_WEB_NAV } from '@/content/en/site-navigation';

const root = resolve(__dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const page = read('app/preview/contact/page.tsx');
const component = read('components/web/ContactPage.tsx');
const map = read('components/web/MapOnDemand.tsx');

afterEach(() => vi.unstubAllEnvs());

/** Only what renders: claim texts and plain strings, never source/note fields. */
function visibleText(value: unknown): string {
  const texts: string[] = [];
  const collect = (v: unknown): void => {
    if (typeof v === 'string') texts.push(v);
    else if (Array.isArray(v)) v.forEach(collect);
    else if (v && typeof v === 'object') {
      const record = v as Record<string, unknown>;
      if (typeof record.text === 'string' && typeof record.status === 'string') {
        texts.push(record.text);
      } else Object.values(record).forEach(collect);
    }
  };
  collect(value);
  return texts.join(' | ');
}

describe('contact preview route', () => {
  it('stays in the noindex preview namespace and out of the sitemap', () => {
    expect(isLaboratoryRoute('/preview/contact')).toBe(true);
    expect(page).toContain("path: '/preview/contact'");
    expect(page).toContain('laboratory: true');
    expect(read('app/sitemap.ts')).not.toContain('/preview/contact');
    expect(page.indexOf('<PrototypeBanner')).toBeLessThan(page.indexOf('<WebHeader'));
  });

  it('is in the shared navigation and every page footer (Juanma, 2026-09-29)', () => {
    expect(CONTACT_PREVIEW_ROUTE).toBe('/preview/contact');
    expect(UNIFIED_WEB_NAV.at(-1)).toEqual({ href: '/preview/contact', label: 'Contact' });
    for (const file of ['home', 'investment', 'property-purchase', 'tax-advisory', 'team']) {
      const source = read(`content/en/${file}.ts`);
      const footer = source.slice(source.indexOf('export const footer'));
      expect(footer, file).toMatch(/href: '\/preview\/contact'/);
    }
  });

  it('renders no form and calls no API: it only links to channels that already work', () => {
    expect(component).not.toMatch(/<form|fetch\(|action=|\/api\//);
    expect(read('lib/contact/channels.ts')).not.toMatch(/fetch\(|XMLHttpRequest|\/api\//);
    expect(component).not.toMatch(/LocalBusiness|application\/ld\+json|aggregateRating/);
  });
});

describe('contact channels', () => {
  it('renders no booking link or email while their configuration is unset', () => {
    vi.stubEnv('NEXT_PUBLIC_BOOKING_URL', '');
    vi.stubEnv('NEXT_PUBLIC_CONTACT_EMAIL', '');
    const c = resolveContactChannels('Hi');
    expect(c.booking).toEqual({ href: null, status: 'unconfigured' });
    expect(c.email.href).toBeNull();
    expect(c.phone.href).toBe('tel:+34647754589');
    expect(c.whatsapp.href).toMatch(/^https:\/\/wa\.me\/34647754589\?text=/);
  });

  it('accepts only an HTTPS booking URL without a query string, and a valid email', () => {
    vi.stubEnv('NEXT_PUBLIC_BOOKING_URL', 'http://example.org/book');
    expect(resolveContactChannels('Hi').booking.href).toBeNull();
    vi.stubEnv('NEXT_PUBLIC_BOOKING_URL', 'https://example.org/book?name=x');
    expect(resolveContactChannels('Hi').booking.href).toBeNull();
    vi.stubEnv('NEXT_PUBLIC_BOOKING_URL', 'https://example.org/book');
    expect(resolveContactChannels('Hi').booking).toEqual({
      href: 'https://example.org/book',
      status: 'configured',
    });
    vi.stubEnv('NEXT_PUBLIC_CONTACT_EMAIL', 'not-an-email');
    expect(resolveContactChannels('Hi').email.href).toBeNull();
    vi.stubEnv('NEXT_PUBLIC_CONTACT_EMAIL', 'hello@example.org');
    expect(resolveContactChannels('Hi').email.href).toBe('mailto:hello@example.org');
  });

  it('sends no personal or financial detail in any WhatsApp opener', () => {
    const openers = [
      contact.direct.whatsapp.opener,
      ...contact.modalities.items.map((m) => m.whatsapp),
    ];
    for (const opener of openers) {
      expect(opener).not.toMatch(/\d|€|passport|NIE|budget/i);
      expect(opener).not.toMatch(/found you on Google/i);
    }
  });
});

describe('contact content — only verified commitments', () => {
  const visible = visibleText([
    contact.hero,
    contact.booking,
    contact.direct,
    contact.firstContact,
    contact.modalities,
    contact.office,
  ]);

  it('claims no cost, guaranteed video link, personal attention, response time, CET or walk-ins', () => {
    expect(visible).not.toMatch(
      /free|no cost|google meet|zoom|guarantee|within (one|an|1) (business )?hour|\bCET\b|personally|Sarah will|walk[- ]in|drop by|open to visitors/i,
    );
  });

  it('states the verified booking facts in Spanish local time', () => {
    const facts = contact.booking.facts.map((f) => f.text);
    expect(facts).toContain('30 minutes');
    expect(facts.join(' ')).toMatch(/Spanish local time/);
    for (const f of contact.booking.facts) expect(f.status).toBe('confirmed');
    for (const s of contact.booking.steps) expect(s.status).toBe('confirmed');
  });

  it('offers video, phone and a Torrevieja meeting as requests through real channels', () => {
    expect(contact.modalities.items.map((m) => m.id)).toEqual(['video', 'phone', 'meeting']);
    expect(contact.modalities.intro.text).toMatch(/request/i);
    expect(contact.modalities.intro.text).toMatch(/nothing is booked until it is confirmed/i);
    expect(contact.booking.formatNote.text).toMatch(/request/i);
    expect(component).toContain('modalities.requestByWhatsApp');
    expect(component).toContain('modalities.requestByEmail');
  });

  it('asks for no passport, tax document or financial data on first contact', () => {
    expect(contact.firstContact.body.text).toMatch(
      /do not send passports, tax documents or financial details/,
    );
  });
});

describe('office, Google Maps and map', () => {
  it('shows the address exactly as Juanma confirmed it', () => {
    expect(contact.office.status).toBe('confirmed');
    expect(contact.office.addressLines).toEqual(['Calle Bazán 10', '03181 Torrevieja · Alicante']);
    expect(JSON.stringify(contact.office)).not.toMatch(/Hermanos/);
    expect(contact.office.visiting.text).toMatch(/by prior request only/);
  });

  it('opens that address in Google Maps and for directions, with no API key', () => {
    expect(component).toContain('https://www.google.com/maps/search/?api=1&query=');
    expect(component).toContain('https://www.google.com/maps/dir/?api=1&destination=');
    expect(contact.office.mapsQuery).toBe('Calle Bazán 10, 03181 Torrevieja, Alicante');
    expect(component + map).not.toMatch(/[?&]key=|maps\/embed\/v1/);
  });

  it('loads the Google map only on request, with a text alternative beside it', () => {
    expect(map).toContain('useState(false)');
    expect(map).toMatch(/\{open \? \(\s*<iframe/);
    expect(map).toContain('title={title}');
    expect(map).toContain('referrerPolicy="strict-origin-when-cross-origin"');
    // The button only exists once the page is interactive.
    expect(map).toMatch(/\{enhanced \? \(\s*<button/);
    expect(component).toContain('<address');
  });
});

describe('editorial redesign (Juanma, 2026-09-29)', () => {
  it('uses the two requested originals: Sarah in her office and the Tax Advisory lifestyle photo', () => {
    expect(contact.hero.portrait.media).toBe('homeAuthority');
    expect(contact.modalities.image.media).toBe('territoryContact');
    expect(read('lib/media/approved-media.ts')).toContain(
      "source: 'IMAGES/sarahkaterina_LifeStyle_6.png'",
    );
    expect(read('components/web/TaxBands.tsx')).toContain('APPROVED_MEDIA.territoryContact');
  });

  it('never animates the hero: the H1 and the portrait render at first paint', () => {
    const heroBlock = component.slice(
      component.indexOf('1 · Hero'),
      component.indexOf('2 · How would'),
    );
    expect(heroBlock).not.toContain('RevealOnScroll');
    expect(heroBlock).not.toMatch(/entrance\./);
    expect(heroBlock).toContain('priority');
  });

  it('keeps one primary booking action in the hero and the direct channels beside it', () => {
    const heroBlock = component.slice(
      component.indexOf('1 · Hero'),
      component.indexOf('2 · How would'),
    );
    expect(heroBlock.match(/variant="primary"/g)).toHaveLength(1);
    expect(heroBlock).toContain('{directLinks}');
  });

  it('gives the map a deliberate, legible initial state carrying the address', () => {
    expect(map).toContain('addressLines.map');
    expect(map).toContain('styles.mapPin');
    expect(read('components/web/ContactPage.module.css')).toMatch(
      /\.map \{[\s\S]*?aspect-ratio: 4 \/ 3;/,
    );
  });
});
