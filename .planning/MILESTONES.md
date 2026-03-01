# Milestones

## v1.0 Website Rebuild (Shipped: 2026-03-01)

**Phases completed:** 8 phases, 27 plans
**Files modified:** 246 | **Lines of code:** 7,111 TypeScript/TSX
**Timeline:** 10 days (2026-02-19 → 2026-03-01)
**Requirements:** 50/50 v1 requirements satisfied

**Key accomplishments:**
- Complete Next.js 16 + App Router rebuild from 3 static HTML files — TypeScript strict, Tailwind v4, DaisyUI v5, Netlify CI/CD
- Full marketing site: Homepage (animated CVV hero), Platform, DSC, Safe Verify, Company, Contact/Demo — 6 pages live
- Gated portal with Supabase magic-link auth, middleware route protection, and portal dashboard
- Interactive ROI calculator with verified savings math ($3.8M Yr1), real-time sliders, PDF export, shareable URL state
- Full analytics pipeline: PostHog funnel tracking + Attio CRM server-side event streaming (portal_login, calculator_run, demo_request, mockup_viewed)
- Agentic commerce demo page serving BoA mockup with context panel and Attio event instrumentation

**Tech debt carried forward:** 14 items — visual browser checks outstanding (phases 3, 5, 6), Calendly URL placeholder, proxy.ts/middleware.ts production confirmation, GBP/EUR calculator defaults, team placeholder bios. No blockers.

**Archive:**
- `.planning/milestones/v1.0-ROADMAP.md`
- `.planning/milestones/v1.0-REQUIREMENTS.md`
- `.planning/milestones/v1.0-MILESTONE-AUDIT.md`

---

