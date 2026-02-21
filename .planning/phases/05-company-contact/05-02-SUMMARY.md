---
phase: 05-company-contact
plan: "02"
subsystem: ui
tags: [react, next.js, netlify-forms, calendly, react-calendly, useSearchParams, sessionStorage]

# Dependency graph
requires:
  - phase: 02-homepage
    provides: DemoFormSection pattern — Netlify form submission, Input/Textarea/Button UI components
  - phase: 01-foundation
    provides: UI component library (Input, Textarea, Button), app routing structure

provides:
  - /contact route with source-aware Netlify contact form (contact-request)
  - ContactFormSection client component with ?from= URL param + sessionStorage persistence
  - ContactCalendlyButton using react-calendly PopupWidget
  - Netlify form registration for contact-request in public/__forms.html

affects: [phase-06, sales-funnel, /platform CTA, /safe-verify CTA, /dynamic-security-codes CTA]

# Tech tracking
tech-stack:
  added: [react-calendly]
  patterns:
    - useMemo for derived state from useSearchParams (avoids setState-in-effect ESLint violation)
    - sessionStorage write via useEffect only (external system sync, no setState in effect)
    - Suspense boundary around useSearchParams components in Server Component pages
    - Netlify static form registration in public/__forms.html (build-time detection)

key-files:
  created:
    - src/components/marketing/contact/ContactCalendlyButton.tsx
    - src/components/marketing/contact/ContactFormSection.tsx
    - src/app/(marketing)/contact/page.tsx
  modified:
    - public/__forms.html

key-decisions:
  - "useMemo (not useState+useEffect) for source derived from useSearchParams — eliminates react-hooks/set-state-in-effect ESLint violation while keeping reactivity"
  - "react-calendly PopupWidget with placeholder CALENDLY_URL constant at module scope — real URL is a content substitution post-deployment"
  - "Contact form fields: name, role, company, email, message (no phone field unlike demo-request; message instead of challenge)"

patterns-established:
  - "Pattern: Derive client-only state from searchParams using useMemo, not useState+useEffect"
  - "Pattern: useEffect for sessionStorage write only (external system sync) — satisfies react-hooks/set-state-in-effect rule"

requirements-completed: [CONT-01, CONT-02, CONT-03]

# Metrics
duration: 16min
completed: 2026-02-21
---

# Phase 05 Plan 02: Contact Page Summary

**Source-aware /contact page with Netlify form (contact-request), Calendly PopupWidget via react-calendly, and ?from= URL param + sessionStorage persistence for heading/button copy**

## Performance

- **Duration:** 16 min
- **Started:** 2026-02-21T11:32:56Z
- **Completed:** 2026-02-21T11:49:11Z
- **Tasks:** 2
- **Files modified:** 4 (3 created, 1 updated)

## Accomplishments

- Built `ContactCalendlyButton` using `react-calendly` PopupWidget — gracefully falls back on `document.body` when `__next` root element absent
- Built `ContactFormSection` with full source-awareness: `?from=calculator` shows "Talk to us about your results"; `?from=product` and default show "Request a demo"; sessionStorage persists the source within the session
- Added `/contact` Server Component page with `metadata` export and mandatory `Suspense` boundary wrapping `ContactFormSection` (required by Next.js 16 App Router for `useSearchParams`)
- Registered `contact-request` Netlify form in `public/__forms.html` with matching field names: `name`, `role`, `company`, `email`, `message`

## Task Commits

Each task was committed atomically:

1. **Task 1: Install react-calendly, build ContactCalendlyButton, update __forms.html** - `21a3779` (feat)
2. **Task 2: Build ContactFormSection and contact/page.tsx** - `92b5609` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `src/components/marketing/contact/ContactCalendlyButton.tsx` — Calendly PopupWidget, placeholder URL with TODO comment
- `src/components/marketing/contact/ContactFormSection.tsx` — Source-aware form, Netlify POST, sessionStorage, Calendly button in right column
- `src/app/(marketing)/contact/page.tsx` — Server Component shell with metadata + Suspense
- `public/__forms.html` — Added contact-request form with name/role/company/email/message fields

## Decisions Made

- **useMemo over useState+useEffect for source derivation** — The `react-hooks/set-state-in-effect` ESLint rule (from `eslint-config-next`) blocks any `setState` inside `useEffect` bodies. Using `useMemo` to derive source from `useSearchParams()` during render is the correct pattern: reactive, lint-clean, no extra renders.
- **react-calendly PopupWidget (primary approach)** — Peer deps confirmed compatible with React 19 (`>=16.8.0`). No `--legacy-peer-deps` needed.
- **Placeholder CALENDLY_URL at module scope** — Marked with TODO comment; switching to a real booking URL requires a one-line content edit, not a structural code change.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] react-hooks/set-state-in-effect ESLint violation — source detection pattern**
- **Found during:** Task 2 (ContactFormSection implementation)
- **Issue:** The plan's `useEffect(() => { setSource(param) }, [searchParams])` pattern directly calls `setState` inside an effect body, which `eslint-config-next`'s `react-hooks/set-state-in-effect` rule blocks as an error.
- **Fix:** Replaced `useState<Source>` + `useEffect` with `useMemo<Source>` computing source directly from `searchParams.get('from')` and sessionStorage during render. A separate `useEffect` writes to sessionStorage only (external system sync — no setState). This satisfies the linter, maintains reactivity, and preserves sessionStorage persistence.
- **Files modified:** `src/components/marketing/contact/ContactFormSection.tsx`
- **Verification:** `npm run lint` passes clean (0 errors, 0 warnings)
- **Committed in:** `92b5609` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Fix required for lint to pass. No functional scope change — source detection and sessionStorage persistence work identically.

## Issues Encountered

- `react-hooks/set-state-in-effect` rule required two fix iterations to resolve: first attempt used `useRef` guard + `setSource` in effect (still blocked), second attempt eliminated the state variable entirely using `useMemo` (lint-clean).

## User Setup Required

**External services require manual configuration:**

- **Calendly booking URL** — The `CALENDLY_URL` constant in `ContactCalendlyButton.tsx` is set to `https://calendly.com/safecypher/30min` (placeholder). After deployment, replace this with the real Calendly booking link. This is a one-line code change in `src/components/marketing/contact/ContactCalendlyButton.tsx`.

## Next Phase Readiness

- Phase 05 (Company + Contact) is now complete — /company and /contact both live.
- Phase 06 can proceed; all marketing pages are built.
- The Calendly URL substitution is a content task, not a code task — can be done at any time.

## Self-Check: PASSED

All files verified present on disk. All task commits verified in git log.

---
*Phase: 05-company-contact*
*Completed: 2026-02-21*
