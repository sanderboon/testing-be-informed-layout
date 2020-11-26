const { COMMAND, NODE_ENV, WEBPACK_HOST, WEBPACK_PORT } = process.env;

const IS_PRODUCTION =
  NODE_ENV === "production" ||
  COMMAND === "production" ||
  COMMAND === "jenkins";

const CREATE_SOURCEMAP =
  NODE_ENV === "development" || COMMAND === "development" || COMMAND === "hmr";

module.exports = {
  COMMAND,
  NODE_ENV,
  IS_PRODUCTION,
  CREATE_SOURCEMAP,
  WEBPACK_HOST,
  WEBPACK_PORT,
};
