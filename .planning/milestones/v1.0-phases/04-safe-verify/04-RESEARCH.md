# Phase 4: Safe Verify - Research

**Researched:** 2026-02-20
**Domain:** Next.js App Router marketing page — animated phone mockup, tabbed use-case section, flow-step cards, nuclear key exchange cards, metrics table, integration feature cards, CSS flow diagram placeholder
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Phase boundary**
- Port `_archive/safe-verify-landing.html` (759 lines) to `/safe-verify` page as React components
- Source HTML is the authoritative content reference for all copy, stats, and structure
- Scope: porting existing content + adding the Inbound/Bi-directional/Branch use-case tabs and DSC cross-link

**Hero visual**
- Port the animated phone mockup faithfully — float animation, in-app notification card, Face ID button all included
- Colours updated from source blue (#0066FF) to site teal (`--color-primary`) throughout the mockup
- Notification card copy kept verbatim: "Ben Jordan · Safe Bank · Account Services"
- Hero headline ported verbatim: "Vishing calls erode customer trust." / serif italic "Restore it instantly."
- CTA labels: primary → "Request Demo" (updated from "Book a Demo"); secondary → "See How It Works" (kept, scroll-link)

**Use-case tabs**
- The 6-step how-it-works section is REPLACED by a tabbed section with 4 tabs: Outbound (existing 6-step flow from HTML), Inbound, Bi-directional, Branch
- Each tab shows an adapted flow-steps version of the verification flow for that use case (not summary cards)
- Tab UI style: underline tabs (border-bottom active indicator)
- Tab section is a single section — it replaces the original `how-it-works` section entirely
- Page must NOT have both a separate how-it-works flow AND the tabs

**Light sections**
- Both light-background sections from the source are preserved using `bg-base-200` to create dark/light/dark contrast rhythm
- Stats section: port verbatim — "Bidirectional trust. Inbound & outbound. Verified both ways." with 3 metrics: 3–5 min / Zero data / 3 layers
- Integration section: heading "Drop-in. Not rip-and-replace." kept verbatim; the 7 pill tags are expanded into feature cards with short descriptions each

**Nuclear key section**
- Concept and structure retained (3 exchange cards: Customer identification, Agent identification, Cementing the trust)
- Copy to be tightened — Claude has discretion to refine descriptions while preserving meaning and "nuclear key" framing

**Benefits section**
- 4 benefit items on the left (3–5 min saved, vishing protection, zero data at rest, bidirectional verification) — port verbatim
- Metrics table on the right preserved as-is: call handling time reduction / PII stored / security layers / integration time / traditional IDV comparison row

**DSC cross-link**
- Inline contextual link placed within the benefits or integration section — where the shared technology is naturally discussed (near "semi-stateless architecture" or integration copy)
- Not a standalone section — woven into existing content

**Outbound flow diagram**
- Add a CSS diagram placeholder after the tabbed section (or within the outbound tab), same approach as Phase 3 architecture diagram: labelled CSS boxes showing the call flow
- Marked visually as a placeholder for future SVG production asset

**CTA labels**
- Primary: "Request Demo" (site-wide pattern)
- Secondary: "See How It Works" (kept, scroll-link)

### Claude's Discretion

- Exact step copy for the three new tabs (Inbound, Bi-directional, Branch) — Claude writes adapted flow steps based on source HTML content
- Tailwind class choices and DaisyUI component selection throughout
- Placement of the diagram within or adjacent to the Outbound tab
- Exact wording of the DSC inline cross-link
- Component file naming and split into plans 04-01 through 04-04

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SV-01 | Problem frame: vishing growing, knowledge-based auth broken, OTPs intercepted | Server Component section; dark-background section with eyebrow label + two-column prose or hero layout; copy ported from source HTML hero + stats sections |
| SV-02 | Six-step how-it-works flow (ported from existing HTML) — NOW: Outbound tab within the 4-tab tabbed section | `'use client'` tab component with `useState` for active tab; Outbound tab content = original 6 flow-step cards from source HTML; grid of step cards matches Phase 3 how-it-works pattern |
| SV-03 | Nuclear key / three-key exchange concept (ported from existing HTML) | Server Component section; 3-column card grid; each card has large number, serif italic title, description, and bullet layer items; dark background (`bg-base-100` or `bg-neutral`) |
| SV-04 | Use-case segmentation via tabs: Outbound + Inbound + Bi-directional + Branch | `'use client'` tab component; underline tab style using DaisyUI `tabs tabs-bordered` or custom border-bottom implementation; 4 tab panels, each with its own flow-step card grid |
| SV-05 | Integration details section: Amazon Connect, REST API, IVR drop-in — expanded to feature cards | Server Component section; light background (`bg-base-200`); 7 feature cards replacing original pill tags; each card has icon (inline SVG), heading, short description |
| SV-06 | Quantified benefits section (ported from existing HTML) | Server Component section; 2-column grid: left = 4 benefit items with icon+copy, right = metrics table panel (5 rows, last row with strikethrough for "6–12 months" comparison) |
| SV-07 | Cross-link to Dynamic Security Codes (shared underlying technology) | Inline `<Link href="/dynamic-security-codes">` within benefits or integration section copy; not a dedicated section; follows `DscSolutionSection` cross-link pattern |
| SV-08 | Outbound flow diagram (CSS placeholder, same approach as Phase 3 architecture diagram) | Pure HTML/CSS labeled boxes with connector arrows; `bg-base-200` section or inline in Outbound tab; marked as placeholder with caption |
| SV-09 | CTAs: calculator link + demo request | Reuse `PageCtaSection` shared component (already exists); primary = "Request Demo" linking to `/#demo`; secondary = "See the value for your portfolio" linking to `/portal/calculator` |
</phase_requirements>

---

## Summary

Phase 4 builds a single new marketing page — `/safe-verify` — inside the established `(marketing)` route group. The page is a faithful port of `_archive/safe-verify-landing.html` with three additions: the 6-step outbound flow becomes one of four tabs in a new tabbed section, a CSS flow diagram placeholder is added in the outbound context, and a contextual cross-link to `/dynamic-security-codes` is woven into the benefits or integration copy.

The most technically complex element is the **tabbed use-case section** (SV-02/SV-04). Unlike all prior sections in this codebase, the tab component requires a `'use client'` directive because it manages active tab state in the browser. The tab UI style is underline-indicator tabs. DaisyUI v5 provides a `tabs tabs-bordered` class combination that handles this pattern cleanly — verified in the DaisyUI v5 component documentation. The tab content (flow-step card grids) is the same structural pattern as the Phase 3 DSC how-it-works cards.

The **animated phone mockup** (SV-01) is the hero visual. The source HTML already defines the float keyframe animation and the notification card structure precisely. Porting it to React means converting the Bootstrap Icons to inline SVGs (Phase 1 decision: no CDN icon libraries), applying `--color-primary` where the source uses `#0066FF`, and wrapping the animation in a `@keyframes float` declaration in `globals.css` (or as a Tailwind `animate-*` custom animation). The `animate-bounce` Tailwind utility is NOT a match — it uses a different easing curve. The existing `hero-credit-card` CSS in `globals.css` demonstrates the pattern for global CSS-based animation on a React component.

The **metrics table panel** in the benefits section (SV-06) is a custom card with individual `<div>` rows rather than a DaisyUI `.table`. This matches the source HTML structure and gives precise control over the strikethrough on the last row. DaisyUI `.table` would work but adds more markup complexity for 5 simple rows with custom per-row color coding.

**Primary recommendation:** Split the page into four component plans: (1) page scaffold + hero + stats, (2) tabbed use-case section + outbound diagram, (3) nuclear key + benefits + DSC cross-link, (4) integration feature cards + CTA. The tab component is the only `'use client'` element; all other sections are pure Server Components.

---

## Standard Stack

### Core (all already installed — no new packages)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router routing, `<Link>`, page metadata | Already installed; `(marketing)` route group already configured |
| react | 19.2.3 | Server and Client Component rendering; `useState` for tab state | Already installed |
| daisyui | 5.5.18 | `.tabs`, `.tabs-bordered`, `.card`, `.btn`, `.badge` classes | Already installed; tabs component is v5-stable |
| tailwindcss | 4.x | Layout utilities, spacing, typography | Already installed |

### No New Dependencies

Phase 4 requires zero new npm packages. The phone mockup is pure HTML/CSS (converted from source). The tab component uses React `useState`. The flow diagram is CSS-only boxes. No animation library, no icon library (inline SVGs only).

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React `useState` for tabs | DaisyUI `<details>`/`<summary>` accordion | Accordion doesn't match the underline tab UI; `useState` is the correct tool for tab switching |
| React `useState` for tabs | Headless UI `<Tab>` | Headless UI is not installed; `useState` is sufficient and has no package cost |
| Custom `@keyframes float` CSS | Tailwind `animate-bounce` | `animate-bounce` uses a different easing (step bounce); the source HTML's `0%,100% translateY(0) 50% translateY(-12px)` ease-in-out is not equivalent |
| Inline SVG icons | Bootstrap Icons (CDN) | Phase 1 locked decision: no CDN icon libraries; inline SVGs only |
| Custom metrics row `<div>`s | DaisyUI `.table` | 5-row custom panel with per-row color coding and a strikethrough row is simpler as flex divs than as a table with TD styling overrides |

**Installation:** None required.

---

## Architecture Patterns

### Recommended File Structure for Phase 4

```
src/
├── app/
│   └── (marketing)/
│       └── safe-verify/
│           └── page.tsx                          # /safe-verify route — Server Component
├── components/
│   └── marketing/
│       └── safe-verify/                          # New directory for phase 4 components
│           ├── SvHeroSection.tsx                 # Hero: headline + phone mockup (Server Component)
│           ├── SvStatsSection.tsx                # Stats: 3-metric light section (Server Component)
│           ├── SvUseCaseTabs.tsx                 # Tabbed use-case section (Client Component — 'use client')
│           ├── SvFlowDiagram.tsx                 # CSS call-flow diagram placeholder (Server Component)
│           ├── SvNuclearKeySection.tsx           # Three key exchanges section (Server Component)
│           ├── SvBenefitsSection.tsx             # Benefits list + metrics table (Server Component)
│           ├── SvIntegrationSection.tsx          # Integration feature cards (Server Component)
│           └── SvCtaSection.tsx                  # CTA wrapper (Server Component, reuses PageCtaSection)
```

### Pattern 1: New `/safe-verify` Route

**What:** A new `page.tsx` in `src/app/(marketing)/safe-verify/` inherits the Nav/Footer from the existing `(marketing)/layout.tsx`. No layout changes required. Nav already has Safe Verify in the platform dropdown (`href: '/safe-verify'` confirmed at `Nav.tsx` line 10).

```tsx
// Source: established pattern from dynamic-security-codes/page.tsx
// src/app/(marketing)/safe-verify/page.tsx

import type { Metadata } from 'next'
import { SvHeroSection } from '@/components/marketing/safe-verify/SvHeroSection'
import { SvStatsSection } from '@/components/marketing/safe-verify/SvStatsSection'
import { SvUseCaseTabs } from '@/components/marketing/safe-verify/SvUseCaseTabs'
import { SvNuclearKeySection } from '@/components/marketing/safe-verify/SvNuclearKeySection'
import { SvBenefitsSection } from '@/components/marketing/safe-verify/SvBenefitsSection'
import { SvIntegrationSection } from '@/components/marketing/safe-verify/SvIntegrationSection'
import { SvCtaSection } from '@/components/marketing/safe-verify/SvCtaSection'

export const metadata: Metadata = {
  title: 'Safe Verify — SafeCypher',
  description: 'Eliminate vishing fraud. Safe Verify transforms your banking app into a secure verification channel — bidirectional trust in a single frictionless moment.',
}

export default function SafeVerifyPage() {
  return (
    <>
      <SvHeroSection />
      <SvStatsSection />
      <SvUseCaseTabs />
      <SvNuclearKeySection />
      <SvBenefitsSection />
      <SvIntegrationSection />
      <SvCtaSection />
    </>
  )
}
```

### Pattern 2: Animated Phone Mockup (Server Component)

**What:** The phone mockup from the source HTML is a static JSX structure with a CSS `@keyframes float` animation applied via a custom CSS class. The notification card content is hardcoded. The Face ID button is a styled `<div>`.

**Key decisions:**
- The `@keyframes float` animation must be declared globally (in `globals.css`) and referenced via a CSS class on the mockup wrapper. Tailwind does not have a built-in float animation. This matches how `.hero-credit-card` and `.hero-signature-panel` are handled.
- `--color-primary` replaces all instances of `#0066FF` / `var(--brand-blue)` from the source.
- Bootstrap Icon class references (`bi bi-bank2`, `bi bi-shield-check`, etc.) must be replaced with inline SVGs.
- `aria-hidden="true"` on the entire visual — it is decorative.

**Global CSS addition to `globals.css`:**

```css
/* Phone mockup — float animation for Safe Verify hero */
.sv-phone-float {
  animation: sv-float 6s ease-in-out infinite;
}

@keyframes sv-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.sv-notif-slide {
  animation: sv-slide-in 0.8s ease-out 0.5s both;
}

@keyframes sv-slide-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Component skeleton:**

```tsx
// src/components/marketing/safe-verify/SvHeroSection.tsx
// Pure Server Component — no 'use client'
import Link from 'next/link'

export function SvHeroSection() {
  return (
    <section className="bg-base-100 py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — headline + CTAs */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              Safe Verify
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-base-content leading-tight">
              Vishing calls erode{' '}
              <span className="font-serif italic font-normal">customer trust.</span>
            </h1>
            <div className="flex items-center gap-4 mt-4 mb-6">
              <div className="w-12 h-px bg-primary" />
              <p className="font-serif italic text-2xl text-primary">Restore it instantly.</p>
            </div>
            <p className="text-base-content/70 text-lg leading-relaxed max-w-lg mb-8">
              Safe Verify transforms your banking app into a secure verification channel.
              When your bank calls a customer, they know it&rsquo;s really you — confirmed
              in-app with biometric authentication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#demo" className="btn btn-primary btn-lg">
                Request Demo
              </Link>
              <Link href="#use-cases" className="btn btn-ghost btn-lg">
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right — animated phone mockup */}
          <div className="flex justify-center order-first lg:order-last">
            <div className="sv-phone-float w-72 bg-base-200 rounded-[2.25rem] p-2 shadow-2xl border border-white/10" aria-hidden="true">
              {/* Phone screen content — notification card + Face ID */}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
```

### Pattern 3: Tabbed Use-Case Section (Client Component)

**What:** A single `'use client'` component that manages an `activeTab` state. Renders 4 tabs (Outbound, Inbound, Bi-directional, Branch) with underline active indicator. Each tab panel renders a grid of flow-step cards.

**Tab UI:** DaisyUI v5 provides `role="tablist"` + `role="tab"` + `aria-selected` semantics. The underline style uses `border-b-2` on the active tab and `border-transparent` on inactive tabs. DaisyUI's `tabs tabs-border` class combination achieves this.

**Why `'use client'`:** `useState` is required to track `activeTab`. No server-side data fetching or rendering benefits from keeping this a Server Component — all tab content is static copy.

**Flow step data pattern:** Each tab's steps are a typed array. The Outbound tab's steps come verbatim from the source HTML's 6 `flow-card` blocks. The three new tabs (Inbound, Bi-directional, Branch) have adapted steps written by Claude at authoring time, consistent with the product logic.

```tsx
// src/components/marketing/safe-verify/SvUseCaseTabs.tsx
'use client'

import { useState } from 'react'

type Step = {
  number: string
  title: string
  description: string
  iconPath: string  // inline SVG path data
  color: string     // Tailwind bg class for icon background
}

type Tab = {
  id: string
  label: string
  steps: Step[]
}

const tabs: Tab[] = [
  {
    id: 'outbound',
    label: 'Outbound',
    steps: [
      {
        number: '01',
        title: 'Bank initiates outbound call',
        description: 'The agent calls the customer. Safe Verify simultaneously sends a push notification / deep link to the customer\'s banking app.',
        iconPath: '...', // telephone SVG
        color: 'bg-primary/10',
      },
      // ... steps 02–06 from source HTML + Fallback
    ],
  },
  {
    id: 'inbound',
    label: 'Inbound',
    steps: [
      // Claude-authored steps for inbound flow
    ],
  },
  {
    id: 'bidirectional',
    label: 'Bi-directional',
    steps: [
      // Claude-authored steps for bidirectional flow
    ],
  },
  {
    id: 'branch',
    label: 'Branch',
    steps: [
      // Claude-authored steps for branch flow
    ],
  },
]

export function SvUseCaseTabs() {
  const [activeTab, setActiveTab] = useState('outbound')
  const current = tabs.find(t => t.id === activeTab)!

  return (
    <section id="use-cases" className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            How It Works
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            Verification flow for every{' '}
            <span className="font-serif italic font-normal">call type</span>
          </h2>
        </div>

        {/* Tab list — underline style */}
        <div role="tablist" className="flex gap-0 border-b border-base-300 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'px-6 py-3 text-sm font-semibold transition-colors',
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary -mb-px'
                  : 'text-base-content/50 hover:text-base-content border-b-2 border-transparent -mb-px',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panel — flow step grid */}
        <div role="tabpanel" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {current.steps.map(step => (
            <div key={step.number} className="bg-base-200 rounded-xl border border-base-300 p-6">
              <p className="font-mono text-xs text-primary mb-4">Step {step.number}</p>
              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-4`}>
                <svg /* inline SVG */ />
              </div>
              <h3 className="font-semibold text-base-content mb-2">{step.title}</h3>
              <p className="text-sm text-base-content/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

### Pattern 4: CSS Flow Diagram Placeholder

**What:** Same approach as the Phase 3 `ArchitectureDiagram` component. Labeled CSS boxes showing the outbound call flow with connector arrows. Visually marked as a placeholder.

**Placement:** Directly below the tabbed section (as a separate section) or within the Outbound tab panel (as a sub-component of `SvUseCaseTabs`). Claude's discretion — placing it as a separate section keeps `SvUseCaseTabs` cleaner and avoids a long Client Component.

**Flow nodes for the outbound call diagram (from source HTML logic):**
1. Bank Agent → initiates call
2. Safe Verify API → triggers push notification
3. Customer Phone → receives notification, opens banking app
4. Customer → biometric auth (Face ID / fingerprint)
5. Banking App → displays verified agent identity
6. Agent sends question → customer answers in-app
7. Authenticated conversation begins

```tsx
// src/components/marketing/safe-verify/SvFlowDiagram.tsx
// Pure Server Component

export function SvFlowDiagram() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-8">
          <p className="text-xs font-mono text-base-content/40 uppercase tracking-widest">
            Outbound call flow — placeholder diagram
          </p>
        </div>

        {/* CSS boxes with border connectors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 flex-wrap">
          {/* Node boxes with border-r connectors between them */}
        </div>

        <p className="text-xs text-base-content/30 text-center mt-6">
          Diagram placeholder — production SVG to replace in a future phase
        </p>
      </div>
    </section>
  )
}
```

### Pattern 5: Nuclear Key Section (Server Component)

**What:** Three-column card grid with large faint numbers, serif italic titles, description text, and bullet layer items (for card 1). Dark background section — use `bg-neutral` to contrast with the surrounding `bg-base-100` sections.

**Source HTML structure for the three cards:**
- Card 01: "Customer identification" — 3 bullet layers: phone biometric, banking app login, Safe Verify deep link
- Card 02: "Agent identification" — description only (no bullets), about triggered display
- Card 03: "Cementing the trust" — description only, about the question/answer validation

**Copy refinement:** Claude has discretion to tighten the descriptions while keeping the "nuclear key" framing and meaning intact.

```tsx
// src/components/marketing/safe-verify/SvNuclearKeySection.tsx
// Pure Server Component

const exchanges = [
  {
    num: '01',
    title: 'Customer',
    titleSerif: 'identification',
    description: 'Three layers of security achieved in a single, frictionless action through the banking app.',
    layers: [
      'Logs into phone (biometric)',
      'Logs into banking app',
      'Opens Safe Verify via deep link',
    ],
  },
  {
    num: '02',
    title: 'Agent',
    titleSerif: 'identification',
    description: 'The in-app display can only be triggered by a legitimate call from the bank — protecting against spoofed calls without any extra step from the customer.',
    layers: [],
  },
  {
    num: '03',
    title: 'Cementing',
    titleSerif: 'the trust',
    description: 'A final visible in-app interaction — question/answer validation — confirms to the customer they are engaging with their bank. Bidirectional trust, locked in.',
    layers: [],
  },
]

export function SvNuclearKeySection() {
  return (
    <section className="bg-neutral border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          The Nuclear Key Approach
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-content">
          Three key exchanges.{' '}
          <span className="font-serif italic font-normal">One seamless moment.</span>
        </h2>
        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          {exchanges.map(e => (
            <div key={e.num} className="bg-base-100/5 border border-primary/15 rounded-2xl p-8">
              <p className="text-6xl font-bold text-primary/15 leading-none mb-6">{e.num}</p>
              <h3 className="text-lg font-semibold text-neutral-content mb-3">
                {e.title}{' '}
                <span className="font-serif italic font-normal">{e.titleSerif}</span>
              </h3>
              <p className="text-sm text-neutral-content/60 leading-relaxed">{e.description}</p>
              {e.layers.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {e.layers.map(layer => (
                    <li key={layer} className="flex items-center gap-3 text-sm text-neutral-content/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {layer}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 6: Benefits Section with Metrics Table (Server Component)

**What:** Two-column grid. Left side: 4 benefit items with icon + title + description. Right side: a styled panel containing 5 metric rows, with the last row having a strikethrough value.

**Metric rows from source HTML:**
1. Call handling time reduction → `3–5 min` (primary color)
2. PII stored → `None` (success/green)
3. Security layers → `3` (default)
4. Integration time → `Weeks` (warning/orange)
5. Traditional IDV integration → `6–12 months` (muted, line-through strikethrough)

**DSC cross-link placement:** The "Zero data at rest" benefit description mentions "semi-stateless architecture" — this is the natural location for the inline DSC cross-link per the locked decision.

```tsx
// Inline cross-link pattern (from DscSolutionSection.tsx precedent)
<p className="text-sm text-base-content/60 leading-relaxed">
  Semi-stateless architecture with on-the-fly calculations. No PII stored. No database to breach. GDPR compliant by design.{' '}
  <Link href="/dynamic-security-codes" className="text-accent hover:underline">
    The same technology that powers Dynamic Security Codes
  </Link>
  .
</p>
```

**Metric row structure (no DaisyUI table — custom flex rows):**

```tsx
<div className="bg-base-200 rounded-2xl border border-base-300 p-8">
  {metrics.map((m, i) => (
    <div
      key={m.label}
      className={[
        'flex justify-between items-center py-5',
        i < metrics.length - 1 ? 'border-b border-base-300' : '',
      ].join(' ')}
    >
      <span className="text-sm text-base-content/60">{m.label}</span>
      <span className={`text-xl font-bold ${m.className}`}>{m.value}</span>
    </div>
  ))}
</div>
```

### Pattern 7: Integration Feature Cards (Server Component, Light Section)

**What:** Light-background section (`bg-base-200`) with the heading "Drop-in. Not rip-and-replace." and 7 feature cards — one per original pill tag. Each card has: inline SVG icon, heading, short description.

**The 7 feature cards (from source HTML pill tags, expanded):**

| Tag | Card heading | Description direction |
|-----|-------------|----------------------|
| White-label SDK | White-label SDK | Embed Safe Verify inside your own branded banking app |
| Amazon Connect | Amazon Connect | Works with your existing Amazon Connect contact centre — no telephony rebuild |
| IVR Drop-in | IVR Drop-in | Add Safe Verify to your existing IVR flow without a full platform migration |
| Tokenized Phone | Tokenized Phone | Phone numbers tokenized at the point of verification — no raw PII transmitted |
| GDPR by Design | GDPR by Design | No PII stored at rest; semi-stateless architecture means compliance is structural |
| CCPA Ready | CCPA Ready | Meets US consumer data privacy requirements out of the box |
| REST API | REST API | Standard JSON/REST integration — documented via OpenAPI spec |

**This is also a natural location for the DSC cross-link** if the planner prefers it here over the benefits section. The "semi-stateless architecture" copy in the GDPR card makes it a valid alternative placement.

```tsx
// src/components/marketing/safe-verify/SvIntegrationSection.tsx
// Pure Server Component

const features = [
  { heading: 'White-label SDK', description: '...', iconPath: '...' },
  // ...
]

export function SvIntegrationSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            Integration
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-base-content">
            Drop-in.{' '}
            <span className="font-serif italic font-normal text-primary">Not rip-and-replace.</span>
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto">
            Safe Verify integrates with your existing IVR and contact centre infrastructure.
            Compatible with Amazon Connect and major telephony platforms. No full auth stream required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.heading} className="card bg-base-100 rounded-xl p-6 border border-base-300">
              <svg className="w-6 h-6 text-accent mb-4" /* inline */ />
              <h3 className="font-semibold text-base-content">{f.heading}</h3>
              <p className="text-sm text-base-content/60 mt-2 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 8: Page-Level Section Background Rhythm

The page must follow the dark/light/dark contrast pattern established in locked decisions:

| Section | Background | Tailwind class |
|---------|-----------|----------------|
| Hero | Dark | `bg-base-100` |
| Stats | Light | `bg-base-200` |
| Use-case tabs | Dark | `bg-base-100` |
| Flow diagram | Light | `bg-base-200` |
| Nuclear key | Dark | `bg-neutral` |
| Benefits | Dark | `bg-base-100` |
| Integration | Light | `bg-base-200` |
| CTA | Dark | `bg-base-100` |

Every section pair uses `border-t border-base-300` to separate sections (established codebase pattern).

### Anti-Patterns to Avoid

- **Using `animate-bounce` for the phone float animation:** Tailwind's `animate-bounce` uses `cubic-bezier` jump easing — not the smooth `ease-in-out` of the source HTML's float. Always use a custom `@keyframes` in `globals.css` for this animation.
- **Using the CDN Bootstrap Icons:** Phase 1 decision locks all icons to inline SVGs. The source HTML uses `bi bi-bank2`, `bi bi-shield-check`, `bi bi-lightning-charge-fill`, etc. — all must be converted to equivalent inline SVG paths.
- **Making `SvUseCaseTabs` a Server Component:** It requires `useState` for tab switching. It must be `'use client'`. Wrapping it in a Server Component shell and passing data as props is not necessary here — the tab data is static.
- **Forgetting `id="use-cases"` on the tabs section:** The hero's "See How It Works" CTA scrolls to `#use-cases`. The section `<section id="use-cases">` must match.
- **Using `bg-white` or hardcoded light colors:** The site uses DaisyUI's semantic color tokens (`bg-base-200` for light sections). Using `bg-white` breaks dark mode support.
- **Creating a new Netlify form for the page CTA:** The CTA links to `/#demo` (homepage form). No new form registration needed.
- **Placing both the standalone 6-step flow AND the tabs on the same page:** Locked decision says the tabs REPLACE the original how-it-works section entirely.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tab state management | Vanilla JS event listeners | React `useState` in a `'use client'` component | React state is the correct tool; vanilla JS doesn't integrate cleanly with Next.js hydration |
| Tab underline indicator | Custom CSS animation | `border-b-2 border-primary -mb-px` on active tab button | Simple CSS border offset creates the underline effect cleanly without animation |
| Phone float animation | Framer Motion / GSAP | Custom `@keyframes` in `globals.css` | Already established pattern with `.hero-credit-card`; no animation library installed |
| Metrics table | DaisyUI `.table` | Custom flex `<div>` rows | Per-row color coding and the strikethrough last row are simpler to control without table semantics; the source HTML does the same |
| Icon resolution | Bootstrap Icons / Heroicons package | Inline SVG paths | Phase 1 locked decision; existing codebase uses inline SVG throughout |
| Page metadata | Generic title | `export const metadata` from `page.tsx` | Established App Router pattern; already used on all other pages |

**Key insight:** Phase 4 is content-heavy with moderate UI complexity (the tab component). The phone mockup and tab section are the two technically interesting elements — everything else is straightforward component composition following already-established patterns.

---

## Common Pitfalls

### Pitfall 1: Phone Float Animation Not Applying

**What goes wrong:** The phone mockup renders without animation; it just sits static.

**Why it happens:** The `@keyframes float` animation is defined in the source HTML's `<style>` block. When porting to React, the keyframes must live in `globals.css` (or a CSS module). Tailwind `animate-*` classes don't help here. If the animation class is not added to `globals.css` and no CSS module is wired up, the class has no effect.

**How to avoid:** Add the `sv-phone-float` class and its `@keyframes sv-float` to `globals.css` before the component is written. Verify in the browser dev tools that the animation property is applied to the element.

**Warning signs:** The phone mockup is visible but static; no transform animation in dev tools.

### Pitfall 2: Tab Active Indicator Misalignment

**What goes wrong:** The underline tab indicator (`border-b-2`) appears below the tab bar's bottom border rather than on top of it, creating a double-line artifact.

**Why it happens:** The tab bar has `border-b border-base-300` on the container. The active tab's `border-b-2 border-primary` needs `-mb-px` (negative margin-bottom by 1px) to overlap the container border and appear flush. Without `-mb-px`, the active border sits below the container border.

**How to avoid:** Apply `-mb-px` to the active tab button. The inactive tabs also need `-mb-px border-b-2 border-transparent` to maintain the same height as the active tab (preventing layout shift when switching tabs).

**Warning signs:** Active tab shows two bottom lines (the container's `base-300` border plus the `primary` border); or active tab is slightly shorter than inactive tabs.

### Pitfall 3: `id` Attribute Missing on Tabs Section

**What goes wrong:** Clicking "See How It Works" in the hero CTA navigates to the top of the page, not the tabs section.

**Why it happens:** The hero's secondary CTA links to `href="#use-cases"`. If the tabs section's `<section>` element doesn't have `id="use-cases"`, the hash navigation has no target and the browser stays at the top.

**How to avoid:** Ensure `<section id="use-cases" ...>` is on the `SvUseCaseTabs` component's outermost element. `globals.css` already sets `html { scroll-behavior: smooth; }`, so smooth scrolling is handled.

**Warning signs:** Clicking "See How It Works" jumps to top of page or makes no visible change.

### Pitfall 4: Broken Bootstrap Icon References

**What goes wrong:** The phone mockup renders with blank spaces where icons should appear.

**Why it happens:** The source HTML uses Bootstrap Icons via CDN (`<i class="bi bi-bank2">`). These are not available in the React codebase (no CDN, no package). The component must use inline SVGs.

**How to avoid:** Before writing the component, identify every Bootstrap Icon used in the source HTML sections being ported, and find the equivalent inline SVG path. Key icons needed:
- `bi-bank2` — building/bank icon
- `bi-shield-check` — shield with checkmark
- `bi-shield-fill-check` — filled shield with check
- `bi-lock-fill` — padlock (filled)
- `bi-shield-lock-fill` — shield with padlock
- `bi-telephone-fill` — telephone (filled)
- `bi-bell-fill` — bell (filled)
- `bi-question-circle-fill` — question mark circle (filled)
- `bi-check-circle-fill` — check circle (filled)
- `bi-arrow-repeat` — circular arrows (fallback)
- `bi-lightning-charge-fill` — lightning bolt
- `bi-lock-fill` — padlock
- `bi-phone` — phone outline
- `bi-cloud` — cloud
- `bi-key` — key
- `bi-globe2` — globe
- `bi-puzzle` — puzzle piece

**Warning signs:** Empty spaces in the phone mockup where icons should appear; gaps in integration cards.

### Pitfall 5: Light Section Text Color on `bg-base-200`

**What goes wrong:** Text in the Stats section or Integration section appears too dark or invisible.

**Why it happens:** `bg-base-200` is still within the dark theme. The text color token `text-base-content` remains light on dark backgrounds. However, if the locked decision intended these sections to visually appear "light" by contrast (not actually light theme), the text colors will be fine. The confusion arises when comparing to the source HTML where these sections use `var(--brand-light): #F3F4F6` (a true light background with dark text).

**Clarification from codebase:** Looking at the existing `UrgencySection` (`bg-neutral`) and `DscProofSection` (`bg-neutral`), the "dark section" sections in this codebase are all dark-on-dark with different shades of dark. The "light section" in the context of this site means `bg-base-200` (slightly lighter shade of dark), not a white/light background. The text stays `text-base-content` (light). The Stats section (`bg-base-200`) will look lighter than the Hero (`bg-base-100`) but will remain dark-themed.

**How to avoid:** Use `bg-base-200` for the "light" sections (stats, integration). Do not use `text-base-content/dark` or attempt to invert to light-theme. The visual rhythm comes from the background shade contrast between `bg-base-100` and `bg-base-200`, not from flipping to a light color scheme.

**Warning signs:** White or very light background in stats or integration sections (means a wrong color token was used); invisible text on a genuinely light background.

### Pitfall 6: Tab Content Flash / Render Issue

**What goes wrong:** On tab switch, the previous tab's content flashes before the new content renders; or there's a brief layout shift.

**Why it happens:** If the tab panels are rendered via conditional rendering (`activeTab === 'outbound' && <OutboundPanel />`), React unmounts the old panel and mounts the new one — no flash, but may have a layout jump if panel heights differ significantly. If `display: none` toggling is used instead (all panels mounted, one shown), there's no remount.

**How to avoid:** For this page, use simple conditional rendering (`tabs.find(t => t.id === activeTab)`) — the tabs render the same grid structure with different data, so height differences are minimal. No special handling needed. If visible jank appears during QA, add a fade transition via CSS opacity on the panel.

**Warning signs:** Visible layout jump when switching tabs; content appears to flash; tab panel height collapses briefly.

---

## Code Examples

### Phone Float Animation — globals.css addition

```css
/* Source: derived from _archive/safe-verify-landing.html @keyframes float */
/* Add to src/app/globals.css */

.sv-phone-float {
  animation: sv-float 6s ease-in-out infinite;
}

@keyframes sv-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.sv-notif-slide {
  animation: sv-slide-in 0.8s ease-out 0.5s both;
}

@keyframes sv-slide-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Underline Tab Pattern — active/inactive states

```tsx
// Source: DaisyUI tab semantics + custom underline CSS
// The -mb-px trick overlaps the container's border-b with the active tab's border-b-2

{/* Tab container */}
<div role="tablist" className="flex border-b border-base-300 mb-10">
  {tabs.map(tab => (
    <button
      key={tab.id}
      role="tab"
      aria-selected={activeTab === tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={[
        'px-6 py-3 text-sm font-semibold transition-colors -mb-px border-b-2',
        activeTab === tab.id
          ? 'border-primary text-primary'
          : 'border-transparent text-base-content/50 hover:text-base-content',
      ].join(' ')}
    >
      {tab.label}
    </button>
  ))}
</div>
```

### Inline DSC Cross-Link (from DscSolutionSection pattern)

```tsx
// Source: src/components/marketing/dsc/DscSolutionSection.tsx — cross-link pattern
import Link from 'next/link'

// Within benefit description or integration card:
<p className="text-sm text-base-content/60 leading-relaxed">
  Semi-stateless architecture with on-the-fly calculations. No PII stored. No database to breach.{' '}
  <Link href="/dynamic-security-codes" className="text-accent hover:underline">
    The same underlying technology as Dynamic Security Codes.
  </Link>
</p>
```

### Metric Row (custom flex panel, not DaisyUI table)

```tsx
// Source: derived from _archive/safe-verify-landing.html .metric-row pattern
const metrics = [
  { label: 'Call handling time reduction', value: '3–5 min', className: 'text-primary' },
  { label: 'PII stored', value: 'None', className: 'text-success' },
  { label: 'Security layers', value: '3', className: 'text-base-content' },
  { label: 'Integration time', value: 'Weeks', className: 'text-warning' },
  { label: 'Traditional IDV integration', value: '6–12 months', className: 'text-base-content/30 line-through' },
]

<div className="bg-base-200 rounded-2xl border border-base-300 p-8 relative overflow-hidden">
  {metrics.map((m, i) => (
    <div
      key={m.label}
      className={`flex justify-between items-center py-5 ${i < metrics.length - 1 ? 'border-b border-base-300' : ''}`}
    >
      <span className="text-sm text-base-content/60">{m.label}</span>
      <span className={`text-xl font-bold ${m.className}`}>{m.value}</span>
    </div>
  ))}
</div>
```

### CSS Flow Diagram Placeholder (from Phase 3 ArchitectureDiagram pattern)

```tsx
// Source: src/components/marketing/platform/ArchitectureDiagram.tsx — established CSS-border pattern
// Adapted for horizontal left-to-right call flow

const flowNodes = [
  { label: 'Bank Agent', sub: 'Initiates call' },
  { label: 'Safe Verify API', sub: 'Sends push notification', accent: true },
  { label: 'Customer Phone', sub: 'Receives notification' },
  { label: 'Banking App', sub: 'Biometric auth + agent display' },
  { label: 'Authenticated', sub: 'Conversation begins', success: true },
]

<div className="flex items-center justify-center flex-wrap gap-0">
  {flowNodes.map((node, i) => (
    <div key={node.label} className="flex items-center">
      <div className={[
        'rounded-lg px-4 py-3 text-center text-sm border',
        node.accent
          ? 'bg-primary/10 border-primary text-primary font-semibold'
          : node.success
          ? 'bg-success/10 border-success/40 text-success font-semibold'
          : 'bg-base-300 border-base-300 text-base-content/60 font-mono',
      ].join(' ')}>
        <p className="font-semibold">{node.label}</p>
        <p className="text-xs opacity-60 mt-0.5">{node.sub}</p>
      </div>
      {i < flowNodes.length - 1 && (
        <div className="w-8 border-t-2 border-base-300 flex-shrink-0" />
      )}
    </div>
  ))}
</div>
```

### Section Container (established codebase pattern)

```tsx
// Source: all existing section components in this codebase
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
| CDN icon libraries (Bootstrap Icons, Heroicons) | Inline SVG paths | Phase 1 decision | All icons in the source HTML must be converted to inline SVG |
| `next/head` `<Head>` for page titles | `export const metadata` from `page.tsx` | Next.js 13 App Router | No `<Head>` component; use metadata export |
| Separate `how-it-works` section + tabs | Tabs wholesale replace the how-it-works section | Phase 4 context decision | One tabbed section only; no standalone 6-step section elsewhere on the page |
| `#0066FF` brand blue from source HTML | `--color-primary` / `text-primary`, `bg-primary`, `border-primary` Tailwind utilities | Established site theme | All source HTML blue must map to site primary color token |

**Deprecated/outdated in this codebase:**
- `var(--brand-blue): #0066FF` — source HTML uses this; the React site uses `--color-primary` (OKLCH-based blue). Do not port the CSS variable name.
- `font-family: 'Outfit', 'Playfair Display'` via Google Fonts CDN — the React site loads these fonts differently (next/font or global import); do not add the Google Fonts `<link>` tag.
- Bootstrap Icons CDN `<link>` — not used in the React codebase; inline SVG only.
- Scroll-triggered `IntersectionObserver` JavaScript from the source HTML — not ported. The React site does not use scroll-triggered fade-in animations (no equivalent Client Component was built in prior phases). Skip this effect.

---

## Outbound Tab — Authoritative Step Content (from Source HTML)

The 6 steps + fallback from the source HTML, verbatim, for reference during authoring:

| Step | Title | Description |
|------|-------|-------------|
| 01 | Bank initiates outbound call | The agent calls the customer. Safe Verify simultaneously sends a push notification / deep link to the customer's banking app. |
| 02 | Customer opens app & verifies identity | Customer opens the banking app via the notification and authenticates using three layers: phone unlock, app login, and biometric (Face ID / fingerprint). |
| 03 | Bank agent verified in-app | The app displays the agent's name and department — a display that can only be triggered by a call originating from the bank. Customer sees proof it's legitimate. |
| 04 | Active question validation | The agent sends verification questions to the app. The customer selects the correct answer on-screen — cementing bidirectional trust without speaking sensitive details aloud. |
| 05 | Authenticated conversation begins | Both parties are verified. The agent can serve the customer immediately — no repetitive questions, no wasted time, no opportunity for social engineering. |
| Fallback | Graceful fallback | If the customer is unavailable or verification fails, a message is left to contact the bank directly. Security is never compromised. |

---

## Open Questions

1. **Bootstrap Icons → inline SVG conversion coverage**
   - What we know: The source HTML uses 15+ distinct Bootstrap Icons across the phone mockup, flow cards, benefit items, and integration tags. All must be converted to inline SVG.
   - What's unclear: The exact SVG paths for each icon need to be sourced. Bootstrap Icons are MIT-licensed and SVG paths are available from `icons.getbootstrap.com`.
   - Recommendation: Planner should include an explicit task to source and document inline SVG paths for all required icons before authoring components. Alternatively, the plan can note that any simple geometric approximation is acceptable for placeholder fidelity (e.g., a simple shield outline for `bi-shield-check`). The existing codebase demonstrates both approaches.

2. **Inbound, Bi-directional, Branch tab step content**
   - What we know: Claude has discretion to write these. The Outbound tab is verbatim from the source HTML. The three new tabs should follow the same structural logic but adapted for their respective flows.
   - What's unclear: The exact business logic for Inbound (customer calls the bank — how does Safe Verify handle it?), Bi-directional (simultaneous verification), and Branch (in-person branch context). The source HTML does not define these.
   - Recommendation: These are content authoring tasks, not research tasks. The planner should schedule one task specifically for tab content authoring, noting that the implementer should infer reasonable flows from the product description ("Safe Verify transforms your banking app into a secure verification channel — bidirectional trust").

3. **`safe-verify` route — does the directory already exist?**
   - What we know: The Nav has `href: '/safe-verify'` (confirmed), but the filesystem check shows no `src/app/(marketing)/safe-verify/` directory exists yet.
   - What's unclear: Nothing — it does not exist. The planner must create it.
   - Recommendation: Plan task 04-01 to include: create `src/app/(marketing)/safe-verify/page.tsx` and the `src/components/marketing/safe-verify/` directory.

4. **`globals.css` animation additions — naming collision risk**
   - What we know: `globals.css` already has `.hero-credit-card` and `.hero-signature-panel` custom classes. Adding `sv-phone-float` and `sv-notif-slide` follows the same pattern.
   - What's unclear: Whether there are any keyframe name collisions with existing global styles.
   - Recommendation: Use the `sv-` prefix (Safe Verify) for all new animation classes to namespace them. Review `globals.css` before adding to confirm no collision.

---

## Sources

### Primary (HIGH confidence)

- Existing codebase — `_archive/safe-verify-landing.html`: Authoritative content source; all copy, stats, section structure, and animation values read directly
- Existing codebase — `src/components/marketing/platform/ArchitectureDiagram.tsx`: CSS-border connector pattern confirmed; same approach for flow diagram placeholder
- Existing codebase — `src/components/marketing/home/HeroCvvCard.tsx`: Client Component pattern for animated visuals; `useEffect`/`useState`/`useCallback` in browser-only components
- Existing codebase — `src/app/globals.css`: Global CSS animation class pattern; `.hero-credit-card` demonstrates how to apply custom keyframes from a global stylesheet to a React component via className
- Existing codebase — `src/styles/theme.css`: Confirms `--color-primary` as the blue token; `bg-base-100`, `bg-base-200`, `bg-neutral` semantics confirmed
- Existing codebase — `src/components/marketing/Nav.tsx` line 10: `/safe-verify` already in nav — no nav changes needed in Phase 4
- Existing codebase — `src/components/marketing/shared/PageCtaSection.tsx`: Confirmed available and reusable for SvCtaSection
- Existing codebase — `src/components/marketing/dsc/DscSolutionSection.tsx`: Cross-link pattern (`<Link href="/dynamic-security-codes" className="text-accent hover:underline">`) confirmed
- Existing codebase — `package.json`: Confirmed versions — next 16.1.6, react 19.2.3, daisyui 5.5.18, tailwindcss 4.x; no new packages needed

### Secondary (MEDIUM confidence)

- DaisyUI v5 tabs documentation — `tabs` + `tabs-border` class combination; `role="tablist"` + `role="tab"` + `aria-selected` pattern; verified via prior Phase 2/3 research on DaisyUI v5 stable classes
- React `useState` for tab switching — standard React Client Component pattern; no external reference needed

### Tertiary (LOW confidence)

- None — all critical findings verified via existing codebase.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; all existing dependencies confirmed in package.json
- Route structure: HIGH — established `(marketing)` route group pattern confirmed; nav link pre-wired
- Phone mockup animation: HIGH — source HTML provides exact keyframe values; `globals.css` pattern is established
- Tab component pattern: HIGH — React `useState` is the correct tool; DaisyUI tab classes are v5-stable
- Icon conversion requirement: HIGH — Bootstrap Icons confirmed absent from codebase; inline SVG required
- Background rhythm (dark/light/dark): HIGH — DaisyUI semantic tokens confirmed from codebase inspection
- Metrics table as custom flex divs: HIGH — source HTML structure matches; DaisyUI table adds unnecessary complexity
- New tab step content (Inbound/Bi-directional/Branch): LOW (content authoring, not technical research)
- CSS flow diagram for outbound call: MEDIUM — Phase 3 approach is established; adapting to horizontal flow requires visual QA

**Research date:** 2026-02-20
**Valid until:** 2026-03-20 (30 days — stable ecosystem; no fast-moving dependencies)
