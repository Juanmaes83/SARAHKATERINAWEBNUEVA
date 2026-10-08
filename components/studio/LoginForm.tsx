'use client';

import Link from 'next/link';
import { useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';
import styles from './Studio.module.css';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { error: signInError } = await browserClient().auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      const response = await fetch('/api/studio/session', { cache: 'no-store' });
      if (!response.ok) {
        await browserClient().auth.signOut();
        setError('This account does not have active Studio access. Contact your administrator.');
        return;
      }
      window.location.assign('/studio');
    } catch {
      setError('Could not sign in. Check your email and password, or reset your password.');
    } finally {
      setBusy(false);
    }
  }

  return <main id="main" tabIndex={-1} className={styles.login}><div className={styles.loginCard}>
    <p className={styles.eyebrow}>Sarah Katerina</p><h1>Studio</h1>
    <p>Private workspace for the Sarah Katerina team.</p>
    <form onSubmit={submit}>
      <label>Email<input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label>
      <label>Password<input type="password" required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} /></label>
      {error ? <p role="alert">{error}</p> : null}
      <button disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
    <p><Link href="/studio/recover">Forgot your password?</Link></p>
    <p>If your invitation link expired or was already used, sign in here or request a password reset.</p>
  </div></main>;
}
