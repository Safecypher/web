# Phase 6: Analytics + CRM - Research

**Researched:** 2026-02-22
**Domain:** PostHog analytics (posthog-js) + Attio CRM (REST API) in Next.js 16 App Router
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Event taxonomy

- CTA clicks use a single `cta_click` event name with a `source` property distinguishing location (e.g., `source: 'hero'`, `source: 'urgency'`, `source: 'product-page'`, `source: 'calculator'`)
- Calculator link ("See the value for your portfolio") also fires `cta_click` with `source: 'calculator'`
- Form start fires on first keystroke into the demo request form (`form_start` event)
- Contact form submission fires a `contact_request` event in PostHog
- Calendly popup open fires a `calendly_open` event
- Page view events include UTM parameters from the query string (utm_source, utm_medium, utm_campaign) as event properties

#### Attio event payload

- Both demo request and contact form submissions go to Attio (`demo_request` and `contact_request` events respectively)
- All form fields are included in the Attio payload: name, email, company, role, message
- No page source or referrer in Attio events — form data only
- The route creates/upserts a Contact (person) record in Attio using email as the key, then logs the event against it
- `/api/attio/event` returns `403 Forbidden` (no body) to any direct browser request; only called server-side from Next.js route handlers

#### Dev vs prod behaviour

- Attio stub in dev: `console.log` the payload AND return a mock Attio response shape — no real API call
- Route logic: if `ATTIO_ENABLED` is not `"true"`, stub mode; if `ATTIO_API_KEY` is absent despite `ATTIO_ENABLED`, log an error and stub
- PostHog: disabled if `NEXT_PUBLIC_POSTHOG_KEY` env var is absent — initialises in no-op mode
- Netlify preview deploys: behave like dev — `ATTIO_ENABLED` only set in the production Netlify environment, not preview branches
- Attio API failures in prod: silent server-side — form shows success to user regardless (Netlify form already captured the lead)

#### PostHog initialisation

- Consent banner required: minimal fixed bottom bar with Accept and Decline buttons — no modal
- Consent is session-only: banner reappears on each new browser session (no localStorage persistence)
- PostHog only initialises after the user accepts; if declined, PostHog does not capture anything for that session
- Visitor identity: anonymous by default; after demo_request or contact_request form submission, call `posthog.identify(email)` to link prior anonymous events to the person
- PostHogProvider lives in the root layout (`app/layout.tsx`) — covers all routes including portal
- Autocapture enabled — PostHog records clicks, inputs, and page changes automatically in addition to manual `posthog.capture()` calls

### Claude's Discretion

- Exact visual styling of the consent banner (colours, typography, position within the bottom bar) — match DaisyUI design system
- Exact mock Attio response shape returned in dev stub
- Error logging approach for silent Attio failures (console.error, structured log, etc.)
- PostHog session replay — not mentioned, Claude can leave disabled unless trivial to add

### Deferred Ideas (OUT OF SCOPE)

- None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ANLT-01 | Attio event streaming infrastructure: `/api/attio/event` server-side route; fires to console.log in dev, real Attio API key wired in prod via Netlify env var; events: `portal_login`, `calculator_run`, `document_download`, `product_page_view`, `demo_request`, `mockup_viewed` | Attio REST API upsert (PUT /v2/objects/people/records) + note creation (POST /v2/notes) patterns documented; 403 guard pattern using Next.js route handler request inspection |
| ANLT-02 | PostHog installed on public site and portal; tracks page views, CTA clicks, form starts, funnel events | posthog-js v1.352.0 with PostHogProvider in root layout, PostHogPageView component with usePathname/useSearchParams, opt_out_capturing_by_default for consent, posthog.identify() post-form-submit |
</phase_requirements>

---

## Summary

Phase 6 wires two independent integrations: PostHog (client-side analytics via posthog-js) and Attio (server-side CRM via REST API). Both have well-established patterns for the Next.js App Router stack in use.

PostHog is integrated via `posthog-js` (current version 1.352.0) with a `'use client'` providers wrapper in the root layout. The library ships a `PostHogProvider` from `posthog-js/react` and a `usePostHog()` hook for event capture from any client component. Consent is handled via `opt_out_capturing_by_default: true` at init — PostHog captures nothing until `posthog.opt_in_capturing()` is called explicitly. Since consent must be session-only (no localStorage persistence), the `opt_out_capturing_persistence_type` option must be omitted/set to `'memory'` so the opt-in decision lives only in memory and is lost on tab close.

