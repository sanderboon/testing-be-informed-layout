// @flow
import { useMessage } from "beinformed/i18n";

import { ButtonErrorPopover } from "_component-registry/button-error-popover";
import { Icon } from "_component-registry/icon";

import type { FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
};

const ButtonError = ({ className, form }: Props) => (
  <ButtonErrorPopover
    className={className}
    type="button"
    name="save"
    buttonStyle="DANGER"
    form={form}
  >
    <Icon
      name="alert-circle-outline"
      ariaLabel={useMessage("InlineEdit.RowInError", "Row has errors")}
    />
  </ButtonErrorPopover>
);

ButtonError.displayName = "BI.ButtonError";

export default ButtonError;
