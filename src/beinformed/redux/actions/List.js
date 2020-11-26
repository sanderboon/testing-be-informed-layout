// @flow
import { push, replace } from "beinformed/redux/actions/Router";
import { updateModel } from "beinformed/redux/actions/ModularUI";

import type { ThunkAction } from "beinformed/redux";
import type { ListModel, ListHref } from "beinformed/models";

/**
 * Receive a list
 */
export const receiveList = (list: ListModel) => updateModel(list);

/**
 * Request a list
 */
export const requestList = (href: ListHref): ThunkAction => (
  dispatch,
  getState
) => {
  dispatch(
    replace({
      ...getState().router.location,
      state: null,
    })
  );

  return dispatch(push(href.toString(), { reload: Date.now() }));
};
