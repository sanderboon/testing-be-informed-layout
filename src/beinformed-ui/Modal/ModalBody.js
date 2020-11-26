// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

const StyledBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: ${spacer()};
`;

import type { Node } from "react";
export type Props = {
  +className?: string,
  +children?: Node,
  +dataId?: string,
};

/**
 * Render modal body
 */
const ModalBody = ({ className, children, dataId }: Props) => (
  <StyledBody className={classNames("modal-body", className)} data-id={dataId}>
    {children}
  </StyledBody>
);

ModalBody.displayName = "BI.ModalBody";

export default ModalBody;
