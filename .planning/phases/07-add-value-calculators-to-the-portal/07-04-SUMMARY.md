---
phase: 07-add-value-calculators-to-the-portal
plan: "04"
subsystem: ui
tags: [portal, attio, server-actions, supabase, homepage, contact-form, iframe]

# Dependency graph
requires:
  - phase: 07-01
    provides: Supabase auth client factory (createClient), portal route group structure
  - phase: 07-03
    provides: Server Actions in attio.ts with absolute BASE URL, portal shell layout, PortalLoginTracker pattern

provides:
  - /portal/demo page with iframe showing BoA agentic banking mockup + context panel card
  - DemoPageTracker client island firing fireMockupViewed Server Action on mount
  - fireMockupViewed function added to src/app/actions/attio.ts using absolute BASE URL
  - BoA demo HTML and images copied to public/demos/boa/ for iframe serving
  - Homepage DemoFormSection teaser form: number input + "See your savings" button
  - Full funnel: homepage teaser -> /portal/login?callbackUrl=/portal/calculator?portfolioSize=VALUE
  - ContactFormSection calculator results summary box (yr1/breakeven params from URL)

affects:
  - 07-05 (Attio CRM — mockup_viewed event now fires when /portal/demo visited)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component page.tsx + Client Component island: metadata exported from Server Component, client logic in separate 'use client' file — metadata cannot be exported from 'use client' components"
    - "fireMockupViewed uses absolute BASE URL: ${BASE}/api/attio/event (consistent with fireCalculatorRun/firePortalLogin pattern)"
    - "Homepage teaser form uses window.location.href for imperative redirect — avoids router.push limitations with deeply nested callbackUrl encoding"

key-files:
  created:
    - src/app/(portal)/portal/demo/page.tsx
    - src/app/(portal)/portal/demo/DemoPageTracker.tsx
    - public/demos/boa/bofa-agentic-banking-mockup.html
    - public/demos/boa/BoA-app-header.png
    - public/demos/boa/BoA-app-footer.png
  modified:
    - src/app/actions/attio.ts
    - src/components/marketing/home/DemoFormSection.tsx
    - src/components/marketing/contact/ContactFormSection.tsx

key-decisions:
  - "DemoPageTracker split into separate 'use client' file — metadata export and 'use client' directive cannot coexist in same module (Next.js build error)"
  - "BoA demo HTML copied to public/demos/boa/ with images — relative img src paths in HTML require co-located assets, not flat public/ root"
  - "Homepage teaser uses window.location.href not next/navigation router — simple imperative redirect works correctly with doubly-encoded callbackUrl"
  - "Calculator results summary box positioned inside <form> element before hidden input — display-only, does not affect form submission"

patterns-established:
  - "Client Component islands: when page needs both metadata and client behaviour, keep metadata in Server Component page.tsx and extract client logic to Foo.tsx with 'use client'"

requirements-completed: [PORT-07, PORT-08, HOME-07]

# Metrics
duration: 15
completed: 2026-02-27
---

# Phase 07 Plan 04: Portal Funnel Completion Summary

**Portal funnel completed: /portal/demo with BoA agentic mockup iframe and fireMockupViewed Server Action; homepage teaser form redirecting to /portal/login?callbackUrl with portfolioSize; contact form showing calculator results summary when linked from calculator CTA**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-02-27T17:05:00Z
- **Completed:** 2026-02-27T17:20:50Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- /portal/demo renders two-column layout (iframe + context panel) with BoA agentic banking mockup HTML served from public/demos/boa/; DemoPageTracker client island fires mockup_viewed Attio event on mount
- fireMockupViewed Server Action added to attio.ts with absolute BASE URL pattern — consistent with fireCalculatorRun and firePortalLogin
- Homepage DemoFormSection "link-only placeholder" replaced with number input + "See your savings" button; submitting redirects to /portal/login?callbackUrl=%2Fportal%2Fcalculator%3FportfolioSize%3DVALUE
- ContactFormSection reads yr1 and breakeven URL params from calculator CTA and shows "Your calculator results" summary box when source=calculator and yr1 is present

## Task Commits

Each task was committed atomically:

