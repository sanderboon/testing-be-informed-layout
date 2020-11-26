// @flow
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const fadeinAnimation = keyframes`
  99% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
`;

const StyledSpinner = styled.div`
  visibility: hidden;
  animation: 1s ${fadeinAnimation};
  animation-fill-mode: forwards;

  display: inline-block;
  width: 100px;
  height: 100px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  &::after {
    content: " ";
    display: block;
    width: 82px;
    height: 82px;
    margin: 1px;
    border-radius: 50%;
    border: 10px solid #ed8400;
    border-color: #ed8400 transparent #ed8400 transparent;
    animation: ${spinAnimation} 2.2s linear infinite;
  }
`;

const ServerLoader = () => <StyledSpinner />;
ServerLoader.displayName = "BI.ServerLoader";

export default ServerLoader;
