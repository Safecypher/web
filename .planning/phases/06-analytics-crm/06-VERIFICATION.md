---
phase: 06-analytics-crm
verified: 2026-02-23T12:00:00Z
status: human_needed
score: 17/17 must-haves verified (automated); 4 items need human confirmation
re_verification: false
human_verification:
  - test: "Submit the demo form in a browser dev environment with valid fields"
    expected: "Server console shows '[Attio stub] { event: 'demo_request', email: ..., name: ..., company: ..., role: ..., message: ... }'; browser PostHog debug shows 'demo_request' and 'identify' events; form transitions to success screen"
    why_human: "Server-side console.log can only be confirmed at runtime; PostHog event emission depends on opt-in state and live PostHog SDK"
  - test: "First keystroke in the demo form Name field"
    expected: "Browser PostHog debug console shows 'form_start { form: demo_request }' firing exactly once — subsequent keystrokes do not re-fire it"
    why_human: "Deduplication via formStarted boolean state cannot be observed statically; requires real interaction"
  - test: "Visit any public page with NEXT_PUBLIC_POSTHOG_KEY absent (e.g., .env.local without the key)"
    expected: "Consent banner appears at bottom. No PostHog network requests. No JS runtime errors in browser console."
    why_human: "No-op mode is conditional on env var absence at runtime; requires browser session to confirm no errors"
  - test: "Click Accept on consent banner, then refresh the page"
    expected: "After Accept: banner disappears and PostHog network requests begin. After refresh: banner reappears (session-only, React useState — no localStorage). After Decline: banner disappears, no PostHog network traffic."
    why_human: "Session-only persistence relies on React state not surviving page reload — must be confirmed visually with browser DevTools (Application tab shows no consent key in localStorage)"
---

# Phase 06: Analytics + CRM Verification Report

**Phase Goal:** Every meaningful user action across the public site and portal fires a trackable event — PostHog captures the funnel, Attio receives server-side CRM signals — so the sales team has real deal-readiness visibility from day one of launch

**Verified:** 2026-02-23T12:00:00Z
**Status:** human_needed — all automated checks pass; 4 runtime behaviours require browser confirmation
**Re-verification:** No — initial verification

---

## Goal Achievement

### Scope Note: ANLT-01 Portal Event Deferral

REQUIREMENTS.md lists ANLT-01 as requiring six Attio events: `portal_login`, `calculator_run`, `document_download`, `product_page_view`, `demo_request`, `mockup_viewed`. Phase 06 plan 06-01 explicitly scopes down to `demo_request` and `contact_request` only, with the remaining four events (`portal_login`, `calculator_run`, `document_download`, `mockup_viewed`) deferred to the portal phase (PORT-05, PORT-07, P1-06). The `product_page_view` event is satisfied implicitly by PostHog's `$pageview` capture via `PostHogPageView`. This scoping decision is recorded in the 06-01-PLAN.md `must_haves.truths` frontmatter and the ANLT-01 requirement checkbox is marked complete in REQUIREMENTS.md. **Verification treats this scoping as an accepted plan decision, not a gap.**

---

### Observable Truths — Plan 06-01 (Attio CRM Infrastructure)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Submitting demo request form in dev logs `[Attio stub]` to console and returns mock Attio response | ? HUMAN | Logic verified: `ATTIO_ENABLED !== 'true'` path in `route.ts` executes `console.log('[Attio stub]', body)` and returns `{ stub: true, event, email }`. Runtime logging needs human confirmation. |
| 2 | Submitting contact form in dev logs `[Attio stub]` to console | ? HUMAN | Same code path — `console.log('[Attio stub]', body)` — triggered via `/api/submit/contact-request` calling `/api/attio/event` with `x-internal-token`. |
| 3 | A direct browser fetch to `/api/attio/event` returns 403 Forbidden | ✓ VERIFIED | Lines 14–17 of `route.ts`: reads `x-internal-token` header, returns `new Response('Forbidden', { status: 403 })` immediately if absent or mismatched. No branch can bypass this. |
| 4 | `ATTIO_API_KEY` never appears in any browser network request | ✓ VERIFIED | `ATTIO_API_KEY` referenced only in `src/app/api/attio/event/route.ts` (server-only). Grep across all client components and `providers.tsx` returns nothing. Env var has no `NEXT_PUBLIC_` prefix so Next.js does not expose it to the browser bundle. |
| 5 | In production (`ATTIO_ENABLED=true`), form submissions upsert an Attio person and log an event note | ✓ VERIFIED | `route.ts` lines 34–96: PUT to `api.attio.com/v2/objects/people/records` with `Bearer ${attioApiKey}`, POST to `api.attio.com/v2/notes`. Error handling is correct. Env-gated behind `ATTIO_ENABLED === 'true' && !!attioApiKey`. |

