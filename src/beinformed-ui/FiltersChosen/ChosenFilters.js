// @flow
import classNames from "classnames";
import styled from "styled-components";
import { themeProp, spacers, spacer } from "beinformed/theme/utils";

import { RemoveAllLink, ChosenFilter } from "_component-registry/filters";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
};

const StyledFilters = styled.div`
  display: flex;
  justify-content: center;

  padding: ${spacers(1, 0)};
  margin-bottom: ${spacer()};
  border-bottom: 1px solid ${themeProp("GREY_300", "#dee2e6")};
  font-size: ${themeProp("FONT_SIZE_SMALL", "0.8rem")};
`;

const ChosenFilters = ({ className, list }: Props) => {
  const filters = list.filterCollection.filter((filter) => {
    if (filter.type === "assignment") {
      return (
        (filter.assignmenttype && filter.assignmenttype.initvalue) || // $FlowFixMe
        (filter.user && filter.user.initvalue)
      );
    }

    return filter.attribute.initvalue !== null;
  });

  return filters.length > 0 ? (
    <StyledFilters className={classNames("chosen-filters", className)}>
      {filters.map((filter) => (
        <ChosenFilter
          key={`filter-${filter.name}`}
          list={list}
          filter={filter}
        />
      ))}
      <RemoveAllLink list={list} filters={filters} />
    </StyledFilters>
  ) : null;
};

ChosenFilters.displayName = "BI.ChosenFilters";

export default ChosenFilters;
