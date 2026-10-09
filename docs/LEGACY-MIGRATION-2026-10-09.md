# Legacy migration implementation — 9 October 2026

## Owner instruction and boundaries

Juanma instructed implementation and publication of the legacy in the latest new web, with chatbot and WhatsApp postponed. This supersedes the earlier pause for this migration implementation. Repository: SARAHKATERINAWEBNUEVA only. No Rubik, strategic source, DNS, indexation, secrets, provider or hosted data changes.

## Existing content retained

The canonical Studio already contains adapted legacy editorials. The hosted publication record of 8 October documents six legacy articles and four legacy cases, plus two new articles. This change does not reimport, overwrite or republish them. The historical source snapshot and private notes remain intact; obsolete claims and held subjects are not copied back.

The migration registry now records all ten captured editorial paths as keep, including the two cases and three articles it previously described as missing, and the remaining five captured URLs absent from that registry. Public Home, About, Investment, service pages, Contact and both editorial collections are marked keep at their existing paths.

## Compatibility implemented in code

Seven one-hop permanent HTTP 308 mappings are active:

| Legacy entry point | Current destination |
| --- | --- |
| /services | / |
| /services/investment-advisory | /investment |
| /book-a-call | /contact |
| /guides | /insights |
| /modelo-210-help | /services/tax-advisory |
| /english-tax-advisor-costa-blanca | /services/tax-advisory |
| /foreign-buyer-tax-guide | /services/tax-advisory |

The last four are new. The three tax landings use the existing tax service as a topic-level destination; their old copy is not retained and this does not claim SEO/content equivalence. /guides consolidates resources into Insights. No blanket catch-all redirects, redirects to previews, language switching, deletion or payment checkout is introduced.

## Tests and verification

Added a snapshot-based contract test: every captured editorial URL remains at its original public path, aliases have publishable one-hop destinations, and legal/paid/held/Spanish/external-domain decisions stay separate. Updated existing redirect assertions from three to seven. Extended the existing CI route capture with actual 308 Location and destination 200 checks for all seven mappings.

Local executor was unavailable in this turn (exec server returned no such file or directory). No local lint/typecheck/build result is claimed. GitHub CI runs the full lint/typecheck/test/build and HTTP capture gates on the PR head; exact result and delivery SHA are recorded in the PR/checkpoint.

## Review routes and data effect

Use the PR's exact Vercel deployment (recorded by its deployment status) on desktop and mobile. Vercel access may be required; no Studio login is required for service/collection pages. Open each legacy source above: expect one 308 and then the destination. No form, data write, message, API billing or publishing action occurs. Article/case details depend on existing published database content, not bundled source or drafts.

## Still not complete: explicit blockers

- /privacy: old policy describes Analytics, Stripe and Web3Forms, unlike this stack. Controller identity and approved legal text are absent; do not fabricate or publish an inaccurate policy.
- /tax-diagnostic: legacy paid product has no approved price/payment integration in this app. It is not replaced by a service redirect that could hide a purchase flow.
- Spanish routes: no Spanish implementation or approved translated copy exists. No false hreflang or silent EN redirect.
- Group, management and investment listings: held/retire decisions remain separate. No content recreated.
- Separate legacy Spanish domain: its redirects require control of that hosting/domain; no DNS or old-host change performed.
- Public www cutover still requires domain verification, legal closure and deployment checks. Code integration and a Vercel deployment do not prove that www serves this build.

The legacy migration must NOT be labelled fully finished until these blockers are resolved. Chatbot/WhatsApp are next only after this state is reviewed; none is added here.
