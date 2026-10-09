import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

export function localOrigin(value, label, httpsOnly = false) {
  let url;
  try { url = new URL(value); } catch { throw new Error(`${label}: local origin required`); }
  if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
      !(httpsOnly ? url.protocol === 'https:' : ['http:', 'https:'].includes(url.protocol)) ||
      url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error(`${label}: exact loopback origin required`);
  }
  return url.origin;
}

/** Reject unsafe/missing build evidence before importing a browser or signing in.
 * This is a preflight, NOT proof of server/container egress isolation.
 */
export function assertLocalStudioBuild(env = process.env, root = process.cwd()) {
  const app = localOrigin(env.QA_BASE_URL, 'QA_BASE_URL');
  const supabase = localOrigin(env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL', true);
  const callback = localOrigin(env.NEXT_PUBLIC_STUDIO_ORIGIN, 'NEXT_PUBLIC_STUDIO_ORIGIN');
  if (callback !== app) throw new Error('Recovery origin must match QA app');
  if (env.NEXT_PUBLIC_SITE_MODE !== 'preview' || env.NEXT_PUBLIC_SITE_INDEXABLE !== 'false')
    throw new Error('QA requires explicit preview/noindex');
  if (!/^supabase_db_[a-z0-9_-]+$/.test(env.QA_DB_CONTAINER ?? ''))
    throw new Error('Explicit local Supabase DB container required');
  for (const name of ['.env', '.env.local', '.env.production', '.env.production.local']) {
    const file = resolve(root, name);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, 'utf8');
    const match = text.match(/^NEXT_PUBLIC_SUPABASE_URL\s*=\s*([^\r\n]+)/m);
    if (match && localOrigin(match[1].trim().replace(/^['"]|['"]$/g, ''), name, true) !== supabase)
      throw new Error('Environment file differs from QA Supabase origin');
  }
  if (!existsSync(resolve(root, '.next/BUILD_ID'))) throw new Error('Fresh QA build required');
  const files = (dir) => readdirSync(dir).flatMap(name => {
    const file = resolve(dir, name);
    return statSync(file).isDirectory() ? files(file) : /\.(js|json)$/.test(name) ? [file] : [];
  });
  for (const scope of ['server', 'static']) {
    const dir = resolve(root, '.next', scope);
    if (!existsSync(dir)) throw new Error(`Missing ${scope} build`);
    let localFound = false;
    for (const file of files(dir)) {
      const text = readFileSync(file, 'utf8');
      if (/https?:[^\s"'<>]*\.supabase\.(co|in)\b/i.test(text))
        throw new Error('Hosted Supabase reference in build: rebuild in isolation');
      if (text.includes(supabase)) localFound = true;
    }
    if (!localFound) throw new Error(`Local Supabase origin absent from ${scope} build`);
  }
  return { app, supabase, callback };
}

export async function restrictBrowserToLocal(context, origins) {
  const allowed = new Set(Object.values(origins));
  const blocked = [];
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (['data:', 'blob:'].includes(url.protocol) || allowed.has(url.origin)) return route.continue();
    blocked.push(url.origin); // no path, token or query in report
    return route.abort();
  });
  return () => { if (blocked.length) throw new Error('External browser request blocked; QA failed'); };
}
