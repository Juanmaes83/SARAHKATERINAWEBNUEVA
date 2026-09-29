/**
 * Buyer System integration boundary.
 *
 * This is the ENTIRE integration surface. See docs/buyer-system-integration.md.
 *
 * Rules enforced here:
 *   - no Buyer System code is copied, vendored or reimplemented;
 *   - no tax figure, rate, formula or result is ever produced on this side;
 *   - the base URL is read only from the environment;
 *   - each experience carries its real upstream status.
 */

/** Availability, mirroring the upstream roadmap status. */
export type ExperienceAvailability =
  /** Live upstream and linkable only when an approved environment origin is configured. */
  | 'live'
  /** Upstream status `NEXT — LIMITED GO`: production needs Sarah + legal review. */
  | 'limited-go'
  /** No such experience exists upstream. */
  | 'not-built';

export interface BuyerSystemExperience {
  readonly id: string;
  /** The buyer's question, as the Buyer System itself names it. */
  readonly question: string;
  /** Short label for a card or button. */
  readonly label: string;
  /** Path on the Buyer System origin. Null when the experience does not exist. */
  readonly path: string | null;
  readonly availability: ExperienceAvailability;
  /** What the tool actually does and does not do. Verified upstream. */
  readonly scope: string;
  /** Why it cannot be linked yet, when it cannot. */
  readonly blockedReason?: string;
}

/**
 * Verified against the upstream repository on 2026-09-21.
 *
 * NOTE: purchase tax lives at the Buyer System ROOT, not at `/purchase-tax`.
 */
export const BUYER_SYSTEM_EXPERIENCES = {
  purchaseTax: {
    id: 'purchase-tax',
    question: 'What does Spain charge me to buy this?',
    label: 'Purchase tax',
    path: '/',
    availability: 'live',
    scope:
      'Comunitat Valenciana general regime, for transactions from 1 June 2026. Special reliefs are detected and routed to review rather than estimated.',
  },
  realCashNeeded: {
    id: 'real-cash-needed',
    question: 'How much cash will I really need?',
    label: 'Real cash needed',
    path: '/real-cash-needed',
    availability: 'live',
    scope:
      'Turns price, tax, money already paid, expected mortgage funds and buying costs into one cash picture. Never auto-estimates notary, registry, gestoría or valuation costs.',
  },
  askingPrice: {
    id: 'asking-price',
    question: 'Are they asking too much?',
    label: 'Asking price context',
    path: '/asking-price',
    availability: 'limited-go',
    scope:
      'Licensed official territorial context plus buyer-entered comparables, with an explicit evidence-confidence model. No automated valuation, no fair-price claim, no suggested offer.',
    blockedReason:
      'Upstream status is NEXT — LIMITED GO: production requires Sarah and legal review before it may be linked publicly.',
  },
  taxExposure: {
    id: 'tax-exposure',
    question: 'What is my Spanish tax exposure as an owner?',
    label: 'Tax exposure',
    path: null,
    availability: 'not-built',
    scope: 'Would cover recurring non-resident obligations such as Modelo 210.',
    blockedReason: 'No such experience exists in the Buyer System. It has not been commissioned.',
  },
  // `satisfies` rather than a type annotation: it validates every entry while
  // keeping the keys literal, so a lookup cannot be undefined.
} as const satisfies Record<string, BuyerSystemExperience>;

export type BuyerSystemExperienceKey = keyof typeof BUYER_SYSTEM_EXPERIENCES;

/**
 * The upstream production origin was verified on 2026-09-28. It is deliberately
 * not a code default: only controlled Preview environments may configure it.
 * When unset, the adapter renders a pending state.
 */
function baseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_BUYER_SYSTEM_URL;
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    // A malformed value must fail closed, never fall back to a guess.
    return null;
  }
}

export interface ResolvedEntryPoint {
  readonly experience: BuyerSystemExperience;
  /** Absolute URL, or null when it must not be linked. */
  readonly href: string | null;
  /** True when the UI must render a pending state instead of a link. */
  readonly pending: boolean;
  /** One line explaining the pending state, for the UI. */
  readonly pendingReason: string | null;
}

/**
 * Resolves an entry point for rendering.
 *
 * Fails closed: any invalid base URL, missing path or non-live availability
 * produces a pending state rather than a link.
 */
export function resolveEntryPoint(key: BuyerSystemExperienceKey): ResolvedEntryPoint {
  const experience = BUYER_SYSTEM_EXPERIENCES[key];
  const base = baseUrl();

  if (experience.availability !== 'live' || experience.path === null) {
    return {
      experience,
      href: null,
      pending: true,
      pendingReason: experience.blockedReason ?? 'Not available.',
    };
  }

  if (base === null) {
    return {
      experience,
      href: null,
      pending: true,
      pendingReason: 'No valid Buyer System origin is available in this environment.',
    };
  }

  return {
    experience,
    href: new URL(experience.path, base).toString(),
    pending: false,
    pendingReason: null,
  };
}

/**
 * Context handoff is NOT implemented, and this function documents why.
 *
 * The upstream ADR carries context between experiences through same-origin
 * `sessionStorage`, storing raw inputs only and never a computed result. A
 * cross-origin link from this site cannot reach that storage. The upstream
 * brief also forbids putting buyer amounts in a public URL, so query
 * parameters are not an available substitute.
 *
 * Prefilling therefore requires an approved contract between both
 * repositories (see docs/buyer-system-integration.md, B-05).
 */
export const CONTEXT_HANDOFF_SUPPORTED = false;
