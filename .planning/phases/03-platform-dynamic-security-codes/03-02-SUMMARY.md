---
phase: 03-platform-dynamic-security-codes
plan: "02"
subsystem: ui
tags: [nextjs, tailwind, daisyui, server-components, marketing, platform]

# Dependency graph
requires:
  - phase: 03-01
    provides: Stub files for ProductPortfolioSection, CompetitiveSection, PlatformProofSection, PlatformCtaSection; /platform route and page.tsx
  - phase: 02-homepage
    provides: ProofSection pattern (An Post metrics + quote card) used as reference for PlatformProofSection
provides:
  - ProductPortfolioSection — seven-product DaisyUI table-zebra with audience, description, effort columns
  - CompetitiveSection — 4-row comparison table with SafeCypher row highlighted and gap column reading Eliminates CNP fraud
  - PlatformProofSection — An Post proof metrics (800,000+, 18 months, Zero), logo placeholder, blockquote, Irish Fintech Award badge
  - PlatformCtaSection — thin wrapper over shared PageCtaSection
  - shared/PageCtaSection — reusable CTA component (calculator + demo CTAs) ready for plan 03-04
affects:
  - 03-04-PLAN.md (PageCtaSection available to import for DSC page CTA section)
  - /platform route is now end-to-end complete with all 7 sections

# Tech tracking
tech-stack:
  added: []
  patterns:
    - DaisyUI table-zebra for comparison and portfolio tables (no table-compact in v5)
    - shared/ directory under marketing/ for components reused across marketing pages
    - Thin wrapper pattern: PlatformCtaSection imports and re-exports shared PageCtaSection
    - bg-primary/10 highlight row pattern for SafeCypher differentiation in comparison tables
    - Unicode escape (\u2019) for curly apostrophes inside single-quoted JS string literals

key-files:
  created:
    - src/components/marketing/shared/PageCtaSection.tsx
  modified:
    - src/components/marketing/platform/ProductPortfolioSection.tsx
    - src/components/marketing/platform/CompetitiveSection.tsx
    - src/components/marketing/platform/PlatformProofSection.tsx
    - src/components/marketing/platform/PlatformCtaSection.tsx

key-decisions:
  - "shared/PageCtaSection created in marketing/shared/ — reusable CTA component avoids duplication when plan 03-04 (DSC page) imports it"
  - "PlatformCtaSection is a thin wrapper over PageCtaSection — consistent with stub-then-fill pattern; future DSC CTA imports directly from shared"
  - "Unicode escape \\u2019 used for curly apostrophes inside single-quoted string literals — avoids parse errors from typographically correct copy pasted from PLAN.md"
  - "PlatformProofSection adapted from homepage ProofSection — same An Post data, stat layout, and award badge; body copy updated for /platform context"

patterns-established:
  - "shared/ directory pattern for cross-page marketing components — avoids prop-drilling through layout, enables direct import"
  - "Comparison table row highlighting: bg-primary/10 on isSafeCypher row + badge-primary 'You are here' badge"
  - "Zero stat using text-accent (not text-primary) to visually distinguish fraud-free outcome from volume metrics"

requirements-completed: [PLAT-04, PLAT-05, PLAT-06]

# Metrics
duration: 3min
completed: 2026-02-20
---

# Phase 3 Plan 02: Platform Page — Product Portfolio, Competitive Comparison, An Post Proof, and CTA Sections Summary

**Four full-implementation platform sections replacing stubs: seven-product DaisyUI table, 4-row competitive comparison with SafeCypher row highlighted, An Post proof metrics (800,000+ / 18 months / Zero) adapted from homepage ProofSection pattern, and a shared PageCtaSection ready for DSC page reuse**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-02-20T17:56:34Z
- **Completed:** 2026-02-20T17:59:19Z
- **Tasks:** 3
- **Files modified:** 4 modified, 1 created

## Accomplishments

