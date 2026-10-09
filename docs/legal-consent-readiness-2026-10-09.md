# Legal pages, consent and measurement: readiness (2026-10-09)

Branch `claude/consentimiento-medicion`. **Preparation only:** no tag, vendor,
legal text or identity data has been added. The footer's legal and entity
slots remain `PendingSlot`, as AGENTS.md requires.

## What this branch adds

- `lib/consent/consent.ts`:
  - A versioned consent record with only booleans and a date. No identifier is stored.
  - Without a valid decision, `analytics` and `marketing` are denied.
  - Accept all and reject all are symmetric.
  - A decision is invalid when:
    - no cookie policy is approved (`policyVersion: null`, the current default);
    - the policy version changes;
    - it is older than the configured validity;
    - it is malformed or dated in the future.
  - Includes the Google Consent Mode v2 mapping. The default must be all optional storage `denied` before any tag loads.
- `lib/analytics/consented.ts`: wraps a future vendor adapter. No event is forwarded without analytics consent, and consent is re-read on every event, so withdrawing takes effect immediately.
- `tests/consent.test.ts`: 6 tests.
- No banner or preferences UI yet. While no optional cookie or tag exists, a banner would ask for consent to nothing. The UI ships together with the first approved vendor and needs a visual review at 360 px.

## Data that must be verified before any legal page

None of this is confirmed in the repository or in the upstream source of truth. Do not fill it from memory, from the old site or by inference.

| Field (LSSI art. 10 / GDPR art. 13)          | State                                                                                                                                                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controller legal name (person or company)    | NOT VERIFIED (entity conflict open, P0 D-06)                                                                                                                                 |
| NIF/CIF                                      | NOT VERIFIED                                                                                                                                                                 |
| Registered address                           | NOT VERIFIED                                                                                                                                                                 |
| Mercantile registry data, if a company       | NOT VERIFIED                                                                                                                                                                 |
| Professional registration or licence, if any | NOT VERIFIED                                                                                                                                                                 |
| Contact email for privacy requests           | `info@sarahkaterina.com` and `+34 647 754 589` are **observed** on the live site (snapshot 2026-10-07). Their use as controller contact is not confirmed                     |
| DPO (if required)                            | NOT VERIFIED                                                                                                                                                                 |
| Processors actually used                     | Studio uses Supabase. The old `/privacy` mentions Analytics, Stripe and Web3Forms, which this site does not use in the same way. Booking and map providers need confirmation |
| International transfers                      | Depends on the processors. NOT VERIFIED                                                                                                                                      |
| Retention periods per purpose                | Human decision                                                                                                                                                               |
| Legal bases per purpose                      | Human or legal decision                                                                                                                                                      |
| Consent validity before asking again         | Code default 180 days. Human decision                                                                                                                                        |

## Measurement (GA4/GTM): order of work once approved

1. The owner approves the vendor (GA4 directly or via GTM) and gives the container or measurement ID.
2. The cookie policy text is approved: set `policyVersion`.
3. Add the preferences UI (banner with accept/reject at equal prominence, plus a permanent "Cookie preferences" link in the footer). Run a 360 px review.
4. Load the tag only after the Consent Mode default call. Register `consentedAdapter(vendorAdapter, readConsent)`.
5. Verify in a browser on a Preview deployment:
   - no request to Google before a decision;
   - with "reject", `analytics_storage=denied`;
   - with "accept", events arrive in GA4 DebugView.
     Record the evidence with a date. Without it, measurement is not declared working.

The access granted to marketing@sarahkaterina.com in GA4, GTM, Search Console, Ads and Business Profile is an invitation. It does not connect any API to this site.
