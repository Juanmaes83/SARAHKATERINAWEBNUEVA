# SEO routes, sitemap, redirects and entity graph

> **Reconciliación 2026-10-09:** [Project State](PROJECT-STATE-2026-10-09.md) distingue los resultados posteriores y pendientes actuales. Las instrucciones antiguas de importación, invitación o publicación no deben repetirse como trabajo pendiente.

Status: **INFRASTRUCTURE READY · NOTHING PUBLISHED** · Updated: 2026-10-08

This page explains the technical SEO foundation. The data lives in code, so tests
can enforce it.

## Two gates, two responsibilities

| Gate | Decides | Source | Read by |
|---|---|---|---|
| **Site level** | Whether indexing may be enabled at all: production mode **and** an explicit `NEXT_PUBLIC_SITE_INDEXABLE=true`. Default, preview and invalid configuration stay closed. | `siteConfig.indexable` (`lib/seo/config.ts`) | `app/robots.ts`, the global `X-Robots-Tag` header in `next.config.ts`, and, as one input, the route-level decision |
| **Route level** | Whether a given route is publishable, its public path, index and sitemap eligibility, language alternates, migration targets and structured-data eligibility. | The manifest (`lib/seo/routes.ts`) through one shared function, `resolveRouteIndexing()` | Page robots meta, canonical/Open Graph and hreflang (`lib/seo/metadata.ts`), `app/sitemap.ts`, redirect targets (`lib/seo/redirects.ts`), the entity-graph gate (`lib/seo/entity-graph.ts`) |

**A page is indexable only when both gates are open.** The route must be known and `approved`, with a valid, non-laboratory `productionPath`, `indexEligible: true` and no explicit laboratory flag, and the URL being served must be that public path, not its `/preview/*` URL. Anything else fails closed: an unknown route, a call without route context (the layout fallback `baseMetadata`), an unresolved route, a laboratory route, `indexEligible: false` or a missing `productionPath`.

`robots.txt` and the global header are deliberately **not** route-aware. Opening the site gate allows crawling and lifts the global header, but each page still carries its own route-level `noindex` until that route is approved. `/preview/*` and `/foundation` keep their own `X-Robots-Tag: noindex, nofollow` in every mode.

| Module | Role |
|---|---|
| `lib/seo/routes.ts` | Route manifest plus the shared decision `resolveRouteIndexing()`. It also checks path validity (`isValidPublicPath()`) and the integrity of the manifest itself (`manifestErrors()`: unique ids and public paths, no malformed or laboratory public path). |
| `lib/seo/metadata.ts` | Robots meta per route; fails closed without route context. Canonical and Open Graph resolve to the **approved public path** when one exists, including from the route's `/preview/*` URL, which stays `noindex`. Without an approved public path they keep the served path; no production URL is invented. hreflang is emitted only on an indexable public URL, and only for a declared alternate whose target is itself an existing, approved, indexable manifest route in that locale that declares the route back. A declared string alone emits nothing. |
| `app/sitemap.ts` | Sitemap-eligible routes whose public path is indexable under the same shared decision. **Today it is empty**, even in production with indexing on. |
| `app/robots.ts` | Site-level fail-safe only. It disallows everything unless the site is in production mode **and** explicitly indexable; laboratory routes are always disallowed. |
| `next.config.ts` | The global `X-Robots-Tag: noindex, nofollow` is lifted only by `siteConfig.indexable`: the same mode + flag rule, not the flag alone. Also serves `activeRedirects()`. |
| `lib/seo/redirects.ts` | Migration registry for the current production site and the legacy Spanish-domain pages. `activeRedirects()` emits only `approved` mappings whose target route is publishable. They are served as Next.js permanent redirects, which answer **HTTP 308**, not 301. Redirects have their own approval and are not tied to the indexing switch. **Today it returns no redirects.** |
| `lib/seo/entity-graph.ts` | Builder for a ProfessionalService + Person + WebSite graph from confirmed facts, plus a **structural and policy validator**. The validator checks required node types, unique and resolvable `@id`s, URLs on the configured origin, and deny-listed keys, `@type`s (at any depth) and wording. It does **not** prove the facts true, legally correct or a complete, semantically valid schema.org description. **It is not emitted** (AGENTS.md §7.4). `entityGraphEmissionAllowed()` is false on every route. |

## What a manifest path does not do

Setting `productionPath` in the manifest **does not create an App Router page** and does not guarantee an HTTP 200 at that path. Today every page lives under `/preview/*`. Before any route is approved, a launch check must confirm:

1. the App Router page exists at the public path;
2. it answers 200 on the build that will be served;
3. its robots meta reads `index, follow` only there, while the `/preview/*` twin stays `noindex`.

Until that page exists, canonical URLs pointing at the public path would point at a 404. That is why approval and the page itself must land together.

## Migration registry summary (2026-10-08)

| Group | URLs | Proposed target | Status |
|---|---|---|---|
| Home, About, Services, service pages, Investment, Contact, Book a call | 9 EN | home, team, property-purchase, tax-advisory, investment, contact | `decision_required`: target public paths unresolved (D2-01) |
| Indexed tax landings (`/modelo-210-help`, `/english-tax-advisor-costa-blanca`, `/foreign-buyer-tax-guide`) and insights | 7 EN | tax-advisory, property-purchase, investment, or none | `decision_required`: no equivalent page; tax, legal and financial content needs competent review |
| Case studies, guides, tax diagnostic | 5 EN | none | `decision_required`: needs permission and evidence, or pricing approval (D2-04) |
| Group architecture, property management, investment opportunities | 3 EN + 2 ES | none | `retire_candidate` / `decision_required`: D-06 and HOLD |
| Spanish pages (`/es/*`) | 11 ES | closest English service | `decision_required`: Spanish architecture open |
| Privacy | 1 | same path | `keep`: legal text BLOCKED_BY_OWNER_OR_LEGAL |
| Legacy Spanish domain (`/`, `/compra-venta/`, `/compradores-extranjeros/`) | 3 | home, property-purchase | `decision_required`: these are domain-level redirects, outside this app. Two of the pages are still served and indexable (observed 2026-10-08) |

## What a human must decide to switch each piece on

1. **Public paths for each preview route (D2-01).** Build the App Router page at the public path, then set `productionPath` and `status: 'approved'` in `lib/seo/routes.ts`. Once the site gate is also open, the robots meta, canonical, sitemap and redirect targets follow from that one decision. The launch check above (page exists, answers 200) is a separate requirement.
2. **Each migration mapping.** Set `status: 'approved'` in `lib/seo/redirects.ts`. The redirect becomes active (HTTP 308) once its target route is publishable.
3. **Spanish routes.** Build the Spanish page, add it to the manifest with `locale: 'es'`, and declare the alternates on both routes. hreflang is emitted only when both are approved, indexable and reciprocal.
4. **Structured data.** Lift AGENTS.md §7.4 (descriptor and legal entity) and enable indexing. Then render the graph where `entityGraphEmissionAllowed()` is true.
5. **Indexing.** Set `NEXT_PUBLIC_SITE_MODE=production`, `NEXT_PUBLIC_SITE_INDEXABLE=true` and `NEXT_PUBLIC_SITE_URL` to the approved www origin. This is a separate publication decision.
