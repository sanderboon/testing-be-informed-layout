// @flow
import { modularui } from "beinformed/modularui";

export const connector = modularui("ModelCatalog", ({ match }) => match.url, {
  propName: "modelcatalog",
});
