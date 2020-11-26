const del = require("del");
const webpack = require("webpack");

const paths = require("./util/paths");
const { COMMAND, WEBPACK_HOST, WEBPACK_PORT } = require("./util/env");
const { logErrors, logMessage } = require("./util/logMessage");
const compilerPromise = require("./util/compilerPromise");

const config = require("./webpack.config.js");

const addAssetsToServer = require("./beinformed/addAssetsToServer");
const mergeLayoutHintConfigs = require("./beinformed/mergeLayoutHintConfigs");
const fs = require("fs");

const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { WebpackPluginServe: ServePlugin } = require("webpack-plugin-serve");

const DEVSERVER_HOST = WEBPACK_HOST || "127.0.0.1";
const DEVSERVER_PORT =
  WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501);

const start = async () => {
  if (!fs.existsSync(paths.dist)) {
    fs.mkdirSync(paths.dist);
  }

  const distPath = paths.dist.replace(/\\/g, "/");
  del.sync([`${distPath}/**`, `!${distPath}`]);

  const serve = new ServePlugin({
    host: "127.0.0.1",
    port: DEVSERVER_PORT,
    static: distPath,
    progress: "minimal",
    waitForBuild: true,
    middleware: (app) =>
      app.use(async (ctx, next) => {
        await next();
        ctx.set("Access-Control-Allow-Headers", "*");
        ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        ctx.set("Access-Control-Allow-Origin", "*");
      }),
  });

  const [client, server] = config(COMMAND || "development");

  client.entry = [...client.entry, "webpack-plugin-serve/client"];

  client.plugins = [
    ...client.plugins,
    serve,
    new ReactRefreshPlugin({
      overlay: {
        sockIntegration: "wps",
      },
    }),
    new webpack.DefinePlugin({
      "process.env.HMR": JSON.stringify(true),
    }),
  ];
  // client.output.publicPath = `${DEVSERVER_HOST}:${DEVSERVER_PORT}/`;

  client.resolve = {
    ...client.resolve,
  };

  client.watch = true;

  server.plugins = [
    ...server.plugins,
    serve.attach(),
    new webpack.DefinePlugin({
      "process.env.HMR": JSON.stringify(true),
    }),
  ];

  const multiCompiler = webpack([client, server]);

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "client"
  );
  const serverCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === "server"
  );

  const clientPromise = compilerPromise("client", clientCompiler);
  const serverPromise = compilerPromise("server", serverCompiler);

  let serverStats = null;
  let clientStats = null;

  serverCompiler.run((error, stats) => {
    if (!error && !stats.hasErrors() && !stats.hasWarnings()) {
      serverStats = stats;

      if (serverStats && clientStats) {
        addAssetsToServer(clientStats, serverStats);
      }

      logMessage("[server] Ready");
      return;
    }

    logErrors(error, stats);
  });

  clientCompiler.watch(
    {
      ignored: /node_modules/,
      stats: client.stats,
    },
    (error, stats) => {
      if (!error && !stats.hasErrors() && !stats.hasWarnings()) {
        clientStats = stats;
        logMessage("[client] Ready");
        return;
      }

      logErrors(error, stats);
    }
  );

  serverStats = await serverPromise;
  clientStats = await clientPromise;
  await mergeLayoutHintConfigs;

  const hmrContextPath = `"http://${DEVSERVER_HOST}:${DEVSERVER_PORT}"`;
  addAssetsToServer(clientStats, serverStats, hmrContextPath);
};

start()
  .then(() => {
    logMessage(
      `Dev server is listening on: ${DEVSERVER_HOST}:${DEVSERVER_PORT}`
    );
  })
  .catch((error) => {
    logMessage(error, "error");
  });
