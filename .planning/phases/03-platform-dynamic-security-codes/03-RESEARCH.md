# Phase 3: Platform + Dynamic Security Codes - Research

**Researched:** 2026-02-20
**Domain:** Next.js App Router marketing pages — multi-section product pages, architecture diagrams, step-card flows, comparison tables
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Architecture diagram placeholder**
- The placeholder communicates the "one API → seven products" relationship using labeled boxes with connector lines — not a blank spacer
- Two-tier layout: DSC and Safe Verify as primary/equal product nodes; remaining five as secondary nodes
- All seven products named and labeled:

| Product | Audience |
|---|---|
| Dynamic Security Codes | Transactions |
| Safe Verify | People |
| SafeAgent | Agents |
| SafePay (dCVV V2) | Commerce |
| E-Wallet Onboarding | Onboarding |
| Card Issuance Protection | Issuance |
| OTP Replacement | Authentication |

- DSC and Safe Verify appear at the same visual weight (co-primary); other five appear smaller or grouped beneath them

**How-it-works flow (DSC page)**
- Format: horizontal numbered cards (Steps 1–6), wraps to 2 rows on mobile
- Each step card includes: step number, short heading, 1–2 sentence description, and an actual app screenshot
- Six steps:
  1. Open banking app → navigate to your card account
  2. Go to "Manage card"
  3. Enable the "3-digit Dynamic CVV" toggle
  4. "Protect against card fraud" — explanation screen (fraud protection rationale)
  5. "How does it work?" — new CVV generated each time you shop online
  6. "Where to find it?" → CVV visible in app (rotating 3-digit code, e.g. 357)
- Real app screenshots used as visual anchors for each step (not illustrated icons)
- Audience: primary is issuers (B2B Heads of Fraud / Digital), but copy acknowledges the cardholder UX they'd be offering their customers

**Competitive framing (/platform page)**
- Tone: acknowledge existing tools, then show the gap — respectful, not attack copy
- Format: comparison table with rows for Tokenisation / 3DS / Behavioural Analytics / SafeCypher
- The gap SafeCypher owns: "Reduces fraud vs. eliminates it"
- Table columns: Approach / What it covers / What the gap is

**Page narrative + connection**
- `/platform` is the umbrella page; `/dynamic-security-codes` is the first product deep-dive
- `/platform` explicitly links to `/dynamic-security-codes` as the flagship example of the one-API model
- Opening argument on `/platform`: static credentials are the root cause of CNP fraud
- After the problem frame: SafeCypher's dynamic approach, then full product portfolio
- Product portfolio on `/platform`: show all seven products (full table or card grid)
- Both pages end with An Post proof metrics and demo/calculator CTAs

### Claude's Discretion

- Exact CSS layout for the comparison table
- Spacing and typography within step cards
- Error and loading states
- How the architecture diagram connector lines are rendered (SVG paths vs. CSS borders)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PLAT-01 | Problem frame section: fundamental issue with static credentials, single clear argument | Server Component section; established section pattern (`<section>` + max-w-7xl container + grid/prose layout); copy mirrors UrgencySection structure |
| PLAT-02 | SafeCypher approach section: dynamic time-limited credentials through existing banking app | Server Component section; feature highlight layout with icon + copy cards; links to `/dynamic-security-codes` as flagship example |
| PLAT-03 | Architecture diagram placeholder: one core API → seven products across three audiences | Pure HTML/CSS diagram with labeled boxes + connector lines (CSS borders or inline SVG); no external lib needed; two-tier layout per locked decision |
| PLAT-04 | Integration model section: processor-level, serving all downstream issuers; quantified incremental effort per additional product | Server Component; HTML table or card grid for seven products with effort data; standard DaisyUI table classes |
| PLAT-05 | Competitive context section: comparison table — Tokenisation / 3DS / Behavioural Analytics / SafeCypher | Server Component; DaisyUI table component (`.table`); three columns: Approach / What it covers / What the gap is |
| PLAT-06 | CTAs: "See the value for your portfolio" (→ calculator) and "Request a demo" | Reuse DemoFormSection or a CTA-only section with Link buttons; same Netlify form as homepage (no new form needed) |
| DSC-01 | Problem frame: static CVVs printed on card, never change, valid forever once exposed | Server Component section; same single-argument prose pattern as PLAT-01 and UrgencySection |
| DSC-02 | Solution section: dynamic time-sensitive code in cardholder's banking app, expires after single use | Server Component; feature explanation with visual emphasis; links back to platform for the full API story |
| DSC-03 | Visual how-it-works flow: six numbered step cards with app screenshots | Server Component (screenshot images are static); `<img>` or Next.js `<Image>` for screenshots; CSS grid wrapping to 2 rows on mobile; no Client Component needed unless mobile "tap to expand" is added (not in scope) |
| DSC-04 | Proof section: An Post metrics, Irish Fintech Award | Reuse ProofSection pattern verbatim or extract a shared component from home page implementation |
| DSC-05 | For issuers section: single API integration, no card reissuance, live in weeks, major processor compatibility | Server Component; feature list or card grid with key integration facts |
| DSC-06 | CTAs: calculator link + demo request | Link to `/portal/calculator` + link to demo form; same CTA pattern as PLAT-06 |
</phase_requirements>

