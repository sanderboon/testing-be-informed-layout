// @flow
import "./contextPath";

import createUUID from "beinformed/utils/helpers/createUUID";
import { getFullRequestHref } from "beinformed/server/requestInformation";

import {
  createReduxStore,
  setI18n,
  setServerPreferences,
  setConfigurationTheme,
  handleErrors,
} from "./serverUtil";

import renderSSRMinimal from "./renderSSRMinimal";

type serverProps = {
  request: HttpServletRequestJava,
  locales?: Array<Object>,
  customReducers?: Object,
  theme?: Object,
  serverPreferences?: Array<string>,
};

const serverNoSSR = ({
  request,
  locales,
  customReducers,
  serverPreferences = [],
  theme = null,
}: serverProps): string => {
  const UUID = createUUID();
  __webpack_nonce__ = UUID; // NOSONAR

  const requestHref = getFullRequestHref(request);
  const store = createReduxStore(requestHref, customReducers);

  setServerPreferences(store, serverPreferences);
  setConfigurationTheme(store);
  setI18n(store, locales, request);

  handleErrors(store);
  return renderSSRMinimal(store, theme, UUID);
};

export default serverNoSSR;
