# SafeCypher.com — Website Rebuild

## What This Is

SafeCypher.com is the company's primary sales and conversion asset — a complete rebuild from three static HTML files into a production Next.js 16 + App Router site with a public marketing surface and a gated customer portal. The site targets Heads of Fraud and Digital at card issuers with clear product messaging and interactive sales tools that give the sales team real-time deal-readiness signal.

The public site explains SafeCypher's dynamic credential approach across six product/content pages. The portal delivers an interactive ROI calculator and agentic commerce demo, gated by Supabase magic-link authentication, with every meaningful action streaming to Attio CRM server-side.

## Core Value

Every page must either convert a visitor into a demo request, deepen a prospect's engagement in the portal, or give the sales team signal that a deal is moving — nothing ships that doesn't serve one of those three outcomes.

## Requirements

### Validated

<!-- v1.0 Website Rebuild — Shipped 2026-03-01 -->

- ✓ Next.js 16 App Router project with TypeScript strict mode, CI/CD, and Netlify deploy — v1.0 (FOUND-01, FOUND-02, FOUND-03)
- ✓ DaisyUI v5 + Tailwind v4 SafeCypher brand theme, core UI component library — v1.0 (FOUND-04)
- ✓ Sticky mega-menu Nav with Platform dropdown, footer with proof stat and award badge — v1.0 (FOUND-05)
- ✓ Homepage with animated CVV hero, urgency block, three-audiences strip, An Post proof stats, demo CTA block — v1.0 (HOME-01 through HOME-06)
- ✓ Homepage calculator teaser with portfolioSize redirect into portal — v1.0 (HOME-07)
- ✓ Platform Overview page — problem frame, dynamic approach, architecture diagram, competitive context — v1.0 (PLAT-01 through PLAT-06)
- ✓ Dynamic Security Codes product page — six-step how-it-works flow, An Post proof, issuer section — v1.0 (DSC-01 through DSC-06)
- ✓ Safe Verify product page — nuclear key concept, tabbed use-cases (Inbound/Bi-directional/Branch), integration details, quantified benefits — v1.0 (SV-01 through SV-09)
- ✓ Company/About page — mission, Human Cost section, five beliefs, team — v1.0 (COMP-01 through COMP-04)
- ✓ Contact/Request Demo page — form, optional Calendly embed, source-aware CTA text — v1.0 (CONT-01 through CONT-03)
- ✓ Attio CRM server-side event streaming with x-internal-token guard and Netlify env var wiring — v1.0 (ANLT-01)
- ✓ PostHog analytics on public site and portal with consent banner — v1.0 (ANLT-02)
- ✓ Portal with Supabase magic-link auth, middleware route protection, dashboard — v1.0 (PORT-01, PORT-02, PORT-03)
- ✓ Sales team Attio notification on portal login (PortalLoginTracker in portal layout) — v1.0 (PORT-04)
- ✓ ROI calculator with real-time sliders, verified savings math ($3.8M Yr1), PDF export, shareable URL state — v1.0 (PORT-05, PORT-06)
- ✓ Agentic commerce demo page serving BoA mockup with context panel and mockup_viewed event — v1.0 (PORT-07, PORT-08)

### Active

<!-- Next milestone — v1.1 -->
- [ ] An Post case study page `/proof/an-post` with approved copy; added to nav (P1-01)
- [ ] SafeAgent page `/safe-agent` with early-access framing and pilot CTA (P1-02)
- [ ] Blog infrastructure + 2–3 seed posts adapted from conference speeches (P1-03)
- [ ] Proof/Awards index page `/proof` (P1-04)
- [ ] Processor Partners page `/partners` (P1-05)
- [ ] Portal document library `/portal/documents` with `document_download` Attio event (P1-06)
- [ ] Exit intent overlay on product pages — "Before you go — see how much fraud is costing your portfolio" (UX-01)
- [ ] An Post proof stat persistent in nav bar: "800,000+ transactions. Zero CNP fraud." (UX-02)

<!-- Phase 2 — future -->
- [ ] SafePay product page `/safepay` (P2-01)
- [ ] E-Wallet Onboarding page `/ewallet-onboarding` (P2-02)
- [ ] Card Issuance Protection page `/card-issuance-protection` (P2-03)
- [ ] OTP Replacement page `/otp-replacement` (P2-04)
- [ ] Careers page `/careers` (P2-05)
- [ ] Portal analytics dashboard `/portal/analytics` — internal only (P2-06)

