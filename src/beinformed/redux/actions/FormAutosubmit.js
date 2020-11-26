// @flow
import { loadModularUI } from "./ModularUI";
import { HTTP_METHODS } from "beinformed/constants/Constants";

import type { AttributeType, FormModel } from "beinformed/models";

export const autosubmitFormObject = (
  form: FormModel,
  attribute: AttributeType,
  forceUpdate?: boolean = false
) => {
  // As long as we have form objects,
  // and the current attribute is not found in the current form object, go back.
  // When a form has a result, the current form object is null
  while (
    form.allObjects.length > 0 &&
    (!form.currentFormObject ||
      !form.currentFormObject.hasAttributeByKey(attribute.key))
  ) {
    form.setPreviousObject();
  }

  if (form.isChanged() || forceUpdate) {
    return loadModularUI(form.connectKey, form.selfhref, {
      propName: "form",
      method: HTTP_METHODS.POST,
      data: form.formdata,
      updateModel: form,
    });
  }

  return null;
};
