// @flow
import { Component, Children, cloneElement } from "react";
import { get } from "lodash";

import { withLocation } from "beinformed/connectors/Router";

import type { Node } from "react";
import type { ApplicationModel } from "beinformed/models";
export type Props = {
  +children?: Node,
  +application: ApplicationModel,
  +location: Location,
};

type State = {
  currentLocation: Location,
  previousLocation: ?Location,
};

class Routes extends Component<Props, State> {
  state: State = {
    currentLocation: this.props.location,
    previousLocation: null,
  };

  // when location changes a navigation occurs and previous location is different
  // this is important for correct rendering of modals
  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.currentLocation !== props.location) {
      return {
        currentLocation: props.location,
        previousLocation: state.currentLocation,
      };
    }

    return null;
  }

  render() {
    const isModal = Boolean(
      get(this.props.location, "state.modal") &&
        this.state.previousLocation !== this.props.location
    );

    return Children.map(this.props.children, (child) =>
      cloneElement(child, {
        isModal,
        location: isModal ? this.state.previousLocation : this.props.location,
        application: this.props.application,
      })
    );
  }
}

Routes.displayName = "BI.Routes";

export default withLocation(Routes);
