/**
 * Navigation content — ES.
 *
 * Spanish is the second approved language. No new language may be opened
 * before EN is consolidated and ES is complete (decisions-log.md 2026-08-05).
 *
 * The same governance applies as in content/en/navigation.ts: no approved
 * public navigation exists, and Property Management stays out while D-06 is
 * unexecuted.
 *
 * These strings are structural labels for the internal preview. Public Spanish
 * copy is not approved and is not authored here.
 */

import type { NavItem } from '../en/navigation';

export const primaryNav: readonly NavItem[] = [
  { href: '/', label: 'Resumen' },
  { href: '/foundation', label: 'Fundación' },
];

export const headerActionLabel = 'Acción principal';

export const navigationPendingNote =
  'La navegación pública está PENDING_APPROVAL. BUY / INVEST / OWN es arquitectura interna, no un navbar.';
