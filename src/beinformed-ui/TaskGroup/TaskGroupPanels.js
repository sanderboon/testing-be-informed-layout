// @flow
import classNames from "classnames";

import {
  PROCESSTASKS_TASKGROUP,
  COMPLETETASK_TASKGROUP,
} from "beinformed/constants/LayoutHints";

import {
  TaskGroupPanel,
  DynamicProcessTaskGroups,
  CompleteStateTaskgroups,
} from "_component-registry/actions";

import type { TaskGroupCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +taskGroupPanels: TaskGroupCollection,
};

/**
 * Render a task menu in the tab bar
 */
const TaskGroupPanels = ({ className, taskGroupPanels }: Props) => {
  const panels = taskGroupPanels.filter(
    (panel) => panel.actionCollection.length > 0
  );

  const completeStateTaskgroupPanels = panels.filter((panel) =>
    panel.layouthint.has(COMPLETETASK_TASKGROUP)
  );

  const processTaskgroupPanels = panels.filter(
    (panel) =>
      panel.layouthint.has(PROCESSTASKS_TASKGROUP) &&
      !panel.layouthint.has(COMPLETETASK_TASKGROUP)
  );
  const otherTaskgroupPanels = panels.filter(
    (panel) =>
      !panel.layouthint.has(PROCESSTASKS_TASKGROUP) &&
      !panel.layouthint.has(COMPLETETASK_TASKGROUP)
  );

  return (
    <div className={classNames("taskgroup-panels", className)}>
      {processTaskgroupPanels && (
        <DynamicProcessTaskGroups taskgroups={processTaskgroupPanels} />
      )}

      {otherTaskgroupPanels.map((panel) => (
        <TaskGroupPanel
          key={panel.key}
          dataId={panel.key}
          label={panel.label}
          actions={panel.actionCollection.all}
        />
      ))}

      {completeStateTaskgroupPanels && (
        <CompleteStateTaskgroups taskgroups={completeStateTaskgroupPanels} />
      )}
    </div>
  );
};

TaskGroupPanels.displayName = "BI.TaskGroupPanels";

export default TaskGroupPanels;
