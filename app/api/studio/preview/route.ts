import { NextResponse, type NextRequest } from 'next/server';
import { draftMode } from 'next/headers';
import { studioSession } from '@/lib/supabase/server';
import { editorialPath } from '@/lib/studio/content';
export async function GET(request:NextRequest){
  const session=await studioSession();if(!session)return NextResponse.redirect(new URL('/studio/login',request.url));
  const collection=request.nextUrl.searchParams.get('collection');
  if(collection==='insights'||collection==='case-studies'){
    (await draftMode()).enable();
    return NextResponse.redirect(new URL(`/preview/${collection}`,request.url));
  }
  const id=request.nextUrl.searchParams.get('id');if(!id)return NextResponse.json({error:'Missing document.'},{status:400});
  const {data}=await session.client.from('documents').select('kind,slug').eq('id',id).maybeSingle();
  if(!data)return NextResponse.json({error:'Document unavailable.'},{status:404});
  (await draftMode()).enable();
  const path=data.kind==='page'?`/preview/${data.slug}`:editorialPath(data.kind,data.slug);
  return NextResponse.redirect(new URL(path,request.url));
}
