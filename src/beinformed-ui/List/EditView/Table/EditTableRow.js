// @flow
import { useState, useEffect } from "react";

import { useModularUI, useProgressIndicator } from "beinformed/hooks";

import { CompositeAttributeModel } from "beinformed/models";

import {
  EditTableRowRenderer,
  EditTableErrorRow,
} from "_component-registry/inline-edit";

import { HTTP_METHODS } from "beinformed/constants/Constants";

import type {
  ActionModel,
  FormModel,
  ListItemModel,
  ListHeaderModel,
} from "beinformed/models";
export type Props = {
  className?: string,
  +headers: Array<ListHeaderModel>,
  +item: ?ListItemModel,
  +selectType?: "single" | "multi",
  +isSelected?: boolean,
  +saveAction: ActionModel,
  +saveForm: ?FormModel,
  +isUpdate?: boolean,
  +canDuplicate?: boolean,
  +onSelect?: Function,
  +onSave: Function,
  +onCancel?: Function,
  +onDuplicate?: Function,
};

const getInitialValue = (item, key) => {
  if (item) {
    const listAttribute = item.getAttributeByKey(key);
    if (listAttribute) {
      return listAttribute.inputvalue || "";
    }
  }

  return "";
};

const getForm = (item, saveForm) => {
  if (!saveForm || !saveForm.currentFormObject) {
    return null;
  }

  const form = saveForm.clone(true);
  if (form && form.currentFormObject) {
    // $FlowFixMe
    form.currentFormObject.attributeCollection.attributes = form.currentFormObject.attributeCollection.map(
      (attribute) => {
        if (attribute.type === "choice" || attribute.type === "boolean") {
          attribute.reset();
        }

        const initialValue = getInitialValue(item, attribute.key);
        const newAttr =
          attribute instanceof CompositeAttributeModel
            ? attribute.update(initialValue, attribute)
            : attribute.update(initialValue);
        newAttr._lastModification = 0;
        return newAttr;
      }
    );
  }

  return form;
};

const getListAttributes = (headers, form, item) => {
  const formAttributes = form?.currentFormObject?.attributeCollection;
  const listAttributes = item?.attributeCollection;

  const isCreateForm = form?.actiontype === "create";

  return headers.map((header) => {
    if (formAttributes && formAttributes.getAttributeByKey(header.key)) {
      return formAttributes.getAttributeByKey(header.key);
    }

    if (
      !isCreateForm &&
      listAttributes &&
      listAttributes.getAttributeByKey(header.key)
    ) {
      return listAttributes.getAttributeByKey(header.key);
    }

    return null;
  });
};

/**
 * Retrieve form attributes that are not rendered on the list
 */
const getFormAttributes = (headers, form) => {
  if (form && form.currentFormObject) {
    const headerKeys = headers.map((header) => header.key);

    //$FlowFixMe
    return form.currentFormObject.attributeCollection.filter(
      (attribute) => !headerKeys.includes(attribute.key)
    );
  }

  return [];
};

const getAttributes = (headers, form, item) => [
  ...getListAttributes(headers, form, item),
  ...getFormAttributes(headers, form),
];

const EditTableRow = ({
  className,
  headers,
  item,
  saveAction,
  saveForm,
  isUpdate,
  canDuplicate,
  selectType,
  isSelected,
  onSelect,
  onSave,
  onCancel,
  onDuplicate,
}: Props) => {
  let _timeout = null;
  const [hasFocus, setHasFocus] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [form, setForm] = useState<?FormModel>(null);

  const modularui = useModularUI();
  const progressIndicator = useProgressIndicator();

  useEffect(() => {
    setForm(getForm(item, saveForm));
  }, [item, saveForm]);

  const itemId = item && isUpdate ? item.id : "create";

  if (saveForm && saveForm.errorCollection.hasItems) {
    return <EditTableErrorRow id={itemId} errors={saveForm.errorCollection} />;
  }

  const attributes = getAttributes(headers, form, item);

  // Actual saving of the row
  const handleSave = () => {
    progressIndicator.start();

    modularui(saveAction.selfhref, {
      method: HTTP_METHODS.POST,
      data: form ? form.formdata : null,
    })
      .fetch()
      // $FlowFixMe
      .then((updatedForm: FormModel) => {
        if (updatedForm.isFinished) {
          setHasFocus(false);
          onSave();
        } else {
          updatedForm.tokens = [];
          setHasFocus(true);

          const newForm = form ? form.update(updatedForm) : updatedForm;
          setForm(newForm);
        }
        progressIndicator.finish();
      });
  };

  const handleFocus = () => {
    clearTimeout(_timeout);
    setHasFocus(true);
  };

  const handleBlur = () => {
    clearTimeout(_timeout);

    if (form && form.isValid) {
      _timeout = setTimeout(() => {
        if (isChanged || !isUpdate) {
          handleSave();
        } else {
          setHasFocus(false);
        }
      }, 200);
    }
  };

  const handleChange = (attribute, inputvalue) => {
    if (form) {
      const newForm = form.clone(true);
      if (newForm.currentFormObject) {
        newForm.currentFormObject.updateAttribute(attribute, inputvalue);
      }
      setForm(newForm);
      setIsChanged(true);
    }
  };

  const handleCancel = () => {
    clearTimeout(_timeout);

    setForm(getForm(item, saveForm));
    setIsChanged(false);
    setHasFocus(false);

    if (onCancel) {
      onCancel();
    }
  };

  const handleDuplicate = () => {
    if (canDuplicate && onDuplicate) {
      onDuplicate(item);
    }
  };

  return (
    <EditTableRowRenderer
      className={className}
      itemId={itemId}
      isUpdate={isUpdate || false}
      item={item}
      attributes={attributes}
      form={form}
      canDuplicate={canDuplicate}
      hasFocus={hasFocus}
      isChanged={isChanged}
      isSelected={isSelected}
      selectType={selectType}
      onSelect={onSelect}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onCancel={handleCancel}
      onDuplicate={handleDuplicate}
    />
  );
};

EditTableRow.displayName = "BI.EditTableRow";

export default EditTableRow;
