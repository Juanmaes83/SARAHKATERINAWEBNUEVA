import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

/**
 * Shared helpers for the rendered-HTML checks (Phase 2B).
 *
 * They read the prerendered HTML that `next build` writes to
 * `.next/server/app`. CI runs the rendered suites after the build with
 * REQUIRE_RENDERED_HTML=1, so a missing page is an error there, never a skip.
 */

export const root = resolve(__dirname, '..', '..');
export const BUILT = resolve(root, '.next/server/app');
export const RENDERED_HTML_REQUIRED = process.env.REQUIRE_RENDERED_HTML === '1';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/** Every App Router route, derived from app/**\/page.tsx. */
export const APP_ROUTES: ReadonlySet<string> = new Set(
  walk(resolve(root, 'app'))
    .filter((file) => file.endsWith(`${sep}page.tsx`))
    .map((file) => {
      const dir = relative(resolve(root, 'app'), file).split(sep).slice(0, -1).join('/');
      return dir ? `/${dir}` : '/';
    }),
);

/** The pages whose rendered HTML the suites check. */
export const CHECKED_PAGES = [
  '/',
  '/preview/home',
  '/preview/investment',
  '/preview/property-purchase',
  '/preview/tax-advisory',
  '/preview/team',
  '/preview/contact',
] as const;

/** Prerendered HTML file of a route (`/` → index.html, `/a/b` → a/b.html). */
export function renderedFile(route: string): string {
  const captured = resolve(root, '.next/route-audit', `${route === '/' ? 'index' : route.slice(1).replaceAll('/', '__')}.html`);
  return existsSync(captured) ? captured : join(BUILT, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
}

export const haveBuild = CHECKED_PAGES.every((route) => existsSync(renderedFile(route)));

/**
 * Rendered markup of a route without <script>/<template> (the RSC payload
 * repeats attributes as JSON), or `null` when the build has no HTML for it.
 */
export function renderedMarkup(route: string): string | null {
  const file = renderedFile(route);
  if (!existsSync(file)) return null;
  return readFileSync(file, 'utf8')
    .replace(/<script\b[\s\S]*?<\/script>/g, '')
    .replace(/<template\b[\s\S]*?<\/template>/g, '');
}

export const idsIn = (html: string): string[] =>
  [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1] ?? '');

const VOID = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

export interface Element {
  readonly name: string;
  readonly attrs: string;
  /** Ancestor element names, outermost first. */
  readonly ancestors: readonly string[];
}

/**
 * Minimal element walker for the well-formed HTML React renders: every start
 * tag with its ancestor chain. Comments are dropped; void and self-closing
 * elements do not open a scope. Enough to tell a page `header` from a section
 * `header`; not a general HTML parser.
 */
export function elements(html: string): Element[] {
  const out: Element[] = [];
  const stack: string[] = [];
  const source = html.replace(/<!--[\s\S]*?-->/g, '');
  for (const match of source.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b([^>]*?)(\/?)>/g)) {
    const [, closing, rawName = '', attrs = '', selfClosing] = match;
    const name = rawName.toLowerCase();
    if (closing) {
      const at = stack.lastIndexOf(name);
      if (at !== -1) stack.length = at;
      continue;
    }
    out.push({ name, attrs, ancestors: [...stack] });
    if (!selfClosing && !VOID.has(name)) stack.push(name);
  }
  return out;
}

/**
 * HTML-AAM: a `header` is the page `banner` (a `footer` the `contentinfo`)
 * unless it is scoped to sectioning content or `main`. An explicit role wins.
 */
const SCOPING = new Set(['article', 'aside', 'main', 'nav', 'section']);

export function landmarks(html: string): {
  banner: Element[];
  contentinfo: Element[];
  main: Element[];
} {
  const all = elements(html);
  const role = (element: Element) => /\srole="([^"]+)"/.exec(element.attrs)?.[1];
  const pageLevel = (element: Element) => !element.ancestors.some((name) => SCOPING.has(name));
  return {
    banner: all.filter(
      (e) => role(e) === 'banner' || (e.name === 'header' && role(e) === undefined && pageLevel(e)),
    ),
    contentinfo: all.filter(
      (e) =>
        role(e) === 'contentinfo' || (e.name === 'footer' && role(e) === undefined && pageLevel(e)),
    ),
    main: all.filter((e) => role(e) === 'main' || (e.name === 'main' && role(e) === undefined)),
  };
}
