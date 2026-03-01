# Phase 2: Homepage - Research

**Researched:** 2026-02-20
**Domain:** Next.js App Router page composition + CSS animation + Netlify Forms + DaisyUI v5 forms
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Hero layout:** Split — headline + CTAs left, animated card right; mobile stacks vertically (card below headline)
- **Card animation:** Realistic payment card (dark, chip, card number, expiry, CVV); CVV digits flip slot-machine style; ~3–5 second cycle with pause between flips; NOT continuous
- **Card glow:** Teal/primary-color glow around the card
- **Section sequence (top to bottom):** Hero → Urgency block → Three Audiences strip → Proof → Human Cost → Demo form
- **Urgency block CTAs:** Primary = demo request; Secondary = calculator deep-link
- **Three Audiences cards:** Label + 1–2 sentence pitch per audience (Transactions, People, Agents)
- **Human Cost section:** Real human victim framing — emotional, personal statistics about cardholders who lose money
- **Demo form submission:** Netlify Forms — captured in Netlify dashboard, no backend
- **Demo form fields:** Name (required), Role (required), Company (required), Email (required), Phone (optional), "What's your biggest fraud challenge right now?" (optional textarea)
- **After submission:** Inline success state — form fades/replaces with 'Thanks — we'll be in touch' on same page
- **Portfolio teaser:** NOT a form field — 'See your estimated savings' link deep-links into portal calculator
- **Section color mapping:**
  - Hero → dark (bg-base-100)
  - Urgency block → light (bg-base-300 or off-white)
  - Three Audiences strip → dark (bg-base-100)
  - Proof section → light
  - Human Cost → dark
  - Demo form → dark
- **Section breaks:** Hard edges, no gradients, no angled dividers
- **Prior Phase 1 decisions:**
  - Next.js 16.1.6 App Router, TypeScript strict mode
  - DaisyUI v5 + Tailwind v4 CSS-only theme
  - Inline SVG icons (no CDN, SSR-safe)
  - Nav is Client Component (`'use client'`); marketing pages are Server Components
  - DaisyUI v5 button tokens: `--border: 0` + `--depth: 0`
  - Alternating section colors: dark/light with hard edges

### Claude's Discretion

- Exact animation timing, easing curves, and digit flip speed
- Card number and expiry copy on the realistic card (use placeholder values)
- Typography scale and spacing within sections
- Exact stat copy for the Three Audiences cards (research from existing brand copy)
- Layout specifics for the Proof section (logo placement, badge sizing)
- Error state handling for the demo form

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Hero section: headline, sub-headline, animated CVV card, primary CTA (Request Demo), secondary CTA (See How It Works — smooth scroll) | CSS keyframe slot-machine animation; `'use client'` Client Component for animation; Server Component page wraps it; smooth scroll via CSS `scroll-behavior: smooth` + anchor IDs |
| HOME-02 | Urgency block: CNP fraud statistics, agentic commerce attack surface, static credentials root cause argument, CTA to calculator | Server Component section; deep-link to `/portal/calculator` via Next.js `<Link>` with hash; no dynamic data needed |
| HOME-03 | Three Audiences strip: Transactions / People / Agents — icon + one-liner + link per audience; mobile vertical stack | Server Component; CSS grid/flex with `flex-col md:flex-row`; inline SVG icons per locked decision |
| HOME-04 | One Integration block: architecture diagram placeholder, "Integrate once. Unlock everything." copy, TSYS note | Server Component; placeholder `<div>` for architecture diagram; static copy |
| HOME-05 | Proof section: 800,000+ transactions / 18 months / zero CNP fraud stat, An Post logo, Irish Fintech Award badge, link to /proof/an-post | Server Component; static assets from `public/`; existing footer proof bar pattern can be adapted |
| HOME-06 | Human Cost section: emotionally resonant fraud impact copy, link to Company page | Server Component; static copy; no dynamic data |
| HOME-07 | CTA block: demo form (name, email, company, role + optional message), portfolio size teaser → /portal/calculator | Client Component (`'use client'`) for form state + Netlify Forms submission; `public/__forms.html` for deploy-time detection; inline success state via React state |
</phase_requirements>

---

## Summary

