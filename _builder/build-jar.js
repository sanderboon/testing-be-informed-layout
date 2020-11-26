const inquire = require("./beinformed/updateManifest");
const buildJar = require("./beinformed/buildJar");

inquire()
  .then(() => buildJar())
  .then(() => {
    process.exit();
  });
