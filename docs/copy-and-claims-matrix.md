# Copy and claims matrix

**Status:** ACTIVE — classification of every claim in the Investment prototype
**Date:** 2026-09-21

**No copy on this page is approved.** This document classifies each statement
so a reviewer can approve, reject or rewrite it individually rather than
approving a wall of text.

---

## 1. Classification model

From `AGENTS.md` §10. Every claim in `content/en/investment.ts` carries a
status, and a test fails the build if one does not.

| Status       | Meaning                                                                          | May render as fact |
| ------------ | -------------------------------------------------------------------------------- | ------------------ |
| `confirmed`  | Verified in the source of truth or by primary evidence, **and** cites its source | Yes                |
| `proposal`   | Suggested wording, not approved                                                  | No                 |
| `pending`    | Awaiting a human decision                                                        | No                 |
| `blocked`    | Cannot proceed until something else resolves                                     | No                 |
| `unverified` | Asserted somewhere but not evidenced                                             | No                 |

A second axis records the **review domain**: `tax`, `legal`, `financial`,
`returns` or `none`. Per `AGENTS.md` §11, anything in a review domain requires
competent human review and **can never be `confirmed` by an agent**, whatever
its source. This is enforced by test.

---

## 2. What is confirmed

Only these statements are published without a visible status marker.

