---
phase: 02-homepage
verified: 2026-02-20T14:00:00Z
status: passed
score: 19/19 must-haves verified
re_verification: false
gaps: []
human_verification:
  - test: "CVV slot-machine animation — visual timing and stagger"
    expected: "CVV digits flip every ~4 seconds with visible staggered per-digit delay (80ms); card glow is teal and visible"
    why_human: "Animation timing and visual glow cannot be verified by static file inspection"
  - test: "Smooth-scroll from hero CTAs"
    expected: "'Request Demo' scrolls smoothly to #demo; 'See How It Works' scrolls smoothly to #audiences"
    why_human: "Browser behaviour; CSS scroll-behavior is set correctly but smooth-scroll feel requires a running browser"
  - test: "Demo form error state in dev"
    expected: "Submitting the form shows the inline error state ('Something went wrong...') because /__forms.html returns 404 in local dev"
    why_human: "Requires a running dev server and manual form submission"
  - test: "Netlify Forms capture in production"
    expected: "'demo-request' form appears in the Netlify dashboard Forms tab after first deploy with form detection enabled"
    why_human: "Requires a deployed environment and manual Netlify dashboard inspection"
  - test: "Mobile layout — Audiences cards stack"
    expected: "Three Audiences cards collapse to single-column vertical stack at narrow viewport; CVV card stacks below hero text"
    why_human: "Responsive layout requires browser viewport resizing to verify"
  - test: "Section colour alternation — visual contrast"
    expected: "Dark hero > bg-neutral Urgency > dark Audiences > dark OneIntegration > bg-neutral Proof > dark HumanCost > dark DemoForm"
    why_human: "Colour rendering requires visual browser inspection; DaisyUI semantic tokens resolve at runtime"
---

# Phase 02: Homepage Verification Report

**Phase Goal:** The primary conversion page is live, giving Heads of Fraud and Digital at card issuers a clear argument, social proof, and a way to request a demo or calculate value
**Verified:** 2026-02-20T14:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visiting `/` shows headline "Eliminate card-not-present fraud. Not reduce. Eliminate." above the fold | VERIFIED | `HeroSection.tsx` line 15: exact copy present in `<h1>` |
| 2 | The animated CVV card is visible right of headline on desktop, below on mobile | VERIFIED | `HeroSection.tsx` right column with `order-first lg:order-last`; `HeroCvvCard` imported and rendered |
| 3 | CVV digits flip slot-machine style every ~4 seconds with staggered per-digit delay | VERIFIED | `HeroCvvCard.tsx`: `CYCLE_MS=4000`, `setInterval(rotateCvv, CYCLE_MS)`, `transitionDelay: flipping ? \`${i * FLIP_STAGGER_MS}ms\`` — wiring confirmed |
| 4 | `clearInterval` cleanup is present — prevents double-speed in React Strict Mode | VERIFIED | `HeroCvvCard.tsx` line 31: `return () => clearInterval(id)` |
| 5 | The card has a teal glow matching the SafeCypher accent colour | VERIFIED | `HeroCvvCard.tsx` line 37: `<div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-accent" />` |
| 6 | "Request Demo" CTA (href="#demo") and "See How It Works" CTA (href="#audiences") present in hero | VERIFIED | `HeroSection.tsx` lines 22–27: both Links with correct hrefs |
| 7 | Smooth-scroll CSS active site-wide | VERIFIED | `globals.css` lines 10–12: `html { scroll-behavior: smooth; }` |
| 8 | `page.tsx` is a Server Component — no `'use client'` at top level | VERIFIED | `page.tsx` has no `'use client'`; imports all 7 sections and renders them directly |
| 9 | Urgency block presents CNP fraud statistics, agentic commerce threat, and static credentials as root cause | VERIFIED | `UrgencySection.tsx`: three body paragraphs; £8.4bn (primary) + 340% (error) stat card |
| 10 | Urgency primary CTA → #demo; secondary CTA → /portal/calculator | VERIFIED | Lines 52–57: `href="#demo"` and `href="/portal/calculator"` on both Links |
| 11 | Three Audiences strip (id="audiences") with Transactions / People / Agents cards | VERIFIED | `AudiencesSection.tsx` line 5: `id="audiences"`; three `card bg-base-200` blocks with inline SVGs, pitches, and links |
| 12 | Proof section displays "800,000+", "18 months", "Zero CNP fraud" headline stats | VERIFIED | `ProofSection.tsx` lines 31–43: all three stat values present |
| 13 | Proof section shows An Post logo placeholder (brand green) and Irish Fintech Award badge | VERIFIED | Lines 63–106: `style={{ color: "#006229" }}` An Post span; inline SVG star badge |
| 14 | Proof section links to /proof/an-post | VERIFIED | Line 50: `href="/proof/an-post"` |
| 15 | Human Cost section has emotionally weighted copy (not abstract metrics) and links to /company | VERIFIED | `HumanCostSection.tsx`: editorial paragraphs, "1 in 4" + "£360" pull stats, `href="/company"` line 63 |
| 16 | Demo form has six fields; posts to /__forms.html; success state replaces form inline | VERIFIED | `DemoFormSection.tsx`: 6 `Input`/`Textarea` fields with correct `name=` attrs; `fetch('/__forms.html', ...)` line 23; success branch renders "Thanks — we'll be in touch" |
| 17 | Demo form section has id="demo" for smooth-scroll from all CTAs | VERIFIED | Lines 45 and 68: `id="demo"` on `<section>` in both success and idle render paths |
| 18 | "See your estimated fraud prevention savings" link below form → /portal/calculator | VERIFIED | Lines 159–162: `<Link href="/portal/calculator">` outside `<form>` element |
| 19 | public/__forms.html exists with all six field names matching the React form | VERIFIED | `__forms.html`: name, role, company, email, phone, challenge — exact parity with DemoFormSection field `name=` attributes |

