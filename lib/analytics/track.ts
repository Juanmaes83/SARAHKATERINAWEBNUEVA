import type { AnalyticsEventMap, AnalyticsEventName } from './events';
import { siteConfig } from '../seo/config';

/**
 * Analytics adapter.
 *
 * In this phase the only registered adapter is a no-op. Connecting a real
 * destination requires: an approved vendor, an approved consent mechanism
 * (seo-final-audit-2026-09.md P0 #8) and a human decision. Until then `track`
 * is safe to call from anywhere and does nothing observable in production.
 */
export interface AnalyticsAdapter {
  readonly name: string;
  send<K extends AnalyticsEventName>(name: K, payload: AnalyticsEventMap[K]): void;
}

/** The default and, in this phase, only adapter. */
export const noopAdapter: AnalyticsAdapter = {
  name: 'noop',
  send() {
    // Intentionally empty. No vendor is connected in this phase.
  },
};

let adapter: AnalyticsAdapter = noopAdapter;

/**
 * Registering a non-noop adapter is a governance decision, not a code change
 * an agent may make unilaterally. Exposed so the seam is testable.
 */
export function registerAnalyticsAdapter(next: AnalyticsAdapter): void {
  adapter = next;
}

export function getAnalyticsAdapter(): AnalyticsAdapter {
  return adapter;
}

export function track<K extends AnalyticsEventName>(
  name: K,
  payload: AnalyticsEventMap[K],
): void {
  adapter.send(name, payload);

  if (siteConfig.mode === 'preview' && process.env.NODE_ENV === 'development') {
    // Development visibility only. Never ships to a production bundle path.
    console.debug('[analytics:noop]', name, payload);
  }
}
