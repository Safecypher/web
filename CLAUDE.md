# SafeCypher Web

Marketing site for SafeCypher — B2B fintech SaaS eliminating card-not-present fraud.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, DaisyUI v5, PostHog, Netlify

## Commands

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
# No test suite
```

## Architecture

```
src/
  app/
    (marketing)/   # Public site — auto-wrapped with Nav + Footer
    (portal)/      # Portal app — separate layout
    api/
      submit/      # Form handlers (demo-request, contact-request)
      attio/       # CRM event forwarding (server-side, secret stays server)
  components/
    marketing/     # Page sections, organised by domain (home/, dsc/, safe-verify/, platform/, etc.)
    ui/            # Shared primitives: Button, Card, Badge, Input, Textarea
    analytics/     # ConsentBanner, PostHogPageView
  styles/
    theme.css      # Brand tokens + DaisyUI safecypher-dark theme definition
```

## Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/platform` | Platform Overview |
| `/dynamic-security-codes` | Dynamic CVV product page |
| `/safe-verify` | Safe Verify product page |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| `/company` | About |
| `/contact` | Contact / Request Demo |
| `/portal` | Portal (separate layout, no marketing nav) |

## Design System

- **Theme:** `safecypher-dark` (DaisyUI), applied via `data-theme` on `<html>`
- **Brand tokens:** `src/styles/theme.css` — edit here to rebrand
- **Primary colour:** `#3b82f6` (blue)
- **Fonts:** Outfit (sans, `--font-sans`) + Playfair Display (serif, `--font-serif`)
- **UI primitives** live in `src/components/ui/` and are re-exported from `src/components/ui/index.ts`

## Environment Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY          # PostHog project key (omit to disable analytics)
NEXT_PUBLIC_POSTHOG_HOST         # PostHog host (default: https://app.posthog.com)
NEXT_PUBLIC_SITE_URL             # Canonical URL (e.g. https://safecypher.com)
ATTIO_API_KEY                    # Attio CRM key (server-only, never sent to client)
ATTIO_ENABLED                    # Set "true" in production Netlify context only
INTERNAL_API_SECRET              # Shared secret between /api/submit/* and /api/attio/event
```

All set in Netlify Dashboard → Site → Environment variables. See `netlify.toml` for context notes.

## Key Patterns

**Adding a new marketing page:**
1. Create `src/app/(marketing)/<route>/page.tsx` — Nav + Footer are provided automatically
2. Add components to `src/components/marketing/<route>/`
3. Export `metadata` from the page file for SEO

**Forms:** Contact and demo-request forms POST to `/api/submit/*`, which fan out to Netlify Forms (for email notification) and Attio (for CRM). Internal requests use `INTERNAL_API_SECRET` header.

**Analytics consent:** PostHog is initialised with `opt_out_capturing_by_default: true`. The `ConsentBanner` uses React state only — consent is session-scoped and the banner reappears on every page load by design.

## Gotchas

- **PostHog:** Do NOT set `cookieless_mode` alongside `opt_out_capturing_by_default` — confirmed bug #2841 causes double-init issues
- **Netlify Forms:** Returns non-200 in local dev (no Netlify runtime) — this is expected and handled
- **`'use client'`:** Only add when component needs browser APIs or event handlers — most marketing sections are server components
- **Calendly:** `react-calendly` is installed; the real URL needs wiring via env var in production (pending todo)
- **No test suite** — verify changes visually with `npm run dev`

## Planning

GSD workflow lives in `.planning/`. Pending todos tracked in `.planning/todos/pending/`.
