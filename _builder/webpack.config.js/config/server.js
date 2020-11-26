const FunctionModulePlugin = require("webpack/lib/FunctionModulePlugin");
const NodeSourcePlugin = require("webpack/lib/node/NodeSourcePlugin");
const LoaderTargetPlugin = require("webpack/lib/LoaderTargetPlugin");

const paths = require("../../util/paths");

const resolvers = require("../parts/resolvers");
const loaders = require("../parts/loaders");
const plugins = require("../parts/plugins");

const serverConfig = {
  name: "server",

  // building custom target for graaljs
  target: (compiler) => {
    new FunctionModulePlugin().apply(compiler);
    new NodeSourcePlugin(compiler.options.node).apply(compiler);
    new LoaderTargetPlugin("web").apply(compiler);
  },

  entry: [`${paths.src}/server.js`],
  output: {
    path: paths.dist,
    filename: "server.js",
    library: "BeInformed",
  },
  module: {
    rules: loaders.server,
  },
  resolve: { ...resolvers },
  plugins: [...plugins.server],
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

const serverDev = {
  ...serverConfig,
  plugins: [...serverConfig.plugins],
  mode: "development",
  devtool: false,
};

const serverProd = {
  ...serverConfig,
  mode: "production",
  devtool: false,
};

module.exports = { serverDev, serverProd };
