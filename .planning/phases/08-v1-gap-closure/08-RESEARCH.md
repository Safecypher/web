# Phase 8: v1.0 Gap Closure — Research

**Researched:** 2026-03-01
**Domain:** React component composition (SV-09) + Next.js App Router client component placement (PORT-04)
**Confidence:** HIGH — both gaps are surgical fixes with fully verified current file state; no new libraries required

---

## Summary

Phase 8 closes two discrete gaps identified by the v1.0 milestone audit. Both are contained, surgical changes with zero risk of cascading regressions — no new libraries, no new routes, no schema changes.

**SV-09** (`SvCtaSection` missing calculator + demo links) was caused by commit `6f8fb94`, which replaced the original thin wrapper over `PageCtaSection` with a custom 25-line standalone section after Phase 04-04 verification completed. The fix is a one-file revert: replace the custom component body with a 4-line thin wrapper identical to `DscCtaSection`. Additionally, the audit identified that `ContactFormSection`'s `?from=product` source branch is currently unreachable because `SvCtaSection` links to `/contact` with no params. Once SV-09 is fixed to pass `?from=product`, this dead-code branch self-resolves.

**PORT-04** (`portal_login` Attio event skipped in primary funnel) was caused by `PortalLoginTracker` being mounted only in `src/app/(portal)/portal/page.tsx`. The primary auth funnel (homepage teaser → `/portal/login?callbackUrl=/portal/calculator?portfolioSize=...`) redirects post-auth directly to `/portal/calculator`, bypassing `/portal/page.tsx` entirely. The fix is to move `PortalLoginTracker` into `src/app/(portal)/layout.tsx` so it fires on every authenticated portal page load regardless of which `callbackUrl` the auth callback resolves to.

**Primary recommendation:** Fix SV-09 by replacing `SvCtaSection.tsx` with a thin wrapper over `PageCtaSection` (and optionally adding `?from=product` to its contact link). Fix PORT-04 by importing `PortalLoginTracker` into the portal layout. Both changes are isolated — one file each.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SV-09 | CTAs: calculator link + demo request on `/safe-verify` page | `PageCtaSection` already provides both CTAs; `SvCtaSection` just needs to wrap it (identical to `DscCtaSection` pattern) |
| PORT-04 | Sales team Attio notification on new portal signup | `PortalLoginTracker` component and `firePortalLogin` Server Action already exist and work; component placement is the only fix needed |
</phase_requirements>

---

## Standard Stack

### Core

No new libraries are required. All existing dependencies cover the changes:

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16 (in use) | File-based routing, layouts, Server/Client Components | Project standard |
| React | 19 (in use) | `'use client'`, `useEffect` in `PortalLoginTracker` | Project standard |
| Supabase client (`@supabase/ssr`) | in use | `createClient().auth.getUser()` for email lookup | Established in Phase 7 |
| Server Actions (`'use server'`) | in use | `firePortalLogin` in `src/app/actions/attio.ts` | Established in Phase 6/7 |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/link` | in use | `<Link href="/portal/calculator">` and `<Link href="/#demo">` in PageCtaSection | Already used; no action needed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Moving `PortalLoginTracker` to portal layout | Moving it to the auth callback route (`/portal/auth/callback/route.ts`) | Route handler fires server-side; `PortalLoginTracker` uses client-side `createClient()` — would require a different implementation. Layout is simpler and consistent with `DemoPageTracker` pattern. |
| Thin wrapper over `PageCtaSection` for SV-09 | Editing `PageCtaSection` to accept props and customise per-product | Props adds unnecessary abstraction; all product pages want identical CTA content (calculator + demo). Thin wrapper is the established pattern. |

**Installation:** None required.

---

## Architecture Patterns

### Recommended Project Structure

No new files or folders. Two file changes:

```
src/
  components/marketing/safe-verify/
    SvCtaSection.tsx          # REPLACE body — thin wrapper over PageCtaSection
  app/(portal)/
    layout.tsx                # ADD PortalLoginTracker import + mount
    portal/
      PortalLoginTracker.tsx  # KEEP as-is (no changes to the component itself)
      page.tsx                # REMOVE PortalLoginTracker usage (it moves up to layout)
```

### Pattern 1: Thin CTA Wrapper (SV-09)

**What:** A product-page CTA section is a 4-line wrapper that delegates entirely to `PageCtaSection`.
**When to use:** Every product page that needs calculator + demo CTAs.
**Example (DscCtaSection — the reference pattern to copy):**

```typescript
// src/components/marketing/dsc/DscCtaSection.tsx
import { PageCtaSection } from '@/components/marketing/shared/PageCtaSection'

