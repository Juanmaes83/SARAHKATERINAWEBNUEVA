'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from './SiteLink';
import { Icon } from './icons/Icon';
import { WebButton, WebLinkButton } from './WebButton';
import { resolveContactChannels } from '@/lib/contact/channels';
import { isAssistantWebsiteRoute } from '@/lib/assistant/policy';
import {
  ASSISTANT_CONTACT_ROUTE,
  ASSISTANT_RESPONSES,
  assistantCopy,
  type AssistantResponseId,
} from '@/content/en/assistant';
import { matchAssistantTopic, assistantSummary } from '@/lib/assistant/conversation';
import styles from './GuidedAssistant.module.css';

/** Reuse the menu's explicit lifecycle; no observer, polling or persistent memory. */
export const WEB_OVERLAY_EVENT = 'sk:web-overlay';

export function GuidedAssistant({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  // No assistant on Studio, API, foundation, authentication or unknown pages.
  const website = isAssistantWebsiteRoute(pathname);
  return enabled && website ? <AssistantSession key={pathname} /> : null;
}

function AssistantSession() {
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [history, setHistory] = useState<AssistantResponseId[]>([]);
  const [question, setQuestion] = useState('');
  const [review, setReview] = useState(false);
  const [selected, setSelected] = useState<AssistantResponseId[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const answerRef = useRef<HTMLHeadingElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const shareable = [...new Set(history)].filter((id) => id !== 'A12');
  const summary = assistantSummary(selected);
  const summaryChannels = resolveContactChannels(summary);

  function choose(id: AssistantResponseId) {
    setHistory((items) => [...items.slice(-7), id]);
    setReview(false);
    setSelected([]);
  }

  function reset() {
    setHistory([]);
    setQuestion('');
    setReview(false);
    setSelected([]);
  }

  const close = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
    setHistory([]);
    setQuestion('');
    setReview(false);
    setSelected([]);
  }, []);

  useEffect(() => {
    const onOverlay = (event: Event) => {
      const detail = (event as CustomEvent<{ open: boolean }>).detail;
      setBlocked(detail.open);
      if (detail.open) close();
    };
    window.addEventListener(WEB_OVERLAY_EVENT, onOverlay);
    return () => window.removeEventListener(WEB_OVERLAY_EVENT, onOverlay);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = triggerRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (review) {
      reviewRef.current?.focus({ preventScroll: true });
      reviewRef.current?.closest('section')?.parentElement?.scrollTo({ top: 0 });
    } else if (history.length) {
      answerRef.current?.focus({ preventScroll: true });
      answerRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [review, history]);

  function topicButtons(primary: boolean) {
    return ASSISTANT_RESPONSES.filter((item) => item.primary === primary).map((item) => (
      <button key={item.id} type="button" className={styles.topic} onClick={() => choose(item.id)}>
        <Icon name={item.icon} />
        <span>{item.label}</span>
        <Icon name="arrow" size="sm" />
      </button>
    ));
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.launcher}
        data-surface="dark"
        hidden={blocked || open}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => setOpen(true)}
      >
        <Icon name="chat" />
        {assistantCopy.launcher}
      </button>
      {open ? (
        <dialog
          ref={dialogRef}
          id={dialogId}
          className={styles.dialog}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              close();
          }}
        >
          <div className={styles.head} data-surface="dark">
            <div>
              <p className={styles.eyebrow}>{assistantCopy.label}</p>
              <h2 id={titleId}>{assistantCopy.title}</h2>
            </div>
            <button
              type="button"
              className={styles.close}
              aria-label={assistantCopy.close}
              onClick={close}
              autoFocus
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className={styles.body}>
            <p id={descriptionId} className={styles.intro}>
              {review
                ? 'Review the message before opening WhatsApp. Nothing is sent automatically.'
                : 'Choose a topic or find information on this website.'}
            </p>
            {review ? (
              <section className={styles.summary} aria-label="Review WhatsApp summary">
                <h3 ref={reviewRef} tabIndex={-1}>
                  Review your message
                </h3>
                <p className={styles.notice}>
                  Include only the topics you want to discuss. Your typed question is never
                  included.
                </p>
                {shareable.length ? (
                  shareable.map((id) => {
                    const entry = ASSISTANT_RESPONSES.find((item) => item.id === id)!;
                    return (
                      <label className={styles.check} key={id}>
                        <input
                          type="checkbox"
                          checked={selected.includes(id)}
                          onChange={(event) =>
                            setSelected((items) =>
                              event.target.checked
                                ? [...items, id]
                                : items.filter((item) => item !== id),
                            )
                          }
                        />
                        {entry.label}
                      </label>
                    );
                  })
                ) : (
                  <p className={styles.notice}>You can open WhatsApp with a simple greeting.</p>
                )}
                <p className={styles.summaryText}>{summary}</p>
              </section>
            ) : history.length > 0 ? (
              <div
                className={styles.conversation}
                role="log"
                aria-label="Conversation"
                aria-live="polite"
              >
                {history.map((id, index) => {
                  const entry = ASSISTANT_RESPONSES.find((item) => item.id === id)!;
                  return (
                    <section className={styles.message} key={`${index}-${id}`}>
                      <h3 ref={index === history.length - 1 ? answerRef : undefined} tabIndex={-1}>
                        {entry.label}
                      </h3>
                      <p>{entry.text}</p>
                      <div className={styles.links}>
                        {entry.links.length ? (
                          <p className={styles.notice}>Related website pages</p>
                        ) : null}
                        {entry.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={styles.contactLink}
                            onClick={close}
                          >
                            {link.label} →
                          </Link>
                        ))}
                        <Link
                          href={ASSISTANT_CONTACT_ROUTE}
                          className={styles.contactLink}
                          onClick={close}
                        >
                          View contact options →
                        </Link>
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className={styles.topics}>
                {topicButtons(true)}
                <details className={styles.more}>
                  <summary>{assistantCopy.more}</summary>
                  <div className={styles.topics}>{topicButtons(false)}</div>
                </details>
              </div>
            )}
          </div>
          {!review ? (
            <div className={styles.controls}>
              {history.length > 0 ? (
                <details className={styles.more} key={history.length}>
                  <summary>Choose another topic</summary>
                  <div className={styles.topicPicker}>
                    {topicButtons(true)}
                    {topicButtons(false)}
                  </div>
                </details>
              ) : null}
              <form
                className={styles.composer}
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!question.trim()) return;
                  choose(matchAssistantTopic(question));
                  setQuestion('');
                }}
              >
                <label htmlFor={`${dialogId}-question`}>Find a topic</label>
                <div className={styles.inputRow}>
                  <input
                    ref={inputRef}
                    id={`${dialogId}-question`}
                    type="text"
                    maxLength={240}
                    autoComplete="off"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Buying, investment, tax…"
                  />
                  <WebButton type="submit" variant="secondary" disabled={!question.trim()}>
                    Find
                  </WebButton>
                </div>
                <p className={styles.notice}>
                  Fixed replies in English. Please do not enter personal or financial details.
                </p>
              </form>
            </div>
          ) : null}
          <div className={styles.foot}>
            {review ? (
              <>
                <p className={styles.notice}>
                  WhatsApp will ask you to choose its app or web version. You decide whether to send
                  the message there.
                </p>
                <WebLinkButton
                  href={summaryChannels.whatsapp.href}
                  external
                  variant="primary"
                  className={styles.whatsapp}
                >
                  Open WhatsApp with this message
                </WebLinkButton>
                <WebButton
                  variant="quiet"
                  onClick={() => {
                    setReview(false);
                    setSelected([]);
                    requestAnimationFrame(() =>
                      dialogRef.current
                        ?.querySelector<HTMLButtonElement>('[data-assistant-contact]')
                        ?.focus(),
                    );
                  }}
                >
                  Back to guide
                </WebButton>
              </>
            ) : (
              <>
                <WebButton
                  data-assistant-contact
                  variant="primary"
                  className={styles.whatsapp}
                  onClick={() => {
                    setSelected(shareable);
                    setReview(true);
                  }}
                >
                  Contact Sarah on WhatsApp
                </WebButton>
                {history.length > 0 ? (
                  <WebButton
                    variant="quiet"
                    onClick={() => {
                      reset();
                      inputRef.current?.focus();
                    }}
                  >
                    Clear conversation
                  </WebButton>
                ) : null}
                <p className={styles.session}>
                  No conversation is saved · Review your message before opening WhatsApp
                </p>
              </>
            )}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
