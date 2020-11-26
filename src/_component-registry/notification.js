// @flow
export { default as NotificationView } from "beinformed-ui/Notification/NotificationView";

import { default as _Notification } from "beinformed-ui/Notification/Notification";
import { connector as connectNotification } from "beinformed/connectors/Notification";
export const ConnectedNotification = connectNotification(_Notification);
