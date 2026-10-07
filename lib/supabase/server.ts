import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import { supabaseEnv } from './env';

/**
 * Per-request client bound to the signed-in user's session cookies. Every
 * query it makes runs as that user, so RLS and the role checks inside the
 * database functions apply to the Studio exactly as they would to any other
 * caller.
 */
export async function sessionClient(): Promise<SupabaseClient | null> {
  const env = supabaseEnv();
  if (!env) return null;
  const store = await cookies();
  return createServerClient(env.url, env.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          // Server Components cannot set cookies; the middleware refreshes them.
        }
      },
    },
  });
}

export type StudioRole = 'contributor' | 'publisher' | 'admin';

export interface StudioSession {
  readonly client: SupabaseClient;
  readonly user: User;
  readonly role: StudioRole;
  readonly email: string;
  readonly displayName: string | null;
}

const RANK: Record<StudioRole, number> = { contributor: 1, publisher: 2, admin: 3 };

export function roleAtLeast(role: StudioRole, minimum: StudioRole): boolean {
  return RANK[role] >= RANK[minimum];
}

/**
 * The signed-in Studio member, or null. `getUser()` re-validates the token
 * with Supabase Auth on every call (a forged cookie is rejected), and the role
 * comes from the database allowlist, never from the client.
 */
export async function studioSession(): Promise<StudioSession | null> {
  const client = await sessionClient();
  if (!client) return null;
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return null;
  const { data: member } = await client
    .from('studio_members')
    .select('role, email, display_name, active')
    .eq('user_id', data.user.id)
    .maybeSingle();
  if (!member || !member.active) return null;
  return {
    client,
    user: data.user,
    role: member.role as StudioRole,
    email: member.email as string,
    displayName: (member.display_name as string | null) ?? null,
  };
}
