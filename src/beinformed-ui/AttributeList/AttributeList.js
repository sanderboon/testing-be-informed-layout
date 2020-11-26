// @flow
import classNames from "classnames";
import styled from "styled-components";

import { ReadonlyAttribute } from "_component-registry/attributes-readonly";
import { TITLE } from "beinformed/constants/LayoutHints";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +attributes: Array<AttributeType>,
  +direction?: "horizontal" | "vertical",
  +emptyValue?: string,
};

const StyledAttributeList = styled.div`
  ${(props) => props.direction === "horizontal" && `margin-bottom: 0;`}
`;

/**
 * Render a list of attributes
 */
const AttributeList = ({
  attributes,
  className,
  direction,
  emptyValue,
}: Props) =>
  attributes.length > 0 ? (
    <StyledAttributeList
      className={classNames("attribute-list", className)}
      direction={direction}
    >
      {attributes
        .filter((attribute) => !attribute.layouthint.has(TITLE))
        .map((attribute) => (
          <ReadonlyAttribute
            key={attribute.key}
            attribute={attribute}
            direction={direction}
            emptyValue={emptyValue}
          />
        ))}
    </StyledAttributeList>
  ) : null;

AttributeList.displayName = "BI.AttributeList";

export default AttributeList;