Attio uses a straightforward REST API (`https://api.attio.com/v2`) authenticated with a Bearer token. The integration is entirely server-side: a Next.js route handler at `/api/attio/event` receives form payloads from other internal route handlers, upserts a person record (PUT `/v2/objects/people/records?matching_attribute=email_addresses`), then creates a note (POST `/v2/notes`) describing the event. The route rejects direct browser calls with 403 by inspecting the request origin vs. server-side trust signals. In dev mode the route logs the payload and returns a realistic mock — no real API call.

**Primary recommendation:** Implement PostHog with `opt_out_capturing_by_default: true` + memory-only persistence, and Attio as a pure server-side route handler. Keep all CRM logic behind the `/api/attio/event` internal route — forms never call Attio directly.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| posthog-js | 1.352.0 (latest) | Client analytics SDK including PostHogProvider and usePostHog hook | Official PostHog browser SDK; PostHogProvider from `posthog-js/react` sub-path; ships autocapture, identify, and feature flags |
| Next.js App Router route handler | built-in (Next 16) | Server-side route for Attio API calls — protects API key from browser | Route handlers run on Node.js server; API key never reaches client |
| Attio REST API | v2 | CRM person upsert + note creation | No official Node SDK — direct fetch calls to `https://api.attio.com/v2` with Bearer auth |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-calendly | 4.4.0 (already installed) | Calendly popup integration | Already in package.json; use `onEventTypeViewed` callback to fire `calendly_open` PostHog event |
| posthog-js/react | sub-path of posthog-js | React-specific exports: PostHogProvider, usePostHog | Import from `posthog-js/react` not `posthog-js` for React integration |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Direct fetch to Attio API | attio-js (community SDK) | attio-js is community-maintained, no official backing — direct fetch with typed interfaces is safer for production; avoids dependency on unmaintained package |
| opt_out_capturing_by_default | Initialising PostHog only after consent | Both work; opt_out_capturing_by_default is simpler as it allows PostHog to exist in the component tree before consent while capturing nothing |
| Memory-only consent | cookieless_mode: 'on_reject' | cookieless_mode affects cookie usage, not capturing — cannot be used alone to implement session-only consent; opt_out_capturing_persistence_type: 'memory' is the correct option |

**Installation:**

```bash
npm install posthog-js
```

(react-calendly is already installed)

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Add PostHogProvider here (root, covers all routes)
│   ├── providers.tsx           # 'use client' — PostHog init + PostHogProvider wrapper
│   └── api/
│       └── attio/
│           └── event/
│               └── route.ts   # POST handler — upsert person, create note
├── components/
│   ├── analytics/
│   │   ├── PostHogPageView.tsx # usePathname + useSearchParams + posthog.capture('$pageview')
│   │   └── ConsentBanner.tsx  # DaisyUI fixed bottom bar, Accept/Decline buttons
│   └── marketing/
│       └── ... existing components get posthog.capture() calls added
└── lib/
    └── analytics.ts            # Shared event helpers: trackCtaClick, trackFormStart, etc.
