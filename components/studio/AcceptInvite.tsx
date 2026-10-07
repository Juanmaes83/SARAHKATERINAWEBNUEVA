'use client';

import { useEffect, useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';
import styles from './Studio.module.css';

export function AcceptInvite() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    const client = browserClient();
    void client.auth.getUser().then(({ data, error: authError }) => {
      if (!alive) return;
      if (authError || !data.user) setError('The invitation link is invalid or expired. Ask an administrator to send a new one.');
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
      window.location.assign('/studio');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not set your password.');
      setBusy(false);
    }
  }

  return <main className={styles.login}><div className={styles.loginCard}>
    <p className={styles.eyebrow}>Sarah Katerina</p><h1>Set your Studio password</h1>
    <p>{ready ? `Invitation accepted for ${email}. Choose a password to continue.` : 'Checking your invitation…'}</p>
    {ready ? <form onSubmit={submit}>
      <label>New password<input type="password" required minLength={12} autoComplete="new-password" value={password} onChange={event => setPassword(event.target.value)} /></label>
      <label>Repeat password<input type="password" required minLength={12} autoComplete="new-password" value={repeat} onChange={event => setRepeat(event.target.value)} /></label>
      <button disabled={busy}>{busy ? 'Saving…' : 'Set password and open Studio'}</button>
    </form> : null}
    {error ? <p role="alert">{error}</p> : null}
  </div></main>;
}
