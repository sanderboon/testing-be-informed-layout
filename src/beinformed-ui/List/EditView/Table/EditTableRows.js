// @flow
import { useState, useEffect } from "react";
import classNames from "classnames";

import { useModularUI, useModels } from "beinformed/hooks";

import { StyledTableRows } from "_component-registry/list";
import {
  EditTableRow,
  EditTableNoResults,
} from "_component-registry/inline-edit";

import { INLINE_EDIT_CAN_DUPLICATE } from "beinformed/constants/LayoutHints";

import { HTTP_METHODS } from "beinformed/constants/Constants";

import type { ListModel, ListItemModel, FormModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +list: ListModel,
  +selectType?: "single" | "multi",
  +selectedItems: Array<ListItemModel>,
  +onItemSelect?: Function,
  +showCreateForm: ?string,
  +setShowCreateForm: (formKey: ?string) => void,
};

const getActions = (list) => {
  const createActions = list.actionCollection
    .getActionsByType("create")
    .filter((action) => !action.isDisabled);

  const allActions = [...createActions];

  list.listItemCollection.forEach((listItem) => {
    const updateActions = listItem.actionCollection
      .getActionsByType("update")
      .filter((action) => !action.isDisabled);

    allActions.push(...updateActions);
  });

  const actions = [];
  const unique = [];
  allActions.forEach((action) => {
    if (!unique.includes(action.name)) {
      unique.push(action.name);
      actions.push(action);
    }
  });

  return actions;
};

const useForms = (list) => {
  const modularui = useModularUI();
  const [forms, setForms] = useState(null);
  const [requestCount, setRequestCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    const requests = getActions(list).map((action) => {
      const href = action.selfhref.addParameter("commit", "false");
      return (
        modularui(href, {
          method: HTTP_METHODS.POST,
        })
          .fetch()
          // $FlowFixMe
          .then((form: FormModel) => {
            form.tokens = [];
            return {
              [action.name]: form,
            };
          })
      );
    });

    setRequestCount(requests.length);

    Promise.all(requests).then((responses) => {
      // put response array in object
      const actionForms = Object.assign({}, ...responses);

      // $FlowFixMe
      setForms(actionForms);
      setResponseCount(responses.length);
    });
  }, [list, modularui]);

  if (responseCount === requestCount) {
    return forms;
  }

  return null;
};

const EditTableRows = ({
  className,
  list,
  selectType,
  selectedItems,
  onItemSelect,
  showCreateForm,
  setShowCreateForm,
}: Props) => {
  const [duplicateItem, setDuplicateItem] = useState(null);

  const models = useModels();
  const forms = useForms(list);

  if (!forms) {
    return null;
  }

  const canDuplicate = list.layouthint.has(INLINE_EDIT_CAN_DUPLICATE);

  const handleSave = () => {
    models.reload(list);

    setShowCreateForm(null);
    setDuplicateItem(null);
  };

  const handleDuplicate = (item) => {
    const duplicateAction = list.actionCollection.getActionsByType("create")
      .first;

    if (duplicateAction) {
      setShowCreateForm(duplicateAction.name);
      setDuplicateItem(item);
    }
  };

  const handleCancel = () => {
    setShowCreateForm(null);
    setDuplicateItem(null);
  };

  const rows = list.listItemCollection.map((item) => {
    const action = item.actionCollection.getActionsByType("update").first;
    const form = action ? forms[action.name] : null;

    const isSelected = selectedItems.some((selectedItem) =>
      selectedItem.equals(item)
    );
    return (
      <EditTableRow
        key={`${list.key}-${item.id}`}
        headers={list.headers}
        item={item}
        selectType={selectType}
        isSelected={isSelected}
        saveAction={action}
        saveForm={form}
        canDuplicate={canDuplicate}
        onSave={handleSave}
        onDuplicate={handleDuplicate}
        onSelect={onItemSelect}
        isUpdate
      />
    );
  });

  if (showCreateForm) {
    const createAction = list.actionCollection.find(
      (action) => action.name === showCreateForm
    );
    const createForm = forms[showCreateForm];

    rows.push(
      <EditTableRow
        key={`${list.key}-${createForm.key}`}
        headers={list.headers}
        item={duplicateItem}
        saveAction={createAction}
        saveForm={createForm}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <StyledTableRows
      key="table-rows"
      className={classNames("table-rows", className)}
    >
      {rows.length > 0 ? rows : <EditTableNoResults list={list} />}
    </StyledTableRows>
  );
};

EditTableRows.displayName = "BI.EditTableRows";

export default EditTableRows;
