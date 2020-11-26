// @flow
import { connect } from "react-redux";

import type { ReduxState } from "beinformed/redux";

export type ProgressIndicatorProps = {
  count: number,
  timestamp: number,
};

const mapStateToProps = (state: ReduxState) => ({
  count: state.progressindicator.count,
  timestamp: state.progressindicator.timestamp,
  percentComplete: state.progressindicator.percentComplete,
});

// $FlowFixMe
export const connector = connect(mapStateToProps);
