'use client';

import { useId, useState } from 'react';
import { WebSection, WebSectionHeader } from './WebSection';
import { faq } from '@/content/en/investment';
import type { Claim } from '@/lib/content/claims';
import styles from './WebFaq.module.css';

interface FaqItemProps {
  question: string;
  answer: Claim;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;
  const review = answer.review && answer.review !== 'none' ? answer.review : null;

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
        The panel is removed from the DOM when collapsed rather than hidden.
        A future FAQPage schema may only describe content that is actually
        rendered, and most answers here are still pending approval, so no
        schema is emitted yet.
      */}
      {open ? (
        <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
          <p className={styles.answer}>{answer.text}</p>
          {review ? (
            <span className={styles.reviewTag}>{review} — review required</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/**
 * FAQ.
 *
 * Independent disclosures rather than a single-select accordion: a reader
 * comparing two answers should not have one close the other. Built on native
 * buttons, so keyboard and screen-reader behaviour is the platform's.
 */
export function WebFaq() {
  return (
    <WebSection surface="white" id="faq">
      <WebSectionHeader eyebrow={faq.eyebrow.text} title={faq.title.text} centered rule />
      <div className={styles.grid}>
        {faq.items.map((item) => (
          <FaqItem key={item.id} question={item.question.text} answer={item.answer} />
        ))}
      </div>
    </WebSection>
  );
}
