# AGENTS.md

Check for this file at the start of each session and follow its rules.

## Project overview

Static website for National Gnomics Infrastructure (NGnI), a fictional gnome-scale genomics facility parodying [ngisweden.scilifelab.se](https://ngisweden.scilifelab.se). Astro 6, TypeScript, deployed to GitHub Pages.

## Commands

```bash
npm install --legacy-peer-deps   # install (flag required until @astrojs/check supports TypeScript 6)
npm run dev                      # local dev server
npm run build                    # production build → dist/
npm run check                    # Astro/TypeScript type check (the only "test")
```

No test suite. `npm run check` is the primary correctness gate, run as a pre-commit hook via `prek`.

## Architecture

- Single layout — every page wraps its content in `src/layouts/Layout.astro`. Layout accepts `title` and `description` props.
- File-based routing — pages in `src/pages/` map directly to URL routes (Astro convention). Sub-directories become path segments (e.g. `src/pages/applications/gnome-sequencing/index.astro` → `/applications/gnome-sequencing/`).
- Global styles — all CSS lives in `src/styles/global.css`; no CSS modules or component-scoped styles. Inline `style=` attributes are used within `.astro` files.
- Platform section — `src/pages/platform/` contains an interactive multi-step workflow (access-code verification → species identification → project retrieval). State lives in `localStorage` under the keys: `team`, `leader`, `species_done`, `spirit_animal`, `accession`, `code_idx`, `mode`.

## Key conventions

- Pass `--legacy-peer-deps` for any `npm install` or `npm ci` invocation until the TypeScript 6 compatibility issue in `@astrojs/check` is resolved (tracked in CI TODO comments).
- Access-code verification is client-side only: compare a SHA-256 hash of the entered code against hardcoded hashes in `platform/index.astro`. The site is purely static — do not move this logic server-side.
- GitHub Actions pins actions by full commit SHA, not version tag (e.g. `actions/checkout@de0fac2e...`). Follow the same pattern when adding or updating actions.
- Deployment triggers on push to `main` when source files change; CI runs on every push and PR to `main`.
- Git workflow — never push directly to `main`. Always use a feature branch and open a PR. Sync `main` before creating a new branch (`git checkout main && git pull origin main`).
- Pre-commit hooks are managed by `prek` (config: `prek.toml`). Hooks cover trailing whitespace, end-of-file newlines, YAML/JSON validity, merge conflict markers, line-ending consistency, and `astro check`.
