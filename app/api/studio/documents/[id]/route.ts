import { NextResponse, type NextRequest } from 'next/server';
import { studioSession, roleAtLeast } from '@/lib/supabase/server';
import { contentSchema, pickPageFields, slugSchema, titleSchema } from '@/lib/studio/schema';

export async function POST(request:NextRequest,{params}:{params:Promise<{id:string}>}){
  const session=await studioSession();if(!session)return NextResponse.json({error:'Session expired or access denied.'},{status:401});
  if(request.headers.get('origin')!==request.nextUrl.origin)return NextResponse.json({error:'Invalid origin.'},{status:403});
  const {id}=await params;if(!/^[0-9a-f-]{36}$/i.test(id))return NextResponse.json({error:'Invalid document.'},{status:400});
  let body:Record<string,unknown>;try{body=await request.json();}catch{return NextResponse.json({error:'Invalid JSON.'},{status:400});}
  const version=body.version;if(!Number.isInteger(version)||Number(version)<1)return NextResponse.json({error:'Invalid version.'},{status:400});
  const {data:doc}=await session.client.from('documents').select('kind,slug,status').eq('id',id).maybeSingle();
  if(!doc)return NextResponse.json({error:'Document unavailable.'},{status:404});
  let rpc:string;let args:Record<string,unknown>;
  if(body.action==='save'){
    const title=titleSchema.safeParse(body.title),slug=slugSchema.safeParse(body.slug),content=contentSchema.safeParse(body.content);
    if(!title.success||!slug.success||!content.success||content.data.kind!==doc.kind)return NextResponse.json({error:'Please check the document fields.'},{status:400});
    if(doc.kind==='page'&&slug.data!==doc.slug)return NextResponse.json({error:'This page URL is fixed.'},{status:400});
    if(content.data.kind==='page')content.data.fields=pickPageFields(slug.data,content.data.fields);
    rpc='save_document';args={p_id:id,p_expected_version:version,p_title:title.data,p_slug:slug.data,p_working:content.data};
  }else if(body.action==='restore'){
    if(typeof body.revisionId!=='string'||! /^[0-9a-f-]{36}$/i.test(body.revisionId))return NextResponse.json({error:'Invalid revision.'},{status:400});
    const {data:revision}=await session.client.from('revisions').select('id').eq('id',body.revisionId).eq('document_id',id).maybeSingle();
    if(!revision)return NextResponse.json({error:'Revision unavailable.'},{status:404});
    rpc='restore_revision';args={p_revision:revision.id,p_expected_version:version};
  }else if(['submit','request_changes','approve','publish','unpublish','block','unblock'].includes(String(body.action))){
    if(!['submit'].includes(String(body.action))&&!roleAtLeast(session.role,'publisher'))return NextResponse.json({error:'Reviewer permission required.'},{status:403});
    rpc='transition_document';args={p_id:id,p_action:body.action,p_expected_version:version,p_note:typeof body.note==='string'?body.note.slice(0,1000):null};
  }else return NextResponse.json({error:'Unknown action.'},{status:400});
  const {data,error}=await session.client.rpc(rpc,args);
  if(error)return NextResponse.json({error:error.message},{status:error.code==='40001'?409:400});
  return NextResponse.json({result:Array.isArray(data)?data[0]:data});
}
