// @flow
import { Route, Redirect } from "react-router-dom";

import { ConnectedPanelRenderer } from "_component-registry/panelrenderer";

import { withPathname } from "beinformed/connectors/Router";
import { Href } from "beinformed/models";

export type Props = {
  +model: any,
  +isTabView?: boolean,
  +gotoFirst?: boolean,
  +pathname: string,
};

const PanelRoute = ({
  model,
  isTabView = true,
  gotoFirst = true,
  pathname,
}: Props) => {
  if (!model.panelLinks) {
    return null;
  }

  if (gotoFirst) {
    const hasActivePanelLink =
      model.panelLinks &&
      model.panelLinks.some((panelLink) =>
        new Href(pathname).startsWith(panelLink.href)
      );
    if (
      !hasActivePanelLink &&
      model.panelLinks.first &&
      model.selfhref.equals(pathname)
    ) {
      return <Redirect to={model.panelLinks.first.href.toLocation()} />;
    }
  }

  return (
    <Route
      path={model.panelLinks.routePath}
      render={({ location, match }) => (
        <ConnectedPanelRenderer
          href={new Href(match.url)}
          querystring={location.search}
          isTab={isTabView}
          match={match}
        />
      )}
    />
  );
};

PanelRoute.displayName = "BI.PanelRoute";

export default withPathname(PanelRoute);