---

## Summary

Phase 3 builds two new marketing pages — `/platform` and `/dynamic-security-codes` — inside the established Next.js App Router `(marketing)` route group. Both pages are purely Server Component compositions: no new Client Components are required because neither page needs browser APIs, animation, or form state. The demo form CTA can link to the homepage `#demo` anchor rather than embedding a new form instance, avoiding duplicate Netlify form registrations.

The most technically interesting element is the **architecture diagram** (PLAT-03). The locked decision specifies labeled boxes with connector lines — communicating the one-API → seven-products relationship. The discretion area is how connectors are rendered. The research recommendation is CSS-only with flexbox/grid and border lines (no SVG library), keeping the diagram a pure Server Component. An inline SVG `<path>` alternative is documented for when curved connectors are needed, but straight lines are sufficient for a placeholder and avoid JavaScript.

The **how-it-works step cards** (DSC-03) use real app screenshots as `<img>` elements. Next.js `<Image>` from `next/image` is the correct approach for `public/` assets — it provides automatic optimization, lazy loading, and prevents layout shift via `width`/`height` props. The screenshots should be placed in `public/screenshots/dsc/` and referenced with static paths. The six-card grid uses `grid-cols-2 md:grid-cols-3` to wrap to 2 rows on mobile and 2 rows of 3 on desktop.

The **comparison table** (PLAT-05) and **product portfolio table** (PLAT-04) use DaisyUI's `.table` component class — a verified v5-stable class. No custom table CSS needed. The comparison table's "What the gap is" column carries the positioning weight: SafeCypher's row says "Eliminates fraud — stolen credentials are worthless" vs. the other three rows saying variants of "Reduces probability."

**Primary recommendation:** Build both pages as pure Server Component compositions. Use `src/app/(marketing)/platform/page.tsx` and `src/app/(marketing)/dynamic-security-codes/page.tsx` as the route files. Mirror the home page's section-per-file component organization under `src/components/marketing/platform/` and `src/components/marketing/dsc/`. Reuse the ProofSection pattern for the An Post proof requirement on the DSC page.

---

## Standard Stack

### Core (all already installed — no new packages)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router routing, `<Image>` optimization | Already installed; `(marketing)` route group already configured |
| react | 19.2.3 | Server Component rendering | Already installed |
| daisyui | 5.5.18 | `.table`, `.badge`, `.btn`, `.card` classes | Already installed; table and badge classes are v5-stable |
| tailwindcss | 4.x | Layout utilities | Already installed |

### No New Dependencies

Phase 3 requires zero new npm packages. The architecture diagram is pure HTML/CSS. Screenshots are static assets served from `public/`. Tables use DaisyUI's built-in `.table` class. No diagram library, no animation library.

**Why no diagram library:** Libraries like Mermaid, React Flow, or D3 add significant JS payload for what is a static placeholder communicating a simple hierarchy. CSS flexbox with `border-l-2` connector lines (the same approach used in `OneIntegrationSection.tsx` already) is sufficient and renders on the server.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS borders for connectors | Inline SVG `<path>` elements | SVG paths allow curves and precise positioning but require viewBox math; CSS borders are simpler for straight vertical/horizontal connectors in a flex layout |
| CSS borders for connectors | Mermaid.js / React Flow | Libraries add 100KB+ JS, require Client Component, overkill for a static labeled-box placeholder |
| DaisyUI `.table` | Custom table HTML/CSS | DaisyUI table handles zebra striping, responsive overflow, and dark theme without custom CSS |
| Next.js `<Image>` | Plain `<img>` | `<Image>` provides lazy loading, automatic WebP conversion, prevents CLS; no config required for `public/` assets |

**Installation:** None required.

---

## Architecture Patterns

### Recommended File Structure for Phase 3

