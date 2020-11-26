// @flow
import { connect } from "react-redux";

import { updateFormAttribute } from "beinformed/redux/actions/FormAttributeSet";
import {
  addRepeatableAttributeSet,
  cancelRepeatableAttributeSet,
  removeRepeatableAttributeSet,
} from "beinformed/redux/actions/FormAttributeSetRepeatable";

import type { Dispatch } from "beinformed/redux";
import type { UpdateFormOptions, FormLayoutType } from "beinformed/constants";
import type {
  AttributeType,
  FormModel,
  FormObjectModel,
} from "beinformed/models";

type OwnProps = {
  form: FormModel,
  object: FormObjectModel,
  formLayout?: FormLayoutType,
  autosubmit?: boolean,
  autosave?: boolean,
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  onAttributeChange: (
    attribute: AttributeType,
    value: string,
    options: UpdateFormOptions = {
      autosubmit: ownProps.autosubmit || false,
      autosave: ownProps.autosave || false,
    }
  ) =>
    dispatch(
      updateFormAttribute(
        ownProps.form,
        ownProps.object,
        attribute,
        value,
        options
      )
    ),
  onAddAttributeSetClick: () =>
    dispatch(addRepeatableAttributeSet(ownProps.form)),
  onCancelAttributeSetClick: (formObject: FormObjectModel) =>
    dispatch(cancelRepeatableAttributeSet(ownProps.form, formObject)),
  onRemoveAttributeSetClick: (formObject: FormObjectModel) =>
    dispatch(removeRepeatableAttributeSet(ownProps.form, formObject)),
});

// $FlowFixMe
export const connector = connect(null, mapDispatchToProps);
