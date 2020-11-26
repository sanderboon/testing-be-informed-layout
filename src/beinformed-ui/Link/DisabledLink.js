// @flow
import { forwardRef } from "react";

import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +dataId?: string | number,
  +title?: string,
  +style?: Object,
  +value?: string,
  +onBlur?: (e: SyntheticEvent<*>) => void,
  +onEnter?: (e: SyntheticEvent<*>) => void,
  +onFocus?: (e: SyntheticEvent<*>) => void,
  +onLeave?: (e: SyntheticEvent<*>) => void,
};

const StyledDisabledLink = styled.span`
  color: ${themeProp("LINK_DISABLED_COLOR", "#6c757d")};
`;

const DisabledLink = forwardRef<Props, typeof StyledDisabledLink>(
  (
    {
      className,
      style,
      value,
      dataId,
      title,
      children,
      onEnter,
      onLeave,
      onBlur,
      onFocus,
    }: Props,
    ref
  ) => (
    <StyledDisabledLink
      ref={ref}
      className={className}
      style={style}
      data-value={value}
      data-id={dataId}
      title={title}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {children}
    </StyledDisabledLink>
  )
);

DisabledLink.displayName = "BI.DisabledLink";

export default DisabledLink;
