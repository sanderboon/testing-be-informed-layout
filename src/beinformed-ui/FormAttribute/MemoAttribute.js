// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { WysiwygInput, TextareaInput } from "_component-registry/input";

import type { MemoAttributeModel } from "beinformed/models";
import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

const MemoAttribute = ({
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
}: Props<MemoAttributeModel>) => {
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
        handleValueChange,
        handleFocus,
      }: InputProps) =>
        attribute.formatted ? (
          <WysiwygInput
            className={className}
            id={id}
            name={name}
            rows={attribute.rows}
            value={value}
            onValueChange={handleValueChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        ) : (
          <TextareaInput
            className={className}
            id={id}
            name={name}
            rows={attribute.rows}
            value={value}
            placeholder={attribute.placeholder}
            inError={inError}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        )
      }
    />
  );
};

MemoAttribute.displayName = "BI.MemoAttribute";

export default MemoAttribute;
