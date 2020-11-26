// @flow
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { memoize } from "lodash";

const getLocaleCode = (state) => state.i18n.locale || "en";
const getLocales = (state) => state.i18n.locales;

const getMessage = createSelector(
  [getLocales, getLocaleCode],
  (locales, localeCode) =>
    // $FlowFixMe
    memoize(
      (
        id?: string | null,
        defaultMessage?: string | null,
        placeholders?: Object
      ) =>
        locales
          .getLocale(localeCode)
          .getMessage(id, defaultMessage, placeholders),
      (...args) => JSON.stringify(args)
    )
);

const useMessage = (
  id?: string | null,
  defaultMessage?: string | null,
  placeholders?: Object | null
) => useSelector(getMessage)(id, defaultMessage, placeholders);

// $FlowFixMe
const useTranslate = () => useSelector(getMessage);

export { useTranslate, useMessage };
export default useMessage;
