// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { ActionList } from "_component-registry/actions";
import { Heading } from "_component-registry/elements";

import type { ActionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +dataId?: string,
  +label?: string,
  +actions: Array<ActionModel>,
  +isProcessTaskGroup?: boolean,
};

const StyledTaskgroup = styled.div`
  margin-top: ${spacer()};
`;

/**
 * Render a task menu in the tab bar
 */
const TaskGroupPanel = ({
  className,
  dataId,
  label,
  actions,
  isProcessTaskGroup = false,
}: Props) => {
  if (actions.length > 0) {
    return (
      <StyledTaskgroup
        className={classNames("taskgroup", className)}
        data-id={dataId}
      >
        <Heading as="h6">{label}</Heading>
        <ActionList actions={actions} isProcessTaskGroup={isProcessTaskGroup} />
      </StyledTaskgroup>
    );
  }

  return null;
};

TaskGroupPanel.displayName = "BI.TaskGroupPanels";

export default TaskGroupPanel;
