# Contact page — decisions, sources, map, formats and blockers

**Status:** EDITORIAL REDESIGN IMPLEMENTED LOCALLY · AWAITING JUANMA'S VISUAL REVIEW · PREVIEW/NOINDEX · NOT PRODUCTION

**Date:** 2026-09-29 (second pass, Juanma's decisions)

**Routes:** `/preview/contact` (full page) · Home `#contact` band · shared navigation and footers

The page helps a buyer — often abroad — choose one clear way to talk to the
office: book the 30-minute discovery call first; WhatsApp, phone and email
always visible beside it as the alternative and the fallback; video call,
phone call or a meeting in Torrevieja as explicit requests; the office address
with Google Maps below. Nothing was booked or sent during the audit.

## 0. Editorial redesign (2026-09-29, third pass)

The first two passes worked but read as a technical page (cards, lists, an
empty cream map box). This pass turns Contact into an editorial page in the
Home's visual system, around five moments:

| #   | Moment                      | Composition                                                                                                                                                                                                           | Key content                                                                                                                      |
| --- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hero                        | Phones: Sarah's photograph opens the page as a 4:3 band (face and "Sarah Katerina" sign in view), then headline, the one primary action and the direct channels. Desktop: words left (7/12), Sarah right (5/12, 4:5). | "Your next step starts with a conversation." · Book a discovery call · WhatsApp / Phone / Email                                  |
| 2   | How would you like to talk? | Lifestyle photograph (secondary, square, sticky on desktop) beside three numbered editorial rows.                                                                                                                     | Video call · Phone call · Meeting in Torrevieja — requests via WhatsApp / email (+ Call now) · first-message privacy note        |
| 3   | What happens after you book | Four steps on a gold line (vertical on phones, horizontal from tablet).                                                                                                                                               | Choose a time (30 min, weekdays 09:30–18:00 Spanish local time) · name and email · Google Calendar invitation · reply to change  |
| 4   | Office                      | Address and Maps actions left; the map module right.                                                                                                                                                                  | Calle Bazán 10, 03181 Torrevieja · Alicante · by prior request only · Open in Google Maps · Get directions · Show the Google map |
| 5   | Closing                     | Navy band.                                                                                                                                                                                                            | "Choose the way that suits you." · Book · the three direct channels                                                              |

The gold advisory thread of the Home runs down the margin through all five
moments and ends with a dot at the closing.

### 0.1 Originals used

| Slot                | Registry key → served file                                                   | Original (repository)                                                                                                  | Verification                                                                                                                                                                                                                                                                    | Treatment                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero — human focus  | `homeAuthority` → `public/media/home-sarah-authority.webp` (1122×1402)       | `IMAGES/Sarah home_1.png` — on `main` (`d7b24eda`), **not in this checkout**; SHA-256 `60CC3A7A…` recorded             | Visually and pixel-compared on 2026-09-29: the same photograph as `IMAGES/SARAHKATERINA_OFFICE_EDITORIAL.jpeg` (in this checkout, unregistered; mean abs. difference 0.97/255 against the `main` original — recompression only) and as `public/media/tax-authority-office.webp` | Existing compression-only WebP, no new file, no retouch; CSS crop only (`object-position: 50% 8%` on phones at 4:3, full 4:5 on desktop); `priority`, never animated |
| Formats — secondary | `territoryContact` → `public/media/graded/territory-contact.webp` (1376×768) | `IMAGES/sarahkaterina_LifeStyle_6.png` — the Tax Advisory lifestyle photograph (used by `components/web/TaxBands.tsx`) | Visually confirmed: phone, sunglasses, key and coffee on a marble table                                                                                                                                                                                                         | Existing `sk-editorial-v1` graded derivative; CSS crop 16:10 on phones, 1:1 on desktop; revealed with the shared `unveil`                                            |

No new image file was added. The screenshots supplied in the brief were not
used as assets. Sarah's approval of `Sarah home_1.png` is recorded for the Home;
its use on Contact is Juanma's request of 2026-09-29 — worth confirming with
Sarah before publication. The phone in the lifestyle photograph shows a
mock-up of this site (recorded in the registry as self-referential).

### 0.2 Interactions

- **Book a discovery call** (hero, step section, closing) → the audited
  booking page, new tab; one primary button per moment, never two competing.
- **WhatsApp / Phone / Email** — the same three links in the hero and the
  closing; `wa.me/34647754589?text=…`, `tel:+34647754589`,
  `mailto:…?subject=Discovery call`.
- **Formats** — "Request by WhatsApp" / "Request by email" per format, each
  with its own opener or subject; "Call now" for the phone format.
- **Map** — initial state is a deliberate navy module (quiet street-grid
  texture, clearly not a map), a gold pin, the address and **Show the Google
  map**; one click loads the real Google map of the same address in the same
  4:3 frame (no layout shift). QA: 0 requests to Google before the click;
  after it, the map shows "C. Bazan, 10, 03181 Torrevieja". Open in Google
  Maps and Get directions are always beside it.

### 0.3 Motion (existing primitives only; no new dependency)

| Element                        | Behaviour                                                                                                                                | Reduced motion / no JS  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Hero (H1, lead, CTA, portrait) | **None** — renders at first paint (LCP)                                                                                                  | same                    |
| Section headings and text      | Shared `RevealOnScroll` rise at the reading line                                                                                         | visible, no motion      |
| Lifestyle photograph           | Shared `unveil` (frame opens from its lower edge)                                                                                        | visible                 |
| Format rows                    | Staggered rise                                                                                                                           | visible                 |
| Step line and nodes            | Line draws once the timeline reaches the reading line (measured `scaleX` 0.20 → 0.71 → 0.97 → 1 at 20× slowed playback); nodes fill navy | line drawn, nodes plain |
| Gold thread                    | Native scroll-driven draw, tip at mid-viewport                                                                                           | drawn                   |
| Links, map button              | Quick colour / underline feedback                                                                                                        | instant                 |

No scroll-jacking, no parallax, nothing hides content before JavaScript.

## 1. Decisions confirmed by Juanma (2026-09-29)

| Decision                                                           | Implementation                                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Address is exactly **Calle Bazán 10, 03181 Torrevieja · Alicante** | Shown verbatim; not replaced by map-data variants (§4).                                    |
| Use the phone and email published on the reference contact page    | +34 647 754 589 (phone and WhatsApp); `info@sarahkaterina.com` via configuration (§3).     |
| Contemplate video calls and meetings                               | "How would you like to talk?" — video, phone, meeting in Torrevieja — each a request (§2). |
| Contact visible and reviewable from the Home                       | Home `#contact` band + "Contact" in the shared header/menu and in every footer (§6).       |

This supersedes the first pass of the same day, which kept the office hidden
and Contact out of the navigation.

## 2. Booking and formats

**Primary action — Book a discovery call** (live `/book-a-call`, audited
read-only): the reference site's own booking component and API
(`GET /api/availability` read; `POST /api/bookings` never called). Verified
and shown: 30-minute slots; weekdays 09:30–18:00 **Spanish local time**
(`Europe/Madrid`; not "CET", which is wrong in summer); the visitor's own time
zone shown beside every time; pick a time → name and email (phone and topic
optional) → Google Calendar invitation, "reply to it if anything changes".

**Not stated, not verified:** a guaranteed Google Meet link (the confirmation
shows one only if the event has it), cost ("No cost" is on the live page but
not confirmed), response time, the call's content, Sarah personally taking the
call, walk-in visits.

**Formats (requests):** the booking system confirms one format only. So:

| Format                | Real action                                                      | Wording                                                                       |
| --------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Video call            | WhatsApp or email with a "request a video call" opener / subject | "Each option below sends a request; nothing is booked until it is confirmed." |
| Phone call            | WhatsApp or email request, or **Call now** (`tel:`)              | same                                                                          |
| Meeting in Torrevieja | WhatsApp or email request                                        | "At the office on Calle Bazán, by prior request only."                        |

The booking card also says a preferred format can be mentioned in the booking
form's optional topic field, "a request, confirmed in reply". Fallback, always
visible: "If the calendar shows no times or does not load, use WhatsApp, phone
or email instead."

**Risk to check (owner):** every weekday, including 12 October (a national
holiday), showed all 17 slots free — the availability may be a fixed template
rather than a calendar with busy times. Confirm with a controlled test booking.

## 3. Channels and configuration

| Channel                                             | Source                       | Link                                                                     |
| --------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| WhatsApp +34 647 754 589                            | reference `/contact`, Juanma | `wa.me/34647754589?text=…` (neutral or request opener; no personal data) |
| Phone +34 647 754 589                               | same                         | `tel:+34647754589`                                                       |
| Email `info@sarahkaterina.com`                      | same                         | `mailto:` with a subject per purpose                                     |
| Booking `https://www.sarahkaterina.com/book-a-call` | audited                      | external, opens in a new tab                                             |

The booking URL and the email carry the production domain, and the canonical
host is an open decision (AGENTS.md §7.3; `tests/governance.test.ts` forbids
the host in source). They are therefore configuration —
`NEXT_PUBLIC_BOOKING_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` — like the Buyer System
origin. Unset, the booking card shows "Online booking is not available here
yet…" and the email channel is omitted; phone and WhatsApp remain.
`.env.local` (gitignored) holds the values for local review. **No Vercel
variable was changed**: a Vercel Preview would render the unconfigured state
until they are set there.

## 4. Address and Google Maps

- Text: "Calle Bazán 10 / 03181 Torrevieja · Alicante", exactly as confirmed.
- **Open in Google Maps** → `google.com/maps/search/?api=1&query=Calle Bazán 10, 03181 Torrevieja, Alicante`;
  **Get directions** → `google.com/maps/dir/?api=1&destination=…` (documented
  public URL scheme, no key).
- **Pin check (2026-09-29):** Google resolves the query to "C. Bazan, 10,
  03181 Torrevieja, Alicante" at 37.9785874, -0.6823548. Open map data gives
  the same point (37.9785916, -0.6823663, ~1 m) under the street name "Calle
  Hermanos Bazán". Same place, different street label; the page text is not
  changed. It is an address pin, not a business listing: no profile, reviews or
  ratings are shown or implied. Another street, "Calle Emilia Pardo Bazán"
  (03184), exists in Torrevieja; the postcode 03181 in the query disambiguates.
- **Map:** a Google map in the secondary Office section, **loaded only on
  request** ("Show the map"): zero requests to Google before the click (QA: 0
  before, iframe after), fixed 4:3 frame so nothing shifts, iframe `title`,
  `referrerPolicy="strict-origin-when-cross-origin"`, keyless
  `?q=…&output=embed` form (Google redirects it to `/maps/embed`). Without
  JavaScript the button is not shown; the address and Maps links remain. It is
  never the LCP (the H1 is).
- Meetings: "by prior request only". No walk-in visits are stated.

## 5. Form — not integrated

The reference site's form posts to `POST /api/lead-notify` (fields: honeypot
`botcheck`, `full_name`, `email`, `phone`, `message`; the client reads
`{ ok }` and redirects on success). Checked without sending data:

