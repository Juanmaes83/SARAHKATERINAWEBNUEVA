import { SEO_ROUTES, resolveRouteIndexing, routeById, type SeoRoute } from './routes';
import type { JsonLdObject } from './jsonld';

/**
 * Entity graph builder: ProfessionalService + Person + WebSite, linked by @id.
 *
 * BUILT, VALIDATED AND TESTED — NOT EMITTED. AGENTS.md §7.4 still forbids
 * rendering Organization/Person/LocalBusiness JSON-LD, and every public route
 * is unresolved (lib/seo/routes.ts). `entityGraphEmissionAllowed()` encodes the
 * gate so that, when the owner opens it, emission is a configuration change
 * and the content is already reviewed.
 *
 * Every fact below is `confirmed` in this repository or in the strategic
 * source of truth (mother repo strategy/technical/ENTITY-SEO-GEO-ALIGNMENT.md
 * §5 and §11):
 *   - name "Sarah Katerina";
 *   - address: content/en/contact.ts `office.addressSource` (confirmed by
 *     Juanma, 2026-09-29);
 *   - telephone: lib/contact/channels.ts (confirmed, 2026-09-29);
 *   - email: NEXT_PUBLIC_CONTACT_EMAIL, the same configuration the contact
 *     page uses (no address literal in source, tests/governance.test.ts);
 *   - hours: content/en/contact.ts (weekdays 09:30–18:00 Spanish local time,
 *     confirmed from the live booking calendar);
 *   - credential: the approved SUMA descriptor (content/en/tax-advisory.ts,
 *     owner direction 2026-10-07, web PR #42).
 *
 * Deliberately ABSENT (do not add without a recorded decision): jobTitle
 * (institutional descriptor NEEDS_DECISION), aggregateRating, review,
 * priceRange, award, memberOf, geo, sameAs (no verified profile yet: the
 * public LinkedIn/Instagram headlines conflict with the positioning),
 * legalName, parentOrganization, VITA Host, "Group", property management,
 * RealEstateAgent.
 */

export const ENTITY_FACTS = {
  name: 'Sarah Katerina',
  address: {
    streetAddress: 'Calle Bazán 10',
    postalCode: '03181',
    addressLocality: 'Torrevieja',
    addressRegion: 'Alicante',
    addressCountry: 'ES',
  },
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '18:00' },
  credential:
    'Twenty years of experience inside SUMA Gestión Tributaria, the public body that manages local taxes in the province of Alicante.',
  areaServed: [
    { type: 'City', name: 'Torrevieja' },
    { type: 'Place', name: 'Costa Blanca' },
    { type: 'AdministrativeArea', name: 'Province of Alicante' },
    { type: 'Country', name: 'Spain' },
  ],
  audiences: ['International property buyers', 'Non-resident property owners'],
} as const;

export interface EntityGraphInput {
  /** Site origin from lib/seo/config.ts — never a literal host. */
  readonly siteUrl: string;
  /** E.164 telephone from lib/contact/channels.ts. */
  readonly telephone: string;
  /** From NEXT_PUBLIC_CONTACT_EMAIL; omitted when unconfigured. */
  readonly email?: string | null;
}

function origin(siteUrl: string): string {
  return new URL('/', siteUrl).toString();
}

