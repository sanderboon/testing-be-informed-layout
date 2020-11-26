// @flow
import { useState } from "react";

import { withLocation } from "beinformed/connectors/Router";

import { ConnectedPanelRenderer } from "_component-registry/panelrenderer";

import { HAS_LIST_WITH_FILTERS } from "beinformed/constants/LayoutHints";

import { Href } from "beinformed/models";

import type { Location } from "react-router-dom";
import type { GroupingPanelModel } from "beinformed/models";
export type Props = {
  +panel: GroupingPanelModel,
  +location: Location,
};

const GroupingPanelAsOverview = ({ panel, location }: Props) => {
  const [hrefs, setHrefs] = useState({});

  if (hrefs[location.pathname] !== location.search) {
    setHrefs({
      ...hrefs,
      [location.pathname]: location.search,
    });
  }

  return panel.panelLinks.map((panelLink) => {
    const pathname = panelLink.href.path;
    const panelHref = hrefs[pathname]
      ? new Href(panelLink.href).addParametersFromString(hrefs[pathname])
      : panelLink.href;

    return (
      <ConnectedPanelRenderer
        key={panelLink.key}
        href={panelHref}
        panelOptions={{
          showListFilters: panel.layouthint.has(HAS_LIST_WITH_FILTERS),
        }}
      />
    );
  });
};

export default withLocation(GroupingPanelAsOverview);
