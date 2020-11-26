// @flow
import classNames from "classnames";
import styled from "styled-components";

import { FilterButton, FilterInput } from "_component-registry/filters";
import { FormAttributeAssistant } from "_component-registry/attributes-assistant";

import type { FilterModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +filter: FilterModel,
  +renderButton?: boolean,
  +onChange: Function,
};

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextFilter = ({
  className,
  filter,
  renderButton = true,
  onChange,
}: Props) => {
  const { attribute } = filter;

  const handleChange = (value) => {
    onChange(attribute, value);
  };

  return (
    <div className={classNames("textfilter", className)}>
      <StyledRow>
        <FilterInput
          attribute={attribute}
          id={filter.name}
          value={attribute.inputvalue}
          onChange={(e) => handleChange(e.target.value)}
          onValueChange={handleChange}
        />
        {renderButton && <FilterButton disabled={!attribute.isValid} />}
      </StyledRow>
      <FormAttributeAssistant attribute={attribute} />
    </div>
  );
};

TextFilter.displayName = "BI.TextFilter";

export default TextFilter;
