/* eslint-disable no-console */
const fs = require("fs");
const { exec } = require("child_process");

const paths = require("../util/paths");
const { logMessage } = require("../util/logMessage");

const buildJar = () => {
  const packageFile = paths.root + "/package.json";
  const packageJSON = JSON.parse(fs.readFileSync(packageFile, "utf8"));

  const configFile = paths.builder + "/config.json";
  const config = JSON.parse(fs.readFileSync(configFile, "utf8"));

  return new Promise((resolve, reject) => {
    if (!packageJSON.biVersion) {
      reject(new Error("Missing biVersion property in package.json"));

      return;
    }

    if (!fs.existsSync(paths.plugin)) {
      fs.mkdirSync(paths.plugin);
    }

    const customBundleName = config.bundleLabel || packageJSON.biName;
    const customBundleSymbolicName =
      config.bundleSymbolicName || packageJSON.name;
    const customBundleVersion = config.bundleVersion || packageJSON.biVersion;

    const pluginName = customBundleName
      ? `${customBundleSymbolicName}_${customBundleVersion}`
      : `${packageJSON.name}_${packageJSON.biVersion}`;

    exec(
      `jar -cvfm "${paths.plugin}/${pluginName}.jar" "META-INF/MANIFEST.MF" plugin.xml WEB-INF`,
      (error) => {
        if (error) {
          logMessage("Error creating jar file", "error");
          reject(error);
          return;
        }

        logMessage(
          `Plugin ${pluginName}.jar with label: ${customBundleName}, created in ${paths.plugin} folder`,
          "success"
        );

        resolve();
      }
    );
  });
};

module.exports = buildJar;
