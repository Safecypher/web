# Phase 7: Add Value Calculators to the Portal - Research

**Researched:** 2026-02-27
**Domain:** Supabase Auth (magic links), interactive financial calculator, portal shell, chart/PDF generation, URL state management
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Calculator scope**
- One calculator at `/portal/calculator` with progressive disclosure (simple mode → advanced mode) — not multiple product-specific calculators
- Portal is calculator-focused: the dashboard is a minimal landing page routing to the calculator; auth middleware is wired but simple
- Portal shell: minimal left sidebar nav (SafeCypher logo, nav links, user/logout at bottom) — marketing nav does NOT appear inside the portal
- No role-based access in this phase — all portal users have the same access level; admin analytics dashboard is a future phase

**Auth**
- Passwordless via Supabase Auth magic links
- Magic links are single-use by default (Supabase behaviour) — link expires after first click; this is sufficient link security
- Session management: default Supabase behaviour (no additional device fingerprinting or short expiry needed)
- Auth flow: Homepage teaser → `/portal/login` (email input) → magic link email → `/portal/calculator` (pre-filled)
- Portal middleware protects all `/portal/*` routes; unauthenticated users redirected to `/portal/login` with `callbackUrl` preserved

**Progressive calculator — Simple mode**
- Entry inputs: Debit card accounts and Credit card accounts (two separate fields — not combined)
- Fraud rate (%) is shown in simple mode
- Adoption rate is shown in simple mode as a lever — it's the biggest driver of savings and should be visible and adjustable
- All other inputs (fraud parameters, implementation costs) use industry defaults in simple mode
- Slider-primary interaction: each input is a slider; clicking the displayed value makes it editable as a number field

**Progressive calculator — Advanced mode**
- Advanced mode adds the remaining inputs from the spreadsheet:
  - Annual CNP transactions (debit and credit)
  - % of CNP transactions requiring CVV
  - Total loss per fraud case + issuer share %
  - Fee per transaction
  - Uplift in transactions per adopter (interchange lever)
  - Institutional cost method (multiplier vs fixed amount)
  - Mobile app development cost (one-time)
  - TSYS setup cost (one-time) and annual platform fee
  - Halo Effect settings: Peak Halo Multiplier and Months to Peak Effect

**Halo Effect**
- Always calculated and included in results — not hidden behind a toggle
- Results show savings with and without halo effect clearly labelled
- The halo concept (fraudsters migrate away from banks with strong security reputations) is explained inline

**Region / currency**
- Browser locale is detected on load and used to default the region (EUR, GBP, USD)
- User can switch region via a visible selector — benchmarks, defaults, fee structures, and currency symbols update accordingly
- Regional fee structures match the spreadsheet's per-region configurations

**Results presentation**
- Headline (most prominent): Year 1 Net Savings + Breakeven in days — the two metrics that answer the CFO's questions immediately
- Full results: Expandable sections below the headline:
  - Fraud Savings (Year 1 and Ongoing)
  - Interchange Uplift (Year 1 and Ongoing)
  - Halo Effect Bonus (Year 1 and Ongoing)
- Data visualisation: Year 1 vs Ongoing bar chart showing the savings curve
- Adoption sensitivity section: Below results, a range table from voluntary adoption (40%) to mandatory (90%) with corresponding annual savings

**Sharing and export**
- URL sharing: Results and inputs encoded in URL query params
- PDF export: 'Download report' button generates a PDF with results and inputs
- Both are available in this phase

**Contact CTA**
- CTA text: "Talk to us about your results" (per CONT-03 spec)
- Pre-populates the contact form with: full input set + key output metrics
- Pre-population passed via URL params to `/contact`

**Homepage teaser**
- In scope for Phase 7 — the full funnel (teaser → login → pre-filled calculator) ships together
- Teaser widget: single text input for total portfolio size (combined) + "See your savings →" CTA button
- On submit: redirect to `/portal/login?callbackUrl=/portal/calculator?portfolioSize=VALUE`
- The portfolio size value travels through the auth flow as a URL query param — no sessionStorage or other storage needed
- After magic link click and auth, calculator pre-populates with the passed `portfolioSize` value (split into a default debit/credit ratio for initial values)

**Attio events**
- `calculator_run` event fires on every input change, debounced at 500ms (per PORT-05 spec)
- Event payload includes: current inputs and current output metrics
- Attio call goes through the existing `/api/attio/event` server-side route (never from client directly)

### Claude's Discretion
- Default debit/credit account split ratio when only a combined portfolio size is passed from the homepage teaser
- Exact industry benchmark default values (fraud rate %, CVV-required %, institutional cost multiplier) — source from the spreadsheet's pre-filled defaults
- PDF generation library choice
- Exact chart library (Recharts, Nivo, or similar React-compatible)
- Exact sidebar nav link set for this phase (at minimum: Calculator link; Documents deferred)
- CSS layout details, typography, spacing within the portal shell
- Adoption rate default values (Year 1 and Ongoing) for simple mode

