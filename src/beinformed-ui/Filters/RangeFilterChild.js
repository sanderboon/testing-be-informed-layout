// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacers, spacer } from "beinformed/theme/utils";

import { FilterInput } from "_component-registry/filters";

import { Message } from "beinformed/i18n";

import { PARAMETER_SEPARATOR } from "beinformed/constants/Constants";
import { FormAttributeAssistant } from "_component-registry/attributes-assistant";

import { Row, Column } from "_component-registry/grid";

import type { RangeChildAttributeType } from "beinformed/models";
export type Props = {
  +className?: string,
  +type: "begin" | "end",
  +attribute: RangeChildAttributeType,
  +parentId: string,
  +onChange: Function,
};

const StyledLabel = styled.label`
  padding: ${spacers(0.5, 0, 0)};
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.8rem")};
`;

const StyledFormAttributeAssistant = styled(FormAttributeAssistant)`
  margin-left: ${spacer()};
`;

const RangeFilterChild = ({
  className,
  type,
  attribute,
  parentId,
  onChange,
}: Props) => {
  const id = parentId + PARAMETER_SEPARATOR + attribute.name;

  const handleChange = (value) => onChange(attribute, value);

  return (
    <Row
      className={classNames(className, "filter", `range-${type}`)}
      data-id={id}
    >
      <Column size={3}>
        <StyledLabel id={`${id}-label`} htmlFor={id}>
          <Message
            id={type === "begin" ? "RangeFilter.From" : "RangeFilter.To"}
          />
        </StyledLabel>
      </Column>
      <Column size={9}>
        <FilterInput
          attribute={attribute}
          id={id}
          value={attribute.inputvalue}
          onChange={(e) => handleChange(e.target.value)}
          onValueChange={handleChange}
        />
      </Column>
      <StyledFormAttributeAssistant attribute={attribute} />
    </Row>
  );
};
RangeFilterChild.displayName = "BI.RangeFilterChild";

export default RangeFilterChild;
