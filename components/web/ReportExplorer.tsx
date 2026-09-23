'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './ReportExplorer.module.css';

export interface ReportExplorerPanel {
  readonly id: string;
  readonly title: string;
  /** What the panel shows, in one line. */
  readonly note: string;
  /** Which decision the panel helps the reader take. */
  readonly decision: string;
  /** The panel's sample content — a chart, a table or a summary. */
  readonly body: ReactNode;
}

export interface ReportExplorerProps {
  /** Accessible name of the panel list, e.g. "Sample report panels". */
  readonly label: string;
  readonly panels: readonly ReportExplorerPanel[];
  /** Heading for the decision line inside each panel. */
  readonly decisionLabel?: string;
  /** CTA, deliverables and notes, rendered beside (desktop) or below (mobile). */
  readonly aside: ReactNode;
}

/**
 * Sample report explorer — Phase 2E (brief 2026-10-23, §6 and §8).
 *
 * Turns the report band from a row of static cards into a sample report the
 * reader can walk through: one panel at a time, each saying what it shows and
 * which decision it supports. Shared by Investment (five panels) and Tax
 * Advisory (four panels).
 *
 * PROGRESSIVE ENHANCEMENT
 *
 * The server renders every panel, stacked and fully legible. Only after
 * hydration does it become a tab interface, so a reader without JavaScript —
 * or a crawler — never meets a hidden panel. Reduced motion keeps the
 * interaction and removes the transitions.
 *
 * KEYBOARD — WAI-ARIA tabs pattern with automatic activation: one tab stop;
 * Arrow keys (both axes, because the list is vertical on desktop and
 * horizontal on phones), Home and End move between panels; Tab moves into the
 * active panel.
 *
 * GOVERNANCE — every figure inside a panel is illustrative sample data and is
 * labelled so. Nothing here counts or tweens a number; only chart shapes draw.
 */
export function ReportExplorer({
  label,
  panels,
  decisionLabel = 'Helps you decide',
  aside,
}: ReportExplorerProps) {
  const baseId = useId();
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setEnhanced(true), []);

  const select = (index: number, focus: boolean) => {
    const next = (index + panels.length) % panels.length;
    setActive(next);
    const tab = tabRefs.current[next];
    if (!tab) return;
    if (focus) tab.focus({ preventScroll: true });
    // Keep the chosen tab in view inside a horizontally scrolling list
    // without ever scrolling the page itself.
    const list = listRef.current;
    if (list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2 });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: panels.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, true);
  };

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;
  const progress = panels.length > 1 ? active / (panels.length - 1) : 1;

  return (
    <div className={cn(styles.explorer, enhanced && styles.enhanced)}>
      {enhanced ? (
        <div
          ref={listRef}
          role="tablist"
          aria-label={label}
          className={styles.tablist}
          style={{ ['--sk-report-progress' as string]: progress }}
        >
          {panels.map((panel, index) => (
            <button
              key={panel.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={index === active}
              aria-controls={panelId(index)}
              tabIndex={index === active ? 0 : -1}
              className={styles.tab}
              onClick={() => select(index, false)}
              onKeyDown={onKeyDown}
            >
              <span className={styles.tabIndex} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.tabText}>
                <span className={styles.tabTitle}>{panel.title}</span>
                <span className={styles.tabNote}>{panel.note}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.stage}>
        {panels.map((panel, index) => {
          const shown = !enhanced || index === active;
          return (
            <section
              key={panel.id}
              id={panelId(index)}
              className={styles.panel}
              {...(enhanced
                ? { role: 'tabpanel', 'aria-labelledby': tabId(index), tabIndex: 0 }
                : { 'aria-label': panel.title })}
              hidden={!shown}
            >
              <header className={styles.panelHead}>
                <span className={styles.panelCount}>
                  {String(index + 1).padStart(2, '0')} / {String(panels.length).padStart(2, '0')}
                </span>
                <h3 className={styles.panelTitle}>{panel.title}</h3>
                <p className={styles.panelNote}>{panel.note}</p>
              </header>

              <div className={styles.panelBody}>{panel.body}</div>

              <div className={styles.decision}>
                <p className={styles.decisionLabel}>{decisionLabel}</p>
                <p className={styles.decisionText}>{panel.decision}</p>
              </div>

              <span className={styles.illustrative}>Illustrative</span>
            </section>
          );
        })}
      </div>

      <div className={styles.aside}>{aside}</div>
    </div>
  );
}
