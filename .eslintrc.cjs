module.exports = {
  root: true,
  extends: ["expo", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
};
