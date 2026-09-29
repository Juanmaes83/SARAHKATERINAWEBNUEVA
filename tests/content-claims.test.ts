import { describe, expect, it } from 'vitest';
import { isPublishable, type Claim, type ReviewDomain } from '../lib/content/claims';
import * as investment from '../content/en/investment';
import {
  BUYER_SYSTEM_EXPERIENCES,
  CONTEXT_HANDOFF_SUPPORTED,
  resolveEntryPoint,
} from '../lib/buyer-system/links';

/** Recursively collects every Claim in the content module. */
function collectClaims(value: unknown, path: string[] = []): Array<{ path: string; claim: Claim }> {
  const found: Array<{ path: string; claim: Claim }> = [];

  if (Array.isArray(value)) {
    value.forEach((entry, index) => found.push(...collectClaims(entry, [...path, String(index)])));
    return found;
  }

  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    if (typeof record.text === 'string' && typeof record.status === 'string') {
      found.push({ path: path.join('.'), claim: record as unknown as Claim });
      return found;
    }
    for (const [key, entry] of Object.entries(record)) {
      found.push(...collectClaims(entry, [...path, key]));
    }
  }

  return found;
}

const claims = collectClaims(investment);

describe('investment content — claim classification', () => {
  it('collects a meaningful number of claims', () => {
    expect(claims.length).toBeGreaterThan(50);
  });

  it('every claim carries a valid status', () => {
    const valid = new Set(['confirmed', 'proposal', 'pending', 'blocked', 'unverified']);
    const invalid = claims
      .filter(({ claim }) => !valid.has(claim.status))
      .map(({ path, claim }) => `${path}: ${claim.status}`);
    expect(invalid).toEqual([]);
  });

  it('every confirmed claim cites a source', () => {
    const unsourced = claims
      .filter(({ claim }) => claim.status === 'confirmed' && !claim.source)
      .map(({ path, claim }) => `${path}: "${claim.text}"`);
    expect(unsourced).toEqual([]);
  });

  it('no claim in a review domain is marked confirmed', () => {
    // AGENTS.md §11: tax, legal, financial and returns statements require
    // competent human review and can never be asserted as fact by an agent.
    const domains: ReviewDomain[] = ['tax', 'legal', 'financial', 'returns'];
    const offenders = claims
      .filter(
        ({ claim }) =>
          claim.status === 'confirmed' &&
          domains.includes((claim.review ?? 'none') as ReviewDomain),
      )
      .map(({ path, claim }) => `${path}: "${claim.text}" (${claim.review})`);
    expect(offenders).toEqual([]);
  });

  it('isPublishable rejects anything that is not confirmed and review-free', () => {
    const wronglyPublishable = claims
      .filter(({ claim }) => isPublishable(claim))
      .filter(({ claim }) => claim.status !== 'confirmed' || (claim.review ?? 'none') !== 'none');
    expect(wronglyPublishable).toEqual([]);
  });
});

describe('investment content — forbidden content', () => {
  const texts = claims.map(({ path, claim }) => ({ path, text: claim.text }));

  it('contains no currency figure', () => {
    // Rule 8: no invented prices. Prices exist upstream but are not approved
    // for publication (decision gate D2-04), so none appears in rendered copy.
    const offenders = texts
      .filter(({ text }) => /[€$£]\s?\d|\d\s?(?:€|EUR\b|euros?\b)/i.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('contains no percentage, yield or return figure', () => {
    const offenders = texts
      .filter(({ text }) => /\d+(?:[.,]\d+)?\s?%/.test(text))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('contains no uniqueness or absence-of-competition claim', () => {
    // PROHIBITED upstream (decisions-log.md 2026-08-05), in any asset.
    const patterns = [
      /\bthe only\b/i,
      /\bunique(?:ly)?\b/i,
      /\bno one else\b/i,
      /\bnobody else\b/i,
      /\bfirst and only\b/i,
      /\bunlike any\b/i,
    ];
    const offenders = texts
      .filter(({ text }) => patterns.some((pattern) => pattern.test(text)))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('contains no guarantee or promise of outcome', () => {
    const patterns = [/\bguarantee/i, /\bwe promise\b/i, /\brisk[- ]free\b/i, /\bwill save you\b/i];
    const offenders = texts
      .filter(({ text }) => patterns.some((pattern) => pattern.test(text)))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('contains no held or unapproved naming', () => {
    const patterns = [
      /VITA\s*Host/i,
      /Sarah Katerina Group/i,
      /Property Decision Advisor/i,
      /Personal Shopper/i,
    ];
    const offenders = texts
      .filter(({ text }) => patterns.some((pattern) => pattern.test(text)))
      .map(({ path, text }) => `${path}: "${text}"`);
    expect(offenders).toEqual([]);
  });

  it('uses PENDING_APPROVAL rather than an invented value where data is missing', () => {
    const pendingClaims = claims.filter(({ claim }) => claim.status === 'pending');
    expect(pendingClaims.length).toBeGreaterThan(5);
  });
});

describe('buyer system integration boundary', () => {
  it('purchase tax points at the Buyer System root, not /purchase-tax', () => {
    expect(BUYER_SYSTEM_EXPERIENCES.purchaseTax?.path).toBe('/');
  });

  it('asking price is limited-go and never resolves to a link', () => {
    expect(BUYER_SYSTEM_EXPERIENCES.askingPrice?.availability).toBe('limited-go');
    const resolved = resolveEntryPoint('askingPrice');
    expect(resolved.href).toBeNull();
    expect(resolved.pending).toBe(true);
  });

  it('tax exposure does not exist and never resolves to a link', () => {
    expect(BUYER_SYSTEM_EXPERIENCES.taxExposure?.availability).toBe('not-built');
    expect(resolveEntryPoint('taxExposure').href).toBeNull();
  });

  it('uses the verified production origin when no override is configured', () => {
    const resolved = resolveEntryPoint('realCashNeeded');
    expect(resolved.href).toBe('https://sarah-katerina-buyer-system.vercel.app/real-cash-needed');
    expect(resolved.pending).toBe(false);
    expect(resolved.pendingReason).toBeNull();
  });

  it('declares that cross-origin context handoff is not supported', () => {
    expect(CONTEXT_HANDOFF_SUPPORTED).toBe(false);
  });

  it('reproduces no tax rate, figure or formula', () => {
    // The upstream engine is the only place a tax figure may be produced.
    const scopes = Object.values(BUYER_SYSTEM_EXPERIENCES).map((e) => e.scope);
    const offenders = scopes.filter((scope) => /\d+(?:[.,]\d+)?\s?%/.test(scope));
    expect(offenders).toEqual([]);
  });
});
