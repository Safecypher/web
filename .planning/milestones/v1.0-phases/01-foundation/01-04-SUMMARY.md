---
phase: 01-foundation
plan: "04"
subsystem: ui
tags: [nextjs, react, daisyui, tailwind, navigation, layout, marketing]

# Dependency graph
requires:
  - phase: 01-foundation/01-03
    provides: DaisyUI v5 theme tokens and base UI components (Button used by Nav)
provides:
  - Sticky mega-menu Nav component with Platform dropdown, Portal lock icon, Request Demo CTA
  - Footer component with An Post proof stat and award badge placeholder
  - Marketing layout wiring Nav + Footer around all marketing pages
  - Complete Phase 1 foundation verified by human checkpoint
affects:
  - All subsequent marketing phases (02-homepage, 03-product-pages, etc.) — inherit Nav + Footer automatically
  - Portal pages — deliberately excluded from Nav/Footer via route group separation

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Client Component mega-menu: 'use client' + useState for open/close, overlay div to close on outside click"
    - "Route group layout separation: (marketing)/layout.tsx for shared Nav+Footer, (portal)/layout.tsx isolated"
    - "Inline SVG icons: no CDN or icon-package dependency, icons embedded directly in JSX"
    - "DaisyUI v5 button depth fix: --border: 0 + --depth: 0 (v4 used --border-btn which v5 ignores)"

key-files:
  created:
    - src/components/marketing/Nav.tsx
    - src/components/marketing/Footer.tsx
  modified:
    - src/app/(marketing)/layout.tsx

key-decisions:
  - "Inline SVG for icons — no Bootstrap Icons CDN or npm icon package; zero dependency, SSR-safe"
  - "Nav is Client Component ('use client') — mega-menu needs useState; Footer stays Server Component"
  - "DaisyUI v5 button tokens: --border: 0 + --depth: 0 (not --border-btn which was v4-only)"
  - "Nav font size: text-base font-medium on ghost nav links (not btn-sm which forced 12px)"

patterns-established:
  - "Marketing layout pattern: (marketing)/layout.tsx wraps Nav > main > Footer; root layout never touched"
  - "Mega-menu pattern: relative container + absolute positioned panel + fixed overlay for outside-click dismiss"
  - "Proof stat pattern: An Post 800,000+ in footer proof bar — established anchor for future social proof"

requirements-completed: [FOUND-05]

# Metrics
duration: 45min
completed: 2026-02-19
---

# Phase 1 Plan 04: Nav + Footer + Marketing Layout Summary

**Sticky mega-menu Nav and proof-stat Footer wired into the (marketing) layout — Phase 1 foundation complete and human-verified.**

## Performance

- **Duration:** ~45 min (including human checkpoint verification + post-checkpoint fixes)
- **Started:** 2026-02-19
- **Completed:** 2026-02-19
- **Tasks:** 3 (2 auto + 1 checkpoint, approved)
- **Files modified:** 3

## Accomplishments

- Nav.tsx: sticky header with Platform mega-menu (3 product links), Portal lock icon linking to /portal, and Request Demo CTA (primary button)
- Footer.tsx: An Post proof stat ("800,000+ transactions. Zero CNP fraud."), Irish Fintech Award badge placeholder, product/company/legal link columns, and SafeCypher brand tagline
- `(marketing)/layout.tsx` updated to wrap Nav above and Footer below every marketing page; root layout.tsx untouched
- Human visual checkpoint approved — dark theme, sticky nav, mega-menu, footer proof stat all confirmed working in browser

## Task Commits

Each task was committed atomically:

1. **Task 1: Build sticky mega-menu Nav component** - `c66646f` (feat)
2. **Task 2: Build Footer component and wire marketing layout** - `8e2abb8` (feat)
3. **Task 3: Visual verification checkpoint** - approved (no commit — human gate)
4. **Post-checkpoint fix 1: Button border token** - `f6ea05e` (fix)
5. **Post-checkpoint fix 2: Nav font size** - `5f429cb` (fix)

**Plan metadata:** _(this commit)_ (docs: complete Nav + Footer + foundation checkpoint plan)

## Files Created/Modified

