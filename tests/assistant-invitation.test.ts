import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  INVITATION_THRESHOLDS,
  NEW_VISIT,
  enterPage,
  invitationReason,
  isCountedPage,
  mayInviteOn,
  normalisePath,
  scrollDepth,
  serviceTopic,
  settle,
  type VisitState,
} from '@/lib/assistant/invitation';
import { assistantCopy } from '@/content/en/assistant';

const visit = (...paths: string[]): VisitState =>
  paths.reduce<VisitState>((state, path) => enterPage(state, path), NEW_VISIT);
const SECOND = 1000;

describe('contextual invitation signals', () => {
  it('keeps the brief thresholds as explicit, reviewable hypotheses', () => {
    expect(INVITATION_THRESHOLDS).toEqual({
      serviceDwellMs: 45_000,
      scrollRatio: 0.5,
      distinctPages: 3,
      arrivalGraceMs: 5_000,
    });
  });

  it('needs 45 s of visible time AND half the page on a service', () => {
    const state = visit('/preview/tax-advisory');
    const page = { path: '/preview/tax-advisory', activeMs: 45 * SECOND, scrollRatio: 0.5 };
    expect(invitationReason(state, page)).toBe('service-engagement');
    expect(invitationReason(state, { ...page, activeMs: 44.9 * SECOND })).toBeNull();
    expect(invitationReason(state, { ...page, scrollRatio: 0.49 })).toBeNull();
  });

  it('does not treat a non-service page as service engagement', () => {
    const state = visit('/preview/team');
    expect(
      invitationReason(state, { path: '/preview/team', activeMs: 120 * SECOND, scrollRatio: 1 }),
    ).toBeNull();
  });

  it('offers after three distinct pages including a service, after a short grace', () => {
    const state = visit('/preview/home', '/preview/investment', '/preview/team');
    const page = { path: '/preview/team', activeMs: 5 * SECOND, scrollRatio: 0 };
    expect(invitationReason(state, page)).toBe('multi-page');
    // Never on arrival: the page must be visible for the grace period first.
    expect(invitationReason(state, { ...page, activeMs: 4.9 * SECOND })).toBeNull();
  });

  it('does not count three pages without a service', () => {
    const state = visit('/preview/home', '/preview/team', '/preview/insights');
    expect(
      invitationReason(state, { path: '/preview/insights', activeMs: 60 * SECOND, scrollRatio: 1 }),
    ).toBeNull();
  });

  it('counts distinct normalised pages, not query, hash or repeat visits', () => {
    const state = visit(
      '/preview/investment',
      '/preview/investment?x=1',
      '/preview/investment#faq',
      '/preview/investment/',
      '/preview/home',
      '/preview/home',
    );
    expect([...state.pages]).toEqual(['/preview/investment', '/preview/home']);
    expect(
      invitationReason(state, { path: '/preview/home', activeMs: 60 * SECOND, scrollRatio: 1 }),
    ).toBeNull();
  });

  it('excludes Studio, API, auth, foundation and unknown pages from the visit', () => {
    const state = visit(
      '/preview/tax-advisory',
      '/studio',
      '/studio/login',
      '/api/studio/media',
      '/foundation',
      '/does-not-exist',
    );
    expect([...state.pages]).toEqual(['/preview/tax-advisory']);
    for (const path of ['/studio', '/api/x', '/foundation', '/studio/accept-invite'])
      expect(isCountedPage(path)).toBe(false);
  });

  it('counts legal and contact pages but never interrupts them', () => {
    const state = visit('/preview/investment', '/preview/privacy', '/preview/contact');
    expect(state.pages.size).toBe(3);
    for (const path of [
      '/preview/privacy',
      '/preview/cookies',
      '/preview/legal-notice',
      '/contact',
    ])
      expect(mayInviteOn(path)).toBe(false);
    expect(
      invitationReason(state, { path: '/preview/contact', activeMs: 90 * SECOND, scrollRatio: 1 }),
    ).toBeNull();
  });

  it('allows a single invitation per visit: once settled it never returns', () => {
    const state = settle(visit('/preview/home', '/preview/investment', '/preview/team'));
    expect(
      invitationReason(state, { path: '/preview/team', activeMs: 60 * SECOND, scrollRatio: 1 }),
    ).toBeNull();
    expect(enterPage(state, '/preview/tax-advisory').settled).toBe(true);
    expect(settle(state)).toBe(state);
  });

  it('maps each service page, legacy paths included, to its catalogue topic', () => {
    expect(serviceTopic('/preview/property-purchase')).toBe('A02');
    expect(serviceTopic('/services/property-purchase')).toBe('A02');
    expect(serviceTopic('/preview/investment#x')).toBe('A03');
    expect(serviceTopic('/investment')).toBe('A03');
    expect(serviceTopic('/preview/tax-advisory?q=1')).toBe('A04');
    expect(serviceTopic('/services/tax-advisory')).toBe('A04');
    expect(serviceTopic('/preview/team')).toBeNull();
    expect(serviceTopic('/preview/investments')).toBeNull();
  });

  it('measures scroll depth and treats a page without scroll as read, not instant', () => {
    expect(scrollDepth(0, 2000, 1000)).toBe(0);
    expect(scrollDepth(500, 2000, 1000)).toBe(0.5);
    expect(scrollDepth(5000, 2000, 1000)).toBe(1);
    expect(scrollDepth(0, 800, 1000)).toBe(1);
    const state = visit('/preview/investment');
    // Fully "read" short page still waits for the 45 s dwell.
    expect(
      invitationReason(state, {
        path: '/preview/investment',
        activeMs: 10 * SECOND,
        scrollRatio: 1,
      }),
    ).toBeNull();
  });

  it('normalises paths', () => {
    expect(normalisePath('/')).toBe('/');
    expect(normalisePath('/?a=1')).toBe('/');
    expect(normalisePath('/preview/home/#top')).toBe('/preview/home');
  });
});