**Score:** 19/19 truths verified

---

## Required Artifacts

| Artifact | Min Lines | Status | Details |
|----------|-----------|--------|---------|
| `src/app/(marketing)/page.tsx` | — | VERIFIED | 21 lines; Server Component; imports all 7 sections; no `'use client'` |
| `src/components/marketing/home/HeroSection.tsx` | 30 | VERIFIED | 40 lines; split-layout grid; imports HeroCvvCard |
| `src/components/marketing/home/HeroCvvCard.tsx` | — | VERIFIED | 80 lines; `'use client'`; slot-machine animation with clearInterval cleanup |
| `src/app/globals.css` | — | VERIFIED | `scroll-behavior: smooth` present on `html` element |
| `src/components/marketing/home/UrgencySection.tsx` | 40 | VERIFIED | 65 lines; stat block, two CTAs |
| `src/components/marketing/home/AudiencesSection.tsx` | 50 | VERIFIED | 126 lines; id="audiences"; three audience cards with inline SVGs |
| `src/components/marketing/home/OneIntegrationSection.tsx` | 30 | VERIFIED | 84 lines; "Integrate once" headline; TSYS reference; architecture diagram placeholder |
| `src/components/marketing/home/ProofSection.tsx` | 40 | VERIFIED | 113 lines; three stats; An Post placeholder; award badge; /proof/an-post link |
| `src/components/marketing/home/HumanCostSection.tsx` | 35 | VERIFIED | 74 lines; "1 in 4" + "£360" pull stats; /company link |
| `src/components/marketing/home/DemoFormSection.tsx` | — | VERIFIED | 169 lines; `'use client'`; 6 fields; Netlify POST; success/error state; id="demo" |
| `src/components/ui/Input.tsx` | — | VERIFIED | DaisyUI v5 fieldset/fieldset-legend pattern; no `form-control` or `label-text` |
| `src/components/ui/Textarea.tsx` | — | VERIFIED | DaisyUI v5 fieldset/fieldset-legend pattern; exported from index.ts |
| `src/components/ui/index.ts` | — | VERIFIED | Exports Button, Card, CardBody, CardTitle, Badge, Input, Textarea |
| `public/__forms.html` | — | VERIFIED | Netlify form detection; `data-netlify="true"`; 6 fields with exact name parity |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `page.tsx` | `HeroSection.tsx` | named import | WIRED | `import { HeroSection } from '@/components/marketing/home/HeroSection'`; rendered as `<HeroSection />` |
| `HeroSection.tsx` | `HeroCvvCard.tsx` | named import of Client Component | WIRED | `import { HeroCvvCard }` line 2; `<HeroCvvCard />` line 33 |
| `HeroCvvCard.tsx` | `useEffect + setInterval` | clearInterval cleanup | WIRED | `const id = setInterval(rotateCvv, CYCLE_MS); return () => clearInterval(id)` |
| `AudiencesSection.tsx` | `section id="audiences"` | id prop on section | WIRED | `<section id="audiences" ...>` line 5 |
| `UrgencySection.tsx` | `/portal/calculator` | Next.js Link href | WIRED | `href="/portal/calculator"` line 55 |
| `UrgencySection.tsx` | `#demo` | Next.js Link href for primary CTA | WIRED | `href="#demo"` line 52 |
| `ProofSection.tsx` | `/proof/an-post` | Next.js Link href | WIRED | `href="/proof/an-post"` line 50 |
| `HumanCostSection.tsx` | `/company` | Next.js Link href | WIRED | `href="/company"` line 63 |
| `DemoFormSection.tsx` | `/__forms.html` | fetch POST in handleSubmit | WIRED | `fetch('/__forms.html', { method: 'POST', ... })` line 23 |
| `DemoFormSection.tsx` | form-name hidden input | Netlify form identification | WIRED | `<input type="hidden" name="form-name" value="demo-request" />` line 78 |
| `DemoFormSection.tsx` | `/portal/calculator` | Next.js Link below form | WIRED | `<Link href="/portal/calculator">` line 159; outside `<form>` element |
| `public/__forms.html` | `DemoFormSection.tsx` | field name parity — "challenge" | WIRED | `name="challenge"` in both `__forms.html` (line 12) and `DemoFormSection.tsx` (line 128) |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| HOME-01 | 02-01 | Hero section — headline, animated CVV card, primary CTA, secondary CTA (smooth scroll) | SATISFIED | `HeroSection.tsx` + `HeroCvvCard.tsx` fully implemented; exact headline copy verified; both CTAs present with correct hrefs |
| HOME-02 | 02-02 | Urgency block: CNP fraud statistics, agentic commerce threat, calculator CTA | SATISFIED | `UrgencySection.tsx`: £8.4bn + 340% stats; three argument paragraphs; /portal/calculator link |
| HOME-03 | 02-02 | Three Audiences strip — Transactions/People/Agents; icon + one-liner + link; mobile vertical stack | SATISFIED | `AudiencesSection.tsx`: three cards; inline SVG icons; pitches; links; `md:grid-cols-3` collapses to single column on mobile |
| HOME-04 | 02-02 | One Integration block — architecture diagram placeholder; "Integrate once" copy; TSYS note | SATISFIED | `OneIntegrationSection.tsx`: headline confirmed; nested-div diagram; TSYS reference line 34 |
| HOME-05 | 02-03 | Proof section: 800,000+ / 18 months / zero CNP fraud; An Post logo; Fintech Award badge; /proof/an-post link | SATISFIED | `ProofSection.tsx`: all three stats present; An Post brand green placeholder; award badge SVG; /proof/an-post Link |
| HOME-06 | 02-03 | Human Cost section: emotionally resonant fraud impact copy; link to Company page | SATISFIED | `HumanCostSection.tsx`: editorial copy; "1 in 4" + "£360" pull stats; /company Link confirmed |
| HOME-07 | 02-04 | CTA block: demo form (name, email, company, role + optional message); portfolio size teaser → /portal/calculator | SATISFIED | `DemoFormSection.tsx`: 6 fields (name, role, company, email, phone, challenge); Netlify POST wired; portfolio teaser Link outside form confirmed |

