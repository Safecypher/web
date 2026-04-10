---
phase: quick
plan: 260410-ity
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/marketing/save-the-date/SaveTheDateSection.tsx
  - src/app/(marketing)/save-the-date/page.tsx
  - src/app/api/submit/event-interest/route.ts
autonomous: true
requirements: []

must_haves:
  truths:
    - "Visitor without query param sees both event options and can select one before submitting"
    - "Visitor with ?e=UK lands with London pre-selected"
    - "Visitor with ?e=CA lands with Canada pre-selected"
    - "Selected event is included in the form submission and forwarded to Attio"
    - "Success state confirms which event the user registered for"
  artifacts:
    - path: "src/components/marketing/save-the-date/SaveTheDateSection.tsx"
      provides: "Multi-event section with event selector and query-param pre-selection"
    - path: "src/app/(marketing)/save-the-date/page.tsx"
      provides: "Page with Suspense wrapper (required for useSearchParams)"
    - path: "src/app/api/submit/event-interest/route.ts"
      provides: "API route accepting event field and forwarding to Attio/Netlify"
  key_links:
    - from: "SaveTheDateSection.tsx"
      to: "useSearchParams"
      via: "?e= param → initial event selection state"
    - from: "SaveTheDateSection.tsx"
      to: "/api/submit/event-interest"
      via: "POST body includes event: selectedEvent"
    - from: "/api/submit/event-interest"
      to: "/api/attio/event"
      via: "event field forwarded in Attio payload"
---

<objective>
Extend the save-the-date page to support two events (London and Canada). Visitors can choose their event from a selector. A query param (?e=UK or ?e=CA) pre-selects the event automatically — useful for targeted email/social links.

Purpose: Support multi-event campaigns without separate pages.
Output: Updated SaveTheDateSection with event selection UI, query-param pre-selection, and event field passed through the API to Attio.
</objective>

<execution_context>
@/Users/markwright/.claude/get-shit-done/workflows/execute-plan.md
@/Users/markwright/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/marketing/save-the-date/SaveTheDateSection.tsx
@src/app/(marketing)/save-the-date/page.tsx
@src/app/api/submit/event-interest/route.ts

<interfaces>
<!-- Existing patterns used in this plan. No codebase exploration needed. -->

useSearchParams pattern (from ContactFormSection.tsx):
```typescript
'use client'
import { useSearchParams } from 'next/navigation'
// Called at component top level — component must be wrapped in Suspense in page.tsx
const searchParams = useSearchParams()
const param = searchParams.get('e') // null if absent
```

Suspense pattern (from contact/page.tsx):
```tsx
import { Suspense } from 'react'
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base-100" />}>
      <SaveTheDateSection />
    </Suspense>
  )
}
```

API event-interest route body (current):
```typescript
{ name: string; email: string }
```

Attio event payload (current):
```typescript
{ event: 'event_interest', email: body.email, name: body.name }
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add event selector with query-param pre-selection to SaveTheDateSection</name>
  <files>src/components/marketing/save-the-date/SaveTheDateSection.tsx</files>
  <action>
Rewrite SaveTheDateSection.tsx to support two events with the following behaviour:

**Event definitions (module-scope const):**
```typescript
const EVENTS = [
  { id: 'UK', label: 'London, UK', description: 'The Fraud Forum — London 2026' },
  { id: 'CA', label: 'Toronto, Canada', description: 'The Fraud Forum — Canada 2026' },
] as const

type EventId = typeof EVENTS[number]['id']
```

**Query-param pre-selection:**
- Call `useSearchParams()` at component top level
- Read `?e=` param: `const eParam = searchParams.get('e')?.toUpperCase()`
- Derive initial selection: `useState<EventId>(() => EVENTS.find(ev => ev.id === eParam)?.id ?? 'UK')`
- If param is absent or unrecognised, default to 'UK' (London)

**Event selector UI (above the form, below the eyebrow/title block):**
- Two side-by-side buttons (flex gap-3) — one per event
- Active event: `btn btn-primary` style; inactive: `btn btn-outline`
- Each button shows the event label (e.g. "London, UK")
- Clicking a button updates `selectedEvent` state
- Selecting an event does NOT require a form submit — it's immediate UI state

**Title block:** Update the `<h1>` to show the selected event's description:
```tsx
<h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-6">
  {EVENTS.find(ev => ev.id === selectedEvent)!.description}
