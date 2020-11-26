// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { Tooltip } from "_component-registry/tooltip";

import ProcessIconsSVG from "./process-icons.svg";

export type Props = {
  +className?: string,
  +name: string,
  +tooltip?: string,
  +textAfter?: boolean,
  +textBefore?: boolean,
};

const StyledSVG = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: currentColor;

  ${(props) =>
    props.textAfter &&
    css`
      margin-right: ${spacer(0.25)};
    `};
  ${(props) =>
    props.textBefore &&
    css`
      margin-left: ${spacer(0.25)};
    `};
`;

// https://css-tricks.com/creating-svg-icon-system-react/ remove use?
const ProcessIcon = ({
  className,
  name,
  tooltip,
  textBefore,
  textAfter,
}: Props) => {
  const svg = (
    <StyledSVG
      className={classNames("process-icon", `icon-${name}`, className)}
      textBefore={textBefore}
      textAfter={textAfter}
    >
      <use xlinkHref={`${ProcessIconsSVG}#${name}`} />
    </StyledSVG>
  );

  return tooltip ? <Tooltip content={tooltip}>{svg}</Tooltip> : svg;
};

ProcessIcon.displayName = "BI.ProcessIcon";

export default ProcessIcon;
