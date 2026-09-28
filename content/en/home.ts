import { claim } from '@/lib/content/claims';
import type { IconName } from '@/components/web/icons/Icon';

/**
 * PREVIEW HOME — /preview/home (docs/home-preview.md).
 *
 * The commercial Home that Phase 2G §10 and Phase 2H §7 left "for the future",
 * built from Sarah's direction in REVISION WEB-investment.docx: emotional,
 * close and buyer-first; the pain point; protection from being misled;
 * accompaniment from start to finish; "what Sarah does for you"; financing and
 * renovations. It does not replace `/`, which stays the project index.
 *
 * Sarah gave direction, not text, so every sentence written here is a
 * `proposal` for her. Facts reused from elsewhere keep their confirmed source.
 * Financing and renovations are described as help and coordination only: no
 * lender is named, no agreement, condition, saving or direct execution of works
 * is stated (docs/home-preview.md §4 lists the reviews still needed).
 */

const SARAH_DIRECTION =
  "Preview Home drafted from Sarah's direction (REVISION WEB-investment.docx), 2026-09-28 — pending Sarah";

export const PROTOTYPE_NOTICE = {
  label: 'HOME PREVIEW — NOT PRODUCTION',
  body: claim({
    text: 'Draft Home for review. New copy is proposed, and any tax, legal or financing statement requires competent review before publication.',
    status: 'confirmed',
    source: 'AGENTS.md §§10–11',
  }),
} as const;

export const seo = {
  title: 'Buy property in Spain with someone on your side | Sarah Katerina',
  description:
    'Independent, buyer-side guidance for international buyers in Spain: finding the right property, checking it before you commit, the tax of buying and owning, and support after the keys.',
} as const;

export const nav = [
  { href: '#what-sarah-does', label: 'How we help' },
  { href: '#tools', label: 'Tools' },
  { href: '#next-step', label: 'Start' },
  { href: '#financing', label: 'Financing' },
  { href: '#team', label: 'Team' },
] as const;

export const headerCta = claim({
  text: 'Tell us about your plans',
  status: 'proposal',
  source: SARAH_DIRECTION,
});

