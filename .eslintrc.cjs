module.exports = {
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "prettier",
    "plugin:sonarjs/recommended",
    "plugin:vue-scoped-css/vue3-recommended",
    "plugin:@getify/proper-arrows/getify-says",
    "plugin:security/recommended",
    "plugin:vuejs-accessibility/recommended",
  ],
  plugins: [
    "sonarjs",
    "promise",
    "pure",
    "no-loops",
    "write-good-comments",
    "no-secrets",
    "vuejs-accessibility",
  ],
  rules: {
    "no-loops/no-loops": 2,
    "write-good-comments/write-good-comments": "warn",
    "no-secrets/no-secrets": "error",
    "func-names": ["error", "as-needed"],
    "max-lines": [
      "warn",
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "max-lines-per-function": [
      "warn",
      {
        max: 60,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    complexity: ["warn", 5],
    "max-depth": ["error", 3],
    "max-nested-callbacks": ["error", 4],
    "max-params": ["error", 3],
    "no-await-in-loop": "error",
  },
};
