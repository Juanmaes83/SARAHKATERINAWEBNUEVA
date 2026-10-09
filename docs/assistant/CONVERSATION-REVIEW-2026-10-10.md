# Conversational website guide — review layer, 10 October 2026

Juanma authorised continuing the assistant improvements and publishing a visual review URL. This layer continues PR59 at 28ce048; production remains explicitly disabled by the existing policy. The earlier requirement to wait for Codex credits is superseded by that instruction. Human visual acceptance remains pending.

Implemented: an ephemeral transcript of up to eight catalogue topic responses, a local topic finder (English/Spanish keywords, English answers), related website page links, clear/reset, and a voluntary WhatsApp topic summary. The visitor reviews checkboxes and the exact message before choosing to open WhatsApp. Only catalogue labels are included; typed input is never echoed, stored, logged or transmitted by the guide. Closing, navigation and reload discard all state. No assistant in Studio or API routes.

The input is a deterministic topic finder, not generative AI. Ambiguous/unknown questions fall back to the existing approved contact response. Related pages are navigation destinations, not proof of legal or fiscal advice. No new commercial, legal or fiscal claims. No provider, embeddings, private documents, tools, CRM, writes, credentials, persistent memory or additional dependencies.

For this review layer this record supersedes CONTRACT v1's prohibition of text input and its fixed-opener-only WhatsApp rule. It permits local text routing and the visitor-selected catalogue topic summary only. Unrelated contractual safeguards remain. The review permission is INTERNAL_TEST_ONLY; Sarah's public-copy approval is not inferred.

The PR59 scripted QA remains historical evidence for v1; use scripts/qa/assistant-conversation-review.mjs for this layer. Preview: open How can I help?; choose Buying a property; type tax; inspect related pages; review topics for WhatsApp; uncheck a topic; cancel or open the external link; clear; close/reopen. Do not send a real message as part of automated QA.

Still pending separately: generative-provider/budget/data decisions, evaluated library integration, full isolated Studio Auth/DB/Storage QA, Sarah legal approvals, custom domain and indexation. This layer does not close those tasks. Preview and hosted production share data according to the project record: do not run mutating Studio tests there.

## Verified locally

Lint: zero errors, eight existing Studio image warnings. Typecheck and build pass. Route capture verifies 55 routes; rendered-HTML-required Vitest run: 482/482 tests, 34 suites, no skips. Chromium 153 runs at 1440/390/320: two-topic conversation, summary checkbox opt-out and exact destination, unknown/instruction fallback, no raw input echo, clear/close reset, no horizontal overflow, unchanged browser storage, no JS errors or non-GET/HEAD attempts. External destinations blocked; no message sent. PNGs and results: docs/screenshots/assistant-conversation-2026-10-10. The 320px summary capture was visually inspected. Human approval remains pending.
