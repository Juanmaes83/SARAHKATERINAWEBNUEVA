import { Container } from '@/components/layout/Container';
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
  /**
   * Phase 2H: the lead variant near the top of a page — navy surface, larger
   * question, rendered as the band's `h2`. Same content, same states.
   */
  readonly prominent?: boolean;
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
 *  - a live tool with no valid configured or verified origin renders an
 *    honest, non-interactive pending state;
 *  - `limited-go` and `not-built` experiences never render a link.
 *
 * No figure, rate, formula or result is shown here — only the tool's own
 * question and verified scope.
 */
export function BuyerToolRibbon({
  toolKey,
  sourcePage,
  moment,
  prominent = false,
  className,
}: BuyerToolRibbonProps) {
  const entry = resolveEntryPoint(toolKey);
  const { experience } = entry;
  const Question = prominent ? 'h2' : 'h3';
  const pendingNote =
    experience.availability === 'live'
      ? 'The tool is live in the Buyer System. Its public address is awaiting approval, so it is not linked in this preview.'
      : entry.pendingReason;

  return (
    <aside
      className={cn(styles.ribbon, prominent && styles.prominent, className)}
      // The navy lead variant needs the dark-surface focus ring.
      data-surface={prominent ? 'dark' : undefined}
      aria-label={`${experience.label} — Buyer System tool`}
    >
      <span className={styles.icon}>
        <Icon name="financialModel" />
      </span>
      <div className={styles.copy}>
        <p className={styles.kicker}>Buyer System · free tool</p>
        <Question className={styles.question}>{experience.question}</Question>
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

/**
 * Phase 2H — the Buyer System entry point as its own band, directly under a
 * hero (Sarah's review: "put the calculator at the start of the page").
 * It is the same ribbon, resolved by the same adapter: a link only when the
 * Buyer System base URL is approved, an honest pending state until then.
 */
export function BuyerToolBand(props: Omit<BuyerToolRibbonProps, 'prominent' | 'className'>) {
  return (
    <section className={styles.band} aria-label="Buyer System tool">
      <Container>
        <BuyerToolRibbon {...props} prominent className={styles.bandRibbon} />
      </Container>
    </section>
  );
}
