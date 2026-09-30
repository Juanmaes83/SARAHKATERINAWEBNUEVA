import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SarahReviewMark } from '@/components/review/SarahReviewMark';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import {
  booking,
  closing,
  direct,
  firstContact,
  hero,
  modalities,
  office,
} from '@/content/en/contact';
import { resolveContactChannels } from '@/lib/contact/channels';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { cn } from '@/lib/utils/cn';
import { MapOnDemand } from './MapOnDemand';
import { WebLinkButton } from './WebButton';
import styles from './ContactPage.module.css';

/** WhatsApp link with a request opener; carries no personal or financial detail. */
const whatsappWith = (text: string) => resolveContactChannels(text).whatsapp.href;

/** The gold advisory thread shared with the Home: decorative, drawn by scroll. */
function Thread({ start, end }: { start?: boolean; end?: boolean }) {
  return (
    <span
      className={cn(styles.thread, start && styles.threadStart, end && styles.threadEnd)}
      aria-hidden="true"
    />
  );
}

/**
 * Contact — from interest to a conversation, in five editorial moments.
 *
 * 1. Hero: Sarah in her office (the human focus), one headline, the booking
 *    call as the single primary action, WhatsApp / phone / email beside it.
 *    Rendered at first paint: the hero never animates (it holds the LCP).
 * 2. How would you like to talk: the Tax Advisory lifestyle photograph in a
 *    secondary role beside three REQUEST formats (video, phone, Torrevieja).
 * 3. What happens after you book: four verified steps on a gold line.
 * 4. Office: the confirmed address, Google Maps links and a real Google map
 *    that loads on request from a deliberate, legible placeholder.
 * 5. Closing: one action and the direct channels, without repeating the page.
 *
 * No form: the reference form endpoint cannot be reused safely yet
 * (docs/contact-page.md §5). Every link goes to a channel that works today.
 */
