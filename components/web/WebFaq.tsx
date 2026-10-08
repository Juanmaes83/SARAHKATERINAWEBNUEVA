'use client';

import { useId, useState } from 'react';
import { WebSection, WebSectionHeader } from './WebSection';
import { faq as investmentFaq } from '@/content/en/investment';
import type { Claim } from '@/lib/content/claims';
import type { RelatedLink } from '@/content/en/internal-links';
import { WebLinkButton } from './WebButton';
import styles from './WebFaq.module.css';

function FaqItem({
  question,
  answer,
  related,
}: {
  question: string;
  answer: Claim;
  related?: RelatedLink;
}) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={styles.item}>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{question}</span>
          <span className={styles.marker} aria-hidden="true" />
        </button>
      </h3>

      {/*
        Removed from the DOM when collapsed. A future FAQPage schema may only
        describe rendered content, and several answers are still pending.
      */}
      {open ? (
        <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
          <p className={styles.answer}>{answer.text}</p>
          {/* Phase 2B internal link: the service that carries this answer,
              under its navigation label (content/en/internal-links.ts). */}
          {related ? (
            <p className={styles.related}>
              <WebLinkButton href={related.href} variant="quiet" arrow>
                {related.label}
              </WebLinkButton>
            </p>
          ) : null}
          {/*
            2026-10-01: the per-answer "Not confirmed for publication yet." note
            was an internal status, not information for the visitor; it lives
            in the claim status and docs/approval-marks-audit.md §11. Answers
            that were only placeholders are rewritten or carry an SR mark.
          */}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Quick answers.
 *
 * Independent disclosures rather than a single-select accordion: a reader
 * comparing two answers should not have one close the other. Native buttons,
 * so keyboard and screen-reader behaviour is the platform's.
 *
 * SHARED ACROSS LANDINGS. The content is a prop so Tax Advisory supplies its
 * own questions through the same component, with the same disclosure
 * behaviour, markup and styling. Defaults to the Investment content.
 */
export interface WebFaqContent {
  readonly eyebrow: Claim;
  readonly title: Claim;
  readonly items: readonly {
    readonly id: string;
    readonly question: Claim;
    readonly answer: Claim;
  }[];
  readonly legalNote: Claim;
}

/**
 * `appearance` — Phase 2E (brief 2026-10-23, §5): `light` drops the boxed
 * cards for hairline-separated rows, the lighter grouping of the reference.
 * Opt-in, so Team keeps its current FAQ untouched.
 */
export function WebFaq({
  content = investmentFaq,
  appearance = 'boxed',
  related = {},
}: {
  content?: WebFaqContent;
  appearance?: 'boxed' | 'light';
  /** FAQ item id → related page (content/en/internal-links.ts `FAQ_RELATED`). */
  related?: Readonly<Record<string, RelatedLink>>;
} = {}) {
  const faq = content;
  return (
    <WebSection surface="ivory" id="faq">
      <WebSectionHeader eyebrow={faq.eyebrow.text} title={faq.title.text} centered rule />
      <div className={appearance === 'light' ? `${styles.grid} ${styles.light}` : styles.grid}>
        {faq.items.map((item) => (
          <FaqItem
            key={item.id}
            question={item.question.text}
            answer={item.answer}
            related={related[item.id]}
          />
        ))}
      </div>
      <p className={styles.legalNote}>{faq.legalNote.text}</p>
    </WebSection>
  );
}
