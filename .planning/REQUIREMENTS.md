# Requirements: SafeCypher.com — Website Rebuild

**Defined:** 2026-02-19
**Core Value:** Every page must convert visitors into demo requests, deepen portal engagement, or give the sales team deal-readiness signal — nothing ships that doesn't serve one of those three outcomes.

---

## v1 Requirements

### Foundation (Phase 0a)

- [x] **FOUND-01**: Next.js 14+ App Router project initialised with TypeScript strict mode, folder structure matching PRD (`app/`, `components/ui`, `components/marketing`, `components/portal`, `lib/`) — completed 01-01
- [x] **FOUND-02**: Netlify deployment configured with @netlify/plugin-nextjs; `main` → production, `develop` → staging — completed 01-01
- [x] **FOUND-03**: GitHub Actions CI/CD pipeline runs lint, type-check, and build on every PR; failing checks block merge
- [x] **FOUND-04**: DaisyUI + Tailwind CSS installed with custom SafeCypher brand theme (teal primary, dark background, brand typography)
- [x] **FOUND-05**: Core layout components built: sticky persistent nav with mega-menu (Platform dropdown, Proof, Company, Resources, Portal icon, Request Demo CTA), footer with proof stat + award badge — completed 01-04

### Marketing — Homepage (Phase 0b)

- [x] **HOME-01**: Hero section with headline "Eliminate card-not-present fraud. Not reduce. Eliminate.", sub-headline, animated CVV card, primary CTA (Request Demo), secondary CTA (See How It Works — smooth scroll)
- [x] **HOME-02**: Urgency block: CNP fraud statistics, agentic commerce as emerging attack surface, core argument (static credentials root cause), CTA to calculator
- [x] **HOME-03**: Three Audiences strip: Transactions | People | Agents — icon + one-liner + link per audience; mobile vertical stack
- [x] **HOME-04**: One Integration block: architecture diagram placeholder, "Integrate once. Unlock everything." copy, TSYS note
- [x] **HOME-05**: Proof section: 800,000+ transactions / 18 months / zero CNP fraud headline stat, An Post logo, Irish Fintech Award badge, link to `/proof/an-post`
- [x] **HOME-06**: Human Cost section: emotionally resonant fraud impact copy, link to Company page
- [x] **HOME-07**: CTA block: short demo form (name, email, company, role + optional message) and/or Calendly embed; portfolio size teaser input → redirects to `/portal/calculator` with value pre-populated

### Marketing — Platform Overview (Phase 0b)

- [x] **PLAT-01**: Problem frame section: fundamental issue with static credentials, single clear argument
- [x] **PLAT-02**: SafeCypher approach section: dynamic time-limited credentials through existing banking app
- [x] **PLAT-03**: Architecture diagram placeholder: one core API → seven products across three audiences
- [x] **PLAT-04**: Integration model section: processor-level, serving all downstream issuers; quantified incremental effort per additional product
- [x] **PLAT-05**: Competitive context section (honest, not attack copy): how this differs from tokenisation, 3DS, behavioural analytics
- [x] **PLAT-06**: CTAs: "See the value for your portfolio" (→ calculator) and "Request a demo"

### Marketing — Dynamic Security Codes (Phase 0b)

- [x] **DSC-01**: Problem frame: static CVVs printed on card, never change, valid forever once exposed
- [x] **DSC-02**: Solution section: dynamic time-sensitive code in cardholder's banking app, expires after single use
- [x] **DSC-03**: Visual how-it-works flow: Open banking app → Tap card → Code generated → Enter at checkout → Validated in real time → Expires
- [x] **DSC-04**: Proof section: An Post metrics, Irish Fintech Award
- [x] **DSC-05**: For issuers section: single API integration, no card reissuance, live in weeks, major processor compatibility
- [x] **DSC-06**: CTAs: calculator link + demo request

### Marketing — Safe Verify (Phase 0b)

