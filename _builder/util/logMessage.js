const chalk = require("chalk");
const formatStats = require("./formatStats");

const logMessageColor = (level = "info") => {
  switch (level) {
    case "error":
      return "red";
    case "warning":
      return "yellow";
    case "info":
      return "blue";
    case "success":
      return "green";
    default:
      return "white";
  }
};

const logMessage = (message, level = "info", withTimestamp = true) => {
  const color = logMessageColor(level);

  if (withTimestamp) {
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
  } else {
    console.log(chalk[color](message));
  }
};

const logErrors = (error, stats) => {
  if (error) {
    logMessage(error, "error");
  }

  const messages = formatStats(stats);

  if (messages.errors.length) {
    console.log("");
    messages.errors.forEach((e) => logMessage(e, "error", false));
    console.log("");
  }

  if (messages.warnings.length) {
    console.log("");
    messages.warnings.forEach((w) => logMessage(w, "warning", false));
    console.log("");
  }
};

module.exports = { logMessage, logErrors };
