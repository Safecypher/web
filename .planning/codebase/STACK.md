# Technology Stack

**Analysis Date:** 2026-02-19

## Languages

**Primary:**
- TypeScript - Used for scripts and components (astro integration)
- HTML - Page structure and semantic markup
- CSS - Styling with custom CSS variables and responsive design

**Secondary:**
- JavaScript - Client-side interactivity and animations

## Runtime

**Environment:**
- Node.js (npm-based project)

**Package Manager:**
- npm - Manages dependencies
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Astro 4.16.0 - Static site generator with component-based architecture
  - Purpose: Build fast, static website with reusable components and islands architecture

**Web Standards:**
- Vanilla JavaScript - No additional JS frameworks

**Fonts & Icons:**
- Google Fonts - Outfit (sans-serif) and Playfair Display (serif) fonts
- Bootstrap Icons 1.11.3 - Icon library via CDN

## Key Dependencies

**Critical:**
- astro@^4.16.0 - Main framework for building and serving the site

## Configuration

**Environment:**
- No `.env` file detected - Project uses static configuration
- Deployment platform: Netlify with `netlify.toml` configuration
- Site URL: https://safecypher.com

**Build:**
- `astro.config.mjs` - Astro configuration
- `netlify.toml` - Netlify build and deployment configuration

**Build Scripts:**
```bash
npm run dev         # Development server with hot reload
npm run start       # Alias for dev
npm run build       # Build static site to dist/
npm run preview     # Preview built site locally
```

## Platform Requirements

**Development:**
- Node.js with npm
- Git for version control
- Astro CLI (installed via npm)

**Production:**
- Netlify hosting
- Build command: `npm run build`
- Publish directory: `dist/`
- No server-side runtime required (fully static)

## Code Structure

**Astro Project Layout:**
- `src/pages/` - File-based routing for public pages (index.astro, safe-verify.astro, privacy.md)
- `src/components/` - Reusable Astro components (Hero.astro, Nav.astro, Footer.astro, CreditCard.astro, etc.)
- `src/layouts/` - Layout components (BaseLayout.astro, IndexLayout.astro, PrivacyLayout.astro)
- `src/styles/` - Global CSS with design tokens
- `src/scripts/` - TypeScript scripts for client-side functionality (fade-up.ts)
- `public/` - Static assets (images, demos)
- `.astro/` - Generated Astro types and cache

## Asset Management

**Images:**
- Location: `public/assets/imgs/`
- Formats: PNG (safecypher-shield.png, safecypher-shield-grey.png)

**Demo Assets:**
- Location: `public/demos/boa/`
- Contains Bank of America mockup demo files

## Stylesheet Approach

**Global Styles:**
- CSS custom properties (variables) for theming
- Design tokens in `src/styles/global.css`:
  - Color palette: `--brand-blue`, `--brand-dark`, `--brand-light`
  - Typography: `--font-sans`, `--font-serif`
  - Gray scale: `--gray-300` through `--gray-900`

**Component Styles:**
- Component-scoped styles using Astro's `<style>` blocks
- No CSS-in-JS framework (plain CSS)
- Media queries for responsive design

## Third-Party Integrations (Loaded)

**Fonts:**
- Google Fonts API - Outfit and Playfair Display families

**Icons:**
- Bootstrap Icons CDN - Icon library

**Analytics (in script):**
- Simple Analytics - Privacy-first analytics service (see INTEGRATIONS.md)

**Form Submission:**
- Netlify Forms - Contact form handling via form submission

---

*Stack analysis: 2026-02-19*
