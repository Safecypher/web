# External Integrations

**Analysis Date:** 2026-02-19

## APIs & External Services

**Analytics:**
- Simple Analytics - Privacy-first analytics service
  - Purpose: Website traffic and visitor analytics with DND (Do Not Track) compliance
  - Integration: `src/layouts/IndexLayout.astro` includes Simple Analytics script
  - Script: `https://scripts.simpleanalyticscdn.com/latest.js` with `data-collect-dnt="true"`
  - Fallback: Noscript pixel at `https://queue.simpleanalyticscdn.com/noscript.gif?collect-dnt=true`
  - Status: Active on index and safe-verify pages

## Data Storage

**Databases:**
- None detected - Fully static site with no backend data persistence

**File Storage:**
- Static file serving only
- GitHub for source code (evidenced by git history)
- Netlify for deployment and build artifacts

**Caching:**
- Netlify edge caching (default)
- Browser caching via standard HTTP headers

## Authentication & Identity

**Auth Provider:**
- None required - Fully public website, no user accounts
- Form submission only (contact form)

## Monitoring & Observability

**Error Tracking:**
- None configured - No error tracking service detected

**Logs:**
- Netlify build logs (automatic)
- Browser console for client-side debugging

**Availability:**
- Netlify availability monitoring (default)

## CI/CD & Deployment

**Hosting:**
- Netlify
- Site URL: https://safecypher.com
- Repository connected for automatic deployments

**CI Pipeline:**
- Netlify CI (automatic)
- Build command: `npm run build`
- Publish directory: `dist/`
- Preview deploys on pull requests

**Build Configuration:**
Location: `netlify.toml`
```
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/safe-verify-landing.html"
  to = "/safe-verify"
  status = 301

[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301
```

## Environment Configuration

**No environment variables detected:**
- Project is fully static with no runtime environment configuration
- Site configuration hardcoded in `astro.config.mjs`:
  - Site URL: `https://safecypher.com`

## Webhooks & Callbacks

**Incoming:**
- Netlify Form Submissions:
  - Endpoint: Automatic form handling via Netlify
  - Form location: `src/pages/index.astro` (contact form)
  - Form name: `contact`
  - Anti-spam: Netlify honeypot field (`bot-field`)
  - Fields submitted: name, role, institution, email, phone (optional), message (optional)
  - Notifications: Configured in Netlify dashboard (not in code)

**Outgoing:**
- None detected

## Third-Party Content Delivery

**CDN Services:**
- Google Fonts CDN - Font delivery
  - Preconnect: `https://fonts.googleapis.com`
  - Stylesheet: `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap`

- Bootstrap Icons CDN - Icon library
  - Stylesheet: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css`

## Social Media Integration

**Links:**
- LinkedIn company page linked in footer
  - URL: `https://www.linkedin.com/company/safecypher`
  - Location: `src/components/Footer.astro`

## Data Collection & Privacy

**Simple Analytics Configuration:**
- Data collection respects browser DND (Do Not Track) settings
- No cookies or persistent identifiers
- Privacy-focused alternative to Google Analytics
- Fully compliant with GDPR

## Security Considerations

**Form Security:**
- Netlify Forms handles CSRF protection
- Honeypot field prevents bot submissions
- No sensitive data stored

**Content Security:**
- No sensitive information in client-side code
- Static content delivery reduces attack surface
- HTTPS enforced by Netlify

## API Rate Limits

**Not applicable** - No direct API integrations beyond analytics

---

*Integration audit: 2026-02-19*
