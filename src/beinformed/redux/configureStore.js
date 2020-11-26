// @flow
import {
  applyMiddleware,
  compose,
  combineReducers,
  createStore as createReduxStore,
} from "redux";
import thunk from "redux-thunk";
import { IS_DEVELOPMENT } from "beinformed/constants/Constants";

import routerMiddleware from "beinformed/redux/middleware/routerMiddleware";
import modularuiMiddleware from "beinformed/redux/middleware/modularuiMiddleware";

import { createReducer } from "beinformed/redux/reducers";
import { locationChange } from "beinformed/redux/actions/Router";

import type { RouterHistory } from "react-router";
import type { ReduxAction, ReduxState, ReduxStore } from "beinformed/redux";
import type { Reducer } from "redux";

const configureStore = (
  history: RouterHistory,
  customReducers?: Object,
  initialState?: $Shape<ReduxState>
): { history: RouterHistory, store: ReduxStore } => {
  let composeEnhancers = compose;

  if (IS_DEVELOPMENT && typeof window !== "undefined") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const combinedReducers: Reducer<ReduxState, ReduxAction> = combineReducers({
    ...customReducers,
    ...createReducer(),
  });

  const middleware = applyMiddleware(
    modularuiMiddleware,
    //$FlowFixMe
    routerMiddleware(history),
    thunk
  );
  //$FlowFixMe
  const enhancers = composeEnhancers(middleware);

  const store: ReduxStore = createReduxStore(
    combinedReducers,
    initialState,
    enhancers
  );

  if (!initialState) {
    store.dispatch(locationChange(history.location, "PUSH"));
  }
  return { history, store };
};

export default configureStore;
