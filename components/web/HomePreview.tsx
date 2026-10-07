import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { HeroFilm } from '@/components/motion/HeroFilm';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import {
  bookCall,
  contactBand,
  finalCta,
  hero,
  presentation,
  process,
  services,
  side,
  tools,
  voices,
} from '@/content/en/home';
import { CONTACT_PREVIEW_ROUTE } from '@/content/en/site-navigation';
import { resolveContactChannels } from '@/lib/contact/channels';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { HERO_VIDEO } from '@/lib/media/hero-video';
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

// 2026-10-07: Property Purchase moves from the cutaway plan (`assetPlan`) to
// the advisory scene, and Team from `homeAuthority` to `sarahConfianza`
// (docs/home-buyer-system-preview.md §15).
const SERVICE_MEDIA = {
  advisorClientOne: APPROVED_MEDIA.advisorClientOne,
  assetResidential: APPROVED_MEDIA.assetResidential,
  reportInterior: APPROVED_MEDIA.reportInterior,
  sarahConfianza: APPROVED_MEDIA.sarahConfianza,
  homeInvestmentCoastHuman: APPROVED_MEDIA.homeInvestmentCoastHuman,
  homeTaxAdvisoryHuman: APPROVED_MEDIA.homeTaxAdvisoryHuman,
} as const;

/**
 * Wraps the whole Home so its desktop stage can widen together: header,
 * sections and footer share one content edge (`.stage` in the stylesheet).
 * It renders no box of its own.
 */
export function HomeStage({ children }: { children: ReactNode }) {
  return <div className={styles.stage}>{children}</div>;
}

const CHAPTER_CLASS: Record<string, string | undefined> = {
  'property-purchase': styles.chapterPurchase,
  investment: styles.chapterInvestment,
  'tax-advisory': styles.chapterTax,
};

/**
 * The booking page every "Book a call" button opens (PDF, page 5). It comes
 * from NEXT_PUBLIC_BOOKING_URL; without it no booking button is rendered, so
 * the page never shows a booking button that leads nowhere.
 */
function bookingHref(): string | null {
  const { booking } = resolveContactChannels(contactBand.whatsappOpener);
  return booking.status === 'configured' ? booking.href : null;
}

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

