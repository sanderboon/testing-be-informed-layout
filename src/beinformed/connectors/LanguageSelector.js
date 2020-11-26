// @flow

/**
 * @deprecated Since version 19.2.
 * Use useSelector and useDispatch hooks from react-redux
 */

import { connect } from "react-redux";

import { updateLocale } from "beinformed/redux/actions/Locales";

import type { ReduxState } from "beinformed/redux";

/**
 * Map state to props
 */
const mapStateToProps = (state: ReduxState) => ({
  activeLocale: state.i18n.locale,
  locales: state.i18n.locales,
});

const mapDispatchToProps = {
  onChange: updateLocale,
};

// $FlowFixMe
export const connector = connect(mapStateToProps, mapDispatchToProps);
