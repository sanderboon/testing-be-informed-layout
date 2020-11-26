// @flow
import classNames from "classnames";

import { mdiLogin } from "@mdi/js";
import { Icon } from "_component-registry/icon";

import { Href } from "beinformed/models";
import { LOGIN_PATH } from "beinformed/constants/Constants";

import { Message } from "beinformed/i18n";
import { Link } from "_component-registry/link";

export type Props = {
  +className?: string,
};

const UserMenuNotAuthorized = ({ className }: Props) => (
  <Link
    className={classNames("signin", className)}
    dataId="login"
    href={new Href(LOGIN_PATH)}
    isNavLink
  >
    <Icon path={mdiLogin} textAfter />
    <Message id="UserLinks.Menu.LogIn" defaultMessage="Login" />
  </Link>
);

UserMenuNotAuthorized.displayName = "BI.UserMenuNotAuthorized";

export default UserMenuNotAuthorized;
