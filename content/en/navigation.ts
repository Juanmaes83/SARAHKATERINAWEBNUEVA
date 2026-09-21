/**
 * Navigation content — EN (primary acquisition language).
 *
 * GOVERNANCE: there is NO approved public navigation.
 *
 * `BUY / INVEST / OWN` is internal commercial architecture and explicitly
 * "not final public navigation" (PROJECT-STATUS.md, brand-system/README.md).
 * The service routes proposed in seo-final-audit-2026-09.md §5 are a
 * recommendation awaiting a verification gate, not an approved information
 * architecture.
 *
 * Property Management is deliberately absent: D-06 is still unexecuted and the
 * page is held publicly until the VITA Host / Group entity conflict is
 * resolved (PROJECT-STATUS.md, master audit §5).
 *
 * The preview therefore exposes only routes that actually exist in this
 * repository.
 */

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

export const primaryNav: readonly NavItem[] = [
  { href: '/', label: 'Overview' },
  { href: '/foundation', label: 'Foundation' },
];

/**
 * System action label. NOT a commercial CTA: no landing copy is approved, and
 * the master audit requires a per-intent CTA that has not yet been decided.
 */
export const headerActionLabel = 'Primary action';

export const navigationPendingNote =
  'Public navigation is PENDING_APPROVAL. BUY / INVEST / OWN is internal architecture, not a navbar.';
