// @flow
import { Route, Redirect } from "react-router-dom";
import qs from "qs";
import { has, get } from "lodash";

import ShowAvailableThemeProps from "../Theme/ShowAvailableThemeProps";

import type { Node } from "react";
export type Props = { +children: Node };

const RootRoute = ({ children }: Props) => {
  const hostname = get(location, "hostname", "");
  const IS_LOCALHOST = hostname === "localhost" || hostname === "127.0.0.1";

  return (
    <Route
      key="redirectRoute"
      render={({ location }) => {
        const parsedQuerystring = qs.parse(location.search, {
          ignoreQueryPrefix: true,
        });

        if (has(parsedQuerystring, "redirectURI")) {
          return <Redirect to={parsedQuerystring.redirectURI.toString()} />;
        }

        if (has(parsedQuerystring, "show-theme-props") && IS_LOCALHOST) {
          return <ShowAvailableThemeProps />;
        }

        return children;
      }}
    />
  );
};

RootRoute.displayName = "BI.RootRoute";

export default RootRoute;
