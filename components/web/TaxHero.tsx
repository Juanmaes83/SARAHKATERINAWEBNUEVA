import { Container } from '@/components/layout/Container';
import { WebLinkButton } from './WebButton';
import { CTA_TARGETS } from '@/content/en/internal-links';
import { TaxSnapshotCard } from './TaxSnapshotCard';
import { Icon, type IconName } from './icons/Icon';
import { HERO_VIDEO } from '@/lib/media/hero-video';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { ScrubStage, ScrubVideo } from '@/components/motion/ScrubVideo';
import { hero } from '@/content/en/tax-advisory';
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
 * turns the villa into a legible system of purchase taxes, legal checks,
 * ownership risk and recurring obligations. The footage carries those labels
 * itself, so no duplicate HTML labels are laid over the frame. The metadata
 * above it identifies the approved tax-exposure overview.
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
              <WebLinkButton href={CTA_TARGETS.taxHeroPrimary} variant="primary" arrow>
                {hero.primaryCta.text}
              </WebLinkButton>
              <WebLinkButton href={CTA_TARGETS.taxHeroSecondary} variant="secondary">
                {hero.secondaryCta.text}
              </WebLinkButton>
            </div>

            <dl className={shared.signals}>
              {hero.signals.map((signal) => (
                <div key={signal.value.text} className={shared.signal}>
                  <dt className={shared.signalValue}>
                    <Icon name={signal.icon as IconName} className={shared.signalIcon} />
                    {signal.value.text}
                  </dt>
                  <dd className={shared.signalNote}>{signal.note.text}</dd>
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
