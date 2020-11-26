// @flow
import classNames from "classnames";

import { useMessage } from "beinformed/i18n";

import { TaskGroupPanel } from "_component-registry/actions";

import type { TaskGroupModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +taskgroups: Array<TaskGroupModel>,
};

const DynamicProcessTaskGroups = ({ className, taskgroups }: Props) => {
  const requiredTasksLabel = useMessage(
    "DynamicProcessTaskGroup.Required",
    "Required"
  );
  const optionalTasksLabel = useMessage(
    "DynamicProcessTaskGroup.Optional",
    "Not required"
  );
  const completedTasksLabel = useMessage(
    "DynamicProcessTaskGroup.Completed",
    "Completed"
  );

  const requiredTasks = [];
  const optionalTasks = [];
  const completedTasks = [];

  taskgroups.forEach((taskgroup) => {
    requiredTasks.push(
      ...taskgroup.actionCollection.filter(
        (action) =>
          action.isProcessTask &&
          action.processStatus &&
          action.processStatus.isNeeded &&
          !action.processStatus.isCompleted
      )
    );

    optionalTasks.push(
      ...taskgroup.actionCollection.filter(
        (action) =>
          !action.isProcessTask ||
          (action.processStatus &&
            !action.processStatus.isNeeded &&
            !action.processStatus.isCompleted)
      )
    );

    completedTasks.push(
      ...taskgroup.actionCollection.filter(
        (action) =>
          action.isProcessTask &&
          action.processStatus &&
          action.processStatus.isCompleted
      )
    );
  });

  return (
    <div className={classNames("dynamic-process-taskgroups", className)}>
      {requiredTasks.length > 0 && (
        <TaskGroupPanel
          dataId="required-tasks"
          label={requiredTasksLabel}
          actions={requiredTasks.sort((x, y) => x.isDisabled - y.isDisabled)}
          isProcessTaskGroup
        />
      )}

      {optionalTasks.length > 0 && (
        <TaskGroupPanel
          dataId="optional-tasks"
          label={optionalTasksLabel}
          actions={optionalTasks.sort((x, y) => x.isDisabled - y.isDisabled)}
          isProcessTaskGroup
        />
      )}

      {completedTasks.length > 0 && (
        <TaskGroupPanel
          dataId="completed-tasks"
          label={completedTasksLabel}
          actions={completedTasks}
          isProcessTaskGroup
        />
      )}
    </div>
  );
};

DynamicProcessTaskGroups.displayName = "BI.DynamicProcessTaskGroups";

export default DynamicProcessTaskGroups;
