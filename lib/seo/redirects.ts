import { SEO_ROUTES, isPublishable, routeById, type SeoRoute } from './routes';

/**
 * Migration registry: every URL of the current production site (and of the
 * legacy Spanish-domain site) mapped to its proposed destination in this
 * repository, with a DECISION status.
 *
 * Only `status: 'approved'` mappings whose target route is publishable become
 * real HTTP redirects (see `activeRedirects()` and next.config.ts). They are
 * served as Next.js permanent redirects, which answer **308** (a 301 would need
 * an explicit `statusCode: 301`; none is configured). Redirects are independent
 * of the indexing switch: their gate is the mapping's own approval plus a
 * publishable target. Everything else is recorded — never redirected silently.
 * Equivalent legacy entry points are approved by the owner’s migration instruction\n * on 2026-10-09. Same-path content stays in the canonical Studio publications.
 *
 * Sources:
 *   - production `sitemap.xml` (30 URLs) and the home page links, read
 *     2026-10-07/08 (mother repository: strategy/technical/
 *     PRODUCTION-CORRECTION-PACK-ANNEXA.md and offpage-registers/);
 *   - legacy Spanish-domain pages still served and indexable
 *     (offpage-registers/brand-mentions.csv, 2026-10-08).
 *
 * Paths only, never hosts (AGENTS.md §7.3, §12). The legacy Spanish domain is
 * named by the `LEGACY_ES_DOMAIN` origin label, not by its hostname; any
 * redirect from it is a domain-level (DNS/hosting) change outside this app.
 */

export type MigrationStatus =
  /**
   * Approved by the owner; becomes a permanent redirect once the target route
   * is publishable. Next.js `permanent: true` answers HTTP 308 (not 301).
   */
  | 'approved'
  /** Destination or treatment needs a human decision. Never redirected. */
  | 'decision_required'
  /** The URL must keep existing at the same path on the new site. */
  | 'keep'
  /** Not to be carried over; candidate for removal or 410 after a decision. */
  | 'retire_candidate';

export type MigrationOrigin = 'CURRENT_PRODUCTION' | 'LEGACY_ES_DOMAIN';

export interface MigrationEntry {
  readonly origin: MigrationOrigin;
  readonly oldPath: string;
  readonly locale: 'en' | 'es';
  /** Proposed destination in SEO_ROUTES, or `null` when there is no equivalent. */
  readonly targetRouteId: string | null;
  readonly status: MigrationStatus;
  /** Why the entry has this status, and what decision is pending. */
  readonly decision: string;
}

const SPANISH_OPEN =
  'Spanish route architecture and hreflang are open (docs/phase-2-decision-gate.md §5). No /es route exists here.';
const D06 =
  'D-06 (affiliated brands and the group architecture, AGENTS.md §9) is unexecuted and Property Management is on HOLD. Must not be carried over; owner decides permanent-redirect-to-home vs 410.';
const PRESERVED = 'Legacy path preserved by the public App Router and canonical Studio; read published content only.';
const MIGRATED = 'Owner instructed implementation/publication of legacy on 2026-10-09; use the existing equivalent service/resource destination without copying obsolete claims.';

const en = (
  oldPath: string,
  targetRouteId: string | null,
  status: MigrationStatus,
  decision: string,
): MigrationEntry => ({ origin: 'CURRENT_PRODUCTION', oldPath, locale: 'en', targetRouteId, status, decision });

const es = (oldPath: string, targetRouteId: string | null, decision = SPANISH_OPEN): MigrationEntry => ({
  origin: 'CURRENT_PRODUCTION',
  oldPath,
  locale: 'es',
  targetRouteId,
  status: 'decision_required',
  decision,
});

