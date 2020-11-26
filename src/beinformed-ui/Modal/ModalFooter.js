// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, roundedCorners, spacer } from "beinformed/theme/utils";

import type { Node } from "react";
export type Props = { +className?: string, +children?: Node };

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${spacer()};
  border-top: 1px solid ${themeProp("GREY_200", "#e9ecef")};
  ${roundedCorners("bottom-right", "BORDER_RADIUS_LARGE", "0.3rem")};
  ${roundedCorners("bottom-left", "BORDER_RADIUS_LARGE", "0.3rem")};

  > :not(:first-child) {
    margin-left: ${spacer(0.25)};
  }

  > :not(:last-child) {
    margin-right: ${spacer(0.25)};
  }
`;

/**
 * Render modal footer
 */
const ModalFooter = ({ className, children }: Props) => (
  <StyledFooter className={classNames("modal-footer", className)}>
    {children}
  </StyledFooter>
);

ModalFooter.displayName = "BI.ModalFooter";

export default ModalFooter;
