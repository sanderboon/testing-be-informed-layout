// @flow
import styled from "styled-components";
import { themeProp, roundedCorners, spacer } from "beinformed/theme/utils";

export type Props = {
  +className?: string,
  +progress: number,
};

const StyledProgress = styled.div`
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: ${themeProp("GREY_200", "#e9ecef")};
  ${roundedCorners()};
  margin-bottom: ${spacer(0.25)};
`;

const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: ${themeProp("PRIMARY_COLOR", "#007bff")};
  transition: width 0.6s ease;
  width: ${({ progress }) => `${progress}%`};
`;

const ProgressBar = ({ className, progress = 0 }: Props) => (
  <StyledProgress className={className}>
    <StyledProgressBar
      role="progressbar"
      progress={progress}
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </StyledProgress>
);

ProgressBar.displayName = "BI.ProgressBar";

export default ProgressBar;
