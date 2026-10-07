# [nationalgnomicsinfrastructure.github.io](https://nationalgnomicsinfrastructure.github.io)

[![CI](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/deploy.yml)

<img alt="NGnI logo" height="120" src="public/ngni-logo.png">

Website for the **National Gnomics Infrastructure (NGnI)** — a fictional gnome-scale facility, built with [Astro](https://astro.build).

> [!NOTE]
> Looking for the **real** National Genomics Infrastructure?
> Visit [ngisweden.scilifelab.se](https://ngisweden.scilifelab.se/).

## Quick Start

Prerequisites:

- Node.js 24+
- npm

Install:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build production output:

```bash
npm run build
```

Type check:

```bash
npm run check
```

## Project Structure

```text
public/          Static assets (favicon, logos, nav.js)
src/layouts/     Shared layout components
src/pages/       Astro routes
src/styles/      Global CSS
scripts/         Build smoke checks
prek.toml        Pre-commit hook configuration
```

## Deployment

Deployment is handled by GitHub Actions to GitHub Pages on every push to `main` that modifies source files.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, quality checks, and pull request guidelines.
