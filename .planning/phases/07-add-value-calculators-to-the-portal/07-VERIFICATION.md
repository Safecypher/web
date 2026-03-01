---
phase: 07-add-value-calculators-to-the-portal
verified: 2026-03-01T09:00:00Z
status: passed
score: 10/10 must-haves verified
re_verification: false
human_verification:
  - test: "Magic link email delivery"
    expected: "Entering a real email on /portal/login causes a Supabase magic link email to arrive in the inbox"
    why_human: "Email delivery requires a live Supabase project with real NEXT_PUBLIC_SUPABASE_URL configured — cannot verify programmatically without network call to real service"
  - test: "PDF file content on download"
    expected: "Clicking 'Download report' produces a downloaded .pdf file with 'SafeCypher Value Calculator Report' as the title and the Year 1 Net Savings figure visible"
    why_human: "jsPDF runs browser-side; cannot open the generated binary in a static grep check"
  - test: "Slider real-time update responsiveness"
    expected: "Moving any slider causes the Year 1 Net Savings headline to update with no perceptible lag"
    why_human: "React reactivity requires browser rendering — cannot verify from static code analysis"
  - test: "Attio console events in dev"
    expected: "Dev terminal shows [Attio stub] { event: 'portal_login' }, [Attio stub] { event: 'calculator_run' }, and [Attio stub] { event: 'mockup_viewed' } on corresponding user actions"
    why_human: "Server Action console output requires running dev server"
  - test: "Homepage teaser redirect chain"
    expected: "Entering a number and clicking 'See your savings' navigates browser to /portal/login?callbackUrl=%2Fportal%2Fcalculator%3FportfolioSize%3DVALUE"
    why_human: "window.location.href navigation requires browser — already verified by human sign-off on plan 07-05 but cannot verify from static analysis"
  - test: "PORT-01 requirement — Loops email provider"
    expected: "PORT-01 specifies NextAuth.js v5 + Loops for email delivery; implementation uses Supabase magic links instead. Functional behavior (email → magic link → session) is delivered, but the specified provider (Loops) is not used. Confirm this deviation is acceptable."
    why_human: "Technology substitution decision requires human confirmation that Supabase magic links satisfy the PORT-01 intent"
---

# Phase 7: Add Value Calculators to the Portal — Verification Report

**Phase Goal:** Prospects authenticated in the portal can use an interactive ROI calculator to quantify the financial impact of CNP fraud and SafeCypher's solution — with real-time results, shareable URL state, PDF export, and pre-filled sales handoff. The homepage teaser funnels visitors into the portal, and the agentic demo page showcases the product in action.

**Verified:** 2026-03-01T09:00:00Z
**Status:** PASSED (with human verification items noted)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #  | Truth                                                                                                  | Status     | Evidence                                                                                                   |
|----|--------------------------------------------------------------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------|
| 1  | Unauthenticated request to /portal/calculator redirects to /portal/login?callbackUrl=/portal/calculator | VERIFIED  | `src/lib/supabase/middleware.ts` lines 46-55: `!isAuthRoute && pathname.startsWith('/portal/') && !user` → redirect with `callbackUrl` param |
| 2  | User can enter email on /portal/login and submit magic link request                                     | VERIFIED  | `src/app/(portal)/portal/login/page.tsx`: full form with email input, `signInWithOtp` call, "Check your email" state |
| 3  | Clicking magic link exchanges PKCE code and redirects to callbackUrl                                   | VERIFIED  | `src/app/(portal)/portal/auth/callback/route.ts`: `exchangeCodeForSession(code)` → `NextResponse.redirect(callbackUrl)` |
| 4  | Attio route accepts calculator_run events without TypeError                                             | VERIFIED  | `src/app/api/attio/event/route.ts` line 36: `if (body.name && body.email)` guard; `AttioEventBody` all fields optional + index signature |
| 5  | Formula engine produces Year 1 Net Savings = $3,866,043.47 at USD defaults                             | VERIFIED  | `src/lib/calculator/engine.ts` implements all 10 steps; independently verified via inline computation: $3,866,043.47 |
| 6  | Breakeven computed as 23.85 days at USD defaults                                                        | VERIFIED  | Engine formula: `(totalImplCost / monthlySavingsYr1) * (365/12)` = 23.85 days confirmed by computation    |
| 7  | txFeesYr1Combined uses cvvRequired base (not total CNP): $2,356,062.50                                 | VERIFIED  | Engine line 43: `txFeesYr1_D = cvvRequired_D * year1AdoptionRate * feePerTx` — confirmed $2,356,062.50    |
| 8  | Authenticated user sees portal dashboard at /portal with sidebar, links to /portal/calculator and /portal/demo | VERIFIED | `src/app/(portal)/portal/page.tsx`: dashboard with buttons; `src/components/portal/PortalSidebar.tsx`: Calculator + Agentic Demo links; `src/app/(portal)/layout.tsx`: NuqsAdapter + PortalSidebar wired |
| 9  | Calculator at /portal/calculator renders sliders; changing slider updates Year 1 Net Savings in real time | VERIFIED | `CalculatorPage.tsx`: 4 simple-mode `InputSlider` components; `useMemo(() => calculate(inputs), [inputs])` for reactive outputs |
| 10 | Calculator state encoded in URL — reloading preserves slider values                                     | VERIFIED  | `CalculatorPage.tsx`: all inputs bound via `useQueryState` from nuqs with short param keys (da, ca, y1a, etc.) |

