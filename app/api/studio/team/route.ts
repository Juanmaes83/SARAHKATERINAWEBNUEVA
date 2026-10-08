import { NextResponse } from 'next/server';
import { studioSession } from '@/lib/supabase/server';

/** Legacy code enrollment is closed when public Auth signup is disabled. */
export async function POST() {
  const session = await studioSession();
  if (!session) return NextResponse.json({ error: 'Session expired.' }, { status: 401 });
  if (session.role !== 'admin') return NextResponse.json({ error: 'Administrator permission required.' }, { status: 403 });
  return NextResponse.json({ error: 'Use the project administrator email invitation procedure.' }, { status: 410 });
}
