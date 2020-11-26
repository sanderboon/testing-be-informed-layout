// @flow
import styled from "styled-components";

import { getSetting } from "beinformed/constants/Settings";

import { Action } from "_component-registry/actions";

import type { ActionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +actions: Array<ActionModel>,
  +isProcessTaskGroup?: boolean,
};

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;
`;

/**
 * Render a list of actions
 */
const ActionList = ({
  className,
  actions,
  isProcessTaskGroup = false,
}: Props) => (
  <StyledList className={className}>
    {actions.map((action) => (
      <li key={action.key}>
        <Action
          action={action}
          isProcessTaskGroup={isProcessTaskGroup}
          isModal={getSetting("RENDER_FORMS_IN_MODAL")}
        />
      </li>
    ))}
  </StyledList>
);

ActionList.displayName = "BI.ActionList";

export default ActionList;
