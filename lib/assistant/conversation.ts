import {
  ASSISTANT_RESPONSES,
  ASSISTANT_OPENER,
  type AssistantResponseId,
} from '@/content/en/assistant';

const TERMS: Partial<Record<AssistantResponseId, readonly string[]>> = {
  A02: ['buy', 'buying', 'purchase', 'property', 'comprar', 'vivienda'],
  A03: ['invest', 'investment', 'invertir', 'inversion'],
  A04: ['tax', 'taxes', 'fiscal', 'impuesto', 'itp', 'vat', 'iva'],
  A08: ['contact', 'appointment', 'booking', 'call', 'cita', 'contacto'],
  A05: ['team', 'sarah', 'equipo'],
  A06: ['article', 'insights', 'blog', 'articulo'],
  A07: ['case', 'cases', 'casos'],
  A09: ['office', 'address', 'visit', 'oficina', 'direccion'],
  A11: ['price', 'prices', 'availability', 'cost', 'precio', 'disponibilidad'],
};

/** Local topic routing, never an interpretation or a generated answer. */
export function matchAssistantTopic(question: string): AssistantResponseId {
  const words = question
    .slice(0, 240)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z]+/);
  const matches = Object.entries(TERMS).filter(([, terms]) =>
    terms?.some((term) => words.includes(term)),
  );
  return matches.length === 1 ? (matches[0]![0] as AssistantResponseId) : 'A12';
}

/** Only explicitly selected catalogue topics travel; never raw visitor text. */
export function assistantSummary(ids: readonly AssistantResponseId[]): string {
  const labels = [...new Set(ids)]
    .map((id) => ASSISTANT_RESPONSES.find((item) => item.id === id)?.label)
    .filter(Boolean);
  return labels.length
    ? `${ASSISTANT_OPENER}\nTopics I would like to discuss: ${labels.join(', ')}.`
    : ASSISTANT_OPENER;
}