- [x] **SV-01**: Problem frame: vishing growing, knowledge-based auth broken, OTPs intercepted
- [x] **SV-02**: Six-step how-it-works flow (ported from existing HTML)
- [x] **SV-03**: Nuclear key / three-key exchange concept (ported from existing HTML)
- [x] **SV-04**: Use-case segmentation via tabs: Inbound | Bi-directional | Branch
- [x] **SV-05**: Integration details section: Amazon Connect, REST API, IVR drop-in (ported from existing HTML)
- [x] **SV-06**: Quantified benefits section (ported from existing HTML)
- [x] **SV-07**: Cross-link to Dynamic Security Codes (shared underlying technology)
- [x] **SV-08**: Outbound flow diagram (SVG placeholder; production SVG to replace PDF in Phase 1)
- [x] **SV-09**: CTAs: calculator link + demo request

### Marketing — Company (Phase 0b)

- [x] **COMP-01**: Mission section: "eliminate fraud" framing (elevated from current copy)
- [x] **COMP-02**: Human Cost section: fraud is not a line item — parents, children, elderly, psychological damage
- [x] **COMP-03**: Beliefs section: five beliefs migrated verbatim from current site
- [x] **COMP-04**: Team section: headshots + bios (existing photos; placeholder bios)

### Marketing — Contact (Phase 0b)

- [ ] **CONT-01**: Contact form: name, email, company, role, message (optional)
- [ ] **CONT-02**: Optional Calendly embed for direct scheduling
- [ ] **CONT-03**: Source-specific CTA text per referring page (product pages → "Request a demo", SafeAgent → "Join the pilot", calculator → "Talk to us about your results")

### Analytics & CRM (Phase 0b/0c)

- [ ] **ANLT-01**: Attio event streaming infrastructure: `/api/attio/event` server-side route; fires to console.log in dev, real Attio API key wired in prod via Netlify env var; events: `portal_login`, `calculator_run`, `document_download`, `product_page_view`, `demo_request`, `mockup_viewed`
- [ ] **ANLT-02**: PostHog installed on public site and portal; tracks page views, CTA clicks, form starts, funnel events

---

## v2 Requirements

### Portal (Phase 1)

- **PORT-01**: NextAuth.js v5 magic-link auth — user enters work email → receives link via Loops → authenticated session (JWT, 30-day sliding)
- **PORT-02**: Next.js middleware protects all `/portal/*` routes; unauthenticated users redirected with `callbackUrl` preserved
- **PORT-03**: Portal dashboard `/portal` — landing page after login
- **PORT-04**: Sales team Attio notification on new portal signup
- **PORT-05**: Value calculator `/portal/calculator` — sliders + numeric override inputs (portfolio size, fraud rate, volume, avg tx value); real-time outputs (annual loss, projected loss, annual saving, 3-year ROI); Attio `calculator_run` event on debounced change (500ms)
- **PORT-06**: Calculator CTA: "Talk to us about your results" → contact form with results pre-populated
- **PORT-07**: Agentic commerce demo `/portal/demo` — existing BoA HTML served in iframe; `mockup_viewed` Attio event on page load; context panel alongside mockup
- **PORT-08**: Homepage calculator teaser: single portfolio size input → redirect to `/portal/calculator?portfolioSize=VALUE` with login prompt; pre-populate after auth

### Phase 1 Pages

- **P1-01**: An Post case study `/proof/an-post` — full page with approved copy; added to nav
- **P1-02**: SafeAgent page `/safe-agent` — early-access framing; pilot/early-access CTA (separate form/Calendly with sales team notification)
- **P1-03**: Blog infrastructure + 2–3 seed posts (adapted from conference speeches)
- **P1-04**: Proof index `/proof` — awards, recognition
- **P1-05**: Processor Partners page `/partners`
- **P1-06**: Document library `/portal/documents` — integration guide, product one-pagers, An Post case study PDF; `document_download` Attio event

### Phase 1 UX

