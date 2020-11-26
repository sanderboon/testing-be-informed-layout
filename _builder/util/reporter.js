"use strict";

const { logErrors, logMessage } = require("./logMessage");

const reporter = (middlewareOptions, options) => {
  const { state, stats } = options;

  if (state) {
    if (stats.hasErrors() || stats.hasWarnings()) {
      logErrors(null, stats);
    } else {
      logMessage("Compilation successful", "success");
    }
  } else {
    logMessage("Compiling..");
  }
};

module.exports = reporter;
