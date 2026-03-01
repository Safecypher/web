---
phase: 07-add-value-calculators-to-the-portal
plan: "05"
subsystem: ui
tags: [portal, verification, build, turbopack, lightningcss, calculator, auth, attio, pdf]

# Dependency graph
requires:
  - phase: 07-01
    provides: Supabase auth middleware, login page, PKCE callback, portal route protection
  - phase: 07-02
    provides: Calculator formula engine (TDD-verified), all savings math functions
  - phase: 07-03
    provides: Calculator page UI, InputSlider, ResultsPanel, SavingsBarChart, SensitivityTable, PdfExportButton
  - phase: 07-04
    provides: Portal funnel — /portal/demo, homepage teaser form, contact form results summary

provides:
  - Phase 7 verified end-to-end by human: auth protection, calculator math, PDF export, Attio events, homepage teaser funnel, contact form results display
  - Build fixed: --webpack flag ensures Tailwind v4/@tailwindcss/node compatibility on Next.js 16 with Node 24
  - lightningcss-darwin-arm64 native binary confirmed installed (was missing)
  - All Phase 7 requirements (PORT-02 through PORT-08, HOME-07) verified and marked complete

affects:
  - Future portal enhancements will depend on the established auth + calculator + Attio event patterns

# Tech tracking
tech-stack:
  added:
    - lightningcss-darwin-arm64 (native binary — was missing on arm64 Mac, causing build failure)
  patterns:
    - "next build --webpack flag required when using Tailwind v4 + @tailwindcss/node on Next.js 16 with Node 24/25 (Turbopack incompatible)"

key-files:
  created: []
  modified:
    - package.json (--webpack flag added to build script)

key-decisions:
  - "Build script uses --webpack not default Turbopack — @tailwindcss/node incompatible with Turbopack on Node 24/25; webpack fallback is stable"
  - "lightningcss-darwin-arm64 installed explicitly — the darwin-x64 binary alone is insufficient on Apple Silicon Macs"

patterns-established:
  - "Verification-only plans still require build and lint as automated gates before human sign-off"

requirements-completed: [PORT-02, PORT-03, PORT-04, PORT-05, PORT-06, PORT-07, PORT-08, HOME-07]

# Metrics
duration: 10min
completed: 2026-03-01
---

# Phase 07 Plan 05: End-to-End Verification Summary

**Full Phase 7 portal funnel verified end-to-end by human: magic link auth, calculator math ($3.87M Year 1 at USD defaults), PDF export with SafeCypher branding, Attio events, homepage teaser redirect chain, and contact form results display — all requirements confirmed passing**

## Performance

- **Duration:** ~10 min (build fix pre-task + verification checkpoint)
- **Started:** 2026-03-01T07:40:00Z
- **Completed:** 2026-03-01T07:53:00Z
- **Tasks:** 1 (human-verify checkpoint, approved)
- **Files modified:** 1 (package.json build script fix)

## Accomplishments

- Human verified the complete Phase 7 portal funnel end-to-end: incognito auth redirect, magic link login, calculator pre-filling from portfolioSize param, real-time slider updates, PDF download with branding, Attio console events (portal_login, calculator_run, mockup_viewed), and contact form results summary box
- Calculator math confirmed accurate at USD defaults: Year 1 Net Savings ~$3,866,043, Breakeven ~23-24 days, sensitivity table values matching verified spreadsheet (~$3.6M at 25%, ~$7.2M at 50%, ~$12.9M at 90%)
- Build fixed pre-verification: --webpack flag added to build script to resolve Turbopack/lightningcss incompatibility on Node 24 arm64 Mac; build and lint pass cleanly

## Task Commits

Each task was committed atomically:

1. **Pre-task: Auto-fix build script and lightningcss arm64** - `a4cbf3a` (fix)
2. **Task 1: Human verification checkpoint (approved)** - no additional files modified

**Plan metadata:** (docs commit follows this summary)

## Files Created/Modified

- `package.json` - Added `--webpack` flag to `build` script (was `next build`, now `next build --webpack`)

## Decisions Made

- **--webpack flag is required for Tailwind v4 on Node 24:** Next.js 16 defaults to Turbopack, but `@tailwindcss/node` (required by Tailwind v4) is incompatible with Turbopack when running under Node 24/25. The `--webpack` flag forces the stable webpack bundler, matching the dev server approach and eliminating the build failure.
- **lightningcss-darwin-arm64 must be explicit:** The `darwin-x64` binary was installed but the `darwin-arm64` binary was missing on the Apple Silicon Mac. Installing it explicitly resolved the `Module not found: lightningcss-darwin-arm64` error during build.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Build script missing --webpack flag causing Turbopack/lightningcss failure**
- **Found during:** Pre-task build verification
- **Issue:** `npm run build` failed with `lightningcss-darwin-arm64` module not found. Root cause: Next.js 16 defaults to Turbopack on build; `@tailwindcss/node` is incompatible with Turbopack on Node 24/25; `lightningcss-darwin-arm64` native binary was also missing.
- **Fix:** Added `--webpack` flag to `build` script in `package.json`; installed `lightningcss-darwin-arm64` native binary.
- **Files modified:** `package.json`
- **Verification:** `npm run build && npm run lint` pass cleanly after fix
- **Committed in:** `a4cbf3a` (pre-task fix commit)

---

**Total deviations:** 1 auto-fixed (Rule 3 — blocking build failure)
**Impact on plan:** Essential fix for build to pass. The `--webpack` flag is consistent with how the dev server already ran. No scope creep.

## Issues Encountered

None beyond the auto-fixed build deviation above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 7 is complete. All 5 plans executed and verified.
- The portal, calculator, auth funnel, Attio tracking, PDF export, and homepage teaser are all production-ready (pending real Supabase URL and Attio API key configuration in Netlify env vars — tracked in pending todos).
- Pending todos to carry forward: wire real Calendly URL, add PostHog key to production env, replace Irish Fintech Award placeholder with real badge.

## Self-Check

All modified files verified:
- FOUND: `package.json` (contains `--webpack` in build script)

All commits verified:
- FOUND: `a4cbf3a` — fix(07-05): add --webpack flag to build script and install lightningcss arm64
- FOUND: `309b552` — wip: phase 07 paused at 07-05 verification (prior checkpoint state)

## Self-Check: PASSED

---
*Phase: 07-add-value-calculators-to-the-portal*
*Completed: 2026-03-01*
