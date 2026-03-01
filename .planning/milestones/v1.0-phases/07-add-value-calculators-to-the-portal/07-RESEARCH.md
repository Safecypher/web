# Phase 7: Add Value Calculators to the Portal - Research

**Researched:** 2026-02-27 (re-researched with direct spreadsheet analysis)
**Domain:** Supabase Auth (magic links), interactive financial calculator, portal shell, chart/PDF generation, URL state management
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Calculator scope**
- One calculator at `/portal/calculator` with progressive disclosure (simple mode -> advanced mode) — not multiple product-specific calculators
- Portal is calculator-focused: the dashboard is a minimal landing page routing to the calculator; auth middleware is wired but simple
- Portal shell: minimal left sidebar nav (SafeCypher logo, nav links, user/logout at bottom) — marketing nav does NOT appear inside the portal
- No role-based access in this phase — all portal users have the same access level; admin analytics dashboard is a future phase

**Auth**
- Passwordless via Supabase Auth magic links
- Magic links are single-use by default (Supabase behaviour) — link expires after first click; this is sufficient link security
- Session management: default Supabase behaviour (no additional device fingerprinting or short expiry needed)
- Auth flow: Homepage teaser -> `/portal/login` (email input) -> magic link email -> `/portal/calculator` (pre-filled)
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
- In scope for Phase 7 — the full funnel (teaser -> login -> pre-filled calculator) ships together
- Teaser widget: single text input for total portfolio size (combined) + "See your savings ->" CTA button
- On submit: redirect to `/portal/login?callbackUrl=/portal/calculator?portfolioSize=VALUE`
- The portfolio size value travels through the auth flow as a URL query param — no sessionStorage or other storage needed
- After magic link click and auth, calculator pre-populates with the passed `portfolioSize` value (split into a default debit/credit ratio for initial values)

**Attio events**
- `calculator_run` event fires on every input change, debounced at 500ms (per PORT-05 spec)
- Event payload includes: current inputs and current output metrics
- Attio call goes through the existing `/api/attio/event` server-side route (never from client directly)

### Claude's Discretion
- Default debit/credit account split ratio when only a combined portfolio size is passed from the homepage teaser
- Exact industry benchmark default values (fraud rate %, CVV-required %, institutional cost multiplier) — source from the spreadsheet's pre-filled defaults (now fully extracted, see below)
- PDF generation library choice
- Exact chart library (Recharts, Nivo, or similar React-compatible)
- Exact sidebar nav link set for this phase (at minimum: Calculator link; Documents deferred)
- CSS layout details, typography, spacing within the portal shell
- Adoption rate default values (Year 1 and Ongoing) for simple mode (extracted from spreadsheet: 25% Year 1, 90% Ongoing)

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
| PORT-05 | Value calculator `/portal/calculator` — sliders + numeric override inputs; real-time outputs; Attio `calculator_run` event on debounced change (500ms) | Full formula extracted and independently verified from spreadsheet; Recharts for bar chart; nuqs for URL state; debounced Attio firing via useCallback + setTimeout |
| PORT-06 | Calculator CTA: "Talk to us about your results" -> contact form with results pre-populated | ContactFormSection already reads `?from=calculator`; extend to accept calculator metric URL params |
| PORT-07 | Agentic commerce demo `/portal/demo` — existing BoA HTML served in iframe; `mockup_viewed` Attio event on page load | Simple page with iframe + useEffect fire; no postMessage needed |
| PORT-08 | Homepage calculator teaser: single portfolio size input -> redirect to `/portal/calculator?portfolioSize=VALUE` with login prompt; pre-populate after auth | Teaser widget in DemoFormSection; passes portfolioSize through auth flow as URL param; 70/30 debit/credit split as default |
| HOME-07 | CTA block: portfolio size teaser input -> redirects to `/portal/calculator` with value pre-populated | DemoFormSection currently has a link-only placeholder; Phase 7 replaces with functional form widget |
</phase_requirements>

---

## Summary

Phase 7 builds the portal's centrepiece — an interactive ROI calculator — along with the surrounding infrastructure: Supabase Auth magic link authentication, a minimal portal shell with sidebar nav, and a homepage teaser widget that funnels prospects into the portal. The existing portal route group (`src/app/(portal)/`) is a stub placeholder with a passthrough layout and a single placeholder page; this phase replaces it with a complete, authenticated application shell.

The authoritative spreadsheet (`20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx`) has been fully extracted and all formulas independently verified in Python against the spreadsheet's computed values. There is ONE sheet with USD-denominated defaults. The "Regions" label visible at cell D1 is the display name of a Microsoft Office task pane add-in (OMEX id: wa200009404) — it is NOT a separate data section. **There are no GBP or EUR regional numeric defaults anywhere in the spreadsheet.** This is a definitive finding, not a gap; regional variants must use the USD formulas with currency symbol substitution only, or the client must supply region-specific default values before they can be coded.

The calculation engine must be implemented as a pure TypeScript module (`src/lib/calculator/`) with no UI coupling. All formula values have been verified: the fee calculation applies to CVV-required transactions (not total CNP transactions) — this distinction causes a 2x error if the wrong base is used.

**Primary recommendation:** Implement Phase 7 in five plan waves: (1) Supabase Auth + middleware + portal shell, (2) Calculator engine (pure TS formula module, independently testable), (3) Calculator UI — simple mode (sliders, results, bar chart, URL state), (4) Calculator UI — advanced mode, sensitivity table, PDF export, (5) Homepage teaser widget + contact CTA wiring.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @supabase/supabase-js | 2.98.0 | Supabase client — auth, DB | Official Supabase client |
| @supabase/ssr | 0.8.0 | Cookie-based auth for SSR | Required for Next.js App Router server-side auth; `@supabase/auth-helpers-nextjs` is archived |
| recharts | 3.7.0 | Bar chart for savings visualisation | React 19 compatible (peerDep `^19.0.0`); declarative; ~188kB gzip acceptable for portal-only route |
| nuqs | 2.8.8 | Type-safe URL search params state | Tiny (6kB); like `useState` but synced to URL; batched updates prevent history spam on slider drags |
| jspdf | 4.2.0 | Client-side PDF generation | No SSR issues when dynamically imported; no external service; sufficient for report-style export |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none new) | - | Tailwind v4 + DaisyUI v5 already present | Portal shell uses existing design system |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| recharts 3.7.0 | Nivo | Nivo ~400kB gzip vs recharts ~188kB; recharts simpler for single bar chart |
| jspdf | @react-pdf/renderer | @react-pdf/renderer produces better multi-section layouts but requires `dynamic(..., { ssr: false })`; jsPDF is sufficient and simpler |
| nuqs | manual useSearchParams | Manual approach is brittle, not type-safe, causes history spam on every slider change; nuqs handles all edge cases |

**Installation:**
```bash
npm install @supabase/supabase-js @supabase/ssr recharts nuqs jspdf
```

**New environment variables required:**
```bash
NEXT_PUBLIC_SUPABASE_URL           # Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  # Supabase publishable (anon) key
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
  app/
    (portal)/
      layout.tsx              # Portal shell: sidebar nav, NuqsAdapter, no marketing nav
      portal/
        page.tsx              # Dashboard — minimal landing, routes to /calculator
      portal/login/
        page.tsx              # Magic link request form
      portal/auth/callback/
        route.ts              # PKCE token exchange -> session cookie -> redirect
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
        InputSlider.tsx       # Slider with click-to-edit numeric override
        ResultsPanel.tsx      # Headline + expandable sections
        SavingsBarChart.tsx   # Recharts bar chart (Year 1 vs Ongoing)
        SensitivityTable.tsx  # Adoption rate sensitivity (25/50/75/90%)
        PdfExportButton.tsx   # jsPDF dynamic import
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
  middleware.ts               # Root-level Next.js middleware (does not exist yet)
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

**What:** User enters email -> Supabase sends link -> user clicks -> PKCE callback exchanges token -> session set -> redirect to callbackUrl.

```typescript
// Login form client action:
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
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