### Deferred Ideas (OUT OF SCOPE)
- Document library (`/portal/documents`) — integration guide, product one-pagers, An Post case study PDF — future phase
- Portal analytics dashboard (`/portal/analytics`) — internal-only view of active companies, last activity, calculator runs, downloads — future phase
- Role-based access (user vs admin) in Supabase — future phase when analytics dashboard is built
- Safe Verify-specific calculator inputs or tabs — future phase
- Device fingerprinting or short session expiry for additional auth security — not needed at this stage
- Scheduled or saved calculator scenarios — future phase
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PORT-02 | Next.js middleware protects all `/portal/*` routes; unauthenticated users redirected with `callbackUrl` preserved | Supabase SSR `@supabase/ssr` middleware pattern with `createServerClient` + `getUser()` validates session on every request; redirect to `/portal/login?callbackUrl=...` |
| PORT-03 | Portal dashboard `/portal` — landing page after login | Minimal portal shell layout with sidebar nav; dashboard page is a simple landing routing to `/portal/calculator` |
| PORT-04 | Sales team Attio notification on new portal signup | Existing `/api/attio/event` route handles event; fire `portal_login` event on first magic link auth callback with email payload |
| PORT-05 | Value calculator `/portal/calculator` — sliders + numeric override inputs; real-time outputs; Attio `calculator_run` event on debounced change (500ms) | Full formula extracted from spreadsheet; Recharts 3.7.0 for bar chart; nuqs 2.8.8 for URL state; debounced Attio firing via useCallback + setTimeout |
| PORT-06 | Calculator CTA: "Talk to us about your results" → contact form with results pre-populated | ContactFormSection already reads `?from=calculator`; extend to accept calculator metric URL params |
| PORT-07 | Agentic commerce demo `/portal/demo` — existing BoA HTML served in iframe; `mockup_viewed` Attio event on page load | Existing pattern from requirements; iframe + postMessage not needed; simple page with iframe + useEffect fire |
| PORT-08 | Homepage calculator teaser: single portfolio size input → redirect to `/portal/calculator?portfolioSize=VALUE` with login prompt; pre-populate after auth | Teaser widget in UrgencySection or DemoFormSection area; passes portfolioSize through auth flow as URL param; 70/30 debit/credit split as default |
| HOME-07 | CTA block: portfolio size teaser input → redirects to `/portal/calculator` with value pre-populated | Currently a link-only placeholder in DemoFormSection; Phase 7 replaces with functional form widget |
</phase_requirements>

---

## Summary

Phase 7 builds the portal's centrepiece — an interactive ROI calculator — along with the surrounding infrastructure: Supabase Auth magic link authentication, a minimal portal shell with sidebar nav, and a homepage teaser widget that funnels prospects into the portal. The existing portal route group (`src/app/(portal)/`) is a stub placeholder with a single page; this phase replaces it with a complete, authenticated application shell.

The core technical challenge is faithfully replicating the formula logic from the authoritative spreadsheet (`Copy of 20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx`). The spreadsheet formulas have been fully extracted and documented in this research. The calculation engine must be implemented as a pure TypeScript module (`src/lib/calculator/`) with no UI coupling, enabling unit testing and easy maintenance.

The auth stack uses `@supabase/supabase-js` + `@supabase/ssr` (the current recommended approach for Next.js App Router) with PKCE flow for magic links. The critical security pattern is using `supabase.auth.getUser()` in middleware — never `getSession()` — because `getUser()` sends a request to Supabase Auth on every call to revalidate the token. The existing Attio event route (`/api/attio/event`) requires a type signature change: the `calculator_run` event carries calculator inputs/outputs rather than name/company/role, so the route's TypeScript type needs to accept a generic payload.

**Primary recommendation:** Implement Phase 7 in four plan waves: (1) Supabase Auth + middleware + portal shell, (2) Calculator engine (pure TS formula module + unit-testable), (3) Calculator UI (sliders, results, bar chart, URL state, PDF), (4) Homepage teaser widget + contact CTA wiring.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @supabase/supabase-js | 2.98.0 | Supabase client — auth, DB | Official Supabase client |
| @supabase/ssr | 0.8.0 | Cookie-based auth for SSR | Required for Next.js App Router server-side auth |
| recharts | 3.7.0 | Bar chart for savings visualisation | React 19 compatible; declarative; 188kB gzip (acceptable for portal-only route) |
| nuqs | 2.8.8 | Type-safe URL search params state (URL sharing of calculator inputs) | Tiny (6kB); like `useState` but synced to URL; batched updates prevent history spam |
| jspdf | 4.2.0 | Client-side PDF generation | No SSR issues when loaded in `'use client'` component; widely used; no external service needed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none new) | - | Tailwind v4 + DaisyUI v5 already present | Portal shell uses existing design system |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| recharts 3.7.0 | Nivo | Nivo has larger bundle (~400kB vs ~188kB gzip); recharts is simpler for a single bar chart |
| jspdf | @react-pdf/renderer | @react-pdf/renderer is better for complex layouts but requires `dynamic(() => import(...), { ssr: false })` wrapping; jsPDF is sufficient for this report-style export and is simpler to integrate |
| nuqs | manual useSearchParams | Manual useSearchParams + router.push is brittle, not type-safe, and causes history spam on every slider change; nuqs handles batching and serialisation |

**Installation:**
```bash
npm install @supabase/supabase-js @supabase/ssr recharts nuqs jspdf
```

**New environment variables required:**
```bash
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  # Supabase publishable (anon) key
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
  app/
    (portal)/
      layout.tsx              # Portal shell: sidebar nav, no marketing nav
      portal/
        page.tsx              # Dashboard — minimal landing, routes to /calculator
      portal/login/
        page.tsx              # Magic link request form
      portal/auth/callback/
        route.ts              # PKCE token exchange → session cookie → redirect
      portal/calculator/
        page.tsx              # Calculator page (passes searchParams to client)
      portal/demo/
        page.tsx              # Agentic demo iframe
    api/
      attio/
        event/
          route.ts            # Updated to accept generic payload (not just name/company/role)
  components/
    portal/
      PortalSidebar.tsx       # Sidebar nav component
      PortalShell.tsx         # Layout wrapper (sidebar + main content)
      calculator/
        CalculatorPage.tsx    # Orchestrator client component
        InputSlider.tsx       # Slider with click-to-edit override
        ResultsPanel.tsx      # Headline + expandable sections
        SavingsBarChart.tsx   # Recharts bar chart (Year 1 vs Ongoing)
        SensitivityTable.tsx  # Adoption rate sensitivity
        PdfExportButton.tsx   # jsPDF download
      HomepageTeaserWidget.tsx  # Single-input teaser for marketing homepage
  lib/
    supabase/
      client.ts               # createBrowserClient for Client Components
      server.ts               # createServerClient for Server Components / Route Handlers
      middleware.ts           # updateSession helper
    calculator/
      engine.ts               # Pure formula engine — no React, no imports
      defaults.ts             # Default values by region
      types.ts                # CalculatorInputs, CalculatorOutputs types
```