**Requirements coverage: 7/7 — all HOME-* requirements satisfied**

No orphaned requirements found. All HOME-01 through HOME-07 are claimed by plans 02-01 through 02-04 and verified in the codebase.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `OneIntegrationSection.tsx` | 41 | JSX comment: "architecture diagram placeholder" | Info | Expected — plan specified a placeholder div diagram; this is intentional interim design, not a stub |

No blockers. No stubs. No empty implementations. No `console.log`-only handlers. The one "placeholder" reference in OneIntegrationSection is a code comment describing intentional interim content (the architecture diagram will be replaced with a proper SVG in a later phase — consistent with plan spec).

---

## Human Verification Required

### 1. CVV Animation — Visual Timing and Stagger

**Test:** Open http://localhost:3000 in a browser and observe the animated CVV card in the hero section for at least 8 seconds
**Expected:** CVV digits flip every approximately 4 seconds; each digit column transitions with a visible stagger (left digit first, then middle, then right, 80ms apart); card glow is clearly teal/accent coloured
**Why human:** Animation timing and CSS transition rendering cannot be verified from static file inspection

### 2. Smooth-Scroll from Hero CTAs

**Test:** Click "Request Demo" and "See How It Works" in the hero section
**Expected:** "Request Demo" scrolls smoothly to the demo form at the bottom of the page; "See How It Works" scrolls smoothly to the Three Audiences section
**Why human:** Browser scroll behaviour; CSS `scroll-behavior: smooth` is verified set but the feel requires a running browser

