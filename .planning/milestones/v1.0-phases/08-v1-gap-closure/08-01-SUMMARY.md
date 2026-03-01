---
phase: 08-v1-gap-closure
plan: 01
subsystem: ui
tags: [react, nextjs, attio, portal, safe-verify, cta]

# Dependency graph
requires:
  - phase: 07-add-value-calculators-to-the-portal
    provides: PortalLoginTracker component and portal layout infrastructure
  - phase: 03-platform-dynamic-security-codes
    provides: PageCtaSection shared component used as wrapper target
  - phase: 04-safe-verify
    provides: SvCtaSection and safe-verify page structure
provides:
  - SvCtaSection as 4-line thin wrapper over PageCtaSection (calculator + demo CTAs on /safe-verify)
  - PortalLoginTracker mounted in portal layout (fires portal_login for all portal entry paths)
affects: [safe-verify page, portal layout, Attio CRM conversion signals]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Thin wrapper pattern for shared CTAs (SvCtaSection mirrors DscCtaSection exactly)
    - PortalLoginTracker in layout ensures per-route event firing without double-fire

key-files:
  created: []
  modified:
    - src/components/marketing/safe-verify/SvCtaSection.tsx
    - src/app/(portal)/layout.tsx
    - src/app/(portal)/portal/page.tsx

key-decisions:
  - "SvCtaSection replaced entirely with 4-line PageCtaSection wrapper — no preserved content from old 25-line custom section"
  - "PortalLoginTracker mounted in portal layout (not page) — fires for all callbackUrl destinations including /portal/calculator primary funnel"
  - "No 'use client' added to layout.tsx — Server Component importing a Client Component is standard App Router behavior"

patterns-established:
  - "Product page CTA sections are thin wrappers over shared PageCtaSection — DSC, Safe Verify, Company all use same 4-line pattern"
  - "Cross-cutting portal analytics belong in layout.tsx, not individual page.tsx files"

requirements-completed:
  - SV-09
  - PORT-04

# Metrics
duration: 7min
completed: 2026-03-01
---

# Phase 8 Plan 01: v1.0 Gap Closure Summary

**SvCtaSection replaced with PageCtaSection wrapper (calculator + demo CTAs on /safe-verify), and PortalLoginTracker moved to portal layout so portal_login Attio event fires for all entry paths including the /portal/calculator primary funnel**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-01T12:00:00Z
- **Completed:** 2026-03-01T12:06:07Z
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint — approved)
- **Files modified:** 3

## Accomplishments

- SV-09 closed: /safe-verify now shows both "See the value for your portfolio" (→ /portal/calculator) and "Request a demo" (→ /#demo) CTAs via PageCtaSection
- PORT-04 closed: PortalLoginTracker moved from portal/page.tsx to portal layout.tsx — fires on every authenticated portal page load regardless of callbackUrl destination
- No double-fire risk: PortalLoginTracker removed from portal/page.tsx, mounted once in layout

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace SvCtaSection with PageCtaSection thin wrapper (SV-09)** - `75715ec` (feat)
2. **Task 2: Move PortalLoginTracker to portal layout (PORT-04)** - `6ddd549` (feat)
3. **Task 3: Human verify checkpoint (approved)** — visual verification confirmed dual CTAs on /safe-verify and portal_login firing on /portal/calculator entry path

**Plan metadata:** `f412b99` (docs: complete plan)

## Files Created/Modified

- `src/components/marketing/safe-verify/SvCtaSection.tsx` - Replaced 25-line custom section with 4-line PageCtaSection thin wrapper
- `src/app/(portal)/layout.tsx` - Added PortalLoginTracker import and render as first child inside NuqsAdapter
- `src/app/(portal)/portal/page.tsx` - Removed PortalLoginTracker import and JSX (dashboard content unchanged)

## Decisions Made

- SvCtaSection replaced entirely — no content from old custom section preserved; PageCtaSection provides the correct dual-CTA layout
- PortalLoginTracker mounted in layout without adding 'use client' to layout.tsx — importing a Client Component from a Server Component is standard Next.js App Router behavior
- No `?from=product` query param added to PageCtaSection — explicitly out of scope per plan research

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None — both edits were straightforward and both lint and build passed on first attempt.

## User Setup Required

None — no external service configuration required for these changes.

## Next Phase Readiness

- Both SV-09 and PORT-04 requirements satisfied
- Human verification checkpoint approved: user confirmed /safe-verify shows dual CTAs and portal_login fires on /portal/calculator entry path
- Phase 8 Plan 01 is fully complete — both SV-09 and PORT-04 requirements satisfied and verified

## Self-Check: PASSED

- FOUND: `.planning/phases/08-v1-gap-closure/08-01-SUMMARY.md`
- FOUND: commit `75715ec` (Task 1 — SvCtaSection wrapper)
- FOUND: commit `6ddd549` (Task 2 — PortalLoginTracker to layout)
- Human verify checkpoint: approved by user

---
*Phase: 08-v1-gap-closure*
*Completed: 2026-03-01*
