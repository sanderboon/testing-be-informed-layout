// @flow
import { useRef, useState } from "react";

import classNames from "classnames";

import {
  AddAttributeSetForm,
  EnteredObjectTable,
  AddButton,
} from "_component-registry/attributeset";

import type { Node } from "react";
import type { FormModel, FormObjectModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +form: FormModel,
  +object: FormObjectModel,
  +children?: Node,
  +onSave?: () => void,
  +onCancel?: (formObject?: FormObjectModel) => void,
  +onRemove?: (formObject?: FormObjectModel) => void,
};

const FormAttributSetRepeatable = ({
  className,
  children,
  form,
  object,
  onSave,
  onCancel,
  onRemove,
}: Props) => {
  const _form = useRef(null);

  const enteredObjects = form.allObjects.filter(
    (formObject) =>
      formObject.equals(object, false) && !formObject.equals(object)
  );

  const [showAddForm, setShowAddForm] = useState(enteredObjects.length === 0);

  const handleRemove = (repeatObject: FormObjectModel) =>
    onRemove && onRemove(repeatObject);

  const handleCancel = () => {
    if (onCancel) {
      onCancel(object);
    }

    setShowAddForm(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }

    setShowAddForm(false);
  };

  const handleToggleAddForm = () => {
    setShowAddForm(true);

    const SCROLL_TIMEOUT = 100;
    setTimeout(() => {
      if (_form.current) {
        _form.current.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }, SCROLL_TIMEOUT);
  };

  return (
    <div className={classNames("repeating-attributeset", className)}>
      {showAddForm ? (
        <AddAttributeSetForm
          ref={_form}
          form={form}
          object={object}
          onSave={handleSave}
          onCancel={handleCancel}
        >
          {children}
        </AddAttributeSetForm>
      ) : (
        <>
          <EnteredObjectTable
            objects={enteredObjects}
            objectLabel={object.label}
            onRemove={handleRemove}
          />
          <AddButton onClick={handleToggleAddForm} />
        </>
      )}
    </div>
  );
};
FormAttributSetRepeatable.displayName = "BI.FormAttributSetRepeatable";

export default FormAttributSetRepeatable;
