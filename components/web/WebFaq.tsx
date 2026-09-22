'use client';

import { useId, useState } from 'react';
import { WebSection, WebSectionHeader } from './WebSection';
import { Icon } from './icons/Icon';
import { faq } from '@/content/en/investment';
import type { Claim } from '@/lib/content/claims';
import styles from './WebFaq.module.css';

interface FaqContent {
  readonly eyebrow: Claim;
  readonly title: Claim;
  readonly items: readonly {
    readonly id: string;
    readonly question: Claim;
    readonly answer: Claim;
  }[];
  readonly legalNote: Claim;
}

function FaqItem({ question, answer }: { question: string; answer: Claim }) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;
  const pending = answer.status === 'pending';

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
          {/*
            Phase 2B put a loud "FINANCIAL — REVIEW REQUIRED" badge on most
            answers, which dominated the section. The governance is unchanged;
            it now reads as a quiet note, and the section-level disclaimer
            below carries the general warning.
          */}
          {pending ? (
            <p className={styles.pendingNote}>
              <Icon name="clock" size="sm" />
              <span>Not confirmed for publication yet.</span>
            </p>
          ) : null}
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
 */
export function WebFaq({ content = faq }: { content?: FaqContent }) {
  return (
    <WebSection surface="ivory" id="faq">
      <WebSectionHeader eyebrow={content.eyebrow.text} title={content.title.text} centered rule />
      <div className={styles.grid}>
        {content.items.map((item) => (
          <FaqItem key={item.id} question={item.question.text} answer={item.answer} />
        ))}
      </div>
      <p className={styles.legalNote}>{content.legalNote.text}</p>
    </WebSection>
  );
}
