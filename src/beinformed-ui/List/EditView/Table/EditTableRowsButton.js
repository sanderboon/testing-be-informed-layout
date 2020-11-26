// @flow
import { StyledButton } from "_component-registry/elements";
import { Icon } from "_component-registry/icon";

import type { ActionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +name: string,
  +dataId?: string,
  +action: ActionModel,
  +onClick: (actionKey: string) => void,
};

const EditTableRowsButton = ({
  className,
  name,
  action,
  dataId,
  onClick,
}: Props) => {
  const handleClick = () => {
    onClick(action.name);
  };

  return (
    <StyledButton
      className={className}
      name={name}
      buttonStyle="PRIMARY"
      data-id={dataId}
      onClick={handleClick}
    >
      <Icon name="plus" />
      {action.label}
    </StyledButton>
  );
};

EditTableRowsButton.displayName = "BI.EditTableRowsButton";

export default EditTableRowsButton;