### Pattern 1: Supabase SSR Middleware

**What:** Middleware refreshes auth tokens on every request and enforces `/portal/*` protection.
**When to use:** Must run on every request to protected routes.

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  // CRITICAL: always getUser(), never getSession() in server code
  const { data: { user } } = await supabase.auth.getUser()

  const isPortalRoute = request.nextUrl.pathname.startsWith('/portal')
  const isLoginRoute = request.nextUrl.pathname === '/portal/login'
  const isCallbackRoute = request.nextUrl.pathname === '/portal/auth/callback'

  if (isPortalRoute && !isLoginRoute && !isCallbackRoute && !user) {
    const loginUrl = new URL('/portal/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}
```

```typescript
// src/middleware.ts (root level — must be here for Next.js to pick it up)
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Pattern 2: Magic Link Auth Flow

**What:** User enters email → Supabase sends link → user clicks → PKCE callback exchanges token → session set → redirect to callbackUrl.

```typescript
// src/app/(portal)/portal/login/page.tsx — server component wrapping client form
// Login form client action:
const supabase = createBrowserClient(...)
const { error } = await supabase.auth.signInWithOtp({
  email: emailValue,
  options: {
    emailRedirectTo: `${window.location.origin}/portal/auth/callback?callbackUrl=${encodeURIComponent(callbackUrl)}`,
    shouldCreateUser: true,
  }
})
```

```typescript
// src/app/(portal)/portal/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const callbackUrl = searchParams.get('callbackUrl') ?? '/portal/calculator'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(/* ... */)
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL(callbackUrl, request.url))
}
```

### Pattern 3: Calculator Engine — Pure TypeScript

**What:** All formula logic lives in `src/lib/calculator/engine.ts` with no React or UI dependencies. The React components read inputs and call `calculate(inputs)` to get outputs — this is the single source of truth.

```typescript
// src/lib/calculator/types.ts
export interface CalculatorInputs {
  debitAccounts: number
  creditAccounts: number
  debitCNPTransactions: number
  creditCNPTransactions: number
  debitAvgTxValue: number
  creditAvgTxValue: number
  year1AdoptionRate: number   // 0–1
  ongoingAdoptionRate: number // 0–1
  debitFraudRate: number      // basis points (e.g. 0.00046)
  creditFraudRate: number     // basis points (e.g. 0.00174)
  debitCvvPct: number         // 0–1
  creditCvvPct: number        // 0–1
  debitLossPerCase: number
  creditLossPerCase: number
  issuerPct: number           // 0–1
  institutionalCostMethod: 'Multiplier' | 'Fixed Amount'
  institutionalCostMultiplier: number
  debitFixedCostPerCase: number
  creditFixedCostPerCase: number
  feePerTx: number            // SafeCypher fee
  interchangePct: number      // see region
  debitInterchangeRate: number // see region
  creditInterchangeRate: number
  upliftPerAdopter: number
  oneTimeTsysCost: number
  annualTsysFee: number
  mobileDevCost: number
  peakHaloMultiplier: number  // e.g. 0.15 = 15% additional fraud reduction
  monthsToPeak: number
  calculationMode: 'Direct Only' | 'Direct + Halo Effect'
}

export interface CalculatorOutputs {
  // Fraud metrics (combined)
  cvvRequiredTxDebit: number
  cvvRequiredTxCredit: number
  annualFraudCasesDebit: number
  annualFraudCasesCredit: number
  currentAnnualFraudCostDebit: number
  currentAnnualFraudCostCredit: number
  currentAnnualFraudCostCombined: number
  totalImplCost: number
  // Year 1
  grossFraudSavingsYr1: number
  txFeesYr1: number
  netFraudSavingsYr1: number
  monthlySavingsYr1: number
  breakevenDays: number
  // Ongoing
  grossFraudSavingsOngoing: number
  txFeesOngoing: number
  netFraudSavingsOngoing: number
  monthlySavingsOngoing: number
  // Interchange uplift
  interchangeUpliftYr1: number
  interchangeUpliftOngoing: number
  // Halo effect
  avgYr1HaloFactor: number
  yr1HaloBonus: number
  ongoingHaloBonus: number
  // Totals
  totalYr1Savings: number
  totalOngoingSavings: number
  totalYr1SavingsWithoutHalo: number
  totalOngoingSavingsWithoutHalo: number
  // Sensitivity table rows
  sensitivityRows: Array<{ adoptionRate: number; annualSavings: number; breakevenDays: number }>
}
```

### Pattern 4: URL State with nuqs

**What:** All calculator inputs are encoded in the URL so the user can share a pre-filled calculation. nuqs handles serialisation, type-safety, and batched updates.

```typescript
// src/app/(portal)/portal/calculator/page.tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'
// NuqsAdapter must wrap the portal layout (add to portal layout.tsx)

// In CalculatorPage.tsx ('use client'):
import { useQueryState, parseAsFloat, parseAsInteger } from 'nuqs'
const [debitAccounts, setDebitAccounts] = useQueryState('da', parseAsFloat.withDefault(DEFAULT_DEBIT_ACCOUNTS))
const [year1Adoption, setYear1Adoption] = useQueryState('y1a', parseAsFloat.withDefault(0.25))
// etc.
```

**Critical note:** The `NuqsAdapter` must be added to the portal `layout.tsx` (not the root layout) to avoid affecting the marketing site's URL handling.

### Pattern 5: Attio Event Route Extension

**What:** The existing `/api/attio/event` route has a rigid `AttioEventBody` type that requires `name`, `company`, `role`. The `calculator_run` event carries calculator data instead. The route must accept a generic payload while still requiring `event` and `email`.

```typescript
// Updated type in src/app/api/attio/event/route.ts
type AttioEventBody = {
  event: string
  email?: string  // optional — calculator_run may not have email at time of fire
  name?: string
  company?: string
  role?: string
  message?: string
  // Generic additional payload fields:
  [key: string]: unknown
}
```

The note content in Attio will be serialised from the full payload using `JSON.stringify` for calculator events.

### Anti-Patterns to Avoid

- **Using `supabase.auth.getSession()` in middleware:** Always use `getUser()`. `getSession()` reads from cookie without revalidation — it can be spoofed.
- **Importing recharts in a Server Component:** Recharts uses browser-only APIs (ResizeObserver). Add `'use client'` to any component that imports it.
- **Importing jsPDF at module scope in a Next.js page:** jsPDF accesses `window` on import. Use `const jsPDF = (await import('jspdf')).jsPDF` inside the click handler or wrap with `dynamic(() => import(...), { ssr: false })`.
- **Storing calculator state in component state only:** Results would be lost on refresh and not shareable. Always sync to URL via nuqs.
- **Firing Attio on every keystroke:** Debounce at 500ms using `useCallback` + `useRef` for the timeout ID. Clear and reset on each input change.
- **Mixing portal layout with marketing layout:** The portal route group `(portal)` has its own `layout.tsx`. Do NOT add NuqsAdapter to the root `layout.tsx` — add it only to `src/app/(portal)/layout.tsx` to avoid layout group collisions.

---

## Spreadsheet Formula Engine

This is the authoritative formula reference extracted from the spreadsheet. All values must match exactly.

### Default Values (from spreadsheet — USD region as shipped)

| Parameter | Debit Default | Credit Default | Source Note |
|-----------|--------------|----------------|-------------|
| Number of accounts | 5,000,000 | 907,000 | TSYS data |
| Annual CNP transactions | 330,120,000 | 93,700,000 | TSYS data |
| Average $ per CNP tx | $62.34 | $150.00 | Conservative assumption |
| Year 1 adoption rate | 25% (0.25) | shared | Research showed 25% voluntary |
| Ongoing adoption rate | 90% (0.90) | shared | Mandatory = 90% max |
| % CNP requiring CVV | 50% (0.50) | 25% (0.25) | Pulse Network 2025 |
| Fraud rate | 0.046% (0.00046) | 0.174% (0.00174) | Kansas City Fed / industry avg |
| Total loss per fraud case | $101 | $303 | Federal Reserve Board data |
| Issuer % of fraud loss | 35% (0.35) | 35% (0.35) | 2024 Clearly Payments / FTC |
| Institutional cost method | Fixed Amount | Fixed Amount | |
| Institutional cost multiplier | 5.75 | 5.75 | 2025 LexisNexis True Cost of Fraud |
| Fixed institutional cost / case | $144 | $144 | Fixed $ per investigation |
| SafeCypher fee per tx | 5% (0.05) | 5% (0.05) | Subject to commercial agreement |
| Debit fee structure | $0.21 + 0.05% | | Region fee |
| Credit fee structure | $0.10 + 2.34% | | Region fee |
| Uplift in tx per adopter | 1 | 1 | An Post saw 50%; 1 = conservative |
| One-time TSYS setup cost | $30,000 | | |
| Annual TSYS platform fee | $120,000 | | |
| Mobile app dev cost | $85,000 | | One-time |
| Peak Halo Multiplier | 15% (0.15) | | Additional fraud reduction |
| Months to Peak Effect | 12 | | Time for halo to fully materialise |
| Calculation Mode | Direct + Halo Effect | | Default shows halo |

### Core Formulas (translated from Excel cell references)

**Step 1: CVV-required transactions per card type**
```
cvvRequired_D = debitCNPTransactions * debitCvvPct
cvvRequired_C = creditCNPTransactions * creditCvvPct
cvvRequired_combined = cvvRequired_D + cvvRequired_C
```

**Step 2: Annual fraud cases per card type**
```
fraudCases_D = cvvRequired_D * debitFraudRate
fraudCases_C = cvvRequired_C * creditFraudRate
```

**Step 3: Loss calculations per card type**
```
issuerLossPerCase_D = totalLossPerCase_D * issuerPct
issuerLossPerCase_C = totalLossPerCase_C * issuerPct

institutionalCostPerCase_D =
  if method == 'Multiplier': issuerLossPerCase_D * multiplier
  else: fixedCostPerCase_D

institutionalCostPerCase_C =
  if method == 'Multiplier': issuerLossPerCase_C * multiplier
  else: fixedCostPerCase_C

totalAnnualFraudCost_D = (fraudCases_D * issuerLossPerCase_D) + (fraudCases_D * institutionalCostPerCase_D)
totalAnnualFraudCost_C = (fraudCases_C * issuerLossPerCase_C) + (fraudCases_C * institutionalCostPerCase_C)
totalAnnualFraudCost_combined = totalAnnualFraudCost_D + totalAnnualFraudCost_C
```

**Step 4: Implementation cost**
```
totalImplCost = oneTimeTsysCost + annualTsysFee + mobileDevCost
```

**Step 5: Year 1 savings**
```
// Average Year 1 adoption = (year1AdoptionRate + ongoingAdoptionRate) / 2
// Actually: spreadsheet uses year1AdoptionRate for Year 1, ongoingAdoptionRate for ongoing
grossFraudSavingsYr1_D = totalAnnualFraudCost_D * year1AdoptionRate
grossFraudSavingsYr1_C = totalAnnualFraudCost_C * year1AdoptionRate
grossFraudSavingsYr1 = grossFraudSavingsYr1_D + grossFraudSavingsYr1_C

// Transaction fees (SafeCypher charges per protected CVV tx)
txFees_D_Yr1 = debitCNPTransactions * year1AdoptionRate * feePerTx_D
txFees_C_Yr1 = creditCNPTransactions * year1AdoptionRate * feePerTx_C
txFees_Yr1 = txFees_D_Yr1 + txFees_C_Yr1

// Debit fee: $0.21 + 0.05% of value → per tx = 0.21 + (debitAvgTxValue * 0.0005)
// Credit fee: $0.10 + 2.34% of value → per tx = 0.10 + (creditAvgTxValue * 0.0234)
// NOTE: feePerTx in the formula cells is the SafeCypher fee (C42/D42 = 0.05 = 5% flat fee multiplier on cvvRequired tx)
// Actual formula: txFees_D_Yr1 = cvvRequired_D * year1AdoptionRate * feePerTx (5%)
// i.e., txFees_D_Yr1 = cvvRequired_D * year1AdoptionRate * 0.05

netFraudSavingsYr1 = grossFraudSavingsYr1 - txFees_Yr1
monthlySavingsYr1 = netFraudSavingsYr1 / 12
breakevenDays = IFERROR((totalImplCost / monthlySavingsYr1) * (365/12), "—")
```

**Step 6: Ongoing savings (Year 2+)**
```
grossFraudSavingsOngoing = totalAnnualFraudCost_combined * ongoingAdoptionRate
txFees_Ongoing = (cvvRequired_D + cvvRequired_C) * ongoingAdoptionRate * feePerTx
netFraudSavingsOngoing = grossFraudSavingsOngoing - txFees_Ongoing
monthlySavingsOngoing = netFraudSavingsOngoing / 12
```

**Step 7: Interchange uplift**
```
// Debit formula (from cell E76):
// IF(D14=0, 0, (D14 * D44 * D16 * year1Adoption * 0.0005) + (D14 * D44 * year1Adoption * 0.21))
// = debitAccounts * upliftPerAdopter * debitAvgTxValue * year1Adoption * 0.0005
//   + debitAccounts * upliftPerAdopter * year1Adoption * 0.21
// NB: This is the interchange REVENUE from additional transactions created by security trust

// Credit formula (from cell F76):
// (D14 * D44 * D16 * year1Adoption * 0.0234) + (D14 * D44 * year1Adoption * 0.1)

interchangeUpliftYr1_D = debitAccounts * upliftPerAdopter * debitAvgTxValue * year1Adoption * 0.0005
                        + debitAccounts * upliftPerAdopter * year1Adoption * 0.21
interchangeUpliftYr1_C = creditAccounts * upliftPerAdopter * creditAvgTxValue * year1Adoption * 0.0234
                        + creditAccounts * upliftPerAdopter * year1Adoption * 0.10
interchangeUpliftYr1 = interchangeUpliftYr1_D + interchangeUpliftYr1_C
// (same pattern for ongoing with ongoingAdoptionRate)
```

**Step 8: Halo effect**
```
// Average Year 1 Halo Factor (cell C89):
// IF(monthsToPeak >= 12, 1 + (peakHaloMultiplier * 6/12), 1 + (peakHaloMultiplier * ((monthsToPeak/2)/12)))
avgYr1HaloFactor =
  monthsToPeak >= 12
    ? 1 + (peakHaloMultiplier * 0.5)
    : 1 + (peakHaloMultiplier * ((monthsToPeak / 2) / 12))

// Year 1 Halo Bonus (cells E92, F92):
// IF(mode == 'Direct Only', 0, netFraudSavingsYr1 * (avgYr1HaloFactor - 1))
yr1HaloBonus_D = mode == 'Direct Only' ? 0 : netFraudSavingsYr1_D * (avgYr1HaloFactor - 1)
yr1HaloBonus_C = mode == 'Direct Only' ? 0 : netFraudSavingsYr1_C * (avgYr1HaloFactor - 1)
yr1HaloBonus = yr1HaloBonus_D + yr1HaloBonus_C

// Ongoing Halo Bonus (cells E93, F93):
// IF(mode == 'Direct Only', 0, netFraudSavingsOngoing * peakHaloMultiplier)
ongoingHaloBonus = mode == 'Direct Only' ? 0 : netFraudSavingsOngoing * peakHaloMultiplier
```

**Step 9: Total savings**
```
totalYr1Savings = netFraudSavingsYr1 + interchangeUpliftYr1 + yr1HaloBonus
totalOngoingSavings = netFraudSavingsOngoing + interchangeUpliftOngoing + ongoingHaloBonus
totalYr1SavingsWithoutHalo = netFraudSavingsYr1 + interchangeUpliftYr1
totalOngoingSavingsWithoutHalo = netFraudSavingsOngoing + interchangeUpliftOngoing
```

**Step 10: Sensitivity table (rows at 25%, 50%, 75%, 90% adoption)**
```
// Spreadsheet rows B104–B107: 0.25, 0.50, 0.75, 0.90
for each adoptionRate in [0.25, 0.50, 0.75, 0.90]:
  annualSavings = (totalAnnualFraudCost_combined * adoptionRate)
                  - ((cvvRequired_D + cvvRequired_C) * adoptionRate * feePerTx)
  breakevenDays = IFERROR((totalImplCost / (annualSavings / 12)) * (365/12), "—")
```

### Region Defaults

The spreadsheet's "Regions" section (referenced strings [109]–[116]) indicates regional variation. For Phase 7, three regions are supported:

| Region | Currency | Debit fee structure | Credit fee structure | Debit fraud rate | Credit fraud rate |
|--------|----------|-------------------|---------------------|-----------------|-------------------|
| USD | $ | $0.21 + 0.05% | $0.10 + 2.34% | 0.046% | 0.174% |
| GBP | £ | Approx same structure | Approx same structure | Similar range | Similar range |
| EUR | € | Approx same structure | Approx same structure | Similar range | Similar range |

**Note (LOW confidence):** The spreadsheet only has one sheet with USD-labelled values. GBP and EUR regional configurations are referenced in the CONTEXT.md as a requirement but the specific numeric defaults for GBP/EUR are not present in the extracted spreadsheet data. The planner should treat region configuration as requiring manual input from the client (Mark) or default to USD values for non-USD regions until confirmed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL state sync | Manual `router.push` + `URLSearchParams` | nuqs | Handles batching, type-safety, serialisation, history API limits |
| Session cookie management | Custom JWT cookie handling | @supabase/ssr `createServerClient` | Handles cookie get/set/refresh across server components, middleware, and client |
| Bar chart | Hand-rolled SVG chart | recharts `BarChart` | ResizeObserver, responsive container, tooltip, axis labels, animations all built-in |
| PDF generation layout | HTML-to-canvas-to-PDF | jsPDF direct draw API | html2canvas introduces render bugs with DaisyUI dark theme; jsPDF draw API is deterministic |
| Token refresh in middleware | Manual JWT decode + expiry check | `supabase.auth.getUser()` in middleware | Supabase handles token refresh, cookie update, and edge cases around clock skew |

**Key insight:** Supabase's `@supabase/ssr` package was specifically designed to solve the "server components can't write cookies" problem in Next.js App Router — it is not optional middleware sugar but the required bridge between Supabase's cookie-based sessions and Next.js's streaming server architecture.

---

## Common Pitfalls

### Pitfall 1: `getSession()` vs `getUser()` in Server Code
**What goes wrong:** Using `supabase.auth.getSession()` in middleware or Server Components does not revalidate the token — it reads the cookie value as-is. A spoofed cookie can bypass auth.
**Why it happens:** `getSession()` is documented as a client-side method that avoids the extra network round-trip.
**How to avoid:** Always use `supabase.auth.getUser()` in all server-side code (middleware, Server Components, Route Handlers). It sends a validation request to Supabase Auth every call.
**Warning signs:** If middleware seems to "not protect" routes even when implemented, check whether `getSession()` was used instead of `getUser()`.

### Pitfall 2: NuqsAdapter Placement
**What goes wrong:** Adding `NuqsAdapter` to the root `layout.tsx` (which wraps both marketing and portal route groups) breaks the adapter for both groups or causes unexpected URL behaviour on the marketing site.
**Why it happens:** The root layout wraps all route groups; `NuqsAdapter` must be added per-layout that needs it.
**How to avoid:** Add `NuqsAdapter` only to `src/app/(portal)/layout.tsx`. The marketing site does not use nuqs.
**Warning signs:** useQueryState returns stale values or URL updates don't reflect in the component.

### Pitfall 3: Recharts in Server Components
**What goes wrong:** `ResizeObserver is not defined` or `window is not defined` build error when importing recharts in a Server Component.
**Why it happens:** Recharts uses browser APIs at import time.
**How to avoid:** All components that import from `recharts` must have `'use client'` at the top. `SavingsBarChart.tsx` must be a Client Component.
**Warning signs:** Build error mentioning `ResizeObserver`, `window`, or `document`.

### Pitfall 4: jsPDF `window` Access on Import
**What goes wrong:** `ReferenceError: window is not defined` during server-side render.
**Why it happens:** jsPDF accesses `window` when the module loads. If it's imported at module scope in a `'use client'` component, Next.js may still pre-render the component tree on the server.
**How to avoid:** Use dynamic import inside the click handler: `const { jsPDF } = await import('jspdf')`. This defers the `window` access to runtime in the browser.
**Warning signs:** Build error or runtime error mentioning `window is not defined` in the PDF export flow.

### Pitfall 5: callbackUrl Param Lost Through Auth Flow
**What goes wrong:** User enters portfolio size on homepage → redirected to `/portal/login?callbackUrl=/portal/calculator?portfolioSize=500000` → after magic link click → lands on `/portal/calculator` without the `portfolioSize` param.
**Why it happens:** The magic link email is sent with `emailRedirectTo` pointing to `/portal/auth/callback`, which must receive and re-attach the `callbackUrl` param. If `callbackUrl` is URL-encoded as a param inside `emailRedirectTo`, Supabase's URL validation may strip nested query params.
**How to avoid:** Encode `callbackUrl` in the `emailRedirectTo` as a separate param. In the callback route handler, read `callbackUrl` from the incoming request's search params and redirect to it after `exchangeCodeForSession`.
**Warning signs:** Calculator loads without pre-filled `portfolioSize` after auth.

### Pitfall 6: Formula Precision — Fee Per Transaction
**What goes wrong:** The "fee per transaction" field (C42/D42 = 0.05) is applied to CVV-required transactions multiplied by adoption rate — NOT to total CNP transactions. Applying to the wrong base produces a ~50–75% error in fee calculations.
**Why it happens:** The column label says "Fee per transaction" but the formula is `cvvRequired * adoptionRate * 0.05` — the fee is 5% of CVV-protected transactions, not all CNP.
**How to avoid:** Use the exact cell formulas documented above. Verify by checking the spreadsheet's default output: $2,356,062.50 total Year 1 transaction fees combined (from cells E61+F61 = 2,063,250 + 292,812.50).

### Pitfall 7: Attio Event Without Email
**What goes wrong:** The existing `AttioEventBody` type requires `email` as a non-optional field. The `calculator_run` event fires before the user has identified themselves (they may be authenticated via Supabase but the Attio CRM email lookup works differently).
**Why it happens:** The route was designed for form submission events where email is always present.
**How to avoid:** Update `AttioEventBody` to make `email` optional. For `calculator_run`, pass the authenticated user's email from `supabase.auth.getUser()` in the client component (available after login). If the user email is available from Supabase session, include it; otherwise omit it.

### Pitfall 8: DemoFormSection Teaser Widget Placement
**What goes wrong:** The `DemoFormSection` already has a link placeholder to `/portal/calculator`. Phase 7 replaces this with a functional form widget. If the teaser widget is added as a separate section, there will be two CTAs to the calculator.
**Why it happens:** HOME-07 requirement says "CTA block: short demo form AND/OR portfolio size teaser input".
**How to avoid:** Replace the existing link-only teaser in `DemoFormSection` with the actual input widget inline. The teaser widget is a small embedded form (one input + one button), not a new page section.

---

## Code Examples

Verified patterns from official sources:

### Supabase Magic Link — Client Component
```typescript
// Source: https://supabase.com/docs/guides/auth/auth-email-passwordless
'use client'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

async function requestMagicLink(email: string, callbackUrl: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/portal/auth/callback?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      shouldCreateUser: true,
    },
  })
  return error
}
```

### Supabase Auth Callback Route
```typescript
// Source: https://supabase.com/docs/guides/auth/server-side/nextjs
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const callbackUrl = searchParams.get('callbackUrl') ?? '/portal/calculator'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options))
          },
        },
      }
    )
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL(callbackUrl, origin))
}
```

### nuqs Calculator State
```typescript
// Source: https://nuqs.dev/
'use client'
import { useQueryState, parseAsFloat } from 'nuqs'

export function CalculatorPage() {
  const [debitAccounts, setDebitAccounts] = useQueryState(
    'da',
    parseAsFloat.withDefault(5_000_000)
  )
  const [year1Adoption, setYear1Adoption] = useQueryState(
    'y1a',
    parseAsFloat.withDefault(0.25)
  )
  // ...all inputs bound to URL
}
```

### Recharts Bar Chart
```typescript
// Source: recharts.org documentation — verified against recharts 3.7.0
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function SavingsBarChart({ yr1Total, ongoingTotal }: { yr1Total: number; ongoingTotal: number }) {
  const data = [
    { name: 'Year 1', savings: yr1Total },
    { name: 'Ongoing', savings: ongoingTotal },
  ]
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
        <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
        <Bar dataKey="savings" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

### jsPDF — Dynamic Import Pattern
```typescript
// Source: jsPDF documentation + Next.js dynamic import pattern
'use client'
export async function downloadPDF(inputs: CalculatorInputs, outputs: CalculatorOutputs) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  doc.setFontSize(20)
  doc.text('SafeCypher Value Calculator Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Year 1 Net Savings: ${formatCurrency(outputs.totalYr1Savings)}`, 20, 40)
  doc.text(`Breakeven: ${outputs.breakevenDays} days`, 20, 50)
  // ... add full results table

  doc.save('safecypher-value-report.pdf')
}
```

### Attio calculator_run Debounce Pattern
```typescript
'use client'
import { useCallback, useRef } from 'react'

export function useAttioCalculatorRun() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback((inputs: CalculatorInputs, outputs: CalculatorOutputs, userEmail?: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      await fetch('/api/attio/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-token': process.env.NEXT_PUBLIC_INTERNAL_API_SECRET ?? '',
        },
        body: JSON.stringify({
          event: 'calculator_run',
          email: userEmail,
          inputs,
          outputs,
        }),
      })
    }, 500)
  }, [])
}
```

**Note:** `INTERNAL_API_SECRET` is currently server-only. For the debounced Attio hook, the secret must be exposed as `NEXT_PUBLIC_INTERNAL_API_SECRET` OR the debounce should fire through a thin Next.js Server Action that adds the secret server-side. Using a Server Action is more secure and avoids exposing the secret to the client. This is a design decision for the planner.

---

## Existing Code Integration Points

### What Exists (Do Not Rebuild)

| Existing Item | Location | Phase 7 Use |
|--------------|----------|-------------|
| Portal route group | `src/app/(portal)/` | Replace stub layout + page with full shell |
| Attio event route | `src/app/api/attio/event/route.ts` | Extend type to accept generic payload; reuse for `calculator_run` and `portal_login` |
| ContactFormSection | `src/components/marketing/contact/ContactFormSection.tsx` | Already reads `?from=calculator` for heading; extend to read calculator metric params for pre-fill |
| UrgencySection / DemoFormSection | `src/components/marketing/home/` | Add teaser widget inline — replace the link-only placeholder at bottom of DemoFormSection |
| DaisyUI + Tailwind v4 | `src/styles/theme.css` | Portal shell uses same tokens; no new theme needed |
| UI primitives (Input, Button, Card) | `src/components/ui/` | Slider inputs are new; other primitives reused |
| INTERNAL_API_SECRET pattern | All API routes | Attio calls from portal use same guard |

### What Needs Creating (Net New)

1. `src/middleware.ts` — Next.js middleware (does not exist yet — portal is currently unprotected)
2. `src/lib/supabase/` — client.ts, server.ts, middleware.ts (Supabase helpers)
3. `src/lib/calculator/` — engine.ts, defaults.ts, types.ts (formula engine)
4. `src/app/(portal)/layout.tsx` — full portal shell layout (currently empty passthrough)
5. `src/app/(portal)/portal/login/page.tsx` — magic link request page
6. `src/app/(portal)/portal/auth/callback/route.ts` — PKCE callback handler
7. `src/app/(portal)/portal/calculator/page.tsx` — calculator page
8. `src/app/(portal)/portal/demo/page.tsx` — agentic demo iframe
9. `src/components/portal/` — all portal UI components

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@supabase/auth-helpers-nextjs` | `@supabase/ssr` | 2024 — auth-helpers deprecated | Must use `@supabase/ssr`; auth-helpers is archived |
| `supabase.auth.getSession()` in server code | `supabase.auth.getUser()` | Supabase security update 2024 | getSession is not safe for server-side auth checks |
| `get/set/remove` cookie methods in SSR client | `getAll/setAll` only | @supabase/ssr v0.5+ | Older examples with individual cookie methods are wrong |
| recharts 2.x (no React 19 support) | recharts 3.x | 2025 | v3.7.0 officially supports React 19; v2.x required workarounds |
| Legacy anon key `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | 2025 transition | Both work; new projects use publishable key |

**Deprecated/outdated:**
- `@supabase/auth-helpers-nextjs`: Archived, replaced by `@supabase/ssr`
- `supabase.auth.getSession()` in middleware: Do not use — security vulnerability
- Cookie `get/set/remove` in `createServerClient`: Use `getAll/setAll` only

---

## Open Questions

1. **GBP and EUR regional default values**
   - What we know: The spreadsheet is USD-only; regional fee structures referenced in CONTEXT.md but not in the extracted data
   - What's unclear: Exact numeric defaults for GBP/EUR fraud rates, transaction values, and fee structures
   - Recommendation: Implement USD region fully; add GBP/EUR as additional configurations with same formulas but flag that numeric defaults need client confirmation before shipping; use USD values as placeholder until confirmed

2. **INTERNAL_API_SECRET client exposure for Attio debounce**
   - What we know: The secret is currently server-only; the debounced Attio hook runs in a browser Client Component
   - What's unclear: Whether to expose as NEXT_PUBLIC or use a Server Action
   - Recommendation: Use a Next.js Server Action (`'use server'`) for the Attio calculator_run call. The Server Action adds the header server-side before forwarding to `/api/attio/event`. This keeps the secret off the client entirely.

3. **Portal login UX — email verification copy**
   - What we know: Magic links expire after 60 seconds' rate limit and 1 hour TTL (Supabase defaults)
   - What's unclear: Whether to add a "resend link" button and what copy to show while waiting
   - Recommendation: Show "Check your email" state with a resend button (60-second cooldown). This is standard UX for magic links. Implement as a simple timer-based disabled state on the resend button.

4. **Supabase project creation and URL/key availability**
   - What we know: No Supabase project exists yet for this codebase (no env vars in current CLAUDE.md)
   - What's unclear: Whether the Supabase project needs to be created as part of Phase 7 or already exists
   - Recommendation: Wave 0 of the plan should include creating the Supabase project and adding `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the Netlify environment. The planner should note this as a prerequisite task.

