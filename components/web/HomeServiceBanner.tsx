'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { discovery } from '@/content/en/home';
import { APPROVED_MEDIA } from '@/lib/media/approved-media';
import { cn } from '@/lib/utils/cn';
import logo from '@/public/brand/sarah-katerina-logo.png';
import { FabricStage, type BannerMode } from './banner/FabricStage';
import { WebLinkButton } from './WebButton';
import styles from './HomeServiceBanner.module.css';

/** Long enough for the cloth to take a change and come to rest, no longer. */
const SETTLE_MS = 2600;

/**
 * WHAT BRINGS YOU TO SPAIN? — the Home's service discovery.
 *
 * The visitor names an intention in their own words; one fabric banner
 * answers with the service, its proposition and the next step. The banner is
 * the shared `FabricStage` (the Buyer Voices cloth), with a Home composition
 * and no testimonial semantics.
 *
 *  - One banner, one WebGL context, whatever the number of states.
 *  - The visitor decides: click, tap or arrow keys. Nothing rotates, nothing
 *    plays by itself, scrolling never changes the state.
 *  - A change reaches the cloth as one brief gust, then it settles and holds
 *    still (`settleAfterMs`): same platform, different decision.
 *  - Without JavaScript the three needs are plain links to their landings and
 *    the default state is shown; without WebGL or under reduced motion the
 *    same composition stays as HTML. The CTA always sits outside the cloth,
 *    so it is a real link in every state.
 */
export function HomeServiceBanner() {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [mode, setMode] = useState<BannerMode>('static');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const states = discovery.states;

  useEffect(() => {
    setEnhanced(true);
    const initial = states.findIndex((s) => s.id === discovery.defaultState);
    if (initial > 0) setActive(initial);
  }, [states]);

  const select = (index: number, focus: boolean) => {
    const next = (index + states.length) % states.length;
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
      End: states.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    select(target, true);
  };

  const tabId = (index: number) => `${baseId}-need-${index}`;
  const panelId = `${baseId}-panel`;
  const state = states[active] ?? states[0];
  if (!state) return null;
  const image = APPROVED_MEDIA[state.media];

  return (
    <div className={styles.discovery}>
      <div className={styles.needs}>
        <p className={styles.eyebrow}>{discovery.eyebrow}</p>
        <h2 id={`${baseId}-title`} className={styles.title}>
          {discovery.title.text}
        </h2>
        <p className={styles.intro}>{discovery.intro.text}</p>

        {enhanced ? (
          <div
            role="tablist"
            aria-label={discovery.selectorLabel}
            aria-orientation="vertical"
            className={styles.list}
          >
            {states.map((item, index) => (
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
                className={styles.need}
                onClick={() => select(index, false)}
                onKeyDown={onKeyDown}
              >
                <span className={styles.needIndex} aria-hidden="true">
                  {item.number}
                </span>
                <span className={styles.needText}>
                  <span className={styles.needLine}>{item.userNeed}</span>
                  <span className={styles.needService}>{item.serviceLabel}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <ul className={styles.list}>
            {states.map((item) => (
              <li key={item.id}>
                <Link href={item.ctaHref} className={styles.need}>
                  <span className={styles.needIndex} aria-hidden="true">
                    {item.number}
                  </span>
                  <span className={styles.needText}>
                    <span className={styles.needLine}>{item.userNeed}</span>
                    <span className={styles.needService}>{item.serviceLabel}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className={styles.panel}
        {...(enhanced ? { role: 'tabpanel', id: panelId, 'aria-labelledby': tabId(active) } : {})}
      >
        <FabricStage
          compositionClassName={styles.composition}
          changeKey={state.id}
          paused={false}
          onMode={setMode}
          settleAfterMs={SETTLE_MS}
          className={styles.stage}
        >
          <div key={state.id} className={styles.swap}>
            <div className={styles.photo}>
              <Image
                data-paint="image"
                className={styles.photoImage}
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                sizes="(max-width: 767px) 88vw, (max-width: 1199px) 50vw, 560px"
                style={{ objectPosition: image.focal }}
              />
              <span className={styles.photoNote} data-paint="box">
                <span data-paint="text">{state.mediaNote}</span>
              </span>
            </div>
            <p className={styles.label} data-paint="text">
              {state.number} · {state.serviceLabel}
            </p>
            <h3 className={styles.proposition} data-paint="text">
              {state.proposition.text}
            </h3>
            <p className={styles.support} data-paint="text">
              {state.supportingCopy.text}
            </p>
            <div className={styles.foot}>
              <Image
                data-paint="image"
                className={styles.logo}
                src={logo}
                alt="Sarah Katerina"
                sizes="140px"
              />
            </div>
          </div>
        </FabricStage>

        <div className={styles.next}>
          <WebLinkButton href={state.ctaHref} variant="primary" arrow>
            {state.ctaLabel}
          </WebLinkButton>
          <p className={cn(styles.hint, mode !== 'fabric' && styles.hintHidden)} aria-hidden="true">
            {discovery.motionHint}
          </p>
        </div>
      </div>
    </div>
  );
}
