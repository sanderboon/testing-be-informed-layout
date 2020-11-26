// @flow
import { get } from "lodash";

import {
  UserMenuAuthorized,
  UserMenuAuthorizedNoUser,
  UserMenuNotAuthorized,
} from "_component-registry/user";

import type { UserServicesModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +userServices: ?UserServicesModel,
};

const UserMenu = ({ className, userServices }: Props) => {
  if (userServices && userServices.isLoggedIn && userServices.user) {
    return (
      <UserMenuAuthorized
        className={className}
        username={get(userServices, "user.fullname", "")}
      />
    );
  }

  if (userServices && userServices.isLoggedIn) {
    return <UserMenuAuthorizedNoUser className={className} />;
  }

  return <UserMenuNotAuthorized className={className} />;
};
UserMenu.displayName = "BI.UserMenu";

export default UserMenu;