| Claim                                                                        | Source                                                                                                          | Note                                                                                                                                        |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Clarity before commitment.`                                                 | `brand-system/governance/decision-status-model.md` — `APPROVED` + `PUBLIC_PRODUCTION`                           | The only approved brand promise. Not used on this page; reserved.                                                                           |
| "Paid by — the buyer only" (trust strip)                                     | `decisions-log.md` 2026-07-27; `PROJECT-STATUS.md` independence model confirmed by the project owner 2026-08-13 | The remuneration model is confirmed. The **formal client mandate and contractual scope remain pending** and are deliberately not described. |
| Independence answer (FAQ)                                                    | Same as above                                                                                                   | Describes remuneration only. It does not describe contractual scope.                                                                        |
| "Paid only by you" (benefits)                                                | `decisions-log.md` 2026-07-27                                                                                   | Feature statement only.                                                                                                                     |
| "The differential proof is the published method, not the number of clients." | `decisions-log.md` 2026-08-05                                                                                   | Also the reason the trust strip carries no volume figure.                                                                                   |
| Prototype notice                                                             | `docs/phase-2-decision-gate.md` §3                                                                              | Describes this repository's own status.                                                                                                     |
| "Sarah Katerina"                                                             | Brand name                                                                                                      | —                                                                                                                                           |

**Everything else on the page is `proposal`, `pending` or `blocked`.**

---

## 3. Deliberately withheld

| Withheld                                                | Why                                                                                                                                                   | Where it would go                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Price of the review**                                 | A figure exists upstream but publication is not approved. Decision gate D2-04.                                                                        | FAQ "What does the review cost?" |
| **Price of `/tax-diagnostic`**                          | Same. Additionally, the "€1,000 savings or risks" guarantee attached to it is recorded upstream as **Propuesta** requiring legal review.              | Not referenced on this page      |
| **Every turnaround time**                               | No confirmed figure.                                                                                                                                  | All five process stages          |
| **The 20-year Tax Administration credential**           | Confirmed upstream, but the master audit requires a claims dossier (source, date, permission, scope) before publication. That dossier does not exist. | Trust strip, authority           |
| **Buyers advised / volume**                             | Upstream explicitly deprioritised volume as differential proof; a competitor publishes an indistinguishable figure.                                   | Trust strip                      |
| **Coverage, languages, response time**                  | No approved published wording.                                                                                                                        | Trust strip                      |
| **Every yield, return, percentage and modelled figure** | Would be a fabricated financial result.                                                                                                               | Hero visual, scenario chart      |
| **All case outcomes**                                   | Require written client permission and verified figures.                                                                                               | Cases                            |
| **Contact channels, legal entity, address**             | Not confirmed anywhere.                                                                                                                               | Footer                           |
| **Institutional descriptor**                            | `NEEDS_DECISION` upstream. `Property Decision Advisor` is `TEST` + `INTERNAL_TEST_ONLY`.                                                              | Hero eyebrow, authority          |

Enforced by test: no currency figure, no percentage, no guarantee language, no
uniqueness claim and no held or unapproved naming may appear in the content
module.

---

## 4. Claims requiring human review before publication

Every one of these is marked in the UI with a visible `REVIEW REQUIRED` badge.

### Tax

| Statement                                                                                                                                                                  | Note                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "The figure that decides your tax is not always the price you agreed. Spain can tax the higher of the agreed price, the declared value and the cadastral reference value." | Sourced to the Buyer System fiscal register (RDL 1/1993 art. 10.2), but publishing it needs a jurisdiction note, an effective date and a disclaimer. |
| "You are comparing properties across regions whose purchase taxes are not the same…"                                                                                       | Directionally supported; any specific statement needs review.                                                                                        |
| "Tax read before the commitment" and its risk statement                                                                                                                    | Service description touching tax.                                                                                                                    |
| "Tax treatment depends on your residence, the region and your circumstances, and changes over time."                                                                       | A limit statement, but still a tax statement.                                                                                                        |
| FAQ: "Will you tell me what tax I will pay?"                                                                                                                               | Answer is `pending` by design.                                                                                                                       |

### Legal

| Statement                                                                                   | Note                                |
| ------------------------------------------------------------------------------------------- | ----------------------------------- |
| "The arras deposit turns a maybe into a commitment with a penalty attached…"                | Describes a legal instrument.       |
| "A review is not a valuation, a survey, or a substitute for your own legal representation." | A scope limit with legal effect.    |
| Document-review stage description                                                           | Implies a level of legal diligence. |
| FAQ: remote working, scope                                                                  | Both `pending`.                     |

### Financial

| Statement                                                                                             | Note                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero subheading — "an independent financial review of the purchase"                                   | Describes a financial service.                                                                                                                        |
| "A listing tells you what a property costs. It does not tell you what it costs you, what it returns…" | Frames a financial outcome.                                                                                                                           |
| All three scenario descriptions                                                                       | Describe financial modelling.                                                                                                                         |
| "Full cost build-up", "Sensitivity to the assumptions…"                                               | Describe financial deliverables.                                                                                                                      |
| "Waiting is not neutral: deposits, exchange rates and mortgage offers all have dates on them."        | **Watch item.** Must not become an urgency device — the brand principle is Calm Evidence, and upstream review rejects copy that manufactures urgency. |

### Returns

| Statement                                                                      | Note                                                                                            |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| "No projected return is a promise. Models describe assumptions, not outcomes." | A disclaimer, but it is the statement that governs everything else in the visual proof section. |

---

## 5. CTA decisions

Per-intent CTA wording is an **open P0** in the master audit. Nothing here is
chosen.

| Position        | Provisional wording                      | Status       | Note                                                      |
| --------------- | ---------------------------------------- | ------------ | --------------------------------------------------------- |
| Header          | `Primary action`                         | System label | Deliberately not a commercial CTA                         |
| Hero primary    | `Review the investment`                  | `proposal`   | From the phase brief's provisional list                   |
| Hero secondary  | `Talk to Sarah first`                    | `proposal`   | Lower commitment                                          |
| Door 1          | `Review the investment`                  | `proposal`   | —                                                         |
| Door 2          | `See how the review works`               | `proposal`   | Routes to mechanism, not to contact                       |
| Door 3          | `Calculate what you would actually need` | `proposal`   | Routes to the free tool                                   |
| Final primary   | `Calculate your real cash needed`        | `proposal`   | Lowest-commitment step, deliberately not the paid product |
| Final secondary | `Talk to Sarah first`                    | `proposal`   | —                                                         |

**`Book a discovery call` is not used anywhere.** The master audit identifies it
as an over-used universal CTA that ignores the reader's intent. Replacing it
requires the per-intent decision above, so the prototype uses provisional
wording and says so on the page.

---

## 6. Language

English only. English is the primary acquisition language
(`decisions-log.md` 2026-07-27), and no new language may open before EN is
consolidated and ES is complete (2026-08-05).

Spanish routes do not exist, so **hreflang is deliberately not emitted** — the
SEO audit requires hreflang to be reciprocal, valid and only for equivalents.

Spanish copy is **not authored** in this phase. Translating unapproved English
copy would double the review surface without adding value.

---

## 7. Approving copy

For each statement: approve as written, rewrite, or reject.

1. Change the `status` to `confirmed` in `content/en/investment.ts`.
2. Add a `source` — the test fails without one.
3. If it sits in a review domain, the domain owner signs off **and** the
   `review` field moves to `'none'`, which is what removes the UI badge. The
   test blocks `confirmed` + a review domain precisely so this cannot be done
   by editing one field.
4. Record the approval here.

No agent may perform step 3.

---

## 8. Phase 2C — template copy adopted (2026-09-21)

Juanma approved the Investment template as the copy source. The template is in
Spanish; this route is English. Each string below is a faithful editorial
translation preserving intent, structure and rhythm.

Every one is classified `proposal` with `source: 'Investment template — approved
copy source (Juanma, 2026-09-21)'`. Approved as a copy _source_ is not the same
as approved for _publication_: the landing remains a preview.

