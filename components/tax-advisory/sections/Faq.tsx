'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ReviewMark, SectionHead } from '../Primitives';
import { faq } from '@/content/en/tax-advisory';
import type { FaqItem } from '@/content/en/tax-advisory';
import styles from './Faq.module.css';

/**
 * Independent disclosures, not a single-select accordion: a reader comparing
 * two answers should not have one close the other.
 *
 * The panel is removed from the DOM when collapsed rather than hidden, so a
 * future FAQPage schema can only ever describe content that is actually
 * rendered. Schema is prepared but deliberately not emitted — most answers
 * here are pending (AGENTS.md §7.4).
 *
 * MOTION: because the panel mounts rather than unhides, it opens with a short
 * enter animation on the panel's inner wrapper — no measured height, nothing
 * to interrupt, and it reduces to an instant appearance under
 * prefers-reduced-motion. Content is never hidden from a user without motion:
 * the answer is in the DOM the moment the disclosure opens, animation or not.
 */
function Disclosure({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;
  const review = item.answer.review ?? 'none';
  const pending = item.answer.status === 'pending';

  return (
    <div className={cn(styles.item, open && styles.itemOpen)}>
      <h3 className={styles.itemHeading}>
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{item.question.text}</span>
          <span className={styles.marker} aria-hidden="true">
            <span className={styles.markerBar} />
            <span className={cn(styles.markerBar, styles.markerBarVertical)} />
          </span>
        </button>
      </h3>

      {open ? (
        <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
          <div className={styles.panelInner}>
            <p className={cn(styles.answer, pending && styles.answerPending)}>{item.answer.text}</p>
            {review !== 'none' ? <ReviewMark domain={review} /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Faq() {
  return (
    <div className={styles.wrap}>
      <SectionHead
        eyebrow={faq.eyebrow.text}
        heading={faq.heading.text}
        id="faq"
        className={styles.head}
      />

      <div className={styles.columns}>
        {faq.items.map((item) => (
          <Disclosure key={item.id} item={item} />
        ))}
      </div>

      <p className={styles.schemaNote}>{faq.schemaNote.text}</p>
    </div>
  );
}
