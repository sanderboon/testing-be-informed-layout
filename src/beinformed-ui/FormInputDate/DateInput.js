// @flow
import { useRef, useState, useEffect } from "react";

import { usePopper } from "react-popper";

import styled from "styled-components";
import { InputGroup, InputGroupAddon } from "_component-registry/input";

import { MissingPropertyException } from "beinformed/exceptions";

import { ISO_DATE_FORMAT } from "beinformed/constants/Constants";

import {
  DatetimePicker,
  DatepickerButton,
} from "_component-registry/datetimepicker";

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
  +maxdate?: string | null,
  +mindate?: string | null,
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

const useEffectDocumentClick = (showDatePicker, setShowDateTimePicker) => {
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

      setShowDateTimePicker(false);
    };

    if (showDatePicker) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      _clickOnPicker.current = false;
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showDatePicker, setShowDateTimePicker]);

  return setClickOnPicker;
};

const StyledPopper = styled.div`
  position: absolute;
  z-index: 9999;
`;

const DateInput = ({
  append,
  ariaLabel,
  ariaLabelledBy,
  autoComplete,
  children,
  className,
  disabled = false,
  format = ISO_DATE_FORMAT,
  id,
  inError,
  maxdate,
  mindate,
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
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // hook to add/remove document click event listeners
  const handleClickOnPicker = useEffectDocumentClick(
    showDateTimePicker,
    setShowDateTimePicker
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
    setShowDateTimePicker((visible) => !visible);
  };

  const datetimeButton = (hasDatetimePicker: boolean) => {
    if (hasDatetimePicker) {
      // reference element is the ref used for popper
      return (
        <DatepickerButton
          key="datetimePickerButtonRef"
          ref={setReferenceElement}
          isDate
          onClick={handleDatePickerButtonClick}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
    }

    return null;
  };

  const renderAppendItems = (hasDatetimePicker: boolean) => {
    const dtButton = datetimeButton(hasDatetimePicker);

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

    setShowDateTimePicker(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  };

  const handleClose = () => {
    setShowDateTimePicker(false);
  };

  const hasDatetimePicker = !readOnly;
  const idValue = id || name;

  return (
    <>
      <InputGroup className={className}>
        <StyledInput
          ref={inputRef}
          id={`date-input-${idValue}`}
          className="form-control"
          aria-label={ariaLabel}
          aria-labelledby={
            ariaLabel ? null : ariaLabelledBy || `${idValue}-label`
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
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          hasAppend={Boolean(append) || hasDatetimePicker}
        />
        <InputGroupAddon isAppend>
          {renderAppendItems(hasDatetimePicker)}
        </InputGroupAddon>
        {children}
      </InputGroup>
      {hasDatetimePicker && showDateTimePicker && (
        //$FlowFixMe
        <StyledPopper
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <DatetimePicker
            date={value}
            mindate={mindate}
            maxdate={maxdate}
            format={format}
            onClick={handleClickOnPicker}
            onSelect={handleDateSelect}
            onClose={handleClose}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </StyledPopper>
      )}
    </>
  );
};

DateInput.displayName = "BI.DateInput";

export default DateInput;
