'use client';

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './RevealOnScroll.module.css';

export interface RevealOnScrollProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Stagger index. Multiplied by a fixed step, capped so nothing waits long. */
  order?: number;
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
 *  3. The observer disconnects after the first reveal. Nothing re-hides on
 *     scroll-up, and there is no scroll-jacking or parallax.
 */
export function RevealOnScroll({
  as: Tag = 'div',
  order = 0,
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

  return (
    <Tag
      ref={ref}
      className={cn(styles.reveal, armed && !revealed && styles.hidden, className)}
      style={delay > 0 ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
