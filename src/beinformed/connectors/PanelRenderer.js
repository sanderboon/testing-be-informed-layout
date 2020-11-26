// @flow
import { modularui } from "beinformed/modularui";
import { Href } from "beinformed/models";

export const connector = modularui(
  "PanelRenderer",
  ({ href, match, querystring = "" }) => {
    if (!href && !match) {
      throw new Error(
        "Cannot determine panel url because of missing href and match"
      );
    }

    const panelHref = href ? new Href(href) : new Href(match.url);

    if (match && match.isExact) {
      panelHref.addParametersFromString(querystring);
    }

    return panelHref;
  },
  {
    propName: "panel",
  }
);
