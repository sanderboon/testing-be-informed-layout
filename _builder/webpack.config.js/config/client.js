const paths = require("../../util/paths");

const resolvers = require("../parts/resolvers");
const loaders = require("../parts/loaders");
const plugins = require("../parts/plugins");

const { CREATE_SOURCEMAP } = require("../../util/env");

const clientConfig = {
  name: "client",
  target: "web",
  entry: [
    "core-js/es/map",
    "core-js/es/set",
    "core-js/es/symbol",
    `${paths.src}/client.js`,
  ],

  // The client bundle will be responsible for building the resulting
  // CSS file; ensure compilation is dumped into a single chunk
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
          enforce: true,
        },
        styles: {
          test: /\.(css|sass|scss)$/,
          name: "styles",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  output: {
    path: paths.dist,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].js",
    library: "BeInformed",
  },
  module: {
    rules: loaders.client,
  },
  resolve: { ...resolvers },
  plugins: [...plugins.client],
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: false,
    version: false,
  },
  performance: false,
};

const clientDev = {
  ...clientConfig,
  plugins: [...clientConfig.plugins],
  mode: "development",
  devtool: CREATE_SOURCEMAP ? "cheap-module-source-map" : false,
};

const clientProd = {
  ...clientConfig,
  mode: "production",
  devtool: false,
  output: {
    ...clientConfig.output,
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].js",
  },
};

module.exports = { clientDev, clientProd };
