# Codebase Concerns

**Analysis Date:** 2026-02-19

## Tech Debt

**Monolithic Static HTML Implementation:**
- Issue: Current site is built as three separate static HTML files (`index.html`, `safe-verify-landing.html`, `/demos/boa/bofa-agentic-banking-mockup.html`) totaling 3,407 lines with inline CSS and vanilla JavaScript
- Files: `index.html` (1115 lines), `safe-verify-landing.html` (759 lines), `/demos/boa/bofa-agentic-banking-mockup.html` (1533 lines)
- Impact: No component reuse, high maintenance burden, impossible to maintain consistency across pages, cannot add gated features (portal auth), no server-side rendering capability
- Fix approach: Migrate to Next.js 14+ with App Router per Phase 0 of PRD (SafeCypher_Website_PRD_v1.md). Extract shared components into React component library in `/components/ui` and `/components/marketing`. Use SSG for public pages via `generateStaticParams`

**Inline Styles in HTML:**
- Issue: All CSS defined via `<style>` tags in HTML files, making it impossible to share design tokens or maintain consistent branding across multiple pages
- Files: `index.html` (extensive inline styles, lines 12-800+), `safe-verify-landing.html` (inline styles, lines 11+), `/demos/boa/bofa-agentic-banking-mockup.html` (inline styles)
- Impact: Color changes require manual updates to multiple files (e.g., `--brand-blue: #3b82f6` in index.html vs. `--brand-blue: #0066FF` in safe-verify-landing.html — **inconsistent**), no shared variables, no design system, scaling to 20+ pages is unsustainable
- Fix approach: Extract all CSS into Tailwind CSS configuration (`tailwind.config.ts`) or CSS modules. Define all colors, fonts, and spacing in a single source of truth. Implement design tokens via CSS custom properties in a global stylesheet

**Vanilla JavaScript Event Listeners:**
- Issue: Interactive features (mobile menu toggle, card CVV animation, counter animations, intersection observer) written in vanilla JavaScript inline within `<script>` tags
- Files: `index.html` (lines 1008-1113), `safe-verify-landing.html`, `/demos/boa/bofa-agentic-banking-mockup.html`
- Impact: No state management, event handlers duplicated across pages, no error boundaries, difficult to test, hard to add new interactive features, no framework for managing complex interactions
- Fix approach: Convert to React components with hooks (useState, useEffect, useCallback). Use custom hooks for reusable logic (e.g., `useCounterAnimation`, `useMobileMenu`). Leverage React's synthetic event system and component lifecycle

**No Package Manager or Build Tool:**
- Issue: No `package.json`, `node_modules`, Webpack, or Vite configuration. All dependencies and assets manually managed
- Files: Static HTML files directly committed; assets in `/assets/`, `/public/`, `/demos/`
- Impact: No dependency version tracking, no security updates, impossible to add third-party libraries (e.g., analytics, auth, CRM integrations), no build-time optimizations, no hot module replacement (HMR), cannot bundle or minify code, no tree-shaking
- Fix approach: Initialize Next.js project with `pnpm create next-app@latest`. Define all dependencies in `package.json` with pinned versions. Use `package-lock.json` for reproducible installs. Set up GitHub Actions CI/CD to lint, type-check, and build on every PR

**No Type Safety (Vanilla JavaScript):**
- Issue: All JavaScript written in vanilla JS without TypeScript. No type checking or IDE autocomplete support
- Files: `index.html` (line 1008+), `safe-verify-landing.html`, `/demos/boa/bofa-agentic-banking-mockup.html`
- Impact: Runtime errors in production (e.g., missing properties, wrong argument types), refactoring risk, no documentation via types, harder to onboard new developers
- Fix approach: Migrate all JavaScript to TypeScript. Add `tsconfig.json` with `strict: true`. Use Next.js integrated TypeScript support. Define types for all Attio events, portal interactions, and analytics events

---

## Known Bugs

