---
phase: 07-add-value-calculators-to-the-portal
plan: "03"
subsystem: ui
tags: [recharts, nuqs, jspdf, portal, calculator, server-actions, supabase, url-state]

# Dependency graph
requires:
  - phase: 07-01
    provides: Supabase auth client factory (createClient), portal route group structure
  - phase: 07-02
    provides: calculate() engine, CalculatorInputs/CalculatorOutputs types, USD_DEFAULTS, PORTFOLIO_SPLIT_RATIO, REGION_CURRENCY

provides:
  - Portal shell layout with NuqsAdapter (portal-only, Pitfall 3 avoidance)
  - PortalSidebar with active link highlighting, user email display, sign-out
  - Portal dashboard at /portal with Calculator + Demo CTA buttons
  - PortalLoginTracker client component firing firePortalLogin Server Action on mount
  - Calculator route at /portal/calculator passing searchParams to CalculatorPage
  - CalculatorPage: all 30 inputs bound to URL via nuqs useQueryState (URL state sharing)
  - InputSlider: DaisyUI range with click-to-edit numeric override and tooltip support
  - ResultsPanel: Year 1 Net Savings + Breakeven headline, expandable sections, contact CTA
  - SavingsBarChart: Recharts ResponsiveContainer BarChart (Year 1 vs Ongoing)
  - SensitivityTable: 4-row adoption sensitivity (25/50/75/90%) with Mandatory adoption badge
  - PdfExportButton: jsPDF dynamic import inside onClick — generates and downloads PDF report
  - Server Actions in src/app/actions/attio.ts using absolute BASE URL

affects:
  - 07-04 (PDF report, homepage teaser — builds on portal shell and calculator)
  - 07-05 (Attio CRM — calculator_run events fire via Server Action established here)

# Tech tracking
tech-stack:
  added:
    - "recharts@^3.x — React 19 compatible bar chart (portal only)"
    - "nuqs@^2.x — type-safe URL search params (NuqsAdapter in portal layout only)"
    - "jspdf@^4.x — client-side PDF generation (dynamic import only)"
  patterns:
    - "NuqsAdapter in portal layout only — NOT root layout (Pitfall 3 from RESEARCH.md)"
    - "Server Actions with absolute BASE URL: const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'"
    - "jsPDF dynamic import inside onClick only: const { jsPDF } = await import('jspdf') — avoids window at module scope"
    - "All recharts imports in 'use client' components — ResizeObserver is browser-only"
    - "Debounced Attio: useRef timeout ID, 500ms delay, fires fireCalculatorRun Server Action"
    - "User email fetched via createClient().auth.getUser() in useEffect on mount"
    - "Conditional render for exactOptionalPropertyTypes: portfolioSize ? <C portfolioSize={v} /> : <C />"

key-files:
  created:
    - src/app/actions/attio.ts
    - src/app/(portal)/portal/PortalLoginTracker.tsx
    - src/app/(portal)/portal/calculator/page.tsx
    - src/components/portal/PortalSidebar.tsx
    - src/components/portal/calculator/CalculatorPage.tsx
    - src/components/portal/calculator/InputSlider.tsx
    - src/components/portal/calculator/ResultsPanel.tsx
    - src/components/portal/calculator/SavingsBarChart.tsx
    - src/components/portal/calculator/SensitivityTable.tsx
    - src/components/portal/calculator/PdfExportButton.tsx
  modified:
    - src/app/(portal)/layout.tsx
    - src/app/(portal)/portal/page.tsx
    - package.json

key-decisions:
  - "NuqsAdapter in portal layout only — adding to root layout breaks marketing URL handling (confirmed Pitfall 3)"
  - "Server Actions use absolute BASE URL via NEXT_PUBLIC_SITE_URL — relative URLs fail server-side with no implicit host"
  - "jsPDF dynamic import inside onClick handler only — module-scope import causes window is not defined at SSR"
  - "SavingsBarChart and all recharts components are 'use client' — ResizeObserver browser-only API"
  - "Interchange uplift shown separately in expandable section — NOT added into headline totalYr1Savings (matches spreadsheet G97 vs G76)"
  - "Recharts Tooltip formatter takes number | undefined due to exactOptionalPropertyTypes — null guard required"
  - "exactOptionalPropertyTypes requires conditional render for optional props: portfolioSize ? <C portfolioSize={v} /> : <C />"