### Out of Scope

- Mobile app — web-first; mobile deferred indefinitely
- Password-based auth — magic-link only, no password management overhead
- Real-time chat — not core to conversion goals; high complexity
- CMS (Sanity/Contentful) — deferred; copy lives in code for v1.x
- Public content gating — portal gates interactive tools; nothing on public site requires login
- OAuth login (Google, GitHub) — not relevant for B2B fintech prospect audience

## Context

**Current state (v1.0):** 7,111 lines TypeScript/TSX across 246 files. Next.js 16.1.6, React 19, TypeScript strict (noUncheckedIndexedAccess + exactOptionalPropertyTypes), Tailwind v4, DaisyUI v5, Supabase auth, PostHog, Attio.

**Routes live:** `/`, `/platform`, `/dynamic-security-codes`, `/safe-verify`, `/company`, `/contact`, `/privacy`, `/terms`, `/portal`, `/portal/calculator`, `/portal/demo`, `/portal/login`

**Hosting:** Netlify via @netlify/plugin-nextjs. `main` → production, `develop` → staging.

**Auth:** Supabase magic-link (PKCE). All `/portal/*` routes protected by `src/proxy.ts` (Next.js 16 middleware naming convention — `proxy`, not `middleware`).

**CRM:** Attio server-side streaming via `/api/attio/event` (x-internal-token guard). Events: `portal_login`, `calculator_run`, `demo_request`, `contact_request`, `mockup_viewed`.

**Analytics:** PostHog with opt-out-by-default + session-scoped ConsentBanner (useState only, no cookies).

**Known tech debt from v1.0:**
- `src/proxy.ts` vs standard `src/middleware.ts` — verify Netlify production middleware registration
- Visual browser checks still outstanding for phases 3, 5, 6 (runtime confirmations needed)
- Calendly URL placeholder in ContactCalendlyButton.tsx (needs wiring in production env)
- GBP/EUR calculator defaults use USD placeholder values
- Team section: 5 of 6 members have placeholder bios
- Phase 01 VERIFICATION.md never created (pre-dates GSD verification workflow)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 16 over Astro | Portal requires auth middleware, server-side API routes, Attio streaming — Astro can't support this | ✓ Good — correct choice; portal build unblocked |
| Phase 0 split: Foundation + Content | Wide scope; cleaner to ship infra/design system first, then pages | ✓ Good — each phase delivered usable output |
| DaisyUI v5 + Tailwind v4 | Component library without heavy UI framework; custom brand theme | ✓ Good — CSS-only theme worked well |
| Attio stubbed in dev | Key not yet available; stub allows portal build to proceed without blocking | ✓ Good — unblocked development |
| Magic-link only auth | No password management overhead; aligns with B2B SaaS expectations | ✓ Good — Supabase PKCE implementation stable |
| Safe Verify: port content + structure | Substantial existing page — port React components, preserve copy and flow | ✓ Good — preserved content fidelity |
| PostHog in Phase 0 | Capture data from first live visit, not an afterthought | ✓ Good — funnel instrumented from launch |
| Agentic mockup: iframe in portal | Existing HTML is production-quality; no rebuild needed | ✓ Good — shipped fast without sacrificing quality |
| Supabase over NextAuth.js v5 | NextAuth v5 magic-link required Loops integration; Supabase PKCE simpler and fully supported | ✓ Good — PORT-01 tech deviation accepted |
| Calculator TDD with vitest | No existing test framework; formula verification needed for sales credibility | ✓ Good — $3.8M Yr1 savings formula verified against spreadsheet |
| proxy.ts not middleware.ts | Next.js 16 requires `proxy` export name — discovered during Phase 7 | ⚠️ Revisit — non-standard name may cause confusion on Netlify prod |
| NuqsAdapter in portal layout only | Adding to root layout breaks marketing URL handling | ✓ Good — correct scoping |

## Constraints

- **Stack:** Next.js 16 App Router — locked
- **Hosting:** Netlify — locked; @netlify/plugin-nextjs adapter required
- **Auth:** Supabase magic-link only — no passwords
- **Security:** Attio API key must never appear client-side; server-side API route only
- **An Post case study:** Built but stays off-nav until approved copy lands
- **Mockup placement:** Agentic commerce mockup is portal-only; public SafeAgent page uses static visuals only
- **Build:** `next build --webpack` required — Turbopack incompatible with @tailwindcss/node on Node 24/25

---
*Last updated: 2026-03-01 after v1.0 milestone*
