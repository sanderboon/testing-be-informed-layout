// @flow
import classNames from "classnames";

import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { TaskGroupPanels, ActionPanels } from "_component-registry/actions";
import { CloseButton } from "_component-registry/buttons";

import type { TaskGroupCollection, ActionCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +taskgroups: TaskGroupCollection,
  +actions: ActionCollection,
  +label?: string,
  +onClose: Function,
};

const TaskgroupView = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20;
  width: 300px;
  height: 100%;
  padding: ${spacer()};
  color: #fff;
  background-color: #0062cc;

  a {
    color: #fff;

    &:focus,
    &:hover {
      color: #fff;
    }
  }
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  right: 5px;
  top: 10px;
  color: #fff;
`;

const FoldoutTaskGroups = ({
  className,
  taskgroups,
  actions,
  label,
  onClose,
}: Props) => (
  <TaskgroupView
    className={classNames("taskgroup-view", className)}
    onClick={onClose}
  >
    {taskgroups.hasItems && <TaskGroupPanels taskGroupPanels={taskgroups} />}

    {actions.hasItems && (
      <ActionPanels actionCollection={actions} label={label} />
    )}

    <StyledCloseButton onClose={onClose} />
  </TaskgroupView>
);

FoldoutTaskGroups.displayName = "BI.FoldoutTaskMenu";

export default FoldoutTaskGroups;