Phase 2 builds the homepage as a Next.js App Router page inside the existing `src/app/(marketing)/page.tsx`. The page is primarily a Server Component — a sequence of section components that render static HTML. Two sections require Client Components: the Hero (for the CVV animation interval) and the Demo Form (for controlled form state and Netlify Forms fetch submission). The correct architecture is to keep `page.tsx` as a Server Component and `import` the two Client Components as leaf nodes.

The most important technical finding is about **Netlify Forms with Next.js App Router**: because Next.js does not emit static HTML files, Netlify's build-time form detection cannot see React-rendered forms. The solution is a static `public/__forms.html` file that defines the form for Netlify's scanner. The visible form is a Client Component that POSTs to `/__forms.html` with `application/x-www-form-urlencoded` encoding. This is the officially documented pattern from OpenNext/Netlify docs.

The second key finding is the **DaisyUI v5 form-control breaking change**: the `form-control`, `label-text`, and `label-text-alt` classes no longer exist in v5. The existing `Input` component in `src/components/ui/Input.tsx` uses `form-control` and `label-text` — it will need a `Textarea` companion built with the new `fieldset`/`fieldset-legend`/`label` pattern. The existing `Input` component also needs updating, but that can be deferred — for Phase 2, build the `Textarea` correctly from the start using v5 patterns.

The CVV slot-machine animation is straightforward CSS: a fixed-height container with `overflow: hidden`, a column of digit characters that animates via `translateY`. Driven by a `useEffect` + `setInterval` in a Client Component. No third-party library needed.

**Primary recommendation:** Keep `page.tsx` as a Server Component. Extract `HeroCvvCard` and `DemoForm` as the two Client Component leaves. Define the CVV animation in `globals.css` via `@theme { --animate-cvv-flip: ...; @keyframes ... }`. Create `public/__forms.html` before deploying.

---

## Standard Stack

### Core (all already installed — no new packages needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router, SSR, routing | Already installed; Phase 1 foundation |
| react | 19.2.3 | UI layer, hooks for animation state | Already installed |
| daisyui | 5.5.18 | Component classes (btn, card, badge, fieldset, textarea) | Already installed; all section UI |
| tailwindcss | 4.x | Utility CSS + `@theme` for custom keyframes | Already installed |

### No New Dependencies

Phase 2 requires zero new npm packages. All animation is pure CSS keyframes defined in `globals.css` or `theme.css`. The CVV card is custom HTML/CSS (not a credit card library). Netlify Forms is a platform feature — no package needed.

**Why no credit card library:** Libraries like `react-credit-cards-2` are designed for payment forms (live input → card preview). The SafeCypher card is a decorative hero element demonstrating security code rotation — a custom SVG/CSS card is simpler, more controllable, and avoids ~15KB of unused JS.

### Alternatives Rejected

| Instead of | Could Use | Why Rejected |
|------------|-----------|--------------|
| Custom CSS animation | Framer Motion | Adds ~30KB JS; CSS keyframes sufficient for a single timed interval |
| Custom CSS animation | CSS counter + animation | Counter approach can't pause between cycles — timed JS interval gives the "real token refresh" feel the client specified |
| Custom card HTML/CSS | `react-credit-cards-2` | Library designed for form mirroring; adds 15KB for a static decorative element |
| Custom Netlify form fetch | `react-netlify-forms` npm | Thin wrapper adds dependency; the raw fetch pattern is 15 lines of code |

**Installation:** None required.

---

## Architecture Patterns

### Recommended File Structure for Phase 2

```
src/
├── app/
│   └── (marketing)/
│       └── page.tsx                    # Server Component — composes all sections
├── components/
│   ├── marketing/
│   │   └── home/                       # New subfolder for homepage section components
│   │       ├── HeroSection.tsx         # Server Component — layout wrapper
│   │       ├── HeroCvvCard.tsx         # 'use client' — animation state
│   │       ├── UrgencySection.tsx      # Server Component
│   │       ├── AudiencesSection.tsx    # Server Component
│   │       ├── OneIntegrationSection.tsx  # Server Component
│   │       ├── ProofSection.tsx        # Server Component
│   │       ├── HumanCostSection.tsx    # Server Component
│   │       └── DemoFormSection.tsx     # 'use client' — form state + Netlify fetch
│   └── ui/
│       └── Textarea.tsx                # New: DaisyUI v5 fieldset-based textarea
└── public/
    └── __forms.html                    # Netlify Forms detection file (new)
```

### Pattern 1: Server Component Page + Client Component Leaves

