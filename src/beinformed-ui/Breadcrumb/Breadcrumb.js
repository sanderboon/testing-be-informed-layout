// @flow
import { memo } from "react";

import classNames from "classnames";
import styled from "styled-components";
import {
  themeProp,
  roundedCorners,
  spacers,
  spacer,
} from "beinformed/theme/utils";

import { BreadcrumbItem } from "_component-registry/breadcrumb";

import type { Href } from "beinformed/models";
export type Props = {
  +className: ?string,
  +items: Array<{
    key: string,
    href: Href,
    label: string,
  }>,
};

const StyledList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: ${spacers(0.75, 1)};
  margin-bottom: ${spacer()};
  list-style: none;
  background-color: ${themeProp("GREY_200", "#e9ecef")};
  ${roundedCorners()};
`;

/**
 * Render a breadcrumb
 */
const Breadcrumb = memo<Props>(({ className, items }: Props) => (
  <StyledList className={classNames("breadcrumb", className)}>
    {items.map((item, idx) => (
      <BreadcrumbItem
        key={`breadcrumbItem-${idx}`}
        item={item}
        isLink={idx < items.length - 1}
      />
    ))}
  </StyledList>
));

Breadcrumb.displayName = "BI.Breadcrumb";

export default Breadcrumb;
