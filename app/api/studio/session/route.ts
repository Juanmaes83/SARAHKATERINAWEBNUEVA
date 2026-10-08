import { NextResponse } from 'next/server';
import { studioSession } from '@/lib/supabase/server';

export async function GET() {
  const session = await studioSession();
  if (!session) return NextResponse.json({ authorized: false }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  return NextResponse.json({ authorized: true }, { headers: { 'Cache-Control': 'no-store' } });
}
