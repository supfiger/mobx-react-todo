const {
  override,
  addDecoratorsLegacy,
  addBabelPlugins,
  disableEsLint,
} = require("customize-cra");

module.exports = override(
  addDecoratorsLegacy(),
  ...addBabelPlugins("emotion"),
  disableEsLint()
);
