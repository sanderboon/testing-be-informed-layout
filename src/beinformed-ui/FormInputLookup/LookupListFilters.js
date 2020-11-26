// @flow
import classNames from "classnames";

import { Filters } from "_component-registry/filters";

import type { ListModel, FilterCollection } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +onSubmit: Function,
};

const LookupListFilters = ({ className, list, onSubmit }: Props) => {
  const handleSubmit = (filters: FilterCollection) => {
    list.filterCollection = filters;
    onSubmit(list);
  };

  return (
    <Filters
      className={classNames(className, "lookuplist-filters")}
      list={list}
      onSubmit={handleSubmit}
    />
  );
};

LookupListFilters.displayName = "BI.LookupListFilters";

export default LookupListFilters;
