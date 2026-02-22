# Phase 6: Analytics + CRM - Context

**Gathered:** 2026-02-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Wire PostHog event capture and Attio server-side CRM signals across the public site — every meaningful visitor action becomes a trackable funnel event and a CRM signal for the sales team. Portal tracking is out of scope for this phase.

</domain>

<decisions>
## Implementation Decisions

### Event taxonomy

- CTA clicks use a single `cta_click` event name with a `source` property distinguishing location (e.g., `source: 'hero'`, `source: 'urgency'`, `source: 'product-page'`, `source: 'calculator'`)
- Calculator link ("See the value for your portfolio") also fires `cta_click` with `source: 'calculator'`
- Form start fires on first keystroke into the demo request form (`form_start` event)
- Contact form submission fires a `contact_request` event in PostHog
- Calendly popup open fires a `calendly_open` event
- Page view events include UTM parameters from the query string (utm_source, utm_medium, utm_campaign) as event properties

### Attio event payload

- Both demo request and contact form submissions go to Attio (`demo_request` and `contact_request` events respectively)
- All form fields are included in the Attio payload: name, email, company, role, message
- No page source or referrer in Attio events — form data only
- The route creates/upserts a Contact (person) record in Attio using email as the key, then logs the event against it
- `/api/attio/event` returns `403 Forbidden` (no body) to any direct browser request; only called server-side from Next.js route handlers

### Dev vs prod behaviour

- Attio stub in dev: `console.log` the payload AND return a mock Attio response shape — no real API call
- Route logic: if `ATTIO_ENABLED` is not `"true"`, stub mode; if `ATTIO_API_KEY` is absent despite `ATTIO_ENABLED`, log an error and stub
- PostHog: disabled if `NEXT_PUBLIC_POSTHOG_KEY` env var is absent — initialises in no-op mode
- Netlify preview deploys: behave like dev — `ATTIO_ENABLED` only set in the production Netlify environment, not preview branches
- Attio API failures in prod: silent server-side — form shows success to user regardless (Netlify form already captured the lead)

### PostHog initialisation

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

</decisions>

<specifics>
## Specific Ideas

- Attio route security model: 403 on direct browser hits — Attio API key must never appear in browser network tab
- Dev stub: return a realistic mock so forms can be tested end-to-end locally without touching Attio
- ATTIO_ENABLED flag is explicit: presence of the key alone is not enough — must be opted in

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-analytics-crm*
*Context gathered: 2026-02-22*
