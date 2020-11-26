// @flow
import { useState } from "react";

import classNames from "classnames";
import styled from "styled-components";

import { HTMLForm } from "_component-registry/form";
import {
  FilterPanel,
  FilterRenderer,
  SkipFiltersLink,
} from "_component-registry/filters";

import type { FilterAttributeType, ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +onSubmit: Function,
};

const StyledFilters = styled.div`
  font-size: 80%;
`;

/**
 * Render filters
 */
const Filters = ({ className, list, onSubmit }: Props) => {
  const [lastListUpdate, setLastListUpdate] = useState(list.lastServerUpdate);
  const [filters, setFilters] = useState(list.filterCollection.clone(true));

  // Replace local filters with filters from list after server update
  // Handles updates from outside this filter component like reset all filters
  if (lastListUpdate !== list.lastServerUpdate) {
    setFilters(list.filterCollection.clone(true));
    setLastListUpdate(list.lastServerUpdate);
  }

  const handleSubmit = () => {
    if (filters.isValid) {
      onSubmit(filters);
    }
  };

  const handleChange = (
    attribute: FilterAttributeType,
    inputvalue: any,
    submitOnChange: boolean = false
  ) => {
    filters.update(attribute, inputvalue);
    setFilters(filters.clone());

    if (submitOnChange) {
      handleSubmit();
    }
  };

  return (
    <StyledFilters className={classNames("filters", className)}>
      <SkipFiltersLink listKey={list.key} />
      <HTMLForm
        method="get"
        name="filters"
        action={list.selfhref}
        onSubmit={handleSubmit}
      >
        {filters.map((filter) => (
          <FilterPanel
            key={filter.name}
            name={filter.name}
            label={filter.label}
            contextLabel={filter.contextLabel}
          >
            <FilterRenderer filter={filter} onChange={handleChange} />
          </FilterPanel>
        ))}
      </HTMLForm>
    </StyledFilters>
  );
};

Filters.displayName = "BI.Filters";

export default Filters;
