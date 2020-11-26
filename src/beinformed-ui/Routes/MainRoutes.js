// @flow
import { get } from "lodash";
import { Switch, Route, Redirect } from "react-router-dom";

import { Home } from "_component-registry/home";
import { UserProfile } from "_component-registry/user";
import {
  ConnectedSignIn,
  ConnectedSignOut,
} from "_component-registry/authentication";
import { NotFound } from "_component-registry/main";
import { CheckForWebapp } from "_component-registry/routes";
import { ConnectedForm } from "_component-registry/form";
import { ConnectedTab } from "_component-registry/tab";
import { ConnectedModelCatalog } from "_component-registry/modelcatalog";

import {
  CHANGEPASSWORD_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  USERPROFILE_PATH,
} from "beinformed/constants/Constants";

import type { Node } from "react";
import type { Location } from "react-router";
import type { ApplicationModel } from "beinformed/models";
export type Props = {
  +children?: Node,
  +location?: Location,
  +application?: ApplicationModel,
  +UnknownTabComponent?: any,
};

const MainRoutes = ({
  children,
  location,
  application,
  UnknownTabComponent = CheckForWebapp,
}: Props) => (
  <Switch key="mainSwitch" location={location}>
    {children}
    <Route path="/" exact component={Home} />
    <Route path={LOGIN_PATH} exact component={ConnectedSignIn} />
    <Route
      path={`(${LOGOUT_PATH}|/Logoff)`}
      exact
      component={ConnectedSignOut}
    />

    <Route
      path={CHANGEPASSWORD_PATH}
      exact
      render={(props) =>
        application &&
        application.userServices &&
        application.userServices.changePassword ? (
          <ConnectedForm
            {...props}
            href={application.userServices.changePassword}
            redirectTo={get(props.location, "state.from")}
          />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />

    <Route
      path={USERPROFILE_PATH}
      exact
      render={() =>
        application &&
        application.userServices &&
        application.userServices.user ? (
          <UserProfile user={application.userServices.user} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />

    <Route path="/modelcatalog" component={ConnectedModelCatalog} />

    {application && (
      <Route path={application.tabs.routePath} component={ConnectedTab} />
    )}

    <Route path="/:uri" exact component={UnknownTabComponent} />
    <Route component={NotFound} />
  </Switch>
);

MainRoutes.displayName = "BI.MainRoutes";

export default MainRoutes;
