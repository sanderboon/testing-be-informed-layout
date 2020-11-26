// @flow
import { compose } from "redux";
import { connect } from "react-redux";

import { modularui } from "beinformed/modularui";

import { HTTP_METHODS } from "beinformed/constants/Constants";
import { getSetting } from "beinformed/constants/Settings";

import { previousObject, cancelForm } from "beinformed/redux/actions/Form";
import { showFormNotification } from "beinformed/redux/actions/Notification";

import { Href } from "beinformed/models";

import type { LocationShape } from "react-router";
import type { ReduxState } from "beinformed/redux";
type OwnProps = {
  location: LocationShape,
  isModal?: boolean,
};

const mapStateToProps = (state: ReduxState, ownProps: OwnProps) => ({
  isModal: state.router.location?.state?.modal || ownProps.isModal || false,
});

const mapDispatchToProps = {
  onPrevious: previousObject,
  onCancel: cancelForm,
  showFormNotification,
};

// $FlowFixMe
export const connector = compose(
  // $FlowFixMe
  connect(mapStateToProps, mapDispatchToProps),
  modularui(
    "Form",
    ({ href, location }) => {
      const formHref =
        href || new Href(`${location.pathname}${location.search}`);

      if (getSetting("ALWAYS_COMMIT_FORM")) {
        return formHref;
      }

      return formHref.addParameter("commit", "false");
    },
    { propName: "form", method: HTTP_METHODS.POST }
  )
);
