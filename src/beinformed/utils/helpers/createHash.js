// @flow
import type { Href } from "beinformed/models";

const createHash = (str: string) =>
  str
    .split("")
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    );

const createHashFromHref = (href: Href) => {
  const hrefString = href
    ? [href.toString(), href.hash].join("#")
    : href.toString();

  return createHash(hrefString);
};

export { createHash, createHashFromHref };
