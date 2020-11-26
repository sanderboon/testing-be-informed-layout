// @flow
import classNames from "classnames";

import { ChoiceOptionLabel } from "_component-registry/input";

import styled, { css } from "styled-components";
import {
  themeProp,
  spacer,
  lightenColor,
  getThemeProp,
} from "beinformed/theme/utils";

import type { Node } from "react";
import type { ChoiceAttributeOptionModel } from "beinformed/models";
export type Props = {
  +children?: Node,
  +className?: string,
  +disabled?: boolean,
  +id?: string,
  +inError?: boolean,
  +label?: Function | string,
  +formLayout?: ?string,
  +name: string,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
  +onFocus?: (e: SyntheticInputEvent<*>) => void,
  +onValueChange: (value: any) => void,
  +options: Array<ChoiceAttributeOptionModel>,
  +readOnly?: boolean,
};

const toggleOffImage =
  "data:image/svg+xml,%3Csvg width='42' height='24' viewBox='0 0 42 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect fill='%23BBB' width='42' height='24' rx='12'/%3E%3Ccircle fill='%23FFF' cx='12' cy='12' r='9'/%3E%3C/g%3E%3C/svg%3E";

const toggleOnImage =
  "data:image/svg+xml,%3Csvg width='42' height='24' viewBox='0 0 42 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect fill='currentColor' width='42' height='24' rx='12'/%3E%3Ccircle fill='%23FFF' cx='30' cy='12' r='9'/%3E%3C/g%3E%3C/svg%3E";

const StyledWrapper = styled.div`
  position: relative;
  display: block;
  min-height: ${spacer(1.5)};
`;

const StyledHiddenInput = styled.input.attrs({
  type: "checkbox",
})`
  position: absolute;
  opacity: 0;
  z-index: -1;
  width: 0;
  height: 0;
`;

const StyledLabel = styled.label`
  position: relative;
  margin-bottom: 0;
  vertical-align: top;
  padding-left: calc(32px + ${spacer()});
  font-weight: ${themeProp("FONT_WEIGHT_BOLD")};

  ${({ inError }) =>
    inError &&
    css`
      color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
    `}

  &::before {
    position: absolute;
    top: 3px;
    left: 0;
    display: block;
    width: 32px;
    height: 18px;
    content: "";
    border-radius: 14px;

    ${({ inError }) =>
      inError &&
      css`
        border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
      `}
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 2rem;
    height: 1.5rem;
    content: "";
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  ${/* sc-selector */ StyledHiddenInput}:disabled ~ &::after {
    opacity: 0.35;
  }

  ${/* sc-selector */ StyledHiddenInput}:focus ~ &::before {
    box-shadow: ${themeProp("FOCUS_OUTLINE")};
    background-color: rgba(0, 125, 250, 0.4);
  }

  ${/* sc-selector */ StyledHiddenInput}:focus:not(:checked) ~ &::before {
    border-color: ${({ inError }) =>
      inError
        ? themeProp("INPUT_ERROR_COLOR", "#dc3545")
        : themeProp("INPUT_FOCUS_BORDER_COLOR", "#80bdff")};
  }

  ${/* sc-selector */ StyledHiddenInput}:not(:disabled):active ~ &::before {
    color: #fff;
    background-color: ${lightenColor(0.35, "CHOICE_ACTIVE_COLOR", "#007bff")};
    border-color: ${lightenColor(0.35, "CHOICE_ACTIVE_COLOR", "#007bff")};
  }

  ${/* sc-selector */ StyledHiddenInput}:disabled ~ & {
    color: ${themeProp("INPUT_DISABLED_BG", "#e9ecef")};
  }

  ${/* sc-selector */ StyledHiddenInput}:checked ~ &::after {
    ${({ theme }) => {
      const primaryColor: string = getThemeProp(
        theme,
        "PRIMARY_COLOR",
        "#007bff"
      );

      // replace pre-defined color in SVG to the primary color in the theme (without #)
      const toggle = toggleOnImage.replace(
        "fill='currentColor'",
        `fill='${escape(primaryColor)}'`
      );

      return `background-image: url("${toggle}");
      `;
    }}
  }

  ${/* sc-selector */ StyledHiddenInput}:not(:checked) ~ &::after {
    background-image: url("${toggleOffImage}");
  }
`;

const ToggleInput = ({
  className,
  children,
  id,
  inError,
  name,
  label,
  disabled,
  readOnly,
  formLayout,
  options,
  onValueChange,
  onBlur,
  onFocus,
}: Props) => {
  const handleChange = (e) => {
    const currentValue = e.target.value;
    const newValue = currentValue === "true" ? "false" : "true";

    onValueChange(newValue);
  };

  const selectedOption = options.find((o) => o.selected);
  if (!selectedOption) {
    return null;
  }

  const value = selectedOption.code;

  return (
    <StyledWrapper
      className={classNames("toggleswitch-input", className)}
      data-value={value}
    >
      <StyledHiddenInput
        checked={selectedOption.code === "true"}
        disabled={disabled || readOnly}
        id={`${id || name}-${value}`}
        name={name}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        value={selectedOption.code}
      />
      <StyledLabel
        inError={inError}
        htmlFor={`${id || name}-${value}`}
        data-value={value}
      >
        {formLayout === "compact" ? (
          label
        ) : (
          <ChoiceOptionLabel option={selectedOption} />
        )}
      </StyledLabel>
      {children}
    </StyledWrapper>
  );
};

ToggleInput.displayName = "BI.ToggleInput";

export default ToggleInput;
