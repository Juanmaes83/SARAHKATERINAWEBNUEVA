# AGENTS.md — Operating rules

Rules for anyone working in this repository, human or agent. They are not
style preferences. Several of them protect legal, tax and brand positions that
are still open.

Read `README.md` first for what this repository is and is not.

---

## 1. Authority

1. **Sarah Katerina is the brand and business authority.** No agent decides
   brand, positioning, naming, copy or commercial claims.
2. **`Juanmaes83/sarahkaterina` is the strategic source of truth.** When this
   repository and the source of truth disagree, the source of truth wins.
3. Its conflict rules apply here: `brand-system/SOURCE-HIERARCHY.md`
   (L0–L7) and `brand-system/governance/decision-status-model.md`.
4. **Screenshots and visual proposals are references, not specifications.**
   `website/nueva web/` is explicitly classified as proposal material.
   `website/02-activation/new-website-landings-proposal-2026-09.md` is
   explicitly `NOT CANONICAL — NOT APPROVED FOR PRODUCTION`. Neither may
   override the canonical brand system.
5. Recency is not authority. A newer document does not supersede an older
   approved decision unless the supersession is recorded.

## 2. Do not invent

Never fabricate, and never infer from a screenshot or an external repository:

- logo, wordmark or any brand mark;
- typefaces, colours, radii, spacing or motion values;
- claims, promises or guarantees;
- testimonials, case studies, awards, partnerships or press appearances;
- metrics, figures, percentages, prices or returns;
- professional experience or credentials;
- postal address, telephone, email or social profiles;
- legal or fiscal identity;
- photographs of Sarah, of a team, of an office or of a property.

If a value is needed and not confirmed, mark it `PENDING_APPROVAL` and stop.
Do not ship a plausible placeholder that a reviewer could mistake for real data.

## 3. Repository boundaries

**Never modify:**

- `Juanmaes83/sarahkaterina` — read-only, always;
- `Juanmaes83/Sarah-Katerina-Buyer-System` — read-only, always.

**Never:** rebuild the Buyer System here, vendor its code, copy the upstream
documentation wholesale, or create a new branding repository.

**You may:** link to upstream documentation, consume upstream decisions,
prepare interfaces for the Buyer System, and use clearly marked mocks.

## 4. Workflow

