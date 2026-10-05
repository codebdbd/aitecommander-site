# Aite Commander Website

Official product site scaffold for Aite Commander.

## Stack

- Astro
- TypeScript
- Static Site Generation
- CSS Custom Properties
- Build-time GitHub Releases data

## Local development

```bash
npm install
npm run dev
```

## Validation and build

```bash
npm run validate
npm run build
npm run preview
```

The build updates `src/data/release.generated.json` from `codebdbd/aitecommander` GitHub Releases. In local development a checked-in snapshot remains usable if GitHub is unavailable; in CI the build fails instead of publishing fake release data.

## Current localization state

Architecture supports RU / UK / EN / DE / FR / ES. The first implementation contains RU only; additional locales must be added before production release.

## Source documents

Product positioning, content, UI and implementation architecture are maintained in the Aite Site project documentation.
