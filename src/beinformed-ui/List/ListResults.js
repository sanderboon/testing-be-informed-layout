// @flow
import { ListNoResults } from "_component-registry/list";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +getView: (viewProps: Object) => any,
};

const ListResults = ({ getView, list, className }: Props) => {
  if (list.hasResults()) {
    return getView({
      className,
      list,
    });
  }

  return (
    <ListNoResults
      className={className}
      label={list.label}
      isSearch={list.resourcetype === "CaseSearch"}
    />
  );
};

ListResults.displayName = "BI.ListResults";

export default ListResults;
