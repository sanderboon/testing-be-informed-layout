// @flow
import { useState, useEffect } from "react";

import classNames from "classnames";
import styled, { css, keyframes } from "styled-components";
import { themeProp } from "beinformed/theme/utils";

export type Props = {
  +className?: string,
  +count: number,
  +timestamp: number,
};

const loading = keyframes`
   50% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(100%);
    }
`;

const StyledIndicator = styled.div`
  display: ${({ inProgress, showProgress }) =>
    inProgress && showProgress ? "block" : "none"};
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 2px;
  background: ${themeProp("PROGRESS_INDICATOR_BG")};

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    transform: translateX(-100%);
    background: ${themeProp("PROGRESS_INDICATOR_COLOR")};
    border-radius: 50%;
    animation: ${({ theme }) =>
      css`
        ${loading} ${theme.PROGRESS_INDICATOR_DURATION}s ease infinite;
      `};
    animation-delay: 1s;
  }
`;

/**
 * Progress indicator
 */
const ProgressIndicator = ({ className, timestamp = 0, count = 0 }: Props) => {
  const [showProgress, setShowProgress] = useState(false);

  const inProgress = count !== 0;

  useEffect(() => {
    const timer1 = setTimeout(() => setShowProgress(true), 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <StyledIndicator
      inProgress={inProgress}
      showProgress={showProgress}
      id="progress-indicator"
      className={classNames("progress-indicator", className, {
        inprogress: inProgress,
        finished: !inProgress,
      })}
      data-timestamp={timestamp}
      data-count={count}
    />
  );
};

ProgressIndicator.displayName = "BI.ProgressIndicator";

export default ProgressIndicator;
