import type { SarahReviewId } from '@/content/en/sarah-review';
import { assertSarahReviewMarksAllowed } from '@/lib/review/sarah-review-gate';

/**
 * Internal anchor for an open Sarah review item. It renders NOTHING.
 *
 * 2026-10-01 (Juanma): Sarah reviews the site as a finished experience, so the
 * visible "SARAH REVIEW REQUIRED · SR-###" strips and tags are gone from every
 * page. Each anchor stays where the strip used to be, so the source still shows
 * which block an open item covers, and the register keeps the full record
 * (`content/en/sarah-review.ts`, `docs/approval-marks-audit.md` §12).
 *
 * It still guards publication: a production or indexable build that contains
 * an open item throws (see the gate), so unreviewed copy cannot be published
 * by accident. That barrier is internal and never shown to the visitor.
 *
 * `variant` is kept so the existing placements stay unchanged; it has no
 * visual effect.
 */
export function SarahReviewMark({
  id,
}: {
  id: SarahReviewId;
  variant?: 'strip' | 'tag' | 'overlay';
  className?: string;
}) {
  assertSarahReviewMarksAllowed(id);
  return null;
}
