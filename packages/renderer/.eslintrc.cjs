module.exports = {
  env: {
    browser: true,
    node: false,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 12,
    project: ["../../tsconfig.renderer.json"],
    sourceType: "module",
  },
  extends: ["plugin:import/typescript", "react-app", "react-app/jest"],
  rules: {
    "import/order": "warn",
    "no-console": "warn",
  },
  ignorePatterns: ["node_modules/**", "**/dist/**", "*.config.js"],
};
