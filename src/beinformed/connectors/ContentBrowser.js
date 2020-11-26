// @flow
import { modularui } from "beinformed/modularui";

export const connector = modularui("ContentBrowser", ({ href }) => href, {
  propName: "contentindex",
});