```
src/
├── app/
│   └── (marketing)/
│       ├── platform/
│       │   └── page.tsx                     # /platform route — Server Component
│       └── dynamic-security-codes/
│           └── page.tsx                     # /dynamic-security-codes route — Server Component
├── components/
│   └── marketing/
│       ├── platform/                        # /platform section components
│       │   ├── PlatformHeroSection.tsx      # Problem frame + headline
│       │   ├── ApproachSection.tsx          # SafeCypher dynamic approach
│       │   ├── ArchitectureDiagram.tsx      # One-API → seven-products diagram
│       │   ├── ProductPortfolioSection.tsx  # All 7 products table/grid
│       │   ├── CompetitiveSection.tsx       # Comparison table
│       │   └── PlatformCtaSection.tsx       # Calculator + demo CTAs
│       └── dsc/                             # /dynamic-security-codes section components
│           ├── DscHeroSection.tsx           # Problem frame (static CVVs)
│           ├── DscSolutionSection.tsx       # Dynamic code solution
│           ├── HowItWorksSection.tsx        # 6-step card flow with screenshots
│           ├── DscProofSection.tsx          # An Post metrics (reuses pattern)
│           ├── ForIssuersSection.tsx        # Integration facts for issuers
│           └── DscCtaSection.tsx            # Calculator + demo CTAs
└── public/
    └── screenshots/
        └── dsc/                             # App screenshot images for step cards
            ├── step-1-banking-app.png       # (or .jpg / .webp)
            ├── step-2-manage-card.png
            ├── step-3-toggle.png
            ├── step-4-fraud-protection.png
            ├── step-5-how-it-works.png
            └── step-6-find-cvv.png
```

### Pattern 1: New Marketing Page Route

**What:** A new page in the `(marketing)` route group inherits the Nav/Footer layout from `(marketing)/layout.tsx`. No layout changes required.

**When to use:** Any new marketing page (`/platform`, `/dynamic-security-codes`, `/safe-verify`, etc.).

```tsx
// Source: established pattern from src/app/(marketing)/page.tsx
// src/app/(marketing)/platform/page.tsx

import type { Metadata } from 'next'
import { PlatformHeroSection } from '@/components/marketing/platform/PlatformHeroSection'
import { ApproachSection } from '@/components/marketing/platform/ApproachSection'
import { ArchitectureDiagram } from '@/components/marketing/platform/ArchitectureDiagram'
import { ProductPortfolioSection } from '@/components/marketing/platform/ProductPortfolioSection'
import { CompetitiveSection } from '@/components/marketing/platform/CompetitiveSection'
import { PlatformCtaSection } from '@/components/marketing/platform/PlatformCtaSection'

export const metadata: Metadata = {
  title: 'Platform Overview — SafeCypher',
  description: 'One API integration. Seven fraud-prevention products. Built on dynamic credentials that make stolen card data worthless.',
}

export default function PlatformPage() {
  return (
    <>
      <PlatformHeroSection />
      <ApproachSection />
      <ArchitectureDiagram />
      <ProductPortfolioSection />
      <CompetitiveSection />
      <PlatformCtaSection />
    </>
  )
}
```

### Pattern 2: Architecture Diagram — CSS-only Two-Tier Layout

**What:** A pure HTML/CSS component communicating the "one API → seven products" hierarchy. Top node (Issuer/Card Processor) connects down to the SafeCypher API node, which fans out to product nodes in two tiers: DSC and Safe Verify as co-primary (larger), five others as secondary (smaller or grouped).

**When to use:** PLAT-03 — architecture diagram placeholder.

**Rendering approach for connectors:** CSS borders matching the existing `OneIntegrationSection.tsx` pattern (`border-l-2 border-accent`). For the fan-out from SafeCypher API to seven products, use a horizontal flex row with each product node having a `border-t` top connector. The visual result is a T-shape connector — clean and readable at placeholder fidelity.

```tsx
// src/components/marketing/platform/ArchitectureDiagram.tsx
// Pure Server Component — no 'use client'

export function ArchitectureDiagram() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            One Integration
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-base-content">
            One API. Seven products.
          </h2>
        </div>

        <div className="flex flex-col items-center gap-0">

          {/* Top: Card Issuer */}
          <div className="bg-base-300 rounded-lg px-6 py-3 text-sm font-mono text-base-content/60 border border-base-300">
            Your Card Issuer / Processor
          </div>

          {/* Connector down */}
          <div className="border-l-2 border-accent h-8" />

          {/* Middle: SafeCypher API */}
          <div className="bg-accent/20 border-2 border-accent rounded-lg px-8 py-4 text-sm font-mono text-accent font-bold">
            SafeCypher Core API
          </div>

          {/* Connector down */}
          <div className="border-l-2 border-accent h-8" />

          {/* Primary tier: DSC + Safe Verify */}
          <div className="flex gap-6 mb-0">
            <div className="flex flex-col items-center">
              <div className="border-t-2 border-accent w-full mb-0 invisible" /> {/* spacer for alignment */}
              <div className="bg-primary/20 border border-primary rounded-lg px-5 py-3 text-sm font-semibold text-primary text-center min-w-[10rem]">
                Dynamic Security Codes
                <p className="text-xs font-normal text-primary/60 mt-0.5">Transactions</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 border border-primary rounded-lg px-5 py-3 text-sm font-semibold text-primary text-center min-w-[10rem]">
                Safe Verify
                <p className="text-xs font-normal text-primary/60 mt-0.5">People</p>
              </div>
            </div>
          </div>

          {/* Connector down to secondary tier */}
          <div className="border-l-2 border-base-300 h-6" />

          {/* Secondary tier: five remaining products */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'SafeAgent', audience: 'Agents' },
              { name: 'SafePay (dCVV V2)', audience: 'Commerce' },
              { name: 'E-Wallet Onboarding', audience: 'Onboarding' },
              { name: 'Card Issuance Protection', audience: 'Issuance' },
              { name: 'OTP Replacement', audience: 'Authentication' },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-base-300 rounded-lg px-4 py-2 text-xs font-mono text-base-content/60 text-center border border-base-300"
              >
                {product.name}
                <p className="text-base-content/40 mt-0.5">{product.audience}</p>
              </div>
            ))}
          </div>

        </div>

        <p className="text-xs text-base-content/30 text-center mt-8">
          Architecture diagram — integration detail available on request
        </p>
      </div>
    </section>
  )
}
```

