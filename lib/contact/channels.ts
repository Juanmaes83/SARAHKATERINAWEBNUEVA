/**
 * Contact channels — the ENTIRE contact surface of the new site.
 *
 * Audited read-only on 2026-09-29 against the live site (see
 * docs/contact-page.md). Nothing here books, sends or stores anything: the
 * new site links to channels that already work; it runs no form, API or CRM.
 *
 * WHY SOME VALUES ARE CONFIGURATION, NOT CODE
 *
 * The booking page and the email address both carry the brand's production
 * domain, and the canonical production host is an OPEN decision (AGENTS.md
 * §7.3; `tests/governance.test.ts` forbids the host in source). So, like the
 * Buyer System origin, they are set per environment:
 *
 *   NEXT_PUBLIC_BOOKING_URL     the live booking page, verified 2026-09-29
 *   NEXT_PUBLIC_CONTACT_EMAIL   the published address, verified 2026-09-29
 *
 * While a variable is unset the channel is simply not rendered — never a
 * placeholder that looks real. Phone and WhatsApp carry no domain and live
 * here, with their provenance.
 */

export type ChannelStatus = 'configured' | 'unconfigured';

/** Owner instruction 2026-09-29 + live site (contact, book-a-call), both read 2026-09-29. */
const PHONE_E164 = '+34647754589';
const PHONE_DISPLAY = '+34 647 754 589';

function clean(value: string | undefined): string | null {
  const v = value?.trim();
  return v ? v : null;
}

function bookingUrl(): string | null {
  const v = clean(process.env.NEXT_PUBLIC_BOOKING_URL);
  if (!v) return null;
  try {
    const url = new URL(v);
    // Outbound link only: no query string, so nothing about the visitor travels.
    return url.protocol === 'https:' && !url.search ? url.toString() : null;
  } catch {
    return null;
  }
}

function email(): string | null {
  const v = clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
  return v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : null;
}

export interface ContactChannels {
  readonly booking: { readonly href: string | null; readonly status: ChannelStatus };
  readonly whatsapp: { readonly href: string; readonly display: string };
  readonly phone: { readonly href: string; readonly display: string };
  readonly email: {
    readonly href: string | null;
    readonly display: string | null;
    readonly status: ChannelStatus;
  };
}

/**
 * Resolves every channel for the current environment. The WhatsApp message is
 * a neutral opener; it carries no personal or financial detail.
 */
export function resolveContactChannels(whatsappOpener: string): ContactChannels {
  const book = bookingUrl();
  const mail = email();
  return {
    booking: { href: book, status: book ? 'configured' : 'unconfigured' },
    whatsapp: {
      href: `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(whatsappOpener)}`,
      display: PHONE_DISPLAY,
    },
    phone: { href: `tel:${PHONE_E164}`, display: PHONE_DISPLAY },
    email: {
      href: mail ? `mailto:${mail}` : null,
      display: mail,
      status: mail ? 'configured' : 'unconfigured',
    },
  };
}
