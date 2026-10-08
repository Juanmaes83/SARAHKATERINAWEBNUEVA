'use client';

import Link from 'next/link';
import { useState } from 'react';
import { browserClient } from '@/lib/supabase/browser';
import { studioReturnUrl } from '@/lib/studio/access-url';
import styles from './Studio.module.css';

export function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const redirectTo = studioReturnUrl('/studio/recover/complete', window.location.origin);
      const { error: resetError } = await browserClient().auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (resetError) throw resetError;
      setSent(true);
    } catch {
      setError('Could not request a reset link. Please try again later or contact your Studio administrator.');
    } finally {
      setBusy(false);
    }
  }

  return <main className={styles.login}><div className={styles.loginCard}>
    <p className={styles.eyebrow}>Sarah Katerina</p><h1>Reset your password</h1>
    {sent ? <p role="status">If this address has a Studio account, a reset link has been sent. Check your inbox, then return to sign in.</p> : <form onSubmit={submit}>
      <p>Enter your Studio email. The link expires; your team access does not.</p>
      <label>Email<input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label>
      <button disabled={busy}>{busy ? 'Sending…' : 'Send reset link'}</button>
    </form>}
    {error ? <p role="alert">{error}</p> : null}
    <p><Link href="/studio/login">Back to sign in</Link></p>
  </div></main>;
}
