// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { ActionList } from "_component-registry/actions";
import { Heading } from "_component-registry/elements";

import type { ActionCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +label?: string,
  +actionCollection: ActionCollection,
};

const StyledTaskgroup = styled.div`
  margin-top: ${spacer()};
`;

const ActionPanels = ({ className, label, actionCollection }: Props) => {
  const visibleActions = actionCollection.filter(
    (visibleAction) =>
      visibleAction.layouthint.getByLayoutHint("HIDE_FROM_MENU") === null
  );

  return (
    <div className={classNames("actionpanels", className)}>
      <StyledTaskgroup key={label} className="taskgroup" data-id="instruments">
        <Heading as="h6">{label}</Heading>
        <ActionList actions={visibleActions} />
      </StyledTaskgroup>
    </div>
  );
};

ActionPanels.displayName = "BI.ActionPanels";

export default ActionPanels;
