/**
 * Consent record and Google Consent Mode mapping.
 *
 * PREPARATION ONLY. No vendor is connected (AGENTS.md §8): nothing in this
 * module loads a tag, sets a cookie by itself or sends data. It defines the
 * decision a visitor makes and how any future tag must read it, so that the
 * measurement work can start from an approved, tested contract once a vendor,
 * the cookie policy text and the consent mechanism are approved by a human.
 *
 * Rules encoded here:
 * - Only `necessary` is on without a decision; every optional purpose starts
 *   denied, and an unreadable, outdated or expired record counts as no decision.
 * - Accepting and rejecting are equally available (`acceptAll` / `rejectAll`).
 * - A change of the cookie policy version invalidates earlier decisions.
 * - The record stores booleans and dates only, never an identifier.
 */

export const CONSENT_COOKIE = 'sk_consent';
export const CONSENT_RECORD_VERSION = 1;

/** Optional purposes. `necessary` is not a choice and is not stored. */
export const CONSENT_PURPOSES = ['analytics', 'marketing'] as const;
export type ConsentPurpose = (typeof CONSENT_PURPOSES)[number];

export interface ConsentChoices {
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentRecord extends ConsentChoices {
  v: typeof CONSENT_RECORD_VERSION;
  /** Version of the approved cookie policy the visitor decided on. */
  policyVersion: string;
  decidedAt: string;
}

export interface ConsentPolicy {
  /** Approved cookie policy version; `null` while no policy is approved. */
  policyVersion: string | null;
  /**
   * How long a decision stays valid before asking again. A human decision
   * (cookie policy); the default is deliberately conservative.
   */
  maxAgeDays: number;
}

export const DEFAULT_CONSENT_POLICY: ConsentPolicy = { policyVersion: null, maxAgeDays: 180 };

export const DENIED: ConsentChoices = Object.freeze({ analytics: false, marketing: false });

const DAY_MS = 24 * 60 * 60 * 1000;

export function decide(
  choices: ConsentChoices,
  policy: ConsentPolicy,
  now: Date,
): ConsentRecord | null {
  if (!policy.policyVersion) return null;
  return {
    v: CONSENT_RECORD_VERSION,
    policyVersion: policy.policyVersion,
    decidedAt: now.toISOString(),
    analytics: choices.analytics === true,
    marketing: choices.marketing === true,
  };
}

export const acceptAll = (policy: ConsentPolicy, now: Date) =>
  decide({ analytics: true, marketing: true }, policy, now);
export const rejectAll = (policy: ConsentPolicy, now: Date) => decide(DENIED, policy, now);

export function serializeConsent(record: ConsentRecord): string {
  return encodeURIComponent(JSON.stringify(record));
}

/** Reads a stored value. Anything unexpected is treated as "no decision". */
export function parseConsent(
  raw: string | undefined | null,
  policy: ConsentPolicy,
  now: Date,
): ConsentRecord | null {
  if (!raw || raw.length > 512 || !policy.policyVersion) return null;
  let value: unknown;
  try {
    value = JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort().join(',');
  if (keys !== 'analytics,decidedAt,marketing,policyVersion,v') return null;
  if (record.v !== CONSENT_RECORD_VERSION || record.policyVersion !== policy.policyVersion)
    return null;
  if (typeof record.analytics !== 'boolean' || typeof record.marketing !== 'boolean') return null;
  if (typeof record.decidedAt !== 'string') return null;
  const decided = Date.parse(record.decidedAt);
  if (!Number.isFinite(decided) || decided > now.getTime() + 60_000) return null;
  if (now.getTime() - decided > policy.maxAgeDays * DAY_MS) return null;
  return record as unknown as ConsentRecord;
}

/** Effective choices: no valid decision means every optional purpose denied. */
export function effectiveChoices(record: ConsentRecord | null): ConsentChoices {
  return record ? { analytics: record.analytics, marketing: record.marketing } : { ...DENIED };
}

/** Cookie attributes for storing a decision; first-party, never readable cross-site. */
export function consentCookieAttributes(policy: ConsentPolicy, secure: boolean): string {
  return [
    `Max-Age=${policy.maxAgeDays * 24 * 60 * 60}`,
    'Path=/',
    'SameSite=Lax',
    secure ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
}

export type ConsentModeValue = 'granted' | 'denied';
export interface ConsentModeState {
  ad_storage: ConsentModeValue;
  ad_user_data: ConsentModeValue;
  ad_personalization: ConsentModeValue;
  analytics_storage: ConsentModeValue;
  functionality_storage: 'granted';
  security_storage: 'granted';
}

/**
 * Google Consent Mode v2 state for the given choices. The default call, before
 * any tag loads, must use `consentModeState(DENIED)`.
 */
export function consentModeState(choices: ConsentChoices): ConsentModeState {
  const g = (on: boolean): ConsentModeValue => (on ? 'granted' : 'denied');
  return {
    ad_storage: g(choices.marketing),
    ad_user_data: g(choices.marketing),
    ad_personalization: g(choices.marketing),
    analytics_storage: g(choices.analytics),
    functionality_storage: 'granted',
    security_storage: 'granted',
  };
}
