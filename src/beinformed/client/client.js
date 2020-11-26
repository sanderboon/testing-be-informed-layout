// @flow
import "./contextPath";

/* polyfills needed for ie11 */
import elementClosest from "element-closest";
elementClosest(window);

/* polyfill for focus-visible */
import "focus-visible";

import { has } from "lodash";
import { hydrate, render } from "react-dom";
import setImmediate from "setimmediate";

import Cache from "beinformed/utils/browser/Cache";

import { createBrowserHistory } from "history";
import createStore from "beinformed/redux/configureStore";
import rehydrate from "beinformed/client/rehydrate";
import { BASE } from "beinformed/constants/Constants";

import { showXHRErrorNotification } from "beinformed/redux/actions/Notification";
import { handleError } from "beinformed/redux/actions/Error";

import { loginSuccess } from "beinformed/redux/actions/SignIn";
import { locationChange } from "beinformed/redux/actions/Router";

import { JsonParseException, FetchException } from "beinformed/exceptions";

import Init from "./Init";

export type Props = {
  customReducers?: Object,
  theme?: Object,
};

// Use 'why-did-you-update' component to find out why certain component re-render
// This can be helpful when the application feels slow
//
// if (process.env.NODE_ENV !== "production") {
//   const { whyDidYouUpdate } = require("why-did-you-update");
//   whyDidYouUpdate(React, {
//     exclude: [/^StyledComponent/]
//   });
// }

/*
 * deserialize serialized data from the server to provide a smooth dehydration.
 */
const parseDataToJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    throw new JsonParseException(`Error parsing content ${data}`);
  }
};

/**
 * Mount the webapplication to the DOM, used client side when JavaScript is enabled.
 */
const client = ({ customReducers = {}, theme = null }: Props = {}) => {
  const dataElement = document.querySelector(
    'script[type="application/json"][data-app-state="app-json"]'
  );
  if (!dataElement) {
    throw new Error("Error loading state, json not found");
  } else if (dataElement.textContent.trim() === "") {
    return;
  }

  const data = parseDataToJSON(dataElement.textContent);

  // remove all resources from cache
  Cache.clear("^res:");

  const browserHistory = createBrowserHistory({
    basename: BASE,
  });
  const { history, store } = createStore(
    // $FlowFixMe: history api does not match react-router api
    browserHistory,
    customReducers,
    rehydrate(data)
  );

  // load existing cache from other browser tabs
  Cache.loadOtherBrowserTabs(() => {
    if (Cache.getItem("auth")) {
      store.dispatch(loginSuccess());
    }
  });

  if (has(data, "error.name")) {
    const error = new FetchException(data.error.response);
    store.dispatch(handleError(error));
  }

  if (Cache.getItem("auth")) {
    store.dispatch(loginSuccess());
  }

  // listen to history change and update the redux router store
  history.listen((location, action) => {
    store.dispatch(locationChange(location, action));
  });

  window.onunhandledrejection = (event) => {
    if (event.detail) {
      return setImmediate(() => {
        const errorMessage = event.detail.reason.message.toString();

        store.dispatch(showXHRErrorNotification(errorMessage));
        throw event.detail.reason;
      });
    }

    return event;
  };

  if (document.body) {
    document.body.className = "js";
  }

  window.addEventListener("DOMContentLoaded", () => {
    const applicationNode = document.querySelector("#application");
    if (applicationNode) {
      const isSSR = applicationNode.querySelector(".application");
      const mount = isSSR ? hydrate : render;
      mount(
        <Init
          store={store}
          history={history}
          contextPath={window.contextPath}
          theme={theme}
        />,
        applicationNode
      );
    } else {
      throw new Error(
        "No DOM element with id application found to attach client to"
      );
    }
  });
};

export default client;
