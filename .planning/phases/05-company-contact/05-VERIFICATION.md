---
phase: 05-company-contact
verified: 2026-02-21T12:30:00Z
status: human_needed
score: 7/7 must-haves verified
re_verification: false
human_verification:
  - test: "Navigate to /company in a browser and verify all six sections render visually end-to-end with no blank sections or console errors"
    expected: "Hero (serif italic), Mission (blockquote + Irish Fintech Award), Beliefs (5 numbered cards), Human Cost (2 border-error stats), Team (6 silhouette cards, 3-col desktop), CTA (shared PageCtaSection)"
    why_human: "Server Component rendering and visual layout cannot be verified from static file analysis"
  - test: "Click the 'Company' link in the nav — confirm it navigates to /company"
    expected: "/company page loads with full content"
    why_human: "Navigation interaction requires browser"
  - test: "Click 'Request Demo' button in the nav — confirm it navigates to /contact"
    expected: "/contact page loads with the form and Calendly button visible"
    why_human: "Navigation interaction requires browser"
  - test: "Visit /contact?from=calculator — confirm heading reads 'Talk to us about your results' and the submit button also reads 'Talk to us about your results'"
    expected: "Both h1 and the Button component reflect the calculator source"
    why_human: "useSearchParams + useMemo runtime behavior cannot be verified statically"
  - test: "Visit /contact?from=product — confirm heading reads 'Request a demo'"
    expected: "Default copy applied for the product source"
    why_human: "Runtime behavior"
  - test: "Visit /contact?from=calculator, navigate to /, then navigate back to /contact (no ?from param) — confirm heading still reads 'Talk to us about your results'"
    expected: "sessionStorage persistence retains the source across navigation within the same session"
    why_human: "sessionStorage state cannot be verified from static analysis"
  - test: "Click the Calendly 'Book a time' button on /contact — confirm the Calendly popup opens (even with placeholder URL)"
    expected: "PopupWidget from react-calendly renders an overlay/popup"
    why_human: "react-calendly PopupWidget is a client-side component requiring browser rendering"
  - test: "Submit the contact form with valid data on a Netlify deployment — confirm Netlify receives the contact-request submission"
    expected: "Form data appears in the Netlify Forms dashboard under contact-request"
    why_human: "Netlify form detection only works in a Netlify build/deployment environment, not local dev"
---

# Phase 5: Company + Contact Verification Report

**Phase Goal:** Supporting pages that build trust (Company/About) and capture leads (Contact/Request Demo) are live and accessible from the nav
**Verified:** 2026-02-21T12:30:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

All automated checks passed across seven observable truths and all artifacts. Human verification is required for runtime behavior (routing, form submission, sessionStorage, Calendly popup) that cannot be confirmed through static file analysis.

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|----------|
| 1 | A visitor can navigate to /company and read a mission statement with 'eliminate fraud' framing | VERIFIED | `CompanyMissionSection.tsx` contains verbatim blockquote "Zero fraud. Not reduced. Eliminated." with Elimination framing throughout; route exists at `src/app/(marketing)/company/page.tsx` |
| 2 | All five beliefs are visible as numbered cards with verbatim text from the archive | VERIFIED | `CompanyBeliefsSection.tsx` lines 1–7 define `const beliefs` with all five exact entries: "Don't reduce. Eliminate." / "Dynamic data. Applied intelligence." / "Nothing there. Nothing to steal." / "Not probability, but certainty." / "Easier for users. Impossible for fraudsters." — no paraphrasing |
| 3 | The Human Cost section renders with dedicated copy distinct from the homepage variant | VERIFIED | `CompanyHumanCostSection.tsx` is a self-contained file with no import from `home/HumanCostSection.tsx`; contains two `border-error` pull stats (£1.2bn, 60%); CTA links to `/contact` not `/#demo` |
| 4 | A 3-column team grid shows 6 placeholder members with silhouette headshots, names, titles, and 1-line bios | VERIFIED | `CompanyTeamSection.tsx`: `const team` array has 6 entries; inline `PersonSilhouette` SVG (`viewBox="0 0 80 80"`, `aria-hidden`); grid is `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8` |
| 5 | The page ends with a shared CTA section linking to the calculator and demo | VERIFIED | `CompanyCtaSection.tsx` is a 4-line thin wrapper importing and rendering `PageCtaSection` from `@/components/marketing/shared/PageCtaSection` |
| 6 | A visitor can navigate to /contact and see a form with name, email, company, role, and optional message fields | VERIFIED | `ContactFormSection.tsx` renders all five fields: `name` (required), `role` (required), `company` (required), `email` type=email (required), `message` textarea (optional) |
| 7 | Source-awareness: ?from=calculator → "Talk to us about your results"; ?from=product or no param → "Request a demo"; sessionStorage persists within session | VERIFIED | `ContactFormSection.tsx`: `COPY` record defined (lines 13–17); `useMemo` derives source from `useSearchParams().get('from')` with `isValidSource` guard; `useEffect` writes to `sessionStorage.setItem('contactSource', source)` |

