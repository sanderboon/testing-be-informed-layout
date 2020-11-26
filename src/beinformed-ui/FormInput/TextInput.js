// @flow
import { forwardRef, useRef, useEffect } from "react";
import { isFunction } from "lodash";

import mergeRefs from "beinformed/utils/react/mergeRefs";

import { StyledInput } from "_component-registry/elements";
import { InputGroup, InputGroupAddon } from "_component-registry/input";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +autoComplete?: "on" | "off" | "new-password",
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +inError?: boolean,
  +name: string,
  +placeholder?: string,
  +append?: Node | Function,
  +prepend?: Node | Function,
  +readOnly?: boolean,
  +type?: string,
  +value?: string,
  +autoFocus?: boolean,
  +children?: Node,
  +onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  +onKeyUp?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
};

/**
 * Render default text input
 */
const TextInput = forwardRef<Props, typeof StyledInput>(
  (
    {
      className,
      ariaLabel,
      ariaLabelledBy,
      autoComplete,
      disabled = false,
      id,
      inError,
      name,
      placeholder,
      append,
      prepend,
      readOnly = false,
      type = "text",
      value = "",
      autoFocus,
      children,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp,
    }: Props,
    ref
  ) => {
    const localRef = useRef();

    useEffect(() => {
      if (autoFocus && localRef.current) {
        localRef.current.focus();
      }
    }, [autoFocus]);

    const inputId = id || name;

    return (
      <InputGroup className={className}>
        {prepend && (
          <InputGroupAddon isPrepend>
            {isFunction(prepend) ? prepend() : prepend}
          </InputGroupAddon>
        )}
        <StyledInput
          ref={mergeRefs([localRef, ref])}
          id={inputId}
          className="form-control"
          aria-label={ariaLabel}
          aria-labelledby={
            ariaLabel ? null : ariaLabelledBy || `${inputId}-label`
          }
          aria-invalid={inError}
          readOnly={readOnly}
          autoComplete={autoComplete}
          disabled={disabled}
          name={name}
          placeholder={readOnly ? "" : placeholder}
          type={type}
          value={value}
          inError={inError}
          hasPrepend={Boolean(prepend)}
          hasAppend={Boolean(append)}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
        {append && (
          <InputGroupAddon isAppend>
            {isFunction(append) ? append() : append}
          </InputGroupAddon>
        )}
        {children}
      </InputGroup>
    );
  }
);

TextInput.displayName = "BI.TextInput";

export default TextInput;
