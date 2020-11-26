// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacers, spacer, gutter } from "beinformed/theme/utils";

import {
  AttributeLabel,
  AttributeValue,
  ReadonlyLabelAttribute,
  ReadonlyHelptextAttribute,
} from "_component-registry/attributes-readonly";

import { FormContentRenderer } from "_component-registry/formcontent";
import { Row } from "_component-registry/grid";

import { HelptextAttributeModel } from "beinformed/models";

import type {
  AttributeType,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +attribute: AttributeType,
  +direction?: "horizontal" | "vertical",
  +contentConfiguration?: ?ContentConfigurationElements,
  +emptyValue?: string,
  +renderLabel?: boolean,
  +customLabel?: string,
};

const StyledHorizontalAttribute = styled.div`
  display: inline-block;
  padding: ${spacers(0.5, 1, 0.5, 0)};
  margin-right: ${spacer()};
  border-right: 1px solid ${themeProp("GREY_100", "#f8f9fa")};

  word-break: break-word;

  &:last-child {
    border-right: 0;
  }
`;

const StyledRow = styled(Row)`
  word-break: break-word;
`;

const StyledContent = styled(FormContentRenderer)`
  width: 100%;
  padding-left: ${gutter()};
  padding-right: ${gutter()};
`;

const getLabel = (
  attribute: AttributeType,
  contentConfiguration?: ?ContentConfigurationElements,
  customLabel?: string
) => {
  if (customLabel) {
    return customLabel;
  }

  if (contentConfiguration) {
    return attribute.getContentConfiguredLabel(contentConfiguration);
  }

  return attribute.label;
};

/**
 * Renders a standard attribute name value pairs
 */
const Attribute = ({
  className,
  direction = "vertical",
  attribute,
  contentConfiguration,
  emptyValue,
  renderLabel = true,
  customLabel,
}: Props) => {
  if (attribute.type === "label") {
    return (
      <ReadonlyLabelAttribute className={className} attribute={attribute} />
    );
  }

  if (attribute instanceof HelptextAttributeModel) {
    return (
      <ReadonlyHelptextAttribute className={className} attribute={attribute} />
    );
  }

  const StyledAttribute =
    direction === "horizontal" ? StyledHorizontalAttribute : StyledRow;

  const label = getLabel(attribute, contentConfiguration, customLabel);

  return (
    <StyledAttribute
      className={classNames("attribute", `${attribute.type}widget`, className)}
      data-id={attribute.key}
    >
      {renderLabel && (
        <AttributeLabel direction={direction}>{label}</AttributeLabel>
      )}

      <AttributeValue
        direction={direction}
        attribute={attribute}
        emptyValue={emptyValue}
      />

      {attribute.concept && contentConfiguration && (
        <StyledContent
          concept={attribute.concept}
          contentConfiguration={contentConfiguration}
        />
      )}
    </StyledAttribute>
  );
};

Attribute.displayName = "BI.Attribute";

export default Attribute;
