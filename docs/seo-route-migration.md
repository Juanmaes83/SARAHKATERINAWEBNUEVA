# SEO routes, sitemap, redirects and entity graph

Status: **INFRASTRUCTURE READY · NOTHING PUBLISHED** · Updated: 2026-10-08

This page explains the technical SEO foundation. The data lives in code, so tests
can enforce it:

| Module | Role |
|---|---|
| `lib/seo/routes.ts` | Route manifest. It lists every page with its preview path, its production path (`null` while unresolved), its status (`laboratory`, `unresolved` or `approved`), indexing and sitemap eligibility, its structured-data kind and its language alternates. |
| `app/sitemap.ts` | Built from the manifest. Only `approved` routes with a decided production path can appear, and only when the site-wide indexing switch is on. **Today it is empty**, even in production with indexing on. |
| `app/robots.ts` | Unchanged fail-safe. It disallows everything unless the site is in production mode **and** explicitly indexable. Laboratory routes are always disallowed. |
| `lib/seo/metadata.ts` | Builds hreflang **only** from alternates declared in the manifest. The old guessed `/es<path>` alternate is removed: it would have advertised URLs that return 404 as soon as indexing was switched on. |
| `lib/seo/redirects.ts` | Migration registry for the current production site and the legacy Spanish-domain pages. `activeRedirects()` feeds `next.config.ts`. **Today it returns no redirects:** no mapping is approved and every target path is unresolved. |
| `lib/seo/entity-graph.ts` | Builder and validator for a ProfessionalService + Person + WebSite graph, using confirmed facts only. **It is not emitted** (AGENTS.md §7.4). `entityGraphEmissionAllowed()` is false on every route. |

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

1. **Public paths for each preview route (D2-01).** Set `productionPath` and `status: 'approved'` in `lib/seo/routes.ts`. The sitemap, canonical URLs and the redirect targets then follow automatically.
2. **Each migration mapping.** Set `status: 'approved'` in `lib/seo/redirects.ts`. The redirect becomes active once its target route is publishable.
3. **Spanish routes.** Declare `alternates.es` only for a Spanish page that actually exists.
4. **Structured data.** Lift AGENTS.md §7.4 (descriptor and legal entity) and enable indexing. Then render the graph where `entityGraphEmissionAllowed()` is true.
5. **Indexing.** Set `NEXT_PUBLIC_SITE_MODE=production`, `NEXT_PUBLIC_SITE_INDEXABLE=true` and `NEXT_PUBLIC_SITE_URL` to the approved www origin. This is a separate publication decision.
