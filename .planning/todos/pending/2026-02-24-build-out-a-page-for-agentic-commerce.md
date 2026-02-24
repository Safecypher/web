---
created: 2026-02-24T18:00:00.000Z
title: Build out a page for agentic commerce
area: ui
files:
  - src/app/(marketing)/agentic-commerce/page.tsx
  - src/components/marketing/agentic-commerce/
  - src/components/marketing/home/AudiencesSection.tsx
  - src/components/marketing/platform/ProductPortfolioSection.tsx
---

## Problem

Agentic commerce (AI agent identification and human-in-the-loop approval for autonomous
card transactions) is already referenced across the site:

- `ProductPortfolioSection.tsx` lists it as a product: "AI agent identification and
  human-in-the-loop approval for autonomous card transactions."
- `WhyNowSection.tsx` cites it as an industry signal: "AI agent payment rails — enabling
  autonomous purchases across the Visa network."
- `AudiencesSection.tsx` has a CTA "Explore agentic commerce security →" that currently
  links to `/platform` as a fallback (no dedicated page exists).

There is no `/agentic-commerce` route. This is a gap given the product is already marketed.

## Solution

1. Create `src/app/(marketing)/agentic-commerce/page.tsx` following the same pattern as
   `/dynamic-security-codes` and `/safe-verify`.
2. Build component sections under `src/components/marketing/agentic-commerce/` — likely:
   - Hero section (headline, subhead, CTA)
   - Problem section (the agentic commerce fraud risk)
   - How it works (AI agent ID + human-in-the-loop approval flow)
   - Benefits / use cases
   - CTA section
3. Update `AudiencesSection.tsx` `href` from `/platform` to `/agentic-commerce` once the
   page is live.
4. Optionally add to the Nav alongside Dynamic CVV and Safe Verify.

Content and messaging to be confirmed with SafeCypher team before build.
