// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacer, gutter } from "beinformed/theme/utils";

import { Column } from "_component-registry/grid";

import type { Node } from "react";
export type Props = {
  +className?: string,
  +direction?: "horizontal" | "vertical",
  +children?: Node,
};

const StyledHorizontalLabel = styled.div`
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.875rem")};
  font-weight: 500;
`;

const StyledVerticalLabel = styled(Column)`
  padding: ${spacer(0.25)};
  padding-left: ${gutter()};
  padding-right: ${gutter()};
`;

/**
 * Renders a standard attribute name value pairs
 */
const AttributeLabel = ({
  className,
  direction = "vertical",
  children,
}: Props) =>
  direction === "horizontal" ? (
    <StyledHorizontalLabel className={classNames("attribute-label", className)}>
      {children}
    </StyledHorizontalLabel>
  ) : (
    <StyledVerticalLabel
      size={5}
      className={classNames("attribute-label", className)}
    >
      {children}
    </StyledVerticalLabel>
  );

AttributeLabel.displayName = "BI.AttributeLabel";

export default AttributeLabel;
