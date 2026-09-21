import { claim, type Claim } from '@/lib/content/claims';

/**
 * TAX ADVISORY LANDING — PROVISIONAL CONTENT FOR A VISUAL IMPLEMENTATION.
 *
 * Composition reference: "Sarah Katerina Tax Advisory.png" in
 * website/nueva web/ of the mother repository. That file is material visual de
 * propuesta. AGENTS.md §1.4 makes it the explicit implementation reference for
 * Phase 2 while leaving it subordinate to approved business, brand and legal
 * decisions.
 *
 * WHERE THIS DIVERGES FROM THE TEMPLATE, AND WHY
 * ----------------------------------------------
 * The template carries figures that this repository may not publish. Each is
 * kept as a visible, labelled slot rather than silently dropped, so a reviewer
 * can see what the composition expects and decide whether to approve it:
 *
 *   "20 años dentro de la administración fiscal"
 *       The 20-year credential IS confirmed upstream (brand-system/README.md;
 *       verbal/credential-register.csv CR-002; project owner 2026-08-12).
 *       docs/copy-and-claims-matrix.md §3 nevertheless withholds it: the master
 *       audit requires a claims dossier with source, date, permission and
 *       scope before any credential is published, and that dossier does not
 *       exist. Rendered with a visible review marker, never as bare fact.
 *
 *   "160+ compradores extranjeros"
 *       Not confirmed anywhere. decisions-log.md (2026-08-05) additionally
 *       deprioritised volume as differential proof. No figure is rendered.
 *
 *   "€ 350" / "€ 950 / año" / "€ 1.500" service prices
 *       A price exists upstream for /tax-diagnostic but publication is not
 *       approved (decision gate D2-04), and service-taxonomy.md requires live
 *       re-verification. No price appears.
 *
 *   "€ 24.500", "-18%", "€ 12.400" report and case figures
 *       Would be fabricated financial results. The dashboards render their
 *       STRUCTURE with every value replaced by an explicit ILLUSTRATIVE /
 *       SAMPLE / PENDING_APPROVAL marker.
 *
 *   "Altea · 2023 · Propietario británico", "Jávea · 2024", "Moraira · 2024"
 *       Invented clients, places, dates and outcomes. Structure only.
 *
 *   "VITA HOST" in the service-continuity strip
 *       AGENTS.md §9: D-06 is unexecuted and Property Management is held
 *       publicly. Do not integrate, link, navigate to or mention it. The
 *       fourth step is replaced by an in-scope tax step.
 *
 * LANGUAGE
 * --------
 * English is the primary acquisition language (decisions-log.md 2026-07-27).
 * The template mixes English headlines with Spanish body copy; the headlines
 * are kept verbatim and the body is authored in English. Spanish copy is NOT
 * authored here: docs/copy-and-claims-matrix.md §6 records that translating
 * unapproved English would double the review surface without adding value.
 * The EN/ES architecture is prepared; the ES content module is not written.
 */

export const PREVIEW_NOTICE = {
  label: 'VISUAL IMPLEMENTATION — PREVIEW, NOT PRODUCTION',
  body: claim({
    text: 'This page implements the approved Tax Advisory composition for human visual review. The copy is provisional, every figure is a labelled placeholder, and nothing here is approved for publication.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §1 and §9',
  }),
} as const;

export const seo = {
  title: 'Tax Advisory — visual implementation preview',
  description:
    'Internal preview of the Sarah Katerina Tax Advisory landing composition. Not a public page, not indexable, and carrying no approved claim, figure or credential.',
} as const;

/* ===========================================================================
 * 1. HEADER
 * ======================================================================== */