### Pattern 3: Calculator Engine — Pure TypeScript

**What:** All formula logic lives in `src/lib/calculator/engine.ts` with no React or UI dependencies. The React components read inputs and call `calculate(inputs)` to get outputs.

```typescript
// src/lib/calculator/types.ts
export interface CalculatorInputs {
  // Basic inputs (simple mode)
  debitAccounts: number
  creditAccounts: number
  year1AdoptionRate: number       // 0-1, default 0.25
  ongoingAdoptionRate: number     // 0-1, default 0.90
  debitFraudRate: number          // e.g. 0.00046 (0.046%)
  creditFraudRate: number         // e.g. 0.00174 (0.174%)
  // Advanced inputs
  debitCNPTransactions: number
  creditCNPTransactions: number
  debitAvgTxValue: number
  creditAvgTxValue: number
  debitCvvPct: number             // 0-1, default 0.50
  creditCvvPct: number            // 0-1, default 0.25
  debitLossPerCase: number        // default 101
  creditLossPerCase: number       // default 303
  issuerPct: number               // 0-1, default 0.35
  institutionalCostMethod: 'Multiplier' | 'Fixed Amount'
  institutionalCostMultiplier: number   // default 5.75
  debitFixedCostPerCase: number         // default 144
  creditFixedCostPerCase: number        // default 144
  feePerTx: number                // SafeCypher fee rate, default 0.05
  upliftPerAdopter: number        // default 1 (additional tx per adopter)
  oneTimeTsysCost: number         // default 30000
  annualTsysFee: number           // default 120000
  mobileDevCost: number           // default 85000
  peakHaloMultiplier: number      // default 0.15
  monthsToPeak: number            // default 12
  calculationMode: 'Direct Only' | 'Direct + Halo Effect'
  // Region (affects currency display only — no regional formula variants in spreadsheet)
  region: 'USD' | 'GBP' | 'EUR'
}

export interface CalculatorOutputs {
  // Intermediate fraud metrics
  cvvRequiredTxDebit: number
  cvvRequiredTxCredit: number
  cvvRequiredTxCombined: number
  annualFraudCasesDebit: number
  annualFraudCasesCredit: number
  issuerLossPerCaseDebit: number
  issuerLossPerCaseCredit: number
  institutionalCostPerCaseDebit: number
  institutionalCostPerCaseCredit: number
  currentAnnualFraudCostDebit: number
  currentAnnualFraudCostCredit: number
  currentAnnualFraudCostCombined: number   // "Current CNP fraud cost" headline
  // Implementation cost
  totalImplCost: number
  // Year 1 savings
  grossFraudSavingsYr1Debit: number
  grossFraudSavingsYr1Credit: number
  grossFraudSavingsYr1Combined: number
  txFeesYr1Debit: number
  txFeesYr1Credit: number
  txFeesYr1Combined: number
  netFraudSavingsYr1Debit: number
  netFraudSavingsYr1Credit: number
  netFraudSavingsYr1Combined: number
  monthlySavingsYr1: number
  breakevenDays: number | null             // null when savings = 0
  // Ongoing savings (Year 2+)
  grossFraudSavingsOngoingDebit: number
  grossFraudSavingsOngoingCredit: number
  grossFraudSavingsOngoingCombined: number
  txFeesOngoingDebit: number
  txFeesOngoingCredit: number
  txFeesOngoingCombined: number
  netFraudSavingsOngoingDebit: number
  netFraudSavingsOngoingCredit: number
  netFraudSavingsOngoingCombined: number
  monthlySavingsOngoing: number
  // Interchange uplift
  interchangeUpliftYr1Debit: number
  interchangeUpliftYr1Credit: number
  interchangeUpliftYr1Combined: number
  interchangeUpliftOngoingDebit: number
  interchangeUpliftOngoingCredit: number
  interchangeUpliftOngoingCombined: number
  // Halo effect
  avgYr1HaloFactor: number                 // e.g. 1.075 when monthsToPeak=12, peakMultiplier=0.15
  yr1HaloBonusDebit: number
  yr1HaloBonusCredit: number
  yr1HaloBonusCombined: number
  ongoingHaloBonusDebit: number
  ongoingHaloBonusCredit: number
  ongoingHaloBonusCombined: number
  // Summary totals (with halo)
  totalYr1Savings: number
  totalOngoingSavings: number
  // Summary totals (without halo, for "Direct Only" comparison)
  totalYr1SavingsDirectOnly: number
  totalOngoingSavingsDirectOnly: number
  // Sensitivity table rows [0.25, 0.50, 0.75, 0.90]
  sensitivityRows: Array<{
    adoptionRate: number
    annualSavings: number
    breakevenDays: number | null
    isCurrentRate: boolean
  }>
}
```

### Pattern 4: URL State with nuqs

**What:** All calculator inputs are encoded in the URL so the user can share a pre-filled calculation.

```typescript
// NuqsAdapter must wrap the portal layout only:
// src/app/(portal)/layout.tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <PortalShell>{children}</PortalShell>
    </NuqsAdapter>
  )
}

// In CalculatorPage.tsx ('use client'):
import { useQueryState, parseAsFloat, parseAsStringLiteral } from 'nuqs'
const [debitAccounts, setDebitAccounts] = useQueryState('da', parseAsFloat.withDefault(5_000_000))
const [year1Adoption, setYear1Adoption] = useQueryState('y1a', parseAsFloat.withDefault(0.25))
const [region, setRegion] = useQueryState(
  'region',
  parseAsStringLiteral(['USD', 'GBP', 'EUR'] as const).withDefault('USD')
)
```

**Critical note:** `NuqsAdapter` must be in `src/app/(portal)/layout.tsx` only — NOT the root `app/layout.tsx` — to avoid affecting marketing site URL handling.

### Pattern 5: Attio Event Route Extension

**What:** The existing `/api/attio/event` route requires `name`, `company`, `role` as non-optional strings. The `calculator_run` event carries calculator data instead. The route type must be extended.

```typescript
// Updated type in src/app/api/attio/event/route.ts
type AttioEventBody = {
  event: string
  email?: string
  name?: string
  company?: string
  role?: string
  message?: string
  [key: string]: unknown  // Generic additional payload for calculator events
}
```

The existing production code also accesses `body.name.split(' ')` which will throw if `name` is undefined. The route needs a guard: `if (body.name)` before attempting the person upsert.

### Anti-Patterns to Avoid

- **Using `supabase.auth.getSession()` in middleware:** Always use `getUser()`. `getSession()` reads from cookie without network revalidation and can be spoofed.
- **Importing recharts in a Server Component:** Recharts uses `ResizeObserver` (browser-only). All components that import recharts must have `'use client'`.
- **Importing jsPDF at module scope:** jsPDF accesses `window` on import. Use `const { jsPDF } = await import('jspdf')` inside the click handler only.
- **Storing calculator state in component state only:** Results are lost on refresh and cannot be shared. Always sync to URL via nuqs.
- **Firing Attio on every keystroke:** Debounce at 500ms using `useRef` for the timeout ID. Clear on each change.
- **Adding NuqsAdapter to root layout:** Affects the marketing site. Add only to `src/app/(portal)/layout.tsx`.
- **Using get/set/remove cookie API with @supabase/ssr:** The current API requires `getAll/setAll` only — older single-cookie examples are wrong.

