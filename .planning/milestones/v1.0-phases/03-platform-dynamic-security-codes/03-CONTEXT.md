# Phase 3: Platform + Dynamic Security Codes - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Two product pages — `/platform` and `/dynamic-security-codes` — that carry a prospect from problem awareness through to demo/calculator CTA. `/platform` is the architectural umbrella explaining the one-API model and full product portfolio. `/dynamic-security-codes` is the first product deep-dive, linked from Platform as the flagship example. Creating posts, authentication flows, and portal features are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Architecture diagram placeholder

- The placeholder communicates the "one API → seven products" relationship using labeled boxes with connector lines — not a blank spacer
- Two-tier layout: DSC and Safe Verify as primary/equal product nodes; remaining five as secondary nodes
- All seven products named and labeled:

| Product | Audience |
|---|---|
| Dynamic Security Codes | Transactions |
| Safe Verify | People |
| SafeAgent | Agents |
| SafePay (dCVV V2) | Commerce |
| E-Wallet Onboarding | Onboarding |
| Card Issuance Protection | Issuance |
| OTP Replacement | Authentication |

- DSC and Safe Verify appear at the same visual weight (co-primary); other five appear smaller or grouped beneath them

### How-it-works flow (DSC page)

- Format: horizontal numbered cards (Steps 1–6), wraps to 2 rows on mobile
- Each step card includes: step number, short heading, 1–2 sentence description, and an actual app screenshot
- Six steps (derived from app screenshots provided):
  1. Open banking app → navigate to your card account
  2. Go to "Manage card"
  3. Enable the "3-digit Dynamic CVV" toggle
  4. "Protect against card fraud" — explanation screen (fraud protection rationale)
  5. "How does it work?" — new CVV generated each time you shop online
  6. "Where to find it?" → CVV visible in app (rotating 3-digit code, e.g. 357)
- Real app screenshots used as visual anchors for each step (not illustrated icons)
- Audience: primary is issuers (B2B Heads of Fraud / Digital), but copy acknowledges the cardholder UX they'd be offering their customers

### Competitive framing (/platform page)

- Tone: acknowledge existing tools, then show the gap — respectful, not attack copy
- Format: comparison table with rows for Tokenisation / 3DS / Behavioural Analytics / SafeCypher
- The gap SafeCypher owns: "Reduces fraud vs. eliminates it" — all three alternatives lower the probability but don't make credentials useless to attackers; SafeCypher eliminates CNP fraud by making stolen credentials worthless
- Table columns (suggested): Approach / What it covers / What the gap is

### Page narrative + connection

- `/platform` is the umbrella page; `/dynamic-security-codes` is the first product deep-dive
- `/platform` explicitly links to `/dynamic-security-codes` as the flagship example of the one-API model
- Opening argument on `/platform`: static credentials are the root cause of CNP fraud — they don't change, so stolen credentials work forever
- After the problem frame: SafeCypher's dynamic approach, then full product portfolio
- Product portfolio on `/platform`: show all seven products explicitly (full table or card grid)
- Both pages end with An Post proof metrics and demo/calculator CTAs

### Claude's Discretion

- Exact CSS layout for the comparison table
- Spacing and typography within step cards
- Error and loading states
- How the architecture diagram connector lines are rendered (SVG paths vs. CSS borders)

</decisions>

<specifics>
## Specific Ideas

- App screenshots provided showing the full cardholder activation flow (8 screens): banking app home → account → manage card → Dynamic CVV toggle → fraud protection screen → how it works screen → where to find it → CVV displayed (357). These are the source material for the six how-it-works cards.
- Product portfolio table provided with full details: product name, audience segment, what it does, and incremental integration effort for each of the seven products.
- "Reduce vs. eliminate" is the competitive positioning line — this comes directly from the hero headline ("Eliminate card-not-present fraud. Not reduce. Eliminate.")

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-platform-dynamic-security-codes*
*Context gathered: 2026-02-20*
