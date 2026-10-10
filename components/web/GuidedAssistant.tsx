'use client';

import { useCallback, useEffect, useId, useRef, useState, type MutableRefObject } from 'react';
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
import {
  NEW_VISIT,
  serviceTopic,
  settle,
  type InvitationTopic,
  type VisitState,
} from '@/lib/assistant/invitation';
import { useContextualInvitation } from './useContextualInvitation';
import { ASSISTANT_FALLBACK_ID, responseEligibility } from '@/content/en/assistant-evidence';
import styles from './GuidedAssistant.module.css';

/** Reuse the menu's explicit lifecycle; no observer, polling or persistent memory. */
export const WEB_OVERLAY_EVENT = 'sk:web-overlay';

export function GuidedAssistant({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  // No assistant on Studio, API, foundation, authentication or unknown pages.
  const website = isAssistantWebsiteRoute(pathname);
  // Visit memory for the help invitation: survives client navigation inside
  // the root layout, gone on reload. Never stored or sent.
  const visit = useRef<VisitState>(NEW_VISIT);
  return enabled && website ? (
    <AssistantSession key={pathname} path={pathname!} visit={visit} />
  ) : null;
}

/** Oldest review date among the cited pages, as "10 Oct 2026" (no locale drift). */
function citation(citations: readonly { reviewedAt: string }[]): string {
  const [year, month, day] = [...citations]
    .map((item) => item.reviewedAt)
    .sort()[0]!
    .split('-');
  const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

function AssistantSession({ path, visit }: { path: string; visit: MutableRefObject<VisitState> }) {
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [priority, setPriority] = useState<InvitationTopic | null>(null);
  const invitation = useContextualInvitation(path, visit, open || blocked);
  const invitationRef = useRef<HTMLElement>(null);
  const [history, setHistory] = useState<AssistantResponseId[]>([]);
  const [question, setQuestion] = useState('');
  const [review, setReview] = useState(false);
  const [selected, setSelected] = useState<AssistantResponseId[]>([]);
  const workspaceRef = useRef<HTMLDivElement>(null);
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
      workspaceRef.current?.scrollTo({ top: 0 });
      reviewRef.current?.closest('section')?.parentElement?.scrollTo({ top: 0 });
    } else if (history.length) {
      answerRef.current?.focus({ preventScroll: true });
      answerRef.current?.scrollIntoView({ block: 'start' });
    }
  }, [review, history]);

  function openPanel(from: 'launcher' | 'invitation') {
    visit.current = settle(visit.current);
    invitation.close();
    setPriority(from === 'invitation' ? serviceTopic(path) : null);
    setOpen(true);
  }

  function dismissInvitation() {
    const hadFocus = invitationRef.current?.contains(document.activeElement);
    invitation.close();
    if (hadFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function topicButtons(primary: boolean) {
    // Opened from the invitation on a service page: that page's topic first.
    const items = ASSISTANT_RESPONSES.filter((item) => item.primary === primary).sort(
      (a, b) => Number(b.id === priority) - Number(a.id === priority),
    );
    return items.map((item) => (
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
        className={
          invitation.shown && !blocked ? `${styles.launcher} ${styles.invited}` : styles.launcher
        }
        data-surface="dark"
        hidden={blocked || open}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => openPanel('launcher')}
      >
        <Icon name="chat" />
        {assistantCopy.launcher}
      </button>
      {invitation.shown && !open && !blocked ? (
        <section
          ref={invitationRef}
          className={styles.invitation}
          aria-label={assistantCopy.invitation.label}
          onKeyDown={(event) => {
            if (event.key === 'Escape') dismissInvitation();
          }}
        >
          <p className={styles.invitationEyebrow}>{assistantCopy.label}</p>
          <p role="status">{assistantCopy.invitation.message}</p>
          <div className={styles.invitationActions}>
            <WebButton variant="primary" onClick={() => openPanel('invitation')}>
              {assistantCopy.invitation.accept}
            </WebButton>
            <WebButton variant="quiet" onClick={dismissInvitation}>
              {assistantCopy.invitation.dismiss}
            </WebButton>
          </div>
        </section>
      ) : null}
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
          <div className={styles.workspace} ref={workspaceRef}>
            <div className={styles.body}>
              <p id={descriptionId} className={styles.intro} hidden={!review && history.length > 0}>
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
                    // The panel only renders in review deployments (lib/assistant/policy.ts).
                    const eligibility = responseEligibility(id, 'review');
                    // A withheld answer falls back to the approved human hand-off.
                    const shown =
                      eligibility.status === 'eligible'
                        ? entry
                        : ASSISTANT_RESPONSES.find((item) => item.id === ASSISTANT_FALLBACK_ID)!;
                    return (
                      <section
                        className={styles.message}
                        key={`${index}-${id}`}
                        data-knowledge={eligibility.status}
                      >
                        <h3
                          ref={index === history.length - 1 ? answerRef : undefined}
                          tabIndex={-1}
                        >
                          {entry.label}
                        </h3>
                        <p>{shown.text}</p>
                        {eligibility.status === 'eligible' && eligibility.citations.length ? (
                          <div className={styles.sources}>
                            <p className={styles.notice}>{assistantCopy.sourceHeading}</p>
                            {eligibility.citations.map((citation) => (
                              <Link
                                key={citation.href}
                                href={citation.href}
                                className={styles.contactLink}
                                onClick={close}
                              >
                                {citation.label} →
                              </Link>
                            ))}
                            <p className={styles.notice}>
                              {assistantCopy.sourceChecked(citation(eligibility.citations))}
                            </p>
                          </div>
                        ) : null}
                        <div className={styles.links}>
                          {shown.links.length ? (
                            <p className={styles.notice}>Related website pages</p>
                          ) : null}
                          {shown.links.map((link) => (
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
              {!review ? (
                <div className={styles.historyActions}>
                  {history.length > 0 ? (
                    <details className={styles.more} key={history.length}>
                      <summary>Choose another topic</summary>
                      <div className={styles.topicPicker}>
                        {topicButtons(true)}
                        {topicButtons(false)}
                      </div>
                    </details>
                  ) : null}
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
                </div>
              ) : null}
            </div>
            {!review ? (
              <div className={styles.controls}>
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
          </div>
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
                <p className={styles.session}>No conversation is saved</p>
              </>
            )}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
