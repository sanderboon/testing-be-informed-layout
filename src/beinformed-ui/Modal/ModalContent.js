// @flow
import styled from "styled-components";

import { roundedCorners } from "beinformed/theme/utils";

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  ${roundedCorners("border-radius", "BORDER_RADIUS_LARGE")};
  outline: 0;
`;
ModalContent.displayName = "BI.ModalContent";

export default ModalContent;
