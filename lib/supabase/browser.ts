'use client';
import { createBrowserClient } from '@supabase/ssr';
import { supabaseEnv } from './env';
export function browserClient() {
  const env = supabaseEnv();
  if (!env) throw new Error('Studio is not configured for this deployment.');
  return createBrowserClient(env.url, env.key);
}
