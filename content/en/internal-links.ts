import { SERVICE_ROUTES, TEAM_LAYER } from '@/content/en/service-journey';
import { CONTACT_PREVIEW_ROUTE, UNIFIED_WEB_NAV } from '@/content/en/site-navigation';

/**
 * INTERNAL LINK GRAPH — Phase 2B (2026-10-08).
 *
 * Destinations only. This module adds no visible sentence: every anchor text
 * is either the CTA wording already on the page, a footer label already on the
 * page, or a navigation label already used by the shared header
 * (`UNIFIED_WEB_NAV`) or the team layer (`TEAM_LAYER.cta`).
 *
 * Every target is a real App Router route under /preview, optionally with a
 * fragment whose id exists on that page. tests/internal-links.test.ts checks
 * both, so a target that stops existing fails CI instead of 404ing.
 *
 * The protected content modules (investment, tax-advisory, team, purchase)
 * are deliberately untouched: their hashes stay as recorded.
 */

const nav = (href: string): string => {
  const item = UNIFIED_WEB_NAV.find((entry) => entry.href === href);
  if (!item) throw new Error(`No navigation label for ${href}`);
  return item.label;
};

/** Where Sarah's authority lives: the named-team section of the Team page. */
export const SARAH_AUTHORITY_HREF = TEAM_LAYER.href;

/**
 * CTAs that were rendered as <button> with no action, now pointing where their
 * own words lead. Keyed by a stable slot name; read by the band components.
 * Slots whose words promise a destination that does not exist yet ("See
 * opportunities", "See a sample report") are intentionally absent — they stay
 * REVIEW_REQUIRED (docs/phase-2b-coverage-matrix.md).
 */
export const CTA_TARGETS = {
  /** "Request an analysis" — same words as the final CTA, which links to Contact. */
  investmentHeroPrimary: CONTACT_PREVIEW_ROUTE,
  /** "See how it works" */
  investmentHeroSecondary: `${SERVICE_ROUTES.investment}#process`,
  /** Door "Analyse my property" */
  investmentDoorHaveProperty: CONTACT_PREVIEW_ROUTE,
  /** Door "Talk to Sarah first" */
  investmentDoorTalk: CONTACT_PREVIEW_ROUTE,
  /** "Meet Sarah" */
  investmentAuthority: SARAH_AUTHORITY_HREF,
  /** "Map my tax exposure" — same words as the final CTA, which links to Contact. */
  taxHeroPrimary: CONTACT_PREVIEW_ROUTE,
  /** "See how it works" */
  taxHeroSecondary: `${SERVICE_ROUTES.tax}#process`,
  /** "Create my tax map" */
  taxCalendarAside: CONTACT_PREVIEW_ROUTE,
  /** "Review my situation" / "Understand my obligations" / "Review before I commit" */
  taxServiceCards: CONTACT_PREVIEW_ROUTE,
  /** "About Sarah" */
  taxAuthority: SARAH_AUTHORITY_HREF,
  /** "Discover how we work" */
  taxCases: `${SERVICE_ROUTES.tax}#process`,
  /** "Request roadmap" / "Request support" / "Request review" (were #faq). */
  purchaseServiceCards: CONTACT_PREVIEW_ROUTE,
  /** "Meet Sarah" (was #faq). */
  purchaseAuthority: SARAH_AUTHORITY_HREF,
  /** Final "Talk first" (was #faq) — as on Investment and Tax. */
  purchaseFinalSecondary: CONTACT_PREVIEW_ROUTE,
} as const;

/** Door ids (content/en/investment.ts `doors.items`) with a real destination. */
export const INVESTMENT_DOOR_TARGETS: Readonly<Record<string, string>> = {
  'have-property': CTA_TARGETS.investmentDoorHaveProperty,
  talk: CTA_TARGETS.investmentDoorTalk,
};

export interface RelatedLink {
  readonly href: string;
  readonly label: string;
}

/**
 * FAQ answer → the service that carries it. Shown under the open answer with
 * the navigation label only; no new sentence. Keyed by FAQ item id per page.
 */
export const FAQ_RELATED = {
  investment: {
    'purchase-support': { href: SERVICE_ROUTES.purchase, label: nav(SERVICE_ROUTES.purchase) },
    tax: { href: SERVICE_ROUTES.tax, label: nav(SERVICE_ROUTES.tax) },
    independence: { href: TEAM_LAYER.href, label: TEAM_LAYER.cta },
  },
  purchase: {
    when: { href: TEAM_LAYER.href, label: TEAM_LAYER.cta },
    included: { href: CONTACT_PREVIEW_ROUTE, label: nav(CONTACT_PREVIEW_ROUTE) },
  },
  tax: {
    purchase: { href: SERVICE_ROUTES.purchase, label: nav(SERVICE_ROUTES.purchase) },
    independence: { href: TEAM_LAYER.href, label: TEAM_LAYER.cta },
    documents: { href: CONTACT_PREVIEW_ROUTE, label: nav(CONTACT_PREVIEW_ROUTE) },
  },
  team: {
    remote: { href: CONTACT_PREVIEW_ROUTE, label: nav(CONTACT_PREVIEW_ROUTE) },
    after: { href: SERVICE_ROUTES.tax, label: nav(SERVICE_ROUTES.tax) },
  },
} as const satisfies Record<string, Record<string, RelatedLink>>;

/**
 * Footer labels that already name an existing page or section. The footers
 * render these labels as plain text because their destinations "did not exist
 * yet"; these ones now do. Labels without an existing destination (guides,
 * market analysis, legal pages, "My story"…) stay plain text.
 */
export const FOOTER_LINK_TARGETS: Readonly<Record<string, string>> = {
  // Service names (Investment, Property Purchase and Tax Advisory footers).
  'Purchase support': SERVICE_ROUTES.purchase,
  'Property purchase': SERVICE_ROUTES.purchase,
  'Tax advisory': SERVICE_ROUTES.tax,
  'Investment analysis': SERVICE_ROUTES.investment,
  // Sections that exist on their own page.
  'Frequently asked questions': `${SERVICE_ROUTES.purchase}#faq`,
  'Tax calendar': `${SERVICE_ROUTES.tax}#calendar`,
  Questions: `${SERVICE_ROUTES.tax}#faq`,
  // Team footer (also rendered on Contact): absolute paths, never bare hashes.
  'A home to live in': `${SERVICE_ROUTES.team}#paths`,
  'Land and a possible project': `${SERVICE_ROUTES.team}#paths`,
  'A second home with income in mind': `${SERVICE_ROUTES.team}#paths`,
  'Named responsibilities': `${SERVICE_ROUTES.team}#team`,
  'Tax questions': SERVICE_ROUTES.tax,
};
