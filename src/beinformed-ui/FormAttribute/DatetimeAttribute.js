// @flow
import { BaseAttribute } from "_component-registry/attributes";
import { DatetimeInput } from "_component-registry/input";

import type { DatetimeAttributeModel } from "beinformed/models";
import type {
  Props,
  InputProps,
} from "beinformed-ui/FormAttribute/BaseAttribute";

const DatetimeAttribute = ({
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
}: Props<DatetimeAttributeModel>) => {
  const placeholder =
    attribute.placeholder === ""
      ? attribute.formatLabel
      : attribute.placeholder;

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
        handleValueChange,
        handleChange,
        handleFocus,
      }: InputProps) => (
        <DatetimeInput
          name={name}
          id={id}
          value={value}
          readOnly={attribute.readonly}
          placeholder={placeholder}
          inError={inError}
          mindate={attribute.mindate}
          maxdate={attribute.maxdate}
          dateInputValue={attribute.dateInputValue}
          timeInputValue={attribute.timeInputValue}
          timeInputFormat={attribute.timeInputFormat}
          dateInputFormat={attribute.dateInputFormat}
          format={attribute.inputFormat}
          onBlur={handleBlur}
          onChange={handleChange}
          onValueChange={handleValueChange}
          onFocus={handleFocus}
        />
      )}
    />
  );
};

DatetimeAttribute.displayName = "BI.DatetimeAttribute";

export default DatetimeAttribute;
