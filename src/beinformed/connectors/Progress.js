// @flow
import { connect } from "react-redux";
import {
  finishProgress,
  startProgress,
} from "beinformed/redux/actions/ProgressIndicator";
import { handleError } from "beinformed/redux/actions/Error";

const mapDispatchToProps = {
  onStartProgress: startProgress,
  onFinishProgress: finishProgress,
  onError: handleError,
};

// $FlowFixMe
export const connector = connect(null, mapDispatchToProps);
