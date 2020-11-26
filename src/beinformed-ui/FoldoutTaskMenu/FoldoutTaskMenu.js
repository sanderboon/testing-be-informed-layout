// @flow
import { useState } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, roundedCorners } from "beinformed/theme/utils";

import { Icon } from "_component-registry/icon";
import { FoldoutTaskGroups } from "_component-registry/taskmenu";

import type { TaskGroupCollection, ActionCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +taskgroups: TaskGroupCollection,
  +actions: ActionCollection,
  +label?: string,
};

const TaskmenuToggle = styled.button`
  font-size: ${themeProp("FONT_SIZE_BASE", "1rem")};
  line-height: 1.5;
  padding: 0.7em;
  margin: 0;
  color: #fff;
  cursor: pointer;
  background-color: #0062cc;

  border: 0;
  ${roundedCorners()};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  position: absolute;
  top: 20px;
  right: 0;
  z-index: 21;
  display: inline-block;
`;

/**
 * Render a task menu in the tab bar
 */
const FoldoutTaskMenu = ({ className, taskgroups, actions, label }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={classNames("foldouttaskmenu", className)} role="navigation">
      {open ? (
        <FoldoutTaskGroups
          taskgroups={taskgroups}
          actions={actions}
          label={label}
          onClose={() => setOpen(false)}
        />
      ) : (
        <TaskmenuToggle
          id="taskmenu-toggle"
          className="taskmenu-toggle"
          aria-expanded="false"
          onClick={() => setOpen(true)}
        >
          <Icon name="chevron-double-left" />
        </TaskmenuToggle>
      )}
    </div>
  );
};

FoldoutTaskMenu.displayName = "BI.FoldoutTaskMenu";

export default FoldoutTaskMenu;