export function HomeHero({overrides={}}:{overrides?:Record<string,string>}) {
  const words = (overrides.heroTitle || hero.title.text).split(' ');
  const booking = bookingHref();
  return (
    <section className={cn(styles.hero, styles.threaded)} id="top" data-surface="light">
      <Thread start />
      <Container className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{overrides.heroEyebrow || hero.eyebrow}</p>
          <h1 className={styles.heading}>
            {/* The space sits outside each word: inside the inline-block first
                word it would collapse ("Letme"). */}
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className={cn(styles.word, index === 0 && styles.wordFirst)}>{word}</span>
                {index < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>
          <p className={styles.lead}>{overrides.heroLead || hero.lead.text}</p>
          <div className={styles.actions}>
            <WebLinkButton href="#services" variant="primary" arrow>
              {overrides.heroPrimaryCta || hero.primaryCta}
            </WebLinkButton>
            {booking ? (
              <WebLinkButton href={booking} variant="secondary" external>
                {bookCall.label}
              </WebLinkButton>
            ) : (
              <WebLinkButton href="#tools" variant="secondary">
                {hero.secondaryCta}
              </WebLinkButton>
            )}
          </div>
        </div>

        {/*
          2026-10-02 (REVISION WEB-HOME.pdf point 2): the owner-supplied hero
          film, provisional and SILENT — its final voice-over is not produced
          yet, and no audio is served. Played by the landings' hero primitive:
          poster first (the LCP), the viewport's cut attached only after the
          window load event, and never under reduced motion. Record and open
          gates: docs/home-buyer-system-preview.md §14.
        */}
        <figure className={styles.heroMedia}>
          <HeroFilm video={HERO_VIDEO.home} name="the Home film" className={styles.film} />
        </figure>
      </Container>
    </section>
  );
}

/**
 * Sarah's introduction, in her words (REVISION WEB-HOME.pdf point 3). An
 * editorial sequence, not a block: the opening, her two lessons as a pair,
 * what she saw and what she decided, then her closing line set apart. On
 * desktop the heading holds the left column while the text runs on the right.
 */
export function HomePresentation() {
  const booking = bookingHref();
  return (
    <section
      id="about"
      className={cn(styles.presentation, styles.threaded)}
      aria-labelledby="about-title"
      data-surface="light"
    >
      <Thread />
      <Container className={styles.presentationGrid}>
        <div className={styles.presentationHead}>
          <p className={styles.eyebrow}>{presentation.eyebrow}</p>
          <h2 id="about-title" className={styles.sectionTitle}>
            {presentation.title.text}
          </h2>
        </div>
        <div className={styles.presentationText}>
          <p className={styles.presentationOpening}>{presentation.opening.text}</p>
          <ol className={styles.lessons}>
            {presentation.lessons.map((lesson, index) => (
              <li key={lesson.label} className={styles.lesson}>
                <span className={styles.lessonNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p>
                  <strong>{lesson.label}</strong> {lesson.text.text}
                </p>
              </li>
            ))}
          </ol>
          {presentation.body.map((paragraph) => (
            <p key={paragraph.text} className={styles.presentationBody}>
              {paragraph.text}
            </p>
          ))}
          <p className={styles.presentationClosing}>{presentation.closing.text}</p>
          <div className={styles.actions}>
            {booking ? (
              <WebLinkButton href={booking} variant="primary" arrow external>
                {bookCall.label}
              </WebLinkButton>
            ) : (
              <WebLinkButton href={CONTACT_PREVIEW_ROUTE} variant="secondary">
                {presentation.contactCta}
              </WebLinkButton>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** "On your side" — Sarah's statement, first person, with no word about money (PDF point 4). */
export function HomeSideStatement() {
  return (
    <section
      className={cn(styles.side, styles.threaded)}
      aria-labelledby="side-title"
      data-surface="light"
    >
      <Thread />
      <Container className={styles.sideInner}>
        <p className={styles.eyebrow}>{side.eyebrow}</p>
        <h2 id="side-title" className={styles.sideStatement}>
          <RevealText>{side.statement.text}</RevealText>
        </h2>
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
                  quality={['advisor-client-one', 'home-tax-advisory-human'].includes(media.id) ? 90 : 75}
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
            quality={['advisor-client-one', 'sarah-confianza'].includes(media.id) ? 90 : 75}
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

/**
 * A short way into Contact. It shows how to start talking — the booking call,
 * WhatsApp or a call — and hands the rest to /preview/contact.
 */
export function HomeContactBand() {
  const channels = resolveContactChannels(contactBand.whatsappOpener);
  const booking = bookingHref();
  return (
    <section
      className={cn(styles.contactBand, styles.threaded)}
      id="contact"
      aria-labelledby="home-contact-title"
      data-surface="light"
    >
      <Thread />
      <Container className={styles.contactInner}>
        <div className={styles.contactCopy}>
          <p className={styles.eyebrow}>{contactBand.eyebrow}</p>
          <h2 id="home-contact-title" className={styles.sectionTitle}>
            {contactBand.title.text}
          </h2>
          <p className={styles.sectionLead}>{contactBand.body.text}</p>
          <p className={styles.contactOffice}>{contactBand.office.text}</p>
        </div>
        <div className={styles.contactActions}>
          {booking ? (
            <WebLinkButton href={booking} variant="primary" arrow external>
              {contactBand.bookCta}
            </WebLinkButton>
          ) : null}
          <WebLinkButton href={CONTACT_PREVIEW_ROUTE} variant="secondary">
            {contactBand.contactCta}
          </WebLinkButton>
          <p className={styles.contactDirect}>
            {/* One text node per link: split nodes made the browser's page
                translation read "Llamaal +34 …" (PDF point 11). */}
            <a href={channels.whatsapp.href} target="_blank" rel="noopener noreferrer">
              {`${contactBand.whatsappLabel} ${channels.whatsapp.display}`}
              <span className="sk-visually-hidden"> (opens WhatsApp in a new tab)</span>
            </a>
            <a
              href={channels.phone.href}
            >{`${contactBand.phoneLabel} ${channels.phone.display}`}</a>
          </p>
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
          {/* 1 → the service selector on this page; 2 → the Purchase Tax and
              Real Cash Needed entries on this page (no data in any URL). */}
          <WebLinkButton href="#services" variant="primary" onDark arrow>
            {finalCta.primaryCta.text}
          </WebLinkButton>
          <WebLinkButton href="#tools" variant="secondary" onDark>
            {finalCta.secondaryCta.text}
          </WebLinkButton>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
