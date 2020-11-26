// @flow
import { connect } from "react-redux";

import { logout } from "beinformed/redux/actions/SignOut";

/**
 * Map state to props
 */
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = { doLogout: logout };

// $FlowFixMe
export const connector = connect(mapStateToProps, mapDispatchToProps);