---

## Spreadsheet Formula Engine — Complete Authoritative Reference

This section documents the complete formula logic extracted directly from the spreadsheet file via Python zipfile/XML parsing and independently verified by running the formulas in Python against the spreadsheet's pre-computed values. All calculations matched to full floating-point precision.

**Spreadsheet file:** `20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx`
**Sheet count:** 1 sheet only ("Safecypher Value Calculator")
**Currency in spreadsheet:** USD throughout. The "Regions" label at D1 is a Microsoft Office task pane add-in name (OMEX id: wa200009404), NOT a regional data section. There are NO GBP or EUR numeric defaults in this file.

### Complete Input Inventory with Cell References

**BASIC INPUTS section (rows 13-28)**

| Label | Cell | Debit Default | Credit Default | Source Note |
|-------|------|--------------|----------------|-------------|
| Number of accounts | C14, D14 | 5,000,000 | 907,000 | Total active card accounts (TSYS) |
| Annual CNP transactions | C15, D15 | 330,120,000 | 93,700,000 | Total card-not-present per year (TSYS) |
| Average $ per CNP transaction | C16, D16 | 62.34 | 150.00 | Conservative assumption |
| Adoption Rate — Year 1 | C22 | 0.25 (25%) | shared | Voluntary trial; per row label "YEAR 1" |
| Adoption Rate — Ongoing | D22 | 0.90 (90%) | shared | Mandatory recommended; per row label "ONGOING" |
| One-time TSYS setup cost | C25 | 30,000 | — | One-time |
| Annual TSYS platform fee | C26 | 120,000 | — | Annual |
| Mobile app development cost | C27 | 85,000 | — | One-time internal cost |
| Total Year 1 Implementation Cost | C28 | 235,000 | — | Formula: C25+C26+C27 |

**ADVANCED INPUTS section (rows 31-44)**

| Label | Cell | Debit Default | Credit Default | Source Note |
|-------|------|--------------|----------------|-------------|
| % of CNP transactions requiring CVV | C35, D35 | 0.50 (50%) | 0.25 (25%) | Pulse Network 2025 / Industry estimate |
| Fraud rate | C36, D36 | 0.00046 (0.046%) | 0.00174 (0.174%) | Kansas City Fed Reserve / Industry average |
| Total loss per fraud case | C37, D37 | 101 | 303 | Federal Reserve Board data |
| Issuer % of fraud loss | C38, D38 | 0.35 (35%) | 0.35 (35%) | 2024 Clearly Payments / FTC data |
| Institutional cost method | C39, D39 | "Fixed Amount" | "Fixed Amount" | Choose: "Multiplier" or "Fixed Amount" |
| Institutional cost multiplier (per £1 fraud) | C40, D40 | 5.75 | 5.75 | 2025 LexisNexis True Cost of Fraud |
| Fixed institutional cost per case (£) | C41, D41 | 144 | 144 | Fixed $ cost per fraud case (investigation, admin) |
| Fee per transaction | C42, D42 | 0.05 (5%) | 0.05 (5%) | Subject to commercial agreement |
| Interchange structure (debit) | C43 | "$0.21 + 0.05%" | — | Additional interchange from transaction uplift |
| Interchange structure (credit) | D43 | — | "$0.10 + 2.34%" | Additional interchange from transaction uplift |
| Uplift in transactions per adopter | C44, D44 | 1 | 1 | An Post saw 50% uplift; 1 = conservative |

**HALO EFFECT settings (rows 83-86)**

| Label | Cell | Default | Notes |
|-------|------|---------|-------|
| Calculation Mode | C84 | "Direct + Halo Effect" | Choose: "Direct Only" or "Direct + Halo Effect" |
| Peak Halo Multiplier | C85 | 0.15 (15%) | Additional CNP fraud reduction once fully established |
| Months to Peak Effect | C86 | 12 | Time for criminal networks to recognise bank as "safe" |

### Formula Sequence — Step by Step

All formulas below are translated from Excel cell references. Verified values use the spreadsheet defaults shown above.

**Step 1: CVV-required transactions**

Cell formulas: `E50=C15*C35`, `F50=D15*D35`, `G50=E50+F50`

```
cvvRequired_D = debitCNPTransactions * debitCvvPct
              = 330,120,000 * 0.50 = 165,060,000

cvvRequired_C = creditCNPTransactions * creditCvvPct
              = 93,700,000 * 0.25 = 23,425,000

cvvRequired_combined = cvvRequired_D + cvvRequired_C
                     = 188,485,000
```

**Step 2: Annual fraud cases**

Cell formulas: `E51=E50*C36`, `F51=F50*D36`, `G51=E51+F51`

```
fraudCases_D = cvvRequired_D * debitFraudRate
             = 165,060,000 * 0.00046 = 75,927.6

fraudCases_C = cvvRequired_C * creditFraudRate
             = 23,425,000 * 0.00174 = 40,759.5

fraudCases_combined = 116,687.1
```

**Step 3: Loss and institutional cost per case**

Cell formulas: `E52=C37*C38`, `F52=D37*D38`, `E54=IF(C39="Multiplier",E52*C40,C41)`, `F54=IF(D39="Multiplier",F52*D40,D41)`

```
issuerLossPerCase_D = totalLossPerCase_D * issuerPct
                    = 101 * 0.35 = 35.35

issuerLossPerCase_C = totalLossPerCase_C * issuerPct
                    = 303 * 0.35 = 106.05

institutionalCostPerCase_D =
  if institutionalCostMethod == "Multiplier": issuerLossPerCase_D * multiplier
  else (Fixed Amount): debitFixedCostPerCase
  default result: 144

institutionalCostPerCase_C =
  if institutionalCostMethod == "Multiplier": issuerLossPerCase_C * multiplier
  else (Fixed Amount): creditFixedCostPerCase
  default result: 144
```

**Step 4: Total annual fraud cost to issuer**

Cell formulas: `E56=(E51*E52)+(E51*E54)`, `F56=(F51*F52)+(F51*F54)`, `G56=E56+F56`

```
totalAnnualFraudCost_D = (fraudCases_D * issuerLossPerCase_D) + (fraudCases_D * institutionalCostPerCase_D)
                       = (75927.6 * 35.35) + (75927.6 * 144)
                       = 2,684,040.66 + 10,933,574.40
                       = 13,617,615.06

totalAnnualFraudCost_C = (fraudCases_C * issuerLossPerCase_C) + (fraudCases_C * institutionalCostPerCase_C)
                       = (40759.5 * 106.05) + (40759.5 * 144)
                       = 4,322,544.97 + 5,869,368.00
                       = 10,191,912.97

totalAnnualFraudCost_combined = 23,809,528.04  [VERIFIED: matches cell G56]
```

**Step 5: Implementation cost**

Cell formula: `C28=C25+C26+C27`

```
totalImplCost = oneTimeTsysCost + annualTsysFee + mobileDevCost
              = 30,000 + 120,000 + 85,000 = 235,000
```

**Step 6: Year 1 savings**

