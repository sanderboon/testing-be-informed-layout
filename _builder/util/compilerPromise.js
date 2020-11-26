const { logMessage } = require("./logMessage");

const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });

    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve(stats);
      }

      return reject(`[${name}] Failed to compile`);
    });
  });
};

module.exports = compilerPromise;
