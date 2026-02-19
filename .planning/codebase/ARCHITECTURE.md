# Architecture

**Analysis Date:** 2026-02-19

## Pattern Overview

**Overall:** Static Site with HTML Landing Pages

**Key Characteristics:**
- Pure HTML/CSS static content delivery
- No server-side logic or backend API
- Single-page applications embedded as standalone HTML files
- CSS-in-HTML styling approach with inline styles and style tags
- Minimal JavaScript for interactive elements only
- CDN-hosted external dependencies (fonts, icons, analytics)

## Layers

**Presentation Layer:**
- Purpose: User-facing HTML markup and styling
- Location: Root directory and `/demos/` subdirectories
- Contains: HTML files with embedded CSS and JavaScript
- Depends on: External CDN resources (Google Fonts, Bootstrap Icons, Simple Analytics)
- Used by: Web browsers accessing the site

**Asset Layer:**
- Purpose: Static images and brand assets
- Location: `/assets/imgs/`
- Contains: PNG image files (SafeCypher logos and branding)
- Depends on: File system
- Used by: HTML files via img tags and CSS backgrounds

**Demo Layer:**
- Purpose: Standalone mockup and demonstration pages
- Location: `/demos/boa/`
- Contains: Isolated HTML files for specific product demos
- Depends on: Embedded CSS and JavaScript within each file
- Used by: Direct navigation and links from main pages

## Data Flow

**User Navigation Flow:**

1. User accesses root domain → Served `index.html`
2. Navigation menu provides links to:
   - `/safe-verify/` → Routes to `safe-verify-landing.html`
   - `/privacy` → Privacy policy page
   - `/demos/boa/` → Bank of America mockup demo
   - Anchor links to sections within current page
3. Form submission in `index.html` → Posts to Netlify Forms endpoint via `action="/"`
4. External analytics tracking → Simple Analytics CDP receives page view events

**Static Asset Flow:**

1. Browser requests page (e.g., `index.html`)
2. Parser encounters image references and external font links
3. Parallel requests fetch:
   - Fonts from Google Fonts API
   - Icons from Bootstrap Icons CDN
   - Images from local `/assets/imgs/` directory
4. Stylesheet scoped with `[data-astro-cid-*]` attributes applies styling
5. Hoisted JavaScript modules initialize interactivity

## Key Abstractions

**Reusable Sections:**
- `<nav>` element: Fixed navigation bar with mobile menu toggle
  - Shared across pages (appears in dist output)
  - Classes: `.nav-container`, `.nav-links`, `.mobile-menu`
  - Location: Common header markup in HTML

- `<footer>` element: Fixed footer with copyright and links
  - Shared across pages
  - Classes: `.footer-inner`, `.footer-links`
  - Location: Common footer markup in HTML

- Form Component: Contact form in main index
  - Netlify form integration via `data-netlify="true"`
  - Honeypot spam protection via `netlify-honeypot="bot-field"`
  - Location: `index.html` contact section

- Visual Card Component: Animated credit card display
  - Purpose: Hero section interactive element
  - Classes: `.card-container`, `.credit-card`, `.card-cvv-*`
  - Location: Hero visual section in index

**CSS Utilities:**
- CSS custom properties (variables) for consistent theming
- Breakpoint-based responsive design: `@media (max-width: 1024px)`, `@media (max-width: 768px)`
- Scoped styling with Astro's `[data-astro-cid-*]` mechanism

## Entry Points

**Primary Pages:**

- `index.html`: Main landing page
  - Location: Root directory and served as `/index.html`
  - Triggers: Direct domain access (e.g., `safecypher.com`)
  - Responsibilities:
    - Hero section with animated credit card
    - Mission and statistics display
    - "What we believe" belief cards grid
    - Contact form for demo booking
    - Navigation and footer

- `safe-verify-landing.html`: Safe Verify product landing
  - Location: Root directory, exposed as `/safe-verify/`
  - Triggers: Navigation link or direct URL access
  - Responsibilities:
    - Product-specific hero and messaging
    - Feature showcase sections
    - Call-to-action for demos

**Demo Pages:**

- `demos/boa/bofa-agentic-banking-mockup.html`: Bank of America mockup
  - Location: `/demos/boa/bofa-agentic-banking-mockup.html`
  - Triggers: Direct navigation or internal links
  - Responsibilities:
    - Standalone mockup of integration with BoA platform
    - Image assets (footer, header PNGs)

**Generated Routing:**
- Astro build process creates:
  - `/dist/index.html` → Optimized main page
  - `/dist/safe-verify/index.html` → Routed landing page
  - `/dist/privacy/index.html` → Privacy policy
  - `/dist/demos/boa/bofa-agentic-banking-mockup.html` → Routed demo
  - `/_astro/*.css` → Extracted and minified stylesheets
  - `/_astro/*.js` → Bundled JavaScript modules

## Error Handling

**Strategy:** Client-side validation only (no backend errors)

**Patterns:**
- HTML5 form validation via `required` attributes on inputs
- Browser-native form validation messages
- No error logging or exception handling (analytics via Simple Analytics)
- Links are hardcoded; 404 errors handled by hosting (Netlify)

## Cross-Cutting Concerns

**Styling:**
- Global CSS variables defined in `:root` for consistent theming
- Color scheme: Dark mode (`--brand-dark: #050505`) with blue accents (`--brand-blue: #0066FF`)
- Fonts: Outfit (sans-serif) for body, Playfair Display (serif) for accents
- Scoped component styles via Astro's `[data-astro-cid-*]` attributes

**Analytics:**
- Simple Analytics CDP integration
- Noscript fallback tracking via pixel beacon
- No client-side tracking code; server-side collection

**Forms:**
- Netlify Forms integration for contact form handling
- Honeypot spam protection
- Form name must match in hidden input: `form-name="contact"`

**Responsive Design:**
- Mobile-first approach with breakpoints:
  - `max-width: 1024px`: Tablet/medium screens
  - `max-width: 768px`: Mobile screens
- Navigation collapses to hamburger menu on mobile
- Hero layout switches from 2-column grid to single column

---

*Architecture analysis: 2026-02-19*
