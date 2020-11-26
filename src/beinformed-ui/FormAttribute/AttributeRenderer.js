// @flow
import {
  BooleanAttribute,
  CaptchaAttribute,
  ChoiceAttribute,
  CompositeAttribute,
  DatetimeAttribute,
  LabelAttribute,
  HelptextAttribute,
  LookupAttribute,
  MemoAttribute,
  MoneyAttribute,
  NumberAttribute,
  PasswordAttribute,
  RangeAttribute,
  StringAttribute,
  UploadAttribute,
  XMLAttribute,
} from "_component-registry/attributes";

import type { FormLayoutType } from "beinformed/constants";
import type {
  AttributeType,
  ContentConfigurationElements,
} from "beinformed/models";
export type Props = {
  +className?: string,
  +id: string,
  +name: string,
  +attribute: AttributeType,
  +formLayout?: FormLayoutType,
  +questionContentConfiguration?: ?ContentConfigurationElements,
  +optionContentConfiguration?: ?ContentConfigurationElements,
  +onClick?: (attribute: AttributeType, value: string) => void,
  +onBlur?: (attribute: AttributeType, value: string) => void,
  +onChange?: (attribute: AttributeType, value: string) => void,
  +onFocus?: (attribute: AttributeType, value: string) => void,
};

/**
 * Render correct Form Group
 */
const AttributeRenderer = ({
  className,
  id,
  name,
  attribute,
  formLayout,
  questionContentConfiguration,
  optionContentConfiguration,
  onClick,
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  const attributeMap = {
    lookup: LookupAttribute,
    boolean: BooleanAttribute,
    choice: ChoiceAttribute,
    date: DatetimeAttribute,
    time: DatetimeAttribute,
    timestamp: DatetimeAttribute,
    datetime: DatetimeAttribute,
    composite: CompositeAttribute,
    range: RangeAttribute,
    helptext: HelptextAttribute,
    label: LabelAttribute,
    memo: MemoAttribute,
    money: MoneyAttribute,
    number: NumberAttribute,
    password: PasswordAttribute,
    upload: UploadAttribute,
    xml: XMLAttribute,
    captcha: CaptchaAttribute,
    string: StringAttribute,
  };

  const { type } = attribute;
  if (!(type in attributeMap)) {
    throw new Error(
      `Cannot map attribute type: ${type} on an attribute widget`
    );
  }

  const Attribute = attributeMap[type];

  return (
    <Attribute
      className={className}
      id={id}
      attribute={attribute}
      name={name || attribute.name}
      formLayout={formLayout}
      questionContentConfiguration={questionContentConfiguration}
      optionContentConfiguration={optionContentConfiguration}
      onClick={onClick}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

AttributeRenderer.displayName = "BI.AttributeRenderer";

export default AttributeRenderer;
