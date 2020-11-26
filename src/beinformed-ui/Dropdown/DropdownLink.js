// @flow
import { forwardRef } from "react";

import classNames from "classnames";
import styled from "styled-components";

import { Link } from "_component-registry/link";

import { StyledDropdownItem } from "_component-registry/dropdown";

import type { Node } from "react";
import type { Href } from "beinformed/models";
export type Props = {
  +ariaLabel?: string,
  +children?: Node,
  +className?: string,
  +href: Href,
  +dataId?: string,
  +value?: string,
  +isActive?: boolean,
  +isModal?: boolean,
  +isDisabled?: boolean,
  +onClick?: Function,
};

const StyledLink = styled(StyledDropdownItem)`
  cursor: pointer;
`;

const DropdownLink = forwardRef<Props, typeof StyledLink>(
  ({ className, ...props }: Props, ref) => (
    <StyledLink
      className={classNames("dropdown-item", className)}
      as={Link}
      ref={ref}
      role="option"
      {...props}
    />
  )
);

DropdownLink.displayName = "BI.DropdownLink";

export default DropdownLink;
