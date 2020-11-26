// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +dataId?: string,
};

const StyledPanel = styled.div`
  margin-bottom: ${spacer()};
`;

/**
 * render Panel
 */
const Panel = ({ className, children, dataId }: Props) => (
  <StyledPanel className={classNames("panel", className)} data-id={dataId}>
    {children}
  </StyledPanel>
);

Panel.displayName = "BI.Panel";

export default Panel;
