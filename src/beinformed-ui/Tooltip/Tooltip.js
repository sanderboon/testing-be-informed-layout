// @flow
import { useState, useRef } from "react";
import { isFunction } from "lodash";
import { usePopper } from "react-popper";

import styled from "styled-components";
import {
  renderContrastColor,
  roundedCorners,
  spacers,
  themeProp,
} from "beinformed/theme/utils";

// popper placement
type Placement =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +children?: Node,
  +content: string,
  +position?: Placement,
};

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltip = styled.div`
  position: relative;
  z-index: 3;

  padding: ${spacers(0.5, 0.8)};
  font-size: ${themeProp("FONT_SIZE_SMALL")};
  font-weight: ${themeProp("FONT_WEIGHT_LIGHT")};
  white-space: nowrap;
  background: ${themeProp("TOOLTIP_BG", "#007bff")};
  color: ${renderContrastColor("TOOLTIP_BG")};
  ${roundedCorners()};

  &:after {
    border: 5px solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &[data-popper-placement*="bottom"]:after {
    bottom: 100%;
    left: 50%;

    border-bottom-color: ${themeProp("TOOLTIP_BG", "#007bff")};
    margin-left: -5px;
  }

  &[data-popper-placement*="top"]:after {
    top: 100%;
    left: 50%;

    border-top-color: ${themeProp("TOOLTIP_BG", "#007bff")};
    margin-left: -5px;
  }

  &[data-popper-placement*="left"]:after {
    left: 100%;
    top: 50%;

    border-left-color: ${themeProp("TOOLTIP_BG", "#007bff")};
    margin-top: -5px;
  }

  &[data-popper-placement*="right"]:after {
    right: 100%;
    top: 50%;

    border-right-color: ${themeProp("TOOLTIP_BG", "#007bff")};
    margin-top: -5px;
  }
`;

const Tooltip = ({ className, children, content, position }: Props) => {
  const [showToolip, setShowTooltip] = useState(false);

  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  const [arrowRef, setArrowRef] = useState(null);

  const { styles, attributes } = usePopper(
    wrapperRef.current,
    tooltipRef.current,
    {
      placement: position,
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowRef,
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    }
  );

  return (
    <>
      <StyledWrapper
        ref={wrapperRef}
        className={className}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </StyledWrapper>
      {showToolip && (
        // $FlowFixMe
        <StyledTooltip
          ref={tooltipRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {isFunction(content) ? content() : content}
          <div
            ref={setArrowRef}
            className="tooltip-arrow"
            style={styles.arrow}
          />
        </StyledTooltip>
      )}
    </>
  );
};

Tooltip.displayName = "BI.Tooltip";

export default Tooltip;
