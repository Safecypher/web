# SafeCypher.com — Website Rebuild PRD

**Version:** 1.1  
**Date:** February 2026  
**Implementer:** Mark (internal)  
**Stack:** Next.js 14+ (App Router) — replaces Astro  
**CRM:** Attio  
**Go-live:** ASAP  
**Copy strategy:** Build with placeholder copy; backfill reviewed copy per sprint as approved

---

## Resolved Decisions

| # | Decision | Resolution |
|---|----------|------------|
| 1 | Agentic commerce mockup | **Portal only.** Hosted in customer portal as a sales tool for logged-in prospects. Not on the public SafeAgent page — product thinking still being validated. |
| 2 | Primary implementer | **Mark (internal).** This PRD is the working spec for use with Claude Code. |
| 3 | Phase 0 go-live | **ASAP.** No page is blocked on final copy. Build with placeholders, backfill per sprint. |

---

## 1. Strategic Context

SafeCypher.com is currently a minimal single-page site. For a company with a seven-product roadmap, proven zero-fraud deployment at scale, and active Tier 1 pipeline, this is a liability.

**Four goals for the new site:**
1. Make the fraud problem feel urgent and quantifiable to heads of fraud and digital
2. Position SafeCypher as the authentication platform at the centre of transactions, people, and agents
3. Convert prospect interest into qualified conversations and pilot commitments
4. Provide interactive tools (value calculator, portal) that deepen engagement and give the sales team real-time visibility

**Core argument:** SafeCypher is not competing against other dynamic CVV vendors. The real competition is budget allocation. Static credentials are the root vulnerability; all downstream tools compensate for it. SafeCypher eliminates the root cause with one integration that unlocks an entire product portfolio.

---

## 2. Technical Architecture

### 2.1 Stack

**Framework:** Next.js 14+ with App Router  
**Why not Astro:** Astro's static-only model cannot support the gated portal, auth middleware, server-side API routes, or Attio event streaming required in Phase 0. Existing Astro components migrate to React with minimal rework.

| Requirement | Next.js approach |
|-------------|-----------------|
| Static marketing pages | SSG via `generateStaticParams` |
| Gated portal with auth | NextAuth.js v5 + middleware |
| Server-side API routes | `/api/*` route handlers |
| Attio event streaming | Server-side API route (key never exposed client-side) |
| Value calculator (React) | Client component with `useState` |
| ISR / on-demand revalidation | Native `revalidatePath` / `revalidateTag` |

### 2.2 Infrastructure

| Service | Choice | Notes |
|---------|--------|-------|
| Hosting | Netlify | Next.js via @netlify/plugin-nextjs, edge network, deploy previews per PR |
| Auth | NextAuth.js v5 | Email magic-link (passwordless) — no password to manage |
| Database | Supabase (Postgres) | User sessions, portal activity events, calculator runs |
| Email transport | Loops | For magic-link emails |
| Analytics | Netlify Analytics + PostHog | Public site + portal funnel tracking |
| CRM | Attio | Server-side event streaming |
| CMS | Defer to Phase 1 | Sanity or Contentful for blog/case studies |

### 2.3 Repository Structure

```
safecypher.com/
├── app/
│   ├── (marketing)/          # Public pages — SSG
│   │   ├── page.tsx           # Homepage /
│   │   ├── platform/
│   │   ├── dynamic-security-codes/
│   │   ├── safe-verify/
│   │   ├── safe-agent/
│   │   ├── proof/
│   │   │   └── an-post/       # Built but OFF NAV until copy approved
│   │   ├── company/
│   │   └── contact/
│   ├── (portal)/             # Gated — middleware protected
│   │   ├── portal/
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── calculator/
│   │   │   ├── documents/
│   │   │   └── demo/          # Agentic commerce mockup
│   ├── api/
│   │   ├── attio/
│   │   │   └── event/route.ts # Server-side Attio event ingestion
│   │   └── auth/[...nextauth]/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                   # Design system components
│   ├── marketing/            # Page-specific components
│   └── portal/               # Portal-specific components
├── content/                  # MDX for blog (Phase 1)
└── lib/
    ├── attio.ts              # Attio client (server-only)
    ├── auth.ts               # NextAuth config
    └── db.ts                 # Supabase client
```

