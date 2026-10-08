import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabaseEnv } from '@/lib/supabase/env';

export async function middleware(request: NextRequest) {
  const env = supabaseEnv();
  let response = NextResponse.next({ request });
  if (!env) return response;
  const client = createServerClient(env.url, env.key, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(items) {
        items.forEach(({name,value}) => request.cookies.set(name,value));
        response = NextResponse.next({ request });
        items.forEach(({name,value,options}) => response.cookies.set(name,value,options));
      },
    },
  });
  await client.auth.getUser();
  return response;
}
export const config = { matcher: ['/studio/:path*', '/api/studio/:path*', '/preview/insights/:path*', '/preview/case-studies/:path*', '/preview/home', '/preview/investment'] };
