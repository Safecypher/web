# Testing

## Status

**No testing framework configured.** This project has no automated tests.

- No Jest, Vitest, Playwright, or Cypress installed
- No test files (`*.test.*`, `*.spec.*`) present
- No test scripts in `package.json`
- No ESLint or Prettier configured

## Build & Quality Scripts

Available scripts via Astro CLI:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

## TypeScript

- Strict mode enabled via `astro/tsconfigs/strict`
- Type checking occurs at build time via Astro's TypeScript integration
- `tsconfig.json` extends Astro's strict preset

## Manual Testing

Current validation approach:
- `npm run build` — catches TypeScript errors and build failures
- `npm run preview` — local preview of production build
- Manual browser testing for visual/interaction checks

## Recommendations for Future Testing

Given the static site + Netlify forms architecture, relevant additions would be:

1. **Playwright** — E2E tests for form submissions and page navigation
2. **Vitest** — Unit tests if utility functions are added
3. **ESLint + Prettier** — Code quality and formatting enforcement
4. **Lighthouse CI** — Performance regression testing