### 2.4 Auth

- **Method:** Email magic-link (passwordless)
- **Library:** NextAuth.js v5
- **Session:** JWT, 30-day expiry with sliding window
- **Protection:** Next.js middleware on all `/portal/*` routes
- **Sign-up flow:** Self-serve — enter work email → receive magic link → land in portal. Sales team notified of new signups via Attio event.

### 2.5 Attio CRM Integration

All portal interactions stream server-side to Attio. **Never expose the Attio API key client-side.**

**API route:** `POST /api/attio/event`  
**Auth:** Server-side secret only

**Events to track:**

| Event | Key properties |
|-------|---------------|
| `portal_login` | company domain, user email, timestamp |
| `calculator_run` | portfolio size, fraud rate, volume, avg tx value, projected saving |
| `document_download` | document name, page source, user company |
| `product_page_view` | product name, time on page, referrer |
| `demo_request` | form fields, source page, UTM params |
| `mockup_viewed` | timestamp, user company (portal mockup) |

### 2.6 CI/CD

- **Branching:** `main` = production; `develop` = staging; `feature/*` per page/feature
- **CI:** GitHub Actions — lint, type-check, build check on PR
- **Deploy:** Netlify — auto-deploy `main` to prod; deploy preview per PR
- **Environments:** development, staging (Netlify deploy preview), production

---

## 3. Information Architecture

### 3.1 Navigation

**Primary nav:** Platform (mega-menu) | Proof | Company | Resources | Portal (icon) | Request Demo (CTA button, right-aligned)

- Nav is sticky and persistent on all pages
- Request Demo is never more than one click away
- Portal icon: lock when logged out, user avatar when logged in
- An Post case study is **excluded from nav** until approved copy is live

### 3.2 Sitemap

#### Phase 0 (ASAP)
- `/` — Homepage
- `/platform` — Platform Overview
- `/dynamic-security-codes` — Product page
- `/safe-verify` — Product page
- `/company` — About
- `/contact` — Request Demo
- `/proof/an-post` — **Built but off-nav** (direct link shareable)
- `/portal` — Login / dashboard
- `/portal/calculator` — Value calculator
- `/portal/demo` — Agentic commerce mockup

#### Phase 1 (Weeks 3–5)
- `/safe-agent` — SafeAgent (early access)
- `/proof` — Proof index (awards, recognition)
- `/blog` — Blog infrastructure + 2–3 seed posts
- `/partners` — Processor partners
- `/portal/documents` — Document library

#### Phase 2 (Weeks 5–8)
- `/safepay`
- `/ewallet-onboarding`
- `/card-issuance-protection`
- `/otp-replacement`
- `/careers`
- `/portal/analytics` — Internal-only portal analytics dashboard

---

## 4. Page Requirements

### 4.1 Homepage `/`

**Purpose:** Convert a 30-second visit into a demo request or product page click-through. Create urgency.

#### Hero
- **Headline:** Eliminate card-not-present fraud. Not reduce. Eliminate.
- **Sub-headline:** One API integration into your card processor. Dynamic, time-sensitive codes delivered through the banking app your cardholders already trust.
- **Primary CTA:** Request Demo (teal button)
- **Secondary CTA:** See How It Works (ghost button, smooth scroll)
- **Background:** Retain the animated CVV card

#### Urgency Block
- CNP fraud growth statistics (copy team to source)
- Agentic commerce as an emerging, unaddressed attack surface
- Core argument: every downstream tool compensates for static credentials; SafeCypher eliminates them
- CTA: "See how much fraud is costing your portfolio" → portal calculator (prompts login)

