---
phase: 01-foundation
plan: "01"
subsystem: infra

tags: [nextjs, typescript, tailwind, daisyui, netlify, app-router]

# Dependency graph
requires: []
provides:
  - Next.js 16.1.6 App Router project scaffolded with TypeScript, Tailwind v4, ESLint
  - Route groups src/app/(marketing)/ and src/app/(portal)/ established
  - TypeScript strict mode with noUncheckedIndexedAccess, exactOptionalPropertyTypes
  - netlify.toml with production and develop branch contexts
  - DaisyUI v5 installed, ready for theme config in Plan 01-03
  - Folder structure: components/ui, components/marketing, components/portal, lib, styles, app/api
  - Existing HTML files archived to _archive/ (preserved, not deleted)
affects:
  - 01-02 (CI/CD pipeline builds on this project scaffold)
  - 01-03 (DaisyUI + Tailwind theme config builds on this foundation)
  - 01-04 (core layout components go into the established folder structure)

# Tech tracking
tech-stack:
  added:
    - next@16.1.6
    - react@19.2.3
    - react-dom@19.2.3
    - typescript@5
    - tailwindcss@4
    - daisyui@5.5.18
    - "@tailwindcss/postcss@4"
    - eslint@9
    - eslint-config-next@16.1.6
  patterns:
    - Next.js App Router with route groups for marketing vs portal separation
    - Strict TypeScript with noUncheckedIndexedAccess for null-safety
    - Root layout html+body only; route group layouts handle section-specific chrome

key-files:
  created:
    - src/app/(marketing)/layout.tsx
    - src/app/(marketing)/page.tsx
    - src/app/(portal)/layout.tsx
    - src/app/(portal)/portal/page.tsx
    - src/app/api/.gitkeep
    - src/components/ui/.gitkeep
    - src/components/marketing/.gitkeep
    - src/components/portal/.gitkeep
    - src/lib/.gitkeep
    - src/styles/.gitkeep
    - netlify.toml
    - _archive/index.html
    - _archive/safe-verify-landing.html
  modified:
    - src/app/layout.tsx
    - tsconfig.json
    - next.config.ts
    - package.json
    - .gitignore

key-decisions:
  - "Portal page placed at src/app/(portal)/portal/page.tsx (not root) to avoid route conflict with (marketing)/page.tsx — both route groups cannot resolve to /"
  - "next.config.ts sets turbopack.root to path.resolve(__dirname) to suppress workspace lockfile warning from Netlify parent package-lock.json"
  - "jsx set to react-jsx by Next.js 16 (overrides plan spec of preserve) — this is the mandatory value for Next.js automatic JSX runtime"
  - "Scaffolded Next.js in temp dir (/tmp) then copied files, because create-next-app refuses to run in directories with existing contents"

patterns-established:
  - "Route groups for layout separation: (marketing) for public pages, (portal) for gated portal"
  - "Root layout: html+body+fonts only — no nav or footer at root level"
  - "Strict TypeScript: noUncheckedIndexedAccess requires explicit undefined handling on all indexed access"
  - "Archive pattern: moved files to _archive/ with git tracking to preserve history"

requirements-completed: [FOUND-01, FOUND-02]

# Metrics
duration: 9min
completed: 2026-02-19
---

# Phase 1 Plan 01: Foundation — Next.js Scaffold Summary

**Next.js 16.1.6 App Router project bootstrapped from Astro/HTML repo with strict TypeScript, DaisyUI v5, marketing + portal route groups, and Netlify branch deploy config**

## Performance

- **Duration:** 9 min
- **Started:** 2026-02-19T16:41:31Z
- **Completed:** 2026-02-19T16:50:23Z
- **Tasks:** 2
- **Files modified:** 16

## Accomplishments
- Archived existing static HTML files (index.html, safe-verify-landing.html, assets/, demos/) to _archive/ preserving git history
- Scaffolded Next.js 16.1.6 with TypeScript, Tailwind v4, ESLint, App Router, src-dir layout
- Established route groups (marketing) and (portal) with minimal layout shells; portal at /portal path
- Configured TypeScript strict mode with noUncheckedIndexedAccess + exactOptionalPropertyTypes; zero type errors
- Created netlify.toml with [context.production] and [context.develop] blocks for Netlify branch deploys
- Installed DaisyUI v5 ready for Plan 01-03 theme configuration
- Set up full folder structure: components/ui, components/marketing, components/portal, lib, styles, app/api

