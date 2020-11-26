// @flow
import { get, isFunction } from "lodash";

import { MODULARUI_STATUS } from "beinformed/constants/Constants";
import Href from "beinformed/models/href/Href";
import ErrorResponse from "beinformed/models/error/ErrorResponse";
import {
  finishProgress,
  startProgress,
} from "beinformed/redux/actions/ProgressIndicator";
import { handleError } from "beinformed/redux/actions/Error";

import type { ModularUIModel } from "beinformed/models";
import type {
  ModularUIAction,
  SetModelAction,
  UpdateModelAction,
  ModularUIRemoveKeyAction,
  UpdateStatusAction,
  ThunkAction,
  Dispatch,
} from "beinformed/redux";
import type { ModularUIStatus } from "beinformed/constants";

export const setModel = (
  key: string,
  model: ModularUIModel | ErrorResponse
): SetModelAction => {
  // set key on model for later reference
  model.connectKey = key;
  return {
    type: "MODULARUI/SET",
    payload: {
      key,
      model,
    },
  };
};

export const updateModel = (model: ModularUIModel): UpdateModelAction => ({
  type: "MODULARUI/UPDATE",
  payload: model,
});

export const removeModelByKey = (key: string): ModularUIRemoveKeyAction => ({
  type: "MODULARUI/REMOVE_KEY",
  payload: key,
});

export const updateStatus = (
  key: string,
  status: ModularUIStatus
): UpdateStatusAction => ({
  type: "MODULARUI/STATUS",
  payload: { key, status },
});

const loadModelSuccessAction = (
  key: string,
  model: ModularUIModel,
  modelToUpdate
): UpdateModelAction | SetModelAction => {
  if (modelToUpdate) {
    if (isFunction(modelToUpdate.update)) {
      const clonedModel = modelToUpdate.clone();
      clonedModel.update(model);

      return updateModel(clonedModel);
    }

    throw new Error(
      `loadModel action: updateModel is set as option for ${key}, but the model is missing an update methode`
    );
  }

  return setModel(key, model);
};

export const loadModel = (
  key: string,
  href: string | Href,
  options: Object = {}
): ModularUIAction => ({
  type: "MODULARUI/FETCH",
  payload: {
    href: href instanceof Href ? href : new Href(href),
    successAction: (model) =>
      loadModelSuccessAction(key, model, get(options, "updateModel")),
    errorAction: (error) => {
      const errorResponse = new ErrorResponse(error);
      if (errorResponse.isChangePassword) {
        return {
          type: "NO_ACTION",
        };
      } else if (errorResponse.isRemoteServiceException) {
        return setModel(key, errorResponse);
      } else if (errorResponse.isResourceNotFoundAfterReload) {
        return removeModelByKey(key);
      }

      return updateStatus(key, MODULARUI_STATUS.ERROR);
    },
    ...options,
  },
});

export const loadModularUI = (
  key: string,
  href: string | Href,
  options: Object = {}
): ThunkAction => (dispatch: Dispatch) => {
  dispatch(updateStatus(key, MODULARUI_STATUS.LOADING));
  dispatch(startProgress());

  const loadModelPromise = dispatch(loadModel(key, href, options));
  if (!isFunction(loadModelPromise)) {
    return loadModelPromise
      .then((response) => {
        if (response) {
          dispatch(finishProgress());

          return dispatch(updateStatus(key, MODULARUI_STATUS.FINISHED));
        }

        return dispatch(finishProgress());
      })
      .catch((error) => dispatch(handleError(error)));
  }
};

export const reloadModel = (
  model: ModularUIModel,
  options?: Object
): ThunkAction =>
  loadModularUI(model.connectKey, model.selfhref, {
    ...options,
    isReload: true,
  });
