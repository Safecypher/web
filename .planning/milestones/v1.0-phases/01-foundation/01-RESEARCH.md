# Phase 1: Foundation — Research

**Researched:** 2026-02-19
**Domain:** Next.js 16 App Router + Tailwind CSS v4 + DaisyUI v5 + Netlify + GitHub Actions
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Framework:** Next.js 14+ App Router, TypeScript strict mode
- **Folder structure:** `app/(marketing)/`, `app/(portal)/`, `app/api/`, `components/ui/`, `components/marketing/`, `components/portal/`, `lib/`
- **Deployment:** Netlify via `@netlify/plugin-nextjs`; `main` → production, `develop` → staging
- **CI:** GitHub Actions — lint (ESLint), type-check (`tsc --noEmit`), build (`next build`) — all three must pass on PR
- **Design system:** DaisyUI + Tailwind CSS; SafeCypher theme in `src/styles/theme.css` as CSS custom properties
- **Primary colour:** `#3b82f6` (blue) — canonical token until rebranded
- **Theme strategy:** Dark-first; both `[data-theme="dark"]` and `[data-theme="light"]` variants defined via DaisyUI's theme system; no user toggle needed yet
- **Component depth:** Full token set (typography, colours, spacing, base components) before any pages
- **Nav:** Sticky, persistent; Platform mega-menu dropdown; Portal icon (lock); "Request Demo" CTA right-aligned
- **Footer:** An Post proof stat ("800,000+ transactions. Zero CNP fraud."), award badge placeholder, standard links

### Claude's Discretion

- Specific DaisyUI theme token values and colour palette beyond primary blue
- Component naming conventions within the agreed folder structure
- Exact TypeScript tsconfig.json strictness flags
- GitHub Actions caching strategy and Node/pnpm versions
- Whether to use `src/` directory wrapper or flat `app/` at root

### Deferred Ideas (OUT OF SCOPE)

- **No page content** — Foundation builds the shell only; homepage content is Phase 2
- **No auth** — Portal icon links to `/portal` but auth is a future phase
- **No analytics** — PostHog and Attio are Phase 6
- **No architecture diagram** — Platform page will use a placeholder (Phase 3)
- **No PostHog** — Phase 6
- **No Attio API key** — Phase 6
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Next.js 14+ App Router project initialised with TypeScript strict mode, folder structure matching PRD | Next.js 16.1.6 is current; `create-next-app` scaffolds TS + App Router; route groups enable `(marketing)` and `(portal)` folders |
| FOUND-02 | Netlify deployment configured with @netlify/plugin-nextjs; `main` → production, `develop` → staging | Netlify auto-detects Next.js via OpenNext; `netlify.toml` `[context.production]` + `[context.develop]` branch contexts configure staging |
| FOUND-03 | GitHub Actions CI/CD pipeline runs lint, type-check, and build on every PR; failing checks block merge | Standard `.github/workflows/ci.yml` with `on: pull_request`; three sequential steps: lint → tsc --noEmit → next build |
| FOUND-04 | DaisyUI + Tailwind CSS installed with custom SafeCypher brand theme | DaisyUI v5 + Tailwind v4 — CSS-only config via `@plugin "daisyui/theme"` in globals.css; `tailwind.config.ts` is NOT needed/used |
| FOUND-05 | Core layout components: sticky persistent nav with mega-menu, footer with proof stat + award badge | DaisyUI `navbar` + `dropdown` + `menu` components; sticky requires `'use client'` only if interactive state needed; CSS-only sticky works as Server Component |
</phase_requirements>

---

## Summary

This phase bootstraps a new Next.js project from scratch on top of the existing static HTML site. The existing codebase (`index.html`, Astro `src/env.d.ts`) is a static site — the Next.js project must be initialised fresh, not migrated incrementally.

The most significant finding is a **version gap between the CONTEXT.md assumptions and current tooling**. The current stack (as of February 2026) is Next.js **16.1.6**, Tailwind CSS **v4**, and DaisyUI **v5**. This combination uses **CSS-only configuration** — there is no `tailwind.config.ts` file. The CONTEXT.md mentions `tailwind.config.ts`; the planner should note this file either becomes a very thin compatibility shim or simply does not exist. All theme configuration lives in the CSS file.