## Task Commits

Each task was committed atomically:

1. **Task 1: Archive existing files and scaffold Next.js project** - `fb165a7` (chore)
2. **Task 2: Configure folder structure, TypeScript strict mode, and Netlify deployment** - `703d329` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified
- `src/app/layout.tsx` - Root layout with Outfit + Playfair_Display fonts, SafeCypher metadata, html+body only
- `src/app/(marketing)/layout.tsx` - Marketing route group layout shell (renders children only)
- `src/app/(marketing)/page.tsx` - Scaffold default homepage placeholder
- `src/app/(portal)/layout.tsx` - Portal route group layout shell (renders children only)
- `src/app/(portal)/portal/page.tsx` - Portal placeholder at /portal path
- `src/app/api/.gitkeep` - API routes directory placeholder
- `src/components/ui/.gitkeep` - Design system primitives directory
- `src/components/marketing/.gitkeep` - Marketing components directory
- `src/components/portal/.gitkeep` - Portal components directory
- `src/lib/.gitkeep` - Shared utility functions directory
- `src/styles/.gitkeep` - Theme CSS directory (for Plan 01-03)
- `tsconfig.json` - Strict TypeScript with 5 additional strict flags, _archive excluded
- `netlify.toml` - Netlify deploy config: main=production, develop=staging
- `next.config.ts` - Clean Next.js config with turbopack.root for workspace detection
- `package.json` - Next.js 16 + React 19 + DaisyUI v5 dependencies
- `.gitignore` - Updated with Next.js, Astro artifacts, .next/, dist/
- `_archive/` - Preserved static HTML, assets, demos, Astro env.d.ts

## Decisions Made
- Portal page placed at `src/app/(portal)/portal/page.tsx` (not root) to avoid route conflict: two route groups cannot both resolve to `/`
- `next.config.ts` sets `turbopack.root` to `path.resolve(__dirname)` to suppress workspace lockfile warning (Netlify parent package-lock.json detected)
- `jsx` set to `react-jsx` by Next.js 16 build (overrides plan spec of `preserve`) — mandatory for Next.js automatic JSX runtime
- Scaffolded via temp directory (`/tmp/nextjs-scaffold/safecypher`) because `create-next-app` refuses to run in directories with existing files

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffolded in temp directory due to create-next-app directory conflict**
- **Found during:** Task 1 (scaffolding)
- **Issue:** `create-next-app` refuses to run when target directory contains any existing files (`.astro/`, `.planning/`, `node_modules/` etc.) even with `--yes` flag
- **Fix:** Scaffolded in `/tmp/nextjs-scaffold/safecypher`, then copied `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/*`, and `public/*.svg` to project root
- **Files modified:** package.json, tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs, src/app/*, public/
- **Verification:** `npm run build` succeeds, routes / and /portal both render
- **Committed in:** fb165a7 (Task 1 commit)

**2. [Rule 1 - Bug] Portal page moved to /portal path to fix route conflict**
- **Found during:** Task 2 (build verification)
- **Issue:** `src/app/(portal)/page.tsx` and `src/app/(marketing)/page.tsx` both resolved to `/`, causing Turbopack build error: "You cannot have two parallel pages that resolve to the same path"
- **Fix:** Moved `src/app/(portal)/page.tsx` to `src/app/(portal)/portal/page.tsx` so it resolves to `/portal`
- **Files modified:** src/app/(portal)/portal/page.tsx (moved from (portal)/page.tsx)
- **Verification:** `npm run build` succeeds, routes show / and /portal correctly
- **Committed in:** 703d329 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both auto-fixes necessary for correct operation. The portal path change aligns with the actual PRD intent (portal lives at /portal). No scope creep.

## Issues Encountered
- Leftover `src/env.d.ts` (Astro reference file) was regenerated during Next.js type generation; removed twice during execution — does not affect final state

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Next.js project fully scaffolded and building cleanly
- TypeScript strict mode active with zero errors
- Folder structure matches PRD spec exactly
- DaisyUI v5 installed and waiting for Plan 01-03 theme configuration
- netlify.toml ready for CI/CD pipeline (Plan 01-02)
- Plan 01-02 (CI/CD) and Plan 01-03 (DaisyUI theme) can execute in any order

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
