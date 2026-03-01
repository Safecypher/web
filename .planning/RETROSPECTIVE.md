# Retrospective

## Milestone: v1.0 — Website Rebuild

**Shipped:** 2026-03-01
**Phases:** 8 | **Plans:** 27

### What Was Built

- Next.js 16 + App Router rebuild from 3 static HTML files — TypeScript strict, Tailwind v4, DaisyUI v5 design system, Netlify CI/CD
- 6 public marketing pages: Homepage (animated CVV hero), Platform Overview, Dynamic Security Codes, Safe Verify, Company, Contact/Demo
- Gated portal: Supabase magic-link auth, route protection, ROI calculator, agentic commerce demo
- Full analytics pipeline: PostHog funnel tracking + Attio CRM server-side event streaming
- 7,111 lines TypeScript/TSX across 246 files, shipped in 10 days

### What Worked

- **Stub-first scaffolding:** Creating stub files for future sections at the start of each plan meant the page compiled immediately and parallel plan execution was unblocked. Adopted from Phase 3 and carried through.
- **Shared PageCtaSection pattern:** Extracting the CTA component in Phase 3 (plan 03-02) prevented duplication across 4 product pages — each is a 4-5 line thin wrapper. Phase 8 gap closure was just replacing one outlier.
- **TDD for calculator formula:** Using vitest to verify the formula against the spreadsheet values before building the UI caught the fee-base error ($cvvRequired vs $total CNP transactions) before it reached users.
- **Yolo mode for speed:** Auto-approved phase scope verification kept execution moving. Research and planning agents ran without unnecessary confirmation gates.
- **Human verification checkpoints at Phase 7 end:** One human checkpoint with clear numeric assertions (verify $3,866,043 Yr1, verify 23.85-day breakeven) replaced continuous interruptions throughout.

### What Was Inefficient

- **proxy.ts naming deviation:** Next.js 16's non-standard `proxy.ts` middleware name was only discovered in Phase 7. Should have been in Foundation research. Added unnecessary uncertainty around Netlify production deploy.
- **Phase 01 VERIFICATION.md gap:** Pre-dated the GSD verification workflow so was never created. The audit flagged FOUND-01/02 as procedurally partial because of this. Not a functional issue but added noise to the audit.
- **GBP/EUR calculator values:** Shipping with USD placeholder values for GBP/EUR inputs is technical debt that will cause confusion for non-US prospects. Should have been addressed before Phase 7 verification.
- **Phase 8 gap closure was preventable:** The SvCtaSection divergence from the PageCtaSection pattern happened in Phase 4 but wasn't caught until the Phase 8 gap closure. The pattern divergence was visible in Phase 4 SUMMARY.md — a cross-phase pattern review earlier could have caught it.
- **Velocity metrics not updated past Phase 6:** STATE.md velocity section only covers phases 1-5 in detail; phases 6-8 metrics are not captured.

### Patterns Established

- **Stub-first:** Always create stub files at Task 1 of each plan; page compiles from minute one
- **Thin wrapper CTAs:** All product page CTAs are 4-5 line wrappers over shared `PageCtaSection`
- **Server-side Attio guard:** `x-internal-token` header required; Attio key never in browser network tab
- **ConsentBanner is useState-only:** Session-scoped consent; no localStorage, no cookies; banner reappears on every page load by design
- **Portal layout tracker:** `PortalLoginTracker` belongs in portal layout (not individual pages) so it fires for all portal entry paths
- **jsPDF dynamic import:** Must be inside onClick handler; module-scope import causes SSR failure
- **NuqsAdapter in portal layout only:** Root layout placement breaks marketing URL handling
- **Build script uses --webpack:** `@tailwindcss/node` incompatible with Turbopack on Node 24/25

### Key Lessons

1. **Verify middleware naming conventions at project start** — framework-specific deviations (Next.js 16 `proxy.ts`) need to be in Foundation research, not discovered mid-portal build
2. **Pattern consistency checks at phase boundaries** — before completing any phase, verify all CTA/shared-component usages are consistent; divergences are cheap to fix early, expensive at gap closure
3. **Human verification checkpoint design matters** — a single well-structured checkpoint (Phase 7-05) with numeric assertions is more effective than ad-hoc checks throughout
4. **Calculator accuracy is a trust issue** — getting the fee base right ($cvvRequired not $totalCNP) before building the UI was critical; wrong math in a sales tool destroys credibility

### Cost Observations

- 56 feature commits, 185 total commits over 10 days
- All phases executed at `balanced` model profile
- Phase 7 (portal + calculator) was the most complex: 5 plans, auth + TDD + full UI + verification
- Phase 8 gap closure (2 fixes) took 1 plan — appropriate overhead ratio

---

## Cross-Milestone Trends

| Metric | v1.0 |
| --- | --- |
| Phases | 8 |
| Plans | 27 |
| Timeline | 10 days |
| LOC (TypeScript/TSX) | 7,111 |
| Requirements satisfied | 50/50 |
| Tech debt items | 14 |
| Gap closure phase needed | Yes (Phase 8) |
