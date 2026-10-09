"use client";
import { useState } from 'react';
import { WebButton } from './WebButton';
import styles from './LegalReviewPage.module.css';

/** Review-only UI: no persistence, analytics, vendor calls or real consent. */
export function CookiePreferencesReview() {
  const [analytics, setAnalytics] = useState(false);
  const [message, setMessage] = useState('');
  return <section id="preferences" className={styles.section} aria-labelledby="preferences-title">
    <h2 id="preferences-title">Cookie preferences</h2>
    <p>Visual demonstration only. These controls do not save consent or activate any service. Choices reset when you leave this page.</p>
    <label className={styles.option}><input type="checkbox" checked disabled /> Necessary functionality</label>
    <label className={styles.option}><input type="checkbox" checked={analytics} onChange={e => { setAnalytics(e.target.checked); setMessage(''); }} /> Optional analytics — demonstration</label>
    <div className={styles.actions}>
      <WebButton variant="secondary" onClick={() => { setAnalytics(false); setMessage('Demonstration: optional analytics rejected. No preference has been saved.'); }}>Reject optional</WebButton>
      <WebButton variant="secondary" onClick={() => { setAnalytics(true); setMessage('Demonstration: optional analytics selected. No service has been activated.'); }}>Accept optional</WebButton>
      <WebButton variant="secondary" onClick={() => setMessage('Demonstration complete. No preference has been saved.')}>Apply demonstration</WebButton>
    </div>
    <p role="status" aria-live="polite">{message}</p>
  </section>;
}
