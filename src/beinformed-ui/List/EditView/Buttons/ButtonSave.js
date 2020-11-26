// @flow
import { useMessage } from "beinformed/i18n";

import { Tooltip } from "_component-registry/tooltip";
import { Button } from "_component-registry/buttons";

export type Props = {
  +className?: string,
  +itemId: string | number,
  +onSave: Function,
  +onBlur?: Function,
  +onFocus?: Function,
};

const ButtonSave = ({ className, itemId, onSave, onBlur, onFocus }: Props) => (
  <Tooltip content={useMessage("InlineEdit.SaveRow", "Save row")}>
    <Button
      className={className}
      name={`${itemId}--save`}
      icon="content-save"
      onClick={onSave}
      onBlur={onBlur}
      onFocus={onFocus}
      isIconButton
      ariaLabel={useMessage("InlineEdit.SaveRow", "Save row")}
    />
  </Tooltip>
);

ButtonSave.displayName = "BI.ButtonSave";

export default ButtonSave;
