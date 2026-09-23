'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { EDGE_LINE, type RevealLine } from './revealLine';

/**
 * Which reveal line applies to a subtree. Defaults to the edge line, so any
 * page that does not opt in — Team, /foundation — keeps its current timing.
 * The three service landings wrap their content in
 * `<RevealLineProvider line="reading-zone">`.
 */
const RevealLineContext = createContext<RevealLine | 'reading-zone'>(EDGE_LINE);

export function RevealLineProvider({
  line,
  children,
}: {
  line: RevealLine | 'reading-zone';
  children: ReactNode;
}) {
  return <RevealLineContext.Provider value={line}>{children}</RevealLineContext.Provider>;
}

export function useRevealLine(): RevealLine | 'reading-zone' {
  return useContext(RevealLineContext);
}
