// @flow
import { modularui } from "beinformed/modularui";
import { ListDetailModel } from "beinformed/models";

export const connector = modularui("ListDetail", ({ href }) => href, {
  propName: "detail",
  // $FlowFixMe
  targetModel: ListDetailModel,
});
