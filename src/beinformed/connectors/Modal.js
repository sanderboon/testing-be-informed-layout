// @flow
import { connect } from "react-redux";

import { showModal, closeModal } from "beinformed/redux/actions/Modals";

import type { ReduxState } from "beinformed/redux";

/**
 * Map state to props
 */
const mapStateToProps = (state: ReduxState) => {
  const visibleModal = state.modals.modals.find((modal) => modal.visible);

  return {
    visibleModalKey: visibleModal ? visibleModal.key : null,
    visibleModalSize: visibleModal ? visibleModal.size : null,
  };
};

const mapDispatchToProps = {
  onShowModal: showModal,
  onCloseModal: closeModal,
};

// $FlowFixMe
export const connector = connect(mapStateToProps, mapDispatchToProps);
