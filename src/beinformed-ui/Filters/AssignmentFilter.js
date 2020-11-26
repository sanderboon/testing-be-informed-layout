// @flow
import classNames from "classnames";

import { PARAMETER_SEPARATOR } from "beinformed/constants/Constants";

import { AssignmentFilterAttribute } from "_component-registry/filters";

import type { AssignmentFilterModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +filter: AssignmentFilterModel,
  +onChange: Function,
};

const AssignmentFilter = ({ className, filter, onChange }: Props) => {
  const namePrefix = filter.listkey + PARAMETER_SEPARATOR;

  return (
    <div className={classNames("assignmentfilter", className)}>
      {filter.user && (
        <AssignmentFilterAttribute
          namePrefix={namePrefix}
          attribute={filter.user}
          onChange={onChange}
        />
      )}
      {filter.assignmenttype && (
        <AssignmentFilterAttribute
          namePrefix={namePrefix}
          attribute={filter.assignmenttype}
          onChange={onChange}
        />
      )}

      {!filter.user && !filter.assignmenttype && (
        <span>No User or Assignmenttype filter found</span>
      )}
    </div>
  );
};

AssignmentFilter.displayName = "BI.AssignmentFilter";

export default AssignmentFilter;