**What:** The marketing page is a Server Component. It imports and composes section components. Sections that need browser APIs or animation state are Client Components imported as leaf nodes — they do not wrap Server Components, they are the leaf.

**When to use:** Any section needing `useState`, `useEffect`, event handlers, or `setInterval`.

**Example:**
```tsx
// src/app/(marketing)/page.tsx — Server Component (no 'use client')
import { HeroSection } from '@/components/marketing/home/HeroSection'
import { UrgencySection } from '@/components/marketing/home/UrgencySection'
import { AudiencesSection } from '@/components/marketing/home/AudiencesSection'
import { OneIntegrationSection } from '@/components/marketing/home/OneIntegrationSection'
import { ProofSection } from '@/components/marketing/home/ProofSection'
import { HumanCostSection } from '@/components/marketing/home/HumanCostSection'
import { DemoFormSection } from '@/components/marketing/home/DemoFormSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UrgencySection />
      <AudiencesSection />
      <OneIntegrationSection />
      <ProofSection />
      <HumanCostSection />
      <DemoFormSection />
    </>
  )
}
```

### Pattern 2: CVV Slot-Machine Animation

**What:** A Client Component with a `useEffect` + `setInterval`. Each CVV digit is a fixed-height `span` container with `overflow: hidden`. Inside, a `div` containing 0–9 digits is translated vertically by `translateY(-{n * 100}%)` where n is the target digit. CSS transitions handle the smooth flip. Between cycles, a timed delay mimics "new token issued".

**When to use:** Hero section animated card component.

**Implementation approach (verified pattern):**