```

### Pattern 1: PostHog Provider in Root Layout

**What:** A `'use client'` wrapper component initialises posthog-js and wraps children with PostHogProvider. The root layout (server component) renders this wrapper.

**When to use:** Always — provider must wrap entire app to support portal tracking as well as marketing site.

```typescript
// src/app/providers.tsx
// Source: Vercel Knowledge Base + posthog-js GitHub
'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return // no-op if key absent

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      opt_out_capturing_by_default: true,          // capture nothing until consent
      opt_out_capturing_persistence_type: 'memory', // session-only — lost on tab close
      autocapture: true,
      capture_pageview: false, // manual — PostHogPageView handles this
      capture_pageleave: true,
      session_recording: { maskAllInputs: true },  // leave disabled by default (discretion)
    })
  }, [])

  return (
    <PostHogProvider client={posthog}>
      {children}
      <ConsentBanner />
    </PostHogProvider>
  )
}
```

```typescript
// src/app/layout.tsx  (add PHProvider)
import { PHProvider } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="safecypher-dark" className={`...`}>
      <body className="antialiased">
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  )
}
```

### Pattern 2: PostHogPageView — Manual Page View Tracking

**What:** A client component placed inside PHProvider that fires `$pageview` on every navigation, including UTM parameters as properties extracted from the query string.

**When to use:** Required because Next.js App Router does not use traditional page loads — PostHog's automatic `capture_pageview` does not fire on client-side navigation.

```typescript
// src/components/analytics/PostHogPageView.tsx
// Source: Multiple community guides + posthog-js/react usePostHog hook
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (!posthog || !pathname) return

    const url = `${window.location.origin}${pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ''
    }`

    // Extract UTM params as explicit properties (locked decision)
    const utmProps: Record<string, string> = {}
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign']
    for (const key of utmKeys) {
      const val = searchParams.get(key)
      if (val) utmProps[key] = val
    }

    posthog.capture('$pageview', {
      $current_url: url,
      ...utmProps,
    })
  }, [pathname, searchParams, posthog])

  return null
}
```

**Important:** Wrap `PostHogPageView` in `<Suspense>` in layout.tsx because `useSearchParams()` requires it in App Router.

### Pattern 3: Attio Server-Side Route Handler

**What:** A Next.js route handler at `/api/attio/event` that receives internal POSTs from other route handlers (never directly from the browser). It upserts a person record and creates a note.

**When to use:** Whenever a form submission needs to be reflected in Attio. Called from form-handling route handlers (not from client components directly).

**403 guard mechanism:** The route checks for an internal shared secret header (`x-internal-token`) or verifies the request does not contain a browser `Origin` header that is external. The simplest reliable approach: only accept calls that include a secret internal header set only by server code.

```typescript
// src/app/api/attio/event/route.ts
// Source: Next.js App Router docs + Attio REST API docs
import { NextRequest, NextResponse } from 'next/server'

const ATTIO_API_BASE = 'https://api.attio.com/v2'
const ATTIO_ENABLED = process.env.ATTIO_ENABLED === 'true'
const ATTIO_API_KEY = process.env.ATTIO_API_KEY ?? ''

interface AttioEventPayload {
  event: 'demo_request' | 'contact_request'
  name: string
  email: string
  company: string
  role: string
  message?: string
}

