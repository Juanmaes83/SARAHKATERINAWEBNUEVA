/**
 * Per-destination internal link check (Phase 2B).
 *
 * A link is valid only when its path is an App Router route and, if it has a
 * fragment, that id is rendered on THAT destination page. An id that exists
 * on some other page proves nothing. A destination with a fragment but no
 * rendered HTML to look in is an error, never a silent pass.
 */

export interface LinkRef {
  /** Where the href comes from, e.g. `FAQ_RELATED` or `rendered <a>`. */
  readonly registry: string;
  /** Entry within the registry, e.g. `tax.purchase`. */
  readonly key: string;
  /** Page the link is shown on (base for relative hrefs). */
  readonly source: string;
  readonly href: string;
}

export interface DestinationIndex {
  readonly routes: ReadonlySet<string>;
  /** Ids rendered on a route, or `null` when there is no HTML for it. */
  idsFor(route: string): ReadonlySet<string> | null;
}

const BASE = 'http://link-check.invalid';

/** Resolves an href against its source page: path (no trailing slash) and fragment. */
export function resolveHref(
  href: string,
  source: string,
): { internal: boolean; path: string; hash: string | null } {
  const url = new URL(href, `${BASE}${source}`);
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
  const hash = url.hash ? decodeURIComponent(url.hash.slice(1)) : null;
  return { internal: url.origin === BASE, path, hash };
}

/** `null` when the link is valid, otherwise an error naming registry, source, href and the failed target. */
export function checkLink(ref: LinkRef, index: DestinationIndex): string | null {
  const where = `${ref.registry}[${ref.key}] on ${ref.source}: ${ref.href}`;
  const { internal, path, hash } = resolveHref(ref.href, ref.source);
  if (!internal) return `${where} → not an internal link`;
  if (!index.routes.has(path)) return `${where} → route ${path} does not exist`;
  if (hash === null) return null;
  const ids = index.idsFor(path);
  if (ids === null) return `${where} → no rendered HTML for ${path} to verify #${hash}`;
  if (!ids.has(hash)) return `${where} → #${hash} is not rendered on ${path}`;
  return null;
}
