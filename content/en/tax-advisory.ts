import { claim, type Claim } from '@/lib/content/claims';

/**
 * TAX ADVISORY LANDING — CONTENT.
 *
 * Composition reference: `website/nueva web/Sarah Katerina Tax Advisory.png`.
 *
 * PHASE 2D — CONVERGENCE.
 * This module follows the shapes the shared website components expect
 * (`WebHeader`, `WebFooter`, `WebFaq`, `WebSection`) and the conventions
 * established by `content/en/investment.ts`, which is the canonical base:
 *
 *   - illustrative dashboard values are PLAIN STRINGS, not claims. They are
 *     sample output shown to illustrate a report format, labelled
 *     "Illustrative" on the surface that renders them — not statements the
 *     project is making. Phase 2B marked them with red PENDING_APPROVAL
 *     badges, which destroyed the composition; the governance is unchanged,
 *     it is simply stated once and quietly.
 *   - an unconfirmed headline figure keeps its position and carries a small
 *     pending dot, exactly as the Investment trust strip does.
 *   - the 20-year Tax Administration credential is `confirmed` here, matching
 *     Investment, which cites `verbal/credential-register.csv` CR-002
 *     (project owner, 2026-08-12). Phase 2B withheld it on this landing; two
 *     landings cannot state the same credential differently.
 *
 * WHAT THE TEMPLATE CARRIES THAT IS STILL NOT PUBLISHED
 *   - the three service prices (publication not approved, D2-04);
 *   - every delivery and response time (no confirmed figure);
 *   - "160+ compradores extranjeros" (volume deprioritised upstream);
 *   - the three case studies' clients, towns, years and outcomes (invented);
 *   - "SUMA" and "Comunidad Valenciana" (upstream warns against publishing
 *     specifics of that period);
 *   - VITA Host (D-06 unexecuted; a governance test forbids the mention).
 */

const TEMPLATE = 'website/nueva web/Sarah Katerina Tax Advisory.png (approved visual reference)';

export const PROTOTYPE_NOTICE = {
  label: 'VISUAL PREVIEW — NOT PRODUCTION',
  body: claim({
    text: 'Tax Advisory implemented on the shared website system for visual review. Copy is provisional, dashboard figures are illustrative samples, and nothing here is approved for publication.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §1 and §9',
  }),
} as const;

export const seo = {
  title: 'Spanish tax advisory for non-resident property owners',
  description:
    'Tax advisory for international owners and buyers of property in Spain: Modelo 210, annual compliance, purchase tax overlay and wealth planning, explained from inside the tax administration. Internal visual preview, not approved for production.',
} as const;

/* ===========================================================================
 * 2. HERO
 * ======================================================================== */

export const hero = {
  /** "ASESORÍA FISCAL EN ESPAÑA" */
  eyebrow: claim({ text: 'Tax advisory in Spain', status: 'proposal', source: TEMPLATE }),
  /** "Spanish taxes, from the inside." — kept verbatim. */
  heading: claim({ text: 'Spanish taxes, from the inside.', status: 'proposal', source: TEMPLATE }),
  /** "Claridad fiscal para propietarios no residentes y compradores extranjeros…" */
  lead: claim({
    text: 'Clarity for non-resident owners and foreign buyers. Real experience from inside Spain’s tax administration, so you decide with confidence and avoid surprises.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'tax',
  }),
  /** "MAP MY TAX EXPOSURE" */
  primaryCta: claim({ text: 'Map my tax exposure', status: 'proposal', source: TEMPLATE }),
  /** "VER CÓMO FUNCIONA" */
  secondaryCta: claim({ text: 'See how it works', status: 'proposal', source: TEMPLATE }),

  /** The row under the CTAs. Template: four markers with icons. */
  signals: [
    {
      icon: 'tax',
      value: claim({
        text: '20 years',
        status: 'confirmed',
        source: 'verbal/credential-register.csv CR-002, confirmed by the project owner 2026-08-12',
      }),
      note: claim({
        text: 'inside Spain’s tax administration',
        status: 'confirmed',
        source: 'CR-002',
      }),
    },
    {
      icon: 'independence',
      value: claim({
        text: 'Independent',
        status: 'confirmed',
        source: 'decisions-log.md 2026-07-27 — client-paid remuneration model',
      }),
      note: claim({
        text: 'no seller, developer or agency pays for the advice',
        status: 'confirmed',
        source: 'decisions-log.md 2026-07-27',
      }),
    },
    {
      icon: 'buyer',
      value: claim({ text: 'International', status: 'proposal', source: TEMPLATE }),
      note: claim({
        text: 'owners and buyers, working in English',
        status: 'proposal',
        source: TEMPLATE,
      }),
    },
  ] as readonly { icon: string; value: Claim; note: Claim }[],

  /** "Tu tranquilidad fiscal también es vivir mejor." */
  script: claim({
    text: 'Peace of mind about tax is part of living well.',
    status: 'proposal',
    source: TEMPLATE,
  }),

  imageAlt: claim({
    text: 'Sarah Katerina, photographed in a studio portrait, standing with one hand on her hip.',
    status: 'confirmed',
    source: 'AUTH-SK-001, authentic identity reference',
  }),

  /** The template stacks labelled document spines over the hero image. */
  documents: [
    claim({
      text: 'Agencia Tributaria',
      status: 'confirmed',
      source: 'Name of the Spanish tax administration',
    }),
    claim({
      text: 'Modelo 210',
      status: 'confirmed',
      source: 'Name of a published Spanish tax form',
    }),
    claim({ text: 'Non-resident taxation', status: 'proposal', source: TEMPLATE }),
  ] as readonly Claim[],

  locationLabel: claim({ text: 'Costa Blanca', status: 'proposal', source: TEMPLATE }),

  /** Describes the approved scroll-controlled hero film. */
  videoPending: claim({
    text: 'Tax exposure overview',
    status: 'confirmed',
    source: 'Owner-approved hero film, 2026-09-24',
  }),
} as const;

