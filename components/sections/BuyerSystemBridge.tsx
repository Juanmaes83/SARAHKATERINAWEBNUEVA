'use client';

import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Text';
import { track } from '@/lib/analytics/track';
import { resolveEntryPoint, type BuyerSystemExperienceKey } from '@/lib/buyer-system/links';
import styles from './BuyerSystemBridge.module.css';

export interface BuyerSystemBridgeProps {
  /** Which experiences to surface here, in order of intent. */
  experiences: readonly BuyerSystemExperienceKey[];
  /** Page this bridge sits on. Sent with the outbound event. */
  sourcePage: string;
}

/**
 * Entry points into the Buyer System.
 *
 * This component NEVER renders a calculator, a tax figure, a rate or a result.
 * It links out. See docs/buyer-system-integration.md for why, and for the
 * gaps between what the brief assumes and what exists upstream.
 *
 * A pending entry point renders as a visibly pending card, not as a dead link
 * and not as a working tool.
 */
export function BuyerSystemBridge({ experiences, sourcePage }: BuyerSystemBridgeProps) {
  return (
    <div>
      <div className={styles.grid}>
        {experiences.map((key) => {
          const { experience, href, pending, pendingReason } = resolveEntryPoint(key);

          const inner = (
            <>
              <p className={styles.question}>{experience.question}</p>
              <p className={styles.scope}>{experience.scope}</p>
              <div className={styles.foot}>
                {pending ? (
                  <>
                    <Badge tone="pending">PENDING_APPROVAL</Badge>
                    <Text variant="legal" full>
                      {pendingReason}
                    </Text>
                  </>
                ) : (
                  <span className={styles.action}>
                    {experience.label}
                    <span aria-hidden="true">→</span>
                  </span>
                )}
              </div>
            </>
          );

          if (pending || href === null) {
            return (
              <div key={experience.id} className={`${styles.entry} ${styles.entryPending}`}>
                {inner}
              </div>
            );
          }

          return (
            <a
              key={experience.id}
              href={href}
              className={`${styles.entry} ${styles.entryLive}`}
              // Separate origin with its own governance and its own privacy
              // posture. Opening in a new tab keeps the reader's place and
              // makes the boundary between the two products explicit.
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track('calculator_start', {
                  calculator: experience.id,
                  source_page: sourcePage,
                })
              }
            >
              {inner}
              <span className="sk-visually-hidden">(opens in a new tab)</span>
            </a>
          );
        })}
      </div>

      <div className={styles.noFormNote} style={{ marginBlockStart: 'var(--sk-space-24)' }}>
        <Text variant="bodySmall" full>
          The first useful result is never placed behind a form. Nothing is asked for before the
          calculation is shown. What happens after the result — whether anything is captured, and
          where — is an open product decision recorded in the integration brief.
        </Text>
      </div>
    </div>
  );
}