**Inconsistent Brand Colors Across Pages:**
- Symptoms: Primary brand blue differs between pages: `#3b82f6` in index.html, `#0066FF` in safe-verify-landing.html
- Files: `index.html` (line 15), `safe-verify-landing.html` (line 13)
- Trigger: Visual inspection reveals different blue tones on each page; conflicts with unified brand identity
- Workaround: Use hex color `#3b82f6` as canonical; update safe-verify-landing.html to match or migrate to shared design token system

**CVV Animation Timing Race Condition:**
- Symptoms: Card CVV spinner may stutter or fail to animate smoothly if JavaScript execution is delayed; animation timings rely on hardcoded setTimeout values (500ms startup, 3000ms interval)
- Files: `index.html` (lines 1067-1068)
- Trigger: Slow device or high JavaScript load; no debouncing or request animation frame throttling
- Workaround: Use `requestAnimationFrame` instead of `setTimeout` for smoother animations. On Next.js migration, use `useEffect` with `useLayoutEffect` to sync animations with browser paint cycles

**Mobile Menu Not Closing on Link Click (Potential Bug):**
- Symptoms: Mobile menu state may not persist correctly across page navigation in a single-page context
- Files: `index.html` (lines 1026-1031)
- Trigger: In static HTML, works correctly. On Next.js migration with client-side routing, menu state may not reset between page transitions
- Workaround: Ensure mobile menu close logic is triggered by `useRouter` navigation events, not just link clicks. Use Next.js `usePathname` to detect route changes and auto-close menu

**Transaction Counter Animation Fires Every Time Page Scrolls into View:**
- Symptoms: If the `.stats` section scrolls out of and back into view, the counter animation fires again, jumping the number
- Files: `index.html` (lines 1101-1112)
- Trigger: IntersectionObserver triggers multiple times if section leaves viewport and re-enters
- Workaround: Add flag to `hasAnimated` check to prevent re-triggering. Current code has the flag but only on `transactionEl` — ensure it persists across multiple viewport entries

---

## Security Considerations

**No Environment Configuration for Sensitive Data:**
- Risk: No `.env` file structure for API keys, database credentials, CRM integration secrets. The PRD mentions Attio API key, Loops email transport, Supabase database — all would require secure configuration
- Files: `.gitignore` does not include `.env*` patterns; no `env.d.ts` usage beyond TypeScript declarations in `/src/env.d.ts`
- Current mitigation: None detected; code is static HTML with no external API calls
- Recommendations:
  1. Add `.env.local`, `.env.development`, `.env.production` to `.gitignore` immediately
  2. Create `env.example` with all required environment variable names (no values)
  3. On Next.js migration, use `process.env` for public vars, `NEXT_PUBLIC_*` prefix only for browser-safe values
  4. Never expose Attio API key, Loops API key, or Supabase credentials client-side

**Agentic Commerce Mockup Contains Placeholder Financial Data:**
- Risk: `/demos/boa/bofa-agentic-banking-mockup.html` includes mock transaction data, account balances, and card numbers. If ever populated with real data, exposes sensitive information
- Files: `/demos/boa/bofa-agentic-banking-mockup.html`
- Current mitigation: Data is clearly placeholder (e.g., "4111111111111111")
- Recommendations:
  1. Keep all demo data explicitly marked as mock
  2. On portal implementation, never embed real customer financial data in demo/mockup pages
  3. Add comment header to mockup file: `<!-- DEMO ONLY: All data is placeholder. Do not use real financial information. -->`
  4. Implement role-based access control (RBAC) in portal to prevent unauthorized access to real customer data views

