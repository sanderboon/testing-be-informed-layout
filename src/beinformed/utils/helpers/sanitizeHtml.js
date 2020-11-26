// @flow
import { get, isString } from "lodash";
import he from "he";

import { IllegalArgumentException } from "beinformed/exceptions";

type removeUnwantedHtmlOptions = {
  allowedTags?: Array<string>,
};

/**
 * Translates html entities to their correct decimal equivalent
 * @param html
 * @returns {*}
 */
const properEntityEncoding = (html) => {
  const escapedGt = html.replace(/</g, "[");
  const escapedLt = escapedGt.replace(/>/g, "]");

  const properEntities = he.encode(he.decode(escapedLt), {
    decimal: true,
  });

  const unescapedGt = properEntities.replace(/\[/g, "<");

  return unescapedGt.replace(/]/g, ">");
};

/**
 * removes unwanted html, this might result in incorrect html, as it removes all html that we don't except,
 * like <b style="font-weight: 400">bold</b> will result in bold</b>
 */
const removeUnwantedHtml = (
  html: string,
  options: removeUnwantedHtmlOptions = {
    allowedTags: ["p", "br", "b", "i", "u", "strike"],
  }
) => {
  if (!isString(html)) {
    throw new IllegalArgumentException("sanitizeHTML method expects a string");
  }

  const correctEntityHtml = properEntityEncoding(html);

  // remove attributes from html elements
  const htmlWithoutAttributes = correctEntityHtml.replace(
    /<(\w+)(.|[\r\n])*?>/gi,
    "<$1>"
  );

  const htmlWithCorrectBR = htmlWithoutAttributes.replace(
    /<br\s*>/gi,
    "<br />"
  );

  // remove not allowed tags
  const allowedTags = get(options, "allowedTags", []).join("|");
  const pattern = `<(?!\\/?(${allowedTags})(>|\\s\\/))[^<]+?>`;
  const regex = new RegExp(pattern, "gi");

  return htmlWithCorrectBR.replace(regex, "");
};

export { removeUnwantedHtml };