**Score:** 7/7 truths verified (automated)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/(marketing)/company/page.tsx` | /company route — Server Component compositor | VERIFIED | Exists, 26 lines; no `'use client'`; imports and renders all 6 sections in correct order; exports `metadata` |
| `src/components/marketing/company/CompanyBeliefsSection.tsx` | Five numbered belief cards with verbatim archive text | VERIFIED | 37 lines; all 5 beliefs at module scope with exact text; ghost mono numerals; 3-col grid |
| `src/components/marketing/company/CompanyHumanCostSection.tsx` | Dedicated Human Cost variant — not imported from home/ | VERIFIED | 85 lines; standalone file; 2 `border-error` pull stats; `/contact` CTA; no import from `home/` |
| `src/components/marketing/company/CompanyTeamSection.tsx` | 3-column team grid with 6 placeholder members and SVG silhouettes | VERIFIED | 87 lines; 6 TeamMember entries; inline `PersonSilhouette` SVG; grid confirmed |
| `src/components/marketing/company/CompanyCtaSection.tsx` | Thin wrapper over shared PageCtaSection | VERIFIED | 5 lines; single import + single render of `PageCtaSection` |
| `src/app/(marketing)/contact/page.tsx` | /contact route — Server Component shell with Suspense wrapper | VERIFIED | 16 lines; `Suspense` wraps `ContactFormSection`; exports `metadata` |
| `src/components/marketing/contact/ContactFormSection.tsx` | Source-aware form — useSearchParams + sessionStorage + Netlify submission | VERIFIED | 183 lines; `useSearchParams`, `useMemo`, `sessionStorage`, `fetch('/__forms.html', { method: 'POST' })`; all 5 fields present |
| `src/components/marketing/contact/ContactCalendlyButton.tsx` | Calendly PopupWidget — 'use client' | VERIFIED | 22 lines; `'use client'` directive; `react-calendly@^4.4.0` in package.json; `PopupWidget` rendered |
| `public/__forms.html` | Netlify build-time form detection — both forms registered | VERIFIED | Contains `name="demo-request"` and `name="contact-request"` with field names: name, role, company, email, message |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/app/(marketing)/company/page.tsx` | `src/components/marketing/company/*` | Named imports of all 6 sections | WIRED | Lines 2–7: imports CompanyHeroSection, CompanyMissionSection, CompanyBeliefsSection, CompanyHumanCostSection, CompanyTeamSection, CompanyCtaSection — all rendered in JSX |
| `src/components/marketing/company/CompanyCtaSection.tsx` | `src/components/marketing/shared/PageCtaSection.tsx` | re-export wrapper | WIRED | `import { PageCtaSection } from '@/components/marketing/shared/PageCtaSection'`; renders `<PageCtaSection />` |
| `src/app/(marketing)/contact/page.tsx` | `src/components/marketing/contact/ContactFormSection.tsx` | Suspense-wrapped import | WIRED | `import { ContactFormSection }` at line 3; rendered inside `<Suspense>` boundary at lines 12–14 |
| `src/components/marketing/contact/ContactFormSection.tsx` | `src/components/marketing/contact/ContactCalendlyButton.tsx` | import and render in right column | WIRED | `import { ContactCalendlyButton } from './ContactCalendlyButton'` at line 8; rendered at line 176 in right column |
| `src/components/marketing/contact/ContactFormSection.tsx` | `public/__forms.html` | fetch POST with form-name: contact-request | WIRED | `fetch('/__forms.html', { method: 'POST' })`; `form name="contact-request"` with hidden `form-name` field; field names match __forms.html registration |
| `src/components/marketing/Nav.tsx` | `/company` | `Link href="/company"` | WIRED | Line 70: `<Link href="/company" className="btn btn-ghost text-base font-medium">Company</Link>` |
| `src/components/marketing/Nav.tsx` | `/contact` | `Link href="/contact"` (Request Demo CTA) | WIRED | Lines 100–103: `<Link href="/contact"><Button variant="primary" size="md">Request Demo</Button></Link>` |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| COMP-01 | 05-01-PLAN.md | Mission section: "eliminate fraud" framing | SATISFIED | `CompanyMissionSection.tsx`: blockquote "Zero fraud. Not reduced. Eliminated."; prose uses "Elimination is [the goal]" multiple times; Irish Fintech Awards 2025 reference |
| COMP-02 | 05-01-PLAN.md | Human Cost section: fraud is not a line item — parents, children, elderly, psychological damage | SATISFIED | `CompanyHumanCostSection.tsx`: dedicated standalone component; covers elderly targeting, psychological impact, family savings, small business chargebacks; links to `/contact` |
| COMP-03 | 05-01-PLAN.md | Beliefs section: five beliefs migrated verbatim from current site | SATISFIED | `CompanyBeliefsSection.tsx`: all 5 entries match verbatim archive text specified in plan — exact string match confirmed |
| COMP-04 | 05-01-PLAN.md | Team section: headshots + bios (placeholder) | SATISFIED | `CompanyTeamSection.tsx`: 6 team member cards with inline SVG silhouettes, names, titles, and 1-line bios (placeholder text is by design per COMP-04 and the plan) |
| CONT-01 | 05-02-PLAN.md | Contact form: name, email, company, role, message (optional) | SATISFIED | `ContactFormSection.tsx`: all 5 fields present with correct `name` attributes matching `__forms.html` registration; Netlify form submission wired |
| CONT-02 | 05-02-PLAN.md | Optional Calendly embed for direct scheduling | SATISFIED | `ContactCalendlyButton.tsx`: `react-calendly` `PopupWidget` rendered in right column of form layout; always visible (not toggled); placeholder URL noted with TODO for post-deployment replacement |
| CONT-03 | 05-02-PLAN.md | Source-specific CTA text per referring page | SATISFIED | `ContactFormSection.tsx`: `COPY` record maps `product`/`default` → "Request a demo", `calculator` → "Talk to us about your results"; `useMemo` + `useSearchParams`; `sessionStorage` persistence |