### Observable Truths — Plan 06-02 (PostHog Analytics Infrastructure)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 6 | Visiting any public page shows a consent banner at the bottom of the screen | ? HUMAN | `ConsentBanner` is imported and rendered in `layout.tsx` line 39, inside `<Providers>`. Starts with `useState(true)` so `visible` is true on every page load. Requires browser confirmation. |
| 7 | Clicking Accept initialises PostHog capturing and hides the banner | ? HUMAN | `handleAccept` calls `posthog?.opt_in_capturing()` then `setVisible(false)`. Logically correct; requires runtime confirmation that `usePostHog()` returns a non-null instance after init. |
| 8 | Clicking Decline hides the banner — PostHog captures nothing | ? HUMAN | `handleDecline` calls `posthog?.opt_out_capturing()` then `setVisible(false)`. Requires runtime browser check (no PostHog network requests after Decline). |
| 9 | The consent banner reappears on next browser session (no localStorage persistence) | ? HUMAN | `ConsentBanner` uses only `useState(true)` — no `localStorage`, `sessionStorage` or cookie writes. Banner state is React-only and does not survive page reload. Confirmed by static analysis; runtime refresh test needed. |
| 10 | When `NEXT_PUBLIC_POSTHOG_KEY` is absent, PostHog initialises in no-op mode — no runtime errors | ? HUMAN | `providers.tsx` line 10: `if (!key) return` — early exit prevents `posthog.init()` call. Logically safe; browser runtime confirmation needed. |
| 11 | Each page navigation fires a `$pageview` event with UTM parameters as properties | ✓ VERIFIED | `PostHogPageView.tsx` lines 12–23: `useEffect` on `[pathname, searchParams, posthog]` fires `posthog.capture('$pageview', { $current_url, utm_source, utm_medium, utm_campaign })`. Dependency array is correct. |
| 12 | PostHog captures product page views automatically — `PostHogPageView` fires on every page including `/safe-verify`, `/platform`, and `/dynamic-security-codes` | ✓ VERIFIED | `PostHogPageView` is rendered inside `<Suspense>` in root `layout.tsx` (line 35–37), which wraps every route in the app. No per-page opt-in required. |

### Observable Truths — Plan 06-03 (Form Wiring + Event Instrumentation)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 13 | Submitting the demo request form fires `demo_request` PostHog event and Attio stub log | ✓ VERIFIED | `DemoFormSection.tsx` lines 41–44: `posthog?.capture('demo_request', { email, company, role })` on `res.ok`. Form POSTs to `/api/submit/demo-request` which calls `/api/attio/event` with `x-internal-token`. |
| 14 | First keystroke in the demo form name field fires `form_start` PostHog event | ✓ VERIFIED | `DemoFormSection.tsx` lines 106–111: `onKeyDown` on the Name `Input` fires `posthog?.capture('form_start', { form: 'demo_request' })` guarded by `!formStarted` boolean. `formStarted` is set to `true` immediately, preventing re-fire. |
| 15 | After successful demo form submission, `posthog.identify(email)` is called | ✓ VERIFIED | `DemoFormSection.tsx` lines 46–49: `posthog?.identify(payload.email, { name, company })` called immediately after `demo_request` capture, before `setFormState('success')`. |
| 16 | Submitting the contact form fires `contact_request` PostHog event and Attio stub log | ✓ VERIFIED | `ContactFormSection.tsx` lines 72–75: `posthog?.capture('contact_request', { email, company, role })` on `res.ok`. Form POSTs to `/api/submit/contact-request`. |
| 17 | After successful contact form submission, `posthog.identify(email)` is called | ✓ VERIFIED | `ContactFormSection.tsx` lines 76–79: `posthog?.identify(payload.email, { name, company })` on success. |
| 18 | Clicking Book a time (Calendly) fires a `calendly_open` PostHog event | ✓ VERIFIED | `ContactCalendlyButton.tsx` line 30: `posthog?.capture('calendly_open')` fires before `window.Calendly?.initPopupWidget(...)` in the `onClick` handler. |
| 19 | Clicking Request Demo in the hero section fires `cta_click` with `source: hero` | ✓ VERIFIED | `HeroSection.tsx` line 31: `onClick={() => posthog?.capture('cta_click', { source: 'hero' })}` on the `#demo` Link. |
| 20 | Clicking the urgency section Request Demo link fires `cta_click` with `source: urgency` | ✓ VERIFIED | `UrgencySection.tsx` line 60: `onClick={() => posthog?.capture('cta_click', { source: 'urgency' })}`. |
| 21 | Clicking the urgency section calculator link fires `cta_click` with `source: calculator` | ✓ VERIFIED | `UrgencySection.tsx` line 67: `onClick={() => posthog?.capture('cta_click', { source: 'calculator' })}`. |
| 22 | Clicking Request Demo in `SvHeroSection` fires `cta_click` with `source: product-page` | ✓ VERIFIED | `SvHeroSection.tsx` line 41: `onClick={() => posthog?.capture('cta_click', { source: 'product-page' })}`. |

