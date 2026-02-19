# Code Conventions

## Languages & Style

- **Primary language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Indentation:** 2 spaces
- **Quotes:** Double quotes
- **No linter configured** (no ESLint, Prettier, or similar tooling)

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Astro components | PascalCase | `Header.astro`, `SafeVerify.astro` |
| Pages | kebab-case | `safe-verify.astro`, `index.astro` |
| Styles | kebab-case | `global.css` |
| Scripts | kebab-case | N/A currently |

## Component Structure

Standard Astro component anatomy:

```astro
---
// 1. Frontmatter (TypeScript)
import Component from '../components/Component.astro';
const variable = 'value';
---

<!-- 2. Template (HTML + Astro expressions) -->
<section class="section-name">
  <Component />
</section>

<style>
  /* 3. Scoped styles */
  .section-name { }
</style>

<script>
  // 4. Client-side JavaScript (vanilla)
</script>
```

## Design System

CSS custom properties defined in `src/styles/global.css`:

```css
:root {
  --color-primary: ...;
  --color-bg: ...;
  --spacing-*: ...;
  --font-*: ...;
}
```

Components reference tokens via `var(--token-name)`.

## JavaScript Patterns

- **Vanilla JavaScript** — no client-side framework
- Intersection Observer API for scroll-triggered fade-up animations
- Event listeners attached after DOM ready
- No bundled client-side JS framework (Astro islands not used)

## Forms

- Netlify Forms for contact/lead capture submissions
- `data-netlify="true"` attribute on `<form>` elements
- Hidden `form-name` input for Netlify detection

## CSS Patterns

- Scoped styles per component via Astro `<style>` blocks
- Global styles in `src/styles/global.css`
- BEM-adjacent class naming (no strict BEM)
- Responsive via CSS media queries
- CSS Grid and Flexbox for layout

## Import Conventions

```astro
---
// Relative imports from src/
import Header from '../components/Header.astro';
import Layout from '../layouts/Layout.astro';
---
```
