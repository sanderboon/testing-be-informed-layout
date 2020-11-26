// @flow
import { updateModel } from "beinformed/redux/actions/ModularUI";

import type { FormModel, FormObjectModel } from "beinformed/models";

export const addRepeatableAttributeSet = (form: FormModel) => {
  const newForm = form.clone();

  newForm.addEmptyFormObject();

  return updateModel(newForm);
};

export const cancelRepeatableAttributeSet = (
  form: FormModel,
  formObject: FormObjectModel
) => {
  const newForm = form.clone();

  newForm.addEmptyFormObject();
  newForm.removeFormObject(formObject);

  return updateModel(newForm);
};

export const removeRepeatableAttributeSet = (
  form: FormModel,
  formObject: FormObjectModel
) => {
  const newForm = form.clone();

  newForm.removeFormObject(formObject);

  return updateModel(newForm);
};
