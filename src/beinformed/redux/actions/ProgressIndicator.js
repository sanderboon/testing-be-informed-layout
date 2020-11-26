// @flow

import type {
  StartProgressAction,
  FinishProgressAction,
  ResetProgressAction,
  UpdateProgressAction,
} from "beinformed/redux";

// ACTIONS
/**
 * Start the progress indicator
 */
export const startProgress = (): StartProgressAction => ({
  type: "START_PROGRESS",
});

/**
 * Stop the progress indicator
 */
export const finishProgress = (): FinishProgressAction => ({
  type: "FINISH_PROGRESS",
});

/**
 * Reset the progress indicator
 */
export const resetProgress = (): ResetProgressAction => ({
  type: "RESET_PROGRESS",
});

/**
 * Update progress complete percentage
 */
export const updateProgress = (
  percentComplete: number
): UpdateProgressAction => ({
  type: "UPDATE_PROGRESS",
  percentComplete,
});