**No Input Validation or Sanitization in Forms:**
- Risk: Homepage contact form, SafeAgent demo request form, calculator inputs have no visible client-side validation and no server-side validation (because no backend exists yet)
- Files: `index.html` (form around line 800+, exact line TBD in full read), `/demos/boa/bofa-agentic-banking-mockup.html`
- Current mitigation: Forms currently route to Netlify (see form `action` attribute) — Netlify handles basic validation
- Recommendations:
  1. On Next.js migration, implement client-side validation with `react-hook-form` + `zod` for schema validation
  2. Server-side: validate all form inputs on `/api/attio/event` route before sending to CRM
  3. Sanitize email inputs to prevent injection attacks
  4. Implement CSRF tokens if using POST forms (Next.js provides built-in CSRF protection via middleware)

**NextAuth Magic-Link Email Transport Not Yet Implemented:**
- Risk: PRD specifies Loops for email transport (SafeCypher_Website_PRD_v1.md, line 60), but no configuration exists yet. Magic-link emails are a critical auth vector
- Files: Not yet implemented; will be in `/lib/auth.ts` and `/app/api/auth/[...nextauth]/route.ts` on migration
- Current mitigation: Current site has no auth; no risk vector active
- Recommendations:
  1. Use NextAuth.js v5 with `Loops` provider (custom implementation if Loops is not in NextAuth ecosystem)
  2. Never include secrets in client-side code; keep Loops API key server-side only
  3. Implement email template with clear unsubscribe link and rate limiting (max 3 magic-link requests per email per hour)
  4. Log all auth events to Attio and internal database for fraud detection

---

## Performance Bottlenecks

**No Asset Optimization:**
- Problem: All images in `/assets/imgs/` and `/public/demos/` are likely unoptimized; no WebP conversion, no responsive image set, no lazy loading
- Files: `/assets/imgs/`, `/public/demos/`, image references in HTML (`<img>`, `<svg>`)
- Cause: Static HTML with inline `<img>` tags; no build-time image optimization
- Improvement path:
  1. On Next.js migration, use Next.js `<Image>` component for automatic optimization (responsive sizes, WebP conversion, lazy loading)
  2. Audit all images: replace raster with SVG where possible
  3. Compress all PNGs and JPGs using `imagemin` or similar
  4. Implement responsive images with `srcset` and `sizes` attributes

**Large Inline CSS in `<head>`:**
- Problem: Thousands of lines of CSS parsed before DOM renders, delaying first paint
- Files: `index.html` (lines 12-800+), `safe-verify-landing.html` (lines 11-300+), `/demos/boa/bofa-agentic-banking-mockup.html` (lines 7-500+)
- Cause: All styles in `<style>` tags; no CSS minification, no critical CSS extraction
- Improvement path:
  1. Extract CSS into separate files or Tailwind CSS build step
  2. Minify CSS and use inline-critical-css to load above-the-fold styles synchronously, rest asynchronously
  3. On Next.js migration, Tailwind + PostCSS build handles this automatically

**No Caching Headers or CDN Configuration:**
- Problem: No explicit cache control, ETags, or far-future headers on static assets
- Files: All HTML and asset files in root and `/public/`
- Cause: Plain static files without metadata
- Improvement path:
  1. Configure Netlify cache headers via `netlify.toml` or `_headers` file
  2. Set far-future cache headers (1 year) for versioned assets (e.g., `/assets/safecypher-logo-v1.svg`)
  3. Set short TTL (5 minutes) for HTML files to allow frequent updates without busting cache

**No Intersection Observer Preloading:**
- Problem: Animations (counter, card CVV, transaction count) fire on page load, even if section is not visible. No lazy evaluation
- Files: `index.html` (lines 1037-1068, 1101-1112)
- Cause: Timers start immediately; only IntersectionObserver on `.stats` section is lazy (line 1101)
- Improvement path:
  1. Wrap all animations in IntersectionObserver; start only when visible
  2. On Next.js, use `react-intersection-observer` library for declarative lazy animations
  3. Prioritize animations above the fold; defer below-fold animations until user scrolls

---

## Fragile Areas

