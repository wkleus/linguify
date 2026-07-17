import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      // marks imports like `motion` as used when referenced only via JSX, e.g. <motion.div>
      "react/jsx-uses-vars": "error",
    },
  },
  {
    files: ["src/__tests__/**", "**/*.test.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest },
    },
  },
  {
    // Node/CommonJS files: local Express server + shared services used by it
    files: ["backend/**/*.js", "shared/**/*.js", "setupTests.js"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
    },
  },
  {
    // Node/ESM files: Vercel serverless functions and build config
    files: ["api/**/*.js", "*.config.js", "*.config.cjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
