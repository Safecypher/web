# Phase 5: Company + Contact - Research

**Researched:** 2026-02-21
**Domain:** Next.js App Router marketing pages — Company/About page with numbered belief cards, Human Cost section variant, team grid, and Contact page with Netlify form + Calendly popup + sessionStorage source detection
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Phase boundary**

Two supporting marketing pages:
- `/company` — Mission statement, Human Cost section (dedicated variant), five beliefs (migrated verbatim), team section with headshots/bios
- `/contact` — Demo request form with source-specific heading/CTA text and a Calendly popup button

**Company page structure**
- Hero section at the top (matching pattern of /platform and /safe-verify)
- Section order: Hero → Mission → Beliefs → Human Cost → Team → CTA
- Closes with a CTA section using the shared PageCtaSection (same pattern as other product pages)

**Five beliefs**
- Numbered cards — each belief is a card with a large number and the verbatim belief text
- Not accordion, not editorial list

**Human Cost section**
- Dedicated version, not the shared homepage HumanCostSection component
- Can have different framing or expanded copy appropriate to the Company context

**Team section**
- Info per card: photo + name + title + 1-line bio sentence
- Placeholder headshot: generic silhouette (neutral person icon, no initials)
- Layout: 3-column grid on desktop
- 6 placeholder team members seeded in the component data array

**Calendly**
- Always rendered — not conditional, no env var toggle
- Layout: form on the left, Calendly "Book a time" button on the right (side-by-side on desktop)
- Implementation: popup/modal triggered by button (not inline embedded widget)
- No UI toggle between form and Calendly — both options visible simultaneously

**Source CTA detection**
- Mechanism: URL query param (`?from=...`) with sessionStorage fallback so source persists through the session
- Only heading and submit button text change — form fields stay constant across all sources
- Three source variants:
  - `product` → heading "Request a demo", button "Request a demo"
  - `calculator` → heading "Talk to us about your results", button "Talk to us about your results"
  - Default (no param / direct visit / nav click) → heading "Request a demo", button "Request a demo"
- Note: general/nav variant resolves to same text as default ("Request a demo") — three sources, two distinct text variants

### Claude's Discretion

