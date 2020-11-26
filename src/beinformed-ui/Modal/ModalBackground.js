// @flow
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: ${(props) => (props.isHidden ? "hidden" : "block")};
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
ModalBackground.displayName = "BI.ModalBackground";

export default ModalBackground;
