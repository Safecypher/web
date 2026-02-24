---
created: 2026-02-24T09:01:00.000Z
title: Update AudiencesSection copy and People card link
area: ui
files:
  - src/components/marketing/home/AudiencesSection.tsx
---

## Problem

The three audience cards have generic descriptions that don't match the tighter, more accurate copy from the issuer briefing. The "People" card also links to /dynamic-security-codes which is wrong — Safe Verify is the people product. The descriptions should be crisper and more specific.

## Solution

Update each card's body copy to match the PDF platform section:

**Transactions:** "Dynamic codes replace static CVVs. Every code is unique, single-use, and expires. Nothing static remains to steal."

**People:** "Cryptographic identity verification replaces KBA and OTPs. The device becomes the credential." — update link from /dynamic-security-codes to /safe-verify

**Agents:** "Human-in-the-loop controls for AI commerce. Every autonomous transaction requires cardholder approval."

Source: SafeCypher Issuer Briefing PDF, page 2 "The Platform" section.