- `src/components/marketing/Nav.tsx` — Sticky mega-menu navigation. Client Component. Platform dropdown with 3 product links, Portal lock icon (SVG, links to /portal), Request Demo CTA (Button primary md).
- `src/components/marketing/Footer.tsx` — Server Component. Proof bar with An Post stat, award badge placeholder, 3 link columns (Products, Company, Legal), brand tagline, copyright line.
- `src/app/(marketing)/layout.tsx` — Updated to import and render Nav above `<main>` and Footer below. Root `src/app/layout.tsx` left untouched.

## Decisions Made

- **Inline SVG for icons:** Bootstrap Icons was used on the legacy site via CDN. In Next.js we use inline SVG for the lock icon and chevron — no CDN latency, no hydration mismatch, no extra dependency.
- **Nav as Client Component only:** `'use client'` is scoped to Nav.tsx specifically because it needs `useState` for the mega-menu. Footer and layout remain Server Components.
- **DaisyUI v5 button tokens:** After human verification revealed thick button borders, diagnosed that `--border-btn` is a DaisyUI v4-only token ignored by v5. Fixed by using `--border: 0` and `--depth: 0` (the correct v5 CSS variable names).
- **Nav font size via text-base:** `btn-sm` class forced 12px text on nav links. Replaced with `text-base font-medium` for readability. Logo bumped `text-xl` → `text-2xl`. Request Demo CTA `sm` → `md`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] DaisyUI v5 button border/depth token fix**
- **Found during:** Task 3 (human checkpoint verification)
- **Issue:** Buttons rendered with a thick visible border and 3D depth effect. `--border-btn` is a DaisyUI v4 CSS variable that v5 ignores — the v5 defaults for `--border` and `--depth` were applying unintentionally.
- **Fix:** Added `--border: 0` and `--depth: 0` to both `safecypher-dark` and `safecypher-light` theme blocks in `src/styles/theme.css`.
- **Files modified:** `src/styles/theme.css`
- **Verification:** Rebuild confirmed buttons render flat and borderless as intended.
- **Committed in:** `f6ea05e` (fix commit, separate from task commits)

**2. [Rule 1 - Bug] Nav font size forced too small by btn-sm**
- **Found during:** Task 3 (human checkpoint verification)
- **Issue:** `btn-sm` class on ghost nav links forces DaisyUI's small button font-size (~12px), making nav text noticeably smaller than intended for a B2B marketing site.
- **Fix:** Replaced `btn btn-ghost btn-sm` with plain `text-base font-medium` classes on nav link anchors. Logo bumped from `text-xl` to `text-2xl`. Request Demo button size changed from `sm` to `md`.
- **Files modified:** `src/components/marketing/Nav.tsx`
- **Verification:** Nav links render at 16px (base), logo is more prominent, CTA is appropriately sized.
- **Committed in:** `5f429cb` (fix commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — bugs found at human verification stage)
**Impact on plan:** Both fixes improve visual correctness. No scope creep; all changes are within Nav.tsx and theme.css. The root cause in both cases was DaisyUI v4→v5 API differences not caught until browser render.

## Issues Encountered

- DaisyUI v5 breaking changes from v4 are not always surfaced by TypeScript or build steps — only visible in browser. This pattern will recur in future phases. Mitigation: always test DaisyUI component variants in browser before declaring task done.

## User Setup Required

None — no external service configuration required for this plan.

## Next Phase Readiness

- Phase 1 Foundation is complete. All 4 plans done.
- Marketing layout is wired: every new page added under `src/app/(marketing)/` automatically inherits sticky Nav and Footer.
- Nav mega-menu has placeholder routes for Platform, Proof, Company, Resources — these become real pages in Phases 2–4.
- Base UI components (Button, Card, Badge, Input) are ready for use across all future marketing and portal pages.
- CI pipeline (lint + type-check + build) gates all PRs.
- Phase 2 (Homepage) can begin immediately — the shared layout shell is in place.

## Self-Check: PASSED

- FOUND: `.planning/phases/01-foundation/01-04-SUMMARY.md`
- FOUND: `src/components/marketing/Nav.tsx`
- FOUND: `src/components/marketing/Footer.tsx`
- FOUND: `src/app/(marketing)/layout.tsx`
- FOUND commit: `c66646f` (Task 1 — Nav)
- FOUND commit: `8e2abb8` (Task 2 — Footer + layout)
- FOUND commit: `f6ea05e` (fix — button border token)
- FOUND commit: `5f429cb` (fix — nav font size)

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
