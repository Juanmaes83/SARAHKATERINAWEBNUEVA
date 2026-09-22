import Image from 'next/image';
import { WebSection, WebSectionHeader } from './WebSection';
import { WebButton } from './WebButton';
import { Icon, type IconName } from './icons/Icon';
import { TerritoryVisual } from './TerritoryVisual';
import { APPROVED_MEDIA, type ApprovedMedia } from '@/lib/media/approved-media';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { SampleColumnChart, SampleDistribution } from './SampleChart';
import { isPublishable } from '@/lib/content/claims';
import {
  authority,
  calendar,
  cases,
  concerns,
  context,
  finalCta,
  journey,
  process,
  report,
  services,
  trustScript,
  trustStrip,
} from '@/content/en/tax-advisory';
import shared from './WebBands.module.css';

/**
 * PHASE 2E — approved imagery for the Tax Advisory service cards.
 * Cases are untouched: client imagery stays blocked pending permissions.
 */
const TAX_SERVICE_MEDIA: readonly ApprovedMedia[] = [
  APPROVED_MEDIA.processModel,
  APPROVED_MEDIA.assetPlan,
  APPROVED_MEDIA.processAnalysis,
];
import styles from './TaxBands.module.css';

/**
 * TAX ADVISORY BANDS.
 *
 * CONVERGENCE — read before adding anything here.
 *
 * Every band below is built from the canonical website system: `WebSection`,
 * `WebSectionHeader`, `WebButton`, `Icon`, `TerritoryVisual` and `SampleChart`,
 * styled by `WebBands.module.css` — the same stylesheet the Investment bands
 * use. That is what makes the two landings share one type scale, one spacing
 * rhythm, one card treatment, one focus model and one set of tokens.
 *
 * `TaxBands.module.css` exists only for structures the Investment template has
 * no equivalent of. There are three, and each is justified in that file:
 *   1. the twelve-month tax calendar;
 *   2. the hero's document spines and video marker (used by `TaxHero`);
 *   3. the service block's sub-item line.
 *
 * If a future landing needs one of those, promote it to the shared layer
 * rather than copying it.
 */

/* --- TRUST STRIP ---------------------------------------------------------- */

