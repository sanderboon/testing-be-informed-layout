// @flow
import {
  AssignmentFilterModel,
  ConceptIndexFilterModel,
  RangeFilterModel,
} from "beinformed/models";

import {
  ChoiceFilter,
  AssignmentFilter,
  RangeFilter,
  TextFilter,
} from "_component-registry/filters";

import type { FilterType } from "beinformed/models";
export type Props = {
  +className?: string,
  +filter: FilterType,
  +renderButton?: boolean,
  +onChange: Function,
};

const FilterRenderer = ({
  className,
  filter,
  renderButton = true,
  onChange,
}: Props) => {
  if (filter instanceof RangeFilterModel) {
    return (
      <RangeFilter
        className={className}
        filter={filter}
        onChange={onChange}
        renderButton={renderButton}
      />
    );
  }

  if (filter instanceof AssignmentFilterModel) {
    return (
      <AssignmentFilter
        className={className}
        filter={filter}
        onChange={onChange}
      />
    );
  }

  if (filter instanceof ConceptIndexFilterModel || filter.type === "choice") {
    return (
      <ChoiceFilter className={className} filter={filter} onChange={onChange} />
    );
  }

  return (
    <TextFilter
      className={className}
      filter={filter}
      onChange={onChange}
      renderButton={renderButton}
    />
  );
};

FilterRenderer.displayName = "BI.FilterRenderer";

export default FilterRenderer;