For Netlify deployment, `@netlify/plugin-nextjs` is still the correct package name referenced in documentation, but Netlify **automatically installs it** — you do not need to list it in `package.json` or `netlify.toml` unless pinning a version. Branch contexts (`[context.production]` and `[context.develop]`) in `netlify.toml` are the correct way to separate production from staging.

**Primary recommendation:** Bootstrap with `create-next-app@latest`, immediately add DaisyUI v5 + `@tailwindcss/postcss`, define the SafeCypher theme in `app/globals.css`, and configure Netlify branch contexts in `netlify.toml`. The "full design system first" approach in CONTEXT.md is correct — build tokens and base components before any page content.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 (latest) | React framework with App Router, SSR, file-based routing | Current stable; satisfies "14+" requirement with headroom |
| react / react-dom | 19 (bundled) | UI layer | Bundled with Next.js App Router |
| typescript | 5.x | Type safety | Built into `create-next-app`; strict mode enforced via tsconfig |
| tailwindcss | 4.x | Utility CSS | CSS-first v4; no config file needed; 70% smaller output than v3 |
| @tailwindcss/postcss | 4.x | Tailwind v4 PostCSS plugin | Required bridge between PostCSS and Tailwind v4 |
| daisyui | 5.x (5.5.18+) | Component library built on Tailwind | Zero-dependency; OKLCH themes; CSS-only config in v5 |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| eslint | 9.x | Linting | Auto-configured by `create-next-app`; required for CI |
| @eslint/eslintrc | current | ESLint flat config compatibility | Needed if using flat config format `eslint.config.mjs` |
| @types/react / @types/node | current | TypeScript definitions | Auto-installed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| DaisyUI v5 | shadcn/ui | shadcn/ui requires Radix primitives, heavier; DaisyUI is lighter and CSS-native with Tailwind v4 |
| Tailwind v4 CSS config | tailwind.config.ts v3 | v3 is maintenance mode; v4 is current; user context mentions tailwind.config.ts but that's a v3 pattern |
| ESLint | Biome | Biome is faster but Next.js ecosystem is still ESLint-first; safer for FOUND-03 requirement |

**Installation:**
```bash
npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
npm install daisyui@latest @tailwindcss/postcss
```

Note: `--tailwind` flag in `create-next-app` installs Tailwind v4 automatically. DaisyUI must be added separately.

---

## Architecture Patterns

### Recommended Project Structure

```
safecypher-web/
├── app/
│   ├── (marketing)/          # Public pages — shares Nav + Footer layout
│   │   ├── layout.tsx        # Marketing layout wrapper
│   │   └── page.tsx          # Homepage placeholder
│   ├── (portal)/             # Gated portal pages — separate layout
│   │   ├── layout.tsx        # Portal layout wrapper
│   │   └── page.tsx          # Portal index placeholder
│   ├── api/                  # API routes
│   ├── globals.css           # Tailwind v4 import + DaisyUI plugin + theme
│   └── layout.tsx            # Root layout (html + body only)
├── components/
│   ├── ui/                   # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Input.tsx
│   ├── marketing/            # Public site components
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   └── portal/               # Portal-specific components (empty Phase 1)
├── lib/                      # Utilities, helpers
├── public/                   # Static assets
│   └── assets/               # Existing brand assets (logo, shield)
├── src/
│   └── styles/
│       └── theme.css         # CSS custom properties brand tokens (user-locked)
├── .github/
│   └── workflows/
│       └── ci.yml
├── netlify.toml
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

Note: The `src/` directory holds `styles/theme.css` per CONTEXT.md. With `--src-dir` flag, Next.js places `app/` inside `src/` too. Decision needed: either use `src/app/` or keep `app/` at root and `src/styles/` separately. Given CONTEXT.md specifies `src/styles/theme.css` explicitly, use the `src/` directory wrapper (`create-next-app --src-dir`) so both live under `src/`.

### Pattern 1: Route Groups for Layout Isolation

**What:** Folders wrapped in parentheses `(name)` create URL-invisible groupings that can have separate layouts. `(marketing)` and `(portal)` get entirely different layouts — nav/footer for marketing, portal chrome for portal.

**When to use:** When two sections of the site need completely different chrome (nav, footer, auth wrappers).

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// app/(marketing)/layout.tsx
import Nav from '@/components/marketing/Nav'
import Footer from '@/components/marketing/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

### Pattern 2: DaisyUI v5 Theme Definition

**What:** Custom theme defined as `@plugin "daisyui/theme"` block in `globals.css`. Uses OKLCH colour format. Theme CSS variables flow into all DaisyUI component classes automatically.

**When to use:** This IS the theme.css approach. The CONTEXT.md-specified `src/styles/theme.css` file should define the `@plugin "daisyui/theme"` blocks, and `globals.css` should `@import` it.

**Example:**
```css
/* Source: https://daisyui.com/docs/themes/ */
/* src/styles/theme.css */