**Agentic Commerce Mockup at Risk of Becoming Stale:**
- Files: `/demos/boa/bofa-agentic-banking-mockup.html` (1533 lines)
- Why fragile: Built as a one-off HTML file; not integrated into design system. If brand colors, fonts, or layout patterns change on main site, mockup becomes visually inconsistent. No tests ensure mockup renders correctly when embedded in portal
- Safe modification:
  1. On Next.js migration, convert mockup to React component(s) in `/components/portal/AgenticCommerceDemo.tsx`
  2. Extract all styles to Tailwind CSS using site-wide design tokens (colors, spacing, typography)
  3. Make content data-driven: pull labels, messages, and financial figures from a JSON config file so product team can update copy without touching code
  4. Add E2E test to verify mockup renders without layout shifts when embedded in portal iframe
- Test coverage: No tests exist; mockup is untested HTML

**Safe Verify Landing Page Copy Needs Backfill:**
- Files: `safe-verify-landing.html`
- Why fragile: PRD specifies "Adapt existing landing page copy" (line 259), but current page is standalone and not integrated into new Next.js structure. Copy needs to be migrated, reformatted, and approved. If not handled carefully during migration, content can be lost or garbled
- Safe modification:
  1. Before migration, audit and document all copy on safe-verify-landing.html (sections, calls-to-action, technical content)
  2. Create `/app/(marketing)/safe-verify/page.tsx` with placeholder copy structure
  3. Incrementally backfill approved copy from current page
  4. Test copy rendering (line lengths, heading hierarchy, link targets) in new responsive layout
  5. Use Contentful or Sanity CMS in Phase 1 to prevent copy from living in code
- Test coverage: No tests on current page; styling and copy are manual-verification only

**Hero Card Animation Depends on Hardcoded Selectors:**
- Files: `index.html` (lines 1033-1068)
- Why fragile: Animation logic uses `document.getElementById('cardTrack1')`, `getElementById('cardTrack2')`, etc. If HTML structure changes or selectors are refactored, animation silently breaks. No error handling if elements don't exist
- Safe modification:
  1. On React migration, refactor to component-based state: `<CardCVVDisplay digits={[3, 4, 7]} animating={isAnimating} />`
  2. Use refs (`useRef`) if direct DOM access is necessary, not global selectors
  3. Add error boundary component to prevent card section from crashing entire page if animation fails
  4. Test animation independently via Jest + React Testing Library
- Test coverage: No tests; animation verified manually only

**Mobile Menu State Not Persisted Across Page Navigations:**
- Files: `index.html` (lines 1009-1031)
- Why fragile: Menu toggle state (`menuToggle.classList`) is DOM-based with no centralized state. On single-page app, state may not reset correctly between routes
- Safe modification:
  1. On React migration, use context or Zustand store for global nav state: `{ mobileMenuOpen: boolean; toggleMobileMenu: () => void }`
  2. Use Next.js `usePathname()` hook to auto-close menu on route change
  3. Add unit test: expect menu to close when route changes
  4. Use `aria-expanded` attribute for accessibility and state management
- Test coverage: No tests; toggling verified manually only

---

## Scaling Limits

**Single HTML File Per Page Model:**
- Current capacity: 3 pages (index.html, safe-verify-landing.html, demos/boa mockup)
- Limit: PRD specifies 20+ pages across Phase 0, 1, and 2. Maintaining separate HTML files for each page is unsustainable: code duplication, shared components impossible, design changes require multi-file edits
- Scaling path:
  1. Migrate to Next.js with app-based routing: each page in `/app/[route]/page.tsx`
  2. Extract shared layouts: `(marketing)` layout for public pages, `(portal)` layout for authenticated pages
  3. Use component composition: header, footer, navigation, hero sections all reusable components
  4. Implement design system in Storybook (Phase 1) to scale component library