export async function POST(request: NextRequest) {
  // 403: reject any direct browser request (no internal secret header)
  const internalSecret = request.headers.get('x-internal-token')
  if (internalSecret !== process.env.INTERNAL_API_SECRET) {
    return new NextResponse(null, { status: 403 })
  }

  const payload: AttioEventPayload = await request.json()

  if (!ATTIO_ENABLED) {
    // Dev stub: log and return mock response shape
    console.log('[Attio stub] event payload:', payload)
    return NextResponse.json({
      stub: true,
      person: { id: { record_id: 'stub-record-id' } },
      note: { id: { note_id: 'stub-note-id' } },
    })
  }

  if (!ATTIO_API_KEY) {
    console.error('[Attio] ATTIO_ENABLED=true but ATTIO_API_KEY is absent — stubbing')
    return NextResponse.json({ stub: true, error: 'missing key' })
  }

  try {
    // Step 1: Upsert person record by email
    const personRes = await fetch(
      `${ATTIO_API_BASE}/objects/people/records?matching_attribute=email_addresses`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${ATTIO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            values: {
              email_addresses: [payload.email],
              name: [{ full_name: payload.name }],
            },
          },
        }),
      }
    )

    const personData = await personRes.json()
    const recordId: string = personData?.data?.id?.record_id

    // Step 2: Create a note against the person record
    if (recordId) {
      await fetch(`${ATTIO_API_BASE}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ATTIO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            parent_object: 'people',
            parent_record_id: recordId,
            title: payload.event === 'demo_request' ? 'Demo Request' : 'Contact Request',
            format: 'markdown',
            content: [
              `**Event:** ${payload.event}`,
              `**Company:** ${payload.company}`,
              `**Role:** ${payload.role}`,
              payload.message ? `**Message:** ${payload.message}` : '',
            ].filter(Boolean).join('\n\n'),
          },
        }),
      })
    }

    return NextResponse.json({ ok: true, record_id: recordId })
  } catch (err) {
    // Silent failure — form already succeeded via Netlify
    console.error('[Attio] API call failed:', err)
    return NextResponse.json({ ok: false })
  }
}
```

### Pattern 4: Consent Banner (DaisyUI)

**What:** A fixed bottom bar rendered inside PHProvider. Calls `posthog.opt_in_capturing()` on accept, `posthog.opt_out_capturing()` on decline. No state is persisted — banner re-appears on each new browser session (controlled by `opt_out_capturing_persistence_type: 'memory'`).

```typescript
// src/components/analytics/ConsentBanner.tsx
'use client'

import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'

export function ConsentBanner() {
  const posthog = usePostHog()
  // When opt_out_capturing_by_default:true + persistence:'memory',
  // the banner is always shown on mount (session-only by design)
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleAccept = () => {
    posthog?.opt_in_capturing()
    setDismissed(true)
  }

  const handleDecline = () => {
    posthog?.opt_out_capturing()
    setDismissed(true)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-base-200 border-t border-base-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-base-content/70">
          We use analytics cookies to understand how visitors use this site.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={handleDecline} className="btn btn-ghost btn-sm">
            Decline
          </button>
          <button onClick={handleAccept} className="btn btn-primary btn-sm">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Pattern 5: Calling Attio from Form Submit Handler

**What:** The existing form route handler (or the client-side form submit that currently POSTs to `/__forms.html`) should be augmented to also call the internal `/api/attio/event` route with the internal secret header.

**Important architectural note:** The current forms in DemoFormSection and ContactFormSection post directly to `/__forms.html` (Netlify forms). The Attio call must be a separate parallel fetch to `/api/attio/event`. Add this inside the client-side `handleSubmit`, fired after the Netlify form submit succeeds.

```typescript
// Inside DemoFormSection or ContactFormSection handleSubmit
// After successful Netlify form POST:
await fetch('/api/attio/event', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-internal-token': process.env.NEXT_PUBLIC_INTERNAL_API_SECRET ?? '', // see pitfall below
  },
  body: JSON.stringify({
    event: 'demo_request',
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    role: formData.get('role'),
    message: formData.get('challenge'),
  }),
})
```

**CRITICAL PITFALL:** The 403 guard must work even when called from a client component. If the client sends an `x-internal-token` header, that secret is visible in the browser network tab — defeating the purpose. The correct architecture is to NOT call `/api/attio/event` directly from client components. Instead, create an intermediate server-side route handler (e.g., `/api/submit-demo`) that handles the Netlify form logic AND calls Attio internally. The client calls this server route, not Attio directly.

### Anti-Patterns to Avoid

- **Calling /api/attio/event from client components:** The Attio API key is server-side only. Client forms should call an intermediate route handler (e.g., `/api/submit/demo-request`) which calls Attio internally with the internal secret. Never expose `ATTIO_API_KEY` to the client.
- **Using posthog.init inside a Server Component:** posthog-js requires a browser environment. Only initialise inside `'use client'` components.
- **Skipping Suspense around PostHogPageView:** `useSearchParams()` in Next.js App Router requires a Suspense boundary — omitting this causes a build error in Next.js 13+.
- **Using localStorage for session-only consent:** `opt_out_capturing_persistence_type: 'memory'` is the correct option to prevent persistence. Leaving it as default `'localStorage'` will persist consent across sessions, which contradicts the locked decision.
- **Combining opt_out_capturing_by_default with cookieless_mode:** There is a confirmed open bug in posthog-js where these two options interact unexpectedly (GitHub issue #2841, January 2026). Do not combine them. Use `opt_out_capturing_by_default: true` with `opt_out_capturing_persistence_type: 'memory'` instead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| React context for PostHog client | Custom analytics context | PostHogProvider + usePostHog() from posthog-js/react | Built-in, handles SSR safely, avoids hydration mismatches |
| Person record deduplication | Custom email-matching logic | PUT /v2/objects/people/records?matching_attribute=email_addresses | Attio handles upsert natively — duplicate calls are idempotent |
| Event queue before consent | Custom event buffer | posthog.capture() is no-op when opted out — no queuing needed | posthog-js discards events when `opt_out_capturing_by_default: true`; events fired after `opt_in_capturing()` work immediately |
| Attio SDK | Custom REST client class | Plain `fetch` with typed interfaces | No official Node SDK exists; community SDK (attio-js) is unsupported; direct fetch is simplest |
| Calendly event detection | Custom postMessage listener | `react-calendly` `onEventTypeViewed` callback | react-calendly is already installed and provides Calendly event callbacks |

**Key insight:** Both integrations have exactly the right level of abstraction from their libraries. Going deeper (custom SDK) or shallower (raw API calls without types) both add risk without benefit.

---

## Common Pitfalls

### Pitfall 1: API Secret Visible in Browser Network Tab

**What goes wrong:** Developer puts `INTERNAL_API_SECRET` in `NEXT_PUBLIC_` prefix, making it visible to browsers. The 403 guard on `/api/attio/event` becomes meaningless.

**Why it happens:** Confusion between the "client calls an intermediate route" and "client calls Attio directly" models.

**How to avoid:** Client forms call `/api/submit/demo-request` (or similar named route) — NOT `/api/attio/event`. Only server-to-server calls use the internal secret. The Attio route handler itself enforces this with the internal header check.

**Warning signs:** If you find yourself putting any Attio-related header in a client component, the architecture is wrong.

### Pitfall 2: useSearchParams Without Suspense Causes Build Error

**What goes wrong:** `PostHogPageView` uses `useSearchParams()`, which Next.js requires to be inside a `<Suspense>` boundary. The build fails or the page opts out of static generation.

**Why it happens:** Next.js App Router marks any component using `useSearchParams` as dynamic unless wrapped in Suspense.

**How to avoid:** Wrap `<PostHogPageView />` in `<Suspense fallback={null}>` in the root layout.

**Warning signs:** Build error mentioning "useSearchParams() should be wrapped in a suspense boundary."

### Pitfall 3: Session-Only Consent Not Working

**What goes wrong:** Consent persists across browser sessions even though `opt_out_capturing_persistence_type: 'memory'` was intended.

**Why it happens:** The default `opt_out_capturing_persistence_type` is `'localStorage'`. Forgetting to set it to `'memory'` causes the opt-in decision to persist.

**How to avoid:** Explicitly set `opt_out_capturing_persistence_type: 'memory'` in the posthog.init call.

**Warning signs:** Open a fresh browser tab/session — if the consent banner doesn't re-appear, persistence is wrong.

### Pitfall 4: PostHog Capturing Before Consent

**What goes wrong:** Autocapture fires before the user accepts the consent banner.

**Why it happens:** `opt_out_capturing_by_default: true` must be set at init time. If PostHog is initialised without this option, autocapture begins immediately.

**How to avoid:** Always pass `opt_out_capturing_by_default: true` in posthog.init. Verify in PostHog dashboard that page views only appear after clicking Accept.

**Warning signs:** PostHog dashboard shows events from sessions where no consent was given.

### Pitfall 5: Attio Person Upsert Returns No record_id

**What goes wrong:** The note creation step fails because the PUT response doesn't contain `data.id.record_id`.

**Why it happens:** If the upsert request fails (wrong field format, bad auth), the response is an error object, not a person record. Treating all responses as successful leads to undefined `record_id`.

**How to avoid:** Always check `personRes.ok` before accessing `personData.data`. Log the full error response in non-production environments.

**Warning signs:** Notes appear in Attio without being linked to any person, or note creation 404s.

### Pitfall 6: posthog.identify() Called Before opt_in

**What goes wrong:** Calling `posthog.identify(email)` when the user has not yet accepted tracking — this call is silently ignored when opted out.

**Why it happens:** The identify call is placed in the form submit handler without checking consent state.

**How to avoid:** `posthog.identify()` is safe to call even when opted out — posthog-js discards it. The link between the anonymous session and the email is made only after consent is given. However, if the user accepts consent later (in the same session), prior anonymous events will NOT be retroactively linked. Calling `identify` after `opt_in_capturing()` completes the link for new events.

**Warning signs:** No "Person" profiles appearing in PostHog after demo form submissions.

---

## Code Examples

### PostHog event capture in a CTA button

```typescript
// Source: posthog-js/react usePostHog hook
'use client'

