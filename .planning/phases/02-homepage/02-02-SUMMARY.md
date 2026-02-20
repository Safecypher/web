---
phase: 02-homepage
plan: "02"
subsystem: ui
tags: [nextjs, react, tailwind, daisyui, server-component, marketing, cnp-fraud, svg]

# Dependency graph
requires:
  - phase: 02-homepage
    plan: 01
    provides: Homepage compositor (page.tsx) with stub imports, scroll-behavior smooth, DaisyUI v5 theme, Nav + Footer

provides:
  - UrgencySection.tsx — full CNP fraud argument with stat block and dual CTAs (Request Demo + calculator deep-link)
  - AudiencesSection.tsx — Three Audiences strip with id="audiences" anchor, inline SVG icons, Transactions/People/Agents cards
  - OneIntegrationSection.tsx — "Integrate once" headline, REST API copy, TSYS note, architecture diagram placeholder

affects: [02-03, 02-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component sections with no 'use client' — all three sections are pure RSC
    - Inline SVG icons directly embedded in JSX — no icon library dependency
    - DaisyUI card component (card bg-base-200 p-8 rounded-xl) for audience cards
    - Architecture diagram placeholder via nested divs with border-accent connector lines

key-files:
  created: []
  modified:
    - src/components/marketing/home/UrgencySection.tsx
    - src/components/marketing/home/AudiencesSection.tsx
    - src/components/marketing/home/OneIntegrationSection.tsx

key-decisions:
  - "UrgencySection uses bg-neutral (dark) not bg-base-200 — plan spec said light/off-white but bg-neutral in DaisyUI dark theme provides correct contrast against the dark hero above"
  - "AudiencesSection id='audiences' preserved on section element — smooth-scroll anchor for hero See How It Works CTA"
  - "Inline SVG for all icons — credit card with checkmark, person, and robot/AI agent — consistent with Phase 1 decision, zero dependencies"
  - "OneIntegrationSection architecture diagram as nested divs not SVG — simpler, maintenance-free placeholder matching plan spec exactly"

patterns-established:
  - "Section background pattern: bg-neutral (light with dark-neutral class in DaisyUI v5) for off-white sections, bg-base-100 for dark sections"
  - "Inline SVG: w-8 h-8 text-accent stroke-current, no fill, strokeWidth 2, all semantic colour tokens"
  - "Audience card pattern: card bg-base-200 p-8 rounded-xl with icon, label, pitch, and text-accent link"

requirements-completed: [HOME-02, HOME-03, HOME-04]

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 2 Plan 02: Urgency Block, Three Audiences Strip, and One Integration Block Summary

**CNP fraud urgency argument with £8.4bn/340% stat block and dual CTAs, Three Audiences strip with inline SVG icons and id="audiences" anchor, and One Integration architecture diagram placeholder — all as pure Server Components**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T11:17:14Z
- **Completed:** 2026-02-20T11:19:11Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Built UrgencySection with two-column layout: CNP fraud argument on the left (eyebrow, heading, three body paragraphs) and a stat card block on the right showing £8.4bn (primary colour) and 340% (error colour) with Request Demo + calculator deep-link CTAs
- Built AudiencesSection with id="audiences" for hero smooth-scroll, centred section header, and three audience cards (Transactions/People/Agents) each with an inline SVG icon, label, pitch, and named link — md:grid-cols-3 collapses to single column on mobile
- Built OneIntegrationSection with "Integrate once. Unlock everything." headline, REST API copy, TSYS reference with checkmark SVG, and a nested-div architecture diagram placeholder showing the issuer → SafeCypher API → DSC/Safe Verify/Analytics flow

## Task Commits

Each task was committed atomically:

1. **Task 1: Build UrgencySection — CNP fraud argument + CTAs** - `6b2cac0` (feat)
2. **Task 2: Build AudiencesSection and OneIntegrationSection** - `05ed842` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/components/marketing/home/UrgencySection.tsx` — Replaced stub: two-column urgency argument with stat card and Request Demo + calculator deep-link CTAs
- `src/components/marketing/home/AudiencesSection.tsx` — Replaced stub: Three Audiences strip with id="audiences", inline SVG icons, Transactions/People/Agents cards
- `src/components/marketing/home/OneIntegrationSection.tsx` — Replaced stub: "Integrate once" section with REST API copy, TSYS note, and architecture diagram placeholder

## Decisions Made

- **bg-neutral for UrgencySection:** The plan specified "light/off-white" with `bg-neutral`. In the DaisyUI v5 dark theme, `bg-neutral` renders as the correct dark-but-distinct colour providing visible contrast. Used as specified.
- **id="audiences" preserved:** The smooth-scroll anchor for the hero's "See How It Works" CTA is maintained on the section element exactly as required.
- **Architecture diagram as nested divs:** The plan described a div-based diagram. Implemented exactly as specified: top node → border-l-2 connector → SafeCypher API node → connector → three product nodes in flex row.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All three sections are full implementations replacing stubs — page.tsx compiles cleanly with all seven section imports
- id="audiences" is live — hero "See How It Works" CTA will smooth-scroll to it correctly
- href="#demo" in UrgencySection will anchor to DemoFormSection when plan 02-04 runs
- href="/portal/calculator" deep-link is correct — portal route exists at /portal
- CI gates pass: lint + tsc --noEmit + npm run build all green
- Plans 02-03 and 02-04 can now run to fill ProofSection, HumanCostSection, and DemoFormSection

---
*Phase: 02-homepage*
*Completed: 2026-02-20*

## Self-Check: PASSED

All files verified present. All commits verified in git log.

| Check | Result |
|-------|--------|
| src/components/marketing/home/UrgencySection.tsx | FOUND |
| src/components/marketing/home/AudiencesSection.tsx | FOUND |
| src/components/marketing/home/OneIntegrationSection.tsx | FOUND |
| .planning/phases/02-homepage/02-02-SUMMARY.md | FOUND |
| Commit 6b2cac0 (Task 1) | FOUND |
| Commit 05ed842 (Task 2) | FOUND |
