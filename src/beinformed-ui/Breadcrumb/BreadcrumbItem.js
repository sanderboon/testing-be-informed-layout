// @flow
import { memo } from "react";

import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer } from "beinformed/theme/utils";

import { Link } from "_component-registry/link";

import type { Href } from "beinformed/models";
export type Props = {
  +className?: string,
  +item: {
    key: string,
    href: Href,
    label: string,
  },
  +isLink: boolean,
};

const StyledItem = styled.li`
  & + & {
    padding-left: ${spacer(0.5)};
  }

  & + &::before {
    display: inline-block;
    padding-right: ${spacer(0.5)};
    color: ${themeProp("GREY_600", "#6c757d")};
    content: "/";
  }
`;

/**
 * Render an item on the breadcrumb
 */
const BreadcrumbItem = memo<Props>(({ className, item, isLink }: Props) => (
  <StyledItem
    className={classNames("breadcrumb-item", className)}
    data-id={item.key}
  >
    {isLink ? <Link href={item.href}>{item.label}</Link> : item.label}
  </StyledItem>
));

BreadcrumbItem.displayName = "BI.BreadcrumbItem";

export default BreadcrumbItem;
