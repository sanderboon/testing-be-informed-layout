// @flow
import { NotificationView } from "_component-registry/notification";
import { ErrorNotification } from "_component-registry/errors";

import type { NotificationTypes } from "beinformed/constants";
import type { DismissNotificationAction } from "beinformed/redux";
import type { ErrorResponse } from "beinformed/models";
export type Props = {
  +className?: string,
  +messageType: NotificationTypes,
  +message: {
    id: string | null,
    defaultMessage?: string | null,
    parameters?: Object | null,
  },
  +error: ErrorResponse | null,
  +render: boolean,
  +onDismiss: () => DismissNotificationAction,
};

const Notification = ({
  className,
  message,
  error,
  render,
  messageType,
  onDismiss,
}: Props) => {
  if (render) {
    if (error) {
      return (
        <ErrorNotification
          className={className}
          message={message}
          error={error}
          onDismiss={() => {
            history.back();
            return onDismiss();
          }}
        />
      );
    }

    return (
      <NotificationView
        className={className}
        messageType={messageType}
        message={message}
        onDismiss={onDismiss}
      />
    );
  }

  return null;
};

Notification.displayName = "BI.Notification";

export default Notification;
