'use client';

import { useEffect, useState } from 'react';
import styles from './ContactPage.module.css';

export interface MapOnDemandProps {
  /** Address query, exactly as it should resolve. */
  readonly query: string;
  readonly title: string;
  readonly showLabel: string;
  readonly privacyNote: string;
  /** The address as it reads on the page, shown on the placeholder. */
  readonly addressLines: readonly string[];
}

/**
 * Google map, loaded on request.
 *
 * Before the click nothing is fetched from Google: no request, cookie or
 * tracking on page load, and the map can never become the page's LCP. The
 * initial state is a deliberate module — the address set large on the brand
 * navy, a gold pin and a clear button — not an empty box. The embed is
 * Google's keyless `?q=…&output=embed` form (redirected to `/maps/embed`), so
 * no API key exists. The frame keeps its size before and after, so nothing
 * shifts. Without JavaScript the button is hidden; the address and the Google
 * Maps links beside it are the working alternative.
 */
export function MapOnDemand({
  query,
  title,
  showLabel,
  privacyNote,
  addressLines,
}: MapOnDemandProps) {
  const [open, setOpen] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className={styles.map} data-map={open ? 'loaded' : 'idle'}>
      {open ? (
        <iframe
          className={styles.mapFrame}
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className={styles.mapPlaceholder}>
          <span className={styles.mapGrid} aria-hidden="true" />
          <svg className={styles.mapPin} viewBox="0 0 24 32" aria-hidden="true" focusable="false">
            <path d="M12 1C6.5 1 2 5.4 2 10.9 2 18.4 12 31 12 31s10-12.6 10-20.1C22 5.4 17.5 1 12 1Z" />
            <circle cx="12" cy="11" r="3.6" />
          </svg>
          <p className={styles.mapAddress}>
            {addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          {enhanced ? (
            <button type="button" className={styles.mapButton} onClick={() => setOpen(true)}>
              {showLabel}
            </button>
          ) : null}
          <p className={styles.mapNote}>{privacyNote}</p>
        </div>
      )}
    </div>
  );
}
