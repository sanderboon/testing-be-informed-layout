// @flow
import { getSetting } from "beinformed/constants/Settings";

import { ButtonGroup } from "_component-registry/buttons";
import { Action } from "_component-registry/actions";

import type { ActionCollection, ListItemModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +actions: ActionCollection,
  +selectedItems?: Array<ListItemModel>,
};

/**
 * Multi row tasks
 */
const MultiRowTask = ({ className, selectedItems = [], actions }: Props) => (
  <ButtonGroup className={className}>
    {actions.map((action) => {
      if (action.fieldCollection.first) {
        const parameterName = action.fieldCollection.first.name;
        action.selfhref = action.selfhref.addParameter(
          parameterName,
          selectedItems.map((selectedItem) => selectedItem.id).join(",")
        );
      }

      return (
        <Action
          key={action.name}
          action={action}
          isDisabled={selectedItems.length === 0}
          isModal={getSetting("RENDER_FORMS_IN_MODAL")}
          isButton
          renderIcon={false}
        />
      );
    })}
  </ButtonGroup>
);

MultiRowTask.displayName = "BI.MultiRowTask";

export default MultiRowTask;
