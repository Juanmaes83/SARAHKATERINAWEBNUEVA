import { NextResponse,type NextRequest } from 'next/server';
import { studioSession } from '@/lib/supabase/server';
import { contentSchema,slugSchema,titleSchema } from '@/lib/studio/schema';
export async function POST(request:NextRequest){
  const session=await studioSession();if(!session)return NextResponse.json({error:'Session expired or access denied.'},{status:401});
  if(request.headers.get('origin')!==request.nextUrl.origin)return NextResponse.json({error:'Invalid origin.'},{status:403});
  let body:Record<string,unknown>;try{body=await request.json();}catch{return NextResponse.json({error:'Invalid JSON.'},{status:400});}
  const title=titleSchema.safeParse(body.title),slug=slugSchema.safeParse(body.slug),content=contentSchema.safeParse(body.content);
  if(!title.success||!slug.success||!content.success||content.data.kind==='page')return NextResponse.json({error:'Check title, slug and content.'},{status:400});
  const {data,error}=await session.client.from('documents').insert({kind:content.data.kind,locale:'en',slug:slug.data,title:title.data,working:content.data,status:'draft',created_by:session.user.id,updated_by:session.user.id}).select('id').single();
  if(error)return NextResponse.json({error:error.message},{status:400});
  const {error:revError}=await session.client.from('revisions').insert({document_id:data.id,number:1,reason:body.duplicateOf?'duplicate':'manual',title:title.data,slug:slug.data,content:content.data,created_by:session.user.id});
  if(revError)return NextResponse.json({error:revError.message},{status:500});
  return NextResponse.json({id:data.id});
}
