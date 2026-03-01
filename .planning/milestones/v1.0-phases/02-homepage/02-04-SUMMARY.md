---
phase: 02-homepage
plan: "04"
subsystem: ui
tags: [react, nextjs, daisyui, netlify-forms, forms, tailwind]

# Dependency graph
requires:
  - phase: 02-01
    provides: DemoFormSection stub, Button component, ui barrel export
provides:
  - DemoFormSection Client Component with Netlify Forms submission and inline success/error state
  - Input.tsx updated to DaisyUI v5 fieldset/fieldset-legend pattern
  - Textarea.tsx new DaisyUI v5 component
  - public/__forms.html for Netlify build-time form detection
affects: [03-portal, future-phases-using-forms]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "DaisyUI v5 form fields use fieldset/fieldset-legend — not form-control/label-text"
    - "Netlify Forms static detection via public/__forms.html with matching field names"
    - "Client Components use 'use client' and fetch POST to /__forms.html with application/x-www-form-urlencoded"

key-files:
  created:
    - src/components/ui/Textarea.tsx
    - public/__forms.html
  modified:
    - src/components/ui/Input.tsx
    - src/components/ui/index.ts
    - src/components/marketing/home/DemoFormSection.tsx

key-decisions:
  - "DaisyUI v5 fieldset/fieldset-legend pattern for all form field components — no form-control or label-text"
  - "Portfolio calculator link (deep-link to /portal/calculator) placed below form as standalone link, not as a form field"

patterns-established:
  - "Form field pattern: fieldset wraps legend + input/textarea + optional p.label for error/helpText"
  - "Netlify Forms SPA pattern: static __forms.html for detection, fetch POST in Client Component handleSubmit"

requirements-completed: [HOME-07]

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 2 Plan 04: Demo Form Section Summary

**Netlify Forms-wired demo request form with six fields, DaisyUI v5 fieldset components (Input + new Textarea), inline success/error state, and portfolio calculator deep-link**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T11:27:08Z
- **Completed:** 2026-02-20T11:29:12Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Updated Input.tsx to DaisyUI v5 fieldset/fieldset-legend pattern, removing all v4-only form-control and label-text classes
- Created Textarea.tsx with same DaisyUI v5 pattern; added to ui barrel export
- Created public/__forms.html with exact field name parity for Netlify build-time form detection
- Built full DemoFormSection Client Component: six fields, Netlify Forms fetch POST submission, inline success state ("Thanks — we'll be in touch"), inline error state, id="demo" for smooth-scroll CTAs, and portfolio calculator deep-link below form

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix Input.tsx to DaisyUI v5, create Textarea.tsx, create public/__forms.html** - `928d3c8` (feat)
2. **Task 2: Build DemoFormSection — Netlify Forms submission with inline success state** - `60beb99` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified
- `src/components/ui/Input.tsx` - Updated to DaisyUI v5 fieldset/fieldset-legend; removed form-control, label-text, label-text-alt
- `src/components/ui/Textarea.tsx` - New DaisyUI v5 textarea component with fieldset/fieldset-legend/textarea pattern
- `src/components/ui/index.ts` - Added Textarea to barrel export
- `public/__forms.html` - Netlify build-time static form detection; six fields matching React form exactly
- `src/components/marketing/home/DemoFormSection.tsx` - Full Client Component with 'use client', id="demo", Netlify Forms POST, success/error inline state, portfolio deep-link

## Decisions Made
- DaisyUI v5 fieldset/fieldset-legend pattern for Input.tsx and Textarea.tsx — consistent with v5 spec; eliminates deprecated classes
- Portfolio calculator link placed below the form (outside `<form>` element) as specified in CONTEXT.md locked decision

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

**External services require manual configuration.** The Netlify Forms integration requires enabling form detection in the Netlify dashboard before submissions appear:

1. Go to Netlify dashboard → Site settings → Forms
2. Enable form detection (if not already active)
3. After first deploy, form "demo-request" should appear in Forms tab

Note: In local development, the POST to /__forms.html returns 404 (no Netlify runtime). The error state renders correctly. This is expected behaviour.

## Next Phase Readiness
- All homepage sections are now complete (plans 02-01 through 02-04)
- Phase 02 homepage is fully implemented: Hero, Audiences, How It Works, Urgency, Proof, Human Cost, Demo Form
- All "Request Demo" CTAs throughout the page smooth-scroll to #demo via the section id
- Ready to proceed to Phase 03 (Portal) or any remaining phase work
- Netlify Forms will activate on first production deploy with form detection enabled

---
*Phase: 02-homepage*
*Completed: 2026-02-20*
