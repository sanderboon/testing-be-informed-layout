// @flow
import { loadModularUI } from "beinformed/redux/actions/ModularUI";
import { keyByHref } from "beinformed/modularui/selectors";

import type { ThunkAction } from "beinformed/redux";

export const reloadApplication = (): ThunkAction => (dispatch, getState) => {
  const modelKey = keyByHref(getState(), "/");

  if (modelKey) {
    return dispatch(loadModularUI(modelKey, "/", {}));
  }

  return false;
};
