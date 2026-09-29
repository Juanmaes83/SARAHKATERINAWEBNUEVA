'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils/cn';
import type { Fabric } from './fabric';
import styles from './FabricBanner.module.css';

export type BannerMode = 'static' | 'fabric';

/** `#rrggbb` (a design token's computed value) → [r, g, b]. */
function parseRgb(value: string): [number, number, number] | null {
  const hex = value.trim().match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!hex) return null;
  return [parseInt(hex[1]!, 16), parseInt(hex[2]!, 16), parseInt(hex[3]!, 16)];
}

export interface FabricStageProps {
  /** The banner at rest: plain HTML, painted onto the cloth from its own layout. */
  readonly children: ReactNode;
  /** Class of the composition box (its size, surface and internal layout). */
  readonly compositionClassName: string | undefined;
  /** A change of this key repaints the cloth and lets it take the change like a gust. */
  readonly changeKey: string;
  /**
   * Motion (and any video in the composition) held by the reader's control.
   * The host starts it paused under reduced motion.
   */
  readonly paused: boolean;
  /** Reports whether the fabric is live, so the host can show its controls. */
  readonly onMode?: (mode: BannerMode) => void;
  /** Id of the element that labels the banner. */
  readonly labelledBy?: string;
  readonly id?: string;
  readonly className?: string;
  /**
   * Opt-in rest. When set, the cloth only runs for this long after something
   * moved it (arrival, a new state, a grab, a key) and then holds still, so a
   * banner that is not being touched never stays in perpetual motion. Unset
   * (Buyer Voices), the cloth keeps its previous behaviour.
   */
  readonly settleAfterMs?: number;
}

/**
 * Fabric stage — the reusable presentation layer of the Phase 2F banner.
 *
 * Extracted unchanged from `FabricBanner` (2026-09-29) so the Home's service
 * banner can hang the same cloth without depending on testimonial semantics.
 * The physics (`fabric.ts`) and the painter (`paint.ts`) are untouched.
 *
 * TWO STATES, ONE LAYOUT
 *
 * The composition is plain, accessible HTML laid out by the site's CSS. That
 * IS the fallback — without JavaScript, without WebGL, under reduced motion or
 * after a lost GPU context, the reader gets it and loses nothing but the
 * movement. When the stage nears the viewport and motion is allowed, the
 * engine is loaded on demand, the composition is repainted onto a cloth mesh
 * from its own layout and the canvas takes its place. The HTML stays in the
 * document, transparent, for assistive technology and find-in-page.
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
 * The engine runs only while the stage is on screen, the tab is visible and
 * the reader has not paused it. Its code is a separate chunk that never loads
 * for a reader who does not reach the band.
 */
export function FabricStage({
  children,
  compositionClassName,
  changeKey,
  paused,
  onMode,
  labelledBy,
  id,
  className,
  settleAfterMs,
}: FabricStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Fabric | null>(null);
  const inViewRef = useRef(false);
  const pausedRef = useRef(paused);
  const reducedRef = useRef(false);
  const [mode, setMode] = useState<BannerMode>('static');
  const [holding, setHolding] = useState(false);

  pausedRef.current = paused;
  const settleRef = useRef(settleAfterMs);
  settleRef.current = settleAfterMs;
  /** With `settleAfterMs`: the time until which the cloth may keep moving. */
  const activeUntilRef = useRef(0);
  const restTimerRef = useRef(0);

  /** The composition's own video, if it has one. */
  const videoOf = () => compositionRef.current?.querySelector('video') ?? null;

  /** Start or stop the engine and the video from the current conditions. */
  const sync = useCallback(() => {
    const fabric = fabricRef.current;
    const el = videoOf();
    const settling = settleRef.current === undefined || performance.now() < activeUntilRef.current;
    const live = inViewRef.current && !document.hidden && !pausedRef.current && settling;
    if (fabric) {
      if (live) fabric.start();
      else fabric.stop();
    }
    if (el) {
      if (live) void el.play().catch(() => undefined);
      else el.pause();
    }
  }, []);

  /**
   * With `settleAfterMs`: let the cloth move for one settle window from now,
   * then hold it still. Never stops a cloth the reader is still holding.
   */
  const wake = useCallback(() => {
    const window_ = settleRef.current;
    if (window_ === undefined) return;
    activeUntilRef.current = performance.now() + window_;
    clearTimeout(restTimerRef.current);
    const rest = () => {
      if (fabricRef.current?.holding) {
        activeUntilRef.current = performance.now() + window_;
        restTimerRef.current = window.setTimeout(rest, window_);
        return;
      }
      sync();
    };
    restTimerRef.current = window.setTimeout(rest, window_);
    sync();
  }, [sync]);

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
    if (painted.videoRect) fabric.setVideo(videoOf(), painted.videoRect);
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
      wake();
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
      clearTimeout(restTimerRef.current);
      fabricRef.current?.destroy();
      fabricRef.current = null;
    };
  }, [repaint, sync, wake]);

  useEffect(() => onMode?.(mode), [mode, onMode]);
  useEffect(() => sync(), [paused, sync]);

  // A new state: repaint, and let the cloth take the change like a gust.
  useEffect(() => {
    const fabric = fabricRef.current;
    if (!fabric) return;
    void repaint().then(() => {
      if (!reducedRef.current) fabric.nudge(0.02, 0, 0.09);
      wake();
    });
  }, [changeKey, repaint, wake]);

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
    wake();
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
      wake();
    } else if (event.key === 'r' || event.key === 'R') {
      fabric.settle();
      wake();
    }
  };

  const fabricLive = mode === 'fabric';

  return (
    <div
      ref={stageRef}
      id={id}
      className={cn(styles.stage, className)}
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
      onDoubleClick={
        fabricLive
          ? () => {
              fabricRef.current?.settle();
              wake();
            }
          : undefined
      }
    >
      <div className={styles.hang}>
        <span className={styles.rod} aria-hidden="true" />
        <div ref={compositionRef} className={compositionClassName} data-fabric-surface="">
          {children}
        </div>
      </div>

      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