### Headlines and sections

| Template (ES)                                                                                                                                                           | Adaptation (EN)                                                                                                                               | Note                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| INVERSIÓN CON SENTIDO                                                                                                                                                   | Investment with purpose                                                                                                                       | —                                                                            |
| Propiedades. Datos. Decisiones más inteligentes.                                                                                                                        | Properties. Data. Smarter decisions.                                                                                                          | —                                                                            |
| Asesoramiento independiente para compradores extranjeros en la Costa Blanca. Análisis, fiscalidad y acompañamiento completo para invertir con seguridad y rentabilidad. | Independent advice for foreign buyers on the Costa Blanca. Property investment analysis, tax and full support, so you invest with confidence. | **"y rentabilidad" dropped** — promising returns is a financial claim        |
| HABLAR CON SARAH / VER CÓMO FUNCIONA                                                                                                                                    | Talk to Sarah / See how it works                                                                                                              | —                                                                            |
| POR QUÉ EXISTIMOS · Un puente entre oportunidades y tranquilidad.                                                                                                       | Why we exist · A bridge between opportunity and peace of mind.                                                                                | —                                                                            |
| Existimos para ayudar a compradores internacionales… forma más transparente, inteligente y humana de invertir en España.                                                | We exist to help international buyers… a more transparent, more intelligent and more human way of investing in Spain.                         | Split into two paragraphs for rhythm                                         |
| ELIGE TU PUNTO DE PARTIDA · Dos caminos. Un mismo objetivo: una inversión bien fundamentada.                                                                            | Choose your starting point · Two paths. One goal: an investment built on evidence.                                                            | —                                                                            |
| TRAIGO UNA PROPIEDAD · Analizamos la propiedad que ya tienes en mente con un enfoque técnico, fiscal y financiero.                                                      | I have a property in mind · We analyse the property you already have in mind with a technical, tax and financial approach.                    | —                                                                            |
| QUIERO VER OPORTUNIDADES · Te mostramos una selección de oportunidades que encajan con tus objetivos de inversión.                                                      | I want to see opportunities · We show you a selection of opportunities that fit your investment objectives.                                   | —                                                                            |
| TIPOS DE ACTIVOS · Distintas estrategias. Un mismo análisis riguroso.                                                                                                   | Asset types · Different strategies. One rigorous analysis.                                                                                    | —                                                                            |
| RESIDENCIAL / SUELO / COMERCIAL / REDEVELOPMENT                                                                                                                         | Residential / Land / Commercial / Redevelopment                                                                                               | "potencial de revalorización" softened to "potential to be repositioned"     |
| CÓMO ANALIZAMOS · Un proceso claro. Decisiones con fundamento.                                                                                                          | How we analyse · A clear process. Decisions with a basis.                                                                                     | —                                                                            |
| Market Screen / Due Diligence / Modelo Financiero / Capa Fiscal / Informe de Decisión                                                                                   | Market screen / Due diligence / Financial modelling / Tax overlay / Decision report                                                           | "Optimización fiscal" → "Tax treatment": optimisation implies an outcome     |
| PREVIEW DEL INFORME COMPLETO · Informes claros, visuales y orientados a la toma de decisiones.                                                                          | Preview of the full report · Clear, visual reports built for decisions.                                                                       | —                                                                            |
| ESCENARIOS, RIESGO Y RENTABILIDAD · Las suposiciones y el riesgo a la baja importan más que las promesas del folleto.                                                   | Scenarios, risk and return · Assumptions and downside risk matter more than brochure promises.                                                | —                                                                            |
| EL CONOCIMIENTO DETRÁS DE CADA DECISIÓN · Experiencia, independencia y un enfoque personal.                                                                             | The knowledge behind every decision · Experience, independence and a personal approach.                                                       | —                                                                            |
| Con más de 20 años dentro de la administración fiscal…                                                                                                                  | With 20 years inside Spain's tax administration…                                                                                              | **"más de" dropped** — the confirmed credential is exactly 20 years          |
| TRES OPERACIONES. TRES DECISIONES.                                                                                                                                      | Three operations. Three decisions.                                                                                                            | —                                                                            |
| Resultados reales. Historias reales.                                                                                                                                    | _Not reproduced_                                                                                                                              | Asserts results that are not evidenced; replaced with a permission statement |
| ACOMPAÑAMIENTO EN TODA LA OPERACIÓN · Un ecosistema completo para una inversión sin fricciones.                                                                         | Support across the whole operation · A complete ecosystem for a frictionless investment.                                                      | —                                                                            |
| ANALIZAR / COMPRAR / DECLARAR / OPERAR                                                                                                                                  | Analyse / Buy / Declare / Own                                                                                                                 | —                                                                            |
| PREGUNTAS FRECUENTES · Respuestas a las dudas más comunes.                                                                                                              | Quick answers · Answers to the most common questions.                                                                                         | Eyebrow uses the brief's "Quick answers"                                     |
| El informe incluye análisis de mercado, due diligence, modelo financiero, análisis fiscal, escenarios de riesgo y una recomendación final.                              | Market analysis, due diligence, a financial model, tax analysis, risk scenarios and a final recommendation.                                   | —                                                                            |
| TU INVERSIÓN MERECE UN ANÁLISIS PROFESIONAL · Hablemos de tu próxima inversión.                                                                                         | Your investment deserves a professional analysis · Let's talk about your next investment.                                                     | —                                                                            |
| Sin compromiso · Respuesta en 1 día laborable                                                                                                                           | No obligation.                                                                                                                                | **Response time withheld** — not confirmed                                   |
| SOLICITAR ANÁLISIS / HABLAR PRIMERO                                                                                                                                     | Request an analysis / Talk first                                                                                                              | —                                                                            |
| Inversión inmobiliaria con criterio. Costa Blanca, España.                                                                                                              | Property investment with judgement. Costa Blanca, Spain.                                                                                      | —                                                                            |
| © 2024 Sarah Katerina Investment. Todos los derechos reservados.                                                                                                        | _Not reproduced_                                                                                                                              | Names a legal entity that is NEEDS_DECISION upstream                         |