describe('contextual invitation boundaries', () => {
  const hook = readFileSync('components/web/useContextualInvitation.ts', 'utf8');
  const panel = readFileSync('components/web/GuidedAssistant.tsx', 'utf8');
  const css = readFileSync('components/web/GuidedAssistant.module.css', 'utf8');

  it('keeps signals in memory: no storage, cookies, network or analytics', () => {
    for (const forbidden of [
      'localStorage',
      'sessionStorage',
      'document.cookie',
      'fetch(',
      'sendBeacon',
      'track(',
    ])
      expect(hook + panel).not.toContain(forbidden);
  });

  it('pauses on hidden tabs, defers behind layers, skips automation and cleans up', () => {
    expect(hook).toContain('visibilitychange');
    expect(hook).toContain('navigator.webdriver');
    expect(hook).toContain('dialog[open]');
    expect(hook).toContain('removeEventListener');
    expect(hook).toContain('clearInterval');
  });

  it('never opens the panel by itself and has no sound', () => {
    expect(hook).not.toContain('setOpen');
    expect(panel + hook).not.toMatch(/new Audio|AudioContext|\.play\(/);
  });

  it('uses a single pulse and drops motion for reduced-motion users', () => {
    expect(css).toMatch(/invitePulse [^;]* 1;/);
    expect(css).not.toContain('infinite');
    expect(css).toMatch(
      /prefers-reduced-motion: reduce\)\s*\{\s*\.invited,\s*\.invitation\s*\{\s*animation: none/,
    );
  });

  it('identifies itself as digital and offers both actions', () => {
    expect(assistantCopy.label).toBe('Digital assistant');
    expect(assistantCopy.invitation.accept).toBe('Ask a question');
    expect(assistantCopy.invitation.dismiss).toBe('Not now');
  });
});
