// @flow
import { connect } from "react-redux";

import { dismissNotification } from "beinformed/redux/actions/Notification";

import type { ReduxState } from "beinformed/redux";

/**
 * Map state to props
 */
const mapStateToProps = (state: ReduxState) => ({
  messageType: state.notification.messageType,
  message: state.notification.message,
  error: state.notification.error,
  render: state.notification.render,
});

const mapDispatchToProps = {
  onDismiss: dismissNotification,
};

// $FlowFixMe
export const connector = connect(mapStateToProps, mapDispatchToProps);
