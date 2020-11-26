// @flow
import classNames from "classnames";
import styled, { css } from "styled-components";
import { themeProp } from "beinformed/theme/utils";

import { getTimeStrings } from "./_util";

import {
  Dropdown,
  DropdownChildren,
  DropdownItem,
} from "_component-registry/dropdown";

import { TimePickerButton } from "_component-registry/timepicker";

export type Props = {
  +children?: any,
  +className?: string,
  +id?: string,
  +inError?: boolean,
  +name: string,
  +value?: string,
  +onSelect: (date: string) => void,
  +onFocus: (e: SyntheticInputEvent<*>) => void,
  +onBlur: (e: SyntheticInputEvent<*>) => void,
};

const StyledDropdown = styled(Dropdown)`
  .dropdown-toggle {
    ${({ inError }) =>
      inError &&
      css`
        background: ${themeProp("INPUT_ERROR_BG")};
        border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
        &:focus {
          border-color: ${themeProp("INPUT_ERROR_COLOR", "#dc3545")};
        }
      `};
  }
`;

const TIME_ITEMS = getTimeStrings();

const TimePicker = ({
  className,
  children,
  id,
  inError,
  name,
  value,
  onSelect,
  onFocus,
  onBlur,
}: Props) => {
  const handleSelect = (value: string) => {
    onSelect(value);
  };

  const renderDropdownItems = () =>
    TIME_ITEMS.map((timeItem) => (
      <DropdownItem
        key={timeItem}
        value={timeItem}
        onClick={() => handleSelect(timeItem)}
      >
        {timeItem}
      </DropdownItem>
    ));

  return (
    <StyledDropdown
      className={classNames("time-picker", className)}
      activeValue={value}
      inError={inError}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <TimePickerButton id={id || name} onFocus={onFocus} onBlur={onBlur}>
        {children}
      </TimePickerButton>
      <DropdownChildren
        minWidth="100%"
        maxHeight={300}
        scrollPosition="middle"
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {renderDropdownItems()}
      </DropdownChildren>
    </StyledDropdown>
  );
};

TimePicker.displayName = "BI.TimePicker";

export default TimePicker;
