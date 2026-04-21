---
phase: quick-260421-pgg
plan: "01"
subsystem: save-the-date
tags: [event, save-the-date, marketing]
dependency_graph:
  requires: []
  provides: [UK2 event entry in EVENTS array]
  affects: [/save-the-date page, ?e=UK2 query param]
tech_stack:
  added: []
  patterns: [as const EVENTS array for type-safe event config]
key_files:
  created: []
  modified:
    - src/components/marketing/save-the-date/SaveTheDateSection.tsx
decisions:
  - UK2 inserted between UK and CA — preserves intended tab ordering (April → June → Canada)
metrics:
  duration: "2 min"
  completed: "2026-04-21"
  tasks_completed: 1
  files_modified: 1
---

# Phase quick-260421-pgg Plan 01: Add UK2 June London Event Summary

**One-liner:** Added second London event (UK2, 16 June 2026, The Treehouse Hotel) to EVENTS array, enabling ?e=UK2 query param pre-selection.

## What Was Done

Inserted a UK2 entry into the `EVENTS` array in `SaveTheDateSection.tsx` between the existing UK (April) and CA (Canada) entries. The new event shares the same venue as the April event but with date "Tuesday 16 June 2026" and id `'UK2'`.

No other code changes were needed — the existing `EVENTS.find(ev => ev.id === eParam)` logic in `useState` initialiser automatically covers the new entry, so `?e=UK2` pre-selects it on load. The selector buttons, details card, and form submission payload all derive dynamically from the array.

## Tasks Completed

| # | Task | Commit | Files Modified |
|---|------|--------|---------------|
| 1 | Add UK2 June London event to EVENTS array | d8db8a5 | SaveTheDateSection.tsx |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `src/components/marketing/save-the-date/SaveTheDateSection.tsx` — modified, contains `id: 'UK2'`
- Commit d8db8a5 — verified via git log
