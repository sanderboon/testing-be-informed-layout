// @flow
import { MODULARUI_STATUS } from "beinformed/constants/Constants";

import type { ReduxStore } from "beinformed/redux";

const noLoading = (state) =>
  Object.keys(state.modularui).filter(
    (key) => state.modularui[key].status === MODULARUI_STATUS.LOADING
  ).length === 0;

const loadingCounter = (state) =>
  Object.keys(state.modularui).filter(
    (key) => state.modularui[key].status === MODULARUI_STATUS.LOADING
  ).length;

const render = (
  store: ReduxStore,
  renderApplication: Function
): Promise<string> => {
  let loadingCount = loadingCounter(store.getState());
  let html = "<div>Nothing to render</div>";

  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      const previousCount = loadingCount;
      loadingCount = loadingCounter(store.getState());

      if (previousCount !== loadingCount && noLoading(store.getState())) {
        try {
          html = renderApplication();
        } catch (error) {
          reject(error);
          return;
        }

        if (noLoading(store.getState())) {
          unsubscribe();
          resolve(html);
        }
      }
    });

    try {
      html = renderApplication();
    } catch (error) {
      reject(error);
      return;
    }

    if (noLoading(store.getState())) {
      unsubscribe();
      resolve(html);
    }
  });
};

export default render;
