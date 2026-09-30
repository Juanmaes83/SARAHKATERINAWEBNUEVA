import { SERVICE_ROUTES } from '@/content/en/service-journey';

/**
 * Approved shared preview navigation, 2026-09-29.
 *
 * These are real App Router destinations. Home section links stay in the
 * Home-specific footer; the primary header remains compact enough to work at
 * every supported width and always exposes the four approved landings.
 */
export const HOME_PREVIEW_ROUTE = '/preview/home';

/**
 * Contact joined the shared navigation on 2026-09-29 (Juanma): the page now
 * has working destinations — the audited booking calendar, WhatsApp, phone
 * and email — so the earlier "no Contact until a destination is confirmed"
 * rule is satisfied. See docs/contact-page.md.
 */
export const CONTACT_PREVIEW_ROUTE = '/preview/contact';

export const UNIFIED_WEB_NAV = [
  { href: HOME_PREVIEW_ROUTE, label: 'Home' },
  { href: SERVICE_ROUTES.purchase, label: 'Property Purchase' },
  { href: SERVICE_ROUTES.investment, label: 'Investment' },
  { href: SERVICE_ROUTES.tax, label: 'Tax Advisory' },
  { href: SERVICE_ROUTES.team, label: 'Team' },
  { href: CONTACT_PREVIEW_ROUTE, label: 'Contact' },
] as const;

export const BUYER_TOOLS_LABEL = 'Buyer Tools';
