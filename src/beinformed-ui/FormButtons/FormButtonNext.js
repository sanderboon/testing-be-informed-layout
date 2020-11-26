// @flow
import classNames from "classnames";

import { Button } from "_component-registry/buttons";
import { ButtonErrorPopover } from "_component-registry/button-error-popover";

import { getSetting } from "beinformed/constants/Settings";

import type { Node } from "react";
import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +children?: Node,
  +isDisabled?: boolean,
};

const FormButtonNext = ({ className, form, children, isDisabled }: Props) => {
  const isRepeatWithUnknownTotal =
    form.currentFormObject && form.currentFormObject.isRepeatWithUnknownTotal;

  if (
    getSetting("USE_CLIENTSIDE_VALIDATION") &&
    !isRepeatWithUnknownTotal &&
    form.hasErrors()
  ) {
    return (
      <ButtonErrorPopover
        type="submit"
        name="submit"
        buttonStyle="PRIMARY"
        form={form}
        isDisabled={isDisabled}
        className={classNames(className, {
          "btn-next": form.hasNextStep,
          "btn-finish": !form.hasNextStep,
        })}
      >
        {children}
      </ButtonErrorPopover>
    );
  }

  return (
    <Button
      type="submit"
      name="submit"
      buttonStyle="PRIMARY"
      className={classNames(className, {
        "btn-next": form.hasNextStep,
        "btn-finish": !form.hasNextStep,
      })}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};

FormButtonNext.displayName = "BI.FormButtonNext";

export default FormButtonNext;
