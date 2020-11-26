// @flow
import styled from "styled-components";
import classNames from "classnames";
import { spacer, renderContrastColor, themeProp } from "beinformed/theme/utils";

import { FilterInput } from "_component-registry/filters";

import type { ChoiceAttributeModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +namePrefix: string,
  +attribute: ChoiceAttributeModel,
  +onChange: Function,
};

const StyledAttribute = styled.div`
  margin-bottom: ${spacer(0.25)};
`;
const StyledLabel = styled.label`
  padding-right: ${spacer(1.5)};

  font-family: ${themeProp("HEADER_FONT")};
  font-weight: ${themeProp("FONT_WEIGHT_LABEL")};

  color: ${renderContrastColor("PANEL_TITLE_BG", "PRIMARY_ACCENT_COLOR")};
`;

const AssignmentFilterAttribute = ({
  className,
  namePrefix,
  attribute,
  onChange,
}: Props) => {
  const handleChange = (value) => onChange(attribute, value, true);

  return (
    <StyledAttribute
      className={classNames(className, "filter")}
      data-id={namePrefix + attribute.name}
    >
      <StyledLabel
        htmlFor={namePrefix + attribute.name}
        id={`${namePrefix + attribute.name}-label`}
      >
        {attribute.label}
      </StyledLabel>
      <FilterInput
        attribute={attribute}
        id={attribute.name}
        onChange={(e) => handleChange(e.target.value)}
        onValueChange={(value) => handleChange(value)}
      />
    </StyledAttribute>
  );
};

AssignmentFilterAttribute.displayName = "BI.AssignmentFilterAttribute";

export default AssignmentFilterAttribute;
