// @flow
import { useHistory } from "react-router";

import { Filters } from "_component-registry/filters";

import type { FilterCollection, ListModel } from "beinformed/models";
export type Props = {
  +className: string,
  +list: ListModel,
};
const ListFilters = ({ className, list }: Props) => {
  const history = useHistory();

  const handleSubmit = (filters: FilterCollection) => {
    const listHref = list.selfhref;
    listHref.filterCollection = filters;
    listHref.page = null;

    history.push(listHref.toString());
  };

  return <Filters className={className} list={list} onSubmit={handleSubmit} />;
};
ListFilters.displayName = "BI.ListFilters";

export default ListFilters;
