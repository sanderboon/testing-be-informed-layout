// @flow
import styled from "styled-components";

import { InputGroup } from "_component-registry/input";
import { StyledInput } from "_component-registry/elements";

export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +inError: boolean,
  +name: string,
  +placeholder?: string,
  +readOnly?: boolean,
  +rows?: number,
  +value: string,
  +onBlur?: (e: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  +onChange: (e: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  +onFocus?: (e: SyntheticInputEvent<HTMLTextAreaElement>) => void,
};

const DEFAULT_TEXTAREA_ROWS = 5;

const StyledTextarea = styled(StyledInput)`
  height: auto;
`;

/**
 * Render default textarea
 */
const TextareaInput = ({
  ariaLabel,
  ariaLabelledBy,
  className,
  disabled,
  id,
  inError,
  name,
  placeholder,
  readOnly,
  rows = DEFAULT_TEXTAREA_ROWS,
  value = "",
  onBlur,
  onChange,
  onFocus,
}: Props) => {
  let arLabelledBy = null;

  if (!ariaLabel) {
    arLabelledBy = ariaLabelledBy || `${id || name}-label`;
  }

  return (
    <InputGroup className={className}>
      <StyledTextarea
        as="textarea"
        id={id || name}
        className="form-control"
        name={name}
        rows={rows}
        aria-label={ariaLabel}
        aria-labelledby={arLabelledBy}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        inError={inError}
      />
    </InputGroup>
  );
};

TextareaInput.displayName = "BI.TextareaInput";

export default TextareaInput;
