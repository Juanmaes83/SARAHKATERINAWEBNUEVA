import { Container } from '@/components/layout/Container';
import { WebButton } from './WebButton';
import { DashboardCard } from './DashboardCard';
import { Icon, type IconName } from './icons/Icon';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { HeroFilm } from '@/components/motion/HeroFilm';
import { hero } from '@/content/en/investment';
import { HERO_VIDEO } from '@/lib/media/hero-video';
import entrance from '@/components/motion/Entrance.module.css';
import { cn } from '@/lib/utils/cn';
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
 *   1. Sarah — the approved hero photograph;
 *   2. place — the location pin and the copy, not a second image;
 *   3. the dashboard — illustrative sample figures, labelled;
 *   4. decision signals — the credential row under the CTAs.
 *
 * The small coastline thumbnail that used to sit over the photograph was
 * removed on 2026-09-22 after visual review: it fought the portrait for
 * attention and its baked-in wordmark was clipped. The frame now reads as one
 * composition, so nothing was left behind in its place.
 *
 * PHASE 2E MOTION — the hero is the page's one composed arrival (CSS only,
 * `components/motion/Entrance.module.css`): the copy rises line by line, the
 * visual's frame opens, and the snapshot card lands last.
 *
 * PHASE 2F — the visual is the Costa Blanca territory film, scrubbed by
 * scroll (`ScrubVideo`): the coast, then the four routes for investment. The
 * footage carries its own town labels, panel and mark, so nothing may sit on
 * it: the location line moves above the frame and the snapshot card below
 * it, touching but never overlapping.
 *
 * PHASE 2H (Sarah's review) — the film plays once, muted, without depending
 * on scroll (`HeroFilm`), and the visual column is wider from 1024px
 * ("the video is too small").
 */
export function WebHero({overrides={}}:{overrides?:Record<string,string>}) {
  return (
    <section className={styles.hero} id="top">
      <Container className={cn(styles.grid, styles.gridFilm)}>
        <RevealOnScroll className={cn(styles.copy, entrance.copy)}>
          <p className={styles.eyebrow}>{overrides.heroEyebrow || hero.eyebrow.text}</p>

          {/* The single h1 of the page. */}
          <h1 className={styles.heading}>{overrides.heroTitle || hero.heading.text}</h1>

          <p className={styles.lead}>{overrides.heroLead || hero.lead.text}</p>

          <div className={styles.ctas}>
            <WebButton variant="primary" arrow>
              {overrides.heroPrimaryCta || hero.primaryCta.text}
            </WebButton>
            <WebButton variant="secondary">{overrides.heroSecondaryCta || hero.secondaryCta.text}</WebButton>
          </div>

          <dl className={styles.signals}>
            {hero.signals.map((signal) => (
              <div key={signal.value.text} className={styles.signal}>
                <Icon name={signal.icon as IconName} className={styles.signalIcon} />
                <div>
                  <dt className={styles.signalValue}>{signal.value.text}</dt>
                  <dd className={styles.signalNote}>{signal.note.text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className={styles.script}>{hero.script.text}</p>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={styles.visual}>
          <figure className={styles.figure}>
            <p className={styles.videoCaption}>
              <Icon name="pin" size="sm" />
              {hero.locationLabel.text}
            </p>
            <HeroFilm
              video={HERO_VIDEO.investment}
              name="the hero film"
              className={entrance.media}
            />

            <div className={cn(styles.dashboard, styles.dashboardBelow, entrance.float)}>
              <div className={entrance.depthFront}>
                <DashboardCard />
              </div>
            </div>
          </figure>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