/**
 * The navy card over the hero image — the tax equivalent of Investment's
 * `heroDashboard`.
 *
 * Values are FIXED ILLUSTRATIVE SAMPLES shown to convey the report's format.
 * They are not a client's figures, not a projection and not tax advice. The
 * card carries a visible "Illustrative" tag and the footnote below.
 */
export const heroSnapshot = {
  title: claim({ text: 'Tax exposure snapshot', status: 'proposal', source: TEMPLATE }),
  property: claim({ text: 'Sample non-resident owner, Costa Blanca', status: 'proposal' }),
  rows: [
    {
      label: claim({ text: 'Estimated annual total', status: 'proposal', source: TEMPLATE }),
      value: '€8,400',
    },
    {
      label: claim({ text: 'Filings in the year', status: 'proposal', source: TEMPLATE }),
      value: '4',
    },
  ],
  horizon: {
    label: claim({ text: 'Next deadline', status: 'proposal', source: TEMPLATE }),
    value: 'Q2',
  },
  foot: claim({
    text: 'Sample figures shown to illustrate the report format. Not a client result, a projection or tax advice.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §5',
  }),
} as const;

/* ===========================================================================
 * 3. TRUST STRIP
 * ======================================================================== */

export const trustStrip: readonly { icon: string; value: Claim; note: Claim }[] = [
  {
    icon: 'tax',
    value: claim({
      text: '20 years',
      status: 'confirmed',
      source: 'verbal/credential-register.csv CR-002, confirmed 2026-08-12',
    }),
    note: claim({
      text: 'inside Spain’s tax administration',
      status: 'confirmed',
      source: TEMPLATE,
    }),
  },
  {
    icon: 'buyer',
    value: claim({
      text: 'International owners',
      status: 'pending',
      note: 'Template shows "160+ compradores extranjeros". Volume was deprioritised upstream as differential proof and no figure is evidenced.',
    }),
    note: claim({ text: 'advised on Spanish property tax', status: 'proposal', source: TEMPLATE }),
  },
  {
    icon: 'declare',
    value: claim({
      text: 'Modelo 210',
      status: 'confirmed',
      source: 'brand-system/services/service-taxonomy.md — Modelo 210 support, SERVICE_LINE',
    }),
    note: claim({
      text: 'prepared, reviewed and filed',
      status: 'proposal',
      source: TEMPLATE,
      review: 'tax',
    }),
  },
  {
    icon: 'own',
    value: claim({ text: 'One team', status: 'proposal', source: TEMPLATE }),
    note: claim({ text: 'across the whole ownership cycle', status: 'proposal', source: TEMPLATE }),
  },
];

/** "Mismos objetivos. Más tranquilidad." */
export const trustScript = claim({
  text: 'Same objectives. More peace of mind.',
  status: 'proposal',
  source: TEMPLATE,
});

/* ===========================================================================
 * 4. CONTEXT — "Know what Spain will actually cost you."
 *
 * The template composes the problem framing and the audience list as ONE
 * band: headline column left, arrow-marked profiles centre, image right with
 * script marginalia over it. Phase 2B split them into two sections, which
 * changed the template's rhythm. Restored to the template's composition.
 * ======================================================================== */

