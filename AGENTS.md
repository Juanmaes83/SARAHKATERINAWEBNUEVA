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
4. **Screenshots and visual proposals are not production approvals, but they
   are the explicit visual implementation reference for Phase 2.**
   website/nueva web/, especially the Investment template, defines the target
   architecture, hierarchy, rhythm and composition. The proposal remains
   non-canonical and cannot silently override approved brand, legal or business
   decisions. Phase 2 must implement it deliberately, not reinterpret it as a
   vague moodboard.
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

Authentic visual references listed in the mother repository may be copied into
this repository without modifying the source, provided the file path,
provenance and intended slot are recorded. If an image, logo or video is
missing, ambiguous or not clearly approved, ask Juanma. Do not invent,
substitute or generate a plausible asset silently.

If a value is needed and not confirmed, mark it PENDING_APPROVAL and stop.
Do not ship a plausible placeholder that a reviewer could mistake for real data.

## 3. Repository boundaries

**Never modify:**

- `Juanmaes83/sarahkaterina` — read-only, always;
- `Juanmaes83/Sarah-Katerina-Buyer-System` — read-only, always.

**Never:** rebuild the Buyer System here, vendor its code, copy the upstream
documentation wholesale, or create a new branding repository.

**You may:** link to upstream documentation, consume upstream decisions,
prepare interfaces for the Buyer System, use clearly marked mocks, and copy
approved/reference assets from the mother repository into public/ with
provenance. The mother repository remains read-only; importing a file never
means editing its source or approving it for production.

## 4. Workflow

1. Never work directly on `main`.
2. Branch from an up-to-date `main` with a descriptive name.
3. Run the full QA set before every pull request:
   `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
4. Open a **Draft** pull request. Merge only on explicit human approval.
5. Every visual change requires Juanma's human visual review on the Vercel
   preview at mobile and desktop widths before the change is considered
   accepted or merged.
6. Never touch production without explicit authorisation.
7. Report only what you actually verified. Never claim "pixel perfect",
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
8. **Scoped Phase 2 website palette approved (2026-09-21):** use the same
   ivory, navy and gold direction shown in website/nueva web, especially the
   Investment template. This is a scoped implementation decision for
   SARAHKATERINAWEBNUEVA; it does not replace the global canonical palette.
   Implement it with namespaced --sk-web-* tokens, verify WCAG contrast and
   never mutate the canonical token files.
9. Forest dark surfaces remain available where the canonical system requires
   them; the scoped web palette must still preserve hierarchy and contrast.
   Additional dark sections need explicit design justification.
10. --sk-app-text-muted is PENDING_APPROVAL and must not be used by any
    component until a value is approved. A guard test enforces this.
11. Phase 2 motion must use GSAP or a native equivalent where it creates
    hierarchy or feedback: reveals, staged hero entry, dashboard transitions,
    card hover and scenario changes. Respect prefers-reduced-motion, avoid
    scroll-jacking and never animate unapproved financial values.

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
3. **Never hardcode a production host.** The canonical host is now decided:
   `www`, approved by the project owner and recorded in the mother repository
   on 2026-10-07 (it supersedes the "Abierta" entry of 2026-09-16). It is still
   configuration, not code: all URLs derive from `NEXT_PUBLIC_SITE_URL`, which
   production sets to the www origin. A test enforces this.
4. **Do not emit Organization, Person or LocalBusiness JSON-LD.** The legal
   entity and the institutional descriptor are still unconfirmed. A test
   enforces this. `lib/seo/entity-graph.ts` builds and validates a
   ProfessionalService + Person + WebSite graph from the facts that ARE
   confirmed (address, telephone, hours, SUMA credential), but it is not
   rendered: `entityGraphEmissionAllowed()` stays false until the site is
   indexable, the route is publishable and the owner lifts this rule. Its
   validator is structural and policy-based, not a proof that the facts are
   true or a complete schema.org check.
5. Do not add hreflang for a route that does not exist. The manifest
   enforces this: a declared alternate is emitted only when its target is an
   approved, indexable, reciprocal manifest route.
   Indexing has two gates: the site level (production mode + explicit flag)
   and the route level (`lib/seo/routes.ts`); a page is indexable only when
   both are open, and never at its `/preview/*` URL
   (docs/seo-route-migration.md).
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
domain in Vercel, enable indexation or point any configuration at
sarahkaterina.com.

A Vercel deployment created by a merge is still a review environment until
publication, legal, SEO and human visual gates are complete.

## 13. Phase 2 visual contract

Every Phase 2 landing must implement the template grammar:

- navigation and contextual CTA;
- editorial hero with real image or approved video slot;
- trust strip;
- problem and objections;
- decision doors;
- process/timeline;
- dashboards, report previews and calculator entry points;
- Sarah authority block;
- testimonials/cases only with permission and verified evidence;
- FAQ;
- final CTA;
- footer;
- mobile-first responsive composition;
- CRO, accessibility, SEO semantics and GEO readiness.

A placeholder may be used only when it is unmistakably labelled. If the visual
asset or video is not present or its use is unclear, stop and ask Juanma.

## 14. When you are unsure

Do not resolve an open decision silently, and do not stop unrelated work
because one is open. Do the work that does not depend on it, mark the
dependency `PENDING_APPROVAL` or `BLOCKED`, and say plainly what you need
decided and by whom.
