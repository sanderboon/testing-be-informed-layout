const inquire = require("./beinformed/updateManifest");

inquire().then(() => {
  process.exit();
});
