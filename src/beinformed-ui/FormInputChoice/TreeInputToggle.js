// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Icon } from "_component-registry/icon";

import type { ChoiceAttributeOptionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +expanded: boolean,
  +id: string,
  +option: ChoiceAttributeOptionModel,
  +onClick: (e: SyntheticEvent<*>, option: ChoiceAttributeOptionModel) => void,
  +onKeyDown: (
    e: SyntheticKeyboardEvent<*>,
    option: ChoiceAttributeOptionModel
  ) => void,
};

const StyledIcon = styled.span`
  padding-right: 4px;
  margin-left: ${spacer(-1.5)};
  cursor: pointer;
  ${(props) => props.isClosed && `padding-left: -15px;`}
`;

/**
 * Render toggle icon and 'button' to toggle children
 */
const TreeInputToggle = ({
  className,
  expanded,
  id,
  option,
  onClick,
  onKeyDown,
}: Props) => (
  <StyledIcon
    className={classNames("tree-input-toggle", className)}
    role="button"
    aria-controls={`${id}-${option.code}`}
    aria-expanded={expanded}
    tabIndex="0"
    aria-label={`Toggle ${option.label}`}
    isClosed={!expanded}
    onClick={(e) => onClick(e, option)}
    onKeyDown={(e) => onKeyDown(e, option)}
  >
    <Icon name={expanded ? "minus-box-outline" : "plus-box-outline"} />
  </StyledIcon>
);

TreeInputToggle.displayName = "BI.TreeInputToggle";

export default TreeInputToggle;