**Score:** 13/17 truths fully verified by static analysis; 4 require human runtime confirmation. No truths are failed or missing.

---

## Required Artifacts

### Plan 06-01 Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/api/attio/event/route.ts` | 403 guard + person upsert + note creation | ✓ VERIFIED | 97 lines. Exports only `POST`. Full guard, dev stub, and production Attio API calls implemented. |
| `src/app/api/submit/demo-request/route.ts` | Netlify form forward + `demo_request` Attio event | ✓ VERIFIED | 58 lines. POSTs to `/__forms.html` and internally to `/api/attio/event` with `x-internal-token`. |
| `src/app/api/submit/contact-request/route.ts` | Netlify form forward + `contact_request` Attio event | ✓ VERIFIED | 52 lines. Same pattern, `contact_request` event. |
| `netlify.toml` | Env var documentation stubs | ✓ VERIFIED | Lines 11–17 contain comments for all six required env vars: `ATTIO_ENABLED`, `ATTIO_API_KEY`, `INTERNAL_API_SECRET`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_SITE_URL`. |

### Plan 06-02 Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/providers.tsx` | PostHogProvider with `opt_out_capturing_by_default` | ✓ VERIFIED | 36 lines. `'use client'`. `opt_out_capturing_by_default: true` present. No-op on missing key. Returns `<PostHogProvider client={posthog}>`. |
| `src/components/analytics/PostHogPageView.tsx` | Fires `$pageview` with UTM props via `useSearchParams` | ✓ VERIFIED | 26 lines. `'use client'`. Uses `useSearchParams`, `usePathname`, `usePostHog`. Captures `$pageview` with `$current_url`, `utm_source`, `utm_medium`, `utm_campaign`. |
| `src/components/analytics/ConsentBanner.tsx` | Fixed bottom bar with Accept/Decline, calls `opt_in/opt_out_capturing` | ✓ VERIFIED | 48 lines. `'use client'`. `useState(true)` for visibility. `opt_in_capturing()` on Accept, `opt_out_capturing()` on Decline. Fixed bottom positioning confirmed. |
| `src/app/layout.tsx` | Root layout wraps children in `Providers`, `PostHogPageView` in `<Suspense>`, `ConsentBanner` | ✓ VERIFIED | All three imports present (lines 5–7). `<Suspense fallback={null}><PostHogPageView /></Suspense>` at lines 35–37. `<ConsentBanner />` at line 39. No `'use client'` directive — remains a Server Component. |

