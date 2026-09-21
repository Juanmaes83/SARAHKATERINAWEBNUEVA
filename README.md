# Sarah Katerina — New Website

> **Status: FOUNDATION IN PROGRESS · NOT PRODUCTION · NOT APPROVED FOR MIGRATION**
>
> Nothing in this repository is approved for publication. The application is
> **not indexable by default** and no page in it represents finished marketing.

---

## 1. What this repository is

The web product for Sarah Katerina: the Next.js application, its design
system implementation, its components and its technical SEO scaffolding.

Phase 1 delivers the technical and visual foundation — tokens, reusable
components, header and footer, responsive and accessibility baselines, SEO/GEO
scaffolding, a typed analytics contract and CI.

## 2. What this repository is not

- Not the strategic source of truth. That is [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina).
- Not a brand repository. Brand decisions are made and recorded upstream.
- Not the Buyer System. That is [`Juanmaes83/Sarah-Katerina-Buyer-System`](https://github.com/Juanmaes83/Sarah-Katerina-Buyer-System).
- Not a production deployment, and not connected to `sarahkaterina.com`.
- Not an approved design. The final landing experience is a separate, later
  workstream.

## 3. Relationship with the other repositories

| Repository | Role | This repo's relationship |
|---|---|---|
| [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina) | Strategic and brand source of truth | **Read-only.** Decisions, tokens and governance are consumed from it. Never modified from here. |
| [`Juanmaes83/Sarah-Katerina-Buyer-System`](https://github.com/Juanmaes83/Sarah-Katerina-Buyer-System) | Calculators and buyer tools | **Read-only.** Interfaces may be prepared here. The system is never rebuilt or vendored here. |

## 4. Source of truth

`Juanmaes83/sarahkaterina` governs. Its authority hierarchy
(`brand-system/SOURCE-HIERARCHY.md`) and status model
(`brand-system/governance/decision-status-model.md`) apply to work done here.

Documents consulted for this phase:

| Document | Status as declared upstream |
|---|---|
| `README.md` | Repository map |
| `PROJECT-STATUS.md` | Operational status (L5) |
| `strategy/master/decisions-log.md` | **Decision authority (L1)** |
| `brand-system/SOURCE-HIERARCHY.md` | Conflict-resolution authority |
| `brand-system/governance/decision-status-model.md` | Status vocabulary |
| `brand-system/README.md` | Brand OS overview |
| `brand-system/tokens/` (`README.md`, `tokens.json`, `tokens.css`) | **Canonical token layer (L2)** |
| `brand-system/foundations/` (colour, typography, layout-grid, spacing, surfaces, accessibility, interaction, visual principles, iconography, signatures) | Canonical foundations (L2) |
| `brand-system/qa/contrast-matrix.md` | Verified WCAG ratios |
| `brand-system/COMPONENT-REGISTRY.md`, `DECISION-SUPERSESSION-REGISTER.md` | Component and supersession registers |
| `website/README.md` | Website knowledge index (CANONICAL) |
| `website/01-audits/00-website-audit-master-2026-09.md` | CANONICAL CONSOLIDATED BASELINE |
| `website/01-audits/seo-final-audit-2026-09.md` | CANONICAL FINAL BASELINE — VERIFICATION GATE REQUIRED |
| `website/02-activation/buyer-system-lead-magnet-strategy-2026-09.md` | ACTIVE OPERATIONAL BRIEF |
| `website/02-activation/new-website-landings-proposal-2026-09.md` | **PROPOSAL — NOT CANONICAL — NOT APPROVED FOR PRODUCTION** |

### Design token provenance

`app/tokens.css` and `lib/tokens/tokens.json` are **byte-for-byte copies** of
the canonical token layer. They must never be edited here.

| Field | Value |
|---|---|
| Source repository | `Juanmaes83/sarahkaterina` |
| Source paths | `brand-system/tokens/tokens.json`, `brand-system/tokens/tokens.css` |
| Token version | `0.1.0` (`D3 canonical token layer`) |
| Source commit | `5a88f91062c2597b39b81c0bfba22dfc7afa8c67` |
| `tokens.json` git blob SHA | `6370626ca0a53c05d92bd80f749c67172bed171c` |
| `tokens.css` git blob SHA | `623716c1722f5abea97c4aadd448baa0401e79ac` |

`tests/tokens-parity.test.ts` recomputes the blob hash and re-derives every CSS
variable from the JSON, so any drift from the source of truth fails CI.

Application-only additions live in `app/tokens.app.css`, namespaced `--sk-app-`
and individually justified. They introduce **no new colour value**.

## 5. Current status

```
FOUNDATION IN PROGRESS
NOT PRODUCTION
NOT APPROVED FOR MIGRATION
```

## 6. Stack

| Choice | Why |
|---|---|
| Next.js 15 (App Router) | Required framework; static generation for every current route. |
| TypeScript (strict, `noUncheckedIndexedAccess`) | Type errors fail the build and CI. |
| React 19 | Next.js 15 default. |
| **CSS Modules over token custom properties** | The canonical consumption contract forbids raw hex, arbitrary spacing, new radii and local focus rules. CSS Modules reading `--sk-*` enforce that directly and add no dependency. |
| Zod | Environment validation only — the one real data boundary in this phase. |
| Vitest | Token parity and governance tests. |
| ESLint + Prettier | Lint and format gates. |
| `next/font` | Self-hosts Fraunces and Inter; no third-party font request. |

Deliberately **not** installed: GSAP or any animation library, any icon
library, any UI kit, any analytics SDK. See `components/motion/Reveal.tsx` for
the GSAP rationale.

## 7. Running locally

```bash
npm ci
cp .env.example .env.local   # optional; safe defaults apply without it
npm run dev                  # http://localhost:3000
```

Routes: `/` (overview) and `/foundation` (internal component laboratory).

## 8. Lint, typecheck, test and build

```bash
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npm run test       # vitest run
npm run build      # next build
npm run format     # prettier --write .
```

CI runs `lint`, `typecheck`, `test` and `build` on every pull request.

## 9. Deploying a preview

No Vercel project is linked and no deployment has been created. To create a
**private preview** once a human authorises it:

```bash
npx vercel link           # select the account/scope, create the project
npx vercel                # preview deployment (NOT production)
```

Project settings: framework **Next.js**, root directory **repository root**,
output directory **empty**, default build and install commands.

Required preview environment variables (all public, none secret):

```
NEXT_PUBLIC_SITE_MODE=preview
NEXT_PUBLIC_SITE_INDEXABLE=false
NEXT_PUBLIC_SITE_URL=<the vercel preview url>
```

**Never run `vercel --prod`.** Never add a domain. Never add a secret.

## 10. Branches

- `main` is protected by convention: no direct commits.
- Work happens on a descriptive branch, e.g.
  `foundation/technical-foundation-2026-09-21`.
- Branch from an up-to-date `main`.

## 11. Opening a pull request

1. Run the full QA set in §8 locally.
2. Commit with a descriptive message.
3. Push the branch.
4. Open a **Draft** pull request against `main`.
5. State what was verified and what was not.
6. Merge only on explicit human approval.

## 12. What needs human approval

| Item | State | Why it is blocked |
|---|---|---|
| Canonical production host | **OPEN CONFLICT** | `decisions-log.md` (2026-08-05) approved non-www; the 2026-09-16 verification found production redirecting to www and left it "Abierta" as a P0. |
| Logo / wordmark asset | MISSING | No vector logo exists upstream. A text placeholder is used. |
| Institutional descriptor | `NEEDS_DECISION` | Must not be chosen silently. |
| `Property Decision Advisor` | `TEST` + `INTERNAL_TEST_ONLY` | Not usable in public output. |
| Legal entity, address, company number | NOT CONFIRMED | Rendered as `PENDING_APPROVAL` slots. |
| Email, telephone, social profiles | NOT CONFIRMED | Rendered as `PENDING_APPROVAL` slots. |
| `--sk-app-text-muted` | `PENDING_APPROVAL` | No approved value; a guard test forbids its use. |
| Primary breakpoint (768px) | `PENDING_APPROVAL` | Upstream leaves 768 vs 900 `DEFERRED-NONBLOCKING`. Implementation decision, reversible in one place. |
| Public navigation / IA | `PENDING_APPROVAL` | `BUY / INVEST / OWN` is internal architecture, not a navbar. |
| Any commercial CTA copy | NOT APPROVED | Per-intent CTAs are an open P0. |
| Property Management / VITA Host | `HOLD` | D-06 unexecuted; excluded entirely. |
| AI crawler policy | `Propuesta` | Awaiting legal input; no directive invented. |
| Photography and video of Sarah | NOT AUTHORISED | Placeholders only. |
| Any metric, claim, case or testimonial | NOT APPROVED | Requires source, date, permission, scope and legal review. |

## 13. What must not be published

- Any page of this repository, until indexing is explicitly approved.
- `/foundation` — ever. It is an internal laboratory, forced to
  `noindex, nofollow` and excluded from the sitemap.
- Any invented logo, contact detail, legal identity, metric, testimonial,
  case study or photograph.
- Any tax, legal, financial or return claim without competent human review.
- Any uniqueness or "no competition" claim — prohibited outright upstream.

## 14. Roadmap

| Phase | Scope | State |
|---|---|---|
| **1 — Technical foundation** | Tokens, components, header/footer, SEO/GEO base, analytics contract, CI, `/foundation` | **This PR** |
| 2 — Decision gate | Resolve host, entity, logo, descriptor, contact and legal data | Blocked on human decisions |
| 3 — Landing Experience System | Strategy, IA, storytelling, UX, CRO, motion, proof, CTA, testing | Not started; follows the upstream Creative Brand System |
| 4 — Buyer System integration | `/buyer-system` hub, calculators, progressive capture, events | Requires Phase 2 + analytics/consent approval |
| 5 — Content and localisation | EN consolidation, ES parity, hreflang | Blocked on the host decision |
| 6 — Migration | Domain, redirects, production cutover | Requires every upstream exit criterion |

## 15. Permitted environment variables

Only these three. All are public; none is a secret.

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `preview` | `preview` or `production`. |
| `NEXT_PUBLIC_SITE_INDEXABLE` | `false` | Master indexing switch. Indexing also requires `production` mode. |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Origin for canonical, OG and sitemap URLs. |

Every default is the safe one, so a missing or malformed variable can never
accidentally publish the site. See `.env.example`.

## 16. Absolute rule

**Never commit a secret to this repository.**

No API key, token, CRM credential, analytics ID, tag manager container, pixel
ID, webhook URL or personal data. `.env*` files are gitignored except
`.env.example`. CI scans for committed credentials and fails the build if one
appears.

---

## Governance

`AGENTS.md` holds the operating rules for anyone — human or agent — working in
this repository. Read it before making changes.