### Editorial script accents

Reused verbatim in translation, set in the display serif italic because no
script typeface is governed.

| Template                                            | Adaptation                                           |
| --------------------------------------------------- | ---------------------------------------------------- |
| A better life, a smarter investment.                | _(already English, unchanged)_                       |
| Más que propiedades. Mejores decisiones.            | More than properties. Better decisions.              |
| Oportunidades tangibles. Decisiones con confianza.  | Tangible opportunities. Decisions with confidence.   |
| Datos hoy. Tranquilidad mañana.                     | Data today. Peace of mind tomorrow.                  |
| Invertir bien también es saber qué puede salir mal. | Investing well also means knowing what can go wrong. |
| Inversiones más inteligentes. Vidas más plenas.     | Smarter investments. Fuller lives.                   |
| Un único interlocutor. Todo bajo control.           | One point of contact. Everything under control.      |
| Mismas preguntas. Mejores decisiones.               | Same questions. Better decisions.                    |
| COSTA BLANCA · Vivir. Invertir. Pertenecer.         | Costa Blanca · Live. Invest. Belong.                 |

### Figures in the template that are NOT reproduced

`160+ compradores` · `Análisis en 48 h` · `€850.000` · `+42%` · `6,1%` ·
`2,8x` · the three testimonial quotes · the three client countries
(United Kingdom, Germany, Netherlands) · `Respuesta en 1 día laborable` ·
the five risk ratings · the Monte Carlo percentiles.

