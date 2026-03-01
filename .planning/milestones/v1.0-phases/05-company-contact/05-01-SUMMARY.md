---
phase: 05-company-contact
plan: 01
subsystem: ui
tags: [next.js, react, tailwindcss, daisyui, server-components, company-page]

# Dependency graph
requires:
  - phase: 03-platform-dynamic-security-codes
    provides: shared/PageCtaSection.tsx — thin-wrapper CTA pattern
  - phase: 02-homepage
    provides: HumanCostSection.tsx — structure reference for CompanyHumanCostSection
provides:
  - /company route — six-section Server Component page at src/app/(marketing)/company/page.tsx
  - CompanyHeroSection — eyebrow + h1 with serif italic + subhead
  - CompanyMissionSection — pull-quote blockquote with "Zero fraud. Not reduced. Eliminated." framing and Irish Fintech Awards 2025 reference
  - CompanyBeliefsSection — five numbered belief cards with verbatim archive text and ghost mono numerals
  - CompanyHumanCostSection — dedicated Human Cost variant (not imported from home/), expanded human-impact copy, link to /contact
  - CompanyTeamSection — 3-column grid with 6 placeholder members and inline SVG PersonSilhouette
  - CompanyCtaSection — 4-line thin wrapper over shared PageCtaSection
affects: 05-02-contact

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Stub-first scaffolding: page.tsx and all six component stubs created in Task 1 so route compiles from the start
    - CompanyCtaSection thin wrapper: 4-line wrapper over shared PageCtaSection — same DscCtaSection / SvCtaSection pattern
    - PersonSilhouette inline SVG: viewBox="0 0 80 80", rect + circle + path, aria-hidden="true" — no external image assets needed
    - Beliefs array at module scope: const beliefs typed inline, .map() renders numbered cards
    - CompanyHumanCostSection dedicated variant: NOT imported from home/; separate file for Company-context framing

key-files:
  created:
    - src/app/(marketing)/company/page.tsx
    - src/components/marketing/company/CompanyHeroSection.tsx
    - src/components/marketing/company/CompanyMissionSection.tsx
    - src/components/marketing/company/CompanyBeliefsSection.tsx
    - src/components/marketing/company/CompanyHumanCostSection.tsx
    - src/components/marketing/company/CompanyTeamSection.tsx
    - src/components/marketing/company/CompanyCtaSection.tsx
  modified: []

key-decisions:
  - "CompanyHumanCostSection is self-contained — not imported from home/HumanCostSection.tsx; dedicated Company framing with /contact CTA (not /#demo)"
  - "CompanyCtaSection is a 4-line thin wrapper over shared PageCtaSection — consistent with DscCtaSection and SvCtaSection pattern"
  - "PersonSilhouette inline SVG uses rx=40 on the rect for full rounded appearance in the rounded-full overflow-hidden card container"
  - "Beliefs array const defined at module scope with five verbatim entries — no paraphrasing (COMP-03)"
  - "TeamMember key uses name+title concatenation — handles duplicate '[Name]' placeholder keys without React warning"

patterns-established:
  - "Pattern: company/ directory mirrors dsc/ and safe-verify/ — six Server Component sections in src/components/marketing/company/"
  - "Pattern: CompanyCtaSection thin wrapper = 4 lines (import + named export returning PageCtaSection)"

requirements-completed: [COMP-01, COMP-02, COMP-03, COMP-04]

# Metrics
duration: 9min
completed: 2026-02-21
---

# Phase 05 Plan 01: Company Page Summary

**Six-section /company Server Component page with verbatim belief cards, dedicated Human Cost variant, 3-column team grid with inline SVG silhouettes, and mission section using "Zero fraud. Not reduced. Eliminated." framing from the archive.**

## Performance

- **Duration:** ~9 min
- **Started:** 2026-02-21T11:26:36Z
- **Completed:** 2026-02-21T11:30:06Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- /company route builds and renders all six sections as static Server Components — zero TypeScript errors, zero ESLint errors
- Five belief cards render with verbatim archive text ("Don't reduce. Eliminate." through "Easier for users. Impossible for fraudsters.") with ghost mono numerals
- CompanyHumanCostSection is a self-contained dedicated component (not imported from home/) with expanded human-impact framing and /contact CTA
- CompanyTeamSection: 3-column grid with 6 placeholder members and inline SVG PersonSilhouette (no external assets)
- CompanyCtaSection is a 4-line thin wrapper over shared PageCtaSection — consistent with Phase 3 and 4 pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold company route and six component stubs** - `c4c0ffd` (feat)
2. **Task 2: Implement CompanyHeroSection, CompanyMissionSection, CompanyBeliefsSection** - `f783363` (feat)
3. **Task 3: Implement CompanyHumanCostSection, CompanyTeamSection, CompanyCtaSection** - `3c8088f` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `src/app/(marketing)/company/page.tsx` — /company route Server Component with metadata and all six section imports
- `src/components/marketing/company/CompanyHeroSection.tsx` — eyebrow + h1 "Built to eliminate fraud. Not manage it." + subhead
- `src/components/marketing/company/CompanyMissionSection.tsx` — pull-quote blockquote with "Zero fraud. Not reduced. Eliminated." + Irish Fintech Awards 2025
- `src/components/marketing/company/CompanyBeliefsSection.tsx` — five verbatim belief cards in 3-col grid with ghost mono numerals (text-primary/20)
- `src/components/marketing/company/CompanyHumanCostSection.tsx` — dedicated Company variant with two border-error pull stats, expanded human-impact copy, /contact CTA
- `src/components/marketing/company/CompanyTeamSection.tsx` — 3-col grid, 6 placeholder TeamMember entries, inline PersonSilhouette SVG
- `src/components/marketing/company/CompanyCtaSection.tsx` — 4-line wrapper over shared PageCtaSection

## Decisions Made
- CompanyHumanCostSection dedicated variant: separate file, Company-context framing, /contact CTA instead of /#demo — COMP-02 compliance
- TeamMember key uses name+title concatenation — handles duplicate '[Name]' placeholder keys without React warning
- PersonSilhouette SVG uses rx=40 on rect for full-circle appearance inside the rounded-full overflow-hidden container
- beliefs array uses verbatim archive text — no paraphrasing per COMP-03 requirement

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
- `npm run build` failed on first attempt with `ENOTEMPTY: directory not empty, rmdir .next/build` — cleared `.next` cache and rebuilt successfully. Not a code issue; stale build artifact from prior session.

## User Setup Required

None — no external service configuration required for the Company page (all Server Components, no new packages).

## Next Phase Readiness
- /company is fully built and passes build, tsc, and lint clean
- Phase 05 Plan 02 (Contact page) can begin immediately — no blockers
- /contact route, ContactFormSection, ContactCalendlyButton, and __forms.html update are the remaining deliverables for Phase 05

---
*Phase: 05-company-contact*
*Completed: 2026-02-21*
