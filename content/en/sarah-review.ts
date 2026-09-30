/**
 * SARAH REVIEW REGISTER — reconciled with Sarah's four review documents on
 * 2026-09-30 (docs/approval-marks-audit.md §10).
 *
 * `SARAH_REVIEW_ITEMS` holds only decisions that are still Sarah's to take:
 * copy she has not seen (written after her review, or new). Each is shown on the page as `SARAH REVIEW REQUIRED · SR-###` next to
 * what it covers (`components/review/SarahReviewMark.tsx`). IDs are stable:
 * resolved items are deleted, never renumbered, so gaps are expected.
 *
 * `SARAH_APPROVALS` (end of file) records what she has approved, each entry
 * quoting the line of her document it rests on. A claim's `status` field is
 * NOT an approval record: most copy she approved is still `proposal` because
 * its publication also waits on other gates.
 *
 * What does NOT belong here, by rule:
 *   - tax, legal, financial or factual checks (client permission, verified
 *     figures, credentials, rights, identities): FACTUAL_OR_PROFESSIONAL_CHECK;
 *   - missing assets and integrations (photographs, booking URL, email,
 *     Buyer System, dead buttons, sound publication): TECHNICAL_PENDING or
 *     asset items;
 *   - noindex, the preview banners and the footer status chip: PREVIEW_CONTROL.
 * Those are listed in the audit document, not marked as SARAH REVIEW.
 *
 * `refs` names the classified content each entry covers, as
 * `file:export[.key]` under `content/en/`. Every rendered `proposal` claim is
 * covered by exactly one side: an open entry or an approval (enforced).
 *
 * Resolving an entry: record Sarah's decision (date, channel) in the audit
 * document and in `SARAH_APPROVALS`, then delete the entry and its mark.
 * Never delete a mark without the decision.
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
  // ── Home (no review document covers it: all eleven stay open) ──────────────────────────────────────────────────────────────
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

  // ── Property Purchase ───────────────────────────────────────────────────
  // Everything else on the page is either Sarah's own text or copy she
  // reviewed without asking for a change (SARAH_APPROVALS below).
  {
    id: 'SR-019',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Purchase Tax band · the line “Before anything else…”',
    scope:
      'The line “Before anything else: what Spain charges on the purchase itself, for your own case.” — written in Phase 2H to carry her request to feature the calculator; she has not seen it.',
    excludes: 'The tool card copy, which was on the page she reviewed.',
    decision: APPROVE_COPY,
    refs: [],
  },
  {
    id: 'SR-022',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Good idea, bad execution · “Where an opportunity usually goes wrong”',
    scope: 'The points heading, written in Phase 2H after her review.',
    excludes:
      'Her title and paragraph (“What looks like a great opportunity…”, “A dream fits into a moment…”) and the four points, which she reviewed.',
    decision: APPROVE_COPY,
    refs: ['property-purchase:goodIdea.pointsTitle'],
  },
  {
    id: 'SR-027',
    routes: [PURCHASE],
    kind: 'copy',
    label: 'Service levels · the label “What it includes”',
    scope:
      'The card label, changed on 2026-09-30 from “What the preview includes” (the version she saw) because it named the preview.',
    decision: 'Approve the new label, or keep the wording she saw.',
    refs: ['property-purchase:services.scopeTitle'],
  },

  // ── Investment ──────────────────────────────────────────────────────────
  {
    id: 'SR-036',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Hero · new headline and lead',
    scope:
      '“Invest in Spain with someone on your side.” and the lead under it. They replace the headline she rejected (“Properties. Data. Better decisions.”) and add the human side she asked for.',
    excludes: 'The eyebrow, buttons, script, signals and snapshot card, which she reviewed.',
    decision: 'Approve, edit or replace the new headline and lead.',
    refs: ['investment:hero.heading', 'investment:hero.lead'],
  },
  {
    id: 'SR-041',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Doors · new headline',
    scope:
      '“Wherever you start, we start with your goals.” It replaces the headline she rejected (“Two paths. One goal: an investment built on evidence.”).',
    excludes: 'The two doors, which she reviewed.',
    decision: 'Approve, edit or replace the new headline.',
    refs: ['investment:doors.title'],
  },
  {
    id: 'SR-049',
    routes: [INVESTMENT],
    kind: 'copy',
    label: 'Next step · the sentence under her line',
    scope:
      '“When the analysis shows it fits, the next questions are how to buy it well and what owning it will involve.” It was written to follow her line; she has not seen it.',
    excludes:
      'Her line “An opportunity is only good if it fits your goals, not the goals of the person selling it.” and the cards.',
    decision: APPROVE_COPY,
    refs: ['service-journey:JOURNEY.investment.intro'],
  },

  // ── Tax Advisory ────────────────────────────────────────────────────────
  {
    id: 'SR-054',
    routes: [TAX],
    kind: 'copy',
    label: 'Purchase Tax band · pain-point line',
    scope:
      '“Tax that is not looked at before signing is usually found later, when it is harder and dearer to put right…” — written for her request to add the pain point.',
    decision:
      'Approve, edit or withdraw this line. It also needs tax review, which is not hers alone.',
    refs: ['service-journey:TAX_LEAD_TOOL.moment'],
  },
  {
    id: 'SR-058',
    routes: [TAX],
    kind: 'copy',
    label: 'Report preview · the plainer wording',
    scope:
      'The panel titles and notes rewritten after her request to lower the technical level: “What Spain may ask of you”, “Your tax year”, “Tax in two countries”, “Tax, line by line”, their notes, two decision lines and “What changes if the assumptions change”.',
    excludes: 'The rest of the report band, which she reviewed.',
    decision:
      'Say whether the language is now plain enough, and approve or edit it. The tax wording also needs tax review.',
    refs: [
      'tax-advisory:report.summary.title',
      'tax-advisory:report.summary.note',
      'tax-advisory:report.decisions.treaty',
      'tax-advisory:report.decisions.breakdown',
      'tax-advisory:report.cards.0.title',
      'tax-advisory:report.cards.0.note',
      'tax-advisory:report.cards.1.title',
      'tax-advisory:report.cards.1.note',
      'tax-advisory:report.cards.2.title',
      'tax-advisory:report.cards.2.note',
      'tax-advisory:report.deliverables.2.text',
    ],
  },
  {
    id: 'SR-059',
    routes: [TAX],
    kind: 'copy',
    label: '“Everything you leave in our hands.” · eyebrow and six items',
    scope:
      'The eyebrow “In our hands” and the six items written under her title. One scope question is open: whether reading and answering tax-office letters is part of the service (S-01).',
    excludes: 'Her title “Everything you leave in our hands.”',
    decision: 'Approve, edit or withdraw the items, and answer S-01.',
    refs: ['tax-advisory:concerns.eyebrow', 'tax-advisory:concerns.items'],
  },
] as const satisfies readonly SarahReviewItem[];

export type SarahReviewId = (typeof SARAH_REVIEW_ITEMS)[number]['id'];

export function sarahReviewItem(id: SarahReviewId): SarahReviewItem {
  const item = SARAH_REVIEW_ITEMS.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown Sarah review item ${id}`);
  return item;
}

/**
 * What Sarah has approved, with the line of her document that says so.
 *
 * Her four review documents (REVISION WEB-*.docx, 2026-09-28, relayed by
 * Juanma) review the four landings as deployed at `main` `edc47f0`. Three
 * kinds of approval are recorded, never inferred from a claim's `status`:
 *
 *   - `explicit`: her own text, or a block she named and approved;
 *   - `reviewed`: copy that was on the page she reviewed, unchanged since,
 *     about which she asked for no change, on a page she judged as a whole
 *     (the quoted line). Copy written or changed after her review is never
 *     `reviewed`: it is an open SR item and listed in `except`;
 *   - `relayed`: an approval Juanma relayed for a whole page.
 *
 * `except` lists the paths inside `refs` that are NOT approved (open SR items
 * or copy she has not seen). Approval of copy is not evidence: tax, legal and
 * financial wording, case results and permissions keep their own checks
 * (docs/approval-marks-audit.md §5), and a claim's `status` still governs
 * whether it may be published as fact.
 *
 * The Home has no approval here: no review document covers it.
 */
