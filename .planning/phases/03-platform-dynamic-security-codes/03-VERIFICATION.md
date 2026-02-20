---
phase: 03-platform-dynamic-security-codes
verified: 2026-02-20T00:00:00Z
status: human_needed
score: 5/5 must-haves verified
human_verification:
  - test: "Navigate to /platform and read the page end-to-end"
    expected: "Seven sections render in order: problem frame -> approach -> architecture diagram -> portfolio table -> competitive table -> An Post proof -> CTA. Copy is coherent and argument flows naturally."
    why_human: "Section ordering and narrative coherence require visual inspection; cannot verify reading flow programmatically."
  - test: "Navigate to /dynamic-security-codes and scroll through all six sections"
    expected: "All six sections render in sequence with no layout breaks. HowItWorksSection shows six placeholder cards in a 2-column (mobile) / 3-column (desktop) grid — styled divs, no broken images."
    why_human: "Visual grid layout and responsive behaviour (2-col vs 3-col breakpoint) require browser inspection."
  - test: "On /platform, click 'Request a demo' in the CTA section"
    expected: "Browser navigates to the homepage and scrolls to the demo form section (id='demo')."
    why_human: "Cross-page hash scroll behaviour (/#demo anchor) requires live browser verification."
  - test: "On /dynamic-security-codes, click 'Request a demo'"
    expected: "Same /#demo scroll behaviour as above — both pages share the PageCtaSection component."
    why_human: "Same as above."
  - test: "On /platform, inspect the ArchitectureDiagram on a narrow viewport (< 640px)"
    expected: "Connector lines hidden (hidden sm:block applied). Product cards still visible stacked vertically. No broken layout."
    why_human: "Responsive degradation of the diagram requires browser resize to verify."
---

# Phase 3: Platform + Dynamic Security Codes Verification Report