import { usePostHog } from 'posthog-js/react'

export function HeroRequestDemoButton() {
  const posthog = usePostHog()

  const handleClick = () => {
    posthog?.capture('cta_click', { source: 'hero' })
  }

  return (
    <a href="#demo" onClick={handleClick} className="btn btn-primary btn-lg">
      Request Demo
    </a>
  )
}
```

### Form start tracking (first keystroke)

```typescript
// Source: HTML input onInput event + posthog.capture
// Note: use onInput not onChange to fire on first keystroke only
const [formStartFired, setFormStartFired] = useState(false)
const posthog = usePostHog()

const handleFormStart = () => {
  if (!formStartFired) {
    posthog?.capture('form_start', { form: 'demo_request' })
    setFormStartFired(true)
  }
}

// On the first Input element in the form:
// <Input onInput={handleFormStart} ... />
```

### posthog.identify after form submission

```typescript
// Source: posthog-js identify() API
// Called after BOTH Netlify form submit AND Attio call succeed
posthog?.identify(email, {
  name: formData.get('name') as string,
  company: formData.get('company') as string,
  role: formData.get('role') as string,
})
```

### Calendly open tracking

```typescript
// Source: react-calendly onEventTypeViewed callback
import { PopupButton } from 'react-calendly'
import { usePostHog } from 'posthog-js/react'

