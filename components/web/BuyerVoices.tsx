'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { ApprovedMedia } from '@/lib/media/approved-media';
import type { ApprovedVideo } from '@/lib/media/approved-video';
import {
  PENDING_COPY,
  PUBLICATION_REQUIREMENTS,
  VOICES_BAND,
  type VoiceSlot,
} from '@/content/en/buyer-voices';
import { FabricBanner, type BannerMode } from './banner/FabricBanner';
import styles from './BuyerVoices.module.css';

export interface BuyerVoicesProps {
  readonly slots: readonly VoiceSlot[];
  /** Editorial image per slot, same order. Never a photograph of the buyer. */
  readonly images: readonly ApprovedMedia[];
  readonly video?: ApprovedVideo;
  /** One line per slot under its title, e.g. the case band's withheld-outcome note. */
  readonly notes?: readonly string[];
}

/**
 * Buyer voices — Phase 2F. One banner, several voices.
 *
 * A single fabric banner carries the active voice; the list beside it (tabs
 * once hydrated, a plain list without JavaScript) moves between voices, and
 * each change reaches the banner like a gust. Every slot is pending: the
 * banner states it on its own surface, and the requirements for publishing a
 * real voice sit one click away.
 *
 * Keyboard: the tab list is one stop (arrows, Home, End), the banner another
 * (arrows tug it, R settles it), then the pause control.
 */
export function BuyerVoices({ slots, images, video, notes }: BuyerVoicesProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<BannerMode>('static');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setEnhanced(true);
    // Under reduced motion nothing moves until the reader asks for it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
  }, []);

  const select = (index: number, focus: boolean) => {
    const next = (index + slots.length) % slots.length;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: slots.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, true);
  };

  const tabId = (index: number) => `${baseId}-voice-${index}`;
  const panelId = `${baseId}-banner`;
  const slot = slots[active] ?? slots[0];
  const image = images[active] ?? images[0];
  if (!slot || !image) return null;

  return (
    <div className={styles.voices}>
      <div
        className={styles.bannerColumn}
        {...(enhanced ? { role: 'tabpanel', id: panelId, 'aria-labelledby': tabId(active) } : {})}
      >
        <FabricBanner
          slot={slot}
          index={active}
          total={slots.length}
          image={image}
          video={video}
          paused={paused}
          onMode={setMode}
        />
      </div>

      <div className={styles.aside}>
        <p className={styles.label}>{VOICES_BAND.label.text}</p>

        {enhanced ? (
          <div role="tablist" aria-label={VOICES_BAND.label.text} className={styles.list}>
            {slots.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={tabId(index)}
                aria-selected={index === active}
                aria-controls={panelId}
                tabIndex={index === active ? 0 : -1}
                className={styles.item}
                onClick={() => select(index, false)}
                onKeyDown={onKeyDown}
              >
                <span className={styles.itemIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.itemText}>
                  <span className={styles.itemTitle}>{item.topic}</span>
                  {notes?.[index] ? <span className={styles.itemNote}>{notes[index]}</span> : null}
                  <span className={styles.itemStatus}>{PENDING_COPY.stamp.text}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <ol className={styles.list}>
            {slots.map((item, index) => (
              <li key={item.id} className={styles.item}>
                <span className={styles.itemIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.itemText}>
                  <span className={styles.itemTitle}>{item.topic}</span>
                  {notes?.[index] ? <span className={styles.itemNote}>{notes[index]}</span> : null}
                  <span className={styles.itemStatus}>{PENDING_COPY.stamp.text}</span>
                </span>
              </li>
            ))}
          </ol>
        )}

        {enhanced ? (
          <div className={styles.controls}>
            <button type="button" className={styles.control} onClick={() => setPaused((p) => !p)}>
              {paused ? (
                <span className={styles.playGlyph} aria-hidden="true" />
              ) : (
                <span className={styles.pauseGlyph} aria-hidden="true" />
              )}
              <span>{paused ? 'Play motion and video' : 'Pause motion and video'}</span>
            </button>
            {mode === 'fabric' ? (
              <p className={styles.hint}>
                {VOICES_BAND.hint.text}{' '}
                <span className={styles.hintKeys}>{VOICES_BAND.keyboardHint.text}</span>
              </p>
            ) : null}
          </div>
        ) : null}

        <details className={styles.requirements}>
          <summary>{VOICES_BAND.requirementsTitle.text}</summary>
          <ol>
            {PUBLICATION_REQUIREMENTS.map((item) => (
              <li key={item.text}>{item.text}</li>
            ))}
          </ol>
        </details>
      </div>
    </div>
  );
}
