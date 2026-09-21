import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import styles from './Hero.module.css';

export interface HeroProps {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCta: string;
  secondaryCta: string;
  /** Describes the asset that would replace the structural placeholder. */
  visualIntent: string;
}

/**
 * Hero.
 *
 * Not an isolated headline in whitespace: the composition is copy plus a
 * structural preview of the deliverable, which is what the proposal's hero
 * pattern calls for ("hero con texto + prueba visual").
 *
 * The visual is a labelled skeleton of the model summary. It shows the shape
 * of what the client receives without inventing a single figure — every value
 * is rendered as a withheld rule, marked in the footer.
 */
export function Hero({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  visualIntent,
}: HeroProps) {
  return (
    <div className={styles.hero}>
      <RevealOnScroll className={styles.copy}>
        <Eyebrow>{eyebrow}</Eyebrow>

        {/* The single h1 of the page. */}
        <Heading level={1} className={styles.heading}>
          {heading}
        </Heading>

        <Text variant="lead" className={styles.sub}>
          {subheading}
        </Text>

        <div className={styles.ctas}>
          <Button variant="primary">{primaryCta}</Button>
          <Button variant="secondary">{secondaryCta}</Button>
        </div>

        <Text variant="legal">
          Provisional CTA wording. Per-intent CTAs are an open decision — see the copy and claims
          matrix.
        </Text>
      </RevealOnScroll>

      <RevealOnScroll order={1}>
        <figure className={styles.visual} style={{ margin: 0 }}>
          <div className={styles.visualHead}>
            <span className={styles.visualTitle}>Review summary</span>
            <Badge tone="pending">STRUCTURE ONLY</Badge>
          </div>

          <dl className={styles.rows}>
            {[
              { label: 'Agreed price', strong: false },
              { label: 'Purchase taxes', strong: true },
              { label: 'Costs to completion', strong: false },
              { label: 'Cash required at signing', strong: true },
              { label: 'Position under stress', strong: false },
            ].map((row) => (
              <div key={row.label} className={styles.row}>
                <dt className={styles.rowLabel}>{row.label}</dt>
                <dd style={{ margin: 0 }}>
                  <span
                    className={`${styles.rowValue} ${row.strong ? styles.rowValueStrong : ''}`}
                    role="img"
                    aria-label="Value withheld: no figure is approved for publication"
                  />
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.strip}>
            <span className={`${styles.chip} ${styles.chipActive}`}>Base</span>
            <span className={styles.chip}>Stress</span>
            <span className={styles.chip}>Exit</span>
          </div>

          <figcaption className={styles.visualFoot}>
            <Badge tone="pending">PENDING_APPROVAL</Badge>
            <Text variant="legal" full>
              {visualIntent} No figures are shown: none is approved for publication.
            </Text>
          </figcaption>
        </figure>
      </RevealOnScroll>
    </div>
  );
}