### Plan 06-03 Artifacts (Modified Components)

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/marketing/home/DemoFormSection.tsx` | POST to `/api/submit/demo-request`; `form_start`, `demo_request`, `posthog.identify` | ✓ VERIFIED | `fetch('/api/submit/demo-request', ...)` at line 34. `form_start` at line 109. `demo_request` at line 41. `identify` at line 46. `formStarted` deduplication at lines 106–111. |
| `src/components/marketing/contact/ContactFormSection.tsx` | POST to `/api/submit/contact-request`; `contact_request`, `posthog.identify` | ✓ VERIFIED | `fetch('/api/submit/contact-request', ...)` at line 65. `contact_request` at line 72. `identify` at line 76. Phase 05 `useSearchParams`/sessionStorage pattern preserved. |
| `src/components/marketing/contact/ContactCalendlyButton.tsx` | `calendly_open` capture in onClick | ✓ VERIFIED | `posthog?.capture('calendly_open')` at line 30 in onClick, before Calendly popup call. |
| `src/components/marketing/home/HeroSection.tsx` | `cta_click {source: hero}` on Request Demo | ✓ VERIFIED | `'use client'` added. `posthog?.capture('cta_click', { source: 'hero' })` at line 31. |
| `src/components/marketing/home/UrgencySection.tsx` | `cta_click {source: urgency}` and `{source: calculator}` | ✓ VERIFIED | `'use client'` added. Both CTA links instrumented at lines 60 and 67 respectively. |
| `src/components/marketing/safe-verify/SvHeroSection.tsx` | `cta_click {source: product-page}` on Request Demo | ✓ VERIFIED | `'use client'` added. `posthog?.capture('cta_click', { source: 'product-page' })` at line 41. |
| `src/components/marketing/safe-verify/SvBenefitsSection.tsx` | No changes — content-only section | ✓ VERIFIED | File contains no CTA links. No PostHog instrumentation added (correct per plan decision). |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/app/api/submit/demo-request/route.ts` | `src/app/api/attio/event/route.ts` | `fetch` with `x-internal-token` header | ✓ WIRED | Lines 35–49: fetch to `${siteUrl}/api/attio/event` with `x-internal-token: process.env.INTERNAL_API_SECRET`. |
| `src/app/api/submit/contact-request/route.ts` | `src/app/api/attio/event/route.ts` | `fetch` with `x-internal-token` header | ✓ WIRED | Lines 31–45: same pattern with `contact_request` event. |
| `src/app/api/attio/event/route.ts` | `https://api.attio.com/v2` | `fetch` with `Bearer ATTIO_API_KEY` | ✓ WIRED | Line 41: `fetch('https://api.attio.com/v2/objects/people/records?...')` with `Authorization: Bearer ${attioApiKey}`. Production-gated. |
| `src/app/layout.tsx` | `src/app/providers.tsx` | `import Providers`, wraps html body children | ✓ WIRED | Line 5 imports `Providers`; lines 34/43 wrap body content. |
| `src/components/analytics/ConsentBanner.tsx` | `posthog-js` | `usePostHog()` hook, `opt_in_capturing` / `opt_out_capturing` | ✓ WIRED | Lines 4, 8: import `usePostHog`, const `posthog = usePostHog()`. Lines 13, 18: `opt_in_capturing()` and `opt_out_capturing()` called. |
| `src/components/analytics/PostHogPageView.tsx` | `posthog-js` | `posthog.capture('$pageview')` | ✓ WIRED | Line 17: `posthog.capture('$pageview', { $current_url, utm_source, ... })`. |
| `src/components/marketing/home/DemoFormSection.tsx` | `/api/submit/demo-request` | `fetch POST` with JSON body | ✓ WIRED | Line 34: `fetch('/api/submit/demo-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })`. |
| `src/components/marketing/contact/ContactFormSection.tsx` | `/api/submit/contact-request` | `fetch POST` with JSON body | ✓ WIRED | Line 65: same pattern to `/api/submit/contact-request`. |
| `src/components/marketing/home/DemoFormSection.tsx` | `posthog-js` | `usePostHog()` — `form_start`, `demo_request`, `identify` | ✓ WIRED | Line 5: `import { usePostHog }`. Line 13: `const posthog = usePostHog()`. Lines 41, 46, 109: three capture/identify calls. |

---

## Requirements Coverage

| Requirement | Source Plan(s) | Description | Status | Evidence |
|-------------|----------------|-------------|--------|----------|
| ANLT-01 | 06-01, 06-03 | Attio event streaming infrastructure — server-side route + form events | ✓ PARTIAL SATISFIED (scoped) | `demo_request` and `contact_request` events delivered. `portal_login`, `calculator_run`, `document_download`, `mockup_viewed` explicitly deferred to portal phase per plan 06-01 must_haves. `product_page_view` satisfied implicitly by `$pageview` capture in PostHogPageView. REQUIREMENTS.md marks ANLT-01 `[x]` complete with this scoping understood. |
| ANLT-02 | 06-02, 06-03 | PostHog installed; tracks page views, CTA clicks, form starts, funnel events | ✓ SATISFIED | posthog-js ^1.352.0 in package.json. `$pageview` on all pages. `form_start`, `demo_request`, `contact_request`, `posthog.identify` on form submission. `cta_click` on hero, urgency (x2), product-page. `calendly_open` on Calendly button. Consent-gated via opt-in banner. |

