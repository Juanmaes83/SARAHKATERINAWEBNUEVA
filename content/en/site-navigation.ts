import { SERVICE_ROUTES } from '@/content/en/service-journey';

/**
 * Approved shared preview navigation, 2026-09-29.
 *
 * These are real App Router destinations. Home section links stay in the
 * Home-specific footer; the primary header remains compact enough to work at
 * every supported width and always exposes the four approved landings.
 */
export const HOME_PREVIEW_ROUTE = '/preview/home';

export const UNIFIED_WEB_NAV = [
  { href: HOME_PREVIEW_ROUTE, label: 'Home' },
  { href: SERVICE_ROUTES.purchase, label: 'Property Purchase' },
  { href: SERVICE_ROUTES.investment, label: 'Investment' },
  { href: SERVICE_ROUTES.tax, label: 'Tax Advisory' },
  { href: SERVICE_ROUTES.team, label: 'Team' },
] as const;

export const BUYER_TOOLS_LABEL = 'Buyer Tools';
