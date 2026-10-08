'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';
import styles from './Studio.module.css';

export function AcceptInvite({ purpose = 'invite' }: { purpose?: 'invite' | 'recovery' }) {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    const query = new URLSearchParams(window.location.search);
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    if (query.has('error') || fragment.has('error')) {
      setError('This link is invalid, expired or already used. Sign in or request a new password reset link.');
      return;
    }
    const client = browserClient();
    void client.auth.getUser().then(({ data, error: authError }) => {
      if (!alive) return;
      if (authError || !data.user) setError('This link is invalid, expired or already used. Sign in or request a new password reset link.');
      else { setEmail(data.user.email ?? ''); setReady(true); }
    }).catch(() => { if (alive) setError('Could not check the invitation. Please try again.'); });
    return () => { alive = false; };
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (password !== repeat) { setError('The passwords do not match.'); return; }
    setBusy(true); setError('');
    try {
      const { error: updateError } = await browserClient().auth.updateUser({ password });
      if (updateError) throw updateError;
      if (purpose === 'recovery') {
        await browserClient().auth.signOut();
        window.location.assign('/studio/login');
      } else window.location.assign('/studio');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not set your password.');
      setBusy(false);
    }
  }

  return <main className={styles.login}><div className={styles.loginCard}>
    <p className={styles.eyebrow}>Sarah Katerina</p><h1>{purpose === 'recovery' ? 'Choose a new password' : 'Set your Studio password'}</h1>
    <p>{ready ? `Account: ${email}. Choose a password to continue.` : error ? 'You can still use your Studio account.' : 'Checking your link…'}</p>
    {ready ? <form onSubmit={submit}>
      <label>New password<input type="password" required minLength={12} autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} /></label>
      <label>Repeat password<input type="password" required minLength={12} autoComplete="new-password" value={repeat} onChange={event => setRepeat(event.target.value)} /></label>
      <button disabled={busy}>{busy ? 'Saving…' : purpose === 'recovery' ? 'Save password and sign in' : 'Set password and open Studio'}</button>
    </form> : null}
    {error ? <p role="alert">{error}</p> : null}
    <p><Link href="/studio/login">Back to sign in</Link> · <Link href="/studio/recover">Request a new reset link</Link></p>
  </div></main>;
}
