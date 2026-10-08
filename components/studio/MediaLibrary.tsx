'use client';
import Link from 'next/link';
import { useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';
import { MAX_UPLOAD_BYTES, sniffImageType } from '@/lib/studio/media';
import styles from './Studio.module.css';

type Item = { id:string; alt:string; caption:string|null; credit:string|null; rights:string|null; focus_x:number; focus_y:number; original_path:string; bucket:string };

export function MediaLibrary({initial}:{initial:Item[]}) {
  const [items,setItems]=useState(initial);
  const [file,setFile]=useState<File|null>(null);
  const [alt,setAlt]=useState(''),[credit,setCredit]=useState(''),[rights,setRights]=useState('');
  const [message,setMessage]=useState(''),[busy,setBusy]=useState(false);
  const [sessionExpired,setSessionExpired]=useState(false);

  async function upload(event:React.FormEvent) {
    event.preventDefault();if(!file)return;setBusy(true);setMessage('Checking image…');
    try {
      if(file.size>MAX_UPLOAD_BYTES)throw Error('Image exceeds 15 MB.');
      const bytes=new Uint8Array(await file.slice(0,16).arrayBuffer());
      const mime=sniffImageType(bytes);if(!mime)throw Error('Unsupported image format.');
      const client=browserClient();const {data:{user}}=await client.auth.getUser();if(!user){setSessionExpired(true);throw Error('Your session ended. Sign in again to upload.');}
      const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'}[mime];
      const path=`uploads/${user.id}/${crypto.randomUUID()}.${ext}`;
      setMessage('Uploading original…');
      const staged=await client.storage.from('media').upload(path,file,{contentType:mime,upsert:false});
      if(staged.error){if('statusCode' in staged.error&&Number(staged.error.statusCode)===401)setSessionExpired(true);throw staged.error;}
      setMessage('Preparing responsive images…');
      const response=await fetch('/api/studio/media',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path,alt,credit,rights})});
      const payload=await response.json();if(response.status===401)setSessionExpired(true);if(!response.ok)throw Error(response.status===401?'Your session ended. Sign in again to upload.':payload.error);
      setItems([{id:payload.id,alt,caption:null,credit,rights,focus_x:0.5,focus_y:0.5,original_path:`originals/${payload.id}.${ext}`,bucket:'media'},...items]);
      setFile(null);setAlt('');setCredit('');setRights('');setMessage('Image saved in the library.');
    } catch(e) {setMessage(e instanceof Error?e.message:'Upload failed.');}
    finally {setBusy(false);}
  }

  async function update(event:React.FormEvent<HTMLFormElement>,id:string) {
    event.preventDefault();setMessage('Saving image details…');
    const form=new FormData(event.currentTarget);
    const payload={id,alt:form.get('alt'),caption:form.get('caption'),credit:form.get('credit'),rights:form.get('rights'),focusX:form.get('focusX'),focusY:form.get('focusY')};
    try {
      const response=await fetch('/api/studio/media',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json();if(response.status===401)setSessionExpired(true);if(!response.ok)throw Error(response.status===401?'Your session ended. Sign in again to save.':data.error);
      setItems(items.map(item=>item.id===id?{...item,...data.item}:item));setMessage('Image details saved.');
    } catch(e) {setMessage(e instanceof Error?e.message:'Could not save image details.');}
  }

  return <><section><h2>Add image</h2><form onSubmit={upload}>
    <label>Original file<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" required onChange={e=>setFile(e.target.files?.[0]??null)}/></label>
    <label>Alt text for this use<input required value={alt} onChange={e=>setAlt(e.target.value)}/></label>
    <label>Credit<input value={credit} onChange={e=>setCredit(e.target.value)}/></label>
    <label>Rights or provenance<input required value={rights} onChange={e=>setRights(e.target.value)}/></label>
    <button disabled={busy||sessionExpired}>{busy?'Uploading…':'Upload image'}</button><p role="status">{message}</p>
    {sessionExpired?<p><Link href="/studio/login">Sign in again</Link></p>:null}
  </form></section><section><h2>Library</h2>{items.length?<div className={styles.metrics}>{items.map(item=><div key={item.id}>
    <img className={styles.libraryImage} src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${item.original_path}`} alt={item.alt}/>
    <details><summary>{item.alt}</summary><form onSubmit={e=>void update(e,item.id)}>
      <label>Alt text<input name="alt" required defaultValue={item.alt}/></label>
      <label>Caption<input name="caption" defaultValue={item.caption??''}/></label>
      <label>Credit<input name="credit" defaultValue={item.credit??''}/></label>
      <label>Rights<input name="rights" required defaultValue={item.rights??''}/></label>
      <label>Horizontal focus, 0 to 1<input type="number" name="focusX" min="0" max="1" step="0.01" defaultValue={item.focus_x}/></label>
      <label>Vertical focus, 0 to 1<input type="number" name="focusY" min="0" max="1" step="0.01" defaultValue={item.focus_y}/></label>
      <button disabled={sessionExpired}>Save details</button>
    </form></details><code className={styles.mediaId}>{item.id}</code>
  </div>)}</div>:<p>No images uploaded yet.</p>}</section></>;
}
