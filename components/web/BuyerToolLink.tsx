'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/analytics/track';

export interface BuyerToolLinkProps {
  /** Absolute URL from `resolveEntryPoint` — never built here. */
  readonly href: string;
  /** `BuyerSystemExperience.id`. */
  readonly calculator: string;
  /** The preview route the click leaves from. */
  readonly sourcePage: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Outbound Buyer System link — the only client code an entry point needs.
 *
 * Records the exit click through the existing typed contract
 * (`calculator_start`, no-op adapter) and nothing else: no amount, no personal
 * data and no query string travel with the link.
 */
export function BuyerToolLink({
  href,
  calculator,
  sourcePage,
  className,
  children,
}: BuyerToolLinkProps) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('calculator_start', { calculator, source_page: sourcePage })}
    >
      {children}
      <span className="sk-visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
