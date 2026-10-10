import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ASSISTANT_RESPONSES } from '@/content/en/assistant';
import {
  KNOWLEDGE_SOURCES,
  RESPONSE_EVIDENCE,
  responseEligibility,
} from '@/content/en/assistant-evidence';
import {
  evaluateResponse,
  type KnowledgeSource,
  type ResponseEvidence,
} from '@/lib/assistant/knowledge';

const NOW = new Date('2026-10-10T12:00:00Z');
const a09 = ASSISTANT_RESPONSES.find((item) => item.id === 'A09')!;
const a02 = ASSISTANT_RESPONSES.find((item) => item.id === 'A02')!;

function withSource(id: string, patch: Partial<KnowledgeSource> | null): KnowledgeSource[] {
  return KNOWLEDGE_SOURCES.flatMap((source) =>
    source.id !== id ? [source] : patch === null ? [] : [{ ...source, ...patch }],
  );
}
function evaluate(
  answer: typeof a09 | { id: string; text: string; links: readonly { href: string }[] },
  overrides: {
    sources?: readonly KnowledgeSource[];
    evidence?: readonly ResponseEvidence[];
    now?: Date;
    context?: 'review' | 'production';
  } = {},
) {
  return evaluateResponse(answer, {
    now: overrides.now ?? NOW,
    context: overrides.context ?? 'review',
    sources: overrides.sources ?? KNOWLEDGE_SOURCES,
    evidence: overrides.evidence ?? RESPONSE_EVIDENCE,
  });
}
const reasons = (result: ReturnType<typeof evaluate>) =>
  result.status === 'blocked' ? result.reasons : [];

describe('assistant knowledge register', () => {
  it('has exactly one versioned evidence record per catalogue response', () => {
    expect(RESPONSE_EVIDENCE.map((item) => item.responseId).sort()).toEqual(
      ASSISTANT_RESPONSES.map((item) => item.id).sort(),
    );
    for (const record of RESPONSE_EVIDENCE) {
      expect(record.version).toBeGreaterThan(0);
      expect(record.approval.approver).toBe('Juanma');
      expect(record.approval.permission).toBe('INTERNAL_TEST_ONLY');
      // Sarah's public-copy approval is never inferred from the review approval.
      expect(record.approval.publicCopy).toBe('PENDING');
      expect(record.statements.length).toBeGreaterThan(0);
    }
  });

  it('makes every current answer eligible in review, with its version', () => {
    for (const answer of ASSISTANT_RESPONSES) {
      const result = responseEligibility(answer.id, 'review', NOW);
      expect(result, answer.id).toMatchObject({ status: 'eligible', version: 1 });
    }
  });

  it('withholds every answer in production until public approval exists', () => {
    for (const answer of ASSISTANT_RESPONSES) {
      expect(reasons(responseEligibility(answer.id, 'production', NOW))).toContain(
        'not-approved-for-context',
      );
    }
  });

  it('backs every related page link with a navigation statement, never a citation', () => {
    for (const answer of ASSISTANT_RESPONSES) {
      const record = RESPONSE_EVIDENCE.find((item) => item.responseId === answer.id)!;
      for (const link of answer.links) {
        expect(
          record.statements.some(
            (s) => s.kind === 'route' && s.excerpt.endsWith(`-> ${link.href}`),
          ),
          `${answer.id} ${link.href}`,
        ).toBe(true);
      }
      const result = responseEligibility(answer.id, 'review', NOW);
      const facts = record.statements.filter((s) => s.kind === 'fact');
      expect(result.status === 'eligible' && result.citations.length > 0).toBe(facts.length > 0);
    }
  });

  it('cites only the public page that shows the confirmed office facts', () => {
    const result = responseEligibility('A09', 'review', NOW);
    expect(result).toEqual({
      status: 'eligible',
      version: 1,
      citations: [
        {
          label: 'Contact page · Office',
          href: '/preview/contact#office',
          reviewedAt: '2026-10-10',
        },
      ],
    });
    // The anchor exists on the rendered Contact page.
    expect(readFileSync('components/web/ContactPage.tsx', 'utf8')).toContain('id="office"');
  });

  it('keeps internal limits as internal sources and their excerpts present', () => {
    const contract = readFileSync('docs/assistant/CONTRACT.md', 'utf8');
    for (const record of RESPONSE_EVIDENCE) {
      for (const statement of record.statements.filter((s) => s.kind === 'limit')) {
        const source = KNOWLEDGE_SOURCES.find((item) => item.id === statement.source)!;
        expect(source.kind).toBe('governance');
        expect(source.citation).toBeUndefined();
        expect(contract, statement.excerpt).toContain(statement.excerpt);
      }
    }
  });

  it('matches the shipped wording to the approved catalogue record', () => {
    const catalogue = readFileSync('docs/assistant/RESPONSE-CATALOGUE.md', 'utf8');
    for (const answer of ASSISTANT_RESPONSES) {
      expect(catalogue, answer.id).toContain(`EN: ${answer.text}`);
    }
  });

  it('never lets an official reference back an answer yet', () => {
    const official = KNOWLEDGE_SOURCES.filter((s) => s.kind === 'official');
    expect(official.map((s) => s.id)).toEqual(['O01', 'O02', 'O03', 'O04']);
    for (const source of official) expect(source.status).toBe('reference_only');
    for (const record of RESPONSE_EVIDENCE)
      for (const statement of record.statements)
        expect(statement.source.startsWith('O')).toBe(false);
    const evidence = RESPONSE_EVIDENCE.map((record) =>
      record.responseId === 'A02'
        ? {
            ...record,
            statements: [
              ...record.statements,
              { kind: 'fact' as const, statement: 'tax rule', source: 'O01', excerpt: 'x' },
            ],
          }
        : record,
    );
    expect(reasons(evaluate(a02, { evidence }))).toContain('source-not-eligible');
  });
});

