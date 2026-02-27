# Deferred Items — Phase 07

## Pre-existing Lint Errors (Out of Scope for Plan 07-02)

Found during `npm run lint` in Step 3 (REFACTOR). These errors exist in files not touched by Plan 07-02 and are pre-existing issues.

### Files with errors:
- `src/app/(marketing)/privacy/page.tsx` — 10 `react/no-unescaped-entities` errors (unescaped `"` characters in JSX text)
- `src/app/(marketing)/terms/page.tsx` — 5 `react/no-unescaped-entities` errors (unescaped `"` and `'` characters in JSX text)

### Resolution:
Replace bare `"` with `&quot;` or `{'"'}` and `'` with `&apos;` or `{"'"}` in those files.
This should be addressed in a future plan or maintenance task.
