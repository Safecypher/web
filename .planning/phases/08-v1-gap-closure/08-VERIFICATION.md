---
phase: 08-v1-gap-closure
verified: 2026-03-01T13:00:00Z
status: passed
score: 4/4 must-haves verified
re_verification: false
---

# Phase 8: v1.0 Gap Closure — Verification Report

**Phase Goal:** Close the two gaps identified by the v1.0 milestone audit — restore the Safe Verify CTA to include both calculator and demo links, and fix the portal_login Attio event so it fires for all auth paths (not just manual portal dashboard navigation)
**Verified:** 2026-03-01T13:00:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visiting /safe-verify renders both a calculator CTA ("See the value for your portfolio" → /portal/calculator) and a demo CTA ("Request a demo" → /#demo) via PageCtaSection | VERIFIED | `SvCtaSection.tsx` is a 5-line thin wrapper importing and rendering `PageCtaSection`. `PageCtaSection` confirmed to contain both Link elements with correct hrefs. The safe-verify page.tsx imports and renders `<SvCtaSection />`. |
| 2 | Authenticating via the primary funnel (homepage teaser → /portal/login → /portal/calculator) fires a portal_login Attio event — not only when navigating to the dashboard | VERIFIED | `PortalLoginTracker` is imported and rendered in `src/app/(portal)/layout.tsx` — which wraps ALL authenticated portal routes including /portal/calculator. Chain confirmed: layout.tsx → PortalLoginTracker → firePortalLogin server action → /api/attio/event. |
| 3 | PortalLoginTracker is NOT mounted in portal/page.tsx (no double-fire when user visits /portal dashboard) | VERIFIED | Zero occurrences of "PortalLoginTracker" in `src/app/(portal)/portal/page.tsx`. The file imports only `next/link`. |
| 4 | npm run build and npm run lint pass with zero errors | HUMAN VERIFIED | Per SUMMARY.md: human verification checkpoint approved by user. Lint and build confirmed passing in SUMMARY task commits. Commits `75715ec` and `6ddd549` confirmed in git log with correct file change counts matching the expected diffs. |

**Score:** 4/4 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/marketing/safe-verify/SvCtaSection.tsx` | Thin wrapper over PageCtaSection (4–5 lines) containing `PageCtaSection` | VERIFIED | File is 5 lines: import statement, blank line, exported function rendering `<PageCtaSection />`. No `Link`, no `section`, no `className`, no `/contact` reference. |
| `src/app/(portal)/layout.tsx` | Portal layout with PortalLoginTracker mounted for all authenticated portal routes | VERIFIED | File imports `PortalLoginTracker` from `@/app/(portal)/portal/PortalLoginTracker` and renders `<PortalLoginTracker />` as first child inside `<NuqsAdapter>`. No `'use client'` directive on the layout. |
| `src/app/(portal)/portal/page.tsx` | Portal dashboard page WITHOUT PortalLoginTracker (removed) | VERIFIED | File imports only `next/link`. No `PortalLoginTracker` import or usage. Dashboard card content (heading, description, two link buttons) is intact and unchanged. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/components/marketing/safe-verify/SvCtaSection.tsx` | `src/components/marketing/shared/PageCtaSection.tsx` | import and render | WIRED | Line 1: `import { PageCtaSection } from '@/components/marketing/shared/PageCtaSection'`. Line 4: `return <PageCtaSection />`. |
| `src/app/(marketing)/safe-verify/page.tsx` | `src/components/marketing/safe-verify/SvCtaSection.tsx` | import and render | WIRED | Line 8: import confirmed. Line 25: `<SvCtaSection />` rendered in JSX. |
| `src/app/(portal)/layout.tsx` | `src/app/(portal)/portal/PortalLoginTracker.tsx` | import and render in JSX | WIRED | Line 3: import confirmed. Line 14: `<PortalLoginTracker />` rendered as first child of NuqsAdapter. |
| `src/app/(portal)/portal/PortalLoginTracker.tsx` | `src/app/actions/attio.ts` (firePortalLogin) | useEffect → firePortalLogin call | WIRED | Line 4: `import { firePortalLogin } from '@/app/actions/attio'`. Line 11: `firePortalLogin(data.user.email)` called inside useEffect with email guard. |
| `src/app/actions/attio.ts` (firePortalLogin) | `/api/attio/event` | fetch POST | WIRED | Lines 29–36: `fetch(`${BASE}/api/attio/event`, ...)` with `event: 'portal_login'` and `email` in body. |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| SV-09 | 08-01-PLAN.md | CTAs: calculator link + demo request on /safe-verify page | SATISFIED | `SvCtaSection.tsx` wraps `PageCtaSection`, which provides "See the value for your portfolio" (→ /portal/calculator) and "Request a demo" (→ /#demo). REQUIREMENTS.md status: Complete. |
| PORT-04 | 08-01-PLAN.md | Sales team Attio notification on new portal signup | SATISFIED | `PortalLoginTracker` in portal layout.tsx fires `firePortalLogin` for all portal entry paths, including /portal/calculator primary funnel. REQUIREMENTS.md status: Complete. |

No orphaned requirements found. Both IDs declared in the plan are accounted for in REQUIREMENTS.md and implemented in the codebase.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | — | — | None found |

Scan across all three modified files (`SvCtaSection.tsx`, `layout.tsx`, `portal/page.tsx`) returned zero matches for: TODO, FIXME, XXX, HACK, PLACEHOLDER, placeholder, coming soon, return null (non-intentional), empty handlers, or stub patterns.

---

### Human Verification Required

The following items require human testing and cannot be verified programmatically:

#### 1. Visual rendering of dual CTAs on /safe-verify

**Test:** Run `npm run dev`, navigate to http://localhost:3000/safe-verify, scroll to the bottom CTA section.
**Expected:** Two buttons visible — "See the value for your portfolio" (accent outline style) and "Request a demo" (primary style). The old custom section copy ("Start with Safe Verify", "The fastest entry point for issuers.") must not appear.
**Why human:** Visual layout and button presence requires browser rendering; grep confirms component wiring but not CSS render output.
**Status:** Approved — per SUMMARY.md: "human verification checkpoint approved" and "user confirmed /safe-verify shows dual CTAs".

#### 2. portal_login fires on /portal/calculator entry path

**Test:** With `INTERNAL_API_SECRET=dev-secret` in `.env.local`, authenticate and navigate directly to http://localhost:3000/portal/calculator (bypassing the dashboard). Check server console for `[Attio] firePortalLogin` log.
**Expected:** Event fires without visiting /portal dashboard.
**Why human:** Requires live Supabase auth session and network call observation; cannot be verified statically.
**Status:** Approved — per SUMMARY.md: "portal_login firing on /portal/calculator entry path" confirmed by user.

---

### Commit Verification

| Commit | Hash | Files Changed | Expected |
|--------|------|---------------|----------|
| feat(08-01): replace SvCtaSection with PageCtaSection thin wrapper (SV-09) | `75715ec` | `SvCtaSection.tsx` (1 file, 2 ins / 22 del) | Matches — 25-line custom section reduced to 4-line wrapper |
| feat(08-01): move PortalLoginTracker to portal layout (PORT-04) | `6ddd549` | `layout.tsx` (+2), `portal/page.tsx` (-3) | Matches — both coordinated edits in single atomic commit |

Both commits exist in git log and their stat output matches the plan's expected changes exactly.

---

### Gaps Summary

No gaps found. All four observable truths are verified. Both requirements (SV-09 and PORT-04) are satisfied. All key links are wired. No anti-patterns detected. Both commits exist and their diffs match the plan exactly.

---

_Verified: 2026-03-01T13:00:00Z_
_Verifier: Claude (gsd-verifier)_
