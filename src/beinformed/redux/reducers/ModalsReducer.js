// @flow
import type { Reducer } from "redux";
import type { ReduxAction, ModalsState } from "beinformed/redux";

const showModal = (state, modalKey) => [
  ...state.modals.map((modal) => ({
    ...modal,
    visible: false,
  })),
  {
    key: modalKey,
    visible: true,
  },
];

const closeModal = (state, modalKey) =>
  state.modals
    .filter((modal) => modal.key !== modalKey)
    .map((modal, idx, arr) => ({
      ...modal,
      visible: arr.length === idx + 1,
    }));

// REDUCER
const initialState: ModalsState = {
  modals: [],
};

/**
 * Form reducer
 */
const ModalsReducer: Reducer<ModalsState, ReduxAction> = (
  state = initialState,
  action
) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modals: showModal(state, action.payload),
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        modals: closeModal(state, action.payload),
      };

    default:
      return state;
  }
};

export default ModalsReducer;
