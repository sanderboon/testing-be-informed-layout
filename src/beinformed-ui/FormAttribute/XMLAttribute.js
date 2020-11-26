// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { TextareaInput } from "_component-registry/input";

import type { XMLAttributeModel } from "beinformed/models";
import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

const XMLAttribute = ({
  className,
  attribute,
  name,
  id,
  questionContentConfiguration,
  formLayout,
  onChange,
  onClick,
  onBlur,
  onFocus,
}: Props<XMLAttributeModel>) => {
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
      renderInput={({
        value,
        inError,
        handleBlur,
        handleChange,
        handleFocus,
      }: InputProps) => (
        <TextareaInput
          className={className}
          id={id}
          name={name}
          value={value}
          placeholder={attribute.placeholder}
          inError={inError}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      )}
    />
  );
};

XMLAttribute.displayName = "BI.XMLAttribute";

export default XMLAttribute;