export const MIGRATION_REGISTRY: readonly MigrationEntry[] = [
  // ── Current production, English (sitemap) ──────────────────────────────
  en('/', 'home', 'keep', PRESERVED),
  en('/about', 'team', 'keep', PRESERVED),
  en('/about/the-group', null, 'retire_candidate', D06),
  en('/services', 'home', 'approved', 'Owner-approved launch 2026-10-08: equivalent public destination.'),
  en('/services/property-purchase', 'property-purchase', 'keep', PRESERVED),
  en('/services/tax-advisory', 'tax-advisory', 'keep', PRESERVED),
  en('/services/investment-advisory', 'investment', 'approved', 'Owner-approved launch 2026-10-08: equivalent public destination.'),
  en('/services/property-management', null, 'retire_candidate', D06),
  en('/investment', 'investment', 'keep', PRESERVED),
  en('/investment/opportunities', null, 'retire_candidate', 'Listing-style "opportunities" content conflicts with the buyer-side positioning (not an agency or portal). Owner decides permanent-redirect-to-investment vs 410.'),
  en('/case-studies', 'case-studies', 'keep', PRESERVED),
  en('/insights', 'insights', 'keep', PRESERVED),
  en('/case-studies/british-buyer-torrevieja', 'case-studies-detail', 'keep', PRESERVED),
  en('/case-studies/dutch-investor-orihuela', 'case-studies-detail', 'keep', PRESERVED),
  en('/case-studies/german-retiree-guardamar', 'case-studies-detail', 'keep', PRESERVED),
  en('/case-studies/norwegian-couple-la-zenia', 'case-studies-detail', 'keep', PRESERVED),
  en('/insights/five-documents-before-arras', 'insights-detail', 'keep', PRESERVED),
  en('/insights/gross-vs-net-yield-costa-blanca', 'insights-detail', 'keep', PRESERVED),
  en('/insights/modelo-210-explained', 'insights-detail', 'keep', PRESERVED),
  en('/insights/nie-application-three-routes', 'insights-detail', 'keep', PRESERVED),
  en('/insights/plusvalia-2021-constitutional-ruling', 'insights-detail', 'keep', PRESERVED),
  en('/insights/short-term-rental-licence-valencian-community', 'insights-detail', 'keep', PRESERVED),
  en('/guides', 'insights', 'approved', MIGRATED),
  en('/contact', 'contact', 'keep', PRESERVED),
  en('/book-a-call', 'contact', 'approved', 'Owner-approved launch 2026-10-08: equivalent public destination.'),
  en('/modelo-210-help', 'tax-advisory', 'approved', MIGRATED),
  en('/english-tax-advisor-costa-blanca', 'tax-advisory', 'approved', MIGRATED),
  en('/foreign-buyer-tax-guide', 'tax-advisory', 'approved', MIGRATED),
  en('/tax-diagnostic', null, 'decision_required', 'Paid product flow on the current site (checkout and payment paths are disallowed in its robots.txt). Pricing publication is not approved here (D2-04).'),
  en('/privacy', null, 'keep', 'A privacy policy must exist on the new site at a stable URL before launch. Legal text: BLOCKED_BY_OWNER_OR_LEGAL.'),

  // ── Current production, Spanish (sitemap) ──────────────────────────────
  es('/es', 'home'),
  es('/es/sobre-sarah', 'team'),
  es('/es/sobre-sarah/el-grupo', null, `${SPANISH_OPEN} ${D06}`),
  es('/es/servicios', 'home'),
  es('/es/servicios/compra-propiedad', 'property-purchase'),
  es('/es/servicios/fiscalidad', 'tax-advisory'),
  es('/es/servicios/inversion', 'investment'),
  es('/es/servicios/gestion-propiedad', null, `${SPANISH_OPEN} ${D06}`),
  es('/es/inversion', 'investment'),
  es('/es/inversion/oportunidades', null, SPANISH_OPEN),
  es('/es/casos-de-exito', null, SPANISH_OPEN),
  es('/es/contacto', 'contact'),
  es('/es/reservar-llamada', 'contact'),

  // ── Legacy Spanish domain (domain-level; outside this app) ─────────────
  {
    origin: 'LEGACY_ES_DOMAIN',
    oldPath: '/',
    locale: 'es',
    targetRouteId: 'home',
    status: 'decision_required',
    decision: 'Already redirects to the current production home (observed 2026-10-08). Keep the domain-level redirect; retarget once the public home path is decided.',
  },
  {
    origin: 'LEGACY_ES_DOMAIN',
    oldPath: '/compra-venta/',
    locale: 'es',
    targetRouteId: 'property-purchase',
    status: 'decision_required',
    decision: 'Still served and indexable with sales-oriented content (observed 2026-10-08). Needs a domain-level permanent redirect (to the purchase service) or noindex; owner decision, outside this app.',
  },
  {
    origin: 'LEGACY_ES_DOMAIN',
    oldPath: '/compradores-extranjeros/',
    locale: 'es',
    targetRouteId: 'property-purchase',
    status: 'decision_required',
    decision: 'Still served and indexable (observed 2026-10-08). Needs a domain-level permanent redirect or noindex; owner decision, outside this app.',
  },
];

export interface NextRedirect {
  readonly source: string;
  readonly destination: string;
  readonly permanent: true;
}

/**
 * Redirects this app may serve: approved, same-domain entries whose target is
 * publishable. Kept URLs never redirect, and external-domain/Spanish decisions\n * remain inactive until they have their own approved implementation.
 */
export function activeRedirects(
  registry: readonly MigrationEntry[] = MIGRATION_REGISTRY,
  routes: readonly SeoRoute[] = SEO_ROUTES,
): NextRedirect[] {
  return registry.flatMap((entry) => {
    if (entry.status !== 'approved' || entry.origin !== 'CURRENT_PRODUCTION' || !entry.targetRouteId) {
      return [];
    }
    const target = routeById(entry.targetRouteId, routes);
    if (!target || !isPublishable(target) || target.productionPath === entry.oldPath) return [];
    return [{ source: entry.oldPath, destination: target.productionPath, permanent: true }];
  });
}
