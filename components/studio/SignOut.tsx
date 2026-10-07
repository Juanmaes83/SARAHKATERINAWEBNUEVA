'use client';
import { browserClient } from '@/lib/supabase/browser';
export function SignOut(){return <button type="button" onClick={async()=>{await browserClient().auth.signOut();window.location.assign('/studio/login')}}>Sign out</button>;}
