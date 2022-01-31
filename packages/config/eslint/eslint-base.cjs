module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    project: ["./tsconfig.json"],
    sourceType: "module",
  },
  plugins: ["import"],
  extends: [
    //
    "eslint:recommended",
    "react-app",
    "react-app/jest",
    "plugin:rxjs/recommended",
    "prettier",
  ],
  rules: {
    "import/order": "warn",
    "no-console": "warn",
  },
  ignorePatterns: [
    //
    "**/*.js",
    "**/*.cjs",
    "**/*.json",
    "node_modules",
    "public",
    "styles",
    ".next",
    "coverage",
    "dist",
    ".turbo",
  ],
};
