module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: false,
  },
  extends: [
    "eslint:recommended",
    /** @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs */
    "plugin:@typescript-eslint/recommended",
    "plugin:import/electron",
    "plugin:import/typescript",
    "plugin:rxjs/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    project: ["./tsconfig.json", "./tsconfig.*.json"],
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import"],
  ignorePatterns: ["node_modules/**", "**/dist/**"],
  rules: {
    "import/order": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/consistent-type-imports": "warn",

    /**
     * Having a semicolon helps the optimizer interpret your code correctly.
     * This avoids rare errors in optimized code.
     * @see https://twitter.com/alex_kozack/status/1364210394328408066
     */
    semi: ["warn", "always"],

    /**
     * This will make the history of changes in the hit a little cleaner
     */
    "comma-dangle": ["warn", "always-multiline"],
  },
};
