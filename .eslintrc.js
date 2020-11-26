"use strict";
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    __webpack_public_path__: "writable",
    __webpack_nonce__: "writable",
    __CONTEXT_PATH__: "readonly",
    dataFetcher: "readonly",
    preferencesProvider: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
      flowVersion: "0.129",
    },
    "import/resolver": {
      "babel-module": {},
    },
    "import/extensions": [".js", ".mjs", ".jsx"],
    "import/core-modules": [],
    "import/ignore": [
      "node_modules",
      "\\.(coffee|scss|css|less|hbs|svg|json)$",
    ],
    linkComponents: [{ name: "Link", linkAttribute: "to" }],
  },
  plugins: [
    "babel",
    "flowtype",
    "jest",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:flowtype/recommended",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": [
      "error",
      { ignore: ["beinformed/redux", "beinformed/constants"] },
    ],
    "jsx-a11y/no-autofocus": [
      "error",
      {
        ignoreNonDOM: true,
      },
    ],
  },
};