export interface SarahApproval {
  readonly routes: readonly SarahReviewRoute[];
  readonly basis: 'explicit' | 'reviewed' | 'relayed';
  /** Document and quoted line (or Juanma's relay) the approval rests on. */
  readonly source: string;
  readonly scope: string;
  readonly refs: readonly string[];
  readonly except?: readonly string[];
}

const PP_DOC = 'REVISION WEB-property-purchase.docx';
const INV_DOC = 'REVISION WEB-investment.docx';
const TAX_DOC = 'REVISION WEB-Tax advisory.docx';
const TEAM_DOC = 'REVISION WEB. Team.docx';

export const SARAH_APPROVALS = [
  {
    routes: [CONTACT],
    basis: 'relayed',
    source:
      'Juanma, 2026-09-30: Sarah has approved the whole Contact page (relayed in the reconciliation brief; no document).',
    scope: 'All Contact copy and its portrait. The Team footer shown on Contact is covered below.',
    refs: [
      'contact:hero',
      'contact:booking',
      'contact:direct',
      'contact:firstContact',
      'contact:office',
      'contact:modalities',
      'contact:closing',
    ],
  },
  {
    routes: [PURCHASE],
    basis: 'explicit',
    source: `${PP_DOC}: "Compra con total tranquilidad: nosotros coordinamos cada paso." · "Nosotros gestionamos el papeleo; tú eliges tu casa." · "Lo que parece una gran oportunidad puede esconder una mala compra." · "El sueño cabe en un instante…" · "me gustan estos bloques" (navy before-sign band) · "Me gusta mucho este bloque, es un acierto total" (final CTA image)`,
    scope:
      'Her headline, audience title, good-idea title and paragraph (English adaptations, docs/phase-2h-juanma-review.md §10.2), the navy blocks and the final CTA block.',
    refs: [
      'property-purchase:hero.title',
      'property-purchase:hero.accent',
      'property-purchase:audience.title',
      'property-purchase:goodIdea.title',
      'property-purchase:goodIdea.body',
    ],
  },
  {
    routes: [PURCHASE],
    basis: 'reviewed',
    source: `${PP_DOC}: "El diseño de la web en general me gusta mucho" — every other comment asks for a specific change, implemented`,
    scope: 'Every other Property Purchase block she reviewed.',
    refs: [
      'property-purchase:hero',
      'property-purchase:trust',
      'property-purchase:audience',
      'property-purchase:goodIdea',
      'property-purchase:oneFile',
      'property-purchase:process',
      'property-purchase:beforeSign',
      'property-purchase:worries',
      'property-purchase:services',
      'property-purchase:authority',
      'property-purchase:cases',
      'property-purchase:journey',
      'property-purchase:faq',
      'property-purchase:finalCta',
      'property-purchase:footer',
      'service-journey:JOURNEY.purchase',
      'service-journey:SERVICE_STAGES',
      'service-journey:TEAM_LAYER',
      'buyer-voices:VOICES_BAND',
    ],
    except: ['property-purchase:goodIdea.pointsTitle', 'property-purchase:services.scopeTitle'],
  },
  {
    routes: [INVESTMENT],
    basis: 'explicit',
    source: `${INV_DOC}: "Una oportunidad solo es buena si encaja con tus objetivos, no con los de quien te la vende."`,
    scope:
      'Her line, as the title of the next-step band (English adaptation, §10.2 of the Phase 2H record).',
    refs: ['service-journey:JOURNEY.investment.title'],
  },
  {
    routes: [INVESTMENT],
    basis: 'reviewed',
    source: `${INV_DOC}: "Todos los apartados están bien estructurados" — she rejected only the two headlines and one text, all replaced`,
    scope:
      'Every Investment block she reviewed, except the replaced headlines, the new lead and the next-step intro.',
    refs: [
      'investment:hero',
      'investment:heroDashboard',
      'investment:trustStrip',
      'investment:trustScript',
      'investment:approach',
      'investment:doors',
      'investment:assetTypes',
      'investment:territoryMap',
      'investment:process',
      'investment:report',
      'investment:scenarios',
      'investment:authority',
      'investment:cases',
      'investment:journey',
      'investment:faq',
      'investment:buyerSystem',
      'investment:finalCta',
      'investment:footer',
      'service-journey:JOURNEY.investment',
    ],
    except: [
      'investment:hero.heading',
      'investment:hero.lead',
      'investment:doors.title',
      'service-journey:JOURNEY.investment.intro',
    ],
  },
  {
    routes: [TAX],
    basis: 'explicit',
    source: `${TAX_DOC}: "Todo lo que dejas en nuestras manos" · the cases block she wrote (title, subtitle, "ILUSTRACIÓN", the three cards, "Año confidencial", "DESCUBRE CÓMO TRABAJAMOS") · "Muy buena idea!" (calendar)`,
    scope:
      'Her concerns title, her cases copy (English adaptations, §10.2) and the calendar. The case results stay evidence items (C-01); the conditional publication line replaces her affirmative one until permission and figures exist.',
    refs: ['tax-advisory:concerns.title', 'tax-advisory:cases', 'tax-advisory:calendar'],
  },
  {
    routes: [TAX],
    basis: 'reviewed',
    source: `${TAX_DOC}: "Un acierto total esta web. El copy del principio me gusta mucho." — every other comment asks for a specific change, implemented`,
    scope:
      'Every other Tax Advisory block she reviewed, except the rewrites made after her review.',
    refs: [
      'tax-advisory:hero',
      'tax-advisory:heroSnapshot',
      'tax-advisory:trustStrip',
      'tax-advisory:trustScript',
      'tax-advisory:context',
      'tax-advisory:concerns',
      'tax-advisory:process',
      'tax-advisory:report',
      'tax-advisory:services',
      'tax-advisory:authority',
      'tax-advisory:journey',
      'tax-advisory:faq',
      'tax-advisory:finalCta',
      'tax-advisory:footer',
      'service-journey:JOURNEY.tax',
    ],
    except: [
      'tax-advisory:concerns.eyebrow',
      'tax-advisory:concerns.items',
      'tax-advisory:report.summary.title',
      'tax-advisory:report.summary.note',
      'tax-advisory:report.decisions.treaty',
      'tax-advisory:report.decisions.breakdown',
      'tax-advisory:report.cards.0.title',
      'tax-advisory:report.cards.0.note',
      'tax-advisory:report.cards.1.title',
      'tax-advisory:report.cards.1.note',
      'tax-advisory:report.cards.2.title',
      'tax-advisory:report.cards.2.note',
      'tax-advisory:report.deliverables.2.text',
    ],
  },
  {
    routes: [TEAM],
    basis: 'explicit',
    source: `${TEAM_DOC}: "Objetivos diferentes. La misma revisión antes de firmar." · "Comprar una casa es fácil. Comprarla bien es otra cosa." · "Sarah analiza tus objetivos, el coste real de la compra y la parte fiscal…" · names "Oscar Gonzalez", "Igor Veselov"`,
    scope: 'Her two titles, her introduction and the full names (English adaptations, §10.2).',
    refs: ['team:pathsHeader', 'team:teamHeader'],
  },
  {
    routes: [TEAM, CONTACT],
    basis: 'reviewed',
    source: `${TEAM_DOC}: "EL copy me gusta bastante" · "En general esta web me gusta mucho" — every other comment asks for a photograph or a removal`,
    scope: 'Every other Team block she reviewed, including the footer that Contact shares.',
    refs: ['team:faq', 'team:footer', 'service-journey:JOURNEY.team'],
  },
] as const satisfies readonly SarahApproval[];