@plugin "daisyui/theme" {
  name: "safecypher-dark";
  default: true;
  prefersdark: true;
  color-scheme: dark;

  /* Primary: #3b82f6 = oklch(62% 0.214 259.815) */
  --color-primary: oklch(62% 0.214 259.815);
  --color-primary-content: oklch(98% 0.01 260);

  /* Base / background */
  --color-base-100: oklch(10% 0.005 260);   /* ~#0a0a0f dark bg */
  --color-base-200: oklch(14% 0.005 260);
  --color-base-300: oklch(18% 0.005 260);
  --color-base-content: oklch(95% 0.01 260);

  /* Neutral */
  --color-neutral: oklch(25% 0.01 260);
  --color-neutral-content: oklch(90% 0.01 260);

  /* Secondary / accent — to be set at rebrand */
  --color-secondary: oklch(55% 0.18 180);
  --color-accent: oklch(65% 0.22 200);
}

@plugin "daisyui/theme" {
  name: "safecypher-light";
  prefersdark: false;
  color-scheme: light;

  --color-primary: oklch(62% 0.214 259.815);
  --color-primary-content: oklch(98% 0.01 260);

  --color-base-100: oklch(98% 0.005 260);
  --color-base-200: oklch(93% 0.005 260);
  --color-base-300: oklch(88% 0.005 260);
  --color-base-content: oklch(15% 0.01 260);
}
```

```css
/* app/globals.css */
@import "tailwindcss";
@plugin "daisyui" {
  themes: safecypher-dark --default, safecypher-light;
}
@import "../src/styles/theme.css";
```

### Pattern 3: Sticky Nav as Server Component + CSS-only

**What:** DaisyUI navbar with Tailwind `sticky top-0 z-50` is pure CSS — no JavaScript needed for stickiness. Dropdown mega-menu using DaisyUI `dropdown` component can be CSS-only (using `:focus-within` or `tabindex`) for the basic case.

**When to use:** Nav component stays a Server Component unless interactive state (e.g., mobile hamburger toggle with useState) is needed. For the mega-menu, DaisyUI's CSS-only dropdown works; if hover-open behaviour is needed, a minimal `'use client'` wrapper handles it.

**Example:**
```tsx
// Source: DaisyUI navbar docs https://daisyui.com/components/navbar/
// components/marketing/Nav.tsx — Server Component (no 'use client')
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          SafeCypher
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* Platform mega-menu dropdown */}
          <li>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                Platform
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-64 p-2 shadow-lg">
                <li><Link href="/platform">Platform Overview</Link></li>
                <li><Link href="/platform/dynamic-security-codes">Dynamic Security Codes</Link></li>
                <li><Link href="/platform/safe-verify">Safe Verify</Link></li>
              </ul>
            </div>
          </li>
          <li><Link href="/company" className="btn btn-ghost">Company</Link></li>
          <li><Link href="/proof/an-post" className="btn btn-ghost">Proof</Link></li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {/* Portal icon — links to /portal, no auth in Phase 1 */}
        <Link href="/portal" className="btn btn-ghost btn-circle" aria-label="Portal">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </Link>
        <Link href="/contact" className="btn btn-primary">Request Demo</Link>
      </div>
    </nav>
  )
}
```

### Pattern 4: tsconfig.json for TypeScript Strict Mode

**What:** Next.js generates a tsconfig automatically; add strict flags for FOUND-01.

**Example:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Anti-Patterns to Avoid

- **Using `tailwind.config.ts` as the primary config:** With Tailwind v4 + DaisyUI v5, this file is no longer needed for theme config. Everything goes in CSS. If the file exists, it should only contain Tailwind v4-specific JS config (content globs, plugins). DaisyUI config goes in `globals.css`.
- **Adding DaisyUI to a `plugins` array in tailwind.config.ts:** This was the v3/v4-DaisyUI pattern. DaisyUI v5 uses `@plugin "daisyui"` in CSS only.
- **Wrapping Nav in `'use client'` unnecessarily:** The sticky DaisyUI navbar is pure CSS. Only add `'use client'` if you add interactive state (hamburger open/close). Keep Server Components where possible.
- **Putting the root `app/layout.tsx` as the marketing layout:** The root layout should only wrap `<html>` and `<body>`. Nav and Footer live in `app/(marketing)/layout.tsx` — not globally — so the portal can have different chrome.
- **Skipping `develop` branch in Netlify UI:** The `[context.develop]` block in `netlify.toml` only activates if the `develop` branch is enabled for branch deploys in Netlify's dashboard. Both config AND dashboard setting are required.
- **Building CSS custom properties in a separate `src/styles/theme.css` that globals.css doesn't import:** The theme file must be imported for variables to be available.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dropdown mega-menu | Custom JS toggle logic | DaisyUI `dropdown` with CSS `:focus-within` | DaisyUI handles accessibility (tabindex, aria), keyboard nav, and z-index stacking |
| Sticky positioning | JS scroll listeners | `sticky top-0 z-50` Tailwind utility | Pure CSS; performant; no rehydration needed |
| Dark/light theme tokens | Manual CSS variables object | DaisyUI `@plugin "daisyui/theme"` | Automatically generates all component variants; single source of truth |
| Button variants | Custom .btn classes | DaisyUI `btn`, `btn-primary`, `btn-outline` | Inherits theme tokens; accessible; consistent sizing |
| TypeScript path aliases | Relative `../../` imports | `@/*` alias via tsconfig `paths` | Auto-configured by `create-next-app --src-dir` |
| PR build status checks | Manual Netlify-only deploys | GitHub Actions CI + branch protection rules | Netlify deploy previews don't block merge; GH Actions status checks do |

**Key insight:** DaisyUI v5 with Tailwind v4 eliminates most custom CSS boilerplate. Theme customisation is surgically precise via `@plugin "daisyui/theme"` — you override only the tokens you need. Building any of this by hand creates maintenance burden that defeats the "rebrand in one file" goal.

---

## Common Pitfalls

### Pitfall 1: `tailwind.config.ts` vs CSS-only config confusion

**What goes wrong:** Developer creates `tailwind.config.ts` and tries to add DaisyUI as a plugin in the `plugins` array, which is the Tailwind v3 / DaisyUI v4 pattern. DaisyUI v5 ignores the `plugins` array — it must be configured via `@plugin "daisyui"` in CSS. The build may appear to succeed but DaisyUI components have no styles.

**Why it happens:** CONTEXT.md mentions `tailwind.config.ts`. Many tutorials still show the old pattern. The `create-next-app` scaffolding does NOT create a `tailwind.config.ts` for Tailwind v4 projects.

**How to avoid:** Do not create `tailwind.config.ts` unless you have a specific reason. Configure everything in `app/globals.css` (or imported CSS). Check `postcss.config.mjs` has `@tailwindcss/postcss` not `tailwindcss`.

**Warning signs:** No DaisyUI component styles rendering; `btn`, `navbar` classes have no effect.

### Pitfall 2: Root layout accidentally adds Nav to portal

**What goes wrong:** Placing `<Nav>` and `<Footer>` in `app/layout.tsx` (the root layout) means the portal also gets the marketing nav, making it impossible to give the portal different chrome.

**Why it happens:** Developers unfamiliar with Next.js App Router route group layouts default to putting everything in root layout.

**How to avoid:** Root `app/layout.tsx` contains only `<html>`, `<body>`, and global providers. Nav/Footer live exclusively in `app/(marketing)/layout.tsx`.

**Warning signs:** `/portal` route shows marketing nav when it shouldn't.

### Pitfall 3: `develop` branch staging deploy not activating

**What goes wrong:** `[context.develop]` in `netlify.toml` exists but deploys don't differentiate between production and staging.

**Why it happens:** Netlify branch deploys must be enabled in the dashboard (Settings → Build & Deploy → Branch deploys). The `netlify.toml` config alone is insufficient.

**How to avoid:** After creating `netlify.toml`, log into Netlify dashboard and enable "All branches" or specifically allow `develop` branch for deploy previews. Set the production branch to `main`.

**Warning signs:** Pushes to `develop` don't trigger separate deploys; all pushes go to same production URL.

### Pitfall 4: Next.js 16 `next build` linting behaviour change

**What goes wrong:** Developer expects `next build` to run ESLint. In Next.js 16, `next build` no longer runs the linter automatically. CI must run lint as a separate step.

**Why it happens:** Next.js 16 changed this from Next.js 14/15 behaviour to decouple concerns.

**How to avoid:** The GitHub Actions CI workflow must have an explicit `npm run lint` step before the build step. Do not assume `next build` handles linting.

**Warning signs:** PRs pass the build check but have lint errors that only surface locally.

### Pitfall 5: DaisyUI theme not applied dark-first on HTML element

**What goes wrong:** Site renders with the default DaisyUI `light` theme despite defining a dark theme as `--default`.

**Why it happens:** DaisyUI v5 themes are applied via `data-theme` attribute on the `<html>` element. If `data-theme` is not set, the browser's prefers-color-scheme may override. Setting `prefersdark: true` on the theme causes it to activate via `@media (prefers-color-scheme: dark)` but not unconditionally.

**How to avoid:** To force dark-first regardless of system preference, set `data-theme="safecypher-dark"` on the `<html>` element in `app/layout.tsx`. This is explicit and matches the CONTEXT.md "dark-first" requirement.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="safecypher-dark">
      <body>{children}</body>
    </html>
  )
}
```

**Warning signs:** Site flashes light on load; component colours don't match design tokens.

### Pitfall 6: `@import` order in globals.css breaks DaisyUI

**What goes wrong:** DaisyUI plugin or theme styles don't apply because of incorrect import order.

**Why it happens:** Tailwind v4 processes CSS in order. `@import "tailwindcss"` must come first; `@plugin "daisyui"` must follow. Custom theme file import order matters relative to `@plugin "daisyui"`.

**How to avoid:**
```css
/* CORRECT order */
@import "tailwindcss";
@plugin "daisyui" {
  themes: safecypher-dark --default, safecypher-light;
}
@import "../src/styles/theme.css";  /* theme definitions after plugin declaration */
```

**Warning signs:** Component classes work but custom theme colours don't apply; base theme colors instead of SafeCypher colours.

---

## Code Examples

Verified patterns from official sources:

### GitHub Actions CI Workflow (FOUND-03)

```yaml
# Source: verified against https://nextjs.org/docs installation + GH Actions docs
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build
```

Note: `tsc --noEmit` is the correct type-check command per Next.js official docs. The `lint` script runs ESLint via `next lint` or direct `eslint` invocation. In Next.js 16, `next build` does NOT run lint automatically — the explicit lint step is required.

### netlify.toml (FOUND-02)

```toml
# Source: https://docs.netlify.com/build/configure-builds/file-based-configuration/

