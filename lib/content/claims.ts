/**
 * Claim classification.
 *
 * AGENTS.md §10 requires every fact introduced into user-facing output to be
 * classified. This module makes that classification a type error to omit
 * rather than a convention to remember.
 *
 * Only `confirmed` content may be presented as fact. Everything else must be
 * visibly marked in the UI.
 */

export type ClaimStatus =
  /** Verified in the source of truth or by primary evidence. */
  | 'confirmed'
  /** Suggested somewhere, not approved. */
  | 'proposal'
  /** Awaiting a human decision. */
  | 'pending'
  /** Cannot proceed until something else resolves. */
  | 'blocked'
  /** Asserted somewhere but not evidenced. */
  | 'unverified';

/**
 * Subject matter that requires competent human review before publication
 * (AGENTS.md §11). Any claim touching these is never `confirmed` here,
 * regardless of where the underlying figure came from.
 */
export type ReviewDomain = 'tax' | 'legal' | 'financial' | 'returns' | 'none';

export interface Claim {
  /** The text as it would be rendered. */
  readonly text: string;
  readonly status: ClaimStatus;
  /** Where the statement comes from. Required for anything `confirmed`. */
  readonly source?: string;
  /** Review domain. Anything other than 'none' cannot be `confirmed`. */
  readonly review?: ReviewDomain;
  /** Why it is not confirmed, in one line. Shown in the claims matrix. */
  readonly note?: string;
}

/** Narrow helper so content files read cleanly. */
export function claim(input: Claim): Claim {
  return input;
}

/** True when the claim may be rendered without a visible status marker. */
export function isPublishable(input: Claim): boolean {
  return input.status === 'confirmed' && (input.review ?? 'none') === 'none';
}

/**
 * The single approved public brand promise.
 * APPROVED + PUBLIC_PRODUCTION in brand-system/governance/decision-status-model.md.
 */
export const APPROVED_PROMISE = claim({
  text: 'Clarity before commitment.',
  status: 'confirmed',
  source: 'brand-system/governance/decision-status-model.md — APPROVED + PUBLIC_PRODUCTION',
  review: 'none',
});
