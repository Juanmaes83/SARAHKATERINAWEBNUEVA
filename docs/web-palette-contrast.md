# Scoped website palette — values, provenance and measured contrast

Status: IMPLEMENTED FOR THE TAX ADVISORY PREVIEW · NOT CANONICAL · NOT PRODUCTION
Date: 2026-09-22
Scope: `SARAHKATERINAWEBNUEVA` only. The Brand System palette upstream is unchanged.

---

## 1. Authority for this palette

AGENTS.md §5.8 records the human decision of 2026-09-21:

> Scoped Phase 2 website palette approved: use the same ivory, navy and gold
> direction shown in website/nueva web, especially the Investment template.
> This is a scoped implementation decision for SARAHKATERINAWEBNUEVA; it does
> not replace the global canonical palette. Implement it with namespaced
> `--sk-web-*` tokens, verify WCAG contrast and never mutate the canonical
> token files.

This document is the "document exact values and contrast pairings before code"
half of `docs/phase-2-visual-implementation-contract.md` §4.

The layer lives in `app/tokens.web.css`. It does not touch `app/tokens.css`
(the byte-for-byte canonical copy) or `app/tokens.app.css`.
`tests/tokens-parity.test.ts` still hashes the canonical files, and
`tests/tax-advisory.test.ts` asserts that no `--sk-web-*` token appears in
either, and that nothing outside the Tax Advisory landing consumes one.

---

## 2. How each value was obtained

No colour here was chosen by eye.

| Method                                                                                                                        | Applies to                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Canonical alias.** The token resolves to an already-approved value.                                                         | `--sk-web-ground`, `--sk-web-ground-alt`, `--sk-web-surface`, `--sk-web-text-on-dark`         |
| **Sampled.** Read directly from a flat area of the approved reference composition, `Sarah Katerina Tax Advisory.png`.         | `--sk-web-navy`, `--sk-web-navy-soft`, `--sk-web-gold`, `--sk-web-rule`, `--sk-web-rule-soft` |
| **Derived.** Hue and saturation held exactly at the sampled value's; lightness moved until a measured WCAG threshold was met. | `--sk-web-gold-lift`, `--sk-web-gold-ink`, `--sk-web-gold-on-dark`, `--sk-web-navy-line`      |

The template's page ground samples at `#FDFCF9`. The canonical warm white is
`#FFFDF9`. That difference is JPEG noise, not a design decision, so the
canonical token is used rather than a near-duplicate being introduced. The same
reasoning applies to the ivory band.

---

## 3. Values

| Token                   | Value                                  | Provenance                        | Role                           |
| ----------------------- | -------------------------------------- | --------------------------------- | ------------------------------ |
| `--sk-web-ground`       | `var(--sk-color-warm-white)` `#FFFDF9` | canonical alias                   | Page ground                    |
| `--sk-web-ground-alt`   | `var(--sk-color-ivory)` `#F5F0E7`      | canonical alias                   | Alternating band               |
| `--sk-web-surface`      | `var(--sk-color-white)` `#FFFFFF`      | canonical alias                   | Cards and panels               |
| `--sk-web-navy`         | `#0d2233`                              | sampled — authority band, footer  | Deep authority surface         |
| `--sk-web-navy-soft`    | `#12293c`                              | sampled — report-preview band     | Second dark surface            |
| `--sk-web-navy-line`    | `#1a4669`                              | derived from navy, lightness only | Hairline on navy (non-text)    |
| `--sk-web-gold`         | `#a78854`                              | sampled — CTA fill                | CTA fill, rules, numerals      |
| `--sk-web-gold-lift`    | `#b79c70`                              | derived, lighter                  | CTA hover fill                 |
| `--sk-web-gold-ink`     | `#806940`                              | derived, darker                   | Gold **type** on light grounds |
| `--sk-web-gold-on-dark` | `#bca37a`                              | derived, lighter                  | Gold **type** on navy          |
| `--sk-web-rule`         | `#d6ccb8`                              | sampled — card edges              | Hairline on light (non-text)   |
| `--sk-web-rule-soft`    | `#e7e0d2`                              | sampled — divider lines           | Hairline on light (non-text)   |

The template uses two navies deliberately: the report band sits slightly
lighter than the footer so two dark sections in sequence read as separate
surfaces. That distinction is preserved.

---

## 4. Measured contrast

Computed with the WCAG 2.1 relative-luminance formula. "Required" is 4.5:1 for
body text, 3:1 for text at 24px or above (or bold at 18.66px and above).