[build]
  command = "npm run build"
  publish = ".next"

# Production: main branch
[context.production]
  command = "npm run build"

# Staging: develop branch
[context.develop]
  command = "npm run build"
```

Note: No explicit `@netlify/plugin-nextjs` entry needed — Netlify auto-installs the latest OpenNext adapter. Only add `[[plugins]] package = "@netlify/plugin-nextjs"` if you need to pin a specific version (not recommended).

### Full DaisyUI v5 + Tailwind v4 CSS Setup (FOUND-04)

```css
/* Source: https://daisyui.com/docs/install/nextjs/ */
/* app/globals.css */
@import "tailwindcss";

@plugin "daisyui" {
  themes: safecypher-dark --default, safecypher-light;
  logs: false;
}

@import "../src/styles/theme.css";
```

```css
/* Source: https://daisyui.com/docs/themes/ */
/* src/styles/theme.css — single file for rebrand */

/* ================================
   SafeCypher Brand Tokens
   Primary: #3b82f6 = oklch(62% 0.214 259.815)
   Dark bg: #0a0a0f ≈ oklch(10% 0.005 260)
   ================================ */

/* CSS custom properties for direct use in component code */
:root {
  --brand-blue: #3b82f6;
  --brand-dark: #0a0a0f;
  --brand-light: #f5f5f7;

  --font-sans: 'Outfit', system-ui, sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;
}

