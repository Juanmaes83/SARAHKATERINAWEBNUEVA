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
  ASSISTANT_OPENER,
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
  const [active, setActive] = useState<AssistantResponseId | null>(null);
  const [history, setHistory] = useState<AssistantResponseId[]>([]);
  const [question, setQuestion] = useState('');
  const [review, setReview] = useState(false);
  const [selected, setSelected] = useState<AssistantResponseId[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const answerRef = useRef<HTMLHeadingElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const channels = resolveContactChannels(ASSISTANT_OPENER);
  const summary = assistantSummary(selected);
  const summaryChannels = resolveContactChannels(summary);

  function choose(id: AssistantResponseId) {
    setActive(id);
    setHistory((items) => [...items.slice(-7), id]);
    setReview(false);
    setSelected([]);
  }

  function reset() {
    setActive(null);
    setHistory([]);
    setQuestion('');
    setReview(false);
    setSelected([]);
  }

  const close = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
    setActive(null);
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
    if (active) answerRef.current?.focus();
  }, [active, history.length]);

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
              {assistantCopy.introduction}
            </p>
            <p className={styles.notice}>
              Website guide: fixed replies in English. Your question stays in this panel; please do
              not enter personal or financial details.
            </p>
            {history.length > 0 ? (
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
                      <p className={styles.topicLabel}>{entry.label}</p>
                      <h3 ref={index === history.length - 1 ? answerRef : undefined} tabIndex={-1}>
                        Website guide
                      </h3>
                      <p>{entry.text}</p>
                      <div className={styles.links}>
                        <p className={styles.notice}>Related website pages</p>
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
                Find information
              </WebButton>
            </form>
            <div className={styles.topics}>
              {topicButtons(true)}
              <details className={styles.more}>
                <summary>{assistantCopy.more}</summary>
                <div className={styles.topics}>{topicButtons(false)}</div>
              </details>
            </div>
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
            {review ? (
              <section className={styles.summary} aria-label="Review WhatsApp summary">
                <h3>Review your topics</h3>
                <p className={styles.notice}>
                  Only the checked topic names will be included. Your typed question is never
                  included.
                </p>
                {[...new Set(history)].map((id) => {
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
                })}
                <p className={styles.summaryText}>{summary}</p>
                <WebLinkButton
                  href={summaryChannels.whatsapp.href}
                  external
                  variant="primary"
                  className={styles.whatsapp}
                >
                  Open WhatsApp with these topics
                </WebLinkButton>
                <WebButton
                  variant="quiet"
                  onClick={() => {
                    setReview(false);
                    setSelected([]);
                  }}
                >
                  Cancel summary
                </WebButton>
              </section>
            ) : null}
          </div>
          <div className={styles.foot}>
            <p className={styles.notice}>{assistantCopy.whatsappNotice}</p>
            <WebLinkButton
              href={channels.whatsapp.href}
              external
              variant="primary"
              arrow
              className={styles.whatsapp}
            >
              {assistantCopy.whatsapp}
            </WebLinkButton>
            {history.length > 0 && !review ? (
              <WebButton
                variant="secondary"
                onClick={() => {
                  setSelected([...new Set(history)]);
                  setReview(true);
                }}
              >
                Review topics for WhatsApp
              </WebButton>
            ) : null}
            <p className={styles.session}>{assistantCopy.session}</p>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
