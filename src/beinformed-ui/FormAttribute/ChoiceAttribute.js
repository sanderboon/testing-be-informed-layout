// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { ChoiceInput } from "_component-registry/input";

import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

import type {
  ChoiceAttributeModel,
  ContentConfigurationElements,
} from "beinformed/models";
type ChoiceAttributeProps = {
  +optionContentConfiguration?: ContentConfigurationElements | null,
  +stacked?: boolean,
};

const ChoiceAttribute = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  optionContentConfiguration,
  stacked,
  formLayout,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: {
  ...Props<ChoiceAttributeModel>,
  ...ChoiceAttributeProps,
}) => (
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
    renderInput={({
      inError,
      handleBlur,
      handleChange,
      handleValueChange,
      handleFocus,
    }: InputProps) => (
      <ChoiceInput
        name={name}
        id={id}
        stacked={stacked}
        readOnly={attribute.readonly}
        placeholder={attribute.placeholder}
        inError={inError}
        label={attribute.label}
        type={attribute.choicetype}
        isMultiple={attribute.isMultiple}
        headers={attribute.options.headers}
        options={attribute.options.all}
        isTree={attribute.isTree}
        optionContentConfiguration={
          optionContentConfiguration || attribute.contentConfiguration
        }
        formLayout={formLayout}
        onBlur={handleBlur}
        onChange={handleChange}
        onValueChange={handleValueChange}
        onFocus={handleFocus}
      />
    )}
  />
);

ChoiceAttribute.displayName = "BI.ChoiceAttribute";

export default ChoiceAttribute;