All 7 requirement IDs (COMP-01 through COMP-04, CONT-01 through CONT-03) are accounted for. No orphaned requirements found — REQUIREMENTS.md maps all 7 to Phase 5.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `ContactCalendlyButton.tsx` | 5 | `// TODO: replace with real Calendly booking URL` | Info | Expected and documented — placeholder URL is a content substitution task, not a code issue. Explicitly noted in plan's `user_setup` and both summaries. Calendly still renders functionally. |
| `CompanyTeamSection.tsx` | 14–37 | "Placeholder bio — one sentence about..." for 5 of 6 team members | Info | Expected per COMP-04 and the plan spec — placeholder bios are the design intent until real team info is available. Not a blocker. |

No blocker (red) or warning-level anti-patterns detected. Both items above are planned, documented, and acknowledged in the deliverable specifications.

### Human Verification Required

#### 1. Company page visual rendering

**Test:** Navigate to `/company` in a browser and scroll through all six sections.
**Expected:** Hero with serif italic headline, Mission blockquote, 5 numbered belief cards, Human Cost with red stat bars, 6-card team grid (3 columns on desktop), shared CTA section.
**Why human:** Server Component visual rendering and layout correctness cannot be confirmed from static file analysis.

#### 2. Company nav link

**Test:** Click the "Company" link in the sticky nav.
**Expected:** Navigates to `/company` and renders the page without errors.
**Why human:** Navigation interaction requires a browser.

#### 3. Request Demo CTA → /contact

**Test:** Click the "Request Demo" primary button in the nav.
**Expected:** Navigates to `/contact` and renders the form + Calendly button.
**Why human:** Navigation interaction requires a browser.

#### 4. Contact source-awareness: ?from=calculator

**Test:** Visit `/contact?from=calculator`.
**Expected:** Page heading and submit button both read "Talk to us about your results".
**Why human:** `useSearchParams` + `useMemo` runtime behavior cannot be verified statically.

#### 5. Contact source-awareness: ?from=product

**Test:** Visit `/contact?from=product`.
**Expected:** Page heading reads "Request a demo" (same as default).
**Why human:** Runtime behavior.

#### 6. sessionStorage persistence

**Test:** Visit `/contact?from=calculator`, navigate to `/`, then navigate back to `/contact` (no query param).
**Expected:** Heading still reads "Talk to us about your results" — sessionStorage carried the source.
**Why human:** sessionStorage state cannot be verified from static analysis.

#### 7. Calendly popup

**Test:** Click "Book a time" on `/contact`.
**Expected:** Calendly popup widget opens (even with placeholder URL — it will open Calendly's 404 for safecypher/30min).
**Why human:** `react-calendly` `PopupWidget` is a client-side component requiring browser rendering and the Calendly JS SDK.

#### 8. Netlify form registration (deployment only)

**Test:** On a Netlify deployment (not local dev), submit the contact form with valid data.
**Expected:** Submission appears in the Netlify Forms dashboard under "contact-request" with fields: name, role, company, email, message.
**Why human:** Netlify's build-time form detection from `__forms.html` only activates in a Netlify build environment; cannot be verified locally.

### Gaps Summary

No gaps. All automated checks passed:
- All 9 required artifacts exist, are substantive (not stubs), and are wired
- All 7 key links verified with real import + usage evidence
- All 7 requirement IDs satisfied with code evidence
- No blocker or warning anti-patterns
- Phase goal's nav accessibility component confirmed: `/company` linked in nav center; `/contact` linked via "Request Demo" primary CTA button

The only open items are runtime behaviors requiring a browser and one Netlify-specific test requiring deployment — all are appropriate human verification items, not code gaps.

---

_Verified: 2026-02-21T12:30:00Z_
_Verifier: Claude (gsd-verifier)_
