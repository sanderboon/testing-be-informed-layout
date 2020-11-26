// @flow
import { ProcessIcon } from "_component-registry/icon";

import { useMessage } from "beinformed/i18n";

import type { ActionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +action: ActionModel,
  +textBefore?: boolean,
  +textAfter?: boolean,
};

const ActionStatusIcon = ({
  className,
  action,
  textBefore,
  textAfter,
}: Props) => {
  const tooltip = useMessage(
    "ProcessIcon.LockDescription",
    "Task is applicable, you are not authorized"
  );
  if (
    action.isDisabled &&
    action.isProcessTask &&
    action.processStatus &&
    action.processStatus.isApplicable &&
    !action.processStatus.isCompleted
  ) {
    return (
      <ProcessIcon
        className={className}
        name="lock"
        tooltip={tooltip}
        textBefore={textBefore}
        textAfter={textAfter}
      />
    );
  }

  return null;
};

ActionStatusIcon.displayName = "BI.ActionStatusIcon";

export default ActionStatusIcon;
