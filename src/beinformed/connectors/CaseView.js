// @flow
import { modularui } from "beinformed/modularui";

export const connector = modularui("CaseView", ({ match }) => match.url, {
  propName: "caseview",
});