export function TaxTrustBand() {
  return (
    <WebSection surface="soft" tight>
      <div className={shared.trustBand}>
        <div className={shared.trustGrid}>
          {trustStrip.map((item, index) => (
            <RevealOnScroll key={item.value.text} order={index} className={shared.trustItem}>
              <Icon name={item.icon as IconName} size="lg" className={shared.trustIcon} />
              <div>
                <p className={shared.trustValue}>
                  {item.value.text}
                  {/* A pending figure keeps its position and carries a small
                      mark, exactly as the Investment strip does. */}
                  {!isPublishable(item.value) ? (
                    <span
                      className={shared.pendingDot}
                      role="img"
                      aria-label="figure pending approval"
                    />
                  ) : null}
                </p>
                <p className={shared.trustNote}>{item.note.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll order={2}>
          <p className={shared.script}>{trustScript.text}</p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- CONTEXT — "Know what Spain will actually cost you." ------------------- */

/**
 * The template composes the problem framing and the audience list as ONE band:
 * headline column, arrow-marked profiles, image with script marginalia.
 *
 * Phase 2B split them into two sections, which changed the template's rhythm
 * and hierarchy. Restored to the template's composition — nothing was dropped,
 * the tension now reads as the headline's support rather than as a section of
 * its own.
 */
export function TaxContextBand() {
  return (
    <WebSection surface="ivory" id="who">
      <div className={shared.splitWide}>
        <div>
          <WebSectionHeader eyebrow={context.eyebrow.text} title={context.title.text} rule />
          <RevealOnScroll order={1} className={shared.stack16}>
            <p className={shared.bodyText}>{context.body.text}</p>
            <p className={shared.bodyText}>{context.tension.text}</p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll order={1}>
          <TerritoryVisual
            variant="coast"
            label={context.territoryLabel.text}
            tone="navy"
            media={APPROVED_MEDIA.processPresentation}
            sizes="(max-width: 1023px) 100vw, 40vw"
          />
          <p className={shared.script} style={{ marginBlockStart: 'var(--sk-space-16)' }}>
            {context.script.text}
          </p>
        </RevealOnScroll>
      </div>

      <ul className={styles.profiles}>
        {context.profiles.map((profile, index) => (
          <RevealOnScroll key={profile.text} as="li" order={index % 3} className={styles.profile}>
            <Icon name="arrow" size="sm" className={styles.profileArrow} />
            <span>{profile.text}</span>
          </RevealOnScroll>
        ))}
      </ul>

      <p className={styles.limit}>{context.limit.text}</p>
    </WebSection>
  );
}

/* --- ANNUAL TAX CALENDAR --------------------------------------------------- */

/**
 * The one structure with no Investment equivalent.
 *
 * ILLUSTRATIVE: the bar positions reproduce the template's layout so the
 * composition can be reviewed. They state no real filing period — every
 * deadline is a tax claim requiring competent review (AGENTS.md §11) — and the
 * band says so, once, in the same quiet register the Investment charts use.
 *
 * RESPONSIVE: below 768px each row's label moves above its own full-width
 * track, so a twelve-cell year fits a 320px viewport without the page
 * scrolling sideways. The gantt returns at desktop.
 */
export function TaxCalendarBand() {
  return (
    <WebSection surface="white" id="calendar">
      <WebSectionHeader eyebrow={calendar.eyebrow.text} title={calendar.title.text} centered rule />

      <div className={styles.calendarLayout}>
        <RevealOnScroll className={styles.calendarChart}>
          <div className={styles.months} aria-hidden="true">
            <span />
            {calendar.months.map((month, index) => (
              <span key={`${month}-${index}`} className={styles.month}>
                {month}
              </span>
            ))}
          </div>

          <ul className={styles.calendarRows}>
            {calendar.rows.map((row) => (
              <li key={row.id} className={styles.calendarRow}>
                <span className={styles.calendarLabel}>{row.label.text}</span>
                <span className={styles.track}>
                  <span
                    className={`${styles.bar} ${styles[`tone_${row.tone}`]}`}
                    style={{ gridColumn: `${row.from} / ${row.to + 1}` }}
                    aria-hidden="true"
                  />
                </span>
                <span className="sk-visually-hidden">
                  {row.label.text}. Illustrative position only; no filing period is stated.
                </span>
              </li>
            ))}
          </ul>

          <span className={shared.illustrativeTag}>Illustrative</span>
          <p className={styles.calendarNote}>{calendar.note.text}</p>
        </RevealOnScroll>

        <RevealOnScroll order={1} className={styles.calendarAside}>
          <span className={shared.cardIcon}>
            <Icon name="clock" />
          </span>
          <p className={shared.cardEyebrow}>{calendar.aside.eyebrow.text}</p>
          <p className={shared.cardText}>{calendar.aside.body.text}</p>
          <div className={shared.cardFoot}>
            <WebButton variant="primary" arrow>
              {calendar.aside.cta.text}
            </WebButton>
          </div>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- PROCESS --------------------------------------------------------------- */

export function TaxProcessBand() {
  return (
    <WebSection surface="soft" id="process">
      <WebSectionHeader eyebrow={process.eyebrow.text} title={process.title.text} centered rule />
      <ol className={`${shared.timeline} ${styles.timelineSix}`}>
        {process.steps.map((step, index) => (
          <RevealOnScroll key={step.id} as="li" order={index} className={shared.step}>
            <span className={shared.stepNumber} aria-hidden="true">
              {index + 1}
            </span>
            <span className={shared.stepIcon}>
              <Icon name={step.icon} />
            </span>
            <h3 className={shared.stepTitle}>{step.title.text}</h3>
            <p className={shared.cardText}>{step.body.text}</p>
            <p className={shared.stepDeliverable}>
              <Icon name="document" size="sm" className={shared.stepDeliverableIcon} />
              <span>{step.deliverable.text}</span>
            </p>
          </RevealOnScroll>
        ))}
      </ol>
      <RevealOnScroll order={2} style={{ marginBlockStart: 'var(--sk-space-32)' }}>
        <p className={shared.script}>{process.script.text}</p>
      </RevealOnScroll>
    </WebSection>
  );
}

/* --- REPORT PREVIEW (navy) -------------------------------------------------- */

export function TaxReportBand() {
  return (
    <WebSection surface="navy" id="report">
      <WebSectionHeader
        eyebrow={report.eyebrow.text}
        title={report.title.text}
        subtitle={report.subtitle.text}
        centered
        rule
      />

      <div className={shared.reportLayout}>
        {/* Panel 1 — the exposure summary the template leads with. */}
        <RevealOnScroll className={shared.reportCard}>
          <div className={shared.reportCardHead}>
            <h3 className={shared.reportCardTitle}>{report.summary.title.text}</h3>
            <p className={shared.reportCardNote}>{report.summary.property.text}</p>
          </div>

          <div className={shared.summaryVisual}>
            <TerritoryVisual
              variant="built"
              tone="sand"
              media={APPROVED_MEDIA.reportInterior}
              sizes="(max-width: 767px) 100vw, 20vw"
            />
          </div>

          <dl className={shared.summaryRows}>
            {report.summary.rows.map((row) => (
              <div key={row.label.text} className={shared.summaryRow}>
                <dt className={shared.summaryLabel}>{row.label.text}</dt>
                <dd className={shared.summaryValue}>{row.value}</dd>
              </div>
            ))}
            <div className={shared.summaryRow}>
              <dt className={shared.summaryLabel}>{report.summary.status.text}</dt>
              <dd className={shared.summaryValue}>{report.summary.statusValue.text}</dd>
            </div>
          </dl>

          <span className={shared.illustrativeTag}>Illustrative</span>
        </RevealOnScroll>

        {/* Panels 2–4 */}
        {report.cards.map((card, index) => (
          <RevealOnScroll key={card.id} order={index + 1} className={shared.reportCard}>
            <div className={shared.reportCardHead}>
              <h3 className={shared.reportCardTitle}>{card.title.text}</h3>
              <p className={shared.reportCardNote}>{card.note.text}</p>
            </div>

            {card.id === 'breakdown' ? (
              <ul className={shared.riskList}>
                {report.breakdown.map((row) => (
                  <li key={row.label.text} className={shared.riskRow}>
                    <span>{row.label.text}</span>
                    <span className={shared.riskValue}>{row.value}</span>
                  </li>
                ))}
              </ul>
            ) : card.id === 'calendar' ? (
              <SampleColumnChart label="Obligations across the year" />
            ) : (
              <SampleDistribution label="Relief under the double taxation treaty" />
            )}

            <span className={shared.illustrativeTag}>Illustrative</span>
          </RevealOnScroll>
        ))}
      </div>

      <div className={shared.reportAside}>
        <ul className={shared.deliverables}>
          {report.deliverables.map((deliverable) => (
            <li key={deliverable.text.text} className={shared.deliverable}>
              <Icon name={deliverable.icon} size="sm" className={shared.deliverableIcon} />
              <span>{deliverable.text.text}</span>
            </li>
          ))}
        </ul>
        <div className={shared.reportCtaBlock}>
          <WebButton variant="primary" onDark arrow>
            {report.cta.text}
          </WebButton>
          <p className={shared.ctaNote}>{report.ctaNote.text}</p>
        </div>
      </div>
    </WebSection>
  );
}

/* --- CONCERNS --------------------------------------------------------------- */

export function TaxConcernsBand() {
  return (
    <WebSection surface="ivory">
      <div className={shared.splitWide}>
        <div>
          <WebSectionHeader eyebrow={concerns.eyebrow.text} title={concerns.title.text} rule />
          <RevealOnScroll order={1} className={shared.stack16}>
            <p className={shared.bodyText}>{concerns.body.text}</p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll order={1}>
          <TerritoryVisual
            variant="district"
            label={concerns.territoryLabel.text}
            tone="navy"
            media={APPROVED_MEDIA.processAnalysis}
            sizes="(max-width: 1023px) 100vw, 40vw"
          />
          <p className={shared.script} style={{ marginBlockStart: 'var(--sk-space-16)' }}>
            {concerns.script.text}
          </p>
        </RevealOnScroll>
      </div>

      <ul className={shared.objections}>
        {concerns.items.map((item, index) => (
          <RevealOnScroll
            key={item.text.text}
            as="li"
            order={index % 3}
            className={shared.objection}
          >
            <Icon name={item.icon} className={shared.objectionIcon} />
            <div>
              <span className={shared.objectionIndex}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={shared.objectionTitle}>{item.text.text}</h3>
            </div>
          </RevealOnScroll>
        ))}
      </ul>
    </WebSection>
  );
}

/* --- SERVICES — three blocks ------------------------------------------------ */

/**
 * The template composes three service blocks, not a catalogue.
 *
 * Phase 2B rendered six cards, which flattened the composition. Restored to
 * three; nothing was dropped — the personal review, outstanding-filing
 * corrections and wealth planning now sit inside the block they belong to, on
 * the `also` line.
 *
 * No price is shown. The template prices each card; publication is not
 * approved (D2-04) and the taxonomy requires live re-verification.
 */
export function TaxServicesBand() {
  return (
    <WebSection surface="white" id="services">
      <WebSectionHeader eyebrow={services.eyebrow.text} title={services.title.text} centered rule />
      <div className={shared.grid3}>
        {services.items.map((item, index) => (
          <RevealOnScroll key={item.id} order={index} className={shared.mediaCard}>
            <div className={shared.mediaCardMedia}>
              <TerritoryVisual
                variant={item.visual}
                tone="navy"
                media={TAX_SERVICE_MEDIA[index]}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <span className={shared.cardIcon}>
                <Icon name={item.icon} />
              </span>
            </div>
            <div className={shared.mediaCardBody}>
              <h3 className={shared.cardTitle}>{item.title.text}</h3>

              <ul className={shared.checks}>
                {item.points.map((point) => (
                  <li key={point.text} className={shared.check}>
                    <Icon name="check" size="sm" className={shared.checkIcon} />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>

              <div className={shared.factRow}>
                <p className={shared.factLabel}>Deliverable</p>
                <p className={shared.factValue}>{item.deliverable.text}</p>
              </div>

              {/* Sub-item line: what the block also covers. */}
              <p className={styles.alsoLine}>{item.also.text}</p>

              <div className={shared.cardFoot}>
                <WebButton variant="quiet" arrow>
                  {item.cta.text}
                </WebButton>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <p className={styles.priceNote}>{services.priceNote.text}</p>
    </WebSection>
  );
}

/* --- AUTHORITY (navy) -------------------------------------------------------- */

export function TaxAuthorityBand() {
  return (
    <WebSection surface="navySoft" id="sarah">
      <div className={shared.authorityGrid}>
        <RevealOnScroll>
          <div className={shared.portraitFrame}>
            {/* Owner-selected editorial authority image — Preview only. */}
            <Image
              src={APPROVED_MEDIA.taxAuthority.src}
              alt={APPROVED_MEDIA.taxAuthority.alt}
              className={shared.portraitImage}
              sizes="(max-width: 767px) 100vw, 30vw"
              width={APPROVED_MEDIA.taxAuthority.width}
              height={APPROVED_MEDIA.taxAuthority.height}
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll order={1}>
          <WebSectionHeader eyebrow={authority.eyebrow.text} title={authority.title.text} rule />

          <div className={shared.authorityBody}>
            <div className={shared.stack24}>
              <p className={`${shared.bodyText} ${shared.bodyOnDark}`}>{authority.body.text}</p>
              <div>
                <WebButton variant="primary" onDark arrow>
                  {authority.cta.text}
                </WebButton>
              </div>
            </div>

            <div className={shared.stack24}>
              <ul className={shared.authorityList}>
                {authority.points.map((point) => (
                  <li key={point.text.text} className={shared.authorityItem}>
                    <span className={shared.authorityItemIcon}>
                      <Icon name={point.icon} />
                    </span>
                    <span>{point.text.text}</span>
                  </li>
                ))}
              </ul>

              <p className={`${shared.script} ${shared.scriptOnDark}`}>{authority.quote.text}</p>

              {/*
                Reserved slot. The template signs the quote by hand; no
                signature asset exists and one may not be drawn or typeset.
              */}
              <div className={shared.signatureSlot}>
                <p className={shared.signatureNote}>{authority.signaturePending.text}</p>
              </div>
            </div>
          </div>

          <ul className={shared.limits}>
            {authority.limits.map((limit) => (
              <li key={limit.text} className={shared.limit}>
                {limit.text}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}

/* --- CASES ------------------------------------------------------------------- */

export function TaxCasesBand() {
  return (
    <WebSection surface="ivory">
      <WebSectionHeader
        eyebrow={cases.eyebrow.text}
        title={cases.title.text}
        subtitle={cases.subtitle.text}
        centered
        rule
      />
      <div className={shared.grid3}>
        {cases.items.map((item, index) => (
          <RevealOnScroll key={item.id} order={index} className={shared.mediaCard}>
            <div className={shared.mediaCardMedia}>
              <TerritoryVisual variant={item.visual} tone="navy" />
            </div>
            <div className={shared.mediaCardBody}>
              <h3 className={shared.cardTitle}>{item.profile.text}</h3>
              <p className={shared.caseMeta}>
                <Icon name="pin" size="sm" />
                <span>{cases.locationPending.text}</span>
              </p>
              <p className={shared.cardText}>{item.decision.text}</p>

              <div className={shared.caseResult}>
                <div>
                  <p className={shared.caseMetricLabel}>{item.metric.text}</p>
                  <span
                    className={shared.caseWithheld}
                    role="img"
                    aria-label="Result withheld pending client permission and verification"
                  />
                </div>
                <span className={shared.casePermission}>
                  <Icon name="check" size="sm" />
                  {item.period.text}
                </span>
              </div>

              <p className={shared.caseMeta}>{cases.permissionPending.text}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <div style={{ marginBlockStart: 'var(--sk-space-32)', textAlign: 'center' }}>
        <WebButton variant="secondary" arrow>
          {cases.cta.text}
        </WebButton>
      </div>
    </WebSection>
  );
}

/* --- JOURNEY ----------------------------------------------------------------- */

export function TaxJourneyBand() {
  return (
    <WebSection surface="soft" tight>
      <WebSectionHeader eyebrow={journey.eyebrow.text} title={journey.title.text} centered />
      <ol className={shared.chain}>
        {journey.steps.map((step, index) => (
          <li key={step.title.text} className={shared.chainItem}>
            <span className={shared.chainIcon}>
              <Icon name={step.icon} />
            </span>
            <div>
              <p className={shared.chainLabel}>{step.title.text}</p>
              <p className={shared.cardText}>{step.body.text}</p>
            </div>
            {index < journey.steps.length - 1 ? (
              <span className={shared.chainArrow} aria-hidden="true">
                <Icon name="arrow" size="sm" />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <RevealOnScroll order={2} style={{ marginBlockStart: 'var(--sk-space-24)' }}>
        <p className={shared.script}>{journey.script.text}</p>
        {/* The substituted step is stated, not silently omitted. */}
        <p className={styles.substitution}>{journey.substitutionNote.text}</p>
      </RevealOnScroll>
    </WebSection>
  );
}

/* --- FINAL CTA (navy) --------------------------------------------------------- */

export function TaxFinalCtaBand() {
  return (
    <WebSection surface="navy" id="contact">
      <div className={shared.ctaGrid}>
        <RevealOnScroll className={shared.stack24}>
          <WebSectionHeader
            eyebrow={finalCta.eyebrow.text}
            title={finalCta.title.text}
            subtitle={finalCta.body.text}
            rule
          />
          <div className={shared.ctaActions}>
            <WebButton variant="primary" onDark arrow>
              {finalCta.primaryCta.text}
            </WebButton>
            <WebButton variant="secondary" onDark>
              {finalCta.secondaryCta.text}
            </WebButton>
          </div>
          <p className={shared.ctaNote}>{finalCta.note.text}</p>
        </RevealOnScroll>

        <RevealOnScroll order={1}>
          <TerritoryVisual
            variant="coast"
            label="Costa Blanca"
            tone="navy"
            media={APPROVED_MEDIA.territoryContact}
            sizes="(max-width: 1023px) 100vw, 40vw"
          />
          <p
            className={`${shared.script} ${shared.scriptOnDark}`}
            style={{ marginBlockStart: 'var(--sk-space-16)' }}
          >
            {finalCta.script.text}
          </p>
        </RevealOnScroll>
      </div>
    </WebSection>
  );
}
