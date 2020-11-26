// @flow
import { memo } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { withPathname } from "beinformed/connectors/Router";
import { Href } from "beinformed/models";

import { ConnectedCaseView } from "_component-registry/caseview";
import { ConnectedForm } from "_component-registry/form";
import { ConnectedPanelRenderer } from "_component-registry/panelrenderer";

import type { TabModel } from "beinformed/models";
export type Props = {
  +pathname: string,
  +tab?: TabModel,
};

const TabRoutes = memo<Props>(({ pathname, tab }: Props) => {
  if (!tab) {
    return null;
  }

  const isRoot = tab.selfhref.equals(pathname);
  if (isRoot && tab.components.hasItems) {
    const tabComponent = tab.components.first;
    return tabComponent ? (
      <Redirect to={tabComponent.href.toLocation()} />
    ) : null;
  }

  const tabComponents = [
    ...tab.components.filter((component) => component.group === "component"),
    ...tab.components.filter((component) => component.group === "search"),
  ];

  const tabActions = [
    tab.actionCollection,
    ...tab.taskGroupCollection.map((taskGroup) => taskGroup.actionCollection),
  ].filter((actionCollection) => actionCollection.hasItems);

  const componentsPath = tab.components.all
    .map((component) => component.href.path)
    .join("|");

  return (
    <Switch>
      {tabActions.map((actionCollection) => (
        <Route
          key={actionCollection.routePath}
          path={actionCollection.routePath}
          component={ConnectedForm}
        />
      ))}

      {tabComponents.length > 0 && (
        <Route
          path={`(${componentsPath})`}
          render={({ match, location }) => (
            <ConnectedPanelRenderer
              href={new Href(match.url)}
              querystring={location.search}
              match={match}
              isRoot
            />
          )}
        />
      )}

      <Route
        path={`${tab.selfhref.path}/:caseview/:caseid`}
        component={ConnectedCaseView}
      />
    </Switch>
  );
});

TabRoutes.displayName = "BI.TabRoutes";

export default withPathname(TabRoutes);