- **UX-01**: Exit intent overlay on product pages — cursor-to-chrome or scroll-back trigger; "Before you go — see how much fraud is costing your portfolio"
- **UX-02**: An Post proof stat persistent in nav bar or top bar: "800,000+ transactions. Zero CNP fraud."

---

## Phase 2 Requirements

- **P2-01**: SafePay product page `/safepay`
- **P2-02**: E-Wallet Onboarding page `/ewallet-onboarding`
- **P2-03**: Card Issuance Protection page `/card-issuance-protection`
- **P2-04**: OTP Replacement page `/otp-replacement`
- **P2-05**: Careers page `/careers`
- **P2-06**: Portal analytics dashboard `/portal/analytics` — internal only; active companies, last activity, calculator runs, downloads

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Mobile app | Web-first; mobile deferred indefinitely |
| Password-based auth | Magic-link only; no password management overhead |
| Real-time chat | Not core to conversion goals; high complexity |
| CMS (Sanity/Contentful) | Deferred to Phase 1 consideration; copy lives in code for Phase 0 |
| Public content gating | Nothing on public site requires login — portal gates interactive tools only |
| OAuth login (Google, GitHub) | Not relevant for B2B fintech prospect audience |
| Public portal content | Agentic mockup is portal-only; SafeAgent page uses static visuals only |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 — Foundation | Pending |
| FOUND-02 | Phase 1 — Foundation | Pending |
| FOUND-03 | Phase 1 — Foundation | Complete |
| FOUND-04 | Phase 1 — Foundation | Complete |
| FOUND-05 | Phase 1 — Foundation | Complete |
| HOME-01 | Phase 2 — Homepage | Complete |
| HOME-02 | Phase 2 — Homepage | Complete |
| HOME-03 | Phase 2 — Homepage | Complete |
| HOME-04 | Phase 2 — Homepage | Complete |
| HOME-05 | Phase 2 — Homepage | Complete |
| HOME-06 | Phase 2 — Homepage | Complete |
| HOME-07 | Phase 2 — Homepage | Complete |
| PLAT-01 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| PLAT-02 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| PLAT-03 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| PLAT-04 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| PLAT-05 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| PLAT-06 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| DSC-01 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| DSC-02 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| DSC-03 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| DSC-04 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| DSC-05 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| DSC-06 | Phase 3 — Platform + Dynamic Security Codes | Complete |
| SV-01 | Phase 4 — Safe Verify | Complete |
| SV-02 | Phase 4 — Safe Verify | Complete |
| SV-03 | Phase 4 — Safe Verify | Complete |
| SV-04 | Phase 4 — Safe Verify | Complete |
| SV-05 | Phase 4 — Safe Verify | Complete |
| SV-06 | Phase 4 — Safe Verify | Complete |
| SV-07 | Phase 4 — Safe Verify | Complete |
| SV-08 | Phase 4 — Safe Verify | Complete |
| SV-09 | Phase 4 — Safe Verify | Complete |
| COMP-01 | Phase 5 — Company + Contact | Complete |
| COMP-02 | Phase 5 — Company + Contact | Complete |
| COMP-03 | Phase 5 — Company + Contact | Complete |
| COMP-04 | Phase 5 — Company + Contact | Complete |
| CONT-01 | Phase 5 — Company + Contact | Pending |
| CONT-02 | Phase 5 — Company + Contact | Pending |
| CONT-03 | Phase 5 — Company + Contact | Pending |
| ANLT-01 | Phase 6 — Analytics + CRM | Pending |
| ANLT-02 | Phase 6 — Analytics + CRM | Pending |

**Coverage:**
- v1 requirements: 41 total
- Mapped to phases: 41
- Unmapped: 0

---
*Requirements defined: 2026-02-19*
*Last updated: 2026-02-19 — traceability updated after roadmap creation (phases consolidated: PLAT+DSC into Phase 3, COMP+CONT into Phase 5, ANLT into Phase 6)*