**Note on connector lines:** The fan-out from SafeCypher API to seven product nodes is the hardest visual problem. The approach above uses stacked blocks with visual grouping. If the client requires explicit branch lines connecting the API node to each product, use an inline `<svg>` with `<line>` elements. The SVG `viewBox` can be set to `0 0 800 200` with the API node centered at x=400, and each product node's center x computed from its column position. This is a LOW confidence "do it by eye" approach — document it as requiring manual visual QA.

### Pattern 3: How-It-Works Six-Step Card Grid

**What:** Six cards in a CSS grid that wraps to 2 rows on mobile (2 columns) and 2 rows of 3 on desktop. Each card has: step number, heading, 1–2 sentence description, and a screenshot image.

**When to use:** DSC-03 how-it-works flow.

**Image handling:** Screenshots go in `public/screenshots/dsc/`. Use Next.js `<Image>` with explicit `width` and `height` to prevent layout shift. If the exact pixel dimensions aren't known at build time, use `fill` with a fixed-height parent container instead.

```tsx
// src/components/marketing/dsc/HowItWorksSection.tsx
// Pure Server Component — screenshots are static assets, no interactivity needed

import Image from 'next/image'

const steps = [
  {
    number: 1,
    heading: 'Open your banking app',
    description: 'Navigate to your card account in your issuer\'s mobile banking app.',
    screenshot: '/screenshots/dsc/step-1-banking-app.png',
    alt: 'Banking app card account screen',
  },
  {
    number: 2,
    heading: 'Go to Manage card',
    description: 'Find the card management section to access security settings.',
    screenshot: '/screenshots/dsc/step-2-manage-card.png',
    alt: 'Manage card settings screen',
  },
  {
    number: 3,
    heading: 'Enable Dynamic CVV',
    description: 'Toggle on "3-digit Dynamic CVV" to activate the protection.',
    screenshot: '/screenshots/dsc/step-3-toggle.png',
    alt: 'Dynamic CVV toggle enabled',
  },
  {
    number: 4,
    heading: 'Protect against card fraud',
    description: 'Your app explains how dynamic codes eliminate CNP fraud at the source.',
    screenshot: '/screenshots/dsc/step-4-fraud-protection.png',
    alt: 'Fraud protection explanation screen',
  },
  {
    number: 5,
    heading: 'New CVV every transaction',
    description: 'A fresh security code is generated each time you shop online.',
    screenshot: '/screenshots/dsc/step-5-how-it-works.png',
    alt: 'How it works explanation screen',
  },
  {
    number: 6,
    heading: 'Find your code in the app',
    description: 'Your dynamic CVV is always visible in the app — ready for your next purchase.',
    screenshot: '/screenshots/dsc/step-6-find-cvv.png',
    alt: 'CVV code 357 displayed in app',
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            The Cardholder Experience
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            How it works
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            Six taps. Full protection. No friction for genuine cardholders.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="card bg-base-200 rounded-xl overflow-hidden">
              {/* Screenshot */}
              <div className="relative bg-base-300 aspect-[9/16] overflow-hidden">
                <Image
                  src={step.screenshot}
                  alt={step.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              {/* Copy */}
              <div className="p-5">
                <span className="text-xs font-bold text-accent uppercase tracking-widest">
                  Step {step.number}
                </span>
                <h3 className="text-base font-semibold text-base-content mt-1">
                  {step.heading}
                </h3>
                <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 4: Comparison Table (DaisyUI `.table`)

**What:** A DaisyUI table component rendering the competitive comparison. Three columns, four rows. The last row (SafeCypher) is visually differentiated.

**When to use:** PLAT-05 competitive context.

```tsx
// src/components/marketing/platform/CompetitiveSection.tsx
// Pure Server Component

