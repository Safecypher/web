# Roadmap: SafeCypher.com — Website Rebuild

## Overview

Migrate three static HTML files to a Next.js 14+ App Router site with a public marketing surface and gated customer portal. The rebuild proceeds in natural delivery boundaries: infrastructure first, then the conversion-critical homepage, then the product pages (Platform Overview, Dynamic Security Codes, Safe Verify), then supporting pages (Company, Contact), and finally cross-cutting analytics and CRM instrumentation. Every phase delivers pages or capabilities a real visitor can use or verify.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js 14+ App Router project with CI/CD, design system, and shared layout
- [ ] **Phase 2: Homepage** - Primary conversion page with hero, urgency block, proof, and demo CTA
- [ ] **Phase 3: Platform + Dynamic Security Codes** - Platform Overview and first product page, sharing the one-API-to-seven-products narrative
- [ ] **Phase 4: Safe Verify** - Full port of existing Safe Verify page into React components
- [ ] **Phase 5: Company + Contact** - Company/About page and Contact/Request Demo page
- [ ] **Phase 6: Analytics + CRM** - PostHog and Attio event streaming wired across site and portal

## Phase Details

### Phase 1: Foundation
**Goal**: The Next.js project exists, deploys to Netlify on every push, and gives every subsequent page a shared design system and layout to build into
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. Visiting the Netlify preview URL after a PR merge shows a live Next.js site with the SafeCypher brand (teal primary, dark background)
  2. Opening a PR triggers GitHub Actions lint, type-check, and build checks; a failing check blocks merge
  3. The sticky nav with Platform mega-menu dropdown, Portal icon, and "Request Demo" CTA appears and functions on every page
  4. The footer with proof stat and award badge renders on every page
  5. A DaisyUI component (e.g., a button with the brand theme) renders correctly in the browser
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md — Next.js scaffold, archive existing files, folder structure, TypeScript strict mode, netlify.toml
- [x] 01-02-PLAN.md — GitHub Actions CI/CD pipeline (lint, type-check, build on every PR)
- [x] 01-03-PLAN.md — DaisyUI v5 + Tailwind v4 CSS-only theme, SafeCypher brand tokens, base UI components
- [x] 01-04-PLAN.md — Sticky mega-menu Nav, Footer with proof stat, marketing layout wiring

### Phase 2: Homepage
**Goal**: The primary conversion page is live, giving Heads of Fraud and Digital at card issuers a clear argument, social proof, and a way to request a demo or calculate value
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07
**Success Criteria** (what must be TRUE):
  1. A visitor sees the hero headline "Eliminate card-not-present fraud. Not reduce. Eliminate." with an animated CVV card and a "Request Demo" CTA above the fold
  2. A visitor can scroll to a short demo/contact form, submit it, and receive confirmation
  3. The Three Audiences strip (Transactions, People, Agents) renders correctly on mobile as a vertical stack
  4. The Proof section displays the 800,000+ transaction / zero CNP fraud stat alongside the An Post logo and Irish Fintech Award badge
  5. Clicking "See the value for your portfolio" from the urgency block navigates toward the calculator (deep link works, even if portal auth is not yet complete)
**Plans**: 4 plans

Plans:
- [x] 02-01-PLAN.md — Homepage compositor (page.tsx), HeroSection split-layout, HeroCvvCard slot-machine animation
- [ ] 02-02-PLAN.md — UrgencySection (CNP fraud argument + CTAs), AudiencesSection (Transactions/People/Agents), OneIntegrationSection
- [ ] 02-03-PLAN.md — ProofSection (An Post stats + logo + badge), HumanCostSection (emotional fraud victim copy)
- [ ] 02-04-PLAN.md — DemoFormSection (Netlify Forms + inline success), Input.tsx DaisyUI v5 fix, Textarea.tsx, public/__forms.html

### Phase 3: Platform + Dynamic Security Codes
**Goal**: Prospects who want to understand the architecture or the flagship DSC product can navigate to fully-built pages that explain the one-API model and the dynamic CVV solution
**Depends on**: Phase 2
**Requirements**: PLAT-01, PLAT-02, PLAT-03, PLAT-04, PLAT-05, PLAT-06, DSC-01, DSC-02, DSC-03, DSC-04, DSC-05, DSC-06
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to /platform and read a coherent argument: static credentials are the root cause, SafeCypher's dynamic approach solves it, one integration unlocks seven products
  2. The architecture diagram placeholder renders on /platform (production diagram to replace later)
  3. A visitor can navigate to /dynamic-security-codes and follow the six-step visual how-it-works flow
  4. Both pages surface An Post proof metrics and end with a calculator link and demo request CTA
  5. Competitive context on /platform (vs tokenisation, 3DS, behavioural analytics) is present without being attack copy
