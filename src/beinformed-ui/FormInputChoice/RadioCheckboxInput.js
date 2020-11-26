// @flow
import { isFunction } from "lodash";

import classNames from "classnames";
import styled, { css } from "styled-components";
import {
  themeProp,
  roundedCorners,
  lightenColor,
  spacer,
} from "beinformed/theme/utils";

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +choicetype?: "checkbox" | "radio",
  +count?: number | null,
  +disabled?: boolean,
  +id?: string,
  +isChecked: boolean,
  +stacked?: boolean,
  +label?: any,
  +name: string,
  +readOnly?: boolean,
  +value: string,
  +inError?: boolean,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
  +onChange: (e: SyntheticInputEvent<*>) => void,
  +onFocus?: (e: SyntheticInputEvent<*>) => void,
};

const StyledWrapper = styled.div`
  position: relative;
  display: ${(props) => (props.isInline ? "inline-flex" : "block")};
  min-height: ${spacer(1.5)};
  padding-left: ${spacer(1.5)};
  ${(props) =>
    props.isInline &&
    css`
      margin-right: ${spacer()};
    `}
`;

const checkboxImage =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e"; // NOSONAR
const radioImage =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e";

const StyledLabel = styled.label`
  position: relative;
  margin-bottom: 0;
  vertical-align: top;

  &.error {
    color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
  }

  &::before {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    content: "";
    background-color: ${themeProp("CHOICE_BG", "#dee2e6")};

    ${({ choiceType }) => choiceType === "checkbox" && roundedCorners()};
    ${({ choiceType }) => choiceType === "radio" && `border-radius: 50%`};

    border: ${themeProp("CHOICE_BORDER")};
    ${themeProp(
      "CHOICE_SHADOW",
      "box-shadow: inset 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);"
    )};

    &.error {
      border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
    }
  }

  &::after {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
`;

const StyledHiddenInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked ~ label::before {
    color: #fff;

    border-color: ${themeProp("CHOICE_ACTIVE_COLOR", "#007bff")};
    background-color: ${themeProp("CHOICE_ACTIVE_COLOR", "#007bff")};

    &.error {
      border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
      background-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
    }
  }

  &:disabled ~ label::before {
    background-color: ${themeProp("GREY_200", "#e9ecef")};
  }

  &:focus ~ label::before {
    box-shadow: ${themeProp("FOCUS_OUTLINE")};
  }

  &:focus:not(:checked) ~ label::before {
    border-color: themeProp("INPUT_ERROR_COLOR", "#dc3545");

    &.error {
      border-color: themeProp("INPUT_FOCUS_BORDER_COLOR", "#80bdff");
    }
  }

  &:not(:disabled):active ~ label::before {
    color: #fff;
    background-color: ${lightenColor(0.35, "CHOICE_ACTIVE_COLOR", "#007bff")};
    border-color: ${lightenColor(0.35, "CHOICE_ACTIVE_COLOR", "#007bff")};
  }

  &:disabled ~ label {
    color: ${themeProp("INPUT_DISABLED_BG", "#e9ecef")};
  }

  &:indeterminate ~ label::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e");
  }

  &[type="checkbox"]:checked ~ label::after {
    background-image: url("${checkboxImage}");
  }
  &[type="radio"]:checked ~ label::after {
    background-image: url("${radioImage}");
  }

  &:disabled:checked ~ label::before {
    background-color: ${lightenColor(0.35, "CHOICE_ACTIVE_COLOR", "#007bff")};
  }
`;

const RadioCheckboxInput = ({
  choicetype = "checkbox",
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
  <StyledWrapper
    className={classNames(className, `${choicetype}-input`)}
    isInline={!stacked}
    data-value={value}
  >
    <StyledHiddenInput
      type={choicetype}
      id={`${id || name}-${value}`}
      name={name}
      value={value}
      disabled={disabled || readOnly}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      checked={isChecked}
      data-count={count}
    />
    <StyledLabel
      className={classNames({ error: inError })}
      choiceType={choicetype}
      htmlFor={`${id || name}-${value}`}
      data-value={value}
    >
      {isFunction(label) ? label() : label}
    </StyledLabel>
    {children}
  </StyledWrapper>
);

RadioCheckboxInput.displayName = "BI.RadioCheckboxInput";

export default RadioCheckboxInput;