#### Three Audiences Strip
- Three equal panels: **Transactions | People | Agents**
- Each: icon + one-liner + link to product deep-dive
- Mobile: vertical stack

#### One Integration Block
- Architecture diagram: single API → seven products across three audiences
- Copy: "Integrate once. Unlock everything."
- Note: "Already integrated into the TSYS authorization stream."
- *Design asset: commission diagram — do not use stock*

#### Proof Section
- Headline stat: **800,000+ transactions. 18 months. Zero CNP fraud.**
- An Post logo (approved)
- Irish Fintech Award 2025 badge (asset needed from awards body)
- Link: "Read the full case study" → `/proof/an-post`

#### Human Cost Section
- Brief, emotionally resonant
- Fraud is not a line item — parents, the elderly, real consequences
- Link: "Our mission" → `/company`

#### CTA Block
- Short demo form: name, email, company, role + optional message
- Or Calendly embed
- Value calculator teaser with portfolio size input

---

### 4.2 Platform Overview `/platform`

**Purpose:** Explain the architecture — one technology, one integration, multiple products. Connective tissue between homepage and product pages.

**Required content:**
- The fundamental problem with static credentials (single clear argument)
- SafeCypher's approach: dynamic, time-limited credentials through the existing banking app
- Architecture diagram: one core API → seven products across three audiences
- Integration model: processor-level, serving all downstream issuers
- "Integrate once" value proposition with quantified incremental effort per additional product
- Honest competitive context (not attack copy): how this differs from tokenisation, 3DS, behavioural analytics

**CTAs:** "See the value for your portfolio" (→ calculator) | "Request a demo"

---

### 4.3 Dynamic Security Codes `/dynamic-security-codes`

**Purpose:** Deep-dive on the core product. Primary audience: Head of Fraud.

**Sections:**
1. **Problem frame:** Static CVVs printed on the card, never change, valid forever once exposed
2. **Solution:** Dynamic, time-sensitive code in cardholder's banking app — expires after single use
3. **How it works (visual flow):** Open banking app → Tap card → Code generated via cryptographic exchange → Enter at checkout → Validated in real time → Expires immediately
4. **Proof:** An Post metrics, Irish Fintech Award
5. **For issuers:** Single API integration, no card reissuance, live in weeks, major processor compatibility

**CTAs:** "See how much you could save" (→ calculator) | "Request a demo"

---

### 4.4 Safe Verify `/safe-verify`

**Purpose:** Deep-dive on people authentication / identity verification. Evolve from the existing Safe Verify landing page — do not start from scratch.

**Retain from current page:**
- Six-step how-it-works flow
- Nuclear key / three key exchange concept
- Integration details: Amazon Connect, REST API, IVR drop-in
- Quantified benefits section

**Add:**
- Problem frame: vishing is growing, knowledge-based authentication is broken, OTPs are intercepted
- Use-case segmentation via tabs: **Inbound | Bi-directional | Branch**
- Cross-link to Dynamic Security Codes (shared underlying technology)

**Design note:** The outbound flow diagram (provided as PDF in project) should be reproduced as a high-quality SVG for this page.

**CTAs:** Value calculator + demo request

---

### 4.5 SafeAgent `/safe-agent`

**Purpose:** Position SafeCypher as the issuer's champion in the emerging agentic commerce landscape.

> **Mockup placement confirmed:** The interactive agentic commerce mockup is **portal-only**. The public SafeAgent page uses static visuals only.

**Content blocks:**

1. **The Issuer's Problem**
   - Unified Commerce Platform (UCP) launched January 2026
   - Tech companies working directly with merchants to enable AI agent purchases
   - Issuers have no mechanism to: distinguish agent-initiated from human-initiated transactions, approve agent purchases in real time, or get visibility into this channel
   - The window to assert issuer relevance is open — but not indefinitely

