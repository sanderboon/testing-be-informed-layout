const defaultBabelConfig = require("../.babelrc.js");

module.exports = function(api) {
  const babelConfig = defaultBabelConfig(api);

  return Object.assign({}, babelConfig, {
    plugins: ["react-docgen", ...babelConfig.plugins]
  });
};
