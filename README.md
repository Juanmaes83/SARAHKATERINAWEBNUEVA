# Sarah Katerina — New Website

> **Status: PHASE 2 VISUAL IMPLEMENTATION IN PROGRESS · NOT PRODUCTION · NOT APPROVED FOR MIGRATION**
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

Phase 2 is the visual implementation workstream. It must transform that
foundation into a real, editorial landing experience based on the visual
proposal in website/nueva web/, especially the Investment composition. The
proposal is not a production approval, but its architecture, rhythm, hierarchy
and composition are the explicit implementation reference for Phase 2.

## 2. What this repository is not

- Not the strategic source of truth. That is [`Juanmaes83/sarahkaterina`](https://github.com/Juanmaes83/sarahkaterina).
- Not a brand repository. Brand decisions are made and recorded upstream.
- Not the Buyer System. That is [`Juanmaes83/Sarah-Katerina-Buyer-System`](https://github.com/Juanmaes83/Sarah-Katerina-Buyer-System).
- Not a production deployment, and not connected to `sarahkaterina.com`.
- Not an approved production website. Phase 2 is the active visual
  implementation workstream; it is not a separate interpretation-free later
  phase. Production approval, legal review and human visual validation remain
  separate gates.

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
| website/02-activation/new-website-landings-proposal-2026-09.md | **VISUAL PROPOSAL / IMPLEMENTATION REFERENCE FOR PHASE 2 — NOT CANONICAL — NOT APPROVED FOR PRODUCTION** |

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

Application-only additions live in app/tokens.app.css, namespaced --sk-app-
and individually justified. Phase 1 additions introduce no new colour value.
For Phase 2, the scoped website palette approved by Juanma is implemented in a
separate, namespaced web layer such as --sk-web-*; it must not mutate the
canonical global token files and must carry its own contrast tests. See the
Phase 2 visual implementation contract.

## 5. Current status

```
PHASE 1 MERGED
PHASE 2A VISUAL SYSTEM / STRUCTURAL PROTOTYPE MERGED
PHASE 2B REAL VISUAL LANDING IMPLEMENTATION NEXT
NOT PRODUCTION · NOT APPROVED FOR MIGRATION
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

Phase 1 deliberately avoided GSAP and third-party motion dependencies. Phase 2
must implement the approved motion direction with GSAP or a native equivalent
when it adds value, always with prefers-reduced-motion, no scroll-jacking and
no motion that fabricates data. The current RevealOnScroll primitive is a
foundation, not the finished Phase 2 motion system.

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

A private Vercel project exists for visual review. The application remains
noindex and no custom domain is connected. Every visual change must be reviewed
by Juanma before it is treated as accepted.

Use a branch preview for normal review. A merge to main may also create a
default Vercel deployment because of the repository integration; that does not
authorise publication or migration.

Required preview environment variables (all public, none secret):

NEXT_PUBLIC_SITE_MODE=preview
NEXT_PUBLIC_SITE_INDEXABLE=false
NEXT_PUBLIC_SITE_URL=<the vercel preview url>

Never connect sarahkaterina.com, enable indexing or treat a Vercel deployment
as production approval.

NEXT_PUBLIC_BUYER_SYSTEM_URL may only be set after the Buyer System origin is
confirmed. Until then, calculator entry points remain visibly pending.

---

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
| Logo / wordmark asset | AVAILABLE REFERENCE — IMPORT PENDING | Authentic logo reference exists in the mother repository at IMAGENES NUEVAS/SK_SARAH_LOGO.jpg. It has not yet been selected, optimized or imported into this repo. Ask Juanma if the intended light/dark treatment is unclear. |
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
| Photography and video of Sarah | ASSETS AVAILABLE / USE DECISION REQUIRED | Authentic references exist upstream. Each image or video must be assigned to a slot, carry provenance and receive human approval. If a selection or video treatment is unclear, ask Juanma rather than choosing silently. |
| Any metric, claim, case or testimonial | NOT APPROVED | Requires source, date, permission, scope and legal review. Visual proof may be shown as a clearly labelled demo/preview; it must not imply a verified result. |

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
| 1 — Technical foundation | Tokens, components, header/footer, SEO/GEO base, analytics contract, CI and foundation laboratory | MERGED |
| 2A — Landing Experience System | Section grammar, claims governance, Buyer System boundary, responsive primitives and structural Investment prototype | MERGED |
| 2B — Real visual landing implementation | Template-led composition, approved palette, real logo/images, optional video, dashboards, calculator entry points, editorial copy, CRO, SEO/GEO and premium motion | NEXT / IN PROGRESS |
| 2C — Human visual gate | Juanma reviews mobile and desktop previews; feedback is implemented before any visual change is accepted | MANDATORY BEFORE EACH VISUAL MERGE |
| 3 — Functional integration | Buyer System production URL, live calculator links, events, consent and lead-capture decision | BLOCKED ON PRODUCT DECISIONS |
| 4 — Production hardening | Lighthouse/CWV, accessibility, schema, hreflang, crawl validation, legal and content approval | AFTER 2B/3 |
| 5 — Migration | Domain, redirects, indexation and production cutover | LAST GATE |

The full Phase 2 implementation contract is in
docs/phase-2-visual-implementation-contract.md.

---
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


---

## Routes and design systems

| Route | Purpose | Chrome | Palette | Indexable |
|---|---|---|---|---|
| `/` | Repository overview | `AppChrome` | Canonical | No |
| `/foundation` | Component laboratory | `AppChrome` | Canonical | No — ever |
| `/preview/investment` | Investment visual implementation | `WebHeader` / `WebFooter` | Scoped `--sk-web-*` | No — ever, while under `/preview` |

Two token layers coexist deliberately:

- **Canonical** — `app/tokens.css` and `lib/tokens/tokens.json`, byte-identical
  copies of the upstream brand system, verified by `tests/tokens-parity.test.ts`.
  **Never edited here.**
- **Scoped website palette** — `app/web-tokens.css`, namespaced `--sk-web-*`
  (ivory, navy, gold). Approved by Juanma on 2026-09-21 for this repository
  only; it does not replace the global brand system. Every value was sampled
  from the approved Investment template and verified against WCAG AA. See
  `docs/phase-2b-visual-implementation.md` §1.

Page chrome lives with each page rather than in the root layout, which is what
lets the two systems coexist without one bleeding into the other.

## Human visual review

Every visual change requires Juanma's review on the Vercel preview, at mobile
and desktop widths, **before** it is considered accepted or merged. Review
instructions for the current phase are in
`docs/phase-2b-visual-implementation.md` §7.

## Governance

`AGENTS.md` holds the operating rules for anyone — human or agent — working in
this repository. Read it before making changes.