patterns-established:
  - "Portal components in src/components/portal/ — separate from marketing components"
  - "Calculator sub-components in src/components/portal/calculator/ — all Client Components"
  - "Server Actions in src/app/actions/ — keep INTERNAL_API_SECRET server-side only"
  - "Debounced Server Action pattern: useRef for timer ID, clearTimeout + setTimeout on each change"

requirements-completed: [PORT-03, PORT-05, PORT-06]

# Metrics
duration: 32
completed: 2026-02-27
---

# Phase 07 Plan 03: Portal Calculator UI Summary

**Full interactive ROI calculator at /portal/calculator with Recharts bar chart, nuqs URL state sharing, jsPDF report download, and debounced Attio Server Actions — all 30 inputs bound to URL for shareable pre-filled calculations**

## Performance

- **Duration:** 32 min
- **Started:** 2026-02-27T16:18:43Z
- **Completed:** 2026-02-27T16:50:00Z
- **Tasks:** 3
- **Files modified:** 13

## Accomplishments

- Complete portal shell: NuqsAdapter in portal layout (not root), sidebar with active links and sign-out, dashboard with Calculator + Demo CTAs
- CalculatorPage with 30 inputs all URL-synced via nuqs useQueryState (short param keys: da, ca, y1a, oa, dfr, cfr, region, mode + 16 advanced params) — reloading page restores state, URL can be copied/shared
- ResultsPanel shows Year 1 Net Savings ($3.87M at defaults) and Breakeven (23.85 days) as headline, with expandable Fraud Savings / Interchange Uplift / Halo Effect / Implementation Cost sections; "Talk to us about your results" CTA links to /contact with key metrics in URL params
- Bar chart (Recharts), adoption sensitivity table with Mandatory adoption badge, PDF export via jsPDF dynamic import

## Task Commits

Each task was committed atomically:

1. **Task 1: Portal shell, sidebar, dashboard, Server Actions** - `00e6b23` (feat)
2. **Task 2: Calculator route, CalculatorPage, InputSlider, ResultsPanel** - `c08fbe6` (feat)
3. **Task 3: SavingsBarChart, SensitivityTable, PdfExportButton** - `99bf6b8` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/app/actions/attio.ts` - Server Actions for fireCalculatorRun + firePortalLogin with absolute BASE URL
- `src/app/(portal)/layout.tsx` - Portal shell with NuqsAdapter + PortalSidebar (NOT root layout)
- `src/app/(portal)/portal/page.tsx` - Dashboard: welcome card with Calculator + Demo CTAs
- `src/app/(portal)/portal/PortalLoginTracker.tsx` - Client component firing portal_login event on mount
- `src/app/(portal)/portal/calculator/page.tsx` - Server Component calculator route with searchParams passthrough
- `src/components/portal/PortalSidebar.tsx` - Left sidebar: active links, user email, sign-out via Supabase
- `src/components/portal/calculator/CalculatorPage.tsx` - Main orchestrator: 30 nuqs bindings, calculate() via useMemo, debounced Attio
- `src/components/portal/calculator/InputSlider.tsx` - DaisyUI range with click-to-edit numeric override, tooltip
- `src/components/portal/calculator/ResultsPanel.tsx` - Headline metrics, expandable sections, contact CTA
- `src/components/portal/calculator/SavingsBarChart.tsx` - Recharts BarChart Year 1 vs Ongoing ('use client')
- `src/components/portal/calculator/SensitivityTable.tsx` - 4-row sensitivity table with Mandatory adoption badge
- `src/components/portal/calculator/PdfExportButton.tsx` - jsPDF dynamic import download button
- `package.json` - Added recharts, nuqs, jspdf

## Decisions Made

- **NuqsAdapter portal-only:** Confirmed Pitfall 3 — adding to root layout would affect marketing site URL handling. Added to `src/app/(portal)/layout.tsx` only.
- **Absolute BASE URL in Server Actions:** Server Actions run server-side where relative URLs throw a network error. `const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'` pattern established.
- **jsPDF dynamic import inside onClick only:** Module-scope import causes `window is not defined` during SSR. The dynamic import pattern defers `window` access to browser-only execution.
- **Interchange uplift shown separately:** Matches spreadsheet structure where G76/G77 (interchange) is a separate dashboard metric from G97/G98 (net savings). Not added into headline totalYr1Savings.
- **Conditional render for exactOptionalPropertyTypes:** TypeScript's `exactOptionalPropertyTypes: true` means `string | undefined` cannot be assigned to `string?` — must use `portfolioSize ? <C portfolioSize={v} /> : <C />`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] exactOptionalPropertyTypes error on portfolioSize prop in calculator page**
- **Found during:** Task 2 (build verification)
- **Issue:** `Type 'string | undefined' is not assignable to type 'string'` with `exactOptionalPropertyTypes: true` in tsconfig.json. The plan's approach of passing `portfolioSize={portfolioSize}` where portfolioSize could be undefined fails TypeScript's stricter optional property type checking.
- **Fix:** Changed to conditional render: `portfolioSize ? <CalculatorPage portfolioSize={portfolioSize} /> : <CalculatorPage />`
- **Files modified:** `src/app/(portal)/portal/calculator/page.tsx`
- **Verification:** Build TypeScript check passes
- **Committed in:** `c08fbe6` (Task 2 commit)

