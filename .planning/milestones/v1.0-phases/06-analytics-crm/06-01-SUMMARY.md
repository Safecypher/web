---
phase: 06-analytics-crm
plan: "01"
subsystem: api
tags: [attio, crm, nextjs, api-routes, server-side-secrets, netlify-forms]

# Dependency graph
requires:
  - phase: 05-company-contact
    provides: ContactFormSection and DemoFormSection components that will be wired to these routes in plan 06-03

provides:
  - /api/attio/event — guarded server-side Attio event route (403 on direct browser calls)
  - /api/submit/demo-request — intermediate handler forwarding to Netlify form + Attio demo_request event
  - /api/submit/contact-request — intermediate handler forwarding to Netlify form + Attio contact_request event
  - netlify.toml env var documentation stubs for ops reference

affects:
  - 06-02-posthog
  - 06-03-form-wiring

# Tech tracking
tech-stack:
  added: []
  patterns:
    - x-internal-token guard pattern for server-only API routes
    - ATTIO_ENABLED flag for explicit opt-in to production Attio calls (key presence alone is not enough)
    - Intermediate Next.js route handler owns both Netlify form POST and Attio signalling — all secrets stay server-side
    - Silent prod failure on note creation (user sees success, Netlify already captured the lead)

key-files:
  created:
    - src/app/api/attio/event/route.ts
    - src/app/api/submit/demo-request/route.ts
    - src/app/api/submit/contact-request/route.ts
  modified:
    - netlify.toml

key-decisions:
  - "x-internal-token guard: 403 returned immediately on absent or mismatched header — Attio API key never reaches browser network tab"
  - "ATTIO_ENABLED=true required for production Attio calls — env key presence alone insufficient; explicit opt-in prevents accidental prod calls on preview branches"
  - "Silent prod failure on note creation error — form shows success, Netlify already captured the lead (per locked CONTEXT.md decision)"
  - "Dev stub mode: console.log payload + return mock response when ATTIO_ENABLED != true — full local E2E testing without touching Attio"

patterns-established:
  - "x-internal-token: server-to-server secret header pattern for guarding Next.js API routes from direct browser calls"
  - "Intermediate route handler owns both Netlify form post AND Attio signalling — client components never see secrets"

requirements-completed:
  - ANLT-01

# Metrics
duration: 2min
completed: 2026-02-23
---

# Phase 06 Plan 01: Attio CRM Infrastructure Summary

**Server-side Attio event streaming: guarded /api/attio/event route (403 on browser calls) + two intermediate form handlers that own Netlify form forwarding and Attio CRM signalling, keeping all secrets out of browser network traffic**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-23T09:26:28Z
- **Completed:** 2026-02-23T09:28:40Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Attio event route with x-internal-token 403 guard ensuring the Attio API key is never exposed in browser requests
- Dev stub mode logs payload to console and returns mock response for full local E2E testing without touching Attio
- Production mode upserts Attio person by email then creates an event note, with silent failure on note creation
- Two intermediate form handlers that own both Netlify form POST forwarding and Attio CRM signalling server-side
- netlify.toml env var documentation stubs for ops reference (ATTIO_ENABLED, ATTIO_API_KEY, INTERNAL_API_SECRET, PostHog, SITE_URL)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create /api/attio/event guarded Attio event route** - `b0d2da3` (feat)
2. **Task 2: Create intermediate form-handler routes + netlify.toml env stubs** - `600c08c` (feat)

**Plan metadata:** `27b2cfa` (docs: complete plan)

## Files Created/Modified
- `src/app/api/attio/event/route.ts` - Server-side Attio event route: 403 guard, dev stub, production person upsert + note creation
- `src/app/api/submit/demo-request/route.ts` - Intermediate handler: Netlify form forward + Attio demo_request event
- `src/app/api/submit/contact-request/route.ts` - Intermediate handler: Netlify form forward + Attio contact_request event
- `netlify.toml` - Added env var documentation comment block

## Decisions Made
- x-internal-token guard: 403 returned immediately on absent or mismatched header — Attio API key never reaches browser
- ATTIO_ENABLED=true required explicitly (not just ATTIO_API_KEY presence) — prevents accidental Attio calls on preview deploys
- Silent prod failure on note creation — user sees form success, Netlify already captured the lead
- Dev stub returns `{ stub: true, event, email }` — realistic enough for E2E testing without Attio sandbox

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript, ESLint, and production build all passed clean on first attempt. All three API routes appeared in build output as dynamic server-rendered routes.

## User Setup Required

**External services require manual configuration before these routes will call Attio in production:**

Netlify Dashboard -> Site -> Environment Variables:
- `ATTIO_ENABLED` = `"true"` (production context only)
- `ATTIO_API_KEY` = `<secret>` (Attio Settings -> API -> Create key with People + Notes write access)
- `INTERNAL_API_SECRET` = `<secret>` (generate with: `openssl rand -hex 32`)
- `NEXT_PUBLIC_SITE_URL` = `"https://safecypher.com"` (production canonical URL)

In dev: no env vars needed — routes use stub mode automatically.

## Next Phase Readiness
- /api/attio/event is ready to receive events from any server-side caller
- /api/submit/demo-request and /api/submit/contact-request exist and compile but are not yet wired to the form components — plan 06-03 will update DemoFormSection and ContactFormSection to POST to these routes instead of `/__forms.html` directly
- Plan 06-02 (PostHog) can proceed in parallel as it doesn't depend on these routes

---
*Phase: 06-analytics-crm*
*Completed: 2026-02-23*

## Self-Check: PASSED

- FOUND: src/app/api/attio/event/route.ts
- FOUND: src/app/api/submit/demo-request/route.ts
- FOUND: src/app/api/submit/contact-request/route.ts
- FOUND: .planning/phases/06-analytics-crm/06-01-SUMMARY.md
- FOUND commit: b0d2da3 (feat: /api/attio/event guarded route)
- FOUND commit: 600c08c (feat: intermediate form handlers + netlify.toml stubs)
- FOUND commit: 27b2cfa (docs: complete plan)
