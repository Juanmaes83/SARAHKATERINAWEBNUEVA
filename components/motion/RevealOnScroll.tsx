'use client';

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './RevealOnScroll.module.css';

/**
 * How the element arrives. One family, four registers — see
 * docs/phase-2e-motion-system.md §3 for when each one is allowed.
 *
 *  - `rise`   default. Fade plus the canonical 10px lift. Editorial copy, cards.
 *  - `fade`   opacity only. Dense or precise surfaces where movement would
 *             read as noise: tables, calendars, legal notes.
 *  - `unveil` media. The frame opens from the bottom edge while the image
 *             settles from a slight scale. Large editorial photographs only.
 *  - `none`   no motion of its own; it only reports `data-reveal` so children
 *             (rules, timeline connectors, charts) can choreograph themselves.
 */
export type RevealVariant = 'rise' | 'fade' | 'unveil' | 'none';

export interface RevealOnScrollProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Stagger index. Multiplied by a fixed step, capped so nothing waits long. */
  order?: number;
  variant?: RevealVariant;
}

/**
 * Reveals content as it enters the viewport.
 *
 * Functional, not decorative: it gives a long editorial page a sense of
 * sequence so sections read as distinct units rather than one wall.
 *
 * Safety properties, in order of importance:
 *
 *  1. Content is visible by default in the markup. The hidden state is only
 *     applied once JavaScript has confirmed it can also remove it, so a
 *     failed hydration, a blocked script or a crawler never sees blank space.
 *  2. `prefers-reduced-motion` short-circuits the whole effect — no observer
 *     is created and nothing is ever hidden.
 *  3. Anything already on screen (or above it) when the script arrives is
 *     left alone. Hiding it would make a visible hero blink out and fade back
 *     in after hydration. First-viewport choreography belongs to the CSS-only
 *     entrance in `Entrance.module.css`, which runs from the first paint.
 *  4. The observer disconnects after the first reveal. Nothing re-hides on
 *     scroll-up, and there is no scroll-jacking.
 *  5. The arrival is a one-shot CSS animation with `backwards` fill, not a
 *     transition. A transition on this element used to share the `transition`
 *     property with the component's own hover feedback, so one silently
 *     replaced the other, and the stagger delay also delayed every later
 *     hover. An animation leaves the component's transitions untouched.
 *
 * STATE HOOK FOR CHILDREN
 *
 * While armed, the element carries `data-reveal="pending"`, then
 * `data-reveal="shown"`. Descendant styles key off that attribute (a section
 * rule drawing, a timeline connector, a chart that waits to be seen). Without
 * JavaScript, or with reduced motion, the attribute is never set, so every
 * such descendant rule is inert and the content renders in its final state.
 */
export function RevealOnScroll({
  as: Tag = 'div',
  order = 0,
  variant = 'rise',
  className,
  children,
  style,
  ...rest
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // Already visible, or already scrolled past: never hide it.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    // Only now is it safe to hide: this code can also reveal it again.
    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      // Fires slightly before the element is fully on screen, so the movement
      // has finished by the time the reader reaches it.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(node);

    const reveal = () => {
      setRevealed(true);
      observer.disconnect();
    };

    /*
     * SAFETY NET — an element the observer never saw.
     *
     * IntersectionObserver is evaluated at most once per frame. During a fast
     * scroll (a flick on a phone, a Page Down, an anchor jump, an automated
     * screenshot pass) an element can go from entirely below the viewport to
     * entirely above it between two evaluations. Its intersection ratio reads
     * 0 both times, no threshold is crossed, the callback never fires, and the
     * element stays at opacity 0 — a blank gap in the middle of a section.
     *
     * This was observed on the Tax Advisory landing: single list items and
     * single cards rendered empty after a fast scroll past them.
     *
     * A rAF-throttled scroll listener closes the gap. It reveals anything the
     * viewport has reached or passed, runs at most once per frame, and removes
     * itself the moment it fires, so nothing is left listening.
     */
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = node.getBoundingClientRect();
        if (box.top < window.innerHeight) {
          reveal();
          window.removeEventListener('scroll', onScroll);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Printing never scrolls, so an observer that has not fired would print a
    // blank block. Reveal everything before the print snapshot is taken.
    window.addEventListener('beforeprint', reveal);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('beforeprint', reveal);
    };
  }, []);

  const delay = Math.min(order, 4) * 60;
  const pending = armed && !revealed;

  return (
    <Tag
      ref={ref}
      className={cn(
        styles[variant],
        pending && styles.hidden,
        armed && revealed && styles.play,
        className,
      )}
      data-reveal={armed ? (revealed ? 'shown' : 'pending') : undefined}
      style={delay > 0 ? { ...style, ['--sk-reveal-delay' as string]: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
