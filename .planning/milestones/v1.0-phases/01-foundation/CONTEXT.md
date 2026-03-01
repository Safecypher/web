# Phase 1: Foundation — Context

## Vision

Bootstrap the Next.js 14+ App Router project with everything every subsequent phase needs: a working deploy pipeline, a rebrand-ready design system, and shared layout components. When Phase 1 is done, any developer can create a new page and have it deploy with the correct brand, nav, and footer without touching infrastructure.

## Design System Approach

**CSS variables in a single theme file** (`src/styles/theme.css`). All brand tokens (colours, fonts, spacing, radii) defined as CSS custom properties. DaisyUI inherits these variables. When a rebrand happens: update one file, done.

**Primary colour:** `#3b82f6` (blue from current homepage) — this is the canonical token value until rebranded.

**Dark/light:** The current homepage mixes light and dark sections. A rebrand is expected. Design system should define both `[data-theme="dark"]` and `[data-theme="light"]` variants via DaisyUI's theme system, but the site will initially render dark-first. No user toggle needed yet — that decision defers to the rebrand.

**Component depth:** Full design system — not just nav/footer but the complete token set: typography scale, colour palette, spacing, base components (Button, Card, Badge, Input, etc.) before any pages are built. This avoids design drift across phases.

## Essentials

- Next.js 14+ App Router, TypeScript strict mode
- Folder structure: `app/(marketing)/`, `app/(portal)/`, `app/api/`, `components/ui/`, `components/marketing/`, `components/portal/`, `lib/`
- Netlify deploy via `@netlify/plugin-nextjs`; `main` → production, `develop` → staging
- GitHub Actions: lint (ESLint), type-check (`tsc --noEmit`), build (`next build`) — all three must pass on PR
- DaisyUI + Tailwind CSS; SafeCypher theme in `src/styles/theme.css` as CSS custom properties
- Nav: sticky, persistent on all pages; Platform mega-menu dropdown (product links + Platform Overview); Portal icon (lock when logged out); "Request Demo" CTA button right-aligned
- Footer: An Post proof stat ("800,000+ transactions. Zero CNP fraud."), award badge placeholder, standard links

## Boundaries

- **No page content yet** — Foundation builds the shell. Homepage content starts in Phase 2.
- **No auth yet** — Portal icon in nav links to `/portal` but auth is Phase 1 (next milestone)
- **No analytics yet** — PostHog and Attio are Phase 6
- **Architecture diagram** is not available yet — Platform page will use a placeholder (Phase 3)
- **Placeholder copy is fine** — all content sections can use `[PLACEHOLDER — copy pending]` markers

## Key Files to Create

```
src/styles/theme.css          # CSS custom properties brand tokens
tailwind.config.ts             # DaisyUI plugin + theme reference
app/layout.tsx                 # Root layout (nav + footer)
components/ui/Button.tsx       # Base component examples
components/ui/Card.tsx
components/marketing/Nav.tsx   # Sticky mega-menu nav
components/marketing/Footer.tsx
```

## Dependencies

- No external dependencies blocking this phase
- Attio API key NOT needed (Phase 6)
- Architecture diagram NOT needed (placeholder in Phase 3)