**Phase Goal:** Prospects who want to understand the architecture or the flagship DSC product can navigate to fully-built pages that explain the one-API model and the dynamic CVV solution
**Verified:** 2026-02-20
**Status:** human_needed — all automated checks passed; five items require browser confirmation
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (from Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A visitor can navigate to /platform and read a coherent argument: static credentials are the root cause, SafeCypher's dynamic approach solves it, one integration unlocks seven products | VERIFIED | `src/app/(marketing)/platform/page.tsx` routes correctly; PlatformHeroSection (31 lines, three-paragraph argument), ApproachSection (88 lines, three feature cards), ProductPortfolioSection (116 lines, 7-row table) all substantive and wired |
| 2 | The architecture diagram placeholder renders on /platform | VERIFIED | `ArchitectureDiagram.tsx` (101 lines) renders all seven labeled product nodes in two-tier CSS layout; DSC and Safe Verify at `bg-primary/10 border-2 border-primary` (primary weight); five others at `bg-base-300` (secondary weight); footer note reads "Architecture diagram — integration detail available on request" |
| 3 | A visitor can navigate to /dynamic-security-codes and follow the six-step visual how-it-works flow | VERIFIED | `src/app/(marketing)/dynamic-security-codes/page.tsx` routes correctly; `HowItWorksSection.tsx` (95 lines) renders 6 step cards via `steps.map()` in `grid grid-cols-2 md:grid-cols-3` with placeholder div image areas and copy per step |
| 4 | Both pages surface An Post proof metrics and end with a calculator link and demo request CTA | VERIFIED | `PlatformProofSection.tsx` and `DscProofSection.tsx` both render 800,000+ / 18 months / Zero stats and Irish Fintech Award badge; both pages end with `PageCtaSection` (via `PlatformCtaSection` and `DscCtaSection` wrappers) containing `/portal/calculator` and `/#demo` links |
| 5 | Competitive context on /platform (vs tokenisation, 3DS, behavioural analytics) is present without being attack copy | VERIFIED | `CompetitiveSection.tsx` (81 lines) has all three named competitors in `competitors` array with gap column; SafeCypher row highlighted with `bg-primary/10` and "You are here" badge; section header reads "Existing tools reduce fraud. SafeCypher eliminates it." — framed as honest comparison, not attack copy; body copy explicitly describes tokenisation, 3DS, and behavioural analytics as "all legitimate tools" |

**Score:** 5/5 success criteria verified

---

## Required Artifacts

### Plan 03-01 Artifacts

| Artifact | min_lines | Actual | Status | Notes |
|----------|-----------|--------|--------|-------|
| `src/app/(marketing)/platform/page.tsx` | — | 28 lines | VERIFIED | Exports `metadata` and `default function PlatformPage`; imports all 7 sections |
| `src/components/marketing/platform/PlatformHeroSection.tsx` | 30 | 31 | VERIFIED | Eyebrow "The Root Cause", headline, three body paragraphs — substantive |
| `src/components/marketing/platform/ApproachSection.tsx` | 30 | 88 | VERIFIED | Three feature cards with inline SVGs, link to /dynamic-security-codes |
| `src/components/marketing/platform/ArchitectureDiagram.tsx` | 60 | 101 | VERIFIED | Two-tier diagram, all 7 products labeled, primary/secondary visual distinction |

### Plan 03-02 Artifacts

| Artifact | min_lines | Actual | Status | Notes |
|----------|-----------|--------|--------|-------|
| `src/components/marketing/platform/ProductPortfolioSection.tsx` | 60 | 116 | VERIFIED | DaisyUI table, 7-product data array, zebra striping, DSC and Safe Verify as links |
| `src/components/marketing/platform/CompetitiveSection.tsx` | 60 | 81 | VERIFIED | 4-row table, SafeCypher row highlighted, "Eliminates CNP fraud" in gap column |
| `src/components/marketing/platform/PlatformProofSection.tsx` | 60 | 101 | VERIFIED | Three stat blocks, An Post proof card with blockquote, Irish Fintech Award badge, link to /proof/an-post |
| `src/components/marketing/platform/PlatformCtaSection.tsx` | 20 | 5 | VERIFIED* | 5 lines — intentional wrapper delegating to `PageCtaSection` (24 lines). Plan explicitly prescribes this pattern. Content fully rendered via shared component. |
| `src/components/marketing/shared/PageCtaSection.tsx` | 20 | 24 | VERIFIED | /portal/calculator and /#demo CTAs; renders CTA content for both platform and DSC pages |

### Plan 03-03 Artifacts

| Artifact | min_lines | Actual | Status | Notes |
|----------|-----------|--------|--------|-------|
| `src/app/(marketing)/dynamic-security-codes/page.tsx` | — | 26 | VERIFIED | Exports `metadata` and `default function DscPage`; imports all 6 sections |
| `src/components/marketing/dsc/DscHeroSection.tsx` | 30 | 51 | VERIFIED | "Flagship Product" badge, eyebrow, headline "The CVV on your card never changes. That's the problem.", three body paragraphs |
| `src/components/marketing/dsc/DscSolutionSection.tsx` | 30 | 135 | VERIFIED | 4 feature cards with inline SVGs, cross-link to /platform |
| `src/components/marketing/dsc/HowItWorksSection.tsx` | 80 | 95 | VERIFIED | 6 step cards, `steps.map()`, placeholder divs with `aspect-[9/16]` — no broken images |

### Plan 03-04 Artifacts

| Artifact | min_lines | Actual | Status | Notes |
|----------|-----------|--------|--------|-------|
| `src/components/marketing/dsc/DscProofSection.tsx` | 60 | 107 | VERIFIED | An Post metrics, logo placeholder (#006229 green), blockquote, Irish Fintech Award badge, link to /proof/an-post |
| `src/components/marketing/dsc/ForIssuersSection.tsx` | 50 | 191 | VERIFIED | 4 integration fact cards (Single API endpoint, No card reissuance, Live in weeks, Major processor compatible), technical detail row with 4 checklist items |
| `src/components/marketing/dsc/DscCtaSection.tsx` | 10 | 5 | VERIFIED* | Same intentional wrapper pattern as PlatformCtaSection — delegates to PageCtaSection per plan spec |

---

## Key Link Verification

| From | To | Via | Status | Detail |
|------|----|-----|--------|--------|
| `platform/page.tsx` | `PlatformHeroSection.tsx` | named import | WIRED | `import { PlatformHeroSection }` found and rendered in JSX |
| `platform/page.tsx` | `ArchitectureDiagram.tsx` | named import | WIRED | `import { ArchitectureDiagram }` found and rendered in JSX |
| `ApproachSection.tsx` | `/dynamic-security-codes` | Next.js Link | WIRED | `href="/dynamic-security-codes"` in "See Dynamic Security Codes →" link on third feature card |
| `PlatformCtaSection.tsx` | `/portal/calculator` | via PageCtaSection | WIRED | Delegates to `PageCtaSection` which contains `href="/portal/calculator"` |
| `PlatformCtaSection.tsx` | `/#demo` | via PageCtaSection | WIRED | `PageCtaSection` contains `href="/#demo"` on "Request a demo" button |
| `ProductPortfolioSection.tsx` | `/dynamic-security-codes` | Next.js Link | WIRED | DSC product row renders `<Link href="/dynamic-security-codes">` |
| `PlatformProofSection.tsx` | `/proof/an-post` | Next.js Link | WIRED | `href="/proof/an-post"` on "Read the An Post case study" button |
| `dynamic-security-codes/page.tsx` | `HowItWorksSection.tsx` | named import | WIRED | `import { HowItWorksSection }` found and rendered in JSX |
| `DscSolutionSection.tsx` | `/platform` | Next.js Link | WIRED | `href="/platform"` in cross-link paragraph below feature cards |
| `HowItWorksSection.tsx` | placeholder div areas | div with `aspect-[9/16]` | WIRED | Pattern present 6 times via `steps.map()` — no Image component, no broken images |
| `DscCtaSection.tsx` | `PageCtaSection.tsx` | named import | WIRED | `import { PageCtaSection } from '@/components/marketing/shared/PageCtaSection'` |
| `DscProofSection.tsx` | `/proof/an-post` | Next.js Link | WIRED | `href="/proof/an-post"` on case study button |

All 12 key links: WIRED.

---

## Requirements Coverage

| Requirement | Plan | Description | Status | Evidence |
|-------------|------|-------------|--------|----------|
| PLAT-01 | 03-01 | Problem frame section: fundamental issue with static credentials, single clear argument | SATISFIED | `PlatformHeroSection.tsx` — eyebrow "The Root Cause", headline, three paragraphs establishing static credentials as the CNP fraud root cause |
| PLAT-02 | 03-01 | SafeCypher approach section: dynamic time-limited credentials through existing banking app | SATISFIED | `ApproachSection.tsx` — headline "A credential that expires before it can be used", body paragraph describes time-limited codes through banking app, three feature cards (Time-limited, App-native, One integration) |
| PLAT-03 | 03-01 | Architecture diagram placeholder: one core API → seven products across three audiences | SATISFIED | `ArchitectureDiagram.tsx` — "SafeCypher Core API" node, two primary products (DSC: Transactions, Safe Verify: People), five secondary products (SafeAgent: Agents, SafePay: Commerce, E-Wallet: Onboarding, Card Issuance: Issuance, OTP Replacement: Authentication) |
| PLAT-04 | 03-02 | Integration model section: processor-level, serving all downstream issuers; quantified incremental effort per additional product | SATISFIED | `ProductPortfolioSection.tsx` — seven-product table with "Integration effort" column showing "Core integration" for DSC and "Incremental — 1 endpoint" for remaining six products |
| PLAT-05 | 03-02 | Competitive context section (honest, not attack copy): how this differs from tokenisation, 3DS, behavioural analytics | SATISFIED | `CompetitiveSection.tsx` — four-row comparison table with Tokenisation, 3D Secure (3DS), Behavioural Analytics, SafeCypher; header frames competitors as "all legitimate tools"; SafeCypher gap reads "Eliminates CNP fraud — stolen credentials expire before they can be used" |
| PLAT-06 | 03-02 | CTAs: "See the value for your portfolio" (→ calculator) and "Request a demo" | SATISFIED | `PageCtaSection.tsx` via `PlatformCtaSection.tsx` — both links present with exact button text and correct hrefs |
| DSC-01 | 03-03 | Problem frame: static CVVs printed on card, never change, valid forever once exposed | SATISFIED | `DscHeroSection.tsx` — "Flagship Product" badge, headline "The CVV on your card never changes. That's the problem.", three paragraphs establishing static CVV as credential design failure |
| DSC-02 | 03-03 | Solution section: dynamic time-sensitive code in cardholder's banking app, expires after single use | SATISFIED | `DscSolutionSection.tsx` — headline "A CVV that expires. Every time.", body "fresh 3-digit Dynamic Security Code... valid for a single use, and expires in minutes", four feature cards (Single-use, App-native, No card reissuance, Invisible to genuine customers) |
| DSC-03 | 03-03 | Visual how-it-works flow: Open banking app → Tap card → Code generated → Enter at checkout → Validated in real time → Expires | SATISFIED | `HowItWorksSection.tsx` — six step cards: Open your banking app / Go to Manage card / Enable Dynamic CVV / Understand the protection / New code every transaction / Find your code in the app |
| DSC-04 | 03-04 | Proof section: An Post metrics, Irish Fintech Award | SATISFIED | `DscProofSection.tsx` — 800,000+, 18 months, Zero stat blocks; An Post proof card with brand-green "An Post" text, blockquote, Irish Fintech Award badge (star SVG + text) |
| DSC-05 | 03-04 | For issuers section: single API integration, no card reissuance, live in weeks, major processor compatibility | SATISFIED | `ForIssuersSection.tsx` — four integration fact cards matching all four items; technical detail row with four checklist items (REST API, processor-level, banking app, sandbox) |
| DSC-06 | 03-04 | CTAs: calculator link + demo request | SATISFIED | `PageCtaSection.tsx` via `DscCtaSection.tsx` — /portal/calculator and /#demo links present |

All 12 requirements: SATISFIED.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `dsc/HowItWorksSection.tsx` | 66 | `TODO: Replace with <Image src=...> once screenshots are placed in public/screenshots/dsc/` | Info | Intentional scaffolding per plan spec ("placeholder divs only (CRITICAL — prevents broken images)"). Screenshot directory `public/screenshots/dsc/.gitkeep` exists. Styled placeholder divs render correctly; no broken images. This is expected phase state, not incomplete implementation. |

No blocker or warning anti-patterns found. The single TODO is plan-specified scaffolding.

---

## Server Component Compliance

All 13 phase 3 components (platform/*, dsc/*, shared/PageCtaSection.tsx) are pure Server Components — no `'use client'` directives found in any file. This satisfies the locked Phase 1 decision.

---

## Layout Inheritance

Both routes are under `src/app/(marketing)/` and inherit `src/app/(marketing)/layout.tsx` which wraps all children with `<Nav />` and `<Footer />`. Nav and Footer verified as substantive from Phase 2. Both product pages correctly share the marketing layout.

---

## Human Verification Required

### 1. /platform narrative coherence

**Test:** Open /platform in a browser and read top-to-bottom.
**Expected:** The page makes a single coherent argument — static credentials are the root cause, SafeCypher's dynamic approach solves it at the credential layer, one API unlocks seven products. Each section flows naturally from the last.
**Why human:** Narrative argument quality and section-to-section flow cannot be assessed programmatically.

### 2. /dynamic-security-codes six-step grid layout

**Test:** Open /dynamic-security-codes on a mobile-width viewport (< 768px) and a desktop viewport.
**Expected:** HowItWorksSection renders 2 columns on mobile and 3 columns on desktop. All six placeholder cards visible with step numbers, headings, descriptions, and styled placeholder div image areas — no broken images at any viewport.
**Why human:** Responsive CSS grid breakpoint behaviour (grid-cols-2 vs md:grid-cols-3) requires browser resize.

### 3. /#demo cross-page scroll from both product pages

**Test:** Click "Request a demo" on /platform and on /dynamic-security-codes.
**Expected:** Both navigate to the homepage and smooth-scroll to the demo form section (id="demo" on DemoFormSection).
**Why human:** Cross-page hash anchor scroll requires live browser navigation to verify.

### 4. /platform ArchitectureDiagram mobile degradation

**Test:** Resize /platform to < 640px (below sm breakpoint).
**Expected:** Connector lines hidden (`hidden sm:block`), product cards remain visible in stacked layout — diagram degrades cleanly rather than breaking.
**Why human:** `hidden sm:block` behaviour requires browser viewport inspection.

### 5. Competitive section tone

**Test:** Read CompetitiveSection on /platform.
**Expected:** Tokenisation, 3DS, and behavioural analytics are described factually and fairly. The tone is analytical, not dismissive. "Existing tools reduce fraud. SafeCypher eliminates it." reads as a differentiation statement, not an attack.
**Why human:** Copy tone judgement requires human reading; cannot be verified with grep.

---

## Summary

All 5 success criteria from the ROADMAP are verified against the actual codebase. All 12 requirements (PLAT-01 through PLAT-06, DSC-01 through DSC-06) are satisfied by substantive, wired implementations. All 12 key links across 4 plans are confirmed present and connected.

Phase 3 artifact counts:
- `/platform`: 7 sections — PlatformHeroSection, ApproachSection, ArchitectureDiagram, ProductPortfolioSection, CompetitiveSection, PlatformProofSection, PlatformCtaSection
- `/dynamic-security-codes`: 6 sections — DscHeroSection, DscSolutionSection, HowItWorksSection, DscProofSection, ForIssuersSection, DscCtaSection
- Shared: `PageCtaSection` (reused by both CTA wrappers)
- Supporting: `public/screenshots/dsc/.gitkeep` present

The only outstanding items are 5 human verification tests covering visual layout, responsive behaviour, cross-page anchor scrolling, and copy tone — none of which block goal achievement; they confirm quality of the already-verified implementation.

---

_Verified: 2026-02-20_
_Verifier: Claude (gsd-verifier)_