2. **SafeCypher's Approach**
   - Human-in-the-loop approval via banking app
   - Unique dynamic code per transaction type (agent vs. human)
   - Full visibility for issuers
   - Already integrated into TSYS authorization stream
   - 8–12 weeks to MVP

3. **Why credit card rails**
   - Universal acceptance — works anywhere credit cards are accepted
   - No merchant integration required
   - No new payment method for consumers to adopt

4. **Fighting for issuers**
   - Relevance story, not just a security story
   - Early movers define the category

**CTA:** "Join the pilot" / "Request early access" — distinct from standard demo CTA. Route to a separate form/Calendly with a custom sales team notification.

**Launch note:** Phase 1 even if pre-GA. Owning the narrative early matters. Copy must make early-access status clear without undermining credibility.

---

### 4.6 An Post Case Study `/proof/an-post`

**Status:** Build page structure now (Phase 0). **Exclude from navigation.** Page goes live in nav when approved copy is ready (Phase 1).

**Page structure to build now:**
- Hero: headline stat placeholder (800,000+ transactions, 18 months, zero fraud)
- Challenge section (placeholder)
- Solution section (placeholder)
- Results section (placeholder — An Post logo approved for use)
- Quote slot (built into layout, empty until customer quote approved)
- "What's Next" section (placeholder)

**Do not launch with fabricated copy.** Placeholder text should be clearly marked internally (e.g. `[PLACEHOLDER — copy pending]`) but the page should render correctly at its URL for direct sharing if needed.

---

### 4.7 Company `/company`

**Content blocks:**
- **Mission:** Reframe from "reduce fraud" to "eliminate fraud" — retain and elevate current copy
- **The Human Cost:** Fraud is not a line item. Parents, children, the elderly. Psychological damage outlasts financial loss. This is the emotional centre of the site.
- **Beliefs:** Migrate the five beliefs from the current site verbatim — they are sharp and differentiated
- **Team:** Headshots + bios. Launch with existing photos; refresh in Phase 1.
- **Investors/backers:** Include if disclosable

---

### 4.8 Contact `/contact`

| Field | Detail |
|-------|--------|
| Form fields | Name, email, company, role, message (optional) |
| Optional | Calendly embed for direct scheduling |
| Gating policy | No public content is gated. This page is for high-intent visitors only. |

**Source-specific CTAs:**

| Source page | CTA text |
|-------------|----------|
| Product pages | Request a demo |
| SafeAgent | Join the pilot / Request early access |
| Value calculator | Talk to us about your results |
| Case study | See how this works for your portfolio |
| Product page exit intent | Before you go — see how much fraud is costing your portfolio |

---

## 5. Customer Portal

### 5.1 Strategic Purpose

The portal is a **sales intelligence asset**. Every interaction must stream to Attio so the sales team can see which companies are engaging, which products they are exploring, and when engagement spikes (deal readiness signal).

### 5.2 Authentication

```
User enters work email
  → NextAuth sends magic-link via Loops
  → User clicks link → authenticated session (JWT, 30-day sliding)
  → Lands in /portal dashboard
  → Attio event: portal_login fired server-side
```

All `/portal/*` routes protected by Next.js middleware. Unauthenticated users redirected to `/portal/login` with `callbackUrl` preserved.

### 5.3 Value Calculator `/portal/calculator`

**Status:** Formula defined — needs UI build. Phase 0 requirement.

#### Inputs (sliders + numeric override)
- Card portfolio size (number of active cards)
- Current CNP fraud rate (% of transaction value)
- Monthly transaction volume (count or value)
- Average transaction value
- SafeCypher cost input (range slider or fixed — TBC)

#### Outputs (real-time, no submit button)
- Annual fraud loss (current state)
- Projected fraud loss with SafeCypher
- Annual saving
- 3-year ROI estimate

#### UX
- All inputs: sliders with numeric override fields for precision
- Results update in real time as inputs change
- Results panel: headline saving in large type, breakdown below
- CTA after results: "Talk to us about your results" → contact form with results pre-populated in message field

