// @flow
import { connect } from "react-redux";

import { createSelector } from "reselect";
import { memoize } from "lodash";

import type { ReduxState } from "beinformed/redux";

const getLocaleCode = (state) => state.i18n.locale || "en";
const getLocales = (state) => state.i18n.locales;

const getMessage = createSelector(
  [getLocales, getLocaleCode],
  (locales, localeCode) =>
    memoize(
      (id: string, defaultMessage?: string, placeholders?: Object) =>
        locales
          .getLocale(localeCode)
          .getMessage(id, defaultMessage, placeholders),
      (...args) => JSON.stringify(args)
    )
);

const mapStateToProps = (state: ReduxState) => ({
  message: getMessage(state),
});

// $FlowFixMe
export default connect(mapStateToProps);
