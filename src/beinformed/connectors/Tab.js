// @flow
import { modularui } from "beinformed/modularui";

export const connector = modularui("Tab", ({ match }) => match.url, {
  propName: "tab",
});
