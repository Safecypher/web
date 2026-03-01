---
created: 2026-03-01T15:46:47.769Z
title: Write Andy Perry bio for company team section
area: ui
files:
  - src/components/marketing/company/CompanyTeamSection.tsx
---

## Problem

The Company page team section has placeholder bios for most team members (5 of 6). Andy Perry's bio needs to be written and added to CompanyTeamSection.tsx.

LinkedIn profile for reference: https://www.linkedin.com/in/andrew-perry-6997ba61/

## Solution

1. Visit Andy Perry's LinkedIn profile to extract role, background, and key experience
2. Write a concise 2-3 sentence professional bio in SafeCypher's tone (confident B2B fintech, "eliminate fraud" framing)
3. Update the `teamMembers` array in `CompanyTeamSection.tsx` with the real bio