/* Dark theme (default) */
@plugin "daisyui/theme" {
  name: "safecypher-dark";
  default: true;
  prefersdark: true;
  color-scheme: dark;

  --color-primary: oklch(62% 0.214 259.815);
  --color-primary-content: oklch(98% 0.01 260);

  --color-secondary: oklch(55% 0.18 175);
  --color-secondary-content: oklch(98% 0.01 175);

  --color-accent: oklch(65% 0.22 200);
  --color-accent-content: oklch(98% 0.01 200);

  --color-neutral: oklch(25% 0.008 260);
  --color-neutral-content: oklch(90% 0.01 260);

  --color-base-100: oklch(10% 0.005 260);
  --color-base-200: oklch(14% 0.005 260);
  --color-base-300: oklch(18% 0.005 260);
  --color-base-content: oklch(95% 0.01 260);

  --color-info: oklch(65% 0.18 220);
  --color-success: oklch(60% 0.2 145);
  --color-warning: oklch(75% 0.22 85);
  --color-error: oklch(60% 0.22 25);

  --radius-selector: 0.5rem;
  --radius-field: 0.375rem;
  --radius-box: 0.75rem;
}

/* Light theme (for future rebrand toggle) */
@plugin "daisyui/theme" {
  name: "safecypher-light";
  default: false;
  prefersdark: false;
  color-scheme: light;

  --color-primary: oklch(55% 0.214 259.815);
  --color-primary-content: oklch(98% 0.01 260);

  --color-base-100: oklch(98% 0.005 260);
  --color-base-200: oklch(94% 0.008 260);
  --color-base-300: oklch(88% 0.01 260);
  --color-base-content: oklch(15% 0.01 260);

  --radius-selector: 0.5rem;
  --radius-field: 0.375rem;
  --radius-box: 0.75rem;
}
```

### Route Group Layout Pattern (FOUND-01, FOUND-05)

```tsx
// Source: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// app/layout.tsx — ROOT ONLY: html + body + data-theme
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="safecypher-dark">
      <body className="bg-base-100 text-base-content antialiased">
        {children}
      </body>
    </html>
  )
}
```

```tsx
// app/(marketing)/layout.tsx — Nav + Footer for all marketing pages
import Nav from '@/components/marketing/Nav'
import Footer from '@/components/marketing/Footer'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
```

### postcss.config.mjs (required for Tailwind v4)

```javascript
// Source: https://tailwindcss.com/docs/guides/nextjs
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` with `plugins` array | `@plugin "daisyui"` in CSS | DaisyUI v5 + Tailwind v4 (2025) | No JavaScript config file needed; everything in CSS |
| `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss";` | Tailwind v4 (2025) | Single import replaces three directives |
| DaisyUI themes via `daisyui: { themes: [...] }` in tailwind.config | `@plugin "daisyui" { themes: ... }` in CSS | DaisyUI v5 (2025) | CSS-only; no rebuild needed for theme changes |
| `@netlify/plugin-nextjs` manually installed | Auto-installed by Netlify | ~2024 onward | Zero config deployment; don't install manually unless pinning version |
| `next build` runs ESLint automatically | ESLint must run explicitly in CI | Next.js 16 (Oct 2025) | CI workflow MUST have a separate lint step |
| DaisyUI themes as HSL values | DaisyUI themes as OKLCH values | DaisyUI v5 (2025) | Perceptually uniform colours; use oklch() format in custom themes |

