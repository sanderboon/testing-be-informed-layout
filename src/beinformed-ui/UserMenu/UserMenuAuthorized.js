// @flow
import { mdiAccount, mdiKey, mdiLogout } from "@mdi/js";

import styled from "styled-components";
import { spacers } from "beinformed/theme/utils";

import { Href } from "beinformed/models";
import {
  CHANGEPASSWORD_PATH,
  LOGOUT_PATH,
} from "beinformed/constants/Constants";
import { getSetting } from "beinformed/constants/Settings";

import { Message } from "beinformed/i18n";

import { Icon } from "_component-registry/icon";
import {
  Dropdown,
  DropdownButton,
  DropdownChildren,
  DropdownLink,
} from "_component-registry/dropdown";

export type Props = {
  +className?: string,
  +username: string,
};

const StyledDropdownButton = styled(DropdownButton)`
  padding: ${spacers(0.5, 1)};
`;

const UserMenuAuthorized = ({ className, username }: Props) => {
  const userProfileHref = new Href("/user").setState({ modal: true });
  const changePasswordHref = new Href(CHANGEPASSWORD_PATH).setState({
    modal: true,
  });
  const logoutHref = new Href(LOGOUT_PATH);

  return (
    <div className={className}>
      <Dropdown className="userlinks">
        <StyledDropdownButton buttonStyle="LINK" size="SMALL">
          <Icon path={mdiAccount} textAfter />
          <span className="username">{username}</span>
        </StyledDropdownButton>

        <DropdownChildren align="right">
          <DropdownLink className="user-profile" href={userProfileHref}>
            <Icon path={mdiAccount} textAfter />
            <Message
              id="UserLinks.Menu.UserProfile"
              defaultMessage="User profile"
            />
          </DropdownLink>
          <DropdownLink
            className="change-password"
            href={changePasswordHref}
            isModal={getSetting("RENDER_FORMS_IN_MODAL")}
          >
            <Icon path={mdiKey} textAfter />
            <Message
              id="UserLinks.Menu.ChangePassword"
              defaultMessage="Change password"
            />
          </DropdownLink>
          <DropdownLink className="signout" href={logoutHref}>
            <Icon path={mdiLogout} textAfter />
            <Message id="UserLinks.Menu.LogOut" defaultMessage="Log out" />
          </DropdownLink>
        </DropdownChildren>
      </Dropdown>
    </div>
  );
};
UserMenuAuthorized.displayName = "BI.UserMenuAuthorized";

export default UserMenuAuthorized;
