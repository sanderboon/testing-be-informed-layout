const webpack = require("webpack");
const del = require("del");

const paths = require("./util/paths");
const compilerPromise = require("./util/compilerPromise");
const { logMessage, logErrors } = require("./util/logMessage");
const mergeLayoutHintConfigs = require("./beinformed/mergeLayoutHintConfigs");
const addAssetsToServer = require("./beinformed/addAssetsToServer");
const { COMMAND } = require("./util/env");

const config = require("./webpack.config.js");
const inquire = require("./beinformed/updateManifest");
const buildJar = require("./beinformed/buildJar");
const fs = require("fs");

const build = async () => {
  if (!fs.existsSync(paths.dist)) {
    fs.mkdirSync(paths.dist);
  }

  const distPath = paths.dist.replace(/\\/g, "/");
  del.sync([`${distPath}/**`, `!${distPath}`]);

  const [client, server] = config(COMMAND || "production");

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

  serverCompiler.watch(
    {
      ignored: /node_modules/,
      stats: server.stats,
    },
    (error, stats) => {
      if (!error && !stats.hasErrors() && !stats.hasWarnings()) {
        serverStats = stats;

        if (serverStats && clientStats) {
          addAssetsToServer(clientStats, serverStats);
        }

        logMessage("[server] Ready");
        return;
      }

      logErrors(error, stats);
    }
  );

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

  addAssetsToServer(clientStats, serverStats);
};

build()
  .then(() => {
    logMessage("Compilation successful", "success");

    if (COMMAND === "jenkins") {
      return buildJar();
    } else if (COMMAND === "production") {
      console.log();
      return inquire().then(() => buildJar());
    }
  })
  .catch((error) => {
    logMessage(error, "error");
  });
