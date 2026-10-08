import { isSafeHref } from './schema';

/**
 * The only inline syntax the editor accepts:
 *
 *   **bold**            strong emphasis
 *   [label](/path)      link — site paths, https, mailto, tel only
 *
 * Parsed into tokens that React renders as text nodes, so no string from the
 * database is ever interpreted as HTML. An unsafe link target degrades to its
 * plain label.
 */
export type InlineToken =
  | { readonly kind: 'text'; readonly value: string }
  | { readonly kind: 'strong'; readonly value: string }
  | { readonly kind: 'link'; readonly value: string; readonly href: string };

const PATTERN = /\*\*([^*]{1,400})\*\*|\[([^\]]{1,200})\]\(([^)\s]{1,600})\)/g;

export function parseInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;
  for (const match of input.matchAll(PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ kind: 'text', value: input.slice(last, index) });
    if (match[1] !== undefined) {
      tokens.push({ kind: 'strong', value: match[1] });
    } else {
      const label = match[2] ?? '';
      const href = match[3] ?? '';
      tokens.push(isSafeHref(href) ? { kind: 'link', value: label, href } : { kind: 'text', value: label });
    }
    last = index + match[0].length;
  }
  if (last < input.length) tokens.push({ kind: 'text', value: input.slice(last) });
  return tokens;
}

/** Plain text without inline markup (for meta descriptions, alt fallbacks, search). */
export function plainInline(input: string): string {
  return parseInline(input)
    .map((token) => token.value)
    .join('');
}

/** Every link target written inline in a text (for the link audit). */
export function inlineLinks(input: string): string[] {
  return parseInline(input).flatMap((token) => (token.kind === 'link' ? [token.href] : []));
}
