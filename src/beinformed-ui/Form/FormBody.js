// @flow
import { useState } from "react";
import classNames from "classnames";

import {
  FormObject,
  FormErrorMessages,
  FormResults,
} from "_component-registry/form";

import type { FormLayoutType } from "beinformed/constants";
import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +formLayout?: FormLayoutType,
  +autosubmit?: boolean,
  +autosave?: boolean,
};

/**
 * Render form objects of a form
 */
const FormBody = ({
  form,
  formLayout = "vertical",
  className,
  autosubmit = false,
  autosave,
}: Props) => {
  const [showFormErrors, setShowFormErrors] = useState(true);

  return form ? (
    <div className={classNames("form-body", className)}>
      {showFormErrors && form.hasServerErrors() && (
        <FormErrorMessages
          form={form}
          onlyServerErrors
          renderAttributeErrors={false}
          onDismiss={() => setShowFormErrors(false)}
        />
      )}

      {form.getEndResultFormObjects().length > 0 && (
        <FormResults
          id={`${form.key}-results`}
          results={form.getEndResultFormObjects()}
        />
      )}

      {form.currentFormObject && (
        <FormObject
          id={`${form.currentFormObject.key}-${form.currentFormObject.repeatIndex}`}
          form={form}
          object={form.currentFormObject}
          formLayout={formLayout}
          autosubmit={autosubmit}
          autosave={autosave}
        />
      )}
    </div>
  ) : null;
};

FormBody.displayName = "BI.FormBody";

export default FormBody;
