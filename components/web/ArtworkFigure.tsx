'use client';

import Image from 'next/image';
import { useId, useRef } from 'react';
import type { ApprovedMedia } from '@/lib/media/approved-media';
import { cn } from '@/lib/utils/cn';
import styles from './ArtworkFigure.module.css';

export interface ArtworkFigureProps {
  readonly media: ApprovedMedia;
  /** What the enlarged view shows, e.g. "Refurbished villa — illustrative analysis". */
  readonly title: string;
  readonly sizes: string;
  /** Short statement under the image; the slot's evidence state, never a result. */
  readonly note: string;
  readonly className?: string;
}

/**
 * Phase 2F — an approved artwork whose analysis is part of the picture.
 *
 * The seven Phase 2F images carry their information in the raster: callouts,
 * panels, timelines, document props. So the figure never crops them (the
 * frame takes the image's own ratio) and never lays anything over them —
 * their corners hold text of their own ("Illustrative analysis", "All data
 * indicative"). The note and the enlarge control sit below the image.
 *
 * ENLARGE — a native modal `<dialog>`: focus moves to its close button,
 * Escape and the backdrop close it, focus returns to the control that opened
 * it. It is a convenience for reading the fine print; everything the page
 * says stays in the page's own text. The large image is lazy: a closed dialog
 * is not rendered, so it is only fetched when a reader opens it.
 */
export function ArtworkFigure({ media, title, sizes, note, className }: ArtworkFigureProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <figure className={cn(styles.figure, className)}>
      {/* Mouse and touch convenience; the button below is the keyboard path. */}
      <div
        className={styles.frame}
        style={{ aspectRatio: `${media.width} / ${media.height}` }}
        onClick={open}
      >
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes={sizes}
          quality={media.id === 'asset-land' || media.id === 'asset-commercial' ? 90 : 75}
          className={styles.image}
        />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.note}>{note}</span>
        <button
          ref={triggerRef}
          type="button"
          className={styles.enlarge}
          onClick={open}
          aria-haspopup="dialog"
        >
          <span className={styles.enlargeGlyph} aria-hidden="true" />
          View full size
          <span className="sk-visually-hidden">: {title}</span>
        </button>
      </figcaption>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          // A click on the backdrop (the dialog box itself, not its content) closes it.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.dialogInner}>
          <div className={styles.dialogHead}>
            <p id={titleId} className={styles.dialogTitle}>
              {title}
            </p>
            <button type="button" className={styles.close} onClick={close} autoFocus>
              Close
            </button>
          </div>
          <p className={styles.scrollHint}>Scroll sideways to read the whole image.</p>
          <div className={styles.dialogFrame}>
            <Image
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              // Phones show it 70vh tall (wider than the screen), so ask for the full file.
              sizes="(max-width: 767px) 1600px, (max-width: 1600px) 96vw, 1600px"
              quality={media.id === 'asset-land' || media.id === 'asset-commercial' ? 90 : 75}
              loading="lazy"
              className={styles.dialogImage}
            />
          </div>
          <p className={styles.dialogNote}>{note}</p>
        </div>
      </dialog>
    </figure>
  );
}
