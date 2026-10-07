# Contributing

## Setup

Node.js 24+ and npm. Install [prek](https://github.com/j178/prek) for git hooks.

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run prek
npm run build && npm run smoke
```

prek runs whitespace, yaml/json, and markdownlint checks plus `astro check`.

## Conventions

- Page chrome (header, footer) lives in `src/layouts/Layout.astro`.
- Internal links are absolute (`/database/`, not `database/`).
- Nav burger script lives in `public/js/nav.js` (CSP `script-src 'self'`).
- Platform state uses `localStorage` keys documented in `AGENTS.md`.
- Access-code verification is client-side only (SHA-256 hashes in `platform/index.astro`).

## Pull requests

Branch from `main`, run the checks above, open a PR with a short summary and test plan.
