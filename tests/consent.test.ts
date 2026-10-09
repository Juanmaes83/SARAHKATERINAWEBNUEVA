import { describe, expect, it, vi } from 'vitest';
import {
  CONSENT_COOKIE,
  DEFAULT_CONSENT_POLICY,
  DENIED,
  acceptAll,
  consentCookieAttributes,
  consentModeState,
  decide,
  effectiveChoices,
  parseConsent,
  rejectAll,
  serializeConsent,
} from '@/lib/consent/consent';
import { consentedAdapter } from '@/lib/analytics/consented';

const policy = { policyVersion: 'test-1', maxAgeDays: 180 };
const now = new Date('2026-10-09T12:00:00Z');

describe('consent record (preparation, no vendor)', () => {
  it('denies every optional purpose without a valid decision', () => {
    expect(effectiveChoices(null)).toEqual(DENIED);
    expect(consentModeState(DENIED)).toMatchObject({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  });

  it('records nothing while no cookie policy is approved', () => {
    expect(DEFAULT_CONSENT_POLICY.policyVersion).toBeNull();
    expect(acceptAll(DEFAULT_CONSENT_POLICY, now)).toBeNull();
    expect(
      parseConsent(serializeConsent(acceptAll(policy, now)!), DEFAULT_CONSENT_POLICY, now),
    ).toBeNull();
  });

  it('accepting and rejecting are symmetric and round-trip', () => {
    for (const record of [
      acceptAll(policy, now)!,
      rejectAll(policy, now)!,
      decide({ analytics: true, marketing: false }, policy, now)!,
    ]) {
      expect(parseConsent(serializeConsent(record), policy, now)).toEqual(record);
    }
    expect(
      consentModeState(
        effectiveChoices(decide({ analytics: true, marketing: false }, policy, now)),
      ),
    ).toMatchObject({
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
    });
  });

  it('treats tampered, outdated, expired or future records as no decision', () => {
    const ok = acceptAll(policy, now)!;
    const later = (days: number) => new Date(now.getTime() + days * 86_400_000);
    for (const raw of [
      'garbage',
      '%E0%A4%A',
      serializeConsent({ ...ok, analytics: 'yes' } as never),
      serializeConsent({ ...ok, extra: 1 } as never),
      serializeConsent({ ...ok, v: 2 } as never),
      encodeURIComponent('[]'),
      'x'.repeat(600),
    ])
      expect(parseConsent(raw, policy, now)).toBeNull();
    expect(
      parseConsent(serializeConsent(ok), { ...policy, policyVersion: 'test-2' }, now),
    ).toBeNull();
    expect(parseConsent(serializeConsent(ok), policy, later(181))).toBeNull();
    expect(parseConsent(serializeConsent(ok), policy, later(179))).toEqual(ok);
    expect(
      parseConsent(serializeConsent({ ...ok, decidedAt: later(1).toISOString() }), policy, now),
    ).toBeNull();
  });

  it('stores no identifier and uses first-party cookie attributes', () => {
    expect(Object.keys(acceptAll(policy, now)!).sort()).toEqual([
      'analytics',
      'decidedAt',
      'marketing',
      'policyVersion',
      'v',
    ]);
    expect(CONSENT_COOKIE).toBe('sk_consent');
    expect(consentCookieAttributes(policy, true)).toBe(
      'Max-Age=15552000; Path=/; SameSite=Lax; Secure',
    );
  });
});

describe('consented analytics adapter', () => {
  it('forwards only while analytics consent is granted, re-reading it on every event', () => {
    const send = vi.fn();
    let choices = { ...DENIED };
    const adapter = consentedAdapter({ name: 'fake', send }, () => choices);
    adapter.send('section_view', { section: 'hero' });
    expect(send).not.toHaveBeenCalled();
    choices = { analytics: true, marketing: false };
    adapter.send('section_view', { section: 'hero' });
    expect(send).toHaveBeenCalledTimes(1);
    choices = { ...DENIED };
    adapter.send('section_view', { section: 'faq' });
    expect(send).toHaveBeenCalledTimes(1);
  });
});
