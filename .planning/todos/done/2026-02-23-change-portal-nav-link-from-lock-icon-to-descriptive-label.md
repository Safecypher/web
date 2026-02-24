---
created: 2026-02-23T09:57:24.598Z
title: Change portal nav link from lock icon to descriptive label
area: ui
files:
  - src/components/marketing/Nav.tsx:76-95
---

## Problem

The nav right side uses a `btn-square` lock SVG icon (`M12 15v2m-6 4h12...`) as the link to `/portal`. Icon-only navigation is ambiguous to visitors who aren't familiar with the product — it's not clear what "portal" means or who it's for, and an icon with no label is hard to scan.

## Solution

Replace the `btn-square` icon-only link with a text button (e.g. `btn btn-ghost`) labelled "Customer Portal" or just "Portal". Keep the lock icon alongside the label if desired for visual cue, or drop the icon entirely. Consider whether the label should differ depending on auth state (e.g. "Sign in" vs "My Portal"). Keep it visually subordinate to the "Request Demo" primary CTA.