Cell formulas: `E60=E56*C22`, `F60=F56*C22`, `G60=E60+F60`
`E61=E50*C22*C42`, `F61=F50*C22*D42`, `G61=E61+F61`
`E62=E60-E61`, `F62=F60-F61`, `G62=E62+F62`
`E63=E62/12`, `F63=F62/12`, `G63=E63+F63`
`G65=IFERROR(((C25+C26+C27)/G63)*(365/12),"—")`

```
grossFraudSavingsYr1_D = totalAnnualFraudCost_D * year1AdoptionRate
                       = 13,617,615.06 * 0.25 = 3,404,403.77

grossFraudSavingsYr1_C = totalAnnualFraudCost_C * year1AdoptionRate
                       = 10,191,912.97 * 0.25 = 2,547,978.24

// CRITICAL: Fee applies to cvvRequired transactions, NOT total CNP transactions
// Formula: E61 = E50 * C22 * C42 (where E50 = cvvRequired_D)
txFeesYr1_D = cvvRequired_D * year1AdoptionRate * feePerTx
            = 165,060,000 * 0.25 * 0.05 = 2,063,250.00  [VERIFIED]

txFeesYr1_C = cvvRequired_C * year1AdoptionRate * feePerTx
            = 23,425,000 * 0.25 * 0.05 = 292,812.50     [VERIFIED]

netFraudSavingsYr1_D = grossFraudSavingsYr1_D - txFeesYr1_D = 1,341,153.77
netFraudSavingsYr1_C = grossFraudSavingsYr1_C - txFeesYr1_C = 2,255,165.74
netFraudSavingsYr1_combined = 3,596,319.51

monthlySavingsYr1 = netFraudSavingsYr1_combined / 12 = 299,693.29

breakevenDays = IFERROR( (totalImplCost / monthlySavingsYr1) * (365/12), null )
              = (235,000 / 299,693.29) * (365/12) = 23.85 days  [VERIFIED]
```

**Step 7: Ongoing savings (Year 2+)**

Cell formulas: `E69=E56*D22`, `F69=F56*D22`, `G69=E69+F69`
`E70=E50*D22*C42`, `F70=F50*D22*D42`, `G70=E70+F70`
`E71=E69-E70`, `F71=F69-F70`, `G71=E71+F71`

```
grossFraudSavingsOngoing_D = totalAnnualFraudCost_D * ongoingAdoptionRate
                           = 13,617,615.06 * 0.90 = 12,255,853.55

grossFraudSavingsOngoing_C = totalAnnualFraudCost_C * ongoingAdoptionRate
                           = 10,191,912.97 * 0.90 = 9,172,721.68

// Fee again applies to cvvRequired, not total CNP
txFeesOngoing_D = cvvRequired_D * ongoingAdoptionRate * feePerTx
                = 165,060,000 * 0.90 * 0.05 = 7,427,700.00

txFeesOngoing_C = cvvRequired_C * ongoingAdoptionRate * feePerTx
                = 23,425,000 * 0.90 * 0.05 = 1,054,125.00

netFraudSavingsOngoing_D = 4,828,153.55  [VERIFIED]
netFraudSavingsOngoing_C = 8,118,596.68  [VERIFIED]
netFraudSavingsOngoing_combined = 12,946,750.23  [VERIFIED]

monthlySavingsOngoing = netFraudSavingsOngoing_combined / 12 = 1,078,895.85
```

**Step 8: Interchange uplift**

Cell formulas:
`E76=IF(C14=0,0,(C14*C44*C16*C22*0.0005)+(C14*C44*C22*0.21))`
`F76=IF(D14=0,0,(D14*D44*D16*C22*0.0234)+(D14*D44*C22*0.1))`
`G76=E76+F76`
(Same pattern for ongoing: `E77`, `F77`, `G77` using `D22` instead of `C22`)

```
// Debit interchange: ($0.21 flat per adopter tx) + (0.05% of value per tx)
// The 0.21 and 0.0005 are the debit interchange rate constants embedded in the formula
interchangeYr1_D = (debitAccounts * upliftPerAdopter * debitAvgTxValue * year1Adoption * 0.0005)
                 + (debitAccounts * upliftPerAdopter * year1Adoption * 0.21)
                 = (5,000,000 * 1 * 62.34 * 0.25 * 0.0005) + (5,000,000 * 1 * 0.25 * 0.21)
                 = 39,012.50 + 262,500.00 = 301,462.50  [VERIFIED]

// Credit interchange: ($0.10 flat) + (2.34% of value)
interchangeYr1_C = (creditAccounts * upliftPerAdopter * creditAvgTxValue * year1Adoption * 0.0234)
                 + (creditAccounts * upliftPerAdopter * year1Adoption * 0.10)
                 = (907,000 * 1 * 150 * 0.25 * 0.0234) + (907,000 * 1 * 0.25 * 0.10)
                 = 795,847.50 + 22,675.00 = 818,567.50  [VERIFIED]

interchangeYr1_combined = 1,120,030.00  [VERIFIED: matches cell G76]

// Ongoing: same formula with ongoingAdoptionRate
interchangeOngoing_D = (5,000,000 * 1 * 62.34 * 0.90 * 0.0005) + (5,000,000 * 1 * 0.90 * 0.21)
                     = 1,085,265.00  [VERIFIED]
interchangeOngoing_C = (907,000 * 1 * 150 * 0.90 * 0.0234) + (907,000 * 1 * 0.90 * 0.10)
                     = 2,946,843.00  [VERIFIED]
interchangeOngoing_combined = 4,032,108.00  [VERIFIED: matches cell G77]
```

**Step 9: Halo effect**

Cell formulas:
`C89=IF(C86>=12, 1+(C85*(6/12)), 1+(C85*((C86/2)/12)))`
`E92=IF(C84="Direct Only",0,E62*(C89-1))`
`F92=IF(C84="Direct Only",0,F62*(C89-1))`
`G92=E92+F92`
`E93=IF(C84="Direct Only",0,E71*C85)`
`F93=IF(C84="Direct Only",0,F71*C85)`
`G93=E93+F93`

```
// Average Year 1 Halo Factor — models ramp-up from 1.0x to (1 + peakMultiplier)
// "Ramps from 1.0x to 1.15x over 12 months" (cell E89 formula-generated label)
avgYr1HaloFactor =
  monthsToPeak >= 12
    ? 1 + (peakHaloMultiplier * (6 / 12))          // average of first 12 months
    : 1 + (peakHaloMultiplier * ((monthsToPeak / 2) / 12))
default: 1 + (0.15 * 0.5) = 1.075  [VERIFIED]

// Year 1 Halo Bonus: additional savings from halo above direct savings
yr1HaloBonus_D = calculationMode == 'Direct Only' ? 0
               : netFraudSavingsYr1_D * (avgYr1HaloFactor - 1)
               = 1,341,153.77 * 0.075 = 100,586.53  [VERIFIED]

yr1HaloBonus_C = calculationMode == 'Direct Only' ? 0
               : netFraudSavingsYr1_C * (avgYr1HaloFactor - 1)
               = 2,255,165.74 * 0.075 = 169,137.43  [VERIFIED]

yr1HaloBonus_combined = 269,723.96  [VERIFIED: matches cell G92]

// Ongoing Halo Bonus: full peak multiplier applied to ongoing net savings
ongoingHaloBonus_D = calculationMode == 'Direct Only' ? 0
                   : netFraudSavingsOngoing_D * peakHaloMultiplier
                   = 4,828,153.55 * 0.15 = 724,223.03  [VERIFIED]

ongoingHaloBonus_C = calculationMode == 'Direct Only' ? 0
                   : netFraudSavingsOngoing_C * peakHaloMultiplier
                   = 8,118,596.68 * 0.15 = 1,217,789.50  [VERIFIED]

ongoingHaloBonus_combined = 1,942,012.53  [VERIFIED: matches cell G93]
```

