// @flow
import { Component, createRef } from "react";
import { Manager, Popper, Reference } from "react-popper";

import styled from "styled-components";

import { MissingPropertyException } from "beinformed/exceptions";

import { ISO_DATE_FORMAT } from "beinformed/constants/Constants";

import { InputGroup, InputGroupAddon } from "_component-registry/input";
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

type State = {
  showDateTimePicker: boolean,
};

const StyledDatetimePicker = styled.div`
  position: absolute;
  z-index: 9999;
`;

/**
 * This is the old DateTimeInput attribute where Date and Input are entered using one input field.
 * @deprecated -- since 20.2
 */
class DatetimeInput extends Component<Props, State> {
  _clickOnPicker: boolean;
  _input: { current: null | typeof StyledInput };

  static defaultProps = {
    value: "",
    format: ISO_DATE_FORMAT,
    type: "text",
    readOnly: false,
    disabled: false,
  };

  state: State = {
    showDateTimePicker: false,
  };

  constructor(props: Props) {
    super(props);

    this._input = createRef();
    this._clickOnPicker = false;
  }

  componentWillUnmount(): void {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  handleDocumentClick = () => {
    if (this._clickOnPicker) {
      this._clickOnPicker = false;

      return;
    }

    this.setState({
      showDateTimePicker: false,
    });

    document.removeEventListener("click", this.handleDocumentClick);
  };

  /**
   * Display the datetimepicker
   */
  handleDatePickerButtonClick = (e: SyntheticEvent<*>) => {
    e.preventDefault();

    this.setState((prevState) => ({
      showDateTimePicker: !prevState.showDateTimePicker,
    }));

    document.addEventListener("click", this.handleDocumentClick, false);
  };

  /**
   * Process a date change and hide datetimepicker
   */
  handleDateSelect = (date: string) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(date);
    } else {
      throw new MissingPropertyException(
        "Cannot set date time value, because onValueChange property is missing"
      );
    }

    this.setState({
      showDateTimePicker: false,
    });

    document.removeEventListener("click", this.handleDocumentClick);

    setTimeout(() => {
      if (this._input.current) {
        this._input.current.focus();
      }
    });
  };

  handleClose = () => {
    this.setState({ showDateTimePicker: false });
  };

  get hasDate(): boolean {
    if (this.props.format) {
      return /[DMY]/gu.test(this.props.format);
    }

    return false;
  }

  get hasTime(): boolean {
    if (this.props.format) {
      return /[Hms]/gu.test(this.props.format);
    }

    return false;
  }

  datetimeButton(hasDatetimePicker: boolean) {
    if (hasDatetimePicker) {
      return (
        <Reference key="datetimePickerButtonRef">
          {({ ref }) => (
            <DatepickerButton
              ref={ref}
              isDate={this.hasDate}
              onClick={this.handleDatePickerButtonClick}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}
            />
          )}
        </Reference>
      );
    }

    return null;
  }

  renderAppendItems(hasDatetimePicker: boolean) {
    const { append } = this.props;
    const dtButton = this.datetimeButton(hasDatetimePicker);

    if (append && Array.isArray(append)) {
      return [...append, dtButton];
    } else if (append) {
      return [append, dtButton];
    }
    return dtButton;
  }

  render() {
    const {
      className,
      mindate,
      maxdate,
      inError,
      ariaLabel,
      ariaLabelledBy,
      readOnly,
      autoComplete,
      disabled,
      name,
      placeholder,
      type,
      children,
      onFocus,
      onChange,
      onBlur,
      onKeyDown,
      onKeyUp,
    } = this.props;

    const hasDatetimePicker =
      !this.props.readOnly && (this.hasDate || this.hasTime);

    const id = this.props.id || name;

    return (
      <Manager>
        <InputGroup className={className}>
          <StyledInput
            ref={this._input}
            id={id}
            className="form-control"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? null : ariaLabelledBy || `${id}-label`}
            aria-invalid={inError}
            readOnly={readOnly}
            autoComplete={autoComplete}
            disabled={disabled}
            name={name}
            placeholder={readOnly ? "" : placeholder}
            type={type}
            value={this.props.value}
            inError={inError}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            hasAppend
          />
          <InputGroupAddon isAppend>
            {this.renderAppendItems(hasDatetimePicker)}
          </InputGroupAddon>
          {children}
        </InputGroup>
        {hasDatetimePicker && this.state.showDateTimePicker && (
          <Popper
            placement="bottom-end"
            modifiers={[{ name: "offset", options: { offset: [0, 5] } }]}
          >
            {(props) => (
              <StyledDatetimePicker
                ref={props.ref}
                style={props.style}
                data-placement={props.placement}
              >
                <DatetimePicker
                  date={this.props.value}
                  mindate={mindate}
                  maxdate={maxdate}
                  format={this.props.format}
                  onClick={() => {
                    this._clickOnPicker = true;
                  }}
                  onSelect={(inputvalue) =>
                    this.handleDateSelect(inputvalue || "")
                  }
                  onClose={this.handleClose}
                />
              </StyledDatetimePicker>
            )}
          </Popper>
        )}
      </Manager>
    );
  }
}

DatetimeInput.displayName = "BI.DatetimeInputObsolete";

export default DatetimeInput;
