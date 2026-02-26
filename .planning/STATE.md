# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-19)

**Core value:** Every page must convert visitors into demo requests, deepen portal engagement, or give the sales team deal-readiness signal — nothing ships that doesn't serve one of those three outcomes.
**Current focus:** Phase 5 (portal)

## Current Position

Phase: 6 of 6 (Analytics + CRM)
Plan: 3 of 3 in current phase — Plan 03 COMPLETE
Status: Phase 06 COMPLETE — All PostHog event instrumentation wired; forms route through intermediate API; CTA clicks tracked
Last activity: 2026-02-23 — Plan 06-03 complete (form event instrumentation + CTA click tracking across all public pages)

Progress: [███] 100% of Phase 06

## Performance Metrics

**Velocity:**
- Total plans completed: 19
- Average duration: 9.1 min
- Total execution time: 172 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 4/4 | 62 min | 15 min |
| 02-homepage | 4/4 | 10 min | 2.5 min |
| 03-platform-dynamic-security-codes | 4/4 | 12 min | 3 min |
| 04-safe-verify | 4/4 | 65 min | 16 min |
| 05-company-contact | 2/2 | 25 min | 12.5 min |

**Recent Trend:**
- Last 5 plans: 38 min, 19 min, 2 min, 9 min, 16 min
- Trend: 05-02 required one lint deviation fix (useMemo pattern for useSearchParams-derived state); otherwise clean

