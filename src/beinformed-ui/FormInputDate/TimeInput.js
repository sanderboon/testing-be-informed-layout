// @flow
import { useRef, useState, useEffect } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

import { MissingPropertyException } from "beinformed/exceptions";

import { ISO_TIME_FORMAT } from "beinformed/constants/Constants";

import { InputGroup, InputGroupAddon } from "_component-registry/input";

import {
  DatetimePicker,
  DatepickerButton,
} from "_component-registry/datetimepicker";

import { TimePicker } from "_component-registry/timepicker";
import { StyledInput } from "_component-registry/elements";

import type { Node } from "react";
export type Props = {
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +autoComplete?: "on" | "off" | "new-password",
  +type: string,
  +children?: Node,
  +className?: string,
  +disabled?: boolean,
  +format: string,
  +id?: string,
  +inError?: boolean,
  +name: string,
  +placeholder?: string,
  +readOnly?: boolean,
  +value: string,
  +append?: any,
  +onValueChange: (value: any) => void,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
  +onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  +onFocus?: (e: SyntheticInputEvent<*>) => void,
  +onKeyDown?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  +onKeyUp?: (e: SyntheticKeyboardEvent<HTMLInputElement>) => void,
};

const useEffectDocumentClick = (showTimePicker, setShowTimePicker) => {
  const _clickOnPicker = useRef(false);

  // user clicks on the picker
  const setClickOnPicker = () => {
    _clickOnPicker.current = true;
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      if (_clickOnPicker.current) {
        _clickOnPicker.current = false;
        return;
      }
      setShowTimePicker(false);
    };

    if (showTimePicker) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      _clickOnPicker.current = false;
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showTimePicker, setShowTimePicker]);

  return setClickOnPicker;
};

const StyledPopper = styled.div`
  position: absolute;
  z-index: 9999;
`;

const TimeInput = ({
  append,
  ariaLabel,
  ariaLabelledBy,
  autoComplete,
  children,
  className,
  disabled = false,
  format = ISO_TIME_FORMAT,
  id,
  inError,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onKeyUp,
  onValueChange,
  placeholder,
  readOnly = false,
  type = "text",
  value = "",
}: Props) => {
  const inputRef = useRef();

  // flag to determine if datetime picker should be visible
  const [showTimePicker, setShowTimePicker] = useState(false);

  // hook to add/remove document click event listeners
  const handleClickOnPicker = useEffectDocumentClick(
    showTimePicker,
    setShowTimePicker
  );

  // popper element state
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  // popper styles and attributes
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
  });

  /**
   * Display the datetimepicker
   */
  const handleDatePickerButtonClick = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    setShowTimePicker((visible) => !visible);
  };

  const datePickerButton = (hasDatetimePicker: boolean) =>
    hasDatetimePicker ? (
      <DatepickerButton
        ref={setReferenceElement}
        isDate={false}
        onClick={handleDatePickerButtonClick}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    ) : null;

  const renderAppendItems = (hasDatetimePicker: boolean) => {
    const dtButton = datePickerButton(hasDatetimePicker);

    if (append && Array.isArray(append)) {
      return [...append, dtButton];
    } else if (append) {
      return [append, dtButton];
    }

    return dtButton;
  };

  const handleDateSelect = (date: string = "") => {
    if (onValueChange) {
      onValueChange(date);
    } else {
      throw new MissingPropertyException(
        "Cannot set date time value, because onValueChange property is missing"
      );
    }

    setShowTimePicker(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  };

  const handleClose = () => {
    setShowTimePicker(false);
  };

  const hasDatetimePicker = !readOnly;
  const hasOnlyHoursAndMinutes = format === "HH:mm";
  const renderTimePickerComponent = hasOnlyHoursAndMinutes && !readOnly;
  const hasAppend =
    Boolean(append) || hasOnlyHoursAndMinutes || hasDatetimePicker;

  const idValue = id || name;

  const input = (
    <StyledInput
      ref={inputRef}
      id={`time-input-${idValue}`}
      className="form-control"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? null : ariaLabelledBy || `${idValue}-label`}
      aria-invalid={inError}
      readOnly={readOnly}
      autoComplete={autoComplete}
      disabled={disabled}
      name={name}
      placeholder={readOnly ? "" : placeholder}
      type={type}
      value={value}
      inError={inError}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      hasAppend={hasAppend}
    />
  );

  if (renderTimePickerComponent) {
    return (
      <TimePicker
        className={className}
        format={format}
        name={name}
        inError={inError}
        onSelect={handleDateSelect}
        onClose={handleClose}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {input}
      </TimePicker>
    );
  }

  return (
    <>
      <InputGroup className={className}>
        {input}
        {hasAppend && (
          <InputGroupAddon isAppend>
            {renderAppendItems(hasDatetimePicker)}
          </InputGroupAddon>
        )}
        {children}
      </InputGroup>
      {hasDatetimePicker && showTimePicker && (
        //$FlowFixMe
        <StyledPopper
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <DatetimePicker
            date={value}
            format={format}
            onClick={handleClickOnPicker}
            onSelect={handleDateSelect}
            onClose={handleClose}
            onFocus={onFocus}
          />
        </StyledPopper>
      )}
    </>
  );
};

TimeInput.displayName = "BI.TimeInput";

export default TimeInput;
