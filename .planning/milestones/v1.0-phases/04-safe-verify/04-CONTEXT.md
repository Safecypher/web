# Phase 4: Safe Verify - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Port `_archive/safe-verify-landing.html` to a Next.js `/safe-verify` page as React components. Scope is limited to porting existing content + adding the Inbound/Bi-directional/Branch use-case tabs and DSC cross-link. The source HTML is 759 lines and is the authoritative content reference for copy, stats, and structure.

</domain>

<decisions>
## Implementation Decisions

### Hero visual
- Port the animated phone mockup faithfully — float animation, in-app notification card, Face ID button all included
- Colours updated from source blue (#0066FF) to site teal (--color-primary) throughout the mockup
- Notification card copy kept verbatim: "Ben Jordan · Safe Bank · Account Services"
- Hero headline ported verbatim: "Vishing calls erode customer trust." / serif italic "Restore it instantly."
- CTA labels: primary → "Request Demo" (updated from "Book a Demo" to match site-wide pattern); secondary → "See How It Works" (kept, scroll-link)

### Use-case tabs
- The 6-step how-it-works section is REPLACED by a tabbed section with 4 tabs: **Outbound** (existing 6-step flow from HTML), **Inbound**, **Bi-directional**, **Branch**
- Each tab shows an adapted flow-steps version of the verification flow for that use case (not summary cards)
- Tab UI style: underline tabs (border-bottom active indicator)
- Tab section is a single section — it replaces the original `how-it-works` section entirely

### Light sections
- Both light-background sections from the source are preserved using `bg-base-200` to create dark/light/dark contrast rhythm
- Stats section: port verbatim — "Bidirectional trust. Inbound & outbound. Verified both ways." with 3 metrics: 3–5 min / Zero data / 3 layers
- Integration section: heading "Drop-in. Not rip-and-replace." kept verbatim; the pill tags (White-label SDK, Amazon Connect, IVR Drop-in, Tokenized Phone, GDPR by Design, CCPA Ready, REST API) are expanded into feature cards with a short description each

### Nuclear key section
- Concept and structure retained (3 exchange cards: Customer identification, Agent identification, Cementing the trust)
- Copy to be tightened — Claude has discretion to refine the descriptions while preserving the meaning and the "nuclear key" framing

### Benefits section
- 4 benefit items on the left (3–5 min saved, vishing protection, zero data at rest, bidirectional verification) — port verbatim
- Metrics table on the right preserved as-is: call handling time reduction / PII stored / security layers / integration time / traditional IDV comparison row

### DSC cross-link
- Inline contextual link placed within the benefits or integration section — where the shared technology is naturally discussed (e.g. near "semi-stateless architecture" or integration copy)
- Not a standalone section — woven into existing content

### Outbound flow diagram
- Add a CSS diagram placeholder after the tabbed section (or within the outbound tab), same approach as Phase 3 architecture diagram: labelled CSS boxes showing the call flow
- Marked visually as a placeholder for future SVG production asset

### Claude's Discretion
- Exact step copy for the three new tabs (Inbound, Bi-directional, Branch) — Claude writes adapted flow steps based on source HTML content
- Tailwind class choices and DaisyUI component selection throughout
- Placement of the diagram within or adjacent to the Outbound tab
- Exact wording of the DSC inline cross-link
- Component file naming and split into plans 04-01 through 04-04

</decisions>

<specifics>
## Specific Ideas

- The phone mockup should feel like the homepage HeroCvvCard component — float animation via CSS keyframes (same pattern already established in Phase 02-01)
- Integration feature cards should give Amazon Connect, REST API, and IVR Drop-in a bit of detail each — "works with your existing telephony infrastructure" type copy
- The four tabs replace the section wholesale — the page should NOT have both a separate how-it-works flow AND the tabs

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-safe-verify*
*Context gathered: 2026-02-20*
