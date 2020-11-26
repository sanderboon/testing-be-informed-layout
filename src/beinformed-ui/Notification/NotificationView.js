// @flow
import {
  mdiAlertCircleOutline,
  mdiAlertOutline,
  mdiCheck,
  mdiInformationOutline,
} from "@mdi/js";

import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp, spacer, spacers } from "beinformed/theme/utils";

import { Message } from "beinformed/i18n";

import { CloseButton } from "_component-registry/buttons";
import { Icon } from "_component-registry/icon";

import { NOTIFICATION_TYPES } from "beinformed/constants/Constants";

import type { DismissNotificationAction } from "beinformed/redux";
import type { NotificationTypes } from "beinformed/constants";
export type Props = {
  +className?: string,
  +messageType: NotificationTypes,
  +message: {
    id: string | null,
    defaultMessage?: string | null,
    parameters?: Object | null,
  },
  +onDismiss: () => DismissNotificationAction,
};

const getThemePropKey = (messageType) => {
  switch (messageType) {
    case NOTIFICATION_TYPES.SUCCESS:
      return "NOTIFICATION_SUCCESS";
    case NOTIFICATION_TYPES.ERROR:
      return "NOTIFICATION_ERROR";
    case NOTIFICATION_TYPES.WARNING:
      return "NOTIFICATION_WARNING";
    default:
      return "NOTIFICATION_DEFAULT";
  }
};

const StyledNotification = styled.div`
  position: fixed;
  top: 0;
  z-index: 99999;
  padding: ${spacers(0.75, 4, 0.75, 1.25)};
  margin-bottom: ${spacer()};
  border: 1px solid transparent;
  width: 100%;

  ${({ messageType }) => {
    const themePropKey = getThemePropKey(messageType);
    return css`
      color: ${themeProp(`${themePropKey}_COLOR`)};
      border-color: ${themeProp(`${themePropKey}_BORDER_COLOR`)};
      background-color: ${themeProp(`${themePropKey}_BG`)};
    `;
  }};
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${spacers(0.75, 1.25)};
  color: inherit;
`;

const getIcon = (messageType) => {
  switch (messageType) {
    case NOTIFICATION_TYPES.SUCCESS:
      return mdiCheck;
    case NOTIFICATION_TYPES.ERROR:
      return mdiAlertCircleOutline;
    case NOTIFICATION_TYPES.WARNING:
      return mdiAlertOutline;
    default:
      return mdiInformationOutline;
  }
};

const NotificationView = ({
  className,
  messageType,
  message,
  onDismiss,
}: Props) => {
  const icon = getIcon(messageType);

  return (
    <StyledNotification
      className={classNames("notification", className)}
      messageType={messageType}
      role="alert"
    >
      <StyledCloseButton onClose={onDismiss} />
      <Icon path={icon} textAfter />
      <Message
        className="msg"
        id={message.id}
        defaultMessage={message.defaultMessage}
        data={message.parameters}
      />
    </StyledNotification>
  );
};
NotificationView.displayName = "BI.NotificationView";

export default NotificationView;
