import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { WebButton } from './WebButton';
import { DashboardCard } from './DashboardCard';
import { Icon, type IconName } from './icons/Icon';
import { TerritoryVisual } from './TerritoryVisual';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { hero } from '@/content/en/investment';
import { isPublishable } from '@/lib/content/claims';
import portrait from '@/public/sarah/sk-real-1.jpg';
import styles from './WebHero.module.css';

/**
 * Editorial hero — two zones, following the Investment template.
 *
 * VISUAL COMPOSITION
 *
 * The template's right zone is a villa-and-sea photograph with a financial
 * card over it. No property or Costa Blanca photograph exists in the mother
 * repository, and three of the four obvious substitutes are forbidden: stock,
 * a generated image passed off as real, and the template screenshot itself.
 *
 * So the zone carries all four signals the brief asks for, honestly:
 *   1. Sarah — the authentic portrait, AUTH-SK-001;
 *   2. place — a conceptual coastline schematic, declared as a schematic;
 *   3. the dashboard — illustrative sample figures, labelled;
 *   4. decision signals — the credential row under the CTAs.
 *
 * Replace the schematic with real photography when it exists; the slot and
 * aspect ratios are already correct.
 */
export function WebHero() {
  return (
    <section className={styles.hero} id="top">
      <Container className={styles.grid}>
        <RevealOnScroll className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow.text}</p>

          {/* The single h1 of the page. */}
          <h1 className={styles.heading}>{hero.heading.text}</h1>

          <p className={styles.lead}>{hero.lead.text}</p>

          <div className={styles.ctas}>
            <WebButton variant="primary" arrow>
              {hero.primaryCta.text}
            </WebButton>
            <WebButton variant="secondary">{hero.secondaryCta.text}</WebButton>
          </div>

          <dl className={styles.signals}>
            {hero.signals.map((signal) => (
              <div key={signal.value.text} className={styles.signal}>
                <Icon name={signal.icon as IconName} className={styles.signalIcon} />
                <div>
                  <dt className={styles.signalValue}>
                    {signal.value.text}
                    {!isPublishable(signal.value) ? (
                      <span
                        className={styles.pendingDot}
                        role="img"
                        aria-label="figure pending approval"
                      />
                    ) : null}
                  </dt>
                  <dd className={styles.signalNote}>{signal.note.text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className={styles.script}>{hero.script.text}</p>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={styles.visual}>
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <Image
                src={portrait}
                alt={hero.imageAlt.text}
                className={styles.image}
                priority
                sizes="(max-width: 1023px) 100vw, 46vw"
                placeholder="blur"
              />
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.locationPin}>
                <Icon name="pin" size="sm" />
                {hero.locationLabel.text}
              </span>
            </div>

            {/* Place signal, declared as a schematic rather than faked. */}
            <div className={styles.territory}>
              <TerritoryVisual variant="coast" tone="navy" label="Costa Blanca" />
            </div>

            <div className={styles.dashboard}>
              <DashboardCard />
            </div>
          </figure>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
