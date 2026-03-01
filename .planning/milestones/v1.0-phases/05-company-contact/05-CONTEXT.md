# Phase 5: Company + Contact - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Two supporting marketing pages:
- `/company` — Mission statement, Human Cost section (dedicated variant), five beliefs (migrated verbatim), team section with headshots/bios
- `/contact` — Demo request form with source-specific heading/CTA text and a Calendly popup button

Creating posts, portal features, or analytics instrumentation are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Company page structure
- Hero section at the top (matching pattern of /platform and /safe-verify)
- Section order: Hero → Mission → Beliefs → Human Cost → Team → CTA
- Closes with a CTA section using the shared PageCtaSection (same pattern as other product pages)

### Five beliefs
- Numbered cards — each belief is a card with a large number and the verbatim belief text
- Not accordion, not editorial list

### Human Cost section
- Dedicated version, not the shared homepage HumanCostSection component
- Can have different framing or expanded copy appropriate to the Company context

### Team section
- Info per card: photo + name + title + 1-line bio sentence
- Placeholder headshot: generic silhouette (neutral person icon, no initials)
- Layout: 3-column grid on desktop
- 6 placeholder team members seeded in the component data array

### Calendly
- Always rendered — not conditional, no env var toggle
- Layout: form on the left, Calendly "Book a time" button on the right (side-by-side on desktop)
- Implementation: popup/modal triggered by button (not inline embedded widget)
- No UI toggle between form and Calendly — both options visible simultaneously

### Source CTA detection
- Mechanism: URL query param (`?from=...`) with sessionStorage fallback so source persists through the session
- Only heading and submit button text change — form fields stay constant across all sources
- Three source variants:
  - `product` → heading "Request a demo", button "Request a demo"
  - `calculator` → heading "Talk to us about your results", button "Talk to us about your results"
  - Default (no param / direct visit / nav click) → heading "Request a demo", button "Request a demo"
- Note: general/nav variant resolves to same text as default ("Request a demo") — three sources, two distinct text variants

### Claude's Discretion
- Exact hero headline and subhead copy for /company
- Mission statement layout within its section (prose block vs styled blockquote)
- Exact styling of the numbered belief cards (card background, number typography)
- Human Cost section copy framing beyond what exists in the shared component
- Silhouette icon design for placeholder headshots
- Calendly popup trigger implementation (Calendly's own JS snippet vs simple popupWidget call)
- Mobile layout for the side-by-side contact section (stacks vertically)

</decisions>

<specifics>
## Specific Ideas

- The five beliefs must be migrated verbatim from the current site — no paraphrasing or summarising
- "Book a time" button beside the form (right column on desktop) should feel like a clear alternative path, not an afterthought
- The contact page side-by-side layout: form left, Calendly CTA right — mirrors a common SaaS contact pattern

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-company-contact*
*Context gathered: 2026-02-21*
