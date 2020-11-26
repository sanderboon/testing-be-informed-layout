// @flow
import { omit, get } from "lodash";

import { IllegalArgumentException } from "beinformed/exceptions";

import type { Reducer } from "redux";
import type { ReduxAction, ModularUIState } from "beinformed/redux";

const updateStatus = (state, { key, status }) => ({
  ...state,
  [key]: {
    ...state[key],
    status,
  },
});

const setModel = (state, { key, model }) => {
  if (model) {
    return {
      ...state,
      [key]: {
        ...state[key],
        model,
        lastModification: Date.now(),
      },
    };
  }

  throw new IllegalArgumentException("No model for setModel");
};

const getModelKey = (state, model) =>
  Object.keys(state).find(
    (key) => get(state[key], "model.connectKey", "") === model.connectKey
  );

const updateModel = (state, model) => {
  const modelKey = getModelKey(state, model);

  if (modelKey) {
    return setModel(state, { key: modelKey, model });
  }

  throw new Error(
    `ModularUIReducer: Cannot update model with key ${model.connectKey}`
  );
};

const removeKey = (state, modelKey) => {
  if (modelKey) {
    return omit(state, [modelKey]);
  }

  return state;
};

const removeModel = (state, model) => {
  const modelKey = getModelKey(state, model);

  return removeKey(state, modelKey);
};

const initialState: ModularUIState = {};

/**
 * Modular UI Reducer
 */
const ModularuiReducer: Reducer<ModularUIState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case "MODULARUI/STATUS":
      return updateStatus(state, action.payload);

    case "MODULARUI/SET":
      return setModel(state, action.payload);

    case "MODULARUI/UPDATE":
      return updateModel(state, action.payload);

    case "MODULARUI/REMOVE":
      return removeModel(state, action.payload);

    case "MODULARUI/REMOVE_KEY":
      return removeKey(state, action.payload);

    default:
      return state;
  }
};

export default ModularuiReducer;
