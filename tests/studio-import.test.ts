import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { describe,it,expect } from 'vitest';
import { parseContent } from '../lib/studio/schema';
type Payload={document:{kind:string;slug:string;status:string;working:unknown};revisions:{number:number;content:unknown}[];publish_revision:number|null};
const dir=mkdtempSync(resolve(tmpdir(),'sk-studio-seed-'));
const path=resolve(dir,'payloads.json');
try {
  const args=process.platform==='win32'?['-3',resolve(__dirname,'../scripts/studio/import/build_seed.py'),path]:[resolve(__dirname,'../scripts/studio/import/build_seed.py'),path];
  execFileSync(process.platform==='win32'?'py':'python3',args,{stdio:'ignore'});
} catch (error) {
  rmSync(dir,{recursive:true,force:true});
  throw error;
}
const payloads=JSON.parse(readFileSync(path,'utf8')) as Payload[];
rmSync(dir,{recursive:true,force:true});
describe('Studio import boundary',()=>{
  it('keeps all imported documents private until review and explicit publication',()=>{
    expect(payloads).toHaveLength(12);
    expect(payloads.every(p=>p.publish_revision===null)).toBe(true);
    expect(payloads.every(p=>p.document.status==='draft'||p.document.status==='blocked')).toBe(true);
    expect(payloads.filter(p=>p.document.status==='blocked').map(p=>p.document.slug).sort()).toEqual(['british-buyer-torrevieja','norwegian-couple-la-zenia']);
    expect(payloads.flatMap(p=>p.revisions)).toHaveLength(17);
  });
  it('stores content that the renderer can validate',()=>{
    for(const payload of payloads){expect(parseContent(payload.document.working),payload.document.slug).not.toBeNull();for(const revision of payload.revisions)expect(parseContent(revision.content),payload.document.slug).not.toBeNull();}
  });
  it('keeps held naming out of the five adapted working copies',()=>{
    for(const payload of payloads.filter(p=>p.revisions.length===2))expect(JSON.stringify(payload.document.working)).not.toMatch(/VITA\s*Host|Costa Larga|Property Management/i);
  });
});