*Updated after each plan completion*
| Phase 04 P03 | 6 | 2 tasks | 2 files |
| Phase 04-safe-verify P04 | 2 | 2 tasks | 2 files |
| Phase 05-company-contact P01 | 9 | 3 tasks | 7 files |
| Phase 05-company-contact P02 | 16 | 2 tasks | 4 files |
| Phase 06-analytics-crm P01 | 2 | 2 tasks | 4 files |
| Phase 06-analytics-crm P02 | 3 | 2 tasks | 5 files |
| Phase 06-analytics-crm P03 | 4 | 2 tasks | 6 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-phase]: Next.js 14+ over Astro — portal requires auth middleware and server-side API routes
- [Pre-phase]: DaisyUI + Tailwind CSS — component library without heavy UI framework overhead
- [Pre-phase]: Attio API key stubbed in dev — real key wired in prod via Netlify env var
- [Pre-phase]: Agentic mockup served in portal iframe — existing HTML is production-quality, no rebuild needed
- [01-01]: Portal page at /portal path (not root) — both route groups cannot resolve to / simultaneously
- [01-01]: turbopack.root set to path.resolve(__dirname) — suppresses workspace lockfile warning from Netlify parent package-lock
- [01-01]: jsx=react-jsx enforced by Next.js 16 — mandatory for automatic JSX runtime, overrides plan spec of "preserve"
- [01-01]: Scaffolded via temp dir — create-next-app refuses to run in directories with existing files
- [Phase 01-02]: Lint step uses npm run lint (eslint directly) not next lint — next lint is not a CLI subcommand in Next.js 16
- [Phase 01-02]: _archive/ and dist/ added to eslint globalIgnores — prevents archived Astro files from failing CI lint gate
- [Phase 01-03]: Empty interfaces in Card.tsx replaced with type aliases — satisfies @typescript-eslint/no-empty-object-type rule
- [Phase 01-03]: CSS import order in globals.css: @import tailwindcss → @plugin daisyui → @import theme.css (strict Tailwind v4 order)
- [Phase 01-04]: Inline SVG for icons — no Bootstrap Icons CDN or npm icon package; zero dependency, SSR-safe
- [Phase 01-04]: Nav is Client Component ('use client') — mega-menu needs useState; Footer stays Server Component
- [Phase 01-04]: DaisyUI v5 button tokens: --border: 0 + --depth: 0 (not --border-btn which was v4-only)
- [Phase 01-04]: Nav font size: text-base font-medium on ghost nav links (not btn-sm which forced 12px)
- [Phase 02-01]: Stub files created for plans 02-02 through 02-04 — page.tsx compiles immediately, parallel plan execution unblocked
- [Phase 02-01]: useCallback wrapping rotateCvv — stabilises useEffect dependency, prevents interval recreation on each render
- [Phase 02-01]: Teal glow via sibling div bg-accent blur-xl opacity-40 — no custom CSS keyframe needed
- [Phase 02-01]: ESLint globalIgnores updated with '**/* 2.*' pattern — excludes accidental duplicate files from CI lint
- [Phase 02-02]: UrgencySection uses bg-neutral for light section — contrasts against dark hero above, matches DaisyUI v5 semantic token as specified
- [Phase 02-02]: id="audiences" preserved on AudiencesSection — smooth-scroll anchor for hero "See How It Works" CTA
- [Phase 02-02]: Architecture diagram placeholder as nested divs — no SVG needed, exactly matches plan spec with border-accent connector lines
- [Phase 02-03]: An Post logo uses styled text placeholder in brand green #006229 — no SVG/PNG asset available yet
- [Phase 02-03]: Irish Fintech Award uses inline SVG star badge placeholder — no physical asset available
- [Phase 02-03]: HumanCostSection uses max-w-4xl container for editorial feel; error colour (not red-*) for pull stat borders
- [Phase 02-04]: DaisyUI v5 fieldset/fieldset-legend pattern for all form field components — no form-control or label-text (Input.tsx updated, Textarea.tsx created)
- [Phase 02-04]: Portfolio calculator link placed below form as standalone link outside form element — per locked decision in CONTEXT.md
- [Phase 03-01]: max-w-5xl for argument sections (PlatformHeroSection, ApproachSection) — narrower editorial width vs 7xl gallery sections
- [Phase 03-01]: Stub files for all four plan 03-02 sections (ProductPortfolioSection, CompetitiveSection, PlatformProofSection, PlatformCtaSection) created immediately — /platform builds from Task 1
- [Phase 03-01]: CSS connector lines in ArchitectureDiagram hidden on mobile (hidden sm:block) — diagram degrades to stacked product cards on narrow viewports
- [Phase 03-01]: DSC and Safe Verify at primary visual weight (border-primary), five additional products at secondary (border-base-300) — matches two-tier CONTEXT.md decision
- [Phase 03-03]: Stub-first scaffolding for all six DSC sections in Task 1 — page.tsx compiles from the start; same pattern as plan 03-01
- [Phase 03-03]: No next/image in HowItWorksSection — screenshots not yet in public/screenshots/dsc/; placeholder divs with aspect-[9/16] prevent broken images
- [Phase 03-03]: max-w-5xl for argument sections (DscHeroSection, DscSolutionSection), max-w-7xl for gallery grid (HowItWorksSection) — consistent with phase 03 width decisions
- [Phase 03-02]: shared/PageCtaSection created in marketing/shared/ — reusable CTA component; plan 03-04 imports directly from shared/ avoiding duplication
- [Phase 03-02]: Unicode escape \u2019 for curly apostrophes inside single-quoted JS string literals — plan copy pasted from PLAN.md contained typographically correct apostrophes causing TS parse errors
- [Phase 03-04]: DscProofSection duplicates homepage ProofSection pattern rather than extracting to shared/ — extraction deferred to Phase 4+ if a third usage emerges
- [Phase 03-04]: DscCtaSection is a 5-line thin wrapper over shared PageCtaSection — consistent with PlatformCtaSection pattern from plan 03-02
- [Phase 04-safe-verify]: Phone mockup device colours (#111, #0a0a0a) as inline styles — literal device colours not brand tokens
- [Phase 04-safe-verify]: SvHeroSection returns React fragment with two sections (hero + stats strip) in one component export
- [Phase 04-safe-verify]: SvUseCaseTabs stub has no use client at stub stage — added in plan 04-02 when tabbed implementation replaces it
- [Phase 04-02]: JSX eyebrow text '// How It Works' wrapped as {'// ...'} — react/jsx-no-comment-textnodes ESLint rule treats bare // in JSX tag children as comment nodes
- [Phase 04-02]: Icon components defined as named arrow functions at module scope — keeps JSX render clean, avoids inline SVG repetition inside data arrays
- [Phase 04-02]: FlowStep data arrays defined as const at module scope — separates step content from render logic cleanly
- [Phase 04-03]: Ghost numeral ordering cue via text-6xl font-extrabold text-primary/15 — large opacity-faded number provides card order without structural dependency
- [Phase 04-03]: Strikethrough metric row uses text-base-content/30 line-through — DaisyUI token + Tailwind utility, no custom CSS needed
- [Phase 04]: Ghost numeral ordering cue via text-6xl font-extrabold text-primary/15 — large opacity-faded number provides card order without structural dependency
- [Phase 04]: Strikethrough metric row uses text-base-content/30 line-through — DaisyUI token + Tailwind utility, no custom CSS needed
- [Phase 04-safe-verify]: SvCtaSection mirrors DscCtaSection exactly: 5-line thin wrapper over shared PageCtaSection
- [Phase 04-safe-verify]: DSC cross-link placed as inline paragraph below cards grid, matching DscSolutionSection cross-link pattern
- [Phase 04-safe-verify]: Seven-card xl/4-col grid produces 4+3 row split — accepted as-is without centring hack
- [Phase 05-01]: CompanyHumanCostSection is self-contained — not imported from home/HumanCostSection.tsx; dedicated Company framing with /contact CTA (not /#demo)
- [Phase 05-01]: CompanyCtaSection is a 4-line thin wrapper over shared PageCtaSection — consistent with DscCtaSection and SvCtaSection pattern
- [Phase 05-01]: PersonSilhouette inline SVG uses rx=40 on rect for full-circle appearance inside rounded-full overflow-hidden container
- [Phase 05-01]: TeamMember key uses name+title concatenation — handles duplicate '[Name]' placeholder keys without React warning
- [Phase 05-02]: useMemo (not useState+useEffect) for source derived from useSearchParams — eliminates react-hooks/set-state-in-effect ESLint violation while keeping reactivity
- [Phase 05-02]: react-calendly PopupWidget with placeholder CALENDLY_URL constant at module scope — real URL is a content substitution post-deployment
- [Phase 05-02]: Contact form fields: name, role, company, email, message (no phone; message not challenge — distinct from demo-request)
- [Phase 06-analytics-crm]: x-internal-token guard: 403 on absent/mismatched header — Attio API key never reaches browser network tab
- [Phase 06-analytics-crm]: ATTIO_ENABLED=true required explicitly (not just ATTIO_API_KEY presence) — prevents accidental Attio calls on Netlify preview branches
- [Phase 06-analytics-crm]: Silent prod failure on Attio note creation — user sees form success, Netlify already captured the lead (per locked CONTEXT.md decision)
- [Phase 06-analytics-crm]: opt_out_capturing_persistence_type:'memory' removed — posthog-js v1.352 types only accept localStorage|cookie; session-only consent via ConsentBanner useState
- [Phase 06-analytics-crm]: PostHogPageView wrapped in Suspense fallback=null — mandatory for useSearchParams in Next.js App Router
- [Phase 06-analytics-crm]: layout.tsx remains Server Component — Providers.tsx is sole client boundary for PostHog
- [Phase 06-03]: HeroSection, UrgencySection, SvHeroSection converted to Client Components — required for usePostHog(); no RSC benefits were exploited by these three sections
- [Phase 06-03]: form_start deduplication via formStarted boolean state — fires once on first name-field keystroke, not on every keystroke
- [Phase 06-03]: Input component accepts onKeyDown directly — forwardRef + ...props spread pattern confirmed; no wrapper div needed
- [Phase 06-03]: SvBenefitsSection unchanged — confirmed content-only section with no CTA links after reading current file

### Pending Todos

- Wire real Calendly URL in production (`.planning/todos/pending/2026-02-23-wire-real-calendly-url-in-production.md`)
- Add PostHog key to production env (`.planning/todos/pending/2026-02-23-add-posthog-key-to-production-env.md`)
- Change portal nav link from lock icon to descriptive label (`.planning/todos/pending/2026-02-23-change-portal-nav-link-from-lock-icon-to-descriptive-label.md`)
- Replace Irish Fintech Award placeholder with real badge image (`.planning/todos/pending/2026-02-23-replace-irish-fintech-award-placeholder-with-real-badge-image.md`)
- Create privacy policy and terms and conditions pages (`.planning/todos/pending/2026-02-23-create-privacy-policy-and-terms-and-conditions-pages.md`)
- Add resources page or remove footer link (`.planning/todos/pending/2026-02-23-add-resources-page-or-remove-footer-link.md`)

### Roadmap Evolution

- Phase 7 added: Add value calculators to the portal

### Blockers/Concerns

- [Phase 3 - RESOLVED]: Architecture diagram (one API → seven products) delivered as CSS two-tier box diagram in Plan 03-01; production SVG can replace it later without page structure change
- [Phase 4]: Production SVG for Safe Verify outbound flow diagram must replace the PDF in a future update (Phase 1 v2 milestone)

## Session Continuity

Last session: 2026-02-23
Stopped at: Completed 06-03-PLAN.md — Form event instrumentation: DemoFormSection + ContactFormSection POST JSON to intermediate routes; form_start, demo_request, contact_request, posthog.identify wired. CTA clicks instrumented: cta_click {source: hero/urgency/calculator/product-page}; calendly_open on Calendly button. Phase 06 COMPLETE (3/3 plans done).
Resume file: None
