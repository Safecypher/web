import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Project-specific ignores:
    "_archive/**",
    "dist/**",
    "node_modules/**",
    // Accidental duplicate files (contain spaces in name — not part of project):
    "**/* 2.*",
    "**/* 2/**",
  ]),
]);

export default eslintConfig;
