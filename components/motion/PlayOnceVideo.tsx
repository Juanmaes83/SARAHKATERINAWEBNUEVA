'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { readingZoneLine, revealRootMargin } from '@/components/motion/revealLine';
import type { ApprovedVideo } from '@/lib/media/approved-video';
import { Icon } from '@/components/web/icons/Icon';
import { cn } from '@/lib/utils/cn';
import styles from './PlayOnceVideo.module.css';

type FilmState = 'poster' | 'ready' | 'playing' | 'paused' | 'ended' | 'failed';

/**
 * Start fetching once. A second `load()` would abort a `play()` already under
 * way, so the observers and the control all go through here.
 */
function fetchClip(video: HTMLVideoElement) {
  if (video.preload === 'auto') return;
  video.preload = 'auto';
  video.load();
}

export interface PlayOnceVideoProps {
  readonly video: ApprovedVideo;
  /** Names the film in the control, e.g. "the film" → "Pause the film". */
  readonly name: string;
  readonly sizes: string;
  readonly className?: string;
}

/**
 * Play-once editorial film — Phase 2G motion primitive.
 *
 * The single-cut sibling of the Investment territory map film (which
 * art-directs two cuts and keeps its own tested logic). For a silent, mid-page film that is part of the
 * reading, never a hero:
 *
 *  - The static state IS the final frame (the poster, with the alt text).
 *    Without JavaScript, under reduced motion, before the clip arrives, when
 *    autoplay is refused or when the media fails, that frame is what shows.
 *  - With motion allowed, nothing is fetched until the film is one viewport
 *    away (`preload="none"`); it plays once, muted, when it reaches the page's
 *    reading line, and rests on its last frame. It never loops.
 *  - Under reduced motion nothing plays by itself; the control offers it.
 *  - A visible control pauses, resumes and replays it (WCAG 2.2.2).
 *  - Leaving the tab pauses it; coming back resumes it.
 *  - The `<video>` is decorative for assistive technology; the poster's alt
 *    text carries the content, and the surrounding HTML carries the meaning.
 */
export function PlayOnceVideo({ video: clip, name, sizes, className }: PlayOnceVideoProps) {
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
    const onPause = () => setState((s) => (s === 'ended' || s === 'failed' ? s : 'paused'));
    const onEnded = () => setState('ended');
    // Every <source> failed: keep the final frame and retire the control.
    const lastSource = video.querySelector('source:last-of-type');
    const onError = () => setState('failed');
    video.addEventListener('loadeddata', onFirstFrame);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);
    lastSource?.addEventListener('error', onError);

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
      // One viewport ahead: fetch and decode the first frame, off screen.
      const near = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          near.disconnect();
          fetchClip(video);
        },
        { rootMargin: '0px 0px 100% 0px' },
      );
      // At the page's reading line: play once.
      const arrive = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          arrive.disconnect();
          fetchClip(video);
          void video.play().catch(() => setState((s) => (s === 'playing' ? s : 'paused')));
        },
        { rootMargin: revealRootMargin(readingZoneLine(window.innerWidth)) },
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
      lastSource?.removeEventListener('error', onError);
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
      ? { label: `Pause ${name}`, text: 'Pause' }
      : state === 'ended'
        ? { label: `Replay ${name}`, text: 'Replay' }
        : { label: `Play ${name}`, text: 'Play' };

  return (
    <div
      ref={frameRef}
      className={cn(styles.frame, className)}
      data-film={state}
      data-video-visible={state !== 'poster' && state !== 'failed' ? 'true' : undefined}
      style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
    >
      <Image
        className={styles.poster}
        src={clip.poster}
        width={clip.width}
        height={clip.height}
        alt={clip.description}
        sizes={sizes}
      />
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
      >
        {clip.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {enhanced && state !== 'failed' ? (
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
  );
}
