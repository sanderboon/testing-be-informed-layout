// @flow
import { useMessage } from "beinformed/i18n";

import { Tooltip } from "_component-registry/tooltip";
import { Button } from "_component-registry/buttons";

export type Props = {
  +className?: string,
  +itemId: string | number,
  +onCancel: Function,
  +onBlur?: Function,
  +onFocus?: Function,
};

const ButtonCancel = ({
  className,
  itemId,
  onCancel,
  onBlur,
  onFocus,
}: Props) => (
  <Tooltip content={useMessage("InlineEdit.CancelEdit", "Cancel")}>
    <Button
      className={className}
      name={`${itemId}--cancel`}
      icon="cancel"
      onClick={onCancel}
      onBlur={onBlur}
      onFocus={onFocus}
      isIconButton
      ariaLabel={useMessage("InlineEdit.CancelEdit", "Cancel")}
    />
  </Tooltip>
);

ButtonCancel.displayName = "BI.ButtonCancel";

export default ButtonCancel;
