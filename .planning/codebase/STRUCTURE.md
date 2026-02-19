# Directory Structure

## Overview

SafeCypher Web is currently a **pre-Astro static HTML project**. The Astro framework is installed (`package.json`, `astro.config.mjs`) but the main site content lives in root-level HTML files rather than `src/pages/`. Only `src/env.d.ts` exists under `src/`.

## Root Layout

```
safecypher-web/
├── index.html                    # Main marketing/landing page
├── safe-verify-landing.html      # SafeVerify product landing page
├── assets/
│   └── imgs/
│       ├── safecypher-shield.png
│       └── safecypher-shield-grey.png
├── demos/
│   └── boa/
│       ├── bofa-agentic-banking-mockup.html  # Bank of America demo mockup
│       ├── BoA-app-header.png
│       └── BoA-app-footer.png
├── public/
│   └── demos/                    # (empty - for future demo assets)
├── docs/
│   ├── SafeCypher_Website_PRD_v1.md
│   ├── Card Issuers |.pdf
│   ├── Cardholders |.pdf
│   ├── FAQs.pdf
│   ├── Privacy Policy.pdf
│   └── Ts&Cs.pdf
├── src/
│   └── env.d.ts                  # Astro TypeScript reference
├── astro.config.mjs              # Astro configuration
├── package.json
├── tsconfig.json
└── .gitignore
```

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Primary marketing page — SafeCypher product overview |
| `safe-verify-landing.html` | SafeVerify feature landing page |
| `demos/boa/bofa-agentic-banking-mockup.html` | BoA agentic banking demo |
| `docs/SafeCypher_Website_PRD_v1.md` | Product Requirements Document |
| `astro.config.mjs` | Astro config (framework ready but not yet active) |

## Notes

- **Astro is installed but not actively used** — pages are plain HTML, not `.astro` components
- `src/` only contains `env.d.ts`, no components or pages yet
- `public/demos/` directory exists but is empty
- Assets are in `assets/imgs/` (root level), not in `public/` (Astro convention)
- Migration to full Astro component architecture is a likely next step per PRD
