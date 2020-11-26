declare module "beinformed/constants" {
  import typeof {
    HTTP_METHODS,
    NOTIFICATION_TYPES,
    MODULARUI_STATUS,
    AUTOSAVE_STATUS,
  } from "beinformed/constants/Constants";

  declare export type HttpMethods = $Keys<HTTP_METHODS>;
  declare export type NotificationTypes = $Keys<NOTIFICATION_TYPES>;
  declare export type ModularUIStatus = $Keys<MODULARUI_STATUS>;
  declare export type AutosaveStatus = $Keys<AUTOSAVE_STATUS>;
  declare export type FormLayoutType = "vertical" | "horizontal" | "compact";

  declare export type UpdateFormOptions = {
    autosubmit?: boolean,
    autosave?: boolean,
    forceUpdate?: boolean,
  };
}
