// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, roundedCorners, spacer } from "beinformed/theme/utils";

import { CloseButton } from "_component-registry/buttons";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +children?: Node,
  +showClose?: boolean,
  +onClose?: (e: SyntheticEvent<*>) => void,
};

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${spacer()};
  border-bottom: 1px solid ${themeProp("GREY_200", "#e9ecef")};
  ${roundedCorners("top-left", "BORDER_RADIUS_LARGE", "0.3rem")};
  ${roundedCorners("top-right", "BORDER_RADIUS_LARGE", "0.3rem")};
`;

/**
 * Renders modal header
 */
const ModalHeader = ({ className, children, showClose, onClose }: Props) => (
  <StyledHeader className={classNames("modal-header", className)}>
    {children}
    {showClose && onClose && <CloseButton onClose={onClose} />}
  </StyledHeader>
);

ModalHeader.displayName = "BI.ModalHeader";

export default ModalHeader;
