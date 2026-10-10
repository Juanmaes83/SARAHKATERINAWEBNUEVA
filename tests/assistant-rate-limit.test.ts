import { describe, expect, it } from 'vitest';
import { MemoryRateStore, allow } from '@/lib/assistant/rate-limit';

describe('assistant rate limit', () => {
  it('allows the per-minute quota, then reports when to retry', async () => {
    const store = new MemoryRateStore();
    const start = 1_000_000_020_000;
    for (let i = 0; i < 6; i++) expect((await allow(store, 'k', start)).allowed).toBe(true);
    const blocked = await allow(store, 'k', start + 1_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
    expect(blocked.retryAfterMs).toBeLessThanOrEqual(60_000);
    // Another visitor key is unaffected.
    expect((await allow(store, 'other', start)).allowed).toBe(true);
  });

  it('enforces the daily cap across minutes', async () => {
    const store = new MemoryRateStore();
    const day = 24 * 60 * 60_000;
    let now = day * 20_000;
    let allowed = 0;
    for (let i = 0; i < 40; i++) {
      if ((await allow(store, 'k', now)).allowed) allowed++;
      now += 61_000;
    }
    expect(allowed).toBe(30);
  });
});
