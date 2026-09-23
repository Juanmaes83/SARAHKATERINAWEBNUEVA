/**
 * The reveal line — the single rule that decides when a RevealOnScroll
 * element starts its arrival. Every trigger path uses it: the
 * IntersectionObserver, the rAF scroll fallback (fast scroll, anchor jumps,
 * automated captures), resize, and elements mounted after hydration.
 *
 * WHY A LINE, AND WHERE
 *
 * Measured on 2026-10-23 (docs/phase-2e-motion-system.md §4.1): the previous
 * scroll fallback revealed anything whose top had crossed the bottom edge of
 * the viewport, so arrivals fired at a median of ~99% of the viewport height —
 * the movement was over before the reader got there. The observer's own −10%
 * margin never mattered, because the fallback always won.
 *
 * The line now sits inside the reading zone. It was calibrated by eye at 375
 * and 1440 px so that a heading, card or image starts arriving when it is
 * clearly on screen and is still moving, or just settling, as the reader's
 * eye reaches it:
 *
 *   - phones   (< 768px): 78% — short screens and large thumb scrolls; the
 *                          sticky header already takes the top ~8%.
 *   - tablet/desktop:     72% — taller viewports; the block needs to be well
 *                          into the reading zone before it moves.
 *
 * It is not a delay: nothing waits on a timer. An element simply does not
 * start until it reaches the line.
 */

/** Fraction of the viewport height measured from the top. */
export type RevealLine = number;

/** The service landings' line, by viewport width. */
export function readingZoneLine(viewportWidth: number): RevealLine {
  return viewportWidth < 768 ? 0.78 : 0.72;
}

/**
 * The legacy edge line (1 = the bottom edge). Kept for Team, which is out of
 * scope for the timing change: it reproduces the effective behaviour Team
 * already had (the old fallback revealed at the edge), with one rule instead
 * of two disagreeing ones.
 */
export const EDGE_LINE: RevealLine = 1;

/**
 * Resolves the configured line for the current viewport. `'reading-zone'`
 * follows the viewport width; a number is used as is.
 */
export function resolveRevealLine(line: RevealLine | 'reading-zone'): RevealLine {
  if (line === 'reading-zone') {
    return readingZoneLine(typeof window === 'undefined' ? 1440 : window.innerWidth);
  }
  return line;
}

/** Observer margin that fires exactly when an element's top crosses the line. */
export function revealRootMargin(line: RevealLine): string {
  const bottom = Math.round((1 - line) * 1000) / 10;
  return `0px 0px -${bottom}% 0px`;
}

/**
 * THE RULE. True once the element's top edge has reached the line — or,
 * at the very end of the page, where nothing can scroll any higher, once it
 * is on screen at all (otherwise the last blocks could never reach the line).
 */
export function hasReachedRevealLine(node: Element, line: RevealLine): boolean {
  const top = node.getBoundingClientRect().top;
  const viewport = window.innerHeight;
  if (top <= viewport * line) return true;
  const doc = document.documentElement;
  const atPageEnd = window.scrollY + viewport >= doc.scrollHeight - 2;
  return atPageEnd && top < viewport;
}
