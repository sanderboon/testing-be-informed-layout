const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LodashWebpackPlugin = require("lodash-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const { IS_PRODUCTION } = require("../../util/env");
const webpack = require("webpack");

const productionClient = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  new MiniCssExtractPlugin({
    filename: "static/css/[name].[contenthash].css",
    chunkFilename: "static/css/[name].[contenthash].css",
  }),
];

const developmentClient = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development"),
  }),
  new MiniCssExtractPlugin({
    filename: "static/css/[name].css",
    chunkFilename: "static/css/[name].css",
  }),
];

const productionServer = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
];

const developmentServer = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development"),
  }),
];

const compressionPlugins = [
  new CompressionPlugin({
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
  }),
  new CompressionPlugin({
    filename: "[path][base].br[query]",
    algorithm: "brotliCompress",
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      level: 11,
    },
    threshold: 10240,
  }),
];
const client = IS_PRODUCTION
  ? [...productionClient, new LodashWebpackPlugin(), ...compressionPlugins]
  : [...developmentClient, new LodashWebpackPlugin()];

const server = IS_PRODUCTION
  ? [
      ...productionServer,
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ]
  : [
      ...developmentServer,
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ];

module.exports = { client, server };
