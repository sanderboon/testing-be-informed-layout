// @flow
import { modularui } from "beinformed/modularui";

export const connector = modularui(
  "ConceptDetail",
  ({ concept, location }) => `/concepts/${concept}${location.search}`,
  { propName: "conceptDetail" }
);
