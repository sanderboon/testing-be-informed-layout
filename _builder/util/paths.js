// @flow
const fs = require("fs");
const path = require("path");

const rootDirectory = fs.realpathSync(process.cwd());
const resolveDir = (relativePath) => path.resolve(rootDirectory, relativePath);

const paths = {
  src: resolveDir("src"),
  dist: resolveDir("WEB-INF"),

  builder: resolveDir("_builder"),
  metaInf: resolveDir("META-INF"),
  plugin: resolveDir("_PLUGIN"),

  root: rootDirectory,
};

module.exports = paths;