function CalendlyButton() {
  const posthog = usePostHog()

  return (
    <PopupButton
      url="https://calendly.com/safecypher/30min"
      rootElement={document.body}
      text="Book a time"
      onEventTypeViewed={() => posthog?.capture('calendly_open')}
    />
  )
}
```

**Note:** The current `ContactCalendlyButton` uses the Calendly widget script directly via `window.Calendly.initPopupWidget` — it does not use `react-calendly`'s PopupButton component. The simplest approach to add tracking is to fire `posthog?.capture('calendly_open')` inside the existing `onClick` handler without changing the widget implementation.

### Attio API authentication

```typescript
// Source: Attio REST API docs (https://docs.attio.com/rest-api/guides/authentication)
// Base URL: https://api.attio.com/v2
// Auth: Bearer token in Authorization header

const headers = {
  'Authorization': `Bearer ${process.env.ATTIO_API_KEY}`,
  'Content-Type': 'application/json',
}
```

### Attio person upsert (PUT)

```typescript
// Source: Attio REST API docs — Assert a record endpoint
// PUT https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses

const response = await fetch(
  'https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses',
  {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.ATTIO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        values: {
          email_addresses: ['[email protected]'],
          name: [{ full_name: 'Jane Smith' }],
        },
      },
    }),
  }
)

const data = await response.json()
// data.data.id.record_id — use this for note creation
```

### Attio note creation (POST)

```typescript
// Source: Attio REST API docs — Create a note endpoint
// POST https://api.attio.com/v2/notes