- CORS: an `OPTIONS` preflight from `localhost:3001` and from the Vercel
  preview origin returns `204` with `Access-Control-Allow-Origin: *`, so a
  browser **could** post to it from this site.
- It is still **not safe to reuse** without new permissions and work:
  1. its server code is not in any repository this workspace can read, so where
     the data goes, what is logged and how long it is kept cannot be verified;
  2. posting from an unreviewed preview would deliver real leads to the
     production inbox — needs Juanma's explicit authorisation, or a test /
     preview mode on that endpoint;
  3. this site has no approved privacy notice or consent wording (information
     at the point of collection);
  4. success and error handling could only be verified by a real submission.

**To complete it:** authorisation for preview submissions (or a test mode),
read access to the endpoint's code or a written data-flow description
(destination, logging, retention, PII in logs/URLs), an approved privacy notice
and consent line, a success/error state design, and one controlled test
submission to a test inbox. Until then the direct channels are the working
alternative, and no form is shown.

## 6. Navigation, footers and Home

- `UNIFIED_WEB_NAV` gains **Contact** (`/preview/contact`) as its last item:
  the header, the mobile menu (focus trap, Escape) and `aria-current="page"`
  come from the shared component, unchanged. At 1280 px and above the six links
  fit on one row; below that the existing Menu is used.
