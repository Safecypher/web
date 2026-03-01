---
phase: 07-add-value-calculators-to-the-portal
plan: "01"
subsystem: auth
tags: [supabase, magic-link, pkce, next-js-proxy, middleware, otp]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js App Router structure, route groups, portal layout
  - phase: 06-analytics-crm
    provides: Attio event route (/api/attio/event) that was fixed in this plan
provides:
  - Supabase SSR auth helpers (client.ts, server.ts)
  - Next.js proxy middleware protecting all /portal/* routes
  - Magic link login page at /portal/login
  - PKCE callback route at /portal/auth/callback
  - Fixed Attio event route accepting calculator_run payloads without TypeError
affects:
  - 07-03-portal-calculator-ui (requires auth protection to work)
  - 07-04-portal-pdf-report (requires auth session for personalized reports)
  - 07-05-portal-attio-crm (depends on fixed Attio route accepting calculator events)

# Tech tracking
tech-stack:
  added:
    - "@supabase/supabase-js ^2.x"
    - "@supabase/ssr ^0.x"
  patterns:
    - "Supabase SSR pattern: createBrowserClient in client.ts, createServerClient in server.ts"
    - "Next.js 16 proxy.ts convention (renamed from middleware.ts, export function proxy)"
    - "getUser() not getSession() for server-side auth revalidation (spoof prevention)"
    - "callbackUrl preserved through magic link flow: signInWithOtp emailRedirectTo encodes it, callback route reads and redirects to it"
    - "supabaseResponse must be returned from updateSession (not new NextResponse.next()) to preserve cookie mutations"

key-files:
  created:
    - src/lib/supabase/client.ts
    - src/lib/supabase/server.ts
    - src/lib/supabase/middleware.ts
    - src/proxy.ts
    - src/app/(portal)/portal/login/page.tsx
    - src/app/(portal)/portal/auth/callback/route.ts
  modified:
    - src/app/api/attio/event/route.ts
    - netlify.toml
    - package.json
    - src/app/(marketing)/privacy/page.tsx
    - src/app/(marketing)/terms/page.tsx

key-decisions:
  - "Next.js 16 uses proxy.ts not middleware.ts — function must be exported as `proxy`, not `middleware`"
  - "getUser() used exclusively for server-side auth checks — getSession() reads cookie without revalidation and can be spoofed"
  - "shouldCreateUser: true on signInWithOtp — new prospects auto-register on first magic link request"
  - "Resend state tracked via separate `resending` boolean — TypeScript control-flow narrows status to 'sent' in sent branch, making status === 'sending' a type error"
  - "AttioEventBody all fields optional + index signature — allows calculator_run events with arbitrary payload keys"
  - "Three-branch Attio logic: if(name && email) upsert person+note, elif(email) note only, else log-only — handles form submissions, known-session calculator events, and anonymous events"

patterns-established:
  - "Supabase SSR: all three files (client.ts, server.ts, middleware.ts) required for full SSR auth pattern"
  - "Portal auth guard: /portal/login and /portal/auth/ excluded from redirect; all other /portal/* routes redirect to /portal/login?callbackUrl=..."
  - "Magic link callbackUrl chain: useSearchParams → emailRedirectTo param → callback route searchParams → NextResponse.redirect"

requirements-completed: [PORT-02, PORT-04]

# Metrics
duration: 18min
completed: 2026-02-27
---

# Phase 7 Plan 01: Portal Auth Infrastructure Summary

**Supabase magic link auth protecting /portal/* routes via Next.js 16 proxy.ts, with PKCE callback and Attio route fix for anonymous calculator events**

## Performance

- **Duration:** 18 min
- **Started:** 2026-02-27T12:07:50Z
- **Completed:** 2026-02-27T12:25:30Z
- **Tasks:** 2 (1 human-action checkpoint + 1 auto)
- **Files modified:** 12

## Accomplishments

- All /portal/* routes except /portal/login and /portal/auth/ now redirect unauthenticated users to /portal/login?callbackUrl=... using server-side getUser() revalidation
- Magic link login page with 60-second resend countdown; callbackUrl preserved end-to-end from initial redirect through email link to post-login destination
- PKCE callback route exchanges code for session via exchangeCodeForSession and redirects to original callbackUrl
- Attio event route fixed: AttioEventBody now has optional fields + index signature; `if (body.name && body.email)` guard prevents TypeError when calculator_run events arrive without a name field

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Supabase project and configure env vars** - Human-action checkpoint (no commit)
2. **Task 2: Install Supabase packages, wire auth infrastructure, fix Attio route** - `005b05b` (feat)

**Plan metadata:** TBD (docs commit)

## Files Created/Modified

- `src/lib/supabase/client.ts` - createBrowserClient factory for Client Components
- `src/lib/supabase/server.ts` - createServerClient factory with cookie store for Server Components and Route Handlers
- `src/lib/supabase/middleware.ts` - updateSession: session refresh + /portal/* route guard using getUser()
- `src/proxy.ts` - Next.js 16 proxy entry point (renamed from middleware.ts); exports `proxy` function
- `src/app/(portal)/portal/login/page.tsx` - Magic link request form with resend countdown and callbackUrl support
- `src/app/(portal)/portal/auth/callback/route.ts` - PKCE code exchange via exchangeCodeForSession; redirects to callbackUrl
- `src/app/api/attio/event/route.ts` - Fixed: optional type fields, index signature, three-branch logic for name/no-name/anonymous events
- `netlify.toml` - Added comment stubs for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- `package.json` / `package-lock.json` - Added @supabase/supabase-js and @supabase/ssr

## Decisions Made

- **Next.js 16 proxy convention:** File renamed from `middleware.ts` to `proxy.ts` and exported function renamed from `middleware` to `proxy`. Next.js 16 deprecated `middleware` in favour of `proxy` — build fails if function is not named `proxy`.
- **getUser() exclusively:** The plan specified this and it was enforced. getSession() was not used anywhere in the auth chain.
- **Separate `resending` boolean for resend state:** TypeScript's control-flow analysis narrows `status` to `'sent'` inside the sent branch. Comparing `status === 'sending'` inside that branch is a type error. Added `resending` boolean to track resend loading state independently.
- **Three-branch Attio logic:** name+email → full person upsert + note; email only → note only (no person upsert); neither → log only. This handles all three event classes: form submissions (name+email), calculator events from authenticated sessions (email from session, no name), and fully anonymous events.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Next.js 16 renamed middleware convention to proxy**
- **Found during:** Task 2 (build verification)
- **Issue:** `src/middleware.ts` with `export async function middleware` produced deprecation warning in Next.js 16.1.6. Build then failed with "Proxy is missing expected function export name" when file was renamed to proxy.ts without renaming the function.
- **Fix:** Renamed file to `src/proxy.ts` and renamed exported function from `middleware` to `proxy`.
- **Files modified:** src/proxy.ts (renamed from src/middleware.ts)
- **Verification:** Build passes without deprecation warning; proxy appears in route table as "ƒ Proxy (Middleware)"
- **Committed in:** 005b05b

**2. [Rule 1 - Bug] TypeScript type error in login page resend button**
- **Found during:** Task 2 (build verification)
- **Issue:** Inside the `status === 'sent'` JSX branch, TypeScript narrows `status` to `'sent'`, making `status === 'sending'` an unreachable comparison flagged as a type error.
- **Fix:** Introduced separate `resending` boolean state for resend loading; removed `status === 'sending'` comparison from sent branch.
- **Files modified:** src/app/(portal)/portal/login/page.tsx
- **Verification:** Build TypeScript check passes; resend button correctly disables while resending.
- **Committed in:** 005b05b

**3. [Rule 1 - Bug] Pre-existing react/no-unescaped-entities lint errors blocking lint gate**
- **Found during:** Task 2 (lint verification)
- **Issue:** privacy/page.tsx and terms/page.tsx contained raw `"` and `'` characters in JSX text nodes (e.g., `("SafeCypher", "we")`, `"as is"`, `SafeCypher's`). These were committed in a prior phase (db60b8d, Feb 24) but were not caught because lint was not run at that time.
- **Fix:** Replaced raw quotes with HTML entities: `&ldquo;`/`&rdquo;` for double quotes, `&apos;` for apostrophes.
- **Files modified:** src/app/(marketing)/privacy/page.tsx, src/app/(marketing)/terms/page.tsx
- **Verification:** `npm run lint` exits 0
- **Committed in:** 005b05b

---

**Total deviations:** 3 auto-fixed (2 Rule 1 bugs in new code, 1 Rule 1 pre-existing lint blocker)
**Impact on plan:** All fixes essential for correct compilation and lint gate. No scope creep.

## Issues Encountered

None beyond the auto-fixed deviations above.

## Next Phase Readiness

- Auth layer complete — /portal/* routes are protected
- Plans 07-03 (calculator UI) and 07-04 (PDF report) can import createClient() and use supabase.auth.getUser() for session access
- Plan 07-05 (Attio CRM) can fire calculator_run events to /api/attio/event without TypeError
- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be added to Netlify Dashboard before portal auth works in production

---
*Phase: 07-add-value-calculators-to-the-portal*
*Completed: 2026-02-27*