**No Content Management System (CMS):**
- Current capacity: Hardcoded copy in HTML files; copy changes require code commits
- Limit: PRD specifies copy backfill per sprint (line 488). Without CMS, marketing team cannot update copy independently; every change requires developer intervention
- Scaling path:
  1. Phase 1: Integrate Sanity or Contentful CMS for blog, case studies, and marketing page copy
  2. Use CMS for all non-technical content (product descriptions, case study text, team bios)
  3. Keep page structure and layout in code; sync content from CMS at build time (SSG) or request time (ISR)

**No Analytics or Event Tracking Infrastructure:**
- Current capacity: No tracking setup; cannot see which features are used, where visitors drop off, or conversion funnel
- Limit: PRD specifies tracking every portal interaction to Attio (calculator runs, document downloads, login events, demo views). Without infrastructure, cannot measure product-market fit or optimize sales funnel
- Scaling path:
  1. Integrate PostHog for public site analytics (events: page views, button clicks, form starts)
  2. Implement Attio event API on `/api/attio/event` server-side route (never expose Attio key client-side)
  3. Use Loops for email event tracking (opens, clicks, unsubscribes)
  4. Set up dashboard in PostHog or Metabase to visualize funnel and drop-off points

**No A/B Testing Framework:**
- Current capacity: Cannot run A/B tests on copy, CTA text, or design variations
- Limit: High-intent features (demo form, calculator) would benefit from multivariate testing to optimize conversion
- Scaling path:
  1. Use PostHog or Growthbook for feature flags and A/B testing
  2. Implement server-side or edge-based experiment logic to avoid flicker
  3. Run A/B tests on homepage hero copy, demo CTA button text, calculator default inputs

---

## Dependencies at Risk

**No Dependency Management (No package.json):**
- Risk: Current site has zero external dependencies managed via npm/yarn/pnpm. On Next.js migration, will introduce dozens: React, Next.js, NextAuth, Zod, React Hook Form, PostHog, etc. Without `package.json` and lockfile, no version pinning, no security audits, no reproducible builds
- Impact: Cannot run `npm audit` to check for vulnerabilities. Manual updates to third-party libraries is error-prone. New developers cannot reproduce environment
- Migration plan:
  1. Initialize Next.js project with `pnpm` (faster, more efficient than npm)
  2. Pin all versions in `pnpm-lock.yaml` (automatic lockfile)
  3. Set up Dependabot or Renovate to auto-create PRs for dependency updates
  4. Run `pnpm audit` in CI/CD pipeline; fail build on critical vulnerabilities
  5. Schedule security audit monthly

**NextAuth.js v5 Not Yet Integrated:**
- Risk: PRD specifies NextAuth.js v5 for magic-link auth (line 58). NextAuth v5 is newer and may have breaking changes or community gaps compared to v4. Email provider (Loops) may not be built-in; custom provider needed
- Impact: Authentication critical path; any misconfiguration exposes system to unauthorized access or session hijacking. Loops integration not battle-tested in many projects
- Mitigation:
  1. On implementation, audit NextAuth.js v5 docs and community for Loops integration examples
  2. If custom provider needed, implement minimal and well-tested (follow NextAuth v5 provider spec strictly)
  3. Use HTTPS only; never transmit magic links over HTTP
  4. Set reasonable magic-link expiry (15 minutes); log all link generation/usage to Attio for fraud detection
  5. Test auth flow thoroughly: valid email, expired link, multiple requests, etc.

**Attio CRM Integration Unproven:**
- Risk: PRD specifies streaming all portal interactions to Attio (portal_login, calculator_run, document_download, etc.). No existing Attio integration in codebase; will be built from scratch. Attio API may have rate limits, quota limits, or edge cases not documented
- Impact: If integration fails, sales team has no visibility into prospect engagement. If data is lost, no audit trail. If implementation leaks API key, entire CRM is compromised
- Mitigation:
  1. Request Attio API docs and rate limits before Phase 0 implementation
  2. Implement event queue (Bull or AWS SQS) to buffer events; don't fire synchronously to Attio
  3. Add exponential backoff retry logic for failed events
  4. Log all Attio API calls (request, response, timestamp) to database; implement replay mechanism if events are lost
  5. Store Attio API key in Netlify secrets, never in code or `.env` files
  6. Test: fire 10,000 calculator_run events; verify Attio receives all

