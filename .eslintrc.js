module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    project: ["./tsconfig.json"],
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    //
    "plugin:import/electron",
    "plugin:import/typescript",
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
    ".webpack",
    "static",
    "coverage",
    "dist",
    "build",
  ],
};
