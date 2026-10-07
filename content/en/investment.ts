import { claim, type Claim } from '@/lib/content/claims';

/**
 * Investment landing — Phase 2C copy.
 *
 * SOURCE OF COPY — approved by Juanma on 2026-09-21.
 *
 * The Investment template (`website/nueva web/Sarah Katerina Investment.png`)
 * is the approved copy source for this landing. Its headlines, section names,
 * descriptions, CTAs and editorial voice are reused directly. The template is
 * in Spanish and this route is English, so each string is a faithful editorial
 * translation that preserves intent, structure and rhythm. Original and
 * adaptation are recorded in `docs/copy-and-claims-matrix.md`.
 *
 * WHAT IS STILL WITHHELD
 *
 * The approval covers the template's *narrative*, not its figures. The template
 * displays `160+ compradores`, `Análisis en 48 h`, `6,8%`, `€24.500`,
 * `€850.000`, `+42%`, `6,1%`, `2,8x`, three testimonials with client countries,
 * and a legal entity in its copyright line. None of those is confirmed in any
 * governed document, so per the Phase 2C brief §10 they are either withheld,
 * marked pending, or rendered as clearly labelled illustrative sample data.
 *
 * The `status` on each claim records which of the two it is.
 */

/** `status: 'proposal'` + this source = reused from the approved template. */
const TEMPLATE = 'Investment template — approved copy source (Juanma, 2026-09-21)';

/** Copy added by the Phase 2E visual content upgrade. Pending Juanma's review. */
const PHASE_2E_REPORT = 'Phase 2E proposed copy (brief 2026-10-23) — pending Juanma';


