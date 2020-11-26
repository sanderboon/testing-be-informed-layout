// @flow
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { get } from "lodash";

import universalFetch from "beinformed/utils/fetch/universalFetch";
import { BASE } from "beinformed/constants/Constants";

import { NotFound } from "_component-registry/main";

import type { Match } from "react-router";
export type Props = {
  +match: Match,
};

const CheckForWebapp = ({ match }: Props) => {
  const [isWebapp, setIsWebapp] = useState(null);

  useEffect(() => {
    const matchedUri = match.params.uri;
    if (matchedUri) {
      universalFetch({
        url: `${BASE}/contributions/${matchedUri}`,
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        setIsWebapp(
          get(response, "webapplication.resourcetype") === "Application"
        );
      });
    }
  }, [match.params.uri]);

  if (isWebapp === null) {
    return null;
  }

  if (isWebapp) {
    return <Redirect to="/" />;
  }

  return <NotFound />;
};

CheckForWebapp.displayName = "BI.CheckForWebapp";

export default CheckForWebapp;