**Supabase Database Not Yet Configured:**
- Risk: PRD specifies Supabase (PostgreSQL) for session storage, portal activity events, calculator runs (line 59). No existing Supabase project or schema. On portal launch, database must be production-ready (backups, replicas, monitoring)
- Impact: Data loss if database schema is wrong or backups are misconfigured. Slow queries if indexes missing. Scalability issues if no read replicas for reporting
- Mitigation:
  1. Create Supabase project in staging environment first; test thoroughly before production
  2. Define schema for: `users` (email, session), `portal_events` (event_type, timestamp, user_id, metadata), `calculator_runs` (user_id, inputs, results)
  3. Add database indexes on `user_id`, `timestamp`, `event_type` for fast queries
  4. Enable automatic backups; test restore procedure
  5. Implement row-level security (RLS) in Supabase to ensure users see only their own data
  6. Use Supabase migrations (Flyway or Prisma) to version schema changes

---

## Missing Critical Features

**No Authentication System:**
- Problem: Portal pages (`/portal/*`, `/portal/calculator`, `/portal/demo`) require authentication, but current site has no auth mechanism. Login/signup flow not implemented
- Blocks: Portal launch, gated demo mockup, calculator requiring user context
- Priority: **Critical** — blocks entire Phase 0 portal deliverable
- Implementation path: Implement NextAuth.js v5 magic-link flow (covered in Security section above). Protect `/portal/*` routes with Next.js middleware

**No Server-Side API Routes for CRM Integration:**
- Problem: All Attio events must fire server-side to hide API key. Current static site has no `/api/*` routes. No Loops email integration
- Blocks: Portal event tracking, magic-link email delivery, form submissions to CRM
- Priority: **Critical** — blocks portal and auth functionality
- Implementation path: Create `/app/api/attio/event/route.ts` and `/app/api/auth/[...nextauth]/route.ts` (NextAuth handles this automatically)

**No Value Calculator (UI Only):**
- Problem: Calculator formula confirmed but UI not built. Portal page `/portal/calculator` is missing. Inputs (sliders, numeric fields) and outputs (saving estimate, ROI) not implemented
- Blocks: Portal launch, primary sales enablement tool
- Priority: **High** — Phase 0 requirement per PRD (line 534)
- Implementation path: Build React component with `react-slider` for inputs, real-time state updates with `useState`, format outputs with `Intl.NumberFormat`. Fire Attio event on debounced input change

**No Attio Event Streaming:**
- Problem: All portal interactions must stream to Attio (login, calculator runs, document downloads). No backend infrastructure exists. Attio API key not yet obtained
- Blocks: Sales visibility, funnel analytics, deal readiness signals
- Priority: **High** — enables sales team to engage prospects at right moment
- Implementation path: Implement `/api/attio/event` route handler. Define TypeScript types for all events. Queue events with retry logic. Validate all inputs before sending to Attio

**No Portal Layout / Dashboard:**
- Problem: Portal structure missing (`/portal/page.tsx`, `/portal/layout.tsx`). No authenticated header/nav for portal. No portal-specific components
- Blocks: All portal functionality (calculator, demo, documents)
- Priority: **High** — Phase 0 requirement
- Implementation path: Create layout with authenticated user context, portal-specific navigation, consistent styling

**No Loops Email Integration:**
- Problem: Magic-link emails sent via Loops, but integration not implemented. Email templates not designed. Email routes not tested
- Blocks: Portal login flow
- Priority: **Critical** — without email, users cannot log in
- Implementation path: Configure NextAuth.js Loops provider (custom if needed). Design plain-text and HTML email templates with security-conscious messaging

---

## Test Coverage Gaps

