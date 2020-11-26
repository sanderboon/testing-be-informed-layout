// @flow
import classNames from "classnames";

import { getSetting } from "beinformed/constants/Settings";

import { Action } from "_component-registry/actions";

import type { TaskGroupModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +taskgroups: Array<TaskGroupModel>,
};

const CompleteStateTaskgroups = ({ className, taskgroups }: Props) => {
  const completeTasks = [];

  taskgroups.forEach((taskgroup) => {
    completeTasks.push(...taskgroup.actionCollection.all);
  });

  if (completeTasks.length > 0) {
    return (
      <div className={classNames("complete-state-taskgroups", className)}>
        {completeTasks.map((completeTask) => (
          <Action
            key={completeTask.key}
            action={completeTask}
            isButton
            isModal={getSetting("RENDER_FORMS_IN_MODAL")}
            isCompleteTaskGroup
          />
        ))}
      </div>
    );
  }

  return null;
};

CompleteStateTaskgroups.displayName = "BI.CompleteStateTaskgroups";

export default CompleteStateTaskgroups;
