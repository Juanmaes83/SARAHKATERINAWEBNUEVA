'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { HeroVideo } from '@/lib/media/hero-video';
import { cn } from '@/lib/utils/cn';
import styles from './ScrubVideo.module.css';

/**
 * Scroll-scrubbed hero video — Phase 2F motion primitive.
 *
 * Reference: the live sarahkaterina.com home. A short, muted, inline video
 * that never plays: its `currentTime` follows the page scroll, forwards when
 * scrolling down and backwards when scrolling up, clamped to the first and
 * last frames.
 *
 * TWO RANGES, CHOSEN BY LAYOUT, NOT BY DEVICE SNIFFING
 *
 *  - Held (desktop, ≥1024px, motion allowed, scripting on): the hero sits in
 *    a `ScrubStage` whose runway (a CSS-only spacer) keeps the hero
 *    sticky for a bounded distance. The video scrubs across that runway while
 *    the whole hero stays in view, then the page scrolls on. Nothing traps:
 *    every scroll moves either the video or the page.
 *  - Passing (tablet and phone, or no stage): no runway. The video scrubs
 *    while its frame travels from 90% to 15% of the viewport height, so the
 *    distance scales with the phone's own screen instead of inheriting the
 *    desktop runway.
 *
 * STATES AND SAFETY
 *
 *  - The poster is a `<picture>`: the clip's first frame when the scrub will
 *    run (so poster → video never jumps), its final, representative frame
 *    under reduced motion or without scripting. One file is fetched.
 *  - The video has no `src` in the server markup; it is attached after the
 *    window `load` event, so it never competes with the poster, the LCP.
 *  - The video fades in only after its first seek lands. Until then — slow
 *    metadata, slow network — the poster shows. On any media error the final
 *    poster is laid over it and the stage releases its runway.
 *  - Reduced motion: nothing loads, nothing moves; the final poster shows.
 *  - Scroll work runs only while the stage intersects the viewport, one
 *    `requestAnimationFrame` per scroll burst, and seeks are coalesced (a new
 *    seek waits for `seeked`) so fast scrolling never queues seeks.
 *  - Unmounting (route change) detaches the source and releases the decoder.
 *
 * The video is decorative (`aria-hidden`); the poster's alt text carries the
 * content, and the hero's H1, lead and CTAs are ordinary HTML beside it.
 */

const MOBILE = '(max-width: 767px)';
const SCRUB = '(prefers-reduced-motion: no-preference) and (scripting: enabled)';
/** Passing range: frame top from this fraction of the viewport … */
const PASS_START = 0.9;
/** … to this one. */
const PASS_END = 0.15;
const FRAME_STEP = 1 / 24;

type ScrubState = 'poster' | 'ready' | 'failed';

