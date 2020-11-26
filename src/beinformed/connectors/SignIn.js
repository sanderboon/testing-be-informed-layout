// @flow
import { connect } from "react-redux";

import { login } from "beinformed/redux/actions/SignIn";

import { getApplication } from "beinformed/modularui/selectors";

import { UserServicesModel } from "beinformed/models";

import type { ReduxState } from "beinformed/redux";

/**
 * Map state to props
 */
const mapStateToProps = (state: ReduxState) => {
  const application = getApplication(state);

  return {
    isAuthenticated:
      state.auth.isAuthenticated &&
      application &&
      application.userServices instanceof UserServicesModel &&
      application.userServices.isLoggedIn,
    errorMessage: state.auth.error,
  };
};

const mapDispatchToProps = {
  onSubmit: login,
};

// $FlowFixMe
export const connector = connect(mapStateToProps, mapDispatchToProps);
