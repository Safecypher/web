---
phase: quick-260421-pgg
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/marketing/save-the-date/SaveTheDateSection.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Visiting /save-the-date shows three event tabs: London April, London June, Canada"
    - "Visiting /save-the-date?e=UK2 pre-selects the June London event"
    - "June London event card shows date 16 June 2026, time, venue and address"
    - "Submitting the form records the correct event ID for whichever tab is active"
  artifacts:
    - path: "src/components/marketing/save-the-date/SaveTheDateSection.tsx"
      provides: "Updated EVENTS array with UK2 entry"
      contains: "id: 'UK2'"
  key_links:
    - from: "URL ?e=UK2"
      to: "selectedEvent state"
      via: "eParam match against EVENTS array"
      pattern: "EVENTS.find.*id.*eParam"
---

<objective>
Add a second London event (16 June 2026, same venue — The Treehouse Hotel) to the save-the-date page. The new event must be selectable via query param `?e=UK2` and display full date/time/venue details identical in structure to the existing April event.

Purpose: The team is running a second London Fraud Forum date and needs registrations captured per-event.
Output: Updated SaveTheDateSection.tsx with UK2 event entry; no other files need changing.
</objective>

<execution_context>
@/Users/markwright/.claude/get-shit-done/workflows/execute-plan.md
@/Users/markwright/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

Existing file to update:
@src/components/marketing/save-the-date/SaveTheDateSection.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add UK2 June London event to EVENTS array</name>
  <files>src/components/marketing/save-the-date/SaveTheDateSection.tsx</files>
  <action>
    In the `EVENTS` array (lines 7–20), insert a new entry between the `UK` entry and the `CA` entry:

    ```ts
    {
      id: 'UK2',
      label: 'London, UK (June)',
      description: 'The Fraud Forum — London June 2026',
      details: {
        date: 'Tuesday 16 June 2026',
        time: '1:00 PM – 9:00 PM (lunch through dinner)',
        venue: 'The Treehouse Hotel',
        address: '14-15 Langham Pl, London W1B 2QS',
      },
    },
    ```

    The `eParam` lookup, event selector buttons, details card, and success message all derive from the `EVENTS` array dynamically — no other code changes are needed. The query param `?e=UK2` will automatically pre-select the new event because the existing `EVENTS.find(ev => ev.id === eParam)?.id` logic covers it.

    Do NOT change any other logic, styling, or component structure.
  </action>
  <verify>
    <automated>npm run build 2>&1 | tail -20</automated>
  </verify>
  <done>
    Build passes with no TypeScript or ESLint errors. Visiting /save-the-date shows three tabs (London UK, London UK June, Toronto Canada). Visiting /save-the-date?e=UK2 pre-selects the June tab and shows the 16 June 2026 details card.
  </done>
</task>

</tasks>

<verification>
Run `npm run lint` — no errors.
Run `npm run build` — exits 0.
Visually confirm at http://localhost:3000/save-the-date?e=UK2 that the June event is pre-selected with correct date, time, venue, and address.
</verification>

<success_criteria>
- Three event tabs visible on /save-the-date
- ?e=UK2 pre-selects London June tab
- Details card shows "Tuesday 16 June 2026", "The Treehouse Hotel", correct address
- Form submission payload includes event: "UK2" when June tab active
- Build and lint pass clean
</success_criteria>

<output>
After completion, create `.planning/quick/260421-pgg-i-need-to-update-the-save-the-date-landi/260421-pgg-SUMMARY.md`
</output>