- ProductPortfolioSection renders a full DaisyUI table-zebra with all seven products: DSC (Core integration, linked), Safe Verify (linked), SafeAgent, SafePay, E-Wallet Onboarding, Card Issuance Protection, OTP Replacement — each with audience badge and effort column in font-mono
- CompetitiveSection renders a 4-row comparison table where the SafeCypher row carries bg-primary/10 highlight, a "You are here" badge, and the gap column reads "Eliminates CNP fraud — stolen credentials expire before they can be used"
- PlatformProofSection adapts the homepage ProofSection pattern with An Post stats (800,000+, 18 months, Zero), an An Post logo placeholder in brand green #006229, a blockquote specific to the platform context, and the Irish Fintech Award badge with inline SVG star
- shared/PageCtaSection created with two CTAs: "See the value for your portfolio" (→ /portal/calculator, btn-accent) and "Request a demo" (→ /#demo, btn-primary)
- PlatformCtaSection wired as a thin wrapper over shared/PageCtaSection — plan 03-04 can import directly from shared/
- /platform page is end-to-end complete: seven sections render in sequence, build passes, zero TypeScript errors, zero lint errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Build ProductPortfolioSection** - `c551b9b` (feat)
2. **Task 2: Build CompetitiveSection, PageCtaSection, wire PlatformCtaSection** - `49325bb` (feat)
3. **Task 3: Build PlatformProofSection** - `7752e85` (feat)

## Files Created/Modified

- `src/components/marketing/platform/ProductPortfolioSection.tsx` — seven-product table (116 lines)
- `src/components/marketing/platform/CompetitiveSection.tsx` — competitive comparison table (75 lines)
- `src/components/marketing/platform/PlatformProofSection.tsx` — An Post proof metrics and quote card (101 lines)
- `src/components/marketing/platform/PlatformCtaSection.tsx` — thin wrapper over shared PageCtaSection (5 lines)
- `src/components/marketing/shared/PageCtaSection.tsx` — reusable CTA section for marketing pages (26 lines)

## Decisions Made

- shared/PageCtaSection created in marketing/shared/ — avoids duplication; plan 03-04 will import directly from shared/ without any changes to PlatformCtaSection
- Thin wrapper pattern for PlatformCtaSection — consistent with plan intent and keeps the platform component surface clean
- Unicode escape \u2019 for curly apostrophes in single-quoted string literals — TypeScript parse error on curly apostrophe in the DSC description string caught and fixed immediately (Rule 1 auto-fix)
- PlatformProofSection body copy updated relative to homepage ProofSection: "entire card-not-present portfolio" added, blockquote updated to "Zero fraud incidents across a live production portfolio — not a test, not a pilot" for /platform context specificity

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Curly apostrophe in DSC description caused TypeScript parse error**
- **Found during:** Task 1 (tsc --noEmit)
- **Issue:** The plan specified `description: 'Time-limited CVV in the cardholder's banking app...'` — the Unicode right single quotation mark (\u2019) inside a single-quoted JS string literal caused a parse error at compile time (TS1005/TS1002 errors on line 7)
- **Fix:** Changed delimiter to double-quotes and used `\u2019` Unicode escape: `"Time-limited CVV in the cardholder\u2019s banking app..."`
- **Files modified:** `src/components/marketing/platform/ProductPortfolioSection.tsx`
- **Commit:** Included in `c551b9b`

## Issues Encountered

None beyond the apostrophe parse error above, which was auto-fixed inline.

## User Setup Required

None.

## Next Phase Readiness

- Plan 03-03 (/dynamic-security-codes) already complete (per STATE.md, this plan is being executed out of sequence)
- Plan 03-04 (DSC page remaining sections) can import `PageCtaSection` directly from `@/components/marketing/shared/PageCtaSection`
- /platform is end-to-end complete and builds as a static route

---
*Phase: 03-platform-dynamic-security-codes*
*Completed: 2026-02-20*
