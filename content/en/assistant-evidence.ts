import { UNIFIED_WEB_NAV, CONTACT_PREVIEW_ROUTE } from './site-navigation';
import { office } from './contact';
import { ENTITY_FACTS } from '@/lib/seo/entity-graph';
import { ASSISTANT_APPROVAL, ASSISTANT_RESPONSES } from './assistant';
import {
  evaluateResponse,
  type Eligibility,
  type KnowledgeContext,
  type KnowledgeSource,
  type ResponseEvidence,
} from '@/lib/assistant/knowledge';

/**
 * Assistant source register and per-response evidence, v1 catalogue.
 *
 * Reviewed against main 9f89ab2b7012e81bacc659d16f6dbaad89a0a656 on 2026-10-10.
 * Human record: docs/assistant/KNOWLEDGE-REGISTER.md (package A section).
 *
 * Editing an answer, a cited field or a route breaks its fingerprint or
 * excerpt and the answer is withheld until someone re-reviews it and updates
 * this file. Do not update a fingerprint without that review.
 */
const REVIEWED_SHA = '9f89ab2b7012e81bacc659d16f6dbaad89a0a656';
const REVIEWED_AT = '2026-10-10';
/** Proposed 90-day cadence for navigation/contact (KNOWLEDGE-REGISTER.md); not a legal requirement. */
const REVIEW_DUE = '2027-01-07';
const OFFICE_CITATION = { label: 'Contact page · Office', href: `${CONTACT_PREVIEW_ROUTE}#office` };

const entityAddress = `${ENTITY_FACTS.address.streetAddress}, ${ENTITY_FACTS.address.postalCode} ${ENTITY_FACTS.address.addressLocality} · ${ENTITY_FACTS.address.addressRegion}`;

export const KNOWLEDGE_SOURCES: readonly KnowledgeSource[] = [
  {
    id: 'W01',
    kind: 'website',
    status: 'approved',
    title: 'Shared website navigation',
    location: 'content/en/site-navigation.ts',
    locator: 'UNIFIED_WEB_NAV',
    read: () => UNIFIED_WEB_NAV.map((item) => `${item.label} -> ${item.href}`).join('\n'),
    reviewedAt: REVIEWED_AT,
    reviewDue: REVIEW_DUE,
    reviewedSha: REVIEWED_SHA,
  },
  {
    id: 'W02',
    kind: 'website',
    status: 'approved',
    title: 'Office address (confirmed by Juanma 2026-09-29)',
    location: 'content/en/contact.ts',
    locator: 'office.addressSource',
    read: () => office.addressSource.text,
    claimStatus: () => office.addressSource.status,
    fingerprint: '19ef6e13',
    facts: () => ({ 'office.address': office.addressSource.text }),
    citation: OFFICE_CITATION,
    reviewedAt: REVIEWED_AT,
    reviewDue: REVIEW_DUE,
    reviewedSha: REVIEWED_SHA,
  },
  {
    id: 'W03',
    kind: 'website',
    status: 'approved',
    title: 'Office meetings by prior request (confirmed by Juanma 2026-09-29)',
    location: 'content/en/contact.ts',
    locator: 'office.visiting',
    read: () => office.visiting.text,
    claimStatus: () => office.visiting.status,
    fingerprint: 'b2364db5',
    citation: OFFICE_CITATION,
    reviewedAt: REVIEWED_AT,
    reviewDue: REVIEW_DUE,
    reviewedSha: REVIEWED_SHA,
  },
  {
    id: 'G01',
    kind: 'governance',
    status: 'approved',
    title: 'Entity facts (consistency check only, not rendered as JSON-LD)',
    location: 'lib/seo/entity-graph.ts',
    locator: 'ENTITY_FACTS.address',
    facts: () => ({ 'office.address': entityAddress }),
    reviewedAt: REVIEWED_AT,
    reviewDue: REVIEW_DUE,
    reviewedSha: REVIEWED_SHA,
  },
  {
    id: 'G02',
    kind: 'governance',
    status: 'approved',
    title: 'Assistant contract (internal limits, never cited)',
    location: 'docs/assistant/CONTRACT.md',
    reviewedAt: REVIEWED_AT,
    reviewDue: REVIEW_DUE,
    reviewedSha: REVIEWED_SHA,
  },
  {
    id: 'G03',
    kind: 'governance',
    status: 'approved',
    title: 'Response catalogue v1 (approved wording record)',
    location: 'docs/assistant/RESPONSE-CATALOGUE.md',
    reviewedAt: REVIEWED_AT,
    reviewDue: REVIEW_DUE,
    reviewedSha: REVIEWED_SHA,
  },
  // Official references: discovery inventory only. No response may rest on
  // them until a document, version, effective date, excerpt and competent
  // professional review are recorded (KNOWLEDGE-REGISTER.md).
  ...(
    [
      ['O01', 'AEAT', 'https://sede.agenciatributaria.gob.es/', 'ES'],
      ['O02', 'BOE', 'https://www.boe.es/legislacion/', 'ES'],
      ['O03', 'Agència Tributària Valenciana', 'https://atv.gva.es/es/itpajd', 'ES-VC'],
      ['O04', 'SUMA Gestión Tributaria', 'https://www.suma.es/', 'ES-A'],
    ] as const
  ).map(([id, title, location, jurisdiction]): KnowledgeSource => ({
    id,
    kind: 'official',
    status: 'reference_only',
    title,
    location,
    jurisdiction,
    reviewedAt: '2026-10-09',
    reviewDue: '2026-11-08',
    reviewedSha: REVIEWED_SHA,
  })),
];

