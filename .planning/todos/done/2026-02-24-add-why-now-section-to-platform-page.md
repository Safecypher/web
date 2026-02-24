---
created: 2026-02-24T09:05:00.000Z
title: Add "Why Now" section to platform page
area: ui
files:
  - src/components/marketing/platform/
  - src/app/(marketing)/platform/page.tsx
---

## Problem

The platform page has no section that contextualises why dynamic credentials matter right now in the industry landscape. The issuer briefing has a strong "Why Now" section with third-party validation (McKinsey, Visa, Mastercard) that positions SafeCypher as the issuer's answer to a convergence happening in the market.

## Solution

Create a new `WhyNowSection.tsx` in `src/components/marketing/platform/` and add it to the platform page between `ApproachSection` and `ArchitectureDiagram` (or between `CompetitiveSection` and `PlatformProofSection`).

Content from the PDF:

**Heading:** Why Now

**Body:**
"McKinsey identifies dynamic CVV as a component of future-state payments-as-a-service infrastructure, positioning it alongside tokenisation in the layer that replaces legacy authorisation. Visa launched Intelligent Commerce. Mastercard launched Agent Pay. But none solve the issuer's core problem: independent verification of cardholder intent. SafeCypher puts that control back in the issuer's hands."

**Three-column callout cards or stat-style blocks:**
- McKinsey: "Dynamic CVV = future-state payments infrastructure" (McKinsey, 2021)
- Visa: "Intelligent Commerce" — AI agent payment rails
- Mastercard: "Agent Pay" — autonomous purchase approval

**Positioning close:**
"The networks are building rails for autonomous commerce. SafeCypher builds the verification layer that makes those rails safe for issuers."

Source: SafeCypher Issuer Briefing PDF, page 2 "Why Now".