---

## Sources

### Primary (HIGH confidence)
- Spreadsheet extraction — all formula logic, default values, and cell references extracted directly via Python/zipfile from `/Users/markwright/Downloads/Copy of 20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx`
- https://supabase.com/docs/guides/auth/server-side/nextjs — middleware pattern, `getUser()` security guidance, `getAll/setAll` cookie API
- https://supabase.com/docs/guides/auth/auth-email-passwordless — `signInWithOtp`, magic link flow, PKCE token exchange
- npm package inspection (`npm show`) — recharts@3.7.0, @react-pdf/renderer@4.3.2, @supabase/supabase-js@2.98.0, @supabase/ssr@0.8.0, jspdf@4.2.0, nuqs@2.8.8

### Secondary (MEDIUM confidence)
- https://nuqs.dev/ — nuqs API, NuqsAdapter placement, useQueryState pattern
- recharts@3.7.0 peerDependencies — `"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"` — React 19 support confirmed
- @react-pdf/renderer peerDependencies — `"react": "^16.8.0 || ... || ^19.0.0"` — React 19 support confirmed

### Tertiary (LOW confidence)
- GBP/EUR regional defaults — not found in spreadsheet; referenced in CONTEXT.md but no numeric data; flagged as open question
- INTERNAL_API_SECRET pattern for Server Actions — based on Next.js docs knowledge; specific implementation needs verification during development

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all library versions verified via `npm show`; peer deps confirm React 19 compatibility
- Architecture: HIGH — formula logic extracted directly from spreadsheet cells; Supabase patterns from official docs
- Pitfalls: HIGH — several verified from official Supabase security docs (getUser vs getSession); others from code inspection of existing project
- Regional defaults: LOW — spreadsheet has USD only; GBP/EUR flagged as open question

**Research date:** 2026-02-27
**Valid until:** 2026-03-27 (Supabase API is stable; nuqs/recharts versions are recent; spreadsheet formulas are static)