- Footers: the Investment, Property Purchase and Tax Advisory footers already
  listed "Contact" as plain text — it is now a real link; Team and Home gain
  one. Only the `footer` blocks changed (verified by diff); the protected
  content hashes in `tests/phase-2g-connected-journey.test.ts` were re-recorded
  with that note. Landing compositions are unchanged.
- Home: a short **Talk it through** band (`#contact`) after the FAQ and before
  the final action — Book a discovery call, All contact options →
  `/preview/contact`, WhatsApp, Call, and the office line. No form, map or
  format cards on the Home.

**Note:** these Home, navigation and footer changes come **after** Juanma's
visual approval of the Home (PR #32) and are not in that PR; they need their
own review.

## 7. QA (2026-09-29)

- `lint`, `typecheck` pass; `vitest` 18 files / 301 tests pass
  (`tests/contact.test.ts` 14 tests: route, nav, footers, no form/API/JSON-LD,
  channels, openers, claims, formats as requests, exact address, Maps links,
  map on demand); isolated `next build` passes (`/preview/contact` 131 kB,
  `/preview/home` 155 kB First Load JS).
- Browser (dev :3001): Home, Contact and the four landings at 320, 390, 768,
  1024 and 1440 px — 30/30 with one H1, no horizontal overflow, no console
  errors, no broken anchors, no target under 44 px, `noindex, nofollow`.
- Interactions: header at 1280/1440 one row with Contact current; mobile menu
  lists Contact, Escape returns focus to Menu; every `tel:`, `mailto:`, `wa.me`
  and Maps link resolves to the values above; map: 0 Google requests before
  "Show the map", iframe after; keyboard: 23 stops in order with a 2 px focus
  ring; reduced motion: nothing hidden; no JS: address, Maps links and the
  three formats present, no dead map button; every footer has the Contact link.

### 7.1 Editorial redesign QA (2026-09-29, third pass)

- `lint`, `typecheck` pass; `vitest` 18 files / 305 tests pass (`tests/contact.test.ts`
  now 17 tests, including the two originals, the unanimated hero, one primary
  action in the hero and the map's legible initial state); isolated
  `next build` passes (`/preview/contact` 132 kB First Load JS).
- Browser (dev :3001): Contact, Home and the four landings at 320, 390, 768,
  1024 and 1440 px — 30/30: one H1, no overflow, no console or page errors, no
  broken anchors, no target under 44 px, `noindex, nofollow`.
- Contact at 390×844 and 1440×900: both photographs load (`naturalWidth` > 0),
  no failed requests, no empty section; map 0 → loaded, 342×257 and 653×490
  frames unchanged; keyboard: 29 stops in order, 2 px focus ring on each;
  reduced motion and no JavaScript: nothing at opacity 0, map button absent
  without JavaScript, address and Maps links present.
- Captures: `docs/screenshots/contact-editorial-2026-09-29/` — full page and
  first viewport at 390 and 1440, map before/after at both widths, motion
  frames of the formats and the step line (slowed playback), QA JSON.

**Still open:** a Vercel Preview would show the unconfigured booking/email
state until `NEXT_PUBLIC_BOOKING_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` are set
there; Sarah's confirmation of her portrait on Contact; the booking test by the
owner (availability looked like a fixed template); the form (§5); these
changes are not in PR #32 and need their own review and PR.