</h1>
```
Keep the eyebrow "Save the Date" text and the lead paragraph unchanged.

**Form submission:** Include the selected event in the POST payload:
```typescript
const payload = {
  name: formData.get('name') as string,
  email: formData.get('email') as string,
  event: selectedEvent,
}
```

**Success state:** Update the success message to reference the chosen event:
```tsx
<p className="text-base-content/60 text-lg">
  You&apos;re registered for the {EVENTS.find(ev => ev.id === submittedEvent)!.description}.
  We&apos;ll be in touch with event details as they&apos;re confirmed.
</p>
```
Capture `submittedEvent` in a separate `useState<EventId>` — set it at the same time as `setFormState('success')` so the success screen shows which event was registered.

Keep existing error handling, loading state, and form field structure (name + email).
  </action>
  <verify>npm run lint && npm run build</verify>
  <done>
    - Lint passes with no errors
    - Build succeeds
    - Two event buttons visible in the section
    - ?e=UK pre-selects London, ?e=CA pre-selects Canada, absent param defaults to London
    - Selected event title updates when switching events
    - Form payload includes event field
  </done>
</task>

<task type="auto">
  <name>Task 2: Update page.tsx Suspense wrapper and API route to accept event field</name>
  <files>
    src/app/(marketing)/save-the-date/page.tsx
    src/app/api/submit/event-interest/route.ts
  </files>
  <action>
**page.tsx — Add Suspense wrapper (required for useSearchParams):**

SaveTheDateSection now calls `useSearchParams()`, so the page must wrap it in Suspense (same pattern as contact/page.tsx):

```tsx
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SaveTheDateSection } from '@/components/marketing/save-the-date/SaveTheDateSection'

export const metadata: Metadata = {
  title: 'Save the Date — The Fraud Forum | SafeCypher',
  description: 'Register your interest in The Fraud Forum events in London and Canada. Be first to receive event details, agenda and confirmed speakers.',
}

export default function SaveTheDatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base-100" />}>
      <SaveTheDateSection />
    </Suspense>
  )
}
```

**event-interest route — Accept and forward the event field:**

Update the POST body type to include `event`:
```typescript
const body = (await request.json()) as {
  name: string
  email: string
  event?: string
}
```

Forward event in the Netlify form body:
```typescript
const netlifyBody = new URLSearchParams({
  'form-name': 'event-interest',
  name: body.name,
  email: body.email,
  ...(body.event ? { event: body.event } : {}),
})
```

Forward event in the Attio payload:
```typescript
body: JSON.stringify({
  event: 'event_interest',
  email: body.email,
  name: body.name,
  ...(body.event ? { eventId: body.event } : {}),
}),
```

All other logic in the route (error handling, Attio auth header, siteUrl resolution) remains unchanged.
  </action>
  <verify>npm run lint && npm run build</verify>
  <done>
    - Lint passes with no errors
    - Build succeeds
    - page.tsx wraps SaveTheDateSection in Suspense
    - API route accepts event field and passes it to Netlify and Attio payloads
  </done>
</task>

</tasks>

<verification>
After both tasks complete:
1. Run `npm run dev` and visit http://localhost:3000/save-the-date — both event buttons should be visible, London selected by default
2. Visit http://localhost:3000/save-the-date?e=CA — Canada button should be pre-selected and title should read "The Fraud Forum — Canada 2026"
3. Visit http://localhost:3000/save-the-date?e=UK — London should be pre-selected
4. Switch events by clicking buttons — title updates immediately
5. Submit the form — success state should name the event registered for
</verification>

<success_criteria>
- Two event options (London and Canada) visible on /save-the-date
- ?e=UK pre-selects London; ?e=CA pre-selects Canada; no param defaults to London
- Selected event propagates through form submission to API (event field in POST body)
- Success confirmation names the specific event
- npm run lint and npm run build both pass
</success_criteria>

<output>
After completion, create `.planning/quick/260410-ity-multi-event-save-the-date-page-with-quer/260410-ity-SUMMARY.md`
</output>
