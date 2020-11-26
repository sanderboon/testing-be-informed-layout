const inquirer = require("inquirer");

const fs = require("fs");

const paths = require("../util/paths");

const writeFile = (fileLocation, fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileLocation, fileContent, function (err) {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

const createManifest = (manifestFile, name, symbolicName, version) => {
  const manifest = `Manifest-Version: 1.0
Bundle-ManifestVersion: 2
Bundle-Name: ${name}
Bundle-SymbolicName: ${symbolicName};singleton:=true
Bundle-Version: ${version}.qualifier
Bundle-Vendor: Be Informed B.V.
Bundle-ClassPath: .
Require-Bundle: nl.beinformed.bi.pluggablelayout
  
`;

  return writeFile(manifestFile, manifest);
};

const updateConfig = (configFile, config, name, symbolicName, version) => {
  config.bundleLabel = name;
  config.bundleSymbolicName = symbolicName;
  config.bundleVersion = version;

  return writeFile(configFile, JSON.stringify(config, null, 2));
};

const updatePackageJson = (
  packageFile,
  packageJSON,
  name,
  symbolicName,
  version
) => {
  const packageCopy = {
    ...packageJSON,
    name: symbolicName,
    version: version,
    description: name,
  };

  return writeFile(packageFile, JSON.stringify(packageCopy, null, 2));
};

const inquire = () => {
  const configFile = paths.builder + "/config.json";
  const config = JSON.parse(fs.readFileSync(configFile, "utf8"));

  const packageFile = paths.root + "/package.json";
  const packageJSON = JSON.parse(fs.readFileSync(packageFile, "utf8"));

  const manifestFile = paths.metaInf + "/MANIFEST.MF";

  return inquirer
    .prompt([
      {
        type: "input",
        name: "bundleName",
        message: "Label for this bundle?",
        default: config.bundleLabel || packageJSON.biName,
      },
      {
        type: "input",
        name: "symbolicName",
        message: "Symolic name for this bundle?",
        default: config.bundleSymbolicName || packageJSON.name,
      },
      {
        type: "input",
        name: "version",
        message:
          "Version number for this bundle? (needs to be major.minor.patch)",
        default: config.bundleVersion || packageJSON.biVersion,
        validate: (version) => {
          const regex = new RegExp(
            "^([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)\\.([0-9]|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?(?:\\+[0-9A-Za-z-]+)?$"
          );

          if (!regex.test(version)) {
            return "Must be a valid semver number, in the form of major.minor.patch. For example 1.0.0";
          }

          return true;
        },
      },
    ])
    .then((answers) =>
      createManifest(
        manifestFile,
        answers.bundleName,
        answers.symbolicName,
        answers.version
      ).then(() => answers)
    )
    .then((answers) =>
      updateConfig(
        configFile,
        config,
        answers.bundleName,
        answers.symbolicName,
        answers.version
      ).then(() => answers)
    )
    .then((answers) =>
      updatePackageJson(
        packageFile,
        packageJSON,
        answers.bundleName,
        answers.symbolicName,
        answers.version
      )
    );
};

module.exports = inquire;
