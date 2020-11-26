const { IS_PRODUCTION } = require("../../util/env");
const paths = require("../../util/paths");

const { cssLoadersClient, cssLoadersServer } = require("./loaders-css");

const babelLoaderClient = {
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
    cacheCompression: IS_PRODUCTION,
  },
};

const babelLoaderServer = {
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
    cacheCompression: IS_PRODUCTION,
    babelrc: false,
    extends: `${paths.root}/.babelrc.js`,
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: { version: 3, proposals: true },
          targets: {
            node: 13,
          },
        },
      ],
    ],
  },
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: "url-loader",
  options: {
    limit: 2048,
    name: IS_PRODUCTION
      ? "static/media/[name].[hash:8].[ext]"
      : "static/media/[name].[ext]",
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoaderClient = {
  exclude: [/\.(js|scss|sass|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: "file-loader",
      options: {
        name: IS_PRODUCTION
          ? "static/media/[name].[hash:8].[ext]"
          : "static/media/[name].[ext]",
      },
    },
  ],
};

const fileLoaderServer = {
  exclude: [/\.(js|scss|sass|css|mjs|html|ejs|json)$/],
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        ...fileLoaderClient.options,
        emitFile: false,
      },
    },
  ],
};

const client = [
  {
    oneOf: [
      babelLoaderClient,
      ...cssLoadersClient,
      urlLoaderClient,
      fileLoaderClient,
    ],
  },
];

const server = [
  {
    oneOf: [
      babelLoaderServer,
      ...cssLoadersServer,
      urlLoaderServer,
      fileLoaderServer,
    ],
  },
];

module.exports = { client, server };