export function DscCtaSection() {
  return <PageCtaSection />
}
```

`SvCtaSection.tsx` should become identical to this — 4 lines.

**Optional addition — `?from=product` param:**

The audit identified that `ContactFormSection` has a `source === 'product'` branch (heading: "Request a demo") that is currently dead code. Passing `?from=product` from the demo CTA in `PageCtaSection` would activate it. However, this requires modifying the shared `PageCtaSection` which is used by all product pages. Two sub-options:

1. **No change to PageCtaSection:** SV-09 is satisfied by the thin wrapper. The `?from=product` branch self-resolves as a separate concern (tech debt, not a SV-09 requirement).
2. **Update PageCtaSection's demo link:** Change `href="/#demo"` to `href="/#demo"` with a `?from=product` search param — but this would affect DSC, Platform, and Company pages, which currently land on `source === 'default'`. This is a wider change and is NOT required by SV-09.

**Recommendation:** Do not touch `PageCtaSection`. The thin wrapper satisfies SV-09. The `?from=product` dead-code is minor tech debt documented in the audit.

### Pattern 2: Portal Layout Client Component Mount (PORT-04)

**What:** A `'use client'` tracker component mounted in the portal layout fires on every authenticated portal page render, regardless of which child route is active.
**When to use:** Any portal-wide event that must fire regardless of entry point (login flow destination).
**Reference — DemoPageTracker (same pattern, already working in a page):**

```typescript
// src/app/(portal)/portal/demo/DemoPageTracker.tsx
'use client'
import { useEffect } from 'react'
import { fireMockupViewed } from '@/app/actions/attio'
import { createClient } from '@/lib/supabase/client'

