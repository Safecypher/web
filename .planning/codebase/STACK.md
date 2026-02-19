# Technology Stack

**Last updated:** 2026-02-19 (Phase 01 Foundation complete)

## Languages

**Primary:**
- TypeScript (strict mode) — all source files
- TSX — React/Next.js components
- CSS — Tailwind v4 utility classes + DaisyUI v5 theme tokens

## Runtime

**Environment:**
- Node.js (npm-based project)

**Package Manager:**
- npm — lockfile: `package-lock.json`

## Frameworks

**Core:**
- Next.js 15+ (App Router) — React framework with SSR, file-based routing, middleware
- React 19 — UI component model

**Styling:**
- Tailwind CSS v4 — utility-first CSS (`@import tailwindcss` syntax, no config object needed)
- DaisyUI v5 — component class library (`@plugin "daisyui"` in CSS, not tailwind.config.ts)

**Fonts & Icons:**
- Inline SVG — icons (no CDN dependency; Bootstrap Icons from legacy site not used)
- System fonts / Next.js font optimisation (Google Fonts to be added in later phases as needed)

## Key Dependencies

**Critical:**
- `next` — App Router framework
- `react` / `react-dom` — UI rendering
- `tailwindcss` — utility CSS
- `daisyui` — component classes and theming

**Dev / Tooling:**
- `typescript` — strict type checking
- `eslint` + `eslint-config-next` — linting
- `@types/react` / `@types/node` — type definitions

## Configuration

**Environment:**
- `.env.local` for secrets (Attio API key, etc.) — not committed
- Deployment platform: Netlify
- Site URL: https://safecypher.com

**Build:**
- `next.config.ts` — Next.js configuration (turbopack.root set to suppress workspace warning)
- `tailwind.config.ts` — minimal (content paths only; all design config in CSS)
- `tsconfig.json` — strict mode TypeScript

**Build Scripts:**
```bash
npm run dev          # Development server (Turbopack)
npm run build        # Production build
npm run start        # Serve production build locally
npm run lint         # ESLint (next recommended)
npx tsc --noEmit     # Type-check without emitting
```

## CI/CD

**GitHub Actions** (`.github/workflows/ci.yml`):
- Trigger: pull_request to main
- Steps: lint → type-check → build
- Uses: `npm run lint` (not `next lint` — not a valid CLI subcommand in Next.js 15+)

**Netlify:**
- Build command: `npm run build`
- Publish directory: `.next/`
- Node version: 20+

## Platform Requirements

**Development:**
- Node.js 20+ with npm
- Git for version control

**Production:**
- Netlify hosting with Next.js SSR support

## Asset Management

**Images:**
- `public/` — static assets served at root URL
- `public/demos/boa/` — Bank of America agentic demo mockup assets

**Archive:**
- `_archive/` — legacy static HTML/Astro files (excluded from ESLint via `globalIgnores`)

## Third-Party Integrations (Planned)

**Analytics:**
- Simple Analytics — privacy-first (to be wired in later phase)

**CRM:**
- Attio API — lead capture and deal pipeline (API key stubbed in dev, real key in Netlify env)

**Forms:**
- Netlify Forms or Next.js server actions (to be decided in contact/demo phase)

---

*Stack analysis updated: Phase 01-Foundation complete (2026-02-19)*
