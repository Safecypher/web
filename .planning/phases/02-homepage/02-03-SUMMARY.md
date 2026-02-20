---
phase: 02-homepage
plan: "03"
subsystem: ui
tags: [react, nextjs, daisyui, tailwind, server-component, social-proof, emotional-copy]

# Dependency graph
requires:
  - phase: 02-01
    provides: Stub files for ProofSection and HumanCostSection, page.tsx importing both

provides:
  - ProofSection Server Component with An Post stats, award badge, case study link
  - HumanCostSection Server Component with editorial emotional fraud-victim framing

affects: [02-04, 03-proof-pages]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server Component with inline SVG badge and styled text logo placeholder
    - Editorial single-column layout (max-w-4xl) for emotionally weighted sections
    - Left-bordered pull stats using border-error accent for gravity signalling

key-files:
  created: []
  modified:
    - src/components/marketing/home/ProofSection.tsx
    - src/components/marketing/home/HumanCostSection.tsx

key-decisions:
  - "An Post logo uses styled text placeholder in brand green #006229 — no SVG asset available yet"
  - "Irish Fintech Award uses inline SVG star badge placeholder — no physical asset available"
  - "HumanCostSection uses max-w-4xl (narrower than standard 7xl) for editorial feel"
  - "error colour (not red-*) used for HumanCost pull stat borders — semantic DaisyUI token only"

patterns-established:
  - "Pull stats: border-l-4 border-{colour} pl-8 my-10 wrapping number + context text"
  - "Proof cards: card bg-base-100 rounded-xl p-8 shadow-lg pattern"
  - "Brand colour overrides: only via style={{ color: '#XXXXXX' }} for genuine external brand colours"

requirements-completed: [HOME-05, HOME-06]

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 2 Plan 03: Proof Section and Human Cost Section Summary

**ProofSection (800,000+ / 18 months / zero CNP fraud stats, An Post brand green placeholder, Fintech Award badge) and HumanCostSection (editorial fraud-victim emotional copy, "1 in 4" / "£360" pull stats) — two Server Components completing the homepage narrative arc**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T11:23:09Z
- **Completed:** 2026-02-20T11:25:33Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- ProofSection: three headline stats (800,000+ / 18 months / Zero) in primary/accent colours, An Post styled text in brand green, Irish Fintech Award inline SVG badge, case study link to /proof/an-post, light bg-neutral background contrasting against dark Audiences section above
- HumanCostSection: editorial single-column layout, "1 in 4" and "£360" pull stats with left-bordered error accent, emotionally weighted body paragraphs, mission statement closing, CTAs to /company and #demo, dark bg-base-100 background
- npm run build, npx tsc --noEmit, and npm run lint all pass with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Build ProofSection — An Post case study stats, logo, award badge** - `8e6d918` (feat)
2. **Task 2: Build HumanCostSection — emotional fraud victim framing** - `2e41481` (feat)

## Files Created/Modified
- `src/components/marketing/home/ProofSection.tsx` - Proof section: stats grid + An Post proof card with logo placeholder, quote, and award badge; links to /proof/an-post
- `src/components/marketing/home/HumanCostSection.tsx` - Human Cost section: editorial emotional copy with pull stats, mission statement, CTAs to /company and #demo

## Decisions Made
- An Post logo uses styled text `<span>` with `style={{ color: '#006229' }}` (An Post brand green) — no SVG or PNG asset is available yet; this is the correct interim approach per plan spec
- Irish Fintech Award uses an inline SVG star icon in a styled badge div — no physical award badge asset exists
- HumanCostSection uses `max-w-4xl` container (vs standard `max-w-7xl`) to give the section a narrower, more editorial, more personal feel — as specified in the plan
- `text-error` DaisyUI semantic token used throughout HumanCostSection for pull stat borders — no raw `text-red-*` Tailwind classes used

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- ProofSection and HumanCostSection are complete Server Components replacing their 02-01 stubs
- page.tsx already imports both components (set up in 02-01) — no modifications needed
- Alternating section colours correct: dark Audiences (02-02) → light Proof (bg-neutral) → dark HumanCost (bg-base-100)
- Plan 02-04 (Demo Form) can proceed immediately; both new sections are non-blocking

---
*Phase: 02-homepage*
*Completed: 2026-02-20*

## Self-Check: PASSED

- FOUND: src/components/marketing/home/ProofSection.tsx
- FOUND: src/components/marketing/home/HumanCostSection.tsx
- FOUND: .planning/phases/02-homepage/02-03-SUMMARY.md
- FOUND: commit 8e6d918 (feat(02-03): build ProofSection)
- FOUND: commit 2e41481 (feat(02-03): build HumanCostSection)
