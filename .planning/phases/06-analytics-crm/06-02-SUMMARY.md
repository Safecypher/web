---
phase: 06-analytics-crm
plan: "02"
subsystem: analytics
tags: [posthog, analytics, consent, gdpr, page-view, utm]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js app router root layout and globals.css

provides:
  - posthog-js installed and initialised with opt-in-by-default consent model
  - PostHogProvider client boundary wrapping all public pages
  - ConsentBanner fixed bottom bar (Accept/Decline, session-only via React state)
  - PostHogPageView manual page view tracker with UTM params

affects: [06-03-plan, future event instrumentation]

# Tech tracking
tech-stack:
  added: [posthog-js ^1.352.0]
  patterns:
    - PostHog provider as client boundary wrapping Server Component root layout
    - useSearchParams inside Suspense boundary (Next.js App Router requirement)
    - opt_out_capturing_by_default:true — capturing off until explicit Accept
    - Session-only consent via React useState (no localStorage), banner reappears each load

key-files:
  created:
    - src/app/providers.tsx
    - src/components/analytics/PostHogPageView.tsx
    - src/components/analytics/ConsentBanner.tsx
  modified:
    - src/app/layout.tsx
    - package.json

key-decisions:
  - "opt_out_capturing_persistence_type:'memory' removed — posthog-js v1.352 only accepts localStorage|cookie; session-only behaviour achieved via ConsentBanner useState (no localStorage/sessionStorage writes)"
  - "capture_pageview:false at init — PostHogPageView component fires $pageview manually with UTM params"
  - "PostHogPageView wrapped in Suspense fallback=null — mandatory for useSearchParams in Next.js App Router or build fails"
  - "layout.tsx remains a Server Component — Providers.tsx is the sole client boundary, keeping RSC benefits"
  - "No-op mode when NEXT_PUBLIC_POSTHOG_KEY absent — early return in useEffect, no runtime errors"

patterns-established:
  - "Analytics client boundary pattern: thin Providers wrapper keeps root layout as Server Component"
  - "Consent-first analytics: opt_out_capturing_by_default=true ensures zero capture until Accept clicked"

requirements-completed: [ANLT-02]

# Metrics
duration: 3min
completed: 2026-02-23
---

# Phase 6 Plan 02: Analytics Infrastructure Summary

**posthog-js wired into root layout with opt-in consent banner, manual page-view tracker (UTM params), and no-op fallback when API key absent**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-23T09:31:05Z
- **Completed:** 2026-02-23T09:34:22Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- posthog-js ^1.352.0 installed; PostHogProvider initialised with consent-first config
- ConsentBanner: fixed bottom bar with Accept/Decline; session-only via React state (no storage)
- PostHogPageView: fires `$pageview` with UTM source/medium/campaign on every navigation
- Root layout updated to wrap all pages in Providers, PostHogPageView (Suspense), ConsentBanner
- Build passes with zero errors and no Suspense boundary warnings across all 13 pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Install posthog-js and create analytics components** - `cf37784` (feat)
2. **Task 2: Wire Providers + PostHogPageView + ConsentBanner into root layout** - `e07693e` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/app/providers.tsx` - PostHogProvider client wrapper; init on mount with opt_out_capturing_by_default=true; no-op if key absent
- `src/components/analytics/PostHogPageView.tsx` - Fires $pageview with UTM params on pathname/searchParams change; wrapped in Suspense in layout
- `src/components/analytics/ConsentBanner.tsx` - Fixed bottom consent bar; opt_in/opt_out_capturing on click; useState only (session-only)
- `src/app/layout.tsx` - Added Providers wrapping, Suspense+PostHogPageView, ConsentBanner after children
- `package.json` / `package-lock.json` - posthog-js dependency added

## Decisions Made

- Removed `opt_out_capturing_persistence_type: 'memory'` — posthog-js v1.352+ types only accept `'localStorage' | 'cookie'`. Session-only consent achieved via `useState(true)` in ConsentBanner with no writes to localStorage/sessionStorage, so the banner naturally reappears on every page load.
- `capture_pageview: false` at init — prevents posthog auto-capturing page views. PostHogPageView fires manually with UTM properties for richer attribution.
- `PostHogPageView` wrapped in `<Suspense fallback={null}>` — required by Next.js App Router when `useSearchParams()` is used outside of a dynamic page; without it the build fails.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed invalid opt_out_capturing_persistence_type:'memory'**
- **Found during:** Task 1 (TypeScript verification)
- **Issue:** posthog-js v1.352 types define `opt_out_capturing_persistence_type` as `'localStorage' | 'cookie'` — `'memory'` is not a valid value and caused `TS2322` type errors
- **Fix:** Removed the property; added inline comment explaining that session-only behaviour is already achieved by `ConsentBanner`'s `useState(true)` (React state, no storage writes)
- **Files modified:** `src/app/providers.tsx`
- **Verification:** `npx tsc --noEmit` passes with zero errors
- **Committed in:** `cf37784` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - type error in plan-specified code)
**Impact on plan:** Fix maintains identical runtime behaviour — session-only consent still works as intended. No scope creep.

## Issues Encountered

None — both tasks executed cleanly after the type error fix.

## User Setup Required

PostHog requires environment variables before analytics are active:

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog Dashboard → Project Settings → Project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog Dashboard → Project Settings → Host URL (defaults to `https://app.posthog.com`) |

Add to `.env.local` for development; add to Netlify environment variables for production.

Without these variables the app runs in no-op mode — no errors, banner still appears, PostHog is silent.

## Next Phase Readiness

- PostHog infrastructure complete — Providers, ConsentBanner, and PostHogPageView all wired
- Plan 06-03 can now instrument individual CTA/form events using `posthog.capture()` or the `usePostHog()` hook in existing components
- No blockers

---
*Phase: 06-analytics-crm*
*Completed: 2026-02-23*

## Self-Check: PASSED

- src/app/providers.tsx — FOUND
- src/components/analytics/PostHogPageView.tsx — FOUND
- src/components/analytics/ConsentBanner.tsx — FOUND
- .planning/phases/06-analytics-crm/06-02-SUMMARY.md — FOUND
- Commit cf37784 (Task 1) — FOUND
- Commit e07693e (Task 2) — FOUND
