import { fixupConfigRules, fixupPluginRules } from "@eslint/eslintrc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    languageOptions: {
      globals: {
        ...js.configs.recommended.languageOptions.globals,
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  ...fixupConfigRules(js.configs.recommended),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    rules: {
      ...typescriptEslint.configs.recommended.rules,
    },
  },
];