describe('assistant knowledge blocking', () => {
  it('blocks when a cited source changes', () => {
    const sources = withSource('W02', { read: () => 'Calle Nueva 1, 03181 Torrevieja · Alicante' });
    expect(reasons(evaluate(a09, { sources }))).toEqual(
      expect.arrayContaining(['source-changed', 'excerpt-missing']),
    );
  });

  it('blocks when a source is missing from the register or returns nothing', () => {
    expect(reasons(evaluate(a09, { sources: withSource('W03', null) }))).toContain(
      'source-missing',
    );
    expect(
      reasons(evaluate(a09, { sources: withSource('W03', { read: () => undefined }) })),
    ).toContain('source-missing');
  });

  it('blocks when a page leaves the navigation', () => {
    const sources = withSource('W01', { read: () => 'Contact -> /preview/contact' });
    expect(reasons(evaluate(a02, { sources }))).toContain('excerpt-missing');
  });

  it('blocks when the approval or a source review date has passed', () => {
    const later = new Date('2027-01-08T00:00:01Z');
    expect(reasons(evaluate(a02, { now: later }))).toEqual(
      expect.arrayContaining(['approval-expired', 'source-expired']),
    );
    // Valid through the whole review-due day.
    expect(evaluate(a02, { now: new Date('2027-01-07T23:00:00Z') }).status).toBe('eligible');
  });

  it('blocks contradictory facts instead of choosing one', () => {
    const sources = withSource('G01', {
      facts: () => ({ 'office.address': 'Avenida Otra 5, 03181 Torrevieja · Alicante' }),
    });
    expect(reasons(evaluate(a09, { sources }))).toContain('contradiction');
    // Punctuation and accents alone are not a conflict.
    const same = withSource('G01', {
      facts: () => ({ 'office.address': 'calle bazan 10 03181 torrevieja, alicante' }),
    });
    expect(evaluate(a09, { sources: same }).status).toBe('eligible');
  });

  it('blocks a fact whose source claim is no longer confirmed', () => {
    const sources = withSource('W02', { claimStatus: () => 'proposal' });
    expect(reasons(evaluate(a09, { sources }))).toContain('source-not-confirmed');
  });

  it('blocks an edited answer until it is re-reviewed', () => {
    expect(reasons(evaluate({ ...a09, text: `${a09.text} Walk-ins welcome.` }))).toContain(
      'answer-changed',
    );
    expect(reasons(evaluate({ ...a02, links: [{ href: '/preview/team' }] }))).toContain(
      'answer-changed',
    );
  });

  it('blocks an answer with no evidence record', () => {
    expect(evaluate({ id: 'A99', text: 'x', links: [] })).toEqual({
      status: 'blocked',
      reasons: ['no-evidence'],
    });
    expect(responseEligibility('A99', 'review', NOW).status).toBe('blocked');
  });

  it('does not accept a governance document as a cited fact', () => {
    const evidence = RESPONSE_EVIDENCE.map((record) =>
      record.responseId === 'A02'
        ? {
            ...record,
            statements: [
              { kind: 'fact' as const, statement: 'x', source: 'G02', excerpt: 'No convertir' },
            ],
          }
        : record,
    );
    expect(reasons(evaluate(a02, { evidence }))).toContain('source-not-eligible');
  });
});
