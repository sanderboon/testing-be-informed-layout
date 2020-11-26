// @flow
import { connect } from "react-redux";

import type { AbstractComponent } from "react";
import type { ReduxState } from "beinformed/redux";

/**
 * Injects a preference by name into a react component
 */
export const withPreference = (
  WrappedComponent: AbstractComponent<any>,
  preferenceName: string | string[]
) => {
  const mapStateToProps = (state: ReduxState) => {
    const requestedPreferences = Array.isArray(preferenceName)
      ? preferenceName
      : [preferenceName];

    return requestedPreferences.reduce((preferences, pref) => {
      preferences[pref] = state.preferences[pref];
      return preferences;
    }, {});
  };

  // $FlowFixMe
  return connect(mapStateToProps)(WrappedComponent);
};