const competitors = [
  {
    approach: 'Tokenisation',
    covers: 'Replaces PAN with a token for a specific merchant/device',
    gap: 'Token is still static for the session — re-usable if intercepted',
  },
  {
    approach: '3D Secure (3DS)',
    covers: 'Adds an authentication step at checkout',
    gap: 'Relies on static credentials passing the challenge — friction, not prevention',
  },
  {
    approach: 'Behavioural Analytics',
    covers: 'Flags anomalous transaction patterns after the fact',
    gap: 'Detects fraud probability — does not make credentials worthless',
  },
  {
    approach: 'SafeCypher',
    covers: 'Issues a new dynamic credential per transaction via the banking app',
    gap: 'Eliminates CNP fraud — stolen credentials expire before they can be used',
    isSafeCypher: true,
  },
]

export function CompetitiveSection() {
  return (
    <section className="bg-neutral border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            The Honest Comparison
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-content">
            Existing tools reduce fraud. SafeCypher eliminates it.
          </h2>
          <p className="text-neutral-content/60 mt-4 max-w-2xl mx-auto">
            Tokenisation, 3DS, and behavioural analytics are all legitimate tools.
            None of them make stolen credentials worthless. SafeCypher does.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-300 text-base-content/60 text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Approach</th>
                <th className="py-4 px-6">What it covers</th>
                <th className="py-4 px-6">What the gap is</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((row) => (
                <tr
                  key={row.approach}
                  className={row.isSafeCypher ? 'bg-primary/10 border-t-2 border-primary' : ''}
                >
                  <td className="py-4 px-6 font-semibold text-base-content whitespace-nowrap">
                    {row.approach}
                    {row.isSafeCypher && (
                      <span className="ml-2 badge badge-primary badge-sm">You are here</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-base-content/70 text-sm">{row.covers}</td>
                  <td className={`py-4 px-6 text-sm font-medium ${row.isSafeCypher ? 'text-primary' : 'text-base-content/60'}`}>
                    {row.gap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
```

### Pattern 5: Product Portfolio Table/Grid (PLAT-04)

**What:** All seven products shown with audience, what it does, and incremental integration effort. Can render as a DaisyUI table or as a card grid. The table format is more information-dense and appropriate for a B2B audience scanning product scope.

**When to use:** PLAT-04 product portfolio section.

```tsx
// src/components/marketing/platform/ProductPortfolioSection.tsx

const products = [
  { name: 'Dynamic Security Codes', audience: 'Transactions', description: 'Time-limited CVV in banking app eliminates CNP fraud', effort: 'Core integration', href: '/dynamic-security-codes' },
  { name: 'Safe Verify', audience: 'People', description: 'Phone channel authentication for call centres', effort: 'Incremental — 1 endpoint', href: '/safe-verify' },
  { name: 'SafeAgent', audience: 'Agents', description: 'Authenticates AI agents initiating card transactions', effort: 'Incremental — 1 endpoint', href: null },
  { name: 'SafePay (dCVV V2)', audience: 'Commerce', description: 'Dynamic CVV for e-commerce checkout flows', effort: 'Incremental — 1 endpoint', href: null },
  { name: 'E-Wallet Onboarding', audience: 'Onboarding', description: 'Secure digital wallet provisioning', effort: 'Incremental — 1 endpoint', href: null },
  { name: 'Card Issuance Protection', audience: 'Issuance', description: 'Protects credentials at the point of card issuance', effort: 'Incremental — 1 endpoint', href: null },
  { name: 'OTP Replacement', audience: 'Authentication', description: 'Replaces SMS OTP with dynamic in-app codes', effort: 'Incremental — 1 endpoint', href: null },
]
```

### Pattern 6: CTA Section (Reusable for Both Pages)

**What:** Both `/platform` and `/dynamic-security-codes` end with the same two CTAs: calculator deep-link + demo request. This can be a shared component or duplicate sections (acceptable given the small scope). Recommend a shared component `src/components/marketing/shared/PageCtaSection.tsx` to avoid drift.

```tsx
// src/components/marketing/shared/PageCtaSection.tsx
import Link from 'next/link'

export function PageCtaSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
          Ready to eliminate CNP fraud?
        </h2>
        <p className="text-base-content/60 mt-4">
          See the financial impact for your portfolio, or talk to the team directly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/portal/calculator" className="btn btn-outline btn-accent btn-lg">
            See the value for your portfolio
          </Link>
          <Link href="/#demo" className="btn btn-primary btn-lg">
            Request a demo
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Note on demo CTA link:** Linking to `/#demo` sends users to the homepage demo form, avoiding duplication of the Netlify form registration. This is the clean approach unless the client specifically wants a standalone `/contact` page (not in phase scope).

### Pattern 7: Proof Section — Reuse vs. Extract

**What:** DSC-04 requires the An Post proof metrics and Irish Fintech Award. The homepage already has a `ProofSection` component.

**Options:**
1. Duplicate the component into `src/components/marketing/dsc/DscProofSection.tsx` (simple, no coupling)
2. Move `ProofSection` to `src/components/marketing/shared/ProofSection.tsx` and import from both pages

**Recommendation:** Move to `shared/` if both pages need it — this avoids two components drifting when metrics are updated. The planner should treat this as a single task: "Extract ProofSection to shared/ and import into DSC page."

### Anti-Patterns to Avoid

- **Making page.tsx a Client Component for the diagram:** The architecture diagram is pure static HTML/CSS. Mark `'use client'` only if interactive behavior is added (none planned).
- **Fetching screenshot images from an external URL:** App screenshots must be in `public/` for `<Image>` optimization. External URLs require `remotePatterns` config in `next.config.ts`.
- **Using `<img>` instead of `<Image>` for screenshots:** Without Next.js `<Image>`, no automatic lazy loading or format optimization; layout shift risk if dimensions not declared.
- **Using removed DaisyUI classes for the table:** DaisyUI v5 tables use `.table` and `.table-zebra`. The old `.table-compact` has been replaced by `.table-xs`, `.table-sm`, etc. Do not use `table-compact`.
- **Creating a new Netlify form for each page's CTA:** Link CTAs to `/#demo` (homepage form) to avoid registering multiple forms in Netlify. If a standalone form is needed, reuse the `public/__forms.html` approach with the same form name.
- **Screenshot images without width/height causing CLS:** When using Next.js `<Image>` with `fill`, always set a fixed-height parent with `relative` positioning. Without this, the image area collapses to zero.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Comparison table styling | Custom CSS table | DaisyUI `.table .table-zebra` | Handles dark theme, responsive overflow, row striping automatically |
| Screenshot image optimization | `<img>` with manual CSS | `next/image` `<Image>` | Automatic WebP, lazy loading, CLS prevention |
| Architecture diagram | React Flow / Mermaid | CSS flexbox + borders | No JS needed for a static placeholder; matches existing `OneIntegrationSection` pattern |
| Product portfolio data | Hardcoded JSX per product | Data array + `.map()` | Seven products — a data array keeps the JSX clean and the data updatable in one place |
| Page metadata | None / hardcoded title | Next.js `export const metadata` | App Router's metadata API is the correct pattern; sets `<title>` and `<meta description>` without `<Head>` |

**Key insight:** Phase 3 is content-heavy, not technically complex. The risk is over-engineering visuals (reaching for diagram libraries, animation) when the actual requirement is labeled boxes and tables. Resist that impulse.

---

## Common Pitfalls

### Pitfall 1: Next.js `<Image>` for Local Public Assets — Missing Config

**What goes wrong:** `<Image src="/screenshots/dsc/step-1.png" fill ...>` renders a broken image or throws an error.

**Why it happens:** Using `fill` without a positioned parent, or the `sizes` prop being absent (triggers a Next.js warning).

**How to avoid:**
- Parent must have `className="relative"` and a defined height (or `aspect-ratio`)
- Always provide `sizes` prop: `sizes="(max-width: 768px) 50vw, 33vw"`
- Local `public/` assets do NOT need `remotePatterns` config — only external URLs do

**Warning signs:** Image area is 0px tall; Next.js console warning about missing `sizes` prop.

### Pitfall 2: DaisyUI v5 Table Class Names

**What goes wrong:** Table renders without striping or styling despite using DaisyUI classes.

**Why it happens:** Using old class names from DaisyUI v4.

**How to avoid:**
- v5 correct: `.table` on `<table>`, `.table-zebra` for striping
- v5 correct: `.table-xs`, `.table-sm` for compact variants (not `.table-compact`)
- v5 correct: No `data-theme` attribute needed on individual tables

**Warning signs:** Table looks like unstyled HTML; `table-compact` class has no effect.

### Pitfall 3: `/#demo` Link Scrolling Behavior from Another Page

**What goes wrong:** Clicking "Request a demo" from `/platform` navigates to `/` but doesn't scroll to `#demo`.

**Why it happens:** Cross-page hash navigation works via URL — browser navigates to `/` then scrolls to `#demo`. This works if `html { scroll-behavior: smooth; }` is set (already in `globals.css`) and the section has `id="demo"` (already present in `DemoFormSection`).

**How to avoid:** No fix needed — this works in Next.js App Router. Verify that `DemoFormSection` keeps `id="demo"` on its `<section>` element.

**Warning signs:** Browser navigates to homepage but stays at the top; check that the `id` attribute is on the section, not an inner div.

### Pitfall 4: Screenshot Files Not in `public/` Before Build

**What goes wrong:** `<Image>` renders broken image in production; local dev may work if images are added post-build.

**Why it happens:** `public/` assets must exist at build time for correct static serving.

**How to avoid:** The planner should create a task specifically to copy/rename actual app screenshots into `public/screenshots/dsc/` before building the HowItWorksSection. If screenshots are not yet available, use a placeholder `<div>` with explicit dimensions and a "Screenshot pending" label — do not use `<Image>` pointing to a non-existent file.

**Warning signs:** Console `404` for screenshot paths; broken image icons in the step cards.

### Pitfall 5: Architecture Diagram Connector Lines Breaking at Narrow Viewports

**What goes wrong:** The CSS-border connector lines (vertical `border-l-2`) don't align with their target nodes on mobile.

**Why it happens:** Flex layout shifts at breakpoints; fixed-width connectors don't track the node centers.

**How to avoid:** Keep the diagram's horizontal product node row as `flex-wrap` and hide connector lines on mobile (`hidden md:block` on connector `<div>`s). On mobile, show the product list in a simple stacked format without connectors.

**Warning signs:** Connector lines float left/center independently of product boxes on narrow screens.

### Pitfall 6: Both Pages Missing `export const metadata`

**What goes wrong:** Both new pages show the global default title "SafeCypher — Eliminate Card-Not-Present Fraud" in the browser tab.

**Why it happens:** Forgetting to export `metadata` from the new `page.tsx` files.

**How to avoid:** Every `page.tsx` should export a `metadata` object with `title` and `description`. The App Router picks this up automatically.

```tsx
// Correct pattern — put at the top of each page.tsx
export const metadata: Metadata = {
  title: 'Dynamic Security Codes — SafeCypher',
  description: 'Time-limited CVV codes that make stolen card credentials worthless.',
}
```

**Warning signs:** Browser tab shows generic title; search engine preview shows homepage description.

---

## Code Examples

Verified patterns from official sources and existing codebase:

### Next.js `<Image>` with `fill` and fixed-height parent

```tsx
// Source: https://nextjs.org/docs/app/api-reference/components/image#fill
// For screenshots with unknown exact dimensions

<div className="relative aspect-[9/16] overflow-hidden rounded-t-xl bg-base-300">
  <Image
    src="/screenshots/dsc/step-1-banking-app.png"
    alt="Banking app card account screen"
    fill
    className="object-cover object-top"
    sizes="(max-width: 768px) 50vw, 33vw"
  />
</div>
```

### Next.js App Router page-level metadata

```tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform Overview — SafeCypher',
  description: 'One API integration. Seven fraud-prevention products.',
}

export default function PlatformPage() {
  return <>{/* sections */}</>
}
```

### DaisyUI v5 Table (verified stable class names)

```tsx
// Source: https://daisyui.com/components/table/
<div className="overflow-x-auto rounded-xl border border-base-300">
  <table className="table table-zebra w-full">
    <thead>
      <tr>
        <th>Approach</th>
        <th>What it covers</th>
        <th>What the gap is</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tokenisation</td>
        <td>Replaces PAN with a token</td>
        <td>Token is still static for the session</td>
      </tr>
    </tbody>
  </table>
</div>
```

### CSS-border architecture connector (from existing codebase)

```tsx
// Source: src/components/marketing/home/OneIntegrationSection.tsx (established pattern)
// Vertical connector: a div with only a left border and fixed height

<div className="border-l-2 border-accent h-8 my-1" />

// Horizontal spread for product nodes: flex row, each node gets a top border
<div className="flex gap-4">
  {products.map(p => (
    <div key={p.name} className="border-t-2 border-accent pt-2 text-center">
      {p.name}
    </div>
  ))}
</div>
```

### Section container (established codebase pattern)

```tsx
// Source: all existing section components
<section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/head` `<Head>` for page titles | `export const metadata` from `page.tsx` | Next.js 13 App Router | No `<Head>` component; metadata object is the correct API |
| Pages Router `getStaticProps` for static content | Server Components render static content directly | Next.js 13 App Router | Static marketing content needs no data fetching at all — just JSX |
| `table-compact` (DaisyUI v4) | `table-xs` or `table-sm` (DaisyUI v5) | DaisyUI v5 (2025) | Old class has no effect in v5 |
| External icon libraries (Heroicons package) | Inline SVG | Phase 1 decision (locked) | No CDN dependency; SSR-safe |

**Deprecated/outdated in this codebase:**
- `table-compact`: Use `table-xs` or `table-sm` in DaisyUI v5
- `next/head` and `<Head>`: Do not use in App Router pages — use `export const metadata`

---

## Open Questions

1. **App screenshots — file format and availability**
   - What we know: Context mentions "8 screens" of app screenshots exist as source material (banking app home → account → manage card → Dynamic CVV toggle → fraud protection screen → how it works screen → where to find it → CVV displayed)
   - What's unclear: Whether these screenshots are already in the repo's `public/` directory, or need to be provided by the client / development team; what file format they're in (PNG, JPEG, WebP)
   - Recommendation: Planner must include an explicit task: "Place app screenshots in `public/screenshots/dsc/` with the filenames expected by HowItWorksSection". If screenshots are not yet available, implement placeholder `<div>` blocks with `bg-base-300` and a "Screenshot pending" label so the page builds without errors.

2. **Architecture diagram connector visual fidelity**
   - What we know: The locked decision says "labeled boxes with connector lines" — not blank spacer. Claude has discretion over SVG paths vs. CSS borders.
   - What's unclear: Whether the client will request curved/branching connectors (which require SVG) vs. straight vertical/horizontal lines (which CSS handles cleanly)
   - Recommendation: Build with CSS borders first (matches existing `OneIntegrationSection` pattern). If curved connectors are requested, the inline SVG `<path>` approach is well-documented and doesn't require a library. Document the upgrade path in the PLAN.

3. **Product portfolio data — "incremental effort" numbers**
   - What we know: Context mentions "quantified incremental effort per additional product" (PLAT-04) and "live in weeks" for DSC
   - What's unclear: Whether specific effort figures (e.g., "2 days", "1 sprint") are available or should be left as copy placeholders
   - Recommendation: Implement the table structure with placeholder copy ("Incremental — 1 additional endpoint"). The exact figures are content, not code — leave them as clearly marked placeholder text for the client to fill in.

4. **Navigation — DSC and Platform pages already in Nav**
   - What we know: `Nav.tsx` already has `href: '/platform'` and `href: '/dynamic-security-codes'` in `platformLinks`
   - What's unclear: Nothing — the nav is already wired. No nav changes needed in Phase 3.
   - Recommendation: Confirm in the verification step that clicking the nav links reaches the new pages (routes exist).

5. **Shared ProofSection — move or duplicate**
   - What we know: `ProofSection` lives at `src/components/marketing/home/ProofSection.tsx`; DSC-04 needs the same An Post metrics on the DSC page
   - What's unclear: Whether the client wants the exact same proof block or a variant with different emphasis
   - Recommendation: Duplicate to `src/components/marketing/dsc/DscProofSection.tsx` for Phase 3 simplicity. If Phase 4+ requires a third usage, extract to `shared/` at that point. Premature abstraction for 2 usages adds coupling without clear benefit.

---

## Sources

### Primary (HIGH confidence)

- Existing codebase — `src/components/marketing/home/OneIntegrationSection.tsx`: CSS-border connector line pattern confirmed; established approach for architecture diagram
- Existing codebase — `src/app/(marketing)/page.tsx` + `(marketing)/layout.tsx`: Route group pattern; how new pages inherit Nav/Footer
- Existing codebase — `package.json`: Confirmed versions — next 16.1.6, react 19.2.3, daisyui 5.5.18, tailwindcss 4.x
- Existing codebase — `.planning/phases/02-homepage/02-RESEARCH.md`: DaisyUI v5 table classes confirmed stable; image handling patterns; section container pattern
- https://nextjs.org/docs/app/api-reference/components/image — Next.js `<Image>` with `fill`, `sizes`, local public assets
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata — `export const metadata` page-level API
- https://daisyui.com/components/table/ — v5 `.table`, `.table-zebra`, `.table-xs`/`.table-sm` (not `.table-compact`)

### Secondary (MEDIUM confidence)

- DaisyUI v5 upgrade guide — table class changes (`table-compact` → `table-xs`/`table-sm`) confirmed in Phase 2 research
- Next.js App Router docs — hash navigation `/#demo` cross-page behavior; confirmed to work with CSS `scroll-behavior: smooth`

### Tertiary (LOW confidence)

- None — all critical findings verified via existing codebase or official docs.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; all existing dependencies verified in package.json
- Route structure: HIGH — established (marketing) route group pattern confirmed in codebase
- Architecture diagram approach: MEDIUM — CSS-border approach verified via existing OneIntegrationSection; visual fidelity at mobile breakpoints requires manual QA
- Screenshot handling: HIGH — Next.js `<Image>` with `fill` verified via official docs; pattern is standard
- DaisyUI table classes: HIGH — confirmed v5 stable class names via prior research
- Comparison table content: HIGH — column structure and positioning copy derived directly from CONTEXT.md locked decisions
- Connector line fan-out visual: LOW — complex seven-way fan-out from one node is harder to implement cleanly with CSS alone; may need inline SVG or layout adjustment

**Research date:** 2026-02-20
**Valid until:** 2026-03-20 (30 days — stable ecosystem; no fast-moving dependencies)