export function buildEntityGraph({ siteUrl, telephone, email }: EntityGraphInput): JsonLdObject {
  const base = origin(siteUrl);
  const businessId = `${base}#business`;
  const personId = `${base}#sarah`;
  const websiteId = `${base}#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': businessId,
        name: ENTITY_FACTS.name,
        url: base,
        telephone,
        ...(email ? { email } : {}),
        address: { '@type': 'PostalAddress', ...ENTITY_FACTS.address },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [...ENTITY_FACTS.hours.days],
          opens: ENTITY_FACTS.hours.opens,
          closes: ENTITY_FACTS.hours.closes,
        },
        areaServed: ENTITY_FACTS.areaServed.map((area) => ({ '@type': area.type, name: area.name })),
        audience: ENTITY_FACTS.audiences.map((audienceType) => ({ '@type': 'Audience', audienceType })),
        founder: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: ENTITY_FACTS.name,
        description: ENTITY_FACTS.credential,
        worksFor: { '@id': businessId },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: base,
        name: ENTITY_FACTS.name,
        inLanguage: 'en',
        publisher: { '@id': businessId },
      },
    ],
  };
}

/** Keys that must never appear anywhere in the graph. */
const FORBIDDEN_KEYS = [
  'aggregateRating',
  'review',
  'priceRange',
  'award',
  'memberOf',
  'geo',
  'sameAs',
  'jobTitle',
  'legalName',
  'parentOrganization',
] as const;

/** Wording that would move the entity towards an agency, a portal or D-06. */
const FORBIDDEN_TEXT = [
  /\bVITA\b/i,
  /\bGroup\b/,
  /real estate/i,
  /realtor/i,
  /estate agen/i,
  /property management/i,
  /Tax Administration/i,
  /power of attorney/i,
];

const FORBIDDEN_TYPES = ['RealEstateAgent', 'LocalBusiness', 'Organization'];

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: string[];
}

function walk(value: unknown, path: string, visit: (key: string, value: unknown, path: string) => void): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, visit));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      visit(key, child, `${path}.${key}`);
      walk(child, `${path}.${key}`, visit);
    }
  }
}

/**
 * Structural and policy validation of a built graph: required node types,
 * `@id` present, unique and resolvable, URLs on the configured origin, and the
 * governance deny-lists (keys, `@type`s at any depth, wording).
 *
 * It does NOT verify that the facts are true, legally correct or a complete
 * and semantically valid schema.org description; that is the job of the
 * human fact review and of an external structured-data validator before
 * emission.
 */
export function validateEntityGraph(graph: JsonLdObject, siteUrl: string): ValidationResult {
  const errors: string[] = [];
  const base = origin(siteUrl);

  if (graph['@context'] !== 'https://schema.org') errors.push('@context must be https://schema.org');
  const nodes = graph['@graph'];
  if (!Array.isArray(nodes)) {
    return { valid: false, errors: [...errors, '@graph must be an array'] };
  }

  const ids = new Set<string>();
  for (const node of nodes) {
    const record = node as Record<string, unknown>;
    if (typeof record['@type'] !== 'string') errors.push('every node needs a string @type');
    if (typeof record['@id'] !== 'string') errors.push('every node needs an @id');
    else if (ids.has(record['@id'])) errors.push(`duplicate @id ${record['@id']}`);
    else ids.add(record['@id']);
  }

  for (const required of ['ProfessionalService', 'Person', 'WebSite']) {
    if (!nodes.some((node) => (node as Record<string, unknown>)['@type'] === required)) {
      errors.push(`missing ${required} node`);
    }
  }

  walk(graph, '$', (key, value, path) => {
    if ((FORBIDDEN_KEYS as readonly string[]).includes(key)) errors.push(`forbidden key ${path}`);
    if (key === '@type') {
      // A node's type may be a string or an array; check it at any depth.
      for (const type of Array.isArray(value) ? value : [value]) {
        if (FORBIDDEN_TYPES.includes(String(type))) errors.push(`forbidden @type ${String(type)} at ${path}`);
      }
    }
    if (key === '@id' && typeof value === 'string' && path.split('.').length > 3 && !ids.has(value)) {
      errors.push(`dangling reference ${path} → ${value}`);
    }
    if ((key === 'url' || key === '@id') && typeof value === 'string' && !value.startsWith(base)) {
      errors.push(`${path} is not on the site origin`);
    }
    if (typeof value === 'string') {
      for (const pattern of FORBIDDEN_TEXT) {
        if (pattern.test(value)) errors.push(`forbidden wording at ${path}: ${pattern}`);
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * Emission gate. All must hold: the owner has lifted AGENTS.md §7.4
 * (`entityJsonLdApproved`); the route declares entity structured data; and the
 * route's public path is indexable under the shared route-level decision
 * (`resolveRouteIndexing()`: site-level gate open, route approved with a valid
 * public path, index-eligible). Emit only on that public path, never on the
 * preview. Today: false on every route.
 */
export function entityGraphEmissionAllowed(
  routeId: string,
  options: { siteIndexable: boolean; entityJsonLdApproved: boolean; servedPath?: string },
  routes: readonly SeoRoute[] = SEO_ROUTES,
): boolean {
  const route = routeById(routeId, routes);
  if (!route || !options.entityJsonLdApproved || route.structuredData !== 'entity') return false;
  if (route.productionPath === null) return false;
  if (options.servedPath !== route.productionPath) return false;
  return resolveRouteIndexing(options.servedPath, { siteIndexable: options.siteIndexable }, routes).indexable;
}
