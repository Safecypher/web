# Directory Structure

## Overview

SafeCypher Web is a **Next.js 15+ App Router project** with TypeScript strict mode, Tailwind v4, and DaisyUI v5. It uses route groups to separate the public marketing site from the authenticated portal.

## Root Layout

```
safecypher-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx                        # Root layout — html+body only, no Nav/Footer
│   │   ├── globals.css                       # Tailwind v4 @import + DaisyUI @plugin + @import theme
│   │   ├── favicon.ico
│   │   ├── (marketing)/                      # Public marketing route group
│   │   │   ├── layout.tsx                    # Wires Nav + Footer around marketing pages
│   │   │   └── page.tsx                      # Homepage (/)
│   │   ├── (portal)/                         # Authenticated portal route group
│   │   │   ├── layout.tsx                    # Portal layout (no marketing nav/footer)
│   │   │   └── portal/
│   │   │       └── page.tsx                  # Portal dashboard (/portal)
│   │   └── api/
│   │       └── .gitkeep                      # API route placeholder
│   ├── components/
│   │   ├── marketing/
│   │   │   ├── Nav.tsx                       # Sticky mega-menu navigation (Client Component)
│   │   │   └── Footer.tsx                    # Footer with An Post proof stat + award badge
│   │   ├── portal/                           # Portal-specific components (empty, future phases)
│   │   └── ui/
│   │       ├── Button.tsx                    # Button component — variant + size props
│   │       ├── Card.tsx                      # Card component — raised/flat/bordered variants
│   │       ├── Badge.tsx                     # Badge component — status/info/warning/success variants
│   │       ├── Input.tsx                     # Input component — label + error + hint support
│   │       └── index.ts                      # Barrel export for all UI components
│   ├── lib/                                  # Shared utilities (empty, future phases)
│   └── styles/
│       └── theme.css                         # DaisyUI v5 theme tokens for safecypher-dark + safecypher-light
├── _archive/                                 # Archived Astro/static HTML files (excluded from CI)
├── public/                                   # Static assets
├── docs/                                     # PRD and supporting documents
├── .github/
│   └── workflows/
│       └── ci.yml                            # GitHub Actions: lint + type-check + build on PR
├── .planning/                                # GSD planning files
├── next.config.ts                            # Next.js configuration
├── tailwind.config.ts                        # Tailwind v4 config (minimal — most config in CSS)
├── tsconfig.json                             # TypeScript strict mode
├── package.json
└── .gitignore
```

## Route Groups

| Group | Path prefix | Layout | Purpose |
|-------|-------------|--------|---------|
| `(marketing)` | `/`, `/platform`, `/proof`, etc. | Nav + Footer | Public marketing pages |
| `(portal)` | `/portal`, `/portal/*` | Portal layout only | Authenticated customer portal |

## Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout — html+body wrapper only |
| `src/app/(marketing)/layout.tsx` | Injects Nav and Footer into all marketing pages |
| `src/components/marketing/Nav.tsx` | Sticky nav: Platform mega-menu, Portal lock icon, Request Demo CTA |
| `src/components/marketing/Footer.tsx` | Footer: An Post proof stat, award badge, link columns |
| `src/styles/theme.css` | DaisyUI v5 custom theme (safecypher-dark / safecypher-light) |
| `src/components/ui/index.ts` | Barrel export: Button, Card, Badge, Input |
| `.github/workflows/ci.yml` | CI: lint → type-check → build gates on all PRs |

## Notes

- Route groups `(marketing)` and `(portal)` use parentheses in directory names — Next.js excludes these from URL paths
- `Nav.tsx` is a Client Component (`'use client'`) — manages mega-menu open/close state
- Footer.tsx is a Server Component (no interactivity needed)
- `_archive/` contains the old static HTML/Astro files — excluded from ESLint via `globalIgnores`
- `src/lib/` and `src/styles/` contain `.gitkeep` placeholders for future phases
