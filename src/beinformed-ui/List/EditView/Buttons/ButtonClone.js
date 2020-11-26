// @flow
import { useMessage } from "beinformed/i18n";

import { Tooltip } from "_component-registry/tooltip";
import { Button } from "_component-registry/buttons";

export type Props = {
  +className?: string,
  +itemId: string | number,
  +onClick: Function,
};

const ButtonClone = ({ className, itemId, onClick }: Props) => (
  <Tooltip content={useMessage("InlineEdit.CloneRow", "Duplicate")}>
    <Button
      className={className}
      key={`${itemId}--clone`}
      name={`${itemId}--clone`}
      icon="content-copy"
      dataId={`${itemId}--clone`}
      onClick={onClick}
      ariaLabel={useMessage("InlineEdit.CloneRow", "Duplicate")}
    />
  </Tooltip>
);

ButtonClone.displayName = "BI.ButtonClone";

export default ButtonClone;
