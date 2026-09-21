'use client';

import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Badge } from './Badge';
import styles from './ScenarioPanel.module.css';

export interface Scenario {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

export interface ScenarioPanelProps {
  scenarios: readonly Scenario[];
  /** What the review produces. Rendered under the scenario panel. */
  artefacts?: readonly string[];
  className?: string;
}

/**
 * Scenario switcher — a structured placeholder for the real financial model.
 *
 * DELIBERATELY SHOWS NO FIGURES. Every number here would be a fabricated
 * financial result, which rule 8 forbids and which the claims governance
 * treats as unpublishable. The bars are fixed proportions of the container,
 * not data, and are marked as such in the UI.
 *
 * Implements the WAI tabs pattern: arrow keys move between tabs, Home/End jump
 * to the ends, and only the selected tab is in the tab order.
 */
export function ScenarioPanel({ scenarios, artefacts, className }: ScenarioPanelProps) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const next = (index + scenarios.length) % scenarios.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(scenarios.length - 1);
        break;
      default:
        break;
    }
  }

  const active = scenarios[selected];
  if (!active) return null;

  return (
    <div className={cn(styles.panel, className)}>
      <div className={styles.tablist} role="tablist" aria-label="Scenario">
        {scenarios.map((scenario, index) => (
          <button
            key={scenario.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${scenario.id}`}
            aria-selected={index === selected}
            aria-controls={`${baseId}-panel-${scenario.id}`}
            tabIndex={index === selected ? 0 : -1}
            className={styles.tab}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className={styles.tabpanel}
        // Re-mounts on change so the fade runs. Cheap: the subtree is tiny.
        key={active.id}
        tabIndex={0}
      >
        <p className={styles.description}>{active.description}</p>

        <div
          className={styles.chart}
          role="img"
          aria-label="Placeholder for the scenario chart. No figures are shown: the model output is not approved for publication."
        >
          {/* Fixed proportions, not data. See the component doc comment. */}
          {[38, 62, 46, 74, 55].map((height, index) => (
            <span key={index} className={styles.bar} style={{ height: `${height}%` }} />
          ))}
        </div>

        <div className={styles.legend}>
          <Badge tone="pending">NO FIGURES — PENDING_APPROVAL</Badge>
        </div>
      </div>

      {artefacts && artefacts.length > 0 ? (
        <ul className={styles.artefacts}>
          {artefacts.map((artefact) => (
            <li key={artefact} className={styles.artefact}>
              <span className={styles.artefactMarker} aria-hidden="true" />
              <span>{artefact}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
