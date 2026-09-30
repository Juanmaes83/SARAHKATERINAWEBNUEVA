import { Container } from '@/components/layout/Container';
import { sarahReviewItem, type SarahReviewId } from '@/content/en/sarah-review';
import { assertSarahReviewMarksAllowed } from '@/lib/review/sarah-review-gate';
import { cn } from '@/lib/utils/cn';
import styles from './SarahReviewMark.module.css';

/**
 * `SARAH REVIEW REQUIRED · SR-###` — a temporary review tool, not brand copy.
 *
 * - `strip` (default): a full-width line placed immediately before the section
 *   it covers, with the entry's label, so the reviewer sees what is pending
 *   without opening the register.
 * - `tag`: the bare label, placed beside one element (a line, a quote).
 * - `overlay`: the bare label pinned to the top corner of an image frame (the
 *   frame must be positioned); it covers a corner, never the subject.
 *
 * The content it points at is never hidden, struck through or dimmed. Building
 * a mark into a production or indexable site throws (see the gate), so marks
 * cannot reach a published page. The register is `content/en/sarah-review.ts`.
 */
export function SarahReviewMark({
  id,
  variant = 'strip',
  className,
}: {
  id: SarahReviewId;
  variant?: 'strip' | 'tag' | 'overlay';
  className?: string;
}) {
  assertSarahReviewMarksAllowed(id);
  const item = sarahReviewItem(id);
  const tag = (
    <span className={styles.tag}>
      Sarah review required · <span className={styles.id}>{id}</span>
    </span>
  );

  if (variant !== 'strip') {
    return (
      <span
        className={cn(
          styles.tagOnly,
          variant === 'overlay' ? styles.overlay : styles.inFlow,
          className,
        )}
        data-sarah-review={id}
        title={`${item.label} — ${item.decision}`}
      >
        {tag}
      </span>
    );
  }

  return (
    <div className={cn(styles.strip, className)} data-sarah-review={id} role="note">
      <Container className={styles.inner}>
        {tag}
        <span className={styles.label}>{item.label}</span>
      </Container>
    </div>
  );
}
