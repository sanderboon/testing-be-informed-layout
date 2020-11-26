// @flow
import type { ShowModalAction, CloseModalAction } from "beinformed/redux";

export const showModal = (modalKey: string): ShowModalAction => ({
  type: "SHOW_MODAL",
  payload: modalKey,
});

export const closeModal = (modalKey: string): CloseModalAction => ({
  type: "CLOSE_MODAL",
  payload: modalKey,
});
