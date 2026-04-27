---
phase: quick-260427-mh1
plan: "01"
subsystem: api
tags: [attio, crm, save-the-date, bug-fix]
dependency_graph:
  requires: []
  provides: [correct-attio-list-routing-for-save-the-date]
  affects: [src/app/api/attio/event/route.ts]
tech_stack:
  added: []
  patterns: [eventId-to-list-UUID map, payload shape fix]
key_files:
  modified:
    - src/app/api/attio/event/route.ts
decisions:
  - "EVENT_LISTS map keyed by eventId string — UK and CA present, UK2 omitted (no list yet)"
  - "parent_object: 'people' added to list entry payload as required by Attio API"
  - "Old body.event === 'event_interest' condition replaced entirely by eventId-based lookup"
metrics:
  duration: "5 min"
  completed: "2026-04-27"
  tasks: 1
  files: 1
---

# Phase quick-260427-mh1 Plan 01: Fix Attio List Entry for Save-the-Date Summary

**One-liner:** Fixed two bugs in Attio event handler — eventId-based list routing replaces broken event-name condition, and missing `parent_object` field added to list entry payload.

## What Was Built

Two targeted fixes to `src/app/api/attio/event/route.ts`:

1. **EVENT_LISTS constant** added after the `AttioEventBody` type, mapping `eventId` strings to Attio list UUIDs. UK and CA are mapped; UK2 is intentionally omitted so those registrants are silently skipped.

2. **Step 3 replacement** — the old `if (body.event === 'event_interest')` block checked the wrong field with a hardcoded UUID. Replaced with lookup of `body.eventId` in `EVENT_LISTS`, with the corrected payload shape that includes `parent_object: 'people'` (required by the Attio API).

## Task Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix list routing and payload in Attio event handler | 883bcc5 | src/app/api/attio/event/route.ts |

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npm run lint` passed (no errors on the changed file)
- `npm run build` passed cleanly (BUILD_EXIT:0, all 21 pages generated)
- `parent_object: 'people'` confirmed present in list entry payload
- `EVENT_LISTS` map confirmed present with UK and CA entries
- No reference to old hardcoded list UUID outside the map

## Self-Check: PASSED

- File modified: src/app/api/attio/event/route.ts — confirmed
- Commit 883bcc5 exists in git log — confirmed
