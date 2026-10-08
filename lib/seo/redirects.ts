import { SEO_ROUTES, isPublishable, routeById, type SeoRoute } from './routes';

/**
 * Migration registry: every URL of the current production site (and of the
 * legacy Spanish-domain site) mapped to its proposed destination in this
 * repository, with a DECISION status.
 *
 * Only `status: 'approved'` mappings whose target route is publishable become
 * real HTTP redirects (see `activeRedirects()` and next.config.ts). Everything
 * else is recorded — never redirected silently. Today no mapping is approved,
 * so this produces zero redirects, by design.
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
  /** Approved by the owner; becomes a 301 once the target route is publishable. */
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
  'D-06 (affiliated brands and the group architecture, AGENTS.md §9) is unexecuted and Property Management is on HOLD. Must not be carried over; owner decides 301-to-home vs 410.';
const CONTENT_GAP =
  'No equivalent page in this repository. Owner decides: rebuild with approved content, redirect to the closest service, or retire.';
const TARGET_UNRESOLVED = 'Target route exists as a preview, but its public path is unresolved (D2-01).';

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
  en('/', 'home', 'decision_required', TARGET_UNRESOLVED),
  en('/about', 'team', 'decision_required', `${TARGET_UNRESOLVED} Team is the closest equivalent to About.`),
  en('/about/the-group', null, 'retire_candidate', D06),
  en('/services', 'home', 'decision_required', `${TARGET_UNRESOLVED} No services index exists; the home service doors are the closest equivalent.`),
  en('/services/property-purchase', 'property-purchase', 'decision_required', TARGET_UNRESOLVED),
  en('/services/tax-advisory', 'tax-advisory', 'decision_required', TARGET_UNRESOLVED),
  en('/services/investment-advisory', 'investment', 'decision_required', TARGET_UNRESOLVED),
  en('/services/property-management', null, 'retire_candidate', D06),
  en('/investment', 'investment', 'decision_required', TARGET_UNRESOLVED),
  en('/investment/opportunities', null, 'retire_candidate', 'Listing-style "opportunities" content conflicts with the buyer-side positioning (not an agency or portal). Owner decides 301-to-investment vs 410.'),
  en('/case-studies', null, 'decision_required', `${CONTENT_GAP} Case content needs permission and verified evidence (AGENTS.md §13).`),
  en('/case-studies/dutch-investor-orihuela', null, 'decision_required', `${CONTENT_GAP} Client permission and evidence unverified.`),
  en('/case-studies/british-buyer-torrevieja', null, 'decision_required', `${CONTENT_GAP} Client permission and evidence unverified.`),
  en('/insights', null, 'decision_required', CONTENT_GAP),
  en('/insights/modelo-210-explained', 'tax-advisory', 'decision_required', `${CONTENT_GAP} Tax content needs competent review (AGENTS.md §11).`),
  en('/insights/five-documents-before-arras', 'property-purchase', 'decision_required', `${CONTENT_GAP} Legal content needs competent review (AGENTS.md §11).`),
  en('/insights/gross-vs-net-yield-costa-blanca', 'investment', 'decision_required', `${CONTENT_GAP} Financial content needs competent review (AGENTS.md §11).`),
  en('/guides', null, 'decision_required', CONTENT_GAP),
  en('/contact', 'contact', 'decision_required', TARGET_UNRESOLVED),
  en('/book-a-call', 'contact', 'decision_required', `${TARGET_UNRESOLVED} Booking runs on the configured external booking page.`),
  en('/modelo-210-help', 'tax-advisory', 'decision_required', `${CONTENT_GAP} Indexed landing page; tax content needs review.`),
  en('/english-tax-advisor-costa-blanca', 'tax-advisory', 'decision_required', `${CONTENT_GAP} Indexed landing page.`),
  en('/foreign-buyer-tax-guide', 'tax-advisory', 'decision_required', `${CONTENT_GAP} Indexed landing page; tax content needs review.`),
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
    decision: 'Still served and indexable with sales-oriented content (observed 2026-10-08). Needs a domain-level 301 (to the purchase service) or noindex; owner decision, outside this app.',
  },
  {
    origin: 'LEGACY_ES_DOMAIN',
    oldPath: '/compradores-extranjeros/',
    locale: 'es',
    targetRouteId: 'property-purchase',
    status: 'decision_required',
    decision: 'Still served and indexable (observed 2026-10-08). Needs a domain-level 301 or noindex; owner decision, outside this app.',
  },
];

export interface NextRedirect {
  readonly source: string;
  readonly destination: string;
  readonly permanent: true;
}

/**
 * Redirects this app may serve: approved, same-domain entries whose target is
 * publishable. Today: none.
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