#### Attio event on every run
```typescript
// Fire on debounced input change (500ms)
await fetch('/api/attio/event', {
  method: 'POST',
  body: JSON.stringify({
    event: 'calculator_run',
    portfolioSize: inputs.portfolioSize,
    fraudRate: inputs.fraudRate,
    volume: inputs.volume,
    avgTxValue: inputs.avgTxValue,
    projectedSaving: outputs.annualSaving,
  })
})
```

#### Public teaser (homepage)
- Input: "Enter your portfolio size" (single field)
- On submit: redirect to `/portal/calculator?portfolioSize=VALUE` with login prompt
- After auth: calculator pre-populated with the entered value

### 5.4 Agentic Commerce Mockup `/portal/demo`

The interactive phone UI mockup (existing HTML file in project) is embedded in the portal. Portal-only — not publicly accessible.

**Implementation:**
- Serve the mockup HTML inside an `<iframe>` or inline within the portal layout
- Track view as `mockup_viewed` Attio event on page load
- Add context panel alongside the mockup: product description, next steps, contact CTA

### 5.5 Document Library `/portal/documents` (Phase 1)

| Phase 1 contents | Phase 2 additions |
|------------------|-------------------|
| Integration guide | Processor integration specs |
| Product one-pagers | Regulatory compliance docs |
| An Post case study PDF | Deck templates |

Track every download: `document_download` event to Attio with document name + user company.

### 5.6 Portal Analytics Dashboard `/portal/analytics` (Phase 2)

Internal-only view (SafeCypher team, not prospects):
- Active companies in portal
- Last activity date per company
- Calculator runs with inputs
- Documents downloaded

Supplements Attio — does not replace it.

---

## 6. Engagement & CTA Strategy

### 6.1 CTA Mapping

| Stage | Situation | CTA |
|-------|-----------|-----|
| Awareness | Homepage first visit | Request Demo (primary) / See How It Works (secondary) |
| Consideration | Product page | Request a demo |
| Consideration | SafeAgent page | Join the pilot / Request early access |
| Evaluation | Value calculator results | Talk to us about your results |
| Evaluation | Case study | See how this works for your portfolio |
| Exit intent | Product page | Before you go — see how much fraud is costing your portfolio |

### 6.2 Social Proof Placement

An Post metrics appear throughout the site — not just the case study page:
- **Nav bar or top bar:** "800,000+ transactions. Zero CNP fraud." (persistent)
- **Homepage:** dedicated proof section
- **Each product page:** abbreviated stat in the proof section
- **Footer:** stat + award badge

### 6.3 Exit Intent

Implement on product pages. Trigger: cursor moves to browser chrome or scroll-back-to-top detected. Show lightweight overlay: "Before you go — see how much fraud is costing your portfolio" → `/portal/calculator` (with login prompt for unauthenticated users).

### 6.4 Content Gating Policy

**Nothing on the public site is gated.** The portal gates interactive tools only. Prospects should never need to give their email just to understand what SafeCypher does.

---

## 7. Copy Strategy

**Approach:** Build with placeholder copy. Backfill reviewed copy per sprint as it is approved. No page waits for final copy to launch.

| Page | Phase | Copy approach |
|------|-------|---------------|
| Homepage | 0 | Placeholder → reviewed copy backfill |
| Platform Overview | 0 | Placeholder → reviewed copy backfill |
| Dynamic Security Codes | 0 | Placeholder → reviewed copy backfill |
| Safe Verify | 0 | Adapt existing landing page copy (substantial base exists) |
| An Post Case Study | 0 | Build page structure off-nav; approved copy drops in when ready |
| Company / About | 0 | Migrate current site beliefs/mission; placeholder bios |
| Contact | 0 | Minimal copy — form + CTA text only |
| SafeAgent | 1 | Placeholder with early-access framing |
| Blog (2–3 posts) | 1 | Adapt from conference speeches |
| SafePay, E-Wallet, Card Issuance, OTP | 2 | Placeholder → reviewed copy backfill |

