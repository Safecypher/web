---
created: 2026-03-01T07:58:59.612Z
title: Update with new branding once we have it (may need to be a phase)
area: ui
files:
  - src/styles/theme.css
---

## Problem

Current branding (colours, fonts, logo) is a placeholder or first-pass. Once final brand assets are delivered, the entire site will need updating — brand tokens, typography, imagery, and potentially component styles.

## Solution

When final brand assets are available, update `src/styles/theme.css` (brand tokens, DaisyUI theme) and any hardcoded colours/fonts across components. If the scope is large (new logo, full visual refresh, new imagery), this should be its own GSD phase rather than a single todo. Assess scope at the time assets are received.
