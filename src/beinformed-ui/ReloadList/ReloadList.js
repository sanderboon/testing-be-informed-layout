// @flow
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { modelByHref } from "beinformed/modularui/selectors";
import { Href } from "beinformed/models";

import type { ReduxState } from "beinformed/redux";
export type Props = {
  href: Href,
};

const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  const locationParts = ownProps.href.path.split("/");

  let listModelHref = null;

  locationParts.reduce((accumulator, current) => {
    const path = `${accumulator}/${current}`;

    const model = modelByHref(state, path);

    if (listModelHref === null && model && model.type === "List") {
      listModelHref = model.selfhref;
    }

    return path;
  });

  let href = new Href("/");
  if (listModelHref) {
    href = listModelHref;
    href.state = {
      reload: Date.now(),
    };
  }

  return {
    to: href.toLocation(),
  };
};

// $FlowFixMe
export const connector = connect(mapStateToProps);
export default connector(Redirect);
