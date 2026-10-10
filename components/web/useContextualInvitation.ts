'use client';

import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import {
  enterPage,
  invitationReason,
  scrollDepth,
  settle,
  type VisitState,
} from '@/lib/assistant/invitation';

/** A future consent banner marks itself with this attribute while it is open. */
const COMPETING_LAYERS = 'dialog[open], [aria-modal="true"], [data-sk-consent-open]';

/**
 * Local interest signals for the contextual help invitation.
 *
 * Counts visible time only (paused while the tab is hidden), tracks the
 * deepest scroll and the distinct pages of this visit in the layout-level
 * `visit` ref. Nothing is stored or sent. While a menu, dialog or consent
 * layer is open the offer is deferred, not used up. Automated browsers never
 * see it. Every listener and timer is removed on unmount.
 */
export function useContextualInvitation(
  path: string,
  visit: MutableRefObject<VisitState>,
  paused: boolean,
) {
  const [shown, setShown] = useState(false);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    visit.current = enterPage(visit.current, path);
    if (visit.current.settled || navigator.webdriver) return;

    let active = 0;
    let since: number | null = document.visibilityState === 'visible' ? performance.now() : null;
    let depth = 0;
    let timer: number | undefined;
    let frame: number | undefined;

    const measure = () => {
      frame = undefined;
      const root = document.documentElement;
      depth = Math.max(depth, scrollDepth(window.scrollY, root.scrollHeight, window.innerHeight));
    };
    const check = () => {
      measure();
      const activeMs = active + (since === null ? 0 : performance.now() - since);
      if (!invitationReason(visit.current, { path, activeMs, scrollRatio: depth })) return;
      if (pausedRef.current || document.querySelector(COMPETING_LAYERS)) return;
      visit.current = settle(visit.current);
      setShown(true);
      stop();
    };
    const startTimer = () => {
      if (timer === undefined) timer = window.setInterval(check, 1000);
    };
    const stopTimer = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        since = performance.now();
        startTimer();
      } else {
        if (since !== null) active += performance.now() - since;
        since = null;
        stopTimer();
      }
    };
    const onScroll = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(measure);
    };
    function stop() {
      stopTimer();
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', onScroll);
    }

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('scroll', onScroll, { passive: true });
    measure();
    if (since !== null) startTimer();
    return stop;
  }, [path, visit]);

  return {
    shown,
    /** Opening, accepting or dismissing help ends invitations for this visit. */
    close: () => {
      visit.current = settle(visit.current);
      setShown(false);
    },
  };
}
