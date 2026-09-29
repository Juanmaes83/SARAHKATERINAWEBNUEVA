'use client';

import Image from 'next/image';
import type { ApprovedMedia } from '@/lib/media/approved-media';
import type { ApprovedVideo } from '@/lib/media/approved-video';
import { PENDING_COPY, SERVICE_LABEL, type VoiceSlot } from '@/content/en/buyer-voices';
import logo from '@/public/brand/sarah-katerina-logo.png';
import { FabricStage, type BannerMode } from './FabricStage';
import styles from './FabricBanner.module.css';

export type { BannerMode };

export interface FabricBannerProps {
  readonly slot: VoiceSlot;
  readonly index: number;
  readonly total: number;
  readonly image: ApprovedMedia;
  readonly video?: ApprovedVideo;
  /**
   * Motion and video held by the reader's control. The host starts it paused
   * under reduced motion, so nothing moves until the reader asks for it.
   */
  readonly paused: boolean;
  /** Reports whether the fabric is live, so the host can show its controls. */
  readonly onMode?: (mode: BannerMode) => void;
  /** Id of the element that labels the banner (the active slot's tab). */
  readonly labelledBy?: string;
  readonly id?: string;
}

/**
 * Fabric banner — Phase 2F, Buyer Voices composition.
 *
 * The testimonial composition (photograph, video window, topic, quote,
 * attribution, stamp and brand mark) hung on the shared `FabricStage`. The
 * engine lifecycle, input, fallback and cost rules live in the stage; they
 * were moved there unchanged on 2026-09-29 so the Home can reuse the cloth
 * without testimonial semantics. The DOM and classes here are the ones the
 * banner had before, so Buyer Voices renders and paints exactly as it did.
 */
export function FabricBanner({
  slot,
  index,
  total,
  image,
  video,
  paused,
  onMode,
  labelledBy,
  id,
}: FabricBannerProps) {
  const service = SERVICE_LABEL[slot.service];
  const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <FabricStage
      id={id}
      compositionClassName={styles.composition}
      changeKey={slot.id}
      paused={paused}
      onMode={onMode}
      labelledBy={labelledBy}
    >
      <div className={styles.photo}>
        <Image
          data-paint="image"
          className={styles.photoImage}
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes="(max-width: 767px) 90vw, 520px"
          style={{ objectPosition: image.focal }}
        />
        <span className={styles.photoTag} data-paint="box">
          <span data-paint="text">{PENDING_COPY.imageNote.text}</span>
        </span>
      </div>

      {video ? (
        <div className={styles.videoWindow} data-paint="video">
          <video
            className={styles.video}
            muted
            loop
            playsInline
            preload="metadata"
            poster={video.poster}
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          >
            {video.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        </div>
      ) : null}
      {video ? (
        <p className={styles.videoNote} data-paint="text">
          {PENDING_COPY.videoNote.text}
        </p>
      ) : null}

      <p className={styles.eyebrow} data-paint="text">
        {service} · <span className={styles.counter}>{counter}</span>
      </p>
      <h3 className={styles.topic} data-paint="text">
        {slot.topic}
      </h3>
      <blockquote className={styles.quote}>
        <span className={styles.mark} data-paint="text" aria-hidden="true">
          “
        </span>
        <p className={styles.quoteText} data-paint="text">
          {slot.quote ?? PENDING_COPY.quote.text}
        </p>
      </blockquote>
      <p className={styles.attribution} data-paint="text">
        {slot.attribution ?? PENDING_COPY.attribution.text}
      </p>

      <div className={styles.foot}>
        <span className={styles.stamp} data-paint="box">
          <span data-paint="text">{PENDING_COPY.stamp.text}</span>
        </span>
        <Image
          data-paint="image"
          className={styles.logo}
          src={logo}
          alt="Sarah Katerina"
          sizes="120px"
        />
      </div>
    </FabricStage>
  );
}
