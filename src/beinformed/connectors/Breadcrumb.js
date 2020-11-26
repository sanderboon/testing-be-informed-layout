// @flow
import { connect } from "react-redux";

import { getActiveModels } from "beinformed/modularui/selectors";

import type { ReduxState } from "beinformed/redux";

/**
 * Map state to props
 */
const mapStateToProps = (state: ReduxState) => ({
  items: getActiveModels(state),
});

// $FlowFixMe
export const connector = connect(mapStateToProps);
