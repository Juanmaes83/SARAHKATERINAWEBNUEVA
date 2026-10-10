import { ASSISTANT_RESPONSES } from './assistant';
import { ASSISTANT_FALLBACK_ID, responseEligibility } from './assistant-evidence';
import { TOPIC_TERMS } from '@/lib/assistant/conversation';
import type { Passage } from '@/lib/assistant/grounding';
import type { Eligibility, KnowledgeContext } from '@/lib/assistant/knowledge';

/**
 * The only corpus a future model may read: catalogue answers whose evidence
 * is eligible right now (package A). No Studio content, drafts, repository
 * documents or official sources. The fallback A12 is the abstention itself,
 * not a passage.
 */
export function approvedCorpus(
  context: KnowledgeContext,
  now: Date = new Date(),
  eligibility: (id: string) => Eligibility = (id) => responseEligibility(id, context, now),
): Passage[] {
  return ASSISTANT_RESPONSES.filter((item) => item.id !== ASSISTANT_FALLBACK_ID).flatMap((item) => {
    const result = eligibility(item.id);
    if (result.status !== 'eligible') return [];
    return [
      {
        id: item.id,
        label: item.label,
        text: item.text,
        keywords: TOPIC_TERMS[item.id] ?? [],
        version: result.version,
        citations: result.citations,
      },
    ];
  });
}
