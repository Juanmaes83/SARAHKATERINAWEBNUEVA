'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import type { ApprovedMedia } from '@/lib/media/approved-media';
import type { ApprovedVideo } from '@/lib/media/approved-video';
import { PENDING_COPY, SERVICE_LABEL, type VoiceSlot } from '@/content/en/buyer-voices';
import logo from '@/public/brand/sarah-katerina-logo.png';
import type { Fabric } from './fabric';
import styles from './FabricBanner.module.css';

export type BannerMode = 'static' | 'fabric';

/** `#rrggbb` (a design token's computed value) → [r, g, b]. */
function parseRgb(value: string): [number, number, number] | null {
  const hex = value.trim().match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!hex) return null;
  return [parseInt(hex[1]!, 16), parseInt(hex[2]!, 16), parseInt(hex[3]!, 16)];
}

export interface FabricBannerProps {
  readonly slot: VoiceSlot;
  readonly index: number;
  readonly total: number;
  readonly image: ApprovedMedia;
  readonly video?: ApprovedVideo;
  /**
   * Motion and video held by the reader's control. The host starts it paused
   * under reduced motion, so nothing moves until the reader asks for it.
   */
  readonly paused: boolean;
  /** Reports whether the fabric is live, so the host can show its controls. */
  readonly onMode?: (mode: BannerMode) => void;
  /** Id of the element that labels the banner (the active slot's tab). */
  readonly labelledBy?: string;
  readonly id?: string;
}

/**
 * Fabric banner — Phase 2F.
 *
 * TWO STATES, ONE LAYOUT
 *
 * The composition is plain, accessible HTML: photograph, video window, type
 * and brand mark, laid out by the site's CSS. That IS the fallback — without
 * JavaScript, without WebGL, under reduced motion or after a lost GPU
 * context, the reader gets this and loses nothing but the movement.
 *
 * When the banner nears the viewport and motion is allowed, the engine is
 * loaded on demand, the composition is repainted onto a cloth mesh from its
 * own layout (`paint.ts`) and the canvas takes its place. The HTML stays in
 * the document, transparent, for assistive technology and find-in-page.
 *
 * INPUT
 *
 *  - Mouse and trackpad: press anywhere on the banner and drag; release and
 *    it swings back. Double-click smooths it flat. The wheel is never taken.
 *  - Touch: `touch-action: pan-y`. A vertical swipe scrolls the page as
 *    always (the browser cancels the grab); a sideways drag takes the cloth.
 *  - Keyboard: the banner is one tab stop. Arrow keys tug it, R settles it.
 *
 * COST
 *
 * The engine runs only while the banner is on screen, the tab is visible and
 * the reader has not paused it. Its code is a separate chunk that never
 * loads for a reader who does not reach the band.
 */
