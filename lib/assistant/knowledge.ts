/**
 * Assistant knowledge eligibility (package A, 2026-10-10).
 *
 * Every catalogue response carries an evidence record: the approved wording,
 * the version, who approved it, until when, and the exact source excerpt for
 * each statement it makes. A response is shown only when all of that still
 * holds; otherwise the visitor gets the approved human fallback (A12) and a
 * contact option. This is a deterministic check, not retrieval or generation.
 *
 * Three kinds of statement, kept apart on purpose:
 * - `route`: "this page exists". Backed by the navigation registry; rendered as
 *   a related page, never as a citation.
 * - `fact`: a factual statement about the business. Backed by a confirmed
 *   website claim, and the only kind cited to the visitor (with the public page
 *   that shows it).
 * - `limit`: what the assistant does not do. Backed by internal governance
 *   (docs/assistant/CONTRACT.md); never shown as a source.
 */

export type SourceKind = 'website' | 'governance' | 'official';

/** `approved`: may back a response. `reference_only`: inventory, never backs one. */
export type SourceStatus = 'approved' | 'reference_only';

export type ApprovalPermission = 'INTERNAL_TEST_ONLY' | 'PUBLIC_PRODUCTION';

export interface KnowledgeSource {
  readonly id: string;
  readonly kind: SourceKind;
  readonly status: SourceStatus;
  readonly title: string;
  /** Repository path or official URL. */
  readonly location: string;
  /** Export/field inside `location`, when it is a module. */
  readonly locator?: string;
  /**
   * Current text of the source, read from the shipped module. Absent for
   * sources that are only verifiable at test time (markdown governance) or not
   * shipped at all (official references).
   */
  readonly read?: () => string | undefined;
  /** Claim status of the source field when it is a classified claim. */
  readonly claimStatus?: () => string | undefined;
  /** FNV-1a fingerprint of `read()` when the source was reviewed. */
  readonly fingerprint?: string;
  /** Facts this source asserts, compared across sources for contradictions. */
  readonly facts?: () => Readonly<Record<string, string>>;
  /** Public page that shows this content. Only `fact` statements are cited. */
  readonly citation?: { readonly label: string; readonly href: string };
  readonly jurisdiction?: string;
  readonly reviewedAt: string;
  readonly reviewDue: string;
  /** Commit the review was made against. */
  readonly reviewedSha: string;
}

export interface EvidenceStatement {
  readonly kind: 'route' | 'fact' | 'limit';
  /** What the answer asserts, in plain words. */
  readonly statement: string;
  readonly source: string;
  /** Exact text that must still be present in the source. */
  readonly excerpt: string;
  /** Fact key compared across sources (fact statements only). */
  readonly fact?: string;
}

export interface ResponseEvidence {
  readonly responseId: string;
  readonly version: number;
  /** FNV-1a of the exact approved answer text and link targets. */
  readonly answerFingerprint: string;
  readonly approval: {
    readonly status: 'APPROVED_WITH_CONDITION' | 'APPROVED';
    readonly permission: ApprovalPermission;
    readonly approver: string;
    readonly date: string;
    /** Sarah's public-copy approval is tracked separately and never inferred. */
    readonly publicCopy: 'PENDING' | 'APPROVED';
  };
  readonly reviewDue: string;
  readonly statements: readonly EvidenceStatement[];
}

export type BlockReason =
  | 'no-evidence'
  | 'answer-changed'
  | 'not-approved-for-context'
  | 'approval-expired'
  | 'source-missing'
  | 'source-not-eligible'
  | 'source-not-confirmed'
  | 'source-changed'
  | 'excerpt-missing'
  | 'source-expired'
  | 'contradiction';

export interface Citation {
  readonly label: string;
  readonly href: string;
  readonly reviewedAt: string;
}

export type Eligibility =
  | {
      readonly status: 'eligible';
      readonly version: number;
      readonly citations: readonly Citation[];
    }
  | { readonly status: 'blocked'; readonly reasons: readonly BlockReason[] };

export type KnowledgeContext = 'review' | 'production';

/** Small, stable, dependency-free fingerprint. Not a security hash. */
export function fingerprint(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function answerFingerprint(answer: {
  readonly text: string;
  readonly links: readonly { readonly href: string }[];
}): string {
  return fingerprint([answer.text, ...answer.links.map((link) => link.href)].join('\n'));
}

/** Compare facts by their words, so punctuation and accents never cause a false conflict. */
export function normaliseFact(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function due(date: string, now: Date): boolean {
  // Valid through the whole review-due day.
  return now.getTime() > new Date(`${date}T23:59:59.999Z`).getTime();
}

export interface EvaluateOptions {
  readonly now: Date;
  readonly context: KnowledgeContext;
  readonly sources: readonly KnowledgeSource[];
  readonly evidence: readonly ResponseEvidence[];
}

export function evaluateResponse(
  answer: {
    readonly id: string;
    readonly text: string;
    readonly links: readonly { readonly href: string }[];
  },
  { now, context, sources, evidence }: EvaluateOptions,
): Eligibility {
  const record = evidence.find((item) => item.responseId === answer.id);
  if (!record || record.statements.length === 0)
    return { status: 'blocked', reasons: ['no-evidence'] };

  const reasons = new Set<BlockReason>();
  if (record.answerFingerprint !== answerFingerprint(answer)) reasons.add('answer-changed');
  if (context === 'production' && record.approval.permission !== 'PUBLIC_PRODUCTION')
    reasons.add('not-approved-for-context');
  if (due(record.reviewDue, now)) reasons.add('approval-expired');

  const citations: Citation[] = [];
  for (const statement of record.statements) {
    const source = sources.find((item) => item.id === statement.source);
    if (!source) {
      reasons.add('source-missing');
      continue;
    }
    if (source.status !== 'approved' || source.kind === 'official')
      reasons.add('source-not-eligible');
    if (due(source.reviewDue, now)) reasons.add('source-expired');
    if (source.claimStatus && source.claimStatus() !== 'confirmed')
      reasons.add('source-not-confirmed');
    if (statement.kind === 'fact' && (source.kind !== 'website' || !source.fingerprint))
      reasons.add('source-not-eligible');
    if (source.read) {
      const text = source.read();
      if (text === undefined) reasons.add('source-missing');
      else {
        if (source.fingerprint && fingerprint(text) !== source.fingerprint)
          reasons.add('source-changed');
        if (!text.includes(statement.excerpt)) reasons.add('excerpt-missing');
      }
    } else if (statement.kind !== 'limit') {
      // Only internal limits may rest on a test-time-only source.
      reasons.add('source-not-eligible');
    }
    if (statement.fact) {
      const values = new Set(
        sources
          .filter((item) => item.status === 'approved')
          .map((item) => item.facts?.()[statement.fact!])
          .filter((value): value is string => value !== undefined)
          .map(normaliseFact),
      );
      if (values.size !== 1) reasons.add('contradiction');
    }
    if (
      statement.kind === 'fact' &&
      source.citation &&
      !citations.some((c) => c.href === source.citation!.href)
    )
      citations.push({ ...source.citation, reviewedAt: source.reviewedAt });
  }

  return reasons.size
    ? { status: 'blocked', reasons: [...reasons] }
    : { status: 'eligible', version: record.version, citations };
}