**Plans**: 4 plans

Plans:
- [ ] 03-01-PLAN.md — Platform Overview page — problem frame (PlatformHeroSection), dynamic approach (ApproachSection), architecture diagram (ArchitectureDiagram)
- [ ] 03-02-PLAN.md — Platform Overview page — product portfolio table (ProductPortfolioSection), competitive comparison (CompetitiveSection), CTAs (PlatformCtaSection + shared PageCtaSection)
- [ ] 03-03-PLAN.md — Dynamic Security Codes page — problem frame (DscHeroSection), solution (DscSolutionSection), six-step how-it-works flow (HowItWorksSection)
- [ ] 03-04-PLAN.md — Dynamic Security Codes page — proof section (DscProofSection), for issuers section (ForIssuersSection), CTAs (DscCtaSection)

### Phase 4: Safe Verify
**Goal**: The existing Safe Verify landing page is fully ported to a React component page that preserves all six-step flow content, nuclear key concept, integration details, and quantified benefits
**Depends on**: Phase 3
**Requirements**: SV-01, SV-02, SV-03, SV-04, SV-05, SV-06, SV-07, SV-08, SV-09
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to /safe-verify and read the same six-step how-it-works flow that exists in the current HTML page, rendered as React components
  2. The nuclear key / three-key exchange concept renders with its existing copy
  3. Tabs for Inbound, Bi-directional, and Branch use cases are functional and display distinct content
  4. Integration details (Amazon Connect, REST API, IVR drop-in) are present and readable
  5. The page links to Dynamic Security Codes to explain shared underlying technology, and ends with calculator and demo CTAs
**Plans**: TBD

Plans:
- [ ] 04-01: Problem frame, six-step how-it-works flow (port from existing HTML)
- [ ] 04-02: Nuclear key concept, use-case tabs (Inbound, Bi-directional, Branch)
- [ ] 04-03: Integration details, quantified benefits, outbound flow diagram placeholder
- [ ] 04-04: Cross-link to DSC, CTAs, final review and parity check against source HTML

### Phase 5: Company + Contact
**Goal**: Supporting pages that build trust (Company/About) and capture leads (Contact/Request Demo) are live and accessible from the nav
**Depends on**: Phase 4
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, CONT-01, CONT-02, CONT-03
**Success Criteria** (what must be TRUE):
  1. A visitor can navigate to /company and read the mission statement, Human Cost section, and all five beliefs migrated verbatim from the current site
  2. Team headshots and placeholder bios are visible on /company
  3. A visitor can navigate to /contact and submit a form with name, email, company, role, and optional message
  4. The contact page CTA text changes based on the referring page (product pages show "Request a demo", calculator shows "Talk to us about your results")
  5. An optional Calendly embed loads on /contact for direct scheduling
**Plans**: TBD

Plans:
- [ ] 05-01: Company page — mission, Human Cost section, five beliefs (migrated verbatim)
- [ ] 05-02: Company page — team section with headshots and placeholder bios
- [ ] 05-03: Contact page — form, source-specific CTA text, Calendly embed

### Phase 6: Analytics + CRM
**Goal**: Every meaningful user action across the public site and portal fires a trackable event — PostHog captures the funnel, Attio receives server-side CRM signals — so the sales team has real deal-readiness visibility from day one of launch
**Depends on**: Phase 5
**Requirements**: ANLT-01, ANLT-02
**Success Criteria** (what must be TRUE):
  1. Visiting any public page in production shows a PostHog page view event in the PostHog dashboard
  2. Submitting the demo request form fires a `demo_request` Attio event (verifiable in Attio activity feed in prod; console.log in dev)
  3. The `/api/attio/event` server-side route exists and rejects client-side calls that do not go through the route (Attio API key never appears in browser network tab)
  4. PostHog captures CTA clicks and form starts on the public site without requiring a login
**Plans**: TBD

Plans:
- [ ] 06-01: Attio event streaming — `/api/attio/event` server-side route, dev stub (console.log), prod env var wiring
- [ ] 06-02: PostHog installation — public site page views, CTA clicks, form starts, funnel events

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/4 | Complete | 2026-02-19 |
| 2. Homepage | 2/4 | In Progress|  |
| 3. Platform + Dynamic Security Codes | 1/4 | In Progress|  |
| 4. Safe Verify | 0/4 | Not started | - |
| 5. Company + Contact | 0/3 | Not started | - |
| 6. Analytics + CRM | 0/2 | Not started | - |
