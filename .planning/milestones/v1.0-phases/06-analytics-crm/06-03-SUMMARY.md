---
phase: 06-analytics-crm
plan: "03"
subsystem: analytics
tags: [posthog, forms, cta-tracking, event-instrumentation, client-components]

# Dependency graph
requires:
  - phase: 06-01
    provides: /api/submit/demo-request and /api/submit/contact-request intermediate route handlers
  - phase: 06-02
    provides: PostHogProvider and usePostHog() hook wired into root layout

provides:
  - DemoFormSection: POST JSON to /api/submit/demo-request; form_start + demo_request + posthog.identify events
  - ContactFormSection: POST JSON to /api/submit/contact-request; contact_request + posthog.identify events
  - ContactCalendlyButton: calendly_open event fires before Calendly popup
  - HeroSection: cta_click {source: hero} on Request Demo
  - UrgencySection: cta_click {source: urgency} on demo link; {source: calculator} on portfolio link
  - SvHeroSection: cta_click {source: product-page} on Request Demo

affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - usePostHog() hook with optional chaining (posthog?.capture) — guards against undefined in SSR/no-init state
    - form_start deduplication via formStarted boolean state — fires once on first keystroke only
    - fetch POST JSON pattern — replaces x-www-form-urlencoded direct-to-Netlify with intermediate API route
    - Server-to-Client component conversion — 'use client' + usePostHog() added to three previously server-only sections

key-files:
  created: []
  modified:
    - src/components/marketing/home/DemoFormSection.tsx
    - src/components/marketing/contact/ContactFormSection.tsx
    - src/components/marketing/contact/ContactCalendlyButton.tsx
    - src/components/marketing/home/HeroSection.tsx
    - src/components/marketing/home/UrgencySection.tsx
    - src/components/marketing/safe-verify/SvHeroSection.tsx

key-decisions:
  - "SvBenefitsSection: no changes — confirmed content-only section with no CTA links after reading current file"
  - "form_start fires on onKeyDown of name Input — Input component uses forwardRef with ...props spread, accepts onKeyDown directly without wrapper div"
  - "HeroSection, UrgencySection, SvHeroSection converted from Server to Client Components — required for usePostHog() hook"
  - "posthog?.capture optional chaining used throughout — guards against undefined when NEXT_PUBLIC_POSTHOG_KEY is absent"

requirements-completed:
  - ANLT-01
  - ANLT-02

# Metrics
duration: 4min
completed: 2026-02-23
---

# Phase 06 Plan 03: Form Wiring and Event Instrumentation Summary

**Full PostHog funnel wired: both form components now POST JSON to intermediate API routes (Attio signals server-side), firing form_start + submission events + posthog.identify; all CTA buttons across homepage and /safe-verify emit cta_click with correct source properties**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-23T09:37:25Z
- **Completed:** 2026-02-23T09:41:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- DemoFormSection refactored: POST JSON to /api/submit/demo-request (was /__forms.html); fires form_start on first name-field keystroke (deduplicated); fires demo_request + posthog.identify on success
- ContactFormSection refactored: POST JSON to /api/submit/contact-request; fires contact_request + posthog.identify on success; useMemo/useSearchParams pattern preserved per Phase 05-02 locked decision
- ContactCalendlyButton: fires calendly_open event before opening Calendly popup
- HeroSection, UrgencySection, SvHeroSection: converted from Server to Client Components to enable usePostHog(); all cta_click events fire with correct source properties
- SvBenefitsSection: confirmed content-only (no CTA links) — no changes needed
- TypeScript strict mode, ESLint, and full production build all pass clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Refactor DemoFormSection and ContactFormSection** - `92fe4f2` (feat)
2. **Task 2: Add cta_click events to CTA buttons + calendly_open to Calendly button** - `110145c` (feat)

## Files Created/Modified

- `src/components/marketing/home/DemoFormSection.tsx` — usePostHog, JSON POST to /api/submit/demo-request, form_start + demo_request + identify
- `src/components/marketing/contact/ContactFormSection.tsx` — usePostHog, JSON POST to /api/submit/contact-request, contact_request + identify
- `src/components/marketing/contact/ContactCalendlyButton.tsx` — usePostHog, calendly_open before popup
- `src/components/marketing/home/HeroSection.tsx` — 'use client', cta_click {source: hero}
- `src/components/marketing/home/UrgencySection.tsx` — 'use client', cta_click {source: urgency} + {source: calculator}
- `src/components/marketing/safe-verify/SvHeroSection.tsx` — 'use client', cta_click {source: product-page}

## Decisions Made

- SvBenefitsSection has no CTA links — confirmed by reading file before writing; no changes made
- Input component accepts onKeyDown directly (uses forwardRef + ...props spread) — no wrapper div needed
- Three server components (HeroSection, UrgencySection, SvHeroSection) converted to client components — required for usePostHog() hook; no RSC benefits were being exploited by these components
- Optional chaining on all posthog?.capture() calls — guards against undefined when PostHog key is absent

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript, ESLint, and production build all passed on first attempt across all six modified files.

---
*Phase: 06-analytics-crm*
*Completed: 2026-02-23*

## Self-Check: PASSED

- FOUND: src/components/marketing/home/DemoFormSection.tsx
- FOUND: src/components/marketing/contact/ContactFormSection.tsx
- FOUND: src/components/marketing/contact/ContactCalendlyButton.tsx
- FOUND: src/components/marketing/home/HeroSection.tsx
- FOUND: src/components/marketing/home/UrgencySection.tsx
- FOUND: src/components/marketing/safe-verify/SvHeroSection.tsx
- FOUND: .planning/phases/06-analytics-crm/06-03-SUMMARY.md
- FOUND commit: 92fe4f2 (Task 1)
- FOUND commit: 110145c (Task 2)
