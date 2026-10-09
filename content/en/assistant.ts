import { SERVICE_ROUTES } from './service-journey';
import {
  CONTACT_PREVIEW_ROUTE,
  INSIGHTS_PREVIEW_ROUTE,
  CASE_STUDIES_PREVIEW_ROUTE,
} from './site-navigation';

/** Juanma authorised this exact v1 catalogue for implementation/review on 2026-10-09.
 * Scope: guided Preview only. No Sarah approval, professional advice or public launch inferred.
 * Provenance: docs/assistant/RESPONSE-CATALOGUE.md, base a189fc737db8b06cfb972855a3059441257b84fb.
 */
export const ASSISTANT_APPROVAL = {
  approver: 'Juanma',
  date: '2026-10-09',
  version: 1,
  permission: 'INTERNAL_TEST_ONLY',
  status: 'APPROVED_WITH_CONDITION',
  condition: 'Human visual review before merge; no production release.',
} as const;

export const ASSISTANT_OPENER = 'Hi Sarah, I would like to get in touch.';

export const assistantCopy = {
  launcher: 'How can I help?',
  title: 'Sarah Katerina',
  label: 'Digital assistant',
  close: 'Close assistant',
  back: 'Back to topics',
  more: 'More topics',
  introduction:
    'I’m the Sarah Katerina digital assistant. I can help you find information on this website or open a contact option.',
  whatsappNotice:
    'This opens WhatsApp, an external service. Nothing is sent until you choose to send it there.',
  whatsapp: 'Open WhatsApp',
  session: 'Guided help · No conversation is saved',
} as const;

export const ASSISTANT_RESPONSES = [
  {
    id: 'A02',
    label: 'Buying a property',
    icon: 'property',
    primary: true,
    text: 'You can explore the Property Purchase page or contact the team about your plans.',
    sources: ['S01', 'S02'],
    links: [{ label: 'Explore Property Purchase', href: SERVICE_ROUTES.purchase }],
  },
  {
    id: 'A03',
    label: 'Investment',
    icon: 'analysis',
    primary: true,
    text: 'You can explore the Investment page. For a question about your own situation, use Contact.',
    sources: ['S01', 'S02'],
    links: [{ label: 'Explore Investment', href: SERVICE_ROUTES.investment }],
  },
  {
    id: 'A04',
    label: 'Tax questions',
    icon: 'tax',
    primary: true,
    text: 'You can explore Tax Advisory or contact the team. This assistant does not assess your personal tax situation.',
    sources: ['S01', 'S02', 'CONTRACT'],
    links: [{ label: 'Explore Tax Advisory', href: SERVICE_ROUTES.tax }],
  },
  {
    id: 'A08',
    label: 'Contact the team',
    icon: 'buyer',
    primary: true,
    text: 'Choose a contact option on the Contact page. A request is not a confirmed appointment.',
    sources: ['S04', 'CONTRACT'],
    links: [],
  },
  {
    id: 'A05',
    label: 'Meet the team',
    icon: 'buyer',
    primary: false,
    text: 'You can read the Team page here.',
    sources: ['S01', 'S02'],
    links: [{ label: 'Meet the team', href: SERVICE_ROUTES.team }],
  },
  {
    id: 'A06',
    label: 'Read Insights',
    icon: 'document',
    primary: false,
    text: 'You can browse Insights. Articles do not provide an assessment of your individual situation.',
    sources: ['S01', 'CONTRACT'],
    links: [{ label: 'Browse Insights', href: INSIGHTS_PREVIEW_ROUTE }],
  },
  {
    id: 'A07',
    label: 'Case Studies',
    icon: 'report',
    primary: false,
    text: 'You can browse Case Studies. They are not a promise of a particular result for you.',
    sources: ['S01', 'CONTRACT'],
    links: [{ label: 'Browse Case Studies', href: CASE_STUDIES_PREVIEW_ROUTE }],
  },
  {
    id: 'A09',
    label: 'Visit the office',
    icon: 'pin',
    primary: false,
    text: 'The office address shown on the website is Calle Bazán 10, 03181 Torrevieja, Alicante. Office meetings are by prior request.',
    sources: ['S03'],
    links: [],
  },
  {
    id: 'A11',
    label: 'Prices and availability',
    icon: 'clock',
    primary: false,
    text: 'I can’t confirm prices or availability here. Please contact the team.',
    sources: ['CONTRACT'],
    links: [],
  },
  {
    id: 'A12',
    label: 'Something else',
    icon: 'document',
    primary: false,
    text: 'I don’t have an approved answer for that. Please contact the team about your question.',
    sources: ['CONTRACT'],
    links: [],
  },
] as const;

export type AssistantResponseId = (typeof ASSISTANT_RESPONSES)[number]['id'];
export const ASSISTANT_CONTACT_ROUTE = CONTACT_PREVIEW_ROUTE;
