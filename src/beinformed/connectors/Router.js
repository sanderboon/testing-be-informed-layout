// @flow
import { connect } from "react-redux";

import {
  push,
  replace,
  go,
  goBack,
  goForward,
} from "beinformed/redux/actions/Router";

// $FlowFixMe
const withKey = connect((state) => ({
  locationKey: state.router.location?.key,
}));

// $FlowFixMe
const withPathname = connect((state) => ({
  pathname: state.router.location?.pathname,
}));

// $FlowFixMe
const withLocation = connect((state) => ({
  location: state.router.location,
}));

// $FlowFixMe
const withQuerystring = connect((state) => ({
  querystring: state.router.location?.search,
}));

// $FlowFixMe
const withNavigation = connect(null, {
  push,
  replace,
  go,
  goBack,
  goForward,
});

export { withKey, withPathname, withLocation, withQuerystring, withNavigation };
