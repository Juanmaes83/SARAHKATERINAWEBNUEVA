import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Reveal.module.css';

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

/**
 * Single approved motion primitive: a 400ms fade-and-rise using the canonical
 * reveal tokens, disabled entirely under prefers-reduced-motion.
 *
 * WHY NO GSAP IN THIS PHASE
 *
 * The master audit (P2) and the visual proposal both contemplate GSAP, but
 * only "where it explains a transition": a calculator, a scenario change, a
 * progress state. None of those exist yet. Installing an animation library to
 * produce one fade would add bundle weight and a dependency for a behaviour
 * CSS already performs, and the foundation brief explicitly asks not to add a
 * library merely because an external repository uses it.
 *
 * Revisit when the Buyer System calculators land and a real state transition
 * needs explaining.
 */
export function Reveal({ as: Tag = 'div', className, children, ...rest }: RevealProps) {
  return (
    <Tag className={cn(styles.reveal, className)} {...rest}>
      {children}
    </Tag>
  );
}