---

## 8. Design Assets Required

| Asset | Status | Notes |
|-------|--------|-------|
| Architecture diagram (one API → 7 products) | Needed | Commission — do not use stock |
| Three audiences icons (Transactions / People / Agents) | Needed | — |
| An Post logo (hi-res SVG) | **Approved** | Obtain SVG from An Post |
| Irish Fintech Award 2025 badge | Needed | Obtain from awards body |
| Team headshots | Existing for launch | Refresh in Phase 1 |
| Safe Verify outbound flow diagram | PDF exists | Recreate as high-quality SVG |

---

## 9. Implementation Plan

### Phase 0 — ASAP

| Deliverable | Notes |
|-------------|-------|
| Next.js project setup, Netlify, CI/CD | Start here — no dependencies |
| Design system: colours, typography, component library | Parallel with setup |
| Homepage | Placeholder copy |
| Platform Overview | Placeholder copy |
| Dynamic Security Codes | Placeholder copy |
| Safe Verify | Adapt existing landing page |
| Company / About | Migrate current site |
| Contact / Request Demo | Minimal copy needed |
| An Post case study (off-nav, placeholder) | Build structure; excluded from nav |
| Portal: NextAuth magic-link login | No dependencies |
| Portal: value calculator | Formula confirmed — build UI |
| Portal: agentic commerce mockup embed | Serve existing HTML in portal |
| Attio event streaming | Requires Attio API key |

### Phase 1 — Weeks 3–5

*In parallel: backfill reviewed copy into Phase 0 pages as approved.*

- SafeAgent page (early access framing)
- An Post case study: add to nav when approved copy is ready; add award badge + quote when assets confirmed
- Blog infrastructure + 2–3 seed posts (adapt from conference speeches)
- Awards & Recognition section
- Processor partners page
- Document library in portal

### Phase 2 — Weeks 5–8

- SafePay, E-Wallet Onboarding, Card Issuance Protection, OTP Replacement product pages
- Careers page
- Portal analytics dashboard (internal)

---

## 10. Dependencies

| Dependency | Owner | Notes |
|------------|-------|-------|
| Attio API key | Mark | Required for CRM integration — needed before portal build |
| An Post logo (hi-res SVG) | Mark | Approved for use — obtain SVG |
| Irish Fintech Award badge | Mark | Obtain from awards body |
| Architecture diagram | Mark | Commission before Platform page can be designed |
| Safe Verify outbound flow SVG | Mark | Recreate from existing PDF |
| An Post case study copy | Mark | Not blocking Phase 0 — page builds off-nav; copy added when ready |
| Team headshots (refreshed) | Mark | Not blocking — launch with existing photos |

---

## 11. Audience & Messaging Reference

### Primary: Head of Fraud / Risk (at Issuers)
Lead with urgency and cost of inaction. Authentication is the structural fix; everything else is downstream compensation. An Post proof substantiates elimination.

### Secondary: Head of Digital / Product (at Issuers)
Lead with integration simplicity and portfolio effect. One API, small UI update, no card reissuance. Invest once, roll out seven products.

### Tertiary: Processor / Network Partnerships
Lead with market coverage potential. One integration at processor level serves all downstream issuers. TSYS already integrated.

### Tone of Voice
- **Confident, not arrogant.** We have proof. Lead with data, not claims.
- **Urgent, not alarmist.** The problem is accelerating. The window is now.
- **Human.** Behind every fraud statistic is a person.
- **Concise.** Every sentence earns its place.

### Core Positioning Statement
SafeCypher is the authentication platform that eliminates card-not-present fraud by replacing static credentials with dynamic, time-sensitive codes delivered through the banking app cardholders already trust. One API integration into the card processor unlocks an entire product portfolio spanning transactions, people, and agents.

---

*SafeCypher | Confidential | February 2026*
