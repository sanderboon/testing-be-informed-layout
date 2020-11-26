// @flow
import { Component } from "react";

import styled, { css } from "styled-components";
import { themeProp, roundedCorners, spacers } from "beinformed/theme/utils";

export type Props = {
  +id?: string,
  +name: string,
  +placeholder?: string,
  +ariaLabel?: string,
  +ariaLabelledBy?: string,
  +isMultiple: boolean,
  +isReadonly?: boolean,
  +isDisabled?: boolean,
  +inError?: boolean,
  +accept: Array<string>,
  +onUpload: Function,
  +onBlur: Function,
  +onFocus: Function,
};

type State = {
  isActiveDrag: boolean,
};

const StyledUpload = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  margin-bottom: 0;
`;

const StyledHiddenInput = styled.input`
  position: relative;
  z-index: 2;
  width: 100%;
  height: calc(2.25rem + 2px);
  margin: 0;
  opacity: 0;
  cursor: pointer;

  &:focus ~ label {
    color: ${themeProp("INPUT_FOCUS_BORDER_COLOR", "#495057")};
    background-color: #fff;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    z-index: 3;
  }
`;

const StyledInput = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: calc(2.25rem + 2px);
  padding: ${themeProp("INPUT_PADDING", ".375rem .75rem")};
  font-size: ${themeProp("INPUT_FONT_SIZE", "1rem")};
  font-weight: ${themeProp("INPUT_FONT_WEIGHT", "400")};
  line-height: ${themeProp("INPUT_LINE_HEIGHT", 1.5)};
  color: ${themeProp("INPUT_PLACEHOLDER_COLOR", "#6c757d")};
  background-color: #fff;
  border: 1px solid ${themeProp("INPUT_BORDER_COLOR", "ced4da")};
  ${(props) =>
    props.isActiveDrag &&
    css`
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    `};

  ${roundedCorners()};
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: block;
    height: 2.25rem;
    padding: ${spacers(0.375, 0.75)};

    background-color: ${themeProp("INPUT_ADDON_BG")};
    color: ${themeProp("INPUT_ADDON_COLOR")};
    font-size: ${themeProp("INPUT_ADDON_FONT_SIZE")};
    line-height: 1.5rem;

    content: "Browse";
    border-left: inherit;

    ${roundedCorners("top-right")};
    ${roundedCorners("bottom-right")};
  }

  ${({ inError }) =>
    inError &&
    css`
      border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
      padding-right: 2.25rem;
      background-repeat: no-repeat;
      background-position: center right calc(2.25rem / 4);
      background-size: calc(2.25rem / 2) calc(2.25rem / 2);
      background-image: url(${themeProp("INPUT_ERROR_SVG")});

      &:focus {
        border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
      }
    `}
`;

class UploadField extends Component<Props, State> {
  state: State = {
    isActiveDrag: false,
  };

  handleFileDrop = (e: SyntheticDragEvent<HTMLDivElement>) => {
    e.preventDefault();

    this.setState({
      isActiveDrag: false,
    });

    this.props.onUpload(e.dataTransfer.files);
  };

  handleDragOver = (e: SyntheticDragEvent<HTMLDivElement>) => {
    e.preventDefault();

    this.setState({
      isActiveDrag: true,
    });
  };

  handleDragLeave = () => {
    this.setState({
      isActiveDrag: false,
    });
  };

  handleChange = (e: SyntheticInputEvent<HTMLDivElement>) => {
    this.props.onUpload(e.target.files);
  };

  render() {
    const {
      id,
      name,
      placeholder,
      ariaLabel,
      ariaLabelledBy,
      isMultiple,
      isReadonly,
      isDisabled,
      accept,
      inError,
      onBlur,
      onFocus,
    } = this.props;

    const inputId = id || name;
    const inputAriaLabelledBy = ariaLabel
      ? null
      : ariaLabelledBy || `${inputId}-label`;

    return (
      <StyledUpload
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleFileDrop}
      >
        <StyledHiddenInput
          type="file"
          id={inputId}
          name={name}
          placeholder={placeholder}
          multiple={isMultiple}
          readOnly={isReadonly}
          aria-label={ariaLabel}
          aria-labelledby={inputAriaLabelledBy}
          aria-hidden="true"
          disabled={isDisabled}
          accept={accept}
          onChange={this.handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <StyledInput
          className="form-control"
          htmlFor={inputId}
          isActiveDrag={this.state.isActiveDrag}
          inError={inError}
        >
          {placeholder}
        </StyledInput>
      </StyledUpload>
    );
  }
}

UploadField.displayName = "BI.UploadField";

export default UploadField;
