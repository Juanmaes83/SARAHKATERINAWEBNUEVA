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
  /**
   * Set only where the poster is the first-viewport LCP (the Home hero). It
   * loads the poster eagerly with high fetch priority; the video itself still
   * waits (`preload="none"`). Defaults to false, so mid-page films stay lazy.
   */
  readonly priority?: boolean;
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
 *
 * SOUND (Phase 2H closing) — only when the registry entry's `soundtrack` is
 * `published` (rights, human-reviewed captions and Sarah's approval on
 * record). Then the voiced cut is served, it still starts muted, a second
 * control turns sound on and off (`aria-pressed`), and the reviewed WebVTT
 * captions show while sound is on. While the soundtrack is `unpublished`
 * nothing of this renders and the silent cut is served.
 */
export function PlayOnceVideo({
  video: clip,
  name,
  sizes,
  className,
  priority = false,
}: PlayOnceVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<FilmState>('poster');
  const [enhanced, setEnhanced] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  // Sound exists only once the registry says it is published.
  const sound = clip.soundtrack?.status === 'published' ? clip.soundtrack : null;
  const sources = sound ? sound.sources : clip.sources;
  const resumeOnReturn = useRef(false);
  const resumeInView = useRef(false);

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
      // A playing film must not keep consuming attention or resources after
      // it has left the viewport. Resume only when it was playing at exit;
      // a film paused deliberately by the visitor stays paused.
      const presence = new IntersectionObserver(([entry]) => {
        if (!entry) return;
        if (!entry.isIntersecting) {
          resumeInView.current = !video.paused && !video.ended;
          video.pause();
          return;
        }
        if (resumeInView.current) {
          resumeInView.current = false;
          void video.play().catch(() => undefined);
        }
      });
      near.observe(frame);
      arrive.observe(frame);
      presence.observe(frame);
      observers.push(near, arrive, presence);
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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video || !sound) return;
    const next = !soundOn;
    video.muted = !next;
    const track = video.textTracks[0];
    if (track) track.mode = next ? 'showing' : 'hidden';
    setSoundOn(next);
    // Turning sound on is a request to hear the film: start it if it is not running.
    if (next && state !== 'playing') {
      if (state === 'ended') video.currentTime = 0;
      fetchClip(video);
      void video.play().catch(() => undefined);
    }
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
        priority={priority}
      />
      <video
        ref={videoRef}
        className={styles.video}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        // Decorative while silent; with published sound the voice and its
        // captions are content, so the element is not hidden.
        aria-hidden={sound ? undefined : 'true'}
        tabIndex={-1}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        {sound ? (
          <track
            kind="captions"
            src={sound.captions.src}
            srcLang={sound.captions.srclang}
            label={sound.captions.label}
          />
        ) : null}
      </video>

      {enhanced && state !== 'failed' ? (
        <div className={styles.controlGroup}>
          {sound ? (
            <button
              type="button"
              className={styles.control}
              onClick={toggleSound}
              aria-pressed={soundOn}
              aria-label={`Sound for ${name}`}
            >
              <span>{soundOn ? 'Sound off' : 'Sound on'}</span>
            </button>
          ) : null}
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
        </div>
      ) : null}
    </div>
  );
}