`6,8%` and `€24.500` appear only as clearly tagged illustrative samples
(`6.0%`, `€24,000`), never as the template's exact figures.

Enforced by test: no currency figure, no percentage, no guarantee, no
uniqueness claim and no held naming may appear in a classified claim.

---

## 9. Property Purchase template copy (2026-09-22)

The Property Purchase template is the approved Phase 2 editorial source for
`/preview/property-purchase`. Its wording is adapted into English in
`content/en/property-purchase.ts`; every rendered statement is a classified
claim. This is approval to implement the preview narrative, not publication
approval.

| Template idea                              | Preview adaptation                                                                    | Classification / constraint                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `The buying process, handled as one file.` | Reused verbatim                                                                       | `proposal`, template source                                    |
| Independent end-to-end buyer support       | Independent support for international buyers; one connected file from viewing to keys | `proposal`; legal scope review required                        |
| `160+ compradores extranjeros`             | International buyers                                                                  | Figure withheld; audience framing remains a proposal           |
| `20 años de experiencia fiscal`            | Twenty years inside Spain's tax administration                                        | Confirmed by credential register; no `more than` wording       |
| `One file. From viewing to keys.`          | Reused verbatim                                                                       | `proposal`; legal scope review required                        |
| Seven live file statuses                   | Seven illustrative stages                                                             | Explicitly labelled illustrative; never a client file          |
| Six process durations and owners           | Six ordered steps and deliverables                                                    | Durations/ownership promises withheld                          |
| BUY / RENEGOTIATE / WALK AWAY              | Illustrative recommendation surface                                                   | Interface sample only; not a client result or financial advice |
| Three priced packages                      | Three service-scope cards                                                             | Prices and turnaround promises withheld pending approval       |
| Three real cases/testimonials              | Three permission-gated case slots                                                     | Images, quotes, countries, dates and outcomes withheld         |
| Property Management handoff                | Ownership handover                                                                    | Held service and naming omitted                                |
| One working day response                   | Contact routes and response time not confirmed                                        | `pending`; no speed promise                                    |

### Property Purchase claims requiring review

- Every statement about arras, representation, registry, due diligence, notary,
  official translation, remote signature and the exact service scope requires
  competent legal review.
- Every statement about purchase tax, tax filing, tax exposure or coordination
  with the tax administration requires competent tax review and a dated scope.
- Prices, timings, avoided costs and case outcomes cannot appear until sourced,
  verified and approved for publication.
- The two calculator entry points use the Buyer System's verified wording and
  resolve through `lib/buyer-system/links.ts`; an absent approved base URL
  renders a controlled state rather than a link.
