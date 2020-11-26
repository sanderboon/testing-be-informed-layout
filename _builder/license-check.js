const paths = require("./util/paths");
const checker = require("license-checker");
const fs = require("fs");

const configFile = paths.builder + "/config.json";
const config = JSON.parse(fs.readFileSync(configFile, "utf8"));

const packageFile = paths.root + "/package.json";
const packageJSON = JSON.parse(fs.readFileSync(packageFile, "utf8"));

const exludeFromLicenseCheck =
  config.excludeFromLicenseCheck +
  ";" +
  packageJSON.name +
  "@" +
  packageJSON.version;

checker.init(
  {
    start: paths.root,
    excludePackages: exludeFromLicenseCheck,
    onlyAllow: config.allowedLicenses,
    markdown: true,
  },
  function (err, json) {
    if (err) {
      //Handle error
      console.error(err);
      process.exit(1);
    } else {
      console.info(checker.asSummary(json));
      process.exit(0);
    }
  }
);
