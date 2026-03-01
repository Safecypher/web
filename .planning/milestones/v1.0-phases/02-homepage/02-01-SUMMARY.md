---
phase: 02-homepage
plan: "01"
subsystem: ui
tags: [nextjs, react, tailwind, daisyui, animation, client-component, server-component]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: DaisyUI v5 + Tailwind v4 theme, Nav + Footer components, marketing layout, globals.css
provides:
  - Homepage compositor (page.tsx) with all 7 section imports — permanent, won't be touched again
  - HeroSection.tsx — split-layout hero with headline, sub-headline, CTA pair, CVV card slot
  - HeroCvvCard.tsx — animated slot-machine CVV Client Component with teal glow
  - Stub section files for plans 02-02 through 02-04 (UrgencySection, AudiencesSection, OneIntegrationSection, ProofSection, HumanCostSection, DemoFormSection)
  - scroll-behavior: smooth on html element via globals.css
affects: [02-02, 02-03, 02-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component page.tsx composing Client Component leaf (HeroCvvCard via HeroSection)
    - useCallback + setInterval pattern with clearInterval cleanup prevents double-speed in React Strict Mode
    - Slot-machine digit animation via translateY(-${digit * 10}%) with staggered transitionDelay
    - Stub files allow parallel plan execution — each plan replaces its own stub

key-files:
  created:
    - src/components/marketing/home/HeroSection.tsx
    - src/components/marketing/home/HeroCvvCard.tsx
    - src/components/marketing/home/UrgencySection.tsx
    - src/components/marketing/home/AudiencesSection.tsx
    - src/components/marketing/home/OneIntegrationSection.tsx
    - src/components/marketing/home/ProofSection.tsx
    - src/components/marketing/home/HumanCostSection.tsx
    - src/components/marketing/home/DemoFormSection.tsx
  modified:
    - src/app/(marketing)/page.tsx
    - src/app/globals.css
    - eslint.config.mjs

key-decisions:
  - "Stub files created for plans 02-02 through 02-04 so page.tsx compiles immediately and parallel plan execution is unblocked"
  - "HeroCvvCard uses useCallback wrapping rotateCvv to stabilise useEffect dependency — prevents interval recreation on each render"
  - "Teal glow implemented as sibling div with bg-accent blur-xl opacity-40 — no custom CSS keyframe needed"
  - "ESLint globalIgnores updated with '**/* 2.*' pattern to exclude accidental duplicate files (Rule 3 fix)"

patterns-established:
  - "Server Component page.tsx composing Client Component leaves — no 'use client' at page level"
  - "Section stubs use named exports matching their final form — replacement plans just fill in content"
  - "CVV animation: setFlipping(true) → 600ms timeout → setCvv + setFlipping(false) — brief pause before digit change"

requirements-completed: [HOME-01]

# Metrics
duration: 4min
completed: 2026-02-20
---

# Phase 2 Plan 01: Homepage Shell and Hero Section Summary

**Server Component homepage compositor + slot-machine CVV card animation using useCallback/setInterval with 80ms per-digit stagger and teal glow via bg-accent blur layer**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-20T11:08:55Z
- **Completed:** 2026-02-20T11:13:08Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- Rewrote page.tsx as permanent homepage compositor importing all 7 section components — this file won't be touched again
- Built HeroSection with split-layout hero: headline "Eliminate card-not-present fraud. Not reduce. Eliminate.", sub-headline, Request Demo + See How It Works CTAs, and animated CVV card on the right
- Implemented HeroCvvCard as a Client Component with slot-machine digit animation cycling every 4 seconds, 80ms stagger per digit, and teal glow from bg-accent blur layer
- Created 6 minimal stub section files so build compiles while plans 02-02 through 02-04 fill in content

## Task Commits

Each task was committed atomically:

1. **Task 1: Rewrite page.tsx as homepage compositor and create HeroSection** - `375a07d` (feat)
2. **Task 2: Build HeroCvvCard — animated slot-machine CVV Client Component** - `d1654c6` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/app/(marketing)/page.tsx` - Homepage Server Component compositor importing all 7 sections
- `src/app/globals.css` - Added `html { scroll-behavior: smooth }` after @import block
- `src/components/marketing/home/HeroSection.tsx` - Split-layout hero section (Server Component)
- `src/components/marketing/home/HeroCvvCard.tsx` - Animated CVV card Client Component with slot-machine animation
- `src/components/marketing/home/UrgencySection.tsx` - Stub for plan 02-02
- `src/components/marketing/home/AudiencesSection.tsx` - Stub for plan 02-02 (id="audiences" anchor)
- `src/components/marketing/home/OneIntegrationSection.tsx` - Stub for plan 02-03
- `src/components/marketing/home/ProofSection.tsx` - Stub for plan 02-03
- `src/components/marketing/home/HumanCostSection.tsx` - Stub for plan 02-04
- `src/components/marketing/home/DemoFormSection.tsx` - Stub for plan 02-04 (id="demo" anchor)
- `eslint.config.mjs` - Added ignore pattern for accidental duplicate files

## Decisions Made

- **Stub files for parallel execution:** Created minimal named-export stubs for all 6 non-hero sections so page.tsx compiles and plans 02-02 through 02-04 can run independently.
- **useCallback for rotateCvv:** Wrapped the CVV rotate function in useCallback to stabilise the useEffect dependency array and prevent the interval being recreated on every render.
- **Teal glow via sibling div:** Implemented the card glow as an absolute sibling div with `bg-accent blur-xl opacity-40` — no custom CSS animation needed, matches the accent colour from theme.css.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed stale .next/types duplicate files causing tsc failure**
- **Found during:** Task 1 verification (tsc --noEmit)
- **Issue:** `.next/types/routes.d 2.ts` and `.next/types/validator 2.ts` caused `TS2300: Duplicate identifier 'LayoutProps'` error. These were accidental copies matching the broader pattern of duplicate files seen in git status.
- **Fix:** Removed both stale files (`rm ".next/types/routes.d 2.ts" ".next/types/validator 2.ts"`)
- **Files modified:** None tracked — .next/ is gitignored
- **Verification:** tsc --noEmit passes with zero errors
- **Committed in:** `375a07d` (Task 1 commit)

**2. [Rule 3 - Blocking] Added ESLint ignore pattern for accidental duplicate files**
- **Found during:** Task 1 verification (npm run lint)
- **Issue:** `src/env.d 2.ts` (an old Astro file) was being linted and failed with `@typescript-eslint/triple-slash-reference` error. All "X 2.ts" files are untracked accidental duplicates.
- **Fix:** Added `"**/* 2.*"` and `"**/* 2/**"` to ESLint `globalIgnores` in `eslint.config.mjs`
- **Files modified:** `eslint.config.mjs`
- **Verification:** npm run lint passes with zero errors
- **Committed in:** `375a07d` (Task 1 commit)

**3. [Rule 3 - Blocking] Cleared stale .next cache causing build failure**
- **Found during:** Task 2 verification (npm run build)
- **Issue:** Build compiled successfully but "Collecting page data" step failed with `MODULE_NOT_FOUND` for all routes. Root cause: .next/server/ was stale from a previous build that ran before HeroCvvCard was complete.
- **Fix:** `rm -rf .next` and rebuilt from clean slate
- **Files modified:** None tracked — .next/ is gitignored
- **Verification:** Clean build passes all 5 routes in 312ms
- **Committed in:** `d1654c6` (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (all Rule 3 — blocking build/lint/type-check issues from stale artifacts)
**Impact on plan:** All fixes were for stale generated files or accidental duplicates, not scope changes. No plan tasks were altered.

## Issues Encountered

None beyond the three Rule 3 deviations documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- page.tsx is the permanent homepage compositor — plans 02-02, 02-03, 02-04 can run in any order replacing their stub files
- Anchor IDs `#demo` and `#audiences` are present on stub section elements — smooth-scroll will activate once content is filled in
- HeroSection imports HeroCvvCard correctly — both compile and build cleanly
- All CI gates pass: lint + tsc + build

---
*Phase: 02-homepage*
*Completed: 2026-02-20*

## Self-Check: PASSED

All files verified present. All commits verified in git log.

| Check | Result |
|-------|--------|
| src/app/(marketing)/page.tsx | FOUND |
| src/app/globals.css | FOUND |
| src/components/marketing/home/HeroSection.tsx | FOUND |
| src/components/marketing/home/HeroCvvCard.tsx | FOUND |
| src/components/marketing/home/UrgencySection.tsx | FOUND |
| src/components/marketing/home/AudiencesSection.tsx | FOUND |
| src/components/marketing/home/OneIntegrationSection.tsx | FOUND |
| src/components/marketing/home/ProofSection.tsx | FOUND |
| src/components/marketing/home/HumanCostSection.tsx | FOUND |
| src/components/marketing/home/DemoFormSection.tsx | FOUND |
| .planning/phases/02-homepage/02-01-SUMMARY.md | FOUND |
| Commit 375a07d (Task 1) | FOUND |
| Commit d1654c6 (Task 2) | FOUND |
