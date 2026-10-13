import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabaseEnv } from '@/lib/supabase/env';

const REVIEW_PROJECT_ID = 'prj_TNvr9TAOburUCNvtsythYOeuVpaP';

/** Public review is read-only; block Studio, admin, auth and API routes at the edge. */
export function isBlockedReviewRoute(pathname: string): boolean {
  return /^\/(?:studio|api|auth|foundation|login)(?:\/|$)/.test(pathname);
}

export async function middleware(request: NextRequest) {
  if (
    process.env.VERCEL_PROJECT_ID === REVIEW_PROJECT_ID &&
    process.env.SARAH_ASSISTANT_REVIEW_ENABLED === 'true' &&
    process.env.NEXT_PUBLIC_SITE_MODE === 'preview' &&
    isBlockedReviewRoute(request.nextUrl.pathname)
  ) {
    return new NextResponse('Not Found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

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
export const config = { matcher: ['/studio/:path*', '/api/:path*', '/auth/:path*', '/login/:path*', '/foundation/:path*', '/preview/insights/:path*', '/preview/case-studies/:path*', '/preview/home', '/preview/investment'] };
