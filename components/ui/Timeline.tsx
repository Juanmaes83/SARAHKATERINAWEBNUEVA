import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Timeline.module.css';

export interface TimelineStage {
  readonly id: string;
  readonly title: string;
  readonly facets: readonly { label: string; value: ReactNode }[];
}

export interface TimelineProps {
  stages: readonly TimelineStage[];
  className?: string;
}

/**
 * Ordered process sequence.
 *
 * Rendered as an ordered list: the order is meaning, not decoration, so it has
 * to survive without CSS. The connecting rule is purely presentational.
 */
export function Timeline({ stages, className }: TimelineProps) {
  return (
    <ol className={cn(styles.timeline, className)}>
      {stages.map((stage, index) => (
        <li key={stage.id} className={styles.stage}>
          <span className={styles.marker} aria-hidden="true">
            {index + 1}
          </span>
          <div className={styles.body}>
            <h3 className={styles.title}>{stage.title}</h3>
            <dl className={styles.facets}>
              {stage.facets.map((facet) => (
                <div key={facet.label}>
                  <dt className={styles.facetLabel}>{facet.label}</dt>
                  <dd className={styles.facetValue}>{facet.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
