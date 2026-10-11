import type { AnalyticsAdapter } from './track';
import type { ConsentChoices } from '../consent/consent';

/**
 * Wraps a future vendor adapter so no event leaves the page without analytics
 * consent. Consent is read on every call, so a withdrawal applies immediately.
 * Registering the result is still a governance decision (AGENTS.md §8).
 */
export function consentedAdapter(
  inner: AnalyticsAdapter,
  readConsent: () => ConsentChoices,
): AnalyticsAdapter {
  return {
    name: `consented:${inner.name}`,
    send(name, payload) {
      if (readConsent().analytics !== true) return;
      inner.send(name, payload);
    },
  };
}
