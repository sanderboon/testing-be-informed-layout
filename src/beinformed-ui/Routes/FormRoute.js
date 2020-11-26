// @flow
import { Switch, Route } from "react-router-dom";

import { withKey } from "beinformed/connectors/Router";

import { getSetting } from "beinformed/constants/Settings";

import { ConnectedForm } from "_component-registry/form";
import { RedirectToModal, NotFoundActions } from "_component-registry/routes";

import type { ActionCollection } from "beinformed/models";
export type Props = {
  +model: any,
  +locationKey: string,
};

const getRoutePath = (model: any) => {
  const collections: Array<ActionCollection> = [];

  if (model.taskGroupCollection) {
    collections.push(
      ...model.taskGroupCollection.map(
        (taskGroup) => taskGroup.actionCollection
      )
    );
  }

  if (model.actionCollection) {
    collections.push(model.actionCollection);
  }

  const path = collections
    .filter((collection) => collection.hasItems)
    .map((collection) => collection.routePath)
    .join("|")
    .replace(/\(|\)/g, "");

  return path.includes("|") ? `(${path})` : path;
};

const getNotFoundRoutePath = (model: any) => {
  if (model.taskGroupCollection) {
    const path = model.taskGroupCollection
      .filter(
        (taskGroup) =>
          taskGroup.links.hasItems &&
          taskGroup.actionCollection.some((action) => action.isDisabled)
      )
      .map((taskGroup) => taskGroup.selfhref.path + "/*")
      .join("|");

    return path.includes("|") ? `(${path})` : path;
  }

  return "";
};

const FormRoute = ({ model }: Props) => {
  const routePath = getRoutePath(model);
  const notFoundRoutePath = getNotFoundRoutePath(model);

  if (routePath === "" && notFoundRoutePath === "") {
    return null;
  }

  const formsInModal = getSetting("RENDER_FORMS_IN_MODAL");

  const routes = [];

  if (routePath !== "") {
    if (formsInModal) {
      routes.push(<RedirectToModal key="redirect" path={routePath} />);
    } else {
      routes.push(
        <Route key="route" path={routePath} component={ConnectedForm} />
      );
    }
  }

  if (notFoundRoutePath !== "") {
    routes.push(
      <Route
        key="notfound"
        path={notFoundRoutePath}
        component={NotFoundActions}
        exact
      />
    );
  }

  if (routes.length > 0) {
    return <Switch>{routes}</Switch>;
  }

  return routes;
};

FormRoute.displayName = "BI.FormRoute";

export default withKey(FormRoute);