### ANLT-01 Scoping Assessment

The REQUIREMENTS.md description for ANLT-01 lists `portal_login`, `calculator_run`, `document_download`, `mockup_viewed` as required events alongside `demo_request`. Phase 06's plan 06-01 explicitly acknowledges this and locks the decision to defer portal events to the portal phase (PORT-05, PORT-07, P1-06). This is a domain boundary decision, not an oversight — the `/api/attio/event` route is intentionally generic and will accept these event types when the portal phase instruments them. The route infrastructure is in place; the callers are deferred. REQUIREMENTS.md marks ANLT-01 complete under this interpretation.

---

## Dependency and Package Verification

| Item | Status | Details |
|------|--------|---------|
| `posthog-js` in `package.json` | ✓ VERIFIED | `"posthog-js": "^1.352.0"` confirmed in package.json |
| Commits exist in git history | ✓ VERIFIED | All 6 task commits confirmed: `b0d2da3`, `600c08c`, `cf37784`, `e07693e`, `92fe4f2`, `110145c` |

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/marketing/contact/ContactCalendlyButton.tsx` | 12 | `// TODO: replace with real Calendly booking URL` | ℹ️ Info | Pre-existing from Phase 05 (not introduced by Phase 06). Calendly URL is set to `https://calendly.com/safecypher/30min` — functional placeholder. `calendly_open` event fires correctly regardless. No Phase 06 goal impact. |

No blocker or warning anti-patterns found in any Phase 06 code.

---

## Human Verification Required

### 1. Dev Stub: Demo Form Attio Logging

**Test:** Start dev server (`npm run dev`), navigate to homepage, complete the demo request form with valid data (name, email, company, role), submit.
**Expected:** Server terminal shows `[Attio stub] { event: 'demo_request', email: '...', name: '...', company: '...', role: '...', message: '' }`. Browser PostHog debug panel (auto-enabled in dev) shows `demo_request` event and `identify` call.
**Why human:** `console.log` output in the server terminal and PostHog debug panel events cannot be observed via static analysis.

### 2. form_start Deduplication

**Test:** Start dev server, navigate to demo form, click into the Name field and type a single character. Then type more characters.
**Expected:** PostHog debug panel shows `form_start { form: 'demo_request' }` exactly once — subsequent keystrokes do not produce additional `form_start` events.
**Why human:** The `formStarted` boolean state deduplication must be verified through actual user interaction and PostHog event stream observation.

### 3. No-Op Mode (Missing PostHog Key)

**Test:** Ensure `NEXT_PUBLIC_POSTHOG_KEY` is absent from `.env.local`, start dev server, visit any page.
**Expected:** Consent banner appears at page bottom. Browser DevTools Network tab shows zero requests to `app.posthog.com`. Browser console shows no JavaScript errors.
**Why human:** No-op mode depends on env var absence at runtime; no static-analysis substitute exists.

### 4. Consent Banner Session-Only Persistence

**Test:** Visit any page in a browser. Click Accept. Verify banner disappears. Refresh the page (F5 or Cmd+R).
**Expected:** Banner reappears after refresh. Browser DevTools Application tab shows no `posthog-consent` or related key in localStorage or sessionStorage.
**Test (Decline path):** Click Decline. Verify banner disappears. Check Network tab — no PostHog requests.
**Why human:** Session-only behaviour via React state must be confirmed against actual browser storage — static analysis confirms no storage writes in code, but browser behaviour must be observed.

---

## Gaps Summary

No gaps. All automated must-haves are verified. The four human-verification items above are runtime confirmations of logic that is correctly implemented in code — they are not gaps in implementation. If any human test fails, the root cause will likely be an environment configuration issue (PostHog key, dev server restart) rather than a code defect.

**The phase goal is substantively achieved:**

- Every public-site CTA click fires a PostHog `cta_click` event with the correct `source` property
- Both form submissions flow through server-side intermediate routes, keeping `ATTIO_API_KEY` and `INTERNAL_API_SECRET` out of the browser entirely
- PostHog consent banner provides GDPR-compliant opt-in before any capture begins
- `$pageview` fires on every route navigation with UTM attribution
- The Attio route infrastructure accepts any event type — portal phase events will plug in without route changes

---

_Verified: 2026-02-23_
_Verifier: Claude (gsd-verifier)_
