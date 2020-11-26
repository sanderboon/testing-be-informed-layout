// @flow
import { forwardRef } from "react";
import styled from "styled-components";

import { DropdownButton } from "_component-registry/dropdown";

const StyledTimePickerButton = styled.div`
  display: flex;

  &[aria-expanded="true"] input {
    border-bottom-left-radius: 0;
  }
`;
const StyledDropdownButton = styled(DropdownButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: calc(2.25rem + 2px);
`;

import type { Node } from "react";
export type Props = {
  +children?: Node,
  +className?: string,
  +buttonStyle?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "DANGER" | "LINK",
  +isOutlineButton?: boolean,
  +id?: string,
  +isExpanded?: boolean,
  +renderToggleIcon?: boolean,
  +disabled?: boolean,
  +size?: "small" | "large" | "default",
  +onClick?: Function,
  +onFocus?: Function,
  +onBlur?: (e: SyntheticInputEvent<*>) => void,
};

const TimePickerButton = forwardRef<Props, typeof StyledTimePickerButton>(
  (
    {
      className,
      id,
      children,
      buttonStyle,
      isExpanded,
      renderToggleIcon,
      size,
      disabled,
      isOutlineButton,
      onClick,
      onFocus,
      onBlur,
    }: Props,
    ref
  ) => (
    <StyledTimePickerButton className={className} aria-expanded={isExpanded}>
      {children}
      <StyledDropdownButton
        ref={ref}
        id={id}
        buttonStyle={buttonStyle}
        isOutlineButton={isOutlineButton}
        isExpanded={isExpanded}
        renderToggleIcon={renderToggleIcon}
        disabled={disabled}
        size={size}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </StyledTimePickerButton>
  )
);
TimePickerButton.displayName = "BI.TimerPickerButton";

export default TimePickerButton;
