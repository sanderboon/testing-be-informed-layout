// @flow
import { modularui } from "beinformed/modularui";

export const connector = modularui(
  "ContentDetail",
  ({ content, location }) =>
    `/content/${decodeURIComponent(content)}${location.search}`,
  { propName: "contentTOC" }
);
