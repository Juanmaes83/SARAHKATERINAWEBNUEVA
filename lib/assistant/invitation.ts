import { isAssistantWebsiteRoute } from './policy';

/**
 * Contextual help invitation (package B, 2026-10-10).
 *
 * One discreet offer of help per visit, from local signals held in memory
 * only: no cookies, storage, identity or profile, nothing sent anywhere. A
 * reload starts a new visit. The thresholds are initial hypotheses for human
 * review; meeting them suggests possible interest, never purchase intent.
 */
export const INVITATION_THRESHOLDS = {
  /** Visible time on the current service page. */
  serviceDwellMs: 45_000,
  /** Share of the scrollable height reached on that page. */
  scrollRatio: 0.5,
  /** Distinct eligible pages in the visit, at least one of them a service. */
  distinctPages: 3,
  /**
   * Visible time on the current page before any offer, so it never appears
   * during a page load or transition. Implementation hypothesis, not in the brief.
   */
  arrivalGraceMs: 5_000,
} as const;

export type InvitationTopic = 'A02' | 'A03' | 'A04';

const SERVICES: readonly (readonly [RegExp, InvitationTopic])[] = [
  [/^\/(preview\/)?investment$/, 'A03'],
  [/^\/(preview\/property-purchase|services\/property-purchase)$/, 'A02'],
  [/^\/(preview\/tax-advisory|services\/tax-advisory)$/, 'A04'],
];

/** Pages where an unprompted offer would be out of place even if the assistant exists. */
const QUIET = /^\/(preview\/)?(legal-notice|privacy|cookies|contact)$/;

/** Path only: query, hash and trailing slash never make a page "new". */
export function normalisePath(path: string): string {
  const bare = path.split(/[?#]/)[0] || '/';
  return bare.length > 1 ? bare.replace(/\/+$/, '') : bare;
}

export function serviceTopic(path: string): InvitationTopic | null {
  const clean = normalisePath(path);
  return SERVICES.find(([pattern]) => pattern.test(clean))?.[1] ?? null;
}

/** Counts toward the visit: public website pages only (no Studio/API/auth/foundation/error). */
export function isCountedPage(path: string): boolean {
  return isAssistantWebsiteRoute(normalisePath(path));
}

/** May show the invitation on this page. */
export function mayInviteOn(path: string): boolean {
  const clean = normalisePath(path);
  return isCountedPage(clean) && !QUIET.test(clean);
}

export interface PageSignals {
  readonly path: string;
  /** Visible time on this page, in ms; hidden-tab time is never added. */
  readonly activeMs: number;
  /** Deepest scroll reached, 0–1; 1 when the page cannot scroll. */
  readonly scrollRatio: number;
}

export interface VisitState {
  readonly pages: ReadonlySet<string>;
  readonly sawService: boolean;
  /** The single invitation was shown, or the visitor already opened/dismissed help. */
  readonly settled: boolean;
}

export const NEW_VISIT: VisitState = { pages: new Set(), sawService: false, settled: false };

export function enterPage(state: VisitState, path: string): VisitState {
  if (!isCountedPage(path)) return state;
  const clean = normalisePath(path);
  return {
    ...state,
    pages: new Set(state.pages).add(clean),
    sawService: state.sawService || serviceTopic(clean) !== null,
  };
}

export function settle(state: VisitState): VisitState {
  return state.settled ? state : { ...state, settled: true };
}

export type InvitationReason = 'service-engagement' | 'multi-page';

export function invitationReason(
  state: VisitState,
  page: PageSignals,
  thresholds = INVITATION_THRESHOLDS,
): InvitationReason | null {
  if (state.settled || !mayInviteOn(page.path) || page.activeMs < thresholds.arrivalGraceMs)
    return null;
  if (
    serviceTopic(page.path) &&
    page.activeMs >= thresholds.serviceDwellMs &&
    page.scrollRatio >= thresholds.scrollRatio
  )
    return 'service-engagement';
  if (state.sawService && state.pages.size >= thresholds.distinctPages) return 'multi-page';
  return null;
}

/**
 * Scroll depth of the page. A page with nothing to scroll counts as fully
 * read, so only the dwell time can trigger it, never an instant offer.
 */
export function scrollDepth(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const range = scrollHeight - viewportHeight;
  if (range <= 1) return 1;
  return Math.min(1, Math.max(0, scrollY / range));
}
