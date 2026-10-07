'use client';
import { useState } from 'react';
import { slugify,type DocumentContent } from '@/lib/studio/schema';
import styles from './Studio.module.css';
export function NewDocument({kind}:{kind:'article'|'case'}){const [title,setTitle]=useState(''),[slug,setSlug]=useState(''),[message,setMessage]=useState('');
  async function submit(event:React.FormEvent){event.preventDefault();const common={schemaVersion:1,dek:'',category:'',tags:[],dates:{},blocks:[],sources:[],seo:{mode:'auto'},related:{documents:[],services:[]}};const content:DocumentContent=kind==='article'?{...common,kind:'article',assumptions:[]} as DocumentContent:{...common,kind:'case',facts:[],context:'',challenge:'',intervention:'',outcome:'',results:[]} as DocumentContent;const response=await fetch('/api/studio/documents',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,slug,content})});const data=await response.json();if(response.ok)window.location.assign(`/studio/documents/${data.id}`);else setMessage(data.error||'Could not create document.');}
  return <><p className={styles.eyebrow}>New {kind}</p><h1>Create {kind}</h1><form onSubmit={submit}><label>Title<input required value={title} onChange={e=>{setTitle(e.target.value);setSlug(slugify(e.target.value))}}/></label><label>Slug<input required value={slug} onChange={e=>setSlug(e.target.value)}/></label><button>Create draft</button><p role="alert">{message}</p></form></>;
}
