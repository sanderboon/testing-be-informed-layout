// @flow
import { AssignmentFilterModel, ChoiceAttributeModel } from "beinformed/models";

import {
  ChosenChoiceFilter,
  ChosenRangeFilter,
  ChosenAssignmentTypeFilter,
  ChosenStandardFilter,
} from "_component-registry/filters";

import type { ListModel, FilterModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +filter: FilterModel | AssignmentFilterModel,
};

const ChosenFilter = ({ className, list, filter }: Props) => {
  if (filter.attribute instanceof ChoiceAttributeModel) {
    return (
      <ChosenChoiceFilter
        className={className}
        list={list}
        attribute={filter.attribute}
        param={filter.param}
      />
    );
  }

  if (filter.type.includes("range")) {
    return (
      <ChosenRangeFilter className={className} list={list} filter={filter} />
    );
  }

  if (filter instanceof AssignmentFilterModel) {
    return (
      <ChosenAssignmentTypeFilter
        className={className}
        list={list}
        filter={filter}
      />
    );
  }

  return (
    <ChosenStandardFilter
      className={className}
      list={list}
      attribute={filter.attribute}
      param={filter.param}
    />
  );
};

ChosenFilter.displayName = "BI.ChosenFilter";

export default ChosenFilter;
