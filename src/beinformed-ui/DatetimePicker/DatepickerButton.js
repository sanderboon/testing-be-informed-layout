// @flow
import { forwardRef } from "react";
import styled from "styled-components";
import classNames from "classnames";

import { Button } from "_component-registry/buttons";

import { Message } from "beinformed/i18n";

const StyledDateButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export type Props = {
  +className?: string,
  +isDate: boolean,
  +onFocus?: Function,
  +onBlur?: Function,
  +onClick?: Function,
};

const DatepickerButton = forwardRef<Props, typeof StyledDateButton>(
  ({ className, isDate, onFocus, onBlur, onClick }: Props, ref) => (
    <StyledDateButton
      ref={ref}
      className={classNames(className, "date-button")}
      key="datetimePickerButton"
      name="datetimePickerButton"
      type="button"
      icon={isDate ? "calendar" : "clock-outline"}
      isIconButton
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      <Message
        id="DateTimeInput.ButtonLabel"
        defaultMessage="Pick a date"
        screenreaderOnly
      />
    </StyledDateButton>
  )
);

DatepickerButton.displayName = "BI.DatepickerButton";

export default DatepickerButton;
