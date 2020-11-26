// @flow
import { isNull, isObject, has } from "lodash";
import Locales from "beinformed/i18n/Locales";

import { resolveModel } from "beinformed/models";

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

/**
 * Recreate a model from dehydrated data obtained after a server render.
 */
const recreateModel = (data: Object) => {
  const modelData = ModularUIResponse.rehydrate(data);

  const Model = resolveModel(modelData);

  if (Model) {
    const model = new Model(modelData);
    model.rehydrate(data);

    const childModels = data.childModels.map((childModel) =>
      recreateModel(childModel)
    );

    model.addChildModels(childModels);

    return model;
  }

  return data;
};

const isModularUIModelData = (data: any) =>
  !isNull(data) &&
  isObject(data) &&
  has(data, "data") &&
  has(data, "contributions");

const rehydratedValue = (stateKey, stateValue) => {
  if (Array.isArray(stateValue)) {
    return stateValue.map((stateItem) => rehydrate(stateItem)); // NOSONAR
  }

  if (isModularUIModelData(stateValue)) {
    return recreateModel(stateValue);
  }

  if (
    stateKey === "i18n" &&
    has(stateValue, "locales") &&
    has(stateValue, "locale")
  ) {
    return {
      locales: Locales.rehydrate(stateValue.locales),
      locale: stateValue.locale,
    };
  }

  const noFurtherRehydration = ["preferences", "router", "progressindicator"];
  if (noFurtherRehydration.includes(stateKey)) {
    return stateValue;
  }

  if (!isNull(stateValue) && isObject(stateValue)) {
    return rehydrate(stateValue); // NOSONAR
  }

  return stateValue;
};

/**
 * Maps dehydrated state to models that can be used to rehydrated the application.
 */
const rehydrate = (state: Object) => {
  const mappedState = {};

  Object.entries(state).forEach(([stateKey, stateValue]) => {
    mappedState[stateKey] = rehydratedValue(stateKey, stateValue);
  });

  return mappedState;
};

export default rehydrate;
