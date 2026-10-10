/**
 * Fixed-window rate limit for a future assistant endpoint (package C).
 *
 * The store is injected. `MemoryRateStore` is for tests and local runs only:
 * serverless instances do not share memory, so production needs a shared
 * store chosen with the provider decision. Keys must be non-identifying
 * (e.g. a salted, rotating hash), never a raw IP kept beyond the window.
 */
export interface RateStore {
  /** Adds one hit to `key` in the window starting at `windowStart`; returns the new count. */
  hit(key: string, windowStart: number, ttlMs: number): Promise<number>;
}

export interface RateRule {
  readonly limit: number;
  readonly windowMs: number;
}

/** Proposed defaults, pending the budget decision. */
export const ASSISTANT_RATE_RULES: readonly RateRule[] = [
  { limit: 6, windowMs: 60_000 },
  { limit: 30, windowMs: 24 * 60 * 60_000 },
];

export async function allow(
  store: RateStore,
  key: string,
  now: number,
  rules: readonly RateRule[] = ASSISTANT_RATE_RULES,
): Promise<{ allowed: boolean; retryAfterMs: number }> {
  let retryAfterMs = 0;
  for (const rule of rules) {
    const windowStart = now - (now % rule.windowMs);
    const count = await store.hit(`${rule.windowMs}:${key}`, windowStart, rule.windowMs);
    if (count > rule.limit)
      retryAfterMs = Math.max(retryAfterMs, windowStart + rule.windowMs - now);
  }
  return { allowed: retryAfterMs === 0, retryAfterMs };
}

export class MemoryRateStore implements RateStore {
  private readonly hits = new Map<string, { windowStart: number; count: number }>();
  async hit(key: string, windowStart: number): Promise<number> {
    const current = this.hits.get(key);
    const next =
      current && current.windowStart === windowStart
        ? { windowStart, count: current.count + 1 }
        : { windowStart, count: 1 };
    this.hits.set(key, next);
    return next.count;
  }
}
