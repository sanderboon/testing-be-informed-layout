// @flow
import { connect } from "react-redux";

import { createSelector } from "reselect";

import ModularUIRequest from "beinformed/modularui/ModularUIRequest";

import {
  startProgress,
  finishProgress,
} from "beinformed/redux/actions/ProgressIndicator";

import { handleError } from "beinformed/redux/actions/Error";

import { reloadModel } from "beinformed/redux/actions/ModularUI";

import type { ComponentType } from "react";
import type { ReduxState } from "beinformed/redux";
import type { Href } from "beinformed/models";

/**
 * Injects the modular ui service and the progress start and finish actions
 * This can be used to request modular ui services inside react view components
 */
const getLocaleCode = (state) => state.i18n.locale || "en";

const modularui = createSelector(
  [getLocaleCode],
  (localeCode) => (href: Href, options: Object = {}) => {
    const modularuiRequest = new ModularUIRequest(href, options);
    modularuiRequest.locale = localeCode;
    return modularuiRequest;
  }
);

const mapStateToProps = (state: ReduxState) => ({
  modularui: modularui(state),
  locale: state.i18n.locale,
});

const mapDispatchToProps = {
  startProgress,
  finishProgress,
  reloadModel,
  handleError,
};

// $FlowFixMe
const connector = connect(mapStateToProps, mapDispatchToProps);

export default (Component: ComponentType<any>) => connector(Component);