**Deprecated/outdated:**
- `tailwind.config.ts` for DaisyUI plugin registration: replaced by `@plugin "daisyui"` in CSS
- `hsl(var(--p))` / `hsl(var(--pf))` DaisyUI v3/v4 colour syntax: replaced by `oklch()` CSS variables in v5
- `daisyui: { themes: ["dark", "light"] }` in tailwind.config: replaced by `@plugin "daisyui" { themes: ... }` in CSS
- `@tailwind base; @tailwind components; @tailwind utilities;`: replaced by `@import "tailwindcss";`

---

## Open Questions

1. **`tailwind.config.ts` file — create it or skip it?**
   - What we know: Tailwind v4 does not require it; DaisyUI v5 does not use it
   - What's unclear: Whether any other tooling (e.g., IDE Tailwind IntelliSense) needs it to resolve class completions
   - Recommendation: Create a minimal `tailwind.config.ts` as an empty/stub file for IDE compatibility only. Do NOT put DaisyUI in it.

2. **Turbopack with DaisyUI v5 — browserslist requirement**
   - What we know: DaisyUI install docs say to add `"browserslist": "> 1%"` to `package.json` when using Turbopack (`next dev --turbopack`)
   - What's unclear: Whether `create-next-app` now does this automatically (Turbopack is default in Next.js 16)
   - Recommendation: Add `"browserslist": "> 1%"` to `package.json` during setup to prevent Lightning CSS issues.