**No Test Infrastructure:**
- What's not tested: Entire application — no unit tests, integration tests, or E2E tests exist
- Files: No test files in repo; no Jest/Vitest config, no Playwright/Cypress config
- Risk: Code changes may break existing functionality undetected. Animations may fail, navigation may break, forms may not submit. Critical paths (auth, payment flow, CRM events) have zero coverage
- Priority: **Medium** (can be added in Phase 0 or Phase 1, but critical before production launch)
- Recommendations:
  1. Phase 0: Add `vitest` + `@testing-library/react` for unit tests. Write tests for all React components
  2. Phase 0: Add `playwright` for E2E tests. Test critical paths: login flow, calculator submission, document download, form submission
  3. Phase 0 CI/CD: Fail build if coverage drops below 70% or any critical path fails E2E test
  4. Phase 1: Add visual regression tests with Percy or Chromatic to catch design changes

**Marketing Pages No Visual Regression Tests:**
- What's not tested: Hero section layout, responsive behavior on mobile/tablet/desktop, animation timing, accessibility
- Files: `index.html`, `safe-verify-landing.html` — no Playwright/Cypress tests
- Risk: Responsive design may break on mobile. Hero animation may flicker. Text may overflow. Accessibility features (ARIA, focus order) may break
- Priority: **High** — public-facing pages
- Recommendations:
  1. Create Playwright tests in `/e2e/homepage.spec.ts`, `/e2e/safe-verify.spec.ts`
  2. Test: load page → wait for animations → check hero renders correctly → check mobile responsive layout
  3. Use Percy or Chromatic for visual regression: baseline all pages, catch any pixel changes on future commits
  4. Run E2E tests on every PR; fail if visual regression detected

**Calculator Logic No Unit Tests:**
- What's not tested: Formula correctness (annual fraud loss, ROI calculation, projections). Edge cases (zero inputs, very large numbers, negative values)
- Files: Will be in `/app/(portal)/calculator/page.tsx` or `/lib/calculator.ts` (not yet implemented)
- Risk: Incorrect calculations damage credibility with prospects. Edge cases may crash calculator (e.g., division by zero if volume is 0)
- Priority: **Critical** — calculator directly influences sales
- Recommendations:
  1. Implement calculator logic in pure function: `calculateSavings(portfolioSize, fraudRate, volume, avgValue) → { annualLoss, projectedLoss, saving, roi }`
  2. Write unit tests with vitest: normal cases, boundary cases (0 inputs), very large numbers (999M+ portfolio), floating-point edge cases
  3. Test output formatting: ensure numbers displayed with correct decimal places and locale formatting

**Form Submission and Validation No Tests:**
- What's not tested: Form validation (email format, required fields, character limits). Submission to Attio (success, failure, retry). Error messages displayed correctly
- Files: Will be in contact, demo request, newsletter forms (not yet implemented)
- Risk: Users can submit invalid forms; Attio integration fails silently; error messages don't display
- Priority: **High** — directly impacts lead generation
- Recommendations:
  1. Unit tests: Zod schema validation (email, company, role, message fields)
  2. Integration tests: Mock Attio API → submit form → verify event sent, response handled
  3. E2E tests: Fill form → click submit → verify success message appears, form clears
  4. Test error scenarios: network failure, Attio returns 500, timeout

**Accessibility No Automated Tests:**
- What's not tested: ARIA attributes, keyboard navigation, color contrast, heading hierarchy, screen reader compatibility
- Files: All HTML and React components
- Risk: Site may not be usable for visually impaired or keyboard-only users. Legal liability (ADA/WCAG compliance)
- Priority: **High** — public site must be accessible
- Recommendations:
  1. Add `jest-axe` for automated accessibility audits in all component tests
  2. Add Playwright accessibility tests: keyboard navigation, focus order, ARIA labels
  3. Use WAVE or Axe DevTools to manually audit each page
  4. Target WCAG 2.1 AA compliance minimum