const v1Approval = {
  status: ASSISTANT_APPROVAL.status,
  permission: ASSISTANT_APPROVAL.permission,
  approver: ASSISTANT_APPROVAL.approver,
  date: ASSISTANT_APPROVAL.date,
  publicCopy: 'PENDING',
} as const;

const route = (label: string, href: string) =>
  ({
    kind: 'route',
    statement: `${label} page exists`,
    source: 'W01',
    excerpt: `${label} -> ${href}`,
  }) as const;
const contactRoute = route('Contact', CONTACT_PREVIEW_ROUTE);
const limit = (statement: string, excerpt: string) =>
  ({ kind: 'limit', statement, source: 'G02', excerpt }) as const;

export const RESPONSE_EVIDENCE: readonly ResponseEvidence[] = [
  {
    responseId: 'A02',
    version: 1,
    answerFingerprint: 'aa1c8a3d',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [route('Property Purchase', '/preview/property-purchase'), contactRoute],
  },
  {
    responseId: 'A03',
    version: 1,
    answerFingerprint: '85af5fb8',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [route('Investment', '/preview/investment'), contactRoute],
  },
  {
    responseId: 'A04',
    version: 1,
    answerFingerprint: 'cf303093',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [
      route('Tax Advisory', '/preview/tax-advisory'),
      contactRoute,
      limit(
        'The assistant does not assess a personal tax situation',
        'No interpretar normativa, determinar obligaciones individuales, calcular impuestos',
      ),
    ],
  },
  {
    responseId: 'A08',
    version: 1,
    answerFingerprint: 'df08406b',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [
      contactRoute,
      limit(
        'A contact request is not a confirmed appointment',
        'No convertir un formulario de solicitud en confirmación.',
      ),
    ],
  },
  {
    responseId: 'A05',
    version: 1,
    answerFingerprint: 'e7eac77a',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [route('Team', '/preview/team')],
  },
  {
    responseId: 'A06',
    version: 1,
    answerFingerprint: 'e980ef96',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [
      route('Insights', '/preview/insights'),
      limit(
        'Articles are not an individual assessment',
        'No interpretar normativa, determinar obligaciones individuales',
      ),
    ],
  },
  {
    responseId: 'A07',
    version: 1,
    answerFingerprint: '074a39ae',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [
      route('Case Studies', '/preview/case-studies'),
      limit(
        'Case studies do not promise a result',
        'prometer rentabilidad, precios, disponibilidad',
      ),
    ],
  },
  {
    responseId: 'A09',
    version: 1,
    answerFingerprint: 'e3f6c685',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [
      {
        kind: 'fact',
        statement: 'The office address is Calle Bazán 10, 03181 Torrevieja, Alicante',
        source: 'W02',
        excerpt: 'Calle Bazán 10, 03181 Torrevieja · Alicante',
        fact: 'office.address',
      },
      {
        kind: 'fact',
        statement: 'Office meetings are by prior request',
        source: 'W03',
        excerpt: 'by prior request only',
      },
    ],
  },
  {
    responseId: 'A11',
    version: 1,
    answerFingerprint: '9b0c21d1',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [
      contactRoute,
      limit(
        'Prices and availability are not confirmed here',
        'prometer rentabilidad, precios, disponibilidad',
      ),
    ],
  },
  {
    responseId: 'A12',
    version: 1,
    answerFingerprint: 'c2ec55e8',
    approval: v1Approval,
    reviewDue: REVIEW_DUE,
    statements: [
      contactRoute,
      limit(
        'Without an approved answer the visitor is sent to a person',
        'se muestra el fallback A12 y contacto humano',
      ),
    ],
  },
];

/** The approved human fallback shown whenever a response is withheld. */
export const ASSISTANT_FALLBACK_ID = 'A12';

export function responseEligibility(
  id: string,
  context: KnowledgeContext,
  now: Date = new Date(),
): Eligibility {
  const answer = ASSISTANT_RESPONSES.find((item) => item.id === id);
  if (!answer) return { status: 'blocked', reasons: ['no-evidence'] };
  return evaluateResponse(answer, {
    now,
    context,
    sources: KNOWLEDGE_SOURCES,
    evidence: RESPONSE_EVIDENCE,
  });
}
