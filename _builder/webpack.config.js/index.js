const { clientDev, clientProd } = require("./config/client");
const { serverDev, serverProd } = require("./config/server");

const config = (COMMAND = "production") => {
  if (COMMAND === "development" || COMMAND === "eclipse" || COMMAND === "hmr") {
    process.env.CREATE_SOURCEMAP = true;
  }

  if (
    COMMAND === "development" ||
    COMMAND === "dev" ||
    COMMAND === "eclipse" ||
    COMMAND === "hmr"
  ) {
    process.env.NODE_ENV = "development";
    return [clientDev, serverDev];
  }

  process.env.NODE_ENV = "production";
  return [clientProd, serverProd];
};

module.exports = config;