- Exact hero headline and subhead copy for /company
- Mission statement layout within its section (prose block vs styled blockquote)
- Exact styling of the numbered belief cards (card background, number typography)
- Human Cost section copy framing beyond what exists in the shared component
- Silhouette icon design for placeholder headshots
- Calendly popup trigger implementation (Calendly's own JS snippet vs simple popupWidget call)
- Mobile layout for the side-by-side contact section (stacks vertically)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COMP-01 | Mission section: "eliminate fraud" framing (elevated from current copy) | Server Component section; prose or blockquote layout; copy derives from archive `id="mission"` stats section: "Zero fraud. Not reduced. Eliminated." framing; Claude has discretion on expanded mission copy |
| COMP-02 | Human Cost section: fraud is not a line item — parents, children, elderly, psychological damage | Dedicated CompanyHumanCostSection component (NOT imported HumanCostSection from home); same eyebrow/pull-stat/border-error pattern as homepage variant but different framing — Company context allows expanded copy |
| COMP-03 | Beliefs section: five beliefs migrated verbatim from current site | Confirmed in `_archive/index.html`: five belief cards with large numbers. Verbatim text: "01 Don't reduce. Eliminate.", "02 Dynamic data. Applied intelligence.", "03 Nothing there. Nothing to steal.", "04 Not probability, but certainty.", "05 Easier for users. Impossible for fraudsters." — all use serif italic for the second clause |
| COMP-04 | Team section: headshots + bios (existing photos; placeholder bios) | Server Component; 3-column grid; inline SVG person-silhouette placeholder for headshots; typed array of 6 members seeded with name/title/bio |
| CONT-01 | Contact form: name, email, company, role, message (optional) | Reuses existing `Input`, `Textarea`, `Button` UI components; Netlify Forms with `form-name="contact-request"` (new name distinct from existing `demo-request`); `__forms.html` must be updated to register the new form |
| CONT-02 | Optional Calendly embed for direct scheduling | `react-calendly` v4.4.0; `PopupWidget` component; `'use client'` directive; `rootElement` handled with `typeof document !== 'undefined'` guard; no env var toggle — always renders; button styled with DaisyUI `btn btn-outline` to read as secondary/alternative path |
| CONT-03 | Source-specific CTA text per referring page | `'use client'` component; `useSearchParams` (wrapped in `<Suspense>`) + `sessionStorage` fallback; two text variants: "Request a demo" (default/product) and "Talk to us about your results" (calculator); no form field changes across variants |
</phase_requirements>

---

## Summary

Phase 5 creates two new marketing pages — `/company` and `/contact` — inside the established `(marketing)` route group. Both routes are already pre-wired in `Nav.tsx` (`href="/company"` at line 70) and `Footer.tsx` (Company → "About Us" → `/company`, "Contact" → `/contact`). No Nav or Footer changes are needed.

The **Company page** is a pure Server Component composition. Its most distinctive section is the Beliefs section: five numbered cards with verbatim text from `_archive/index.html`. Each belief text has two clauses — the second clause is in serif italic (matching the site's `font-serif italic font-normal` pattern). The dedicated Human Cost section (`CompanyHumanCostSection`) follows the same structure as the homepage `HumanCostSection` (eyebrow, pull stats with `border-error`, prose body) but with different framing that expands on the company's mission rather than the product pitch. The team section seeds six placeholder cards with inline SVG silhouette headshots.

The **Contact page** has two technically interesting elements. First, the **Calendly popup**: the `react-calendly` package (v4.4.0, peer deps `>=react 16.8.0`, compatible with React 19.2.3) provides a `PopupWidget` component that renders Calendly's native popup via a React Portal. Because it accesses `document`, it requires a `'use client'` wrapper and a SSR guard for `rootElement`. The button itself is styled as a secondary/alternative path (`btn btn-outline`) rendered in the right column of a two-column desktop layout. Second, the **source CTA detection**: the contact form component reads `?from=` via `useSearchParams` on mount, writes the value to `sessionStorage`, and falls back to reading from `sessionStorage` on subsequent page loads within the session. `useSearchParams` in Next.js App Router requires wrapping the consumer component in a `<Suspense>` boundary on the page to avoid forcing the entire page to client-side render. The contact form itself registers a new Netlify form (`contact-request`) and must be added to `__forms.html`.

**Primary recommendation:** Split into two tasks — (1) Company page scaffold + all Company sections, (2) Contact page scaffold + contact form + Calendly integration + source detection. The Company page has no client-side interactivity; the Contact page has two `'use client'` components (the Calendly button and the source-aware form).

---

## Standard Stack

### Core (all already installed — no new packages needed for Company page)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router routing, `<Link>`, page metadata | Already installed; `(marketing)` route group configured |
| react | 19.2.3 | Server and Client Component rendering | Already installed |
| daisyui | 5.5.18 | `btn`, `card`, layout classes | Already installed |
| tailwindcss | 4.x | Layout, spacing, typography utilities | Already installed |

### New Dependency — Contact Page Only

| Library | Version | Purpose | Why This One |
|---------|---------|---------|--------------|
| react-calendly | 4.4.0 | Calendly popup widget | Official React wrapper; `PopupWidget` component; peer deps `>=react 16.8.0` (compatible with React 19); well-maintained (latest Dec 2024); zero known vulnerabilities; only Calendly-specific React package with Portal support |

**Installation:**
```bash
npm install react-calendly
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `react-calendly` PopupWidget | Plain `window.Calendly.initPopupWidget()` via `useEffect`-loaded script | Script approach works but requires manual script injection, global window typing, and loading state management. `react-calendly` wraps this cleanly. Either is valid — both are `'use client'`; `react-calendly` is the more maintainable choice and is within the project's NPM budget. |
| `useSearchParams` hook | `window.location.search` in a `useEffect` | `useSearchParams` is the App Router idiomatic API and enables SSR-safe access. `window.location.search` would also work inside `useEffect` but bypasses Next.js router awareness. |
| Separate form + Calendly components | Single monolithic contact section | Separating allows the form component to own its Netlify submission logic and the Calendly button to own its DOM-access guard independently. |

---

## Architecture Patterns

### Recommended File Structure for Phase 5

```
src/
├── app/
│   └── (marketing)/
│       ├── company/
│       │   └── page.tsx                               # /company route — Server Component
│       └── contact/
│           └── page.tsx                               # /contact route — Server Component shell
├── components/
│   └── marketing/
│       ├── company/                                   # New: Company page components
│       │   ├── CompanyHeroSection.tsx                 # Hero: headline + subhead (Server Component)
│       │   ├── CompanyMissionSection.tsx              # Mission statement (Server Component)
│       │   ├── CompanyBeliefsSection.tsx              # Five numbered belief cards (Server Component)
│       │   ├── CompanyHumanCostSection.tsx            # Dedicated Human Cost variant (Server Component)
│       │   ├── CompanyTeamSection.tsx                 # Team grid with placeholder headshots (Server Component)
│       │   └── CompanyCtaSection.tsx                  # CTA wrapper reusing PageCtaSection (Server Component)
│       └── contact/                                   # New: Contact page components
│           ├── ContactFormSection.tsx                 # Source-aware form + Calendly layout ('use client')
│           └── ContactCalendlyButton.tsx              # Calendly PopupWidget wrapper ('use client')
│
public/
└── __forms.html                                       # UPDATE: add contact-request form registration
```

### Pattern 1: New Routes (already pre-wired in Nav and Footer)

Both routes exist in nav/footer but no page files exist yet. The `(marketing)` layout (Nav + Footer) is inherited automatically.

```tsx
// src/app/(marketing)/company/page.tsx
import type { Metadata } from 'next'
import { CompanyHeroSection } from '@/components/marketing/company/CompanyHeroSection'
import { CompanyMissionSection } from '@/components/marketing/company/CompanyMissionSection'
import { CompanyBeliefsSection } from '@/components/marketing/company/CompanyBeliefsSection'
import { CompanyHumanCostSection } from '@/components/marketing/company/CompanyHumanCostSection'
import { CompanyTeamSection } from '@/components/marketing/company/CompanyTeamSection'
import { CompanyCtaSection } from '@/components/marketing/company/CompanyCtaSection'

export const metadata: Metadata = {
  title: 'Company — SafeCypher',
  description: 'We built SafeCypher to eliminate card-not-present fraud — not manage it. Our mission, beliefs, and team.',
}

export default function CompanyPage() {
  return (
    <>
      <CompanyHeroSection />
      <CompanyMissionSection />
      <CompanyBeliefsSection />
      <CompanyHumanCostSection />
      <CompanyTeamSection />
      <CompanyCtaSection />
    </>
  )
}
```

```tsx
// src/app/(marketing)/contact/page.tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactFormSection } from '@/components/marketing/contact/ContactFormSection'

export const metadata: Metadata = {
  title: 'Contact — SafeCypher',
  description: 'Request a demo, talk to us about your results, or book time directly.',
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ContactFormSection />
    </Suspense>
  )
}
```

### Pattern 2: Five Beliefs — Verbatim Content + Numbered Cards

**Verbatim belief text from `_archive/index.html`** (COMP-03, must not be paraphrased):

| Number | First clause | Serif italic clause |
|--------|-------------|---------------------|
| 01 | Don't reduce. | Eliminate. |
| 02 | Dynamic data. | Applied intelligence. |
| 03 | Nothing there. | Nothing to steal. |
| 04 | Not probability, but | certainty. |
| 05 | Easier for users. | Impossible for fraudsters. |

**Card structure** — large number, belief text with serif italic for the second clause:

```tsx
// src/components/marketing/company/CompanyBeliefsSection.tsx
// Pure Server Component

const beliefs = [
  { num: '01', plain: "Don't reduce.", serif: 'Eliminate.' },
  { num: '02', plain: 'Dynamic data.', serif: 'Applied intelligence.' },
  { num: '03', plain: 'Nothing there.', serif: 'Nothing to steal.' },
  { num: '04', plain: 'Not probability, but', serif: 'certainty.' },
  { num: '05', plain: 'Easier for users.', serif: 'Impossible for fraudsters.' },
]

export function CompanyBeliefsSection() {
  return (
    <section className="bg-base-200 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
          What We Believe
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-12">
          Five beliefs that shape{' '}
          <span className="font-serif italic font-normal text-primary">everything we build.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beliefs.map((b) => (
            <div key={b.num} className="bg-base-100 border border-base-300 rounded-2xl p-8">
              <p className="font-mono text-5xl font-bold text-primary/20 leading-none mb-6">
                {b.num}
              </p>
              <h3 className="text-xl font-semibold text-base-content">
                {b.plain}{' '}
                <span className="font-serif italic font-normal text-primary">{b.serif}</span>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Note on layout:** 5 cards in a 3-column grid results in 2 rows (3 + 2). The last row has two cards and one empty column. Claude has discretion to make the 5th card `col-span-1` or use a different last-row treatment. The simplest approach is to let the 5th card occupy its natural grid cell.

### Pattern 3: Team Section — Inline SVG Placeholder Headshots

**No external image assets are available** — use inline SVG person silhouette for all 6 placeholder members. This is consistent with the Phase 1 "no icon packages" decision.

```tsx
// src/components/marketing/company/CompanyTeamSection.tsx
// Pure Server Component

type TeamMember = {
  name: string
  title: string
  bio: string
}

const team: TeamMember[] = [
  { name: 'Mark Wright', title: 'CEO & Co-founder', bio: 'Fintech entrepreneur with a decade building fraud prevention infrastructure.' },
  { name: '[Name]', title: 'CTO & Co-founder', bio: 'Placeholder bio — one sentence about technical background.' },
  { name: '[Name]', title: 'Head of Product', bio: 'Placeholder bio — one sentence about product background.' },
  { name: '[Name]', title: 'Head of Engineering', bio: 'Placeholder bio — one sentence about engineering background.' },
  { name: '[Name]', title: 'Head of Sales', bio: 'Placeholder bio — one sentence about sales background.' },
  { name: '[Name]', title: 'Head of Operations', bio: 'Placeholder bio — one sentence about operations background.' },
]

// Inline SVG silhouette — neutral person icon
function PersonSilhouette() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect width="80" height="80" rx="8" fill="currentColor" className="text-base-300" />
      <circle cx="40" cy="30" r="14" fill="currentColor" className="text-base-content/20" />
      <path d="M12 72c0-15.464 12.536-28 28-28s28 12.536 28 28" fill="currentColor" className="text-base-content/20" />
    </svg>
  )
}

export function CompanyTeamSection() {
  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">The Team</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-12">
          The people behind <span className="font-serif italic font-normal text-primary">the mission.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-base-200">
                <PersonSilhouette />
              </div>
              <h3 className="font-semibold text-base-content">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.title}</p>
              <p className="text-sm text-base-content/60 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 4: Calendly PopupWidget Integration

**Package:** `react-calendly` v4.4.0
**Component used:** `PopupWidget`
**Key constraint:** Requires `rootElement` — a DOM node reference — which is not available during SSR. Use `typeof document !== 'undefined'` guard inside the prop.

```tsx
// src/components/marketing/contact/ContactCalendlyButton.tsx
'use client'

import { PopupWidget } from 'react-calendly'

interface ContactCalendlyButtonProps {
  url: string
}

export function ContactCalendlyButton({ url }: ContactCalendlyButtonProps) {
  return (
    <PopupWidget
      url={url}
      rootElement={
        typeof document !== 'undefined'
          ? document.getElementById('__next') ?? document.body
          : undefined as unknown as HTMLElement
      }
      text="Book a time"
      textColor="#ffffff"
      color="transparent"
    />
  )
}
```

**Alternative — plain JS Calendly widget (no npm package):**

If `react-calendly` causes issues (e.g., React 19 type incompatibility at build time), the pure JS approach works equally well:

```tsx
'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

export function ContactCalendlyButton({ url }: { url: string }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const openPopup = () => {
    window.Calendly?.initPopupWidget({ url })
  }

  return (
    <button onClick={openPopup} className="btn btn-outline btn-lg w-full">
      Book a time
    </button>
  )
}
```

**Recommendation:** Try `react-calendly` first (cleaner). Fall back to plain JS approach if peer dep issues arise during `npm install`. Both produce identical runtime behavior.

### Pattern 5: Source-Aware Contact Form (useSearchParams + sessionStorage)

**Key requirement:** `useSearchParams` in Next.js 16 App Router with static rendering requires the component to be wrapped in `<Suspense>`. Without it, the router will warn and may force the entire page to client-render.

**Source detection logic:**
1. On mount: read `?from=` param via `useSearchParams`
2. If param present: write to `sessionStorage` under key `contactSource`
3. If no param: read from `sessionStorage` as fallback
4. Derive heading + button text from the resolved source

```tsx
// src/components/marketing/contact/ContactFormSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Button } from '@/components/ui'
import { ContactCalendlyButton } from './ContactCalendlyButton'

type Source = 'product' | 'calculator' | 'default'
type FormState = 'idle' | 'submitting' | 'success' | 'error'

const COPY: Record<Source, { heading: string; buttonText: string }> = {
  product:    { heading: 'Request a demo',              buttonText: 'Request a demo' },
  calculator: { heading: 'Talk to us about your results', buttonText: 'Talk to us about your results' },
  default:    { heading: 'Request a demo',              buttonText: 'Request a demo' },
}

const CALENDLY_URL = 'https://calendly.com/safecypher/30min' // placeholder — real URL set at authoring time

export function ContactFormSection() {
  const searchParams = useSearchParams()
  const [source, setSource] = useState<Source>('default')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const param = searchParams.get('from') as Source | null
    if (param && COPY[param]) {
      setSource(param)
      sessionStorage.setItem('contactSource', param)
    } else {
      const stored = sessionStorage.getItem('contactSource') as Source | null
      if (stored && COPY[stored]) {
        setSource(stored)
      }
    }
  }, [searchParams])

  const { heading, buttonText } = COPY[source]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Object.fromEntries(formData) as Record<string, string>).toString(),
      })
      setFormState(res.ok ? 'success' : 'error')
      if (!res.ok) setErrorMessage('Something went wrong. Please try again or email us directly.')
    } catch {
      setFormState('error')
      setErrorMessage('Could not reach the server. Check your connection and try again.')
    }
  }

  if (formState === 'success') {
    return (
      <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Success state */}
          <h2 className="text-3xl font-bold text-base-content mb-4">Thanks — we&apos;ll be in touch.</h2>
          <p className="text-base-content/60">Expect a reply within one business day.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-base-100 border-t border-base-300 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Heading driven by source */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-base-content">{heading}</h1>
          <p className="text-base-content/60 mt-3">No commitment required.</p>
        </div>

        {/* Two-column layout: form left, Calendly right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">

          {/* Left — form */}
          <form name="contact-request" onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="form-name" value="contact-request" />
            <div className="grid sm:grid-cols-2 gap-6">
              <Input label="Full Name *" name="name" type="text" required fullWidth />
              <Input label="Role *" name="role" type="text" required fullWidth />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Input label="Company *" name="company" type="text" required fullWidth />
              <Input label="Work Email *" name="email" type="email" required fullWidth />
            </div>
            <Textarea label="Message (optional)" name="message" rows={4} fullWidth />
            {formState === 'error' && (
              <div className="alert alert-error text-sm">{errorMessage}</div>
            )}
            <Button type="submit" variant="primary" size="lg" fullWidth loading={formState === 'submitting'}>
              {buttonText}
            </Button>
          </form>

          {/* Right — Calendly CTA */}
          <div className="lg:w-64 flex flex-col items-center text-center gap-4 lg:pt-16">
            <p className="text-sm text-base-content/50">Prefer to book directly?</p>
            <ContactCalendlyButton url={CALENDLY_URL} />
            <p className="text-xs text-base-content/40">30-minute intro call</p>
          </div>

        </div>
      </div>
    </section>
  )
}
```

### Pattern 6: Netlify Form Registration in `__forms.html`

The existing `__forms.html` only registers `demo-request`. A new entry for `contact-request` must be added. Netlify detects forms at deploy time from the static HTML file; the React form submission uses `fetch` to `/__forms.html` — the `form-name` hidden input routes the submission to the correct Netlify form.

```html
<!-- Updated: public/__forms.html -->
<!DOCTYPE html>
<html>
  <head><title>Form Detection</title></head>
  <body>
    <!-- Existing: homepage demo-request form -->
    <form name="demo-request" data-netlify="true" hidden>
      <input type="hidden" name="form-name" value="demo-request" />
      <input type="text" name="name" />
      <input type="text" name="role" />
      <input type="text" name="company" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <textarea name="challenge"></textarea>
      <button type="submit">Submit</button>
    </form>

    <!-- New: contact page contact-request form -->
    <form name="contact-request" data-netlify="true" hidden>
      <input type="hidden" name="form-name" value="contact-request" />
      <input type="text" name="name" />
      <input type="text" name="role" />
      <input type="text" name="company" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

