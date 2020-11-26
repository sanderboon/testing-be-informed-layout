const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CREATE_SOURCEMAP } = require("../../util/env");
const createLocalIdent = require("../../util/createLocalIdent");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../../",
      },
    },
    {
      loader: "css-loader",
      options: {
        camelCase: true,
        modules: true,
        importLoaders: 1,
        sourceMap: CREATE_SOURCEMAP,
        getLocalIdent: createLocalIdent,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
  ],
};
const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../../",
      },
    },
    "css-loader",
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
  ],
};
const sassModuleLoaderClient = {
  test: sassModuleRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../../",
      },
    },
    {
      loader: "css-loader",
      options: {
        camelCase: true,
        modules: true,
        importLoaders: 3,
        sourceMap: CREATE_SOURCEMAP,
        getLocalIdent: createLocalIdent,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
    {
      loader: "resolve-url-loader",
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
  ],
};
const sassLoaderClient = {
  test: sassRegex,
  exclude: sassModuleRegex,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../../",
      },
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 3,
        sourceMap: CREATE_SOURCEMAP,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
    {
      loader: "resolve-url-loader",
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
  ],
};

// SERVER: --------------------------------------------------

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: "css-loader",
      options: {
        exportOnlyLocals: true,
        camelCase: true,
        modules: true,
        importLoaders: 1,
        getLocalIdent: createLocalIdent,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
  ],
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: ["css-loader"],
};

const sassModuleLoaderServer = {
  test: sassModuleRegex,
  use: [
    {
      loader: "css-loader",
      options: {
        exportOnlyLocals: true,
        camelCase: true,
        modules: true,
        importLoaders: 3,
        getLocalIdent: createLocalIdent,
      },
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
    {
      loader: "resolve-url-loader",
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: CREATE_SOURCEMAP,
      },
    },
  ],
};
const sassLoaderServer = {
  test: sassRegex,
  exclude: sassModuleRegex,
  use: [
    {
      loader: "css-loader",
      options: {
        importLoaders: 2,
      },
    },
    "resolve-url-loader",
    "sass-loader",
  ],
};

const cssLoadersClient = [
  cssModuleLoaderClient,
  cssLoaderClient,
  sassModuleLoaderClient,
  sassLoaderClient,
];

const cssLoadersServer = [
  cssModuleLoaderServer,
  cssLoaderServer,
  sassModuleLoaderServer,
  sassLoaderServer,
];

module.exports = { cssLoadersClient, cssLoadersServer };
