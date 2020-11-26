// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { spacer } from "beinformed/theme/utils";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +alignRight?: boolean,
  +ariaLabel?: string,
  +children?: Node,
};

const StyledGroup = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;

  > * + * {
    margin-left: -1px;
  }

  > *:not(:last-child),
  > *:not(:last-child) > * {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > *:not(:first-child),
  > *:not(:first-child) > * {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${(props) =>
    props.alignRight &&
    css`
      float: right;
      margin-right: ${spacer(0.25)};
    `};
`;

/**
 * Render a close button
 */
const ButtonGroup = ({ children, className, alignRight, ariaLabel }: Props) => (
  <StyledGroup
    className={classNames("btn-group", className)}
    role="group"
    aria-label={ariaLabel}
    alignRight={alignRight}
  >
    {children}
  </StyledGroup>
);

ButtonGroup.displayName = "BI.ButtonGroup";

export default ButtonGroup;
