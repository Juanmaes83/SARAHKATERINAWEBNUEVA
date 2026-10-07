/**
 * Supabase connection for the Studio and the editorial pages.
 *
 * Both values are PUBLIC by design: the project URL and the publishable key
 * only identify the project; every read and write is still authorised by Row
 * Level Security and the Studio's database functions. No service-role key is
 * used anywhere in this application.
 *
 * When they are unset (CI, a fresh checkout), the editorial pages render
 * their empty state and the Studio explains that it is not configured — the
 * build never fails because the database is absent.
 */
export interface SupabaseEnv {
  readonly url: string;
  readonly key: string;
}

export function supabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
  } catch {
    return null;
  }
  return { url, key };
}
