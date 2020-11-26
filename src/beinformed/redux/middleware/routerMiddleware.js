// @flow
import { isFunction } from "lodash";

import type { RouterHistory } from "react-router";
import type { Middleware } from "redux";
import type {
  Dispatch,
  ReduxAction,
  ReduxState,
  PushAction,
  ReplaceAction,
  GoAction,
} from "beinformed/redux";

const handlePush = (history, action: PushAction) => {
  history.push(action.payload.location, action.payload.state);
};

const handleReplace = (history, action: ReplaceAction) => {
  history.replace(action.payload.location, action.payload.state);
};

const handleGo = (history, action: GoAction) => {
  history.go(action.payload.delta);
};

const routerMiddleware = (
  history: RouterHistory
): Middleware<ReduxState, ReduxAction, Dispatch> => () => (next) => (
  action
) => {
  if (isFunction(action)) {
    return next(action);
  }

  switch (action.type) {
    case "ROUTER/PUSH":
      handlePush(history, action);
      break;
    case "ROUTER/REPLACE":
      handleReplace(history, action);
      break;
    case "ROUTER/GO":
      handleGo(history, action);
      break;
    case "ROUTER/GOBACK":
      history.goBack();
      break;
    case "ROUTER/GOFORWARD":
      history.goForward();
      break;
    default: // no default
  }

  return next(action);
};

export default routerMiddleware;