### 3. Demo Form Error State (Dev)

**Test:** Run `npm run dev`, navigate to /, scroll to the demo form, fill all required fields, submit
**Expected:** An inline error message appears ("Something went wrong. Please try again or email us directly.") because `/__forms.html` returns 404 in local dev — the form does NOT redirect away
**Why human:** Requires a running dev server and a manual form submission

### 4. Netlify Forms Capture (Production)

**Test:** After deploying to Netlify (with form detection enabled), submit the demo form with real data; check Netlify dashboard → Forms tab
**Expected:** "demo-request" form appears; submission is captured with all six fields
**Why human:** Requires a deployed Netlify environment and Netlify dashboard access; user_setup in 02-04 PLAN documents the required manual step (enable form detection)

### 5. Mobile Layout — Responsive Verification

**Test:** Open / in a browser and resize to narrow viewport (< 768px)
**Expected:** Three Audiences cards collapse to a vertical single-column stack; CVV card stacks below the hero headline and CTAs (not beside them)
**Why human:** Responsive layout requires actual viewport resizing; Tailwind responsive classes are verified present (`md:grid-cols-3` on Audiences; `order-first lg:order-last` on hero card column) but rendering requires a browser

### 6. Section Colour Alternation

**Test:** Scroll through the full homepage and visually confirm section backgrounds alternate
**Expected:** Dark hero (bg-base-100) > lighter Urgency (bg-neutral) > dark Audiences (bg-base-100) > dark OneIntegration (bg-base-100) > lighter Proof (bg-neutral) > dark HumanCost (bg-base-100) > dark DemoForm (bg-base-100)
**Why human:** DaisyUI semantic colour tokens resolve at runtime; the classes are verified correct in code but actual contrast requires visual browser inspection

---

## Gaps Summary

No gaps. All 19 observable truths are verified against the actual codebase. All 14 required artifacts exist, are substantive (line counts exceed thresholds), and are wired. All 12 key links are verified present. All 7 requirements (HOME-01 through HOME-07) have implementation evidence.

The phase goal is achieved: the primary conversion page is live with a clear argument (Urgency block), social proof (Proof section + Human Cost), and a demo request form wired to Netlify Forms with a portfolio calculator deep-link.

---

_Verified: 2026-02-20T14:00:00Z_
_Verifier: Claude (gsd-verifier)_
