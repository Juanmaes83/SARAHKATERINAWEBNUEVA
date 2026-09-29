import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { PlayOnceVideo } from '@/components/motion/PlayOnceVideo';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { finalCta, hero, process, services, side, tools, trust, voices } from '@/content/en/home';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { APPROVED_VIDEO } from '@/lib/media/approved-video';
import { cn } from '@/lib/utils/cn';
import { BuyerToolRibbon } from './BuyerToolRibbon';
import { HomeServiceBanner } from './HomeServiceBanner';
import { WebLinkButton } from './WebButton';
import { Icon } from './icons/Icon';
import styles from './HomePreview.module.css';

/*
 * THE ADVISORY THREAD
 *
 * The Home's one visual idea, taken from Sarah's own approved line "Sarah
 * holds the advisory thread together": a single gold hairline that starts
 * beside the promise and runs down the page margin through the decision, the
 * three services, the client voices and Sarah, ending at the next step. It
 * communicates orientation and continuity; it never crosses anything out.
 * Each section draws its own segment as the reader passes (native
 * scroll-driven CSS bound to that section's view, never to the page).
 *
 * MOTION HIERARCHY (spec 2026-09-29 §28)
 *   0  static — almost everything, including the H1 and the hero film poster,
 *      which render immediately (no entrance animation delays the LCP);
 *   1  editorial reveal — three statements only (`RevealHeading`);
 *   2  physical — the service banner's fabric, the distinctive signature.
 *
 * Without scroll-driven animation support, with reduced motion or without
 * JavaScript, every segment is drawn and every heading is plain text.
 */

const SERVICE_MEDIA = {
  assetPlan: APPROVED_MEDIA.assetPlan,
  assetResidential: APPROVED_MEDIA.assetResidential,
  reportInterior: APPROVED_MEDIA.reportInterior,
  homeAuthority: APPROVED_MEDIA.homeAuthority,
} as const;

const CHAPTER_CLASS: Record<string, string | undefined> = {
  'property-purchase': styles.chapterPurchase,
  investment: styles.chapterInvestment,
  'tax-advisory': styles.chapterTax,
};

function Thread({ start, end }: { start?: boolean; end?: boolean }) {
  return (
    <span
      className={cn(styles.thread, start && styles.threadStart, end && styles.threadEnd)}
      aria-hidden="true"
    />
  );
}

/**
 * Editorial reveal (level 1). The complete heading is in the DOM and in its
 * final layout from the first paint; only its ink resolves left to right, line
 * after line, as the reader scrolls through it. No character splitting, no
 * layout change; plain text wherever scroll-driven animation is unavailable
 * or reduced motion is requested.
 */
function RevealText({ children }: { children: ReactNode }) {
  return <span className={styles.reveal}>{children}</span>;
}

/** Carries the thread through a shared section the Home does not own (FAQ). */
export function HomeThreaded({ children }: { children: ReactNode }) {
  return (
    <div className={styles.threaded}>
      <Thread />
      {children}
    </div>
  );
}

