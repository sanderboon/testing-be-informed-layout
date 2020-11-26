// @flow
import classNames from "classnames";

import { mdiLogout } from "@mdi/js";
import { Icon } from "_component-registry/icon";

import { Href } from "beinformed/models";
import { LOGOUT_PATH } from "beinformed/constants/Constants";

import { Message } from "beinformed/i18n";
import { Link } from "_component-registry/link";

export type Props = {
  +className?: string,
};

const UserMenuAuthorizedNoUser = ({ className }: Props) => (
  <Link
    className={classNames("signout", className)}
    dataId="logout"
    href={new Href(LOGOUT_PATH)}
    isNavLink
  >
    <Icon path={mdiLogout} textAfter />
    <Message id="UserLinks.Menu.LogOut" defaultMessage="Log out" />
  </Link>
);

UserMenuAuthorizedNoUser.displayName = "BI.UserMenuAuthorizedNoUser";

export default UserMenuAuthorizedNoUser;
