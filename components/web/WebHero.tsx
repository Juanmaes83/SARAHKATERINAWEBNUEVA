import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { WebButton } from './WebButton';
import { DashboardCard } from './DashboardCard';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import portrait from '@/public/sarah/sk-real-1.jpg';
import styles from './WebHero.module.css';

export interface HeroCredential {
  readonly value: string;
  readonly note: string;
}

export interface WebHeroProps {
  eyebrow: string;
  heading: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  credentials: readonly HeroCredential[];
  locationLabel: string;
  imageAlt: string;
  caption: string;
}

/**
 * Editorial hero — two zones, as in the Investment template.
 *
 * HERO IMAGE — decided by Juanma on 2026-09-21.
 *
 * The template's hero uses a villa-and-sea render. No property or Costa Blanca
 * photograph exists in the mother repository, and generating one would
 * fabricate documentary evidence of a place. Juanma selected the authentic
 * black-and-white portrait instead: `IMAGENES NUEVAS/SK_REAL_1.jpg`,
 * registered as `AUTH-SK-001`, "Authentic identity reference".
 *
 * Costa Blanca is therefore carried by the copy and the location label, not by
 * a photograph that does not exist.
 *
 * `priority` is set because this is the largest above-the-fold image; the
 * frame has a fixed aspect ratio, so it reserves its space and causes no
 * layout shift.
 */
export function WebHero({
  eyebrow,
  heading,
  lead,
  primaryCta,
  secondaryCta,
  credentials,
  locationLabel,
  imageAlt,
  caption,
}: WebHeroProps) {
  return (
    <section className={styles.hero}>
      <Container className={styles.grid}>
        <RevealOnScroll className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>

          {/* The single h1 of the page. */}
          <h1 className={styles.heading}>{heading}</h1>

          <p className={styles.lead}>{lead}</p>

          <div className={styles.ctas}>
            <WebButton variant="primary" arrow>
              {primaryCta}
            </WebButton>
            <WebButton variant="secondary">{secondaryCta}</WebButton>
          </div>

          <dl className={styles.credentials}>
            {credentials.map((credential) => (
              <div key={credential.value} className={styles.credential}>
                <span aria-hidden="true" style={{ color: 'var(--sk-web-gold)' }}>
                  —
                </span>
                <div className={styles.credentialText}>
                  <dt className={styles.credentialValue}>{credential.value}</dt>
                  <dd className={styles.credentialNote} style={{ margin: 0 }}>
                    {credential.note}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={styles.visual}>
          <figure style={{ margin: 0 }}>
            <div className={styles.frame}>
              <Image
                src={portrait}
                alt={imageAlt}
                className={styles.image}
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                placeholder="blur"
              />
              <span className={styles.scrim} aria-hidden="true" />
              <span className={styles.locationPin}>
                <span aria-hidden="true">◉</span>
                {locationLabel}
              </span>
            </div>

            <div className={styles.dashboard}>
              <DashboardCard />
            </div>

            <figcaption className={styles.caption}>{caption}</figcaption>
          </figure>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