### Pattern 7: Section Background Rhythm

Follows the established dark/light/dark contrast pattern from prior phases:

| Section (Company page) | Background | Class |
|------------------------|-----------|-------|
| Hero | Dark | `bg-base-100` |
| Mission | Dark | `bg-base-100` |
| Beliefs | Light | `bg-base-200` |
| Human Cost | Dark | `bg-base-100` |
| Team | Dark | `bg-base-100` |
| CTA | Dark | `bg-base-100` (via shared `PageCtaSection`) |

| Section (Contact page) | Background | Class |
|------------------------|-----------|-------|
| Contact form + Calendly | Dark | `bg-base-100` |

Every section pair uses `border-t border-base-300` to separate sections.

### Anti-Patterns to Avoid

- **Importing `HumanCostSection` from `home/` for the Company page:** COMP-02 requires a dedicated variant. Create `CompanyHumanCostSection` as a separate component. The homepage variant links to `/company` — the dedicated Company version links to `/contact`.
- **Rendering `ContactFormSection` without `<Suspense>`:** `useSearchParams` in a statically rendered page route requires a `<Suspense>` boundary. Without it, Next.js 16 will warn or error. The `page.tsx` must wrap `<ContactFormSection>` in `<Suspense>`.
- **Using `bg-white` or light-mode colors for the "light" Beliefs section:** Use `bg-base-200` (slightly lighter dark shade), not a true white/light background. The site is dark-mode by default.
- **Making belief numbers `text-base-content/10` (too faint):** Balance number opacity so it reads as a large background numeral without dominating the text. `text-primary/20` or `text-base-content/15` works well — the same approach used in the nuclear key section of Phase 4.
- **Registering the new `contact-request` form only in the React component:** Netlify detects forms at build time from static HTML. The hidden form registration in `__forms.html` is mandatory for submissions to be captured. This is an easy step to miss.
- **Setting `rootElement` to a state variable initialized as `null`:** This causes `PopupWidget` to render with an invalid portal target. Use the inline `typeof document !== 'undefined'` guard directly in the prop — this is the documented approach for Next.js (confirmed in react-calendly GitHub issue #105).
- **Creating the `/company` or `/contact` page directories inside `src/app/(marketing)/` without the nested route group:** The route group `(marketing)` means the directory must be `src/app/(marketing)/company/page.tsx` and `src/app/(marketing)/contact/page.tsx` — not `src/app/company/page.tsx`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Calendly popup modal | Custom modal + `<iframe>` to Calendly URL | `react-calendly` `PopupWidget` (or plain JS `window.Calendly.initPopupWidget`) | Calendly's popup widget handles: cross-origin iframe security, modal dismiss on outside-click, URL tracking parameters, mobile layout. Hand-rolling an iframe modal is ~150 lines for a solved problem. |
| Form field components | Raw `<input>` + `<label>` divs | Existing `Input`, `Textarea`, `Button` UI components from `src/components/ui/` | Already built with DaisyUI v5 `fieldset`/`fieldset-legend` pattern, error state, full-width support. Consistent with DemoFormSection. |
| Source-aware text switching | URL read via `window.location` in JSX render | `useSearchParams` hook from `next/navigation` | App Router idiomatic; SSR-safe; works with streaming and partial rendering. Direct `window.location` access errors during SSR. |
| Person silhouette graphic | Image file (PNG/SVG asset) | Inline SVG directly in component | No asset file needed; consistent with Phase 1 "inline SVG" decision; easily replaced with a real photo `<img>` tag later. |
| Belief text wrapping | `<p>` + `<em>` or CSS italic | Two JSX spans — `{b.plain}` + `<span className="font-serif italic ...">` | Matches the typography pattern used throughout the codebase (e.g., hero headlines, SvHeroSection). Consistent visual identity. |

**Key insight:** Phase 5 is primarily a content-and-layout phase. The two technically interesting elements — Calendly popup and source-aware form — have well-established solutions with verifiable npm packages and documented Next.js patterns. The Company page has zero client-side interactivity; all its sections are Server Components.

---

## Common Pitfalls

### Pitfall 1: Missing `<Suspense>` around `ContactFormSection`

**What goes wrong:** Build warning or runtime error — "useSearchParams() should be wrapped in a suspense boundary". In Next.js 16, a statically rendered page that contains a Client Component calling `useSearchParams` without a `<Suspense>` boundary will either warn or force the entire page to client-render.

**Why it happens:** `useSearchParams` signals to Next.js that the component needs access to dynamic URL state, which is not available during static HTML generation. The `<Suspense>` boundary allows the server to render everything above it statically while deferring the param-reading section to the client.

**How to avoid:** In `src/app/(marketing)/contact/page.tsx`, wrap the import:
```tsx
import { Suspense } from 'react'
// ...
<Suspense fallback={<div className="min-h-screen" />}>
  <ContactFormSection />
</Suspense>
```

**Warning signs:** Build output includes "useSearchParams() should be wrapped in a suspense boundary at ..."; or the contact page takes unexpectedly long to load (full client render).

---

### Pitfall 2: Calendly `rootElement` Causing Hydration Error

**What goes wrong:** Browser console shows "Hydration failed because the server rendered HTML didn't match the client". The `PopupWidget` renders a different DOM structure during SSR (when `document` is unavailable) vs client hydration.

**Why it happens:** If `rootElement` is evaluated unconditionally during SSR (e.g., `document.body`), Node.js throws "document is not defined". If `rootElement` is set to `null` and the component renders a portal to `null`, React Portal throws.

**How to avoid:** Use the inline guard `typeof document !== 'undefined' ? document.getElementById('__next') ?? document.body : undefined as unknown as HTMLElement`. If using the plain JS approach (no `react-calendly`), render the button only after `useEffect` has confirmed the browser context.

**Warning signs:** Console error "document is not defined" during `next build`; React hydration mismatch warnings in the browser.

---

### Pitfall 3: `contact-request` Netlify Form Not Captured

**What goes wrong:** Form submissions from `/contact` arrive in the Netlify dashboard under the wrong name or are not captured at all.

**Why it happens:** The `DemoFormSection` pattern posts to `/__forms.html` with `form-name: "demo-request"`. The new Contact form uses `form-name: "contact-request"` — but if `__forms.html` only contains the `demo-request` form, Netlify never registers `contact-request` as a known form endpoint, and submissions are silently dropped.

**How to avoid:** Update `public/__forms.html` in the same task that creates `ContactFormSection`. The hidden form fields in `__forms.html` must exactly match the field `name` attributes in the React form: `name`, `role`, `company`, `email`, `message`.

**Warning signs:** Netlify dashboard shows no submissions after testing the contact form; or submissions appear under `demo-request` (wrong routing).

---

### Pitfall 4: Belief Text Paraphrased Instead of Verbatim

**What goes wrong:** The beliefs are rewritten during implementation, violating COMP-03.

**Why it happens:** The implementer may not have the archive HTML open and writes paraphrased versions from memory. The belief text is short and memorable but the exact phrasing must be preserved.

**How to avoid:** The RESEARCH.md contains the verbatim belief table (see Pattern 2 above). The plan tasks must reference this table explicitly and state "port verbatim from archive — no paraphrasing". The five verbatim texts are:
1. `Don't reduce.` / `Eliminate.`
2. `Dynamic data.` / `Applied intelligence.`
3. `Nothing there.` / `Nothing to steal.`
4. `Not probability, but` / `certainty.`
5. `Easier for users.` / `Impossible for fraudsters.`

**Warning signs:** Belief text that summarises or combines clauses differently from the above.

---

### Pitfall 5: Side-by-Side Contact Layout Breaks on Mobile

**What goes wrong:** On mobile, the two-column contact layout (form left, Calendly right) renders as an extremely narrow form because `lg:grid-cols-[1fr_auto]` does not stack.

**Why it happens:** The `grid-cols-[1fr_auto]` class only applies at `lg:` breakpoint. The base (single-column) layout stacks naturally, but if the Calendly column is placed before the form in the DOM order, it appears above the form on mobile.

**How to avoid:** Put the form `<form>` element first in the DOM. The Calendly CTA column comes second — on mobile it stacks below the form, which is the correct UX (primary action first, alternative second). Use `grid-cols-1 lg:grid-cols-[1fr_auto]` on the grid wrapper.

**Warning signs:** Contact page on mobile shows Calendly button before the form fields.

---

### Pitfall 6: `CompanyCtaSection` Re-implementing Instead of Reusing

**What goes wrong:** A new CTA section component is built from scratch, duplicating the `PageCtaSection` pattern.

**Why it happens:** The planner may scope "CTA section" as a new component without checking the shared component library.

**How to avoid:** `src/components/marketing/shared/PageCtaSection.tsx` already exists and is the established pattern (used by `SvCtaSection` in Phase 4). `CompanyCtaSection` should be a thin wrapper:

```tsx
// src/components/marketing/company/CompanyCtaSection.tsx
import { PageCtaSection } from '@/components/marketing/shared/PageCtaSection'

export function CompanyCtaSection() {
  return <PageCtaSection />
}
```

Or, if the Company page needs different CTA copy, override it — but the `PageCtaSection` component's existing copy ("Ready to eliminate CNP fraud?") is appropriate for the Company page and can be used as-is.

---

## Code Examples

### useSearchParams + sessionStorage source detection

```tsx
// Source: Next.js v16.1.6 useSearchParams docs + sessionStorage standard Web API
// src/components/marketing/contact/ContactFormSection.tsx (relevant section)

'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type Source = 'product' | 'calculator' | 'default'

const COPY: Record<Source, { heading: string; buttonText: string }> = {
  product:    { heading: 'Request a demo',                buttonText: 'Request a demo' },
  calculator: { heading: 'Talk to us about your results', buttonText: 'Talk to us about your results' },
  default:    { heading: 'Request a demo',                buttonText: 'Request a demo' },
}

export function ContactFormSection() {
  const searchParams = useSearchParams()
  const [source, setSource] = useState<Source>('default')

  useEffect(() => {
    const param = searchParams.get('from') as Source | null
    if (param && param in COPY) {
      setSource(param)
      sessionStorage.setItem('contactSource', param)
    } else {
      const stored = sessionStorage.getItem('contactSource') as Source | null
      if (stored && stored in COPY) setSource(stored)
    }
  }, [searchParams])

  const { heading, buttonText } = COPY[source]
  // ... rest of component
}
```

### Suspense wrapper in page.tsx

```tsx
// Source: Next.js v16.1.6 useSearchParams docs — Suspense requirement
// src/app/(marketing)/contact/page.tsx

import { Suspense } from 'react'
import { ContactFormSection } from '@/components/marketing/contact/ContactFormSection'

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-base-100" />}>
      <ContactFormSection />
    </Suspense>
  )
}
```

### react-calendly PopupWidget (SSR-safe)

```tsx
// Source: react-calendly v4.4.0 GitHub + issue #105 rootElement guidance
// src/components/marketing/contact/ContactCalendlyButton.tsx

'use client'
import { PopupWidget } from 'react-calendly'

export function ContactCalendlyButton({ url }: { url: string }) {
  return (
    <PopupWidget
      url={url}
      rootElement={
        typeof document !== 'undefined'
          ? (document.getElementById('__next') ?? document.body)
          : undefined as unknown as HTMLElement
      }
      text="Book a time"
      textColor="currentColor"
      color="#1e3a5f"
    />
  )
}
```

### Netlify form field registration pattern (existing + new)

```html
<!-- Source: public/__forms.html — established Netlify form detection pattern -->
<!-- Add contact-request alongside existing demo-request -->

<form name="contact-request" data-netlify="true" hidden>
  <input type="hidden" name="form-name" value="contact-request" />
  <input type="text" name="name" />
  <input type="text" name="role" />
  <input type="text" name="company" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">Submit</button>
</form>
```

### Section container (standard pattern)

```tsx
// Source: all existing section components — established codebase pattern
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
| `useRouter().query` (Pages Router) | `useSearchParams()` from `next/navigation` | Next.js 13 App Router | `useSearchParams` is the App Router API; requires `'use client'` + `Suspense` |
| Inline Calendly `<script>` tag in `<Head>` | `useEffect` script injection or `react-calendly` component | Next.js App Router (no `_document.tsx`) | No `next/head` in App Router; script injection must happen in a client component |
| DaisyUI v4 `form-control` + `label-text` | DaisyUI v5 `fieldset` + `fieldset-legend` | DaisyUI v5 | Phase 1 locked decision; existing `Input`/`Textarea` components already use v5 pattern |
| `next/head` `<Head>` for page SEO | `export const metadata` from `page.tsx` | Next.js 13 App Router | Established pattern in all existing pages |

**Deprecated/outdated in this codebase:**
- `form-control` / `label-text` CSS classes — DaisyUI v4; replaced by `fieldset` / `fieldset-legend` in v5. The existing UI components handle this correctly.
- `document.getElementById('root')` as `rootElement` for `PopupWidget` — Next.js App Router does not use `id="root"`; use `id="__next"` with `?? document.body` fallback.
- `netlify` attribute on form elements — replaced by `data-netlify="true"` in Netlify's current docs; the existing `__forms.html` already uses `data-netlify="true"`.

---

## Verbatim Content Reference

### Five Beliefs (COMP-03 — must not be paraphrased)

From `_archive/index.html` — the `.belief-text` elements, verbatim:

| Num | Full text as rendered |
|-----|----------------------|
| 01 | Don't reduce. *Eliminate.* |
| 02 | Dynamic data. *Applied intelligence.* |
| 03 | Nothing there. *Nothing to steal.* |
| 04 | Not probability, but *certainty.* |
| 05 | Easier for users. *Impossible for fraudsters.* |

*(Italic indicates the `serif-accent` styled portion from the archive — maps to `font-serif italic font-normal text-primary` in the React codebase)*

### Archive Contact Form Field Names (reference for CONT-01 field parity)

From `_archive/index.html` form fields: `name`, `role`, `institution` (= "company" in React equivalent), `email`, `message`. The React version uses `company` rather than `institution` — consistent with the existing `DemoFormSection` field naming convention.

### Mission Framing Reference (COMP-01)

The archive stats section under `id="mission"` contains: "Zero fraud.", "Not reduced. Eliminated.", and the award line: "Winner, Best Financial Crime Prevention Initiative - Irish Fintech Awards 2025". These are the seed phrases for the Mission section copy. Claude has discretion on the expanded mission narrative.

---

## Open Questions

1. **Calendly account URL**
   - What we know: The implementation requires a real `https://calendly.com/...` URL in `ContactCalendlyButton`. No URL has been provided.
   - What's unclear: Whether a Calendly account exists for SafeCypher and what the specific booking link URL is.
   - Recommendation: Use `https://calendly.com/safecypher/30min` as a placeholder during implementation. Mark it with a comment `// TODO: replace with real Calendly URL`. The component is fully functional — only the URL needs replacing.

2. **Team member real names and bios**
   - What we know: 6 placeholder members are seeded in the `team` array. The decisions say "existing photos" but no photos are present in the public directory.
   - What's unclear: Whether any real team member data should be used vs all placeholders.
   - Recommendation: Seed all 6 as `[Name]` placeholders with inline SVG silhouettes. The component structure should make replacement trivial (name/title/bio array + `<img>` swap for the silhouette). Real data is a content task, not a code task.

3. **Beliefs section — 5-card grid last-row layout**
   - What we know: 5 cards in a 3-column grid = 2 rows (3+2). The last row has one empty column.
   - What's unclear: Whether this asymmetry is acceptable or whether the 5th card should span 2 columns (`col-span-2`) for visual balance.
   - Recommendation: Default to natural grid fill (5th card occupies its cell, leaving one empty). This is standard for odd-count grids. If the user requests a different treatment, the `col-span-2` approach on the 5th card is a one-class change.

4. **`react-calendly` vs plain JS widget — final call**
   - What we know: Both approaches produce identical runtime behavior. `react-calendly` is v4.4.0 (latest), peer deps `>=react 16.8.0` (compatible with React 19.2.3).
   - What's unclear: Whether React 19 type definitions in `react-calendly` cause TypeScript errors at build time.
   - Recommendation: The planner should specify `react-calendly` as the primary approach and include a note that if `npm install react-calendly` produces type errors with `@types/react@19`, fall back to the plain JS `useEffect` approach (documented above). Both are equivalent in functionality.

---

## Sources

### Primary (HIGH confidence)

- Existing codebase — `_archive/index.html`: Verbatim belief text (`.belief-text` elements), contact form field names, mission section framing. Read directly.
- Existing codebase — `src/components/marketing/home/DemoFormSection.tsx`: Netlify form submission pattern (`fetch` to `/__forms.html`, `form-name` hidden input, form state machine). Read directly. Contact form follows this pattern exactly.
- Existing codebase — `src/components/marketing/home/HumanCostSection.tsx`: Structure reference for `CompanyHumanCostSection` (eyebrow, `border-error` pull stats, prose body). Read directly.
- Existing codebase — `src/components/ui/Input.tsx`, `Textarea.tsx`, `Button.tsx`: DaisyUI v5 `fieldset`/`fieldset-legend` pattern confirmed; all reusable for contact form. Read directly.
- Existing codebase — `public/__forms.html`: Current Netlify form registration. Confirmed `demo-request` form; new `contact-request` must be added. Read directly.
- Existing codebase — `src/components/marketing/Nav.tsx`: `/company` at line 70, `/contact` at line 100-102. Both pre-wired; no nav changes needed. Read directly.
- Existing codebase — `src/components/marketing/Footer.tsx`: `/company` and `/contact` pre-wired in footer. Read directly.
- Existing codebase — `src/components/marketing/shared/PageCtaSection.tsx`: Confirmed available and reusable for `CompanyCtaSection`. Read directly.
- Next.js v16.1.6 docs via Context7: `useSearchParams` API, Suspense boundary requirement for static rendering, `useRouter`/`usePathname`/`useSearchParams` import path. HIGH confidence.
- npm registry: `react-calendly` latest version = 4.4.0, peer deps `>=react 16.8.0`. Verified via `npm info react-calendly`.

### Secondary (MEDIUM confidence)

- react-calendly GitHub issue #105 (tcampb/react-calendly): `rootElement` pattern for Next.js — `typeof document !== 'undefined'` + `getElementById('__next') ?? document.body`. Multiple community confirmations.
- WebSearch / WebFetch — react-calendly `PopupWidget` props (`url`, `rootElement`, `text`, `textColor`, `color`). Consistent across multiple sources.

### Tertiary (LOW confidence)

- WebSearch — plain JS `window.Calendly.initPopupWidget` approach. Multiple sources agree on the API but official Calendly docs for this specific API were not directly fetched.

---

## Metadata

**Confidence breakdown:**
- Standard stack (Company page): HIGH — zero new packages; all existing dependencies confirmed
- New dependency (react-calendly): HIGH — verified version 4.4.0, peer deps compatible with React 19
- Route structure: HIGH — confirmed pre-wired in Nav and Footer; `(marketing)` group established
- Verbatim belief content: HIGH — read directly from `_archive/index.html`
- Calendly popup pattern: MEDIUM — `rootElement` guard pattern confirmed via GitHub issue + multiple sources; official Calendly docs not directly fetched
- `useSearchParams` + Suspense: HIGH — Next.js v16.1.6 Context7 docs confirmed requirement
- sessionStorage fallback: HIGH — standard Web API; no library needed
- Netlify form registration: HIGH — existing `__forms.html` pattern confirmed; add new entry is one-to-one extension

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (30 days — stable ecosystem; react-calendly and Next.js are not fast-moving at this version)
