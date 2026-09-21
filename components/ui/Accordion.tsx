'use client';

import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Accordion.module.css';

export interface AccordionItemData {
  readonly id: string;
  readonly question: string;
  readonly children: ReactNode;
}

export interface AccordionProps {
  items: readonly AccordionItemData[];
  className?: string;
}

function AccordionItem({ item }: { item: AccordionItemData }) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className={styles.item}>
      <h3>
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{item.question}</span>
          <span className={styles.marker} aria-hidden="true" />
        </button>
      </h3>
      {/*
        The panel is removed from the DOM when collapsed rather than hidden.
        Answers must be reachable, and a future FAQPage schema must only ever
        describe content that is actually rendered — the SEO audit requires
        schema to match visible, verifiable content.
      */}
      {open ? (
        <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
          {item.children}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Disclosure list.
 *
 * Each item is an independent disclosure, not a single-select accordion: a
 * reader comparing two answers should not have one close the other. Built on
 * native buttons so keyboard and screen-reader behaviour is the platform's.
 */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn(styles.list, className)}>
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
}
