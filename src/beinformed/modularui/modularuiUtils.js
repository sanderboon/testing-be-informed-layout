// @flow
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, isFunction } from "lodash";

import { loadModularUI } from "beinformed/redux/actions/ModularUI";
import getDisplayName from "beinformed/utils/react/getDisplayName";
import { MODULARUI_STATUS } from "beinformed/constants/Constants";
import { Href } from "beinformed/models";

import type { ComponentType } from "react";
import type { ModularUIOptions } from "beinformed/modularui";

/**
 * Generate modular ui url
 */
const getUrl = (resource: string | Function, props: Object) => {
  const url = isFunction(resource) ? resource(props) : resource;

  if (url instanceof Href) {
    return url.toString();
  }

  return url || "";
};

export const useUrl = (resource: string | Function, props: Object) => {
  const [previousUrl, setPreviousUrl] = useState("");
  const [previousExact, setPreviousExact] = useState(false);

  const url = getUrl(resource, props);

  // when match is not available through props,
  // this is a direct call to the modular ui hoc, not using a route
  if (!props.match) {
    return url;
  }

  const { match } = props;
  const isDifferentUrl = url !== previousUrl;
  if (!isDifferentUrl) {
    return previousUrl;
  }

  const hasDifferentStartUriPart =
    previousUrl !== "" && !previousUrl.startsWith(match.url);

  // Always create an url when the match is exact
  // Or when the match is not exact AND the original match also was not exact
  // Or when the new start uri is different from the previous url
  if (
    match.isExact === true ||
    previousExact === match.isExact ||
    hasDifferentStartUriPart
  ) {
    setPreviousUrl(url);
    setPreviousExact(match.isExact);

    return url;
  }

  return previousUrl;
};

/**
 * Create key for modularui request based on component name and requested url
 */
export const getKey = (
  WrappedComponent: ComponentType<any>,
  name: string,
  url: string
) => {
  if (url) {
    return `${getDisplayName(WrappedComponent, name)}(${url.split("?")[0]})`;
  }

  return getDisplayName(WrappedComponent, name);
};

/**
 * Use redux action and selector to retrieve the correct modular ui service model
 */
export const useModularUI = (
  modelKey: string,
  url: string,
  options?: ModularUIOptions
) => {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.i18n.locale);

  // dispatch loadModularUI
  useEffect(() => {
    dispatch(loadModularUI(modelKey, url, options));
  }, [dispatch, modelKey, url, options, locale]);

  // retrieve current model from modularui reducer
  return useSelector((state) => state.modularui[modelKey]);
};

/**
 * Check if the model corresponding to a modular ui service should be reloaded
 */
export const useReload = (modelEntry: Object, reload: number = 0) => {
  if (reload > 0) {
    const isFullyLoaded =
      get(modelEntry, "status", "") === MODULARUI_STATUS.FINISHED;
    const lastModification = get(modelEntry, "lastModification", 0);

    if (isFullyLoaded && lastModification < reload) {
      return true;
    }
  }

  return false;
};
