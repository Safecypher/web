# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-19)

**Core value:** Every page must convert visitors into demo requests, deepen portal engagement, or give the sales team deal-readiness signal — nothing ships that doesn't serve one of those three outcomes.
**Current focus:** Phase 1 — Foundation

## Current Position

Phase: 1 of 6 (Foundation)
Plan: 3 of 4 in current phase
Status: In progress
Last activity: 2026-02-19 — Plan 01-03 complete

Progress: [███░░░░░░░] 18%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 6 min
- Total execution time: 17 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/4 | 17 min | 6 min |

**Recent Trend:**
- Last 5 plans: 9 min, 5 min, 3 min
- Trend: fast (CSS config + typed component wrappers)

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

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 3]: Architecture diagram (one API → seven products) must be commissioned separately — cannot use stock imagery; placeholder ships in Phase 3, production diagram replaces it later
- [Phase 4]: Production SVG for Safe Verify outbound flow diagram must replace the PDF in a future update (Phase 1 v2 milestone)

## Session Continuity

Last session: 2026-02-19
Stopped at: Completed 01-03-PLAN.md — DaisyUI v5 + Tailwind v4 SafeCypher theme and base UI component library
Resume file: None
