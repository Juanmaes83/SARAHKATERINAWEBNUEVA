/**
 * SARAH REVIEW REGISTER — audit of 2026-09-30 (docs/approval-marks-audit.md).
 *
 * One entry per decision that only Sarah can take: approving, editing or
 * withdrawing copy she has not approved, or the use of an image. Every entry is
 * shown on the page as `SARAH REVIEW REQUIRED · SR-###`, next to the block it
 * covers (`components/review/SarahReviewMark.tsx`), and a test keeps the marks
 * and this register in step (`tests/sarah-review.test.ts`).
 *
 * What does NOT belong here, by rule:
 *   - tax, legal, financial or factual checks (client permission, verified
 *     figures, credentials, rights): FACTUAL_OR_PROFESSIONAL_CHECK — Sarah's
 *     approval of the wording does not clear them;
 *   - missing integrations (booking URL, email, Buyer System, dead buttons):
 *     TECHNICAL_PENDING;
 *   - noindex, the preview banners and the footer status chip: PREVIEW_CONTROL.
 * Those are listed in the audit document, not marked as SARAH REVIEW.
 *
 * `refs` names the classified content each entry covers, as
 * `file:export[.key]` under `content/en/`. Every rendered `proposal` claim must
 * fall under one of them (enforced). `excludes` names the lines inside the
 * block that are already approved and are NOT part of the decision.
 *
 * Resolving an entry: record Sarah's decision (date, channel) in the audit
 * document, change the covered claims to `confirmed` with that source (or edit
 * or remove them), then delete the entry and its mark. Never delete a mark
 * without the decision.
 */

export const SARAH_REVIEW_ROUTES = [
  '/preview/home',
  '/preview/contact',
  '/preview/property-purchase',
  '/preview/investment',
  '/preview/tax-advisory',
  '/preview/team',
] as const;

export type SarahReviewRoute = (typeof SARAH_REVIEW_ROUTES)[number];

export interface SarahReviewItem {
  readonly id: string;
  /** Pages that show the mark. The same decision may appear on several pages, once per page. */
  readonly routes: readonly SarahReviewRoute[];
  readonly kind: 'copy' | 'image';
  /** Short label printed next to the ID. */
  readonly label: string;
  /** Exactly what the decision covers. */
  readonly scope: string;
  /** Approved lines inside the same block that the decision does not cover. */
  readonly excludes?: string;
  /** The decision Sarah is asked for. */
  readonly decision: string;
  /** Classified content covered, as `file:export[.key]` under content/en/. */
  readonly refs: readonly string[];
}

const HOME = '/preview/home';
const CONTACT = '/preview/contact';
const PURCHASE = '/preview/property-purchase';
const INVESTMENT = '/preview/investment';
const TAX = '/preview/tax-advisory';
const TEAM = '/preview/team';

const APPROVE_COPY = 'Approve, edit or withdraw this copy.';

