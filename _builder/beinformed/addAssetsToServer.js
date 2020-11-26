const path = require("path");
const fs = require("fs");
const replace = require("replace-in-file");

const { logMessage } = require("../util/logMessage");

const getFiles = (chunks, extension = ".js") => {
  const files = [];

  chunks.forEach((chunk) => {
    files.push(...chunk.files.filter((file) => file.endsWith(extension)));
  });

  return files;
};

// Read template from server bundle,
// encoding and use of quotes can be different between builds
const getTemplates = (serverFile, hmrContextPath) => {
  // eslint-disable-next-line no-sync
  const source = fs.readFileSync(serverFile, "utf8");

  const cssTemplateRegex = /{CSSASSETS:(.*?):CSSASSETS}/g;
  const jsTemplateRegex = /{JSASSETS:(.*?):JSASSETS}/g;

  const templates = {
    css: cssTemplateRegex.exec(source),
    js: jsTemplateRegex.exec(source),
  };

  if (templates.css === null || templates.js === null) {
    return { js: null, css: null };
  }

  if (hmrContextPath) {
    return {
      css: templates.css[1].replace("contextPath", hmrContextPath),
      js: templates.js[1].replace("contextPath", hmrContextPath),
    };
  }

  return {
    css: templates.css[1],
    js: templates.js[1],
  };
};

const addAssetsToServer = (clientStats, serverStats, hmrContextPath) => {
  if (!serverStats) {
    logMessage("Server stats not found in statistics", "error");
    return;
  }
  if (!clientStats) {
    logMessage("Client stats not found in statistics", "error");
    return;
  }

  const serverStatsJson = serverStats.toJson({
    all: false,
    outputPath: true,
    chunks: true,
  });

  const serverFile = path.join(
    serverStatsJson.outputPath,
    serverStatsJson.chunks[0].files.find((file) => file.endsWith(".js"))
  );

  const templates = getTemplates(serverFile, hmrContextPath);

  if (templates.js !== null && templates.css !== null) {
    const clientStatsJson = clientStats.toJson({ all: false, chunks: true });

    const initialChunks = clientStatsJson.chunks.filter(
      (chunk) => chunk.initial
    );

    const jsIncludes = getFiles(initialChunks, ".js")
      .map((filename) => templates.js.replace("{FILE}", filename))
      .join("");
    const cssIncludes = getFiles(initialChunks, ".css")
      .map((filename) => templates.css.replace("{FILE}", filename))
      .join("");

    const replaceFrom = [
      /{CSSASSETS:.*?:CSSASSETS}/,
      /{JSASSETS:.*?:JSASSETS}/,
    ];

    const replaceTo = [cssIncludes, jsIncludes];

    if (hmrContextPath) {
      replaceFrom.push(/{FILEPATH}/);
      replaceTo.push(hmrContextPath.replace(/'/g, ""));
    }

    return replace({
      files: serverFile,
      from: replaceFrom,
      to: replaceTo,
    });
  }

  if (!templates.js) {
    logMessage(
      `JavaScript script template not found in ${serverFile}`,
      "error"
    );
  }

  if (!templates.css) {
    logMessage(`CSS style template not found in ${serverFile}`, "error");
  }
};

module.exports = addAssetsToServer;
