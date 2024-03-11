module.exports = {
  extends: ["stylelint-config-recommended-vue"],
  plugins: [
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-high-performance-animation",
  ],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
    "plugin/no-low-performance-animation-properties": true,
  },
};
