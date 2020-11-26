// @flow
import { getIconFromAction } from "./_util";

import { ProcessIcon, Icon } from "_component-registry/icon";

import type { ActionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +action: ActionModel,
  +icon?: string,
  +textBefore?: boolean,
  +textAfter?: boolean,
  +isProcessTaskGroup?: boolean,
  +isCompleteTaskGroup?: boolean,
};

const ActionIcon = ({
  className,
  action,
  icon,
  textBefore,
  textAfter,
  isProcessTaskGroup = false,
  isCompleteTaskGroup = false,
}: Props) => {
  const iconObject = icon
    ? { type: "font", name: icon }
    : getIconFromAction(action, isProcessTaskGroup, isCompleteTaskGroup);

  const IconComponent = iconObject.type === "process" ? ProcessIcon : Icon;

  return (
    <IconComponent
      className={className}
      name={iconObject.name}
      textAfter={textAfter}
      textBefore={textBefore}
    />
  );
};

ActionIcon.displayName = "BI.ActionIcon";

export default ActionIcon;