export const hero = {
  /** "INVERSIÓN CON SENTIDO" */
  eyebrow: claim({ text: 'Investment with judgement', status: 'proposal', source: TEMPLATE }),
  /**
   * Was "Properties. Data. Better decisions." — Sarah (REVISION
   * WEB-investment.docx): "no me convence. Falta la parte emotiva". New
   * English copy drafted 2026-09-30 from option 1 of
   * docs/phase-2h-juanma-review.md §4; open for Sarah (SR-036).
   */
  heading: claim({
    text: 'Invest in Spain with someone on your side.',
    status: 'proposal',
    note: 'New copy after Sarah rejected the template headline; SR-036.',
  }),
  /** "Asesoramiento independiente para compradores extranjeros en la Costa Blanca. Análisis, fiscalidad y acompañamiento completo para invertir con seguridad y rentabilidad." */
  /**
   * 2026-09-30: rewritten to carry the human side Sarah asked for (fear of a
   * bad decision, protection, one person with you), with no guarantee. The
   * earlier template lead is in git history. New copy, open for Sarah (SR-036).
   */
  lead: claim({
    text: 'A property in Spain can be a great decision or an expensive mistake. Sarah works on your side: she analyses the property, the numbers and the tax side before you commit, and stays with you through the purchase.',
    status: 'proposal',
    note: 'New copy; 2026-10-01: "Sarah is paid only by you" became "Sarah works on your side" after Sarah rejected the "Sarah is paid…" framing on the Home. SR-036.',
  }),
  primaryCta: claim({ text: 'Request an analysis', status: 'proposal', source: TEMPLATE }),
  /** "VER CÓMO FUNCIONA" */
  secondaryCta: claim({ text: 'See how it works', status: 'proposal', source: TEMPLATE }),
  /** Template script accent: "A better life, a smarter investment." — already English. */
  script: claim({
    text: 'A better life, a smarter investment.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** Template: "Altea, Costa Blanca" — a specific town is not claimed. */
  locationLabel: claim({
    text: 'Costa Blanca, Spain',
    status: 'confirmed',
    source: 'seo-final-audit-2026-09.md §6',
  }),
  imageAlt: claim({
    text: 'Sarah Katerina, photographed standing in a dark tailored suit against a plain studio background.',
    status: 'confirmed',
    source: 'AUTH-SK-001 — authentic identity reference',
  }),
  /** Template hero inline row: 160+ compradores · 20 años · Análisis en 48 h · Modelo financiero */
  signals: [
    {
      icon: 'tax',
      value: claim({
        text: '20 years',
        status: 'confirmed',
        source: 'credential-register.csv CR-002, confirmed 2026-08-12',
      }),
      note: claim({
        text: 'inside SUMA Gestión Tributaria, Alicante',
        status: 'confirmed',
        source: 'Owner direction 2026-10-07: name SUMA Gestión Tributaria accurately (duration: CR-002)',
      }),
    },
    {
      icon: 'independence',
      value: claim({
        text: 'Buyer-side only',
        status: 'confirmed',
        source: 'decisions-log.md 2026-07-27',
      }),
      note: claim({
        text: 'no seller or agency pays for the advice',
        status: 'confirmed',
        source: 'decisions-log.md 2026-07-27',
      }),
    },
    {
      icon: 'financialModel',
      value: claim({ text: 'Full financial model', status: 'proposal', source: TEMPLATE }),
      note: claim({
        text: 'with scenarios and risk analysis',
        status: 'proposal',
        source: TEMPLATE,
      }),
    },
  ],
} as const;

/** Hero dashboard. Template shows 6,8% and €24.500 — both replaced with samples. */
export const heroDashboard = {
  title: claim({ text: 'Investment snapshot', status: 'proposal', source: TEMPLATE }),
  property: claim({ text: 'Sample villa, Costa Blanca', status: 'proposal' }),
  rows: [
    { label: claim({ text: 'Net yield', status: 'proposal', source: TEMPLATE }), value: '6.0%' },
    {
      label: claim({ text: 'Annual cash flow', status: 'proposal', source: TEMPLATE }),
      value: '€24,000',
    },
  ],
  horizon: {
    label: claim({ text: 'Horizon', status: 'proposal', source: TEMPLATE }),
    value: '5 years',
  },
  foot: claim({
    text: 'Sample figures shown to illustrate the report format. Not a client result, a projection or a market benchmark.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §5',
  }),
} as const;

/**
 * Trust strip.
 *
 * REDUCED on 2026-09-22. The hero already states "20 years", "Buyer-side only"
 * and "Full financial model"; repeating them in the band immediately below was
 * the duplication the visual review flagged.
 *
 * Only what the hero does not say remains. No credential was invented to
 * refill the band — the instruction was to shorten it rather than pad it — so
 * the strip is now two entries plus the editorial line, with more air.
 *
 * Both remaining values are `pending`: the template's "160+ compradores" and
 * "Análisis en 48 h" are unconfirmed figures. They render with a discreet
 * pending mark, never as facts.
 */
export const trustStrip: readonly {
  icon: string;
  value: Claim;
  note: Claim;
}[] = [
  {
    icon: 'buyer',
    value: claim({
      text: 'International buyers',
      status: 'pending',
      note: 'Template shows "160+". Volume was deprioritised upstream as differential proof.',
    }),
    note: claim({ text: 'advised across the Costa Blanca', status: 'proposal', source: TEMPLATE }),
  },
  {
    icon: 'clock',
    value: claim({
      text: 'Fast turnaround',
      status: 'pending',
      note: 'Template shows "Análisis en 48 h". No turnaround is confirmed.',
    }),
    note: claim({
      text: 'from the first information you send',
      status: 'proposal',
      source: TEMPLATE,
    }),
  },
] as const;

/** Template script: "Más que propiedades. Mejores decisiones." */
export const trustScript = claim({
  text: 'More than properties. Better decisions.',
  status: 'proposal',
  source: TEMPLATE,
});

export const approach = {
  /** "POR QUÉ EXISTIMOS" */
  eyebrow: claim({ text: 'Why we exist', status: 'proposal', source: TEMPLATE }),
  /** "Un puente entre oportunidades y tranquilidad." */
  title: claim({
    text: 'A bridge between opportunity and peace of mind.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** "Existimos para ayudar a compradores internacionales a tomar decisiones de inversión informadas en la Costa Blanca, combinando análisis riguroso, experiencia fiscal y acompañamiento personal. Creemos en una forma más transparente, inteligente y humana de invertir en España." */
  body: [
    claim({
      text: 'We exist to help international buyers make informed investment decisions on the Costa Blanca, combining rigorous analysis, tax experience and personal support.',
      status: 'proposal',
      source: TEMPLATE,
      review: 'financial',
    }),
    claim({
      text: 'We believe in a more transparent, more intelligent and more human way of investing in Spain.',
      status: 'proposal',
      source: TEMPLATE,
    }),
  ],
  /** Template image card: "COSTA BLANCA · Vivir. Invertir. Pertenecer." */
  territoryLabel: claim({ text: 'Costa Blanca', status: 'proposal', source: TEMPLATE }),
  territoryScript: claim({ text: 'Live. Invest. Belong.', status: 'proposal', source: TEMPLATE }),
  objections: [
    {
      icon: 'analysis',
      title: claim({ text: 'Buying on emotion', status: 'proposal', source: TEMPLATE }),
      /**
       * Sarah (REVISION WEB-investment.docx): the former line "The view sells
       * the property. The numbers decide whether it was a good decision." made
       * no sense; she proposed "Una oportunidad solo es buena si encaja con tus
       * objetivos, no con los de quien te la vende." English adaptation of her
       * sentence (2026-09-30), relayed by Juanma.
       */
      /**
       * 2026-10-01: Sarah's sentence ("An opportunity is only good if it fits
       * your goals…") already titles the next-step band; repeating it here is
       * removed (Juanma). The line she rejected ("The view sells the
       * property…") does not return. New wording, open for Sarah (SR-083).
       */
      body: claim({
        text: 'First impressions sell quickly. The analysis checks whether the property still fits your plan once they fade.',
        status: 'proposal',
        note: 'New copy replacing a repetition of Sarah’s line; SR-083.',
      }),
    },
    {
      icon: 'document',
      title: claim({ text: 'Trusting the brochure', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Marketing material states a headline price and an optimistic occupancy. Neither is a commitment.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      icon: 'financialModel',
      title: claim({ text: 'Overstating the return', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Gross yield ignores the costs that land on you. Net is the figure worth comparing.',
        status: 'proposal',
        review: 'returns',
      }),
    },
    {
      icon: 'taxOverlay',
      title: claim({ text: 'Not calculating the tax', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Spain can tax the higher of the agreed price, the declared value and the cadastral reference value.',
        status: 'proposal',
        review: 'tax',
        source: 'Buyer System FISCAL_SOURCE_REGISTER.md — RDL 1/1993 art. 10.2',
      }),
    },
    {
      icon: 'risk',
      title: claim({ text: 'Never modelling scenarios', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'One set of assumptions is a hope. Several, including the uncomfortable ones, is an analysis.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      icon: 'clock',
      title: claim({ text: 'Finding the risk too late', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'The deposit turns a maybe into a commitment with a penalty attached.',
        status: 'proposal',
        review: 'legal',
      }),
    },
  ],
} as const;

export const doors = {
  /** "ELIGE TU PUNTO DE PARTIDA" */
  eyebrow: claim({ text: 'Choose your starting point', status: 'proposal', source: TEMPLATE }),
  /** "Dos caminos. Un mismo objetivo: una inversión bien fundamentada." */
  /**
   * Was "Two paths. One goal: an investment built on evidence." — Sarah:
   * "NO me convence. Falta emoción." New copy drafted 2026-09-30 from option 3
   * of docs/phase-2h-juanma-review.md §4; open for Sarah (SR-041).
   */
  title: claim({
    text: 'Wherever you start, we start with your goals.',
    status: 'proposal',
    note: 'New copy after Sarah rejected the template headline; SR-041.',
  }),
  /** Template script: "Oportunidades tangibles. Decisiones con confianza." */
  script: claim({
    text: 'Tangible opportunities. Decisions with confidence.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  items: [
    {
      id: 'have-property',
      visual: 'built' as const,
      /** "TRAIGO UNA PROPIEDAD" */
      title: claim({ text: 'I have a property in mind', status: 'proposal', source: TEMPLATE }),
      eyebrow: claim({ text: 'Analysis', status: 'proposal' }),
      /** "Analizamos la propiedad que ya tienes en mente con un enfoque técnico, fiscal y financiero." */
      body: claim({
        text: 'We analyse the property you already have in mind with a technical, tax and financial approach.',
        status: 'proposal',
        source: TEMPLATE,
      }),
      points: [
        claim({
          text: 'Complete analysis',
          status: 'proposal',
          source: TEMPLATE,
          note: 'Template says "en 48 h"; the timing is withheld.',
        }),
        claim({ text: 'Viability report', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Risks and opportunities', status: 'proposal', source: TEMPLATE }),
      ],
      /** "ANALIZAR MI PROPIEDAD" */
      cta: claim({ text: 'Analyse my property', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'opportunities',
      visual: 'coast' as const,
      /** "QUIERO VER OPORTUNIDADES" */
      title: claim({ text: 'I want to see opportunities', status: 'proposal', source: TEMPLATE }),
      eyebrow: claim({ text: 'Selection', status: 'proposal' }),
      /** "Te mostramos una selección de oportunidades que encajan con tus objetivos de inversión." */
      body: claim({
        text: 'We show you a selection of opportunities that fit your investment objectives.',
        status: 'proposal',
        source: TEMPLATE,
      }),
      points: [
        claim({ text: 'Pre-analysed properties', status: 'proposal', source: TEMPLATE }),
        claim({
          text: 'Filtered by return and risk',
          status: 'proposal',
          source: TEMPLATE,
          review: 'returns',
        }),
        claim({ text: 'Access to off-market opportunities', status: 'proposal', source: TEMPLATE }),
      ],
      /** "VER OPORTUNIDADES" */
      cta: claim({ text: 'See opportunities', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'talk',
      visual: 'plot' as const,
      title: claim({ text: 'I want to talk first', status: 'proposal' }),
      eyebrow: claim({ text: 'Orientation', status: 'proposal' }),
      body: claim({
        text: 'You are earlier than that. Understand how the process works, and use the free calculators, before paying for anything.',
        status: 'proposal',
        note: 'Third door added for CRO. Not in the two-door template.',
      }),
      points: [
        claim({ text: 'No obligation and no fee to talk', status: 'proposal' }),
        claim({ text: 'Plain answers on scope and limits', status: 'proposal' }),
        claim({ text: 'Free calculators you can use now', status: 'proposal' }),
      ],
      cta: claim({ text: 'Talk to Sarah first', status: 'proposal' }),
    },
  ],
} as const;

export const assetTypes = {
  /** "TIPOS DE ACTIVOS" */
  eyebrow: claim({ text: 'Asset types', status: 'proposal', source: TEMPLATE }),
  /** "Distintas estrategias. Un mismo análisis riguroso." */
  title: claim({
    text: 'Different strategies. One rigorous analysis.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  items: [
    {
      id: 'residential',
      icon: 'property' as const,
      visual: 'built' as const,
      /** "RESIDENCIAL — Analizamos para uso propio o alquiler" */
      title: claim({ text: 'Residential', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Analysed for your own use or for letting.',
        status: 'proposal',
        source: TEMPLATE,
      }),
      analysed: claim({
        text: 'Purchase and running costs, occupancy assumptions, net position after tax.',
        status: 'proposal',
        review: 'financial',
      }),
      risk: claim({
        text: 'Licence, community and habitability constraints.',
        status: 'proposal',
        review: 'legal',
      }),
      deliverable: claim({ text: 'Cost build-up and net-yield model', status: 'proposal' }),
      cta: claim({ text: 'See opportunities', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'land',
      icon: 'land' as const,
      visual: 'plot' as const,
      /** "SUELO — Terrenos con potencial de desarrollo" */
      title: claim({ text: 'Land', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Plots with development potential.',
        status: 'proposal',
        source: TEMPLATE,
      }),
      analysed: claim({
        text: 'Planning status, buildable area, programme and cost to permit.',
        status: 'proposal',
        review: 'legal',
      }),
      risk: claim({
        text: 'Classification, access and services.',
        status: 'proposal',
        review: 'legal',
      }),
      deliverable: claim({ text: 'Feasibility note and risk register', status: 'proposal' }),
      cta: claim({ text: 'See opportunities', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'commercial',
      icon: 'commercial' as const,
      visual: 'district' as const,
      /** "COMERCIAL — Locales, oficinas y activos en renta" */
      title: claim({ text: 'Commercial', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Retail units, offices and let assets.',
        status: 'proposal',
        source: TEMPLATE,
      }),
      analysed: claim({
        text: 'Lease terms, tenant quality, indexation and void assumptions.',
        status: 'proposal',
        review: 'financial',
      }),
      risk: claim({
        text: 'Covenant strength and reinstatement obligations.',
        status: 'proposal',
        review: 'legal',
      }),
      deliverable: claim({ text: 'Income model and lease summary', status: 'proposal' }),
      cta: claim({ text: 'See opportunities', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'redevelopment',
      icon: 'redevelopment' as const,
      visual: 'works' as const,
      /** "REDEVELOPMENT — Activo con potencial de revalorización" */
      title: claim({ text: 'Redevelopment', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Assets with potential to be repositioned.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'returns',
        note: 'Template says "potencial de revalorización"; "revalorización" softened to avoid implying a return.',
      }),
      analysed: claim({
        text: 'Works budget, contingency, programme and exit assumptions.',
        status: 'proposal',
        review: 'financial',
      }),
      risk: claim({ text: 'Cost overrun and permitting delay.', status: 'proposal' }),
      deliverable: claim({ text: 'Budget model with downside cases', status: 'proposal' }),
      cta: claim({ text: 'See opportunities', status: 'proposal', source: TEMPLATE }),
    },
  ],
} as const;

/** Copy added with the territory map film (Phase 2F). Pending Juanma's review. */
const PHASE_2F = 'Phase 2F proposed copy (brief 2026-09-23) — pending Juanma';

/**
 * The territory map film that opens the asset types band. It reads place,
 * asset, analysis and decision as one chain, so the four cards below read as
 * the analysis of each kind of asset rather than as a catalogue.
 */
export const territoryMap = {
  label: claim({ text: 'Costa Blanca', status: 'proposal', source: PHASE_2F }),
  title: claim({
    text: 'Where it is, what it is, and whether it deserves to go further.',
    status: 'proposal',
    source: PHASE_2F,
  }),
  steps: [
    {
      id: 'place',
      title: claim({ text: 'Place', status: 'proposal', source: PHASE_2F }),
      body: claim({
        text: 'The Costa Blanca coast, north to south, as the map shows it.',
        status: 'proposal',
        source: PHASE_2F,
      }),
    },
    {
      id: 'asset',
      title: claim({ text: 'Asset', status: 'proposal', source: PHASE_2F }),
      body: claim({
        text: 'Four kinds of asset, each with its own risks.',
        status: 'proposal',
        source: PHASE_2F,
      }),
    },
    {
      id: 'analysis',
      title: claim({ text: 'Analysis', status: 'proposal', source: PHASE_2F }),
      body: claim({
        text: 'One method for all four: costs, tax, risk and exit.',
        status: 'proposal',
        source: PHASE_2F,
      }),
    },
    {
      id: 'decision',
      title: claim({ text: 'Decision', status: 'proposal', source: PHASE_2F }),
      body: claim({
        text: 'Whether the opportunity is worth pursuing, before you commit.',
        status: 'proposal',
        source: PHASE_2F,
      }),
    },
  ],
  disclaimer: claim({
    text: 'Illustrative relief map, not official cartography. It shows where the analysis applies and the kinds of asset it covers — not properties for sale, and not a forecast.',
    status: 'proposal',
    source: PHASE_2F,
  }),
} as const;

export const process = {
  /** "CÓMO ANALIZAMOS" */
  eyebrow: claim({ text: 'How we analyse', status: 'proposal', source: TEMPLATE }),
  /** "Un proceso claro. Decisiones con fundamento." */
  title: claim({
    text: 'A clear process. Decisions with a basis.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** Template script: "Datos hoy. Tranquilidad mañana." */
  script: claim({
    text: 'Data today. Peace of mind tomorrow.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  steps: [
    {
      id: 'market-screen',
      icon: 'market' as const,
      title: claim({ text: 'Market screen', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Market analysis and comparables.',
        status: 'proposal',
        source: TEMPLATE,
      }),
      deliverable: claim({ text: 'Market report', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'due-diligence',
      icon: 'dueDiligence' as const,
      title: claim({ text: 'Due diligence', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Legal, technical and planning review.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'legal',
      }),
      deliverable: claim({ text: 'Risk checklist', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'financial-modelling',
      icon: 'financialModel' as const,
      title: claim({ text: 'Financial modelling', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Scenarios and return analysis.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'financial',
      }),
      deliverable: claim({ text: 'Working model', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'tax-overlay',
      icon: 'taxOverlay' as const,
      title: claim({ text: 'Tax overlay', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Tax treatment for non-residents.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
        note: 'Template says "Optimización fiscal"; "optimisation" implies an outcome, so it is stated as treatment.',
      }),
      deliverable: claim({ text: 'Tax report', status: 'proposal', source: TEMPLATE }),
    },
    {
      id: 'decision-report',
      icon: 'report' as const,
      title: claim({ text: 'Decision report', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Conclusions and recommendation.',
        status: 'proposal',
        source: TEMPLATE,
      }),
      deliverable: claim({ text: 'Final report', status: 'proposal', source: TEMPLATE }),
    },
  ],
} as const;

export const report = {
  /** "PREVIEW DEL INFORME COMPLETO" */
  eyebrow: claim({ text: 'Preview of the full report', status: 'proposal', source: TEMPLATE }),
  /** "Informes claros, visuales y orientados a la toma de decisiones." */
  title: claim({
    text: 'Clear, visual reports built for decisions.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  subtitle: claim({
    text: 'Every panel below shows the format of the deliverable using illustrative sample values. None of it is a client result, a projection or a benchmark.',
    status: 'confirmed',
    source: 'docs/phase-2-visual-implementation-contract.md §5',
  }),
  /** Template: "Resumen de la inversión — Villa en Altea — €850.000 — 6,8% — 5 años" */
  summary: {
    title: claim({ text: 'Investment summary', status: 'proposal', source: TEMPLATE }),
    property: claim({
      text: 'Sample villa, Costa Blanca',
      status: 'proposal',
      note: 'Template names "Villa en Altea". A specific town is not claimed.',
    }),
    rows: [
      {
        label: claim({ text: 'Purchase price', status: 'proposal', source: TEMPLATE }),
        value: '€850,000',
      },
      { label: claim({ text: 'Net yield', status: 'proposal', source: TEMPLATE }), value: '6.0%' },
      { label: claim({ text: 'Horizon', status: 'proposal', source: TEMPLATE }), value: '5 years' },
    ],
    status: claim({ text: 'Report status', status: 'proposal' }),
    statusValue: claim({ text: 'Sample', status: 'proposal' }),
    note: claim({ text: 'The whole case on one page.', status: 'proposal', note: PHASE_2E_REPORT }),
  },
  /**
   * Phase 2E report explorer (brief 2026-10-23, §6): the decision each panel
   * supports. Proposed copy — describes the purpose of a panel, never a result.
   */
  decisions: {
    summary: claim({
      text: 'Whether the case is worth taking further: price, net yield and horizon, read together.',
      status: 'proposal',
      review: 'financial',
      note: PHASE_2E_REPORT,
    }),
    'cash-flow': claim({
      text: 'Whether the property can carry itself through a weak year, once every cost is counted.',
      status: 'proposal',
      review: 'financial',
      note: PHASE_2E_REPORT,
    }),
    distribution: claim({
      text: 'How wide the range of outcomes is — not only the average you are shown.',
      status: 'proposal',
      review: 'financial',
      note: PHASE_2E_REPORT,
    }),
    seasonality: claim({
      text: 'Which months carry the income and which ones only carry costs.',
      status: 'proposal',
      review: 'financial',
      note: PHASE_2E_REPORT,
    }),
    risk: claim({
      text: 'Which risks would change the decision, and how each one is rated before you commit.',
      status: 'proposal',
      note: PHASE_2E_REPORT,
    }),
  },
  explorerLabel: claim({ text: 'Sample report panels', status: 'proposal', note: PHASE_2E_REPORT }),
  cards: [
    {
      id: 'cash-flow',
      title: claim({ text: 'Annual cash flows', status: 'proposal', source: TEMPLATE }),
      note: claim({
        text: 'Income against costs, year by year.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'distribution',
      title: claim({ text: 'Distribution of outcomes', status: 'proposal', source: TEMPLATE }),
      note: claim({
        text: 'Where the result lands across many runs.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'seasonality',
      title: claim({ text: 'Income seasonality', status: 'proposal', source: TEMPLATE }),
      note: claim({
        text: 'How letting income moves across the year.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'risk',
      title: claim({ text: 'Risk assessment', status: 'proposal', source: TEMPLATE }),
      note: claim({ text: 'Named risks, rated and explained.', status: 'proposal' }),
    },
  ],
  /** Template risk rows: mercado, regulatorio, liquidez, construcción, fiscal. Ratings withheld. */
  risks: [
    { label: claim({ text: 'Market', status: 'proposal', source: TEMPLATE }), value: 'Sample' },
    { label: claim({ text: 'Regulatory', status: 'proposal', source: TEMPLATE }), value: 'Sample' },
    { label: claim({ text: 'Liquidity', status: 'proposal', source: TEMPLATE }), value: 'Sample' },
    {
      label: claim({ text: 'Construction', status: 'proposal', source: TEMPLATE }),
      value: 'Sample',
    },
    { label: claim({ text: 'Tax', status: 'proposal', source: TEMPLATE }), value: 'Sample' },
  ],
  /** "PDF profesional · Modelo en Excel · Escenarios y sensibilidad" */
  deliverables: [
    {
      icon: 'document' as const,
      text: claim({ text: 'Professional PDF', status: 'proposal', source: TEMPLATE }),
    },
    {
      icon: 'financialModel' as const,
      text: claim({ text: 'Spreadsheet model', status: 'proposal', source: TEMPLATE }),
    },
    {
      icon: 'risk' as const,
      text: claim({ text: 'Scenarios and sensitivity', status: 'proposal', source: TEMPLATE }),
    },
  ],
  /** "VER INFORME DE EJEMPLO" */
  cta: claim({
    text: 'See a sample report',
    status: 'proposal',
    source: TEMPLATE,
    note: 'No sample report asset exists yet.',
  }),
  /** "Informe completo y personalizado para cada propiedad." */
  ctaNote: claim({
    text: 'A complete report, personalised for each property.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

export const scenarios = {
  /** "ESCENARIOS, RIESGO Y RENTABILIDAD" */
  eyebrow: claim({ text: 'Scenarios, risk and return', status: 'proposal', source: TEMPLATE }),
  /** "Lo que realmente importa." */
  kicker: claim({ text: 'What really matters.', status: 'proposal', source: TEMPLATE }),
  /** "Las suposiciones y el riesgo a la baja importan más que las promesas del folleto." */
  title: claim({
    text: 'Assumptions and downside risk matter more than brochure promises.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'financial',
  }),
  /** "Analizamos múltiples escenarios, estrés de mercado y sensibilidad a variables clave como precio, ocupación, costes y fiscalidad. Nuestro objetivo es evitar sorpresas y ayudarte a entender el verdadero potencial de cada inversión." */
  body: claim({
    text: 'We model multiple scenarios, stress the market assumptions and test sensitivity to the variables that move the answer: price, occupancy, costs and tax. The aim is to avoid surprises and help you understand what each investment can really do.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'financial',
  }),
  /** Template script: "Invertir bien también es saber qué puede salir mal." */
  script: claim({
    text: 'Investing well also means knowing what can go wrong.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  chartTitle: claim({
    text: 'Projected net position by scenario',
    status: 'proposal',
    source: TEMPLATE,
  }),
  legend: [
    {
      key: 'optimistic',
      label: claim({ text: 'Optimistic', status: 'proposal', source: TEMPLATE }),
    },
    { key: 'base', label: claim({ text: 'Base', status: 'proposal', source: TEMPLATE }) },
    {
      key: 'pessimistic',
      label: claim({ text: 'Pessimistic', status: 'proposal', source: TEMPLATE }),
    },
  ],
  items: [
    {
      icon: 'market' as const,
      title: claim({ text: 'Scenarios', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Optimistic, base and pessimistic.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'financial',
      }),
    },
    {
      icon: 'risk' as const,
      title: claim({ text: 'Risk', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Sensitivity analysis.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'financial',
      }),
    },
    {
      icon: 'financialModel' as const,
      title: claim({ text: 'Net return', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'After every cost.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'returns',
      }),
    },
    {
      icon: 'exit' as const,
      title: claim({ text: 'Exit', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Strategy and investment horizon.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'financial',
      }),
    },
  ],
} as const;

export const authority = {
  /** "EL CONOCIMIENTO DETRÁS DE CADA DECISIÓN" */
  eyebrow: claim({
    text: 'The knowledge behind every decision',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** "Experiencia, independencia y un enfoque personal." */
  title: claim({
    text: 'Experience, independence and a personal approach.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** "Con más de 20 años dentro de la administración fiscal y una profunda experiencia en el mercado inmobiliario de la Costa Blanca, ayudo a compradores internacionales a invertir con claridad y confianza." */
  body: claim({
    text: 'With 20 years inside SUMA Gestión Tributaria, the public body that manages local taxes in the province of Alicante, and deep experience of the Costa Blanca property market, I help international buyers invest with clarity and confidence.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'tax',
    note: 'Template says "más de 20 años". The confirmed credential is exactly 20 years, so "más de" is dropped.',
  }),
  imageAlt: claim({
    text: 'Portrait of Sarah Katerina.',
    status: 'confirmed',
    source: 'AUTH-SK-002',
  }),
  /** Template: "20+ años de experiencia · Enfoque independiente · Visión fiscal y financiera · Acompañamiento personalizado" */
  points: [
    {
      icon: 'tax' as const,
      text: claim({
        text: '20 years of experience',
        status: 'confirmed',
        source: 'credential-register.csv CR-002',
      }),
    },
    {
      icon: 'independence' as const,
      text: claim({
        text: 'Independent approach',
        status: 'confirmed',
        source: 'decisions-log.md 2026-07-27',
      }),
    },
    {
      icon: 'analysis' as const,
      text: claim({
        text: 'Tax and financial view in one place',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
    },
    {
      icon: 'buyer' as const,
      text: claim({ text: 'Personal support throughout', status: 'proposal', source: TEMPLATE }),
    },
  ],
  /** Template quote: "Inversiones más inteligentes. Vidas más plenas." */
  quote: claim({
    text: 'Smarter investments. Fuller lives.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  signaturePending: claim({
    text: 'Signature asset pending',
    status: 'pending',
    note: 'The template shows a handwritten signature. No signature asset exists and one may not be drawn.',
  }),
  /** "CONOCER A SARAH" */
  cta: claim({ text: 'Meet Sarah', status: 'proposal', source: TEMPLATE }),
  limits: [
    claim({
      text: 'An analysis is not a valuation, a building survey or legal representation.',
      status: 'proposal',
      review: 'legal',
    }),
    claim({
      text: 'Tax treatment depends on your residence, the region and your circumstances.',
      status: 'proposal',
      review: 'tax',
    }),
    claim({
      text: 'No modelled figure is a promise. Models describe assumptions, not outcomes.',
      status: 'proposal',
      review: 'returns',
    }),
  ],
} as const;

export const cases = {
  /** "TRES OPERACIONES. TRES DECISIONES." */
  eyebrow: claim({
    text: 'Three operations. Three decisions.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  title: claim({ text: 'Case studies', status: 'proposal' }),
  /** Template subtitle is "Resultados reales. Historias reales." — a claim about having results. */
  subtitle: claim({
    text: 'Each case states the asset, the location, the decision taken and the result. None is published until the client has given written permission and the figures have been verified.',
    status: 'proposal',
    note: 'Template subtitle "Resultados reales. Historias reales." is not reproduced: it asserts results that are not yet evidenced.',
  }),
  /** "VER MÁS CASOS DE ESTUDIO" */
  cta: claim({ text: 'View case studies', status: 'proposal', source: TEMPLATE }),
  items: [
    {
      id: 'case-1',
      visual: 'built' as const,
      assetType: claim({ text: 'Refurbished villa', status: 'proposal', source: TEMPLATE }),
      decision: claim({ text: 'Decision: proceed after renegotiation', status: 'proposal' }),
      metric: claim({ text: 'Capital growth', status: 'proposal', source: TEMPLATE }),
      period: claim({ text: 'Period pending', status: 'pending' }),
    },
    {
      id: 'case-2',
      visual: 'district' as const,
      assetType: claim({ text: 'Apartment for letting', status: 'proposal', source: TEMPLATE }),
      decision: claim({ text: 'Decision: proceed on the base case', status: 'proposal' }),
      metric: claim({ text: 'Net yield', status: 'proposal', source: TEMPLATE }),
      period: claim({ text: 'Period pending', status: 'pending' }),
    },
    {
      id: 'case-3',
      visual: 'plot' as const,
      assetType: claim({ text: 'Land with development', status: 'proposal', source: TEMPLATE }),
      decision: claim({ text: 'Decision: proceed with staged permits', status: 'proposal' }),
      metric: claim({ text: 'Estimated return', status: 'proposal', source: TEMPLATE }),
      period: claim({ text: 'Period pending', status: 'pending' }),
    },
  ],
  locationPending: claim({ text: 'Location pending', status: 'pending' }),
  permissionPending: claim({ text: 'Awaiting client permission', status: 'blocked' }),
} as const;

export const journey = {
  /** "ACOMPAÑAMIENTO EN TODA LA OPERACIÓN" */
  eyebrow: claim({
    text: 'Support across the whole operation',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** "Un ecosistema completo para una inversión sin fricciones." */
  title: claim({
    text: 'A complete ecosystem for a frictionless investment.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** Template script: "Un único interlocutor. Todo bajo control." */
  script: claim({
    text: 'One point of contact. Everything under control.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  steps: [
    {
      icon: 'analyse' as const,
      title: claim({ text: 'Analyse', status: 'proposal', source: TEMPLATE }),
      body: claim({ text: 'Study and feasibility.', status: 'proposal', source: TEMPLATE }),
    },
    {
      icon: 'buy' as const,
      title: claim({ text: 'Buy', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Support through the negotiation.',
        status: 'proposal',
        source: TEMPLATE,
      }),
    },
    {
      icon: 'declare' as const,
      title: claim({ text: 'Declare', status: 'proposal', source: TEMPLATE }),
      body: claim({
        text: 'Tax and legal handling.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'tax',
      }),
    },
    {
      icon: 'own' as const,
      title: claim({ text: 'Own', status: 'proposal', source: TEMPLATE }),
      body: claim({ text: 'Support with the management.', status: 'proposal', source: TEMPLATE }),
    },
  ],
} as const;

export const faq = {
  /** "PREGUNTAS FRECUENTES" */
  eyebrow: claim({ text: 'Quick answers', status: 'proposal', source: TEMPLATE }),
  /** "Respuestas a las dudas más comunes." */
  title: claim({
    text: 'Answers to the most common questions.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  items: [
    {
      id: 'foreign-only',
      question: claim({
        text: 'Do you only work with foreign buyers?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'The service is built around international buyers, who face the rules, costs and paperwork of a market that was not written for them.',
        status: 'proposal',
      }),
    },
    {
      id: 'time',
      question: claim({
        text: 'How long does the analysis take?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'It depends on the property and the documents available. The timing is agreed before the work starts.',
        status: 'proposal',
        note: 'Rewritten 2026-10-01: the former answer was an internal status; SR-084.',
      }),
    },
    {
      id: 'includes',
      /** Template answer: "El informe incluye análisis de mercado, due diligence, modelo financiero, análisis fiscal, escenarios de riesgo y una recomendación final." */
      question: claim({
        text: 'What does the report include?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Market analysis, due diligence, a financial model, tax analysis, risk scenarios and a final recommendation.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'financial',
      }),
    },
    {
      id: 'purchase-support',
      question: claim({
        text: 'Do you support the purchase itself?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Yes — negotiation, tax and legal handling, and support once the property is yours.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'legal',
      }),
    },
    {
      id: 'cost',
      question: claim({
        text: 'What does the service cost?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Fees are confirmed in writing before any work starts.',
        status: 'proposal',
        review: 'financial',
      }),
    },
    {
      id: 'rental',
      question: claim({
        text: 'Do you also manage the letting?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Management is not part of this service and is not offered here.',
        status: 'proposal',
        note: 'Property Management is HOLD upstream (D-06).',
      }),
    },
    {
      id: 'tax',
      question: claim({ text: 'How does this work with tax?', status: 'proposal' }),
      answer: claim({
        text: 'Tax treatment is reviewed as part of the analysis. Published statements need competent review, a jurisdiction note and a date.',
        status: 'pending',
        review: 'tax',
      }),
    },
    {
      id: 'independence',
      question: claim({ text: 'How do I know the advice is independent?', status: 'proposal' }),
      answer: claim({
        text: 'Payment comes only from you. No commission, fee or incentive is accepted from sellers, developers or agencies.',
        status: 'confirmed',
        source: 'decisions-log.md 2026-07-27; independence model confirmed 2026-08-13',
      }),
    },
  ],
  legalNote: claim({
    text: 'General information only. Tax, legal scope, timing and fees are confirmed for each case.',
    status: 'proposal',
    note: 'Rewritten 2026-10-01: the former answer was an internal status; SR-084.',
    source: 'AGENTS.md §11',
  }),
} as const;

export const buyerSystem = {
  eyebrow: claim({ text: 'Before you pay for anything', status: 'proposal' }),
  title: claim({ text: 'Start with the free calculations.', status: 'proposal' }),
  subtitle: claim({
    text: 'Three tools that answer a question without asking for anything first. No email, no form, no commitment.',
    status: 'proposal',
  }),
} as const;

export const finalCta = {
  /** "TU INVERSIÓN MERECE UN ANÁLISIS PROFESIONAL" */
  eyebrow: claim({
    text: 'Your investment deserves a professional analysis',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** "Hablemos de tu próxima inversión." */
  title: claim({
    text: 'Let’s talk about your next investment.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  /** Template: "Sin compromiso · Respuesta en 1 día laborable" */
  body: claim({
    text: 'No obligation.',
    status: 'proposal',
    source: TEMPLATE,
    note: 'Template adds "Respuesta en 1 día laborable". The response time is not confirmed, so it is withheld.',
  }),
  /** "SOLICITAR ANÁLISIS" / "HABLAR PRIMERO" */
  primaryCta: claim({ text: 'Request an analysis', status: 'proposal', source: TEMPLATE }),
  secondaryCta: claim({ text: 'Talk first', status: 'proposal', source: TEMPLATE }),
  /** Template script: "Mismas preguntas. Mejores decisiones." */
  script: claim({
    text: 'Same questions. Better decisions.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  note: claim({
    text: 'Response times are not confirmed, and these buttons are not connected in this preview.',
    status: 'confirmed',
    source: 'docs/approval-marks-audit.md §3 — technical note; channels are on the Contact page',
  }),
} as const;

export const footer = {
  /** "Inversión inmobiliaria con criterio. Costa Blanca, España." */
  description: claim({
    text: 'Property investment with judgement. Costa Blanca, Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  groups: [
    {
      /** "SERVICIOS" */
      title: 'Services',
      links: [
        claim({ text: 'Property analysis', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Investment opportunities', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Tax advisory', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Purchase support', status: 'proposal', source: TEMPLATE }),
      ],
    },
    {
      /** "INSIGHTS" */
      title: 'Insights',
      links: [
        claim({ text: 'Guides and resources', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Market analysis', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Tax updates', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Client stories', status: 'proposal', source: TEMPLATE }),
      ],
    },
    {
      /** "SOBRE SARAH" */
      title: 'About Sarah',
      links: [
        claim({ text: 'My story', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Method', status: 'proposal', source: TEMPLATE }),
        claim({ text: 'Values', status: 'proposal', source: TEMPLATE }),
        {
          label: claim({
            text: 'Contact',
            status: 'confirmed',
            source: 'Existing preview route, 2026-09-29',
          }),
          href: '/preview/contact',
        },
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
  /** Template: "© 2024 Sarah Katerina Investment. Todos los derechos reservados." */
  copyright: claim({
    text: 'Sarah Katerina',
    status: 'pending',
    note: 'Template names a legal entity and a year. The entity is NEEDS_DECISION upstream, so neither is reproduced.',
  }),
  routesNote: claim({
    text: '',
    status: 'confirmed',
    source: 'docs/approval-marks-audit.md §3 — technical note',
  }),
} as const;

export const seo = {
  title: 'Property investment analysis in the Costa Blanca',
  description:
    'Independent property investment analysis for international buyers in the Costa Blanca: financial modelling, due diligence and a tax overlay in one decision report.',
} as const;
