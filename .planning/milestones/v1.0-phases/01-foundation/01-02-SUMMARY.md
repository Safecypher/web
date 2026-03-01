---
phase: 01-foundation
plan: "02"
subsystem: infra

tags: [github-actions, ci, eslint, typescript, nextjs]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js 16 scaffold with npm run lint, npm run build, and TypeScript strict mode passing
provides:
  - GitHub Actions CI workflow triggering on PRs to main and develop
  - Three-gate CI pipeline: lint (npm run lint), type-check (npx tsc --noEmit), build (npm run build)
  - ESLint config scoped to src/ — _archive/ and dist/ excluded from linting
affects:
  - 01-03 (Tailwind/DaisyUI theme — any lint or TS errors will block CI)
  - 01-04 (Layout components — CI gate enforces quality from first PR)
  - All subsequent phases (every PR blocked on lint, TS, and build failures)

# Tech tracking
tech-stack:
  added:
    - GitHub Actions (actions/checkout@v4, actions/setup-node@v4)
  patterns:
    - Three-step CI gate: lint → type-check → build in sequence, any failure blocks merge
    - npm ci (not npm install) for reproducible CI installs from package-lock.json

key-files:
  created:
    - .github/workflows/ci.yml
  modified:
    - eslint.config.mjs

key-decisions:
  - "Lint step uses npm run lint (eslint directly) not next lint — next lint is not a CLI subcommand in Next.js 16"
  - "_archive/ and dist/ added to eslint globalIgnores — prevents archived Astro files from failing CI lint gate"
  - "Node 22 chosen to match LTS appropriate for Next.js 16 and React 19"

patterns-established:
  - "CI runs on ubuntu-latest with Node 22 and npm cache keyed on package-lock.json"
  - "Lint, type-check, and build are three independent steps — any one failing fails the entire job"

requirements-completed: [FOUND-03]

# Metrics
duration: 5min
completed: 2026-02-19
---

# Phase 1 Plan 02: Foundation — GitHub Actions CI Pipeline Summary

**GitHub Actions CI workflow with three merge-blocking gates: ESLint (npm run lint), TypeScript (npx tsc --noEmit), and Next.js build (npm run build) on all PRs to main and develop**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-19T17:00:00Z
- **Completed:** 2026-02-19T17:05:00Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments
- Created `.github/workflows/ci.yml` that triggers on pull requests to `main` and `develop`
- Three sequential CI gates: lint, type-check, and build — each independently blocks merge on failure
- Fixed ESLint config to exclude `_archive/` and `dist/` so the lint gate passes cleanly on the current scaffold
- Node 22 with `cache: npm` for fast, reproducible CI runs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create GitHub Actions CI workflow** - `9f7cd3d` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified
- `.github/workflows/ci.yml` - CI workflow: checkout, Node 22 setup with npm cache, npm ci, lint, type-check, build; triggers on PRs to main/develop
- `eslint.config.mjs` - Added `_archive/**` and `dist/**` to globalIgnores so archived Astro files do not fail the lint gate

## Decisions Made
- `npm run lint` runs the `eslint` CLI directly (not `next lint`) because `next lint` does not exist as a CLI subcommand in Next.js 16
- `_archive/` and `dist/` added to ESLint ignores: these contain archived Astro HTML and old build artifacts that should never be linted

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed ESLint scanning _archive/ and dist/ causing lint failure**
- **Found during:** Task 1 (verifying `npm run lint` passes)
- **Issue:** `npm run lint` (plain `eslint` with no directory restriction) was scanning `_archive/env.d.ts` and `dist/_astro/*.js` files — 1 error and 8 warnings, exiting non-zero
- **Fix:** Added `_archive/**`, `dist/**`, and `node_modules/**` to `globalIgnores` in `eslint.config.mjs`
- **Files modified:** `eslint.config.mjs`
- **Verification:** `npm run lint` exits 0 with no output after fix
- **Committed in:** `9f7cd3d` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Auto-fix necessary for the CI lint gate to work correctly. The archived Astro files should never be linted as they are not part of the Next.js project. No scope creep.

## Issues Encountered
- `next lint` does not exist in Next.js 16 — the CLI only supports `build`, `dev`, `start`, `info`, `telemetry`, `typegen`. The project's `"lint": "eslint"` script is correct for this version.

## User Setup Required
**Branch protection rules require manual configuration in GitHub repository settings:**
- Go to Settings > Branches > Add rule for `main`
- Enable "Require status checks to pass before merging"
- Search for and select the `ci` check (appears after the first PR runs the workflow)
- Repeat for `develop` branch

The CI workflow itself is fully automated — only the repository branch protection toggle requires manual action.

## Next Phase Readiness
- CI pipeline is committed and will activate on the first PR
- All three checks (lint, type-check, build) pass locally against the Phase 01-01 scaffold
- Plan 01-03 (DaisyUI theme) and Plan 01-04 (layout components) are unblocked

---
*Phase: 01-foundation*
*Completed: 2026-02-19*
