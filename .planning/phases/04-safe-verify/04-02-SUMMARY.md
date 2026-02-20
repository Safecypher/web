---
phase: 04-safe-verify
plan: 02
subsystem: ui
tags: [react, nextjs, tailwindcss, daisyui, useState, client-component]

# Dependency graph
requires:
  - phase: 04-01
    provides: stub SvUseCaseTabs and SvFlowDiagram files, /safe-verify page scaffold
provides:
  - 4-tab interactive use-case section (Outbound, Inbound, Bi-directional, Branch) with useState
  - CSS outbound call flow placeholder diagram with 5 labelled stages
  - id="use-cases" section anchor for hero CTA scroll-link
affects:
  - 04-03 (SvProofSection and SvCtaSection sit below SvFlowDiagram on the page)
  - 04-04 (full /safe-verify page assembly)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useState tab switching with TypeScript union literal type for tab keys
    - Icon component pattern: individual named arrow-function components returning inline SVG
    - Step data defined as typed arrays outside component — clean separation from render logic
    - JSX text nodes containing '//' wrapped in braces to satisfy react/jsx-no-comment-textnodes

key-files:
  created: []
  modified:
    - src/components/marketing/safe-verify/SvUseCaseTabs.tsx
    - src/components/marketing/safe-verify/SvFlowDiagram.tsx

key-decisions:
  - "JSX eyebrow text '// How It Works' wrapped as {'// ...'} — react/jsx-no-comment-textnodes ESLint rule treats bare // in JSX text as comment nodes"
  - "Icon components defined as named arrow functions at module scope — keeps JSX render clean, avoids inline SVG repetition"
  - "FlowStep interface holds iconBg as a string class — allows colour variety without a complex icon registry"

patterns-established:
  - "FlowStep data arrays: define step content outside component as typed const arrays, map to StepCard inside render"
  - "Tab union type pattern: useState<'a' | 'b' | 'c' | 'd'>('a') with Record<TabKey, ...> lookup maps"

requirements-completed: [SV-02, SV-04, SV-08]

# Metrics
duration: 19min
completed: 2026-02-20
---

# Phase 4 Plan 02: Safe Verify Use-Case Tabs and Flow Diagram Summary

**4-tab 'use client' section with useState switching across Outbound, Inbound, Bi-directional, and Branch verification flows, plus a 5-stage CSS outbound call flow diagram placeholder**

## Performance

- **Duration:** 19 min
- **Started:** 2026-02-20T21:32:12Z
- **Completed:** 2026-02-20T21:51:05Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- SvUseCaseTabs: fully interactive 4-tab section with authored flow-step content for all four verification use cases; Outbound tab content verbatim from source HTML (6 cards including Fallback)
- SvFlowDiagram: CSS-only 5-stage placeholder diagram (Bank Agent -> Safe Verify API -> Customer App -> Mutual Verification -> Serve Customer) with responsive layout (horizontal sm+, vertical mobile)
- id="use-cases" anchor wired to section so hero CTA smooth-scroll target resolves correctly

## Task Commits

Each task was committed atomically:

1. **Task 1: SvUseCaseTabs — 4-tab section with flow steps** - `21be4e4` (feat)
2. **Task 2: SvFlowDiagram — CSS outbound call flow placeholder** - `6e08184` (feat)

## Files Created/Modified

- `src/components/marketing/safe-verify/SvUseCaseTabs.tsx` — 'use client' tab component: useState, 4 tabs, 21 FlowStep entries across 4 tabs, StepCard sub-component, 12 inline SVG icon components
- `src/components/marketing/safe-verify/SvFlowDiagram.tsx` — Server Component CSS flow diagram: 5 labelled boxes, SVG arrow connectors (sm+), unicode down-arrows (mobile), placeholder label

## Decisions Made

- JSX eyebrow text containing `//` (e.g. `// How It Works`) must be wrapped as `{'// ...'}` — the `react/jsx-no-comment-textnodes` ESLint rule treats bare `//` inside JSX tag children as comment syntax. This affected both SvUseCaseTabs and SvFlowDiagram eyebrow paragraphs and was auto-fixed.
- Icon components defined as named arrow functions at module scope (e.g. `const PhoneIcon = () => (...)`) rather than inline in data arrays — the data arrays hold `<PhoneIcon />` JSX elements, keeping each StepCard render clean.
- FlowStep interface keeps `iconBg` as a Tailwind class string (`'bg-primary/10'`) — allows per-step colour variety without a mapping table.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Wrapped JSX '//' eyebrow text in expression braces**
- **Found during:** Task 2 (post-lint run after SvFlowDiagram implementation)
- **Issue:** `react/jsx-no-comment-textnodes` ESLint error — `// How It Works` and `// Outbound Call Flow` inside `<p>` tags interpreted as comment syntax. Build passed but lint failed with 2 errors.
- **Fix:** Changed `>// How It Works</p>` to `>{'// How It Works'}</p>` in SvUseCaseTabs; same fix in SvFlowDiagram. Lint now exits 0.
- **Files modified:** src/components/marketing/safe-verify/SvUseCaseTabs.tsx, src/components/marketing/safe-verify/SvFlowDiagram.tsx
- **Verification:** `npm run lint` exits 0 with no errors
- **Committed in:** `6e08184` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — JSX comment node lint error)
**Impact on plan:** Auto-fix essential for clean CI lint gate. No scope change, no behaviour change.

## Issues Encountered

None beyond the auto-fixed lint error above.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- SvUseCaseTabs and SvFlowDiagram are fully implemented and build/lint-clean
- Plan 04-03 (SvProofSection and SvBenefitsSection) and 04-04 (SvCtaSection + final page assembly) can proceed
- id="use-cases" anchor is live — hero CTA scroll link will work once plan 04-04 wires the CTA button href

---
*Phase: 04-safe-verify*
*Completed: 2026-02-20*