**Step 10: Total savings**

Cell formulas:
`E97=E62+E92`, `F97=F62+F92`, `G97=E97+F97`
`E98=E71+E93`, `F98=F71+F93`, `G98=E98+F98`

```
// Summary Dashboard values:
// B6 = IF(C84="Direct Only", G62, G97) — Year 1 Net Savings headline
// C6 = IF(C84="Direct Only", G71, G98) — Ongoing Net Savings headline

totalYr1Savings_D = netFraudSavingsYr1_D + yr1HaloBonus_D = 1,441,740.30
totalYr1Savings_C = netFraudSavingsYr1_C + yr1HaloBonus_C = 2,424,303.17
totalYr1Savings_combined = 3,866,043.47  [VERIFIED: matches cell G97/B6]

totalOngoingSavings_D = netFraudSavingsOngoing_D + ongoingHaloBonus_D = 5,552,376.59
totalOngoingSavings_C = netFraudSavingsOngoing_C + ongoingHaloBonus_C = 9,336,386.18
totalOngoingSavings_combined = 14,888,762.77  [VERIFIED: matches cell G98/C6]

// Note: Interchange uplift is tracked separately (cells G76/G77) and shown in Dashboard
// cells G6/H6. It is NOT added into G97/G98 (the "Net Savings" total).
// The Summary Dashboard shows six distinct metrics: fraud savings + interchange + halo separately.
// Implementation should match this structure: show each component distinctly.
```

**Step 11: Adoption sensitivity table**

Cell formulas (rows 104-107):
`C104=(G56*B104)-((E50+F50)*B104*D42)`
`D104=IFERROR(((C25+C26+C27)/(C104/12))*(365/12),"—")`
`E104=IF(C22=B104,"◀ Current rate","")`

Adoption rate rows: 0.25, 0.50, 0.75, 0.90 (cell B104:B107)

```
// Sensitivity uses a simplified fee formula: (E50+F50)*adoptionRate*D42
// i.e., same fee rate (D42=0.05) applied to combined cvvRequired for all adoption levels
for each adoptionRate in [0.25, 0.50, 0.75, 0.90]:
  annualSavings = (totalAnnualFraudCost_combined * adoptionRate)
                  - (cvvRequired_combined * adoptionRate * feePerTx)
  breakevenDays = (annualSavings > 0)
    ? (totalImplCost / (annualSavings / 12)) * (365 / 12)
    : null
  isCurrentRate = (adoptionRate === year1AdoptionRate)

// Verified values at defaults:
// 25%:  annualSavings=3,596,319.51  breakevenDays=23.85  [VERIFIED]
// 50%:  annualSavings=7,192,639.02  breakevenDays=11.93
// 75%:  annualSavings=10,788,958.53 breakevenDays=7.95
// 90%:  annualSavings=12,946,750.23 breakevenDays=6.63   [marked "← Mandatory"]
```

### Regional Currency Configuration

**DEFINITIVE FINDING:** The spreadsheet contains exactly ONE sheet. The label "Regions" at cell D1 is the Microsoft Office "Regions" task pane add-in (OMEX id: wa200009404) automatically shown when the file opens — it is not a data section. There are NO GBP or EUR numeric defaults anywhere in the file.

The currency symbols present are mixed (both `$` and `£` appear in label strings for the same fields), which reflects the spreadsheet's shared history across US and UK clients — but all computed values use a single set of numeric defaults.

