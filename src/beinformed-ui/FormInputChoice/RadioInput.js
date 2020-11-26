// @flow
import { RadioCheckboxInput } from "_component-registry/input";

import type { Props } from "./RadioCheckboxInput";

const RadioInput = ({
  children,
  className,
  count,
  disabled,
  id,
  isChecked,
  stacked,
  label,
  name,
  readOnly,
  value = "",
  inError,
  onBlur,
  onChange,
  onFocus,
}: Props) => (
  <RadioCheckboxInput
    choicetype="radio"
    className={className}
    count={count}
    disabled={disabled}
    id={id}
    isChecked={isChecked}
    stacked={stacked}
    label={label}
    name={name}
    readOnly={readOnly}
    value={value}
    inError={inError}
    onBlur={onBlur}
    onChange={onChange}
    onFocus={onFocus}
  >
    {children}
  </RadioCheckboxInput>
);

RadioInput.displayName = "BI.RadioInput";

export default RadioInput;
