// @flow
import classNames from "classnames";

import { BaseAttribute } from "_component-registry/attributes";
import { TextInput } from "_component-registry/input";
import {
  getAppendValue,
  getPrependValue,
} from "beinformed-ui/FormAttribute/_util";

import { StringAttributeModel } from "beinformed/models";
import type {
  NumberAttributeModel,
  MoneyAttributeModel,
  AttributeType,
} from "beinformed/models";
import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

type StringAttributeProps = { +autoFocus?: boolean };

const StringAttribute = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  formLayout,
  autoFocus,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: {
  ...Props<StringAttributeModel | NumberAttributeModel | MoneyAttributeModel>,
  ...StringAttributeProps,
}) => {
  const prepend = getPrependValue(attribute);
  const append = getAppendValue(attribute);

  const handleAttributeBlur = (
    blurAttribute: AttributeType,
    blurValue: string
  ) => {
    if (onChange && blurAttribute.isValid && blurAttribute.formatValue) {
      onChange(
        blurAttribute,
        blurAttribute.formatValue(blurAttribute.inputvalue)
      );
    }

    if (onBlur) {
      onBlur(blurAttribute, blurValue);
    }
  };

  let cssClass = className;
  if (attribute instanceof StringAttributeModel) {
    cssClass = classNames(className, {
      bsnwidget: attribute.isBSN(),
      emailwidget: attribute.isEmail(),
      ibanwidget: attribute.isIBAN(),
      zipcodewidget: attribute.isZipcode(),
    });
  }

  return (
    <BaseAttribute
      className={cssClass}
      attribute={attribute}
      name={name}
      id={id}
      questionContentConfiguration={questionContentConfiguration}
      formLayout={formLayout}
      onChange={onChange}
      onClick={onClick}
      onBlur={handleAttributeBlur}
      onFocus={onFocus}
      renderInput={({
        value,
        inError,
        handleBlur,
        handleChange,
        handleFocus,
      }: InputProps) => (
        <TextInput
          name={name}
          id={id}
          value={value}
          prepend={prepend}
          append={append}
          readOnly={attribute.readonly}
          placeholder={attribute.placeholder}
          inError={inError}
          autoFocus={autoFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      )}
    />
  );
};

StringAttribute.displayName = "BI.StringAttribute";

export default StringAttribute;