export function DemoPageTracker() {
  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      fireMockupViewed(data.user?.email ?? undefined)
    })
  }, [])
  return null
}
```

`PortalLoginTracker` has an identical structure and is already working. It just needs to move to the layout.

**Critical constraint — layout.tsx Server Component boundary:**

`src/app/(portal)/layout.tsx` is currently a pure Server Component (no `'use client'`). Adding `PortalLoginTracker` (which uses `useEffect`) requires that the layout either:

1. **Adds `'use client'` to layout.tsx** — This would make the entire layout a Client Component, including `NuqsAdapter` and `PortalSidebar`. This may be acceptable but is the widest change.
2. **Imports `PortalLoginTracker` as a Client Component leaf inside the Server Component layout** — This is the Next.js preferred pattern. Server Components CAN render Client Components as children. No `'use client'` on `layout.tsx` is needed. The `PortalLoginTracker` itself is already `'use client'`, which is sufficient.

**Recommendation:** Option 2. Import `PortalLoginTracker` directly into `layout.tsx` without adding `'use client'` to the layout. This is standard Next.js App Router behavior — Server Components render Client Components all the time.

**Verified by:** Next.js App Router docs — "Client Components can be used inside Server Components. The Server Component renders the tree and passes props to the Client Component at the boundary."

```typescript
// src/app/(portal)/layout.tsx (modified)
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PortalSidebar } from '@/components/portal/PortalSidebar'
import { PortalLoginTracker } from '@/app/(portal)/portal/PortalLoginTracker'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NuqsAdapter>
      <PortalLoginTracker />
      <div className="flex min-h-screen bg-base-100">
        <PortalSidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </NuqsAdapter>
  )
}
```

Then remove `<PortalLoginTracker />` from `portal/page.tsx` (and its import) to avoid double-firing.

### Anti-Patterns to Avoid

- **Moving PortalLoginTracker to the auth callback route:** The auth callback (`/portal/auth/callback/route.ts`) is a Route Handler (server-side). It does not mount React components. Firing `firePortalLogin` there would require a server-side call, which changes the pattern away from the established client-side tracker approach. Keep the client component pattern for consistency.
- **Double-mount:** If `PortalLoginTracker` is added to the layout but NOT removed from `portal/page.tsx`, it will fire twice when a user navigates to the dashboard. Remove it from `portal/page.tsx`.
- **Adding `'use client'` to layout.tsx unnecessarily:** This is not needed. Import the Client Component tracker into the Server Component layout — this is standard Next.js.
- **Modifying `PageCtaSection` for SV-09:** The shared component works correctly. Only `SvCtaSection.tsx` needs to change.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CTA with calculator + demo links | Custom section with inline styles | `PageCtaSection` (shared) | Already exists, used by DSC, Platform, Company |
| Portal-wide login event | New Server Action or API route | `PortalLoginTracker` + `firePortalLogin` (both already exist) | Already wired and tested in portal/page.tsx |

**Key insight:** Both fixes are configuration/placement changes, not new feature builds. The infrastructure is already in place.

---

## Common Pitfalls

### Pitfall 1: Double-firing `portal_login` if PortalLoginTracker is not removed from portal/page.tsx

**What goes wrong:** `PortalLoginTracker` fires once from the layout (on every portal page load) AND once from `portal/page.tsx` (when dashboard is visited). Users who navigate to `/portal` after login get two Attio events.
**Why it happens:** Forgetting to clean up the original mount point when moving to layout.
**How to avoid:** After adding to layout, remove the import and usage from `portal/page.tsx` in the same commit.
**Warning signs:** Two `portal_login` events in Attio for a single session.

### Pitfall 2: `PortalLoginTracker` fires for unauthenticated users

**What goes wrong:** If the middleware redirects are ever bypassed or tested in dev, `PortalLoginTracker` fires with no email and `firePortalLogin` is called with an empty/undefined value.
**Why it happens:** The `useEffect` calls `getUser()` — if there is no session, `data.user` is null.
**How to avoid:** The existing guard `if (data.user?.email)` in `PortalLoginTracker` handles this correctly. No change needed.
**Warning signs:** Attio `portal_login` events with no email field.

### Pitfall 3: Layout fires on login page (unauthenticated state)

**What goes wrong:** The portal layout wraps ALL `(portal)` routes, including `/portal/login`. If `PortalLoginTracker` is in the layout, it will also run on the login page before authentication.
**Why it happens:** `src/app/(portal)/layout.tsx` applies to login, auth callback, and all authenticated pages.
**How to avoid:** The existing guard in `PortalLoginTracker` — `if (data.user?.email)` — ensures the event only fires when a real user is authenticated. No additional guard needed in the layout.
**Warning signs:** None, as the guard handles it. But worth verifying in dev.

### Pitfall 4: `PortalLoginTracker` import path from layout.tsx

**What goes wrong:** Incorrect relative path for the import causes a build error.
**Why it happens:** `layout.tsx` is at `src/app/(portal)/layout.tsx`; `PortalLoginTracker.tsx` is at `src/app/(portal)/portal/PortalLoginTracker.tsx`.
**How to avoid:** Use the `@/` alias: `import { PortalLoginTracker } from '@/app/(portal)/portal/PortalLoginTracker'`. This is the established pattern throughout the project.
**Warning signs:** `Module not found` build error.

---

## Code Examples

Verified from actual current file state:

### SV-09: New SvCtaSection.tsx (complete file)

```typescript
// src/components/marketing/safe-verify/SvCtaSection.tsx
import { PageCtaSection } from '@/components/marketing/shared/PageCtaSection'

export function SvCtaSection() {
  return <PageCtaSection />
}
```

### PORT-04: Updated portal layout.tsx (complete file)

```typescript
// src/app/(portal)/layout.tsx
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PortalSidebar } from '@/components/portal/PortalSidebar'
import { PortalLoginTracker } from '@/app/(portal)/portal/PortalLoginTracker'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NuqsAdapter>
      <PortalLoginTracker />
      <div className="flex min-h-screen bg-base-100">
        <PortalSidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </NuqsAdapter>
  )
}
```

### PORT-04: Updated portal/page.tsx (PortalLoginTracker removed)

```typescript
// src/app/(portal)/portal/page.tsx
import Link from 'next/link'

export default function PortalPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold mb-2">Welcome to SafeCypher Portal</h1>
          <p className="text-base-content/70 mb-6">
            Explore your ROI with our interactive value calculator, or view the agentic commerce demo to see SafeCypher in action.
          </p>
          <div className="card-actions gap-4 flex-col sm:flex-row">
            <Link href="/portal/calculator" className="btn btn-primary flex-1">
              Open Calculator
            </Link>
            <Link href="/portal/demo" className="btn btn-ghost flex-1">
              View Agentic Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Existing firePortalLogin Server Action (unchanged — for reference)

