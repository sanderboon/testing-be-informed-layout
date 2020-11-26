const resolvers = require("../_builder/webpack.config.js/parts/resolvers");
const loaders = require("../_builder/webpack.config.js/parts/loaders");
const plugins = require("../_builder/webpack.config.js/parts/plugins");

module.exports = async ({ config }) => ({
  ...config,
  module: {
    rules: [
      {
        test: /\.(stories|story)\.[tj]sx?$/,
        loader: require.resolve("@storybook/source-loader"),
        options: {
          parser: "flow"
        },
        exclude: [/node_modules/],
        enforce: "pre"
      },
      ...loaders.client
    ]
  },
  resolve: { ...resolvers },
  plugins: [...config.plugins, ...plugins.client]
});