**Score:** 10/10 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|---|---|---|---|
| `src/proxy.ts` | Next.js 16 proxy entry calling `updateSession` | VERIFIED | 13 lines, exports `proxy` function (Next.js 16 naming), imports and calls `updateSession` |
| `src/lib/supabase/middleware.ts` | Session refresh + /portal/* guard using `getUser()` | VERIFIED | 61 lines, uses `getUser()` exclusively, redirects with `callbackUrl`, returns `supabaseResponse` |
| `src/lib/supabase/client.ts` | `createBrowserClient` factory for Client Components | VERIFIED | 8 lines, `createBrowserClient(URL, KEY)` exported as `createClient()` |
| `src/lib/supabase/server.ts` | `createServerClient` factory with cookie store | VERIFIED | 26 lines, `createServerClient` with full cookie handlers, awaits `cookies()` |
| `src/app/(portal)/portal/login/page.tsx` | Magic link form, resend countdown, callbackUrl support | VERIFIED | 169 lines, full form with `signInWithOtp`, 60-second resend countdown, `useSearchParams` for callbackUrl |
| `src/app/(portal)/portal/auth/callback/route.ts` | PKCE code exchange, redirect to callbackUrl | VERIFIED | 47 lines, `exchangeCodeForSession(code)`, `NextResponse.redirect(new URL(callbackUrl, origin))` |
| `src/lib/calculator/types.ts` | `CalculatorInputs` and `CalculatorOutputs` interfaces | VERIFIED | 102 lines, complete interfaces with all fields including `sensitivityRows`, `breakevenDays: number | null` |
| `src/lib/calculator/defaults.ts` | `USD_DEFAULTS`, `PORTFOLIO_SPLIT_RATIO`, `REGION_CURRENCY` | VERIFIED | 53 lines, all three exports present, `TX_PER_ACCOUNT` bonus export for simple-mode scaling |
| `src/lib/calculator/engine.ts` | Pure `calculate(inputs): CalculatorOutputs` function | VERIFIED | 168 lines, zero React/Next imports, all 10 formula steps with correct cvvRequired fee base |
| `src/lib/calculator/engine.test.ts` | Vitest tests against spreadsheet values | VERIFIED | 99 lines, 14 tests using `toBeCloseTo` against verified cell values |
| `src/app/(portal)/layout.tsx` | `NuqsAdapter` wrapping portal children only | VERIFIED | 19 lines, `NuqsAdapter` + `PortalSidebar` — NOT in root layout.tsx (confirmed by grep) |
| `src/app/(portal)/portal/page.tsx` | Dashboard with welcome content and CTA buttons | VERIFIED | 27 lines, "Welcome to SafeCypher Portal", buttons to /portal/calculator and /portal/demo |
| `src/app/(portal)/portal/calculator/page.tsx` | Route passing portfolioSize to CalculatorPage | VERIFIED | 18 lines, reads portfolioSize from searchParams, renders `<CalculatorPage portfolioSize={...}>` |
| `src/components/portal/PortalSidebar.tsx` | Sidebar with Calculator, Demo links, user email, sign-out | VERIFIED | 122 lines, both nav links, `getUser()` for email display, `signOut()` + router.push on sign-out |
| `src/components/portal/calculator/CalculatorPage.tsx` | Main orchestrator — all useQueryState bindings, debounced Attio | VERIFIED | 664 lines, all inputs bound via `useQueryState`, `fireCalculatorRun` debounced at 500ms, `calculate(inputs)` via `useMemo` |
| `src/components/portal/calculator/InputSlider.tsx` | Slider with click-to-edit numeric override | VERIFIED | 105 lines, range input + toggle-to-text-input on click, clamp on blur/Enter |
| `src/components/portal/calculator/ResultsPanel.tsx` | Headline savings + expandable sections + contact CTA | VERIFIED | 139 lines, `text-4xl font-bold text-primary` for Year 1 savings, "Talk to us about your results" CTA with contactHref |
| `src/components/portal/calculator/SavingsBarChart.tsx` | Recharts BarChart — Year 1 vs Ongoing | VERIFIED | 53 lines, `'use client'`, `ResponsiveContainer + BarChart + Bar + XAxis + YAxis + Tooltip` |
| `src/components/portal/calculator/SensitivityTable.tsx` | 4-row table, 90% row "Mandatory adoption" badge | VERIFIED | 58 lines, maps 4 rows, `isMandatory = row.adoptionRate === 0.90` → badge, `isCurrentRate` indicator |
| `src/components/portal/calculator/PdfExportButton.tsx` | Dynamic jsPDF import, "Download report" button | VERIFIED | 159 lines, `await import('jspdf')` in click handler only, "SafeCypher Value Calculator Report" title, `doc.save()` |
| `src/app/actions/attio.ts` | Server Actions with absolute BASE URL — fireCalculatorRun, firePortalLogin, fireMockupViewed | VERIFIED | 55 lines, `'use server'`, `const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'`, all three exports |
| `src/app/(portal)/portal/demo/page.tsx` | Iframe + context panel + DemoPageTracker | VERIFIED | 48 lines, iframe `src="/demos/boa/bofa-agentic-banking-mockup.html"` (file confirmed in public/), "Agentic Commerce Demo" heading, `<DemoPageTracker />` |
| `src/app/(portal)/portal/demo/DemoPageTracker.tsx` | Client component firing fireMockupViewed on mount | VERIFIED | 14 lines, `'use client'`, `useEffect` → `fireMockupViewed(user?.email)` |
| `src/components/marketing/home/DemoFormSection.tsx` | Homepage teaser widget with portfolioSize → redirect chain | VERIFIED | 209 lines, `handleTeaserSubmit` redirects to `/portal/login?callbackUrl=${encodeURIComponent(innerCallbackUrl)}` |
| `src/components/marketing/contact/ContactFormSection.tsx` | Calculator results summary box when yr1 param present | VERIFIED | 218 lines, reads `yr1Param` and `breakevenParam`, renders summary box when `source === 'calculator' && yr1Savings != null` |
| `public/demos/boa/bofa-agentic-banking-mockup.html` | Demo HTML file served to iframe | VERIFIED | File exists at `public/demos/boa/bofa-agentic-banking-mockup.html` |

---

### Key Link Verification

| From | To | Via | Status | Details |
|---|---|---|---|---|
| `src/proxy.ts` | `src/lib/supabase/middleware.ts` | `import updateSession` | WIRED | Line 2: `import { updateSession } from '@/lib/supabase/middleware'`; called on line 5 |
| `src/lib/supabase/middleware.ts` | `supabase.auth.getUser()` | revalidated auth check | WIRED | Line 36: `await supabase.auth.getUser()` — correctly avoids getSession() |
| `src/app/(portal)/portal/auth/callback/route.ts` | `supabase.auth.exchangeCodeForSession` | PKCE token exchange | WIRED | Line 33: `await supabase.auth.exchangeCodeForSession(code)` |
| `src/app/api/attio/event/route.ts` | person upsert block | `if (body.name && body.email)` guard | WIRED | Line 36: `if (body.name && body.email)` wraps entire person upsert |
| `src/lib/calculator/engine.ts` | `src/lib/calculator/types.ts` | `CalculatorInputs` / `CalculatorOutputs` import | WIRED | Line 2: `import type { CalculatorInputs, CalculatorOutputs } from './types'` |
| `src/lib/calculator/engine.test.ts` | `src/lib/calculator/engine.ts` | `calculate(USD_DEFAULTS)` | WIRED | Line 3-4: imports `calculate` and `USD_DEFAULTS`; used in all 14 tests |
| `src/components/portal/calculator/CalculatorPage.tsx` | `src/lib/calculator/engine.ts` | `calculate(inputs)` in useMemo | WIRED | Line 5: `import { calculate }`, line 234: `useMemo(() => calculate(inputs), [inputs])` |
| `src/components/portal/calculator/CalculatorPage.tsx` | `src/app/actions/attio.ts` | `fireCalculatorRun` debounced 500ms | WIRED | Line 8: `import { fireCalculatorRun }`, line 242: `fireCalculatorRun(inputs, outputs, userEmail)` in setTimeout |
| `src/app/actions/attio.ts` | `/api/attio/event` | `fetch` with absolute BASE URL | WIRED | Line 6: `const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'`; all 3 functions use `${BASE}/api/attio/event` |
| `src/app/(portal)/layout.tsx` | `nuqs/adapters/next/app` | `NuqsAdapter` wrapping portal only | WIRED | Line 1: `import { NuqsAdapter } from 'nuqs/adapters/next/app'`; root layout.tsx confirmed free of NuqsAdapter |
| `src/components/marketing/home/DemoFormSection.tsx` | `/portal/login` | form onSubmit with nested callbackUrl | WIRED | Lines 62-67: `handleTeaserSubmit` → `window.location.href = '/portal/login?callbackUrl=' + encodeURIComponent(innerCallbackUrl)` |
| `src/app/(portal)/portal/demo/page.tsx` | `src/app/actions/attio.ts` | `DemoPageTracker` fires `fireMockupViewed` on mount | WIRED | `DemoPageTracker.tsx` line 4: `import { fireMockupViewed }`, line 10: `fireMockupViewed(data.user?.email)` |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|---|---|---|---|---|
| PORT-01 | Not claimed in any plan | NextAuth.js v5 magic-link auth (Loops email provider) | NEEDS HUMAN | Functional intent met: Supabase magic links deliver the same UX flow. Tech spec (NextAuth.js + Loops) substituted for Supabase. ROADMAP Phase 7 does NOT list PORT-01 in its requirements — only PORT-02 through PORT-08 and HOME-07. The traceability table marks it Complete but no plan claimed it. This deviation should be confirmed acceptable. |
| PORT-02 | 07-01, 07-05 | Middleware protects all /portal/* routes; unauthenticated redirected with callbackUrl | SATISFIED | `src/lib/supabase/middleware.ts`: auth guard on all /portal/* except /portal/login and /portal/auth/ |
| PORT-03 | 07-03, 07-05 | Portal dashboard /portal — landing page after login | SATISFIED | `src/app/(portal)/portal/page.tsx`: welcome content with links to calculator and demo |
| PORT-04 | 07-01, 07-05 | Sales team Attio notification on new portal signup | SATISFIED | `firePortalLogin` in `src/app/actions/attio.ts`; fired by `PortalLoginTracker` on portal dashboard mount |
| PORT-05 | 07-02, 07-03, 07-05 | Value calculator with sliders, real-time outputs, Attio event on change (500ms debounce) | SATISFIED | Full CalculatorPage implementation; engine verified against spreadsheet ($3,866,043.47 Yr1 savings, 23.85-day breakeven, txFees $2,356,062.50, sensitivity rows correct); URL state via nuqs; SavingsBarChart; SensitivityTable; PdfExportButton |
| PORT-06 | 07-03, 07-05 | Calculator CTA: "Talk to us about your results" → contact form with results pre-populated | SATISFIED | `ResultsPanel.tsx` line 131: `<Link href={contactHref}>`; ContactFormSection shows yr1/breakeven summary box |
| PORT-07 | 07-04, 07-05 | Agentic demo /portal/demo — iframe + mockup_viewed Attio event | SATISFIED | `demo/page.tsx` + `DemoPageTracker.tsx`; demo HTML confirmed at `public/demos/boa/bofa-agentic-banking-mockup.html` |
| PORT-08 | 07-04, 07-05 | Homepage teaser: portfolio size → /portal/login → /portal/calculator?portfolioSize=VALUE | SATISFIED | `DemoFormSection.tsx` teaser form; `CalculatorPage.tsx` reads portfolioSize and splits 70/30 via PORTFOLIO_SPLIT_RATIO |
| HOME-07 | 07-04, 07-05 | Short demo form + portfolio size teaser → /portal/calculator with value pre-populated | SATISFIED | DemoFormSection has both demo request form AND teaser widget; portfolioSize flows through login to calculator |

**PORT-01 note:** PORT-01 was not listed in ROADMAP Phase 7 `requirements` field (which only lists PORT-02 through PORT-08 and HOME-07). It appears in the REQUIREMENTS.md traceability table as "Complete" — this is the only discrepancy. The functional behavior (email → magic link → authenticated session with callbackUrl preserved) is fully delivered. The technology choice (Supabase vs NextAuth.js + Loops) is a documented architectural decision tracked in 07-CONTEXT.md and 07-01-SUMMARY.md.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|---|---|---|---|---|
| `src/lib/calculator/defaults.ts` | 6 | Comment: "GBP/EUR numeric defaults pending client confirmation — using USD values as placeholder" | Info | Regional calculations will use USD defaults for GBP/EUR regions; region selector changes currency symbol only, not numeric defaults. Acceptable for current phase. |

No TODO/FIXME/HACK/placeholder comments found in production code paths. No empty return stubs. No `return null` stubs found outside intentional tracker components. jsPDF loaded dynamically — no SSR window errors. Recharts marked `'use client'` — no ResizeObserver errors.

---

### Human Verification Required

#### 1. Magic Link Email Delivery

**Test:** Create a Supabase project with real env vars. Visit /portal/login and enter a real work email.
**Expected:** A magic link email arrives from Supabase within 30 seconds.
**Why human:** Email delivery requires a live Supabase project — cannot verify from static code analysis. Already verified by human sign-off on plan 07-05.

#### 2. PDF File Download Content

**Test:** Navigate to /portal/calculator. Click "Download report".
**Expected:** A PDF file downloads named `safecypher-value-report.pdf`. Opening it shows "SafeCypher Value Calculator Report" as the title and the Year 1 Net Savings figure in the correct currency.
**Why human:** jsPDF runs browser-side; binary PDF output cannot be verified from static code checks. Already verified by human sign-off on plan 07-05.

#### 3. Real-Time Slider Responsiveness

**Test:** Navigate to /portal/calculator. Move the Debit Accounts slider.
**Expected:** Year 1 Net Savings headline updates immediately with no visible lag.
**Why human:** React reactivity requires browser rendering. Already verified by human sign-off on plan 07-05.

#### 4. Attio Dev Console Events

**Test:** Run `npm run dev`. Navigate to /portal, then /portal/calculator (move a slider and wait 500ms), then /portal/demo.
**Expected:** Terminal shows `[Attio stub] { event: 'portal_login' }`, `[Attio stub] { event: 'calculator_run', ... }`, and `[Attio stub] { event: 'mockup_viewed' }`.
**Why human:** Server Action console output requires running dev server. Already verified by human sign-off on plan 07-05.

#### 5. PORT-01 Technology Deviation Confirmation

**Test:** Confirm with the project owner that using Supabase magic links in place of NextAuth.js v5 + Loops is acceptable for PORT-01.
**Expected:** Stakeholder confirms the functional outcome (email → magic link → session) satisfies the requirement regardless of the email provider.
**Why human:** Technology substitution is a business/architectural decision, not a code correctness issue. The ROADMAP itself does not list PORT-01 in Phase 7's requirements, suggesting this substitution was already accepted during planning.

---

### Gaps Summary

No blocking gaps found. All 10 observable truths verified against the codebase. All 26 artifacts exist, are substantive (not stubs), and are correctly wired. All 12 key links verified. All 8 ROADMAP-listed requirements (PORT-02 through PORT-08 and HOME-07) are satisfied by concrete code evidence.

One informational item: PORT-01 references NextAuth.js v5 + Loops, but the implementation uses Supabase magic links. This is a documented technology substitution — not a functional gap. The ROADMAP Phase 7 `requirements` field does not list PORT-01, and the 07-01-SUMMARY.md documents the Supabase decision. This is flagged for human confirmation only.

The engine math has been independently verified against the spreadsheet:
- `txFeesYr1Combined = $2,356,062.50` (cvvRequired base, not total CNP — critical correctness)
- `netFraudSavingsYr1Combined = $3,596,319.51` (cell G62)
- `breakevenDays = 23.85` (cell G65)
- `yr1HaloBonusCombined = $269,723.96` (cell G92)
- `totalYr1Savings = $3,866,043.47` (cell G97 — interchange NOT included)

---

_Verified: 2026-03-01T09:00:00Z_
_Verifier: Claude (gsd-verifier)_
