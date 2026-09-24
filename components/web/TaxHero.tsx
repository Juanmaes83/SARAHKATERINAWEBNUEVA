import { Container } from '@/components/layout/Container';
import { WebButton } from './WebButton';
import { TaxSnapshotCard } from './TaxSnapshotCard';
import { Icon, type IconName } from './icons/Icon';
import { HERO_VIDEO } from '@/lib/media/hero-video';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { ScrubStage, ScrubVideo } from '@/components/motion/ScrubVideo';
import { hero } from '@/content/en/tax-advisory';
import { isPublishable } from '@/lib/content/claims';
import shared from './WebHero.module.css';
import entrance from '@/components/motion/Entrance.module.css';
import { cn } from '@/lib/utils/cn';
import styles from './TaxBands.module.css';

/**
 * Tax Advisory hero.
 *
 * The hero keeps the shared Investment composition: editorial copy on the left
 * and one visual column on the right. Tax-specific metadata sits in normal
 * document flow above the image, while the illustrative snapshot is rendered
 * below it. Nothing is positioned over Sarah's face and no HTML labels repeat
 * text already embedded in the approved image.
 *
 * MEDIA — PHASE 2F: the owner-approved scroll video (`HERO_VIDEO.tax`)
 * turns the villa into a legible system of purchase taxes, ongoing costs and
 * ownership risk, with Sarah beside it. The footage carries those labels
 * itself, so no chip is laid over it. The "intro video" pending chip above the
 * frame is a different asset (the template's one-minute explainer) and stays.
 * The former hero image (`APPROVED_MEDIA.taxHero`) remains registered.
 */
export function TaxHero() {
  return (
    <ScrubStage>
      <section className={shared.hero} id="top">
        <Container className={shared.grid}>
          <RevealOnScroll className={cn(shared.copy, entrance.copy)}>
            <p className={shared.eyebrow}>{hero.eyebrow.text}</p>

            {/* The single h1 of the page. */}
            <h1 className={shared.heading}>{hero.heading.text}</h1>

            <p className={shared.lead}>{hero.lead.text}</p>

            <div className={shared.ctas}>
              <WebButton variant="primary" arrow>
                {hero.primaryCta.text}
              </WebButton>
              <WebButton variant="secondary">{hero.secondaryCta.text}</WebButton>
            </div>

            <dl className={shared.signals}>
              {hero.signals.map((signal) => (
                <div key={signal.value.text} className={shared.signal}>
                  <Icon name={signal.icon as IconName} className={shared.signalIcon} />
                  <div>
                    <dt className={shared.signalValue}>
                      {signal.value.text}
                      {!isPublishable(signal.value) ? (
                        <span
                          className={shared.pendingDot}
                          role="img"
                          aria-label="figure pending approval"
                        />
                      ) : null}
                    </dt>
                    <dd className={shared.signalNote}>{signal.note.text}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <p className={shared.script}>{hero.script.text}</p>
          </RevealOnScroll>

          <RevealOnScroll order={1} className={shared.visual}>
            <figure className={shared.figure}>
              <div className={styles.heroMedia}>
                <div className={styles.mediaMeta} aria-label="Hero media details">
                  <span className={styles.mediaMetaItem}>
                    <Icon name="pin" size="sm" />
                    {hero.locationLabel.text}
                  </span>
                  <span className={`${styles.mediaMetaItem} ${styles.mediaMetaPending}`}>
                    <Icon name="play" size="sm" />
                    {hero.videoPending.text}
                  </span>
                </div>

                <ScrubVideo video={HERO_VIDEO.tax} className={entrance.media} />
              </div>

              <div className={cn(shared.dashboard, styles.detachedDashboard, entrance.float)}>
                <TaxSnapshotCard />
              </div>
            </figure>
          </RevealOnScroll>
        </Container>
      </section>
    </ScrubStage>
  );
}
