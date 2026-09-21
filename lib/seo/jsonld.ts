/**
 * Typed, modular JSON-LD builders.
 *
 * GOVERNANCE — read before adding anything here.
 *
 * seo-final-audit-2026-09.md P0 #5 requires Organization/Person/WebSite/Service
 * schema to be *validated* and semantically correct, and the master audit
 * blocks publishing claims without a verified evidence dossier. The following
 * are NOT confirmed anywhere in the source of truth:
 *
 *   - legal entity name, company number, registered address
 *   - telephone, email, social profiles
 *   - the final institutional descriptor (NEEDS_DECISION)
 *   - the canonical production host (OPEN conflict, non-www vs www)
 *
 * Therefore this module deliberately emits NO Organization and NO Person
 * schema. Only structure that is true by construction is available, and the
 * application currently renders none of it on any page.
 */

export type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];

export interface JsonLdObject {
  readonly [key: string]: JsonLdValue | undefined;
}

export interface JsonLd extends JsonLdObject {
  readonly '@context': 'https://schema.org';
  readonly '@type': string;
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

/**
 * BreadcrumbList is safe: it describes navigation this application actually
 * renders, and asserts no business fact.
 */
export function breadcrumbList(items: readonly BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * WebSite schema WITHOUT publisher/SearchAction.
 *
 * `publisher` would require the unresolved Organization entity and
 * `SearchAction` would require a search endpoint that does not exist.
 *
 * NOT rendered on any page in this phase: asserting a website entity against a
 * preview host would contradict the open canonical-host decision.
 */
export function webSite(input: { name: string; url: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: input.name,
    url: input.url,
    inLanguage: 'en',
  };
}

/**
 * Serialises JSON-LD for a <script type="application/ld+json"> tag.
 * Escapes `<` so a value can never break out of the script element.
 */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\u003c');
}
