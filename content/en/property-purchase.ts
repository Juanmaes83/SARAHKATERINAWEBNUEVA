import { claim } from '@/lib/content/claims';

const TEMPLATE =
  'Property Purchase template - approved Phase 2 visual and editorial source (Juanma, 2026-09-21)';

export const PROTOTYPE_NOTICE = {
  label: 'Property Purchase visual preview',
  body: claim({
    text: 'Internal review only. Not approved for publication or production.',
    status: 'confirmed',
    source: 'AGENTS.md sections 4, 7 and 13',
  }),
} as const;

export const nav = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#sarah', label: 'About Sarah' },
  { href: '#process', label: 'Process' },
  { href: '#resources', label: 'Resources' },
  { href: '#faq', label: 'Questions' },
] as const;

export const headerCta = claim({ text: 'Talk to Sarah', status: 'proposal', source: TEMPLATE });

export const hero = {
  eyebrow: claim({ text: 'Buying property in Spain', status: 'proposal', source: TEMPLATE }),
  title: claim({ text: 'The buying process,', status: 'proposal', source: TEMPLATE }),
  accent: claim({ text: 'handled as one file.', status: 'proposal', source: TEMPLATE }),
  body: claim({
    text: 'Independent support for international buyers who want to purchase in Spain with clarity, control and calm. From the first viewing to the keys, the whole file stays connected.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'legal',
  }),
  primaryCta: claim({ text: 'Start my purchase file', status: 'proposal', source: TEMPLATE }),
  secondaryCta: claim({ text: 'See how it works', status: 'proposal', source: TEMPLATE }),
  visualTitle: claim({ text: 'Image / video hero', status: 'pending' }),
  visualBody: claim({
    text: 'Sarah hands over the keys to an international buyer in a Costa Blanca apartment.',
    status: 'proposal',
    note: 'Phase 2E (brief 2026-10-23): caption now describes the approved image — a key handover — instead of a document review. Hero video slot stays reserved.',
  }),
  script: claim({
    text: 'A secure purchase. A new life in Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  proofs: [
    claim({
      text: 'Independent advice',
      status: 'confirmed',
      source: 'decisions-log.md 2026-07-27',
    }),
    claim({ text: 'International buyer focus', status: 'proposal', source: TEMPLATE }),
    claim({ text: 'One coordinated file', status: 'proposal', source: TEMPLATE }),
  ],
} as const;

export const trust = [
  {
    icon: 'buyer' as const,
    value: claim({ text: 'International buyers', status: 'proposal', source: TEMPLATE }),
    note: claim({
      text: 'A process designed around buying from abroad.',
      status: 'proposal',
      source: TEMPLATE,
    }),
  },
  {
    icon: 'tax' as const,
    value: claim({
      text: 'Tax experience',
      status: 'confirmed',
      source: 'credential-register.csv CR-002',
    }),
    note: claim({
      text: "Twenty years inside Spain's tax administration.",
      status: 'confirmed',
      source: 'credential-register.csv CR-002',
      review: 'none',
    }),
  },
  {
    icon: 'independence' as const,
    value: claim({ text: 'One point of contact', status: 'proposal', source: TEMPLATE }),
    note: claim({
      text: 'A connected view of the purchase file.',
      status: 'proposal',
      source: TEMPLATE,
    }),
  },
  {
    icon: 'own' as const,
    value: claim({ text: 'From viewing to keys', status: 'proposal', source: TEMPLATE }),
    note: claim({
      text: 'Support across the ordered purchase journey.',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
  },
] as const;

export const audience = {
  eyebrow: claim({ text: 'Who this service is for', status: 'proposal', source: TEMPLATE }),
  title: claim({
    text: 'Buy in Spain without chasing the paperwork.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  body: claim({
    text: 'Buyer-side guidance for international clients who want an orderly purchase, without surprises and with full visibility before commitment.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'legal',
  }),
  items: [
    claim({
      text: 'Your first purchase in Spain as a non-resident.',
      status: 'proposal',
      source: TEMPLATE,
    }),
    claim({
      text: 'You live abroad and need coordinated representation.',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({
      text: 'You want a second view before signing the arras agreement.',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({
      text: 'You want fiscal and legal clarity before committing.',
      status: 'proposal',
      source: TEMPLATE,
      review: 'tax',
    }),
  ],
  mediaLabel: claim({ text: 'Property viewing image pending', status: 'pending' }),
  script: claim({
    text: 'The right place. With the right advice.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

export const oneFile = {
  eyebrow: claim({ text: 'One file. One team.', status: 'proposal', source: TEMPLATE }),
  title: claim({ text: 'One file. From viewing to keys.', status: 'proposal', source: TEMPLATE }),
  body: claim({
    text: 'One connected record of the purchase, bringing the legal, tax and practical parts into a clear sequence.',
    status: 'proposal',
    source: TEMPLATE,
    review: 'legal',
  }),
  points: [
    claim({
      text: 'Legal and fiscal due diligence',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({
      text: 'Coordination with notary, registry and administration',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({ text: 'Clear communication in your language', status: 'proposal', source: TEMPLATE }),
    claim({
      text: 'Document control and translation workflow',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({ text: 'Follow-through to the key handover', status: 'proposal', source: TEMPLATE }),
  ],
  cta: claim({ text: 'See what we handle', status: 'proposal', source: TEMPLATE }),
  script: claim({
    text: 'One team. The whole process. Complete calm.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

export const fileStages = [
  {
    id: 'nie',
    code: '01',
    title: 'NIE',
    body: 'Application and status control.',
    status: 'Prepared',
  },
  {
    id: 'nota',
    code: '02',
    title: 'Nota simple',
    body: 'Ownership and charges checked.',
    status: 'Review',
  },
  {
    id: 'community',
    code: '03',
    title: 'Community certificate',
    body: 'Community debt evidence.',
    status: 'Pending',
  },
  {
    id: 'arras',
    code: '04',
    title: 'Arras',
    body: 'Terms reviewed before signature.',
    status: 'Pending',
  },
  {
    id: 'tax',
    code: '05',
    title: 'Tax filing',
    body: 'Purchase tax route confirmed.',
    status: 'Pending',
  },
  {
    id: 'deed',
    code: '06',
    title: 'Public deed',
    body: 'Notary signing prepared.',
    status: 'Pending',
  },
  {
    id: 'registry',
    code: '07',
    title: 'Registration',
    body: 'Ownership inscription followed.',
    status: 'Pending',
  },
] as const;

export const process = {
  /** Used once, by the file tracker. */
  eyebrow: claim({ text: 'The file, front to back', status: 'proposal', source: TEMPLATE }),
  /**
   * Phase 2E (brief 2026-10-23): the six-step process used to repeat the
   * tracker's eyebrow on the very next section. It gets its own.
   */
  stepsEyebrow: claim({
    text: 'From first call to signature',
    status: 'proposal',
    note: 'Phase 2E proposed eyebrow replacing the duplicated "The file, front to back". Pending Juanma.',
  }),
  title: claim({ text: 'End-to-end, in ordered steps.', status: 'proposal', source: TEMPLATE }),
  subtitle: claim({
    text: 'A visible sequence for a purchase without loose ends.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  controlTitle: claim({ text: 'Document control', status: 'proposal', source: TEMPLATE }),
  controls: [
    claim({ text: 'Document review', status: 'proposal', source: TEMPLATE, review: 'legal' }),
    claim({
      text: 'Official translation when required',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({ text: 'Secure file organisation', status: 'proposal', source: TEMPLATE }),
    claim({ text: 'Online access to the file', status: 'proposal', source: TEMPLATE }),
  ],
  steps: [
    {
      icon: 'buyer' as const,
      title: 'Discovery call',
      body: 'We understand the purchase, constraints and priorities.',
      deliverable: 'A clear starting brief',
    },
    {
      icon: 'document' as const,
      title: 'NIE application',
      body: 'The application and follow-up route are organised.',
      deliverable: 'A tracked identity file',
    },
    {
      icon: 'analysis' as const,
      title: 'Due diligence',
      body: 'Registry, planning and charges are reviewed.',
      deliverable: 'A documented risk view',
    },
    {
      icon: 'dueDiligence' as const,
      title: 'Arras / reservation',
      body: 'The commitment point is reviewed before signature.',
      deliverable: 'A pre-sign decision check',
    },
    {
      icon: 'tax' as const,
      title: 'Bank and utilities',
      body: 'The practical account and supply steps are coordinated.',
      deliverable: 'An ordered handover list',
    },
    {
      icon: 'own' as const,
      title: 'Notary signing',
      body: 'The deed and closing sequence are prepared.',
      deliverable: 'A closing file and next steps',
    },
  ],
} as const;

export const beforeSign = {
  eyebrow: claim({ text: 'Before you sign', status: 'proposal', source: TEMPLATE }),
  title: claim({
    text: 'We review. We analyse. You decide with clarity.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  checks: [
    'Registry position',
    'Debts and charges',
    'Planning position',
    'Tax exposure',
    'Contract terms',
    'Risks identified',
  ],
  recommendation: claim({
    text: 'Illustrative recommendation',
    status: 'confirmed',
    source: 'Phase 2 visual implementation contract - labelled samples allowed',
  }),
  actions: ['Buy', 'Renegotiate', 'Walk away'],
  deliverables: [
    claim({
      text: 'Complete, personalised review file',
      status: 'proposal',
      source: TEMPLATE,
      review: 'legal',
    }),
    claim({ text: 'PDF and online access', status: 'proposal', source: TEMPLATE }),
    claim({ text: 'A review call to explain the findings', status: 'proposal', source: TEMPLATE }),
  ],
  cta: claim({ text: 'Request a purchase review', status: 'proposal', source: TEMPLATE }),
  script: claim({ text: 'Better decisions. Greater calm.', status: 'proposal', source: TEMPLATE }),
} as const;

export const worries = {
  title: claim({ text: 'What you stop worrying about.', status: 'proposal', source: TEMPLATE }),
  body: claim({
    text: 'Less uncertainty. More time to enjoy what matters.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  items: [
    ['tax', 'Unexpected tax questions after the purchase'],
    ['document', 'Documents lost between advisers'],
    ['dueDiligence', 'Unclear clauses in the contract'],
    ['buyer', "Depending on the seller's agent"],
    ['clock', 'Travelling to Spain for every step'],
    ['risk', 'Missing important deadlines'],
  ] as const,
  script: claim({
    text: 'Your purchase. Our experience. Your calm.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

export const services = {
  eyebrow: claim({ text: 'Our services', status: 'proposal', source: TEMPLATE }),
  title: claim({ text: 'Choose the level of support your purchase needs.', status: 'proposal' }),
  items: [
    {
      title: 'Purchase roadmap',
      body: 'An initial review and an ordered purchase plan.',
      points: [
        'Objectives and budget review',
        'Personalised purchase list',
        'Initial tax orientation',
      ],
      cta: 'Request roadmap',
      popular: false,
    },
    {
      title: 'Full purchase support',
      body: 'End-to-end coordination from the viewing to the keys.',
      points: ['Purchase coordination', 'Document and tax workflow', 'Closing and handover'],
      cta: 'Request support',
      popular: true,
    },
    {
      title: 'Purchase + tax overlay',
      body: 'Purchase coordination with a dedicated view of the tax questions.',
      points: ['Purchase file', 'Property tax planning', 'Availability review'],
      cta: 'Request review',
      popular: false,
    },
  ],
  scopeTitle: claim({ text: 'What the preview includes', status: 'proposal' }),
  scope: [
    ['Independent buyer-side advice', true],
    ['Communication in your language', true],
    ['Coordination of the purchase file', true],
    ["The seller's asking price", false],
    ['Third-party legal, notary or tax charges', false],
    ['Unverified promises or hidden commissions', false],
  ] as const,
  pricingNote: claim({
    text: 'Pricing and service timings are under review and are not published in this preview.',
    status: 'pending',
    review: 'financial',
  }),
} as const;

export const authority = {
  eyebrow: claim({
    text: 'Why Sarah, specifically, for this.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  title: claim({
    text: 'Experience inside the system, applied to your purchase.',
    status: 'proposal',
  }),
  body: claim({
    text: "With twenty years inside Spain's tax administration and a buyer-side approach, Sarah connects the details that are too often handled in isolation.",
    status: 'proposal',
    review: 'tax',
  }),
  imageAlt: claim({
    text: 'Portrait of Sarah Katerina.',
    status: 'confirmed',
    source: 'AUTH-SK-002',
  }),
  points: [
    claim({
      text: 'Independent advice',
      status: 'confirmed',
      source: 'decisions-log.md 2026-07-27',
    }),
    claim({
      text: "Twenty years inside Spain's tax administration",
      status: 'confirmed',
      source: 'credential-register.csv CR-002',
    }),
    claim({ text: 'One accountable point of contact', status: 'proposal', source: TEMPLATE }),
    claim({ text: 'Clear explanations in writing', status: 'proposal', source: TEMPLATE }),
  ],
  cta: claim({ text: 'Meet Sarah', status: 'proposal', source: TEMPLATE }),
  quote: claim({
    text: 'A well-informed purchase is the first step towards a better life in Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

export const cases = {
  eyebrow: claim({
    text: 'Three purchases. Three avoided mistakes.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  title: claim({
    text: 'The structure is ready. The evidence is not yet cleared.',
    status: 'proposal',
  }),
  items: [
    {
      title: 'Fiscal exposure identified',
      body: 'Outcome withheld until the facts and client permission are verified.',
    },
    {
      title: 'Problematic clause renegotiated',
      body: 'Outcome withheld until the facts and client permission are verified.',
    },
    {
      title: 'Remote purchase completed',
      body: 'Outcome withheld until the facts and client permission are verified.',
    },
  ],
  cta: claim({ text: 'View more cases', status: 'proposal', source: TEMPLATE }),
} as const;

export const journey = {
  eyebrow: claim({ text: 'From purchase to ownership', status: 'proposal', source: TEMPLATE }),
  title: claim({
    text: 'The same judgement, across the decisions that follow.',
    status: 'proposal',
  }),
  steps: [
    { icon: 'property' as const, title: 'Purchase', body: 'Advice and file order' },
    { icon: 'tax' as const, title: 'Tax', body: 'Questions and compliance' },
    { icon: 'analysis' as const, title: 'Investment review', body: 'Evidence and scenarios' },
    { icon: 'own' as const, title: 'Ownership', body: 'A clear handover' },
  ],
  script: claim({
    text: 'Everything connected. All the clarity.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

export const faq = {
  eyebrow: claim({ text: 'Quick answers', status: 'proposal', source: TEMPLATE }),
  title: claim({
    text: 'Resolve the most common questions.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  items: [
    {
      id: 'lawyer',
      question: claim({
        text: 'Do I need a Spanish lawyer?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Independent legal representation is recommended. The exact division of responsibility must be agreed for each purchase and reviewed before publication.',
        status: 'pending',
        review: 'legal',
      }),
    },
    {
      id: 'remote',
      question: claim({
        text: 'Can I sign the purchase from outside Spain?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'Remote representation may be possible depending on the transaction and valid authority. A qualified legal professional must confirm the route.',
        status: 'pending',
        review: 'legal',
      }),
    },
    {
      id: 'when',
      question: claim({
        text: 'When should Sarah become involved?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'The template places the review before the arras or reservation commitment, while there is still room to understand the file.',
        status: 'proposal',
        source: TEMPLATE,
        review: 'legal',
      }),
    },
    {
      id: 'included',
      question: claim({
        text: 'What is included in the service?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'The preview describes document coordination, purchase due diligence, tax questions and an ordered handover. Final scope and terms remain subject to approval.',
        status: 'pending',
        review: 'legal',
      }),
    },
    {
      id: 'time',
      question: claim({
        text: 'How long does the process take?',
        status: 'proposal',
        source: TEMPLATE,
      }),
      answer: claim({
        text: 'No standard completion time is approved. Timing depends on the buyer, property, documentation and third parties.',
        status: 'pending',
        review: 'legal',
      }),
    },
  ],
  legalNote: claim({
    text: 'Legal and tax statements in this preview are proposals and require competent review before publication.',
    status: 'confirmed',
    source: 'AGENTS.md section 11',
  }),
} as const;

export const finalCta = {
  eyebrow: claim({
    text: 'Your purchase in Spain starts here',
    status: 'proposal',
    source: TEMPLATE,
  }),
  title: claim({
    text: 'From first viewing to key handover, one accountable file.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  primaryCta: claim({ text: 'Start my purchase file', status: 'proposal', source: TEMPLATE }),
  secondaryCta: claim({ text: 'Talk first', status: 'proposal', source: TEMPLATE }),
  note: claim({
    text: 'Contact routes and response time are not confirmed in this preview.',
    status: 'pending',
  }),
  script: claim({
    text: 'More than a property. A new beginning in Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
} as const;

export const footer = {
  description: claim({
    text: 'Independent support for international property buyers in Spain.',
    status: 'proposal',
    source: TEMPLATE,
  }),
  groups: [
    {
      title: 'Services',
      links: [
        claim({ text: 'Property purchase', status: 'proposal' }),
        claim({ text: 'Tax advisory', status: 'proposal' }),
        claim({ text: 'Investment analysis', status: 'proposal' }),
      ],
    },
    {
      title: 'Resources',
      links: [
        claim({ text: 'Guides and articles', status: 'proposal' }),
        claim({ text: 'Buyer tools', status: 'proposal' }),
        claim({ text: 'Frequently asked questions', status: 'proposal' }),
      ],
    },
    {
      title: 'About Sarah',
      links: [
        claim({ text: 'My story', status: 'proposal' }),
        claim({ text: 'Method', status: 'proposal' }),
        claim({ text: 'Contact', status: 'proposal' }),
      ],
    },
    {
      title: 'Legal',
      links: [
        claim({ text: 'Legal notice', status: 'proposal' }),
        claim({ text: 'Privacy policy', status: 'proposal' }),
        claim({ text: 'Terms of use', status: 'proposal' }),
        claim({ text: 'Cookie policy', status: 'proposal' }),
      ],
    },
  ],
  copyright: claim({
    text: 'Sarah Katerina. Internal preview, not for distribution.',
    status: 'pending',
  }),
  routesNote: claim({
    text: 'Navigation destinations and contact routes are not live in this preview.',
    status: 'pending',
  }),
} as const;

export const seo = {
  title: 'Property purchase support in Spain',
  description:
    'Independent, end-to-end property purchase support for international buyers in Spain. Internal visual preview, not approved for production.',
} as const;
