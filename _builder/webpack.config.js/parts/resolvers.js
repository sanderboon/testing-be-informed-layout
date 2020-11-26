const paths = require("../../util/paths");

const resolvers = {
  symlinks: false,
  extensions: [".js", ".json", ".css"],
  modules: [paths.src, "node_modules"],
};

module.exports = resolvers;
