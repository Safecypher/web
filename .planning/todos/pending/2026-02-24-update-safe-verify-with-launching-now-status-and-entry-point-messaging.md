---
created: 2026-02-24T09:07:00.000Z
title: Update Safe Verify page with "Launching now" status and entry-point messaging
area: ui
files:
  - src/components/marketing/safe-verify/SvHeroSection.tsx
  - src/components/marketing/safe-verify/SvCtaSection.tsx
---

## Problem

The Safe Verify page doesn't communicate its current "Launching now" status or its role as the recommended entry point for issuers who aren't ready for a full processor integration. The issuer briefing explicitly positions Safe Verify as the independent, low-friction first step: "Safe Verify can deploy independently of processor integrations, giving issuers an immediate entry point."

## Solution

1. **SvHeroSection.tsx**: Add a status badge near the hero headline: "Launching now" (styled as a green/teal badge). Add a supporting line: "Deploys independently of processor integrations — the fastest path to live."

2. **SvCtaSection.tsx**: Update the primary CTA copy to match the briefing's "START WITH SAFE VERIFY" positioning. Add a sub-line: "Works independently of Dynamic Security Code. Start verifying identity today."

Source: SafeCypher Issuer Briefing PDF, page 2 "How to Get Started" and footer CTA block.
