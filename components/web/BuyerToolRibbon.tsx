import { resolveEntryPoint, type BuyerSystemExperienceKey } from '@/lib/buyer-system/links';
import { cn } from '@/lib/utils/cn';
import { BuyerToolLink } from './BuyerToolLink';
import { Icon } from './icons/Icon';
import styles from './BuyerToolRibbon.module.css';

export interface BuyerToolRibbonProps {
  readonly toolKey: BuyerSystemExperienceKey;
  /** The preview route that renders the ribbon, for the exit-click event. */
  readonly sourcePage: string;
  /** Why the tool belongs at this point of the page. Optional. */
  readonly moment?: string;
  readonly className?: string;
}

/**
 * One Buyer System entry point, placed inside a band's narrative.
 *
 * Promoted from Property Purchase's local `CalculatorRibbon` in Phase 2G so
 * Tax Advisory can use the same entry point after its calendar instead of a
 * second implementation. Everything is resolved by `resolveEntryPoint`:
 *
 *  - a live tool with a confirmed base URL renders an outbound link;
 *  - a live tool without one (the default: NEXT_PUBLIC_BUYER_SYSTEM_URL is
 *    unset) renders an honest, non-interactive pending state;
 *  - `limited-go` and `not-built` experiences never render a link.
 *
 * No figure, rate, formula or result is shown here — only the tool's own
 * question and verified scope.
 */
export function BuyerToolRibbon({ toolKey, sourcePage, moment, className }: BuyerToolRibbonProps) {
  const entry = resolveEntryPoint(toolKey);
  const { experience } = entry;
  const pendingNote =
    experience.availability === 'live'
      ? 'The tool is live in the Buyer System. Its public address is awaiting approval, so it is not linked in this preview.'
      : entry.pendingReason;

  return (
    <aside
      className={cn(styles.ribbon, className)}
      aria-label={`${experience.label} — Buyer System tool`}
    >
      <span className={styles.icon}>
        <Icon name="financialModel" />
      </span>
      <div className={styles.copy}>
        <p className={styles.kicker}>Buyer System · free tool</p>
        <h3 className={styles.question}>{experience.question}</h3>
        {moment ? <p className={styles.moment}>{moment}</p> : null}
        <p className={styles.scope}>{experience.scope}</p>
      </div>
      <div className={styles.action}>
        {entry.href ? (
          <BuyerToolLink
            href={entry.href}
            calculator={experience.id}
            sourcePage={sourcePage}
            className={styles.link}
          >
            Open {experience.label.toLowerCase()} <Icon name="arrow" size="sm" />
          </BuyerToolLink>
        ) : (
          <>
            <p className={styles.pending}>
              <span className={styles.pendingMark} aria-hidden="true" />
              Link pending approval
            </p>
            <p className={styles.pendingNote}>{pendingNote}</p>
          </>
        )}
      </div>
    </aside>
  );
}
