// @flow
export {
  default as Locales,
  availableLocales,
  createLocalesWithConfiguredErrors,
} from "./Locales";
export { default as Message } from "./Message";
export { default as withMessage } from "./withMessage";
export { useMessage, useTranslate } from "./useMessage";

export type MessageParameters = {
  [parameterName: string]: string | number,
};

export type MessageObject = {
  +id: string,
  +defaultMessage?: string,
  +parameters?: MessageParameters,
};

export type LocaleConfiguration = {
  code: string,
  messages: Object,
  errors: Object,
};
