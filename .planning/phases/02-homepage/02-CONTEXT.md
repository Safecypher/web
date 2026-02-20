# Phase 2: Homepage - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

The primary conversion page at `/` (root) targeting Heads of Fraud and Digital at card issuers. Delivers: hero with animated CVV card, urgency block, Three Audiences strip, One Integration block, Proof section, Human Cost section, and a demo request form. Analytics/CRM wiring is Phase 6 — not in scope here.

</domain>

<decisions>
## Implementation Decisions

### Hero animation
- Split hero layout: headline + CTAs on the left, animated card visual on the right
- Card is a realistic payment card shape (dark card with chip, card number, expiry, and CVV field)
- CVV digits flip/tumble (slot machine style) to convey the dynamic security code concept
- Cycle is timed: new code every ~3–5 seconds with a brief pause between flips — not continuous
- Card has a teal/primary-color glow around it to align with SafeCypher brand
- On mobile: card moves below the headline and CTAs (stacks vertically — still visible)

### Section sequence & narrative flow
- Page order (top to bottom): Hero → Urgency block → Three Audiences strip → Proof → Human Cost → Demo form
- The urgency block's primary CTA is demo request; calculator deep-link is secondary
- Three Audiences strip (Transactions, People, Agents): each card shows label + 1–2 sentence pitch per audience
- Human Cost section frames real human victims of CNP fraud — emotional, personal statistics about cardholders who lose money

### Form behavior
- Demo request form submits via Netlify Forms — captured in Netlify dashboard, no backend needed in Phase 2
- Fields: Name (required), Role (required), Company (required), Email (required), Phone (optional), "What's your biggest fraud challenge right now?" (optional textarea)
- After submission: inline success state — form fades/replaces with a 'Thanks — we'll be in touch' message on the same page
- "Portfolio size teaser" is NOT a form field — it's a 'See your estimated savings' link that deep-links into the portal calculator

### Visual section breaks
- Alternating dark / true off-white sections with hard edges (no gradients or angled dividers)
- Section color mapping:
  - Hero → dark
  - Urgency block → light (off-white)
  - Three Audiences strip → dark
  - Proof section → light (off-white)
  - Human Cost → dark
  - Demo form → dark

### Claude's Discretion
- Exact animation timing, easing curves, and digit flip speed
- Card number and expiry copy on the realistic card (use placeholder values)
- Typography scale and spacing within sections
- Exact stat copy for the Three Audiences cards (research from existing brand copy)
- Layout specifics for the Proof section (logo placement, badge sizing)
- Error state handling for the demo form

</decisions>

<specifics>
## Specific Ideas

- The CVV cycling should feel like a real token refresh — timed interval, not a continuous loop
- The realistic card should look like an actual bank card (chip + number + expiry + CVV) to ground the concept
- The Human Cost section should feel emotionally weighty — real cardholders losing money, not abstract business metrics

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-homepage*
*Context gathered: 2026-02-20*
