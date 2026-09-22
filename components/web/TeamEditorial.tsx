import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { WebButton, WebLinkButton } from './WebButton';
import { WebFaq } from './WebFaq';
import { WebSection, WebSectionHeader } from './WebSection';
import { Icon } from './icons/Icon';
import {
  aftercare,
  faq,
  finalCta,
  hero,
  independence,
  introduction,
  paths,
  process,
  profiles,
} from '@/content/en/team';
import teamHero from '@/public/team/optimized/team-hero.webp';
import teamGroup from '@/public/team/optimized/team-group.webp';
import officeWorkspace from '@/public/team/optimized/office-workspace.webp';
import officeSign from '@/public/team/optimized/office-sign.webp';
import sarahPortrait from '@/public/sarah/sk-real-1.jpg';
import styles from './TeamEditorial.module.css';

function TeamHero() {
  return (
    <section id="top" className={styles.hero} data-surface="light">
      <Container>
        <div className={styles.heroGrid}>
          <RevealOnScroll className={styles.heroCopy}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <p className={styles.heroLead}>{hero.lead}</p>
            <div className={styles.actions}>
              <WebLinkButton href="#contact" arrow>
                {hero.cta}
              </WebLinkButton>
              <WebLinkButton href="#team" variant="secondary">
                {hero.secondaryCta}
              </WebLinkButton>
            </div>
            <p className={styles.promise}>Clarity before commitment.</p>
          </RevealOnScroll>

          <RevealOnScroll order={1} className={styles.heroVisual}>
            <figure className={styles.heroFigure}>
              <div className={styles.heroFrame}>
                <Image
                  src={teamHero}
                  alt={hero.imageAlt}
                  fill
                  priority
                  placeholder="blur"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 92vw, 50vw"
                  className={styles.heroImage}
                />
                <div className={styles.heroScrim} aria-hidden="true" />
              </div>
              <figcaption className={styles.heroCaption}>{hero.caption}</figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

function IntroductionBand() {
  return (
    <WebSection surface="white" id="approach">
      <div className={styles.introGrid}>
        <WebSectionHeader eyebrow={introduction.eyebrow} title={introduction.title} rule />
        <RevealOnScroll order={1} className={styles.introBody}>
          {introduction.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className={styles.checkList}>
            {introduction.points.map((point) => (
              <li key={point}>
                <Icon name="check" size="sm" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

function PathsBand() {
  return (
    <WebSection surface="soft" id="paths">
      <WebSectionHeader
        eyebrow="Three starting points"
        title="Different plans. The same discipline before commitment."
        subtitle="The work begins with the life or use you are planning—not with a property someone wants to sell."
        centered
        rule
      />
      <div className={styles.pathGrid}>
        {paths.map((path, index) => (
          <RevealOnScroll key={path.title} order={index} className={styles.pathCard}>
            <span className={styles.iconCircle} aria-hidden="true">
              <Icon name={path.icon} />
            </span>
            <h3>{path.title}</h3>
            <p>{path.intro}</p>
            <ul>
              {path.analysis.map((item) => (
                <li key={item}>
                  <Icon name="check" size="sm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={styles.limit}>{path.limit}</p>
          </RevealOnScroll>
        ))}
      </div>
    </WebSection>
  );
}

function TeamBand() {
  const [sarah, ...team] = profiles;
  if (!sarah) return null;

  return (
    <WebSection surface="ivory" id="team">
      <WebSectionHeader
        eyebrow="The people around your decision"
        title="Four functions, connected around the buyer."
        subtitle="The photographs show three people. This preview does not infer names from appearance or suggest that every team member is pictured."
        rule
      />

      <div className={styles.sarahGrid}>
        <RevealOnScroll className={styles.sarahPortrait}>
          <Image
            src={sarahPortrait}
            alt="Sarah Katerina in an authentic studio portrait."
            fill
            placeholder="blur"
            sizes="(max-width: 767px) 100vw, 42vw"
            className={styles.coverImage}
          />
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.sarahCopy}>
          <p className={styles.profileArea}>{sarah.area}</p>
          <h3>{sarah.name}</h3>
          <p>{sarah.body}</p>
          <blockquote>“The property is only one part of the decision.”</blockquote>
          <p className={styles.proposalNote}>Editorial line proposed for this preview.</p>
        </RevealOnScroll>
      </div>

      <div className={styles.profileGrid}>
        {team.map((profile, index) => (
          <RevealOnScroll key={profile.name} order={index} className={styles.profileCard}>
            <p className={styles.profileArea}>{profile.area}</p>
            <h3>{profile.name}</h3>
            <p>{profile.body}</p>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll className={styles.groupFigure}>
        <figure>
          <div className={styles.groupFrame}>
            <Image
              src={teamGroup}
              alt="Three members of the Sarah Katerina team seated together outdoors; individual identities are not assigned in this preview."
              fill
              placeholder="blur"
              sizes="(max-width: 767px) 100vw, 1200px"
              className={styles.coverImage}
            />
          </div>
          <figcaption>
            Authentic team photography. Three people appear; no fourth person or individual identity
            is inferred from the image.
          </figcaption>
        </figure>
      </RevealOnScroll>
    </WebSection>
  );
}

function ProcessBand() {
  return (
    <WebSection surface="white" id="process">
      <WebSectionHeader
        eyebrow="From first idea to ownership"
        title="One journey, with the right person visible at each stage."
        subtitle="The advisory team connects the file. Regulated or specialist matters stay with the professionals qualified to verify them."
        rule
      />
      <ol className={styles.timeline}>
        {process.map((step, index) => (
          <RevealOnScroll as="li" key={step.number} order={index} className={styles.timelineItem}>
            <span className={styles.stepNumber}>{step.number}</span>
            <div className={styles.stepCard}>
              <p className={styles.stepPeople}>{step.people}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <p className={styles.verification}>
                <Icon name="document" size="sm" />
                <span>{step.verification}</span>
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </ol>
    </WebSection>
  );
}

function IndependenceBand() {
  return (
    <WebSection surface="navy" id="independence">
      <div className={styles.independenceGrid}>
        <RevealOnScroll className={styles.independenceCopy}>
          <p className={styles.darkEyebrow}>{independence.eyebrow}</p>
          <h2>{independence.title}</h2>
          <p className={styles.darkLead}>{independence.body}</p>
          <ul className={styles.darkList}>
            {independence.points.map((point) => (
              <li key={point}>
                <Icon name="independence" size="sm" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
        <RevealOnScroll order={1}>
          <figure className={styles.officeFigure}>
            <div className={styles.officeFrame}>
              <Image
                src={officeWorkspace}
                alt={aftercare.officeAlt}
                fill
                placeholder="blur"
                sizes="(max-width: 767px) 100vw, 46vw"
                className={styles.coverImage}
              />
            </div>
            <figcaption>
              Authentic office view, cropped to reduce document and screen visibility.
            </figcaption>
          </figure>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

function AftercareBand() {
  return (
    <WebSection surface="soft" id="ownership">
      <div className={styles.aftercareGrid}>
        <RevealOnScroll>
          <figure className={styles.signFigure}>
            <div className={styles.signFrame}>
              <Image
                src={officeSign}
                alt={aftercare.imageAlt}
                fill
                placeholder="blur"
                sizes="(max-width: 767px) 100vw, 45vw"
                className={styles.coverImage}
              />
            </div>
          </figure>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.aftercareCopy}>
          <p className={styles.eyebrow}>{aftercare.eyebrow}</p>
          <h2>{aftercare.title}</h2>
          <p>{aftercare.body}</p>
          <div className={styles.aftercareItems}>
            <span>Tax questions</span>
            <span>Administrative tasks</span>
            <span>Accounts</span>
            <span>Bills and charges</span>
          </div>
          <p className={styles.limit}>
            Support depends on the owner’s circumstances, professional review and the agreed scope.
          </p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

function FinalCtaBand() {
  return (
    <WebSection surface="navySoft" id="contact">
      <div className={styles.ctaGrid}>
        <RevealOnScroll>
          <p className={styles.darkEyebrow}>{finalCta.eyebrow}</p>
          <h2>{finalCta.title}</h2>
          <p className={styles.darkLead}>{finalCta.body}</p>
        </RevealOnScroll>
        <RevealOnScroll order={1} className={styles.ctaActions}>
          <WebButton variant="primary" onDark arrow>
            {finalCta.primaryCta}
          </WebButton>
          <WebLinkButton href="#paths" variant="secondary" onDark>
            {finalCta.secondaryCta}
          </WebLinkButton>
          <p>{finalCta.note}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

export function TeamEditorial() {
  return (
    <div>
      <TeamHero />
      <IntroductionBand />
      <PathsBand />
      <TeamBand />
      <ProcessBand />
      <IndependenceBand />
      <AftercareBand />
      <WebFaq content={faq} />
      <FinalCtaBand />
    </div>
  );
}