await fetch('https://api.attio.com/v2/notes', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.ATTIO_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: {
      parent_object: 'people',
      parent_record_id: recordId,
      title: 'Demo Request',
      format: 'markdown',
      content: `**Company:** Acme Bank\n\n**Role:** Head of Fraud\n\n**Message:** Rising CNP chargebacks`,
    },
  }),
})
```

### Dev stub mock response shape

```typescript
// Recommendation: match real Attio response shape for dev/test fidelity
{
  stub: true,
  person: {
    id: { record_id: 'stub-person-id' },
    values: { email_addresses: [{ email_address: payload.email }] },
  },
  note: {
    id: { note_id: 'stub-note-id' },
    title: payload.event,
  },
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| posthog-nextjs package (deprecated) | posthog-js with PostHogProvider from posthog-js/react | ~2023 | posthog-nextjs is archived; GitHub explicitly says "use posthog-js/react hooks instead" |
| Manual page view with router.events | usePathname + useSearchParams in a useEffect | Next.js 13 App Router | Pages Router used router.events; App Router requires the hook pattern with Suspense |
| Global consent persisted to localStorage | Memory-only consent per session | Design decision | `opt_out_capturing_persistence_type: 'memory'` enforces session-only |

**Deprecated/outdated:**

- `posthog-nextjs` npm package: Officially deprecated. GitHub repo archived with note to use `posthog-js/react` instead.
- `router.events` for page view tracking: Pages Router only. App Router uses `usePathname` + `useSearchParams`.

---

## Open Questions

1. **Intermediate form route handler vs. client-only**
   - What we know: The current DemoFormSection and ContactFormSection POST directly to `/__forms.html` from client-side `handleSubmit`. This means there is no existing server-side route handler that could call Attio internally.
   - What's unclear: Should this phase add intermediate route handlers (e.g., `/api/submit/demo-request`) that call both `/__forms.html` equivalent AND Attio? Or should the client call Attio directly with a weaker 403 guard?
   - Recommendation: Add lightweight intermediate route handlers. The `/__forms.html` endpoint is a Netlify-specific URL; the form can still be detected as a Netlify form via the hidden `form-name` field. The route handler POSTs to Netlify then calls Attio internally. This is the only architecture that keeps the ATTIO_API_KEY server-side.

   **Decision needed from planner:** If an intermediate route handler is added, the existing form components need updating. This is a moderate scope change but required to honour the "Attio API key never in browser network tab" success criterion.

2. **react-calendly vs. window.Calendly.initPopupWidget**
   - What we know: The existing `ContactCalendlyButton` uses the Calendly widget script directly rather than react-calendly's React components. The package is installed but not used in the React sense.
   - What's unclear: Does `react-calendly`'s `PopupButton` provide event callbacks (like `onEventTypeViewed`)? The window.Calendly approach requires postMessage listeners for events.
   - Recommendation: The simplest approach is to fire `posthog.capture('calendly_open')` inside the existing `onClick` handler — this reliably fires when the popup opens. Switch to PopupButton only if other Calendly event callbacks (scheduled, cancelled) are needed in future.

---

## Sources

### Primary (HIGH confidence)

- posthog-js GitHub releases page (https://github.com/PostHog/posthog-js/releases) — confirmed v1.352.0 as latest, Feb 20 2026
- posthog-js source (posthog-core.ts on GitHub) — confirmed `opt_out_capturing_by_default`, `opt_out_capturing_persistence_type`, `cookieless_mode` TypeScript options
- PostHog cookie banner tutorial (github.com/PostHog/posthog.com) — confirmed `opt_in_capturing()`, `opt_out_capturing()`, `get_explicit_consent_status()` pattern
- Attio REST API docs (docs.attio.com/llms.txt) — confirmed endpoint paths: PUT /v2/objects/people/records, POST /v2/notes
- Attio authentication docs — confirmed Bearer token header format, base URL https://api.attio.com/v2
- Vercel PostHog knowledge base — confirmed providers.tsx pattern with `PostHogProvider` from `posthog-js/react`

### Secondary (MEDIUM confidence)

- Multiple community guides (2025-2026) consistently show: `capture_pageview: false` + `PostHogPageView` component with `usePathname` + `useSearchParams` pattern — verified against posthog-js source
- Attio "Assert a record" WebSearch result — confirmed `matching_attribute=email_addresses` query param for upsert, request body `data.values` structure
- Attio "Create a note" WebSearch result — confirmed `parent_object: 'people'`, `parent_record_id`, `format`, `content` fields

### Tertiary (LOW confidence)

- `opt_out_capturing_persistence_type: 'memory'` — confirmed as a valid option from posthog-js source code TypeScript, but no tutorial explicitly demonstrates session-only consent using this option. The source shows the default is `'localStorage'`. Recommend validating in browser after implementation.
- Attio response body structure (`data.data.id.record_id`) — inferred from community patterns; official docs response schema was not directly verified via WebFetch (pages returned 403/404 during research). Validate against real API response during implementation.

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — posthog-js v1.352.0 confirmed, Attio REST API endpoints confirmed from official docs index
- Architecture: HIGH — providers.tsx pattern is the canonical Next.js App Router approach, confirmed by multiple sources including official Vercel KB
- Pitfalls: HIGH — opt_out_capturing_by_default bug (#2841) confirmed open in posthog-js GitHub; Suspense requirement for useSearchParams is documented Next.js behaviour
- Attio response shape: MEDIUM — endpoint paths and request format confirmed; response body structure inferred, not directly verified

**Research date:** 2026-02-22
**Valid until:** 2026-03-22 (posthog-js releases frequently; re-verify if more than 30 days pass)
