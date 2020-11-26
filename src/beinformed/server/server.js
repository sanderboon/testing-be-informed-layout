// @flow
import "./contextPath";

import createUUID from "beinformed/utils/helpers/createUUID";
import { getFullRequestHref } from "beinformed/server/requestInformation";

import {
  createReduxStore,
  setI18n,
  setServerPreferences,
  setConfigurationTheme,
} from "./serverUtil";

import renderSSRComplete from "./renderSSRComplete";

type serverProps = {
  request: HttpServletRequestJava,
  locales?: Array<Object>,
  customReducers?: Object,
  theme?: Object,
  serverPreferences?: Array<string>,
};

const server = ({
  request,
  locales,
  customReducers,
  serverPreferences = [],
  theme = null,
}: serverProps) => {
  const UUID = createUUID();
  __webpack_nonce__ = UUID; // NOSONAR

  const requestHref = getFullRequestHref(request);
  const store = createReduxStore(requestHref, customReducers);

  setServerPreferences(store, serverPreferences);
  setConfigurationTheme(store);
  setI18n(store, locales, request);

  return renderSSRComplete(store, theme, UUID, requestHref);
};

export default server;
