// @flow
import { Fragment, useState } from "react";

import { PasswordAttributeStandard } from "_component-registry/attributes";
import { useMessage } from "beinformed/i18n";

import type { Props } from "beinformed-ui/FormAttribute/BaseAttribute";
import type { AttributeType, PasswordAttributeModel } from "beinformed/models";
type PasswordAttributeProps = { +enableSuggestions?: boolean };

const createConfirmAttribute = (originalAttribute, confirmLabel) => {
  const confirmAttribute = originalAttribute.clone(true);

  confirmAttribute.isConfirmPassword = true;
  confirmAttribute.label = confirmLabel;
  confirmAttribute.otherLabel = originalAttribute.label;

  return confirmAttribute;
};

const PasswordAttributeWithConfirm = ({
  className,
  attribute,
  questionContentConfiguration,
  id,
  enableSuggestions,
  name,
  formLayout,
  onChange,
  onBlur,
  onFocus,
}: {
  ...Props<PasswordAttributeModel>,
  ...PasswordAttributeProps,
}) => {
  const confirmLabel = useMessage(
    "Password.Confirm.Label",
    `Confirm ${attribute.label.toLowerCase()}`,
    {
      label: attribute.label.toLowerCase(),
    }
  );

  const [confirmAttribute, setConfirmAttribute] = useState(
    createConfirmAttribute(attribute, confirmLabel)
  );

  const handleChange = (changedAttribute: AttributeType, value: any) => {
    if (!onChange) {
      throw new Error(
        "Missing onChange property on password confirm attribute"
      );
    }

    attribute.otherLabel = confirmAttribute.label;

    if (changedAttribute.isConfirmPassword) {
      attribute.confirmValue = value;
      confirmAttribute.update(value);

      onChange(attribute, attribute.inputvalue);
    } else {
      confirmAttribute.confirmValue = value;
      onChange(changedAttribute, value);
    }

    setConfirmAttribute(confirmAttribute);
  };

  return (
    <Fragment>
      <PasswordAttributeStandard
        className={className}
        attribute={attribute}
        id={id}
        name={name}
        questionContentConfiguration={questionContentConfiguration}
        formLayout={formLayout}
        enableSuggestions={enableSuggestions}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <PasswordAttributeStandard
        className={className}
        attribute={confirmAttribute}
        id={`confirm_${attribute.key}`}
        name={`confirm_${attribute.key}`}
        questionContentConfiguration={questionContentConfiguration}
        formLayout={formLayout}
        enableSuggestions={false}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </Fragment>
  );
};

PasswordAttributeWithConfirm.displayName = "BI.PasswordAttributeWithConfirm";

export default PasswordAttributeWithConfirm;
