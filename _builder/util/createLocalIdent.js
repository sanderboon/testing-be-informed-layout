const loaderUtils = require("loader-utils");

const createLocalIdent = (context, localIdentName, localName, options) => {
  // Use the filename or folder name
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    ? "[folder]"
    : "[name]";

  // Create a hash based on the file location and class name.
  // Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    context.resourcePath + localName,
    "md5",
    "base64",
    5
  );

  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + "_" + localName + "__" + hash,
    options
  );

  // remove the .module that appears in every classname when based on the file.
  return className.replace(".module_", "_");
};

module.exports = createLocalIdent;