```tsx
// src/components/marketing/home/HeroCvvCard.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const CYCLE_MS = 4000       // time between new codes — Claude's discretion
const FLIP_STAGGER_MS = 80  // delay between individual digit flips — Claude's discretion

function randomDigit(): number {
  return Math.floor(Math.random() * 10)
}

function generateCvv(): [number, number, number] {
  return [randomDigit(), randomDigit(), randomDigit()]
}

export function HeroCvvCard() {
  const [cvv, setCvv] = useState<[number, number, number]>([4, 2, 7])
  const [flipping, setFlipping] = useState(false)

  const rotateCvv = useCallback(() => {
    setFlipping(true)
    // Stagger complete: update digits after transition time
    setTimeout(() => {
      setCvv(generateCvv())
      setFlipping(false)
    }, 600) // transition duration — Claude's discretion
  }, [])

  useEffect(() => {
    const id = setInterval(rotateCvv, CYCLE_MS)
    return () => clearInterval(id)
  }, [rotateCvv])

  return (
    <div className="relative mx-auto w-80 select-none" aria-hidden="true">
      {/* Card glow — teal accent per locked decision */}
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-accent" />

      {/* Card body */}
      <div className="relative rounded-2xl bg-neutral p-6 shadow-2xl border border-neutral-content/10">
        {/* Chip */}
        <div className="mb-6 h-8 w-12 rounded bg-warning/80" />

        {/* Card number */}
        <p className="mb-4 font-mono text-sm tracking-widest text-neutral-content/60">
          4539 •••• •••• 7821
        </p>

        {/* Expiry */}
        <p className="mb-6 font-mono text-xs text-neutral-content/40">
          EXPIRES 12/28
        </p>

        {/* CVV label + animated digits */}
        <div className="flex items-end justify-between">
          <span className="text-xs uppercase tracking-wider text-neutral-content/40">CVV</span>
          <div className="flex gap-1" role="status" aria-label="Security code updating">
            {cvv.map((digit, i) => (
              <div
                key={i}
                className="relative h-8 w-6 overflow-hidden rounded text-center"
              >
                <div
                  className="absolute flex flex-col transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateY(-${digit * 10}%)`,
                    transitionDelay: flipping ? `${i * FLIP_STAGGER_MS}ms` : '0ms',
                  }}
                >
                  {DIGITS.map((d) => (
                    <span
                      key={d}
                      className="flex h-8 w-6 items-center justify-center font-mono text-lg font-bold text-primary"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Animation CSS approach:** Inline `transform: translateY` driven by React state. This avoids defining `@keyframes` for the digit flip (since each digit lands on a random target, CSS-only keyframes cannot target a dynamic value). The CSS transition handles the smooth movement.

**Alternative @keyframes approach** (for the glow pulse, not the digit flip):
```css
/* In globals.css or theme.css — for the card glow breathing effect */
@theme {
  --animate-glow-pulse: glow-pulse 3s ease-in-out infinite;

  @keyframes glow-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.05); }
  }
}
```
Usage: `<div className="animate-glow-pulse" />`

### Pattern 3: Netlify Forms — Static File + Client Component

**What:** Deploy-time form detection requires a static HTML file in `public/`. The React form POSTs to that file path.

**Why:** Next.js App Router does not emit static HTML pages, so Netlify's build scanner cannot detect forms in React components. The `public/__forms.html` file is the detection target only — users never see it.

**Critical requirement:** All field `name` attributes must match exactly between `__forms.html` and the React component.

```html
<!-- public/__forms.html — detection only, not user-facing -->
<html>
  <head></head>
  <body>
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
  </body>
</html>
```

```tsx
// src/components/marketing/home/DemoFormSection.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function DemoFormSection() {
  const [formState, setFormState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      })

      if (res.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <section id="demo" className="bg-base-100 py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold text-base-content mb-4">Thanks — we'll be in touch.</h2>
          <p className="text-base-content/60">
            Expect a reply within one business day.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="demo" className="bg-base-100 py-24">
      <div className="mx-auto max-w-xl px-4">
        <form name="demo-request" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="demo-request" />
          {/* Fields rendered here using Textarea + Input components */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={formState === 'submitting'}
          >
            Request Demo
          </Button>
        </form>
      </div>
    </section>
  )
}
```

**URLSearchParams + FormData caveat:** The `new URLSearchParams(formData)` cast works in modern browsers. TypeScript may complain — the `as unknown as Record<string, string>` cast is the documented workaround or use `Object.fromEntries(formData)`.

### Pattern 4: DaisyUI v5 Form Fields (Textarea — NEW component needed)

**What:** `form-control`, `label-text`, and `label-text-alt` no longer exist in DaisyUI v5. The existing `Input` component (`src/components/ui/Input.tsx`) uses these deprecated classes. For Phase 2, a new `Textarea` component must use the v5 `fieldset`/`label` pattern. The existing `Input` component works visually but should be noted as needing a future refactor.

**v5 pattern for textarea:**
```tsx
// src/components/ui/Textarea.tsx — NEW component
import { type TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
  fullWidth?: boolean
  rows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helpText, fullWidth = false, rows = 4, className = '', id, ...props }, ref) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <fieldset className={['fieldset', fullWidth ? 'w-full' : ''].filter(Boolean).join(' ')}>
        {label && (
          <legend className="fieldset-legend">{label}</legend>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          className={[
            'textarea',
            'w-full',
            error ? 'textarea-error' : '',
            className,
          ].filter(Boolean).join(' ')}
          {...props}
        />
        {(error ?? helpText) && (
          <p className={`label text-sm ${error ? 'text-error' : 'text-base-content/60'}`}>
            {error ?? helpText}
          </p>
        )}
      </fieldset>
    )
  }
)

Textarea.displayName = 'Textarea'
```

**Note on existing `Input` component:** The existing `Input` uses `form-control`, `label-text`, `label-text-alt` — all removed in DaisyUI v5. Styles will silently not apply. For Phase 2 form fields, either update `Input` to use the v5 `fieldset` pattern or scope the fix to Phase 2 only by writing the form inputs inline. Recommendation: update `Input.tsx` to v5 pattern while building the form (minimal extra scope).

### Pattern 5: Alternating Dark/Light Sections

**What:** Each section is a `<section>` element with explicit background class. Hard CSS boundary — no gradient. The dark/light mapping is locked by CONTEXT.md.

**Color mapping to DaisyUI tokens (from existing theme.css):**
- Dark sections → `bg-base-100` (oklch 10% — near black)
- Light sections → Use `bg-base-300` + add `[data-theme="safecypher-light"]` switching, OR use a hardcoded off-white. Since the site is dark-first with no theme toggle, the "light" sections should use a slightly elevated base. The existing theme has `--color-base-300: oklch(18% ...)` which is still quite dark. For true off-white contrast on the dark theme, use `bg-neutral` or a custom class.

**Recommendation for light sections in dark theme:** Define a `--color-surface-light` token in `theme.css` that maps to a noticeably lighter value (e.g., `oklch(20% 0.01 260)`) for the dark theme, and `oklch(97% 0.005 260)` for the light theme. This gives genuine contrast on the dark theme without fighting DaisyUI's base tokens.

**Alternative (simpler, Phase 2 scope):** Use `bg-base-200` for "light" sections — it's the subtle mid-tone. This is lower contrast than a true alternating layout but avoids token additions.

### Pattern 6: Smooth Scroll for "See How It Works" CTA

**What:** The hero secondary CTA scrolls to a section anchor. App Router `<Link href="#audiences">` does work for in-page anchors, but smooth scroll requires a CSS declaration.

```css
/* Add to globals.css */
html {
  scroll-behavior: smooth;
}
```

Target sections get an `id` prop: `<section id="how-it-works">` or `<section id="audiences">`.

```tsx
// In HeroSection — secondary CTA
<Link href="#audiences" className="btn btn-ghost">See How It Works</Link>
```

**Known issue:** Next.js App Router has a documented behavior where `<Link>` with hash updates the URL but may not scroll reliably in some configurations. Adding `scroll-behavior: smooth` to `html` is the simplest fix. If it fails, fall back to `onClick={() => document.getElementById('audiences')?.scrollIntoView({ behavior: 'smooth' })}` in a Client Component.

### Pattern 7: Section with Max-Width Container

**What:** Every section follows the same container pattern established in the Nav — `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.

```tsx
// Reusable pattern
<section className="bg-base-100 py-24 lg:py-32">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>
```

### Anti-Patterns to Avoid

- **Marking `page.tsx` as `'use client'`:** This kills SSR for the entire page. Only leaf components that need browser APIs get `'use client'`.
- **Using `form-control`, `label-text`, `label-text-alt` in new components:** These classes don't exist in DaisyUI v5 — styles silently absent.
- **Posting form to `"/"` instead of `"/__forms.html"`:** The OpenNext docs explicitly say to POST to the static file path, not the page root. Posting to `/` may work in some contexts but is not the documented pattern.
- **Defining `data-netlify="true"` in the React form only:** Without `public/__forms.html`, Netlify's build scanner won't detect the form; submissions will 404 on Netlify.
- **Animating all three CVV digits simultaneously with the same delay:** The staggered flip (each digit flips slightly after the previous) creates a more mechanical, realistic slot-machine feel. Zero stagger looks like a simple state swap.
- **`setInterval` without cleanup:** Always return `() => clearInterval(id)` from the `useEffect` to prevent memory leaks and duplicate intervals on React strict mode double-invocation.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom regex + error state per field | HTML5 `required` + `type="email"` attributes | Browser native validation is accessible, zero JS, handles most cases for a lead-gen form |
| Spam protection | Custom honeypot field | Netlify's built-in spam filtering (enabled automatically for Netlify Forms) | Netlify Forms has bot detection + optional CAPTCHA via Netlify dashboard |
| CVV digit animation | CSS-only counter animation | `useState` + `setInterval` + inline `transform` | CSS-only approach cannot target a random digit; JS-driven state is needed for dynamic targets |
| Card glow | Complex WebGL/canvas | `box-shadow` + `blur` utility | Pure CSS is sufficient for a soft ambient glow; no canvas needed |
| Section scroll indicator | Intersection Observer scroll tracking | CSS `scroll-behavior: smooth` + anchor `id` | The secondary CTA is a one-time scroll trigger, not a scroll-tracking component |

**Key insight:** The homepage is primarily static marketing copy. Resist pulling in animation libraries (Framer Motion, GSAP) for a single animated card element that a 50-line CSS + `useEffect` pattern handles cleanly.

---

## Common Pitfalls

### Pitfall 1: Netlify Forms Not Detected (Forms Tab Empty in Netlify Dashboard)

**What goes wrong:** Form submissions return 404 or the form doesn't appear in Netlify's Forms tab.

**Why it happens:** Netlify's build-time scanner cannot find `data-netlify="true"` because Next.js App Router doesn't emit static HTML files.

**How to avoid:**
1. Create `public/__forms.html` with ALL form fields before deploying
2. Ensure field `name` attributes match exactly between `__forms.html` and React component
3. Include `<input type="hidden" name="form-name" value="demo-request" />` in the React form
4. POST to `/__forms.html` not `"/"` in the fetch call

**Warning signs:** Netlify dashboard Forms tab shows no forms after deployment; fetch POST returns 404 or 200 but no entry in dashboard.

### Pitfall 2: DaisyUI v5 `form-control` / `label-text` Classes Missing

**What goes wrong:** Input and textarea fields render without DaisyUI label styling — labels look like plain text with no spacing or structure.

**Why it happens:** `form-control`, `label-text`, and `label-text-alt` were removed in DaisyUI v5. The existing `Input` component uses these classes.

**How to avoid:** For Phase 2, use the new `fieldset` + `fieldset-legend` + `label` pattern for all new form components. Consider updating `Input.tsx` to v5 pattern at the same time.

**Warning signs:** Form labels appear unstyled despite `label-text` class being present; form layout looks broken.

### Pitfall 3: CVV Animation Runs on Server (SSR Error)

**What goes wrong:** `setInterval` or `window` reference in animation component causes a server-side error.

**Why it happens:** Forgetting `'use client'` on the animation component, or importing a Client Component incorrectly.

**How to avoid:** `HeroCvvCard.tsx` MUST have `'use client'` at the top. Only import it from a Server Component (not from another Client Component that wraps Server Components).

**Warning signs:** `ReferenceError: window is not defined` during build; `useEffect` not available error.

### Pitfall 4: URLSearchParams Doesn't Serialize FormData in All Browsers

**What goes wrong:** Form submission to Netlify sends empty data despite `new URLSearchParams(formData)`.

**Why it happens:** `URLSearchParams` constructor accepting `FormData` is widely supported (Chrome 60+, Firefox 44+, Safari 10.1+) but the TypeScript type definition doesn't accept `FormData` directly — causing a compile error or runtime issue if using the wrong approach.

**How to avoid:**
```ts
// Safe cross-browser pattern:
body: new URLSearchParams(Object.fromEntries(formData) as Record<string, string>).toString()
```

**Warning signs:** TypeScript error on `new URLSearchParams(formData)`; form data arrives empty in Netlify dashboard.

### Pitfall 5: Alternating Section Colors Not Visible in Dark Theme

**What goes wrong:** "Light" sections (`bg-base-300` in the dark theme) are barely distinguishable from dark sections (`bg-base-100`) because the dark theme's `base-300` is `oklch(18%)` — still very dark.

**Why it happens:** The dark theme has compressed base-color range; `base-100` (10%) and `base-300` (18%) are close in perceived lightness.

**How to avoid:** For the "light" sections in the dark theme, use `bg-neutral` (oklch 25%) for slightly more contrast, or add a dedicated `--color-surface-alt` token to `theme.css`. The goal is visible section delineation, not true light/dark inversion. Alternatively: use a subtle top/bottom `border-t border-base-300` at section edges to signal the break even if the background difference is subtle.

**Warning signs:** Section boundaries invisible on the deployed dark theme; page looks like one long block.

### Pitfall 6: setInterval Memory Leak in React Strict Mode

**What goes wrong:** In development (React Strict Mode), effects run twice. Two intervals fire simultaneously, causing double-speed animation.

**Why it happens:** Strict Mode intentionally double-invokes effects to surface cleanup bugs. Without `clearInterval` in the cleanup return, two intervals accumulate.

**How to avoid:**
```ts
useEffect(() => {
  const id = setInterval(rotateCvv, CYCLE_MS)
  return () => clearInterval(id) // REQUIRED
}, [rotateCvv])
```

**Warning signs:** CVV digits flip twice as fast in development; animation appears smooth in production but erratic in dev.

### Pitfall 7: Smooth Scroll Anchor Link Not Scrolling

**What goes wrong:** `<Link href="#demo">` updates the URL hash but the page doesn't scroll to `#demo`.

**Why it happens:** Next.js App Router hash navigation works but requires `scroll-behavior: smooth` in CSS, AND the target element must have the matching `id` attribute.

**How to avoid:**
- Add `html { scroll-behavior: smooth; }` to `globals.css`
- Ensure target section has `id="demo"` (no `#` prefix in the `id`)
- If still broken, use a client-side `onClick` handler with `element.scrollIntoView()`

---

## Code Examples

Verified patterns from official sources:

### Netlify Forms: Static Detection File

```html
<!-- public/__forms.html — source: https://opennext.js.org/netlify/forms -->
<html>
  <head></head>
  <body>
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
  </body>
</html>
```

### Netlify Forms: React Client Component fetch submission

```tsx
// Source: https://opennext.js.org/netlify/forms
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)

  await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(
      Object.fromEntries(formData) as Record<string, string>
    ).toString(),
  })
}
```

### Tailwind v4 Custom Animation in @theme

```css
/* Source: https://tailwindcss.com/docs/animation */
/* In globals.css or theme.css */
@theme {
  --animate-glow-pulse: glow-pulse 3s ease-in-out infinite;

  @keyframes glow-pulse {
    0%, 100% { opacity: 0.3; }
    50%       { opacity: 0.55; }
  }
}
```
Usage: `<div className="animate-glow-pulse" />`

### DaisyUI v5 Textarea with fieldset

```tsx
// Source: https://daisyui.com/components/textarea/
<fieldset className="fieldset w-full">
  <legend className="fieldset-legend">What's your biggest fraud challenge?</legend>
  <textarea
    className="textarea w-full h-24"
    name="challenge"
    placeholder="Optional — helps us prepare for the call"
  />
</fieldset>
```

### DaisyUI v5 Input with fieldset (v5 correct pattern)

```tsx
// Source: https://daisyui.com/components/input/
<fieldset className="fieldset w-full">
  <legend className="fieldset-legend">Full Name <span className="text-error">*</span></legend>
  <input
    type="text"
    name="name"
    className="input w-full"
    placeholder="Jane Smith"
    required
  />
</fieldset>
```

### setInterval with cleanup (React hook)

```tsx
// Source: https://react.dev/reference/react/useEffect
useEffect(() => {
  const intervalId = setInterval(() => {
    setCvv(generateCvv())
  }, 4000)

  return () => clearInterval(intervalId)  // cleanup required
}, [])
```

### CSS Card Glow (box-shadow approach)

```css
/* Teal glow using accent token from existing theme */
/* --color-accent: oklch(70% 0.18 195) — teal */
.card-glow {
  box-shadow:
    0 0 20px 4px oklch(70% 0.18 195 / 0.25),
    0 0 60px 10px oklch(70% 0.18 195 / 0.1);
}
```

Or with Tailwind utility (inline):
```tsx
<div className="rounded-2xl shadow-[0_0_30px_6px_oklch(70%_0.18_195_/_0.25)]">
```

### Smooth Scroll Global CSS

```css
/* Add to globals.css — source: MDN / Next.js docs */
html {
  scroll-behavior: smooth;
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `form-control` / `label-text` / `label-text-alt` | `fieldset` / `fieldset-legend` / `label` | DaisyUI v5 (2025) | Existing `Input` component uses removed classes; new form fields must use v5 pattern |
| Netlify Forms via `data-netlify="true"` on React form | Static `public/__forms.html` + Client Component fetch | Next.js App Router era | Detection only works via static file; React renders the form |
| Custom animation library (Framer Motion etc.) | CSS `@keyframes` + `@theme` + `transition` via inline style | Tailwind v4 `@theme` (2025) | Zero-dep animations for simple cases |
| `setInterval` with ref (Dan Abramov pattern) | `useCallback` + `useEffect` with cleanup | React 19 hooks stable | Standard pattern; useEffect event (`useEffectEvent`) is an experimental future option |

**Deprecated/outdated:**
- `form-control` (DaisyUI class): removed in v5 — use `fieldset`
- `label-text` / `label-text-alt` (DaisyUI classes): removed in v5 — use `legend` and `label` with `p.label`
- `btn-group` / `input-group` (DaisyUI classes): removed in v5 — use `join`

---

## Open Questions

1. **Proof section: An Post logo availability**
   - What we know: Footer references "An Post" proof stat (text only); CONTEXT.md mentions An Post logo + Irish Fintech Award badge
   - What's unclear: Whether SVG/PNG assets for An Post logo and the Fintech Award badge exist in the project's `public/` directory
   - Recommendation: Planner should add a task to check `public/` for existing assets; if absent, use styled text placeholder "An Post" in the An Post brand green (`#006229`) and a star-icon badge placeholder (as currently done in Footer). Do not block on asset delivery.

2. **Light section color contrast on dark theme**
   - What we know: `bg-base-300` (oklch 18%) vs `bg-base-100` (oklch 10%) gives only 8% lightness difference — barely perceptible
   - What's unclear: Whether the client wants a true dark/off-white alternation on both light and dark themes, or accepts that the dark theme has subtle section breaks
   - Recommendation: Implement `bg-neutral` (`oklch(25%)`) for "light" sections on the dark theme as a Phase 2 default. Add `border-t border-base-300` at section tops for extra delineation. Flag for design review if contrast is insufficient.

3. **Existing `Input.tsx` component — update or leave?**
   - What we know: `Input.tsx` uses `form-control`, `label-text`, `label-text-alt` — all removed in DaisyUI v5; the component renders but labels are unstyled
   - What's unclear: Whether Phase 2 should update `Input.tsx` in scope or defer
   - Recommendation: Update `Input.tsx` to v5 `fieldset` pattern as part of building the demo form — it's the same component being used in the form and the fix is ~10 lines. Don't ship a form section with broken input styling.

4. **URLSearchParams TypeScript compatibility**
   - What we know: `new URLSearchParams(formData)` causes TypeScript strict-mode error; workaround exists via `Object.fromEntries`
   - What's unclear: Whether `Object.fromEntries(formData)` handles file inputs (not needed here — no file fields)
   - Recommendation: Use `Object.fromEntries(formData) as Record<string, string>` — safe for text/email/tel/textarea fields.

5. **Netlify Forms enable form detection — dashboard setting**
   - What we know: Netlify Forms requires "Form detection" to be enabled in the dashboard (Forms > Enable form detection), in addition to the static HTML file
   - What's unclear: Whether this is enabled by default or requires manual activation for this site
   - Recommendation: Add a verification step in the plan to check the Netlify dashboard Forms setting after first deploy. If forms aren't appearing, enable form detection in the dashboard.

---

## Sources

### Primary (HIGH confidence)
- https://opennext.js.org/netlify/forms — Complete Netlify Forms + Next.js App Router pattern; static HTML file requirement; fetch POST to `/__forms.html`
- https://docs.netlify.com/manage/forms/setup/ — Official Netlify Forms setup; attributes, detection, success states
- https://daisyui.com/docs/upgrade/?lang=en — DaisyUI v5 upgrade guide; `form-control` removal; `fieldset` replacement
- https://daisyui.com/components/textarea/ — v5 textarea classes; fieldset pattern
- https://daisyui.com/components/input/ — v5 input classes; fieldset + label pattern
- https://tailwindcss.com/docs/animation — Tailwind v4 `@theme` custom animation syntax; `--animate-*` variables; `@keyframes` inside `@theme`
- https://react.dev/reference/react/useEffect — setInterval + cleanup pattern; strict mode double-invocation

### Secondary (MEDIUM confidence)
- https://answers.netlify.com/t/netlify-forms-in-next-js-14-app-router/115269 — Community confirmation: POST to `"/"` vs `"/__forms.html"`; missing submit button in static form gotcha
- https://nextjs.org/docs/app/getting-started/server-and-client-components — Server/Client composition pattern; leaf node Client Components
- https://nextjs.org/docs/messages/missing-data-scroll-behavior — Next.js scroll behavior with App Router; `scroll-behavior: smooth` CSS approach
- CSS glow pattern — Multiple sources confirm `box-shadow` with `oklch()` color values is the standard dark-theme glow approach

### Tertiary (LOW confidence)
- Medium article (paywalled — 403): slot-machine React component pattern. Core technique (overflow:hidden + translateY) confirmed by multiple sources; confidence in implementation is MEDIUM (verified via CSS-Tricks, GitHub gists)
- CSS glow examples from freefrontend.com, testmu.ai — General patterns only; specific OKLCH values adapted from project's existing theme

---

## Metadata

**Confidence breakdown:**
- Netlify Forms approach: HIGH — verified via official OpenNext/Netlify docs; forum confirmation
- CVV animation technique: MEDIUM-HIGH — overflow:hidden + translateY is a well-established pattern; specific React implementation adapted from known patterns
- DaisyUI v5 form changes: HIGH — verified via official DaisyUI upgrade guide and component docs
- Tailwind v4 @theme animation: HIGH — verified via official Tailwind animation docs
- Section color contrast: LOW — visual judgment call; requires design review at implementation time
- Smooth scroll in App Router: MEDIUM — CSS approach works; JS fallback documented for edge cases

**Research date:** 2026-02-20
**Valid until:** 2026-03-20 (30 days — stable ecosystem; Netlify Forms API is stable)
