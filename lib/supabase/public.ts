import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { supabaseEnv } from './env';

/**
 * Anonymous, cookie-less client for public pages. RLS limits it to the
 * `publications` table, active redirects and public media metadata, so a
 * public page can never read a draft, a review note or an evidence file.
 */
let client: SupabaseClient | null | undefined;

export function publicClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const env = supabaseEnv();
  client = env
    ? createClient(env.url, env.key, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      })
    : null;
  return client;
}