1. Never work directly on `main`.
2. Branch from an up-to-date `main` with a descriptive name.
3. Run the full QA set before every pull request:
   `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
4. Open a **Draft** pull request. Merge only on explicit human approval.
5. Never touch production without explicit authorisation.
6. Report only what you actually verified. Never claim "pixel perfect",
   "SEO resolved" or "Core Web Vitals passing" without dated evidence.

## 5. Design system rules

1. `app/tokens.css` and `lib/tokens/tokens.json` are copies of the canonical
   layer. **Never edit them.** `tests/tokens-parity.test.ts` will fail.
2. To change a token, change it upstream, get it approved and re-vendor it.
3. Components consume `var(--sk-*)`. **Never** write a raw hex, `rgb()`,
   `hsl()` or `oklch()` value, an arbitrary spacing value, a new radius, a new
   font or a local focus rule. A test enforces this.
4. If a component needs a token that does not exist, document the need and
   propose it. Do not hardcode it.
5. Spacing is restricted to 4, 8, 16, 24, 32, 48, 64, 80. 4px is micro-only.
6. Radius is 2px (buttons), 4px (cards, panels, inputs), 100px (pills).
   **Pills are only for tags, status indicators, chips and language metadata.**
7. **Terracotta is editorial, never interactive.** Not for body text,
   eyebrows, buttons, links, focus indicators or form errors. Prohibited
   outright on Sand and Sage.
8. **No navy. No gold.** They appear in a proposal document, not in the
   canonical palette.
9. Forest dark surfaces are reserved by default for the conversion anchor.
   Additional dark sections need explicit design justification.
10. `--sk-app-text-muted` is `PENDING_APPROVAL` and **must not be used** by any
    component until a value is approved. A guard test enforces this.

## 6. Accessibility

Non-negotiable, and all verified upstream:

- WCAG AA contrast; check `brand-system/qa/contrast-matrix.md` before pairing
  a colour;
- visible focus on every interactive element — 2px solid, 2px offset,
  surface-aware;
- minimum 44px touch targets;
- full keyboard operation; modals trap focus and restore it;
- `prefers-reduced-motion` disables all non-essential animation;
- one `<h1>` per page and a correct heading outline;
- no horizontal page overflow at 320px or above;
- errors never signalled by colour alone.

## 7. SEO and publication

1. The site is **not indexable by default** and must stay that way until a
   human approves publication.
2. `/foundation` is never indexable and never in the sitemap.
3. **Never hardcode a production host.** The canonical host is an open
   conflict: non-www was approved on 2026-08-05, production was observed
   redirecting to www on 2026-09-16, and the decision is recorded as "Abierta".
   All URLs derive from `NEXT_PUBLIC_SITE_URL`. A test enforces this.
4. **Do not emit Organization, Person or LocalBusiness JSON-LD.** The legal
   entity, address, contact details and institutional descriptor are all
   unconfirmed. A test enforces this.
5. Do not add hreflang for a route that does not exist.
6. Never declare Core Web Vitals, indexation or crawl health without a dated
   measurement.

## 8. Analytics and data

1. Analytics is a typed no-op adapter. Connecting a real destination requires
   an approved vendor **and** an approved consent mechanism.
2. Never add a Google Analytics ID, GTM container, Meta Pixel, Hotjar snippet,
   webhook or CRM credential.
3. Never commit a secret. `.env*` is gitignored except `.env.example`.
4. Collect the minimum data. Follow the progressive-profiling model in the
   upstream Buyer System brief when that work begins.

## 9. Blocked and held subjects

| Subject | State | Rule |
|---|---|---|
| Property Management | `HOLD` | Do not integrate, link, navigate to or mention it. |
| VITA Host / Sarah Katerina Group | D-06 unexecuted | Must not appear in any public-facing output. A test enforces this. |
| `Personal Shopper` | `LEGACY` | Do not use. |
| `Property Decision Advisor` | `TEST` + `INTERNAL_TEST_ONLY` | Do not use publicly. |
| Institutional descriptor | `NEEDS_DECISION` | Do not choose one. |
| Uniqueness / "no competition" claims | `PROHIBITED` | Never, in any asset. |
| D4B visual checkpoint | `HOLD_VISUAL_RESEARCH` | Not a component language. |
| Historical S00–S13 / P00–P13 patterns | `RESEARCH_NOT_APPROVED` | Reference only. |

**`Clarity before commitment.`** is `APPROVED` + `PUBLIC_PRODUCTION`. It is the
only brand promise usable in public output.

## 10. Data classification

Classify every fact you introduce or rely on:

- `confirmed` — verified in the source of truth or by primary evidence;
- `proposal` — suggested, not approved;
- `pending` — awaiting a decision;
- `blocked` — cannot proceed until something else resolves;
- `unverified` — asserted somewhere but not evidenced.

Only `confirmed` may appear as fact in user-facing output.

## 11. Claims requiring human review

**Every** tax, legal, financial, regulatory or return-related statement
requires competent human review before it is written, merged or published.
This includes figures, deadlines, percentages, jurisdictional statements,
guarantees and anything about Modelo 210, ITP/VAT, wealth tax, plusvalía,
arras, NIE or non-resident obligations.

An agent may draft such content only as an explicitly marked proposal.

## 12. Domain

The real domain is not connected in this phase. Do not change DNS, add a
domain in Vercel, deploy to production, or point any configuration at
`sarahkaterina.com`.

## 13. When you are unsure

Do not resolve an open decision silently, and do not stop unrelated work
because one is open. Do the work that does not depend on it, mark the
dependency `PENDING_APPROVAL` or `BLOCKED`, and say plainly what you need
decided and by whom.
