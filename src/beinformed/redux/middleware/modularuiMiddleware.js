// @flow
import { isFunction, get } from "lodash";

import ModularUIRequest from "beinformed/modularui/ModularUIRequest";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import {
  startProgress,
  finishProgress,
} from "beinformed/redux/actions/ProgressIndicator";

import { handleError } from "beinformed/redux/actions/Error";

import type { MiddlewareAPI } from "redux";
import type {
  ReduxState,
  Dispatch,
  ReduxAction,
  ModularUIAction,
} from "beinformed/redux";

/**
 * Symbol key that carries API call info interpreted by this Redux middleware.
 */
const createRequest = (modularui) => {
  const request = new ModularUIRequest(modularui.href, {
    method: modularui.method || HTTP_METHODS.GET,
    data: modularui.data || {},
    locale: modularui.locale,
    childmodels: get(modularui, "childmodels", true),
    isReload: modularui.isReload,
  });

  request.targetModel = modularui.targetModel;

  return request;
};

const responseHandler = (next, dispatch, successAction, model) => {
  if (successAction) {
    const successResult = successAction(model);

    if (successResult instanceof Promise) {
      successResult
        .then((result) => {
          dispatch(result);
        })
        .catch((error) => {
          next(handleError(error));
        });
    } else {
      try {
        dispatch(successResult);
      } catch (error) {
        throw new Error(
          `Result of successResult is not a valid redux action: ${error}`
        );
      }
    }
  }

  return next(finishProgress());
};

const errorHandler = (next, dispatch, errorAction, err) => {
  dispatch(finishProgress());

  if (errorAction) {
    const errorResult = errorAction(err);

    if (errorResult instanceof Promise) {
      errorResult.then((result) => dispatch(result));
    } else {
      dispatch(errorResult);
    }
  }

  return next(handleError(err));
};

const modularuiMiddleware = (
  store: MiddlewareAPI<ReduxState, ReduxAction | ModularUIAction, Dispatch>
) => (next: Dispatch) => (action: any) => {
  if (isFunction(action) || action.type !== "MODULARUI/FETCH") {
    return next(action);
  }

  const { dispatch } = store;

  dispatch(startProgress());

  const modularui = {
    ...action.payload,
    locale: store.getState().i18n.locale,
  };

  const modularuiRequest = createRequest(modularui);

  const { successAction, errorAction } = modularui;

  return modularuiRequest
    .fetch()
    .then((model) => responseHandler(next, dispatch, successAction, model))
    .catch((error) => errorHandler(next, dispatch, errorAction, error));
};

export default modularuiMiddleware;