export const context = {
  /** "PARA QUIÉN ES ESTA ASESORÍA" */
  eyebrow: claim({ text: 'Who this advisory is for', status: 'proposal', source: TEMPLATE }),
  /** Kept verbatim. */
  title: claim({
    text: 'Know what Spain will actually cost you.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'tax',
  }),
  /** "Asesoramiento fiscal especializado para particulares internacionales…" */
  body: claim({
    text: 'Tax advisory for international individuals who own, are buying, are letting or are selling property in Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /**
   * The tension the template implies but does not spell out. Kept short so it
   * supports the headline instead of becoming a second section.
   */
  tension: claim({
    text: 'Owning as a non-resident creates obligations that arrive on their own schedule, in a system built for residents. The hard part is rarely the tax itself — it is knowing which obligations apply to you, when, and in what order.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'tax',
  }),
  /** Template: four arrow-marked profiles. Two more added from the brief. */
  profiles: [
    claim({
      text: 'Non-resident owners with a home in Spain',
      status: 'proposal',
      source: TEMPLATE,
    }),
    claim({
      text: 'Foreign buyers, before the arras deposit is signed',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({
      text: 'Owners letting their property, long or short term',
      status: 'proposal',
      source: TEMPLATE,
      review: 'tax',
    }),
    claim({
      text: 'Owners preparing to sell and planning the impact',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Owners with filings still outstanding',
      status: 'proposal',
      source: TEMPLATE,
      review: 'tax',
    }),
    claim({
      text: 'Anyone who wants their position reviewed before deciding',
      status: 'proposal',
      review: 'tax',
    }),
  ] as readonly Claim[],
  /** "Conocimiento local. Perspectiva internacional." */
  script: claim({
    text: 'Local knowledge. International perspective.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  territoryLabel: claim({ text: 'Costa Blanca', status: 'proposal', source: TEMPLATE }),
  limit: claim({
    text: 'Tax treatment depends on your residence, the region and your circumstances, and it changes over time. Nothing here is advice about your situation.',
    status: 'proposal',
    review: 'tax',
  }),
} as const;

/* ===========================================================================
 * 5. ANNUAL TAX CALENDAR
 *
 * ILLUSTRATIVE. The bar positions reproduce the template's layout so the
 * composition can be reviewed. They state no real filing period: every
 * deadline is a tax claim requiring competent review (AGENTS.md §11).
 * ======================================================================== */

export interface CalendarRow {
  readonly id: string;
  readonly label: Claim;
  /** 1–12, from the template's bar placement. Layout, not a deadline. */
  readonly from: number;
  readonly to: number;
  readonly tone: 'navy' | 'gold' | 'sky' | 'sage' | 'sand' | 'clay';
}

export const calendar = {
  /** "ANNUAL TAX CALENDAR · NON-RESIDENT OWNER" */
  eyebrow: claim({
    text: 'Annual tax calendar · non-resident owner',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** "Las fechas clave para mantener tu propiedad en regla." */
  title: claim({
    text: 'The dates that keep your property in order.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'tax',
  }),
  months: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'] as const,
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ] as const,
  rows: [
    {
      id: 'modelo210-rental',
      label: claim({
        text: 'Modelo 210 — rental income',
        status: 'confirmed',
        source: 'Name of a Spanish tax form',
      }),
      from: 4,
      to: 7,
      tone: 'navy',
    },
    {
      id: 'modelo210-imputed',
      label: claim({
        text: 'Modelo 210 — imputed income',
        status: 'confirmed',
        source: 'Name of a Spanish tax form',
      }),
      from: 2,
      to: 4,
      tone: 'gold',
    },
    {
      id: 'ibi',
      label: claim({
        text: 'IBI — municipal property tax',
        status: 'confirmed',
        source: 'Name of a Spanish municipal tax',
      }),
      from: 8,
      to: 12,
      tone: 'sage',
    },
    {
      id: 'wealth',
      label: claim({ text: 'Wealth tax', status: 'confirmed', source: 'Name of a Spanish tax' }),
      from: 3,
      to: 5,
      tone: 'sky',
    },
    {
      id: 'itp-vat',
      label: claim({
        text: 'ITP / VAT — on purchase',
        status: 'confirmed',
        source: 'Names of Spanish transfer tax and VAT',
      }),
      from: 4,
      to: 6,
      tone: 'sand',
    },
    {
      id: 'plusvalia',
      label: claim({
        text: 'Plusvalía — on sale',
        status: 'confirmed',
        source: 'Name of a Spanish municipal charge',
      }),
      from: 3,
      to: 5,
      tone: 'clay',
    },
  ] as readonly CalendarRow[],
  note: claim({
    text: 'Positions follow the reference layout and state no filing period. Real dates depend on the tax, the region, the property and your circumstances.',
    status: 'pending',
    review: 'tax',
  }),
  aside: {
    /** "CALENDARIO PERSONALIZADO" */
    eyebrow: claim({ text: 'Your own calendar', status: 'proposal', source: TEMPLATE }),
    body: claim({
      text: 'We build the calendar around your obligations — your situation, your property, your filing profile.',
      status: 'proposal',
      source: TEMPLATE,
      review: 'tax',
    }),
    /** "CREAR MI MAPA FISCAL" */
    cta: claim({ text: 'Create my tax map', status: 'proposal', source: TEMPLATE }),
  },
} as const;

/* ===========================================================================
 * 6. PROCESS — "Every tax, in the right order."
 * ======================================================================== */

export const process = {
  eyebrow: claim({ text: 'How it works', status: 'proposal', source: TEMPLATE }),
  title: claim({ text: 'Every tax, in the right order.', status: 'proposal', source: TEMPLATE }),
  steps: [
    {
      id: 'fiscal-map',
      icon: 'market' as const,
      title: claim({ text: 'Fiscal map', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Your current position and the risks in it, set out in one picture.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      deliverable: claim({ text: 'Initial report', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'itp-vat',
      icon: 'buy' as const,
      title: claim({ text: 'ITP / VAT', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Advice on the purchase and the tax treatment it triggers.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      deliverable: claim({ text: 'Cost analysis', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'modelo-210',
      icon: 'declare' as const,
      title: claim({
        text: 'Modelo 210',
        status: 'confirmed',
        source: 'service-taxonomy.md — Modelo 210 support',
      }),
      body: claim({
        text: 'Non-resident filings for imputed and rental income, prepared and checked.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      deliverable: claim({ text: 'Reviewed filings', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'plusvalia',
      icon: 'exit' as const,
      title: claim({ text: 'Plusvalía', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Calculation and planning for the moment you sell.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      deliverable: claim({ text: 'Estimate and strategy', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'wealth',
      icon: 'financialModel' as const,
      title: claim({ text: 'Wealth tax', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Your asset position in Spain, and the reliefs that apply to it.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      deliverable: claim({ text: 'Exposure report', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'annual-review',
      icon: 'own' as const,
      title: claim({ text: 'Annual review', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'A yearly check so the position stays current as rules and circumstances change.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      deliverable: claim({ text: 'Annual checklist', status: 'proposal', source: TEMPLATE }),
    },
  ],
  /** "Un proceso claro para cada etapa de tu propiedad en España." */
  script: claim({
    text: 'A clear step for each stage of owning property in Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

/* ===========================================================================
 * 7. REPORT PREVIEW — navy band
 *
 * Illustrative samples, labelled on every panel, exactly as the Investment
 * report band does.
 * ======================================================================== */

/** Copy added by the Phase 2E visual content upgrade. Pending Juanma's review. */
const PHASE_2E_REPORT = 'Phase 2E proposed copy (brief 2026-10-23) — pending Juanma';

/**
 * Phase 2H — Sarah's review of this page (REVISION WEB-Tax advisory.docx,
 * 2026-09). Her supplied copy is `confirmed` (accepted by Juanma, 2026-09-28)
 * unless it carries a tax review; plain-language rewrites drafted here stay
 * `proposal`; case results stay `unverified`. Before/after in
 * docs/phase-2h-juanma-review.md §C and §10.2.
 */
const JUANMA_REVIEW =
  "Phase 2H — Sarah's review (REVISION WEB-Tax advisory.docx), relayed by Juanma";
const SARAH_APPROVED =
  "Sarah's review (REVISION WEB-Tax advisory.docx), accepted by Juanma 2026-09-28";

export const report = {
  /** "PREVIEW DEL INFORME FISCAL" */
  eyebrow: claim({ text: 'Preview of the tax report', status: 'proposal', source: TEMPLATE }),
  title: claim({
    text: 'What the report actually contains.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** "Datos reales. Análisis claro. Recomendaciones prácticas." */
  subtitle: claim({
    text: 'Clear analysis and practical recommendations, laid out the same way every time.',
    status: 'proposal',
    source: TEMPLATE,
  }),

  /** Panel 1 — "Resumen de tu exposición fiscal". */
  summary: {
    title: claim({
      text: 'What Spain may ask of you',
      status: 'proposal',
      source: JUANMA_REVIEW,
      review: 'tax',
      note: 'Plain-language rewrite of "Your tax exposure".',
    }),
    property: claim({ text: 'Sample non-resident owner', status: 'proposal' }),
    rows: [
      {
        label: claim({ text: 'Estimated annual total', status: 'proposal', source: TEMPLATE }),
        value: '€8,400',
      },
      {
        label: claim({ text: 'Of which Modelo 210', status: 'proposal', source: TEMPLATE }),
        value: '€2,550',
      },
      {
        label: claim({ text: 'Of which municipal', status: 'proposal', source: TEMPLATE }),
        value: '€900',
      },
    ],
    status: claim({ text: 'Filing status', status: 'proposal', source: TEMPLATE }),
    statusValue: claim({ text: 'Up to date', status: 'proposal', source: TEMPLATE }),
    note: claim({
      text: 'One figure for the year, and what it is made of.',
      status: 'proposal',
      review: 'tax',
      note: `${PHASE_2E_REPORT}; plain-language rewrite, ${JUANMA_REVIEW}`,
    }),
  },

  /**
   * Phase 2E report explorer (brief 2026-10-23, §8): the decision each panel
   * supports — exposure, calendar, treaty, breakdown. Proposed copy that
   * describes a panel's purpose; it states no tax position or outcome.
   */
  decisions: {
    summary: claim({
      text: 'How much Spain may ask of you in a year, before anything is filed.',
      status: 'proposal',
      review: 'tax',
      note: PHASE_2E_REPORT,
    }),
    calendar: claim({
      text: 'What has to be ready, and in which month, so nothing becomes a late filing.',
      status: 'proposal',
      review: 'tax',
      note: PHASE_2E_REPORT,
    }),
    treaty: claim({
      text: 'Whether Spain or your home country taxes each income, and where relief may stop you paying twice.',
      status: 'proposal',
      review: 'tax',
      note: PHASE_2E_REPORT,
    }),
    breakdown: claim({
      text: 'Which amount weighs most, and what to look at first.',
      status: 'proposal',
      review: 'tax',
      note: PHASE_2E_REPORT,
    }),
  },
  explorerLabel: claim({
    text: 'Sample tax report panels',
    status: 'proposal',
    note: PHASE_2E_REPORT,
  }),

  /** Panels 2–4 — "Calendario fiscal anual", "Convenio", "Desglose". */
  cards: [
    {
      id: 'calendar',
      title: claim({ text: 'Your tax year', status: 'proposal', source: JUANMA_REVIEW }),
      note: claim({
        text: 'What to file, and when',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
    },
    {
      id: 'treaty',
      title: claim({
        text: 'Tax in two countries',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
        note: 'Plain-language rewrite of "Double taxation treaty".',
      }),
      note: claim({
        text: 'Which country taxes what, so the same income is not taxed twice',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
    },
    {
      id: 'breakdown',
      title: claim({
        text: 'Tax, line by line',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
      note: claim({
        text: 'Each amount, and where it comes from',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
    },
  ],

  /** Rows inside the breakdown panel. Illustrative sample values. */
  breakdown: [
    {
      label: claim({ text: 'Modelo 210 — rental', status: 'proposal', source: TEMPLATE }),
      value: '€2,100',
    },
    {
      label: claim({ text: 'Modelo 210 — imputed', status: 'proposal', source: TEMPLATE }),
      value: '€450',
    },
    {
      label: claim({ text: 'IBI — municipal', status: 'proposal', source: TEMPLATE }),
      value: '€900',
    },
    { label: claim({ text: 'Wealth tax', status: 'proposal', source: TEMPLATE }), value: '€1,850' },
    { label: claim({ text: 'Other', status: 'proposal', source: TEMPLATE }), value: '€3,100' },
  ],

  /** The four-item list beside the panels. */
  deliverables: [
    {
      icon: 'report' as const,
      text: claim({
        text: 'A complete report, written for your situation',
        status: 'proposal',
        source: TEMPLATE,
      }),
    },
    {
      icon: 'play' as const,
      text: claim({
        text: 'Delivered as a PDF and walked through on a call',
        status: 'proposal',
        source: TEMPLATE,
      }),
    },
    {
      icon: 'financialModel' as const,
      text: claim({
        text: 'What changes if the assumptions change',
        status: 'proposal',
        source: TEMPLATE,
        review: 'financial',
      }),
    },
    {
      icon: 'check' as const,
      text: claim({
        text: 'Step-by-step recommendations',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
    },
  ],

  /** "SOLICITAR REVISIÓN FISCAL" */
  cta: claim({ text: 'Request a tax review', status: 'proposal', source: TEMPLATE }),
  ctaNote: claim({
    text: 'Sample figures throughout, shown to illustrate the report format. No contact channel is connected in this preview.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §5; README.md §12',
  }),
} as const;

/* ===========================================================================
 * 8. CONCERNS — "What you stop worrying about."
 * ======================================================================== */

export const concerns = {
  /**
   * Template: "LO QUE DEJAS DE PREOCUPARTE POR". Phase 2H: Sarah found the
   * phrase incomplete and confusing and replaced it with "Todo lo que dejas en
   * nuestras manos". The six items are rewritten to match the new title: what
   * is handed over, not what is feared. `proposal`; scope and every tax line
   * pending Sarah and competent tax review. "In our hands" describes the agreed
   * scope of the service, not a guarantee of any outcome.
   */
  eyebrow: claim({ text: 'In our hands', status: 'proposal', source: JUANMA_REVIEW }),
  title: claim({
    text: 'Everything you leave in our hands.',
    status: 'confirmed',
    source: SARAH_APPROVED,
  }),
  /** "Menos incertidumbre. Más tiempo para disfrutar de lo que realmente importa." */
  body: claim({
    text: 'Less uncertainty. More time for the part of Spain you actually came for.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  items: [
    {
      icon: 'clock' as const,
      text: claim({
        text: 'Your Modelo 210 dates, kept in view',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
    },
    {
      icon: 'risk' as const,
      text: claim({
        text: 'Checking the same income is not taxed twice',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
    },
    {
      icon: 'document' as const,
      text: claim({
        text: 'Reading and answering tax office letters',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
        note: 'Scope to confirm with Sarah: whether replying to the tax office is part of the service.',
      }),
    },
    {
      icon: 'analyse' as const,
      text: claim({
        text: 'A fresh review every year, not last year’s filing copied',
        status: 'proposal',
        source: JUANMA_REVIEW,
      }),
    },
    {
      icon: 'tax' as const,
      text: claim({
        text: 'Knowing what you actually owe',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
    },
    {
      icon: 'buy' as const,
      text: claim({
        text: 'The tax that comes with a purchase, before you buy',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
    },
  ],
  /** "Menos dudas. Más vida en España." */
  script: claim({
    text: 'Fewer doubts. More life in Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  territoryLabel: claim({ text: 'Costa Blanca', status: 'proposal', source: TEMPLATE }),
} as const;

/* ===========================================================================
 * 9. SERVICES — three blocks, as the template composes them
 *
 * The template shows THREE service cards. Phase 2B expanded them to six,
 * which turned an editorial composition into a catalogue. Restored to three;
 * nothing was dropped — wealth, Modelo 210 corrections and the personal
 * review live inside the block they belong to, as sub-items.
 * ======================================================================== */

export interface ServiceBlock {
  readonly id: string;
  readonly icon: 'analyse' | 'declare' | 'buy';
  readonly visual: 'plot' | 'built' | 'district';
  readonly title: Claim;
  readonly points: readonly Claim[];
  readonly deliverable: Claim;
  /** Secondary line: what else the block covers. */
  readonly also: Claim;
  readonly cta: Claim;
}

export const services = {
  /** "NUESTROS SERVICIOS" */
  eyebrow: claim({ text: 'Our services', status: 'proposal', source: TEMPLATE }),
  title: claim({
    text: 'Start where your situation actually is.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  items: [
    {
      id: 'tax-diagnostic',
      icon: 'analyse',
      visual: 'plot',
      /** "TAX DIAGNOSTIC" */
      title: claim({ text: 'Tax diagnostic', status: 'proposal', source: TEMPLATE }),
      points: [
        claim({
          text: 'Review of your current position',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
        claim({
          text: 'Identification of the risks in it',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
        claim({
          text: 'Recommendations written for your case',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
      ],
      deliverable: claim({ text: 'Written diagnostic', status: 'proposal', source: TEMPLATE }),
      also: claim({
        text: 'Includes the personal tax review for owners who just want their position checked.',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'Review my situation', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'annual-compliance',
      icon: 'declare',
      visual: 'built',
      /** "ANNUAL COMPLIANCE" */
      title: claim({ text: 'Annual compliance', status: 'proposal', source: TEMPLATE }),
      points: [
        claim({
          text: 'Modelo 210, rental and imputed income',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
        claim({
          text: 'Deadlines tracked for you',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
        claim({
          text: 'Representation and correspondence handled',
          status: 'proposal',
          source: TEMPLATE,
          review: 'legal',
        }),
      ],
      deliverable: claim({
        text: 'Year-round compliance, calendar and alerts',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      also: claim({
        text: 'Covers correcting filings that are already outstanding.',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'Understand my obligations', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'purchase-overlay',
      icon: 'buy',
      visual: 'district',
      /** "PURCHASE + TAX OVERLAY" */
      title: claim({ text: 'Purchase + tax overlay', status: 'proposal', source: TEMPLATE }),
      points: [
        claim({
          text: 'Full tax read on the purchase itself',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
        claim({
          text: 'ITP / VAT and the costs that travel with them',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
        claim({
          text: 'How the structure looks over the long term',
          status: 'proposal',
          source: TEMPLATE,
          review: 'tax',
        }),
      ],
      deliverable: claim({
        text: 'Pre-purchase tax read',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
      also: claim({
        text: 'Extends to wealth and asset planning once you own.',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'Review before I commit', status: 'proposal', source: TEMPLATE }),
    },
  ] as readonly ServiceBlock[],
  /**
   * The template prices each card. No price is published: publication is not
   * approved (D2-04) and service-taxonomy.md requires live re-verification.
   */
  priceNote: claim({
    text: 'Scope and fees are confirmed in writing before any work starts. Nothing is priced on this preview.',
    status: 'pending',
    source: 'service-taxonomy.md; docs/phase-2-decision-gate.md D2-04',
  }),
} as const;

/* ===========================================================================
 * 10. AUTHORITY — navy band
 * ======================================================================== */

export const authority = {
  /** "LA EXPERIENCIA MARCA LA DIFERENCIA" */
  eyebrow: claim({ text: 'Experience makes the difference', status: 'proposal', source: TEMPLATE }),
  /** Kept verbatim. */
  title: claim({
    text: 'The authority’s view, translated for you.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  body: claim({
    text: 'Sarah worked inside Spain’s tax administration before advising international clients on it. The value is not only knowing the rules — it is knowing how the administration actually reads them.',
    status: 'proposal',
    review: 'tax',
    note: 'The template names SUMA and the Comunidad Valenciana. Neither is repeated: content/authority-content-and-video-opportunity-map.md warns against publishing specifics of that period.',
  }),
  points: [
    {
      icon: 'independence' as const,
      text: claim({
        text: 'Independent advice',
        status: 'confirmed',
        source: 'decisions-log.md 2026-07-27',
      }),
    },
    {
      icon: 'tax' as const,
      text: claim({
        text: 'Experience from inside the administration',
        status: 'proposal',
        source: TEMPLATE,
      }),
    },
    {
      icon: 'buyer' as const,
      text: claim({ text: 'International focus', status: 'proposal', source: TEMPLATE }),
    },
    {
      icon: 'check' as const,
      text: claim({
        text: 'Coordination with your adviser abroad',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
    },
  ],
  /** "CONOCER A SARAH" */
  cta: claim({ text: 'About Sarah', status: 'proposal', source: TEMPLATE }),
  /** "La fiscalidad no tiene por qué ser complicada si cuentas con la guía adecuada." */
  quote: claim({
    text: 'Tax does not have to be complicated when you have the right guide.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  signaturePending: claim({
    text: 'Signature asset pending',
    status: 'pending',
    note: 'The template signs the quote by hand. No signature asset is approved and one may not be drawn or typeset.',
  }),
  limits: [
    claim({
      text: 'A tax review is not legal representation, a valuation or a survey.',
      status: 'proposal',
      review: 'legal',
    }),
    claim({
      text: 'Tax treatment depends on your residence, region and circumstances.',
      status: 'proposal',
      review: 'tax',
    }),
  ] as readonly Claim[],
  imageAlt: claim({
    text: 'Sarah Katerina, photographed in a studio portrait.',
    status: 'confirmed',
    source: 'AUTH-SK-002, authentic identity reference',
  }),
} as const;

/* ===========================================================================
 * 11. CASES — structure kept, evidence withheld
 *
 * Same treatment as the Investment cases band: the cards read as real cases,
 * the result is withheld, and the reason is stated once.
 * ======================================================================== */

export const cases = {
  eyebrow: claim({ text: 'Real cases', status: 'proposal', source: JUANMA_REVIEW }),
  /**
   * Template: "Three files. Three avoided mistakes." Phase 2H: Sarah found
   * "files" unclear and supplied the whole section. "Real" stays a proposal:
   * no case is evidenced in the repository yet.
   */
  title: claim({
    text: 'Three real cases. Three mistakes avoided.',
    status: 'proposal',
    source: JUANMA_REVIEW,
  }),
  subtitle: claim({
    text: 'This is how we work. Each client’s details stay confidential until they authorise us in writing to publish them and the figures are verified.',
    status: 'confirmed',
    source: SARAH_APPROVED,
    note: 'Sarah’s line, with "in writing" and "the figures are verified" kept from the confirmed AGENTS.md §2/§11 wording.',
  }),
  /** Replaces the "Schematic" badge on the case drawings (Sarah: "ILUSTRACIÓN"). */
  visualBadge: claim({ text: 'Illustration', status: 'confirmed', source: SARAH_APPROVED }),
  /**
   * Card copy supplied by Sarah. The results she wrote ("Penalty avoided",
   * "Position regularised", "Taxes and costs planned") are `unverified`: each
   * card shows it as the proposed result, with the value withheld and an
   * explicit "evidence and tax review pending" line. None is a fact until the
   * client's written permission and the figures are on record and a tax
   * professional has reviewed the wording.
   */
  items: [
    {
      id: 'owner',
      visual: 'built' as const,
      profile: claim({
        text: 'Non-resident owner with a holiday let',
        status: 'confirmed',
        source: SARAH_APPROVED,
      }),
      decision: claim({
        text: 'We spotted a risk in their situation and put it in order before it could become a penalty.',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
      metric: claim({
        text: 'Penalty avoided',
        status: 'unverified',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
      period: claim({ text: 'Year confidential', status: 'pending', source: SARAH_APPROVED }),
    },
    {
      id: 'seller',
      visual: 'works' as const,
      profile: claim({
        text: 'Non-resident owner with Modelo 210 outstanding',
        status: 'confirmed',
        source: SARAH_APPROVED,
      }),
      decision: claim({
        text: 'We brought their outstanding returns and paperwork up to date.',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
      metric: claim({
        text: 'Position regularised',
        status: 'unverified',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
      period: claim({ text: 'Year confidential', status: 'pending', source: SARAH_APPROVED }),
    },
    {
      id: 'buyer',
      visual: 'plot' as const,
      profile: claim({ text: 'Off-plan purchase', status: 'confirmed', source: SARAH_APPROVED }),
      decision: claim({
        text: 'Before signing, the client knew every tax on the purchase and the long-term costs.',
        status: 'proposal',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
      /**
       * Sarah's correction: a new home bought from the developer normally pays
       * VAT (IVA) and stamp duty (AJD), not transfer tax (ITP); only a resale
       * off plan would carry ITP. The former "ITP and wealth position planned"
       * named a tax the case may not have had, so the result is now
       * tax-neutral. The classification of this case is NOT validated: it
       * needs the case file and competent tax review before any tax is named.
       */
      metric: claim({
        text: 'Taxes and costs planned',
        status: 'unverified',
        source: JUANMA_REVIEW,
        review: 'tax',
      }),
      period: claim({ text: 'Year confidential', status: 'pending', source: SARAH_APPROVED }),
    },
  ],
  locationPending: claim({ text: 'Location withheld', status: 'pending' }),
  /** Shown on every card: the result above is a proposal, not evidence. */
  evidencePending: claim({
    text: 'Proposed result · evidence and tax review pending',
    status: 'confirmed',
    source: 'AGENTS.md §2, §10 and §11',
  }),
  /**
   * Sarah proposed "Publicado con autorización escrita del cliente y cifras
   * verificadas" as a statement of fact. No permission or verified figure is on
   * record, so the conditional wording stays until one is.
   */
  permissionPending: claim({
    text: 'Published only with written client permission and verified figures.',
    status: 'blocked',
    note: 'The template names Altea, Jávea and Moraira with years, nationalities and amounts. All invented. Phase 2H: Sarah’s affirmative version ("Published with the client’s written permission and verified figures") becomes usable only once both exist for a case.',
  }),
  /** Sarah: "DESCUBRE CÓMO TRABAJAMOS". */
  cta: claim({ text: 'Discover how we work', status: 'confirmed', source: SARAH_APPROVED }),
} as const;

/* ===========================================================================
 * 12. CONTINUITY — "Un único equipo en todo el ciclo"
 *
 * The template's fourth step is VITA Host. AGENTS.md §9 forbids mentioning it
 * while D-06 is unexecuted, and a governance test enforces that. It is
 * replaced by an annual review, and the substitution is stated on the page.
 * ======================================================================== */

export const journey = {
  eyebrow: claim({ text: 'One team across the whole cycle', status: 'proposal', source: TEMPLATE }),
  title: claim({ text: 'Buy. File. Plan. Review.', status: 'proposal', source: TEMPLATE }),
  steps: [
    {
      icon: 'buy' as const,
      title: claim({ text: 'Buy', status: 'proposal', source: TEMPLATE }),
      body: claim({ text: 'Property advice on the purchase itself', status: 'proposal' }),
    },
    {
      icon: 'declare' as const,
      title: claim({ text: 'File', status: 'proposal', source: TEMPLATE }),
      body: claim({ text: 'Filings prepared, deadlines met', status: 'proposal', review: 'tax' }),
    },
    {
      icon: 'financialModel' as const,
      title: claim({ text: 'Plan', status: 'proposal', source: TEMPLATE }),
      body: claim({ text: 'Asset and ownership planning', status: 'proposal', review: 'tax' }),
    },
    {
      icon: 'own' as const,
      title: claim({ text: 'Review', status: 'proposal' }),
      body: claim({
        text: 'An annual check that keeps it current',
        status: 'proposal',
        review: 'tax',
      }),
    },
  ],
  /** "Todo conectado. Todo bajo control." */
  script: claim({
    text: 'All connected. All under control.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  substitutionNote: claim({
    text: 'The reference ends this sequence with a property-management step. That service is held publicly until an upstream entity decision is executed, so an annual tax review takes its place.',
    status: 'confirmed',
    source: 'AGENTS.md §9 — Property Management HOLD, D-06 unexecuted',
  }),
} as const;

/* ===========================================================================
 * 13. FAQ — rendered by the shared WebFaq
 * ======================================================================== */

export const faq = {
  /** "QUICK ANSWERS" */
  eyebrow: claim({ text: 'Quick answers', status: 'proposal', source: TEMPLATE }),
  /** "Resolvemos tus dudas más comunes." */
  title: claim({ text: 'The questions we are asked most.', status: 'proposal', source: TEMPLATE }),
  items: [
    {
      id: 'adviser-abroad',
      question: claim({
        text: 'Can I work with my tax adviser at home?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Yes. Working alongside an adviser in your own country is normal, and coordinating directly with them is part of the service.',
        status: 'proposal',
        source: TEMPLATE,
      }),
    },
    {
      id: 'modelo-210',
      question: claim({ text: 'What is Modelo 210, and does it apply to me?', status: 'proposal' }),
      answer: claim({
        text: 'It is the Spanish non-resident income tax return. Whether it applies to you, in which form and how often depends on your residence and on how the property is used. Establishing that is one of the first things a review does.',
        status: 'proposal',
        review: 'tax',
      }),
    },
    {
      id: 'deadlines',
      question: claim({
        text: 'I am behind on Modelo 210. Can you help?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Outstanding filings are a common starting point. What can be done, and what it involves, is established once the position is reviewed.',
        status: 'proposal',
        review: 'tax',
      }),
    },
    {
      id: 'purchase',
      question: claim({
        text: 'What tax do I pay when buying off-plan?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Purchase taxation depends on the property, the seller and the region, and no figure is confirmed for publication yet.',
        status: 'pending',
        review: 'tax',
      }),
    },
    {
      id: 'remote',
      question: claim({
        text: 'Can I do this without travelling to Spain?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'What can be done remotely, and what needs a power of attorney, is a legal question not yet reviewed for publication.',
        status: 'pending',
        review: 'legal',
      }),
    },
    {
      id: 'rental',
      question: claim({ text: 'I let the property. Does that change things?', status: 'proposal' }),
      answer: claim({
        text: 'Letting changes both what is declared and when. Long-term and short-term letting are not treated identically, and regional rules can apply.',
        status: 'proposal',
        review: 'tax',
      }),
    },
    {
      id: 'wealth',
      question: claim({ text: 'Does wealth tax apply to me?', status: 'proposal' }),
      answer: claim({
        text: 'Thresholds and reliefs vary by region and by circumstance. No threshold is confirmed for publication yet.',
        status: 'pending',
        review: 'tax',
      }),
    },
    {
      id: 'cost',
      question: claim({
        text: 'What does it cost, and what is included?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Scope and fees are confirmed in writing before any work starts. Pricing is not published on this preview.',
        status: 'pending',
        source: 'docs/phase-2-decision-gate.md D2-04',
      }),
    },
    {
      id: 'scope',
      question: claim({ text: 'What is not included?', status: 'proposal' }),
      answer: claim({
        text: 'A tax review is not legal representation, a valuation, a survey, or a substitute for your own lawyer. Where something falls outside the scope, it is named rather than absorbed.',
        status: 'proposal',
        review: 'legal',
      }),
    },
    {
      id: 'documents',
      question: claim({ text: 'What documents do you need from me?', status: 'proposal' }),
      answer: claim({
        text: 'The list depends on your situation and is not confirmed for publication yet.',
        status: 'pending',
      }),
    },
    {
      id: 'independence',
      question: claim({ text: 'Who pays you?', status: 'proposal' }),
      answer: claim({
        text: 'You do. The remuneration model is client-paid, which is what keeps the advice independent of any seller or developer.',
        status: 'confirmed',
        source:
          'decisions-log.md 2026-07-27; PROJECT-STATUS.md confirmed by the project owner 2026-08-13',
      }),
    },
    {
      id: 'tax',
      question: claim({ text: 'Will you tell me exactly what I will pay?', status: 'proposal' }),
      answer: claim({
        text: 'A review sets out your obligations and an estimate of their cost. A figure specific to you requires your documents and competent review.',
        status: 'pending',
        review: 'tax',
      }),
    },
  ],
  legalNote: claim({
    text: 'Nothing on this page is tax, legal or financial advice. Answers describe the service, not your situation, and every tax statement requires competent review before publication.',
    status: 'confirmed',
    source: 'AGENTS.md §11',
  }),
} as const;

/* ===========================================================================
 * 14. FINAL CTA
 * ======================================================================== */

export const finalCta = {
  /** "TU TRANQUILIDAD FISCAL EMPIEZA AQUÍ" */
  eyebrow: claim({ text: 'Your peace of mind starts here', status: 'proposal', source: TEMPLATE }),
  /** Kept verbatim. */
  title: claim({
    text: 'Know the number before the letter arrives.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'tax',
    note: 'Watch item: must read as preparation, not manufactured urgency. The brand principle is calm evidence.',
  }),
  /** "Anticípate, planifica y evita sorpresas." */
  body: claim({
    text: 'Look ahead, plan, and avoid the surprises.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  primaryCta: claim({ text: 'Map my tax exposure', status: 'proposal', source: TEMPLATE }),
  /** "HABLAR PRIMERO" */
  secondaryCta: claim({ text: 'Talk first', status: 'proposal', source: TEMPLATE }),
  note: claim({
    text: 'No commitment. Contact channels are not connected in this preview, so these buttons do not submit or navigate.',
    status: 'pending',
    source: 'README.md §12 — email, telephone and social profiles NOT CONFIRMED',
  }),
  /** "Vive España. Nosotros nos ocupamos de los impuestos." */
  script: claim({
    text: 'Live in Spain. We will look after the tax.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

/* ===========================================================================
 * 15. FOOTER — rendered by the shared WebFooter
 * ======================================================================== */

export const footer = {
  /** "Asesoría fiscal para propietarios internacionales en España." */
  description: claim({
    text: 'Tax advisory for international owners of property in Spain.',
    status: 'proposal',
    source: TEMPLATE,
    note: 'A service descriptor, not the institutional descriptor, which is NEEDS_DECISION upstream.',
  }),
  groups: [
    {
      /** "SERVICIOS" */
      title: 'Services',
      links: [
        claim({ text: 'Tax diagnostic', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Modelo 210', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Purchase and tax', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Wealth advisory', status: 'proposal', source: TEMPLATE }),
      ],
    },
    {
      /** "RECURSOS" */
      title: 'Resources',
      links: [
        claim({ text: 'Guides and articles', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Tax calendar', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Real cases', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Questions', status: 'proposal', source: TEMPLATE }),
      ],
    },
    {
      /** "SOBRE SARAH" */
      title: 'About Sarah',
      links: [
        claim({ text: 'My story', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Approach', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Collaborations', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Contact', status: 'proposal', source: TEMPLATE }),
      ],
    },
    {
      /** "LEGAL" */
      title: 'Legal',
      links: [
        claim({ text: 'Legal notice', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Privacy policy', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Terms of use', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Cookie policy', status: 'proposal', source: TEMPLATE }),
      ],
    },
  ],
  copyright: claim({
    text: 'Sarah Katerina. Internal preview, not for distribution.',
    status: 'pending',
    note: 'The template names a legal entity and a year. The entity is NEEDS_DECISION upstream, so neither is reproduced.',
  }),
  routesNote: claim({
    text: 'Navigation is laid out as approved; the destination routes are not built yet.',
    status: 'pending',
  }),
} as const;
