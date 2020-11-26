// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer, gutter } from "beinformed/theme/utils";

import { AttributeValueText } from "_component-registry/attributes-readonly";
import { Column } from "_component-registry/grid";

import type { AttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +direction?: "horizontal" | "vertical",
  +attribute: AttributeType,
  +emptyValue?: string,
};

const StyledHorizontalValue = styled.div`
  ${(props) => props.alignment === "right" && `text-align: right;`}
  ${(props) => props.alignment === "center" && `text-align: center;`}
`;
const StyledVerticalValue = styled(Column)`
  padding: ${spacer(0.25)};
  padding-left: ${gutter()};
  padding-right: ${gutter()};
  ${(props) => props.alignment === "right" && `text-align: right;`}
  ${(props) => props.alignment === "center" && `text-align: center;`}
`;

/**
 * Render readonly attribute values
 */
const AttributeValue = ({
  className,
  attribute,
  direction = "vertical",
  emptyValue,
}: Props) => {
  if (!attribute) {
    return null;
  }

  const AttributeValueComponent =
    direction === "horizontal" ? StyledHorizontalValue : StyledVerticalValue;

  return (
    <AttributeValueComponent
      key={attribute.key}
      className={classNames("attribute-value", className)}
      alignment={attribute.alignment}
    >
      <AttributeValueText attribute={attribute} emptyValue={emptyValue} />
    </AttributeValueComponent>
  );
};

AttributeValue.displayName = "BI.AttributeValue";

export default AttributeValue;