export const SARAH_REVIEW_ITEMS = [
  // ── Home ────────────────────────────────────────────────────────────────
  {
    id: 'SR-001',
    routes: [HOME],
    kind: 'copy',
    label: 'Hero · lead sentence',
    scope: 'The hero lead under “Clarity before commitment.”',
    excludes:
      '“Clarity before commitment.” (approved brand promise) and the film caption (confirmed disclosure).',
    decision: APPROVE_COPY,
    refs: ['home:hero'],
  },
  {
    id: 'SR-002',
    routes: [HOME],
    kind: 'copy',
    label: 'Side statement',
    scope: '“Sarah is paid by one side of the table: yours.”',
    excludes: 'The three trust lines (remuneration model and the 20-year credential), confirmed.',
    decision: APPROVE_COPY,
    refs: ['home:side'],
  },
  {
    id: 'SR-003',
    routes: [HOME],
    kind: 'copy',
    label: '“What brings you to Spain?” · selector and three service chapters',
    scope:
      'Selector title and intro, the supporting lines of the three needs, and the titles, bodies and buttons of the Property Purchase, Investment and Tax Advisory chapters.',
    excludes: '“Buy with peace of mind: we coordinate every step.” (Sarah’s line, Phase 2H).',
    decision: APPROVE_COPY,
    refs: ['home:discovery', 'home:services'],
  },
  {
    id: 'SR-004',
    routes: [HOME],
    kind: 'copy',
    label: 'Team chapter · title and button',
    scope: '“Sarah holds the advisory thread together.” and “Meet the team”.',
    excludes:
      'The chapter body (Sarah’s Team introduction, confirmed) and the portrait (approved for the Home).',
    decision: APPROVE_COPY,
    refs: ['home:services'],
  },
  {
    id: 'SR-005',
    routes: [HOME],
    kind: 'copy',
    label: 'Process · “Objective. Evidence. Next move.”',
    scope: 'Section title, the three steps and the scope line under them.',
    decision:
      'Approve, edit or withdraw this copy. The scope line also needs legal review (not Sarah’s alone).',
    refs: ['home:process'],
  },
  {
    id: 'SR-006',
    routes: [HOME],
    kind: 'copy',
    label: 'Client voices · title and note',
    scope: 'Section title and the note under the three quotes.',
    excludes: 'The three quotes, names and contexts (client authorisation confirmed 2026-09-29).',
    decision: APPROVE_COPY,
    refs: ['home:voices'],
  },
  {
    id: 'SR-007',
    routes: [HOME],
    kind: 'copy',
    label: 'Buyer tools · title and tool cards',
    scope: 'Section title and the copy on the Purchase Tax and Real Cash Needed cards.',
    excludes: 'The section intro (confirmed description of the Buyer System link).',
    decision:
      'Approve, edit or withdraw this copy. Tax wording on the cards also needs tax review.',
    refs: ['home:tools', 'service-journey:TAX_LEAD_TOOL'],
  },
  {
    id: 'SR-008',
    routes: [HOME],
    kind: 'copy',
    label: 'FAQ',
    scope: 'Eyebrow, title, the questions and answers, and the legal note.',
    excludes: 'The answer about the Buyer System tools (confirmed).',
    decision:
      'Approve, edit or withdraw this copy. The legal note and the lawyer answer also need legal review.',
    refs: ['home:faq'],
  },
  {
    id: 'SR-009',
    routes: [HOME],
    kind: 'copy',
    label: 'Contact band',
    scope: '“Start with a 30-minute call, or simply write.” and the sentence under it.',
    excludes: 'The office line (address confirmed by Juanma) and the phone and WhatsApp channels.',
    decision: APPROVE_COPY,
    refs: ['home:contactBand'],
  },
  {
    id: 'SR-010',
    routes: [HOME],
    kind: 'copy',
    label: 'Final call to action',
    scope: 'Title and body of the closing band.',
    decision: APPROVE_COPY,
    refs: ['home:finalCta'],
  },
  {
    id: 'SR-011',
    routes: [HOME],
    kind: 'copy',
    label: 'Footer',
    scope: 'Footer description, the anchor labels and the copyright line.',
    excludes: 'The service names and the Contact link.',
    decision: APPROVE_COPY,
    refs: ['home:footer'],
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  {
    id: 'SR-012',
    routes: [CONTACT],
    kind: 'image',
    label: 'Hero portrait · use on Contact',
    scope:
      'Use of `IMAGES/Sarah home_1.png` (registered `homeAuthority`), including its embedded typography, as the Contact hero.',
    decision:
      'Approve this use, or choose another photograph. Her approval is recorded for the Home only; Juanma asked for it here (2026-09-29).',
    refs: [],
  },
  {
    id: 'SR-013',
    routes: [CONTACT],
    kind: 'copy',
    label: 'Hero · headline, lead and channel labels',
    scope:
      '“Your next step starts with a conversation.”, the lead, the booking button label and the direct-channel heading.',
    excludes: 'The phone, WhatsApp and email values (published channels).',
    decision: APPROVE_COPY,
    refs: ['contact:hero', 'contact:booking', 'contact:direct'],
  },
  {
    id: 'SR-014',
    routes: [CONTACT],
    kind: 'copy',
    label: '“Video, phone or face to face.” · formats',
    scope:
      'Section title and intro, the format names and descriptions, and the “For a first message” note.',
    excludes: 'That video calls and meetings are offered on request (Juanma, 2026-09-29).',
    decision: APPROVE_COPY,
    refs: ['contact:modalities', 'contact:firstContact'],
  },
  {
    id: 'SR-015',
    routes: [CONTACT],
    kind: 'copy',
    label: '“What happens after you book” · title and format note',
    scope: 'The timeline title and the note about preferring another format.',
    excludes: 'The four steps and the booking facts (verified against the live booking page).',
    decision: APPROVE_COPY,
    refs: ['contact:booking'],
  },
  {
    id: 'SR-016',
    routes: [CONTACT],
    kind: 'copy',
    label: 'Office · heading',
    scope: '“Torrevieja, Costa Blanca” as the office heading.',
    excludes: 'The address and “by prior request only” (confirmed by Juanma).',
    decision: APPROVE_COPY,
    refs: ['contact:office'],
  },
  {
    id: 'SR-017',
    routes: [CONTACT],
    kind: 'copy',
    label: 'Closing band',
    scope: '“Choose the way that suits you.” and the fallback sentence.',
    decision: APPROVE_COPY,
    refs: ['contact:closing'],
  },

  // ── Property Purchase ───────────────────────────────────────────────────
  {
    id: 'SR-018',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Hero · eyebrow, body, buttons, proofs, film caption',
    scope: 'Everything in the hero except the headline.',
    excludes:
      '“Buy with peace of mind: we coordinate every step.” (Sarah’s line) and “Independent advice”.',
    decision:
      'Approve, edit or withdraw this copy. The hero body also needs legal review of the scope.',
    refs: ['property-purchase:hero'],
  },
  {
    id: 'SR-019',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Purchase Tax band under the hero',
    scope: 'The band’s question, moment line and card copy.',
    decision: 'Approve, edit or withdraw this copy. Tax wording also needs tax review.',
    refs: ['service-journey:TAX_LEAD_TOOL'],
  },
  {
    id: 'SR-020',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Trust strip',
    scope: 'The trust strip labels and values.',
    excludes: 'The 20-year credential and the remuneration model.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:trust'],
  },
  {
    id: 'SR-021',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Audience · body and list',
    scope: 'Eyebrow, body, the four audience lines and the script line.',
    excludes:
      '“We handle the paperwork. You choose your home.” — Sarah’s line; its legal scope check (S-02) is a professional item.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:audience'],
  },
  {
    id: 'SR-022',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Good idea, bad execution · four points',
    scope:
      'Eyebrow, “Where an opportunity usually goes wrong” and the four points; and the open wording question S-03 (“protecting your investment”).',
    excludes: 'The title and body (Sarah’s text, Phase 2H) and the film note.',
    decision: 'Approve, edit or withdraw the points, and answer S-03.',
    refs: ['property-purchase:goodIdea'],
  },
  {
    id: 'SR-023',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'One file · section copy',
    scope: 'Eyebrow, title, body, the five points, the button and the script line.',
    decision:
      'Approve, edit or withdraw this copy. Legal wording (due diligence, notary, registry) also needs legal review.',
    refs: ['property-purchase:oneFile'],
  },
  {
    id: 'SR-024',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'File tracker and ordered steps',
    scope: 'The illustrative file tracker and the six-step process copy.',
    excludes: 'The “illustrative” labels (confirmed disclosures).',
    decision: 'Approve, edit or withdraw this copy. Legal steps also need legal review.',
    refs: ['property-purchase:process'],
  },
  {
    id: 'SR-025',
    routes: [PURCHASE],
    kind: 'copy',
    label: '“We review. We analyse. You decide with clarity.”',
    scope:
      'The before-you-sign band: title, deliverables and the illustrative recommendation surface.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:beforeSign'],
  },
  {
    id: 'SR-026',
    routes: [PURCHASE],
    kind: 'copy',
    label: '“What you stop worrying about.”',
    scope: 'Title and the before/after lines.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:worries'],
  },
  {
    id: 'SR-027',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Service levels',
    scope:
      'Title, the three service cards and the “What it includes” label (proposed replacement for “What the preview includes”); whether prices and timings are published.',
    decision:
      'Approve, edit or withdraw this copy, and decide whether prices and timings are published (they are withheld).',
    refs: ['property-purchase:services'],
  },
  {
    id: 'SR-028',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Sarah authority · copy',
    scope: 'Eyebrow, title, body and points of the authority block.',
    excludes: 'The 20-year credential.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:authority'],
  },
  {
    id: 'SR-029',
    routes: [PURCHASE, INVESTMENT, TAX],
    kind: 'image',
    label: 'Authority photograph',
    scope:
      'The generated editorial image `sarahkaterina_Services_Especial` (registered `authorityEditorial`) in the Sarah authority block.',
    decision:
      'Sarah objected to the face (Phase 2H, I8/T6): approve a replacement or an edit, or accept the current image. No retouch is made without an approved file (A-01).',
    refs: [],
  },
  {
    id: 'SR-030',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Cases band · titles and buyer-voice banner',
    scope: 'Band titles, the three case titles and the fabric-banner labels and hints.',
    excludes:
      'The “illustrative” labels, the withheld outcomes and the publication requirements (evidence items, not copy).',
    decision: APPROVE_COPY,
    refs: ['property-purchase:cases', 'buyer-voices:VOICES_BAND'],
  },
  {
    id: 'SR-031',
    routes: [PURCHASE],
    kind: 'copy',
    label: '“The same judgement, across the decisions that follow.”',
    scope: 'The resources band: title and the three cards.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:journey'],
  },
  {
    id: 'SR-032',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Next step · connected services',
    scope: 'Title, intro, the stage questions, the reasons and the team line.',
    decision: 'Approve, edit or withdraw this copy. Tax reasons also need tax review.',
    refs: [
      'service-journey:JOURNEY.purchase',
      'service-journey:SERVICE_STAGES',
      'service-journey:TEAM_LAYER',
    ],
  },
  {
    id: 'SR-033',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'FAQ',
    scope: 'Eyebrow, title, questions and answers.',
    excludes: 'The independence answer (confirmed).',
    decision: 'Approve, edit or withdraw this copy. Legal answers stay under legal review.',
    refs: ['property-purchase:faq'],
  },
  {
    id: 'SR-034',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Final call to action',
    scope: 'Eyebrow, title, body and buttons of the closing band.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:finalCta'],
  },
  {
    id: 'SR-035',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Footer',
    scope: 'Footer description, column titles and labels.',
    excludes: 'The Contact link.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:footer'],
  },

  // ── Investment ──────────────────────────────────────────────────────────
  {
    id: 'SR-036',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Hero and snapshot card',
    scope:
      'Hero eyebrow, headline, lead, buttons, script and the labels of the sample snapshot card; the headline choice H-02 (§4 of docs/phase-2h-juanma-review.md).',
    excludes: 'The 20-year credential, the remuneration signals and the “illustrative” labels.',
    decision:
      'Keep the template headline or choose one of the three options (H-02); approve the rest.',
    refs: ['investment:hero', 'investment:heroDashboard'],
  },
  {
    id: 'SR-037',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Trust strip',
    scope: 'Trust strip labels and the script line.',
    decision: APPROVE_COPY,
    refs: ['investment:trustStrip', 'investment:trustScript'],
  },
  {
    id: 'SR-038',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Sarah authority · copy',
    scope: 'Eyebrow, title, body and points of the authority block.',
    excludes: 'The 20-year credential and the remuneration model.',
    decision: APPROVE_COPY,
    refs: ['investment:authority'],
  },
  {
    id: 'SR-039',
    routes: [INVESTMENT, TAX],
    kind: 'image',
    label: 'Signature slot',
    scope: 'The reserved signature slot in the Sarah authority block (“Signature asset pending”).',
    decision:
      'Supply an approved signature image, or remove the slot. A signature is never drawn or typeset.',
    refs: [],
  },
  {
    id: 'SR-040',
    routes: [INVESTMENT],
    kind: 'copy',
    label: '“A bridge between opportunity and peace of mind.”',
    scope: 'The approach band: eyebrow, title, body and points.',
    decision:
      'Approve, edit or withdraw this copy. Financial and tax lines also need professional review.',
    refs: ['investment:approach'],
  },
  {
    id: 'SR-041',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Two doors',
    scope: 'Title and both doors; the doors headline choice H-02.',
    decision:
      'Keep the template headline or choose one of the three options (H-02); approve the rest.',
    refs: ['investment:doors'],
  },
  {
    id: 'SR-042',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Asset types and territory map',
    scope: 'Title, the four asset cards and the map labels.',
    decision:
      'Approve, edit or withdraw this copy. Legal and financial lines also need professional review.',
    refs: ['investment:assetTypes', 'investment:territoryMap'],
  },
  {
    id: 'SR-043',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Process',
    scope: 'Title and the five stages.',
    decision: APPROVE_COPY,
    refs: ['investment:process'],
  },
  {
    id: 'SR-044',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Report preview',
    scope: 'Title, the panel titles and notes of the sample report.',
    excludes: 'The “illustrative sample” labels.',
    decision: APPROVE_COPY,
    refs: ['investment:report'],
  },
  {
    id: 'SR-045',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Scenarios and risk',
    scope: 'Title and the scenario copy.',
    decision:
      'Approve, edit or withdraw this copy. Financial statements also need financial review.',
    refs: ['investment:scenarios'],
  },
  {
    id: 'SR-046',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Free calculations',
    scope: 'Title and subtitle of the Buyer System band.',
    decision: APPROVE_COPY,
    refs: ['investment:buyerSystem'],
  },
  {
    id: 'SR-047',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Case studies · titles',
    scope: 'Band title and intro and the three case titles.',
    excludes: 'The withheld results, locations and periods (evidence items).',
    decision: APPROVE_COPY,
    refs: ['investment:cases'],
  },
  {
    id: 'SR-048',
    routes: [INVESTMENT],
    kind: 'copy',
    label: '“A complete ecosystem for a frictionless investment.”',
    scope: 'Title and the four steps.',
    decision: APPROVE_COPY,
    refs: ['investment:journey'],
  },
  {
    id: 'SR-049',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Next step · intro and reasons',
    scope: 'Intro, the stage questions, the reasons and the team line.',
    excludes:
      '“An opportunity is only good if it fits your goals, not the goals of the person selling it.” (Sarah’s line).',
    decision: 'Approve, edit or withdraw this copy. Tax reasons also need tax review.',
    refs: [
      'service-journey:JOURNEY.investment',
      'service-journey:SERVICE_STAGES',
      'service-journey:TEAM_LAYER',
    ],
  },
  {
    id: 'SR-050',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'FAQ',
    scope: 'Eyebrow, title, questions and answers.',
    excludes: 'The independence answer (confirmed).',
    decision:
      'Approve, edit or withdraw this copy. Tax, legal and pricing answers stay under review.',
    refs: ['investment:faq'],
  },
  {
    id: 'SR-051',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Final call to action',
    scope: 'Eyebrow, title, body, buttons and script of the closing band.',
    decision: APPROVE_COPY,
    refs: ['investment:finalCta'],
  },
  {
    id: 'SR-052',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Footer',
    scope: 'Footer description, column titles and labels.',
    excludes: 'The Contact link.',
    decision: APPROVE_COPY,
    refs: ['investment:footer'],
  },

  // ── Tax Advisory ────────────────────────────────────────────────────────
  {
    id: 'SR-053',
    routes: [TAX],
    kind: 'copy',
    label: 'Hero, snapshot and trust strip',
    scope:
      'Hero eyebrow, lead, buttons, the sample snapshot labels and the trust strip; the proposed new hero lead (T1, §4 of docs/phase-2h-juanma-review.md).',
    excludes: 'The headline, the 20-year credential, Modelo 210 and the “illustrative” labels.',
    decision: 'Approve, edit or withdraw this copy, and decide on the T1 hero lead.',
    refs: [
      'tax-advisory:hero',
      'tax-advisory:heroSnapshot',
      'tax-advisory:trustStrip',
      'tax-advisory:trustScript',
    ],
  },
  {
    id: 'SR-054',
    routes: [TAX],
    kind: 'copy',
    label: 'Purchase Tax band · pain-point line',
    scope: 'The band’s question and the pain-point line (T1, proposal).',
    decision: 'Approve, edit or withdraw this copy. It also needs tax review.',
    refs: ['service-journey:TAX_LEAD_TOOL'],
  },
  {
    id: 'SR-055',
    routes: [TAX],
    kind: 'copy',
    label: '“Know what Spain will actually cost you.”',
    scope: 'The context band: title, body and audience lines.',
    decision: 'Approve, edit or withdraw this copy. Tax lines also need tax review.',
    refs: ['tax-advisory:context'],
  },
  {
    id: 'SR-056',
    routes: [TAX],
    kind: 'copy',
    label: 'Process',
    scope: 'Title and the process steps and deliverables.',
    decision: 'Approve, edit or withdraw this copy. Tax lines also need tax review.',
    refs: ['tax-advisory:process'],
  },
  {
    id: 'SR-057',
    routes: [TAX],
    kind: 'copy',
    label: 'Tax calendar',
    scope: 'Title and intro of the calendar.',
    excludes: 'The names of the taxes and forms.',
    decision: APPROVE_COPY,
    refs: ['tax-advisory:calendar'],
  },
  {
    id: 'SR-058',
    routes: [TAX],
    kind: 'copy',
    label: 'Report preview · plain-language titles',
    scope: 'The report titles and notes rewritten in plain language (T4).',
    decision: 'Approve, edit or withdraw this copy. It also needs tax review.',
    refs: ['tax-advisory:report'],
  },
  {
    id: 'SR-059',
    routes: [TAX],
    kind: 'copy',
    label: '“Everything you leave in our hands.” · six items',
    scope:
      'The six items under Sarah’s title, and scope question S-01 (answering tax-office letters).',
    excludes: 'The title (Sarah’s text, Phase 2H).',
    decision: 'Approve, edit or withdraw the items, and answer S-01.',
    refs: ['tax-advisory:concerns'],
  },
  {
    id: 'SR-060',
    routes: [TAX],
    kind: 'copy',
    label: 'Services',
    scope: 'Title and the service cards.',
    decision: 'Approve, edit or withdraw this copy. Tax lines also need tax review.',
    refs: ['tax-advisory:services'],
  },
  {
    id: 'SR-061',
    routes: [TAX],
    kind: 'copy',
    label: 'Sarah authority · copy',
    scope: 'Eyebrow, title, body and points of the authority block.',
    excludes: 'The 20-year credential.',
    decision: APPROVE_COPY,
    refs: ['tax-advisory:authority'],
  },
  {
    id: 'SR-062',
    routes: [TAX],
    kind: 'copy',
    label: 'Real cases · case texts',
    scope: 'The three case texts (Sarah’s direction, English drafted here).',
    excludes:
      'Sarah’s title line, subtitle, badge, case names and button (confirmed); the results stay an evidence item (C-01).',
    decision:
      'Approve, edit or withdraw this copy. Results need client permission, verified figures and tax review.',
    refs: ['tax-advisory:cases'],
  },
  {
    id: 'SR-063',
    routes: [TAX],
    kind: 'copy',
    label: '“Buy. File. Plan. Review.”',
    scope: 'Title and the four steps.',
    decision: APPROVE_COPY,
    refs: ['tax-advisory:journey'],
  },
  {
    id: 'SR-064',
    routes: [TAX],
    kind: 'copy',
    label: 'Next step · connected services',
    scope: 'Title, intro, the stage questions, the reasons and the team line.',
    decision: 'Approve, edit or withdraw this copy. Tax lines also need tax review.',
    refs: [
      'service-journey:JOURNEY.tax',
      'service-journey:SERVICE_STAGES',
      'service-journey:TEAM_LAYER',
    ],
  },
  {
    id: 'SR-065',
    routes: [TAX],
    kind: 'copy',
    label: 'FAQ',
    scope: 'Eyebrow, title, questions and answers.',
    excludes: 'The independence answer (confirmed).',
    decision: 'Approve, edit or withdraw this copy. Tax and legal answers stay under review.',
    refs: ['tax-advisory:faq'],
  },
  {
    id: 'SR-066',
    routes: [TAX],
    kind: 'copy',
    label: 'Final call to action',
    scope: 'Eyebrow, title, body and buttons of the closing band.',
    decision: APPROVE_COPY,
    refs: ['tax-advisory:finalCta'],
  },
  {
    id: 'SR-067',
    routes: [TAX],
    kind: 'copy',
    label: 'Footer',
    scope: 'Footer description, column titles and labels.',
    excludes: 'The Contact link.',
    decision: APPROVE_COPY,
    refs: ['tax-advisory:footer'],
  },

  // ── Team ────────────────────────────────────────────────────────────────
  {
    id: 'SR-068',
    routes: [TEAM],
    kind: 'copy',
    label: 'Hero · headline, lead, buttons and caption',
    scope: 'Everything in the hero copy.',
    excludes: '“Clarity before commitment.” (approved brand promise).',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-069',
    routes: [TEAM],
    kind: 'image',
    label: 'Hero photograph',
    scope: '`EQUIPO_SARAHKATERINA2.png` as the hero.',
    decision:
      'Sarah asked for it warmer and bigger (Phase 2H, E2): it is bigger; approve it as it is or supply an approved warmer edit (A-02).',
    refs: [],
  },
  {
    id: 'SR-070',
    routes: [TEAM],
    kind: 'copy',
    label: 'Introduction',
    scope: 'Eyebrow, title, body and the four points of the introduction band.',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-071',
    routes: [TEAM],
    kind: 'copy',
    label: 'Three starting points · cards',
    scope: 'Subtitle and the three path cards.',
    excludes: '“Different goals. The same review before signing.” (Sarah’s line).',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-072',
    routes: [TEAM],
    kind: 'copy',
    label: 'Sarah’s profile · text and quote',
    scope:
      'Sarah’s area line, profile text and the quote “The property is only one part of the decision.”',
    excludes: 'The section title and introduction (Sarah’s text, Phase 2H) and her name.',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-073',
    routes: [TEAM],
    kind: 'copy',
    label: 'Team profiles · roles and texts',
    scope: 'The area lines and texts for Elsa Quirós Pérez, Óscar Gonzalez and Igor Veselov.',
    excludes: 'The names (confirmed; the surname accent is N-01) and the “Portrait pending” slots.',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-074',
    routes: [TEAM],
    kind: 'image',
    label: 'Group photograph',
    scope: '`EQUIPO_SARAHKATERINA1.png` and its caption.',
    decision:
      'Sarah found it low in quality and cold (Phase 2H, E6): approve it as it is, supply a replacement or an approved edit (A-03), or remove it.',
    refs: [],
  },
  {
    id: 'SR-075',
    routes: [TEAM],
    kind: 'image',
    label: 'Network band · photograph and copy',
    scope: '`EQUIPO_SARAHKATERINA3.png` and the band copy beside it.',
    decision:
      'Keep, edit or remove the photograph, and approve the copy. Its people and organisations are not identified, so it stays blocked for production either way.',
    refs: [],
  },
  {
    id: 'SR-076',
    routes: [TEAM],
    kind: 'copy',
    label: 'Process',
    scope: 'Section title, subtitle and the process steps.',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-077',
    routes: [TEAM],
    kind: 'copy',
    label: 'After the keys',
    scope: 'Eyebrow, title, body, the four items and the limit line.',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-078',
    routes: [TEAM],
    kind: 'copy',
    label: 'Next step · connected services',
    scope: 'Title, intro, the stage questions and the reasons.',
    decision: 'Approve, edit or withdraw this copy. Tax lines also need tax review.',
    refs: ['service-journey:JOURNEY.team', 'service-journey:SERVICE_STAGES'],
  },
  {
    id: 'SR-079',
    routes: [TEAM],
    kind: 'copy',
    label: 'FAQ',
    scope: 'Eyebrow, title, questions and answers.',
    excludes: 'The answer “The buyer is the client…” and the legal note (confirmed).',
    decision:
      'Approve, edit or withdraw this copy. Legal, tax and return answers stay under review.',
    refs: ['team:faq'],
  },
  {
    id: 'SR-080',
    routes: [TEAM],
    kind: 'copy',
    label: 'Final call to action',
    scope: 'Eyebrow, title, body and buttons of the closing band.',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-081',
    routes: [TEAM, CONTACT],
    kind: 'copy',
    label: 'Footer',
    scope: 'Footer description, the column titles and labels (shared by Team and Contact).',
    excludes: 'The Contact link.',
    decision: APPROVE_COPY,
    refs: ['team:footer'],
  },
] as const satisfies readonly SarahReviewItem[];

export type SarahReviewId = (typeof SARAH_REVIEW_ITEMS)[number]['id'];

export function sarahReviewItem(id: SarahReviewId): SarahReviewItem {
  const item = SARAH_REVIEW_ITEMS.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown Sarah review item ${id}`);
  return item;
}
