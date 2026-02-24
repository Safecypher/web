---
created: 2026-02-23T09:57:24.598Z
title: Add resources page or remove footer link
area: ui
files:
  - src/components/marketing/Footer.tsx:12
  - src/app/(marketing)/resources/page.tsx
---

## Problem

The footer nav includes a "Resources" link pointing to `/resources` (`Footer.tsx` line 12), but no `/resources` route exists. Clicking it returns a 404.

## Solution

**Option A — Add the page:** Create `src/app/(marketing)/resources/page.tsx` at `/resources`. Content could include case studies, whitepapers, blog posts, or documentation links. Requires content from the SafeCypher team before it's useful.

**Option B — Remove the link:** Delete the `{ label: 'Resources', href: '/resources' }` entry from the footer nav array in `Footer.tsx`. Cleaner until there is actual content to show.

Recommended: remove the link for launch (Option B), add the page later when content is ready.
