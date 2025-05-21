import pluginJs from "@eslint/js";
import globals from "globals";

import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
]);
