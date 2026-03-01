# Phase 7: Add value calculators to the portal - Context

**Gathered:** 2026-02-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the interactive ROI/value calculator at `/portal/calculator` — the centrepiece of the portal experience. Prospects input their portfolio data and get real-time financial projections quantifying the impact of CNP fraud and SafeCypher's solution. Phase 7 also covers the surrounding portal scaffolding (Supabase auth, minimal dashboard, sidebar nav) and the homepage teaser widget that funnels prospects into the portal. The existing spreadsheet (`Copy of 20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx`) is the source of truth for all formulas and default values.

</domain>

<decisions>
## Implementation Decisions

### Calculator scope
- One calculator at `/portal/calculator` with progressive disclosure (simple mode → advanced mode) — not multiple product-specific calculators
- Portal is calculator-focused: the dashboard is a minimal landing page routing to the calculator; auth middleware is wired but simple
- Portal shell: minimal left sidebar nav (SafeCypher logo, nav links, user/logout at bottom) — marketing nav does NOT appear inside the portal
- No role-based access in this phase — all portal users have the same access level; admin analytics dashboard is a future phase

### Auth
- Passwordless via Supabase Auth magic links
- Magic links are single-use by default (Supabase behaviour) — link expires after first click; this is sufficient link security
- Session management: default Supabase behaviour (no additional device fingerprinting or short expiry needed)
- Auth flow: Homepage teaser → `/portal/login` (email input) → magic link email → `/portal/calculator` (pre-filled)
- Portal middleware protects all `/portal/*` routes; unauthenticated users redirected to `/portal/login` with `callbackUrl` preserved

### Progressive calculator — Simple mode
- Entry inputs: **Debit card accounts** and **Credit card accounts** (two separate fields — not combined)
- **Fraud rate** (%) is shown in simple mode
- **Adoption rate** is shown in simple mode as a lever — it's the biggest driver of savings and should be visible and adjustable
- All other inputs (fraud parameters, implementation costs) use industry defaults in simple mode
- Slider-primary interaction: each input is a slider; clicking the displayed value makes it editable as a number field

### Progressive calculator — Advanced mode
- Advanced mode adds the remaining inputs from the spreadsheet:
  - Annual CNP transactions (debit and credit)
  - % of CNP transactions requiring CVV
  - Total loss per fraud case + issuer share %
  - Fee per transaction
  - Uplift in transactions per adopter (interchange lever)
  - Institutional cost method (multiplier vs fixed amount)
  - Mobile app development cost (one-time)
  - TSYS setup cost (one-time) and annual platform fee
  - Halo Effect settings: Peak Halo Multiplier and Months to Peak Effect

### Halo Effect
- Always calculated and included in results — not hidden behind a toggle
- Results show savings **with** and **without** halo effect clearly labelled
- The halo concept (fraudsters migrate away from banks with strong security reputations) is explained inline

### Region / currency
- Browser locale is detected on load and used to default the region (EUR, GBP, USD)
- User can switch region via a visible selector — benchmarks, defaults, fee structures, and currency symbols update accordingly
- Regional fee structures match the spreadsheet's per-region configurations

### Results presentation
- **Headline (most prominent):** Year 1 Net Savings + Breakeven in days — the two metrics that answer the CFO's questions immediately
- **Full results:** Expandable sections below the headline:
  - Fraud Savings (Year 1 and Ongoing)
  - Interchange Uplift (Year 1 and Ongoing)
  - Halo Effect Bonus (Year 1 and Ongoing)
- **Data visualisation:** Year 1 vs Ongoing bar chart showing the savings curve — good for screenshotting and sharing with execs
- **Adoption sensitivity section:** Below results, a range table from voluntary adoption (40%) to mandatory (90%) with corresponding annual savings at each level — illustrates the mandatory adoption inflection point

### Sharing and export
- **URL sharing:** Results and inputs encoded in URL query params — users can copy the URL to share their exact calculation
- **PDF export:** 'Download report' button generates a PDF with results and inputs — for formal internal presentations
- Both are available in this phase

### Contact CTA
- CTA text: "Talk to us about your results" (per CONT-03 spec)
- Pre-populates the contact form with: **full input set + key output metrics**
- Sales team receives the complete calculation context for a better-informed conversation
- Pre-population passed via URL params to `/contact`

### Homepage teaser
- In scope for Phase 7 — the full funnel (teaser → login → pre-filled calculator) ships together
- Teaser widget: single text input for **total portfolio size** (combined) + "See your savings →" CTA button
- Located in the homepage urgency section or hero area (placement to Claude's discretion)
- On submit: redirect to `/portal/login?callbackUrl=/portal/calculator?portfolioSize=VALUE`
- The portfolio size value travels through the auth flow as a URL query param — no sessionStorage or other storage needed
- After magic link click and auth, calculator pre-populates with the passed `portfolioSize` value (split into a default debit/credit ratio for initial values)

### Attio events
- `calculator_run` event fires on every input change, debounced at 500ms (per PORT-05 spec)
- Event payload includes: current inputs and current output metrics
- Attio call goes through the existing `/api/attio/event` server-side route (never from client directly)

### Claude's Discretion
- Default debit/credit account split ratio when only a combined portfolio size is passed from the homepage teaser
- Exact industry benchmark default values (fraud rate %, CVV-required %, institutional cost multiplier) — source from the spreadsheet's pre-filled defaults
- PDF generation library choice
- Exact chart library (Recharts, Nivo, or similar React-compatible)
- Exact sidebar nav link set for this phase (at minimum: Calculator link; Documents deferred)
- CSS layout details, typography, spacing within the portal shell
- Adoption rate default values (Year 1 and Ongoing) for simple mode

</decisions>

<specifics>
## Specific Ideas

- The spreadsheet (`Copy of 20260211 Safecypher DSC Value Calculator Regions Updated Figures.xlsx`) is the authoritative source for all formula logic, default values, and regional benchmarks — the web calculator must replicate its math faithfully. Researcher should analyze it in detail.
- The spreadsheet labels sections: "BASIC INPUTS — Start Here" and "ADVANCED INPUTS — Refine Your Estimate" — the web calculator's simple/advanced split should mirror this framing
- Adoption rate note from spreadsheet: "Making Safecypher mandatory can drive 90%+ adoption (limited only by customers without mobile apps). Higher adoption = dramatically higher savings." — surface this context in the UI
- An Post case study: "An Post saw 50% uplift; 1 = conservative" (interchange uplift reference) — this benchmark should be referenced as a tooltip or footnote
- The portal shell should feel like a clean SaaS app — not a marketing page. No marketing nav inside the portal.

</specifics>

<deferred>
## Deferred Ideas

- Document library (`/portal/documents`) — integration guide, product one-pagers, An Post case study PDF — future phase
- Portal analytics dashboard (`/portal/analytics`) — internal-only view of active companies, last activity, calculator runs, downloads — future phase
- Role-based access (user vs admin) in Supabase — future phase when analytics dashboard is built
- Safe Verify-specific calculator inputs or tabs — future phase
- Device fingerprinting or short session expiry for additional auth security — not needed at this stage
- Scheduled or saved calculator scenarios — future phase

</deferred>

---

*Phase: 07-add-value-calculators-to-the-portal*
*Context gathered: 2026-02-27*
