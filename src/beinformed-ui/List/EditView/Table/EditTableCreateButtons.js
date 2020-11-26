// @flow
import { EditTableRowsButton } from "_component-registry/inline-edit";

import type { ListModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +showCreateForm: ?string,
  +setShowCreateForm: (formKey: ?string) => void,
};

const EditTableCreateButtons = ({
  className,
  list,
  showCreateForm,
  setShowCreateForm,
}: Props) => {
  const createActions = list.actionCollection
    .getActionsByType("create")
    .filter((action) => !action.isDisabled);

  if (!showCreateForm && createActions.length > 0) {
    return (
      <div className={className}>
        {createActions.map((action) => (
          <EditTableRowsButton
            key={`btn-${list.key}-${action.name}`}
            name={`${list.key}-${action.name}`}
            dataId={action.name}
            action={action}
            onClick={(actionName) => setShowCreateForm(actionName)}
          />
        ))}
      </div>
    );
  }

  return null;
};

EditTableCreateButtons.displayName = "BI.EditTableCreateButtons";

export default EditTableCreateButtons;