export interface NavAnchor {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

/**
 * In-page navigation only.
 *
 * The template's navbar (Inicio / Servicios / Quién soy / Proceso / Recursos /
 * Contacto) is a proposed public information architecture. Public navigation
 * is PENDING_APPROVAL (README.md §12) and none of those routes exists. Linking
 * to them would produce six 404s in a review preview, so the header navigates
 * within this page and says so.
 */
export const pageNav: readonly NavAnchor[] = [
  { id: 'who', label: 'Who it is for', href: '#who' },
  { id: 'calendar', label: 'Tax calendar', href: '#calendar' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'sarah', label: 'About Sarah', href: '#sarah' },
  { id: 'faq', label: 'Questions', href: '#faq' },
] as const;

export const header = {
  /** Template: "HABLAR CON SARAH". */
  cta: claim({
    text: 'Talk to Sarah',
    status: 'proposal',
    source: 'Tax Advisory template header CTA ("HABLAR CON SARAH")',
    note: 'Per-intent CTA wording is an open P0 in the master audit. Provisional.',
  }),
  navNote: claim({
    text: 'Navigation moves within this page. The public information architecture is PENDING_APPROVAL and the service routes it implies do not exist yet.',
    status: 'confirmed',
    source: 'README.md §12 — public navigation PENDING_APPROVAL',
  }),
  /**
   * The wordmark is real. BRAND-SK-001, the official clean logo, is imported
   * from the mother repository and rendered unmodified apart from a recorded
   * crop to its own alpha bounding box. See docs/tax-advisory-asset-record.md.
   */
  logoAlt: 'Sarah Katerina',
  serviceLine: claim({
    text: 'Tax Advisory',
    status: 'confirmed',
    source:
      'brand-system/services/service-taxonomy.md — "Tax Advisory — PROFESSIONAL_SERVICE" under OWN',
  }),
} as const;

/* ===========================================================================
 * 2. HERO
 * ======================================================================== */

export const hero = {
  eyebrow: claim({
    text: 'Tax advisory in Spain',
    status: 'proposal',
    source: 'Tax Advisory template eyebrow ("ASESORÍA FISCAL EN ESPAÑA")',
    note: 'Service label, not an institutional descriptor. The formal descriptor is NEEDS_DECISION upstream and is deliberately absent.',
  }),
  /** Template headline, kept verbatim. Roman line + italic line. */
  headingLead: claim({
    text: 'Spanish taxes,',
    status: 'proposal',
    source: 'Tax Advisory template hero headline',
  }),
  headingAccent: claim({
    text: 'from the inside.',
    status: 'proposal',
    source: 'Tax Advisory template hero headline (italic second line)',
    note: 'Refers to the confirmed Tax Administration credential. The credential itself is not published here pending its claims dossier.',
  }),
  body: claim({
    text: 'Clarity for non-resident owners and foreign buyers. Experience from inside Spain’s tax administration, so you can decide with confidence and avoid surprises.',
    status: 'proposal',
    review: 'tax',
    source: 'Translated from the Tax Advisory template hero body copy',
    note: 'Describes a tax service and alludes to the credential. Requires competent review before publication.',
  }),
  primaryCta: claim({
    text: 'Map my tax exposure',
    status: 'proposal',
    source: 'Tax Advisory template primary CTA ("MAP MY TAX EXPOSURE")',
    note: 'Routes to a tax-exposure tool that is NOT BUILT in the Buyer System. Rendered as a pending entry point, never as a live link.',
  }),
  secondaryCta: claim({
    text: 'See how it works',
    status: 'proposal',
    source: 'Tax Advisory template secondary CTA ("VER CÓMO FUNCIONA")',
    note: 'Routes to the process section on this page — mechanism before contact.',
  }),
  /** Template: floating chips over the hero media. */
  mediaChips: [
    claim({
      text: 'Agencia Tributaria',
      status: 'confirmed',
      source:
        'Name of the Spanish tax administration; the template renders it as a document spine label',
    }),
    claim({
      text: 'Modelo 210',
      status: 'confirmed',
      source:
        'brand-system/services/service-taxonomy.md — "Modelo 210 support — CAPABILITY / SERVICE_LINE". Name of a published Spanish tax form.',
    }),
    claim({
      text: 'Non-resident taxation',
      status: 'proposal',
      source: 'Translated from the template chip "Fiscalidad No Residentes"',
    }),
  ] as readonly Claim[],
  /** Template: script marginalia in the top-right of the hero. */
  marginNote: claim({
    text: 'Peace of mind about tax is part of living well.',
    status: 'proposal',
    source:
      'Translated from the template hero marginalia ("Tu tranquilidad fiscal también es vivir mejor.")',
  }),
  /** Template: play affordance labelled "VER VÍDEO (1 MIN)". */
  videoIntent: claim({
    text: 'Video pending',
    status: 'pending',
    source: 'docs/phase-2-decision-gate.md §5 — "final video selection or production" still open',
    note: 'The reference shows a one-minute introduction video. No approved video asset exists.',
  }),
  videoNote: claim({
    text: 'VIDEO PENDING_APPROVAL — the reference hero carries a one-minute introduction. No approved video asset exists and final video selection or production is still an open decision.',
    status: 'pending',
    source: 'docs/phase-2-decision-gate.md §5',
  }),
  /** Trust markers immediately under the hero copy. */
  markers: [
    claim({
      text: 'Real experience',
      status: 'proposal',
      source: 'Translated from the template hero marker "Experiencia real"',
    }),
    claim({
      text: 'International focus',
      status: 'proposal',
      source: 'Translated from the template hero marker "Enfoque internacional"',
    }),
    claim({
      text: 'Independent advice',
      status: 'confirmed',
      source:
        'decisions-log.md 2026-07-27 — remuneration model confirmed: paid by the buyer only. Describes remuneration, not contractual scope.',
    }),
    claim({
      text: 'Long-term peace of mind',
      status: 'proposal',
      source: 'Translated from the template hero marker "Tranquilidad a largo plazo"',
    }),
  ] as readonly Claim[],
} as const;

/* ===========================================================================
 * 3. TRUST STRIP
 * ======================================================================== */

export interface TrustItem {
  readonly id: string;
  /** Rendered large, in the template's position for a figure. */
  readonly value: Claim;
  readonly label: Claim;
}

export const trustStrip = {
  items: [
    {
      id: 'administration',
      value: claim({
        text: '20 years',
        status: 'proposal',
        review: 'none',
        source:
          'brand-system/README.md §credential; verbal/credential-register.csv CR-002; project owner 2026-08-12. The 15-year variant is SUPERSEDED.',
        note: 'CONFIRMED UPSTREAM but WITHHELD here: docs/copy-and-claims-matrix.md §3 requires a claims dossier (source, date, permission, scope) before any credential is published. Rendered with a visible review marker.',
      }),
      label: claim({
        text: 'inside Spain’s tax administration',
        status: 'proposal',
        source: 'brand-system/README.md — "20 years inside Spain\'s Tax Administration"',
      }),
    },
    {
      id: 'buyers',
      value: claim({
        text: 'PENDING',
        status: 'pending',
        note: 'The template shows "160+ compradores extranjeros". No such figure is confirmed anywhere, and decisions-log.md (2026-08-05) deprioritised volume as differential proof because a competitor publishes an indistinguishable number.',
      }),
      label: claim({
        text: 'international clients advised',
        status: 'pending',
        note: 'Label only. No figure may be rendered until one is evidenced and permitted.',
      }),
    },
    {
      id: 'modelo210',
      value: claim({
        text: 'Modelo 210',
        status: 'confirmed',
        source:
          'brand-system/services/service-taxonomy.md — "Modelo 210 support — CAPABILITY / SERVICE_LINE"',
      }),
      label: claim({
        text: 'prepared and reviewed',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template trust strip ("revisado")',
        note: 'Describes a tax filing activity. Requires competent review.',
      }),
    },
    {
      id: 'team',
      value: claim({
        text: 'One team',
        status: 'proposal',
        source: 'Translated from the template trust strip ("Un equipo")',
      }),
      label: claim({
        text: 'across the whole ownership cycle',
        status: 'proposal',
        note: 'Scope wording is provisional. The formal client mandate and contractual scope remain pending.',
      }),
    },
  ] as readonly TrustItem[],
  /** Template: script marginalia closing the strip. */
  marginNote: claim({
    text: 'Same objectives. More peace of mind.',
    status: 'proposal',
    source: 'Translated from the template strip marginalia ("Mismos objetivos. Más tranquilidad.")',
  }),
  note: claim({
    text: 'Entries marked PENDING_APPROVAL are not missing content. Every published credential, metric or coverage claim needs a dossier with source, date, permission and scope before it may appear.',
    status: 'confirmed',
    source: 'website/01-audits/00-website-audit-master-2026-09.md — P0 "Validar claims"',
  }),
} as const;

/* ===========================================================================
 * 4. PROBLEM / CONTEXT
 * ======================================================================== */

export const problem = {
  eyebrow: claim({
    text: 'What owners usually find out late',
    status: 'proposal',
  }),
  heading: claim({
    text: 'The cost of a property in Spain is not the price on the listing.',
    status: 'proposal',
    review: 'tax',
    note: 'Frames a tax and cost position. Requires competent review.',
  }),
  intro: claim({
    text: 'Owning, letting or selling a home in Spain as a non-resident creates obligations that arrive on their own schedule, in a language and a system built for residents. Most of the difficulty is not the tax itself. It is not knowing which obligations apply to you, when, and in what order.',
    status: 'proposal',
    review: 'tax',
    note: 'General description of the non-resident position. Requires competent review before publication.',
  }),
  tensions: [
    claim({
      text: 'Obligations you were never told about. Non-resident duties do not wait for someone to explain them, and they do not arrive as a reminder.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Costs that were never in the budget. Purchase taxes, annual filings and municipal charges each land at a different moment in the year.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Deadlines that have already passed. A filing period closes whether or not anyone told you it had opened.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Buying, letting and selling are three different tax positions. Advice that fits one of them can be wrong for the other two.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Two countries, one income. Which country taxes what depends on your residence and on the treaty between them.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Planning only works before the decision. After a purchase or a sale, most of the options have already closed.',
      status: 'proposal',
      review: 'tax',
    }),
  ] as readonly Claim[],
  limit: claim({
    text: 'Tax treatment depends on your residence, the region and your circumstances, and it changes over time. Nothing on this page is advice about your situation.',
    status: 'proposal',
    review: 'tax',
    note: 'A scope limit, but still a tax statement. Requires competent review.',
  }),
} as const;

/* ===========================================================================
 * 5. AUDIENCE — "Know what Spain will actually cost you."
 * ======================================================================== */

export const audience = {
  eyebrow: claim({
    text: 'Who this advisory is for',
    status: 'proposal',
    source: 'Translated from the template eyebrow ("PARA QUIÉN ES ESTA ASESORÍA")',
  }),
  heading: claim({
    text: 'Know what Spain will actually cost you.',
    status: 'proposal',
    review: 'tax',
    source: 'Tax Advisory template section headline, kept verbatim',
    note: 'Frames a cost outcome. Requires competent review.',
  }),
  body: claim({
    text: 'Tax advisory for international individuals who own, are buying, are letting or are selling property in Spain.',
    status: 'proposal',
    source: 'Translated from the template section body copy',
  }),
  profiles: [
    claim({
      text: 'Non-resident owners with a home in Spain',
      status: 'proposal',
      source:
        'Translated from the template list ("Propietarios no residentes con vivienda en España")',
    }),
    claim({
      text: 'Foreign buyers, before the arras deposit is signed',
      status: 'proposal',
      review: 'legal',
      source:
        'Translated from the template list ("Compradores extranjeros antes de firmar las arras")',
      note: 'Refers to a legal instrument. Requires competent review.',
    }),
    claim({
      text: 'Owners letting their property, long or short term',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template list ("Propietarios que alquilan su vivienda")',
    }),
    claim({
      text: 'Owners preparing to sell and planning the tax impact',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Owners with filings still outstanding',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template list ("Propietarios con declaraciones pendientes")',
    }),
    claim({
      text: 'Anyone who wants their current position reviewed before deciding anything',
      status: 'proposal',
      review: 'tax',
    }),
  ] as readonly Claim[],
  marginNote: claim({
    text: 'Local knowledge. International perspective.',
    status: 'proposal',
    source:
      'Translated from the template marginalia ("Conocimiento local. Perspectiva internacional.")',
  }),
  mediaIntent: claim({
    text: 'ASSET PENDING — Costa Blanca location photography. No authentic location image is registered in AUTHENTIC-REFERENCE-REGISTER.md; a neutral editorial composition stands in its place.',
    status: 'pending',
    source: 'brand-system/imagery/AUTHENTIC-REFERENCE-REGISTER.md — no location asset registered',
  }),
} as const;

/* ===========================================================================
 * 6. ANNUAL TAX CALENDAR
 * ======================================================================== */

export interface CalendarRow {
  readonly id: string;
  readonly label: Claim;
  /** 1-12. Structural positions copied from the template's bar placement. */
  readonly from: number;
  readonly to: number;
  readonly tone: 'navy' | 'gold' | 'sky' | 'sage' | 'sand' | 'clay';
}

/**
 * CALENDAR — STRUCTURE ONLY.
 *
 * The bar positions reproduce the TEMPLATE'S LAYOUT so the composition can be
 * reviewed. They are NOT a statement of when a Spanish filing period opens or
 * closes. Every real date is a tax statement requiring competent review
 * (AGENTS.md §11), so the rendered component labels the whole surface
 * ILLUSTRATIVE and shows no month boundary as a fact.
 */
export const calendar = {
  eyebrow: claim({
    text: 'Annual tax calendar · non-resident owner',
    status: 'proposal',
    source: 'Tax Advisory template section label, kept verbatim',
  }),
  heading: claim({
    text: 'The dates that keep your property in order.',
    status: 'proposal',
    review: 'tax',
    source:
      'Translated from the template subtitle ("Las fechas clave para mantener tu propiedad en regla.")',
  }),
  months: [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ] as const,
  rows: [
    {
      id: 'modelo210-rental',
      label: claim({
        text: 'Modelo 210 (rental income)',
        status: 'confirmed',
        source:
          'Name of a published Spanish tax form; service-taxonomy.md records Modelo 210 support as a SERVICE_LINE',
      }),
      from: 4,
      to: 7,
      tone: 'navy',
    },
    {
      id: 'modelo210-imputed',
      label: claim({
        text: 'Modelo 210 (imputed income)',
        status: 'confirmed',
        source: 'Name of a published Spanish tax form',
      }),
      from: 2,
      to: 4,
      tone: 'gold',
    },
    {
      id: 'ibi',
      label: claim({
        text: 'IBI (municipal property tax)',
        status: 'confirmed',
        source: 'Name of a Spanish municipal tax',
      }),
      from: 8,
      to: 12,
      tone: 'sage',
    },
    {
      id: 'wealth',
      label: claim({
        text: 'Wealth tax',
        status: 'confirmed',
        source:
          'Name of a Spanish tax; service-taxonomy.md lists wealth/patrimonio advisory under OWN',
      }),
      from: 3,
      to: 5,
      tone: 'sky',
    },
    {
      id: 'itp-vat',
      label: claim({
        text: 'ITP / VAT (on purchase)',
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
        text: 'Plusvalía (on sale)',
        status: 'confirmed',
        source: 'Name of a Spanish municipal capital-gains charge',
      }),
      from: 3,
      to: 5,
      tone: 'clay',
    },
  ] as readonly CalendarRow[],
  illustrativeMarker: claim({
    text: 'ILLUSTRATIVE',
    status: 'pending',
    review: 'tax',
    source: 'AGENTS.md §11 — every deadline is a claim requiring human review',
    note: 'Bar positions reproduce the reference composition and state no filing period.',
  }),
  illustrativeNote: claim({
    text: 'Bar positions reproduce the reference composition and describe no real filing period. Deadlines depend on the tax, the region, the property and your circumstances, and every date requires competent review before publication.',
    status: 'pending',
    review: 'tax',
    source: 'AGENTS.md §11 — every deadline is a claim requiring human review',
  }),
  asideMediaIntent: claim({
    text: 'ASSET PENDING — supporting location image',
    status: 'pending',
    source: 'brand-system/imagery/AUTHENTIC-REFERENCE-REGISTER.md — no location asset registered',
  }),
  aside: {
    eyebrow: claim({
      text: 'Personal calendar',
      status: 'proposal',
      source: 'Translated from the template aside ("CALENDARIO PERSONALIZADO")',
    }),
    body: claim({
      text: 'We build a calendar around your own obligations — your situation, your property, your filing profile.',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template aside body copy',
    }),
    cta: claim({
      text: 'Create my tax map',
      status: 'proposal',
      source: 'Translated from the template aside CTA ("CREAR MI MAPA FISCAL")',
    }),
  },
} as const;

/* ===========================================================================
 * 7. PROCESS — "Every tax, in the right order."
 * ======================================================================== */

export interface ProcessStage {
  readonly id: string;
  readonly number: string;
  readonly title: Claim;
  readonly body: Claim;
  readonly deliverable: Claim;
  /** Editorial symbol key. Rendered as inline SVG, never as an emoji. */
  readonly symbol: 'map' | 'home' | 'document' | 'chart' | 'coins' | 'cycle';
}

export const process = {
  heading: claim({
    text: 'Every tax, in the right order.',
    status: 'proposal',
    source: 'Tax Advisory template section headline, kept verbatim',
  }),
  intro: claim({
    text: 'A clear step for each stage of owning property in Spain.',
    status: 'proposal',
    source: 'Translated from the template section standfirst',
  }),
  stages: [
    {
      id: 'fiscal-map',
      number: '01',
      title: claim({
        text: 'Fiscal map',
        status: 'proposal',
        source: 'Template stage 01 ("FISCAL MAP")',
      }),
      body: claim({
        text: 'Your current tax position and the risks in it, set out in one picture.',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template stage description',
      }),
      deliverable: claim({
        text: 'Deliverable: initial report',
        status: 'proposal',
        source: 'Translated from the template ("Entregable: informe inicial")',
      }),
      symbol: 'map',
    },
    {
      id: 'itp-vat',
      number: '02',
      title: claim({ text: 'ITP / VAT', status: 'proposal', source: 'Template stage 02' }),
      body: claim({
        text: 'Advice on the purchase itself and on the tax treatment it triggers.',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template stage description',
      }),
      deliverable: claim({
        text: 'Deliverable: cost analysis',
        status: 'proposal',
        source: 'Translated from the template ("Entregable: análisis de costes")',
      }),
      symbol: 'home',
    },
    {
      id: 'modelo-210',
      number: '03',
      title: claim({
        text: 'Modelo 210',
        status: 'confirmed',
        source: 'brand-system/services/service-taxonomy.md — Modelo 210 support, SERVICE_LINE',
      }),
      body: claim({
        text: 'Non-resident filings for imputed and rental income, prepared and checked.',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template stage description',
      }),
      deliverable: claim({
        text: 'Deliverable: reviewed filings',
        status: 'proposal',
        source: 'Translated from the template ("Entregable: modelos revisados")',
      }),
      symbol: 'document',
    },
    {
      id: 'plusvalia',
      number: '04',
      title: claim({ text: 'Plusvalía', status: 'proposal', source: 'Template stage 04' }),
      body: claim({
        text: 'Calculation and planning for the moment you sell.',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template stage description',
      }),
      deliverable: claim({
        text: 'Deliverable: estimate and strategy',
        status: 'proposal',
        source: 'Translated from the template ("Entregable: estimación y estrategia")',
      }),
      symbol: 'chart',
    },
    {
      id: 'wealth',
      number: '05',
      title: claim({ text: 'Wealth tax', status: 'proposal', source: 'Template stage 05' }),
      body: claim({
        text: 'Your asset position in Spain, and the reliefs that apply to it.',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template stage description',
      }),
      deliverable: claim({
        text: 'Deliverable: exposure report',
        status: 'proposal',
        source: 'Translated from the template ("Entregable: informe de riesgo")',
      }),
      symbol: 'coins',
    },
    {
      id: 'annual-review',
      number: '06',
      title: claim({ text: 'Annual review', status: 'proposal', source: 'Template stage 06' }),
      body: claim({
        text: 'A yearly check so the position stays current as rules and circumstances change.',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template stage description',
      }),
      deliverable: claim({
        text: 'Deliverable: annual checklist',
        status: 'proposal',
        source: 'Translated from the template ("Entregable: checklist anual")',
      }),
      symbol: 'cycle',
    },
  ] as readonly ProcessStage[],
  timingNote: claim({
    text: 'No turnaround time is published. No confirmed figure exists for any stage.',
    status: 'pending',
    source: 'docs/copy-and-claims-matrix.md §3 — "Every turnaround time: no confirmed figure"',
  }),
} as const;

/* ===========================================================================
 * 8. REPORT PREVIEW — navy dashboard band
 * ======================================================================== */

/**
 * DASHBOARDS — STRUCTURE ONLY, EVERY VALUE SUPPRESSED.
 *
 * The template renders "€ 24.500", a "-18%" delta, a twelve-bar chart and a
 * five-line tax breakdown with amounts. Publishing any of them would fabricate
 * a financial result. The panels below keep the template's INFORMATION
 * ARCHITECTURE — what the report contains — and replace every figure with an
 * explicit marker. The chart renders a fixed, visibly abstract shape carrying
 * no axis values.
 */
export const reportPreview = {
  eyebrow: claim({
    text: 'Preview of the tax report',
    status: 'proposal',
    source: 'Translated from the template band label ("PREVIEW DEL INFORME FISCAL")',
  }),
  heading: claim({
    text: 'What the report actually contains.',
    status: 'proposal',
  }),
  intro: claim({
    text: 'Clear analysis and practical recommendations, laid out the same way every time.',
    status: 'proposal',
    source:
      'Translated from the template standfirst ("Análisis claro. Recomendaciones prácticas.")',
  }),
  panels: [
    {
      id: 'exposure',
      title: claim({
        text: 'Your tax exposure',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template panel ("Resumen de tu exposición fiscal")',
      }),
      caption: claim({
        text: 'Total estimated for the year',
        status: 'proposal',
        review: 'financial',
        source: 'Translated from the template panel caption',
      }),
      valueMarker: 'PENDING_APPROVAL',
      deltaMarker: 'SAMPLE',
    },
    {
      id: 'calendar',
      title: claim({
        text: 'Annual tax calendar',
        status: 'proposal',
        source: 'Translated from the template panel ("Calendario fiscal anual")',
      }),
      caption: claim({
        text: 'Shape only — no month carries a value',
        status: 'pending',
        review: 'tax',
      }),
      valueMarker: 'ILLUSTRATIVE',
      deltaMarker: null,
    },
    {
      id: 'treaty',
      title: claim({
        text: 'Treaty with your country of residence',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template panel ("Convenio con tu país de residencia")',
      }),
      caption: claim({
        text: 'Which country taxes what, and how double taxation is relieved',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template panel ("Evita la doble imposición")',
      }),
      valueMarker: 'PENDING_APPROVAL',
      deltaMarker: null,
    },
    {
      id: 'breakdown',
      title: claim({
        text: 'Tax breakdown',
        status: 'proposal',
        review: 'tax',
        source: 'Translated from the template panel ("Desglose de impuestos")',
      }),
      caption: claim({
        text: 'Line by line, with the basis for each',
        status: 'proposal',
        review: 'tax',
      }),
      valueMarker: 'PENDING_APPROVAL',
      deltaMarker: null,
    },
  ] as const,
  /** Template: the four-item list to the right of the panels. */
  contents: [
    claim({
      text: 'A complete report, written for your situation',
      status: 'proposal',
      source: 'Translated from the template ("Informe completo y personalizado")',
    }),
    claim({
      text: 'Delivered as a PDF and walked through on a call',
      status: 'proposal',
      source: 'Translated from the template ("En PDF y en videollamada")',
    }),
    claim({
      text: 'Scenarios and sensitivity to the assumptions',
      status: 'proposal',
      review: 'financial',
      source: 'Translated from the template ("Escenarios y sensibilidad")',
    }),
    claim({
      text: 'Step-by-step recommendations',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template ("Recomendaciones paso a paso")',
    }),
  ] as readonly Claim[],
  cta: claim({
    text: 'Request a tax review',
    status: 'proposal',
    source: 'Translated from the template band CTA ("SOLICITAR REVISIÓN FISCAL")',
  }),
  governanceNote: claim({
    text: 'Every figure in this band is suppressed. The panels show what the report contains, not a result. No amount, percentage, projection or saving appears anywhere on this page.',
    status: 'confirmed',
    source: 'AGENTS.md §2 and docs/copy-and-claims-matrix.md §3',
  }),
} as const;

/* ===========================================================================
 * 9. CONCERNS — "What you stop worrying about."
 * ======================================================================== */

export const concerns = {
  eyebrow: claim({
    text: 'What you stop worrying about',
    status: 'proposal',
    source: 'Translated from the template eyebrow ("LO QUE DEJAS DE PREOCUPARTE POR")',
  }),
  heading: claim({
    text: 'What you stop worrying about.',
    status: 'proposal',
    source: 'Tax Advisory template section headline, kept verbatim',
  }),
  body: claim({
    text: 'Less uncertainty. More time for the part of Spain you actually came for.',
    status: 'proposal',
    source: 'Translated from the template section body copy',
  }),
  items: [
    claim({
      text: 'Not knowing what you actually owe',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template list ("No saber cuánto debes realmente")',
    }),
    claim({
      text: 'Missing a Modelo 210 deadline',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template list ("Perder plazos del Modelo 210")',
    }),
    claim({
      text: 'An unexpected letter from the tax office',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template list ("Cartas inesperadas de Hacienda")',
    }),
    claim({
      text: 'Paying twice on the same income',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template list ("Pagar dos veces por el mismo impuesto")',
    }),
    claim({
      text: 'Buying without knowing the tax that comes with it',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'Selling without having planned the impact',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'An adviser who simply copies last year’s filing',
      status: 'proposal',
      source: 'Translated from the template list ("Una gestoría que solo copia el año anterior")',
      note: 'Comparative statement about other advisers. Needs review for tone: the brand principle is calm evidence, not disparagement.',
    }),
  ] as readonly Claim[],
  marginNote: claim({
    text: 'Fewer doubts. More life in Spain.',
    status: 'proposal',
    source: 'Translated from the template marginalia ("Menos dudas. Más vida en España.")',
  }),
  mediaIntent: claim({
    text: 'ASSET PENDING — Costa Blanca lifestyle photography. No authentic location asset is registered; a neutral editorial composition stands in its place.',
    status: 'pending',
    source: 'brand-system/imagery/AUTHENTIC-REFERENCE-REGISTER.md',
  }),
} as const;

/* ===========================================================================
 * 10. SERVICES
 * ======================================================================== */

export interface ServiceCard {
  readonly id: string;
  readonly title: Claim;
  readonly points: readonly Claim[];
  readonly deliverable: Claim;
  readonly cta: Claim;
  /** Governance state shown on the card when the offer is not confirmed live. */
  readonly state: 'confirmed-service' | 'pending-packaging' | 'proposed-offer';
  readonly symbol: 'document' | 'cycle' | 'home' | 'coins' | 'chart' | 'map';
}

export const services = {
  eyebrow: claim({
    text: 'Our services',
    status: 'proposal',
    source: 'Translated from the template band label ("NUESTROS SERVICIOS")',
  }),
  heading: claim({
    text: 'Start where your situation actually is.',
    status: 'proposal',
  }),
  priceNote: claim({
    text: 'NO PRICE IS PUBLISHED. A price exists upstream for the tax diagnostic, but publication is not approved and service-taxonomy.md requires live re-verification before any figure is used.',
    status: 'pending',
    source: 'brand-system/services/service-taxonomy.md; docs/phase-2-decision-gate.md D2-04',
  }),
  cards: [
    {
      id: 'tax-diagnostic',
      title: claim({
        text: 'Tax diagnostic',
        status: 'proposal',
        source:
          'brand-system/services/service-taxonomy.md — "/tax-diagnostic — PRODUCTIZED_SERVICE"; template card "TAX DIAGNOSTIC"',
        note: 'The upstream taxonomy records this offer. Its live price and state require production verification.',
      }),
      points: [
        claim({
          text: 'Review of your current position',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Análisis de tu situación actual")',
        }),
        claim({
          text: 'Identification of the risks in it',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Identificación de riesgos")',
        }),
        claim({
          text: 'Recommendations written for your case',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Recomendaciones personalizadas")',
        }),
      ],
      deliverable: claim({
        text: 'Deliverable: written diagnostic',
        status: 'proposal',
        note: 'The template states a delivery time. No turnaround figure is confirmed, so none is published.',
      }),
      cta: claim({ text: 'Review my situation', status: 'proposal' }),
      state: 'pending-packaging',
      symbol: 'document',
    },
    {
      id: 'modelo-210',
      title: claim({
        text: 'Modelo 210',
        status: 'confirmed',
        source:
          'brand-system/services/service-taxonomy.md — "Modelo 210 support — CAPABILITY / SERVICE_LINE"',
        note: 'The taxonomy adds: never present as a market category of its own without evidence. It is presented here as a service line only.',
      }),
      points: [
        claim({
          text: 'Imputed and rental income filings',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Modelo 210 (renta e imputada)")',
        }),
        claim({
          text: 'Deadlines tracked for you',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Seguimiento de plazos")',
        }),
        claim({
          text: 'Correcting filings that are outstanding',
          status: 'proposal',
          review: 'tax',
        }),
      ],
      deliverable: claim({
        text: 'Deliverable: prepared and reviewed filings',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'Understand my obligations', status: 'proposal' }),
      state: 'confirmed-service',
      symbol: 'document',
    },
    {
      id: 'annual-compliance',
      title: claim({
        text: 'Annual compliance',
        status: 'proposal',
        source:
          'Template card "ANNUAL COMPLIANCE"; closest upstream entry is "Tax Care — PROFESSIONAL_SERVICE / recurring offer"',
        note: 'service-taxonomy.md: exact live packaging and pricing require production verification.',
      }),
      points: [
        claim({
          text: 'Your filings handled across the year',
          status: 'proposal',
          review: 'tax',
        }),
        claim({
          text: 'A calendar and reminders built around your obligations',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Incluye calendario y alertas")',
        }),
        claim({
          text: 'Representation and correspondence handled',
          status: 'proposal',
          review: 'legal',
          source: 'Translated from the template card ("Representación y comunicación")',
          note: 'Implies fiscal representation. Scope requires legal review.',
        }),
      ],
      deliverable: claim({
        text: 'Deliverable: year-round compliance',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'See what it covers', status: 'proposal' }),
      state: 'pending-packaging',
      symbol: 'cycle',
    },
    {
      id: 'purchase-overlay',
      title: claim({
        text: 'Purchase + tax overlay',
        status: 'proposal',
        source:
          'Template card "PURCHASE + TAX OVERLAY"; upstream "Tax/cost review — CAPABILITY" under BUY',
      }),
      points: [
        claim({
          text: 'Full tax read on the purchase itself',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Análisis fiscal completo de la compra")',
        }),
        claim({
          text: 'ITP / VAT and the costs that travel with them',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("ITP / IVA y costes asociados")',
        }),
        claim({
          text: 'How the structure looks over the long term',
          status: 'proposal',
          review: 'tax',
          source: 'Translated from the template card ("Planificación a largo plazo")',
        }),
      ],
      deliverable: claim({
        text: 'Deliverable: pre-purchase tax read',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'Review before I commit', status: 'proposal' }),
      state: 'proposed-offer',
      symbol: 'home',
    },
    {
      id: 'wealth',
      title: claim({
        text: 'Wealth and assets',
        status: 'proposal',
        source:
          'Template process stage "WEALTH TAX"; upstream "Ownership Advisory — PROFESSIONAL_SERVICE candidate"',
      }),
      points: [
        claim({ text: 'Your asset position in Spain, mapped', status: 'proposal', review: 'tax' }),
        claim({
          text: 'Reliefs and thresholds that apply to it',
          status: 'proposal',
          review: 'tax',
        }),
        claim({ text: 'Coordination with your adviser abroad', status: 'proposal', review: 'tax' }),
      ],
      deliverable: claim({
        text: 'Deliverable: exposure report',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'Review my position', status: 'proposal' }),
      state: 'proposed-offer',
      symbol: 'coins',
    },
    {
      id: 'personal-review',
      title: claim({
        text: 'Personal tax review',
        status: 'proposal',
        source:
          'Template "revisión fiscal personalizada"; upstream "Tax Health Check — proposed PRODUCTIZED_SERVICE"',
        note: 'service-taxonomy.md: proposed CONVERSION_CONCEPT, not automatically live.',
      }),
      points: [
        claim({
          text: 'One conversation about where you actually stand',
          status: 'proposal',
          review: 'tax',
        }),
        claim({
          text: 'What is outstanding, and what it would take to close it',
          status: 'proposal',
          review: 'tax',
        }),
        claim({
          text: 'A recommended next step, with its limits stated',
          status: 'proposal',
          review: 'tax',
        }),
      ],
      deliverable: claim({
        text: 'Deliverable: reviewed position and next step',
        status: 'proposal',
        review: 'tax',
      }),
      cta: claim({ text: 'Talk to Sarah', status: 'proposal' }),
      state: 'proposed-offer',
      symbol: 'map',
    },
  ] as readonly ServiceCard[],
} as const;

/* ===========================================================================
 * 11. AUTHORITY — navy band
 * ======================================================================== */

export const authority = {
  eyebrow: claim({
    text: 'Experience makes the difference',
    status: 'proposal',
    source: 'Translated from the template eyebrow ("LA EXPERIENCIA MARCA LA DIFERENCIA")',
  }),
  heading: claim({
    text: 'The authority’s view, translated for you.',
    status: 'proposal',
    source: 'Tax Advisory template section headline, kept verbatim',
  }),
  body: claim({
    text: 'Sarah worked inside Spain’s tax administration before advising international clients on it. The value is not only knowing the rules — it is knowing how the administration actually reads them.',
    status: 'proposal',
    review: 'tax',
    note: 'DIVERGES FROM THE TEMPLATE. The template states "más de 20 años dentro de SUMA y la administración tributaria en la Comunidad Valenciana". The duration is withheld pending its claims dossier, and neither the named body nor the region is repeated: AGENTS.md §2 forbids inferring professional detail, and content/authority-content-and-video-opportunity-map.md warns against publishing specifics of that period.',
  }),
  credentialSlot: claim({
    text: 'CREDENTIAL — 20 years inside Spain’s tax administration. Confirmed upstream, withheld pending a claims dossier with source, date, permission and scope.',
    status: 'pending',
    source:
      'brand-system/README.md; verbal/credential-register.csv CR-002; docs/copy-and-claims-matrix.md §3',
  }),
  points: [
    claim({
      text: 'Independent advice',
      status: 'confirmed',
      source:
        'decisions-log.md 2026-07-27 — remuneration model confirmed. Describes remuneration only, not contractual scope.',
    }),
    claim({
      text: 'Experience from inside the administration',
      status: 'proposal',
      note: 'Rests on the credential above, which is withheld pending its dossier.',
    }),
    claim({
      text: 'International focus',
      status: 'proposal',
      source: 'Translated from the template list ("Enfoque internacional")',
    }),
    claim({
      text: 'Coordination with your adviser abroad',
      status: 'proposal',
      review: 'tax',
      source: 'Translated from the template list ("Coordinación con tu asesor en el extranjero")',
    }),
  ] as readonly Claim[],
  quote: claim({
    text: 'Tax does not have to be complicated when you have the right guide.',
    status: 'proposal',
    source: 'Translated from the template pull quote',
    note: 'Attributed to Sarah in the template. Attribution requires her confirmation before publication.',
  }),
  quoteAttribution: claim({
    text: 'ATTRIBUTION PENDING_APPROVAL',
    status: 'pending',
    note: 'The template signs this quote with Sarah’s signature. No approved signature asset exists and the wording is not confirmed as hers.',
  }),
  cta: claim({
    text: 'About Sarah',
    status: 'proposal',
    source: 'Translated from the template CTA ("CONOCER A SARAH")',
  }),
  portraitAlt:
    'Sarah Katerina, photographed in a studio portrait, standing with one hand on her hip.',
} as const;

/* ===========================================================================
 * 12. CASES — structure only
 * ======================================================================== */

export const cases = {
  heading: claim({
    text: 'Three files. Three avoided mistakes.',
    status: 'proposal',
    source: 'Tax Advisory template section headline, kept verbatim',
    note: 'Headline retained for composition review. It currently describes content that does not exist and cannot be published as written.',
  }),
  intro: claim({
    text: 'No case study appears on this page. Each of the three slots below shows the structure a published case would take.',
    status: 'confirmed',
    source:
      'AGENTS.md §2 and §11 — cases require written permission, verified figures and legal review',
  }),
  placeholders: [
    {
      id: 'owner',
      role: claim({
        text: 'Owner',
        status: 'proposal',
        source: 'Template case 1 — a non-resident owner letting a property',
      }),
      slot: claim({
        text: 'CASE PENDING_APPROVAL',
        status: 'blocked',
        note: 'The template shows "Altea · 2023 · Propietario británico con alquiler vacacional" and an exposure figure. Client, location, year, nationality and amount are all invented.',
      }),
    },
    {
      id: 'buyer',
      role: claim({
        text: 'Buyer',
        status: 'proposal',
        source: 'Template case 3 — an off-plan purchase',
      }),
      slot: claim({
        text: 'CASE PENDING_APPROVAL',
        status: 'blocked',
        note: 'The template shows "Moraira · 2024 · Compra de vivienda sobre plano". Invented.',
      }),
    },
    {
      id: 'seller',
      role: claim({
        text: 'Seller',
        status: 'proposal',
        source: 'Template case 2 — outstanding filings corrected',
      }),
      slot: claim({
        text: 'CASE PENDING_APPROVAL',
        status: 'blocked',
        note: 'The template shows "Jávea · 2024 · Modelo 210 pendiente durante 3 años" and an outcome. Invented.',
      }),
    },
  ] as const,
  requirement: claim({
    text: 'A case may be published only with written client permission, verified figures, a stated scope and legal review. None of the four exists.',
    status: 'confirmed',
    source: 'AGENTS.md §11; docs/copy-and-claims-matrix.md §3',
  }),
} as const;

/* ===========================================================================
 * 13. CONTINUITY — one team across the cycle
 * ======================================================================== */

export interface JourneyStep {
  readonly id: string;
  readonly title: Claim;
  readonly body: Claim;
  readonly symbol: 'home' | 'document' | 'chart' | 'cycle';
}

/**
 * The template's fourth step is "VITA HOST — Gestión de la propiedad".
 *
 * AGENTS.md §9 holds Property Management publicly and forbids integrating,
 * linking to, navigating to or mentioning VITA Host while D-06 is unexecuted.
 * A governance test enforces it. The step is replaced by an in-scope tax step
 * rather than being left as an empty slot, and the substitution is stated on
 * the page.
 */
export const continuity = {
  eyebrow: claim({
    text: 'One team across the whole cycle',
    status: 'proposal',
    source: 'Translated from the template band label ("UN ÚNICO EQUIPO EN TODO EL CICLO")',
  }),
  heading: claim({
    text: 'Buy. File. Plan. Review. Keep.',
    status: 'proposal',
  }),
  intro: claim({
    text: 'From the purchase onwards, each stage hands over to the next.',
    status: 'proposal',
    source: 'Translated from the template standfirst',
  }),
  steps: [
    {
      id: 'buy',
      title: claim({ text: 'Buy', status: 'proposal', source: 'Template step "COMPRAR"' }),
      body: claim({ text: 'Property advice on the purchase itself', status: 'proposal' }),
      symbol: 'home',
    },
    {
      id: 'file',
      title: claim({ text: 'File', status: 'proposal', source: 'Template step "ASESORÍA FISCAL"' }),
      body: claim({
        text: 'Filings prepared and deadlines met',
        status: 'proposal',
        review: 'tax',
      }),
      symbol: 'document',
    },
    {
      id: 'plan',
      title: claim({ text: 'Plan', status: 'proposal', source: 'Template step "INVERTIR"' }),
      body: claim({ text: 'Asset and ownership planning', status: 'proposal', review: 'tax' }),
      symbol: 'chart',
    },
    {
      id: 'review',
      title: claim({ text: 'Review', status: 'proposal' }),
      body: claim({
        text: 'An annual check that keeps the position current',
        status: 'proposal',
        review: 'tax',
      }),
      symbol: 'cycle',
    },
  ] as readonly JourneyStep[],
  substitutionNote: claim({
    text: 'The reference composition ends this sequence with a property-management step. That service is held publicly until an upstream entity decision is executed, so it is replaced here by an annual tax review.',
    status: 'confirmed',
    source: 'AGENTS.md §9 — Property Management HOLD, D-06 unexecuted',
  }),
  marginNote: claim({
    text: 'All connected. All under control.',
    status: 'proposal',
    source: 'Translated from the template marginalia ("Todo conectado. Todo bajo control.")',
  }),
} as const;

/* ===========================================================================
 * 14. FAQ
 * ======================================================================== */

export interface FaqItem {
  readonly id: string;
  readonly question: Claim;
  readonly answer: Claim;
}

export const faq = {
  eyebrow: claim({
    text: 'Quick answers',
    status: 'proposal',
    source: 'Translated from the template band label ("QUICK ANSWERS")',
  }),
  heading: claim({
    text: 'The questions we are asked most.',
    status: 'proposal',
    source: 'Translated from the template standfirst ("Resolvemos tus dudas más comunes.")',
  }),
  items: [
    {
      id: 'modelo-210',
      question: claim({ text: 'What is Modelo 210, and does it apply to me?', status: 'proposal' }),
      answer: claim({
        text: 'It is the Spanish non-resident income tax return. Whether it applies to you, in which form, and how often depends on your residence and on how the property is used. That is one of the first things a review establishes.',
        status: 'proposal',
        review: 'tax',
      }),
    },
    {
      id: 'non-resident',
      question: claim({
        text: 'I am not resident in Spain. What do I still owe?',
        status: 'proposal',
      }),
      answer: claim({
        text: 'Non-resident owners generally have obligations even when the property produces no income. The specific ones depend on your circumstances and are established case by case.',
        status: 'proposal',
        review: 'tax',
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
      id: 'purchase',
      question: claim({
        text: 'What tax do I pay when buying off-plan?',
        status: 'proposal',
        source: 'Template FAQ ("¿Qué impuestos pago al comprar sobre plano?")',
      }),
      answer: claim({
        text: 'PENDING_APPROVAL. Purchase taxation depends on the property, the seller and the region, and no answer may be published here without competent review.',
        status: 'pending',
        review: 'tax',
      }),
    },
    {
      id: 'sale',
      question: claim({ text: 'What should I plan before selling?', status: 'proposal' }),
      answer: claim({
        text: 'Selling can trigger more than one charge, and some of the options close once the sale is agreed. Planning before the commitment is the point of the exercise.',
        status: 'proposal',
        review: 'tax',
      }),
    },
    {
      id: 'wealth',
      question: claim({ text: 'Does wealth tax apply to me?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL. Thresholds and reliefs vary by region and by circumstance, and no threshold may be published without review.',
        status: 'pending',
        review: 'tax',
      }),
    },
    {
      id: 'deadlines',
      question: claim({
        text: 'I am behind on Modelo 210. Can you help?',
        status: 'proposal',
        source: 'Template FAQ ("Ya estoy detrás con el Modelo 210, ¿pueden ayudarme?")',
      }),
      answer: claim({
        text: 'Outstanding filings are a common starting point. What can be done, and what it involves, is established once the position is reviewed.',
        status: 'proposal',
        review: 'tax',
      }),
    },
    {
      id: 'documents',
      question: claim({ text: 'What documents do you need from me?', status: 'proposal' }),
      answer: claim({
        text: 'PENDING_APPROVAL. No document list is approved for publication.',
        status: 'pending',
      }),
    },
    {
      id: 'remote',
      question: claim({
        text: 'Can I do this without travelling to Spain?',
        status: 'proposal',
        source: 'Template FAQ ("¿Puedo firmar sin viajar a España?")',
      }),
      answer: claim({
        text: 'PENDING_APPROVAL. What can be done remotely, and what requires a power of attorney or a physical signature, is a legal question that has not been reviewed for publication.',
        status: 'pending',
        review: 'legal',
      }),
    },
    {
      id: 'adviser-abroad',
      question: claim({
        text: 'Can you work with my tax adviser at home?',
        status: 'proposal',
        source: 'Template FAQ ("¿Puedo trabajar con mi asesor fiscal en mi país?")',
      }),
      answer: claim({
        text: 'Yes. Working alongside an adviser in your own country is normal, and coordinating directly with them is part of the service.',
        status: 'proposal',
        source: 'Translated from the template FAQ answer',
        note: 'The template answers this affirmatively. Kept as a proposal pending Sarah’s confirmation of the working model.',
      }),
    },
    {
      id: 'cost',
      question: claim({
        text: 'What does it cost, and what is included?',
        status: 'proposal',
        source: 'Template FAQ ("¿Cuánto cuesta y qué incluye exactamente?")',
      }),
      answer: claim({
        text: 'PENDING_APPROVAL. A price exists upstream but its publication is not approved, and the live packaging requires verification.',
        status: 'pending',
        source: 'brand-system/services/service-taxonomy.md; docs/phase-2-decision-gate.md D2-04',
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
      id: 'independence',
      question: claim({ text: 'Who pays you?', status: 'proposal' }),
      answer: claim({
        text: 'You do. The remuneration model is client-paid, which is what makes the advice independent of any seller or developer.',
        status: 'confirmed',
        source:
          'decisions-log.md 2026-07-27; PROJECT-STATUS.md independence model confirmed by the project owner 2026-08-13',
        note: 'Describes remuneration only. It does not describe contractual scope, which is still pending.',
      }),
    },
  ] as readonly FaqItem[],
  schemaNote: claim({
    text: 'FAQ structured data is prepared but not emitted. Schema may only describe visible, verified content, and most answers here are pending.',
    status: 'confirmed',
    source: 'AGENTS.md §7.4; website/01-audits/seo-final-audit-2026-09.md §9',
  }),
} as const;

/* ===========================================================================
 * 15. FINAL CTA
 * ======================================================================== */

export const finalCta = {
  eyebrow: claim({
    text: 'Your peace of mind starts here',
    status: 'proposal',
    source: 'Translated from the template eyebrow ("TU TRANQUILIDAD FISCAL EMPIEZA AQUÍ")',
  }),
  heading: claim({
    text: 'Know the number before the letter arrives.',
    status: 'proposal',
    review: 'tax',
    source: 'Tax Advisory template final CTA headline, kept verbatim',
    note: 'Watch item. It must read as preparation, not as manufactured urgency — the brand principle is calm evidence.',
  }),
  body: claim({
    text: 'Look ahead, plan, and avoid the surprises.',
    status: 'proposal',
    source: 'Translated from the template ("Anticipate, planifica y evita sorpresas.")',
  }),
  reassurances: [
    claim({
      text: 'No commitment',
      status: 'proposal',
      source: 'Translated from the template ("Sin compromiso")',
    }),
    claim({
      text: 'RESPONSE TIME PENDING_APPROVAL',
      status: 'pending',
      note: 'The template promises a reply within one working day. No response-time commitment is confirmed, and publishing one would be a service promise.',
    }),
  ] as readonly Claim[],
  primaryCta: claim({
    text: 'Map my tax exposure',
    status: 'proposal',
    source: 'Tax Advisory template final CTA',
  }),
  secondaryCta: claim({
    text: 'Talk first',
    status: 'proposal',
    source: 'Translated from the template ("HABLAR PRIMERO")',
  }),
  contactNote: claim({
    text: 'CONTACT CHANNELS PENDING_APPROVAL — no confirmed email, telephone, booking link or messaging channel exists. These buttons do not submit or navigate.',
    status: 'pending',
    source: 'README.md §12 — email, telephone and social profiles NOT CONFIRMED',
  }),
  marginNote: claim({
    text: 'Live in Spain. We will look after the tax.',
    status: 'proposal',
    source:
      'Translated from the template marginalia ("Vive España. Nosotros nos ocupamos de los impuestos.")',
  }),
} as const;

/* ===========================================================================
 * 16. FOOTER
 * ======================================================================== */

export interface FooterGroup {
  readonly id: string;
  readonly title: string;
  readonly items: readonly { readonly label: string; readonly pending: boolean }[];
}

/**
 * Footer.
 *
 * The template's four link columns describe a public information architecture
 * that is PENDING_APPROVAL and whose routes do not exist. Each entry therefore
 * renders as a labelled, non-navigating slot: the reviewer can see the
 * intended structure without the preview shipping a column of dead links.
 *
 * Property Management is absent from "Services" for the reason in §13.
 */
export const footer = {
  description: claim({
    text: 'Tax advisory for international owners of property in Spain.',
    status: 'proposal',
    source: 'Translated from the template footer descriptor',
    note: 'A service descriptor, not the institutional descriptor. The formal descriptor is NEEDS_DECISION upstream and is not chosen here.',
  }),
  groups: [
    {
      id: 'services',
      title: 'Services',
      items: [
        { label: 'Tax diagnostic', pending: true },
        { label: 'Modelo 210', pending: true },
        { label: 'Purchase and tax', pending: true },
        { label: 'Wealth advisory', pending: true },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      items: [
        { label: 'Guides and articles', pending: true },
        { label: 'Tax calendar', pending: true },
        { label: 'Cases', pending: true },
        { label: 'Questions', pending: true },
      ],
    },
    {
      id: 'about',
      title: 'About Sarah',
      items: [
        { label: 'Her background', pending: true },
        { label: 'Approach', pending: true },
        { label: 'Collaborations', pending: true },
        { label: 'Contact', pending: true },
      ],
    },
    {
      id: 'legal',
      title: 'Legal',
      items: [
        { label: 'Legal notice', pending: true },
        { label: 'Privacy policy', pending: true },
        { label: 'Terms of use', pending: true },
        { label: 'Cookie policy', pending: true },
      ],
    },
  ] as readonly FooterGroup[],
  legalNote: claim({
    text: 'Legal entity, registered address, company number, contact channels and social profiles are all PENDING_APPROVAL. No copyright line is asserted, because the entity that would hold it is not confirmed.',
    status: 'confirmed',
    source: 'README.md §12; AGENTS.md §2',
  }),
} as const;
