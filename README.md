# [nationalgnomicsinfrastructure.github.io](https://nationalgnomicsinfrastructure.github.io)

<p align="center">
  <img src="public/ngni-logo.png" alt="NGnI logo" height="120" />
</p>

[![CI](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/NationalGnomicsInfrastructure/nationalgnomicsinfrastructure.github.io/actions/workflows/deploy.yml)

Website for the **National Gnomics Infrastructure (NGnI)** — a fictional gnome-scale genomics facility, built with [Astro](https://astro.build).

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
public/          Static assets (favicon, logos)
src/layouts/     Shared layout components
src/pages/       Astro routes
src/styles/      Global CSS
prek.toml        Pre-commit hook configuration
```

## Deployment

Deployment is handled automatically by GitHub Actions to GitHub Pages on every push to `main` that modifies source files.
