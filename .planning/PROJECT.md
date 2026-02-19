# SafeCypher.com — Website Rebuild

## What This Is

SafeCypher.com is a complete rebuild of the company's web presence from static HTML into a Next.js 14+ App Router site with a gated customer portal. The site serves as the primary sales and conversion asset for a B2B fintech company that eliminates card-not-present fraud through dynamic, time-sensitive credentials delivered via the cardholder's banking app.

The rebuild has two distinct surfaces: (1) a public marketing site targeting Heads of Fraud and Digital at card issuers, and (2) a gated portal delivering interactive sales tools (value calculator, agentic commerce demo) that stream engagement data to Attio CRM in real time.

## Core Value

Every page must either convert a visitor into a demo request, deepen a prospect's engagement in the portal, or give the sales team signal that a deal is moving — nothing ships that doesn't serve one of those three outcomes.

## Requirements

### Validated

<!-- Existing capabilities confirmed in current codebase -->
- ✓ Homepage marketing page exists (static HTML) — existing
- ✓ Safe Verify landing page exists with six-step flow, nuclear key concept, integration details — existing
- ✓ Agentic commerce demo mockup (BoA HTML file) built — existing
- ✓ Netlify deployment configured — existing
- ✓ Basic brand assets (logo, shield) — existing

### Active

<!-- Phase 0a — Foundation -->
- [ ] Next.js 14+ project with App Router scaffolded on Netlify
- [ ] CI/CD: GitHub Actions (lint + type-check + build) + Netlify deploy previews per PR
- [ ] DaisyUI + Tailwind CSS design system with SafeCypher custom brand theme
- [ ] Core layout: sticky nav with mega-menu, footer, shared components

<!-- Phase 0b — Marketing Pages -->
- [ ] Homepage with hero (animated CVV card), urgency block, three-audiences strip, proof section, CTA block
- [ ] Platform Overview page explaining one API → seven products architecture
- [ ] Dynamic Security Codes product page
- [ ] Safe Verify product page (ported from existing HTML)
- [ ] Company/About page (migrated from current site)
- [ ] Contact/Request Demo page
- [ ] An Post case study page (built off-nav, placeholder copy)

<!-- Phase 0b — Portal -->
- [ ] NextAuth.js v5 magic-link auth (email via Loops)
- [ ] Portal dashboard (/portal) — gated, middleware-protected
- [ ] Value calculator (/portal/calculator) with real-time outputs and Attio event on debounced change
- [ ] Agentic commerce mockup (/portal/demo) — existing HTML served in portal iframe
- [ ] Attio event streaming infrastructure (stubbed in dev, real key wired in prod)
- [ ] PostHog analytics setup (public site + portal funnel)

<!-- Phase 1 -->
- [ ] SafeAgent page with early-access framing
- [ ] An Post case study added to nav with approved copy
- [ ] Blog infrastructure + 2–3 seed posts
- [ ] Proof/Awards index page
- [ ] Processor Partners page
- [ ] Portal document library (/portal/documents)

<!-- Phase 2 -->
- [ ] SafePay product page
- [ ] E-Wallet Onboarding product page
- [ ] Card Issuance Protection product page
- [ ] OTP Replacement product page
- [ ] Careers page
- [ ] Portal analytics dashboard (/portal/analytics) — internal only

### Out of Scope

- Mobile app — web-first, mobile later
- Real-time chat — not core to current conversion goals
- CMS (Phase 1 consideration, not Phase 0) — Sanity/Contentful deferred; copy lives in code for now
- Public content gating — nothing on the public site requires login
- Password-based auth — magic-link only (passwordless)
- Supabase schema beyond session/event storage — no complex data model in Phase 0

## Context

**Current state:** Three static HTML files (index.html, safe-verify-landing.html, demos/boa/bofa-agentic-banking-mockup.html) totalling ~3,400 lines. Astro is installed but not used. No package.json on the static pages. No tests.

**Why Next.js over Astro:** Astro's static-only model can't support gated portal, NextAuth middleware, server-side API routes, or Attio event streaming. Existing content migrates to React components.

**Styling approach:** DaisyUI (component library) on top of Tailwind CSS, with a custom SafeCypher brand theme. Teal primary, dark background, confident B2B tone.

**Hosting:** Netlify via @netlify/plugin-nextjs. Branch: main → production, develop → staging.

**CRM:** Attio. All portal events fire server-side from `/api/attio/event`. Attio API key stubbed in dev (console.log), real key in prod via Netlify env vars.

**Auth:** NextAuth.js v5, email magic-link via Loops, JWT sessions (30-day sliding window). All `/portal/*` routes protected by middleware.

**Analytics:** Netlify Analytics (public site) + PostHog (public site + portal funnel tracking). PostHog in scope for Phase 0.

**Copy strategy:** Build with placeholder copy. Backfill reviewed copy per sprint. No page waits for final copy.

**Key existing assets to preserve/port:**
- Safe Verify page: six-step how-it-works, nuclear key concept, integration details, quantified benefits
- BoA mockup: served as-is in portal iframe (not rebuilt)
- Current site beliefs/mission copy: migrate verbatim to Company page

## Constraints

- **Stack:** Next.js 14+ App Router — locked per PRD
- **Hosting:** Netlify — locked; Next.js adapter required
- **Auth:** NextAuth.js v5 magic-link only — no passwords
- **Security:** Attio API key must never appear client-side; server-side API route only
- **An Post case study:** Page builds Phase 0 but stays off-nav until approved copy lands (Phase 1)
- **Mockup placement:** Agentic commerce mockup is portal-only; public SafeAgent page uses static visuals only
- **Dependency:** Architecture diagram (one API → seven products) must be commissioned separately — cannot use stock imagery
- **Timeline:** Phase 0 ASAP; Phase 1 weeks 3–5; Phase 2 weeks 5–8

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over Astro | Portal requires auth middleware, server-side API routes, Attio streaming — Astro can't support this | — Pending |
| Phase 0 split: Foundation + Content | Wide scope; cleaner to ship infra/design system first, then pages | — Pending |
| DaisyUI + Tailwind CSS | Custom brand theme on DaisyUI gives component library without heavy UI framework | — Pending |
| Attio stubbed in dev | Key not yet available; stub allows portal build to proceed without blocking | — Pending |
| Magic-link only auth | No password management overhead; aligns with B2B SaaS expectations | — Pending |
| Safe Verify: port content + structure | Substantial existing page — port React components, preserve copy and flow | — Pending |
| PostHog in Phase 0 | Capture data from first live visit, not an afterthought | — Pending |
| Agentic mockup: iframe in portal | Existing HTML is production-quality; no rebuild needed, serve in portal iframe | — Pending |

---
*Last updated: 2026-02-19 after initialization*
