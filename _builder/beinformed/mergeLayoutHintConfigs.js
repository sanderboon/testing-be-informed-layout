const glob = require("glob");
const fs = require("fs");
const path = require("path");

const paths = require("../util/paths");

const readFiles = (files) => {
  const filePromises = files.map(
    (file) =>
      new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(JSON.parse(data));
          }
        });
      })
  );

  return Promise.all(filePromises);
};

const mergeLayoutHintConfigs = new Promise((resolve, reject) => {
  glob("./src/**/LayoutHintConfig.json", {}, (err, files) => {
    if (err) {
      return reject(err);
    }

    readFiles(files).then((jsons) => {
      const newConfig = Object.assign({}, ...jsons);

      fs.writeFile(
        path.join(paths.dist, "LayoutHintConfig.json"),
        JSON.stringify(newConfig),

        (err) => {
          if (err) {
            return reject(err);
          }

          return resolve();
        }
      );
    });
  });
});

module.exports = mergeLayoutHintConfigs;