| Pairing                                               | Colours                | Measured   | Required | Result            |
| ----------------------------------------------------- | ---------------------- | ---------- | -------- | ----------------- |
| `--sk-web-navy` on `--sk-web-ground`                  | `#0D2233` on `#FFFDF9` | 15.98:1    | 4.5      | PASS              |
| `--sk-web-navy` on `--sk-web-ground-alt`              | `#0D2233` on `#F5F0E7` | 14.30:1    | 4.5      | PASS              |
| `--sk-web-navy` on `--sk-web-surface`                 | `#0D2233` on `#FFFFFF` | 16.23:1    | 4.5      | PASS              |
| `--sk-web-navy-soft` on `--sk-web-ground`             | `#12293C` on `#FFFDF9` | 14.68:1    | 4.5      | PASS              |
| `--sk-web-text-on-dark` on `--sk-web-navy`            | `#FFFDF9` on `#0D2233` | 15.98:1    | 4.5      | PASS              |
| `--sk-web-text-on-dark` on `--sk-web-navy-soft`       | `#FFFDF9` on `#12293C` | 14.68:1    | 4.5      | PASS              |
| **`--sk-web-navy` on `--sk-web-gold`** (CTA fill)     | `#0D2233` on `#A78854` | **4.86:1** | 4.5      | PASS              |
| `--sk-web-navy` on `--sk-web-gold-lift` (CTA hover)   | `#0D2233` on `#B79C70` | 6.19:1     | 4.5      | PASS              |
| `--sk-web-gold-ink` on `--sk-web-ground`              | `#806940` on `#FFFDF9` | 5.15:1     | 4.5      | PASS              |
| **`--sk-web-gold-ink` on `--sk-web-ground-alt`**      | `#806940` on `#F5F0E7` | **4.61:1** | 4.5      | PASS              |
| `--sk-web-gold-ink` on `--sk-web-surface`             | `#806940` on `#FFFFFF` | 5.23:1     | 4.5      | PASS              |
| `--sk-web-gold-on-dark` on `--sk-web-navy`            | `#BCA37A` on `#0D2233` | 6.69:1     | 4.5      | PASS              |
| `--sk-web-gold-on-dark` on `--sk-web-navy-soft`       | `#BCA37A` on `#12293C` | 6.15:1     | 4.5      | PASS              |
| `--sk-app-danger` on `--sk-web-ground`                | `#C53030` on `#FFFDF9` | 5.38:1     | 4.5      | PASS              |
| `--sk-app-danger` on `--sk-web-ground-alt`            | `#C53030` on `#F5F0E7` | 4.82:1     | 4.5      | PASS              |
| `--sk-app-danger` on `--sk-web-surface`               | `#C53030` on `#FFFFFF` | 5.47:1     | 4.5      | PASS              |
| `--sk-web-gold` on `--sk-web-navy` (large only)       | `#A78854` on `#0D2233` | 4.86:1     | 3.0      | PASS              |
| `--sk-web-gold` on `--sk-web-ground` (non-text rules) | `#A78854` on `#FFFDF9` | 3.28:1     | —        | Non-text          |
| `--sk-web-rule` on `--sk-web-ground`                  | `#D6CCB8` on `#FFFDF9` | 1.57:1     | —        | Non-text hairline |
| `--sk-web-rule-soft` on `--sk-web-ground`             | `#E7E0D2` on `#FFFDF9` | 1.29:1     | —        | Non-text hairline |
| `--sk-web-navy-line` on `--sk-web-navy`               | `#1A4669` on `#0D2233` | 1.64:1     | —        | Non-text hairline |

The two tightest pairings are marked in bold. Both clear AA, neither by much;
neither should be darkened or lightened without re-measuring.

### 4.1 Measured again on the rendered page

The table above is arithmetic on the tokens. It was also verified against what
the browser actually paints: every text node on `/preview/tax-advisory` was
walked at 1440px, its computed colour composited against its nearest opaque
ancestor background (including element `opacity`), and the ratio checked
against the threshold for its own rendered size and weight.

```
measured 49 distinct colour/size pairings
FAILING AA: 0
lowest ratio: 4.61 (13px #806940 on #F5F0E7 — the header service line)
```

The first run of that check found one failure: the hero's document chips sat on
a 92%-opaque plate over a photograph, so their contrast depended on the
photograph behind them. Those plates were made fully opaque, which removes the
dependency entirely — a replacement hero image cannot silently break them.

---

## 5. Deliberate divergence from the reference

**The template sets white type on its gold CTA fill. That measures 2.91:1 and
fails WCAG AA.**

The fill was kept and the type was changed to navy (4.86:1), rather than the
gold being altered. This preserves the reference's colour while meeting AA.

A consequence: the CTA hover state moves **lighter**, not darker. Navy type on
a darker gold drops below 4.5:1, so the conventional darken-on-hover would
break the control it is decorating. See `components/tax-advisory/TaxCta.module.css`.

This is a change to an approved visual reference and is flagged for Juanma.

---

## 6. Rules for anyone extending this layer

1. New colour values are not chosen. They are sampled from the approved
   reference or derived from an existing token by lightness alone.
2. Any new text pairing is measured and added to §4 before it is used.
3. `--sk-web-*` tokens stay inside `components/tax-advisory/**` and
   `app/preview/tax-advisory/**`. A test enforces it.
4. Component stylesheets never contain a colour literal. Translucency uses
   `color-mix()` over a token. A test enforces it.
5. Text over photography sits on an opaque plate, so its contrast does not
   depend on an asset that may be replaced.
6. `--sk-app-text-muted` remains PENDING_APPROVAL and is used nowhere.
