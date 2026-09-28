'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { HeroVideo } from '@/lib/media/hero-video';
import { Icon } from '@/components/web/icons/Icon';
import { cn } from '@/lib/utils/cn';
import film from './PlayOnceVideo.module.css';
import styles from './HeroFilm.module.css';

/**
 * Hero film — Phase 2H motion primitive (docs/phase-2h-juanma-review.md §A).
 *
 * Juanma's review asked the Investment and Property Purchase hero videos to
 * move without depending on scroll. This is the Phase 2F hero (`ScrubVideo`)
 * with the scroll mapping replaced by one muted playback:
 *
 *  - The poster is the same art-directed `<picture>`: the clip's first frame
 *    when the film will play (so poster → video never jumps), its final,
 *    representative frame under reduced motion or without scripting.
 *  - No `src` in the server markup. The route's own cut (desktop or mobile,
 *    by media query) is attached after the window `load` event, so it never
 *    competes with the poster, the LCP.
 *  - It plays once, muted and inline, while the hero is on screen, and rests
 *    on its final frame. It never loops and has no `autoplay` attribute.
 *  - Scrolling away pauses it; coming back resumes it. So does the tab.
 *  - A visible control pauses, resumes and replays it (WCAG 2.2.2).
 *  - Reduced motion: nothing loads or plays by itself; the final poster shows
 *    and the control offers playback.
 *  - On a media error the final poster is laid over the frame and the control
 *    is retired.
 *
 * The `<video>` is decorative (`aria-hidden`); the poster's alt text carries
 * the content, and the hero's H1, lead and CTAs are ordinary HTML beside it.
 * There is no sound: the cuts carry no audio track.
 */

const MOBILE = '(max-width: 767px)';
const MOTION = '(prefers-reduced-motion: no-preference) and (scripting: enabled)';

type FilmState = 'poster' | 'playing' | 'paused' | 'ended' | 'failed';

export interface HeroFilmProps {
  readonly video: HeroVideo;
  /** Names the film in the control, e.g. "the film" → "Pause the film". */
  readonly name: string;
  readonly className?: string;
}

export function HeroFilm({ video, name, className }: HeroFilmProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<FilmState>('poster');
  const [enhanced, setEnhanced] = useState(false);
  /** The cut currently attached, so the control can attach one on demand. */
  const attachRef = useRef<() => void>(() => undefined);
  const { desktop, mobile } = video;

  useEffect(() => {
    const frame = frameRef.current;
    const el = videoRef.current;
    if (!frame || !el) return;
    setEnhanced(true);

    const mobileQuery = window.matchMedia(MOBILE);
    const autoplay = window.matchMedia(MOTION).matches;
    let disposed = false;
    let visible = false;
    let tabHidden = document.hidden;
    /** The film should be running: set by the first arrival and by the control. */
    let wanted = autoplay;

    const attach = () => {
      if (disposed) return;
      const src = (mobileQuery.matches ? mobile : desktop).src;
      if (el.getAttribute('src') === src) return;
      el.src = src;
      el.preload = 'auto';
      el.load();
    };
    attachRef.current = attach;

    const run = () => {
      if (!wanted || !visible || tabHidden || el.ended) return;
      if (!el.getAttribute('src')) return;
      void el.play().catch(() => setState((s) => (s === 'failed' ? s : 'paused')));
    };

    const onPlaying = () => setState('playing');
    const onPause = () => setState((s) => (s === 'ended' || s === 'failed' ? s : 'paused'));
    const onEnded = () => {
      wanted = false;
      setState('ended');
    };
    const onError = () => {
      wanted = false;
      setState('failed');
    };
    const onReady = () => run();
    el.addEventListener('playing', onPlaying);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);
    el.addEventListener('canplay', onReady);

    // Plays while any part of the frame is on screen, so a film that starts
    // just above the fold needs no scroll; leaving the screen pauses it. On
    // phones the frame sits below the copy, so it starts when it comes into view.
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) run();
      else if (!el.paused) el.pause();
    });
    observer.observe(frame);

    const onVisibility = () => {
      tabHidden = document.hidden;
      if (tabHidden) {
        if (!el.paused) el.pause();
      } else run();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // The control asks through here: it may need a cut attached first.
    const onRequest = () => {
      wanted = true;
      attach();
      run();
    };
    const onHold = () => {
      wanted = false;
      el.pause();
    };
    frame.addEventListener('herofilm:play', onRequest);
    frame.addEventListener('herofilm:pause', onHold);

    if (autoplay) {
      if (document.readyState === 'complete') attach();
      else window.addEventListener('load', attach, { once: true });
    }

    // Crossing the phone breakpoint swaps the cut (the frame's ratio differs).
    const onBreakpoint = () => {
      if (!el.getAttribute('src')) return;
      const t = el.currentTime;
      const resume = wanted;
      el.removeAttribute('src');
      attach();
      el.addEventListener(
        'loadedmetadata',
        () => {
          el.currentTime = Math.min(t, el.duration || t);
          if (resume) run();
        },
        { once: true },
      );
    };
    mobileQuery.addEventListener('change', onBreakpoint);

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('load', attach);
      mobileQuery.removeEventListener('change', onBreakpoint);
      frame.removeEventListener('herofilm:play', onRequest);
      frame.removeEventListener('herofilm:pause', onHold);
      el.removeEventListener('playing', onPlaying);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
      el.removeEventListener('canplay', onReady);
      // Release the decoder on route change.
      el.removeAttribute('src');
      el.load();
    };
  }, [desktop, mobile]);

  const toggle = () => {
    const frame = frameRef.current;
    const el = videoRef.current;
    if (!frame || !el) return;
    if (state === 'playing') {
      frame.dispatchEvent(new Event('herofilm:pause'));
      return;
    }
    if (state === 'ended') el.currentTime = 0;
    frame.dispatchEvent(new Event('herofilm:play'));
  };

  const control =
    state === 'playing'
      ? { label: `Pause ${name}`, text: 'Pause' }
      : state === 'ended'
        ? { label: `Replay ${name}`, text: 'Replay' }
        : { label: `Play ${name}`, text: 'Play' };

  return (
    <div
      ref={frameRef}
      className={cn(styles.frame, className)}
      data-hero-film={state}
      style={
        {
          '--sk-film-ratio': `${desktop.width} / ${desktop.height}`,
          '--sk-film-ratio-mobile': `${mobile.width} / ${mobile.height}`,
        } as CSSProperties
      }
    >
      <picture>
        <source media={`${MOBILE} and ${MOTION}`} srcSet={mobile.posterStart} type="image/webp" />
        <source media={MOBILE} srcSet={mobile.posterEnd} type="image/webp" />
        <source media={MOTION} srcSet={desktop.posterStart} type="image/webp" />
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

      {enhanced && state !== 'failed' ? (
        <button type="button" className={film.control} onClick={toggle} aria-label={control.label}>
          {state === 'playing' ? (
            <span className={film.pauseGlyph} aria-hidden="true" />
          ) : (
            <Icon name="play" size="sm" />
          )}
          <span>{control.text}</span>
        </button>
      ) : null}
    </div>
  );
}
