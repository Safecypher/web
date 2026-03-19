---
phase: 260319-hg2
plan: 01
subsystem: marketing-pages
tags: [event, landing-page, form, attio, netlify-forms]
dependency_graph:
  requires: []
  provides: [save-the-date-route, event-interest-api]
  affects: [attio-crm, netlify-forms]
tech_stack:
  added: []
  patterns: [contact-request-route-pattern, fieldset-form-pattern]
key_files:
  created:
    - src/app/(marketing)/save-the-date/page.tsx
    - src/components/marketing/save-the-date/SaveTheDateSection.tsx
    - src/app/api/submit/event-interest/route.ts
  modified:
    - public/__forms.html
decisions:
  - "SaveTheDateSection uses no PostHog capture — event interest page is pre-login, CRM signal via Attio is sufficient"
  - "Success/error state managed via local useState only — no URL state needed for single-purpose landing page"
metrics:
  duration: 2 min
  completed: 2026-03-19
  tasks: 2
  files: 4
---

# Quick Task 260319-hg2: Event Save-the-Date Landing Page Summary

**One-liner:** Name + email event-interest landing page at /save-the-date with Netlify Forms capture and Attio event_interest CRM event.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | API route — event-interest submission handler | 333261a | src/app/api/submit/event-interest/route.ts, public/__forms.html |
| 2 | Page and form component — /save-the-date | 041f1c6 | src/app/(marketing)/save-the-date/page.tsx, src/components/marketing/save-the-date/SaveTheDateSection.tsx |

## What Was Built

A `/save-the-date` marketing page for the HG2 Payments Innovation Summit. The page is served by the `(marketing)` route group, so Nav and Footer are automatic.

**Route:** `/save-the-date` (static, prerendered)

**Page structure:**
- Small eyebrow "Save the Date" label
- H1: "HG2 Payments Innovation Summit"
- Description paragraph
- Horizontal divider
- Two-field form (Full Name + Email Address) with Register Interest button

**Form submission flow:**
1. Client POSTs `{ name, email }` to `/api/submit/event-interest`
2. API route forwards to Netlify Forms via `/__forms.html` (email notification)
3. API route fires `event_interest` Attio event server-to-server (upserts contact + creates note)
4. Client shows success confirmation or error alert

**Netlify form registration:** `event-interest` form added to `public/__forms.html` alongside existing `demo-request` and `contact-request` forms.

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check

- [x] `src/app/(marketing)/save-the-date/page.tsx` exists
- [x] `src/components/marketing/save-the-date/SaveTheDateSection.tsx` exists
- [x] `src/app/api/submit/event-interest/route.ts` exists
- [x] `public/__forms.html` contains event-interest form
- [x] `/save-the-date` appears in build output as static route
- [x] Build passes clean
- [x] Lint passes with no errors
- [x] Commits 333261a and 041f1c6 exist

## Self-Check: PASSED
