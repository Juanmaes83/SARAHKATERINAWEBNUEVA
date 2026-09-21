# Vendored canonical tokens

`tokens.json` is a **byte-for-byte copy** of
`brand-system/tokens/tokens.json` from `Juanmaes83/sarahkaterina`.
`../../app/tokens.css` is the matching copy of `brand-system/tokens/tokens.css`.

**Do not edit either file.**

To change a token: change it upstream, get it approved, then re-vendor both
files and update the provenance table in the root `README.md`.

`parity.ts` re-derives the CSS variable names and values from the JSON using
the canonical naming contract. `tests/tokens-parity.test.ts` recomputes the git
blob hash and asserts full parity, so any drift fails CI.

Application-only tokens belong in `app/tokens.app.css`, namespaced `--sk-app-`.
