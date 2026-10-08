'use client';

import { useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';

export function SignOut() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function signOut() {
    setBusy(true);
    setError('');
    try {
      const { error: signOutError } = await browserClient().auth.signOut();
      if (signOutError) throw signOutError;
      window.location.assign('/studio/login');
    } catch {
      setError('Could not sign out. Please try again.');
      setBusy(false);
    }
  }

  return <>
    <button type="button" disabled={busy} onClick={() => void signOut()}>{busy ? 'Signing out…' : 'Sign out'}</button>
    {error ? <small role="alert">{error}</small> : null}
  </>;
}
