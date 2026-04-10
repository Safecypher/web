# Quick Task 260410-ity: Summary

**Task:** Multi-event save the date page with query param pre-selection
**Date:** 2026-04-10
**Status:** Complete

## What was done

### Task 1 — Refactor SaveTheDateSection for multiple events

Updated `src/components/marketing/save-the-date/SaveTheDateSection.tsx`:
- Defined a `EVENTS` const array with two entries: `UK` (London) and `CA` (Toronto, Canada)
- Added event selector buttons (active/outline toggle) above the form
- Reads `?e=` query param via `useSearchParams` to pre-select an event on load
- Defaults to `UK` if param is absent or unrecognised
- Dynamic page title updates to reflect selected event
- Selected event included in the form POST payload

### Task 2 — Suspense wrapper + API update

Updated `src/app/(marketing)/save-the-date/page.tsx`:
- Wrapped `SaveTheDateSection` in `<Suspense>` (required because `useSearchParams` is used)
- Updated metadata description to mention both London and Canada events

Updated `src/app/api/submit/event-interest/route.ts`:
- Accepts optional `event` field in request body
- Forwards `event` to Netlify Forms
- Forwards `eventId` to Attio event payload
- Backward compatible (event field is optional)

## Files changed

- `src/components/marketing/save-the-date/SaveTheDateSection.tsx`
- `src/app/(marketing)/save-the-date/page.tsx`
- `src/app/api/submit/event-interest/route.ts`
