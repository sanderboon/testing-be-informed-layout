// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { Row, Column } from "_component-registry/grid";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: AttributeType,
};

const StyledLabelAttribute = styled(Column)`
  font-weight: ${themeProp("HEADING_FONT_WEIGHT")};
`;

/**
 * Renders a standard attribute name value pairs
 */
const ReadonlyLabelAttribute = ({ className, attribute }: Props) => {
  return (
    <Row>
      <StyledLabelAttribute
        className={classNames(
          "attribute",
          `${attribute.type}widget`,
          className
        )}
        data-id={attribute.key}
      >
        {attribute.label}
      </StyledLabelAttribute>
    </Row>
  );
};

ReadonlyLabelAttribute.displayName = "BI.ReadonlyLabelAttribute";

export default ReadonlyLabelAttribute;
