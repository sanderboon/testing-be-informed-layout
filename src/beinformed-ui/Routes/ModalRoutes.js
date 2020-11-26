// @flow
import { get } from "lodash";
import { Switch, Route, Redirect } from "react-router-dom";

import { ConnectedSignIn } from "_component-registry/authentication";
import { ConnectedForm } from "_component-registry/form";
import { UserProfile } from "_component-registry/user";

import {
  CHANGEPASSWORD_PATH,
  LOGIN_PATH,
  USERPROFILE_PATH,
} from "beinformed/constants/Constants";

import type { Node } from "react";
import type { ContextRouter } from "react-router";
import type { ApplicationModel } from "beinformed/models";
export type Props = {
  +children?: Node,
  +application?: ApplicationModel,
  +isModal?: boolean,
};

const ModalRoutes = ({ children, application, isModal }: Props) =>
  isModal ? (
    <Switch key="modalSwitch">
      {children}
      <Route path={LOGIN_PATH} exact component={ConnectedSignIn} />

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

      <Route
        path={CHANGEPASSWORD_PATH}
        exact
        render={({ location }: ContextRouter) =>
          application &&
          application.userServices &&
          application.userServices.changePassword ? (
            <ConnectedForm
              href={application.userServices.changePassword}
              redirectTo={get(location, "state.from")}
            />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />

      <Route component={ConnectedForm} />
    </Switch>
  ) : null;

ModalRoutes.displayName = "BI.ModalRoutes";

export default ModalRoutes;
