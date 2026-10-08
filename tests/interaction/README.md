# Browser interaction QA (not in CI)

`faq.interaction.ts` drives the FAQ disclosures in a real browser:

- Investment, Property Purchase and Tax Advisory use `appearance="light"`.
- Team uses `boxed`.

It runs at 375 px and 1440 px.

For every FAQ item that has a related link, and for one item without one, it checks:

- the answer is closed at load;
- it opens from the keyboard (Enter, and Space on alternate items);
- `aria-expanded` follows the state;
- while open, `aria-controls` names the real panel;
- the panel is a `region` named by its trigger;
- the related link carries the href and label from `FAQ_RELATED`;
- focus stays on the trigger;
- closing removes the panel and `aria-controls`, and leaves no dangling ARIA reference anywhere in the document;
- the related link navigates to its destination.

**Why it is not in CI.** This repository declares no browser automation dependency. Adding Playwright and a browser download to CI is a separate infrastructure decision. CI does check, on the built HTML:

- every `FAQ_RELATED` href against the rendered page it points to (`tests/internal-links.test.ts`);
- that FAQ answers are closed and their links absent in the prerendered HTML.

This suite covers the interaction locally.

## Run

```bash
npm run build && npx next start -p 3000 &
QA_BASE_URL=http://localhost:3000 \
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.js \
QA_EVIDENCE=faq-interaction-qa.json \
npm run test:interaction
```

`PLAYWRIGHT_MODULE` points at any installed Playwright. The recorded run used the global Playwright 1.56.1 with its bundled Chromium. `QA_EVIDENCE` is optional; it writes the per-check results as JSON.

The recorded run is `docs/screenshots/phase-2b-session-11/faq-interaction-qa.json`, with its commit and environment.

This is technical QA. It does not replace Juanma's visual review.