export function ContactPage() {
  const channels = resolveContactChannels(direct.whatsapp.opener);
  const bookingHref = channels.booking.status === 'configured' ? channels.booking.href : null;
  const mailto = (subject: string) =>
    channels.email.href ? `${channels.email.href}?subject=${encodeURIComponent(subject)}` : null;
  const emailHref = mailto(direct.email.subject);
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;
  const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.mapsQuery)}`;
  const portrait = APPROVED_MEDIA[hero.portrait.media];
  const lifestyle = APPROVED_MEDIA[modalities.image.media];

  const directLinks = (
    <ul className={styles.directList}>
      <li>
        <a href={channels.whatsapp.href} target="_blank" rel="noopener noreferrer">
          <span className={styles.directLabel}>{direct.whatsapp.label}</span>
          <span className={styles.directValue}>{channels.whatsapp.display}</span>
          <span className="sk-visually-hidden"> (opens WhatsApp in a new tab)</span>
        </a>
      </li>
      <li>
        <a href={channels.phone.href}>
          <span className={styles.directLabel}>{direct.phone.label}</span>
          <span className={styles.directValue}>{channels.phone.display}</span>
        </a>
      </li>
      {emailHref && channels.email.display ? (
        <li>
          <a href={emailHref}>
            <span className={styles.directLabel}>{direct.email.label}</span>
            <span className={styles.directValue}>{channels.email.display}</span>
          </a>
        </li>
      ) : null}
    </ul>
  );

  return (
    <>
      {/* 1 · Hero ------------------------------------------------------- */}
      <SarahReviewMark id="SR-013" />
      <section
        className={cn(styles.hero, styles.threaded)}
        data-surface="light"
        aria-labelledby="contact-title"
      >
        <Thread start />
        <Container className={styles.heroGrid}>
          <figure className={styles.heroMedia}>
            <SarahReviewMark id="SR-012" variant="overlay" />
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              priority
              className={styles.heroImage}
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 45vw, 520px"
            />
          </figure>

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{hero.eyebrow}</p>
            <h1 id="contact-title" className={styles.title}>
              {hero.title.text}
            </h1>
            <p className={styles.lead}>{hero.lead.text}</p>
            {bookingHref ? (
              <div className={styles.heroAction}>
                <WebLinkButton href={bookingHref} variant="primary" arrow external>
                  {booking.cta}
                </WebLinkButton>
                <p className={styles.actionNote}>{booking.ctaNote}</p>
              </div>
            ) : (
              <p className={styles.actionNote}>{booking.unconfigured.text}</p>
            )}
            <div className={styles.direct}>
              <p className={styles.directHeading}>{hero.alternativesLabel}</p>
              {directLinks}
            </div>
          </div>
        </Container>
      </section>

      {/* 2 · How would you like to talk ---------------------------------- */}
      <SarahReviewMark id="SR-014" />
      <section
        className={cn(styles.formats, styles.threaded)}
        data-surface="light"
        id="formats"
        aria-labelledby="formats-title"
      >
        <Thread />
        <Container className={styles.formatsGrid}>
          <RevealOnScroll variant="unveil" className={styles.formatsMedia}>
            <Image
              src={lifestyle.src}
              alt={lifestyle.alt}
              width={lifestyle.width}
              height={lifestyle.height}
              className={styles.formatsImage}
              sizes="(max-width: 767px) 100vw, 42vw"
              style={{ objectPosition: lifestyle.focal }}
            />
          </RevealOnScroll>

          <div className={styles.formatsCopy}>
            <RevealOnScroll className={styles.sectionHead}>
              <p className={styles.eyebrow}>{modalities.eyebrow}</p>
              <h2 id="formats-title" className={styles.sectionTitle}>
                {modalities.title.text}
              </h2>
              <p className={styles.sectionLead}>{modalities.intro.text}</p>
            </RevealOnScroll>

            <ol className={styles.formatList}>
              {modalities.items.map((item, index) => {
                const mail = mailto(item.emailSubject);
                return (
                  <RevealOnScroll as="li" order={index} key={item.id} className={styles.format}>
                    <span className={styles.formatIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.formatBody}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                      <div className={styles.formatActions}>
                        <a
                          href={whatsappWith(item.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {modalities.requestByWhatsApp}
                          <span className="sk-visually-hidden">
                            {` — ${item.title} (opens WhatsApp in a new tab)`}
                          </span>
                        </a>
                        {mail ? (
                          <a href={mail}>
                            {modalities.requestByEmail}
                            <span className="sk-visually-hidden">{` — ${item.title}`}</span>
                          </a>
                        ) : null}
                        {item.id === 'phone' ? (
                          <a href={channels.phone.href}>
                            {modalities.callNow}
                            <span className="sk-visually-hidden">{` ${channels.phone.display}`}</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </ol>

            <p className={styles.firstContact}>
              <strong>{firstContact.title.text}.</strong> {firstContact.body.text}
            </p>
          </div>
        </Container>
      </section>

      {/* 3 · What happens after you book --------------------------------- */}
      {bookingHref ? <SarahReviewMark id="SR-015" /> : null}
      {bookingHref ? (
        <section
          className={cn(styles.next, styles.threaded)}
          data-surface="light"
          aria-labelledby="next-title"
        >
          <Thread />
          <Container>
            <RevealOnScroll className={styles.sectionHead}>
              <p className={styles.eyebrow}>{booking.eyebrow}</p>
              <h2 id="next-title" className={styles.sectionTitle}>
                {booking.timelineTitle.text}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll as="ol" variant="none" className={styles.timeline}>
              {booking.timeline.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNode} aria-hidden="true">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body.text}</p>
                </li>
              ))}
            </RevealOnScroll>
            <RevealOnScroll className={styles.nextFoot}>
              <p>{booking.formatNote.text}</p>
              <WebLinkButton href={bookingHref} variant="secondary" arrow external>
                {booking.cta}
              </WebLinkButton>
            </RevealOnScroll>
          </Container>
        </section>
      ) : null}

      {/* 4 · Office and map ----------------------------------------------- */}
      {office.status === 'confirmed' ? <SarahReviewMark id="SR-016" /> : null}
      {office.status === 'confirmed' ? (
        <section
          className={cn(styles.office, styles.threaded)}
          data-surface="light"
          id="office"
          aria-labelledby="office-title"
        >
          <Thread />
          <Container className={styles.officeGrid}>
            <RevealOnScroll className={styles.officeText}>
              <p className={styles.eyebrow}>{office.eyebrow}</p>
              <h2 id="office-title" className={styles.sectionTitle}>
                {office.title.text}
              </h2>
              <address className={styles.address}>
                {office.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <p className={styles.visiting}>{office.visiting.text}</p>
              <div className={styles.officeActions}>
                <WebLinkButton href={mapsSearch} variant="secondary" external>
                  {office.openInMaps}
                </WebLinkButton>
                <WebLinkButton href={mapsDirections} variant="quiet" arrow external>
                  {office.directions}
                </WebLinkButton>
              </div>
            </RevealOnScroll>
            <MapOnDemand
              query={office.mapsQuery}
              title={office.map.title}
              showLabel={office.map.show}
              privacyNote={office.map.privacy}
              addressLines={office.addressLines}
            />
          </Container>
        </section>
      ) : null}

      {/* 5 · Closing ----------------------------------------------------- */}
      <SarahReviewMark id="SR-017" />
      <section
        className={cn(styles.closing, styles.threaded)}
        data-surface="dark"
        aria-labelledby="closing-title"
      >
        <Thread end />
        <Container className={styles.closingGrid}>
          <RevealOnScroll className={styles.closingCopy}>
            <p className={styles.darkEyebrow}>{closing.eyebrow}</p>
            <h2 id="closing-title" className={styles.closingTitle}>
              {closing.title.text}
            </h2>
            <p className={styles.closingBody}>{closing.body.text}</p>
          </RevealOnScroll>
          <RevealOnScroll className={styles.closingActions}>
            {bookingHref ? (
              <WebLinkButton href={bookingHref} variant="primary" onDark arrow external>
                {booking.cta}
              </WebLinkButton>
            ) : null}
            <div className={styles.closingDirect}>{directLinks}</div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
