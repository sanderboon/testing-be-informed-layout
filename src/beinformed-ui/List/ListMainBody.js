// @flow
import { ActionChooser } from "_component-registry/actions";
import { ListGroup } from "_component-registry/list";

import { MULTI_ROW_TASK } from "beinformed/constants/LayoutHints";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +getView: (viewProps: Object) => any,
};

const ListMainBody = ({ className, list, getView }: Props) => {
  const actionsNoMultiRowTask = list.actionCollection.filter(
    (action) => !action.layouthint.has(MULTI_ROW_TASK)
  );

  if (
    !list.hasResults() &&
    !list.isFiltered() &&
    actionsNoMultiRowTask.length > 0
  ) {
    return (
      <div className="has-no-results">
        <ActionChooser actions={actionsNoMultiRowTask} />
      </div>
    );
  }

  return (
    <ListGroup
      className={className}
      grouping={list.grouping}
      list={list}
      getView={getView}
    />
  );
};

ListMainBody.displayName = "BI.ListMainBody";

export default ListMainBody;
