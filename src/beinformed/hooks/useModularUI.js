// @flow
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import ModularUIRequest from "beinformed/modularui/ModularUIRequest";

import type { Href } from "beinformed/models";

const getLocaleCode = (state) => state.i18n.locale || "en";

const modularui = createSelector(
  [getLocaleCode],
  (localeCode) => (href: Href, options: Object = {}) => {
    const modularuiRequest = new ModularUIRequest(href, options);
    modularuiRequest.locale = localeCode;
    return modularuiRequest;
  }
);

const useModularUI = () => {
  return useSelector(modularui);
};

export default useModularUI;
