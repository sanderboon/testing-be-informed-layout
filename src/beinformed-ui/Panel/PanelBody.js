// @flow
import classNames from "classnames";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
};

/**
 * render Panel body
 */
const PanelBody = ({ children, className }: Props) => (
  <div className={classNames("panel-body", className)}>{children}</div>
);

PanelBody.displayName = "BI.PanelBody";

export default PanelBody;
