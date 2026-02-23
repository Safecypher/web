---
created: 2026-02-23T09:57:24.598Z
title: Create privacy policy and terms and conditions pages
area: ui
files:
  - src/app/(marketing)/privacy/page.tsx
  - src/app/(marketing)/terms/page.tsx
  - src/components/marketing/Footer.tsx
---

## Problem

The site has no `/privacy` or `/terms` pages. These are required before launch for:
- GDPR compliance (the ConsentBanner references analytics data collection)
- Standard legal coverage for a B2B SaaS product
- Footer links to these pages are expected by visitors

The Footer currently has no links to legal pages.

## Solution

1. Create `src/app/(marketing)/privacy/page.tsx` at route `/privacy` — full privacy policy page (markdown-style content component or static JSX). Content to be provided by SafeCypher team.
2. Create `src/app/(marketing)/terms/page.tsx` at route `/terms` — terms and conditions page. Content to be provided by SafeCypher team.
3. Both pages use the shared marketing layout (nav + footer) automatically via the `(marketing)` route group.
4. Add footer links to `/privacy` and `/terms` in `src/components/marketing/Footer.tsx`.
5. Update the ConsentBanner copy in `src/components/analytics/ConsentBanner.tsx` to link to `/privacy` (e.g. "No personal data is shared. See our [Privacy Policy](/privacy).").
