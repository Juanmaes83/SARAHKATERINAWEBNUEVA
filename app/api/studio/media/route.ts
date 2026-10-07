import { NextResponse,type NextRequest } from 'next/server';
import { randomUUID,createHash } from 'node:crypto';
import sharp from 'sharp';
import { studioSession } from '@/lib/supabase/server';
import { MAX_UPLOAD_BYTES,sniffImageType,storageNameFor,VARIANT_WIDTHS } from '@/lib/studio/media';

export async function POST(request:NextRequest){
  const session=await studioSession();if(!session)return NextResponse.json({error:'Session expired or access denied.'},{status:401});
  if(request.headers.get('origin')!==request.nextUrl.origin)return NextResponse.json({error:'Invalid origin.'},{status:403});
  let body:Record<string,unknown>;try{body=await request.json();}catch{return NextResponse.json({error:'Invalid JSON.'},{status:400});}
  const path=String(body.path??'');
  if(!new RegExp(`^uploads/${session.user.id}/[0-9a-f-]{36}\\.(jpg|png|webp|avif)$`,'i').test(path))return NextResponse.json({error:'Invalid upload path.'},{status:400});
  const alt=String(body.alt??'').trim().slice(0,300),credit=String(body.credit??'').trim().slice(0,300),rights=String(body.rights??'').trim().slice(0,300);
  if(!alt||!rights)return NextResponse.json({error:'Alt text and rights are required.'},{status:400});
  const bucket=session.client.storage.from('media');
  const {data:download,error:downloadError}=await bucket.download(path);
  if(downloadError||!download)return NextResponse.json({error:'Upload unavailable.'},{status:400});
  const raw=Buffer.from(await download.arrayBuffer());
  if(raw.length<100||raw.length>MAX_UPLOAD_BYTES)return NextResponse.json({error:'Image size is outside the allowed range.'},{status:400});
  const mime=sniffImageType(raw);if(!mime)return NextResponse.json({error:'Unsupported image bytes.'},{status:400});
  let dimensions;try{dimensions=await sharp(raw,{failOn:'error',limitInputPixels:80_000_000}).metadata();}catch{return NextResponse.json({error:'Image cannot be decoded.'},{status:400});}
  if(!dimensions.width||!dimensions.height||dimensions.width<480||dimensions.height<320)return NextResponse.json({error:'Image is too small for editorial use.'},{status:400});
  const id=randomUUID(),originalPath=storageNameFor(mime,id),variants=[];
  const originalUpload=await bucket.upload(originalPath,raw,{contentType:mime,upsert:false});
  if(originalUpload.error)return NextResponse.json({error:'Could not store original.'},{status:500});
  for(const width of VARIANT_WIDTHS.filter(w=>w<=dimensions.width!)){
    const resized=await sharp(raw).rotate().resize({width,withoutEnlargement:true}).webp({quality:84}).toBuffer({resolveWithObject:true});
    const variantPath=`variants/${id}-${width}.webp`;
    const stored=await bucket.upload(variantPath,resized.data,{contentType:'image/webp',upsert:false});
    if(stored.error)return NextResponse.json({error:'Could not create image variants.'},{status:500});
    variants.push({width:resized.info.width,height:resized.info.height,path:variantPath,bytes:resized.data.length});
  }
  const {data,error}=await session.client.from('media').insert({id,bucket:'media',original_path:originalPath,variants,mime,bytes:raw.length,width:dimensions.width,height:dimensions.height,sha256:createHash('sha256').update(raw).digest('hex'),alt,credit,rights,provenance:'real',created_by:session.user.id}).select('id').single();
  if(error)return NextResponse.json({error:'Could not register image.'},{status:500});
  await bucket.remove([path]);
  return NextResponse.json({id:data.id});
}

export async function PATCH(request:NextRequest){
  const session=await studioSession();if(!session)return NextResponse.json({error:'Session expired or access denied.'},{status:401});
  if(request.headers.get('origin')!==request.nextUrl.origin)return NextResponse.json({error:'Invalid origin.'},{status:403});
  let body:Record<string,unknown>;try{body=await request.json();}catch{return NextResponse.json({error:'Invalid JSON.'},{status:400});}
  if(typeof body.id!=='string'||! /^[0-9a-f-]{36}$/i.test(body.id))return NextResponse.json({error:'Invalid media.'},{status:400});
  const alt=String(body.alt??'').trim(),caption=String(body.caption??'').trim(),credit=String(body.credit??'').trim(),rights=String(body.rights??'').trim();
  const focusX=Number(body.focusX),focusY=Number(body.focusY);
  if(!alt||alt.length>300||caption.length>300||credit.length>300||!rights||rights.length>300||!Number.isFinite(focusX)||!Number.isFinite(focusY)||focusX<0||focusX>1||focusY<0||focusY>1)return NextResponse.json({error:'Check image details and focus.'},{status:400});
  const {data,error}=await session.client.from('media').update({alt,caption,credit,rights,focus_x:focusX,focus_y:focusY,updated_at:new Date().toISOString()}).eq('id',body.id).eq('bucket','media').select('id,alt,caption,credit,rights,focus_x,focus_y').maybeSingle();
  if(error||!data)return NextResponse.json({error:'Could not save image details.'},{status:400});
  return NextResponse.json({item:data});
}
