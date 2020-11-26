// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { LookupInput } from "_component-registry/lookup";

import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

import type {
  ChoiceAttributeModel,
  ContentConfigurationElements,
} from "beinformed/models";
type LookupAttributeProps = {
  +optionContentConfiguration?: ContentConfigurationElements | null,
};

const LookupAttribute = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  optionContentConfiguration,
  formLayout,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: {
  ...Props<ChoiceAttributeModel>,
  ...LookupAttributeProps,
}) => {
  const lookupList = {
    link: attribute.lookupListLink,
    label: attribute.lookupListLabel,
    isTable: attribute.choicetype === "table",
  };
  return (
    <BaseAttribute
      className={className}
      attribute={attribute}
      name={name}
      id={id}
      questionContentConfiguration={questionContentConfiguration}
      formLayout={formLayout}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      renderInput={({ handleValueChange }: InputProps) => (
        <LookupInput
          name={name}
          isMultiple={attribute.isMultiple}
          lookupLink={attribute.lookupLink}
          lookupList={lookupList}
          optionContentConfiguration={optionContentConfiguration}
          options={attribute.options}
          readOnly={attribute.readonly}
          onValueChange={handleValueChange}
        />
      )}
    />
  );
};

LookupAttribute.displayName = "BI.LookupAttribute";

export default LookupAttribute;
