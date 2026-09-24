'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { readingZoneLine, revealRootMargin } from '@/components/motion/revealLine';
import { APPROVED_VIDEO } from '@/lib/media/approved-video';
import { territoryMap } from '@/content/en/investment';
import { cn } from '@/lib/utils/cn';
import { Icon } from './icons/Icon';
import styles from './TerritoryMapFilm.module.css';

type FilmState = 'poster' | 'ready' | 'playing' | 'paused' | 'ended';

const WIDE = APPROVED_VIDEO.territoryMapWide;
const TALL = APPROVED_VIDEO.territoryMapTall;
/** Must match the breakpoint in the stylesheet that swaps the two cuts. */
const TALL_QUERY = '(max-width: 767px)';

/**
 * Start fetching the clip once. A second `load()` would abort a `play()`
 * already under way, so both observers and the control go through here.
 */
function fetchClip(video: HTMLVideoElement) {
  if (video.preload === 'auto') return;
  video.preload = 'auto';
  video.load();
}

/**
 * Territory map film — Phase 2F, Investment · Asset types.
 *
 * The owner's five-second relief map of the Costa Blanca, whose panel names
 * the same four asset types the band then analyses. It plays once, when it
 * reaches the reading zone, and rests on its last frame: the whole coast with
 * the four types in view. It never loops; a replay control brings it back.
 *
 * STATES AND SAFETY
 *
 *  - The static state IS the final frame (the poster). Without JavaScript,
 *    under reduced motion, before the clip arrives or when autoplay is
 *    refused, the reader sees the complete information, not a blank frame.
 *  - With motion allowed, the clip is fetched one viewport ahead and swapped
 *    in on its first decoded frame, off screen, so the reader never sees the
 *    finished panel jump back to an empty map.
 *  - Under reduced motion nothing plays by itself; the control offers it.
 *  - Leaving the tab pauses the clip; coming back resumes it.
 *  - The clip is silent and decorative for assistive technology; the poster's
 *    alt text and the caption carry its content.
 */
export function TerritoryMapFilm() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<FilmState>('poster');
  const [enhanced, setEnhanced] = useState(false);
  const resumeOnReturn = useRef(false);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;
    setEnhanced(true);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onFirstFrame = () => setState((s) => (s === 'poster' ? 'ready' : s));
    const onPlaying = () => setState('playing');
    const onPause = () => setState((s) => (s === 'ended' ? s : 'paused'));
    const onEnded = () => setState('ended');
    video.addEventListener('loadeddata', onFirstFrame);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    const onVisibility = () => {
      if (document.hidden) {
        resumeOnReturn.current = !video.paused && !video.ended;
        video.pause();
      } else if (resumeOnReturn.current) {
        resumeOnReturn.current = false;
        void video.play().catch(() => undefined);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const observers: IntersectionObserver[] = [];
    if (!reduced && 'IntersectionObserver' in window) {
      // One viewport ahead: fetch and decode the first frame.
      const near = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          near.disconnect();
          fetchClip(video);
        },
        { rootMargin: '0px 0px 100% 0px' },
      );
      // At the page's reading line: play once.
      const line = readingZoneLine(window.innerWidth);
      const arrive = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          arrive.disconnect();
          fetchClip(video);
          // A refused autoplay (power saving, data saver) leaves the poster
          // and the play control; nothing is lost.
          void video.play().catch(() => setState((s) => (s === 'playing' ? s : 'paused')));
        },
        { rootMargin: revealRootMargin(line) },
      );
      near.observe(frame);
      arrive.observe(frame);
      observers.push(near, arrive);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      document.removeEventListener('visibilitychange', onVisibility);
      video.removeEventListener('loadeddata', onFirstFrame);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (state === 'playing') {
      video.pause();
      return;
    }
    if (state === 'ended') video.currentTime = 0;
    fetchClip(video);
    void video.play().catch(() => undefined);
  };

  const control =
    state === 'playing'
      ? { label: 'Pause the map', text: 'Pause' }
      : state === 'ended'
        ? { label: 'Replay the map', text: 'Replay' }
        : { label: 'Play the map', text: 'Play' };

  return (
    <figure className={styles.film}>
      <div
        ref={frameRef}
        className={styles.frame}
        data-film={state}
        // Clip seen on screen = the live video; otherwise the poster.
        data-video-visible={state !== 'poster' ? 'true' : undefined}
      >
        <Image
          className={cn(styles.poster, styles.posterWide)}
          src={WIDE.poster}
          width={WIDE.width}
          height={WIDE.height}
          alt={WIDE.description}
          sizes="(max-width: 1023px) 100vw, 66vw"
        />
        <Image
          className={cn(styles.poster, styles.posterTall)}
          src={TALL.poster}
          width={TALL.width}
          height={TALL.height}
          alt={TALL.description}
          sizes="100vw"
        />
        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        >
          {TALL.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} media={TALL_QUERY} />
          ))}
          {WIDE.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        {enhanced ? (
          <button
            type="button"
            className={styles.control}
            onClick={toggle}
            aria-label={control.label}
          >
            {state === 'playing' ? (
              <span className={styles.pauseGlyph} aria-hidden="true" />
            ) : (
              <Icon name="play" size="sm" />
            )}
            <span>{control.text}</span>
          </button>
        ) : null}
      </div>

      <figcaption className={styles.caption}>
        <p className={styles.label}>{territoryMap.label.text}</p>
        <h3 className={styles.title}>{territoryMap.title.text}</h3>
        <ol className={styles.steps}>
          {territoryMap.steps.map((step, index) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.stepIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.stepText}>
                <strong>{step.title.text}</strong> {step.body.text}
              </span>
            </li>
          ))}
        </ol>
        <p className={styles.disclaimer}>{territoryMap.disclaimer.text}</p>
      </figcaption>
    </figure>
  );
}
