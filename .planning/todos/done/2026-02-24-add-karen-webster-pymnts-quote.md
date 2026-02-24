---
created: 2026-02-24T09:06:00.000Z
title: Add Karen Webster PYMNTS quote to platform page or homepage
area: ui
files:
  - src/components/marketing/platform/PlatformCtaSection.tsx
  - src/components/marketing/home/ProofSection.tsx
---

## Problem

The site has no third-party industry analyst/media validation quotes. The issuer briefing features a strong quote from Karen Webster (CEO, PYMNTS) that provides independent credibility from a leading payments media brand.

## Solution

Add the following quote in a prominent position. Best placement options:
1. **Platform page** — above or as part of PlatformCtaSection (high-intent page, before CTA)
2. **Homepage** — below ProofSection, before DemoFormSection

Quote:
> "Invisible payments depend on invisible trust. Trust has to be built in, not bolted on."
> — Karen Webster, CEO, PYMNTS • PYMNTS.com, 2025

Render as a styled blockquote with Karen Webster's name, title, and organisation. Keep styling minimal — dark background, large quote mark, attribution in smaller text.

Decide placement when implementing — check which page benefits most from third-party credibility at that point in the flow.

Source: SafeCypher Issuer Briefing PDF, page 2.
