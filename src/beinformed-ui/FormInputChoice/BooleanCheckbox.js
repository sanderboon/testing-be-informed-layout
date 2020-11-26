// @flow
import styled from "styled-components";

import { CheckboxInput } from "_component-registry/input";

import type { ChoiceAttributeOptionModel } from "beinformed/models";
export type Props = {
  +className?: string,
  +id?: string,
  +name: string,
  +label?: any,
  +options: Array<ChoiceAttributeOptionModel>,
  +disabled?: boolean,
  +readOnly?: boolean,
  +inError?: boolean,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
  +onValueChange: (value: string) => void,
  +onFocus?: (e: SyntheticInputEvent<*>) => void,
};

const StyledCheckboxInput = styled(CheckboxInput)`
  font-weight: 600;
`;

const BooleanCheckbox = ({
  className,
  id,
  name,
  label,
  options,
  disabled,
  readOnly,
  inError,
  onBlur,
  onValueChange,
  onFocus,
}: Props) => {
  const handleValueChange = (e) => {
    const currentValue = e.target.value;
    const newValue = currentValue === "true" ? "false" : "true";

    onValueChange(newValue);
  };

  const selectedOption = options.find((option) => option.selected);

  if (!selectedOption) {
    return null;
  }

  return (
    <div className={className} aria-label={label}>
      <StyledCheckboxInput
        className={className}
        disabled={disabled}
        id={id}
        label={label}
        name={name}
        readOnly={readOnly}
        inError={inError}
        onBlur={onBlur}
        onFocus={onFocus}
        isChecked={selectedOption.code === "true"}
        value={selectedOption.code}
        onChange={handleValueChange}
      />
    </div>
  );
};

BooleanCheckbox.displayName = "BI.BooleanCheckbox";

export default BooleanCheckbox;