export const hero = {
  eyebrow: claim({ text: 'Buying a home in Spain', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'Buy in Spain with someone on your side.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  lead: claim({
    text: 'Buying from abroad is exciting, and it is easy to hear only what suits the person selling. Sarah Katerina and her team work for you: they look for the homes that fit your plans, check each one before you commit, and stay with you from the first call to the keys, and after.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  primaryCta: claim({
    text: 'Tell us about your plans',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  secondaryCta: claim({
    text: 'What Sarah does for you',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  imageAlt:
    'Three members of the Sarah Katerina team together in a bright office setting; individual identities are not assigned in this preview.',
  caption: claim({
    text: 'The people who work on your side of the purchase.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
} as const;

/** Reused confirmed facts only; nothing new is asserted in the strip. */
export const trust: readonly {
  readonly icon: IconName;
  readonly value: ReturnType<typeof claim>;
  readonly note: ReturnType<typeof claim>;
}[] = [
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
    icon: 'own',
    value: claim({ text: 'One team', status: 'proposal', source: SARAH_DIRECTION }),
    note: claim({
      text: 'from the search to life as an owner',
      status: 'proposal',
      source: SARAH_DIRECTION,
    }),
  },
];

/** Sarah: "Tocar el punto de dolor, ofrecer protección para que [no] les engañen". */
export const worries = {
  eyebrow: claim({ text: 'Buying from abroad', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'A dream home, far from home, is easy to get wrong.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  body: claim({
    text: 'Listings are written to sell. Costs appear after the price. Rules and paperwork arrive in a language that is not yours. You deserve someone in the room whose only job is your interests.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  items: [
    { icon: 'document' as const, text: 'A listing that tells you only the good part' },
    { icon: 'tax' as const, text: 'Taxes and costs nobody mentioned before the price' },
    { icon: 'risk' as const, text: 'A contract signed before anyone checked it for you' },
    { icon: 'clock' as const, text: 'Deadlines and paperwork in a system you do not know' },
  ].map((item) => ({
    icon: item.icon,
    text: claim({ text: item.text, status: 'proposal', source: SARAH_DIRECTION }),
  })),
} as const;

/** Sarah: "Qué hace Sarah por ti". Each line maps to a service page. */
export const whatSarahDoes = {
  eyebrow: claim({ text: 'What Sarah does for you', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'From the first idea to the keys, and after.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  steps: [
    {
      icon: 'buyer' as const,
      title: 'Listens first',
      body: 'Your plans, your budget and how you want to live shape the search, not a property someone needs to sell.',
    },
    {
      icon: 'analyse' as const,
      title: 'Finds and filters',
      body: 'Properties are looked for and compared against your brief, and the ones that do not fit are set aside.',
    },
    {
      icon: 'dueDiligence' as const,
      title: 'Checks before you commit',
      body: 'The property, the numbers and the contract are reviewed before money changes hands, with qualified professionals where the law requires them.',
    },
    {
      icon: 'tax' as const,
      title: 'Explains the tax',
      body: 'What you pay to buy, and what you will owe as an owner, in plain language.',
    },
    {
      icon: 'buy' as const,
      title: 'Coordinates the purchase',
      body: 'Negotiation, paperwork and signatures follow one coordinated file, up to the keys.',
    },
    {
      icon: 'own' as const,
      title: 'Stays after the keys',
      body: 'Tax and administrative questions as an owner, within the agreed scope.',
    },
  ].map((step) => ({
    icon: step.icon,
    title: claim({ text: step.title, status: 'proposal', source: SARAH_DIRECTION }),
    body: claim({
      text: step.body,
      status: 'proposal',
      source: SARAH_DIRECTION,
      ...(step.icon === 'tax' ? { review: 'tax' as const } : {}),
      ...(step.icon === 'dueDiligence' || step.icon === 'buy' ? { review: 'legal' as const } : {}),
    }),
  })),
  promise: claim({
    text: 'Clarity before commitment.',
    status: 'confirmed',
    source: 'brand-system/governance/decision-status-model.md — APPROVED + PUBLIC_PRODUCTION',
  }),
} as const;

/** Buyer System hub entry "after the trust strip" (docs/buyer-system-integration.md). */
export const tools = {
  eyebrow: claim({ text: 'Before you commit', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'Two free tools to see the real cost first.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  subtitle: claim({
    text: 'They open in the separate Sarah Katerina Buyer System. No form, no email, and nothing you enter here is carried across.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  purchaseTaxMoment: claim({
    text: 'What Spain charges on the purchase itself, for your own case.',
    status: 'proposal',
    source: SARAH_DIRECTION,
    review: 'tax',
  }),
  realCashMoment: claim({
    text: 'The cash the purchase needs beyond the price: tax, money already paid, mortgage funds and buying costs.',
    status: 'proposal',
    source: SARAH_DIRECTION,
    review: 'financial',
  }),
} as const;

/**
 * Sarah: "trabajamos con varias entidades financieras, como UCI y Sabadell, y
 * podemos valorar su financiación sin ningún compromiso" and "un apartado de
 * reformas, corto, pero que quede claro que nos podemos hacer cargo".
 *
 * Written as help and coordination. Not stated until evidenced and reviewed:
 * the names of lenders or any working relationship with them, credit
 * intermediation, any condition, rate or saving, and direct execution of works.
 */
export const financing = {
  eyebrow: claim({ text: 'Financing', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'Need a mortgage in Spain?',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  body: claim({
    text: 'Tell us early. We can look at your financing with you, with no commitment, so you know what a Spanish mortgage could mean for your purchase before you choose a home. Any offer, rate and condition comes from the bank itself.',
    status: 'proposal',
    source: SARAH_DIRECTION,
    review: 'financial',
  }),
  pending: claim({
    text: 'Names of the banks we work with: pending confirmation.',
    status: 'pending',
    note: 'Sarah mentions UCI and Sabadell. Not shown until the relationships, their public naming and the regulatory position of this help are confirmed (docs/home-preview.md §4).',
  }),
} as const;

export const renovation = {
  eyebrow: claim({ text: 'Renovation', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'Planning to renovate?',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  body: claim({
    text: 'Say so from the start. We look at what the work could involve before you commit to the property, and we can coordinate it for you afterwards with qualified professionals.',
    status: 'proposal',
    source: SARAH_DIRECTION,
    review: 'legal',
    note: 'Scope to confirm with Sarah: coordination of works, who contracts the professionals, and any licence questions.',
  }),
} as const;

export const team = {
  eyebrow: claim({ text: 'The people with you', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'A small team you will get to know.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  body: claim({
    text: 'Named people, each with a clear part of your purchase, and one file that connects them.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  cta: 'Meet the team',
} as const;

export const presentationVideo = claim({
  text: 'Presentation video',
  status: 'pending',
  note: 'Sarah asks for a presentation video. The reserved film TU INVERSIÓN MI OBJETIVO needs an approved Home headline, confirmation that its generated likeness may represent Sarah, and a rights record (Phase 2G §2.2). Nothing is shown in its place.',
});

export const finalCta = {
  eyebrow: claim({ text: 'Your next step', status: 'proposal', source: SARAH_DIRECTION }),
  title: claim({
    text: 'Tell us what you want your life in Spain to look like.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  body: claim({
    text: 'A first conversation to understand your plans, with no commitment.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  primaryCta: 'Tell us about your plans',
  note: claim({
    text: 'Contact channels are not connected in this preview, so this button does not submit or navigate.',
    status: 'confirmed',
    source: 'README.md §12 — contact details not confirmed',
  }),
} as const;

export const footer = {
  description: claim({
    text: 'Independent, buyer-side guidance for international buyers in Spain.',
    status: 'proposal',
    source: SARAH_DIRECTION,
  }),
  groups: [
    {
      title: 'Services',
      links: ['Investment', 'Property Purchase', 'Tax Advisory'].map((text) =>
        claim({ text, status: 'proposal', source: SARAH_DIRECTION }),
      ),
    },
    {
      title: 'Free tools',
      links: ['Purchase tax', 'Real cash needed'].map((text) =>
        claim({ text, status: 'proposal', source: SARAH_DIRECTION }),
      ),
    },
    {
      title: 'About',
      links: ['The team', 'How we work'].map((text) =>
        claim({ text, status: 'proposal', source: SARAH_DIRECTION }),
      ),
    },
    {
      title: 'Review status',
      links: ['Draft Home', 'Professional review required', 'Preview only'].map((text) =>
        claim({ text, status: 'confirmed', source: 'AGENTS.md §§4, 10–11' }),
      ),
    },
  ],
  copyright: claim({
    text: 'Sarah Katerina. Internal preview, not for publication.',
    status: 'pending',
    note: 'Legal entity unconfirmed.',
  }),
  routesNote: claim({
    text: 'Footer links are laid out as proposed; their destinations are not built yet.',
    status: 'confirmed',
    source: 'This repository, 2026-09-28',
  }),
} as const;
