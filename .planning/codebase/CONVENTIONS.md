# Code Conventions

## Languages & Style

- **Primary language:** TypeScript (strict mode)
- **Indentation:** 2 spaces
- **Quotes:** Double quotes
- **Linting:** ESLint with Next.js recommended rules (`eslint-config-next`)
- **Type checking:** `tsc --noEmit` (must pass with zero errors)

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `Nav.tsx`, `Button.tsx`, `Footer.tsx` |
| Pages (App Router) | lowercase | `page.tsx`, `layout.tsx` |
| Utilities / helpers | camelCase | `authHelpers.ts`, `formatDate.ts` |
| Styles | kebab-case | `theme.css`, `globals.css` |
| Route groups | lowercase with parens | `(marketing)/`, `(portal)/` |

## Component Structure

### Server Components (default)

```tsx
import { SomeLib } from 'somelib'

interface Props {
  title: string
  description?: string
}

export function MyComponent({ title, description }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </section>
  )
}
```

### Client Components (interactive)

```tsx
'use client'

import { useState } from 'react'

export function InteractiveComponent() {
  const [open, setOpen] = useState(false)
  // ...
}
```

- Add `'use client'` only when component needs browser APIs or React state/effects
- Prefer Server Components for layouts, static content, footers

## TypeScript Patterns

- No empty interfaces — use type aliases: `type Props = Record<string, never>` or just omit
- Variant/size props use union types: `variant: 'primary' | 'secondary' | 'ghost'`
- Props interfaces are colocated with their component file (not in separate types file)
- Strict mode enabled: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`

## Import Conventions

```tsx
// Absolute imports using @/ alias (maps to src/)
import { Button } from '@/components/ui'
import { Nav } from '@/components/marketing/Nav'
import { cn } from '@/lib/utils'

// Next.js built-ins
import Link from 'next/link'
import Image from 'next/image'
```

## Design System

DaisyUI v5 + Tailwind v4. Use DaisyUI semantic tokens rather than raw colour classes:

```tsx
// Good — semantic DaisyUI tokens
<div className="bg-base-100 text-base-content border border-base-300">
<button className="btn btn-primary">

// Avoid — raw colour classes that bypass theming
<div className="bg-gray-900 text-white">
```

**Theme tokens** (defined in `src/styles/theme.css`):
- Background: `base-100`, `base-200`, `base-300`
- Text: `base-content` (with opacity variants: `/60`, `/40`)
- Primary: `primary` / `primary-content` (#3b82f6 blue)

## CSS Patterns

- Tailwind v4 syntax: `@import tailwindcss` at top of `globals.css`
- DaisyUI plugin: `@plugin "daisyui"` with options block
- Custom theme imported separately: `@import "./theme.css"` (must come last)
- No scoped CSS modules — use Tailwind utility classes throughout
- Responsive via Tailwind breakpoint prefixes: `sm:`, `md:`, `lg:`

## Routing Patterns

- Marketing pages: files under `src/app/(marketing)/`
- Portal pages: files under `src/app/(portal)/`
- API routes: files under `src/app/api/`
- Do NOT add Nav/Footer to root `layout.tsx` — marketing layout handles this

## UI Component Usage

Base components live in `src/components/ui/` and are barrel-exported:

```tsx
import { Button, Card, Badge, Input } from '@/components/ui'

<Button variant="primary" size="md">Click me</Button>
<Card variant="raised"><p>Content</p></Card>
<Badge variant="success">Active</Badge>
<Input label="Email" type="email" />
```

## Forms

- Future: Netlify Forms or server actions for contact/lead capture
- All inputs must use the `Input` base component for consistent styling

## CI Gates

All PRs must pass:
1. `npm run lint` — ESLint (next recommended ruleset)
2. `npx tsc --noEmit` — zero TypeScript errors
3. `npm run build` — Next.js production build passes