export function HomeHero() {
  const words = hero.title.text.split(' ');
  return (
    <section className={cn(styles.hero, styles.threaded)} id="top" data-surface="light">
      <Thread start />
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.heading}>
            {words.map((word, index) => (
              <span key={word} className={cn(styles.word, index === 0 && styles.wordFirst)}>
                {word}
                {index < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>
          <p className={styles.lead}>{hero.lead.text}</p>
          <div className={styles.actions}>
            <WebLinkButton href="#services" variant="primary" arrow>
              {hero.primaryCta}
            </WebLinkButton>
            <WebLinkButton href="#tools" variant="secondary">
              {hero.secondaryCta}
            </WebLinkButton>
          </div>
        </div>

        <figure className={styles.heroMedia}>
          <PlayOnceVideo
            video={APPROVED_VIDEO.homeInvestmentObjective}
            name="the Home film"
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 92vw, 60vw"
            className={styles.film}
          />
          <figcaption className={styles.filmMeta}>
            <span>{hero.filmLabel}</span>
            <span>{hero.filmCaption.text}</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

/** "On your side" — the confirmed independence decision, stated positively. */
export function HomeSideStatement() {
  return (
    <section
      className={cn(styles.side, styles.threaded)}
      aria-labelledby="side-title"
      data-surface="light"
    >
      <Thread />
      <Container className={styles.sideGrid}>
        <div className={styles.sideArt}>
          <p className={styles.eyebrow}>{side.eyebrow}</p>
          <h2 id="side-title" className={styles.sideStatement}>
            <RevealText>{side.statement.text}</RevealText>
          </h2>
        </div>
        <ul className={styles.trustList}>
          {trust.map((item, index) => (
            <li key={item.label} className={styles.trustItem}>
              <span className={styles.trustNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p>
                <span>{item.label}</span>
                {item.value.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ChapterMedia({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  // A larger pointer target for the same destination as the chapter's CTA.
  // Kept out of the tab order and the accessibility tree so keyboard and
  // screen-reader users meet one link per chapter, with a real label.
  return (
    <RevealOnScroll variant="unveil" className={cn(styles.chapterMedia, className)}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className={styles.mediaLink}>
        {children}
      </Link>
    </RevealOnScroll>
  );
}

/**
 * Services: the discovery banner orients (need → service → next step), then
 * the three service chapters give each path's visual synthesis. Team is not a
 * need; it is the authority block after the client voices (`HomeTeam`).
 */
export function HomeServices() {
  const chapters = services.items.filter((item) => item.id !== 'sarah');
  return (
    <section id="services" className={styles.services} data-surface="light">
      <div className={cn(styles.discoveryBand, styles.threaded)}>
        <Thread />
        <Container>
          <HomeServiceBanner />
        </Container>
      </div>

      {chapters.map((service) => {
        const media = SERVICE_MEDIA[service.media];
        const dark = service.id === 'investment';
        return (
          <article
            key={service.id}
            id={`chapter-${service.id}`}
            className={cn(
              styles.chapter,
              styles.threaded,
              CHAPTER_CLASS[service.id],
              dark && styles.chapterDark,
            )}
            data-surface={dark ? 'dark' : 'light'}
            aria-labelledby={`chapter-title-${service.id}`}
          >
            <Thread />
            <span className={styles.node} aria-hidden="true">
              {service.number}
            </span>
            <Container className={styles.chapterGrid}>
              <RevealOnScroll className={styles.chapterLead}>
                <p className={styles.chapterLabel}>
                  <span aria-hidden="true">{service.number}</span>
                  {service.label}
                </p>
                <h3 id={`chapter-title-${service.id}`} className={styles.chapterTitle}>
                  {service.title.text}
                </h3>
              </RevealOnScroll>

              <ChapterMedia href={service.href} className={styles.wideMedia}>
                <Image
                  src={media.src}
                  alt={media.alt}
                  width={media.width}
                  height={media.height}
                  className={styles.chapterImage}
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 70vw, 60vw"
                />
              </ChapterMedia>

              <RevealOnScroll className={styles.chapterCopy}>
                <p className={styles.chapterBody}>{service.body.text}</p>
                <WebLinkButton
                  href={service.href}
                  variant={dark ? 'secondary' : 'quiet'}
                  onDark={dark}
                  arrow
                >
                  {service.cta.text}
                </WebLinkButton>
              </RevealOnScroll>
            </Container>
          </article>
        );
      })}
    </section>
  );
}

export function HomeProcessBand() {
  return (
    <section className={cn(styles.process, styles.threaded)} id="process" data-surface="light">
      <Thread />
      <Container>
        <div className={styles.processHead}>
          <div>
            <p className={styles.eyebrow}>{process.eyebrow}</p>
            <h2 className={styles.sectionTitle}>
              <RevealText>{process.title.text}</RevealText>
            </h2>
          </div>
          <RevealOnScroll className={styles.boundary}>
            <Icon name="risk" />
            <p>{process.boundary.text}</p>
          </RevealOnScroll>
        </div>
        <ol className={styles.processList}>
          {process.steps.map((step, index) => (
            <RevealOnScroll as="li" order={index} key={step.number} className={styles.processStep}>
              <span>{step.number}</span>
              <h3>{step.title.text}</h3>
              <p>{step.body.text}</p>
            </RevealOnScroll>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/**
 * Client voices — authorised by the owner on 2026-09-29 with names and
 * details (content/en/home.ts). Written proof only: no image is paired with a
 * quote, so no illustration can be mistaken for the person quoted.
 */
export function HomeVoices() {
  return (
    <section
      className={cn(styles.voices, styles.threaded)}
      id="voices"
      aria-labelledby="voices-title"
      data-surface="light"
    >
      <Thread />
      <Container>
        <div className={styles.voicesHead}>
          <p className={styles.eyebrow}>{voices.eyebrow}</p>
          <h2 id="voices-title" className={styles.sectionTitle}>
            <RevealText>{voices.title.text}</RevealText>
          </h2>
        </div>
        <div className={styles.voicesGrid}>
          {voices.items.map((item, index) => (
            <RevealOnScroll
              as="figure"
              key={item.id}
              order={index}
              className={cn(styles.voice, index === 0 && styles.voiceLead)}
            >
              <span className={styles.voiceMark} aria-hidden="true">
                “
              </span>
              <blockquote>
                <p>{item.quote.text}</p>
              </blockquote>
              <figcaption>
                <cite>{item.name.text}</cite>
                {item.context.text}
              </figcaption>
            </RevealOnScroll>
          ))}
        </div>
        <p className={styles.voicesNote}>{voices.note.text}</p>
      </Container>
    </section>
  );
}

/** Team as authority and human connection — not a fourth service need. */
export function HomeTeam() {
  const team = services.items.find((item) => item.id === 'sarah');
  if (!team) return null;
  const media = SERVICE_MEDIA[team.media];
  return (
    <section
      id="sarah"
      className={cn(styles.chapter, styles.threaded, styles.chapterTeam, styles.chapterDark)}
      data-surface="dark"
      aria-labelledby="team-title"
    >
      <Thread />
      <Container className={styles.chapterGrid}>
        <ChapterMedia href={team.href} className={styles.portraitMedia}>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            className={styles.chapterImage}
            sizes="(max-width: 767px) 100vw, 40vw"
          />
          <span className={styles.tie} aria-hidden="true" />
        </ChapterMedia>

        <RevealOnScroll className={styles.chapterLead}>
          <p className={styles.chapterLabel}>{team.label}</p>
          <h2 id="team-title" className={styles.chapterTitle}>
            {team.title.text}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className={styles.chapterCopy}>
          <p className={styles.chapterBody}>{team.body.text}</p>
          <WebLinkButton href={team.href} variant="secondary" onDark arrow>
            {team.cta.text}
          </WebLinkButton>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export function HomeToolsBand() {
  return (
    <section className={cn(styles.toolsBand, styles.threaded)} id="tools" data-surface="dark">
      <Thread />
      <Container>
        <div className={styles.toolsHead}>
          <RevealOnScroll>
            <p className={styles.darkEyebrow}>{tools.eyebrow}</p>
            <h2 className={styles.darkTitle}>{tools.title.text}</h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <p className={styles.darkLead}>{tools.intro.text}</p>
          </RevealOnScroll>
        </div>
        <div className={styles.toolsGrid}>
          <RevealOnScroll>
            <BuyerToolRibbon
              toolKey="purchaseTax"
              sourcePage="/preview/home"
              moment={tools.purchaseTaxMoment}
              className={styles.toolRibbon}
            />
          </RevealOnScroll>
          <RevealOnScroll order={1}>
            <BuyerToolRibbon
              toolKey="realCashNeeded"
              sourcePage="/preview/home"
              moment={tools.realCashMoment}
              className={styles.toolRibbon}
            />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

export function HomeFinalCtaBand() {
  return (
    <section className={cn(styles.finalCta, styles.threaded)} data-surface="dark">
      <Thread end />
      <Container className={styles.finalCtaInner}>
        <RevealOnScroll>
          <p className={styles.darkEyebrow}>{finalCta.eyebrow}</p>
          <h2 className={styles.finalTitle}>{finalCta.title.text}</h2>
          <p className={styles.finalBody}>{finalCta.body.text}</p>
        </RevealOnScroll>
        <RevealOnScroll className={styles.finalActions}>
          <WebLinkButton href="#services" variant="primary" onDark arrow>
            {finalCta.primaryCta}
          </WebLinkButton>
          <WebLinkButton href="#tools" variant="secondary" onDark>
            {finalCta.secondaryCta}
          </WebLinkButton>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