**2. [Rule 1 - Bug] Recharts Tooltip formatter type requires number | undefined not just number**
- **Found during:** Task 3 (build verification)
- **Issue:** `Type '(v: number) => [string, "Net Savings"]' is not assignable to type 'Formatter<number, "Net Savings">'` — with `exactOptionalPropertyTypes: true`, Recharts Formatter type parameter is `number | undefined`, not just `number`.
- **Fix:** Changed `(v: number) =>` to `(v: number | undefined) =>` with null guard `v != null ? ... : '—'`
- **Files modified:** `src/components/portal/calculator/SavingsBarChart.tsx`
- **Verification:** Build TypeScript check passes
- **Committed in:** `99bf6b8` (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (2 Rule 1 bugs — both triggered by `exactOptionalPropertyTypes: true` strict TypeScript config)
**Impact on plan:** Both fixes essential for TypeScript compilation. No scope creep. The pattern established (conditional render for optional props; null guard in recharts formatters) applies to all future portal components.

## Issues Encountered

None beyond the auto-fixed deviations above.

## Next Phase Readiness

- Portal calculator fully operational at /portal/calculator
- All 30 inputs URL-synced — shareable links work immediately
- Attio Server Actions established — Plan 07-05 can fire calculator_run events without any additional plumbing
- Plan 07-04 (homepage teaser + contact form wiring) can import PortalLoginTracker pattern and use the portal shell
- NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be added to Netlify Dashboard before portal auth works in production (documented in 07-01 summary)

## Self-Check: PASSED

All created files verified present:
- FOUND: `src/app/actions/attio.ts`
- FOUND: `src/app/(portal)/layout.tsx`
- FOUND: `src/app/(portal)/portal/page.tsx`
- FOUND: `src/app/(portal)/portal/PortalLoginTracker.tsx`
- FOUND: `src/app/(portal)/portal/calculator/page.tsx`
- FOUND: `src/components/portal/PortalSidebar.tsx`
- FOUND: `src/components/portal/calculator/CalculatorPage.tsx`
- FOUND: `src/components/portal/calculator/InputSlider.tsx`
- FOUND: `src/components/portal/calculator/ResultsPanel.tsx`
- FOUND: `src/components/portal/calculator/SavingsBarChart.tsx`
- FOUND: `src/components/portal/calculator/SensitivityTable.tsx`
- FOUND: `src/components/portal/calculator/PdfExportButton.tsx`

All commits verified:
- FOUND: `00e6b23` — feat(07-03): portal shell layout, sidebar, dashboard, and Server Actions
- FOUND: `c08fbe6` — feat(07-03): calculator route, CalculatorPage, InputSlider, ResultsPanel
- FOUND: `99bf6b8` — feat(07-03): SavingsBarChart, SensitivityTable, PdfExportButton

---
*Phase: 07-add-value-calculators-to-the-portal*
*Completed: 2026-02-27*
