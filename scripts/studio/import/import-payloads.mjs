#!/usr/bin/env node
/**
 * Import Studio payloads (e.g. new-articles-2026-10-08.json) through the
 * admin-only `import_document` RPC, signed in as a Studio ADMIN.
 *
 * Nothing is published: payloads without `publish_revision` arrive as drafts
 * with their review notes, for approval in the Studio.
 *
 * Usage (credentials typed at run time, never stored in the repository):
 *   SUPABASE_URL=https://<ref>.supabase.co \
 *   SUPABASE_PUBLISHABLE_KEY=<publishable key> \
 *   STUDIO_ADMIN_EMAIL=<admin email> STUDIO_ADMIN_PASSWORD=<password> \
 *   node scripts/studio/import/import-payloads.mjs scripts/studio/import/new-articles-2026-10-08.json
 *
 * Re-running is safe: a slug that already exists is reported and skipped.
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const [file] = process.argv.slice(2);
const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, STUDIO_ADMIN_EMAIL, STUDIO_ADMIN_PASSWORD } =
  process.env;
if (
  !file ||
  !SUPABASE_URL ||
  !SUPABASE_PUBLISHABLE_KEY ||
  !STUDIO_ADMIN_EMAIL ||
  !STUDIO_ADMIN_PASSWORD
) {
  console.error(
    'Missing file argument or SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY / STUDIO_ADMIN_EMAIL / STUDIO_ADMIN_PASSWORD.',
  );
  process.exit(2);
}

const payloads = JSON.parse(readFileSync(file, 'utf8'));
if (!Array.isArray(payloads) || payloads.some(payload =>
  payload.document?.status !== 'draft' || payload.publish_revision != null)) {
  console.error('Only draft payloads without a publication revision can be imported by this script.');
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});
const { error: signInError } = await supabase.auth.signInWithPassword({
  email: STUDIO_ADMIN_EMAIL,
  password: STUDIO_ADMIN_PASSWORD,
});
if (signInError) {
  console.error(`Sign-in failed: ${signInError.message}`);
  process.exit(1);
}

let failed = 0;
for (const payload of payloads) {
  const { slug, kind } = payload.document;
  const { data: existing, error: lookupError } = await supabase
    .from('documents')
    .select('id')
    .eq('kind', kind)
    .eq('slug', slug)
    .maybeSingle();
  if (lookupError) {
    failed += 1;
    console.log(`ERROR  ${kind}/${slug}: unable to check whether the document already exists.`);
    continue;
  }
  if (existing) {
    console.log(`skip   ${kind}/${slug} (already exists)`);
    continue;
  }
  const { data, error } = await supabase.rpc('import_document', { p: payload });
  if (error) {
    failed += 1;
    console.log(`ERROR  ${kind}/${slug}: ${error.message}`);
  } else {
    console.log(`draft  ${kind}/${slug} → ${data}`);
  }
}
await supabase.auth.signOut();
process.exit(failed ? 1 : 0);
