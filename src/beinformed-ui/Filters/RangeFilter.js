// @flow
import classNames from "classnames";
import styled from "styled-components";
import { spacer } from "beinformed/theme/utils";

import { FormAttributeAssistant } from "_component-registry/attributes-assistant";
import { FilterButton, RangeFilterChild } from "_component-registry/filters";

import CompositeAttributeModel from "beinformed/models/attributes/CompositeAttributeModel";

import type {
  RangeFilterModel,
  RangeChildAttributeType,
} from "beinformed/models";

export type Props = {
  +className?: string,
  +filter: RangeFilterModel,
  +renderButton?: boolean,
  +onChange: (attribute: RangeChildAttributeType, value: string) => void,
};

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledAttributesColumn = styled.div`
  width: 100%;
  > div + div {
    margin-top: ${spacer(0.25)};
  }
`;

/**
 * Render range form group
 */
const RangeFilter = ({
  className,
  filter,
  renderButton = true,
  onChange,
}: Props) => {
  const { attribute } = filter;

  if (
    !(attribute instanceof CompositeAttributeModel) ||
    attribute.children.length === 0
  ) {
    return (
      <div>no children available in range attribute: {attribute.label}</div>
    );
  }

  return (
    <div className={classNames("rangefilter", className)}>
      <StyledRow>
        <StyledAttributesColumn>
          <RangeFilterChild
            type="begin"
            attribute={attribute.start}
            parentId={filter.name}
            onChange={onChange}
          />
          <RangeFilterChild
            type="end"
            attribute={attribute.end}
            parentId={filter.name}
            onChange={onChange}
          />
        </StyledAttributesColumn>
        {renderButton && (
          <div>
            <FilterButton disabled={!attribute.isValid} />
          </div>
        )}
      </StyledRow>
      <FormAttributeAssistant attribute={attribute} />
    </div>
  );
};

RangeFilter.displayName = "BI.RangeFilter";

export default RangeFilter;
