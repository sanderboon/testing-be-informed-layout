// @flow
import { default as beinformedServer } from "beinformed/server/serverNoSSR";

import { createLocalesWithConfiguredErrors } from "beinformed/i18n";

export const server = (request: HttpServletRequestJava) =>
  beinformedServer({
    request,
    locales: createLocalesWithConfiguredErrors({}),
    serverPreferences: [],
  });
