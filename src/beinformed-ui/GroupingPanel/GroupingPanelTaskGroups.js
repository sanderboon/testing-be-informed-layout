// @flow
import classNames from "classnames";

import { TaskGroupPanels } from "_component-registry/actions";
import { Column } from "_component-registry/grid";

import type { GroupingPanelModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +panel: GroupingPanelModel,
};

const GroupingPanelTaskGroups = ({ className, panel }: Props) => (
  <Column
    size={3}
    className={classNames("grouping-panel-taskgroups", className)}
  >
    <TaskGroupPanels taskGroupPanels={panel.taskGroupCollection} />
  </Column>
);

GroupingPanelTaskGroups.displayName = "BI.GroupingPanelTaskGroups";

export default GroupingPanelTaskGroups;
