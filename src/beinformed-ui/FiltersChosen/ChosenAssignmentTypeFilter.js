// @flow
import { Fragment } from "react";

import { ChosenChoiceFilter } from "_component-registry/filters";

import type { ListModel, AssignmentFilterModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +filter: AssignmentFilterModel,
};

const ChosenAssignmentTypeFilter = ({ className, list, filter }: Props) => (
  <Fragment>
    <ChosenChoiceFilter
      className={className}
      list={list}
      attribute={filter.assignmenttype}
      param={filter.assignmenttype.name}
    />
    <ChosenChoiceFilter
      className={className}
      list={list}
      attribute={filter.user}
      param={filter.user.name}
    />
  </Fragment>
);

ChosenAssignmentTypeFilter.displayName = "BI.ChosenStandardFilter";

export default ChosenAssignmentTypeFilter;
