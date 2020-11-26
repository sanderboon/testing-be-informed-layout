// @flow
import { compose } from "redux";
import { connect } from "react-redux";

import { modularui } from "beinformed/modularui";
import { push } from "beinformed/redux/actions/Router";

const mapDispatchToProps = {
  push,
};

// $FlowFixMe
export const connector = compose(
  // $FlowFixMe
  connect(null, mapDispatchToProps),
  modularui("QuickSearch", ({ href }) => href, {
    propName: "search",
  })
);
