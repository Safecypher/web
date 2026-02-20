# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-19)

**Core value:** Every page must convert visitors into demo requests, deepen portal engagement, or give the sales team deal-readiness signal — nothing ships that doesn't serve one of those three outcomes.
**Current focus:** Phase 3 — Platform + Dynamic Security Codes

## Current Position

Phase: 3 of 6 (Platform + Dynamic Security Codes)
Plan: 3 of 4 in current phase
Status: In Progress — Plan 03-03 complete
Last activity: 2026-02-20 — Plan 03-03 complete

Progress: [██████████] 56%

## Performance Metrics

**Velocity:**
- Total plans completed: 11
- Average duration: 7.2 min
- Total execution time: 79 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 4/4 | 62 min | 15 min |
| 02-homepage | 4/4 | 10 min | 2.5 min |
| 03-platform-dynamic-security-codes | 3/4 | 7 min | 2.3 min |

**Recent Trend:**
- Last 5 plans: 3 min, 3 min, 4 min, 2 min, 2 min
- Trend: pure implementation plans with no checkpoints are fast

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-phase]: Next.js 14+ over Astro — portal requires auth middleware and server-side API routes
- [Pre-phase]: DaisyUI + Tailwind CSS — component library without heavy UI framework overhead
- [Pre-phase]: Attio API key stubbed in dev — real key wired in prod via Netlify env var
- [Pre-phase]: Agentic mockup served in portal iframe — existing HTML is production-quality, no rebuild needed
- [01-01]: Portal page at /portal path (not root) — both route groups cannot resolve to / simultaneously
- [01-01]: turbopack.root set to path.resolve(__dirname) — suppresses workspace lockfile warning from Netlify parent package-lock
- [01-01]: jsx=react-jsx enforced by Next.js 16 — mandatory for automatic JSX runtime, overrides plan spec of "preserve"
- [01-01]: Scaffolded via temp dir — create-next-app refuses to run in directories with existing files
- [Phase 01-02]: Lint step uses npm run lint (eslint directly) not next lint — next lint is not a CLI subcommand in Next.js 16
- [Phase 01-02]: _archive/ and dist/ added to eslint globalIgnores — prevents archived Astro files from failing CI lint gate
- [Phase 01-03]: Empty interfaces in Card.tsx replaced with type aliases — satisfies @typescript-eslint/no-empty-object-type rule
- [Phase 01-03]: CSS import order in globals.css: @import tailwindcss → @plugin daisyui → @import theme.css (strict Tailwind v4 order)
- [Phase 01-04]: Inline SVG for icons — no Bootstrap Icons CDN or npm icon package; zero dependency, SSR-safe
- [Phase 01-04]: Nav is Client Component ('use client') — mega-menu needs useState; Footer stays Server Component
- [Phase 01-04]: DaisyUI v5 button tokens: --border: 0 + --depth: 0 (not --border-btn which was v4-only)
- [Phase 01-04]: Nav font size: text-base font-medium on ghost nav links (not btn-sm which forced 12px)
- [Phase 02-01]: Stub files created for plans 02-02 through 02-04 — page.tsx compiles immediately, parallel plan execution unblocked
- [Phase 02-01]: useCallback wrapping rotateCvv — stabilises useEffect dependency, prevents interval recreation on each render
- [Phase 02-01]: Teal glow via sibling div bg-accent blur-xl opacity-40 — no custom CSS keyframe needed
- [Phase 02-01]: ESLint globalIgnores updated with '**/* 2.*' pattern — excludes accidental duplicate files from CI lint
- [Phase 02-02]: UrgencySection uses bg-neutral for light section — contrasts against dark hero above, matches DaisyUI v5 semantic token as specified
- [Phase 02-02]: id="audiences" preserved on AudiencesSection — smooth-scroll anchor for hero "See How It Works" CTA
- [Phase 02-02]: Architecture diagram placeholder as nested divs — no SVG needed, exactly matches plan spec with border-accent connector lines
- [Phase 02-03]: An Post logo uses styled text placeholder in brand green #006229 — no SVG/PNG asset available yet
- [Phase 02-03]: Irish Fintech Award uses inline SVG star badge placeholder — no physical asset available
- [Phase 02-03]: HumanCostSection uses max-w-4xl container for editorial feel; error colour (not red-*) for pull stat borders
- [Phase 02-04]: DaisyUI v5 fieldset/fieldset-legend pattern for all form field components — no form-control or label-text (Input.tsx updated, Textarea.tsx created)
- [Phase 02-04]: Portfolio calculator link placed below form as standalone link outside form element — per locked decision in CONTEXT.md
- [Phase 03-01]: max-w-5xl for argument sections (PlatformHeroSection, ApproachSection) — narrower editorial width vs 7xl gallery sections
- [Phase 03-01]: Stub files for all four plan 03-02 sections (ProductPortfolioSection, CompetitiveSection, PlatformProofSection, PlatformCtaSection) created immediately — /platform builds from Task 1
- [Phase 03-01]: CSS connector lines in ArchitectureDiagram hidden on mobile (hidden sm:block) — diagram degrades to stacked product cards on narrow viewports
- [Phase 03-01]: DSC and Safe Verify at primary visual weight (border-primary), five additional products at secondary (border-base-300) — matches two-tier CONTEXT.md decision
- [Phase 03-03]: Stub-first scaffolding for all six DSC sections in Task 1 — page.tsx compiles from the start; same pattern as plan 03-01
- [Phase 03-03]: No next/image in HowItWorksSection — screenshots not yet in public/screenshots/dsc/; placeholder divs with aspect-[9/16] prevent broken images
- [Phase 03-03]: max-w-5xl for argument sections (DscHeroSection, DscSolutionSection), max-w-7xl for gallery grid (HowItWorksSection) — consistent with phase 03 width decisions

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 3 - RESOLVED]: Architecture diagram (one API → seven products) delivered as CSS two-tier box diagram in Plan 03-01; production SVG can replace it later without page structure change
- [Phase 4]: Production SVG for Safe Verify outbound flow diagram must replace the PDF in a future update (Phase 1 v2 milestone)

## Session Continuity

Last session: 2026-02-20
Stopped at: Completed 03-03-PLAN.md — /dynamic-security-codes route with DscHeroSection (Flagship Product badge + static CVV problem frame), DscSolutionSection (4 feature cards + /platform cross-link), HowItWorksSection (6-step grid with placeholder image areas). Three stubs ready for plan 03-04.
Resume file: None