**Implementation decision for regional support (Claude's discretion):** Since the formulas are identical regardless of region, regional support is purely cosmetic in this phase. The `region` selector changes:
1. Currency symbol displayed (`$`, `£`, `€`)
2. Number formatting (thousands separator / decimal convention)
3. Potentially the default account/transaction values if the client provides region-specific figures

Use USD defaults for all three regions until the client confirms GBP/EUR specific defaults. Region selector is still valuable for currency display.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL state sync | Manual `router.push` + `URLSearchParams` | nuqs | Handles batching, type-safety, serialisation, history API limits |
| Session cookie management | Custom JWT cookie handling | @supabase/ssr `createServerClient` | Handles cookie get/set/refresh across server components, middleware, client |
| Bar chart | Hand-rolled SVG | recharts `BarChart` | ResizeObserver, responsive container, tooltip, axis labels, animations built-in |
| PDF layout | HTML-to-canvas pipeline | jsPDF direct draw API | html2canvas has render bugs with DaisyUI dark theme; jsPDF is deterministic |
| Token refresh | Manual JWT decode + expiry check | `supabase.auth.getUser()` in middleware | Supabase handles token refresh, cookie update, clock skew edge cases |

**Key insight:** Supabase's `@supabase/ssr` package was specifically designed to solve the "server components can't write cookies" problem in Next.js App Router — it is not optional middleware sugar.

---

## Common Pitfalls

### Pitfall 1: Fee Applied to Wrong Transaction Base
**What goes wrong:** Applying the SafeCypher fee to total CNP transactions instead of CVV-required transactions. This produces a 2x error (debit: 330M vs 165M base transactions).
**Why it happens:** The field label says "Fee per transaction" but the cell formula `E61=E50*C22*C42` uses `E50` (cvvRequired) not `C15` (CNPTransactions). The fee only applies to CVV-protected transactions.
**How to avoid:** Use `cvvRequired_D * year1AdoptionRate * feePerTx` for debit. Verify: default result is $2,063,250 (not $4,126,500).
**Warning signs:** Year 1 transaction fees > $3M at default inputs.

### Pitfall 2: `getSession()` vs `getUser()` in Server Code
**What goes wrong:** `supabase.auth.getSession()` does not revalidate the token — reads cookie as-is. A spoofed cookie bypasses auth.
**Why it happens:** `getSession()` is the client-side method that avoids a network round-trip.
**How to avoid:** Always use `supabase.auth.getUser()` in all server-side code (middleware, Server Components, Route Handlers).
**Warning signs:** Protected routes accessible without valid session.

### Pitfall 3: NuqsAdapter Placement
**What goes wrong:** Adding `NuqsAdapter` to `src/app/layout.tsx` affects both marketing and portal route groups.
**Why it happens:** Root layout wraps all route groups.
**How to avoid:** Add `NuqsAdapter` only to `src/app/(portal)/layout.tsx`.
**Warning signs:** `useQueryState` returns stale values; URL updates don't reflect in component.

### Pitfall 4: Recharts in Server Components
**What goes wrong:** `ResizeObserver is not defined` build error.
**Why it happens:** Recharts uses browser APIs at import time.
**How to avoid:** `SavingsBarChart.tsx` and any file importing recharts must have `'use client'`.
**Warning signs:** Build error mentioning `ResizeObserver`, `window`, or `document`.

### Pitfall 5: jsPDF `window` Access on Import
**What goes wrong:** `ReferenceError: window is not defined` during server-side render.
**Why it happens:** jsPDF accesses `window` at module load time.
**How to avoid:** Use `const { jsPDF } = await import('jspdf')` inside the button click handler only — never at module scope.
**Warning signs:** Build error about `window is not defined` in PDF export flow.

### Pitfall 6: callbackUrl Param Lost Through Auth Flow
**What goes wrong:** Portfolio size entered on homepage → lost after magic link click → calculator loads without pre-fill.
**Why it happens:** The `callbackUrl` param must survive: login page read → `emailRedirectTo` construction → Supabase email send → `/portal/auth/callback` receipt → final redirect. If any step drops it, the param is lost.
**How to avoid:** Encode `callbackUrl` in `emailRedirectTo` as `?callbackUrl=ENCODED_VALUE`. In the callback route handler, read it from `searchParams` and pass it to `NextResponse.redirect`.
**Warning signs:** Calculator loads with default values after auth despite homepage teaser entry.

### Pitfall 7: Attio Route TypeError on `calculator_run`
**What goes wrong:** `body.name.split(' ')` throws `TypeError: Cannot read properties of undefined (reading 'split')` when `calculator_run` sends no `name` field.
**Why it happens:** The existing `/api/attio/event/route.ts` unconditionally calls `body.name.split(' ')` in the person upsert logic.
**How to avoid:** Add a guard `if (body.name && body.email)` around the person upsert block. For `calculator_run` events without a name, skip the person upsert and only create a note (or skip entirely if no email is available).
**Warning signs:** 500 error on `calculator_run` event in production logs.

### Pitfall 8: DemoFormSection Teaser Widget Duplication
**What goes wrong:** Adding a new section below the demo form creates two CTAs to the calculator.
**Why it happens:** `DemoFormSection.tsx` already has a link placeholder at the bottom pointing to `/portal/calculator`.
**How to avoid:** Replace the existing link-only placeholder in `DemoFormSection` (lines 178-189) with the actual `HomepageTeaserWidget` component. Do not add a new section.
**Warning signs:** Two calculator links visible in the homepage CTA area.

---

## Code Examples

### Calculator Engine — Core Implementation Pattern

```typescript
// src/lib/calculator/engine.ts — pure function, no React
import type { CalculatorInputs, CalculatorOutputs } from './types'

export function calculate(inputs: CalculatorInputs): CalculatorOutputs {
  // Step 1: CVV-required transactions
  const cvvRequired_D = inputs.debitCNPTransactions * inputs.debitCvvPct
  const cvvRequired_C = inputs.creditCNPTransactions * inputs.creditCvvPct

  // Step 2: Annual fraud cases
  const fraudCases_D = cvvRequired_D * inputs.debitFraudRate
  const fraudCases_C = cvvRequired_C * inputs.creditFraudRate

  // Step 3: Loss per case
  const issuerLossPerCase_D = inputs.debitLossPerCase * inputs.issuerPct
  const issuerLossPerCase_C = inputs.creditLossPerCase * inputs.issuerPct

  const instCostPerCase_D = inputs.institutionalCostMethod === 'Multiplier'
    ? issuerLossPerCase_D * inputs.institutionalCostMultiplier
    : inputs.debitFixedCostPerCase
  const instCostPerCase_C = inputs.institutionalCostMethod === 'Multiplier'
    ? issuerLossPerCase_C * inputs.institutionalCostMultiplier
    : inputs.creditFixedCostPerCase

  // Step 4: Total annual fraud cost
  const totalFraudCost_D = (fraudCases_D * issuerLossPerCase_D) + (fraudCases_D * instCostPerCase_D)
  const totalFraudCost_C = (fraudCases_C * issuerLossPerCase_C) + (fraudCases_C * instCostPerCase_C)
  const totalFraudCost_combined = totalFraudCost_D + totalFraudCost_C

  // Step 5: Implementation cost
  const totalImplCost = inputs.oneTimeTsysCost + inputs.annualTsysFee + inputs.mobileDevCost

  // Step 6: Year 1 savings — CRITICAL: fee uses cvvRequired base, not CNP base
  const grossSavingsYr1_D = totalFraudCost_D * inputs.year1AdoptionRate
  const grossSavingsYr1_C = totalFraudCost_C * inputs.year1AdoptionRate
  const txFeesYr1_D = cvvRequired_D * inputs.year1AdoptionRate * inputs.feePerTx
  const txFeesYr1_C = cvvRequired_C * inputs.year1AdoptionRate * inputs.feePerTx
  const netSavingsYr1_D = grossSavingsYr1_D - txFeesYr1_D
  const netSavingsYr1_C = grossSavingsYr1_C - txFeesYr1_C
  const netSavingsYr1 = netSavingsYr1_D + netSavingsYr1_C
  const monthlySavingsYr1 = netSavingsYr1 / 12
  const breakevenDays = monthlySavingsYr1 > 0
    ? (totalImplCost / monthlySavingsYr1) * (365 / 12)
    : null

  // Step 7: Ongoing savings
  const grossSavingsOngoing_D = totalFraudCost_D * inputs.ongoingAdoptionRate
  const grossSavingsOngoing_C = totalFraudCost_C * inputs.ongoingAdoptionRate
  const txFeesOngoing_D = cvvRequired_D * inputs.ongoingAdoptionRate * inputs.feePerTx
  const txFeesOngoing_C = cvvRequired_C * inputs.ongoingAdoptionRate * inputs.feePerTx
  const netSavingsOngoing_D = grossSavingsOngoing_D - txFeesOngoing_D
  const netSavingsOngoing_C = grossSavingsOngoing_C - txFeesOngoing_C
  const netSavingsOngoing = netSavingsOngoing_D + netSavingsOngoing_C
  const monthlySavingsOngoing = netSavingsOngoing / 12

  // Step 8: Interchange uplift (constants embedded in formula per spreadsheet)
  const interchangeYr1_D = inputs.debitAccounts === 0 ? 0
    : (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.debitAvgTxValue * inputs.year1AdoptionRate * 0.0005)
    + (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.year1AdoptionRate * 0.21)
  const interchangeYr1_C = inputs.creditAccounts === 0 ? 0
    : (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.creditAvgTxValue * inputs.year1AdoptionRate * 0.0234)
    + (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.year1AdoptionRate * 0.10)
  const interchangeOngoing_D = inputs.debitAccounts === 0 ? 0
    : (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.debitAvgTxValue * inputs.ongoingAdoptionRate * 0.0005)
    + (inputs.debitAccounts * inputs.upliftPerAdopter * inputs.ongoingAdoptionRate * 0.21)
  const interchangeOngoing_C = inputs.creditAccounts === 0 ? 0
    : (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.creditAvgTxValue * inputs.ongoingAdoptionRate * 0.0234)
    + (inputs.creditAccounts * inputs.upliftPerAdopter * inputs.ongoingAdoptionRate * 0.10)

  // Step 9: Halo effect
  const avgYr1HaloFactor = inputs.monthsToPeak >= 12
    ? 1 + (inputs.peakHaloMultiplier * (6 / 12))
    : 1 + (inputs.peakHaloMultiplier * ((inputs.monthsToPeak / 2) / 12))
  const isHalo = inputs.calculationMode === 'Direct + Halo Effect'
  const yr1HaloBonus_D = isHalo ? netSavingsYr1_D * (avgYr1HaloFactor - 1) : 0
  const yr1HaloBonus_C = isHalo ? netSavingsYr1_C * (avgYr1HaloFactor - 1) : 0
  const ongoingHaloBonus_D = isHalo ? netSavingsOngoing_D * inputs.peakHaloMultiplier : 0
  const ongoingHaloBonus_C = isHalo ? netSavingsOngoing_C * inputs.peakHaloMultiplier : 0

  // Step 10: Sensitivity table (simplified formula using combined cvvRequired)
  const sensitivityRates = [0.25, 0.50, 0.75, 0.90]
  const sensitivityRows = sensitivityRates.map(rate => {
    const savings = (totalFraudCost_combined * rate) - ((cvvRequired_D + cvvRequired_C) * rate * inputs.feePerTx)
    const breakeven = savings > 0 ? (totalImplCost / (savings / 12)) * (365 / 12) : null
    return { adoptionRate: rate, annualSavings: savings, breakevenDays: breakeven, isCurrentRate: rate === inputs.year1AdoptionRate }
  })

  return {
    cvvRequiredTxDebit: cvvRequired_D,
    cvvRequiredTxCredit: cvvRequired_C,
    cvvRequiredTxCombined: cvvRequired_D + cvvRequired_C,
    annualFraudCasesDebit: fraudCases_D,
    annualFraudCasesCredit: fraudCases_C,
    issuerLossPerCaseDebit: issuerLossPerCase_D,
    issuerLossPerCaseCredit: issuerLossPerCase_C,
    institutionalCostPerCaseDebit: instCostPerCase_D,
    institutionalCostPerCaseCredit: instCostPerCase_C,
    currentAnnualFraudCostDebit: totalFraudCost_D,
    currentAnnualFraudCostCredit: totalFraudCost_C,
    currentAnnualFraudCostCombined: totalFraudCost_combined,
    totalImplCost,
    grossFraudSavingsYr1Debit: grossSavingsYr1_D,
    grossFraudSavingsYr1Credit: grossSavingsYr1_C,
    grossFraudSavingsYr1Combined: grossSavingsYr1_D + grossSavingsYr1_C,
    txFeesYr1Debit: txFeesYr1_D,
    txFeesYr1Credit: txFeesYr1_C,
    txFeesYr1Combined: txFeesYr1_D + txFeesYr1_C,
    netFraudSavingsYr1Debit: netSavingsYr1_D,
    netFraudSavingsYr1Credit: netSavingsYr1_C,
    netFraudSavingsYr1Combined: netSavingsYr1,
    monthlySavingsYr1,
    breakevenDays,
    grossFraudSavingsOngoingDebit: grossSavingsOngoing_D,
    grossFraudSavingsOngoingCredit: grossSavingsOngoing_C,
    grossFraudSavingsOngoingCombined: grossSavingsOngoing_D + grossSavingsOngoing_C,
    txFeesOngoingDebit: txFeesOngoing_D,
    txFeesOngoingCredit: txFeesOngoing_C,
    txFeesOngoingCombined: txFeesOngoing_D + txFeesOngoing_C,
    netFraudSavingsOngoingDebit: netSavingsOngoing_D,
    netFraudSavingsOngoingCredit: netSavingsOngoing_C,
    netFraudSavingsOngoingCombined: netSavingsOngoing,
    monthlySavingsOngoing,
    interchangeUpliftYr1Debit: interchangeYr1_D,
    interchangeUpliftYr1Credit: interchangeYr1_C,
    interchangeUpliftYr1Combined: interchangeYr1_D + interchangeYr1_C,
    interchangeUpliftOngoingDebit: interchangeOngoing_D,
    interchangeUpliftOngoingCredit: interchangeOngoing_C,
    interchangeUpliftOngoingCombined: interchangeOngoing_D + interchangeOngoing_C,
    avgYr1HaloFactor,
    yr1HaloBonusDebit: yr1HaloBonus_D,
    yr1HaloBonusCredit: yr1HaloBonus_C,
    yr1HaloBonusCombined: yr1HaloBonus_D + yr1HaloBonus_C,
    ongoingHaloBonusDebit: ongoingHaloBonus_D,
    ongoingHaloBonusCredit: ongoingHaloBonus_C,
    ongoingHaloBonusCombined: ongoingHaloBonus_D + ongoingHaloBonus_C,
    totalYr1Savings: netSavingsYr1 + yr1HaloBonus_D + yr1HaloBonus_C,
    totalOngoingSavings: netSavingsOngoing + ongoingHaloBonus_D + ongoingHaloBonus_C,
    totalYr1SavingsDirectOnly: netSavingsYr1,
    totalOngoingSavingsDirectOnly: netSavingsOngoing,
    sensitivityRows,
  }
}
```

### Default Values

```typescript
// src/lib/calculator/defaults.ts
import type { CalculatorInputs } from './types'

// Spreadsheet defaults — USD region
// Note: GBP/EUR regions use same formula defaults with different currency display
export const USD_DEFAULTS: Omit<CalculatorInputs, 'region'> = {
  debitAccounts: 5_000_000,
  creditAccounts: 907_000,
  debitCNPTransactions: 330_120_000,
  creditCNPTransactions: 93_700_000,
  debitAvgTxValue: 62.34,
  creditAvgTxValue: 150.00,
  year1AdoptionRate: 0.25,
  ongoingAdoptionRate: 0.90,
  debitCvvPct: 0.50,
  creditCvvPct: 0.25,
  debitFraudRate: 0.00046,
  creditFraudRate: 0.00174,
  debitLossPerCase: 101,
  creditLossPerCase: 303,
  issuerPct: 0.35,
  institutionalCostMethod: 'Fixed Amount',
  institutionalCostMultiplier: 5.75,
  debitFixedCostPerCase: 144,
  creditFixedCostPerCase: 144,
  feePerTx: 0.05,
  upliftPerAdopter: 1,
  oneTimeTsysCost: 30_000,
  annualTsysFee: 120_000,
  mobileDevCost: 85_000,
  peakHaloMultiplier: 0.15,
  monthsToPeak: 12,
  calculationMode: 'Direct + Halo Effect',
}

// Debit/credit split when only combined portfolio size is provided (homepage teaser)
// 70/30 split based on typical issuer portfolio composition
export const PORTFOLIO_SPLIT_RATIO = { debit: 0.70, credit: 0.30 }

export const REGION_CURRENCY: Record<'USD' | 'GBP' | 'EUR', { symbol: string; locale: string }> = {
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
  EUR: { symbol: '€', locale: 'de-DE' },
}
```

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

### nuqs Calculator State

```typescript
// Source: https://nuqs.dev/
'use client'
import { useQueryState, parseAsFloat, parseAsStringLiteral } from 'nuqs'
import { USD_DEFAULTS } from '@/lib/calculator/defaults'

export function CalculatorPage() {
  const [debitAccounts, setDebitAccounts] = useQueryState(
    'da', parseAsFloat.withDefault(USD_DEFAULTS.debitAccounts)
  )
  const [year1Adoption, setYear1Adoption] = useQueryState(
    'y1a', parseAsFloat.withDefault(USD_DEFAULTS.year1AdoptionRate)
  )
  const [region, setRegion] = useQueryState(
    'region',
    parseAsStringLiteral(['USD', 'GBP', 'EUR'] as const).withDefault('USD')
  )
  // ...all inputs bound to URL
}
```

### Recharts Bar Chart

```typescript
// Source: recharts.org — recharts 3.7.0
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export function SavingsBarChart({ yr1Total, ongoingTotal, currencySymbol }: {
  yr1Total: number
  ongoingTotal: number
  currencySymbol: string
}) {
  const data = [
    { name: 'Year 1', savings: yr1Total },
    { name: 'Ongoing', savings: ongoingTotal },
  ]
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(v) => `${currencySymbol}${(v / 1_000_000).toFixed(1)}M`} />
        <Tooltip formatter={(v: number) => `${currencySymbol}${v.toLocaleString()}`} />
        <Bar dataKey="savings" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

### jsPDF — Dynamic Import Pattern

```typescript
// Source: jsPDF docs + Next.js dynamic import pattern
'use client'
import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculator/types'

export async function downloadPDF(inputs: CalculatorInputs, outputs: CalculatorOutputs, currencySymbol: string) {
  const { jsPDF } = await import('jspdf')  // dynamic — avoids window access at module scope
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  doc.setFontSize(20)
  doc.text('SafeCypher Value Calculator Report', 20, 20)
  doc.setFontSize(12)
  doc.text(`Year 1 Net Savings: ${currencySymbol}${outputs.totalYr1Savings.toLocaleString()}`, 20, 40)
  doc.text(`Breakeven: ${outputs.breakevenDays?.toFixed(0) ?? 'N/A'} days`, 20, 50)

  doc.save('safecypher-value-report.pdf')
}
```

### Attio calculator_run — Server Action Pattern

```typescript
// Using Server Action avoids exposing INTERNAL_API_SECRET to client
'use server'
import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculator/types'

export async function fireCalculatorRunEvent(
  inputs: CalculatorInputs,
  outputs: CalculatorOutputs,
  userEmail?: string
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/attio/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-token': process.env.INTERNAL_API_SECRET ?? '',
    },
    body: JSON.stringify({ event: 'calculator_run', email: userEmail, inputs, outputs }),
  })
  if (!res.ok) console.error('[Attio] calculator_run failed', res.status)
}
```

---

## Existing Code Integration Points

### What Exists (Do Not Rebuild)

| Existing Item | Location | Phase 7 Use |
|--------------|----------|-------------|
| Portal route group | `src/app/(portal)/` | Replace stub layout + page with full shell |
| Portal layout | `src/app/(portal)/layout.tsx` | Replace passthrough with portal shell + NuqsAdapter |
| Portal page | `src/app/(portal)/portal/page.tsx` | Replace placeholder with dashboard |
| Attio event route | `src/app/api/attio/event/route.ts` | Extend type; add `if (body.name)` guard before person upsert |
| DemoFormSection teaser placeholder | `src/components/marketing/home/DemoFormSection.tsx` lines 178-189 | Replace link-only placeholder with functional HomepageTeaserWidget |
| DaisyUI + Tailwind v4 | `src/styles/theme.css` | Portal shell uses same tokens; no new theme |
| UI primitives (Input, Button, Card) | `src/components/ui/` | Reused in portal; new InputSlider is net new |

### What Needs Creating (Net New)

1. `src/middleware.ts` — root-level Next.js middleware (does not exist; portal is currently unprotected)
2. `src/lib/supabase/client.ts` — `createBrowserClient` wrapper
3. `src/lib/supabase/server.ts` — `createServerClient` wrapper
4. `src/lib/supabase/middleware.ts` — `updateSession` helper
5. `src/lib/calculator/types.ts` — TypeScript interfaces
6. `src/lib/calculator/defaults.ts` — USD defaults, portfolio split ratio, region config
7. `src/lib/calculator/engine.ts` — pure `calculate()` function
8. `src/app/(portal)/portal/login/page.tsx` — magic link request form
9. `src/app/(portal)/portal/auth/callback/route.ts` — PKCE callback handler
10. `src/app/(portal)/portal/calculator/page.tsx` — calculator page
11. `src/app/(portal)/portal/demo/page.tsx` — agentic demo iframe
12. `src/components/portal/` — `PortalSidebar`, `PortalShell`, and all calculator components
13. `src/components/portal/HomepageTeaserWidget.tsx` — teaser form for homepage

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@supabase/auth-helpers-nextjs` | `@supabase/ssr` | 2024 — auth-helpers deprecated | Must use `@supabase/ssr`; auth-helpers is archived |
| `supabase.auth.getSession()` in server code | `supabase.auth.getUser()` | Supabase security update 2024 | getSession is not safe for server-side auth checks |
| Cookie `get/set/remove` methods in SSR client | `getAll/setAll` only | @supabase/ssr v0.5+ | Older examples with individual cookie methods are wrong |
| recharts 2.x (no React 19 support) | recharts 3.x | 2025 | v3.7.0 officially supports React 19; v2.x required workarounds |
| Legacy anon key `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | 2025 transition | Both work; new projects use publishable key |

**Deprecated/outdated:**
- `@supabase/auth-helpers-nextjs`: Archived, replaced by `@supabase/ssr`
- `supabase.auth.getSession()` in middleware: Do not use — security vulnerability
- Cookie `get/set/remove` in `createServerClient`: Use `getAll/setAll` only

---

## Open Questions

1. **GBP and EUR regional default values — DEFINITIVE ANSWER**
   - What we know: The spreadsheet has one sheet only. "Regions" at D1 is a Microsoft Office add-in label. There are NO GBP or EUR numeric defaults in the file. This is confirmed.
   - Recommendation: Implement region selector as currency symbol + locale change only. Use USD defaults for all three regions. Add a comment in `defaults.ts` noting GBP/EUR numeric defaults are pending client confirmation.

2. **INTERNAL_API_SECRET for Attio debounce — RESOLVED**
   - Recommendation: Use a Next.js Server Action (`'use server'`) for the Attio `calculator_run` call. The Server Action adds the header server-side, keeping the secret off the client entirely. Pattern documented in Code Examples above.

3. **Supabase project creation prerequisite**
   - What we know: No Supabase project exists yet for this codebase (no `NEXT_PUBLIC_SUPABASE_URL` in env)
   - Recommendation: Wave 0 of the plan should note that the Supabase project must be created and `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` added to Netlify environment before any auth code can be tested. This is a manual setup step, not a code task.

4. **Portal login UX — resend link button**
   - Recommendation: Show "Check your email" state with a resend button (60-second cooldown using `useState` + `useEffect` countdown). Standard UX for magic links.

---

## Sources

### Primary (HIGH confidence)
- Direct extraction from spreadsheet file `20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx` via Python zipfile + XML parsing — all formula cell references and computed values extracted and independently verified
- https://supabase.com/docs/guides/auth/server-side/nextjs — middleware pattern, `getUser()` security guidance, `getAll/setAll` cookie API
- https://supabase.com/docs/guides/auth/auth-email-passwordless — `signInWithOtp`, magic link flow, PKCE token exchange
- `src/app/api/attio/event/route.ts` — direct code inspection confirming `body.name.split(' ')` guard is needed

### Secondary (MEDIUM confidence)
- https://nuqs.dev/ — nuqs API, NuqsAdapter placement, useQueryState pattern
- recharts@3.7.0 peerDependencies — `"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"` — React 19 support confirmed
- npm package inspection via `npm show` — version numbers for @supabase/supabase-js, @supabase/ssr, recharts, nuqs, jspdf

### Tertiary (LOW confidence)
- 70/30 debit/credit portfolio split default — heuristic estimate; client should confirm or accept as reasonable
- GBP/EUR defaults — explicitly confirmed absent from spreadsheet; pending client input

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all library versions verified via npm; peer deps confirm React 19 compatibility
- Formula engine: HIGH — every formula extracted from cell XML, computed values verified in Python against spreadsheet output
- Regional defaults: CONFIRMED ABSENT — spreadsheet has USD only; GBP/EUR currency display is cosmetic only
- Architecture: HIGH — Supabase patterns from official docs; existing code inspected directly
- Pitfalls: HIGH — several verified from official Supabase security docs and direct code inspection of existing Attio route

**Research date:** 2026-02-27
**Valid until:** 2026-03-27 (Supabase API is stable; nuqs/recharts versions are recent; spreadsheet formulas are static)