export function FabricBanner({
  slot,
  index,
  total,
  image,
  video,
  paused,
  onMode,
  labelledBy,
  id,
}: FabricBannerProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fabricRef = useRef<Fabric | null>(null);
  const inViewRef = useRef(false);
  const pausedRef = useRef(paused);
  const reducedRef = useRef(false);
  const [mode, setMode] = useState<BannerMode>('static');
  const [holding, setHolding] = useState(false);

  pausedRef.current = paused;

  /** Start or stop the engine and the video from the current conditions. */
  const sync = useCallback(() => {
    const fabric = fabricRef.current;
    const el = videoRef.current;
    const live = inViewRef.current && !document.hidden && !pausedRef.current;
    if (fabric) {
      if (live) fabric.start();
      else fabric.stop();
    }
    if (el) {
      if (live) void el.play().catch(() => undefined);
      else el.pause();
    }
  }, []);

  /** Lay the cloth over the composition and repaint its texture. */
  const repaint = useCallback(async () => {
    const fabric = fabricRef.current;
    const canvas = canvasRef.current;
    const composition = compositionRef.current;
    if (!fabric || !canvas || !composition) return;
    await document.fonts?.ready;
    await Promise.all(
      [...composition.querySelectorAll('img')].map((img) =>
        img.complete ? undefined : img.decode().catch(() => undefined),
      ),
    );
    const { paintComposition } = await import('./paint');
    // The canvas overhangs the stage; the banner's rest box sits inside it.
    const s = canvas.getBoundingClientRect();
    const c = composition.getBoundingClientRect();
    fabric.place({
      width: s.width,
      height: s.height,
      banner: { x: c.left - s.left, y: c.top - s.top, w: c.width, h: c.height },
    });
    const painted = paintComposition(composition);
    const navy = parseRgb(getComputedStyle(composition).getPropertyValue('--sk-web-navy'));
    if (navy) fabric.setShadow(navy, 0.045);
    fabric.setStatic(painted.canvas);
    if (painted.videoRect) fabric.setVideo(videoRef.current, painted.videoRect);
  }, []);

  // Engine lifecycle: load near the viewport, run only while seen.
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = reducedQuery.matches;
    let disposed = false;
    let resizeFrame = 0;

    const teardown = () => {
      fabricRef.current?.destroy();
      fabricRef.current = null;
      setMode('static');
    };

    const boot = async () => {
      if (reducedRef.current || fabricRef.current) return;
      const { Fabric: Engine } = await import('./fabric');
      if (disposed) return;
      try {
        fabricRef.current = new Engine(canvas);
      } catch {
        return; // No usable WebGL: the static composition stays.
      }
      await repaint();
      if (disposed) return teardown();
      setMode('fabric');
      sync();
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        near.disconnect();
        void boot();
      },
      { rootMargin: '50% 0px' },
    );
    const seen = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0.05 },
    );
    near.observe(stage);
    seen.observe(stage);

    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);

    const onReducedChange = () => {
      reducedRef.current = reducedQuery.matches;
      if (reducedQuery.matches) teardown();
      else void boot();
      sync();
    };
    reducedQuery.addEventListener('change', onReducedChange);

    const onLost = (event: Event) => {
      event.preventDefault();
      teardown();
    };
    canvas.addEventListener('webglcontextlost', onLost);

    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => void repaint());
    });
    resize.observe(stage);

    return () => {
      disposed = true;
      near.disconnect();
      seen.disconnect();
      resize.disconnect();
      cancelAnimationFrame(resizeFrame);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedQuery.removeEventListener('change', onReducedChange);
      canvas.removeEventListener('webglcontextlost', onLost);
      fabricRef.current?.destroy();
      fabricRef.current = null;
    };
  }, [repaint, sync]);

  useEffect(() => onMode?.(mode), [mode, onMode]);
  useEffect(() => sync(), [paused, sync]);

  // A new slot: repaint, and let the cloth take the change like a gust.
  useEffect(() => {
    const fabric = fabricRef.current;
    if (!fabric) return;
    void repaint().then(() => {
      if (!reducedRef.current) fabric.nudge(0.02, 0, 0.09);
    });
  }, [slot.id, repaint]);

  /** Pointer position in canvas pixels (the canvas overhangs the stage). */
  const local = (event: PointerEvent<HTMLElement>) => {
    const rect =
      canvasRef.current?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const fabric = fabricRef.current;
    if (!fabric || event.button > 0) return;
    const { x, y } = local(event);
    if (!fabric.grab(x, y)) return;
    // Mouse: no text selection or image drag while holding the cloth.
    if (event.pointerType === 'mouse') event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setHolding(true);
    if (!fabric.isRunning) fabric.start();
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const fabric = fabricRef.current;
    if (!fabric?.holding) return;
    const { x, y } = local(event);
    fabric.drag(x, y);
  };

  const onPointerEnd = () => {
    fabricRef.current?.release();
    setHolding(false);
    sync();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const fabric = fabricRef.current;
    if (!fabric) return;
    const impulses: Record<string, [number, number, number]> = {
      ArrowLeft: [-0.05, 0, 0.02],
      ArrowRight: [0.05, 0, 0.02],
      ArrowUp: [0, 0.02, 0.08],
      ArrowDown: [0, -0.05, 0.02],
    };
    const impulse = impulses[event.key];
    if (impulse) {
      event.preventDefault();
      fabric.nudge(...impulse);
      if (!fabric.isRunning) fabric.start();
    } else if (event.key === 'r' || event.key === 'R') {
      fabric.settle();
    }
  };

  const service = SERVICE_LABEL[slot.service];
  const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const fabricLive = mode === 'fabric';

  return (
    <div
      ref={stageRef}
      id={id}
      className={styles.stage}
      data-mode={mode}
      data-holding={holding ? 'true' : undefined}
      // The live fabric is one keyboard stop; the static banner is not interactive.
      tabIndex={fabricLive ? 0 : undefined}
      role={fabricLive ? 'group' : undefined}
      aria-roledescription={fabricLive ? 'interactive banner' : undefined}
      aria-labelledby={labelledBy}
      onKeyDown={fabricLive ? onKeyDown : undefined}
      // Input is taken on the stage; the canvas overhangs it and never blocks
      // the content around the banner.
      onPointerDown={fabricLive ? onPointerDown : undefined}
      onPointerMove={fabricLive ? onPointerMove : undefined}
      onPointerUp={fabricLive ? onPointerEnd : undefined}
      onPointerCancel={fabricLive ? onPointerEnd : undefined}
      onLostPointerCapture={fabricLive ? onPointerEnd : undefined}
      onDoubleClick={fabricLive ? () => fabricRef.current?.settle() : undefined}
    >
      <div className={styles.hang}>
        <span className={styles.rod} aria-hidden="true" />
        <div ref={compositionRef} className={styles.composition}>
          <div className={styles.photo}>
            <Image
              data-paint="image"
              className={styles.photoImage}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(max-width: 767px) 90vw, 520px"
              style={{ objectPosition: image.focal }}
            />
            <span className={styles.photoTag} data-paint="box">
              <span data-paint="text">{PENDING_COPY.imageNote.text}</span>
            </span>
          </div>

          {video ? (
            <div className={styles.videoWindow} data-paint="video">
              <video
                ref={videoRef}
                className={styles.video}
                muted
                loop
                playsInline
                preload="metadata"
                poster={video.poster}
                disablePictureInPicture
                aria-hidden="true"
                tabIndex={-1}
              >
                {video.sources.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} />
                ))}
              </video>
            </div>
          ) : null}
          {video ? (
            <p className={styles.videoNote} data-paint="text">
              {PENDING_COPY.videoNote.text}
            </p>
          ) : null}

          <p className={styles.eyebrow} data-paint="text">
            {service} · <span className={styles.counter}>{counter}</span>
          </p>
          <h3 className={styles.topic} data-paint="text">
            {slot.topic}
          </h3>
          <blockquote className={styles.quote}>
            <span className={styles.mark} data-paint="text" aria-hidden="true">
              “
            </span>
            <p className={styles.quoteText} data-paint="text">
              {slot.quote ?? PENDING_COPY.quote.text}
            </p>
          </blockquote>
          <p className={styles.attribution} data-paint="text">
            {slot.attribution ?? PENDING_COPY.attribution.text}
          </p>

          <div className={styles.foot}>
            <span className={styles.stamp} data-paint="box">
              <span data-paint="text">{PENDING_COPY.stamp.text}</span>
            </span>
            <Image
              data-paint="image"
              className={styles.logo}
              src={logo}
              alt="Sarah Katerina"
              sizes="120px"
            />
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
