// @flow
import classNames from "classnames";

import { ButtonGroup } from "_component-registry/buttons";

import type { Node } from "react";
export type Props = {
  +ariaLabel: string,
  +children?: Node,
  +className?: string,
};

/**
 * Render a toggle root element
 */
const Toggle = ({ ariaLabel, children, className }: Props) => (
  <ButtonGroup
    className={classNames("toggle", className)}
    ariaLabel={ariaLabel}
  >
    {children}
  </ButtonGroup>
);

Toggle.displayName = "BI.Toggle";

export default Toggle;
