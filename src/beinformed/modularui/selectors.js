// @flow
import { createSelectorCreator, defaultMemoize } from "reselect";
import { has } from "lodash";

import { Href } from "beinformed/models";

import type { ReduxState } from "beinformed/redux";
import type { ModularUIModel } from "beinformed/models";

export const getModelsByType = (
  state: ReduxState,
  type: string
): Array<ModularUIModel> => {
  if (state && state.modularui) {
    return Object.keys(state.modularui)
      .filter(
        (key) =>
          state.modularui[key] &&
          state.modularui[key].model &&
          state.modularui[key].model.type === type
      )
      .map((key) => state.modularui[key].model);
  }

  return [];
};

export const getFirstModelByType = (state: ReduxState, type: string) => {
  const models = getModelsByType(state, type);

  if (models.length > 0) {
    return models[0];
  }

  return null;
};

/**
 * Get the application model, which is the model with selfhref '/'
 */
export const getApplication = (state: ReduxState) =>
  getFirstModelByType(state, "Application");

export const getTab = (state: ReduxState) => getFirstModelByType(state, "Tab");

export const getCaseView = (state: ReduxState) =>
  getFirstModelByType(state, "CaseView");

export const getForm = (state: ReduxState) =>
  getFirstModelByType(state, "Form");

/**
 * Get the model by it's href
 */

export const modelByHref = (state: ReduxState, href: Href | string) => {
  if (state && state.modularui) {
    const findHref = href instanceof Href ? href : new Href(href);

    const modelConfigKey = Object.keys(state.modularui).find((key) => {
      const model = state.modularui[key];

      return (
        model.model &&
        model.model.selfhref &&
        model.model.selfhref.equals(findHref)
      );
    });

    if (modelConfigKey) {
      return state.modularui[modelConfigKey].model;
    }
  }

  return null;
};

/**
 * Return the selfhref of a model by the key the model is saved in the reducer
 */
export const keyByHref = (state: ReduxState, href: Href | string) => {
  if (state && state.modularui) {
    const findHref = href instanceof Href ? href : new Href(href);

    return Object.keys(state.modularui).find((key) => {
      const { model } = state.modularui[key];

      return model && model.selfhref && model.selfhref.equals(findHref);
    });
  }

  return null;
};

const createBreadcrumbSelector = createSelectorCreator(
  defaultMemoize,
  (value, other) => JSON.stringify(value) === JSON.stringify(other)
);

const getLocation = (state) => state.router.location.pathname;
const getModels = (state: ReduxState) => {
  return (
    Object.values(state.modularui)
      // $FlowFixMe
      .filter((entry: { model: ModularUIModel }) => has(entry, "model"))
      .map((entry: { model: ModularUIModel }) => ({
        key: entry.model.key,
        selfhref: entry.model.selfhref,
        label: entry.model.label,
        // $FlowFixMe
        selfContentLink: entry.model.selfContentLink,
        type: entry.model.type,
      }))
  );
};

// $FlowFixMe
export const getActiveModels = createBreadcrumbSelector(
  [getLocation, getModels],
  (location, models) => {
    const contextModels = [];

    if (location) {
      const locationParts = location.split("/");

      locationParts.reduce((accumulator, current) => {
        const path = `${accumulator}/${current}`;

        // Remove modelcatalog part to match breadcrumb parts
        const comparePath = decodeURIComponent(path).replace(
          "/modelcatalog/",
          "/"
        );

        const foundEntry = models.find(
          (model) => model.selfhref && model.selfhref.equals(comparePath)
        );

        if (foundEntry) {
          const { key, label, type, selfhref, selfContentLink } = foundEntry;

          const href =
            path.startsWith("/modelcatalog/") && selfContentLink
              ? new Href(
                  `/modelcatalog${selfContentLink.encodedHref.toString()}`
                )
              : selfhref;

          contextModels.push({ key, href, label, type });
        }

        return path;
      });
    }

    return contextModels;
  }
);

export const getPreference = (state: ReduxState, preferenceName: string) => {
  if (state && state.preferences) {
    return state.preferences[preferenceName];
  }

  return null;
};
