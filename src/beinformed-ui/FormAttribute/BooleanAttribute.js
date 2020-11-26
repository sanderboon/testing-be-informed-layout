// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { BooleanInput } from "_component-registry/input";

import { isCompactRendering } from "beinformed-ui/FormAttribute/_util";

import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";
import type {
  BooleanAttributeModel,
  ContentConfigurationElements,
} from "beinformed/models";
type BooleanAttributeProps = {
  +optionContentConfiguration?: ContentConfigurationElements | null,
};

const BooleanAttribute = ({
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
  ...Props<BooleanAttributeModel>,
  ...BooleanAttributeProps,
}) => {
  const layout = isCompactRendering(attribute) ? "compact" : formLayout;

  return (
    <BaseAttribute
      className={className}
      attribute={attribute}
      name={name}
      id={id}
      questionContentConfiguration={questionContentConfiguration}
      formLayout={layout}
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
        <BooleanInput
          name={name}
          id={id}
          readOnly={attribute.readonly}
          inError={inError}
          label={attribute.label}
          type={attribute.choicetype}
          options={attribute.options.all}
          optionContentConfiguration={
            optionContentConfiguration || attribute.contentConfiguration
          }
          formLayout={layout}
          onBlur={handleBlur}
          onChange={handleChange}
          onValueChange={handleValueChange}
          onFocus={handleFocus}
        />
      )}
    />
  );
};

BooleanAttribute.displayName = "BI.BooleanAttribute";

export default BooleanAttribute;
