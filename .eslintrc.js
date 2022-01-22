module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    project: ["./tsconfig.json", "./packages/**/tsconfig.json"],
    sourceType: "module",
  },
  plugins: ["import"],
  extends: ["eslint:recommended", "prettier", "react-app", "react-app/jest", "plugin:rxjs/recommended"],
  rules: {
    "import/order": "warn",
    "no-console": "warn",
  },
};