```typescript
// src/app/actions/attio.ts (no changes needed)
export async function firePortalLogin(email: string) {
  try {
    await fetch(`${BASE}/api/attio/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': process.env.INTERNAL_API_SECRET ?? '',
      },
      body: JSON.stringify({ event: 'portal_login', email }),
    })
  } catch (err) {
    console.error('[Attio] firePortalLogin failed', err)
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SvCtaSection — thin wrapper over PageCtaSection | SvCtaSection — custom 25-line standalone section (commit 6f8fb94) | Phase 04-04 → post-Phase-07 | SV-09 gap: no calculator or demo CTA on /safe-verify |
| PortalLoginTracker in portal/page.tsx | PortalLoginTracker should be in portal layout.tsx | Phase 07-01 design; never corrected | PORT-04 gap: event skipped when callbackUrl bypasses dashboard |

**Deprecated/outdated:**
- `SvCtaSection` custom implementation: replaced by thin wrapper in this phase.

---

## Open Questions

1. **Should the demo link in PageCtaSection pass `?from=product`?**
   - What we know: `ContactFormSection` has a `source === 'product'` branch with distinct heading ("Request a demo") that is currently dead code. The `default` source fires when no param is present.
   - What's unclear: Whether activating this branch is desired for SV-09 specifically, or for all product pages (DSC, Platform, Company).
   - Recommendation: Do not change `PageCtaSection` for this phase. SV-09 only requires "calculator link + demo request" — both are present in `PageCtaSection` as-is. Log `?from=product` activation as a separate todo if desired.

2. **Should `PortalLoginTracker` be renamed to reflect its new scope?**
   - What we know: The component will now fire on every portal page (not just the dashboard). The name implies it tracks portal logins, which is still accurate.
   - What's unclear: Whether "login tracker" is semantically confusing when mounted in a layout vs a page.
   - Recommendation: Keep the name. The component fires a `portal_login` event — that is what it does. Renaming adds churn with no functional benefit.

---

## Verification Plan (for PLAN.md to reference)

After implementing both fixes, verification should confirm:

**SV-09:**
- `SvCtaSection.tsx` is ≤5 lines and imports `PageCtaSection` from shared
- `/safe-verify` page renders both "See the value for your portfolio" (→ `/portal/calculator`) and "Request a demo" (→ `/#demo`) buttons
- `npm run build` and `npm run lint` pass

**PORT-04:**
- `layout.tsx` imports and renders `<PortalLoginTracker />`
- `portal/page.tsx` does NOT import or render `PortalLoginTracker` (no double-fire)
- `portal_login` Attio event fires when a user visits `/portal/calculator` directly after auth (not just `/portal` dashboard)
- Dev verification: `INTERNAL_API_SECRET=any-dev-value` in `.env.local` needed; check server console for `[Attio] firePortalLogin` log or API call

---

## Sources

### Primary (HIGH confidence)

- Direct file reads (current state confirmed 2026-03-01):
  - `src/components/marketing/safe-verify/SvCtaSection.tsx` — confirmed custom 25-line standalone (not wrapper)
  - `src/components/marketing/shared/PageCtaSection.tsx` — confirmed provides both `/portal/calculator` and `/#demo` CTAs
  - `src/components/marketing/dsc/DscCtaSection.tsx` — confirmed 4-line thin wrapper pattern
  - `src/app/(portal)/portal/PortalLoginTracker.tsx` — confirmed `'use client'` component with `getUser()` guard
  - `src/app/(portal)/layout.tsx` — confirmed Server Component with no Client Component imports currently
  - `src/app/(portal)/portal/page.tsx` — confirmed `PortalLoginTracker` mounted here
  - `src/app/(portal)/portal/auth/callback/route.ts` — confirmed redirects to `callbackUrl` after auth (bypasses `/portal`)
  - `src/app/actions/attio.ts` — confirmed `firePortalLogin` Server Action exists and works
- `.planning/v1.0-MILESTONE-AUDIT.md` — gap descriptions with commit evidence
- `.planning/REQUIREMENTS.md` — SV-09 and PORT-04 requirement text
- `.planning/STATE.md` — accumulated decisions and patterns

### Secondary (MEDIUM confidence)

- Next.js App Router behavior (Server Components rendering Client Components as children) — standard documented behavior, verified by existing project usage (e.g., `layout.tsx` already renders `PortalSidebar` which is a Client Component via `NuqsAdapter`)

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; all code is existing project code
- Architecture: HIGH — patterns directly verified from current file state
- Pitfalls: HIGH — double-fire and import path pitfalls identified from direct code inspection

**Research date:** 2026-03-01
**Valid until:** Stable indefinitely (no fast-moving dependencies; pure React/Next.js composition)