export interface ScrubVideoProps {
  readonly video: HeroVideo;
  readonly className?: string;
  /** Overlays that belong to the frame (none may cover labels in the footage). */
  readonly children?: ReactNode;
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function ScrubVideo({ video, className, children }: ScrubVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<ScrubState>('poster');
  const { desktop, mobile } = video;

  useEffect(() => {
    const frame = frameRef.current;
    const el = videoRef.current;
    if (!frame || !el) return;
    if (!window.matchMedia(SCRUB).matches) return; // Reduced motion: poster only.

    const stage = frame.closest<HTMLElement>('[data-scrub-stage]');
    const stuck = stage?.firstElementChild as HTMLElement | null;
    const mobileQuery = window.matchMedia(MOBILE);
    let disposed = false;
    let frameRequest = 0;
    let target = 0;
    let listening = false;

    /** Progress 0–1 for the current scroll position. */
    const progress = (): number => {
      const vh = window.innerHeight;
      // The runway is the stage's ::after block (desktop only, pure CSS).
      const after = stage ? getComputedStyle(stage, '::after') : null;
      const runway = after && after.display !== 'none' ? parseFloat(after.height) || 0 : 0;
      if (stage && stuck && runway > 0) {
        const top = parseFloat(getComputedStyle(stuck).top) || 0;
        return clamp((top - stage.getBoundingClientRect().top) / runway);
      }
      const rect = frame.getBoundingClientRect();
      return clamp((vh * PASS_START - rect.top) / (vh * (PASS_START - PASS_END)));
    };

    const seek = () => {
      if (!el.duration || el.readyState < 1 || el.seeking) return;
      if (Math.abs(el.currentTime - target) >= FRAME_STEP / 2) el.currentTime = target;
    };

    const update = () => {
      frameRequest = 0;
      if (!el.duration) return;
      target = progress() * Math.max(0, el.duration - FRAME_STEP);
      seek();
    };
    const schedule = () => {
      if (!frameRequest) frameRequest = requestAnimationFrame(update);
    };

    /**
     * Sticky offset: under the sticky header when the hero fits the viewport;
     * otherwise bottom-aligned, so the whole visual stays in view while held.
     */
    const placeStage = () => {
      if (!stage || !stuck) return;
      const header = document.querySelector<HTMLElement>('header');
      const headerBottom =
        header && getComputedStyle(header).position === 'sticky'
          ? header.getBoundingClientRect().height
          : 0;
      const top = Math.min(headerBottom, window.innerHeight - stuck.offsetHeight);
      stage.style.setProperty('--sk-scrub-top', `${Math.round(top)}px`);
      schedule();
    };

    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      const method = on ? 'addEventListener' : 'removeEventListener';
      window[method]('scroll', schedule, { passive: true } as AddEventListenerOptions);
      window[method]('resize', placeStage);
      if (on) schedule();
    };

    // Work only while the hero (or its stage) is on screen.
    const observer = new IntersectionObserver(([entry]) => listen(Boolean(entry?.isIntersecting)));
    observer.observe(stage ?? frame);

    const resize = new ResizeObserver(placeStage);
    if (stuck) resize.observe(stuck);

    const onSeeked = () => {
      if (disposed) return;
      setState((s) => (s === 'poster' ? 'ready' : s));
      seek(); // A newer target may have arrived while this seek ran.
    };
    const onData = () => update();
    const onError = () => {
      setState('failed');
      stage?.setAttribute('data-scrub-off', '');
      listen(false);
    };
    el.addEventListener('loadeddata', onData);
    el.addEventListener('seeked', onSeeked);
    el.addEventListener('error', onError);

    const attach = () => {
      if (disposed) return;
      el.src = (mobileQuery.matches ? mobile : desktop).src;
      el.preload = 'auto';
      el.load();
    };
    if (document.readyState === 'complete') attach();
    else window.addEventListener('load', attach, { once: true });

    // Crossing the phone breakpoint swaps the cut (the frame's ratio differs).
    const onBreakpoint = () => {
      setState((s) => (s === 'failed' ? s : 'poster'));
      attach();
    };
    mobileQuery.addEventListener('change', onBreakpoint);
    placeStage();

    return () => {
      disposed = true;
      listen(false);
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frameRequest);
      window.removeEventListener('load', attach);
      mobileQuery.removeEventListener('change', onBreakpoint);
      el.removeEventListener('loadeddata', onData);
      el.removeEventListener('seeked', onSeeked);
      el.removeEventListener('error', onError);
      // Release the decoder on route change.
      el.removeAttribute('src');
      el.load();
    };
  }, [desktop, mobile]);

  return (
    <div
      ref={frameRef}
      className={cn(styles.frame, className)}
      data-scrub={state}
      style={
        {
          '--sk-scrub-ratio': `${desktop.width} / ${desktop.height}`,
          '--sk-scrub-ratio-mobile': `${mobile.width} / ${mobile.height}`,
        } as CSSProperties
      }
    >
      <picture>
        <source media={`${MOBILE} and ${SCRUB}`} srcSet={mobile.posterStart} type="image/webp" />
        <source media={MOBILE} srcSet={mobile.posterEnd} type="image/webp" />
        <source media={SCRUB} srcSet={desktop.posterStart} type="image/webp" />
        {/* Art-directed poster: <picture> picks one of four pre-sized WebP frames by breakpoint, motion preference and scripting — media conditions next/image cannot express. */}
        <img
          className={styles.poster}
          src={desktop.posterEnd}
          alt={video.posterAlt}
          width={desktop.width}
          height={desktop.height}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <video
        ref={videoRef}
        className={styles.video}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
        tabIndex={-1}
      />
      {state === 'failed' ? (
        // Failure fallback: the final representative frame over whatever the picture chose.
        // eslint-disable-next-line @next/next/no-img-element -- a small pre-sized WebP, only after a media error.
        <img
          className={styles.poster}
          src={
            (typeof window !== 'undefined' && window.matchMedia(MOBILE).matches ? mobile : desktop)
              .posterEnd
          }
          alt=""
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  );
}

/**
 * The desktop runway around a hero. Server-safe: the runway and the sticky
 * hold are pure CSS behind `(min-width: 1024px)`, reduced motion and
 * `(scripting: enabled)`, so the first paint already has its final layout and
 * no content shifts when JavaScript arrives.
 */
export function ScrubStage({ children }: { readonly children: ReactNode }) {
  return (
    <div className={styles.stage} data-scrub-stage>
      {children}
    </div>
  );
}
