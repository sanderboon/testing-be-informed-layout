// @flow
import { useState, useEffect } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { get } from "lodash";

import { useMessage } from "beinformed/i18n";

import { Icon } from "_component-registry/icon";
import { mdiLoading } from "@mdi/js";

import { getSetting } from "beinformed/constants/Settings";

import {
  FormButtonPrevious,
  FormButtonCancel,
  FormButtonNext,
} from "_component-registry/formbuttons";

import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +onCancel: Function,
  +onPreviousClick: Function,
  +isSubmitting?: boolean,
};

const StyledButtons = styled.div`
  > * + * {
    margin-left: ${spacer(0.25)};
  }
`;

const isDisabled = (form) => {
  // special treatment for repeating attribute set with unknown repeat total
  if (
    form.currentFormObject &&
    form.currentFormObject.isRepeatWithUnknownTotal
  ) {
    const hasOneCompletedQuestion = form.completedFormObjects.some(
      (formObject) =>
        form.currentFormObject && formObject.key === form.currentFormObject.key
    );

    const currentObjectHasValue =
      form.currentFormObject &&
      form.currentFormObject.attributeCollection.some((attribute) =>
        attribute.hasValue()
      );

    return !hasOneCompletedQuestion || currentObjectHasValue || false;
  }

  return false;
};

const FormButtons = ({
  className,
  form,
  isSubmitting = false,
  onPreviousClick,
  onCancel,
}: Props) => {
  const [renderWaitIcon, setRenderWaitIcon] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isSubmitting) {
      timer = setTimeout(() => {
        setRenderWaitIcon(true);
      }, getSetting("SHOW_SUBMIT_WAIT_TIMEOUT"));
    } else {
      setRenderWaitIcon(false);
      clearTimeout(timer);
    }

    return () => {
      setRenderWaitIcon(isSubmitting);
      clearTimeout(timer);
    };
  }, [isSubmitting]);

  const defaultPreviousLabel = useMessage(`Form.Button.Previous`, "Previous");
  const defaultCancelLabel = useMessage(`Form.Button.Cancel`, "Cancel");
  const defaultNextLabel = useMessage(`Form.Button.Next`, "Next");
  const defaultFinishLabel = useMessage(`Form.Button.Finish`, "Finish");

  const getLabel = (btnType, defaultLabel) =>
    get(form, `currentFormObject.buttonLabels.${btnType}`, defaultLabel);

  return (
    <StyledButtons className={classNames("form-buttons", className)}>
      {form.hasPreviousStep && (
        <FormButtonPrevious onClick={() => onPreviousClick(form)}>
          {getLabel("previous", defaultPreviousLabel)}
        </FormButtonPrevious>
      )}

      <FormButtonCancel onClick={() => onCancel(form)}>
        {getLabel("cancel", defaultCancelLabel)}
      </FormButtonCancel>

      <FormButtonNext form={form} isDisabled={isSubmitting || isDisabled(form)}>
        {form.hasNextStep
          ? getLabel("next", defaultNextLabel)
          : getLabel("finish", defaultFinishLabel)}
        {isSubmitting && renderWaitIcon && (
          <Icon path={mdiLoading} spin textBefore />
        )}
      </FormButtonNext>
    </StyledButtons>
  );
};

FormButtons.displayName = "BI.FormButtons";

export default FormButtons;