1. **Task 1: Agentic demo page and fireMockupViewed Server Action** - `fc9c5e7` (feat)
2. **Task 2: Homepage teaser widget and contact form calculator results display** - `4178d40` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/app/(portal)/portal/demo/page.tsx` - Server Component demo page with iframe + context panel; imports DemoPageTracker
- `src/app/(portal)/portal/demo/DemoPageTracker.tsx` - Client Component island: fires fireMockupViewed on mount via Supabase getUser()
- `src/app/actions/attio.ts` - Added fireMockupViewed using absolute BASE URL (consistent with existing pattern)
- `public/demos/boa/bofa-agentic-banking-mockup.html` - BoA agentic banking mockup HTML (copied from dist/demos/boa/)
- `public/demos/boa/BoA-app-header.png` - BoA header image (co-located with HTML for relative src paths)
- `public/demos/boa/BoA-app-footer.png` - BoA footer image (co-located with HTML for relative src paths)
- `src/components/marketing/home/DemoFormSection.tsx` - Added portfolioSize state + handleTeaserSubmit; replaced Link with teaser form (number input + button)
- `src/components/marketing/contact/ContactFormSection.tsx` - Added yr1/breakeven param reading + calculator results summary box display

## Decisions Made

- **DemoPageTracker split into separate file:** Next.js throws a build error when `metadata` is exported from a module with `'use client'`. The solution is to keep `page.tsx` as a Server Component (exporting metadata), and extract the client event tracking to `DemoPageTracker.tsx` with `'use client'`. This pattern is the standard App Router approach for mixing metadata with client islands.
- **BoA demo files in public/demos/boa/:** The HTML file references `BoA-app-header.png` and `BoA-app-footer.png` with relative paths. Placing all three files in the same directory under `public/` ensures the relative src attributes resolve correctly when the HTML is served by the Next.js static file server.
- **window.location.href for teaser redirect:** The doubly-encoded callbackUrl (`/portal/login?callbackUrl=%2Fportal%2Fcalculator%3FportfolioSize%3D1000000`) works reliably with `window.location.href`. The Next.js router `push()` can sometimes decode encoded characters in search params.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Cannot export metadata from 'use client' component**
- **Found during:** Task 1 (build verification)
- **Issue:** The plan specified `DemoPageTracker` as a component in the same file as `page.tsx`, with the page marked `'use client'`. Next.js 16 throws a build error: "You are attempting to export 'metadata' from a component marked with 'use client', which is disallowed."
- **Fix:** Split DemoPageTracker into a separate file `DemoPageTracker.tsx` with `'use client'`. The `page.tsx` remains a Server Component and exports metadata. This is the standard App Router pattern for mixing metadata with client islands.
- **Files modified:** Created `src/app/(portal)/portal/demo/DemoPageTracker.tsx`, updated `src/app/(portal)/portal/demo/page.tsx`
- **Verification:** Build passes; /portal/demo listed as static route in build output
- **Committed in:** `fc9c5e7` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 Rule 1 bug — metadata/use-client conflict)
**Impact on plan:** Essential fix for TypeScript/Next.js correctness. The split-file approach is actually more architecturally clean. No scope creep.

## Issues Encountered

None beyond the auto-fixed deviation above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Full conversion funnel is now connected: homepage teaser -> /portal/login -> /portal/calculator?portfolioSize=VALUE -> pre-filled calculator -> contact CTA with results in URL -> ContactFormSection shows summary box
- /portal/demo live with BoA agentic mockup and Attio tracking
- Plan 07-05 (Attio CRM refinements) can fire all three events: calculator_run, portal_login, mockup_viewed — all Server Actions established

## Self-Check: PASSED

All created files verified present:
- FOUND: `src/app/(portal)/portal/demo/page.tsx`
- FOUND: `src/app/(portal)/portal/demo/DemoPageTracker.tsx`
- FOUND: `src/app/actions/attio.ts`
- FOUND: `public/demos/boa/bofa-agentic-banking-mockup.html`
- FOUND: `public/demos/boa/BoA-app-header.png`
- FOUND: `public/demos/boa/BoA-app-footer.png`
- FOUND: `src/components/marketing/home/DemoFormSection.tsx`
- FOUND: `src/components/marketing/contact/ContactFormSection.tsx`

All commits verified:
- FOUND: `fc9c5e7` — feat(07-04): agentic demo page and fireMockupViewed Server Action
- FOUND: `4178d40` — feat(07-04): homepage teaser widget and contact form calculator results display

---
*Phase: 07-add-value-calculators-to-the-portal*
*Completed: 2026-02-27*