3. **Font loading strategy**
   - What we know: CONTEXT.md references Outfit + Playfair Display (visible in existing HTML). Current site loads from Google Fonts.
   - What's unclear: Whether to use `next/font/google` (recommended) or keep Google Fonts CDN link
   - Recommendation: Use `next/font/google` for self-hosting and performance. Declare in root `app/layout.tsx` and inject as CSS variables.

4. **`next-env.d.ts` vs `src/env.d.ts`**
   - What we know: Existing project has `src/env.d.ts` with Astro reference types. Next.js generates `next-env.d.ts` at root.
   - What's unclear: Whether the Astro `src/env.d.ts` should be deleted before scaffolding
   - Recommendation: Delete `src/env.d.ts` before running `create-next-app`. The Astro type reference is incompatible.

5. **Is the current project a migration or a fresh scaffold?**
   - What we know: The existing repo has Astro, static HTML, and `dist/` output — no Next.js whatsoever
   - What's unclear: Whether to scaffold Next.js in-place (same repo) or create new repo
   - Recommendation: Scaffold in-place in the same repo. Run `create-next-app .` (current directory). The Astro/HTML files can be moved to an `_archive/` folder or deleted. The existing `assets/`, `demos/`, and `public/` content should be preserved and moved to Next.js `public/`.

---

## Sources

### Primary (HIGH confidence)
- https://nextjs.org/docs/app/getting-started/installation (v16.1.6, fetched 2026-02-19) — installation, TypeScript, App Router setup
- https://nextjs.org/docs/app/building-your-application/routing/route-groups (v16.1.6, fetched 2026-02-19) — route group patterns, caveats
- https://nextjs.org/docs/app/api-reference/config/typescript (v16.1.6, fetched 2026-02-19) — TypeScript strict mode, tsconfig, tsc --noEmit
- https://daisyui.com/docs/install/nextjs/ (v5.5.18, fetched 2026-02-19) — DaisyUI v5 Next.js installation
- https://daisyui.com/docs/themes/ (v5.5.18, fetched 2026-02-19) — custom theme CSS syntax, OKLCH format
- https://daisyui.com/docs/config/ (v5.5.18, fetched 2026-02-19) — plugin configuration options
- https://daisyui.com/docs/v5/ (fetched 2026-02-19) — v5 release notes, breaking changes
- https://tailwindcss.com/docs/guides/nextjs (Tailwind v4, fetched 2026-02-19) — postcss.config.mjs, CSS-only config
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/ (fetched 2026-02-19) — auto-deployment, plugin-nextjs
- https://docs.netlify.com/build/configure-builds/file-based-configuration/ (fetched 2026-02-19) — branch contexts, netlify.toml syntax
- https://nextjs.org/blog/next-16-1 (published December 2025, fetched 2026-02-19) — Next.js 16.1 features, lint behaviour change
- https://daisyui.com/theme-generator/ (fetched 2026-02-19) — oklch value for #3b82f6 = `oklch(62% 0.214 259.815)`

### Secondary (MEDIUM confidence)
- https://github.com/opennextjs/opennextjs-netlify — confirms Netlify uses OpenNext adapter automatically
- https://gist.github.com/hp0098v1/1c50f3bd44829ffdc29c3e2a1a73739b — GitHub Actions CI workflow pattern with pnpm/npm and Next.js
- DaisyUI v5 components: https://daisyui.com/components/navbar/ — navbar structure and class names

### Tertiary (LOW confidence)
- WebSearch result: `oklch(62% 0.214 259.815)` for #3b82f6 — confirmed via DaisyUI theme generator which uses Tailwind's blue-500 value; treat as verified
- Next.js 16 lint behaviour change (no longer auto-runs in `next build`) — confirmed in Next.js 16.1 release notes

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against official docs fetched 2026-02-19
- Architecture patterns: HIGH — Next.js route groups confirmed in official docs; DaisyUI v5 CSS config confirmed
- Netlify deployment: HIGH — verified via official Netlify docs
- Pitfalls: HIGH — most derived from documented breaking changes (Next.js 16 lint, DaisyUI v5 CSS-only, Tailwind v4)
- OKLCH colour values: MEDIUM — confirmed via DaisyUI theme generator and Tailwind blue-500 reference, not independently verified via colorimetry tool

**Research date:** 2026-02-19
**Valid until:** 2026-03-21 (30 days — stable ecosystem, but DaisyUI and Next.js release frequently)
